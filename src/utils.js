const { useState, useEffect, useRef, useCallback, useMemo } = React;

// React loaded from CDN

// ─── 2026 OFFICIAL LOS ────────────────────────────────────────────────────────
// ─── LEVEL-AWARE DATA GETTERS ─────────────────────────────────────────────────
function getActiveLOS(level){return level==="2"?LOS_L2:level==="3"?LOS_L3:LOS;}
function getActiveMisconceptions(level){return level==="2"?MISCONCEPTIONS_L2:level==="3"?MISCONCEPTIONS_L3:MISCONCEPTIONS;}
function getActiveFormulas(level){return level==="2"?FORMULAS_L2:level==="3"?FORMULAS_L3:FORMULAS;}
function getActivePowerNotes(level){return level==="2"?POWER_NOTES_L2:level==="3"?POWER_NOTES_L3:POWER_NOTES;}
function getActiveTopicMap(level){const los=getActiveLOS(level);const m={};Object.entries(los).forEach(([t,{weight,modules}])=>{m[t]={weight,subtopics:Object.keys(modules)};});return m;}

// ─── STORAGE (localStorage + optional Supabase sync) ─────────────────────────
const BACKUP_KEY = "cfa_backup_v7";

// Supabase — hardcoded shared backend
const SUPABASE_URL = "https://uucxyuqxqjpbxecemdvf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1Y3h5dXF4cWpwYnhlY2VtZHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MDY3MDcsImV4cCI6MjA5NzM4MjcwN30.5JkNrudEoiKSE85gaDA2jfgVb6ZEgSUBpjoRVbVAlv4";
const SB_CFG = {url: SUPABASE_URL, key: SUPABASE_KEY};
const AI_PROXY_URL = `${SUPABASE_URL}/functions/v1/ai-proxy`;

// localStorage-based storage (primary — works in real browsers with no size limits)
async function storageGet(key){
  try{
    const v=localStorage.getItem("cfa_"+key);
    return v?JSON.parse(v):null;
  }catch{return null;}
}
async function storageSet(key,val){
  try{
    localStorage.setItem("cfa_"+key,JSON.stringify(val));
    return true;
  }catch(e){
    // localStorage quota exceeded — try clearing non-essential keys
    try{
      ["cfa_cfa_qdb_v7","cfa___health_check__","cfa_cfa_focus_cache"].forEach(k=>{try{localStorage.removeItem(k);}catch{}});
      localStorage.setItem("cfa_"+key,JSON.stringify(val));
      return true;
    }catch{return false;}
  }
}
async function storageHealth(){
  try{localStorage.setItem("__hc__","1");localStorage.removeItem("__hc__");return true;}catch{return false;}
}

// Auth helpers — email + password hashed to a stable user_id (no Supabase Auth needed)
function getStoredAuth(){ try{ return JSON.parse(localStorage.getItem("cfa_auth")||"null"); }catch{ return null; } }
function saveAuth(auth){ try{ localStorage.setItem("cfa_auth", JSON.stringify(auth)); }catch{} }
function clearAuth(){ try{ localStorage.removeItem("cfa_auth"); }catch{} }

async function supabaseForgotPassword(cfg, email){
  try{
    const res=await fetch(`${cfg.url}/auth/v1/recover`,{
      method:"POST",
      headers:{"Content-Type":"application/json","apikey":cfg.key},
      body:JSON.stringify({email})
    });
    return res.ok||res.status===200;
  }catch{return false;}
}

async function deriveUserId(email, password){
  const text = email.toLowerCase().trim() + ":" + password;
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,"0")).join("");
}

async function supabaseCheckAccount(cfg, userId){
  try{
    const res=await fetch(`${cfg.url}/rest/v1/sessions?user_id=eq.${encodeURIComponent(userId)}&limit=1`,{
      headers:{"apikey":cfg.key,"Authorization":`Bearer ${cfg.key}`}
    });
    const rows=await res.json();
    return Array.isArray(rows)&&rows.length>0;
  }catch{return false;}
}

async function supabaseCreateAccount(cfg, userId, email){
  try{
    const res=await fetch(`${cfg.url}/rest/v1/sessions`,{
      method:"POST",
      headers:{"apikey":cfg.key,"Authorization":`Bearer ${cfg.key}`,"Content-Type":"application/json","Prefer":"resolution=merge-duplicates,return=minimal"},
      body:JSON.stringify({user_id:userId,data:JSON.stringify({type:"account",email,created_at:new Date().toISOString()}),updated_at:new Date().toISOString()})
    });
    if(!res.ok){const errText=await res.text().catch(()=>"");return {ok:false,status:res.status,error:errText};}
    return {ok:true,status:res.status};
  }catch(e){return {ok:false,status:0,error:String(e)};}
}

function loginWithGoogle(){
  const redirectTo=window.location.origin+window.location.pathname;
  window.location.href=`${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`;
}

// Supabase sync — saves entire data blob as one row, keyed to authenticated user
async function supabaseSync(cfg, history, srDeck, usageStats={}, auth=null){
  if(!cfg||!cfg.url||!cfg.key) return false;
  const userId = auth?.id || "anon";
  const bearer = auth?.accessToken || cfg.key;
  try{
    const payload={
      user_id: userId,
      data:JSON.stringify({version:3,history,srDeck,usageStats,savedAt:new Date().toISOString()}),
      updated_at:new Date().toISOString()
    };
    const res=await fetch(`${cfg.url}/rest/v1/sessions`,{
      method:"POST",
      headers:{
        "apikey":cfg.key,
        "Authorization":`Bearer ${bearer}`,
        "Content-Type":"application/json",
        "Prefer":"resolution=merge-duplicates,return=minimal"
      },
      body:JSON.stringify(payload)
    });
    if(!res.ok){ const e=await res.text().catch(()=>""); console.error("Supabase sync failed:",res.status,e); return false; }
    return true;
  }catch(e){ console.error("Supabase sync error:",e); return false; }
}
async function supabaseLoad(cfg, auth=null){
  if(!cfg||!cfg.url||!cfg.key) return null;
  const userId = auth?.id || "anon";
  const bearer = auth?.accessToken || cfg.key;
  try{
    const res=await fetch(`${cfg.url}/rest/v1/sessions?user_id=eq.${encodeURIComponent(userId)}&order=updated_at.desc&limit=1`,{
      headers:{"apikey":cfg.key,"Authorization":`Bearer ${bearer}`}
    });
    const rows=await res.json();
    if(rows&&rows.length>0&&rows[0].data) return JSON.parse(rows[0].data);
    return null;
  }catch{return null;}
}

async function submitFeedback(cfg, {userId="anon", rating=0, category="General", message=""}){
  if(!cfg||!cfg.url||!cfg.key) return false;
  try{
    const res=await fetch(`${cfg.url}/rest/v1/feedback`,{
      method:"POST",
      headers:{"apikey":cfg.key,"Authorization":`Bearer ${cfg.key}`,"Content-Type":"application/json","Prefer":"return=minimal"},
      body:JSON.stringify({user_id:userId,rating,category,message:message.trim(),created_at:new Date().toISOString()})
    });
    return res.ok;
  }catch{return false;}
}

// ─── SM-2 ─────────────────────────────────────────────────────────────────────
function sm2Update(card,correct){
  let{interval=0,repetitions=0,ef=2.5}=card;
  if(correct){repetitions+=1;interval=SM2_INTERVALS[Math.min(repetitions-1,SM2_INTERVALS.length-1)];ef=Math.max(1.3,ef+0.1);}
  else{repetitions=0;interval=1;ef=Math.max(1.3,ef-0.2);}
  return{...card,interval,repetitions,ef,nextReview:localDateKey(new Date(Date.now()+interval*86400000))};
}
function localDateKey(date){const d=date||new Date();return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;}
function getWeekMondayKey(){const d=new Date();const day=d.getDay();const diff=day===0?-6:1-day;const mon=new Date(d.getFullYear(),d.getMonth(),d.getDate()+diff);return localDateKey(mon);}
function getDueCards(srDeck){const today=localDateKey();return Object.values(srDeck).filter(c=>c.nextReview<=today);}
function getLeeches(srDeck){return Object.values(srDeck).filter(c=>(c.wrongCount||0)>=4);}
function getForgettingCurve(srDeck){
  const today=new Date();
  const upcoming={tomorrow:0,in3days:0,in7days:0};
  Object.values(srDeck).forEach(c=>{
    if(!c.nextReview)return;
    const daysUntil=Math.ceil((new Date(c.nextReview)-today)/86400000);
    if(daysUntil===1)upcoming.tomorrow++;
    else if(daysUntil<=3)upcoming.in3days++;
    else if(daysUntil<=7)upcoming.in7days++;
  });
  return upcoming;
}

// ─── QUESTION DEDUPLICATION ──────────────────────────────────────────────────
const QDB_FRESHNESS_MS = 21 * 24 * 60 * 60 * 1000; // repeat allowed after 21 days
function hashQuestion(q){
  return q.question.slice(0,120).toLowerCase().replace(/\s+/g," ").trim();
}
function filterNewQuestions(questions,qdb){
  const now=Date.now();
  return questions.filter(q=>{
    const h=hashQuestion(q);
    if(!qdb[h]) return true;
    return (now-qdb[h].seen)>QDB_FRESHNESS_MS; // seen >7 days ago → allow repeat
  });
}
function addToQDB(questions,qdb){
  const updated={...qdb};
  questions.forEach(q=>{const h=hashQuestion(q);updated[h]={seen:Date.now(),topic:q._topic,subtopic:q._subtopic};});
  // Cap at 2000 entries — prune oldest to prevent unbounded growth
  const entries=Object.entries(updated);
  if(entries.length>2000){
    entries.sort((a,b)=>a[1].seen-b[1].seen);
    const pruned={};
    entries.slice(-2000).forEach(([k,v])=>{pruned[k]=v;});
    return pruned;
  }
  return updated;
}

// ─── PROMPTS ─────────────────────────────────────────────────────────────────
// Analyses SR deck + session history for a topic/module to build personalised prompt context
function buildDynamicContext(topic, module, srDeck, levelHistory){
  // SR cards with 2+ mistakes in this module — sorted worst first
  const moduleCards=Object.values(srDeck)
    .filter(c=>c.topic===topic&&c.subtopic===module&&(c.wrongCount||0)>=2)
    .sort((a,b)=>(b.wrongCount||0)-(a.wrongCount||0));

  // Deduplicate LOS and misconceptions from those cards
  const weakLOS=[...new Set(moduleCards.map(c=>c.los_tested).filter(Boolean))].slice(0,4);
  const userMisconceptions=[...new Set(moduleCards.map(c=>c.misconception_targeted).filter(Boolean))].slice(0,4);

  // Timing signal from up to 5 recent sessions for this module
  // Uses avgSecsPerQ (stored per session) or falls back to timeTaken/total
  const recent=levelHistory.filter(h=>h.topic===topic&&h.subtopic===module&&h.total>=3).slice(0,5);
  let timingSignal=null;
  if(recent.length>=2){
    const avgSecs=recent.reduce((s,h)=>s+(h.avgSecsPerQ||(h.timeTaken||0)/(h.total||1)),0)/recent.length;
    const avgAcc=recent.reduce((s,h)=>s+(h.pct||0),0)/recent.length;
    if(avgSecs<45&&avgAcc<72) timingSignal="rushing";       // fast but inaccurate
    else if(avgSecs>120&&avgAcc<72) timingSignal="struggling"; // slow and inaccurate
  }

  return{weakLOS,userMisconceptions,timingSignal,hasData:moduleCards.length>0};
}

function buildQuestionPrompt(topic,module,difficulty,count,level="1",losData=null,miscData=null,dynCtx=null,multiModuleList=null){
  const activeLos=losData||LOS;
  const activeMisc=miscData||MISCONCEPTIONS;
  // multiModuleList=[{t,st},...] when user selected multiple topics/modules
  const isMulti=multiModuleList&&multiModuleList.length>1;
  const losStatements=isMulti
    ? multiModuleList.flatMap(({t:mt,st:ms})=>(activeLos[mt]?.modules[ms]||[]).map(l=>`[${ms}] ${l}`))
    : activeLos[topic]?.modules[module]||[];
  const moduleHeader=isMulti
    ? (()=>{const ts=[...new Set(multiModuleList.map(x=>x.t))];return ts.length===1?`Topic: ${ts[0]} | Modules: ${multiModuleList.map(x=>x.st).join(", ")}`:`Topics/Modules: ${multiModuleList.map(x=>x.st).join(", ")}`;})()
    : `Topic: ${topic} | Module: ${module}`;
  const verbsForDiff=LOS_VERB_DIFFICULTY[difficulty];

  // Prioritise weak LOS from SR errors, then difficulty-verb-matched LOS, then rest
  const weakLOSTexts=dynCtx?.weakLOS||[];
  const verbMatched=losStatements.filter(l=>verbsForDiff.some(v=>l.toLowerCase().startsWith(v)||l.toLowerCase().includes(` ${v} `)));
  const weakMatched=losStatements.filter(l=>weakLOSTexts.some(w=>l.slice(0,50)===w.slice(0,50)||w.slice(0,50)===l.slice(0,50)));
  const remaining=losStatements.filter(l=>!weakMatched.includes(l));
  const orderedLOS=[...weakMatched,...remaining.filter(l=>verbMatched.includes(l)),...remaining.filter(l=>!verbMatched.includes(l))];
  const allLOS=(orderedLOS.length?orderedLOS:losStatements).slice(0,count+2);

  const losText=allLOS.map((l,i)=>{
    const isWeak=weakLOSTexts.some(w=>l.slice(0,50)===w.slice(0,50)||w.slice(0,50)===l.slice(0,50));
    return `${i+1}. ${isWeak?`⚠ [MISSED] `:""}${l}`;
  }).join("\n");

  // Misconceptions: user's actual proven errors first, then generic topic-level ones
  const genericMiscs=(activeMisc[topic]||[]).slice(0,3);
  const allMiscs=dynCtx?.userMisconceptions?.length
    ?[...dynCtx.userMisconceptions.slice(0,3),...genericMiscs.slice(0,2)]
    :genericMiscs;
  const misconceptions=allMiscs.join("; ");

  // Personalised section injected into the prompt when we have SR history
  let personalisedSection="";
  if(dynCtx?.hasData){
    const parts=[];
    if(weakLOSTexts.length){
      const targetCount=Math.min(weakLOSTexts.length,Math.ceil(count*0.6));
      parts.push(`STUDENT BLIND SPOTS — repeated errors in this module. Weight at least ${targetCount} of your ${count} questions toward the ⚠ [MISSED] LOS above.`);
    }
    if(dynCtx.userMisconceptions.length){
      parts.push(`PROVEN student errors to exploit in distractors:\n${dynCtx.userMisconceptions.map(m=>`• ${m}`).join("\n")}`);
    }
    if(dynCtx.timingSignal==="rushing"){
      parts.push(`Timing: student RUSHES (fast but inaccurate). Add subtle qualifiers ('EXCEPT', 'LEAST likely', specific conditions) that require careful reading to distinguish.`);
    }else if(dynCtx.timingSignal==="struggling"){
      parts.push(`Timing: student STRUGGLES (slow and inaccurate). Build each question from its core concept first — avoid multi-step chains, focus one LOS per question.`);
    }
    if(parts.length) personalisedSection=`\n\n[PERSONALISED]\n${parts.join("\n")}`;
  }

  const levelGuidance=level==="2"
    ?`CFA Level 2 format: EVERY question must open with a 2–3 sentence mini-vignette/scenario (company, analyst, or portfolio context). Test deep analytical application, not recall. Complexity: ${difficulty==="Easy"?"apply a concept to the given scenario":difficulty==="Medium"?"multi-step calculation or integrated judgment":"evaluate competing interpretations or reconcile conflicting data"}.`
    :level==="3"
    ?`CFA Level 3 format: Frame every question around a PORTFOLIO MANAGEMENT decision — client objectives, IPS constraints, asset allocation, or risk management. Questions should require the candidate to recommend or justify, not just recall. Complexity: ${difficulty==="Easy"?"straightforward client-context application":difficulty==="Medium"?"trade-off analysis with supporting rationale":"multi-constraint portfolio construction or behavioural bias evaluation"}.`
    :`Difficulty: ${difficulty==="Easy"?"recall/definition":difficulty==="Medium"?"apply formula to scenario with numbers":"multi-step analysis or nuanced judgment"}`;

  return `CFA L${level} question generator. ${moduleHeader} | Difficulty: ${difficulty} | Generate: ${count} questions${isMulti?" spread across ALL listed modules. Each question must clearly specify which module it covers.":""}.

LOS (test these):
${losText}

Misconceptions to use in wrong options: ${misconceptions}

${levelGuidance}${personalisedSection}

Return ONLY a JSON array, no markdown:
[{"id":1,"question":"...","options":{"A":"...","B":"...","C":"..."},"answer":"A","explanation":"...","concept":"3-5 word tag","los_tested":"LOS text","misconception_targeted":"error exploited","distractor_explanations":{"B":"1 sentence why B is wrong","C":"1 sentence why C is wrong"},"calc_steps":{"applicable":true,"worksheet":"TVM","keys":["[2ND]","[CLR TVM]","5","[N]","6","[I/Y]","80","[PMT]","1000","[FV]","[CPT]","[PV]"],"result":"−1,084.25"}}]

Rules:
- 3 options only (A,B,C). Each wrong option exploits a misconception. Spread questions across different LOS.
- Add "distractor_explanations" with one sentence per wrong option explaining the specific error it tests (e.g. "Divides by equity multiplier instead of multiplying").
- "calc_steps" (REQUIRED in every question): If the question can be solved faster with a BA II Plus calculator (TVM bond pricing, annuity PV/FV, YTM solve, NPV/IRR, EAR/APR conversion via ICONV, loan payment/amortization), set applicable:true, worksheet to "TVM"|"CF"|"ICONV"|"Amort", and keys to the exact keystroke sequence using THIS question's specific numbers — e.g. for a 5-year 8% coupon bond at YTM 6%: ["[2ND]","[CLR TVM]","5","[N]","6","[I/Y]","80","[PMT]","1000","[FV]","[CPT]","[PV]"]. Set result to the signed numeric answer (e.g. "−1,084.25"). For conceptual/qualitative questions with no numeric shortcut, set applicable:false and omit worksheet/keys/result.
- CRITICAL for numerical questions: FIRST compute the exact correct answer (show full precision), THEN include that exact value as one of the options. NEVER describe any option as "closest", "nearest", "best approximation", or "closest when accounting for rounding" — if you use such language in the explanation, the question will be discarded. If rounding is needed for a clean option, round the answer FIRST, then build all three options around that rounded figure. The correct computed result must appear verbatim as exactly one of A, B, or C — no approximations. Wrong options must use recognisable formula errors (wrong rate, wrong periods, missing compounding step).
- The "answer" field must match the letter whose option text equals the correct computed result. The explanation MUST begin with "Correct: [letter]. " (e.g. "Correct: B. Sample variance = 30/4 = 7.5") — questions whose explanation does not start with "Correct: A/B/C" will be discarded. The explanation must be a single clean final solution — NO chain-of-thought, NO intermediate recalculations, NO self-corrections, NO alternative attempts, NO "reinterpreting"/"however" pivots, NO phrases like "recalc needed", "revising", "reinspecting" or "incorrect" near the correct answer value. Double-check units before finalizing (basis points vs. percent vs. decimal) — the final numeric value stated in the explanation MUST equal, in the same units, the option text marked correct; mismatched units (e.g. explanation says "250 basis points" but the correct option reads "2.5%") will cause the question to be discarded.${level!=="1"?" Every question must include realistic scenario context (named entity, numbers, specific situation).":" Ethics=scenario with named person+Standard number. Quant Medium/Hard=specific numbers."}`;
}

// Expand compact JSON keys returned by optimised prompt
function buildFSAStatementPrompt(subtopic, difficulty, level="1"){
  return `You are a CFA Level ${level} exam writer. Create an FSA financial statement analysis problem.

Generate a JSON object with this exact structure:
{
  "company": "fictional company name",
  "year": 2024,
  "scenario": "2-3 sentence business context",
  "statements": {
    "income_statement": { "Revenue": 0, "COGS": 0, "Gross_Profit": 0, "Operating_Expenses": 0, "EBIT": 0, "Interest_Expense": 0, "EBT": 0, "Tax_Expense": 0, "Net_Income": 0 },
    "balance_sheet": { "Cash": 0, "Accounts_Receivable": 0, "Inventory": 0, "Total_Current_Assets": 0, "PPE_Net": 0, "Total_Assets": 0, "Accounts_Payable": 0, "Short_Term_Debt": 0, "Total_Current_Liabilities": 0, "Long_Term_Debt": 0, "Total_Equity": 0 },
    "supplemental": { "Shares_Outstanding": 0, "Dividends_Per_Share": 0, "Depreciation": 0, "CapEx": 0 }
  },
  "questions": [
    { "id": 1, "question": "specific ratio/analysis question based on the statement", "options": {"A": "option", "B": "option", "C": "option"}, "answer": "A", "explanation": "step-by-step calculation showing the work", "concept": "ratio name", "los_tested": "relevant LOS" },
    { "id": 2, "question": "IFRS/GAAP or accounting treatment question", "options": {"A": "option", "B": "option", "C": "option"}, "answer": "B", "explanation": "explanation", "concept": "concept", "los_tested": "LOS" },
    { "id": 3, "question": "analysis/interpretation question", "options": {"A": "option", "B": "option", "C": "option"}, "answer": "C", "explanation": "explanation", "concept": "concept", "los_tested": "LOS" }
  ]
}

Topic focus: ${subtopic}. Difficulty: ${difficulty}.
Make the numbers realistic for a mid-size company. All numbers internally consistent. Output ONLY valid JSON.`;
}

function formatStatements(raw){
  const is=raw.statements?.income_statement||{};
  const bs=raw.statements?.balance_sheet||{};
  const sup=raw.statements?.supplemental||{};
  const fmt=(n)=>n!=null?`$${Number(n).toLocaleString()}M`:"—";
  return `INCOME STATEMENT: Revenue ${fmt(is.Revenue)} | COGS ${fmt(is.COGS)} | Gross Profit ${fmt(is.Gross_Profit)} | OpEx ${fmt(is.Operating_Expenses)} | EBIT ${fmt(is.EBIT)} | Interest ${fmt(is.Interest_Expense)} | Net Income ${fmt(is.Net_Income)}\nBALANCE SHEET: Cash ${fmt(bs.Cash)} | AR ${fmt(bs.Accounts_Receivable)} | Inventory ${fmt(bs.Inventory)} | Current Assets ${fmt(bs.Total_Current_Assets)} | Total Assets ${fmt(bs.Total_Assets)} | AP ${fmt(bs.Accounts_Payable)} | Curr Liab ${fmt(bs.Total_Current_Liabilities)} | LT Debt ${fmt(bs.Long_Term_Debt)} | Total Equity ${fmt(bs.Total_Equity)}\nSUPP: Shares ${fmt(sup.Shares_Outstanding)} | DPS $${sup.Dividends_Per_Share||0} | D&A ${fmt(sup.Depreciation)} | CapEx ${fmt(sup.CapEx)}`;
}

const RELATED_MODULES={
  "Financial Statement Analysis":[["Income Statement Analysis","Financial Ratios"],["Cash Flow Statement","Financial Ratios"],["Inventories & Long-Lived Assets","Income Taxes & Long-Term Liabilities"]],
  "Fixed Income":[["Bond Features & Pricing","Yield Measures & Duration"],["Yield Measures & Duration","Credit Analysis"]],
  "Equity":[["Equity Valuation – DDM & Multiples","Industry & Company Analysis"],["Market Efficiency","Equity Valuation – DDM & Multiples"]],
  "Derivatives":[["Forwards & Futures","Options – Payoffs & Strategies"],["Options – Payoffs & Strategies","Swaps"]],
  "Corporate Issuers":[["Capital Structure & Leverage","Capital Investments & Allocation"],["Working Capital Management","Capital Structure & Leverage"]],
  "Portfolio Management":[["Portfolio Risk & Return","CAPM & Factor Models"],["CAPM & Factor Models","Portfolio Planning & Construction"]],
};
function getRelatedModules(topic){return RELATED_MODULES[topic]||[];}

function generateStudyPlan(history, srDeck, examDate, daysLeft){
  const topics=Object.entries(LOS).map(([name,{weight,modules}])=>{
    const topicSessions=history.filter(h=>h.topic===name);
    const accuracy=topicSessions.length?topicSessions.reduce((s,h)=>s+(h.pct||0),0)/topicSessions.length:0;
    const adjustedWeight=weight*(topicSessions.length===0?1.5:accuracy<60?1.3:accuracy>80?0.8:1.0);
    return{name,weight,adjustedWeight,modules:Object.keys(modules),accuracy,totalModules:Object.keys(modules).length};
  });
  const studyDays=Math.min(daysLeft-3,55);
  const plan=[];
  const totalWeight=topics.reduce((s,t)=>s+t.adjustedWeight,0);
  let dayIdx=0;
  for(const t of topics.sort((a,b)=>b.adjustedWeight-a.adjustedWeight)){
    const daysForTopic=Math.max(1,Math.round((t.adjustedWeight/totalWeight)*studyDays*0.7));
    for(let d=0;d<daysForTopic&&dayIdx<studyDays;d++,dayIdx++){
      const mod=t.modules[d%t.modules.length];
      plan.push({dayNum:dayIdx+1,date:new Date(Date.now()+dayIdx*86400000),topic:t.name,module:mod,count:10,difficulty:t.accuracy<60?"Easy":"Medium",type:"learn"});
    }
  }
  while(dayIdx<studyDays){
    const weakTopic=topics.sort((a,b)=>a.accuracy-b.accuracy)[0];
    plan.push({dayNum:dayIdx+1,date:new Date(Date.now()+dayIdx*86400000),topic:weakTopic.name,module:weakTopic.modules[0],count:10,difficulty:"Hard",type:"review"});
    dayIdx++;
  }
  for(let i=0;i<3&&dayIdx<daysLeft;i++,dayIdx++){
    plan.push({dayNum:dayIdx+1,date:new Date(Date.now()+dayIdx*86400000),topic:"Ethics",module:"Code of Ethics & Standards",count:10,difficulty:"Hard",type:"ethics"});
  }
  return plan;
}

function buildVignettePrompt(topic,module,difficulty,vigCount,subtopic2=null,losData=null,level="1"){
  const los=((losData||LOS)[topic]?.modules[module]||[]).slice(0,4).map((l,i)=>`${i+1}. ${l}`).join("\n");
  return `You are a CFA Level ${level} exam writer. Generate ${vigCount} item set(s) for ${topic} — ${module} at ${difficulty} difficulty.

Each item set = one scenario (100-150 words) + exactly 3 multiple-choice questions testing that scenario.

Official LOS to anchor to:
${los}

Output a JSON array of item sets:
[{
  "scenario": "100-150 word business/investment scenario with a named person, firm, and specific situation",
  "questions": [
    {
      "q": "Question text referencing the scenario",
      "o": {"A":"option","B":"option","C":"option"},
      "a": "A|B|C",
      "e": "Explanation referencing scenario details",
      "c": "Concept name",
      "l": "LOS statement tested",
      "m": "Misconception targeted"
    }
  ]
}]

Rules:
- Each question must REQUIRE reading the scenario (no standalone questions)
- Distractors must be plausible and target common misconceptions
- Difficulty ${difficulty}: ${difficulty==="Easy"?"recall/identify":difficulty==="Medium"?"apply/calculate":"evaluate/synthesize across multiple LOS"}
- Output ONLY valid JSON, no markdown${subtopic2?`\n- The vignette MUST require analysis of BOTH ${module} AND ${subtopic2} — integrate them naturally into a single realistic scenario`:""}`;
}

function flattenVignettes(rawVignettes,topic,module){
  const arr=Array.isArray(rawVignettes)?rawVignettes:(rawVignettes?.vignettes||[]);
  const qs=[];
  arr.forEach((v,vi)=>{
    const scenario=v.scenario||v.vignette||"";
    (v.questions||[]).forEach((q,qi)=>{
      qs.push({
        id:`vig_${vi}_${qi}_${Date.now()}`,
        question:scenario?`SCENARIO:\n${scenario}\n\nQUESTION: ${q.q||q.question||""}`:q.q||q.question||"",
        options:q.o||q.options||{},
        answer:q.a||q.answer||"A",
        explanation:q.e||q.explanation||"",
        concept:q.c||q.concept||"",
        los_tested:q.l||q.los_tested||"",
        misconception_targeted:q.m||q.misconception_targeted||"",
        _topic:topic,_subtopic:module,_isVignette:true,_vignetteIdx:vi,_qIdx:qi,
      });
    });
  });
  return qs;
}

function expandQuestionKeys(qs){
  // Index-prefix the id so duplicate/colliding ids from the AI response never
  // alias two distinct questions to the same `answers[id]` slot mid-session.
  return qs.map((q,i)=>({
    id:`${i}_${q.id??i}`,
    question:q.q||q.question||"",
    options:q.o||q.options||{},
    answer:q.a||q.answer||"A",
    explanation:q.e||q.explanation||"",
    concept:q.c||q.concept||"",
    los_tested:q.l||q.los_tested||"",
    misconception_targeted:q.m||q.misconception_targeted||"",
  }));
}

const FOCUS_PROMPT=`You are a CFA Level 1 study coach. Based on this student's data, recommend exactly 3 modules to focus on TODAY.

History (recent first): {history}
Days until exam: {days}
Untouched modules: {gaps}
SR due today: {srDue}
Leech cards: {leeches}
LOS never tested: {losGaps}
Recent trends: {trends}

Return ONLY valid JSON array:
[{"topic":"...","module":"...","difficulty":"Easy|Medium|Hard","reason":"cite specific data","urgency":"high|medium|low","count":10,"mode":"guided"}]

Priority: leeches > SR due > low accuracy on high-weight topics > untouched LOS in high-weight modules
High-weight: Ethics(15%), FSA(13%), Equity(11%), Fixed Income(11%)
If <30 days: only high-weight weak topics, Hard difficulty
reason MUST cite specific numbers`;

// ─── ANALYTICS ───────────────────────────────────────────────────────────────
const fmt=s=>`${Math.floor(s/60)}:${(s%60).toString().padStart(2,"0")}`;
function getDaysToExam(){return Math.max(0,Math.ceil((EXAM_DATE-new Date())/86400000));}

function getLOSMastery(history,topic,module){
  const losStatements=LOS[topic]?.modules[module]||[];
  const sessions=history.filter(h=>h.topic===topic&&h.subtopic===module);
  const testedLOS=new Set(sessions.flatMap(s=>s.wrongs?.map(w=>w.los_tested)||[]));
  return{total:losStatements.length,tested:Math.min(sessions.length*2,losStatements.length),untested:Math.max(0,losStatements.length-Math.min(sessions.length*2,losStatements.length))};
}

function getWrongAnswerPatterns(history){
  const patterns={};
  history.forEach(session=>{
    (session.wrongs||[]).forEach(w=>{
      if(!w.userAnswer||!w.answer)return;
      const key=`${w.concept||session.subtopic}`;
      if(!patterns[key])patterns[key]={concept:key,topic:session.topic,wrongChoice:w.userAnswer,correctChoice:w.answer,count:0,examples:[]};
      patterns[key].count++;
      if(patterns[key].examples.length<2)patterns[key].examples.push(w.question?.slice(0,80));
    });
  });
  return Object.values(patterns).filter(p=>p.count>=2).sort((a,b)=>b.count-a.count).slice(0,5);
}

function computeCalibration(qs,ans,confidenceLog){
  const log=[];
  qs.forEach(q=>{const conf=confidenceLog[q.id];if(!conf)return;log.push({conf,correct:ans[q.id]===q.answer,concept:q.concept||""});});
  return log;
}

// ── Item 10: Deterministic option-order fingerprint per user ─────────────────
function fingerprintQuestions(qs, userId) {
  if (!qs.length) return qs;
  // Guarantee unique ids even when cache batches were concatenated across sessions —
  // a duplicate id makes answers[id] from one question leak onto a different question.
  const seenIds = new Set();
  qs = qs.map((q, qi) => {
    if (q.id == null || seenIds.has(q.id)) {
      const id = `${qi}_${q.id ?? qi}`;
      seenIds.add(id);
      return { ...q, id };
    }
    seenIds.add(q.id);
    return q;
  });
  if (!userId) return qs;
  const seed = userId.split('').reduce((s, c, i) => (s * 31 + c.charCodeAt(0) * (i + 1)) & 0xfffffff, 0);
  return qs.map((q, qi) => {
    if (!q.options || !q.answer) return q;
    const letters = Object.keys(q.options).sort();
    if (letters.length < 2) return q;
    const perm = letters.slice();
    for (let i = perm.length - 1; i > 0; i--) {
      const j = ((seed ^ (qi * 2654435761 + i * 6364136223)) >>> 0) % (i + 1);
      [perm[i], perm[j]] = [perm[j], perm[i]];
    }
    const newOptions = {}, oldToNew = {};
    perm.forEach((oldL, i) => { const newL = letters[i]; newOptions[newL] = q.options[oldL]; oldToNew[oldL] = newL; });
    const newAnswer = oldToNew[q.answer] || q.answer;
    const newExp = (q.explanation || '').replace(/^(Correct:\s*)([A-C])\b/, (_, pre, l) => `${pre}${oldToNew[l] || l}`);
    const newDE = q.distractor_explanations
      ? Object.fromEntries(Object.entries(q.distractor_explanations).map(([k, v]) => [oldToNew[k] || k, v]))
      : undefined;
    return { ...q, options: newOptions, answer: newAnswer, explanation: newExp, ...(newDE && { distractor_explanations: newDE }) };
  });
}

// ── Item 5: Confidence calibration insights ───────────────────────────────────
function getConfidenceInsights(history) {
  const entries = history.flatMap(s => s.confidenceData || []);
  if (entries.length < 10) return null;
  const isHighConf = e => { const c = e.conf?.c; if (!c) return false; return typeof c === 'number' ? c >= 2 : (typeof c === 'string' && c !== 'low' && c !== '1'); };
  const highConf = entries.filter(isHighConf);
  if (highConf.length < 5) return null;
  const wrongHigh = highConf.filter(e => !e.correct).length;
  const rate = Math.round((wrongHigh / highConf.length) * 100);
  const cMap = {};
  highConf.filter(e => !e.correct).forEach(e => { if (e.concept) cMap[e.concept] = (cMap[e.concept] || 0) + 1; });
  const topMiss = Object.entries(cMap).sort((a, b) => b[1] - a[1])[0]?.[0];
  return { rate, highConfCount: highConf.length, topMiss };
}

// ── Item 8: Canvas rounded rect helper ───────────────────────────────────────
function _rrFill(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y); ctx.lineTo(x+w-r, y); ctx.arcTo(x+w, y, x+w, y+r, r);
  ctx.lineTo(x+w, y+h-r); ctx.arcTo(x+w, y+h, x+w-r, y+h, r);
  ctx.lineTo(x+r, y+h); ctx.arcTo(x, y+h, x, y+h-r, r);
  ctx.lineTo(x, y+r); ctx.arcTo(x, y, x+r, y, r);
  ctx.closePath(); ctx.fill();
}

function getSessionFatigue(history){
  const byLength=history.filter(h=>h.total>=5);
  if(byLength.length<5)return null;
  const short=byLength.filter(h=>h.total<=10);
  const long=byLength.filter(h=>h.total>10);
  if(short.length<2||long.length<2)return null;
  const shortAvg=Math.round(short.reduce((s,h)=>s+(h.pct||0),0)/short.length);
  const longAvg=Math.round(long.reduce((s,h)=>s+(h.pct||0),0)/long.length);
  const drop=shortAvg-longAvg;
  if(drop<10)return null;
  return{shortAvg,longAvg,drop,optimalCount:10};
}

function getSessionQuality(session){
  if(!session)return null;
  const accuracyScore=session.pct;
  const speedScore=session.total&&session.timeTaken?Math.min(100,Math.round((TIME_PER_Q*session.total/session.timeTaken)*100)):100;
  const difficultyBonus={Easy:0,Medium:10,Hard:20}[session.difficulty]||0;
  const quality=Math.min(100,Math.round((accuracyScore*0.6+speedScore*0.3)+difficultyBonus));
  return{quality,accuracyScore,speedScore,difficultyBonus,label:quality>=80?"Excellent":quality>=65?"Good":quality>=50?"Fair":"Needs work"};
}

function getModuleReadiness(history,losData=null){
  const now=Date.now();
  const activeLos=losData||LOS;
  return Object.entries(activeLos).map(([topic,{weight,modules}])=>{
    const moduleNames=Object.keys(modules);
    const sessions=history.filter(h=>h.topic===topic);
    const modulesCovered=[...new Set(sessions.map(h=>h.subtopic))];
    const coverage=modulesCovered.length/moduleNames.length;
    let wCorrect=0,wTotal=0;
    sessions.forEach(s=>{const ageDays=(now-s.id)/86400000;const w=ageDays<=7?3:ageDays<=30?2:1;const sc=s.score??s.correct??Math.round(((s.pct||0)/100)*(s.total||0));wCorrect+=sc*w;wTotal+=(s.total||0)*w;});
    const accuracy=wTotal>0?Math.round((wCorrect/wTotal)*100):null;
    const recent3=sessions.slice(0,3),prev3=sessions.slice(3,6);
    const r3avg=recent3.length?recent3.reduce((s,h)=>s+(h.pct||0),0)/recent3.length:null;
    const p3avg=prev3.length?prev3.reduce((s,h)=>s+(h.pct||0),0)/prev3.length:null;
    const trend=(r3avg!==null&&p3avg!==null)?(r3avg-p3avg>3?"up":r3avg-p3avg<-3?"down":"flat"):null;
    const trendDelta=r3avg!==null&&p3avg!==null?Math.round(r3avg-p3avg):null;
    const totalQs=sessions.reduce((s,h)=>s+(h.total||0),0);
    const reliable=totalQs>=10;
    let readiness=0;
    if(accuracy!==null){readiness=Math.round(accuracy*0.55+coverage*100*0.30+Math.min(sessions.length*3,15));if(!reliable)readiness=Math.round(readiness*0.7);}
    readiness=Math.min(99,readiness);
    const untouchedModules=moduleNames.filter(m=>!modulesCovered.includes(m));
    const moduleStats={};
    moduleNames.forEach(m=>{const ms=sessions.filter(h=>h.subtopic===m);moduleStats[m]=ms.length?{pct:Math.round(ms.reduce((s,h)=>s+(h.pct||0),0)/ms.length),sessions:ms.length,totalQs:ms.reduce((s,h)=>s+(h.total||0),0)}:null;});
    // LOS mastery per module
    const losStats={};
    moduleNames.forEach(m=>{losStats[m]=getLOSMastery(history,topic,m);});
    return{topic,weight,modules:moduleNames,modulesCovered,untouchedModules,moduleStats,losStats,sessions:sessions.length,totalQs,accuracy,coverage,readiness,reliable,trend,trendDelta,lastDate:sessions.length?sessions[0].dateKey||null:null,lastSession:sessions.length?new Date(sessions[0].id).toLocaleDateString("en-IN",{day:"numeric",month:"short"}):null};
  });
}

function computeTopicPriority(mr,daysLeft){
  const daysSinceLast=mr.lastDate?Math.max(0,Math.floor((Date.now()-new Date(mr.lastDate+"T00:00:00"))/86400000)):999;
  const examWeightFactor=mr.weight/15;
  const weaknessFactor=mr.sessions===0?0.75:mr.accuracy===null?0.6:(100-mr.accuracy)/100;
  const recencyFactor=daysSinceLast>=999?1.0:daysSinceLast<=1?0.4:daysSinceLast<=3?0.65:daysSinceLast<=7?0.85:daysSinceLast<=14?1.0:1.2;
  const phaseMultiplier=daysLeft<14?(mr.sessions===0?0.5:1.4):daysLeft<30?(mr.sessions===0?0.8:1.2):daysLeft>90?(mr.sessions===0?1.3:1.0):1.0;
  return examWeightFactor*weaknessFactor*recencyFactor*phaseMultiplier;
}

function pickNextSession(moduleReadiness,daysLeft,history=[]){
  const lastTopic=history[0]?.topic;
  const scored=moduleReadiness.map(mr=>({...mr,priority:computeTopicPriority(mr,daysLeft)})).sort((a,b)=>b.priority-a.priority);
  const top=scored.length>1&&scored[0].topic===lastTopic?scored[1]:scored[0];
  if(!top)return null;
  let module=top.untouchedModules?.[0];
  if(!module){const worst=Object.entries(top.moduleStats||{}).filter(([,v])=>v!==null).sort(([,a],[,b])=>(a.pct??100)-(b.pct??100));module=worst[0]?.[0]||top.modules[0];}
  const modPct=top.moduleStats?.[module]?.pct??null;
  const difficulty=modPct===null?"Medium":modPct>=80?"Hard":modPct<50?"Easy":"Medium";
  return{topic:top.topic,module:module||top.modules[0],difficulty,priority:top.priority};
}

function getAdaptiveSuggestions(moduleReadiness,daysLeft,history=[]){
  const lastTopic=history[0]?.topic;
  return moduleReadiness.map(mr=>{
    const priority=computeTopicPriority(mr,daysLeft);
    const days=mr.lastDate?Math.max(0,Math.floor((Date.now()-new Date(mr.lastDate+"T00:00:00"))/86400000)):999;
    let module=mr.untouchedModules?.[0];
    if(!module){const worst=Object.entries(mr.moduleStats||{}).filter(([,v])=>v!==null).sort(([,a],[,b])=>(a.pct??100)-(b.pct??100));module=worst[0]?.[0]||mr.modules[0];}
    if(!module)return null;
    const modPct=mr.moduleStats?.[module]?.pct??null;
    const difficulty=modPct===null?"Medium":modPct>=80?"Hard":modPct<50?"Easy":"Medium";
    const urgency=priority>0.8?"critical":priority>0.5?"high":priority>0.3?"medium":"low";
    let reason;
    if(mr.sessions===0)reason=`Not started yet — ${mr.weight}% of the exam`;
    else if(mr.accuracy!==null&&mr.accuracy<50)reason=`${mr.accuracy}% accuracy — needs work (${mr.weight}% exam weight)`;
    else if(days>14)reason=`Last studied ${days} days ago — forgetting curve active`;
    else if(mr.trend==="down")reason=`Score trending down — reinforce now`;
    else reason=`${mr.weight}% exam weight — consistently high value`;
    return{topic:mr.topic,module,difficulty,urgency,reason,priority};
  }).filter(Boolean).sort((a,b)=>b.priority-a.priority).slice(0,4);
}

function getPredictedScore(moduleReadiness){
  const withData=moduleReadiness.filter(m=>m.accuracy!==null&&m.reliable);
  if(withData.length<3)return null;
  const totalWeight=withData.reduce((s,m)=>s+m.weight,0);
  const score=Math.round(withData.reduce((s,m)=>s+m.accuracy*m.weight,0)/totalWeight);
  // Confidence interval based on session variance
  const variance=Math.round(withData.reduce((s,m)=>{const sessions=[];return s+(m.sessions>2?5:m.sessions>1?10:15);},0)/withData.length);
  return{score,low:Math.max(0,score-variance),high:Math.min(99,score+variance),confidence:Math.min(100,Math.round((withData.length/10)*100)),modulesWithData:withData.length};
}

function getStreak(history){
  if(!history.length)return 0;
  const days=[...new Set(history.map(h=>h.dateKey))].sort().reverse();
  const today=localDateKey(),yesterday=localDateKey(new Date(Date.now()-86400000));
  if(days[0]!==today&&days[0]!==yesterday)return 0;
  const freezes=getStreakFreezes();
  const frozenDates=new Set(freezes.usedDates||[]);
  let streak=1;
  for(let i=1;i<days.length;i++){
    const gap=(new Date(days[i-1])-new Date(days[i]))/86400000;
    if(gap===1){streak++;continue;}
    if(gap===2){
      // Check if the missing day was covered by a freeze
      const missingDate=new Date(days[i]);missingDate.setDate(missingDate.getDate()+1);
      const mk=missingDate.toISOString().slice(0,10);
      if(frozenDates.has(mk)){streak+=2;continue;}
    }
    break;
  }
  return streak;
}

function getLast30DaysActivity(history){
  const counts={};
  for(let i=0;i<30;i++){const d=localDateKey(new Date(Date.now()-i*86400000));counts[d]=0;}
  history.forEach(h=>{if(counts[h.dateKey]!==undefined)counts[h.dateKey]++;});
  return counts;
}

// Effective study time — caps per-question time at 90s to strip idle periods
function getEffectiveTimeSecs(session){
  const total=session.total||0;
  const taken=session.timeTaken||0;
  if(!total)return Math.min(taken,300);
  return Math.min(taken,total*90);
}
function fmtStudyTime(secs){
  const m=Math.round(secs/60);
  if(m<1)return"<1 min";
  if(m<60)return`${m} min`;
  const h=Math.floor(m/60);const r=m%60;
  return r>0?`${h}h ${r}m`:`${h}h`;
}
function getDailyStudyTime(history){
  const byDay={};
  history.forEach(s=>{
    const day=s.dateKey||localDateKey(new Date(s.id));
    byDay[day]=(byDay[day]||0)+getEffectiveTimeSecs(s);
  });
  return byDay;
}
function getWeeklyStudyDays(history){
  const byDay=getDailyStudyTime(history);
  return Array.from({length:7},(_,i)=>{
    const d=new Date(Date.now()-(6-i)*86400000);
    const key=localDateKey(d);
    const label=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()];
    return{key,label,secs:byDay[key]||0,isToday:i===6};
  });
}

function getTopicTrends(history){
  const out={};
  Object.keys(LOS).forEach(t=>{
    const s=history.filter(h=>h.topic===t).slice(0,6);
    if(s.length<2){out[t]=null;return;}
    const r=s.slice(0,3).reduce((a,h)=>a+(h.pct||0),0)/Math.min(3,s.length);
    const p=s.slice(3,6).reduce((a,h)=>a+(h.pct||0),0)/Math.max(1,s.slice(3,6).length);
    out[t]={recent:Math.round(r),prev:Math.round(p),delta:Math.round(r-p)};
  });
  return out;
}

// ─── PASS PROBABILITY ENGINE ─────────────────────────────────────────────────
function getPassProbability(history, moduleReadiness, daysLeft) {
  if (history.length < 3) return null;

  // Weighted accuracy across all sessions (recency-weighted)
  const now = Date.now();
  let wCorrect = 0, wTotal = 0;
  history.forEach(s => {
    const ageDays = (now - s.id) / 86400000;
    const w = ageDays <= 7 ? 3 : ageDays <= 14 ? 2 : 1;
    const sScore = s.score ?? s.correct ?? Math.round(((s.pct||0)/100)*(s.total||0));
    wCorrect += sScore * w; wTotal += (s.total ?? 0) * w;
  });
  const currentAccuracy = wTotal > 0 ? (wCorrect / wTotal) * 100 : 0;

  // Coverage factor: % of exam weight that has been tested
  const totalWeight = 100;
  const coveredWeight = moduleReadiness.reduce((s, m) => s + (m.sessions > 0 ? m.weight : 0), 0);
  const coverageFactor = coveredWeight / totalWeight;

  // Trajectory: improving or declining?
  const recentSessions = history.slice(0, 5);
  const olderSessions = history.slice(5, 10);
  const recentAvg = recentSessions.length ? recentSessions.reduce((s, h) => s + (h.pct||0), 0) / recentSessions.length : currentAccuracy;
  const olderAvg = olderSessions.length ? olderSessions.reduce((s, h) => s + (h.pct||0), 0) / olderSessions.length : recentAvg;
  const trajectory = recentAvg - olderAvg; // positive = improving

  // Time factor: days left relative to what's needed
  // Rough estimate: need ~1 good session per untested module
  const untestedModules = moduleReadiness.reduce((s, m) => s + m.untouchedModules.length, 0);
  const totalModules = moduleReadiness.reduce((s, m) => s + m.modules.length, 0);
  const sessionsNeeded = untestedModules + moduleReadiness.filter(m => m.accuracy !== null && m.accuracy < 70).length * 2;
  const timeFactor = Math.min(1, daysLeft / Math.max(1, sessionsNeeded));

  // Base probability from current accuracy
  // CFA passing threshold ~70%. Map accuracy to pass probability:
  // 80%+ accuracy → ~85% pass probability
  // 70% accuracy → ~60% pass probability
  // 60% accuracy → ~35% pass probability
  // 50% accuracy → ~15% pass probability
  const accuracyProbBase = Math.max(0, Math.min(95,
    currentAccuracy >= 80 ? 70 + (currentAccuracy - 80) * 1.5 :
    currentAccuracy >= 70 ? 45 + (currentAccuracy - 70) * 2.5 :
    currentAccuracy >= 60 ? 20 + (currentAccuracy - 60) * 2.5 :
    currentAccuracy * 0.33
  ));

  // Adjustments
  const coverageAdj = (coverageFactor - 0.5) * 15; // ±7.5 points
  const trajectoryAdj = Math.min(10, Math.max(-10, trajectory * 0.5)); // ±10 points
  const timeAdj = (timeFactor - 0.5) * 10; // ±5 points

  const finalProb = Math.round(Math.min(95, Math.max(5, accuracyProbBase + coverageAdj + trajectoryAdj + timeAdj)));

  return {
    probability: finalProb,
    currentAccuracy: Math.round(currentAccuracy),
    coveragePct: Math.round(coverageFactor * 100),
    trajectory: Math.round(trajectory),
    sessionsNeeded,
    daysLeft,
    label: finalProb >= 75 ? "On Track" : finalProb >= 55 ? "Marginal" : "At Risk",
    color: finalProb >= 75 ? "#10b981" : finalProb >= 55 ? "#f59e0b" : "#ef4444",
    advice: finalProb >= 75
      ? "Keep your current pace. Focus on weak modules."
      : finalProb >= 55
      ? "Increase session frequency. Cover untested modules urgently."
      : "Prioritise high-weight topics only. Every session counts now.",
  };
}

// ─── STUDY PACE ANALYTICS ────────────────────────────────────────────────────
function getStudyPace(history, daysLeft) {
  if (!history.length) return null;
  const last7 = history.filter(h => {
    const ageDays = (Date.now() - h.id) / 86400000;
    return ageDays <= 7;
  });
  const last30 = history.filter(h => {
    const ageDays = (Date.now() - h.id) / 86400000;
    return ageDays <= 30;
  });
  const sessionsPerWeek7 = last7.length;
  const sessionsPerWeek30 = Math.round((last30.length / 30) * 7);
  const qPerDay7 = last7.length ? Math.round(last7.reduce((s,h)=>s+(h.total||0),0) / 7) : 0;

  // Burnout detection: last session was >3 days ago AND had 7+ sessions before
  const lastDateKey = history.length ? history.reduce((max,h)=>(!max||((h.dateKey||'')>max))?h.dateKey||max:max,'') : null;
  const daysSinceLastSession = lastDateKey ? Math.max(0,Math.floor((Date.now()-new Date(lastDateKey).getTime())/86400000)) : 999;
  const burnoutRisk = daysSinceLastSession >= 3 && history.length >= 7;

  return { sessionsPerWeek7, sessionsPerWeek30, qPerDay7, daysSinceLastSession, burnoutRisk };
}

function getPaceStatus(levelHistory, passProbability, daysLeft) {
  if (!passProbability || levelHistory.length < 3 || daysLeft <= 0) return null;
  const uniqueDays = new Set(levelHistory.map(h => h.dateKey)).size;
  const avg = levelHistory.length / Math.max(uniqueDays, 1);
  const sessionsNeeded = passProbability.sessionsNeeded || 0;
  if (!avg) return null;
  // neededPerDay: how many sessions/day are required to cover remaining work by exam day
  const neededPerDay = sessionsNeeded > 0 ? sessionsNeeded / daysLeft : 0;
  const ahead = avg >= neededPerDay;
  const totalQs = levelHistory.reduce((s, h) => s + (h.total || 0), 0);
  const avgQsPerDay = Math.round(totalQs / Math.max(uniqueDays, 1));
  const avgQsPerSession = levelHistory.length > 0 ? totalQs / levelHistory.length : 0;
  const neededQsPerDay = Math.round(neededPerDay * avgQsPerSession);
  return {
    avg: Math.round(avg * 10) / 10,
    neededPerDay: Math.round(neededPerDay * 10) / 10,
    sessionsNeeded,
    ahead,
    avgQsPerDay,
    neededQsPerDay,
  };
}

function getMockTopicBreakdown(qs,ans,qTimes){
  const byTopic={};
  qs.forEach(q=>{
    const t=q._fullExamTopic||q._topic||"Unknown";
    if(!byTopic[t])byTopic[t]={correct:0,total:0,timeSum:0};
    byTopic[t].total++;
    if(ans[q.id]===q.answer)byTopic[t].correct++;
    byTopic[t].timeSum+=(qTimes?.[q.id]||0);
  });
  return Object.entries(byTopic).map(([t,d])=>({
    topic:t,pct:Math.round(d.correct/d.total*100),
    total:d.total,avgSecs:Math.round(d.timeSum/d.total)
  })).sort((a,b)=>a.pct-b.pct);
}

// ─── WEEKLY PLAN GENERATOR (AI-powered) ─────────────────────────────────────
const WEEKLY_PLAN_PROMPT = `You are a CFA Level {level} study coach. Generate a practical weekly study plan.

Student data:
- Days to exam: {days}
- Available hours this week: {hours}
- Current pass probability: {prob}%
- Accuracy by topic: {accuracy}
- Untested modules: {untested}
- SR cards due this week: {srDue}
- Days since last session: {daysSince}

Return ONLY valid JSON (no markdown):
{
  "headline": "One motivating sentence for this week",
  "totalMinutes": 0,
  "days": [
    {
      "day": "Mon",
      "sessions": [
        {
          "title": "Short session title",
          "topic": "exact topic name",
          "module": "exact module name",
          "difficulty": "Easy|Medium|Hard",
          "count": 5,
          "durationMin": 15,
          "type": "drill|sr|review",
          "why": "One sentence reason"
        }
      ]
    }
  ],
  "keyMessage": "One honest sentence about what matters most this week"
}

Rules:
- Total sessions must fit within {hours} hours
- Prioritise: SR review > high-weight weak topics > coverage gaps
- High-weight: Ethics(15%), FSA(13%), Equity(11%), Fixed Income(11%)
- For office/commute days: max 15-minute sessions (5 questions)
- For weekend: longer sessions (20-30 min, 10-15 questions) if hours allow
- If <30 days: only Ethics, FSA, Equity, Fixed Income
- Be realistic — 3 short sessions beats 1 exhausting one
- keyMessage must be honest and specific, not generic encouragement`;

