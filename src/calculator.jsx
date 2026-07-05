function CFACalculator({onClose, onMinimize=null, guideStep=null}){
  const {useState:uS,useRef:uR}=React;
  const snap=(()=>{try{return JSON.parse(localStorage.getItem(CALC_SNAP_KEY)||"null");}catch{return null;}})();
  const [disp,setDisp]=uS(snap?.disp||"0");
  const [pendingOp,setPendingOp]=uS(snap?.pendingOp||null);
  const [prevVal,setPrevVal]=uS(snap?.prevVal||null);
  const [lastB,setLastB]=uS(snap?.lastB||null);
  const [fresh,setFresh]=uS(snap?.fresh!==undefined?snap.fresh:true);
  const [is2nd,setIs2nd]=uS(false);
  const [isBGN,setIsBGN]=uS(snap?.isBGN||false);
  const [cptMode,setCptMode]=uS(false);
  const [tvm,setTvm]=uS(snap?.tvm||{N:"",IY:"",PV:"",PMT:"",FV:""});
  const [tvmLbl,setTvmLbl]=uS("");
  const [mem,setMem]=uS(snap?.mem||0);
  const [py,setPy]=uS(snap?.py||1);
  const [cy,setCy]=uS(snap?.cy||1);
  const [pyField,setPyField]=uS('py');
  const [pyMode,setPyMode]=uS(false);
  const [cfMode,setCfMode]=uS(false);
  const [cfFlows,setCfFlows]=uS([]);
  const [cfNPVMode,setCfNPVMode]=uS(false);
  const [cfFlowsForNPV,setCfFlowsForNPV]=uS([]);
  const [parenStack,setParenStack]=uS([]);
  const [lastAns,setLastAns]=uS(0);
  const [ws,setWs]=uS(null);
  const [msg,setMsg]=uS("");
  const msgTimer=uR(null);
  const hkRef=uR(null);

  const showMsg=(m,ms=1800)=>{clearTimeout(msgTimer.current);setMsg(m);msgTimer.current=setTimeout(()=>setMsg(""),ms);};
  const fmtD=(n)=>{
    if(!isFinite(n))return"Error";if(n===0)return"0";
    const a=Math.abs(n);
    if(a>=1e10||(a<0.0001&&a>0))return n.toExponential(4);
    let s=parseFloat(n.toPrecision(10)).toString();
    return s.length>13?parseFloat(n.toPrecision(6)).toString():s;
  };
  const getN=()=>{const v=parseFloat(disp);return isNaN(v)?0:v;};
  const doOp=(a,b,op)=>{
    if(op==='+')return a+b;if(op==='-')return a-b;
    if(op==='×')return a*b;if(op==='÷')return Math.abs(b)<1e-15?Infinity:a/b;
    if(op==='y^x')return Math.pow(a,b);return b;
  };
  const nomToEff=(nom,cy)=>(Math.pow(1+nom/100/cy,cy)-1)*100;
  const effToNom=(eff,cy)=>cy*(Math.pow(1+eff/100,1/cy)-1)*100;
  const computeAmort=(p1,p2,tvmD,pY)=>{
    const pv=parseFloat(tvmD.PV),pmt=parseFloat(tvmD.PMT),iy=parseFloat(tvmD.IY);
    if(isNaN(pv)||isNaN(pmt)||isNaN(iy)||isNaN(p1)||isNaN(p2)||p2<p1)return null;
    const r=(iy/100)/pY;
    let bal=pv,totalPRN=0,totalINT=0;
    for(let p=1;p<=p2;p++){
      const int_pay=bal*r;
      const prn_disp=pmt+int_pay;
      const int_disp=-int_pay;
      bal=bal+pmt+int_pay;
      if(p>=p1){totalPRN+=prn_disp;totalINT+=int_disp;}
    }
    return{bal,prn:totalPRN,int:totalINT};
  };
  const makeWs=(type)=>{
    if(type==='amort')return{type,idx:0,fields:[
      {name:'P1',value:'1',ro:false},{name:'P2',value:'1',ro:false},
      {name:'BAL',value:'---',ro:true},{name:'PRN',value:'---',ro:true},{name:'INT',value:'---',ro:true}]};
    if(type==='iconv')return{type,idx:0,fields:[
      {name:'NOM%',value:'0',ro:false},{name:'C/Y',value:'12',ro:false},{name:'EFF%',value:'0',ro:false}]};
    if(type==='delta')return{type,idx:0,fields:[
      {name:'OLD',value:'0',ro:false},{name:'NEW',value:'0',ro:false},{name:'%CH',value:'---',ro:true}]};
    return null;
  };
  const wsNav=(dir)=>{
    if(!ws)return;
    const newIdx=Math.max(0,Math.min(ws.fields.length-1,ws.idx+dir));
    const f=ws.fields[newIdx];
    setWs(w=>({...w,idx:newIdx}));
    setTvmLbl(f.name);setDisp(f.value==='---'?'0':f.value);setFresh(true);
  };

  const handleKey=(id)=>{
    const DIGITS=['0','1','2','3','4','5','6','7','8','9'];

    // ── 2nd key ──
    if(id==='2nd'){setIs2nd(s=>!s);return;}

    // ── Worksheet mode ──
    if(ws){
      const is2ndNow=is2nd;if(is2nd)setIs2nd(false);
      if(is2ndNow&&id==='cpt'){setWs(null);setTvmLbl("");setDisp("0");setFresh(true);return;}
      const field=ws.fields[ws.idx];
      if(id==='up'){wsNav(-1);return;}
      if(id==='down'||id==='enter'){wsNav(1);return;}
      if(id==='ce'){
        if(!field.ro){
          const newV='0';setDisp(newV);setFresh(true);
          setWs(w=>{const f=[...w.fields];f[w.idx]={...f[w.idx],value:newV};return{...w,fields:f};});
        }else{setWs(null);setTvmLbl("");setDisp("0");setFresh(true);}
        return;
      }
      if(DIGITS.includes(id)&&!field.ro){
        const newV=fresh?id:(disp==='0'?id:disp+id);
        if(newV.replace('-','').replace('.','').length<=10){setDisp(newV);setFresh(false);setWs(w=>{const f=[...w.fields];f[w.idx]={...f[w.idx],value:newV};return{...w,fields:f};});}
        return;
      }
      if(id==='dot'&&!field.ro){
        if(!disp.includes('.')){const newV=(fresh?'0':disp)+'.';setDisp(newV);setFresh(false);setWs(w=>{const f=[...w.fields];f[w.idx]={...f[w.idx],value:newV};return{...w,fields:f};});}
        return;
      }
      if(id==='neg'&&!field.ro){
        const v=parseFloat(disp)||0;const newV=fmtD(-v);setDisp(newV);setFresh(true);
        setWs(w=>{const f=[...w.fields];f[w.idx]={...f[w.idx],value:newV};return{...w,fields:f};});return;
      }
      if(id==='cpt'){
        if(ws.type==='amort'){
          const p1=parseInt(ws.fields[0].value)||1,p2=parseInt(ws.fields[1].value)||p1;
          const r=computeAmort(p1,p2,tvm,py);
          if(r){
            setWs(w=>{const f=[...w.fields];f[2]={...f[2],value:fmtD(r.bal)};f[3]={...f[3],value:fmtD(r.prn)};f[4]={...f[4],value:fmtD(r.int)};return{...w,fields:f,idx:2};});
            setTvmLbl("BAL");setDisp(fmtD(r.bal));setFresh(true);showMsg("Computed");
          }else showMsg("Set N I/Y PV PMT first");
        }else if(ws.type==='iconv'){
          const nom=parseFloat(ws.fields[0].value),cy=Math.max(1,parseFloat(ws.fields[1].value)||1),eff=parseFloat(ws.fields[2].value);
          if(ws.idx===2&&!isNaN(nom)){const e=nomToEff(nom,cy);const nv=fmtD(e);setWs(w=>{const f=[...w.fields];f[2]={...f[2],value:nv};return{...w,fields:f};});setDisp(nv);setFresh(true);showMsg("EFF computed");}
          else if(ws.idx===0&&!isNaN(eff)){const n=effToNom(eff,cy);const nv=fmtD(n);setWs(w=>{const f=[...w.fields];f[0]={...f[0],value:nv};return{...w,fields:f};});setDisp(nv);setFresh(true);showMsg("NOM computed");}
          else showMsg("Navigate to field then CPT");
        }else if(ws.type==='delta'){
          const o=parseFloat(ws.fields[0].value),n=parseFloat(ws.fields[1].value);
          if(!isNaN(o)&&!isNaN(n)&&o!==0){const pch=(n-o)/Math.abs(o)*100;const nv=fmtD(pch);setWs(w=>{const f=[...w.fields];f[2]={...f[2],value:nv};return{...w,fields:f,idx:2};});setTvmLbl("%CH");setDisp(nv);setFresh(true);}
          else showMsg("OLD cannot be zero");
        }
        return;
      }
      return;
    }

    // ── 2nd-modified ──
    if(is2nd){
      setIs2nd(false);
      if(id==='PMT'){setIsBGN(b=>!b);showMsg(isBGN?"END mode":"BGN mode");return;}
      if(id==='FV'||id==='arr'){setTvm({N:"",IY:"",PV:"",PMT:"",FV:""});setDisp("0");setFresh(true);setTvmLbl("CLR TVM");return;}
      if(id==='ce'){setTvm({N:"",IY:"",PV:"",PMT:"",FV:""});setPendingOp(null);setPrevVal(null);setParenStack([]);setDisp("0");setFresh(true);setTvmLbl("CLR WRK");return;}
      if(id==='IY'){setPyMode(true);setDisp(String(py));setFresh(true);setTvmLbl("P/Y =");return;}
      if(id==='ln'){setDisp(fmtD(Math.exp(getN())));setFresh(true);setTvmLbl("e^x");return;}
      if(id==='sqrt'){setDisp(fmtD(Math.pow(getN(),2)));setFresh(true);setTvmLbl("x²");return;}
      if(id==='N'){const xpy=parseFloat((getN()*py).toFixed(6));setDisp(fmtD(xpy));setTvm(t=>({...t,N:xpy}));setFresh(true);setTvmLbl("N×P/Y");return;}
      if(id==='PV'){const w=makeWs('amort');setWs(w);setTvmLbl(w.fields[0].name);setDisp(w.fields[0].value);setFresh(true);return;}
      if(id==='5'){const w=makeWs('iconv');setWs(w);setTvmLbl(w.fields[0].name);setDisp(w.fields[0].value);setFresh(true);return;}
      if(id==='8'){const w=makeWs('delta');setWs(w);setTvmLbl(w.fields[0].name);setDisp(w.fields[0].value);setFresh(true);return;}
      if(id==='cpt'){if(pyMode){setPyMode(false);setPyField('py');setDisp("0");setFresh(true);setTvmLbl("");showMsg("P/Y="+py+" C/Y="+cy+" ✓ done!");}return;}
      if(id==='npv'&&cfFlows.length>0){setCfNPVMode(true);setCfFlowsForNPV([...cfFlows]);setDisp("0");setFresh(true);setTvmLbl("I =");return;}
      return;
    }

    // ── P/Y mode ──
    if(pyMode){
      if(DIGITS.includes(id)){setDisp(p=>fresh||(p==='0')?(setFresh(false),id):p.length<4?p+id:p);setFresh(false);return;}
      if(id==='dot'){if(!disp.includes('.')){setDisp(p=>(fresh?'0':p)+'.');setFresh(false);}return;}
      if(id==='neg'){const v=parseFloat(disp)||0;setDisp(fmtD(-v));setFresh(true);return;}
      if(id==='enter'||id==='eq'){
        // ENTER saves current field value and stays — match real BA II Plus behavior
        const v=Math.max(1,Math.min(365,parseInt(disp)||1));
        if(pyField==='py'){setPy(v);setFresh(true);showMsg("P/Y="+v+" saved ✓ → press ↓");return;}
        else{setCy(v);setFresh(true);showMsg("C/Y="+v+" saved ✓ → [2ND][QUIT]");return;}
      }
      if(id==='down'){
        // ↓ advances to next field (or wraps P/Y from C/Y)
        if(pyField==='py'){setPyField('cy');setDisp(String(cy));setFresh(true);setTvmLbl("C/Y =");showMsg("→ C/Y field");return;}
        else{setPyField('py');setDisp(String(py));setFresh(true);setTvmLbl("P/Y =");showMsg("→ P/Y field");return;}
      }
      if(id==='up'){
        if(pyField==='cy'){setPyField('py');setDisp(String(py));setFresh(true);setTvmLbl("P/Y =");showMsg("← P/Y field");return;}
        return;
      }
      if(id==='ce'){
        if(pyField==='cy'){setPyField('py');setDisp(String(py));setFresh(true);setTvmLbl("P/Y =");showMsg("← P/Y field");return;}
        setPyMode(false);setPyField('py');setDisp("0");setFresh(true);setTvmLbl("");showMsg("P/Y cancelled");return;
      }
      if(id==='N'||id==='IY'){
        // legacy shortcut: save-and-advance
        const v=Math.max(1,Math.min(365,parseInt(disp)||1));
        if(pyField==='py'){setPy(v);setPyField('cy');setDisp(String(cy));setFresh(true);setTvmLbl("C/Y =");showMsg("P/Y="+v+" ✓ → C/Y");return;}
        else{setCy(v);setPyMode(false);setPyField('py');setDisp(String(v));setFresh(true);setTvmLbl("C/Y");showMsg("C/Y="+v+" ✓ done!");return;}
      }
      return;
    }

    // ── NPV I= mode ──
    if(cfNPVMode){
      if(!DIGITS.includes(id)&&id!=='dot'&&id!=='neg'){
        if(id==='eq'||id==='enter'||id==='down'){const irateV=getN();setCfNPVMode(false);const npv=calcNPVValue(cfFlowsForNPV,irateV);setDisp(fmtD(npv));setFresh(true);setLastAns(npv);setTvmLbl("NPV");return;}
        if(id==='ce'){setCfNPVMode(false);setDisp("0");setFresh(true);setTvmLbl("");return;}
        return;
      }
    }

    // ── CPT mode ──
    if(cptMode){
      if(['N','IY','PV','PMT','FV'].includes(id)){
        setCptMode(false);
        const known={N:parseFloat(tvm.N),IY:parseFloat(tvm.IY),PV:parseFloat(tvm.PV),PMT:parseFloat(tvm.PMT),FV:parseFloat(tvm.FV)};
        if(Object.entries(known).filter(([k])=>k!==id&&isNaN(known[k])).length>0){showMsg("Set 4 TVM vars first");setDisp("Error");setFresh(true);return;}
        const result=solveTVMCalc(known,py,isBGN,id);
        if(result===null||!isFinite(result)){setDisp("Error");setFresh(true);return;}
        const r2=parseFloat(result.toFixed(6));
        setTvm(t=>({...t,[id]:r2}));setDisp(fmtD(r2));setFresh(true);setLastAns(r2);setTvmLbl(id==='IY'?'I/Y':id);return;
      }
      setCptMode(false);
    }

    // ── CF mode ──
    if(cfMode){
      if(id==='cf'||id==='enter'||id==='down'){let v=getN();if(pendingOp){v=doOp(prevVal??0,v,pendingOp);setPendingOp(null);setPrevVal(null);}const next=[...cfFlows,v];setCfFlows(next);showMsg(`CF${next.length-1}=${fmtD(v)}`);setDisp("0");setFresh(true);setTvmLbl(`CF${next.length}`);return;}
      if(id==='irr'){const allF=fresh?cfFlows:[...cfFlows,getN()];if(allF.length<2){showMsg("Need ≥2 CFs");return;}setCfMode(false);const irr=calcIRRValue(allF);setDisp(fmtD(irr));setFresh(true);setLastAns(irr);setTvmLbl("IRR %");return;}
      if(id==='npv'){const allF=fresh?cfFlows:[...cfFlows,getN()];if(allF.length<1){showMsg("Enter CF0 first");return;}setCfMode(false);setCfNPVMode(true);setCfFlowsForNPV(allF);setDisp("0");setFresh(true);setTvmLbl("I =");return;}
      if(id==='ce'){if(!fresh){setDisp("0");setFresh(true);}else{setCfMode(false);setCfFlows([]);setTvmLbl("");showMsg("CF cleared");}return;}
    }

    // ── Main calc ──
    switch(id){
      case '0':case '1':case '2':case '3':case '4':
      case '5':case '6':case '7':case '8':case '9':
        setDisp(p=>{if(fresh)return id;if(p==='0'&&id==='0')return'0';if(p==='0')return id;if(p.replace('-','').replace('.','').length>=10)return p;return p+id;});
        setFresh(false);if(!cfNPVMode&&!pyMode)setTvmLbl("");break;
      case 'dot':
        setDisp(p=>{if(fresh)return'0.';if(p.includes('.'))return p;if(p.replace('-','').length>=10)return p;return p+'.';});
        setFresh(false);break;
      case 'neg':{const n=getN();setDisp(isNaN(n)?disp:fmtD(-n));}break;
      case 'pct':setDisp(fmtD(getN()/100));setFresh(true);break;
      case 'sqrt':{const n=getN();setDisp(n<0?"Error":fmtD(Math.sqrt(n)));setFresh(true);}break;
      case 'sq':{const n=getN();setDisp(fmtD(n*n));setFresh(true);setTvmLbl("x²");}break;
      case 'inv':{const n=getN();setDisp(n===0?"Error":fmtD(1/n));setFresh(true);}break;
      case 'xmy':{const n=getN();setDisp(fmtD(Math.exp(n)));setFresh(true);setTvmLbl("eˣ");}break;
      case 'ln':{const n=getN();setDisp(n<=0?"Error":fmtD(Math.log(n)));setFresh(true);}break;
      case 'ans':setDisp(fmtD(lastAns));setFresh(true);setTvmLbl("ANS");break;
      case 'sto':setMem(getN());showMsg(`M→ ${fmtD(getN())}`);break;
      case 'rcl':setDisp(fmtD(mem));setFresh(true);setTvmLbl("RCL");break;
      case 'ce':
        if(!fresh){setDisp("0");setFresh(true);}
        else{setPendingOp(null);setPrevVal(null);setTvmLbl("");if(parenStack.length>0){setParenStack([]);showMsg("Parens cleared");}}
        break;
      case 'lp':{
        setParenStack(s=>[...s,{pendingOp,prevVal}]);
        setPendingOp(null);setPrevVal(null);setDisp("0");setFresh(true);
        setTvmLbl(`(`.repeat(parenStack.length+1));break;
      }
      case 'rp':{
        if(parenStack.length===0)break;
        const innerResult=(pendingOp!==null&&!fresh)?doOp(prevVal??0,getN(),pendingOp):(pendingOp!==null)?doOp(prevVal??0,lastB??0,pendingOp):getN();
        const outerCtx=parenStack[parenStack.length-1];
        const newStack=parenStack.slice(0,-1);
        setParenStack(newStack);setPendingOp(outerCtx.pendingOp);setPrevVal(outerCtx.prevVal);
        setDisp(fmtD(innerResult));setFresh(false);setLastAns(innerResult);
        setTvmLbl(newStack.length>0?`(`.repeat(newStack.length):"");break;
      }
      case 'add':case 'sub':case 'mul':case 'div':case 'yx':{
        const opS={add:'+',sub:'-',mul:'×',div:'÷',yx:'y^x'}[id];
        const cur=getN();
        if(pendingOp!==null&&!fresh){const r=doOp(prevVal??cur,cur,pendingOp);setDisp(fmtD(r));setPrevVal(r);setLastAns(r);}
        else setPrevVal(cur);
        setPendingOp(opS);setLastB(cur);setFresh(true);setTvmLbl(opS);break;
      }
      case 'arr':{setTvm({N:"",IY:"",PV:"",PMT:"",FV:""});setDisp("0");setFresh(true);setTvmLbl("CLR TVM");break;}
      case 'eq':case 'enter':{
        if(cfNPVMode){const irateV=getN();setCfNPVMode(false);const npv=calcNPVValue(cfFlowsForNPV,irateV);setDisp(fmtD(npv));setFresh(true);setLastAns(npv);setTvmLbl("NPV");break;}
        if(pyMode){const v=Math.max(1,Math.min(365,parseInt(disp)||1));setPy(v);setPyMode(false);setDisp(String(v));setFresh(true);setTvmLbl("P/Y");break;}
        if(parenStack.length>0){
          let val=(pendingOp!==null&&!fresh)?doOp(prevVal??0,getN(),pendingOp):getN();
          let stk=[...parenStack];
          while(stk.length>0){const o=stk.pop();if(o.pendingOp!==null)val=doOp(o.prevVal??0,val,o.pendingOp);}
          setParenStack([]);setPendingOp(null);setPrevVal(null);setDisp(fmtD(val));setFresh(true);setLastAns(val);break;
        }
        if(pendingOp!==null){
          const b=fresh?(lastB??0):getN();
          const result=doOp(prevVal??0,b,pendingOp);
          setLastB(b);setPrevVal(result);setDisp(fmtD(result));setFresh(true);setLastAns(result);
        }break;
      }
      case 'N':case 'IY':case 'PV':case 'PMT':case 'FV':{
        let v=getN();
        if(pendingOp){v=doOp(prevVal??0,v,pendingOp);setPendingOp(null);setPrevVal(null);}
        setTvm(t=>({...t,[id]:v}));setTvmLbl(id==='IY'?'I/Y':id);
        // Reset display to 0 after storage — TVM strip row shows the stored value.
        // This matches real BA II Plus: arithmetic after TVM storage starts from 0,
        // so [−] 950 [PV] correctly computes 0−950=−950 not prevTVM−950.
        setDisp("0");setPrevVal(0);setPendingOp(null);
        setFresh(true);setLastAns(v);setCptMode(false);break;
      }
      case 'cpt':setCptMode(true);setTvmLbl("CPT ▶");break;
      case 'cf':
        if(!cfMode){setCfMode(true);setCfFlows([]);setDisp("0");setFresh(true);setTvmLbl("CF0");showMsg("Enter CF0 → CF");}
        else{const v=getN();const next=[...cfFlows,v];setCfFlows(next);showMsg(`CF${next.length-1}=${fmtD(v)}`);setDisp("0");setFresh(true);setTvmLbl(`CF${next.length}`);}
        break;
      case 'npv':
        if(!cfMode&&cfFlows.length<1){showMsg("Press CF first");break;}
        setCfNPVMode(true);setCfFlowsForNPV(cfFlows);setDisp("0");setFresh(true);setTvmLbl("I =");break;
      case 'irr':
        if(!cfMode&&cfFlows.length>=2){const irr=calcIRRValue(cfFlows);setDisp(fmtD(irr));setFresh(true);setLastAns(irr);setTvmLbl("IRR %");}
        else showMsg("Press CF first");break;
      case 'off':
        try{localStorage.setItem(CALC_SNAP_KEY,JSON.stringify({disp,pendingOp,prevVal,lastB,fresh,isBGN,tvm,mem,py,cy}));}catch{}
        onClose();break;
      default:break;
    }
  };
  hkRef.current=handleKey;
  // Direct 2nd-function actions — used by guide strip so is2nd state isn't needed
  const hk2nd=(id)=>{
    setIs2nd(false); // always clear 2ND indicator before performing the action
    if(id==='PMT'){setIsBGN(b=>!b);showMsg(isBGN?"END mode":"BGN mode");return;}
    if(id==='FV'||id==='arr'){setTvm({N:"",IY:"",PV:"",PMT:"",FV:""});setDisp("0");setFresh(true);setTvmLbl("CLR TVM");showMsg("TVM cleared");return;}
    if(id==='ce'){
      if(cfMode){setCfFlows([]);setDisp("0");setFresh(true);setTvmLbl("CF0");showMsg("CF cleared");return;}
      setTvm({N:"",IY:"",PV:"",PMT:"",FV:""});setPendingOp(null);setPrevVal(null);setParenStack([]);setDisp("0");setFresh(true);setTvmLbl("CLR WRK");showMsg("Worksheet cleared");return;
    }
    if(id==='IY'){setPyMode(true);setPyField('py');setDisp(String(py));setFresh(true);setTvmLbl("P/Y =");showMsg("P/Y worksheet: type → ENTER → ↓ → type → ENTER → QUIT");return;}
    if(id==='5'){const w=makeWs('iconv');setWs(w);setTvmLbl(w.fields[0].name);setDisp(w.fields[0].value);setFresh(true);showMsg("ICONV worksheet");return;}
    if(id==='PV'){const w=makeWs('amort');setWs(w);setTvmLbl(w.fields[0].name);setDisp(w.fields[0].value);setFresh(true);showMsg("Amort worksheet");return;}
    if(id==='cpt'){
      if(ws){setWs(null);setTvmLbl("");setDisp("0");setFresh(true);showMsg("Exited worksheet");}
      else if(pyMode){setPyMode(false);setPyField('py');setDisp("0");setFresh(true);setTvmLbl("");showMsg("P/Y="+py+" C/Y="+cy+" ✓ done!");}
      else if(cfMode){setCfMode(false);setCfFlows([]);setTvmLbl("");showMsg("Exited CF");}
      else{showMsg("QUIT");}
      return;
    }
    if(id==='8'){const w=makeWs('delta');setWs(w);setTvmLbl(w.fields[0].name);setDisp(w.fields[0].value);setFresh(true);showMsg("Format worksheet");return;}
  };
  const IS_2ND_FN=new Set(["[CLR TVM]","[P/Y]","[CLR WORK]","[QUIT]","[BGN]","[SET]","[AMORT]","[ICONV]","[FORMAT]"]);
  const KEY_ACTION_MAP={
    "[2ND]":hk=>hk("2nd"),"[CPT]":hk=>hk("cpt"),"[N]":hk=>hk("N"),"[I/Y]":hk=>hk("IY"),
    "[PV]":hk=>hk("PV"),"[PMT]":hk=>hk("PMT"),"[FV]":hk=>hk("FV"),"[ENTER]":hk=>hk("enter"),
    "[↓]":hk=>hk("down"),"[↑]":hk=>hk("up"),"[+/-]":hk=>hk("neg"),"[CE/C]":hk=>hk("ce"),
    "[CF]":hk=>hk("cf"),"[NPV]":hk=>hk("npv"),"[IRR]":hk=>hk("irr"),
    "[STO]":hk=>hk("sto"),"[RCL]":hk=>hk("rcl"),"[−]":hk=>hk("sub"),
    "[CLR TVM]":()=>hk2nd("FV"),"[P/Y]":()=>hk2nd("IY"),"[CLR WORK]":()=>hk2nd("ce"),
    "[QUIT]":()=>hk2nd("cpt"),"[BGN]":()=>hk2nd("PMT"),"[SET]":()=>hk2nd("PMT"),
    "[AMORT]":()=>hk2nd("PV"),"[ICONV]":()=>hk2nd("5"),"[FORMAT]":()=>hk2nd("8"),
  };

  const BTNS=[
    // Row 1
    {id:'cpt',  main:'CPT',   sub:'QUIT',    t:'cpt'},
    {id:'enter',main:'ENTER', sub:'SET',     t:'enter'},
    {id:'up',   main:'↑',     sub:'DEL',     t:'nav'},
    {id:'down', main:'↓',     sub:'INS',     t:'nav'},
    {id:'off',  main:'ON/OFF',sub:'',        t:'onoff'},
    // Row 2
    {id:'2nd',  main:'2nd',   sub:'',        t:'k2nd'},
    {id:'cf',   main:'CF',    sub:'',        t:'ws'},
    {id:'npv',  main:'NPV',   sub:'I',       t:'ws'},
    {id:'irr',  main:'IRR',   sub:'',        t:'ws'},
    {id:'arr',  main:'→',     sub:'CLR TVM', t:'nav'},
    // Row 3
    {id:'N',    main:'N',     sub:'xP/Y',   t:'tvm'},
    {id:'IY',   main:'I/Y',   sub:'P/Y',    t:'tvm'},
    {id:'PV',   main:'PV',    sub:'AMORT',  t:'tvm'},
    {id:'PMT',  main:'PMT',   sub:'BGN',    t:'tvm'},
    {id:'FV',   main:'FV',    sub:'CLR TVM',t:'tvm'},
    // Row 4
    {id:'pct',  main:'%',     sub:'',       t:'fn'},
    {id:'sqrt', main:'√x',    sub:'',       t:'fn'},
    {id:'sq',   main:'x²',    sub:'',       t:'fn'},
    {id:'inv',  main:'1/x',   sub:'',       t:'fn'},
    {id:'div',  main:'÷',     sub:'',       t:'op'},
    // Row 5
    {id:'xmy',  main:'INV',   sub:'eˣ',     t:'fn'},
    {id:'lp',   main:'(',     sub:'DATA',   t:'fn'},
    {id:'rp',   main:')',     sub:'STAT',   t:'fn'},
    {id:'yx',   main:'yˣ',    sub:'BOND',   t:'fn'},
    {id:'mul',  main:'×',     sub:'',       t:'op'},
    // Row 6
    {id:'ln',   main:'LN',    sub:'eˣ',     t:'fn'},
    {id:'7',    main:'7',     sub:'DEPR',   t:'d'},
    {id:'8',    main:'8',     sub:'Δ%',     t:'d'},
    {id:'9',    main:'9',     sub:'BRKEVN', t:'d'},
    {id:'sub',  main:'−',     sub:'',       t:'op'},
    // Row 7
    {id:'sto',  main:'STO',   sub:'',       t:'mem'},
    {id:'4',    main:'4',     sub:'DATE',   t:'d'},
    {id:'5',    main:'5',     sub:'ICONV',  t:'d'},
    {id:'6',    main:'6',     sub:'PROFIT', t:'d'},
    {id:'add',  main:'+',     sub:'',       t:'op'},
    // Row 8
    {id:'rcl',  main:'RCL',   sub:'CLR WRK',t:'mem'},
    {id:'1',    main:'1',     sub:'MEM',    t:'d'},
    {id:'2',    main:'2',     sub:'FORMAT', t:'d'},
    {id:'3',    main:'3',     sub:'RESET',  t:'d'},
    {id:'ans',  main:'ANS',   sub:'',       t:'ans'},
    // Row 9
    {id:'ce',   main:'CE|C',  sub:'CLR WRK',t:'clr'},
    {id:'0',    main:'0',     sub:'',       t:'d'},
    {id:'dot',  main:'.',     sub:'',       t:'d'},
    {id:'neg',  main:'+/−',   sub:'',       t:'fn'},
    {id:'eq',   main:'=',     sub:'',       t:'eq'},
  ];

  const BG={k2nd:is2nd?'#b45309':'#3a2800',cpt:cptMode?'#4c1d95':'#1c1040',enter:'#0e1a2e',nav:'#0a1020',onoff:'#150505',ws:'#0e1e3a',tvm:'#0a2040',fn:'#131320',op:'#0a0a18',d:'#111128',eq:'#5b21b6',clr:'#2d0000',mem:'#0a1e14',ans:'#1a1030'};
  const TX={k2nd:is2nd?'#fff':'#d97706',cpt:cptMode?'#ddd6fe':'#a78bfa',enter:'#93c5fd',nav:'#64748b',onoff:'#ef4444',ws:'#60a5fa',tvm:'#93c5fd',fn:'#c4c4f4',op:'#7dd3fc',d:'#e2e2ff',eq:'#fff',clr:'#fca5a5',mem:'#6ee7b7',ans:'#c4b5fd'};
  const BO={k2nd:is2nd?'1px solid #d97706':'1px solid #5a3800',cpt:cptMode?'1px solid #7c3aed':'1px solid #3d2080',enter:'1px solid #1e3a5a',nav:'1px solid #1a2030',onoff:'1px solid #450a0a',ws:'1px solid #1e3a7a',tvm:'1px solid #1e4a8a',fn:'1px solid #2a2a50',op:'1px solid #181828',d:'1px solid #22224a',eq:'1px solid #7c3aed',clr:'1px solid #5d0000',mem:'1px solid #0a2e1a',ans:'1px solid #3d2870'};

  return(
    <div style={{position:"fixed",inset:0,zIndex:9500,background:"#080810",display:"flex",flexDirection:"column",fontFamily:"'SF Pro Display','Helvetica Neue',sans-serif",overflow:"hidden"}}>
      {/* Header bar */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 13px",background:"linear-gradient(180deg,#080810,#0c0c1a)",borderBottom:"1px solid #1a1a30",flexShrink:0}}>
        <div style={{display:"flex",flexDirection:"column"}}>
          <span style={{fontSize:13,fontWeight:900,color:"#7dd3fc",letterSpacing:"0.08em"}}>BA II PLUS™</span>
          <span style={{fontSize:7,color:"#334466",letterSpacing:"0.12em",marginTop:1}}>TEXAS INSTRUMENTS</span>
        </div>
        <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"}}>
          {isBGN&&<span style={{fontSize:8,fontWeight:800,padding:"1px 6px",borderRadius:20,background:"#4c1d9530",color:"#c4b5fd",border:"1px solid #7c3aed44"}}>BGN</span>}
          {is2nd&&<span style={{fontSize:8,fontWeight:800,padding:"1px 6px",borderRadius:20,background:"#78350f30",color:"#fbbf24",border:"1px solid #d9770644"}}>2ND</span>}
          {cptMode&&<span style={{fontSize:8,fontWeight:800,padding:"1px 6px",borderRadius:20,background:"#4c1d9530",color:"#c4b5fd",border:"1px solid #7c3aed44"}}>CPT</span>}
          {cfMode&&<span style={{fontSize:8,fontWeight:800,padding:"1px 6px",borderRadius:20,background:"#0c2a5030",color:"#7dd3fc",border:"1px solid #2563eb44"}}>CF</span>}
          {ws&&<span style={{fontSize:8,fontWeight:800,padding:"1px 6px",borderRadius:20,background:"#14402030",color:"#4ade80",border:"1px solid #16643544"}}>{ws.type.toUpperCase()}</span>}
          {parenStack.length>0&&<span style={{fontSize:8,fontWeight:800,padding:"1px 6px",borderRadius:20,background:"#1a2a3030",color:"#94a3b8",border:"1px solid #33445544"}}>{`(`.repeat(parenStack.length)}</span>}
          {pyMode&&<span style={{fontSize:8,fontWeight:800,padding:"1px 6px",borderRadius:20,background:"#10301030",color:"#4ade80",border:"1px solid #16643544"}}>{pyField==='py'?"P/Y":"C/Y"}</span>}
          {py!==1&&!ws&&!pyMode&&<span style={{fontSize:8,color:"#334466",fontFamily:"monospace"}}>P/Y={py}</span>}
          <div style={{display:"flex",gap:4}}>
            {onMinimize&&<button onClick={()=>{try{localStorage.setItem(CALC_SNAP_KEY,JSON.stringify({disp,pendingOp,prevVal,lastB,fresh,isBGN,tvm,mem,py,cy}));}catch{}onMinimize(disp);}} style={{background:"#1a1a2e",border:"1px solid #2a2a48",color:"#8888cc",cursor:"pointer",fontSize:10,borderRadius:7,padding:"5px 10px",fontWeight:700}}>⊟</button>}
            <button onClick={onClose} style={{background:"#1a1a2e",border:"1px solid #2a2a48",color:"#8888cc",cursor:"pointer",fontSize:10,borderRadius:7,padding:"5px 12px",fontWeight:700}}>✓ Done</button>
          </div>
        </div>
      </div>

      {/* LCD screen */}
      <div style={{background:"linear-gradient(180deg,#030c03,#050f05)",padding:"8px 14px 6px",borderBottom:"2px solid #030810",flexShrink:0}}>
        <div style={{minHeight:16,marginBottom:2,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontSize:9,fontWeight:700,color:msg?"#fbbf24":"#3aba3a",letterSpacing:"0.05em",transition:"color 0.2s"}}>{msg||(ws?`${ws.type.toUpperCase()}: ${tvmLbl}`:tvmLbl)||" "}</div>
          {pendingOp&&!ws&&<div style={{fontSize:11,color:"#2a5a2a",fontFamily:"monospace"}}>{pendingOp}</div>}
        </div>
        <div style={{fontSize:40,fontWeight:300,color:disp==="Error"?"#f87171":"#b6f066",fontFamily:"'Courier New',Courier,monospace",textAlign:"right",letterSpacing:"0.02em",lineHeight:1.1,minHeight:46,display:"flex",alignItems:"center",justifyContent:"flex-end",overflow:"hidden",whiteSpace:"nowrap"}}>
          {disp}
        </div>
        {/* Worksheet nav arrows in LCD */}
        {ws&&(
          <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>
            <div style={{display:"flex",gap:4}}>
              {ws.fields.map((f,i)=>(
                <div key={f.name} style={{fontSize:7,color:i===ws.idx?"#4ade80":"#1c3c1c",fontWeight:i===ws.idx?800:400,padding:"1px 4px",borderRadius:3,background:i===ws.idx?"#0a200a":"transparent",border:i===ws.idx?"1px solid #1a4a1a":"1px solid transparent"}}>
                  {f.name}
                </div>
              ))}
            </div>
            <div style={{fontSize:7,color:"#1c3c1c"}}>↑↓ nav · CPT=calc</div>
          </div>
        )}
      </div>

      {/* Guide strip — shown when opened from Learn tab */}
      {guideStep&&(
        <div style={{background:"#06111e",borderBottom:"1px solid #0e2035",padding:"5px 10px",flexShrink:0}}>
          <div style={{fontSize:7,fontWeight:800,color:"#2563eb",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>
            📖 {guideStep.label} — tap each key in order ↓
          </div>
          {guideStep.note&&<div style={{fontSize:8,color:"#3b5f8a",lineHeight:1.5,marginBottom:4,fontStyle:"italic"}}>{guideStep.note}</div>}
          <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
            {guideStep.keys.map((k,ki)=>{
              const action=KEY_ACTION_MAP[k];
              const fn2=IS_2ND_FN.has(k);
              if(k.startsWith("["))return(
                <button key={ki} onClick={()=>fn2?action?.():action?.(handleKey)}
                  style={{fontFamily:"monospace",fontSize:9,fontWeight:800,padding:"2px 6px",borderRadius:4,cursor:"pointer",
                    background:fn2?"#1a0e00":"#0a1a2e",color:fn2?"#d97706":"#60a5fa",
                    border:`1px solid ${fn2?"#5a3800":"#1d4ed8"}`,
                    WebkitTapHighlightColor:"transparent",touchAction:"manipulation"}}>
                  {k}
                </button>
              );
              if(k.startsWith("(")||k.includes("→")||k.includes("=")||/^[A-Z]/.test(k))return(
                <span key={ki} style={{fontSize:8,color:"#1e3a5a",alignSelf:"center",fontStyle:"italic"}}>{k}</span>
              );
              return(
                <button key={ki} onClick={()=>{
                  const neg=k.startsWith("-");const abs=neg?k.slice(1):k;
                  const digs=abs.replace(/[^0-9.]/g,"");
                  let d=0;[...digs].forEach(ch=>{const c=ch;setTimeout(()=>hkRef.current?.(c==="."?"dot":c),d);d+=55;});
                  if(neg)setTimeout(()=>hkRef.current?.("neg"),d);
                }} style={{fontFamily:"monospace",fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:4,
                  background:"#0a1420",color:"#3b82f6",border:"1px solid #0e2035",cursor:"pointer",
                  WebkitTapHighlightColor:"transparent",touchAction:"manipulation"}}>
                  {k}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TVM register strip */}
      {!ws&&(
        <div style={{background:"#050510",padding:"3px 4px",display:"flex",gap:2,borderBottom:"1px solid #0d0d1e",flexShrink:0}}>
          {[['N','N'],['IY','I/Y'],['PV','PV'],['PMT','PMT'],['FV','FV']].map(([k,lbl])=>(
            <div key={k} onClick={()=>{if(tvm[k]!==""){setDisp(fmtD(parseFloat(tvm[k])));setFresh(true);setTvmLbl(lbl);}}}
              style={{flex:1,textAlign:"center",padding:"3px 1px",borderRadius:3,background:tvm[k]!==""?"#0b1e0b":"#0a0a1a",border:`1px solid ${tvm[k]!==""?"#1c3c1c":"#141428"}`,cursor:tvm[k]!==""?"pointer":"default"}}>
              <div style={{fontSize:7,color:tvm[k]!==""?"#2a5a2a":"#202038",fontWeight:800,letterSpacing:"0.06em"}}>{lbl}</div>
              <div style={{fontSize:8,color:tvm[k]!==""?"#5eea5e":"#1a1a2e",fontFamily:"'Courier New',monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                {tvm[k]!==""?parseFloat(parseFloat(tvm[k]).toFixed(4)).toString():"—"}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CF flows */}
      {cfMode&&cfFlows.length>0&&(
        <div style={{background:"#050510",padding:"2px 8px",borderBottom:"1px solid #0d0d1e",flexShrink:0,overflowX:"auto"}}>
          <div style={{display:"flex",gap:3,alignItems:"center",whiteSpace:"nowrap"}}>
            {cfFlows.map((v,i)=>(
              <span key={i} style={{fontSize:7,color:"#7dd3fc",fontFamily:"monospace",padding:"1px 4px",borderRadius:3,background:"#0a1a2a",border:"1px solid #1a3a5a",flexShrink:0}}>
                {i===0?"C0":`C${i}`}:{fmtD(v)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Button grid — 9 rows × 5 cols */}
      <div style={{flex:1,minHeight:0,padding:"3px 3px 2px",display:"grid",gridTemplateColumns:"repeat(5,1fr)",gridTemplateRows:"repeat(9,1fr)",gap:2}}>
        {BTNS.map(btn=>(
          <button key={btn.id} onClick={()=>handleKey(btn.id)}
            style={{
              padding:0,borderRadius:6,border:BO[btn.t],cursor:"pointer",
              background:BG[btn.t],color:TX[btn.t],
              display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
              width:"100%",height:"100%",
              fontSize:btn.main.length>=7?7:btn.main.length>=5?8:btn.main.length>=4?9:btn.main.length>=3?10:13,
              fontWeight:700,position:"relative",
              boxShadow:"0 2px 4px #00000055,inset 0 1px 0 #ffffff08",
              userSelect:"none",WebkitUserSelect:"none",touchAction:"manipulation",
              transition:"filter 0.05s,transform 0.05s",
            }}
            onPointerDown={e=>{e.currentTarget.style.filter="brightness(1.9)";e.currentTarget.style.transform="scale(0.92)";}}
            onPointerUp={e=>{e.currentTarget.style.filter="";e.currentTarget.style.transform="";}}
            onPointerLeave={e=>{e.currentTarget.style.filter="";e.currentTarget.style.transform="";}}>
            {btn.sub&&<span style={{fontSize:5.5,color:"#e07b10",position:"absolute",top:2,left:0,right:0,textAlign:"center",fontWeight:800,lineHeight:1,letterSpacing:"0.01em"}}>{btn.sub}</span>}
            <span style={{marginTop:btn.sub?4:0,lineHeight:1}}>{btn.main}</span>
          </button>
        ))}
      </div>

      {/* Quick reference */}
      <div style={{background:"#040410",borderTop:"1px solid #0d0d1e",padding:"2px 10px",flexShrink:0,display:"flex",gap:8,overflowX:"auto",whiteSpace:"nowrap",alignItems:"center"}}>
        <span style={{fontSize:7,color:"#1c1c30"}}>TVM: 4 vars → CPT+key</span>
        <span style={{fontSize:7,color:"#111120"}}>·</span>
        <span style={{fontSize:7,color:"#1c1c30"}}>2nd+PV=AMORT</span>
        <span style={{fontSize:7,color:"#111120"}}>·</span>
        <span style={{fontSize:7,color:"#1c1c30"}}>2nd+5=ICONV</span>
        <span style={{fontSize:7,color:"#111120"}}>·</span>
        <span style={{fontSize:7,color:"#1c1c30"}}>2nd+8=Δ%</span>
        <span style={{fontSize:7,color:"#111120"}}>·</span>
        <span style={{fontSize:7,color:"#1c1c30"}}>yˣ=power · INV=eˣ</span>
      </div>
    </div>
  );
}
