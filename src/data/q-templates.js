// ─── QUESTION TEMPLATES ─────────────────────────────────────────────────────
const Q_TEMPLATES = {

"Ethics": [
  // Standard I-A Knowledge of Law
  ()=>{
    const name=pname();const country=pick(["Country A","Country B","Ruritania"]);
    const local=pick(["requires disclosure of all personal trades within 5 days","prohibits trading in securities of employers","mandates a 30-day blackout period before client trades"]);
    const cfa=pick(["recommends disclosure within 10 days","has no specific blackout requirement","requires prior approval but no specific timeline"]);
    return{question:`${name}, CFA, works in ${country} where local law ${local}. The CFA Standards ${cfa}. Which action is most appropriate?`,options:{A:`Follow the CFA Standards since they are the global benchmark`,B:`Follow whichever standard is stricter`,C:`Follow local law since it takes legal precedence`},answer:"B",explanation:`Standard I-A requires members to follow the stricter of applicable law or CFA Standards. When local law is stricter, follow local law. When CFA Standards are stricter, follow them.`,concept:"Standard I-A",los_tested:"demonstrate application of Standard I-A: Knowledge of the Law",misconception_targeted:"assuming CFA Standards always take precedence over local law"};
  },
  // Standard I-B Independence
  ()=>{
    const name=pname();const gift=rnd(150,500);
    return{question:`${name}, CFA, is offered a gift worth $${gift} from a client whose portfolio she manages, as a thank-you for strong performance. She has NOT yet obtained written permission from her employer. What is the MOST appropriate action?`,options:{A:`Accept the gift — it is a gesture of appreciation and does not impair independence`,B:`Disclose the gift to her employer after accepting, since the intent was not improper`,C:`Decline the gift until she has disclosed it and received written permission from her employer`},answer:"C",explanation:`Standard I-B (Independence and Objectivity) requires members to obtain written permission from their employer BEFORE accepting gifts from clients or other parties that could reasonably be expected to create a conflict of interest. The CFA Standards set no specific dollar threshold — any gift that could impair independence requires pre-approval. Accepting first and disclosing later is not compliant.`,concept:"Standard I-B",los_tested:"demonstrate application of Standard I-B: Independence and Objectivity",misconception_targeted:"thinking post-facto disclosure is sufficient, or that small gifts require no approval"};
  },
  // Standard II-A Material Nonpublic
  ()=>{
    const name=pname();
    const scenario=pick([
      {info:"overheard two executives at a restaurant discussing an unannounced acquisition at a premium",action:"purchases shares of the target company for client accounts before any announcement"},
      {info:"received a call from a company's investor relations officer hinting that next week's earnings will significantly exceed analyst estimates",action:"adds to client positions in the company the same afternoon"},
      {info:"works in a company's legal department and knows about a pending government contract that has not been disclosed",action:"tips off a friend who then buys shares"}
    ]);
    return{question:`${name}, CFA, ${scenario.info}. She then ${scenario.action}. Which Standard is MOST likely violated?`,options:{A:`Standard I-C: Misrepresentation — the information was obtained deceptively`,B:`Standard II-A: Material Nonpublic Information — trading on or tipping non-public, price-sensitive information`,C:`Standard III-B: Fair Dealing — she did not offer the opportunity to all clients equally`},answer:"B",explanation:`Standard II-A prohibits members from acting or causing others to act on material nonpublic information. Information is material if a reasonable investor would consider it important in making an investment decision. It is nonpublic until it has been disseminated broadly to the marketplace. Both trading on and tipping such information are violations.`,concept:"Standard II-A",los_tested:"demonstrate application of Standard II-A: Material Nonpublic Information",misconception_targeted:"confusing market integrity standards with duties to clients"};
  },
  // Standard III-C Suitability
  ()=>{
    const name=pname(),age=rnd(62,75),pct=rnd(60,90);
    return{question:`${name} is ${age} years old, retired, and relies on her portfolio for living expenses. Her advisor recommends allocating ${pct}% of her portfolio to small-cap growth stocks. The client agrees enthusiastically. Which Standard is MOST relevant?`,options:{A:`The advisor may proceed since the client has given explicit consent`,B:`Standard III-C requires the advisor to assess suitability based on the client's total profile, not just stated preferences`,C:`Standard IV-A requires the advisor to act in the employer's best interest first`},answer:"B",explanation:`Standard III-C: Suitability requires assessing investments in the context of the client's TOTAL portfolio and circumstances — age, income needs, risk tolerance. Client consent does not override suitability obligations. A ${pct}% allocation to small-caps is likely unsuitable for a retired investor dependent on the portfolio.`,concept:"Standard III-C",los_tested:"demonstrate application of Standard III-C: Suitability",misconception_targeted:"assuming client consent overrides suitability assessment"};
  },
  // Standard VI-B Priority of Transactions
  ()=>{
    const name=pname();
    return{question:`${name}, CFA, identifies an attractive investment opportunity. In what order should trades be placed?`,options:{A:`Personal account first, then clients, then employer proprietary accounts`,B:`Client accounts first, then employer proprietary accounts, then personal account`,C:`All accounts simultaneously to ensure equal treatment`},answer:"B",explanation:`Standard VI-B: Priority of Transactions requires: (1) client trades first, (2) employer proprietary accounts second, (3) personal trades last. This prevents front-running and conflicts of interest.`,concept:"Standard VI-B",los_tested:"demonstrate application of Standard VI-B: Priority of Transactions",misconception_targeted:"thinking simultaneous execution satisfies priority requirements"};
  },
  // Standard V-A Diligence and Reasonable Basis
  ()=>{
    const name=pname();
    const scenario=pick([
      {act:"relies solely on a single sell-side analyst's report without conducting any independent analysis",issue:"relying on a single third-party source without verifying the underlying reasoning"},
      {act:"issues a 'Buy' recommendation based on a quantitative screen without reviewing the company's financial statements or business model",issue:"using a mechanical screen as a substitute for diligence"},
      {act:"recommends a complex structured product to clients after attending only a 30-minute sales presentation by the issuer",issue:"insufficient understanding of a complex product before recommending it"}
    ]);
    return{question:`${name}, CFA, ${scenario.act}. Which Standard is MOST likely violated?`,options:{A:`Standard V-A: Diligence and Reasonable Basis — she did not have an adequate basis for the recommendation`,B:`Standard III-C: Suitability — the investment may not suit all clients`,C:`Standard VI-A: Disclosure of Conflicts — she should have disclosed her reliance on third parties`},answer:"A",explanation:`Standard V-A requires members to have a reasonable and adequate basis for all investment recommendations, supported by appropriate diligence. The violation here is ${scenario.issue}. Members may rely on third-party research but must assess whether that research has a sound basis. Failing to do so before making a recommendation violates V-A.`,concept:"Standard V-A",los_tested:"demonstrate application of Standard V-A: Diligence and Reasonable Basis",misconception_targeted:"assuming reliance on external research automatically satisfies diligence requirements"};
  },
  // GIPS Standards
  ()=>{
    const name=pname();
    return{question:`A firm claims GIPS compliance in its marketing materials. According to the Global Investment Performance Standards, which of the following is REQUIRED?`,options:{A:`All portfolios managed by the firm must be included in at least one composite`,B:`The firm must obtain third-party verification to claim compliance`,C:`Performance must be calculated using a time-weighted return for all periods`},answer:"A",explanation:`GIPS requires that all actual, fee-paying, discretionary portfolios must be included in at least one composite — firms cannot cherry-pick their best portfolios. Verification is recommended but not required to claim compliance. GIPS requires time-weighted returns for composites but the specific calculation method may vary. The key anti-cherry-picking rule (all discretionary portfolios in a composite) is a cornerstone of GIPS.`,concept:"GIPS",los_tested:"explain the purpose of the GIPS standards and how they are implemented",misconception_targeted:"believing GIPS verification is mandatory, or that firms can select which portfolios to include"};
  },

  // Standard VII-B CFA Designation
  ()=>{
    const passed=pick(["passed all three CFA exams but has not yet completed the work experience requirement","passed CFA Level II and is registered for Level III","completed the CFA Program 10 years ago but let their membership lapse"]);
    const name=pname();
    return{question:`${name} has ${passed}. Which description is acceptable on his business card?`,options:{A:`CFA Charterholder`,B:`CFA Candidate`,C:`Neither — no reference to CFA is permitted`},answer:passed.includes("registered for Level III")?"B":"C",explanation:`The CFA designation can only be used by those who have earned the charter AND maintain active membership. 'CFA Candidate' is permitted only for those actively enrolled in the program. ${passed.includes("registered")?"Since he is registered for Level III, 'CFA Candidate' is appropriate.":"In this case, no CFA reference is appropriate."}`,concept:"Standard VII-B",los_tested:"demonstrate application of Standard VII-B: Reference to CFA Institute, the CFA Designation, and CFA Program",misconception_targeted:"using CFA designation without completing all requirements"};
  },
],

"Quantitative Methods": [
  // Confidence interval
  ()=>{
    const mu=rnd(8,15);const se=parseFloat(rnd(10,30)/10).toFixed(1);const z=pick([1.645,1.96,2.576]);const conf=z===1.645?"90%":z===1.96?"95%":"99%";
    const lo=parseFloat((mu-z*parseFloat(se))).toFixed(2);const hi=parseFloat((mu+z*parseFloat(se))).toFixed(2);
    const wrongLo=parseFloat((mu-parseFloat(se))).toFixed(2);const wrongHi=parseFloat((mu+parseFloat(se))).toFixed(2);
    return{question:`A sample of equity returns has a mean of ${mu}% and a standard error of ${se}%. What is the ${conf} confidence interval for the population mean?`,options:{A:`[${lo}%, ${hi}%]`,B:`[${wrongLo}%, ${wrongHi}%] (uses ±1 SE, not the correct z-score)`,C:`[${parseFloat((mu-2*parseFloat(se))).toFixed(2)}%, ${parseFloat((mu+2*parseFloat(se))).toFixed(2)}%] (uses z=2 regardless of confidence level)`},answer:"A",explanation:`${conf} CI = x̄ ± z × SE = ${mu}% ± ${z} × ${se}% = [${lo}%, ${hi}%]. Critical z-values: 90% → 1.645, 95% → 1.96, 99% → 2.576. The CI means: if we repeated this sampling process many times, ${conf} of the resulting intervals would contain the true population mean.`,concept:"Confidence Intervals",los_tested:"explain the construction and interpretation of confidence intervals",misconception_targeted:"using the wrong z-score for a given confidence level"};
  },
  // EAR calculation
  ()=>{
    const r=rnd(4,12);const m=pick([2,4,12,365]);const mname={2:"semi-annual",4:"quarterly",12:"monthly",365:"daily"}[m];
    const ear=((1+r/100/m)**m-1)*100;
    const wrong1=parseFloat((r*1.1).toFixed(3));const wrong2=parseFloat((r+r*r/100/m/2).toFixed(3));
    const correct=parseFloat(ear.toFixed(3));
    return{question:`A bank offers a stated annual rate of ${r}% compounded ${mname}. What is the effective annual rate (EAR)?`,options:{A:`${correct}%`,B:`${wrong1}%`,C:`${wrong2}%`},answer:"A",explanation:`EAR = (1 + ${r}%/${m})^${m} − 1 = (1 + ${(r/m/100).toFixed(5)})^${m} − 1 = ${correct}%. The EAR is always higher than the stated rate when compounding occurs more than once per year.`,concept:"EAR",los_tested:"calculate and interpret annualized return measures and continuously compounded returns",misconception_targeted:"confusing stated rate with effective annual rate"};
  },
  // Time-weighted vs money-weighted
  ()=>{
    const r1=rnd(8,20),r2=rnd(-15,-3);
    const twr=parseFloat(((1+r1/100)*(1+r2/100)-1)*100).toFixed(2);
    const awr=parseFloat((r1+r2)/2).toFixed(2);
    return{question:`A portfolio returns ${r1}% in Year 1 and ${r2}% in Year 2. What is the time-weighted return over the two-year period?`,options:{A:`${awr}% (arithmetic average)`,B:`${twr}% (chain-linked geometric)`,C:`${parseFloat(((r1+r2)/2*0.9)).toFixed(2)}% (adjusted for compounding)`},answer:"B",explanation:`Time-weighted return = (1 + ${r1}%) × (1 + ${r2}%) − 1 = ${twr}%. TWR chains sub-period returns multiplicatively, eliminating the effect of external cash flows. The arithmetic average (${awr}%) overstates compound growth.`,concept:"TWR",los_tested:"compare money-weighted and time-weighted rates of return and evaluate portfolio performance",misconception_targeted:"using arithmetic mean instead of geometric chain-linking for TWR"};
  },
  // Type I vs Type II error
  ()=>{
    const alpha=pick([1,5,10]);
    return{question:`A researcher sets a significance level of ${alpha}%. She fails to reject the null hypothesis when it is actually false. This is best described as:`,options:{A:`A Type I error — incorrectly rejecting a true null hypothesis`,B:`A Type II error — failing to reject a false null hypothesis`,C:`A correct decision since the null was not rejected`},answer:"B",explanation:`Type II error = failing to reject H₀ when H₀ is actually false (false negative). Type I error = rejecting H₀ when H₀ is true (false positive). The probability of Type II error is β; power = 1 − β. The significance level (${alpha}%) controls Type I error only.`,concept:"Hypothesis Testing",los_tested:"explain hypothesis testing and its components including statistical significance Type I and Type II errors and the power of a test",misconception_targeted:"confusing Type I and Type II errors"};
  },
  // Roy's Safety First
  ()=>{
    const rl=rnd(3,8);
    const p1={e:rnd(12,18),s:rnd(8,15)};const p2={e:rnd(10,16),s:rnd(5,10)};
    const sfr1=parseFloat(((p1.e-rl)/p1.s).toFixed(3));const sfr2=parseFloat(((p2.e-rl)/p2.s).toFixed(3));
    const winner=sfr1>sfr2?"A":"B";
    return{question:`An investor's minimum acceptable return is ${rl}%. Portfolio A has E(R)=${p1.e}%, σ=${p1.s}%. Portfolio B has E(R)=${p2.e}%, σ=${p2.s}%. Using Roy's Safety-First criterion, which portfolio is optimal?`,options:{A:`Portfolio A (SFR = ${sfr1})`,B:`Portfolio B (SFR = ${sfr2})`,C:`The portfolio with the higher Sharpe ratio`},answer:winner,explanation:`Safety-First Ratio = (E(R) − R_min) / σ. Portfolio A: (${p1.e}−${rl})/${p1.s} = ${sfr1}. Portfolio B: (${p2.e}−${rl})/${p2.s} = ${sfr2}. Select the HIGHEST SFR — Portfolio ${winner}. Roy's criterion minimises probability of falling below the minimum return.`,concept:"Safety-First",los_tested:"define shortfall risk calculate the safety-first ratio and identify an optimal portfolio using Roy's safety-first criterion",misconception_targeted:"confusing safety-first ratio with Sharpe ratio"};
  },
],

"Financial Statement Analysis": [
  // DuPont decomposition
  ()=>{
    const npm=rnd(5,20);const at=parseFloat(rnd(80,200)/100).toFixed(2);const em=parseFloat(rnd(150,300)/100).toFixed(2);
    const roe=parseFloat((npm/100*parseFloat(at)*parseFloat(em)*100)).toFixed(2);
    const wrong1=parseFloat((npm/100*parseFloat(at)*100)).toFixed(2);
    const wrong2=parseFloat((npm*parseFloat(em))).toFixed(2);
    return{question:`A company has net profit margin of ${npm}%, asset turnover of ${at}×, and equity multiplier of ${em}×. What is the Return on Equity (ROE) using the DuPont formula?`,options:{A:`${roe}%`,B:`${wrong1}% (margin × turnover only)`,C:`${wrong2}% (margin × leverage only)`},answer:"A",explanation:`DuPont ROE = Net Profit Margin × Asset Turnover × Equity Multiplier = ${npm}% × ${at} × ${em} = ${roe}%. All three components must be included: profitability, efficiency, and leverage.`,concept:"DuPont ROE",los_tested:"demonstrate the application of DuPont analysis of return on equity",misconception_targeted:"omitting one of the three DuPont components"};
  },
  // Cash Conversion Cycle
  ()=>{
    const dso=rnd(30,60);const dio=rnd(40,80);const dpo=rnd(20,45);
    const ccc=dso+dio-dpo;
    const wrong1=dso+dio+dpo;const wrong2=dso+dio;
    return{question:`A company has Days Sales Outstanding of ${dso} days, Days Inventory Outstanding (DIO) of ${dio} days, and Days Payable Outstanding of ${dpo} days. What is the Cash Conversion Cycle?`,options:{A:`${ccc} days`,B:`${wrong1} days`,C:`${wrong2} days`},answer:"A",explanation:`CCC = DSO + DIO − DPO = ${dso} + ${dio} − ${dpo} = ${ccc} days. DPO is SUBTRACTED because paying suppliers later reduces the cash conversion period. A shorter CCC = more efficient working capital management.`,concept:"Cash Conversion Cycle",los_tested:"calculate and interpret activity liquidity solvency and profitability ratios",misconception_targeted:"adding DPO instead of subtracting it in the CCC formula"};
  },
  // LIFO vs FIFO in inflation
  ()=>{
    return{question:`During a period of rising inventory costs, compared to FIFO, a company using LIFO will report:`,options:{A:`Higher net income and higher inventory on the balance sheet`,B:`Lower net income and lower inventory on the balance sheet`,C:`Lower net income and higher inventory on the balance sheet`},answer:"B",explanation:`Under LIFO during inflation: most recent (higher cost) units are expensed first → higher COGS → lower gross profit → lower net income. Older (lower cost) units remain in inventory → lower balance sheet inventory. LIFO gives a tax benefit (lower taxes) but understates inventory.`,concept:"LIFO vs FIFO",los_tested:"calculate and explain how inflation and deflation of inventory costs affect financial statements and ratios",misconception_targeted:"mixing LIFO effects on income statement vs balance sheet"};
  },
  // Current ratio & quick ratio
  ()=>{
    const ca=rnd(200,500);const cl=rnd(100,250);const inv=rnd(50,150);const prep=rnd(10,40);
    const cr=parseFloat(ca/cl).toFixed(2);const qr=parseFloat((ca-inv-prep)/cl).toFixed(2);
    const wrong1=parseFloat((ca-inv)/cl).toFixed(2);
    return{question:`A firm has current assets of $${ca}M, current liabilities of $${cl}M, inventory of $${inv}M, and prepaid expenses of $${prep}M. What is the quick ratio?`,options:{A:`${qr}×`,B:`${cr}× (current ratio, not quick ratio)`,C:`${wrong1}× (excluding only inventory)`},answer:"A",explanation:`Quick ratio = (Current Assets − Inventory − Prepaid Expenses) / Current Liabilities = ($${ca} − $${inv} − $${prep}) / $${cl} = ${qr}×. Prepaid expenses are excluded because they cannot be quickly converted to cash. The current ratio (${cr}×) includes all current assets.`,concept:"Quick Ratio",los_tested:"calculate and interpret activity liquidity solvency and profitability ratios",misconception_targeted:"forgetting to exclude prepaid expenses from the quick ratio"};
  },
  // Revenue recognition (percentage of completion)
  ()=>{
    const total=rnd(50,200);const pct=rnd(30,70);const cost=Math.round(total*rnd(60,80)/100);
    const rev=Math.round(total*pct/100);const costRec=Math.round(cost*pct/100);const gp=rev-costRec;
    return{question:`Under the percentage-of-completion method, a $${total}M contract is ${pct}% complete. Total estimated costs are $${cost}M. How much gross profit is recognised in the current period?`,options:{A:`$${gp}M`,B:`$0 — profit recognised only on completion`,C:`$${total-cost}M — total contract profit recognised immediately`},answer:"A",explanation:`Revenue recognised = ${pct}% × $${total}M = $${rev}M. Costs recognised = ${pct}% × $${cost}M = $${costRec}M. Gross profit = $${rev}M − $${costRec}M = $${gp}M. Under percentage-of-completion (IFRS15 / ASC 606), revenue is recognised proportionally as work progresses.`,concept:"Revenue Recognition Percentage of Completion",los_tested:"describe the general principles of revenue recognition",misconception_targeted:"deferring all profit until contract completion"};
  },
  // Deferred tax
  ()=>{
    const pretax=rnd(100,300);const rate=pick([20,25,30]);const bookDep=rnd(20,60);const diff=rnd(10,30);const taxDep=bookDep+diff;
    const dtl=Math.round(diff*rate/100);const taxExp=Math.round(pretax*rate/100);const wrongVal=Math.round(pretax*rate/100-dtl);
    return{question:`A company has pre-tax income of $${pretax}M and a tax rate of ${rate}%. Book depreciation is $${bookDep}M while tax depreciation is $${taxDep}M (accelerated). What is the deferred tax liability created this period?`,options:{A:`$${dtl}M`,B:`$${taxExp}M (total income tax expense, not the deferred portion)`,C:`$${wrongVal}M (taxes currently payable)`},answer:"A",explanation:`Temporary difference = tax depreciation − book depreciation = $${taxDep}M − $${bookDep}M = $${diff}M. DTL = $${diff}M × ${rate}% = $${dtl}M. Accelerated tax depreciation reduces taxes payable now but creates a deferred liability that reverses in later periods when tax depreciation falls below book depreciation.`,concept:"Deferred Tax Liability",los_tested:"explain how deferred tax liabilities and assets are created and the factors that determine how a company's deferred tax liabilities and assets should be treated for purposes of financial analysis",misconception_targeted:"confusing total income tax expense with the deferred tax component"};
  },
  // Operating vs investing cash flows
  ()=>{
    const ni=rnd(50,150);const dep=rnd(10,40);const wc=rnd(5,30);const capex=rnd(30,100);
    const cfo=ni+dep-wc;const cfi=-(capex);
    return{question:`A company reports net income of $${ni}M, depreciation of $${dep}M, an increase in working capital of $${wc}M, and capital expenditures of $${capex}M. What is cash flow from operations (CFO) under the indirect method?`,options:{A:`$${cfo}M`,B:`$${ni+dep}M (ignoring working capital change)`,C:`$${cfo+cfi}M (including capex)`},answer:"A",explanation:`CFO (indirect) = Net Income + Depreciation − Increase in Working Capital = $${ni} + $${dep} − $${wc} = $${cfo}M. Depreciation is added back (non-cash charge). Working capital increases use cash, so they are subtracted. Capital expenditures ($${capex}M) belong in CFI, not CFO.`,concept:"Cash Flow from Operations Indirect Method",los_tested:"describe how the cash flow statement is linked to the income statement and balance sheet",misconception_targeted:"including capex in CFO or mishandling working capital direction"};
  },
  // EPS diluted vs basic
  ()=>{
    const ni=rnd(50,200);const shares=rnd(50,150);const opts=rnd(5,20);const price=rnd(20,50);const strike=Math.round(price*rnd(50,80)/100);
    const basic=parseFloat(ni/shares).toFixed(2);
    const treasury=Math.round(opts*(price-strike)/price);const dilutedShares=shares+opts-treasury;
    const diluted=parseFloat(ni/dilutedShares).toFixed(2);
    return{question:`A company earns $${ni}M net income with ${shares}M basic shares. It has ${opts}M dilutive options (strike $${strike}, market $${price}). Using the treasury stock method, what is diluted EPS?`,options:{A:`$${diluted}`,B:`$${basic} (basic EPS, options ignored)`,C:`$${parseFloat(ni/(shares+opts)).toFixed(2)} (ignoring treasury stock buyback)`},answer:"A",explanation:`Treasury stock method: Options exercised = ${opts}M. Proceeds = ${opts}M × $${strike} = $${opts*strike}M. Shares bought back at market price = $${opts*strike}M / $${price} = ${treasury}M shares. Net dilution = ${opts}M − ${treasury}M = ${opts-treasury}M shares. Diluted shares = ${shares}M + ${opts-treasury}M = ${dilutedShares}M. Diluted EPS = $${ni}M / ${dilutedShares}M = $${diluted}.`,concept:"Diluted EPS Treasury Stock Method",los_tested:"calculate and interpret basic and diluted EPS",misconception_targeted:"adding all option shares without applying treasury stock method"};
  },
  // Inventory write-down LCNRV
  ()=>{
    const cost=rnd(100,300);const nrv=Math.round(cost*rnd(70,95)/100);
    const writedown=cost-nrv;
    return{question:`A company's inventory has a historical cost of $${cost}M. The estimated net realisable value (NRV) is $${nrv}M. Under IFRS, what is the required accounting treatment?`,options:{A:`Write down inventory to $${nrv}M, recognising a $${writedown}M loss on the income statement`,B:`No adjustment required; IFRS requires inventory at historical cost`,C:`Write down only under US GAAP; IFRS allows the higher of cost or NRV`},answer:"A",explanation:`Under IFRS (IAS 2), inventory is carried at the lower of cost or NRV. Since NRV ($${nrv}M) < cost ($${cost}M), inventory is written down to $${nrv}M, recording a $${writedown}M loss. Under US GAAP the rule is lower of cost or market (LCM), but the principle is similar. Write-downs cannot be reversed under US GAAP; IFRS allows reversal if NRV recovers.`,concept:"Inventory Lower of Cost or NRV",los_tested:"calculate and explain how inventories are reported in the financial statements",misconception_targeted:"believing IFRS uses historical cost without NRV test"};
  },
  // Debt-to-equity vs debt-to-assets
  ()=>{
    const debt=rnd(100,400);const equity=rnd(100,300);const assets=debt+equity;
    const dte=parseFloat(debt/equity).toFixed(2);const dta=parseFloat(debt/assets).toFixed(2);
    const wrong=parseFloat(equity/assets).toFixed(2);
    return{question:`A firm has total debt of $${debt}M and total equity of $${equity}M (total assets = $${assets}M). What is the debt-to-equity ratio?`,options:{A:`${dte}×`,B:`${dta}× (debt-to-assets, not D/E)`,C:`${wrong}× (equity-to-assets)`},answer:"A",explanation:`Debt-to-Equity = Total Debt / Total Equity = $${debt}M / $${equity}M = ${dte}×. Debt-to-Assets = $${debt}M / $${assets}M = ${dta}×. These ratios measure leverage differently; D/E shows how many dollars of debt per dollar of equity, while D/A shows the proportion of assets financed by debt.`,concept:"Solvency Ratios Debt-to-Equity",los_tested:"calculate and interpret activity liquidity solvency and profitability ratios",misconception_targeted:"confusing debt-to-equity with debt-to-assets"};
  },
],

"Fixed Income": [
  // Duration price sensitivity
  ()=>{
    const md=parseFloat(rnd(40,90)/10).toFixed(1);const dy=parseFloat(rnd(25,75)/100).toFixed(2);const price=rnd(95,105);
    const dp=parseFloat((-parseFloat(md)*parseFloat(dy)/100*price)).toFixed(2);
    const wrong1=parseFloat((parseFloat(md)*parseFloat(dy)/100*price)).toFixed(2);
    const wrong2=parseFloat((-parseFloat(md)*parseFloat(dy)*price/10)).toFixed(2);
    return{question:`A bond has a modified duration of ${md} and a full price of $${price}. If the yield-to-maturity rises by ${dy}%, what is the approximate change in full price?`,options:{A:`$${dp}`,B:`+$${wrong1} (price rises when yields rise)`,C:`$${wrong2} (yield change not converted to decimal)`},answer:"A",explanation:`ΔPrice ≈ −ModDuration × Δy × Price = −${md} × ${(parseFloat(dy)/100).toFixed(4)} × $${price} ≈ $${dp}. The negative sign captures the inverse price-yield relationship. This approximation improves with convexity adjustment for large yield moves.`,concept:"Modified Duration Price Change",los_tested:"define calculate and interpret modified duration money duration and the price value of a basis point",misconception_targeted:"forgetting the negative sign or not converting yield change to decimal"};
  },
  // Macaulay vs Modified Duration
  ()=>{
    const mac=parseFloat(rnd(30,80)/10).toFixed(1);const y=rnd(3,8);const m=pick([1,2]);
    const mod=parseFloat((parseFloat(mac)/(1+y/100/m))).toFixed(3);
    const wrong1=mac;const wrong2=parseFloat((parseFloat(mac)*(1+y/100/m))).toFixed(3);
    return{question:`A bond has a Macaulay duration of ${mac} years and a yield-to-maturity of ${y}% compounded ${m===1?"annually":"semi-annually"}. What is its modified duration?`,options:{A:`${mod} years`,B:`${wrong1} years (same as Macaulay — no adjustment needed)`,C:`${wrong2} years (multiplied instead of divided)`},answer:"A",explanation:`Modified Duration = Macaulay Duration / (1 + y/m) = ${mac} / (1 + ${y}%/${m}) = ${mod} years. Modified duration is always slightly less than Macaulay duration. It directly estimates the percentage price change for a 1% change in yield: %ΔP ≈ −ModDur × Δy.`,concept:"Macaulay vs Modified Duration",los_tested:"define calculate and interpret Macaulay duration and modified duration",misconception_targeted:"treating Macaulay and modified duration as equal"};
  },
  // Coupon and duration relationship
  ()=>{
    const c1=rnd(2,5),c2=rnd(8,12);const mat=rnd(5,15);
    return{question:`Two bonds have identical maturities of ${mat} years and the same yield-to-maturity. Bond A has a coupon of ${c1}% and Bond B has a coupon of ${c2}%. Which bond has higher interest rate risk, and why?`,options:{A:`Bond A — lower coupon means a higher proportion of value comes from the par payment at maturity, so duration and price sensitivity are higher`,B:`Bond B — higher coupon rate means higher cash flows, so more to lose if yields rise`,C:`Both bonds have identical interest rate risk because they have the same maturity and YTM`},answer:"A",explanation:`Lower coupon → less cash returned early → longer weighted average time to cash flows → higher Macaulay and modified duration → greater price sensitivity to yield changes. Bond A (${c1}% coupon) has a longer duration than Bond B (${c2}% coupon) despite identical maturity. In the extreme, a zero-coupon bond has the highest duration equal to its maturity.`,concept:"Coupon Rate and Duration",los_tested:"explain how a bond's maturity coupon and yield level affect its interest rate risk",misconception_targeted:"assuming equal maturity means equal interest rate risk"};
  },
  // YTM vs coupon rate and price
  ()=>{
    const par=1000;const coup=rnd(4,8);const ytm=rnd(3,10);
    const relation=ytm<coup?"above par (premium bond)":ytm>coup?"below par (discount bond)":"at par";
    const logic=ytm<coup?`YTM (${ytm}%) < coupon rate (${coup}%) — investors accept a lower yield, so they bid the price above par`:ytm>coup?`YTM (${ytm}%) > coupon rate (${coup}%) — investors require a higher yield, so they pay less than par`:`YTM equals coupon rate — the bond is priced exactly at par`;
    const wrong1=ytm<coup?"below par (discount bond)":"above par (premium bond)";const wrong2="at par regardless of coupon and yield";
    return{question:`A bond has a ${coup}% annual coupon rate and a yield-to-maturity of ${ytm}%. Assuming annual coupon payments, the bond is priced:`,options:{A:relation,B:wrong1,C:wrong2},answer:"A",explanation:`${logic}. Key rule: If YTM > coupon rate → discount bond (price < par). If YTM < coupon rate → premium bond (price > par). If YTM = coupon rate → par bond (price = par). This relationship holds for all conventional bonds.`,concept:"Bond Price YTM Coupon Relationship",los_tested:"describe relationships among a bond's price coupon rate maturity and yield-to-maturity",misconception_targeted:"inverting the direction of the price-yield relationship relative to coupon rate"};
  },
  // Credit spreads
  ()=>{
    const govt=parseFloat(rnd(20,50)/10).toFixed(1);const corp=parseFloat((parseFloat(rnd(20,50)/10)+rnd(10,40)/10)).toFixed(1);
    const spread=parseFloat((parseFloat(corp)-parseFloat(govt))).toFixed(1);
    const spreadBps=Math.round(parseFloat(spread)*100);
    return{question:`A government bond yields ${govt}% and a comparable-maturity corporate bond yields ${corp}%. The credit spread (G-spread) is ${spreadBps} bps. If the credit spread widens by 50 bps and the corporate bond has a modified duration of 5 years, what is the approximate price impact?`,options:{A:`−${(5*0.50).toFixed(2)}% (price falls as spreads widen)`,B:`+${(5*0.50).toFixed(2)}% (price rises as spreads widen)`,C:`No change — credit spread changes affect yield but not price`},answer:"A",explanation:`Credit spread widening raises the bond's YTM. Using duration: %ΔP ≈ −ModDur × ΔSpread = −5 × 0.50% = −${(5*0.50).toFixed(2)}%. Wider spreads = higher required yield = lower price. Credit spread = compensation for credit risk, liquidity risk, and taxation. G-spread = corporate YTM − government YTM for the same maturity.`,concept:"Credit Spreads",los_tested:"define spread measures and explain how they are used to value a bond",misconception_targeted:"not applying duration to spread changes, or reversing the price direction"};
  },
  // Callable vs straight bond
  ()=>{
    const y=rnd(5,9);const coup=rnd(6,10);
    return{question:`A callable bond and an otherwise identical straight (non-callable) bond both have a ${coup}% coupon. As interest rates fall significantly below the coupon rate, how does the price of the callable bond compare to the straight bond?`,options:{A:`The callable bond's price rises less than the straight bond's price — price compression occurs as the call option becomes more valuable to the issuer`,B:`The callable bond's price rises more than the straight bond's price — investors demand higher yields on the callable bond`,C:`Both bonds rise identically in price since they have the same coupon and maturity`},answer:"A",explanation:`Callable bond price = Straight bond price − Value of call option. As rates fall, the call option becomes more valuable to the issuer (likely to be exercised), capping the callable bond's price appreciation. This is called negative convexity or price compression. The callable bond will lag the straight bond in price appreciation when rates fall significantly below the coupon rate.`,concept:"Callable Bond Negative Convexity",los_tested:"describe how the presence of embedded options changes the features of fixed-income securities",misconception_targeted:"assuming callable and straight bonds behave identically when rates fall below coupon"};
  },
  // Accrued interest / full vs flat price
  ()=>{
    const coup=rnd(4,8);const par=1000;const days=rnd(30,150);const period=180;
    const accrued=parseFloat((coup/100*par/2*days/period)).toFixed(2);
    const flat=parseFloat(rnd(950,1050)+Math.random()*10).toFixed(2);
    const full=parseFloat((parseFloat(flat)+parseFloat(accrued))).toFixed(2);
    return{question:`A bond with a ${coup}% semi-annual coupon (par $${par}) has a flat (clean) price of $${flat}. The bond is ${days} days into a ${period}-day coupon period. What is the full (dirty) price?`,options:{A:`$${full}`,B:`$${flat} — flat price is the actual settlement price`,C:`$${parseFloat((parseFloat(flat)-parseFloat(accrued))).toFixed(2)} — subtract accrued interest`},answer:"A",explanation:`Full (dirty) price = Flat (clean) price + Accrued Interest. Accrued interest = (Coupon / 2) × (Days since last coupon / Days in period) = ($${coup/100*par/2}) × (${days}/${period}) = $${accrued}. Full price = $${flat} + $${accrued} = $${full}. Bond quotes use the flat price, but settlement occurs at the full price. The buyer compensates the seller for accrued interest.`,concept:"Full Price vs Flat Price",los_tested:"calculate and interpret the full price of a bond given the flat price",misconception_targeted:"using the flat price as the settlement price or subtracting accrued interest"};
  },
],

"Equity": [
  // Gordon Growth Model
  ()=>{
    const d0=parseFloat(rnd(100,300)/100).toFixed(2);const g=rnd(3,6);const r=rnd(8,12);
    const d1=parseFloat((parseFloat(d0)*(1+g/100))).toFixed(4);
    const v=parseFloat((parseFloat(d1)/(r/100-g/100))).toFixed(2);
    const wrong1=parseFloat((parseFloat(d0)/(r/100-g/100))).toFixed(2);
    const wrong2=parseFloat((parseFloat(d1)/(r/100+g/100))).toFixed(2);
    return{question:`A stock just paid a dividend of $${d0} per share (D₀). Dividends are expected to grow at ${g}% per year indefinitely. The required return is ${r}%. What is the intrinsic value per share?`,options:{A:`$${v}`,B:`$${wrong1} (uses D₀ instead of D₁)`,C:`$${wrong2} (adds g to required return instead of subtracting)`},answer:"A",explanation:`Gordon Growth Model (GGM): V₀ = D₁/(r−g). D₁ = D₀×(1+g) = $${d0}×${1+g/100} = $${d1}. V₀ = $${d1}/(${r}%−${g}%) = $${v}. Always use next period's dividend D₁. Using D₀ ($${wrong1}) understates value by a factor of (1+g).`,concept:"Gordon Growth Model",los_tested:"calculate and interpret the intrinsic value of an equity security based on the Gordon growth dividend discount model",misconception_targeted:"using D₀ instead of D₁ in the Gordon Growth Model"};
  },
  // Justified trailing P/E
  ()=>{
    const pout=rnd(30,60);const r=rnd(9,13);const g=rnd(3,6);
    const leadPE=parseFloat((pout/100/(r/100-g/100))).toFixed(1);
    const trailPE=parseFloat((pout/100*(1+g/100)/(r/100-g/100))).toFixed(1);
    const wrong1=parseFloat((1/(r/100-g/100))).toFixed(1);
    const wrong2=parseFloat(((1-pout/100)/(r/100-g/100))).toFixed(1);
    return{question:`A company has a dividend payout ratio of ${pout}%, required return of ${r}%, and sustainable growth rate of ${g}%. What is the justified LEADING P/E ratio?`,options:{A:`${leadPE}×`,B:`${trailPE}× (trailing P/E, not leading)`,C:`${wrong2}× (uses retention ratio in place of payout ratio)`},answer:"A",explanation:`Justified leading P/E = Payout ratio / (r − g) = ${pout}% / (${r}% − ${g}%) = ${leadPE}×. The trailing P/E = leading P/E × (1+g) = ${leadPE}× × ${1+g/100} = ${trailPE}×. Leading P/E uses next year's expected earnings; trailing P/E uses last year's actual earnings. Higher payout ratio or lower (r−g) spread → higher justified P/E.`,concept:"Justified P/E",los_tested:"calculate and interpret the justified trailing and leading P/E ratios for a stock",misconception_targeted:"using retention ratio in the P/E formula or confusing leading with trailing P/E"};
  },
  // Market Efficiency
  ()=>{
    const form=pick(["weak","semi-strong","strong"]);
    const implication={
      "weak":"Technical analysis cannot generate consistent excess returns, but fundamental analysis may still work.",
      "semi-strong":"Neither technical analysis nor fundamental analysis based on public information can generate consistent excess returns. Only inside information could provide an edge.",
      "strong":"No analysis — including the use of insider information — can generate consistent excess returns. All information is fully reflected in prices."
    }[form];
    const wrongA={
      "weak":"Neither technical nor fundamental analysis can earn excess returns — all information is priced in",
      "semi-strong":"Technical analysis is ineffective but fundamental analysis still works because only historical prices are priced in",
      "strong":"Fundamental analysis can still earn excess returns by identifying mispriced stocks"
    }[form];
    return{question:`If markets are ${form}-form efficient, which statement BEST describes the implication?`,options:{A:wrongA,B:implication,C:"Passive index funds always underperform active managers in the long run"},answer:"B",explanation:`${form.charAt(0).toUpperCase()+form.slice(1)}-form EMH: ${implication} The three forms are cumulative: semi-strong subsumes weak-form; strong subsumes both. Anomalies (e.g., momentum, value premium) are debated evidence against semi-strong efficiency.`,concept:"Market Efficiency EMH",los_tested:"contrast weak-form semi-strong-form and strong-form market efficiency",misconception_targeted:"confusing which forms of analysis are ineffective under each EMH form"};
  },
  // Price-to-Book ratio
  ()=>{
    const roe=rnd(12,20);const r=rnd(8,12);const g=rnd(3,6);
    const pb=parseFloat((roe/100-g/100)/(r/100-g/100)).toFixed(2);
    const wrong1=parseFloat(roe/r).toFixed(2);const wrong2=parseFloat((r/100-g/100)/(roe/100-g/100)).toFixed(2);
    return{question:`A firm has ROE = ${roe}%, required return = ${r}%, and sustainable growth rate = ${g}%. What is the justified Price-to-Book (P/B) ratio?`,options:{A:`${pb}×`,B:`${wrong1}× (ROE / required return — missing growth)`,C:`${wrong2}× (ratio inverted)`},answer:"A",explanation:`Justified P/B = (ROE − g) / (r − g) = (${roe}% − ${g}%) / (${r}% − ${g}%) = ${pb}×. When ROE > required return, P/B > 1 (firm earns above its cost of equity). When ROE = r, P/B = 1. When ROE < r, P/B < 1. This links directly to the GGM: P/B = ROE × payout / (r − g) per share.`,concept:"Justified P/B Ratio",los_tested:"calculate and interpret the justified P/B ratio for a stock",misconception_targeted:"using ROE/r without accounting for the growth differential"};
  },
  // EV/EBITDA
  ()=>{
    const ev=rnd(500,2000);const ebitda=rnd(50,200);const mult=parseFloat(ev/ebitda).toFixed(1);
    const debt=rnd(100,400);const cash=rnd(20,100);const shares=rnd(50,200);const sp=Math.round((ev-debt+cash)/shares);
    return{question:`A company has enterprise value of $${ev}M and EBITDA of $${ebitda}M (EV/EBITDA = ${mult}×). A comparable company trades at 8.5× EV/EBITDA with EBITDA of $${ebitda}M. EV/EBITDA is preferred over P/E for which of the following reasons?`,options:{A:`EV/EBITDA is unaffected by differences in capital structure, depreciation policies, and tax rates, making cross-company comparison more reliable`,B:`EV/EBITDA always gives a lower valuation than P/E, making acquisitions appear cheaper`,C:`P/E cannot be calculated for companies with positive earnings, so EV/EBITDA must be used`},answer:"A",explanation:`EV/EBITDA is useful for comparing companies because: (1) EV includes debt, making it capital-structure-neutral; (2) EBITDA adds back D&A, removing distortions from different depreciation policies; (3) It's pre-tax, avoiding tax rate differences. EV = Market cap + Debt − Cash. Particularly useful for capital-intensive, levered, or cross-border comparisons where tax and depreciation differ.`,concept:"EV EBITDA Multiple",los_tested:"calculate and interpret EV multiples and evaluate the usefulness of EV/EBITDA",misconception_targeted:"not understanding why EV/EBITDA is preferred over P/E for leveraged or capital-intensive comparisons"};
  },
],

"Derivatives": [
  // Forward price
  ()=>{
    const s=rnd(40,100);const r=rnd(2,6);const t=pick([0.25,0.5,1]);const tname={0.25:"3 months",0.5:"6 months",1:"1 year"}[t];
    const div=parseFloat(rnd(0,30)/10).toFixed(1);
    const fp=parseFloat(((s-parseFloat(div))*(1+r/100)**t)).toFixed(2);
    const wrong1=parseFloat((s*(1+r/100)**t)).toFixed(2);const wrong2=parseFloat((s*(1+r/100)*t)).toFixed(2);
    return{question:`A stock trades at $${s} and is expected to pay a dividend of $${div} in ${tname}. The risk-free rate is ${r}% per year. What is the no-arbitrage forward price for a ${tname} forward contract?`,options:{A:`$${fp}`,B:`$${wrong1} (ignores the dividend payment)`,C:`$${wrong2} (uses simple interest and ignores dividend)`},answer:"A",explanation:`Forward price = (S₀ − PV(dividends)) × (1+r)^T. PV(div) ≈ $${div} (paid close to delivery, so discounting is minor). F = ($${s} − $${div}) × (1+${r}%)^${t} = $${fp}. Dividends reduce the cost-of-carry because the dividend is received by the holder of the spot (not the forward). Ignoring dividends overstates the forward price to $${wrong1}.`,concept:"Forward Price No-Arbitrage",los_tested:"describe and calculate the no-arbitrage forward price for equity forward contracts",misconception_targeted:"ignoring dividend payments in the forward price formula"};
  },
  // Options — intrinsic vs time value
  ()=>{
    const s=rnd(50,80);const x=rnd(55,75);const premium=parseFloat(rnd(300,900)/100).toFixed(2);
    const isCall=Math.random()>0.5;
    const intrinsic=isCall?Math.max(s-x,0):Math.max(x-s,0);
    const tv=parseFloat((parseFloat(premium)-intrinsic)).toFixed(2);
    const inMoney=intrinsic>0;
    const moneyness=isCall?(s>x?"in-the-money":s<x?"out-of-the-money":"at-the-money"):(x>s?"in-the-money":x<s?"out-of-the-money":"at-the-money");
    return{question:`A European ${isCall?"call":"put"} option with strike $${x} is priced at $${premium}. The underlying stock is at $${s}. What is the option's time value?`,options:{A:`$${tv} (premium minus intrinsic value of $${intrinsic})`,B:`$${premium} (the full premium is time value)`,C:`$${intrinsic} (the intrinsic value is the time value)`},answer:"A",explanation:`Option premium = Intrinsic value + Time value. Intrinsic value = max(${isCall?`S−X = $${s}−$${x}`:`X−S = $${x}−$${s}`}, 0) = $${intrinsic}. Time value = $${premium} − $${intrinsic} = $${tv}. This option is ${moneyness}. Time value reflects the probability that the option moves further in-the-money before expiration; it decays to zero at expiration (theta decay).`,concept:"Option Intrinsic vs Time Value",los_tested:"identify the moneyness of an option explain time value and explain the value of an option at expiration",misconception_targeted:"confusing total premium with time value, or intrinsic value with time value"};
  },
  // Put-call parity
  ()=>{
    const s=rnd(45,65);const x=rnd(48,62);const r=rnd(2,6);const t=parseFloat(rnd(3,12)/12).toFixed(4);
    const pvx=parseFloat((x/(1+r/100)**parseFloat(t))).toFixed(2);
    const c=parseFloat(rnd(200,800)/100).toFixed(2);
    const p=parseFloat((parseFloat(c)+parseFloat(pvx)-s)).toFixed(2);
    const wrong1=parseFloat((parseFloat(c)-parseFloat(pvx)+s)).toFixed(2);
    const wrong2=parseFloat((parseFloat(c)+x-s)).toFixed(2);
    return{question:`A European call option with strike $${x} is priced at $${c}. The underlying stock trades at $${s}, the risk-free rate is ${r}%, and time to expiry is ${Math.round(parseFloat(t)*12)} months. What is the put option price?`,options:{A:`$${p}`,B:`$${wrong1}`,C:`$${wrong2} (uses undiscounted strike)`},answer:"A",explanation:`Put-call parity: C + PV(X) = P + S → P = C + PV(X) − S. PV(X) = $${x}/(1+${r}%)^${Math.round(parseFloat(t)*12)}/12 = $${pvx}. P = $${c} + $${pvx} − $${s} = $${p}. Always discount the strike price.`,concept:"Put-Call Parity",los_tested:"explain put-call parity for European options and put-call forward parity for European options",misconception_targeted:"using undiscounted strike price in put-call parity"};
  },
  // Option payoffs
  ()=>{
    const x=rnd(45,60);const st=rnd(40,75);const premium=parseFloat(rnd(200,600)/100).toFixed(2);
    const isCall=Math.random()>0.5;const isLong=Math.random()>0.5;
    const intrinsic=isCall?Math.max(st-x,0):Math.max(x-st,0);
    const payoff=isLong?intrinsic-parseFloat(premium):parseFloat(premium)-intrinsic;
    const wrong1=isLong?intrinsic:parseFloat(premium)-intrinsic+parseFloat(premium);
    const wrong2=parseFloat((payoff*-1)).toFixed(2);
    return{question:`An investor holds a ${isLong?"long":"short"} ${isCall?"call":"put"} option with strike $${x}, purchased for a premium of $${premium}. At expiration, the stock trades at $${st}. What is the investor's profit/loss?`,options:{A:`$${payoff.toFixed(2)}`,B:`$${intrinsic} (ignores premium paid)`,C:`$${wrong2} (wrong sign)`},answer:"A",explanation:`${isCall?"Call":"Put"} intrinsic value at expiration = max(${isCall?`$${st}−$${x}`:`$${x}−$${st}`}, 0) = $${intrinsic}. ${isLong?"Long":"Short"} position profit = ${isLong?`intrinsic − premium = $${intrinsic} − $${premium}`:`premium − intrinsic = $${premium} − $${intrinsic}`} = $${payoff.toFixed(2)}.`,concept:"Option Payoff",los_tested:"determine the value at expiration and profit from a long or a short position in a call or put option",misconception_targeted:"ignoring the premium cost when calculating option profit"};
  },
],

"Corporate Issuers": [
  // WACC calculation
  ()=>{
    const wd=rnd(30,50);const we=100-wd;const rd=rnd(4,8);const re=rnd(10,16);const t=rnd(25,35);
    const wacc=parseFloat((wd/100*rd/100*(1-t/100)+we/100*re/100)*100).toFixed(2);
    const wrong1=parseFloat((wd/100*rd/100+we/100*re/100)*100).toFixed(2);
    const wrong2=parseFloat(((rd+re)/2)).toFixed(2);
    return{question:`A firm's capital structure is ${wd}% debt (pre-tax cost ${rd}%) and ${we}% equity (cost ${re}%), with a marginal tax rate of ${t}%. What is the WACC?`,options:{A:`${wacc}%`,B:`${wrong1}% (pre-tax cost of debt used — no tax shield applied)`,C:`${wrong2}% (simple average of debt and equity costs)`},answer:"A",explanation:`WACC = w_d × r_d × (1−t) + w_e × r_e = ${wd}% × ${rd}% × (1−${t}%) + ${we}% × ${re}% = ${wacc}%. The after-tax cost of debt accounts for the tax deductibility of interest (the interest tax shield). Always use marginal tax rate and market-value weights, not book-value weights.`,concept:"WACC",los_tested:"calculate and interpret the weighted-average cost of capital for a company",misconception_targeted:"using pre-tax cost of debt or simple average instead of WACC formula"};
  },
  // Modigliani-Miller
  ()=>{
    const scenario=pick([
      {tax:"no taxes","MM":"firm value is unaffected by capital structure — the total value of the firm depends only on its operating cash flows, not how they are divided between debt and equity holders",wrong1:"increasing debt always increases firm value via the interest tax shield",wrong2:"firms should use maximum equity to minimise financial distress risk"},
      {tax:"corporate taxes (no financial distress costs)","MM":"firm value increases with leverage because interest payments are tax-deductible, creating an interest tax shield",wrong1:"firm value is unaffected by capital structure — the tax shield has no value",wrong2:"firm value decreases with leverage because more debt increases required equity returns"}
    ]);
    return{question:`Under the Modigliani-Miller framework with ${scenario.tax}, which proposition is correct regarding capital structure?`,options:{A:scenario["MM"],B:scenario.wrong1,C:scenario.wrong2},answer:"A",explanation:`MM with ${scenario.tax}: ${scenario["MM"]}. The MM irrelevance theorem (no taxes) established that in a perfect market, the value of a levered firm equals the value of an unlevered firm. Adding corporate taxes introduces the interest tax shield (PV of tax shield = T×D), making debt financing beneficial up to the point where financial distress costs offset the shield.`,concept:"Modigliani-Miller Capital Structure",los_tested:"explain the Modigliani-Miller propositions regarding capital structure",misconception_targeted:"reversing the MM conclusions about the role of taxes in capital structure"};
  },
  // Dividend policy irrelevance
  ()=>{
    return{question:`Under Miller and Modigliani's dividend irrelevance proposition (perfect markets), which statement is CORRECT?`,options:{A:`A firm's dividend policy has no effect on shareholder wealth — investors can create homemade dividends by selling shares`,B:`Higher dividends always increase stock price because they signal management confidence`,C:`Firms should retain all earnings since dividends are taxed at a higher rate than capital gains`},answer:"A",explanation:`Under MM (perfect markets, no taxes, no transaction costs): dividend policy is irrelevant. Shareholders can create 'homemade dividends' by selling shares if they want cash, or reinvest dividends if they prefer capital gains. Real-world factors that matter: taxes (preferring capital gains), signalling (dividends signal confidence), clientele effect (different investors prefer different payout policies), and agency costs.`,concept:"Dividend Policy Irrelevance",los_tested:"describe MM propositions regarding dividend policy",misconception_targeted:"assuming dividends always increase value or that retained earnings are always preferable"};
  },
  // NPV vs IRR conflict
  ()=>{
    // Generate guaranteed NPV-IRR conflict: NPV winner ≠ IRR winner
    let npvA=rnd(80,200);let npvB=rnd(30,100);  // A wins on NPV
    let irrA=rnd(15,20);let irrB=rnd(22,32);     // B wins on IRR
    // Randomly swap so the "correct" answer isn't always A
    if(Math.random()>0.5){const t1=npvA;npvA=npvB;npvB=t1;const t2=irrA;irrA=irrB;irrB=t2;}
    const npvWinner=npvA>npvB?"A":"B";const irrWinner=irrA>irrB?"A":"B";
    const loser=npvWinner==="A"?"B":"A";
    return{question:`Two mutually exclusive projects: Project A has NPV = $${npvA}K and IRR = ${irrA}%. Project B has NPV = $${npvB}K and IRR = ${irrB}%. Which project should be selected, and why?`,options:{A:`Project ${npvWinner} — when NPV and IRR conflict, NPV is the correct criterion for mutually exclusive projects`,B:`Project ${irrWinner} — always select the project with the higher IRR`,C:`Project ${loser} — it has the better risk-adjusted return`},answer:"A",explanation:`When NPV and IRR conflict for mutually exclusive projects, NPV is the theoretically correct decision rule. NPV measures the absolute dollar value added to shareholder wealth. IRR can be misleading because it implicitly assumes cash flows are reinvested at the IRR rate (often unrealistic) and ignores project scale. Project ${npvWinner} (NPV = $${Math.max(npvA,npvB)}K) creates more value for shareholders despite having the lower IRR of ${Math.min(irrA,irrB)}%.`,concept:"NPV vs IRR",los_tested:"describe the capital allocation process calculate NPV IRR and ROIC and contrast their use in capital allocation",misconception_targeted:"choosing the higher IRR over the higher NPV for mutually exclusive projects"};
  },
],

"Portfolio Management": [
  // CML vs SML
  ()=>{
    return{question:`An analyst plots two lines on a risk-return graph: the Capital Market Line (CML) and the Security Market Line (SML). Which statement BEST distinguishes them?`,options:{A:`The CML uses total risk (standard deviation) on the x-axis and applies only to efficient portfolios; the SML uses systematic risk (beta) and applies to all assets and portfolios`,B:`The CML uses beta on the x-axis and applies to all assets; the SML uses standard deviation and applies only to efficient portfolios`,C:`The CML and SML are the same line — both plot expected return against market risk`},answer:"A",explanation:`CML: x-axis = portfolio standard deviation (total risk); valid only for efficient portfolios on the efficient frontier. SML: x-axis = beta (systematic risk); valid for all individual assets and portfolios, efficient or not. An underpriced asset plots above the SML (positive alpha); an overpriced asset plots below it. Both lines share the risk-free rate as the y-intercept.`,concept:"CML vs SML",los_tested:"explain the capital market line CML and the security market line SML",misconception_targeted:"confusing which risk measure and which investment universe applies to CML vs SML"};
  },
  // CAPM expected return
  ()=>{
    const rf=rnd(2,4);const rm=rnd(8,12);const beta=parseFloat(rnd(60,180)/100).toFixed(2);
    const er=parseFloat((rf+(rm-rf)*parseFloat(beta))).toFixed(2);
    const wrong1=parseFloat((rf*parseFloat(beta)+(rm-rf))).toFixed(2);
    const wrong2=parseFloat((rm*parseFloat(beta))).toFixed(2);
    return{question:`The risk-free rate is ${rf}%, the expected market return is ${rm}%, and a stock has a beta of ${beta}. What is the expected return using CAPM?`,options:{A:`${er}%`,B:`${wrong1}% (beta applied to risk-free rate)`,C:`${wrong2}% (beta × market return, ignores risk-free)`},answer:"A",explanation:`CAPM: E(R) = Rf + β×(E(Rm)−Rf) = ${rf}% + ${beta}×(${rm}%−${rf}%) = ${rf}% + ${beta}×${rm-rf}% = ${er}%. The equity risk premium is (Rm−Rf), not Rm itself. Beta scales the market risk premium.`,concept:"CAPM",los_tested:"calculate and interpret the expected return of an asset using the CAPM",misconception_targeted:"applying beta to the full market return rather than the equity risk premium"};
  },
  // Systematic vs unsystematic risk
  ()=>{
    const stocks=rnd(1,3);const stocks2=rnd(20,30);
    return{question:`An investor holds a portfolio of ${stocks} stock${stocks>1?"s":""}. By adding more stocks to reach ${stocks2}, the investor can most effectively reduce:`,options:{A:`Systematic (market) risk`,B:`Unsystematic (company-specific) risk`,C:`Both systematic and unsystematic risk equally`},answer:"B",explanation:`Diversification eliminates unsystematic (company-specific) risk — the unique risk of individual securities. Systematic risk (market risk, measured by beta) CANNOT be diversified away as it affects all assets simultaneously. A well-diversified portfolio retains only systematic risk.`,concept:"Diversification",los_tested:"explain systematic and nonsystematic risk and why an investor should not expect to receive additional return for bearing nonsystematic risk",misconception_targeted:"thinking diversification reduces systematic risk"};
  },
  // Sharpe vs Treynor
  ()=>{
    return{question:`An analyst is evaluating a portfolio manager who runs one of many sub-portfolios within a larger pension fund. Which performance measure is MOST appropriate?`,options:{A:`Sharpe ratio — it uses total risk and is always the best measure`,B:`Treynor ratio — when the portfolio is combined with others, only systematic risk (beta) is relevant`,C:`Jensen's alpha — it always provides the most accurate risk-adjusted return`},answer:"B",explanation:`Use Treynor ratio when the portfolio is part of a diversified whole — unsystematic risk is diversified away at the total fund level, so only beta (systematic risk) matters. Use Sharpe ratio when the portfolio represents an investor's entire wealth. Jensen's alpha is useful but doesn't rank portfolios with different risk levels.`,concept:"Performance Measures",los_tested:"calculate and interpret the Sharpe ratio Treynor ratio M2 and Jensen's alpha",misconception_targeted:"using Sharpe ratio regardless of whether the portfolio is a component of a larger portfolio"};
  },
],

"Economics": [
  // Business cycles
  ()=>{
    const phase=pick(["expansion","peak","contraction","trough"]);
    const indicators={
      "expansion":"rising GDP, falling unemployment, increasing consumer spending, rising inflation",
      "peak":"GDP at maximum, unemployment at minimum, inflation high, leading indicators turning down",
      "contraction":"falling GDP, rising unemployment, declining consumer confidence, falling inflation",
      "trough":"GDP at minimum, unemployment at maximum, leading indicators turning up, accommodative monetary policy"
    };
    const next={"expansion":"peak","peak":"contraction","contraction":"trough","trough":"expansion"};
    const wrong1=pick(Object.keys(indicators).filter(p=>p!==phase));
    const wrong2=pick(Object.keys(indicators).filter(p=>p!==phase&&p!==wrong1));
    return{question:`An economy shows: ${indicators[phase]}. Which phase of the business cycle is this MOST consistent with?`,options:{A:phase.charAt(0).toUpperCase()+phase.slice(1),B:wrong1.charAt(0).toUpperCase()+wrong1.slice(1),C:wrong2.charAt(0).toUpperCase()+wrong2.slice(1)},answer:"A",explanation:`These characteristics describe the ${phase} phase. The next phase is typically ${next[phase]}. During ${phase}: ${indicators[phase]}.`,concept:"Business Cycles",los_tested:"describe the business cycle and its phases",misconception_targeted:"confusing adjacent business cycle phases"};
  },
  // Monetary policy
  ()=>{
    const action=pick(["raise","lower"]);const rationale=action==="raise"?"combat inflation (economy overheating)":"stimulate growth (economy slowing)";
    const effect1=action==="raise"?"borrowing costs rise, investment falls, aggregate demand decreases":"borrowing costs fall, investment rises, aggregate demand increases";
    const effect2=action==="raise"?"currency typically appreciates (higher yields attract foreign capital)":"currency typically depreciates (lower yields reduce foreign capital inflows)";
    const wrong1=action==="raise"?"Stimulate borrowing and increase aggregate demand":"Reduce borrowing costs and slow the economy";
    const wrong2=action==="raise"?"Depreciate the currency to boost exports":"Appreciate the currency to increase inflation";
    return{question:`A central bank decides to ${action} its policy interest rate. The MOST likely primary objective is to ${rationale}. Which effect on the economy is MOST expected?`,options:{A:effect1,B:wrong1,C:wrong2},answer:"A",explanation:`When a central bank ${action}s rates: ${effect1}. Additionally, ${effect2}. Central banks use interest rates as the primary tool for managing the money supply and economic activity.`,concept:"Monetary Policy",los_tested:"describe how monetary policy affects the economy",misconception_targeted:"reversing the direction of monetary policy effects"};
  },
  // Fiscal policy
  ()=>{
    const policy=pick(["expansionary","contractionary"]);
    const tools=policy==="expansionary"?"increasing government spending or cutting taxes":"decreasing government spending or raising taxes";
    const effect=policy==="expansionary"?"increases aggregate demand, stimulates GDP growth, may raise inflation":"reduces aggregate demand, slows GDP growth, may lower inflation";
    const crowd=policy==="expansionary"?"Crowding out: higher government borrowing may raise interest rates, reducing private investment":"Fiscal drag: reduced spending and higher taxes reduce private sector activity";
    const wrong=policy==="expansionary"?"reduces aggregate demand and slows growth":"stimulates aggregate demand and increases growth";
    return{question:`A government pursues ${policy} fiscal policy through ${tools}. Which outcome is MOST likely?`,options:{A:effect,B:wrong,C:"Has no effect on aggregate demand or inflation"},answer:"A",explanation:`${policy.charAt(0).toUpperCase()+policy.slice(1)} fiscal policy ${effect}. Key side effect: ${crowd}. Fiscal multiplier: the ultimate GDP impact exceeds the initial spending change.`,concept:"Fiscal Policy",los_tested:"describe how fiscal policy affects the economy",misconception_targeted:"confusing expansionary and contractionary fiscal effects"};
  },
  // GDP components
  ()=>{
    const component=pick(["consumption (C)","investment (I)","government spending (G)","net exports (X-M)"]);
    const desc={"consumption (C)":"largest component of GDP (~70% in most economies); household spending on goods and services","investment (I)":"business spending on capital goods, inventory changes, and residential construction","government spending (G)":"federal, state, and local purchases of goods and services (excludes transfer payments)","net exports (X-M)":"exports minus imports; negative when imports exceed exports (trade deficit)"};
    const wrong1=pick(Object.keys(desc).filter(c=>c!==component));
    const wrong2=pick(Object.keys(desc).filter(c=>c!==component&&c!==wrong1));
    return{question:`In the expenditure approach to GDP, which component is described as: "${desc[component]}"?`,options:{A:component,B:wrong1,C:wrong2},answer:"A",explanation:`GDP = C + I + G + (X-M). ${component}: ${desc[component]}. Note: transfer payments (welfare, pensions) are NOT included in G because no good/service is produced.`,concept:"GDP Components",los_tested:"calculate and describe GDP using the expenditure approach",misconception_targeted:"including transfer payments in government spending component"};
  },
  // Market structures
  ()=>{
    const structure=pick(["perfect competition","monopolistic competition","oligopoly","monopoly"]);
    const features={
      "perfect competition":"many sellers, homogeneous products, free entry/exit, price takers",
      "monopolistic competition":"many sellers, differentiated products, relatively easy entry, some pricing power",
      "oligopoly":"few sellers, high barriers to entry, mutual interdependence, kinked demand curve",
      "monopoly":"single seller, unique product, very high barriers to entry, price maker"
    };
    const longrun={
      "perfect competition":"economic profit = 0 (P = MC = ATC)",
      "monopolistic competition":"economic profit = 0, but P > MC (excess capacity)",
      "oligopoly":"may earn positive economic profit due to barriers",
      "monopoly":"may earn sustained economic profit due to barriers"
    };
    return{question:`Which market structure is BEST described by these characteristics: ${features[structure]}?`,options:{A:structure.charAt(0).toUpperCase()+structure.slice(1),B:pick(["perfect competition","monopolistic competition","oligopoly","monopoly"].filter(s=>s!==structure)),C:pick(["perfect competition","monopolistic competition","oligopoly","monopoly"].filter(s=>s!==structure&&s!==pick(["perfect competition","monopolistic competition","oligopoly","monopoly"].filter(s=>s!==structure))))},answer:"A",explanation:`The described structure is ${structure}. Key long-run outcome: ${longrun[structure]}. In the long run, free entry/exit eliminates economic profit in competitive markets, while barriers preserve it in oligopoly and monopoly.`,concept:"Market Structures",los_tested:"describe characteristics of perfect competition monopolistic competition oligopoly and pure monopoly",misconception_targeted:"confusing features of adjacent market structures"};
  },
],

"Alternatives": [
  // Hedge fund strategies
  ()=>{
    const strategy=pick(["long/short equity","global macro","event-driven","relative value"]);
    const desc={
      "long/short equity":"takes long positions in undervalued stocks and short positions in overvalued stocks; net market exposure varies",
      "global macro":"takes positions across asset classes (equities, FX, rates, commodities) based on macroeconomic views",
      "event-driven":"exploits pricing inefficiencies around corporate events such as mergers, spin-offs, and restructurings",
      "relative value":"exploits pricing discrepancies between related instruments (e.g., convertible bond arbitrage, fixed income arbitrage)"
    };
    const wrong1=pick(Object.keys(desc).filter(s=>s!==strategy));
    const wrong2=pick(Object.keys(desc).filter(s=>s!==strategy&&s!==wrong1));
    return{question:`A hedge fund "${desc[strategy]}." This fund is BEST classified as which strategy?`,options:{A:strategy,B:wrong1,C:wrong2},answer:"A",explanation:`${strategy.charAt(0).toUpperCase()+strategy.slice(1)}: ${desc[strategy]}. Key distinction: long/short equity has equity market beta exposure; global macro takes directional macro bets; event-driven requires catalyst; relative value is market-neutral with spread risk.`,concept:"Hedge Fund Strategies",los_tested:"describe hedge funds types characteristics and strategies",misconception_targeted:"confusing event-driven with global macro strategies"};
  },
  // Private equity stages
  ()=>{
    const stage=pick(["seed","venture capital","growth equity","leveraged buyout"]);
    const desc={
      "seed":"provides capital to develop a business concept; highest risk, pre-revenue",
      "venture capital":"funds early-stage companies with proven concept but limited revenue; equity financing",
      "growth equity":"invests in established companies seeking expansion capital without changing control",
      "leveraged buyout":"acquires a mature company using significant debt; aims to improve operations and exit via sale or IPO"
    };
    const wrong1=pick(Object.keys(desc).filter(s=>s!==stage));
    const wrong2=pick(Object.keys(desc).filter(s=>s!==stage&&s!==wrong1));
    return{question:`A PE investor "${desc[stage]}." This investment is BEST described as:`,options:{A:stage,B:wrong1,C:wrong2},answer:"A",explanation:`${stage.charAt(0).toUpperCase()+stage.slice(1)}: ${desc[stage]}. LBO uses highest leverage (50-70% debt). Venture has highest equity return potential but highest failure rate. Growth equity is minority stake with no control change.`,concept:"Private Equity Stages",los_tested:"describe private equity strategies including venture capital growth equity and LBOs",misconception_targeted:"confusing growth equity with LBO (control vs minority)"};
  },
  // Real estate
  ()=>{
    const capRate=parseFloat((rnd(4,8)+Math.random()).toFixed(1));
    const noi=rnd(800,2000)*1000;
    const value=Math.round(noi/capRate*100);
    const wrongLow=Math.round(noi/(capRate+2)*100);
    const wrongHigh=Math.round(noi/(capRate-1.5)*100);
    return{question:`A commercial property generates NOI of $${(noi/1000).toFixed(0)}K per year. Market cap rates for comparable properties are ${capRate}%. What is the estimated property value?`,options:{A:`$${(value/1000).toFixed(0)}K`,B:`$${(wrongLow/1000).toFixed(0)}K`,C:`$${(wrongHigh/1000).toFixed(0)}K`},answer:"A",explanation:`Property Value = NOI ÷ Cap Rate = $${(noi/1000).toFixed(0)}K ÷ ${capRate}% = $${(value/1000).toFixed(0)}K. The cap rate is the NOI yield — a higher cap rate means lower value (more risk). Common error: dividing by the wrong cap rate or inverting the formula.`,concept:"Real Estate Valuation",los_tested:"calculate and interpret the value of real estate using the income approach",misconception_targeted:"inverting NOI/cap rate or using wrong cap rate"};
  },
  // Commodity characteristics
  ()=>{
    const commodity=pick(["gold","oil","agricultural commodities","infrastructure"]);
    const char={
      "gold":"store of value, inflation hedge, low correlation with equities, no income stream",
      "oil":"economically sensitive, geopolitical risk, contango/backwardation roll yield, income via futures",
      "agricultural commodities":"seasonal price patterns, weather-dependent supply, perishable (storage costs), speculative demand",
      "infrastructure":"long-duration cash flows, regulated monopoly characteristics, inflation-linked revenues, illiquid"
    };
    const hedge={
      "gold":"inflation and currency debasement",
      "oil":"energy cost inflation and geopolitical disruption",
      "agricultural commodities":"food price inflation",
      "infrastructure":"inflation via regulated price escalators"
    };
    const wrong1=pick(Object.keys(char).filter(c=>c!==commodity));
    const wrong2=pick(Object.keys(char).filter(c=>c!==commodity&&c!==wrong1));
    return{question:`An investor wants exposure to an asset with these characteristics: "${char[commodity]}." Which alternative investment is the BEST match?`,options:{A:commodity,B:wrong1,C:wrong2},answer:"A",explanation:`${commodity.charAt(0).toUpperCase()+commodity.slice(1)}: ${char[commodity]}. Primary hedge use: ${hedge[commodity]}. Key consideration for portfolio allocation: real assets typically have low correlation with financial assets, providing diversification benefits.`,concept:"Commodity Characteristics",los_tested:"describe investment characteristics of alternative investments",misconception_targeted:"confusing commodity inflation-hedging properties across asset types"};
  },
  // 2-and-20 fee structure
  ()=>{
    const committed=rnd(50,200);const mgmt=2;const carry=20;
    const hurdle=rnd(6,10);const grossReturn=rnd(15,30);
    const grossProfit=parseFloat((committed*grossReturn/100)).toFixed(1);
    const mgmtFee=parseFloat((committed*mgmt/100)).toFixed(1);
    const carriedInterest=parseFloat(((parseFloat(grossProfit)-committed*hurdle/100)*carry/100)).toFixed(1);
    const netToInvestor=parseFloat((parseFloat(grossProfit)-parseFloat(mgmtFee)-parseFloat(carriedInterest))).toFixed(1);
    return{question:`A PE fund has $${committed}M committed capital, a ${mgmt}-and-${carry} fee structure, and a ${hurdle}% hurdle rate. The fund earns a gross return of ${grossReturn}%. What is the carried interest?`,options:{A:`$${carriedInterest}M`,B:`$${parseFloat((parseFloat(grossProfit)*carry/100)).toFixed(1)}M (no hurdle deducted)`,C:`$${parseFloat((committed*carry/100)).toFixed(1)}M (applied to committed capital)`},answer:"A",explanation:`Carried interest = ${carry}% × (Gross Profit − Hurdle). Gross Profit = $${committed}M × ${grossReturn}% = $${grossProfit}M. Hurdle = $${committed}M × ${hurdle}% = $${committed*hurdle/100}M. Carry = ${carry}% × ($${grossProfit}M − $${committed*hurdle/100}M) = $${carriedInterest}M. The hurdle rate must be exceeded before carry is earned.`,concept:"PE Fee Structure",los_tested:"calculate and interpret alternative investment returns both before and after fees",misconception_targeted:"applying carried interest to gross profit without subtracting hurdle"};
  },
],

};

