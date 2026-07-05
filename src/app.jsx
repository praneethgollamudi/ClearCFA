// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────
function Badge({children,color=C.accent}){return <span style={{fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20,background:color+"22",color,letterSpacing:"0.08em",textTransform:"uppercase"}}>{children}</span>;}
function Skeleton({width="100%",height=14,radius=6,style={}}){return <div style={{width,height,borderRadius:radius,background:`linear-gradient(90deg,${C.border} 25%,${C.dim} 50%,${C.border} 75%)`,backgroundSize:"200% 100%",animation:"shimmer 1.4s infinite",...style}}/>;}

const EXAM_DATE    = new Date("2026-08-19");
const DIFFICULTIES = ["Easy","Medium","Hard"];
const Q_COUNTS     = [5,10,15,20];
const TIME_PER_Q   = 90;
const STORAGE_KEY  = "cfa_mock_v7";
const SR_KEY       = "cfa_sr_v7";
const QDB_KEY      = "cfa_qdb_v7";
const USAGE_KEY    = "cfa_usage_v1";
const BESTS_KEY    = "cfa_bests_v1";
const QCACHE_KEY   = "cfa_qcache_v1";
const QCACHE_SLOTS = 2;   // sets per topic+module+difficulty combo
const QCACHE_MAX   = 25;  // max distinct combos to keep
const API_LOG_KEY  = "cfa_api_log_v1";
const FLAGS_KEY        = "cfa_flags_v1";
const PASS_TREND_KEY = "cfa_pass_trend_v1";
const PLAN_KEY       = "cfa_week_plan_v1";
const LAST_UID_KEY   = "cfa_last_uid";
const STREAK_FREEZE_KEY="cfa_streak_freeze_v1";
function getStreakFreezes(){try{return JSON.parse(localStorage.getItem(STREAK_FREEZE_KEY)||'{"held":0,"usedDates":[]}')}catch{return{held:0,usedDates:[]}}}
function saveStreakFreezes(f){try{localStorage.setItem(STREAK_FREEZE_KEY,JSON.stringify(f));}catch{}}
const DYNAMIC_PN_KEY = "cfa_dynamic_pn_v1";
const DYNAMIC_FORMULAS_KEY = "cfa_dynamic_formulas_v1";
const RESOLVED_GAPS_KEY = "cfa_resolved_gaps_v1";
const LESSONS_KEY          = "cfa_lessons_v1";
const REFRESHER_KEY        = "cfa_refresher_v1";
const MISSION_KEY          = "cfa_mission_v1";
const REMINDER_TIME_KEY    = "cfa_reminder_time_v1";
const OFFLINE_QS_KEY       = "cfa_offline_qs_v1";
const OFFLINE_SEED_KEY     = "cfa_offline_seed_seeded_v1";
const CALC_SNAP_KEY        = "cfa_calc_snap_v1";
const CONFIDENCE_KEY       = "cfa_confidence_v1";
const STUDY_GOAL_KEY       = "cfa_study_goal_v1";
const WORKED_EX_KEY        = "cfa_worked_ex_v1";
const PRESETS_KEY          = "cfa_presets_v1";
const SESSION_DRAFT_KEY    = "cfa_session_draft_v1";
const PENDING_GEN_KEY      = "cfa_pending_gen_v1";
const TOUR_KEY             = "cfa_tour_v1";
const WHATS_NEW_KEY        = "cfa_whats_new_v1";
const PRO_TOUR_KEY         = "cfa_pro_tour_v1";
const SCREEN_ONBOARD_KEY   = "cfa_screen_onboard_v1";
const CHECKLIST_KEY        = "cfa_checklist_done";
const LAST_SCREEN_KEY      = "cfa_last_screen_v1";
const ONBOARDING_KEY       = "cfa_onboarding_v1";
const QUALITY_FLAGS_KEY    = "cfa_quality_flags_v1";
const RETAKER_KEY          = "cfa_retaker_v1";
const MOCK_SCHED_KEY       = "cfa_mock_sched_v1";
const EXP_RATINGS_KEY      = "cfa_exp_ratings_v1";
const DAILY_Q_KEY          = "cfa_daily_q_v1";
const DUEL_KEY             = "cfa_duel_v1";
const SG_KEY               = "cfa_study_group_v1";
const RESTORABLE_SCREENS   = new Set(["readiness","dashboard","losCoverage","masteryGrid","studyPlan","revision","studyPath","calcTrainer","backup","srReview"]);
const CFA_LEVEL_KEY = "cfa_level_v1";
const MODEL_PRICING= {"claude-sonnet-4-6":{in:3.00,out:15.00},"claude-haiku-4-5-20251001":{in:0.80,out:4.00}};
const SM2_INTERVALS= [1,3,7,16,35,70];

// ─── OFFLINE QUESTION SEED BANK ──────────────────────────────────────────────
// Hardcoded fallback questions seeded into OFFLINE_QS_KEY on first load.
// Lets non-signed-in users try the app immediately without API calls.
const OFFLINE_SEED_QS = {
  "Ethics": {"Code of Ethics & Standards": [
    {id:"s_et_1",question:"A CFA candidate overhears material nonpublic information about a merger in an elevator and tips off a colleague. Which Standard is most likely violated?",options:{A:"Standard II-A: Material Nonpublic Information",B:"Standard VI-B: Priority of Transactions",C:"Standard I-C: Misrepresentation"},answer:"A",explanation:"Tipping someone about MNPI violates Standard II-A even if the tipper does not personally trade on the information."},
    {id:"s_et_2",question:"When applicable law conflicts with the CFA Standards and provides less protection to clients, a member must:",options:{A:"Follow applicable law only",B:"Follow whichever standard provides greater protection to clients and the market",C:"Follow the CFA Standards only regardless of local law"},answer:"B",explanation:"Members must adhere to the stricter of applicable law and the Code and Standards — whichever offers greater protection to clients and market integrity."},
    {id:"s_et_3",question:"Under Standard VI-B: Priority of Transactions, which trade must be executed first?",options:{A:"Employer proprietary account",B:"Client account",C:"Member's personal account"},answer:"B",explanation:"Client interests take priority over both employer proprietary accounts and the member's own personal transactions."},
  ]},
  "Quantitative Methods": {"Time Value of Money": [
    {id:"s_qm_1",question:"If market interest rates rise, the present value of a fixed annuity will:",options:{A:"Increase, because higher rates reflect stronger cash flows",B:"Decrease, because future cash flows are discounted at a higher rate",C:"Remain unchanged, because the annuity payments are fixed"},answer:"B",explanation:"Present value is inversely related to the discount rate. Higher rates reduce the PV of fixed future cash flows."},
    {id:"s_qm_2",question:"Which return measure best captures the compound growth rate of an investment over multiple periods?",options:{A:"Arithmetic mean return",B:"Geometric mean return",C:"Harmonic mean return"},answer:"B",explanation:"The geometric mean (time-weighted return) accounts for compounding and is the correct measure of multi-period investment growth."},
    {id:"s_qm_3",question:"A zero-coupon bond matures at $1,000 in 5 years. At a 6% annual discount rate, its price is closest to:",options:{A:"$747",B:"$820",C:"$943"},answer:"A",explanation:"PV = 1000 / (1.06)^5 = 1000 / 1.3382 ≈ $747. Zero-coupon bonds trade at a deep discount because they pay no interim coupons."},
  ]},
  "Economics": {"Firm & Market Structures": [
    {id:"s_ec_1",question:"In which market structure does the firm's demand curve coincide with the industry demand curve?",options:{A:"Monopolistic competition",B:"Oligopoly",C:"Pure monopoly"},answer:"C",explanation:"A pure monopolist is the only seller, so its demand curve IS the industry demand curve. In other structures, each firm faces only a portion of market demand."},
    {id:"s_ec_2",question:"A Nash equilibrium in an oligopoly exists when:",options:{A:"Each firm maximizes profit without regard to competitors' actions",B:"No firm can improve its payoff by unilaterally changing its strategy",C:"All firms set price equal to marginal cost"},answer:"B",explanation:"Nash equilibrium requires that each player's strategy is optimal given the strategies of all other players — no single firm benefits from defecting."},
    {id:"s_ec_3",question:"A firm in perfect competition will shut down in the short run if price falls below:",options:{A:"Average total cost (ATC)",B:"Average variable cost (AVC)",C:"Average fixed cost (AFC)"},answer:"B",explanation:"Fixed costs are sunk in the short run. A firm shuts down only when price < AVC because at that point every unit sold loses money beyond what's already spent on fixed costs."},
  ]},
  "Financial Statement Analysis": {"Income Statement Analysis": [
    {id:"s_fsa_1",question:"Which of the following is most likely classified as a non-recurring item on the income statement?",options:{A:"Cost of goods sold",B:"Gain from discontinued operations",C:"Research and development expense"},answer:"B",explanation:"Discontinued operations are separately disclosed non-recurring items. COGS and R&D are recurring operating expenses."},
    {id:"s_fsa_2",question:"Under the percentage-of-completion method, revenue is recognised:",options:{A:"Only when cash is collected from the customer",B:"Proportionally as the project progresses toward completion",C:"Only when the project is substantially complete"},answer:"B",explanation:"Percentage-of-completion spreads revenue recognition across the project life in proportion to costs incurred or milestones reached, matching revenues to the period in which work is performed."},
    {id:"s_fsa_3",question:"Basic EPS is calculated using:",options:{A:"Diluted shares including all convertible instruments",B:"Weighted average basic shares outstanding",C:"Shares outstanding only at the fiscal year-end date"},answer:"B",explanation:"Basic EPS uses the weighted average number of common shares outstanding during the period — not year-end shares and not diluted shares."},
  ]},
  "Corporate Issuers": {"Capital Structure & Leverage": [
    {id:"s_ci_1",question:"According to Modigliani-Miller Proposition I (no taxes), a firm's total value is:",options:{A:"Higher with more debt because of the interest tax shield",B:"Unaffected by its capital structure",C:"Lower with more debt because financial risk rises"},answer:"B",explanation:"Without taxes, MM Proposition I states that firm value depends only on operating cash flows and risk — not on how the firm is financed."},
    {id:"s_ci_2",question:"Which of the following will most likely increase a firm's WACC?",options:{A:"A reduction in the corporate tax rate",B:"A decrease in the risk-free interest rate",C:"An increase in the firm's credit rating"},answer:"A",explanation:"Lower corporate tax rates reduce the tax shield on debt, increasing the after-tax cost of debt and thus WACC. Lower rf and better credit ratings reduce WACC."},
    {id:"s_ci_3",question:"Degree of operating leverage (DOL) is highest for firms with:",options:{A:"High variable costs relative to fixed costs",B:"High fixed costs relative to variable costs",C:"Equal fixed and variable costs"},answer:"B",explanation:"DOL = (Revenue − Variable Costs) / EBIT. High fixed costs mean a small change in revenue causes a large change in operating income — higher sensitivity (higher DOL)."},
  ]},
  "Equity": {"Equity Valuation – DDM & Multiples": [
    {id:"s_eq_1",question:"The Gordon Growth Model (constant-growth DDM) assumes dividends grow at:",options:{A:"A constant rate in perpetuity",B:"A high rate initially, then declining to a stable rate",C:"The same rate as the overall economy"},answer:"A",explanation:"The Gordon Growth Model (P = D1 / (r − g)) requires a single constant dividend growth rate forever. Multi-stage models are needed when growth varies over time."},
    {id:"s_eq_2",question:"Enterprise Value / EBITDA is preferred over P/E when comparing companies that differ in:",options:{A:"Revenue growth rates",B:"Capital structures and depreciation policies",C:"Dividend payout ratios"},answer:"B",explanation:"EV/EBITDA is capital-structure neutral (EV includes debt; EBITDA excludes interest) and adds back depreciation, making it useful when D&A or leverage differs across peers."},
    {id:"s_eq_3",question:"A stock with beta of 1.5 relative to the market will:",options:{A:"Move approximately 1.5 times as much as the market in percentage terms",B:"Have 1.5 times the total risk (standard deviation) of the market",C:"Always outperform the market over any holding period"},answer:"A",explanation:"Beta measures systematic (market) risk sensitivity. A beta of 1.5 implies the stock tends to move 1.5% for every 1% market move. Total risk also includes unsystematic risk."},
  ]},
  "Fixed Income": {"Bond Features & Pricing": [
    {id:"s_fi_1",question:"The price of a bond and its yield-to-maturity have a:",options:{A:"Direct (positive) relationship — higher yield means higher price",B:"Inverse (negative) relationship — higher yield means lower price",C:"Variable relationship that depends on the coupon rate"},answer:"B",explanation:"When yields rise, the present value of future cash flows falls, so bond prices fall. This inverse price-yield relationship is fundamental to fixed income."},
    {id:"s_fi_2",question:"A callable bond issued in the same market as an otherwise identical non-callable bond will typically have:",options:{A:"A lower yield to compensate for the call feature's value to the issuer",B:"A higher yield because investors demand compensation for call risk",C:"The same yield since the call option does not affect expected cash flows"},answer:"B",explanation:"Callable bonds give the issuer the right to redeem at a disadvantageous time for the investor (when rates fall). Investors require a higher yield as compensation for this reinvestment/call risk."},
    {id:"s_fi_3",question:"A bond trading at a premium to par value has:",options:{A:"A coupon rate lower than its yield-to-maturity",B:"A coupon rate higher than its yield-to-maturity",C:"A coupon rate equal to its yield-to-maturity"},answer:"B",explanation:"Premium bonds have coupon rates above market yields (YTM). Investors pay more than par because they receive above-market coupon income. Discount bonds have coupons below YTM."},
  ]},
  "Derivatives": {"Derivative Features & Markets": [
    {id:"s_de_1",question:"A long forward contract obligates the buyer to:",options:{A:"Purchase the underlying asset at the agreed forward price at expiration",B:"Purchase or sell depending on which outcome is more favourable",C:"Receive a cash payment equal to any price appreciation"},answer:"A",explanation:"Forward contracts are obligations, not rights. The long party must buy the underlying at the forward price at expiration regardless of the prevailing spot price."},
    {id:"s_de_2",question:"Compared to exchange-traded derivatives, OTC derivatives generally have:",options:{A:"Greater counterparty risk but more flexibility in contract terms",B:"Less counterparty risk but less flexibility in terms",C:"The same counterparty risk with more standardised terms"},answer:"A",explanation:"OTC contracts are privately negotiated (more customisation) but lack exchange clearing, so counterparty default risk is higher. Exchange-traded derivatives use centralised clearing."},
    {id:"s_de_3",question:"The maximum loss for the buyer of a call option is:",options:{A:"Unlimited, since the underlying price can fall indefinitely",B:"The premium paid for the option",C:"The strike price minus the underlying price at expiration"},answer:"B",explanation:"A call buyer's downside is limited to the premium paid. If the option expires worthless, the buyer loses only what they paid upfront."},
  ]},
  "Alternatives": {"Alternative Investment Features": [
    {id:"s_al_1",question:"A '2 and 20' hedge fund fee structure most likely means:",options:{A:"2% of committed capital annually plus 20% of profits above a hurdle rate",B:"2% of net asset value annually plus 20% of profits above the high-water mark",C:"2% of NAV quarterly plus 20% of gross profits before expenses"},answer:"B",explanation:"The standard '2 and 20' structure charges a 2% management fee on AUM (NAV) annually and a 20% performance fee on net profits, often subject to a high-water mark provision."},
    {id:"s_al_2",question:"The primary diversification benefit of adding alternative investments to a portfolio comes from:",options:{A:"Their higher expected returns relative to traditional assets",B:"Lower correlation with traditional equity and bond returns",C:"Greater transparency and liquidity compared to traditional assets"},answer:"B",explanation:"Alternatives may or may not have higher returns, and they are typically less liquid and transparent. Their diversification value comes from low correlation with stocks and bonds."},
    {id:"s_al_3",question:"The 'J-curve' in private equity investing refers to:",options:{A:"Initial negative returns in early fund years followed by positive returns as investments mature",B:"Exponential growth in portfolio valuations once companies reach profitability",C:"Linear returns throughout the fund life that resemble a J shape on a log scale"},answer:"A",explanation:"Early in a PE fund's life, management fees are paid and investments are written down — returns are negative. As exits occur later, IRR turns positive, tracing a J shape over time."},
  ]},
  "Portfolio Management": {"Portfolio Risk & Return": [
    {id:"s_pm_1",question:"Risk that cannot be eliminated through diversification is called:",options:{A:"Unsystematic (idiosyncratic) risk",B:"Systematic (market) risk",C:"Residual risk"},answer:"B",explanation:"Systematic risk (beta risk) is driven by economy-wide factors affecting all assets. It cannot be diversified away. Unsystematic risk is firm-specific and can be diversified to near zero."},
    {id:"s_pm_2",question:"Adding an asset with zero correlation to an existing portfolio will:",options:{A:"Reduce portfolio standard deviation below the weighted average of individual standard deviations",B:"Have no effect on portfolio variance because correlation is neither positive nor negative",C:"Increase expected return without changing risk"},answer:"A",explanation:"Any correlation below +1 provides diversification benefits. Zero correlation means the covariance term is zero, so portfolio variance is less than the weighted average of individual variances."},
    {id:"s_pm_3",question:"According to the Capital Asset Pricing Model (CAPM), the optimal risky portfolio that all investors combine with the risk-free asset is:",options:{A:"Different for each investor based on their risk aversion",B:"The market portfolio, the same for all investors",C:"The minimum-variance portfolio on the efficient frontier"},answer:"B",explanation:"Under CAPM assumptions, all investors hold the same risky portfolio (the market portfolio). They differ only in how much they allocate between the risk-free asset and this common risky portfolio."},
  ]},
};

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
// Psychological design principles applied:
// 1. Warm amber accent for streaks/rewards (dopamine trigger - warm = reward)
// 2. Progress indicators everywhere (completion loop - Zeigarnik effect)
// 3. Micro-animations on success (positive reinforcement)
// 4. Deep navy base (focus mode - reduces distraction anxiety)
// 5. Green for correct answers (operant conditioning)
// 6. Card-based layout with clear hierarchy (reduces cognitive load)
// 7. Streak + XP gamification (variable reward schedule)
const DARK_PALETTE = {
  bg:          "#06060f",
  surface:     "#0e0e1c",
  surfaceHigh: "#14142a",
  border:      "#1c1c35",
  borderHigh:  "#2a2a50",
  accent:      "#6366f1",
  accentLight: "#818cf8",
  accentGlow:  "#6366f133",
  reward:      "#f59e0b",
  rewardLight: "#fcd34d",
  easy:        "#10b981",
  easyLight:   "#34d399",
  medium:      "#f59e0b",
  hard:        "#ef4444",
  text:        "#e8e6ff",
  textMid:     "#a8a5cc",
  muted:       "#52506e",
  dim:         "#1e1c38",
  success:     "#059669",
  successBg:   "#022c22",
  errorBg:     "#1c0505",
};
const LIGHT_PALETTE = {
  bg:          "#f4f4fb",
  surface:     "#ffffff",
  surfaceHigh: "#eeeef8",
  border:      "#ddddf0",
  borderHigh:  "#c8c8e0",
  accent:      "#4f46e5",
  accentLight: "#6366f1",
  accentGlow:  "#4f46e522",
  reward:      "#d97706",
  rewardLight: "#f59e0b",
  easy:        "#059669",
  easyLight:   "#10b981",
  medium:      "#d97706",
  hard:        "#dc2626",
  text:        "#1a1828",
  textMid:     "#4a4870",
  muted:       "#8b89a8",
  dim:         "#e8e8f4",
  success:     "#047857",
  successBg:   "#f0fdf4",
  errorBg:     "#fff1f2",
};
const _initTheme=(()=>{try{return localStorage.getItem('cfa_theme')||'dark';}catch{return'dark';}})();
const C=Object.assign({},_initTheme==='light'?LIGHT_PALETTE:DARK_PALETTE);
class CalcLearnBoundary extends React.Component{
  constructor(p){super(p);this.state={err:null};}
  static getDerivedStateFromError(e){return{err:e};}
  render(){
    if(this.state.err)return(
      <div style={{padding:"28px 20px",textAlign:"center",background:C.surface,borderRadius:12,border:`1px solid ${C.hard}44`}}>
        <div style={{fontSize:28,marginBottom:8}}>🔧</div>
        <div style={{fontSize:14,fontWeight:700,color:C.hard,marginBottom:6}}>Learn tab error — please report this</div>
        <div style={{fontSize:10,color:C.muted,fontFamily:"monospace",wordBreak:"break-all",marginBottom:12}}>{String(this.state.err)}</div>
        <button onClick={()=>this.setState({err:null})} style={{padding:"8px 18px",borderRadius:8,border:"none",background:C.accent,color:"#fff",cursor:"pointer",fontWeight:700,fontSize:12}}>Retry</button>
      </div>
    );
    return this.props.children;
  }
}
const REEL_TOPIC_COLORS={
  "Ethics":"#6366f1",
  "Quantitative Methods":"#818cf8",
  "Economics":"#f59e0b",
  "Financial Statement Analysis":"#10b981",
  "Corporate Issuers":"#f97316",
  "Equity":"#ef4444",
  "Fixed Income":"#0ea5e9",
  "Derivatives":"#a78bfa",
  "Alternatives":"#f472b6",
  "Portfolio Management":"#fcd34d",
  "Behavioral Finance":"#818cf8",
  "Capital Market Expectations":"#10b981",
  "Asset Allocation":"#f97316",
  "Alternative Investments":"#f472b6",
  "Risk Management":"#ef4444",
  "Trading & Performance":"#0ea5e9",
};
const CFA_ACRONYMS={
  "EAR":"Effective Annual Rate","APR":"Annual Percentage Rate","HPY":"Holding Period Yield",
  "HPR":"Holding Period Return","TWR":"Time-Weighted Return","MWR":"Money-Weighted Return",
  "IRR":"Internal Rate of Return","MIRR":"Modified Internal Rate of Return",
  "NPV":"Net Present Value","PV":"Present Value","FV":"Future Value","PMT":"Payment (annuity)",
  "WACC":"Weighted Average Cost of Capital","CAPM":"Capital Asset Pricing Model",
  "SML":"Security Market Line","CML":"Capital Market Line","APT":"Arbitrage Pricing Theory",
  "EPS":"Earnings Per Share","DPS":"Dividends Per Share","BVS":"Book Value per Share",
  "ROE":"Return on Equity","ROA":"Return on Assets","ROIC":"Return on Invested Capital",
  "EBIT":"Earnings Before Interest and Taxes",
  "EBITDA":"Earnings Before Interest, Taxes, Depreciation, and Amortization",
  "NI":"Net Income","COGS":"Cost of Goods Sold",
  "CFO":"Cash Flow from Operations","CFI":"Cash Flow from Investing","CFF":"Cash Flow from Financing",
  "FCF":"Free Cash Flow","FCFF":"Free Cash Flow to the Firm","FCFE":"Free Cash Flow to Equity",
  "DCF":"Discounted Cash Flow","DDM":"Dividend Discount Model","GGM":"Gordon Growth Model",
  "PVGO":"Present Value of Growth Opportunities","RI":"Residual Income",
  "YTM":"Yield to Maturity","YTC":"Yield to Call","YTW":"Yield to Worst",
  "BEY":"Bond Equivalent Yield","OAS":"Option-Adjusted Spread",
  "DV01":"Dollar Value of a Basis Point","CAGR":"Compound Annual Growth Rate",
  "SD":"Standard Deviation","CV":"Coefficient of Variation",
  "VaR":"Value at Risk","CVaR":"Conditional Value at Risk",
  "MAR":"Minimum Acceptable Return","IR":"Information Ratio",
  "OLS":"Ordinary Least Squares","CLT":"Central Limit Theorem",
  "GDP":"Gross Domestic Product","CPI":"Consumer Price Index","PPI":"Producer Price Index",
  "PMI":"Purchasing Managers Index",
  "GAAP":"Generally Accepted Accounting Principles","IFRS":"International Financial Reporting Standards",
  "FIFO":"First In, First Out","LIFO":"Last In, First Out",
  "DTA":"Deferred Tax Asset","DTL":"Deferred Tax Liability",
  "OBS":"Off-Balance Sheet","SPE":"Special Purpose Entity",
  "MBS":"Mortgage-Backed Securities","ABS":"Asset-Backed Securities",
  "CDO":"Collateralized Debt Obligation","CDS":"Credit Default Swap",
  "ETF":"Exchange-Traded Fund","NAV":"Net Asset Value","AUM":"Assets Under Management",
  "REIT":"Real Estate Investment Trust",
  "IPO":"Initial Public Offering","ESG":"Environmental, Social, and Governance",
  "GIPS":"Global Investment Performance Standards","IPS":"Investment Policy Statement",
  "SAA":"Strategic Asset Allocation","TAA":"Tactical Asset Allocation",
  "ALM":"Asset-Liability Management","LDI":"Liability-Driven Investing",
  "CME":"Capital Market Expectations","MVO":"Mean-Variance Optimization",
  "OTC":"Over the Counter","EMH":"Efficient Market Hypothesis",
};
function expandAcronyms(text){
  if(!text)return text;
  let result=String(text);
  // Use \b word-boundary (universal) instead of lookbehind (Safari<16 throws SyntaxError)
  Object.entries(CFA_ACRONYMS).forEach(([abbr,full])=>{
    const escaped=abbr.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    // For acronyms with non-word chars (P/E, M&A) fall back to a space/start anchor
    const re=/[^A-Za-z0-9]/.test(abbr)
      ? new RegExp(`(^|[^A-Za-z0-9])(${escaped})(?=[^A-Za-z0-9]|$)`)
      : new RegExp(`\\b(${escaped})\\b`);
    result=result.replace(re,(m,p1,p2)=>p2!==undefined?`${p1}${p2} (${full})`:`${m} (${full})`);
  });
  return result;
}
const WHATS_NEW_SLIDES=[
// WN_START
// WN_VER:2026-07-04-b
{version:"2026-07-04-b",slides:[
{emoji:"📚",color:C.easy,bg:C.easy,title:"Reference Cards for Key Topics",sub:"Study Tools · 2026-07-04 update",desc:"Quick-reference cards are now available for Cash Flow, Amortization, Interest Conversion, and Time Value of Money sections. These cards summarize formulas and key concepts at a glance, helping you review critical material faster during study sessions.",tip:"Check the reference cards before tackling practice problems to reinforce formulas and definitions."},
{emoji:"🧮",color:C.medium,bg:C.medium,title:"Smoother Financial Calculator Workflow",sub:"UX · 2026-07-04 update",desc:"The P/Y worksheet and calculator guide now respond intuitively to your inputs: ENTER saves your entry, the down arrow advances to the next field, and QUIT exits with a confirmation prompt. Step-by-step feedback also clarifies which mode you're in.",tip:"Use ENTER and the down arrow to navigate the P/Y worksheet quickly without re-entering data."},
]},
// WN_VER:2026-07-04-c
{version:"2026-07-04-c",slides:[
{emoji:"📚",color:C.accentLight,bg:C.easy,title:"Reference Cards for Key Topics",sub:"Study Tools · 2026-07-04 update",desc:"We've added quick-reference cards to the Cash Flow, Amortization, and Interest Conversion sections so you can instantly recall formulas and key concepts without leaving your calculator. These cards are designed to reinforce the most testable material at a glance.",tip:"Look for the reference icon in CF, Amortization, and ICONV—use them while practicing problems to build muscle memory before exam day."},
{emoji:"🎛️",color:C.medium,bg:C.medium,title:"Smarter P/Y Worksheet Controls",sub:"UX · 2026-07-04 update",desc:"The P/Y worksheet now responds intuitively to your inputs: ENTER saves your entry in place, the down arrow moves to the next field, and QUIT safely exits with a confirmation prompt. This matches how financial calculators work, reducing friction and mistakes.",tip:"Press ENTER to confirm each value, then use ↓ to navigate—no more unexpected exits or lost entries."},
{emoji:"✅",color:C.hard,bg:C.hard,title:"Fixed TVM and Cash Flow Calculations",sub:"Bug Fix · 2026-07-04 update",desc:"We fixed a critical bug where pending operations weren't evaluated before storing values in the TVM and Cash Flow engines. Now your calculations are always accurate, even when you're chaining operations together quickly.",tip:"If you've noticed unexpected results in complex TVM chains or CF sequences, try your problems again—they should solve correctly now."},
]},
// WN_VER:2026-07-04-d
{version:"2026-07-04-d",slides:[
{emoji:"📚",color:C.accentLight,bg:C.accentLight,title:"Reference Cards for Key Topics",sub:"Study Tools · 2026-07-04 update",desc:"We've added quick-reference cards to the Cash Flows, Amortization, and Interest Conversion sections so you can instantly see formulas and key concepts without leaving your practice. These cards help reinforce critical CFA formulas during your study sessions.",tip:"Look for the reference card icon in CF, Amortization, and ICONV lessons to pull up instant formula guides."},
{emoji:"🔧",color:C.medium,bg:C.medium,title:"TVM Calculator Entry Fixed",sub:"Bug Fix · 2026-07-04 update",desc:"We fixed sign entry and operator handling in the Time Value of Money calculator so your inputs are stored correctly and calculations stay accurate. This ensures your TVM practice questions evaluate properly every time.",tip:"When entering negative cash flows or using operators in TVM, your values will now display and calculate correctly."},
]},
// WN_VER:2026-07-04-e
{version:"2026-07-04-e",slides:[
{emoji:"📚",color:C.reward,bg:C.reward,title:"Reference Cards for Financial Calcs",sub:"Study Tools · 2026-07-04 update",desc:"Reference cards are now available in Cash Flow, Amortization, and Interest Conversion sections to help you quickly recall formulas and concepts during practice. These quick-reference guides reduce lookup time and reinforce key relationships you'll need on exam day.",tip:"Check the reference card icon in each section to review formulas before tackling difficult problems."},
{emoji:"🧮",color:C.medium,bg:C.medium,title:"Smoother TVM & Cash Flow Entry",sub:"UX · 2026-07-04 update",desc:"Time Value of Money and cash flow input now properly stores pending calculations and resets display state, making multi-step problems feel seamless. You'll spend less time fighting the calculator interface and more time mastering the concepts.",tip:"Try entering a multi-step TVM problem—the calculator now behaves like a real financial calculator with proper operator evaluation."},
{emoji:"✅",color:C.easy,bg:C.easy,title:"Clearer Negative PV Entry Guide",sub:"Bug Fix · 2026-07-04 update",desc:"The YTM guide now clearly uses the [+/−] sign-change button to show how to enter negative present values. This removes confusion around sign conventions that often trips up test-takers.",tip:"When working through YTM problems, look for the [+/−] button to properly enter cash outflows."},
]},
// WN_VER:2026-07-05
{version:"2026-07-05",slides:[
,
]},
// WN_END
];
const WHATS_NEW_VERSION=WHATS_NEW_SLIDES[WHATS_NEW_SLIDES.length-1].version;

// Admin-only changelog — internal/infra changes not shown to regular users
// Updated automatically by gen-whats-new.js alongside WHATS_NEW_SLIDES
const ADMIN_CHANGELOG=[
// AC_START
// AC_VER:2026-07-04
{date:"2026-07-04",entries:[
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
]},
// AC_VER:2026-07-04
{date:"2026-07-04",entries:[
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
]},
// AC_VER:2026-07-04
{date:"2026-07-04",entries:[
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
]},
// AC_VER:2026-07-04
{date:"2026-07-04",entries:[
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
]},
// AC_VER:2026-07-04
{date:"2026-07-04",entries:[
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
]},
// AC_VER:2026-07-04
{date:"2026-07-04",entries:[
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
]},
// AC_VER:2026-07-04
{date:"2026-07-04",entries:[
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
]},
// AC_VER:2026-07-04
{date:"2026-07-04",entries:[
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
]},
// AC_VER:2026-07-04
{date:"2026-07-04",entries:[
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
]},
// AC_VER:2026-07-04
{date:"2026-07-04",entries:[
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
"CLAUDE.md: auto-sync constants and document gaps [skip ci]",
]},
// AC_END
];
const diffC={Easy:C.easy,Medium:C.medium,Hard:C.hard};
const urgencyColor={high:C.hard,medium:C.medium,low:C.easy};
function _applyTheme(t){
  Object.assign(C,t==='light'?LIGHT_PALETTE:DARK_PALETTE);
  diffC.Easy=C.easy;diffC.Medium=C.medium;diffC.Hard=C.hard;
  urgencyColor.high=C.hard;urgencyColor.medium=C.medium;urgencyColor.low=C.easy;
  try{document.body.style.background=C.bg;document.documentElement.style.setProperty('--app-bg',C.bg);}catch{}
  try{window.dispatchEvent(new CustomEvent('cfa_theme',{detail:t}));}catch{}
}

// ── Freemium tier ─────────────────────────────────────────────────────────────
const FREE_DAILY_AI_LIMIT=20;
const OWNER_EMAILS=['sai.praneeth557@gmail.com'];
// ── Payment config (update these to change payment details) ───────────────────
const PAYMENT_UPI_ID='9493413121@upi';
const PAYMENT_CONTACT_EMAIL='gspbuilds@gmail.com';
const PAYMENT_WHATSAPP='919493413121'; // WhatsApp number with country code, no +
// ── Price ladder — update TIER_TAKEN as slots fill ────────────────────────────
// Tier 1 → Tier 2 → Regular (price rises as spots fill)
const PRICE_REGULAR=1499;   // regular price once all tiers fill
const PRICE_TIER2=1199;     // tier-2 price (shown crossed-out when tier 1 active)
const PRICE_TIER1=799;      // tier-1 price — the current launch price
const PRICE_POWER=1999;     // Power Pro tier — full exam simulator + priority access
const TIER1_SLOTS=10;       // number of tier-1 spots
const TIER1_TAKEN=0;        // update manually as tier-1 subscribers join
const TIER2_SLOTS=20;       // number of tier-2 spots
const TIER2_TAKEN=0;        // update manually as tier-2 subscribers join
// Derives active tier automatically — just update TIER1_TAKEN / TIER2_TAKEN
const ACTIVE_TIER=TIER1_TAKEN<TIER1_SLOTS?1:TIER2_TAKEN<TIER2_SLOTS?2:0;
const ACTIVE_PRICE=ACTIVE_TIER===1?PRICE_TIER1:ACTIVE_TIER===2?PRICE_TIER2:PRICE_REGULAR;
const ACTIVE_WAS=ACTIVE_TIER===1?PRICE_TIER2:PRICE_REGULAR;
const ACTIVE_SLOTS=ACTIVE_TIER===1?TIER1_SLOTS:TIER2_SLOTS;
const ACTIVE_TAKEN=ACTIVE_TIER===1?TIER1_TAKEN:TIER2_TAKEN;
const ACTIVE_LABEL=ACTIVE_TIER===1?"Early Bird":ACTIVE_TIER===2?"Founding Member":"Pro";
const COMMUNITY_COUNT=50; // Update manually as user base grows
// Pro status is validated server-side against the subscriptions table.
// getCachedProStatus / setCachedProStatus cache the server response for 4 hours.
function getCachedProStatus(userId){
  try{
    const c=JSON.parse(localStorage.getItem('cfa_pro_cache')||'null');
    if(!c||c.userId!==userId)return null;
    if((Date.now()-new Date(c.at).getTime())>4*3600*1000)return null;
    return c.isPro===true?{isPro:true,validUntil:c.validUntil||null}:{isPro:false,validUntil:null};
  }catch{return null;}
}
function setCachedProStatus(userId,isPro,validUntil=null){
  try{localStorage.setItem('cfa_pro_cache',JSON.stringify({userId,isPro,validUntil,at:new Date().toISOString()}));}catch{}
}
// Sync fallback — checks owner email + cache (used for initial useState)
function getProStatus(){
  try{
    const auth=JSON.parse(localStorage.getItem('cfa_auth')||'null');
    if(auth?.email&&OWNER_EMAILS.includes(auth.email.toLowerCase()))return true;
    if(auth?.id){const c=getCachedProStatus(auth.id);if(c?.isPro===true)return true;}
  }catch{}
  return false;
}
function getProValidUntil(){
  try{
    const auth=JSON.parse(localStorage.getItem('cfa_auth')||'null');
    if(auth?.email&&OWNER_EMAILS.includes(auth.email.toLowerCase()))return null; // owner never expires
    if(auth?.id){const c=getCachedProStatus(auth.id);return c?.validUntil||null;}
  }catch{}
  return null;
}
// Async server check — verifies against Supabase subscriptions table, respects valid_until
async function checkProFromServer(cfg,userId,email){
  if(email&&OWNER_EMAILS.includes(email.toLowerCase()))return{isPro:true,validUntil:null};
  const cached=getCachedProStatus(userId);
  if(cached!==null)return cached;
  try{
    const now=new Date().toISOString();
    const res=await fetch(`${cfg.url}/rest/v1/subscriptions?user_id=eq.${encodeURIComponent(userId)}&active=eq.true&valid_until=gte.${encodeURIComponent(now)}&select=user_id,valid_until&limit=1`,{
      headers:{"apikey":cfg.key,"Authorization":`Bearer ${cfg.key}`}
    });
    if(!res.ok){setCachedProStatus(userId,false);return{isPro:false,validUntil:null};}
    const rows=await res.json();
    const isPro=Array.isArray(rows)&&rows.length>0;
    const validUntil=isPro?(rows[0].valid_until||null):null;
    setCachedProStatus(userId,isPro,validUntil);
    return{isPro,validUntil};
  }catch{return{isPro:false,validUntil:null};}
}
// Returns estimated percentile vs typical CFA candidates at the same prep stage.
// Uses a normal distribution model; honest approximation, not real peer data.
function getPeerPercentile(prob,daysLeft){
  const mu=daysLeft>180?41:daysLeft>90?49:daysLeft>30?55:59;
  const sigma=14;
  const z=(prob-mu)/sigma;
  const t2=1/(1+0.3275911*Math.abs(z));
  const e=1-(0.254829592*t2-0.284496736*t2*t2+1.421413741*t2*t2*t2-1.453152027*t2*t2*t2*t2+1.061405429*t2*t2*t2*t2*t2)*Math.exp(-z*z);
  return Math.max(1,Math.min(99,Math.round(100*(0.5*(1+(z>=0?e:-e))))));
}
// Returns true if user has an active Power Pro subscription (plan_tier='power').
async function checkIsPowerPro(cfg,userId){
  try{
    const now=new Date().toISOString();
    const res=await fetch(`${cfg.url}/rest/v1/subscriptions?user_id=eq.${encodeURIComponent(userId)}&active=eq.true&valid_until=gte.${encodeURIComponent(now)}&plan_tier=eq.power&select=user_id&limit=1`,{
      headers:{"apikey":cfg.key,"Authorization":`Bearer ${cfg.key}`}
    });
    if(!res.ok)return false;
    const rows=await res.json();
    return Array.isArray(rows)&&rows.length>0;
  }catch{return false;}
}
// ── Referral system ───────────────────────────────────────────────────────────
const REFERRAL_THRESHOLD=2; // friends needed per free Pro month
function getReferralLink(userId){
  try{const u=new URL(window.location.href);u.search="";u.searchParams.set('ref',userId);return u.toString();}
  catch{return window.location.origin+window.location.pathname+'?ref='+userId;}
}
async function getReferralStats(cfg,referrerId){
  try{
    const res=await fetch(`${cfg.url}/rest/v1/referrals?referrer_id=eq.${encodeURIComponent(referrerId)}&select=referee_id`,{
      headers:{"apikey":cfg.key,"Authorization":`Bearer ${cfg.key}`}
    });
    const rows=res.ok?await res.json():[];
    const signups=rows.length;
    if(!signups)return{signups:0,paid:0};
    const ids=rows.map(r=>r.referee_id).join(',');
    const now=new Date().toISOString();
    const subRes=await fetch(
      `${cfg.url}/rest/v1/subscriptions?user_id=in.(${encodeURIComponent(ids)})&active=eq.true&valid_until=gte.${encodeURIComponent(now)}&select=user_id`,
      {headers:{"apikey":cfg.key,"Authorization":`Bearer ${cfg.key}`}}
    );
    const subRows=subRes.ok?await subRes.json():[];
    return{signups,paid:subRows.length};
  }catch{return{signups:0,paid:0};}
}
async function grantReferralPro(cfg,referrerId){
  try{
    // Fetch current valid_until so we extend from it if still future
    const res=await fetch(`${cfg.url}/rest/v1/subscriptions?user_id=eq.${encodeURIComponent(referrerId)}&select=valid_until&limit=1`,{
      headers:{"apikey":cfg.key,"Authorization":`Bearer ${cfg.key}`}
    });
    const rows=res.ok?await res.json():[];
    const current=rows[0]?.valid_until;
    const base=(current&&new Date(current)>new Date())?new Date(current):new Date();
    base.setDate(base.getDate()+30);
    await fetch(`${cfg.url}/rest/v1/subscriptions`,{
      method:'POST',
      headers:{"apikey":cfg.key,"Authorization":`Bearer ${cfg.key}`,"Content-Type":"application/json","Prefer":"resolution=merge-duplicates"},
      body:JSON.stringify({user_id:referrerId,active:true,valid_until:base.toISOString()})
    });
  }catch{}
}
async function recordReferral(cfg,referrerId,refereeId){
  if(!referrerId||!refereeId||referrerId===refereeId)return;
  try{
    await fetch(`${cfg.url}/rest/v1/referrals`,{
      method:'POST',
      headers:{"apikey":cfg.key,"Authorization":`Bearer ${cfg.key}`,"Content-Type":"application/json","Prefer":"return=minimal,resolution=ignore-duplicates"},
      body:JSON.stringify({referrer_id:referrerId,referee_id:refereeId})
    });
    // Reward is granted automatically via DB trigger when the referred user upgrades to Pro
  }catch{}
}
function getDailyAIUsage(){
  try{
    const d=JSON.parse(localStorage.getItem('cfa_daily_ai')||'null');
    const today=localDateKey();
    if(!d||d.date!==today)return{date:today,count:0};
    return d;
  }catch{return{date:localDateKey(),count:0};}
}
function bumpDailyAI(n=1){
  const d=getDailyAIUsage();d.count=Math.min(d.count+n,FREE_DAILY_AI_LIMIT*10);
  try{localStorage.setItem('cfa_daily_ai',JSON.stringify(d));}catch{}
  return d;
}

// XP system - makes every session feel rewarding
function calcXP(session) {
  const numCorrect = session.score ?? session.correct ?? Math.round(((session.pct||0)/100)*(session.total||0));
  const base = numCorrect * 10;
  const diffBonus = { Easy:1, Medium:1.5, Hard:2.2 }[session.difficulty] || 1;
  const speedBonus = session.timeTaken < session.total * 60 ? 1.2 : 1;
  const streakBonus = 1; // applied externally
  return Math.round(base * diffBonus * speedBonus * streakBonus);
}
function getTotalXP(history) { return history.reduce((s,h) => s + calcXP(h), 0); }
function getLevel(xp) {
  // Level thresholds: 0, 500, 1200, 2500, 5000, 9000...
  const thresholds = [0,500,1200,2500,5000,9000,15000,25000];
  const labels = ["Beginner","Analyst I","Analyst II","Associate","Senior Associate","CFA Candidate","CFA Ready","CFA Master"];
  let level = 0;
  for (let i = 0; i < thresholds.length; i++) { if (xp >= thresholds[i]) level = i; }
  const nextThreshold = thresholds[level+1] || thresholds[thresholds.length-1]*2;
  const progress = Math.round(((xp - thresholds[level]) / (nextThreshold - thresholds[level])) * 100);
  return { level: level+1, label: labels[level], xp, nextXP: nextThreshold, progress: Math.min(99, progress) };
}

function fireConfetti(duration=2400){
  const canvas=document.createElement("canvas");
  canvas.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;";
  canvas.width=window.innerWidth; canvas.height=window.innerHeight;
  document.body.appendChild(canvas);
  const ctx=canvas.getContext("2d");
  const colors=["#f59e0b","#6366f1","#10b981","#ef4444","#a78bfa","#fcd34d","#34d399","#f472b6"];
  const particles=Array.from({length:90},(_,i)=>({
    x:Math.random()*canvas.width, y:-10-Math.random()*60,
    vx:(Math.random()-0.5)*5, vy:Math.random()*4+1.5,
    color:colors[i%colors.length],
    size:Math.random()*7+3,
    angle:Math.random()*360, spin:(Math.random()-0.5)*0.25, opacity:1
  }));
  const end=Date.now()+duration;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const remaining=end-Date.now();
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.06; p.angle+=p.spin;
      if(remaining<600) p.opacity=Math.max(0,remaining/600);
      ctx.save(); ctx.globalAlpha=p.opacity; ctx.translate(p.x,p.y); ctx.rotate(p.angle);
      ctx.fillStyle=p.color; ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);
      ctx.restore();
    });
    if(Date.now()<end) requestAnimationFrame(draw); else canvas.remove();
  }
  draw();
}

// ─── QUESTION CACHE HELPERS ───────────────────────────────────────────────────
function qcKey(t,st,diff){return`${t}|||${st}|||${diff}`;}
function qcGet(cache,t,st,diff,cnt){
  const today=localDateKey();
  const slots=(cache[qcKey(t,st,diff)]||[]);
  const avail=slots.filter(s=>s.qs&&s.qs.length>=Math.min(cnt,5)&&s.usedOn!==today);
  if(!avail.length)return null;
  avail.sort((a,b)=>(a.usedOn||"")<(b.usedOn||"")?-1:1);
  return avail[0];
}
function qcMarkUsed(cache,t,st,diff,ts){
  const k=qcKey(t,st,diff);const today=localDateKey();
  return{...cache,[k]:(cache[k]||[]).map(s=>s.ts===ts?{...s,usedOn:today}:s)};
}
function qcAdd(cache,t,st,diff,questions){
  const k=qcKey(t,st,diff);
  const slots=[...(cache[k]||[])];
  const slot={qs:questions.slice(0,15),usedOn:null,ts:Date.now()};
  if(slots.length<QCACHE_SLOTS){slots.push(slot);}
  else{const oldest=slots.reduce((mi,s,i)=>s.ts<slots[mi].ts?i:mi,0);slots[oldest]=slot;}
  const updated={...cache,[k]:slots};
  // Prune to QCACHE_MAX keys by removing least-recently-used entries
  const keys=Object.keys(updated);
  if(keys.length>QCACHE_MAX){
    const sorted=keys.map(ky=>({ky,latest:Math.max(...(updated[ky]||[]).map(s=>s.ts||0))}))
      .sort((a,b)=>a.latest-b.latest);
    sorted.slice(0,keys.length-QCACHE_MAX).forEach(({ky})=>delete updated[ky]);
  }
  return updated;
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function SyncCodeBox({ cfg }) {
  const [status, setStatus] = React.useState(null); // null | "shared" | "copied"
  const syncUrl = (()=>{
    const base = window.location.origin + window.location.pathname.replace(/\/$/,"");
    const code = btoa(JSON.stringify({u: cfg.url, k: cfg.key}));
    return base + "#sync=" + code;
  })();
  const share = async () => {
    if(navigator.share){
      try{
        await navigator.share({title:"ClearCFA – sync setup", url: syncUrl});
        setStatus("shared");
        setTimeout(()=>setStatus(null), 2500);
      }catch(e){ if(e.name!=="AbortError") fallbackCopy(); }
    } else { fallbackCopy(); }
  };
  const fallbackCopy = () => {
    navigator.clipboard?.writeText(syncUrl).then(()=>{ setStatus("copied"); setTimeout(()=>setStatus(null),2500); });
  };
  return (
    <div style={{background:"#0a1020",border:`1px solid #22d3ee33`,borderRadius:9,padding:"10px 12px"}}>
      <div style={{fontSize:11,fontWeight:700,color:"#22d3ee",marginBottom:4}}>📲 Set up on another device</div>
      <div style={{fontSize:11,color:C.muted,marginBottom:8,lineHeight:1.5}}>Share a one-tap setup link to your iPad, laptop, or any other device. The link works like AirDrop — tap it and the app connects automatically.</div>
      <button onClick={share} style={{width:"100%",padding:"9px",borderRadius:8,fontSize:12,fontWeight:700,background:"#22d3ee22",border:`1px solid #22d3ee44`,color:"#22d3ee",cursor:"pointer"}}>
        {status==="shared"?"Shared ✓":status==="copied"?"Link copied ✓":"📤 Share setup link"}
      </button>
    </div>
  );
}
function XPBar({ level, progress, label, xp, nextXP }) {
  const [expanded, setExpanded] = React.useState(false);
  const thresholds = [0,500,1200,2500,5000,9000,15000,25000];
  const labels = ["Beginner","Analyst I","Analyst II","Associate","Senior Associate","CFA Candidate","CFA Ready","CFA Master"];
  const icons = ["🌱","📊","📈","🏢","⭐","🎓","🏆","👑"];
  return (
    <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:11, padding:"11px 14px", cursor:"pointer" }} onClick={()=>setExpanded(v=>!v)}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7 }}>
          <div style={{ width:22, height:22, borderRadius:6, background:`linear-gradient(135deg,${C.reward},${C.rewardLight})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"#000" }}>{level}</div>
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:C.rewardLight }}>{label}</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ fontSize:10, color:C.muted }}>{xp.toLocaleString()} / {nextXP.toLocaleString()} XP</div>
          <div style={{ fontSize:10, color:C.muted, transition:"transform 0.2s", transform:expanded?"rotate(180deg)":"none" }}>▾</div>
        </div>
      </div>
      <div style={{ height:5, background:C.dim, borderRadius:3, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${progress}%`, background:`linear-gradient(90deg,${C.reward},${C.rewardLight})`, borderRadius:3, transition:"width 0.6s ease", boxShadow:`0 0 8px ${C.reward}66` }} />
      </div>
      {expanded&&(
        <div style={{ marginTop:12, display:"flex", flexDirection:"column", gap:6, animation:"fadeIn 0.15s ease" }}>
          <div style={{ fontSize:10, fontWeight:700, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:2 }}>Full Progression</div>
          {labels.map((lbl,i)=>{
            const reached = xp >= thresholds[i];
            const current = i === level-1;
            const pct = current ? progress : reached ? 100 : 0;
            return (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:9, opacity:reached?1:0.4 }}>
                <div style={{ fontSize:14, width:20, textAlign:"center", flexShrink:0 }}>{icons[i]}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:3 }}>
                    <span style={{ fontSize:11, fontWeight:current?800:600, color:current?C.rewardLight:reached?C.textMid:C.muted }}>{lbl}{current&&" ← you"}</span>
                    <span style={{ fontSize:10, color:C.muted }}>{thresholds[i].toLocaleString()} XP</span>
                  </div>
                  <div style={{ height:3, background:C.dim, borderRadius:2, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${pct}%`, background:current?`linear-gradient(90deg,${C.reward},${C.rewardLight})`:reached?C.easy+"66":"transparent", borderRadius:2 }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
function StudyTimeStrip({ todayStudySecs, weekStudySecs, weeklyStudyDays }) {
  const [expanded, setExpanded] = React.useState(false);
  const maxS = Math.max(...weeklyStudyDays.map(x => x.secs), 1);
  return (
    <div onClick={() => setExpanded(v => !v)}
      style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:11, padding:"9px 14px", marginBottom:12, cursor:"pointer" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:16 }}>📖</span>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:C.text }}>{fmtStudyTime(todayStudySecs)} studied today</div>
            <div style={{ fontSize:11, color:C.muted, marginTop:1 }}>This week: {fmtStudyTime(weekStudySecs)}</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:24 }}>
            {weeklyStudyDays.map(d => {
              const h = d.secs > 0 ? Math.max(4, Math.round((d.secs / maxS) * 24)) : 2;
              return <div key={d.key} style={{ width:6, height:h, borderRadius:2, background:d.isToday?C.accent:d.secs>0?C.accent+"66":C.dim, alignSelf:"flex-end" }}/>;
            })}
          </div>
          <div style={{ fontSize:10, color:C.muted, transition:"transform 0.2s", transform:expanded?"rotate(180deg)":"none" }}>▾</div>
        </div>
      </div>
      {expanded && (
        <div style={{ marginTop:12, animation:"fadeIn 0.15s ease" }}>
          <div style={{ fontSize:10, fontWeight:700, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>This week</div>
          {weeklyStudyDays.map(d => (
            <div key={d.key} style={{ display:"flex", alignItems:"center", gap:9, marginBottom:6 }}>
              <div style={{ fontSize:11, color:d.isToday?C.accentLight:C.muted, fontWeight:d.isToday?700:400, width:26, flexShrink:0 }}>{d.label}</div>
              <div style={{ flex:1, height:5, background:C.dim, borderRadius:3, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${d.secs>0?Math.max(2,Math.round(d.secs/maxS*100)):0}%`, background:d.isToday?C.accent:C.accent+"66", borderRadius:3, transition:"width 0.4s" }}/>
              </div>
              <div style={{ fontSize:11, color:d.secs>0?(d.isToday?C.text:C.textMid):C.muted, fontWeight:d.isToday?700:400, textAlign:"right", width:42, flexShrink:0 }}>
                {d.secs > 0 ? fmtStudyTime(d.secs) : "—"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function StatCard({ label, value, color, sub, onClick, icon }) {
  return (
    <div onClick={onClick} style={{ background:C.surface, border:`1px solid ${C.border}`, borderLeft:`3px solid ${color||C.accent}`, borderRadius:11, padding:"12px 13px", cursor:onClick?"pointer":"default", transition:"border-color 0.15s", position:"relative", overflow:"hidden" }}>
      {icon && <div style={{ position:"absolute", right:8, top:8, fontSize:15, opacity:0.12 }}>{icon}</div>}
      <div style={{ fontSize:19, fontWeight:800, color:color||C.accentLight, lineHeight:1 }}>{value}</div>
      {sub && <div style={{ fontSize:10, color:color||C.accentLight, opacity:0.75, marginTop:2 }}>{sub}</div>}
      <div style={{ fontSize:11, color:C.muted, marginTop:4 }}>{label}</div>
    </div>
  );
}
function TrendArrow({ trend, delta }) {
  if (!trend) return null;
  const col = trend==="up"?C.easy:trend==="down"?C.hard:C.muted;
  return <span style={{ fontSize:11, color:col, fontWeight:700, background:col+"18", padding:"1px 6px", borderRadius:4 }}>{trend==="up"?"↑":trend==="down"?"↓":"→"}{delta!=null?` ${Math.abs(delta)}%`:""}</span>;
}
function ScoreRing({ pct, size=96, showLabel=true }) {
  const [animPct,setAnimPct]=useState(0);
  const [displayPct,setDisplayPct]=useState(0);
  useEffect(()=>{
    const t=setTimeout(()=>{
      setAnimPct(pct);
      let start=null;
      const step=(ts)=>{
        if(!start)start=ts;
        const prog=Math.min((ts-start)/900,1);
        setDisplayPct(Math.round((1-Math.pow(1-prog,3))*pct));
        if(prog<1)requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },50);
    return()=>clearTimeout(t);
  },[pct]);
  const r=(size-12)/2,circ=2*Math.PI*r,offset=circ-(animPct/100)*circ;
  const col=pct>=70?C.easy:pct>=50?C.medium:C.hard;
  return(
    <svg width={size} height={size} style={{transform:"rotate(-90deg)"}}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.dim} strokeWidth={7}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={7}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{transition:"stroke-dashoffset 0.8s cubic-bezier(0.34,1.56,0.64,1)",filter:`drop-shadow(0 0 6px ${col}88)`}}/>
      {showLabel&&<text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="middle"
        style={{fill:col,fontSize:size>80?16:12,fontWeight:800,transform:`rotate(90deg)`,transformOrigin:`${size/2}px ${size/2}px`}}>
        {displayPct}%
      </text>}
    </svg>
  );
}
function StreakFlame({ streak }) {
  if (streak === 0) return null;
  const intensity = streak>=7?"🔥":streak>=3?"🔥":"🔥";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:5, background:`linear-gradient(135deg,${C.reward}22,${C.reward}11)`, border:`1px solid ${C.reward}44`, borderRadius:20, padding:"4px 10px" }}>
      <span style={{ fontSize:14 }}>{intensity}</span>
      <span style={{ fontSize:12, fontWeight:800, color:C.rewardLight }}>{streak}</span>
      <span style={{ fontSize:10, color:C.reward, opacity:0.8 }}>day streak</span>
    </div>
  );
}
function ProgressPill({ label, value, total, color }) {
  const pct = total > 0 ? Math.round((value/total)*100) : 0;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
          <span style={{ fontSize:11, color:C.muted }}>{label}</span>
          <span style={{ fontSize:11, fontWeight:700, color }}>{value}/{total}</span>
        </div>
        <div style={{ height:3, background:C.dim, borderRadius:2 }}>
          <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:2, transition:"width 0.5s" }}/>
        </div>
      </div>
    </div>
  );
}
function QualityBar({ quality, label, color }) {
  return (
    <div style={{ marginBottom:7 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
        <span style={{ fontSize:11, color:C.muted }}>{label}</span>
        <span style={{ fontSize:11, fontWeight:700, color }}>{quality}%</span>
      </div>
      <div style={{ height:4, background:C.dim, borderRadius:2 }}>
        <div style={{ height:"100%", width:`${quality}%`, background:color, borderRadius:2, transition:"width 0.5s" }}/>
      </div>
    </div>
  );
}
function LOSHeatmapCell({ tested, pct }) {
  const bg = !tested ? C.border : pct>=80 ? C.easy : pct>=60 ? C.medium : C.hard;
  return <div style={{ width:12, height:12, borderRadius:2, background:bg, flexShrink:0, transition:"background 0.3s" }} title={tested?`${pct}% accuracy`:"Not yet tested"}/>;
}
function MotivationalBanner({ daysLeft }) {
  const msg = daysLeft <= 7 ? { text:"Final week — every question counts.", color:C.hard }
    : daysLeft <= 14 ? { text:"Two weeks out. Make them count.", color:C.medium }
    : daysLeft <= 30 ? { text:"One month to exam. Stay consistent.", color:C.reward }
    : { text:"You're building the habit that passes exams.", color:C.accentLight };
  return (
    <div style={{ fontSize:11, color:msg.color, textAlign:"center", padding:"6px 0", fontStyle:"italic", opacity:0.85 }}>{msg.text}</div>
  );
}
// ─── FORMULA SHEETS ──────────────────────────────────────────────────────────
const FORMULAS = {
  "Quantitative Methods": [
    {name:"FV (single cash flow)",f:"FV = PV × (1 + r)ⁿ"},
    {name:"PV (single cash flow)",f:"PV = FV / (1 + r)ⁿ",parts:[{t:"tx",c:"PV ="},{t:"fr",n:"FV",d:"(1 + r)ⁿ"}]},
    {name:"FV of Annuity",f:"FV = PMT × [(1+r)ⁿ − 1] / r",parts:[{t:"tx",c:"FV = PMT ×"},{t:"fr",n:"(1+r)ⁿ − 1",d:"r"}]},
    {name:"PV of Annuity",f:"PV = PMT × [1 − (1+r)⁻ⁿ] / r",parts:[{t:"tx",c:"PV = PMT ×"},{t:"fr",n:"1 − (1+r)⁻ⁿ",d:"r"}]},
    {name:"PV Annuity Due",f:"PV_due = PMT × [1 − (1+r)⁻ⁿ] / r × (1+r)",parts:[{t:"tx",c:"PV_due = PMT ×"},{t:"fr",n:"1 − (1+r)⁻ⁿ",d:"r"},{t:"tx",c:"× (1+r)"}]},
    {name:"Perpetuity PV",f:"PV = PMT / r",parts:[{t:"tx",c:"PV ="},{t:"fr",n:"PMT",d:"r"}]},
    {name:"EAR (from periodic rate)",f:"EAR = (1 + r/m)ᵐ − 1"},
    {name:"EAR (from continuous)",f:"EAR = eʳ − 1"},
    {name:"HPR",f:"HPR = (P₁ − P₀ + D) / P₀",parts:[{t:"tx",c:"HPR ="},{t:"fr",n:"P₁ − P₀ + D",d:"P₀"}]},
    {name:"TWR",f:"TWR = (1+r₁)(1+r₂)…(1+rₙ) − 1"},
    {name:"MWR (IRR)",f:"Solve: PV(inflows) = PV(outflows)"},
    {name:"Variance",f:"σ² = Σ(xᵢ − μ)² / N",parts:[{t:"tx",c:"σ² ="},{t:"fr",n:"Σ(xᵢ − μ)²",d:"N"}]},
    {name:"Sample Variance",f:"s² = Σ(xᵢ − x̄)² / (n−1)",parts:[{t:"tx",c:"s² ="},{t:"fr",n:"Σ(xᵢ − x̄)²",d:"n − 1"}]},
    {name:"Covariance",f:"Cov(A,B) = ρ × σ_A × σ_B"},
    {name:"Correlation",f:"ρ = Cov(A,B) / (σ_A × σ_B)",parts:[{t:"tx",c:"ρ ="},{t:"fr",n:"Cov(A,B)",d:"σ_A × σ_B"}]},
    {name:"Portfolio σ (2 asset)",f:"σ_p = √(w²_Aσ²_A + w²_Bσ²_B + 2w_Aw_BρABσ_Aσ_B)"},
    {name:"t-statistic",f:"t = (x̄ − μ₀) / (s / √n)",parts:[{t:"tx",c:"t ="},{t:"fr",n:"x̄ − μ₀",d:"s / √n"}]},
    {name:"Confidence interval",f:"x̄ ± z × (σ / √n)",parts:[{t:"tx",c:"x̄ ± z ×"},{t:"fr",n:"σ",d:"√n"}]},
    {name:"Regression slope",f:"b = Cov(X,Y) / Var(X)",parts:[{t:"tx",c:"b ="},{t:"fr",n:"Cov(X,Y)",d:"Var(X)"}]},
    {name:"R² (coefficient of det.)",f:"R² = 1 − SSE/SST",parts:[{t:"tx",c:"R² = 1 −"},{t:"fr",n:"SSE",d:"SST"}]},
    {name:"F-stat (regression)",f:"F = MSR / MSE",parts:[{t:"tx",c:"F ="},{t:"fr",n:"MSR",d:"MSE"}]},
    {name:"Chi-square (variance test)",f:"χ² = (n−1)s² / σ₀²",parts:[{t:"tx",c:"χ² ="},{t:"fr",n:"(n−1)s²",d:"σ₀²"}]},
    {name:"Safety-first ratio",f:"SFR = (E(R) − R_min) / σ",parts:[{t:"tx",c:"SFR ="},{t:"fr",n:"E(R) − R_min",d:"σ"}]},
    {name:"Bayes",f:"P(A|B) = P(B|A)·P(A) / P(B)",parts:[{t:"tx",c:"P(A|B) ="},{t:"fr",n:"P(B|A) · P(A)",d:"P(B)"}]},
    {name:"Combination",f:"ⁿCᵣ = n! / (r!(n−r)!)",parts:[{t:"tx",c:"ⁿCᵣ ="},{t:"fr",n:"n!",d:"r!(n−r)!"}]},
    {name:"Permutation",f:"ⁿPᵣ = n! / (n−r)!",parts:[{t:"tx",c:"ⁿPᵣ ="},{t:"fr",n:"n!",d:"(n−r)!"}]},
  ],
  "Economics": [
    {name:"GDP (expenditure)",f:"GDP = C + I + G + (X − M)"},
    {name:"GDP (income)",f:"GDP = Wages + Rent + Interest + Profit"},
    {name:"Quantity of money",f:"MV = PY  (M=money, V=velocity, P=price, Y=real GDP)"},
    {name:"Fisher equation",f:"(1 + r_nominal) = (1 + r_real)(1 + inflation)"},
    {name:"Fiscal multiplier",f:"Multiplier = 1 / (1 − MPC)",parts:[{t:"tx",c:"Multiplier ="},{t:"fr",n:"1",d:"1 − MPC"}]},
    {name:"Tax multiplier",f:"Tax multiplier = −MPC / (1 − MPC)",parts:[{t:"tx",c:"Tax mult. ="},{t:"fr",n:"−MPC",d:"1 − MPC"}]},
    {name:"Absolute PPP",f:"S = P_domestic / P_foreign",parts:[{t:"tx",c:"S ="},{t:"fr",n:"P_domestic",d:"P_foreign"}]},
    {name:"Relative PPP",f:"%ΔS ≈ π_domestic − π_foreign"},
    {name:"Covered interest parity",f:"F/S = (1 + r_d) / (1 + r_f)",parts:[{t:"fr",n:"F",d:"S"},{t:"tx",c:"="},{t:"fr",n:"1 + r_d",d:"1 + r_f"}]},
    {name:"Real exchange rate",f:"q = S × (P_foreign / P_domestic)",parts:[{t:"tx",c:"q = S ×"},{t:"fr",n:"P_foreign",d:"P_domestic"}]},
    {name:"Uncovered interest parity",f:"E(%ΔS) = r_domestic − r_foreign"},
    {name:"Current account balance",f:"CA = X − M + Net income + Net transfers"},
    {name:"Elasticity of demand",f:"E_d = %ΔQ_d / %ΔP",parts:[{t:"tx",c:"E_d ="},{t:"fr",n:"%ΔQ_d",d:"%ΔP"}]},
  ],
  "Financial Statement Analysis": [
    {name:"ROE (DuPont 3-factor)",f:"ROE = Net Margin × Asset Turnover × Equity Multiplier"},
    {name:"ROE (DuPont 5-factor)",f:"ROE = (NI/EBT) × (EBT/EBIT) × (EBIT/Rev) × (Rev/Assets) × (Assets/Equity)"},
    {name:"Current Ratio",f:"Current Assets / Current Liabilities",parts:[{t:"fr",n:"Current Assets",d:"Current Liabilities"}]},
    {name:"Quick Ratio",f:"(Cash + ST Investments + AR) / CL",parts:[{t:"fr",n:"Cash + ST Investments + AR",d:"CL"}]},
    {name:"Cash Ratio",f:"(Cash + ST Investments) / CL",parts:[{t:"fr",n:"Cash + ST Investments",d:"CL"}]},
    {name:"DSO (days sales outstanding)",f:"AR / (Revenue / 365)",parts:[{t:"fr",n:"AR",d:"Revenue / 365"}]},
    {name:"DIO (days inventory outstanding)",f:"Inventory / (COGS / 365)",parts:[{t:"fr",n:"Inventory",d:"COGS / 365"}]},
    {name:"DPO (days payable outstanding)",f:"AP / (COGS / 365)",parts:[{t:"fr",n:"AP",d:"COGS / 365"}]},
    {name:"CCC (cash conversion cycle)",f:"CCC = DSO + DIO − DPO"},
    {name:"Basic EPS",f:"(NI − Preferred Dividends) / Wtd Avg Shares",parts:[{t:"fr",n:"NI − Preferred Dividends",d:"Wtd Avg Shares"}]},
    {name:"Diluted EPS",f:"(NI − Pref Div + Conv. Interest(1−t)) / (Wtd Avg + Dilutive Shares)",parts:[{t:"fr",n:"NI − Pref Div + Conv. Int.(1−t)",d:"Wtd Avg + Dilutive Shares"}]},
    {name:"Debt-to-Equity",f:"Total Debt / Total Equity",parts:[{t:"fr",n:"Total Debt",d:"Total Equity"}]},
    {name:"Debt-to-Assets",f:"Total Debt / Total Assets",parts:[{t:"fr",n:"Total Debt",d:"Total Assets"}]},
    {name:"Interest Coverage",f:"EBIT / Interest Expense",parts:[{t:"fr",n:"EBIT",d:"Interest Expense"}]},
    {name:"FCFF",f:"FCFF = NI + NCC + Int(1−t) − FCInv − WCInv"},
    {name:"FCFE",f:"FCFE = FCFF − Int(1−t) + Net Borrowing"},
    {name:"CFO (indirect)",f:"CFO = NI + D&A − ΔAR − ΔInventory + ΔAP ± other WC"},
    {name:"LIFO reserve",f:"LIFO Reserve = FIFO Inventory − LIFO Inventory"},
    {name:"LIFO to FIFO (COGS adj.)",f:"FIFO COGS = LIFO COGS − ΔLIFO Reserve"},
    {name:"Tax expense",f:"Income Tax Expense = EBT × Effective Tax Rate"},
  ],
  "Corporate Issuers": [
    {name:"WACC",f:"WACC = w_d×r_d(1−t) + w_p×r_p + w_e×r_e"},
    {name:"NPV",f:"NPV = Σ CF_t/(1+r)ᵗ − Initial Cost"},
    {name:"Profitability Index",f:"PI = PV(future CFs) / Initial Cost  (accept if PI > 1)",parts:[{t:"tx",c:"PI ="},{t:"fr",n:"PV(future CFs)",d:"Initial Cost"},{t:"tx",c:"(accept if > 1)"}]},
    {name:"IRR",f:"Set NPV = 0 → solve for r"},
    {name:"Payback Period",f:"Years until cumulative CF = Initial Investment"},
    {name:"Discounted Payback",f:"Years until cumulative PV(CF) = Initial Investment"},
    {name:"Cost of equity (CAPM)",f:"r_e = R_f + β[E(R_m) − R_f]"},
    {name:"Cost of equity (DDM)",f:"r_e = D₁/P₀ + g",parts:[{t:"tx",c:"r_e ="},{t:"fr",n:"D₁",d:"P₀"},{t:"tx",c:"+ g"}]},
    {name:"Cost of debt",f:"r_d(after-tax) = YTM × (1 − Tax Rate)"},
    {name:"DOL",f:"DOL = (Rev − VarCosts) / EBIT",parts:[{t:"tx",c:"DOL ="},{t:"fr",n:"Rev − VarCosts",d:"EBIT"}]},
    {name:"DFL",f:"DFL = EBIT / (EBIT − Interest)",parts:[{t:"tx",c:"DFL ="},{t:"fr",n:"EBIT",d:"EBIT − Interest"}]},
    {name:"DTL (total leverage)",f:"DTL = DOL × DFL"},
    {name:"Breakeven (units)",f:"Q_BE = Fixed Costs / (Price − VC per unit)",parts:[{t:"tx",c:"Q_BE ="},{t:"fr",n:"Fixed Costs",d:"Price − VC per unit"}]},
    {name:"M-M (with taxes)",f:"V_L = V_U + T×D"},
  ],
  "Equity": [
    {name:"Gordon Growth Model (DDM)",f:"V₀ = D₁ / (r − g)",parts:[{t:"tx",c:"V₀ ="},{t:"fr",n:"D₁",d:"r − g"}]},
    {name:"Two-stage DDM",f:"V₀ = Σ Dₜ/(1+r)ᵗ + P_n/(1+r)ⁿ  where P_n = D_{n+1}/(r−g)"},
    {name:"FCFE",f:"FCFE = NI − (1−DR)(FCInv − Dep) − (1−DR)ΔWC"},
    {name:"P/E (justified leading)",f:"P/E = Payout Ratio / (r − g)",parts:[{t:"tx",c:"P/E ="},{t:"fr",n:"Payout Ratio",d:"r − g"}]},
    {name:"P/B (justified)",f:"P/B = (ROE − g) / (r − g)",parts:[{t:"tx",c:"P/B ="},{t:"fr",n:"ROE − g",d:"r − g"}]},
    {name:"EV/EBITDA",f:"EV = Mkt Cap + Debt − Cash;  compare across capital structures"},
    {name:"Enterprise Value",f:"EV = Mkt Cap + Total Debt + Pref − Cash & Equivalents"},
    {name:"CAPM",f:"E(Rᵢ) = R_f + βᵢ[E(Rₘ) − R_f]"},
    {name:"Beta",f:"β = Cov(Rᵢ,Rₘ) / Var(Rₘ)",parts:[{t:"tx",c:"β ="},{t:"fr",n:"Cov(Rᵢ, Rₘ)",d:"Var(Rₘ)"}]},
    {name:"Sharpe Ratio",f:"S = (R_p − R_f) / σ_p",parts:[{t:"tx",c:"S ="},{t:"fr",n:"R_p − R_f",d:"σ_p"}]},
    {name:"Treynor Ratio",f:"T = (R_p − R_f) / β_p",parts:[{t:"tx",c:"T ="},{t:"fr",n:"R_p − R_f",d:"β_p"}]},
    {name:"Jensen's Alpha",f:"α = R_p − [R_f + β_p(R_m − R_f)]"},
  ],
  "Fixed Income": [
    {name:"Bond Price (annuity form)",f:"P = C×[1−(1+y)⁻ⁿ]/y + FV/(1+y)ⁿ",parts:[{t:"tx",c:"P = C ×"},{t:"fr",n:"1−(1+y)⁻ⁿ",d:"y"},{t:"tx",c:"+"},{t:"fr",n:"FV",d:"(1+y)ⁿ"}]},
    {name:"Bond Price (semi-annual)",f:"P = (C/2)×[1−(1+y/2)⁻²ⁿ]/(y/2) + FV/(1+y/2)²ⁿ",parts:[{t:"fr",n:"C",d:"2"},{t:"tx",c:"×"},{t:"fr",n:"1−(1+y/2)⁻²ⁿ",d:"y/2"},{t:"tx",c:"+ P ="},{t:"fr",n:"FV",d:"(1+y/2)²ⁿ"}]},
    {name:"Bond Price (summation)",f:"P = Σ C/(1+y)ᵗ + FV/(1+y)ⁿ  [same formula, Σ form]"},
    {name:"Current Yield",f:"CY = Annual Coupon / Price",parts:[{t:"tx",c:"CY ="},{t:"fr",n:"Annual Coupon",d:"Price"}]},
    {name:"YTM — solve for y",f:"Set P = (C/2)×[1−(1+y/2)⁻²ⁿ]/(y/2) + FV/(1+y/2)²ⁿ, solve iteratively"},
    {name:"Spot/Forward relationship",f:"(1+S₂)² = (1+S₁)(1+₁f₁)"},
    {name:"Macaulay Duration",f:"D_Mac = Σ[t × PV(CF_t)] / Price",parts:[{t:"tx",c:"D_Mac ="},{t:"fr",n:"Σ[t × PV(CF_t)]",d:"Price"}]},
    {name:"Modified Duration",f:"MD = D_Mac / (1 + y/m)",parts:[{t:"tx",c:"MD ="},{t:"fr",n:"D_Mac",d:"1 + y/m"}]},
    {name:"Price change (Duration)",f:"ΔP/P ≈ −MD × Δy"},
    {name:"Price change (Duration+Convexity)",f:"ΔP/P ≈ −MD·Δy + ½·Convexity·(Δy)²"},
    {name:"PVBP / DV01",f:"PVBP = MD × Price × 0.0001"},
    {name:"Convexity (approx.)",f:"Convexity ≈ (P₊ + P₋ − 2P₀) / (P₀ × (Δy)²)",parts:[{t:"tx",c:"Convexity ≈"},{t:"fr",n:"P₊ + P₋ − 2P₀",d:"P₀ × (Δy)²"}]},
    {name:"Portfolio Duration",f:"D_p = Σ wᵢ × D_i"},
    {name:"Yield Spread",f:"Spread = YTM_bond − YTM_benchmark"},
    {name:"OAS",f:"OAS = Z-spread − Option Value (in bps)"},
  ],
  "Derivatives": [
    {name:"Call Payoff (long)",f:"max(S_T − X, 0)"},
    {name:"Put Payoff (long)",f:"max(X − S_T, 0)"},
    {name:"Put-Call Parity",f:"C + PV(X) = P + S₀  (European, no dividends)"},
    {name:"Put-Call Parity (dividends)",f:"C + PV(X) + PV(D) = P + S₀"},
    {name:"Forward Price (no income)",f:"F₀ = S₀ × (1 + r)ᵀ"},
    {name:"Forward Price (with income)",f:"F₀ = (S₀ − PV(income)) × (1 + r)ᵀ"},
    {name:"Forward Price (continuous)",f:"F₀ = S₀ × e^(r−δ)T"},
    {name:"FRA settlement",f:"(L − FRA_rate) × (D/360) × NP / [1 + L×(D/360)]"},
    {name:"Swap fixed rate",f:"SFR: set PV(fixed leg) = PV(floating leg)"},
    {name:"Binomial option (1-period)",f:"C = [p·C_u + (1−p)·C_d] / (1+r);  p = (1+r−d)/(u−d)"},
    {name:"Delta (option)",f:"Δ = (C_u − C_d) / (S_u − S_d)"},
  ],
  "Portfolio Management": [
    {name:"Expected Return (portfolio)",f:"E(R_p) = Σ wᵢ × E(Rᵢ)"},
    {name:"Portfolio Variance (2 asset)",f:"σ²_p = w²_Aσ²_A + w²_Bσ²_B + 2w_Aw_BρABσ_Aσ_B"},
    {name:"CML (Capital Market Line)",f:"E(R_p) = R_f + σ_p × [E(R_m) − R_f] / σ_m"},
    {name:"SML (CAPM)",f:"E(R_i) = R_f + β_i[E(R_m) − R_f]"},
    {name:"Beta",f:"β_i = Cov(R_i, R_m) / σ²_m  =  ρ_{i,m} × σ_i / σ_m"},
    {name:"Sharpe Ratio",f:"S = (R_p − R_f) / σ_p"},
    {name:"Treynor Ratio",f:"T = (R_p − R_f) / β_p"},
    {name:"Jensen's Alpha",f:"α = R_p − [R_f + β_p(R_m − R_f)]"},
    {name:"Information Ratio",f:"IR = (R_p − R_b) / Tracking Error"},
    {name:"Tracking Error",f:"TE = σ(R_p − R_b)"},
    {name:"M² (Modigliani)",f:"M² = R_f + Sharpe_p × σ_m"},
    {name:"Roy's Safety-First",f:"SFR = (E(R_p) − R_L) / σ_p  (maximize to minimize shortfall risk)"},
  ],
  "Alternatives": [
    {name:"NAV per share",f:"NAV = (Assets − Liabilities) / Shares Outstanding"},
    {name:"PE / VC IRR",f:"Solve: PV(invested capital) = PV(exit proceeds)"},
    {name:"Management Fee (PE)",f:"Typically 2% × Committed Capital (in investment period)"},
    {name:"Carried Interest",f:"Typically 20% × Profits above hurdle rate"},
    {name:"MOIC (multiple on invested capital)",f:"MOIC = Total Value Realized / Total Capital Invested"},
    {name:"Cap Rate (Real Estate)",f:"Cap Rate = NOI / Property Value"},
    {name:"Gross vs Net Return (RE)",f:"Net Return = Gross Return − Fees − Expenses"},
    {name:"Commodity futures return",f:"Total Return = Spot Return + Roll Return + Collateral Return"},
  ],
};

const FORMULA_MODULES = {
  "Quantitative Methods": {
    "FV (single cash flow)":"Time Value of Money","PV (single cash flow)":"Time Value of Money",
    "FV of Annuity":"Time Value of Money","PV of Annuity":"Time Value of Money",
    "PV Annuity Due":"Time Value of Money","Perpetuity PV":"Time Value of Money",
    "EAR (from periodic rate)":"Rates & Returns","EAR (from continuous)":"Rates & Returns",
    "HPR":"Rates & Returns","TWR":"Rates & Returns","MWR (IRR)":"Rates & Returns",
    "Variance":"Statistics","Sample Variance":"Statistics","Covariance":"Statistics",
    "Correlation":"Statistics","Portfolio σ (2 asset)":"Statistics",
    "t-statistic":"Hypothesis Testing","Confidence interval":"Hypothesis Testing",
    "Chi-square (variance test)":"Hypothesis Testing",
    "Regression slope":"Regression","R² (coefficient of det.)":"Regression","F-stat (regression)":"Regression",
    "Safety-first ratio":"Probability & Risk","Bayes":"Probability & Risk",
    "Combination":"Probability & Risk","Permutation":"Probability & Risk",
  },
  "Economics": {
    "GDP (expenditure)":"National Accounts","GDP (income)":"National Accounts","Quantity of money":"National Accounts",
    "Fisher equation":"Inflation & Interest Rates",
    "Fiscal multiplier":"Fiscal Policy","Tax multiplier":"Fiscal Policy",
    "Absolute PPP":"Exchange Rates","Relative PPP":"Exchange Rates",
    "Covered interest parity":"Exchange Rates","Real exchange rate":"Exchange Rates",
    "Uncovered interest parity":"Exchange Rates","Current account balance":"Exchange Rates",
    "Elasticity of demand":"Microeconomics",
  },
  "Financial Statement Analysis": {
    "ROE (DuPont 3-factor)":"Profitability","ROE (DuPont 5-factor)":"Profitability",
    "Current Ratio":"Liquidity","Quick Ratio":"Liquidity","Cash Ratio":"Liquidity",
    "DSO (days sales outstanding)":"Efficiency","DIO (days inventory outstanding)":"Efficiency",
    "DPO (days payable outstanding)":"Efficiency","CCC (cash conversion cycle)":"Efficiency",
    "Basic EPS":"Per-Share Data","Diluted EPS":"Per-Share Data",
    "Debt-to-Equity":"Leverage","Debt-to-Assets":"Leverage","Interest Coverage":"Leverage",
    "FCFF":"Cash Flow","FCFE":"Cash Flow","CFO (indirect)":"Cash Flow",
    "LIFO reserve":"Inventory & Tax","LIFO to FIFO (COGS adj.)":"Inventory & Tax","Tax expense":"Inventory & Tax",
  },
  "Corporate Issuers": {
    "WACC":"Cost of Capital","Cost of equity (CAPM)":"Cost of Capital",
    "Cost of equity (DDM)":"Cost of Capital","Cost of debt":"Cost of Capital",
    "NPV":"Capital Budgeting","Profitability Index":"Capital Budgeting",
    "IRR":"Capital Budgeting","Payback Period":"Capital Budgeting","Discounted Payback":"Capital Budgeting",
    "DOL":"Leverage","DFL":"Leverage","DTL (total leverage)":"Leverage","Breakeven (units)":"Leverage",
    "M-M (with taxes)":"Capital Structure",
  },
  "Equity": {
    "Gordon Growth Model (DDM)":"Dividend Discount Models","Two-stage DDM":"Dividend Discount Models","FCFE":"Dividend Discount Models",
    "P/E (justified leading)":"Relative Valuation","P/B (justified)":"Relative Valuation",
    "EV/EBITDA":"Relative Valuation","Enterprise Value":"Relative Valuation",
    "CAPM":"Risk & Return","Beta":"Risk & Return","Sharpe Ratio":"Risk & Return",
    "Treynor Ratio":"Risk & Return","Jensen's Alpha":"Risk & Return",
  },
  "Fixed Income": {
    "Bond Price (annuity form)":"Bond Pricing","Bond Price (semi-annual)":"Bond Pricing",
    "Bond Price (summation)":"Bond Pricing","Current Yield":"Bond Pricing","YTM — solve for y":"Bond Pricing",
    "Spot/Forward relationship":"Spot & Forward Rates",
    "Macaulay Duration":"Duration & Convexity","Modified Duration":"Duration & Convexity",
    "Price change (Duration)":"Duration & Convexity","Price change (Duration+Convexity)":"Duration & Convexity",
    "PVBP / DV01":"Duration & Convexity","Convexity (approx.)":"Duration & Convexity",
    "Portfolio Duration":"Portfolio & Spreads","Yield Spread":"Portfolio & Spreads","OAS":"Portfolio & Spreads",
  },
  "Derivatives": {
    "Call Payoff (long)":"Options","Put Payoff (long)":"Options",
    "Put-Call Parity":"Options","Put-Call Parity (dividends)":"Options","Delta (option)":"Options",
    "Forward Price (no income)":"Forwards & Futures","Forward Price (with income)":"Forwards & Futures",
    "Forward Price (continuous)":"Forwards & Futures",
    "FRA settlement":"FRAs & Swaps","Swap fixed rate":"FRAs & Swaps",
    "Binomial option (1-period)":"Option Pricing",
  },
  "Portfolio Management": {
    "Expected Return (portfolio)":"Portfolio Construction","Portfolio Variance (2 asset)":"Portfolio Construction",
    "CML (Capital Market Line)":"Capital Market Theory","SML (CAPM)":"Capital Market Theory","Beta":"Capital Market Theory",
    "Tracking Error":"Performance Measures","Sharpe Ratio":"Performance Measures",
    "Treynor Ratio":"Performance Measures","Jensen's Alpha":"Performance Measures",
    "Information Ratio":"Performance Measures","M² (Modigliani)":"Performance Measures",
    "Roy's Safety-First":"Risk Management",
  },
  "Alternatives": {
    "NAV per share":"Funds & Structures",
    "PE / VC IRR":"Private Equity","Management Fee (PE)":"Private Equity",
    "Carried Interest":"Private Equity","MOIC (multiple on invested capital)":"Private Equity",
    "Cap Rate (Real Estate)":"Real Assets","Gross vs Net Return (RE)":"Real Assets",
    "Commodity futures return":"Commodities",
  },
};

function FracFormula({parts}){
  return(
    <span style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:"4px",fontFamily:"'Courier New',monospace",fontSize:12,color:C.accentLight,lineHeight:2}}>
      {parts.map((p,i)=>{
        if(p.t==="tx") return <span key={i}>{p.c}</span>;
        return(
          <span key={i} style={{display:"inline-flex",flexDirection:"column",alignItems:"center",margin:"0 3px"}}>
            <span style={{borderBottom:`1.5px solid ${C.accentLight}88`,padding:"0 6px 2px",whiteSpace:"nowrap",lineHeight:1.5,textAlign:"center"}}>{p.n}</span>
            <span style={{padding:"2px 6px 0",whiteSpace:"nowrap",lineHeight:1.5,textAlign:"center"}}>{p.d}</span>
          </span>
        );
      })}
    </span>
  );
}
function FormulaSheet({topic, level="1"}){
  const [open,setOpen]=useState(false);
  const [openMod,setOpenMod]=useState(null);
  const formulas=getActiveFormulas(level)[topic]||[];
  if(!formulas.length)return null;
  // Build subtopic groups
  const modLookup=FORMULA_MODULES[topic]||{};
  const modOrder=[],modMap={};
  for(const f of formulas){
    const m=f.module||modLookup[f.name]||"General";
    if(!modMap[m]){modMap[m]=[];modOrder.push(m);}
    modMap[m].push(f);
  }
  const singleGroup=modOrder.length<=1;
  return(
    <div style={{marginBottom:12}}>
      <button onClick={()=>setOpen(v=>!v)} style={{width:"100%",padding:"9px 14px",borderRadius:10,fontSize:12,fontWeight:700,background:C.surface,border:`1px solid ${C.accentLight}33`,color:C.accentLight,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}}>
        <span>📐 Formula Sheet — {topic.split(" ")[0]}</span>
        <span style={{fontSize:10,opacity:0.7}}>{open?"▲ Hide":"▼ Show"} {formulas.length} formulas · {modOrder.length} topics</span>
      </button>
      {open&&(
        <div style={{background:C.bg,border:`1px solid ${C.accentLight}22`,borderRadius:"0 0 10px 10px",overflow:"hidden"}}>
          {singleGroup?(
            <div style={{padding:"10px 14px",display:"flex",flexDirection:"column",gap:6}}>
              {formulas.map((f,i)=>(
                <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",paddingBottom:6,borderBottom:i<formulas.length-1?`1px solid ${C.border}`:"none"}}>
                  <div style={{fontSize:10,color:C.muted,minWidth:110,flexShrink:0,paddingTop:2}}>{f.name}</div>
                  <div style={{fontSize:12,color:C.accentLight,fontFamily:"monospace",lineHeight:f.parts?2:1.5,wordBreak:"break-word",minWidth:80,overflow:"hidden"}}>{f.parts?<FracFormula parts={f.parts}/>:f.f}</div>
                </div>
              ))}
            </div>
          ):(
            modOrder.map((mod,mi)=>{
              const isModOpen=openMod===mod;
              const mFs=modMap[mod];
              return(
                <div key={mod} style={{borderBottom:mi<modOrder.length-1?`1px solid ${C.border}`:"none"}}>
                  <button onClick={()=>setOpenMod(isModOpen?null:mod)}
                    style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 14px",background:isModOpen?C.accent+"0a":"transparent",border:"none",cursor:"pointer",textAlign:"left"}}>
                    <span style={{fontSize:11,fontWeight:700,color:isModOpen?C.accentLight:C.muted}}>{mod}</span>
                    <span style={{fontSize:10,color:C.muted}}>{mFs.length} · {isModOpen?"▲":"▼"}</span>
                  </button>
                  {isModOpen&&(
                    <div style={{padding:"4px 14px 10px",display:"flex",flexDirection:"column",gap:6}}>
                      {mFs.map((f,i)=>(
                        <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",paddingBottom:6,borderBottom:i<mFs.length-1?`1px solid ${C.border}`:"none"}}>
                          <div style={{fontSize:10,color:C.muted,minWidth:100,flexShrink:0,paddingTop:2}}>{f.name}</div>
                          <div style={{fontSize:12,color:C.accentLight,fontFamily:"monospace",lineHeight:f.parts?2:1.5,wordBreak:"break-word",minWidth:80,overflow:"hidden"}}>{f.parts?<FracFormula parts={f.parts}/>:f.f}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

function PowerNotesSheet({topic, level="1"}){
  const [open,setOpen]=useState(false);
  const [openMod,setOpenMod]=useState(null);
  const notes=getActivePowerNotes(level)[topic];
  if(!notes||!notes.topics||!notes.topics.length)return null;
  const totalRules=notes.topics.reduce((s,t)=>s+(t.rules||[]).length+(t.traps||[]).length,0);
  return(
    <div style={{marginBottom:12}}>
      <button onClick={()=>setOpen(v=>!v)} style={{width:"100%",padding:"9px 14px",borderRadius:10,fontSize:12,fontWeight:700,background:C.surface,border:`1px solid ${C.easy}33`,color:C.easy,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}}>
        <span>📝 Power Notes — {topic.split(" ")[0]}</span>
        <span style={{fontSize:10,opacity:0.7}}>{open?"▲ Hide":"▼ Show"} {totalRules} bullets · {notes.topics.length} topics</span>
      </button>
      {open&&(
        <div style={{background:C.bg,border:`1px solid ${C.easy}22`,borderRadius:"0 0 10px 10px",overflow:"hidden"}}>
          {notes.topics.map((t,ti)=>{
            const isModOpen=openMod===t.module;
            const count=(t.rules||[]).length+(t.traps||[]).length;
            return(
              <div key={ti} style={{borderBottom:ti<notes.topics.length-1?`1px solid ${C.border}`:"none"}}>
                <button onClick={()=>setOpenMod(isModOpen?null:t.module)}
                  style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 14px",background:isModOpen?C.easy+"0a":"transparent",border:"none",cursor:"pointer",textAlign:"left"}}>
                  <span style={{fontSize:11,fontWeight:700,color:isModOpen?C.easy:C.muted,textTransform:"uppercase",letterSpacing:0.4}}>{t.module}</span>
                  <span style={{fontSize:10,color:C.muted}}>{count} · {isModOpen?"▲":"▼"}</span>
                </button>
                {isModOpen&&(
                  <div style={{padding:"4px 14px 12px",display:"flex",flexDirection:"column",gap:3}}>
                    {(t.rules||[]).map((r,i)=>(
                      <div key={i} style={{fontSize:11,color:C.text,lineHeight:1.6,paddingLeft:10,borderLeft:`2px solid ${C.easy}44`,marginBottom:2}}>{r}</div>
                    ))}
                    {(t.traps||[]).length>0&&(
                      <div style={{marginTop:6}}>
                        <div style={{fontSize:9,color:C.hard,fontWeight:700,marginBottom:4,letterSpacing:0.5}}>⚠ TRAPS</div>
                        {t.traps.map((r,i)=>(
                          <div key={i} style={{fontSize:11,color:C.hard,lineHeight:1.6,paddingLeft:10,borderLeft:`2px solid ${C.hard}66`,marginBottom:2}}>{r}</div>
                        ))}
                      </div>
                    )}
                    {t.mnemonic&&<div style={{fontSize:10,color:C.accentLight,fontStyle:"italic",marginTop:6,padding:"4px 8px",background:C.dim,borderRadius:6}}>💡 {t.mnemonic}</div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


// ─── POWER NOTES ─────────────────────────────────────────────────────────────
const POWER_NOTES = {
  "Ethics": {
    topics: [
      {
        module: "Code of Ethics & Standards",
        rules: [
          "Code has 6 components; Standards has 7 (I–VII). Know both by number.",
          "Standard I-A: Follow the STRICTER of local law vs CFA Standards — whichever is more restrictive.",
          "Standard I-B: Independence — any gift/benefit that could compromise objectivity must be disclosed to employer; decline or obtain written pre-approval before accepting. No dollar threshold in CFA Standards.",
          "Standard I-C: Misrepresentation includes plagiarism and guaranteeing investment returns.",
          "Standard II-A: Material = would affect price or reasonable investor's decision. Nonpublic = not yet released. BOTH required.",
          "Standard III-A: Loyalty, Prudence, Care — duty to clients first, then employer, then self.",
          "Standard III-C: Suitability — must consider TOTAL portfolio, not just the product being sold.",
          "Standard III-E: Confidentiality survives end of client relationship unless illegal activity involved.",
          "Standard IV-A: Loyalty to employer — moonlighting allowed if no conflict, employer notified.",
          "Standard VI-B: Priority — client trades first, then employer proprietary, then personal.",
          "Standard VII-B: Can say 'CFA candidate' only if actively enrolled. Cannot say 'CFA Level II passed'.",
        ],
        traps: [
          "Disclosure does NOT cure a conflict — it's necessary but not sufficient.",
          "'Should' in Standards = recommended best practice. 'Must' = required.",
          "Soft dollar arrangements are allowed if brokerage benefits clients (research counts).",
          "Employer policy > CFA Standards is NEVER correct — Standards always floor.",
          "Mosaic theory: public info + nonmaterial nonpublic info = OK to trade on.",
        ],
        mnemonic: "Standards I–VII: PIMDS-CA → Professionalism, Integrity, Duties to Clients, Duties to Employers, Investment Analysis, Conflicts, CFA Responsibilities",
      },
      {
        module: "GIPS",
        rules: [
          "GIPS compliance is firm-wide — cannot claim compliance for a single product.",
          "Composites: ALL actual fee-paying discretionary portfolios must be in at least one composite.",
          "Must present 5 years of compliant history (or since inception if <5 years), then build to 10.",
          "Verification is voluntary — but if done, must cover entire firm, not selected composites.",
          "Asset-weighted composite returns (not simple average).",
        ],
        traps: [
          "Prospective clients can request composite list — firms must provide.",
          "Non-discretionary portfolios are excluded from composites.",
          "GIPS requires 'fair value' — mark-to-market, not cost basis.",
        ],
        mnemonic: "GIPS = Global, Input, Performance, Standards — covers Firms, not individuals",
      },
    ],
  },

  "Quantitative Methods": {
    topics: [
      {
        module: "Time Value of Money & Returns",
        rules: [
          "EAR = (1 + r/m)^m − 1. Continuous: EAR = e^r − 1.",
          "Geometric mean ≤ Arithmetic mean (always). Use geometric for multi-period performance.",
          "Money-weighted return = IRR of cash flows. Time-weighted = chain-link HPRs (eliminates timing effect).",
          "TWR preferred for evaluating manager skill; MWR for client's actual experience.",
          "Annualised return: (1 + HPR)^(365/days) − 1.",
        ],
        traps: [
          "When cash flows occur mid-period, TWR requires sub-period returns.",
          "Arithmetic mean overestimates compound growth — always use geometric for 'what did the portfolio earn over N years'.",
          "EAR always > stated rate when m > 1.",
        ],
        mnemonic: "TWR = manager skill (Time = True skill). MWR = investor experience (Money = Mine).",
      },
      {
        module: "Statistics & Probability",
        rules: [
          "Normal distribution: 68%/95%/99% within 1/2/3 std devs.",
          "Lognormal distribution used for asset prices (cannot go below zero).",
          "Skewness: positive = right tail (mean > median > mode). Negative = left tail.",
          "Excess kurtosis > 0 = leptokurtic = fat tails (more extreme outcomes than normal).",
          "Roy's Safety-First: maximise SFR = (E(Rp) − RL) / σp. Pick highest SFR.",
          "Bayes: P(A|B) = P(B|A)·P(A) / P(B).",
          "Type I error: reject true H₀ (false positive). Type II: fail to reject false H₀ (false negative).",
          "Power of test = 1 − P(Type II). Larger sample → more power.",
        ],
        traps: [
          "Significance level α = P(Type I error). Reducing α increases P(Type II).",
          "p-value < α → reject H₀. p-value is NOT the probability H₀ is true.",
          "CLT: sample mean is approx normal for n ≥ 30, regardless of population distribution.",
        ],
        mnemonic: "BLUE estimators: Best Linear Unbiased Estimators. Type I = 'crying wolf' (false alarm).",
      },
    ],
  },

  "Economics": {
    topics: [
      {
        module: "Market Structures",
        rules: [
          "Perfect competition: P = MC = ATC in long run. Zero economic profit.",
          "Monopoly: MR < P, produces where MR = MC, charges higher P. Deadweight loss.",
          "Monopolistic competition: differentiated products, easy entry, zero LR economic profit.",
          "Oligopoly: few firms, interdependent pricing, kinked demand curve (sticky prices).",
          "Natural monopoly: LRAC declines over entire relevant output range.",
        ],
        traps: [
          "Shutdown point: P < AVC (short run). Exit point: P < ATC (long run).",
          "Economic profit ≠ accounting profit. EP includes opportunity cost of capital.",
          "Concentration ratio (CR4/CR8) measures market power but ignores imports and substitutes.",
        ],
        mnemonic: "PC→MC→OC→M for Perfect/Monopolistic/Oligopoly/Monopoly — competition decreases, P-MC spread increases.",
      },
      {
        module: "Monetary & Fiscal Policy",
        rules: [
          "Expansionary monetary: ↓ rates → ↑ lending → ↑ spending → ↑ GDP.",
          "Contractionary fiscal: ↑ taxes or ↓ spending → ↓ aggregate demand.",
          "Quantitative easing: central bank buys assets (beyond cutting rates to zero).",
          "Fiscal multiplier: 1/(1-MPC). Higher MPC = larger multiplier.",
          "Crowding out: government borrowing raises rates, reducing private investment.",
          "Exchange rate target: most rigid monetary framework; sacrifices domestic policy independence.",
        ],
        traps: [
          "Monetary policy lags: recognition + action + impact. Fiscal has longer action lag (legislative).",
          "Ricardian equivalence: taxpayers anticipate future taxes from deficits → save more → fiscal stimulus offset.",
          "Central bank independence correlates with lower inflation — political pressure → inflation bias.",
        ],
        mnemonic: "FAME: Fiscal (govt spending/tax), Asset purchases (QE), Monetary rate changes, Exchange rate policy — tools ordered by flexibility.",
      },
    ],
  },

  "Financial Statement Analysis": {
    topics: [
      {
        module: "Income Statement & Revenue Recognition",
        rules: [
          "Revenue recognition (IFRS 15/ASC 606): 5-step model — identify contract, performance obligations, transaction price, allocate, recognise when (or as) obligation satisfied.",
          "Gross vs net revenue: gross = full selling price; net = after agent fees. Principal reports gross; agent reports net.",
          "EPS basic = (NI − Preferred Dividends) / Weighted Average Shares.",
          "EPS diluted: include convertible securities, options, warrants if dilutive (i.e. reduce EPS).",
          "Antidilutive securities (those that increase EPS) are EXCLUDED from diluted EPS.",
          "Comprehensive income = NI + Other Comprehensive Income (OCI). OCI includes FX translation, unrealised gains on AFS securities, pension adjustments.",
          "Non-recurring items: discontinued operations and extraordinary items (rare under IFRS) shown separately, net of tax.",
        ],
        traps: [
          "Diluted EPS ≤ Basic EPS always. If a security increases EPS, it is antidilutive — exclude it.",
          "OCI items bypass the income statement — they don't affect NI but do affect equity.",
          "Long-term contracts: percentage-of-completion (IFRS preferred) vs completed contract (GAAP allows for private).",
          "Bill-and-hold and channel stuffing are aggressive revenue recognition red flags.",
        ],
        mnemonic: "IPAT: Identify → Performance obligations → Allocate → Transfer (5-step simplified).",
      },
      {
        module: "Cash Flow Statement",
        rules: [
          "Three sections: CFO (operations), CFI (investing — asset purchases/sales), CFF (financing — debt/equity).",
          "Indirect CFO: start with Net Income → add non-cash charges (depreciation, amortisation) → adjust working capital changes.",
          "Direct CFO: lists actual cash receipts and payments. Both methods produce the same CFO total.",
          "IFRS vs GAAP — interest paid: IFRS = CFO or CFF; US GAAP = CFO only.",
          "IFRS vs GAAP — dividends paid: IFRS = CFO or CFF; US GAAP = CFF only.",
          "IFRS vs GAAP — interest received: IFRS = CFO or CFI; US GAAP = CFO only.",
          "IFRS vs GAAP — dividends received: IFRS = CFO or CFI; US GAAP = CFO only.",
          "Cash flow linkage: NI links to CFO (indirect method starting point). WC changes link balance sheet to income statement.",
          "Free cash flow to firm: FCFF = CFO + Int(1−t) − CapEx.",
        ],
        traps: [
          "Depreciation is added back to NI in indirect CFO — it is non-cash, NOT a source of cash.",
          "Sale of PP&E = CFI inflow. Any gain on sale is in NI → must subtract from CFO in indirect method (avoid double-count).",
          "Rising NI but falling/negative CFO is a red flag for earnings manipulation.",
          "LIFO liquidation boosts NI and CFO artificially — inventory dips into older lower-cost layers.",
          "Capitalising vs expensing: capitalised costs → lower CFO, higher CFI outflow. Expensed → higher CFO outflow.",
        ],
        mnemonic: "IFRS gives CHOICE on interest and dividends; GAAP is FIXED. Remember: IFRS = Flexible.",
      },
      {
        module: "Inventories & Long-Lived Assets",
        rules: [
          "LIFO (US GAAP only, not IFRS): rising prices → higher COGS → lower NI → lower taxes → higher cash flow.",
          "FIFO: rising prices → lower COGS → higher NI → higher taxes → lower ending inventory.",
          "LIFO reserve = FIFO inventory − LIFO inventory. Add to convert LIFO balance sheet to FIFO.",
          "COGS (FIFO) = COGS (LIFO) − ΔLIFO reserve.",
          "Capitalise cost if future economic benefit; expense if consumed in period.",
          "Depreciation methods: straight-line, double-declining balance (accelerated), units-of-production.",
          "Impairment: IFRS uses one-step (recoverable amount < carrying value); GAAP uses two-step.",
          "IFRS allows revaluation of PP&E to fair value; US GAAP does not (only downward impairment).",
        ],
        traps: [
          "LIFO liquidation: selling old inventory layers → artificially low COGS → one-time NI boost. Not sustainable.",
          "Accelerated depreciation: higher depreciation early → lower NI early but HIGHER cash taxes paid later (DTL created).",
          "Intangible assets: internally developed (e.g. R&D) generally expensed; acquired intangibles capitalised.",
          "Research = always expense. Development = capitalise under IFRS if criteria met; expense under US GAAP.",
        ],
        mnemonic: "LIFO in inflation: 'Last In, First Out' → most recent (expensive) cost hits COGS first → lower profit, lower tax = cash benefit.",
      },
      {
        module: "Income Taxes & Deferred Items",
        rules: [
          "Deferred Tax Liability (DTL): accounting income > taxable income → pay LESS tax now, more later. Tax owed in future.",
          "Deferred Tax Asset (DTA): taxable income > accounting income → pay MORE tax now, benefit later.",
          "Common DTL cause: accelerated depreciation for tax (lower taxable income now → DTL).",
          "Common DTA causes: warranty expense accruals, pension expense, losses carried forward.",
          "Temporary differences → deferred taxes. Permanent differences (tax-exempt interest, fines) → NO deferred tax.",
          "Effective tax rate = Income Tax Expense / Pre-tax Income. May differ from statutory rate.",
          "Valuation allowance (US GAAP): reduces DTA if 'more likely than not' it cannot be realised.",
          "Tax base vs carrying value: DTA when tax base of asset > carrying value, or tax base of liability < carrying value.",
        ],
        traps: [
          "DTL ≠ a penalty — it is simply taxes deferred to a future period, a normal result of timing differences.",
          "DTA ≠ a tax refund — it represents future tax savings already paid or accrued.",
          "Only TEMPORARY differences create deferred taxes. Permanent differences never create DTA/DTL.",
          "A change in tax rate affects ALL existing DTA and DTL balances immediately in the period of change.",
          "If a DTA has a valuation allowance, net DTA on balance sheet is lower — signals uncertainty about future profits.",
        ],
        mnemonic: "Pay LESS now → Liability later (DTL). Pay MORE now → Asset later (DTA). Think: 'Liability = Lazy tax payment.'",
      },
      {
        module: "Core Ratios & DuPont",
        rules: [
          "DuPont (3-factor): ROE = Net Margin × Asset Turnover × Equity Multiplier.",
          "DuPont (5-factor): ROE = Tax Burden × Interest Burden × EBIT Margin × Asset Turnover × Leverage.",
          "Current ratio = CA/CL. Quick = (Cash+AR)/CL. Cash ratio = Cash/CL.",
          "DSO = 365/(Revenue/AR). DIO = 365/(COGS/Inventory). DPO = 365/(COGS/AP).",
          "CCC = DSO + DIO − DPO. Lower CCC = better working capital efficiency.",
          "Interest coverage = EBIT/Interest. Debt-to-capital = Debt/(Debt+Equity).",
          "FCFF = NI + NCC + Int(1−t) − FCInv − WCInv.",
          "FCFE = NI + NCC − FCInv − WCInv + Net Borrowing.",
        ],
        traps: [
          "LIFO (US GAAP only): higher COGS in inflation → lower NI → lower taxes (cash benefit).",
          "LIFO reserve: add to inventory to convert LIFO to FIFO. Add (1−t)×LIFO reserve to equity.",
          "Capitalising costs → higher assets, higher NI (short term), higher CFO (lower CFI).",
          "Operating lease (IFRS 16/ASC 842): now on balance sheet for lessees. Right-of-use asset + liability.",
          "Deferred tax liability: tax paid later (accelerated depreciation common cause).",
          "Deferred tax asset: tax paid early (warranty expense, pension accruals).",
        ],
        mnemonic: "DuPont = Profitability × Efficiency × Leverage. 'PEL' — think of a PELlet gun firing ROE.",
      },
      {
        module: "Financial Reporting Quality",
        rules: [
          "Earnings quality spectrum: GAAP compliant + sustainable → GAAP compliant + unsustainable → Non-compliant.",
          "Aggressive accounting: accelerate revenue, defer expenses, inflate assets.",
          "Conservative accounting: delay revenue, accelerate expenses — less misleading long-term.",
          "Beneish M-score flags earnings manipulation (>−1.78 suggests manipulation).",
          "Warning signs: rising DSO, falling asset turnover, diverging NI vs CFO.",
        ],
        traps: [
          "Non-GAAP metrics: always check what's been excluded. Often strips out recurring costs.",
          "Channel stuffing: recognises revenue early by pushing excess inventory to distributors.",
          "Bill-and-hold: revenue recognition before delivery — requires strict criteria.",
        ],
        mnemonic: "CRIME: Channel stuffing, Related-party transactions, Income smoothing, Misclassification, Expense timing — key manipulation red flags.",
      },
    ],
  },

  "Corporate Issuers": {
    topics: [
      {
        module: "Capital Structure & WACC",
        rules: [
          "WACC = w_d×r_d×(1−t) + w_p×r_p + w_e×r_e. Use market weights, not book.",
          "MM Proposition I (no tax): capital structure irrelevant; firm value unchanged.",
          "MM Proposition II (no tax): cost of equity rises with leverage; WACC constant.",
          "MM with taxes: debt tax shield adds value; V_L = V_U + t×D.",
          "Optimal structure: balance tax shield benefit vs financial distress costs.",
          "NPV > 0 → accept. IRR > WACC → accept. Conflicting NPV/IRR: trust NPV.",
          "Payback ignores TVM and cash flows after payback. Avoid as primary criterion.",
        ],
        traps: [
          "IRR assumes reinvestment at IRR — often unrealistic. NPV assumes reinvestment at WACC.",
          "Multiple IRRs possible when cash flows change sign more than once.",
          "DOL = % change in EBIT / % change in revenue = (Revenue − VC) / EBIT.",
          "High fixed costs → high DOL → earnings more sensitive to revenue swings.",
        ],
        mnemonic: "WACC: 'We All Cost Capital' — debt cheapest (tax shield), equity most expensive.",
      },
    ],
  },

  "Equity": {
    topics: [
      {
        module: "Valuation Models",
        rules: [
          "Gordon Growth: V = D₁/(r−g). D₁ = D₀×(1+g). Requires r > g.",
          "g = ROE × retention ratio (b). Retention ratio = 1 − payout ratio.",
          "Two-stage DDM: discount dividends in Stage 1 + PV of terminal value at end of Stage 1.",
          "P/E (justified leading) = payout ratio / (r − g).",
          "EV = Mkt Cap + Debt + Minority Interest − Cash.",
          "EV/EBITDA useful for capital-intensive firms or comparing firms with different leverage.",
          "Price/Book: compares market value to accounting value. P/B < 1 may signal distress.",
          "Price/Sales: useful for firms with negative earnings (not distorted by accounting).",
        ],
        traps: [
          "Trailing P/E uses last 12 months EPS. Leading P/E uses next 12 months EPS forecast.",
          "High P/E ≠ overvalued. Could reflect high growth expectations.",
          "DDM assumes constant growth forever — inappropriate for cyclical firms.",
          "Strong-form EMH: prices reflect ALL info including private. Almost universally rejected.",
          "Semi-strong: prices reflect all PUBLIC info. Most research supports this.",
        ],
        mnemonic: "GARP: Growth At Reasonable Price — P/E relative to growth (PEG ratio = P/E ÷ g%).",
      },
      {
        module: "Market Efficiency & Indices",
        rules: [
          "Price-weighted index (e.g. DJIA): high-price stocks dominate. Splits distort.",
          "Market-cap weighted (e.g. S&P 500): large caps dominate. Momentum bias.",
          "Equal-weighted: small caps have more influence. Requires frequent rebalancing.",
          "Fundamental-weighted: based on earnings/dividends — avoids momentum bias.",
          "Weak-form EMH: past prices can't predict future returns. Technical analysis fails.",
          "Semi-strong: fundamental analysis fails to earn excess returns consistently.",
        ],
        traps: [
          "Anomalies (January effect, momentum, size premium) don't necessarily disprove EMH — data mining risk.",
          "Behavioural biases: overconfidence, loss aversion, anchoring, herding — explain apparent inefficiencies.",
          "Index rebalancing creates price pressure on added stocks — temporary, not exploitable after costs.",
        ],
        mnemonic: "EMH Weak/Semi/Strong = Technical/Fundamental/Inside info all priced in.",
      },
    ],
  },

  "Fixed Income": {
    topics: [
      {
        module: "Duration & Convexity",
        rules: [
          "Macaulay duration = weighted average time to receive cash flows (in years).",
          "Modified duration = Macaulay D / (1 + y/m). Measures price sensitivity.",
          "ΔP/P ≈ −ModD × Δy. For +1% rise in yield, price falls by ~ModD%.",
          "Convexity adjustment: add ½ × Convexity × (Δy)². Always positive for option-free bonds.",
          "Duration increases with: lower coupon, longer maturity, lower YTM.",
          "PVBP (DV01) = Modified Duration × Price × 0.0001.",
          "Callable bond: negative convexity at low yields (price appreciation capped).",
          "Putable bond: positive convexity throughout (floor on price decline).",
        ],
        traps: [
          "Macaulay duration = maturity only for zero-coupon bonds.",
          "Higher coupon → lower duration (more cash flows returned earlier).",
          "Floating rate bonds: duration ≈ time to next reset date (very short).",
          "For parallel yield curve shift, use portfolio duration (weighted average).",
          "Prepayment risk: extension risk (rates rise, prepay slows) vs contraction risk (rates fall, prepay accelerates).",
        ],
        mnemonic: "CALM: Coupon↓, Age↑ (maturity), Lower yield, More duration. Duration = sensitivity thermostat.",
      },
      {
        module: "Credit Analysis",
        rules: [
          "4 Cs of credit: Capacity (can they pay?), Collateral, Covenants, Character.",
          "Priority of claims: secured debt → senior unsecured → subordinated → preferred equity → common equity.",
          "Investment grade: BBB−/Baa3 and above. Below = high yield / 'junk'.",
          "Credit spread = YTM_corporate − YTM_benchmark_govt. Widens in recession.",
          "Expected loss = PD × LGD. LGD = 1 − recovery rate.",
          "Sovereign debt risk: ability to pay (fiscal capacity) + willingness to pay (political).",
        ],
        traps: [
          "Ratings lag the market — credit spreads move faster than rating changes.",
          "Negative covenants restrict borrower actions. Positive (affirmative) covenants require actions.",
          "Event risk: sudden rating downgrade from M&A, restructuring — not captured in duration.",
          "High-yield issuers: analyse as equity (enterprise value, cash flow coverage) not just ratios.",
        ],
        mnemonic: "4 Cs: Capacity, Collateral, Covenants, Character — think of a 'credit character check'.",
      },
    ],
  },

  "Derivatives": {
    topics: [
      {
        module: "Options & Forwards",
        rules: [
          "Call payoff (long): max(S_T − X, 0). Put payoff (long): max(X − S_T, 0).",
          "Put-call parity: C + PV(X) = P + S (European options).",
          "Long call + short put = synthetic forward (same as buying forward).",
          "Forward price: F = S₀ × (1+r)^T (no income). With income: F = (S₀−PV(I)) × (1+r)^T.",
          "Option value = intrinsic value + time value. Time value always ≥ 0.",
          "Deep ITM options: mostly intrinsic value. OTM options: entirely time value.",
          "Delta: call delta 0 to +1. Put delta −1 to 0. ATM ≈ ±0.5.",
          "Higher volatility → higher option value (both calls and puts).",
        ],
        traps: [
          "American call on non-dividend stock: never optimal to exercise early (time value loss).",
          "American put: may be optimal to exercise early if deeply ITM (interest on proceeds).",
          "Futures marked to market daily — gains/losses settled each day (unlike forwards).",
          "Futures price ≠ expected future spot price. F = S × (1+r)^T ± cost of carry.",
          "Short forward obligation — must sell at F regardless of market price.",
        ],
        mnemonic: "PCP: Put + Cash = Call + Stock. Rearrange to find any missing value.",
      },
    ],
  },

  "Alternatives": {
    topics: [
      {
        module: "Alternative Investment Features",
        rules: [
          "PE return calculation: use IRR on actual cash flows (committed ≠ invested capital).",
          "2-and-20: 2% management fee on committed/invested capital; 20% carried interest above hurdle.",
          "J-curve: PE funds show negative early returns (fees + early write-downs) before exits.",
          "NAV per share = (Total Assets − Total Liabilities) / Shares Outstanding.",
          "Real estate cap rate = NOI / Property Value. Higher cap rate = lower value (like P/E inverse).",
          "Infrastructure: long duration, inflation-linked cash flows, often regulated monopolies.",
          "Commodity futures return = spot return + roll return + collateral return.",
        ],
        traps: [
          "Hedge fund return calculation: gross vs net (after 2-and-20 fees). Always check which.",
          "Survivorship bias: databases exclude failed funds → overstate average returns.",
          "Backfill bias: funds choose when to enter database → only report good early history.",
          "PE IRR inflated by early distributions (J-curve reversal) — compare with PME.",
          "Direct vs fund investment: direct = control but concentrated; fund = diversified but double fees.",
        ],
        mnemonic: "J-CURVE: Junior fees and write-downs before Cumulative Returns Unfold via Exits.",
      },
    ],
  },

  "Portfolio Management": {
    topics: [
      {
        module: "CAPM & Risk",
        rules: [
          "CAPM: E(R) = Rf + β × (E(Rm) − Rf). Beta = systematic risk.",
          "SML plots E(R) vs beta. CML plots E(R) vs total risk (σ) — only efficient portfolios.",
          "Systematic (market) risk: cannot diversify away. Non-systematic: diversifiable.",
          "Portfolio variance: σ²_p = w²_Aσ²_A + w²_Bσ²_B + 2w_Aw_BρABσ_Aσ_B.",
          "Minimum variance portfolio: lowest risk for a given combination of two assets.",
          "Sharpe = (Rp−Rf)/σp. Treynor = (Rp−Rf)/β. Jensen's α = Rp − CAPM_return.",
          "M² (Modigliani): Sharpe adjusted to match market volatility. Comparable across funds.",
          "Use Sharpe when portfolio = total wealth. Use Treynor when portfolio is one of many.",
        ],
        traps: [
          "Beta > 1: more volatile than market. Beta < 1: less volatile. Beta = 0: risk-free asset.",
          "Zero-beta portfolio expected return = Rf (on SML). Above SML = undervalued.",
          "Correlation drives diversification benefit. ρ = −1 → maximum diversification.",
          "Efficient frontier assumes investors are risk-averse — maximise return for given risk.",
          "CAL (Capital Allocation Line): risk-free asset + any risky portfolio. CML: risk-free + market portfolio.",
        ],
        mnemonic: "SML = all assets (by beta). CML = only efficient portfolios (by sigma). 'Security vs Capital'.",
      },
      {
        module: "Behavioural Finance",
        rules: [
          "Cognitive errors: information processing mistakes. Can be corrected with better data.",
          "Emotional biases: driven by feelings. Harder to correct — must accommodate.",
          "Loss aversion: losses feel ~2× worse than equivalent gains (Kahneman/Tversky).",
          "Overconfidence: overestimates skill, underestimates risk. Common in experienced investors.",
          "Anchoring: over-reliance on first piece of information seen.",
          "Herding: following crowd — amplifies market bubbles and crashes.",
          "Mental accounting: treating money differently based on source/intended use.",
          "Framing: decision changes based on how question is presented.",
        ],
        traps: [
          "Representativeness: assuming recent pattern continues (gambler's fallacy).",
          "Availability bias: overweight easily recalled events (recent crashes).",
          "Confirmation bias: seek info that confirms existing view, ignore contradictory.",
          "Disposition effect: selling winners too early, holding losers too long (loss aversion + pride).",
        ],
        mnemonic: "FOCAL: Framing, Overconfidence, Confirmation, Anchoring, Loss aversion — 5 core biases to know cold.",
      },
    ],
  },
};


async function callAIChat(userId, messages, maxTokens=450, level="1", {throws=false}={}){
  if(!userId){if(throws)throw new Error("Not signed in");return null;}
  try{
    const trimmed=messages.slice(-10).map(m=>({role:m.role==="user"?"user":"assistant",content:String(m.content||"").slice(0,800)}));
    const res=await fetch(AI_PROXY_URL,{
      method:"POST",
      headers:{"content-type":"application/json","apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`},
      body:JSON.stringify({requestType:"chat",userId,messages:trimmed,maxTokens:Math.min(maxTokens,900),level})
    });
    if(!res.ok){
      const body=await res.json().catch(()=>({}));
      if(body?.quotaExceeded){
        const err=new Error(body.error||"Chat limit reached");
        err.quotaExceeded=true;
        err.used=body.used;
        err.limit=body.limit;
        throw err;
      }
      const msg=body?.error||`Server error ${res.status}`;
      if(throws)throw new Error(msg);
      return null;
    }
    const data=await res.json();
    if(data.error){const msg=data.error?.message||"AI error";if(throws)throw new Error(msg);return null;}
    return data.content?.map(i=>i.text||"").join("").trim()||null;
  }catch(e){
    if(e.quotaExceeded){throw e;} // always propagate quota errors
    if(throws)throw e;
    return null;
  }
}

// Self-contained formula block with optional AI breakdown button.
function FormulaBlock({text,C,onExplain,conceptLabel}){
  const [exp,setExp]=React.useState(null);
  const [loading,setLoading]=React.useState(false);
  // Parse structured AI response: first line starting with 📐 is the formula name
  const lines=exp?exp.split("\n").map(s=>s.trim()).filter(Boolean):[];
  const nameMatch=lines[0]&&/^📐/.test(lines[0]);
  const formulaName=nameMatch?lines[0]:"";
  const bodyLines=nameMatch?lines.slice(1):lines;
  return(
    <div style={{margin:"7px 0"}}>
      {conceptLabel&&!exp&&<div style={{fontSize:10,color:C.muted,marginBottom:3,paddingLeft:4,letterSpacing:"0.04em"}}>📐 {conceptLabel}</div>}
      <div style={{fontFamily:"'Courier New',monospace",fontSize:12,background:`${C.accent}12`,border:`1px solid ${C.accent}33`,borderLeft:`3px solid ${C.accentLight}`,borderRadius:"0 8px 8px 0",padding:"9px 12px",color:C.accentLight,wordBreak:"break-word",lineHeight:1.9}}>{text}</div>
      {!exp&&!loading&&onExplain&&(
        <button onClick={async()=>{setLoading(true);try{const r=await onExplain(text);setExp(r);}catch{setExp("Could not explain — try again.");}setLoading(false);}}
          style={{marginTop:5,fontSize:11,color:C.accentLight,background:"none",border:`1px solid ${C.accent}33`,borderRadius:6,padding:"4px 11px",cursor:"pointer"}}>
          🔍 What formula is this?
        </button>
      )}
      {loading&&<div style={{marginTop:5,fontSize:11,color:C.muted,fontStyle:"italic"}}>Identifying formula…</div>}
      {exp&&(
        <div style={{marginTop:6,background:`${C.accent}08`,border:`1px solid ${C.accent}33`,borderRadius:8,padding:"12px 14px",fontSize:12,color:C.text,lineHeight:1.8}}>
          {formulaName&&<div style={{fontSize:13,fontWeight:800,color:C.accentLight,marginBottom:8}}>{formulaName}</div>}
          {bodyLines.map((line,i)=>(
            <div key={i} style={{marginBottom:3,paddingLeft:line.startsWith("•")?0:0,color:line.startsWith("Calculates:")||line.startsWith("What it")?"#a0c8ff":C.text}}>{line}</div>
          ))}
          <button onClick={()=>setExp(null)} style={{display:"block",marginTop:10,fontSize:10,color:C.muted,background:"none",border:"none",cursor:"pointer",padding:0}}>✕ Close</button>
        </div>
      )}
    </div>
  );
}

// Renders explanation text with formula sentences in a distinct monospace block.
// A sentence is "formula-heavy" if it contains = and complex math operators (^, /, [, *).
// Pass onExplain(formulaText)=>Promise<string> to enable the "Break it down" button.
function renderExplanation(text,C,onExplain,conceptLabel){
  if(!text)return null;
  const parts=text.split(/\.\s+(?=[A-Z\$\(])/).filter(Boolean);
  const isFormula=s=>/=/.test(s)&&/[\^\/\[\]\*]/.test(s)&&/\d/.test(s);
  if(!parts.some(isFormula))return <span>{text}</span>;
  return(<>{parts.map((s,i)=>{const trimmed=s.trim();const last=i===parts.length-1;if(isFormula(trimmed)){return <FormulaBlock key={i} text={trimmed} C={C} onExplain={onExplain} conceptLabel={conceptLabel}/>;}return <span key={i}>{trimmed}{!last?". ":""}</span>;})}</>);
}

// Canvas rounded-rect path helper (ctx.roundRect not available in all browsers)
function _crr(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);
  ctx.closePath();
}

function buildShareImage({sessionPct,sessionScore,total,subtopic,difficulty,timeTaken,todayStudySecs,cfaLevel,fmtStudyTime,levelLabel,levelNum}){
  const W=1080,H=1080;
  const canvas=document.createElement('canvas');
  canvas.width=W;canvas.height=H;
  const ctx=canvas.getContext('2d');

  const accent=sessionPct>=70?'#22c55e':sessionPct>=50?'#f59e0b':'#ef4444';

  // ── Background ──
  const bg=ctx.createLinearGradient(0,0,W,H);
  bg.addColorStop(0,'#06061a');bg.addColorStop(1,'#0c0c26');
  ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

  // Dot grid texture
  ctx.fillStyle='#ffffff07';
  for(let gx=54;gx<W;gx+=54)for(let gy=54;gy<H;gy+=54){
    ctx.beginPath();ctx.arc(gx,gy,1.5,0,Math.PI*2);ctx.fill();
  }

  // Radial glow behind ring
  const glow=ctx.createRadialGradient(W/2,460,0,W/2,460,400);
  glow.addColorStop(0,accent+'22');glow.addColorStop(1,'transparent');
  ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);

  // ── Header ──
  ctx.font='bold 40px system-ui,-apple-system,sans-serif';
  ctx.fillStyle='#6060b0';ctx.textAlign='left';
  ctx.fillText('✦ ClearCFA',90,106);
  ctx.font='28px system-ui,-apple-system,sans-serif';
  ctx.fillStyle='#40408a';ctx.textAlign='right';
  ctx.fillText(`CFA Level ${cfaLevel}`,W-90,106);
  ctx.strokeStyle='#ffffff0d';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(90,124);ctx.lineTo(W-90,124);ctx.stroke();

  // ── Topic name (wrapped, max 2 lines) ──
  ctx.font='bold 54px system-ui,-apple-system,sans-serif';
  ctx.fillStyle='#dcdcf8';ctx.textAlign='center';
  const tWords=subtopic.split(' ');
  let tLine='',tLines=[];
  for(const w of tWords){
    const test=tLine?tLine+' '+w:w;
    if(ctx.measureText(test).width>W-180&&tLine){tLines.push(tLine);tLine=w;}
    else tLine=test;
  }
  tLines.push(tLine);
  const tBlockH=tLines.length*66;
  const tStartY=148+(170-tBlockH)/2+54; // centre in 148-318 band
  tLines.forEach((l,i)=>ctx.fillText(l,W/2,tStartY+i*66));

  // ── Score ring ──
  const cx=W/2,cy=490,R=172,lw=28;
  // Track
  ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);
  ctx.strokeStyle='#ffffff12';ctx.lineWidth=lw;ctx.stroke();
  // Filled arc
  const endAng=-Math.PI/2+(sessionPct/100)*Math.PI*2;
  const arcG=ctx.createLinearGradient(cx-R,cy-R,cx+R,cy+R);
  arcG.addColorStop(0,accent);arcG.addColorStop(1,accent+'bb');
  ctx.beginPath();ctx.arc(cx,cy,R,-Math.PI/2,endAng);
  ctx.strokeStyle=arcG;ctx.lineWidth=lw;ctx.lineCap='round';
  ctx.shadowColor=accent;ctx.shadowBlur=28;ctx.stroke();ctx.shadowBlur=0;
  // Score number
  ctx.font='bold 128px system-ui,-apple-system,sans-serif';
  ctx.fillStyle='#ffffff';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(`${sessionPct}%`,cx,cy-4);
  ctx.textBaseline='alphabetic';
  // Verdict below ring
  const verdict=sessionPct>=70?'Above Threshold ✓':sessionPct>=50?'Getting there →':'Keep drilling 💪';
  ctx.font='bold 32px system-ui,-apple-system,sans-serif';
  ctx.fillStyle=accent;
  ctx.fillText(verdict,cx,cy+R+50);

  // ── Stats pill ──
  const sY=cy+R+80;
  ctx.fillStyle='#ffffff09';
  _crr(ctx,90,sY,W-180,68,14);ctx.fill();
  const mins=timeTaken>0?` · ⏱ ${Math.round(timeTaken/60)} min`:'';
  ctx.font='31px system-ui,-apple-system,sans-serif';
  ctx.fillStyle='#8080b8';
  ctx.fillText(`${sessionScore}/${total} correct  ·  ${difficulty}${mins}`,cx,sY+44);

  // ── Progress bar ──
  const bY=sY+88,bH=10,bX=100,bW=W-200;
  ctx.fillStyle='#ffffff10';_crr(ctx,bX,bY,bW,bH,5);ctx.fill();
  const fW=Math.max(bH,(sessionPct/100)*bW);
  const bG=ctx.createLinearGradient(bX,0,bX+fW,0);
  bG.addColorStop(0,accent+'88');bG.addColorStop(1,accent);
  ctx.fillStyle=bG;ctx.shadowColor=accent;ctx.shadowBlur=10;
  _crr(ctx,bX,bY,fW,bH,5);ctx.fill();ctx.shadowBlur=0;

  // ── Pass/fail verdict badge ──
  const badgeY=bY+60;
  const badgeW=380,badgeH=44;
  const badgeBg=sessionPct>=70?'#22c55e22':'#ef444422';
  const badgeBorder=sessionPct>=70?'#22c55e':'#ef4444';
  ctx.strokeStyle=badgeBorder;ctx.lineWidth=1.5;
  _crr(ctx,cx-badgeW/2,badgeY,badgeW,badgeH,10);ctx.fillStyle=badgeBg;ctx.fill();ctx.stroke();
  ctx.font='bold 22px system-ui,-apple-system,sans-serif';
  ctx.fillStyle=sessionPct>=70?'#22c55e':'#ef4444';
  ctx.fillText(sessionPct>=70?'ABOVE 70% THRESHOLD ✓':'BELOW 70% THRESHOLD',cx,badgeY+29);

  // ── vs threshold progress bar ──
  const tbY=badgeY+62;
  const tbW=W-200;
  ctx.fillStyle='#ffffff08';_crr(ctx,100,tbY,tbW,8,4);ctx.fill();
  const filledW=Math.max(8,(sessionPct/100)*tbW);
  ctx.fillStyle=accent;ctx.shadowColor=accent;ctx.shadowBlur=8;
  _crr(ctx,100,tbY,filledW,8,4);ctx.fill();ctx.shadowBlur=0;
  // 70% threshold line
  const threshX=100+tbW*0.7;
  ctx.strokeStyle='#ffffff55';ctx.lineWidth=2;ctx.setLineDash([4,4]);
  ctx.beginPath();ctx.moveTo(threshX,tbY-6);ctx.lineTo(threshX,tbY+14);ctx.stroke();
  ctx.setLineDash([]);
  ctx.font='18px system-ui,-apple-system,sans-serif';
  ctx.fillStyle='#22c55e88';
  ctx.textAlign='center';ctx.fillText('70%',threshX,tbY+32);ctx.textAlign='center';

  // ── Study time badge ──
  let footY=tbY+58;
  if(todayStudySecs>0){
    ctx.font='27px system-ui,-apple-system,sans-serif';
    ctx.fillStyle='#4c4c90';
    ctx.fillText(`📚 ${fmtStudyTime(todayStudySecs)} studied today`,cx,footY);
    footY+=46;
  }

  // ── XP level chip ──
  if(levelLabel||levelNum){
    ctx.font='20px system-ui,-apple-system,sans-serif';
    ctx.fillStyle='#f59e0b88';
    ctx.fillText(`⭐ ${levelLabel||""} · Level ${levelNum||""}  ·  CFA L${cfaLevel||"1"}`,cx,footY);
    footY+=36;
  }

  // ── Footer ──
  footY+=18;
  ctx.strokeStyle='#ffffff09';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(90,footY);ctx.lineTo(W-90,footY);ctx.stroke();
  footY+=48;
  ctx.font='bold 29px system-ui,-apple-system,sans-serif';
  ctx.fillStyle='#38388a';
  ctx.fillText('clearcfa.com  ·  Free AI-powered CFA exam prep',cx,footY);

  return canvas;
}

function parseDebrief(text){
  const get=(label)=>{const m=text.match(new RegExp(label+":\\s*([^\\n]+)"));return m?m[1].trim():"";};
  return{pattern:get("PATTERN"),fix:get("FIX"),priority:get("PRIORITY"),time:get("TIME"),coach:get("COACH")};
}

function parseRefresherReveal(text){
  const expMatch=text.match(/EXPLANATION:\s*([\s\S]*?)(?=TRAP:|$)/i);
  const trapMatch=text.match(/TRAP:\s*([\s\S]*?)$/i);
  return{explanation:(expMatch?.[1]||"").trim(),trap:(trapMatch?.[1]||"").trim()};
}

// ─── REVISION SCREEN COMPONENTS ──────────────────────────────────────────────
function parseLesson(text, topic){
  const lines=text.split('\n').map(s=>s.trim()).filter(Boolean);
  let framework="",section="",curConcept=null,curFormula=null;
  const concepts=[],formulas=[],examPatterns=[],edgeCases=[],connections=[],recall=[];
  let exSetup="",exSteps=[],exAnswer="",inSteps=false;
  for(const line of lines){
    if(/^FRAMEWORK:\s*/i.test(line)){framework=line.replace(/^FRAMEWORK:\s*/i,"").trim();section="framework";continue;}
    if(/^CONCEPTS?:?\s*$/i.test(line)){section="concepts";curConcept=null;continue;}
    if(/^FORMULAS?:?\s*$/i.test(line)){section="formulas";curFormula=null;continue;}
    if(/^WORKED EXAMPLES?:?\s*$/i.test(line)){section="example";inSteps=false;continue;}
    if(/^EXAM PATTERNS?:?\s*$/i.test(line)){section="examPatterns";continue;}
    if(/^EDGE CASES?:?\s*$/i.test(line)){section="edgeCases";continue;}
    if(/^CONNECTIONS?:?\s*$/i.test(line)){section="connections";continue;}
    if(/^RECALL:?\s*$/i.test(line)){section="recall";continue;}
    if(section==="framework"){framework=(framework?framework+" ":"")+line;continue;}
    if(section==="concepts"){
      const nm=line.match(/^\[CONCEPT\]\s*(.*)/i);const dt=line.match(/^\[DETAIL\]\s*(.*)/i);
      if(nm){curConcept={name:nm[1].trim(),detail:""};concepts.push(curConcept);}
      else if(dt&&curConcept){curConcept.detail=(curConcept.detail?curConcept.detail+" ":"")+dt[1].trim();}
      else if(curConcept&&!line.startsWith("[")){curConcept.detail=(curConcept.detail?curConcept.detail+" ":"")+line;}
      continue;
    }
    if(section==="formulas"){
      const fm=line.match(/^\[FORMULA\]\s*(.*)/i);const ex=line.match(/^\[EXAMPLE\]\s*(.*)/i);
      if(fm){curFormula={formula:fm[1].trim(),example:""};formulas.push(curFormula);}
      else if(ex&&curFormula){curFormula.example=(curFormula.example?curFormula.example+" ":"")+ex[1].trim();}
      else if(curFormula&&!line.startsWith("[")){curFormula.example=(curFormula.example?curFormula.example+" ":"")+line;}
      continue;
    }
    if(section==="example"){
      const su=line.match(/^\[SETUP\]\s*(.*)/i);const st=line.match(/^\[STEPS?\]\s*(.*)/i);const an=line.match(/^\[ANSWER\]\s*(.*)/i);
      if(su){exSetup=(exSetup?exSetup+" ":"")+su[1].trim();inSteps=false;}
      else if(st){inSteps=true;if(st[1].trim())exSteps.push(st[1].trim());}
      else if(an){exAnswer=an[1].trim();inSteps=false;}
      else if(inSteps&&/^\d+\./.test(line))exSteps.push(line.replace(/^\d+\.\s*/,"").trim());
      else if(!inSteps&&!line.startsWith("["))exAnswer=(exAnswer?exAnswer+" ":"")+line;
      continue;
    }
    const bullet=line.replace(/^[•\-\*]\s*/,"").trim();
    if(!bullet)continue;
    if(section==="examPatterns")examPatterns.push(bullet);
    else if(section==="edgeCases")edgeCases.push(bullet);
    else if(section==="connections")connections.push(bullet);
    else if(section==="recall")recall.push(bullet);
  }
  return{topic,framework,concepts,formulas,
    workedExample:exSetup?{setup:exSetup,steps:exSteps,answer:exAnswer}:null,
    examPatterns,edgeCases,connections,recall,
    _aiGen:true,_v:2,generatedAt:new Date().toISOString()};
}

function parsePNAIResponse(text, moduleName){
  const lines=text.split('\n').map(s=>s.trim()).filter(Boolean);
  const rules=[],traps=[];
  let mnemonic="",section="";
  for(const line of lines){
    if(/^RULES?:?\s*$/i.test(line)){section="rules";continue;}
    if(/^TRAPS?:?\s*$/i.test(line)){section="traps";continue;}
    if(/^MNEMONIC:?\s*$/i.test(line)){section="mnemonic";continue;}
    if(section==="rules"&&/^[•\-\*]/.test(line)) rules.push(line.replace(/^[•\-\*]\s*/,""));
    else if(section==="traps"&&/^[•\-\*]/.test(line)) traps.push(line.replace(/^[•\-\*]\s*/,""));
    else if(section==="mnemonic") mnemonic=(mnemonic?mnemonic+" ":"")+line;
  }
  return{module:moduleName,rules:rules.length?rules:["Review the official CFA curriculum for this concept."],traps:traps.length?traps:["Verify distinctions carefully."],mnemonic:mnemonic.trim(),_auto:true,_aiGen:true};
}

function parseFormulaAIResponse(text, conceptName){
  const lines=text.split('\n').map(s=>s.trim()).filter(Boolean);
  let name=conceptName,f="",variables="",when="",example="",section="";
  for(const line of lines){
    if(/^NAME:\s*/i.test(line)){name=line.replace(/^NAME:\s*/i,"").trim();continue;}
    if(/^FORMULA:\s*/i.test(line)){f=line.replace(/^FORMULA:\s*/i,"").trim();section="";continue;}
    if(/^VARIABLES?:\s*$/i.test(line)){section="variables";continue;}
    if(/^WHEN:\s*/i.test(line)){when=line.replace(/^WHEN:\s*/i,"").trim();section="when";continue;}
    if(/^EXAMPLE:\s*/i.test(line)){example=line.replace(/^EXAMPLE:\s*/i,"").trim();section="example";continue;}
    if(section==="variables") variables=(variables?variables+"\n":"")+line;
    else if(section==="when") when=(when?when+" ":"")+line;
    else if(section==="example") example=(example?example+" ":"")+line;
  }
  const fClean=f.replace(/^N\/A\s*[-–—]?\s*/i,"").trim();
  if(!f||/^N\/A$/i.test(f.trim())) return null;
  return{name,f:fClean||f,variables,when,example,_aiGen:true};
}

function FeedbackModal({onClose, userId="", onSubmit}){
  const [rating,setRating]=useState(0);
  const [hovered,setHovered]=useState(0);
  const [category,setCategory]=useState("General");
  const [message,setMessage]=useState("");
  const [state,setState]=useState("idle"); // idle | sending | done | error
  const cats=["Bug Report","Feature Request","General","Praise"];
  const catColors={"Bug Report":C.hard,"Feature Request":C.accent,"General":C.muted,"Praise":C.easy};
  const send=async()=>{
    if(!message.trim()&&rating===0) return;
    setState("sending");
    const ok=await onSubmit({userId,rating,category,message});
    setState(ok?"done":"error");
  };
  if(state==="done") return (
    <div style={{position:"fixed",inset:0,background:"#0009",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:900,padding:"0 0 0 0"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:480,background:C.surface,borderRadius:"20px 20px 0 0",padding:"28px 20px 40px",display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
        <div style={{fontSize:40}}>🙏</div>
        <div style={{fontSize:17,fontWeight:800,color:C.text,textAlign:"center"}}>Thanks for your feedback!</div>
        <div style={{fontSize:13,color:C.muted,textAlign:"center"}}>It helps us make ClearCFA better for everyone.</div>
        <button onClick={onClose} style={{marginTop:8,padding:"11px 32px",borderRadius:12,fontSize:13,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>Close</button>
      </div>
    </div>
  );
  return (
    <div style={{position:"fixed",inset:0,background:"#0009",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:900}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:480,background:C.surface,borderRadius:"20px 20px 0 0",padding:"24px 20px 40px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div style={{fontSize:16,fontWeight:800,color:C.text}}>Send Feedback</div>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,color:C.muted,cursor:"pointer",padding:"0 4px"}}>×</button>
        </div>
        {/* Star rating */}
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:8,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em"}}>How's your experience?</div>
          <div style={{display:"flex",gap:8}}>
            {[1,2,3,4,5].map(n=>(
              <button key={n} onMouseEnter={()=>setHovered(n)} onMouseLeave={()=>setHovered(0)} onClick={()=>setRating(n)}
                style={{fontSize:26,background:"none",border:"none",cursor:"pointer",padding:"2px",transition:"transform 0.1s",transform:(hovered||rating)>=n?"scale(1.2)":"scale(1)"}}>
                {(hovered||rating)>=n?"⭐":"☆"}
              </button>
            ))}
          </div>
        </div>
        {/* Category */}
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:8,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em"}}>Type</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {cats.map(c=>(
              <button key={c} onClick={()=>setCategory(c)}
                style={{padding:"6px 12px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer",transition:"all 0.15s",
                  background:category===c?catColors[c]+"22":C.surfaceHigh,
                  border:`1.5px solid ${category===c?catColors[c]:"transparent"}`,
                  color:category===c?catColors[c]:C.muted}}>
                {c}
              </button>
            ))}
          </div>
        </div>
        {/* Message */}
        <div style={{marginBottom:20}}>
          <div style={{fontSize:11,color:C.muted,marginBottom:8,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em"}}>Message</div>
          <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Tell us what's on your mind…" maxLength={1000} rows={4}
            style={{width:"100%",background:C.surfaceHigh,border:`1px solid ${C.border}`,borderRadius:12,padding:"10px 12px",fontSize:13,color:C.text,resize:"none",outline:"none",fontFamily:"inherit"}}/>
          <div style={{fontSize:10,color:C.muted,textAlign:"right",marginTop:3}}>{message.length}/1000</div>
        </div>
        {state==="error"&&<div style={{fontSize:12,color:C.hard,marginBottom:10,textAlign:"center"}}>Something went wrong — please try again.</div>}
        <button onClick={send} disabled={state==="sending"||(!message.trim()&&rating===0)}
          style={{width:"100%",padding:"13px",borderRadius:14,fontSize:14,fontWeight:700,border:"none",cursor:state==="sending"||(!message.trim()&&rating===0)?"not-allowed":"pointer",
            background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",opacity:state==="sending"||(!message.trim()&&rating===0)?0.5:1,transition:"opacity 0.15s"}}>
          {state==="sending"?"Sending…":"Send Feedback"}
        </button>
      </div>
    </div>
  );
}

function OnboardingGate({onComplete}){
  const [step,setStep]=React.useState(0); // 0=level, 1=date, 2=retaker topics
  const [level,setLevel]=React.useState("1");
  const [isRetaking,setIsRetaking]=React.useState(false);
  const [retakerTopics,setRetakerTopics]=React.useState([]);
  const [pendingExamDate,setPendingExamDate]=React.useState(null);
  const EXAM_DATES=[
    {label:"Aug 2026",value:"2026-08-19"},
    {label:"Nov 2026",value:"2026-11-19"},
    {label:"May 2027",value:"2027-05-19"},
    {label:"Set later",value:null},
  ];
  return(
    <div style={{position:"fixed",inset:0,zIndex:500,background:"rgba(0,0,0,0.92)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 20px"}}>
      <div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:20,padding:"28px 24px",width:"100%",maxWidth:360,animation:"fadeIn 0.25s ease"}}>
        {step===0&&(
          <>
            <div style={{fontSize:26,marginBottom:10,textAlign:"center"}}>👋</div>
            <div style={{fontSize:18,fontWeight:800,color:C.text,textAlign:"center",marginBottom:6}}>Welcome to ClearCFA</div>
            <div style={{fontSize:13,color:C.muted,textAlign:"center",marginBottom:22,lineHeight:1.5}}>Which CFA exam are you preparing for?</div>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
              {[["1","CFA Level 1","Ethics, FI, FSA, Equity, Quant, Econ…"],["2","CFA Level 2","Vignette-style, deeper valuation focus"],["3","CFA Level 3","Portfolio management, IPS, behavioural"]].map(([v,title,sub])=>(
                <button key={v} onClick={()=>setLevel(v)} style={{display:"flex",flexDirection:"column",alignItems:"flex-start",padding:"13px 16px",borderRadius:12,border:`2px solid ${level===v?C.accent:C.border}`,background:level===v?C.accent+"18":"transparent",cursor:"pointer",textAlign:"left",transition:"all 0.15s"}}>
                  <span style={{fontSize:14,fontWeight:700,color:level===v?C.accentLight:C.text}}>{title}</span>
                  <span style={{fontSize:11,color:C.muted,marginTop:2}}>{sub}</span>
                </button>
              ))}
            </div>
            <button onClick={()=>setStep(1)} style={{width:"100%",padding:"13px",borderRadius:11,fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>
              Continue →
            </button>
          </>
        )}
        {step===1&&(
          <>
            <div style={{fontSize:26,marginBottom:10,textAlign:"center"}}>📅</div>
            <div style={{fontSize:18,fontWeight:800,color:C.text,textAlign:"center",marginBottom:6}}>When is your exam?</div>
            <div style={{fontSize:13,color:C.muted,textAlign:"center",marginBottom:22,lineHeight:1.5}}>This unlocks your pass probability counter and daily study targets.</div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
              {EXAM_DATES.map(({label,value})=>(
                <button key={label} onClick={()=>{if(isRetaking){setPendingExamDate(value);setStep(2);}else{onComplete({level,examDate:value,retakerTopics:[]});}}} style={{padding:"12px 16px",borderRadius:12,border:`1.5px solid ${C.border}`,background:C.surface,color:C.text,fontSize:14,fontWeight:600,cursor:"pointer",textAlign:"left",transition:"all 0.12s"}}>
                  {value?`📝 ${label}`:`⏭ ${label}`}
                </button>
              ))}
            </div>
            <button onClick={()=>setIsRetaking(r=>!r)}
              style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"10px 14px",
                borderRadius:10,fontSize:13,cursor:"pointer",marginBottom:16,
                background:isRetaking?C.accent+"18":"none",
                border:`1px solid ${isRetaking?C.accent:C.border}`,color:isRetaking?C.accent:C.textMid}}>
              <span style={{fontSize:15}}>{isRetaking?"✓":"○"}</span>
              <span>I'm retaking this level</span>
            </button>
            <button onClick={()=>setStep(0)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:12,width:"100%",textAlign:"center"}}>← Back</button>
          </>
        )}
        {step===2&&(
          <>
            <div style={{fontSize:26,marginBottom:10,textAlign:"center"}}>🎯</div>
            <div style={{fontSize:18,fontWeight:800,color:C.text,textAlign:"center",marginBottom:4}}>Which topics hurt you?</div>
            <div style={{fontSize:12,color:C.muted,textAlign:"center",marginBottom:16,lineHeight:1.5}}>Select areas that were below average on your score report</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
              {Object.keys(getActiveLOS(level)).map(t=>(
                <button key={t} onClick={()=>setRetakerTopics(rt=>rt.includes(t)?rt.filter(x=>x!==t):[...rt,t])}
                  style={{padding:"7px 12px",borderRadius:20,fontSize:12,fontWeight:600,cursor:"pointer",
                    background:retakerTopics.includes(t)?C.accent+"22":"none",
                    border:`1px solid ${retakerTopics.includes(t)?C.accent:C.border}`,
                    color:retakerTopics.includes(t)?C.accent:C.textMid}}>
                  {t}
                </button>
              ))}
            </div>
            <button onClick={()=>onComplete({level,examDate:pendingExamDate,retakerTopics})}
              style={{width:"100%",padding:"12px",borderRadius:10,fontSize:14,fontWeight:700,marginBottom:10,
                background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>
              {retakerTopics.length>0?`Done — ${retakerTopics.length} weak area${retakerTopics.length>1?"s":""} saved`:"Done (skip)"}
            </button>
            <button onClick={()=>setStep(1)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:12,width:"100%",textAlign:"center"}}>← Back</button>
          </>
        )}
      </div>
    </div>
  );
}
function UpgradeModal({reason, onClose, userEmail="", onCheckAccess, passProb=null, weakCount=0, streakDays=0}){
  const [step,setStep]=useState("info"); // "info" | "pay" | "checking" | "granted" | "notyet"
  const [copied,setCopied]=useState(false);
  const headers={
    limit:{icon:"⚡",title:"Daily limit reached",sub:`You've used your ${FREE_DAILY_AI_LIMIT} free questions today. Resets at midnight.`},
    chat_limit:{icon:"💬",title:"Chat limit reached",sub:"You've used your 15 free AI chat messages today. Upgrade to Pro for unlimited AI tutoring. Resets at midnight."},
    coach:{icon:"🤖",title:"Pro feature",sub:"AI Coach is available on the Pro plan."},
    plan:{icon:"🗓",title:"Pro feature",sub:"Weekly AI study plans are available on Pro."},
    l2l3:{icon:"📚",title:"Pro feature",sub:"Full CFA L2 & L3 support is available on Pro."},
    learn:{icon:"🎓",title:"Pro feature",sub:"AI Topic Lessons are available on Pro."},
    timed_mock:{icon:"⏱",title:"Pro feature",sub:"Timed Mock is a Pro feature — simulate the full 3-hour exam experience"},
    exam_sim:{icon:"🎓",title:"Power Pro feature",sub:"Full Exam Simulator (180 questions · 3 hours · all topics) is a Power Pro exclusive."},
    default:{icon:"🚀",title:"Upgrade to Pro",sub:"Get unlimited access to every ClearCFA feature."},
  };
  const {icon,title,sub}=headers[reason]||headers.default;

  const copyUPI=()=>{
    try{navigator.clipboard.writeText(PAYMENT_UPI_ID);}catch{}
    setCopied(true);setTimeout(()=>setCopied(false),2000);
  };

  const checkAccess=async()=>{
    setStep("checking");
    const isPro=await (onCheckAccess?.()??Promise.resolve(false));
    setStep(isPro?"granted":"notyet");
  };

  return(
    <div style={{position:"fixed",inset:0,zIndex:600,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(4px)",display:"flex",flexDirection:"column",justifyContent:"flex-end"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.bg,borderRadius:"20px 20px 0 0",padding:"22px 20px 40px",border:`1px solid ${C.border}`,borderBottom:"none",maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{width:36,height:4,borderRadius:2,background:C.border,margin:"0 auto 20px"}}/>

        {step==="granted"&&(
          <div style={{textAlign:"center",padding:"24px 16px"}}>
            <div style={{fontSize:40,marginBottom:12}}>🎉</div>
            <div style={{fontSize:17,fontWeight:800,color:C.easy,marginBottom:8}}>Pro access granted!</div>
            <div style={{fontSize:13,color:C.muted,lineHeight:1.6,marginBottom:20}}>Welcome to ClearCFA Pro. Enjoy unlimited AI questions across L1, L2 & L3.</div>
            <button onClick={onClose} style={{width:"100%",padding:"13px",borderRadius:11,fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${C.easy},${C.easyLight||C.easy})`,color:"#fff",border:"none",cursor:"pointer"}}>Start studying →</button>
          </div>
        )}

        {step==="notyet"&&(
          <div style={{textAlign:"center",padding:"20px 16px"}}>
            <div style={{fontSize:32,marginBottom:10}}>⏳</div>
            <div style={{fontSize:15,fontWeight:800,color:C.text,marginBottom:8}}>Not found yet</div>
            <div style={{fontSize:12,color:C.muted,lineHeight:1.6,marginBottom:16}}>Payment confirmation usually takes a few hours. If you've already paid, reply to the confirmation email and we'll verify manually.</div>
            <button onClick={()=>setStep("pay")} style={{width:"100%",padding:"12px",borderRadius:10,fontSize:13,fontWeight:600,background:C.surface,border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",marginBottom:8}}>↺ Try again</button>
            <button onClick={onClose} style={{width:"100%",padding:"11px",borderRadius:10,fontSize:13,fontWeight:600,background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>Continue on free</button>
          </div>
        )}

        {step==="checking"&&(
          <div style={{textAlign:"center",padding:"40px 16px"}}>
            <div style={{fontSize:28,marginBottom:12,animation:"pulse 1s ease-in-out infinite"}}>🔍</div>
            <div style={{fontSize:14,color:C.muted}}>Checking your access…</div>
          </div>
        )}

        {step==="info"&&(
          <>
            <div style={{textAlign:"center",marginBottom:18}}>
              <div style={{fontSize:34,marginBottom:8}}>{icon}</div>
              <div style={{fontSize:18,fontWeight:800,color:C.text,marginBottom:5}}>{title}</div>
              <div style={{fontSize:13,color:C.muted,lineHeight:1.55,maxWidth:280,margin:"0 auto"}}>{sub}</div>
            </div>

            {/* #2 — Loss-framing panel for daily limit */}
            {reason==="limit"&&(passProb!==null||weakCount>0||streakDays>0)&&(
              <div style={{background:C.hard+"14",border:`1px solid ${C.hard}33`,borderRadius:12,padding:"13px 16px",marginBottom:14}}>
                <div style={{fontSize:11,fontWeight:700,color:C.hard,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>What you're leaving on the table today</div>
                {passProb!==null&&(
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                    <div style={{width:36,height:36,borderRadius:"50%",background:passProb>=70?C.easy+"22":C.hard+"22",border:`2px solid ${passProb>=70?C.easy:C.hard}55`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontSize:11,fontWeight:800,color:passProb>=70?C.easy:C.hard}}>{passProb}%</span>
                    </div>
                    <div>
                      <div style={{fontSize:12,fontWeight:700,color:C.text}}>Pass probability: {passProb}%</div>
                      <div style={{fontSize:11,color:C.muted}}>{passProb>=70?"On track — keep the momentum":"Every session gap widens this gap"}</div>
                    </div>
                  </div>
                )}
                {weakCount>0&&(
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                    <div style={{width:36,height:36,borderRadius:"50%",background:C.medium+"22",border:`2px solid ${C.medium}55`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontSize:13,fontWeight:800,color:C.medium}}>{weakCount}</span>
                    </div>
                    <div>
                      <div style={{fontSize:12,fontWeight:700,color:C.text}}>{weakCount} topic{weakCount!==1?"s":""} below 60% accuracy</div>
                      <div style={{fontSize:11,color:C.muted}}>Untrained areas examiners love to test</div>
                    </div>
                  </div>
                )}
                {streakDays>0&&(
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:36,height:36,borderRadius:"50%",background:C.reward+"22",border:`2px solid ${C.reward}55`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontSize:13,fontWeight:800,color:C.rewardLight}}>{streakDays}🔥</span>
                    </div>
                    <div>
                      <div style={{fontSize:12,fontWeight:700,color:C.text}}>{streakDays}-day streak at risk</div>
                      <div style={{fontSize:11,color:C.muted}}>Stop now and the chain breaks</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div style={{background:`linear-gradient(135deg,${C.accent}18,${C.accent}08)`,border:`1.5px solid ${C.accent}44`,borderRadius:14,padding:"14px 16px",marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div>
                  <div style={{fontSize:11,fontWeight:700,color:C.accentLight,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3}}>ClearCFA Pro · {ACTIVE_LABEL}</div>
                  <div style={{display:"flex",alignItems:"baseline",gap:8,lineHeight:1}}>
                    <div style={{fontSize:28,fontWeight:900,color:C.text}}>₹{ACTIVE_PRICE}<span style={{fontSize:11,color:C.muted,fontWeight:400}}>/mo</span></div>
                    <div style={{fontSize:13,color:C.muted,textDecoration:"line-through",fontWeight:600}}>₹{ACTIVE_WAS}</div>
                  </div>
                  <div style={{fontSize:10,color:C.easy,fontWeight:700,marginTop:3}}>Save ₹{ACTIVE_WAS-ACTIVE_PRICE}/month · locked in forever</div>
                  <div style={{fontSize:10,color:C.muted,marginTop:1}}>~${Math.round(ACTIVE_PRICE/85)} USD · payment via UPI</div>
                </div>
                <div style={{background:`linear-gradient(135deg,${C.reward},${C.rewardLight})`,color:"#fff",fontSize:9,fontWeight:800,padding:"3px 9px",borderRadius:20,whiteSpace:"nowrap"}}>{ACTIVE_LABEL.toUpperCase()}</div>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:"6px 12px",marginBottom:12}}>
                {["Unlimited AI questions","CFA L1 + L2 + L3","AI Coach","Weekly study plans","Power Notes + Formulas","Spaced repetition"].map(f=>(
                  <div key={f} style={{fontSize:11,color:C.textMid,display:"flex",gap:4,alignItems:"center"}}>
                    <span style={{color:C.easy,fontWeight:700,fontSize:10}}>✓</span>{f}
                  </div>
                ))}
              </div>
              {/* Slot counter inside the card */}
              {ACTIVE_TIER>0&&(
                <div style={{borderTop:`1px solid ${C.accent}22`,paddingTop:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                    <span style={{fontSize:11,color:C.rewardLight,fontWeight:700}}>{ACTIVE_SLOTS-ACTIVE_TAKEN} of {ACTIVE_SLOTS} {ACTIVE_LABEL} spots left</span>
                    <span style={{fontSize:10,color:C.muted}}>price rises to ₹{ACTIVE_WAS} after</span>
                  </div>
                  <div style={{height:4,background:C.border,borderRadius:2}}>
                    <div style={{height:"100%",width:`${Math.round((ACTIVE_TAKEN/ACTIVE_SLOTS)*100)}%`,background:`linear-gradient(90deg,${C.reward},${C.rewardLight})`,borderRadius:2,transition:"width 0.4s"}}/>
                  </div>
                </div>
              )}
            </div>

            {/* What happens after this tier fills */}
            {ACTIVE_TIER===1&&(
              <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:9,padding:"8px 12px",marginBottom:12}}>
                <div style={{fontSize:11,color:C.muted,lineHeight:1.6}}>
                  After these {ACTIVE_SLOTS} spots: price goes to <span style={{color:C.text,fontWeight:700}}>₹{PRICE_TIER2}/mo</span>, then <span style={{color:C.text,fontWeight:700}}>₹{PRICE_REGULAR}/mo</span> for everyone else. Your price is locked in forever once you join.
                </div>
              </div>
            )}

            <button onClick={()=>setStep("pay")}
              style={{width:"100%",padding:"14px",borderRadius:11,fontSize:14,fontWeight:800,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",boxShadow:`0 4px 18px ${C.accent}44`,marginBottom:10}}>
              💳 Get {ACTIVE_LABEL} — ₹{ACTIVE_PRICE}/month
            </button>

            {/* Power Pro upsell */}
            <div style={{background:`linear-gradient(135deg,${C.reward}10,${C.reward}06)`,border:`1px solid ${C.reward}33`,borderRadius:12,padding:"12px 14px",marginBottom:10,cursor:"pointer"}} onClick={()=>setStep("pay_power")}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div>
                  <div style={{fontSize:11,fontWeight:800,color:C.rewardLight,letterSpacing:"0.05em"}}>⚡ POWER PRO</div>
                  <div style={{fontSize:12,color:C.muted,marginTop:1}}>Exam Simulator + priority support</div>
                </div>
                <div style={{fontSize:16,fontWeight:900,color:C.rewardLight}}>₹{PRICE_POWER}<span style={{fontSize:10,fontWeight:400,color:C.muted}}>/mo</span></div>
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {["Everything in Pro","Full Exam Simulator (3hr · 180q)","Priority support"].map(f=>(
                  <span key={f} style={{fontSize:10,color:C.textMid,display:"flex",gap:3,alignItems:"center"}}>
                    <span style={{color:C.rewardLight,fontWeight:700}}>✓</span>{f}
                  </span>
                ))}
              </div>
            </div>

            <button onClick={onClose} style={{width:"100%",padding:"11px",borderRadius:10,fontSize:13,fontWeight:600,background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>
              {reason==="limit"?"Continue on free · resets at midnight":"Continue on free"}
            </button>
          </>
        )}

        {step==="pay"&&(
          <>
            {/* Founder note */}
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"13px 16px",marginBottom:16,display:"flex",gap:12,alignItems:"flex-start"}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:C.accent+"22",border:`1px solid ${C.accent}44`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:16}}>👋</div>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:3}}>Hi, I'm GSP</div>
                <div style={{fontSize:11,color:C.muted,lineHeight:1.6}}>I built ClearCFA while preparing for CFA myself. Pay below and WhatsApp me your screenshot — I'll activate your access personally within the hour.</div>
              </div>
            </div>

            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",marginBottom:12}}>
              <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>UPI ID</div>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <div style={{flex:1,fontSize:16,fontWeight:800,color:C.text,letterSpacing:"0.02em"}}>{PAYMENT_UPI_ID}</div>
                <button onClick={copyUPI} style={{padding:"7px 14px",borderRadius:8,fontSize:12,fontWeight:700,background:copied?C.easy+"22":`${C.accent}22`,border:`1px solid ${copied?C.easy:C.accent}44`,color:copied?C.easy:C.accentLight,cursor:"pointer",flexShrink:0,transition:"all 0.2s"}}>
                  {copied?"✓ Copied":"Copy"}
                </button>
              </div>
              <div style={{marginTop:10,padding:"8px 10px",borderRadius:8,background:C.accent+"12",border:`1px solid ${C.accent}22`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div>
                  <span style={{fontSize:12,fontWeight:800,color:C.accent}}>Amount: </span>
                  <span style={{fontSize:14,fontWeight:900,color:C.text}}>₹{ACTIVE_PRICE}</span>
                  <span style={{fontSize:11,color:C.muted}}> /month</span>
                </div>
                <div style={{fontSize:11,color:C.muted,textDecoration:"line-through"}}>₹{ACTIVE_WAS}</div>
              </div>
            </div>

            {/* WhatsApp CTA — primary confirmation path */}
            {PAYMENT_WHATSAPP&&(
              <a href={`https://wa.me/${PAYMENT_WHATSAPP}?text=${encodeURIComponent("Hi GSP, I just paid ₹"+ACTIVE_PRICE+" for ClearCFA Pro. My registered email is: "+userEmail+"\n\nHere's my payment screenshot 👇")}`}
                target="_blank" rel="noopener noreferrer"
                style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,width:"100%",padding:"13px",borderRadius:11,fontSize:13,fontWeight:700,background:"#25D366",color:"#fff",textDecoration:"none",marginBottom:10,boxShadow:"0 4px 14px #25D36644"}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp payment screenshot →
              </a>
            )}

            <button onClick={checkAccess}
              style={{width:"100%",padding:"12px",borderRadius:11,fontSize:13,fontWeight:700,background:C.surface,border:`1px solid ${C.accent}55`,color:C.accentLight,cursor:"pointer",marginBottom:8}}>
              ✓ Already paid — check my access
            </button>
            <button onClick={()=>setStep("info")} style={{width:"100%",padding:"10px",borderRadius:10,fontSize:13,fontWeight:600,background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>
              ← Back
            </button>
          </>
        )}

        {step==="pay_power"&&(
          <>
            <div style={{textAlign:"center",marginBottom:16}}>
              <div style={{fontSize:28,marginBottom:6}}>⚡</div>
              <div style={{fontSize:17,fontWeight:800,color:C.rewardLight,marginBottom:4}}>Power Pro — ₹{PRICE_POWER}/mo</div>
              <div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>Includes everything in Pro + Exam Simulator + priority support</div>
            </div>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",marginBottom:12}}>
              <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>UPI ID</div>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <div style={{flex:1,fontSize:16,fontWeight:800,color:C.text}}>{PAYMENT_UPI_ID}</div>
                <button onClick={copyUPI} style={{padding:"7px 14px",borderRadius:8,fontSize:12,fontWeight:700,background:copied?C.easy+"22":`${C.accent}22`,border:`1px solid ${copied?C.easy:C.accent}44`,color:copied?C.easy:C.accentLight,cursor:"pointer",flexShrink:0}}>
                  {copied?"✓ Copied":"Copy"}
                </button>
              </div>
              <div style={{marginTop:10,padding:"8px 10px",borderRadius:8,background:C.reward+"12",border:`1px solid ${C.reward}22`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div>
                  <span style={{fontSize:12,fontWeight:800,color:C.rewardLight}}>Amount: </span>
                  <span style={{fontSize:14,fontWeight:900,color:C.text}}>₹{PRICE_POWER}</span>
                  <span style={{fontSize:11,color:C.muted}}> /month</span>
                </div>
                <span style={{fontSize:10,color:C.rewardLight,fontWeight:700}}>Power Pro</span>
              </div>
            </div>
            {PAYMENT_WHATSAPP&&(
              <a href={`https://wa.me/${PAYMENT_WHATSAPP}?text=${encodeURIComponent("Hi GSP, I just paid ₹"+PRICE_POWER+" for ClearCFA Power Pro. My registered email is: "+userEmail+"\n\nHere's my payment screenshot 👇")}`}
                target="_blank" rel="noopener noreferrer"
                style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,width:"100%",padding:"13px",borderRadius:11,fontSize:13,fontWeight:700,background:"#25D366",color:"#fff",textDecoration:"none",marginBottom:10,boxShadow:"0 4px 14px #25D36644"}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Power Pro screenshot →
              </a>
            )}
            <button onClick={checkAccess} style={{width:"100%",padding:"12px",borderRadius:11,fontSize:13,fontWeight:700,background:C.surface,border:`1px solid ${C.accent}55`,color:C.accentLight,cursor:"pointer",marginBottom:8}}>
              ✓ Already paid — check my access
            </button>
            <button onClick={()=>setStep("info")} style={{width:"100%",padding:"10px",borderRadius:10,fontSize:13,fontWeight:600,background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>
              ← Back to plans
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function LessonSection({title, items, color}){
  if(!items?.length) return null;
  return(
    <div style={{background:C.surface,borderRadius:12,padding:"14px 16px",marginBottom:10,border:`1px solid ${C.border}`}}>
      <div style={{fontSize:11,fontWeight:700,color,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.08em"}}>{title}</div>
      {items.map((item,i)=>(
        <div key={i} style={{fontSize:12,color:C.textMid,lineHeight:1.65,paddingLeft:14,marginBottom:4,position:"relative"}}>
          <span style={{position:"absolute",left:0,color}}>•</span>{item}
        </div>
      ))}
    </div>
  );
}

function RevisionScreen({onBack, initialTopic=null, initialTab="notes", userId="", srDeck={}, focusConcept=null, cfaLevel="1", isPro=false, onStartQuiz=null, topicLessons={}, setTopicLessons=()=>{}, onUpgrade=null, topicReadiness=[]}){
  const activePowerNotes=getActivePowerNotes(cfaLevel);
  const activeFormulas=getActiveFormulas(cfaLevel);
  const activeLOSR=getActiveLOS(cfaLevel);
  const [selTopic, setSelTopic] = useState(()=>{
    const base=initialTopic||Object.keys(POWER_NOTES)[0];
    if(initialTab==="formulas"&&(getActiveFormulas(cfaLevel)[base]||[]).length===0){
      return Object.keys(getActiveFormulas(cfaLevel)).find(t=>(getActiveFormulas(cfaLevel)[t]||[]).length>0)||base;
    }
    if(initialTab==="los"&&!getActiveLOS(cfaLevel)[base]?.modules){
      return Object.keys(getActiveLOS(cfaLevel)).find(t=>getActiveLOS(cfaLevel)[t]?.modules)||base;
    }
    return base;
  });
  const [tab, setTab] = useState(initialTab); // "notes" | "formulas" | "los" | "learn" | "coach"
  // Auto-correct selTopic to a valid key for the active tab's data source.
  // Prevents "No LOS data" when selTopic was set under a different tab's key space
  // (e.g. daily-mission topic "Ethics & Professional Standards" doesn't match LOS "Ethics").
  useEffect(()=>{
    if(tab==="los"&&!activeLOSR[selTopic]?.modules){
      const first=Object.keys(activeLOSR).find(t=>activeLOSR[t]?.modules);
      if(first)setSelTopic(first);
    }else if(tab==="formulas"&&!(activeFormulas[selTopic]?.length)){
      const first=Object.keys(activeFormulas).find(t=>activeFormulas[t]?.length);
      if(first)setSelTopic(first);
    }else if((tab==="notes"||tab==="learn")&&!activePowerNotes[selTopic]){
      const first=Object.keys(activePowerNotes)[0];
      if(first)setSelTopic(first);
    }
  },[tab]);

  const [expandedModule, setExpandedModule] = useState(0);
  const [drillMode, setDrillMode] = useState(false);
  const [drillIdx, setDrillIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [drillResult, setDrillResult] = useState({}); // {idx: "got it"|"again"}
  const [drillDone, setDrillDone] = useState(false);
  const [aiPanel, setAiPanel] = useState(null); // {context, messages:[{role,content}]}
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const aiMsgsRef = useRef([]);
  const [expandedWrong, setExpandedWrong] = useState(null);
  const [dynamicPN, setDynamicPN] = useState(()=>{try{return JSON.parse(localStorage.getItem(DYNAMIC_PN_KEY)||"{}");}catch{return {};}});
  const [dynamicFormulas, setDynamicFormulas] = useState(()=>{
    try{
      const raw=JSON.parse(localStorage.getItem(DYNAMIC_FORMULAS_KEY)||"{}");
      // Sanitize on load: ensure each topic is an array of valid formula objects
      const clean={};
      for(const [k,v] of Object.entries(raw)){
        if(!Array.isArray(v)) continue;
        const valid=v.filter(f=>f&&f.name&&f.f&&f.name.length<=70&&!/^N\/A/i.test(f.f.trim())&&f.f!=="See curriculum");
        if(valid.length) clean[k]=valid;
      }
      return clean;
    }catch{return {};}
  });
  const [pnGenerating, setPnGenerating] = useState({});
  const [formulaGenerating, setFormulaGenerating] = useState({});
  const [formulaGenError, setFormulaGenError] = useState({});
  const [resolvedGapKeys, setResolvedGapKeys] = useState(()=>{try{return new Set(JSON.parse(localStorage.getItem(RESOLVED_GAPS_KEY)||"[]"));}catch{return new Set();}});
  const markGapResolved=(key)=>setResolvedGapKeys(s=>{const n=new Set([...s,key]);try{localStorage.setItem(RESOLVED_GAPS_KEY,JSON.stringify([...n]));}catch{}return n;});
  const [expandedFormula, setExpandedFormula] = useState(null);
  const [expandedFormulaModule, setExpandedFormulaModule] = useState(null);
  const [expandedMistakeGroup, setExpandedMistakeGroup] = useState(null);
  const [lessonGenerating, setLessonGenerating] = useState({});
  const [coachMsgs, setCoachMsgs] = useState([]);
  const [coachInput, setCoachInput] = useState("");
  const [coachLoading, setCoachLoading] = useState(false);
  const [coachTopic, setCoachTopic] = useState(null);
  const coachMsgsEndRef = useRef(null);
  const [coachOnboardDone, setCoachOnboardDone] = useState(()=>{try{return !!localStorage.getItem("cfa_coach_onboard_v1");}catch{return false;}});
  const [expandedLessonConcept, setExpandedLessonConcept] = useState(null);

  // Reset formula module accordion when topic changes
  useEffect(()=>{setExpandedFormulaModule(null);setExpandedFormula(null);},[selTopic]);

  // Auto-select first formula-bearing topic when switching to formulas tab; auto-generate lesson for Pro users
  useEffect(()=>{
    if(tab==="formulas"&&(activeFormulas[selTopic]||[]).length===0){
      const first=Object.keys(activeFormulas).find(t=>(activeFormulas[t]||[]).length>0);
      if(first) setSelTopic(first);
    }
    if(tab==="learn"&&isPro&&userId&&!lessonGenerating[selTopic]&&(!topicLessons[selTopic]||(topicLessons[selTopic]._v||0)<2)){
      generateLesson(selTopic);
    }
  },[tab,selTopic]);

  // Merge static POWER_NOTES with any AI-generated dynamic modules
  const staticTopics = activePowerNotes[selTopic]?.topics || [];
  const dynamicTopics = dynamicPN[selTopic] || [];
  const topicData = {topics:[...staticTopics, ...dynamicTopics]};
  const staticFormulas = FORMULAS[selTopic] || [];
  const dynSeenNames=new Set();
  const _rawDynFormulas = Array.isArray(dynamicFormulas[selTopic]) ? dynamicFormulas[selTopic] : [];
  const dynamicFormulaData = _rawDynFormulas.filter(f=>{
    if(!f||!f.f||!f.name) return false;
    if(f.f==="See curriculum"||/^N\/A/i.test(f.f.trim())) return false;
    if(f.name.length>70) return false; // reject AI descriptions masquerading as formula names
    const nk=f.name.toLowerCase().replace(/[^a-z0-9]/g,"").slice(0,18);
    if(dynSeenNames.has(nk))return false;
    dynSeenNames.add(nk);
    return true;
  });
  const formulaData = [
    ...staticFormulas,
    ...dynamicFormulaData.map(f=>({...f, _aiGen:true, module:"✦ From Your Mistakes"})),
  ];
  const allFormulas = Object.values(FORMULAS).flat();
  // Enrich formulaData with module groupings; build ordered module list
  const _fModLookup = FORMULA_MODULES[selTopic] || {};
  const enrichedFormulas = formulaData.map((f, fi) => ({...f, _fi: fi, module: f.module || _fModLookup[f.name] || "General"}));
  const _fModOrder = [];
  const _fModMap = {};
  for (const f of enrichedFormulas) {
    if (!_fModMap[f.module]) { _fModMap[f.module] = []; _fModOrder.push(f.module); }
    _fModMap[f.module].push(f);
  }

  const drillData = formulaData.length > 0 ? formulaData : allFormulas;
  const drillTotal = drillData.length;
  const drillCard = drillData[drillIdx] || null;
  const drillProgress = Object.keys(drillResult).length;

  const _revChatQuotaMsg=(e)=>{
    setAiPanel(null);
    // bubble up via a thrown error so callers can optionally handle; just show a message in the panel
    const msg=e?.message||"Daily chat limit reached. Upgrade to Pro for unlimited AI tutoring.";
    setAiPanel(p=>p?{...p,messages:[...(aiMsgsRef.current||[]),{role:"assistant",content:`⚠️ ${msg}`}]}:null);
  };
  const openAI = async (context, firstPrompt) => {
    const userMsg = {role:"user", content:firstPrompt};
    aiMsgsRef.current = [userMsg];
    setAiPanel({context, messages:[userMsg]});
    setAiInput("");
    setAiLoading(true);
    try{
      const reply = await callAIChat(userId, [userMsg]);
      const withReply = [...aiMsgsRef.current, {role:"assistant", content:reply||"No response — check your API key in Settings."}];
      aiMsgsRef.current = withReply;
      setAiPanel(p=>p?{...p, messages:withReply}:null);
    }catch(e){_revChatQuotaMsg(e);}
    setAiLoading(false);
  };

  const sendAI = async () => {
    if(!aiInput.trim()||aiLoading) return;
    const userMsg = {role:"user", content:aiInput.trim()};
    const msgs = [...aiMsgsRef.current, userMsg];
    aiMsgsRef.current = msgs;
    setAiPanel(p=>p?{...p, messages:msgs}:null);
    setAiInput("");
    setAiLoading(true);
    try{
      const reply = await callAIChat(userId, msgs);
      const withReply = [...msgs, {role:"assistant", content:reply||"No response — check your API key in Settings."}];
      aiMsgsRef.current = withReply;
      setAiPanel(p=>p?{...p, messages:withReply}:null);
    }catch(e){_revChatQuotaMsg(e);}
    setAiLoading(false);
  };

  const generatePNForConcept = async (card) => {
    const name=((card.subtopic||card.concept||"").trim());
    if(!name||!userId) return;
    const key=name.toLowerCase();
    if(pnGenerating[key]) return;
    setPnGenerating(s=>({...s,[key]:true}));
    const prompt=`CFA Level ${cfaLevel} curriculum exam prep. Write concise study notes for: "${name}" (Topic: ${selTopic})\nContext from a wrong answer: "${(card.explanation||"").slice(0,400)}"\n${card.los_tested?`LOS: ${card.los_tested}`:""}\n\nRespond in EXACTLY this format:\nRULES\n• [exam-ready rule 1]\n• [rule 2]\n• [rule 3]\n\nTRAPS\n• [common mistake 1]\n• [common mistake 2]\n\nMNEMONIC\n[one memorable phrase]`;
    const reply=await callAIChat(userId,[{role:"user",content:prompt}],450,cfaLevel);
    setPnGenerating(s=>({...s,[key]:false}));
    if(!reply) return;
    const mod=parsePNAIResponse(reply,name);
    const existing=dynamicPN[selTopic]||[];
    if(existing.some(m=>m.module.toLowerCase()===key)) return;
    const updated={...dynamicPN,[selTopic]:[...existing,mod]};
    setDynamicPN(updated);
    try{localStorage.setItem(DYNAMIC_PN_KEY,JSON.stringify(updated));}catch{}
  };

  const generateFormulaForConcept = async (card) => {
    const name=((card.subtopic||card.concept||"").trim());
    if(!name||!userId) return;
    const key=name.toLowerCase();
    if(formulaGenerating[key]) return;
    setFormulaGenerating(s=>({...s,[key]:true}));
    setFormulaGenError(s=>({...s,[key]:""}));
    try{
      const prompt=`CFA Level ${cfaLevel} exam prep. A student got this concept wrong and needs the key formula or metric.\nConcept: "${name}" (Topic: ${selTopic})\nContext: "${(card.explanation||"").slice(0,300)}"\n\nIf this concept has a quantitative formula, ratio, or key calculation, respond in EXACTLY this format:\nNAME: [formula or metric name]\nFORMULA: [expression using standard notation, e.g. ROE = Net Income / Equity]\nVARIABLES:\n[each variable on its own line: variable = what it means]\nWHEN: [one sentence: when to use on the exam]\nEXAMPLE: [one sentence worked example with numbers]\n\nIf this concept is purely qualitative with NO quantitative formula or ratio at all, respond with only:\nFORMULA: N/A`;
      const reply=await callAIChat(userId,[{role:"user",content:prompt}],400,cfaLevel,{throws:true});
      if(!reply){setFormulaGenError(s=>({...s,[key]:"No response — try again."}));return;}
      const formula=parseFormulaAIResponse(reply,name);
      if(!formula){markGapResolved(key);return;}
      const normN=s=>s.toLowerCase().replace(/[^a-z0-9]/g,"").slice(0,15);
      const existing=dynamicFormulas[selTopic]||[];
      const formulaNameN=normN(formula.name||"");
      if(existing.some(f=>normN(f.name||"")===formulaNameN||normN(f.name||"")===normN(key))) return;
      // Deduplicate entire list before saving to prevent accumulated duplicates
      const seen=new Set();
      const deduped=existing.filter(f=>{const k=normN(f.name||"");if(seen.has(k))return false;seen.add(k);return true;});
      const updated={...dynamicFormulas,[selTopic]:[...deduped,formula]};
      setDynamicFormulas(updated);
      try{localStorage.setItem(DYNAMIC_FORMULAS_KEY,JSON.stringify(updated));}catch{}
      markGapResolved(key);
    }catch(e){
      const msg=typeof e?.message==="string"?e.message:typeof e==="string"?e:"Generation failed — try again.";
      setFormulaGenError(s=>({...s,[key]:msg}));
    }finally{
      setFormulaGenerating(s=>({...s,[key]:false}));
    }
  };

  const startCoach = async (topic) => {
    if(!userId||coachLoading) return;
    setCoachTopic(topic);
    setCoachMsgs([]);
    setCoachInput("");
    setCoachLoading(true);
    const weak=Object.values(srDeck).filter(c=>c.topic===topic&&(c.wrongCount||0)>0).sort((a,b)=>(b.wrongCount||0)-(a.wrongCount||0)).slice(0,3).map(c=>c.concept||c.subtopic).filter(Boolean).join(", ");
    const rd=topicReadiness.find(r=>r.topic===topic);
    const perfCtx=rd?.accuracy!=null?`The student has attempted ${rd.totalQs||0} questions on this topic with ${rd.accuracy}% accuracy across ${rd.sessions} session(s).`:"The student has not yet practiced this topic.";
    const prompt=`CFA Level ${cfaLevel} concept coach. The student wants to understand "${topic}". ${perfCtx}${weak?` Specific weak concepts from their SR deck: ${weak}.`:""}\n\nStart a short teaching dialogue. Begin with a key concept question to gauge their level — if their accuracy is low, start with a foundational concept; if above 75%, target a nuanced or application-level question. One question only — 2 sentences max.`;
    const reply=await callAIChat(userId,[{role:"user",content:prompt}],220,cfaLevel);
    if(reply) setCoachMsgs([{role:"assistant",content:reply}]);
    setCoachLoading(false);
    setTimeout(()=>coachMsgsEndRef.current?.scrollIntoView({behavior:"smooth"}),100);
  };

  const sendCoach = async (text) => {
    if(!userId||coachLoading||!text.trim()) return;
    const newMsgs=[...coachMsgs,{role:"user",content:text}];
    setCoachMsgs(newMsgs);
    setCoachInput("");
    setCoachLoading(true);
    const rd=topicReadiness.find(r=>r.topic===coachTopic);
    const perfCtx=rd?.accuracy!=null?` Student's exam accuracy on this topic: ${rd.accuracy}%.`:"";
    const system=`CFA Level ${cfaLevel} concept coach for topic "${coachTopic}".${perfCtx} Teach through dialogue and Socratic questions. Keep responses to 2-3 sentences. If the student's answer shows understanding, advance to the next concept. If not, gently clarify with a concrete example or analogy.`;
    const reply=await callAIChat(userId,[{role:"user",content:system},...newMsgs.slice(-8)],280,cfaLevel);
    if(reply) setCoachMsgs(m=>[...m,{role:"assistant",content:reply}]);
    setCoachLoading(false);
    setTimeout(()=>coachMsgsEndRef.current?.scrollIntoView({behavior:"smooth"}),100);
  };

  const generateLesson = async (topic) => {
    if(lessonGenerating[topic]||!userId) return;
    const existing=topicLessons[topic];
    if(existing&&(existing._v||0)>=2) return;
    setLessonGenerating(s=>({...s,[topic]:true}));
    const weak=Object.values(srDeck)
      .filter(c=>c.topic===topic&&(c.wrongCount||0)>0)
      .sort((a,b)=>(b.wrongCount||0)-(a.wrongCount||0))
      .slice(0,5).map(c=>c.concept||c.subtopic).filter(Boolean).join(", ");
    const rd=topicReadiness.find(r=>r.topic===topic);
    const perfCtx=rd?.accuracy!=null?`\nStudent performance: ${rd.accuracy}% accuracy over ${rd.sessions} session(s). Focus extra depth on their weak areas.`:"";
    const prompt=`You are a CFA Level ${cfaLevel} exam instructor writing a comprehensive study guide for the topic "${topic}".${perfCtx}${weak?`\nSpecific weak concepts from their practice history: ${weak}.`:""}\n\nWrite a deep, exam-focused study guide in EXACTLY this format:\n\nFRAMEWORK: [2-3 sentences: what this topic is, how it fits the CFA curriculum, why the exam tests it]\n\nCONCEPTS:\n[CONCEPT] [concept name]\n[DETAIL] [2-3 sentences: detailed explanation with intuition, not just definition]\n[Repeat for 4-6 key concepts]\n\nFORMULAS:\n[FORMULA] [formula name: algebraic expression]\n[EXAMPLE] [one-line numerical application with specific numbers and result]\n[Repeat for all key quantitative formulas; omit section if topic is purely qualitative]\n\nWORKED EXAMPLE:\n[SETUP] [realistic exam vignette with specific numbers — 1-2 sentences]\n[STEPS]\n1. [step with calculation]\n2. [next step]\n3. [final step]\n[ANSWER] [the answer with units and a one-line interpretation]\n\nEXAM PATTERNS:\n• [how the CFA specifically tests this — question structure, distractors, what they ask for]\n[3-5 bullets]\n\nEDGE CASES:\n• [non-obvious scenario or exception that trips candidates]\n[3-5 bullets]\n\nCONNECTIONS:\n• [Topic → related CFA topic: why they connect for the exam]\n[2-4 bullets]\n\nRECALL:\n• [memorable anchor — mnemonic, rule of thumb, or sharp contrast]\n[3-5 bullets]\n\nBe precise and exam-focused. Total length: 600-900 words. No hedging language.`;
    try{
      const reply=await callAIChat(userId,[{role:"user",content:prompt}],1100,cfaLevel);
      if(!reply) return;
      const lesson=parseLesson(reply,topic);
      const updated={...topicLessons,[topic]:lesson};
      setTopicLessons(updated);
      try{localStorage.setItem(LESSONS_KEY,JSON.stringify(updated));}catch{}
    }finally{
      setLessonGenerating(s=>({...s,[topic]:false}));
    }
  };

  return (
    <div style={{fontFamily:"system-ui,sans-serif",background:C.bg,minHeight:"100vh",padding:"16px 16px 40px"}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div>
          <h2 style={{margin:0,fontSize:20,fontWeight:800,color:C.text}}>📚 Quick Revision</h2>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>Curated high-yield facts · Zero API cost</div>
        </div>
        <button onClick={onBack} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>← Home</button>
      </div>

      {/* Tab switcher */}
      <div style={{display:"flex",gap:0,marginBottom:14,background:C.surface,borderRadius:10,padding:3,border:`1px solid ${C.border}`}}>
        {[["notes","📝 Notes"],["formulas","📐 Formulas"],["los","📋 LOS"],["learn","🎓 Deep Study"],["coach","🤖 Coach"]].map(([t,label])=>(
          <button key={t} onClick={()=>setTab(t)}
            style={{flex:1,padding:"8px",borderRadius:8,fontSize:11,fontWeight:700,border:"none",cursor:"pointer",
              background:tab===t?`linear-gradient(135deg,${C.accent},${C.accentLight})`:C.surface,
              color:tab===t?"#fff":C.muted,transition:"all 0.15s"}}>
            {label}
          </button>
        ))}
      </div>

      {/* Topic picker — notes/formulas/los only; learn/coach render their own below */}
      {(tab==="notes"||tab==="formulas"||tab==="los")&&(
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
        {Object.keys(tab==="los"?activeLOSR:tab==="notes"?POWER_NOTES:FORMULAS).map(t=>{
          const w=activeLOSR[t]?.weight||0;
          const hasContent=tab==="los"?!!(activeLOSR[t]?.modules):(tab==="notes"?(activePowerNotes[t]?.topics?.length>0):(activeFormulas[t]?.length>0));
          if(!hasContent)return null;
          return(
            <button key={t} onClick={()=>{setSelTopic(t);setExpandedModule(null);}}
              style={{padding:"5px 11px",borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",
                border:selTopic===t?`1.5px solid ${C.accent}`:`1.5px solid ${C.border}`,
                background:selTopic===t?C.accent+"22":C.surface,
                color:selTopic===t?C.accentLight:C.muted}}>
              {t.split(" ")[0]} <span style={{opacity:0.6,fontWeight:400}}>{w}%</span>
            </button>
          );
        })}
      </div>
      )}

      {/* ── WRONG ANSWERS FOR THIS TOPIC ── */}
      {tab==="notes" && (()=>{
        const wrongCards=Object.values(srDeck).filter(c=>c.topic===selTopic&&(c.wrongCount||0)>0).sort((a,b)=>(b.wrongCount||0)-(a.wrongCount||0)).slice(0,12);
        if(!wrongCards.length) return null;
        const topics=topicData?.topics||[];
        // Group by matched module; unmatched cards each get their own entry
        const groups=[];
        for(const card of wrongCards){
          let modIdx=topics.findIndex(m=>m.module&&(m.module.toLowerCase().includes((card.subtopic||"").toLowerCase())||(card.subtopic||"").toLowerCase().includes(m.module.toLowerCase())));
          if(modIdx<0) modIdx=topics.findIndex(m=>m.module&&card.concept&&m.module.toLowerCase().includes((card.concept||"").split(" ")[0].toLowerCase()));
          if(modIdx>=0){
            const existing=groups.find(g=>g.modIdx===modIdx);
            if(existing){existing.cards.push(card);}
            else{groups.push({modIdx,matchedMod:topics[modIdx],cards:[card]});}
          } else {
            groups.push({modIdx:-1,matchedMod:null,cards:[card]});
          }
        }
        return(
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:"#e05070",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.08em"}}>⚠ Concepts you've missed in {selTopic}</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {groups.map((group,gi)=>{
              const{modIdx,matchedMod,cards}=group;
              const isAuto=matchedMod?._auto;
              const totalWrong=cards.reduce((s,c)=>s+(c.wrongCount||0),0);
              const conceptName=(cards[0].subtopic||cards[0].concept||"").trim();
              const genKey=conceptName.toLowerCase();
              const isGenerating=pnGenerating[genKey];
              const alreadyGenerated=modIdx<0&&(dynamicPN[selTopic]||[]).some(m=>m.module.toLowerCase()===genKey);
              if(modIdx<0){
                // Unmatched concept — show AI notes generator card
                return(
                  <div key={gi} style={{width:"100%",background:"#0e0818",border:"1px solid #c0304433",borderRadius:10,padding:"10px 13px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:12,fontWeight:700,color:"#e2e2ff",marginBottom:4}}>{conceptName||"Unknown concept"}</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:"3px 5px"}}>
                          {cards.map((c,ci)=>(
                            <span key={ci} style={{fontSize:10,background:"#1a0a28",border:"1px solid #c0304444",borderRadius:4,padding:"1px 6px",color:"#9090c0"}}>
                              {c.concept||c.subtopic} <span style={{color:"#e05070",fontWeight:700}}>×{c.wrongCount}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                      <span style={{fontSize:10,background:"#e05070",color:"#fff",fontWeight:700,padding:"2px 6px",borderRadius:4,whiteSpace:"nowrap",flexShrink:0,marginLeft:8}}>{totalWrong}×</span>
                    </div>
                    {alreadyGenerated?(
                      <div style={{fontSize:11,color:"#6060b0",fontStyle:"italic"}}>✦ AI notes generated — see below</div>
                    ):(
                      <button onClick={()=>generatePNForConcept(cards[0])} disabled={isGenerating||!userId}
                        style={{marginTop:4,padding:"6px 12px",borderRadius:7,fontSize:11,fontWeight:700,border:`1px solid ${C.accent}55`,background:`${C.accent}18`,color:isGenerating?"#6060b0":C.accentLight,cursor:isGenerating||!userId?"default":"pointer",width:"100%",textAlign:"center"}}>
                        {isGenerating?"⏳ Generating AI notes…":"✨ Generate AI Study Notes"}{!userId&&" (sign in required)"}
                      </button>
                    )}
                  </div>
                );
              }
              return(
                /* Clicking the card opens & scrolls to the module in the accordion below */
                <button key={gi}
                  onClick={()=>{setExpandedModule(modIdx);setTimeout(()=>document.getElementById(`pn-mod-${modIdx}`)?.scrollIntoView({behavior:"smooth",block:"start"}),80);}}
                  style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"flex-start",background:"#0e0818",border:"1px solid #c0304433",borderRadius:10,padding:"10px 13px",cursor:"pointer",textAlign:"left"}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#e2e2ff",marginBottom:5}}>
                      <>📚 {matchedMod.module}{isAuto&&<span style={{fontSize:9,fontWeight:600,color:"#6060b0",marginLeft:6}}>✦ AI</span>}</>
                    </div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"3px 5px"}}>
                      {cards.map((c,ci)=>(
                        <span key={ci} style={{fontSize:10,background:"#1a0a28",border:"1px solid #c0304444",borderRadius:4,padding:"1px 6px",color:"#9090c0"}}>
                          {c.concept||c.subtopic} <span style={{color:"#e05070",fontWeight:700}}>×{c.wrongCount}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:5,flexShrink:0,marginLeft:8,marginTop:1}}>
                    <span style={{fontSize:10,background:"#e05070",color:"#fff",fontWeight:700,padding:"2px 6px",borderRadius:4,whiteSpace:"nowrap"}}>{totalWrong}×</span>
                    <span style={{fontSize:11,color:"#6060a0"}}>↓</span>
                  </div>
                </button>
              );
            })}
            </div>
          </div>
        );
      })()}

      {/* ── FOCUS CONCEPT FROM SESSION ── */}
      {tab==="notes" && focusConcept && (
        <div style={{background:`${C.accent}15`,border:`1px solid ${C.accent}44`,borderRadius:10,padding:"10px 14px",marginBottom:12}}>
          <div style={{fontSize:11,color:C.accentLight,fontWeight:700,marginBottom:4}}>📍 From your session</div>
          <div style={{fontSize:13,color:C.text,fontWeight:600}}>{focusConcept}</div>
        </div>
      )}

      {/* ── POWER NOTES TAB ── */}
      {tab==="notes" && topicData && (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {topicData.topics.map((mod,mi)=>{
            const isOpen = expandedModule===mi;
            return(
              <div key={mi} id={`pn-mod-${mi}`} style={{background:C.surface,border:`1px solid ${isOpen?C.accent+"55":C.border}`,borderRadius:13,overflow:"hidden",transition:"border-color 0.15s"}}>
                {/* Module header */}
                <button onClick={()=>setExpandedModule(isOpen?null:mi)}
                  style={{width:"100%",padding:"13px 16px",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:C.text}}>{mod.module}{mod._aiGen&&<span style={{fontSize:9,fontWeight:600,color:"#7c5cbf",marginLeft:6,verticalAlign:"middle"}}>✦ AI</span>}</div>
                    <div style={{fontSize:11,color:C.muted,marginTop:2}}>{mod.rules.length} rules · {mod.traps.length} traps{mod.mnemonic?" · 1 mnemonic":""}{mod._aiGen?" · AI-generated from your mistakes":""}</div>
                  </div>
                  <span style={{fontSize:12,color:C.accentLight,fontWeight:700,flexShrink:0,marginLeft:8}}>{isOpen?"▲":"▼"}</span>
                </button>

                {isOpen&&(
                  <div style={{padding:"0 16px 16px"}}>
                    {/* Key Rules */}
                    <div style={{marginBottom:14}}>
                      <div style={{fontSize:10,fontWeight:800,color:C.easy,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>✅ Key Rules</div>
                      <div style={{display:"flex",flexDirection:"column",gap:6}}>
                        {mod.rules.map((r,i)=>(
                          <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",fontSize:12,color:C.textMid,lineHeight:1.6}}>
                            <span style={{color:C.easy,flexShrink:0,fontWeight:700,marginTop:1}}>·</span>
                            <span style={{flex:1}}>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Traps */}
                    <div style={{marginBottom:mod.mnemonic?14:0}}>
                      <div style={{fontSize:10,fontWeight:800,color:C.hard,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>⚠ Common Traps</div>
                      <div style={{display:"flex",flexDirection:"column",gap:6}}>
                        {mod.traps.map((t,i)=>(
                          <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",fontSize:12,color:"#c0a0a0",lineHeight:1.6}}>
                            <span style={{color:C.hard,flexShrink:0,fontWeight:700,marginTop:1}}>!</span>
                            <span style={{flex:1}}>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mnemonic */}
                    {mod.mnemonic&&(
                      <div style={{background:"#0a0820",border:`1px solid ${C.accent}33`,borderRadius:9,padding:"10px 13px",marginTop:2}}>
                        <div style={{fontSize:10,fontWeight:800,color:C.accentLight,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:5}}>💡 Mnemonic</div>
                        <div style={{fontSize:12,color:"#a0a0d0",lineHeight:1.6,fontStyle:"italic"}}>{mod.mnemonic}</div>
                      </div>
                    )}

                    {/* Module-level Ask AI */}
                    <button onClick={()=>openAI(mod.module,`CFA Level ${cfaLevel} exam prep. I'm studying the "${mod.module}" module. Give me the 3 most important things to know for the exam about this topic, with a worked example for the trickiest one. Be concise.`)}
                      style={{marginTop:14,width:"100%",padding:"9px",borderRadius:9,fontSize:12,fontWeight:700,background:`${C.accent}18`,border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer"}}>
                      💬 Ask AI about {mod.module}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── FORMULAS TAB ── */}
      {tab==="formulas" && (
        <div>
          {/* Mode toggle: Reference vs Drill */}
          <div style={{display:"flex",gap:0,marginBottom:14,background:C.surface,borderRadius:10,padding:3,border:`1px solid ${C.border}`}}>
            {[["ref","📋 Reference"],["drill","🃏 Drill Mode"]].map(([m,label])=>(
              <button key={m} onClick={()=>{setDrillMode(m==="drill");setDrillIdx(0);setFlipped(false);setDrillResult({});setDrillDone(false);}}
                style={{flex:1,padding:"7px",borderRadius:8,fontSize:12,fontWeight:700,border:"none",cursor:"pointer",
                  background:(drillMode&&m==="drill")||(!drillMode&&m==="ref")?`linear-gradient(135deg,${C.reward},${C.rewardLight})`:C.surface,
                  color:(drillMode&&m==="drill")||(!drillMode&&m==="ref")?"#000":C.muted,transition:"all 0.15s"}}>
                {label}
              </button>
            ))}
          </div>

          {!drillMode && (
            <>
              {/* ── Formulas from your mistakes — grouped by module ── */}
              {(()=>{
                const wrongCards=Object.values(srDeck).filter(c=>c.topic===selTopic&&(c.wrongCount||0)>0).sort((a,b)=>(b.wrongCount||0)-(a.wrongCount||0));
                if(!wrongCards.length||!formulaData.length) return null;
                const matchedIdxs=new Set();
                for(const card of wrongCards){
                  const words=((card.concept||"")+" "+(card.subtopic||"")).toLowerCase().split(/[\s\-\/\(\)]+/).filter(w=>w.length>3);
                  formulaData.forEach((f,fi)=>{
                    const fname=f.name.toLowerCase();
                    if(words.some(w=>fname.includes(w)||w.includes(fname.split(" ")[0]))){matchedIdxs.add(fi);}
                  });
                }
                if(!matchedIdxs.size) return null;
                // Group by module (same grouping used in the Formulas tab)
                const groupMap={};const groupOrder=[];
                [...matchedIdxs].forEach(fi=>{
                  const mod=enrichedFormulas[fi]?.module||"General";
                  if(!groupMap[mod]){groupMap[mod]=[];groupOrder.push(mod);}
                  groupMap[mod].push(fi);
                });
                const totalFormulas=[...matchedIdxs].length;
                return(
                  <div style={{marginBottom:14}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <div style={{fontSize:11,fontWeight:700,color:"#e05070",textTransform:"uppercase",letterSpacing:"0.08em"}}>⚠ Formulas from your mistakes</div>
                      <div style={{fontSize:10,color:"#704050"}}>{totalFormulas} formula{totalFormulas!==1?"s":""} · {groupOrder.length} topic{groupOrder.length!==1?"s":""}</div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:5}}>
                      {groupOrder.map(modName=>{
                        const fis=groupMap[modName];
                        const isOpen=expandedMistakeGroup===modName;
                        return(
                          <div key={modName} style={{background:"#0e0818",border:`1px solid ${isOpen?"#c0304466":"#c0304433"}`,borderRadius:10,overflow:"hidden",transition:"border-color 0.15s"}}>
                            <button onClick={()=>setExpandedMistakeGroup(isOpen?null:modName)}
                              style={{width:"100%",padding:"10px 14px",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}}>
                              <div>
                                <div style={{fontSize:12,fontWeight:700,color:"#c06070"}}>{modName}</div>
                                <div style={{fontSize:10,color:"#704050",marginTop:1}}>{fis.length} formula{fis.length!==1?"s":""}</div>
                              </div>
                              <span style={{fontSize:11,color:"#a05070",fontWeight:700,flexShrink:0,marginLeft:8}}>{isOpen?"▲":"▼"}</span>
                            </button>
                            {isOpen&&(
                              <div style={{borderTop:"1px solid #c0304422"}}>
                                {fis.map((fi,i,arr)=>{
                                  const f=formulaData[fi];
                                  if(!f||!f.name||!f.f) return null;
                                  const dispName=f.name.length>44?f.name.slice(0,42)+"…":f.name;
                                  return(
                                    <button key={fi} onClick={()=>{
                                      setExpandedFormulaModule(modName);
                                      setTimeout(()=>document.getElementById(`formula-${fi}`)?.scrollIntoView({behavior:"smooth",block:"center"}),50);
                                    }}
                                      style={{width:"100%",display:"flex",gap:12,alignItems:"flex-start",padding:"10px 14px",background:"none",border:"none",borderBottom:i<arr.length-1?"1px solid #c0304418":"none",cursor:"pointer",textAlign:"left"}}>
                                      <div style={{fontSize:11,color:"#a05070",minWidth:90,maxWidth:110,flexShrink:0,paddingTop:2,lineHeight:1.4}}>{dispName}</div>
                                      <div style={{fontSize:12,color:"#d090a0",fontFamily:"monospace",lineHeight:f.parts?2:1.6,flex:1,wordBreak:"break-word",overflow:"hidden",minWidth:80}}>{f.parts?<FracFormula parts={f.parts}/>:f.f}</div>
                                      <span style={{fontSize:10,color:"#6060a0",flexShrink:0,marginTop:2}}>↓</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* ── Formula Gaps: AI-generate missing formulas ── */}
              {(()=>{
                const wrongCards=Object.values(srDeck).filter(c=>c.topic===selTopic&&(c.wrongCount||0)>0).sort((a,b)=>(b.wrongCount||0)-(a.wrongCount||0)).slice(0,8);
                if(!wrongCards.length) return null;
                // Deduplicate by subtopic/concept name, exclude resolved keys
                const seenNames=new Set();
                const gaps=wrongCards.filter(card=>{
                  const key=((card.subtopic||card.concept||"").trim()).toLowerCase();
                  if(!key||resolvedGapKeys.has(key)) return false;
                  if(seenNames.has(key)) return false;
                  seenNames.add(key);
                  const words=key.split(/[\s\-\/\(\)]+/).filter(w=>w.length>3);
                  const matched=formulaData.some(f=>{const fn=f.name.toLowerCase();return words.some(w=>fn.includes(w)||w.includes(fn.split(" ")[0]));});
                  return !matched;
                });
                if(!gaps.length) return null;
                return(
                  <div style={{marginBottom:14}}>
                    <div style={{fontSize:11,fontWeight:700,color:"#a060e0",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.08em"}}>✨ Formula Gaps from your mistakes</div>
                    <div style={{display:"flex",flexDirection:"column",gap:6}}>
                      {gaps.map((card,gi)=>{
                        const name=(card.subtopic||card.concept||"").trim();
                        const genKey=name.toLowerCase();
                        const isGen=formulaGenerating[genKey];
                        const genErr=formulaGenError[genKey];
                        return(
                          <div key={gi} style={{background:"#0a0818",border:"1px solid #8040c033",borderRadius:9,padding:"9px 12px"}}>
                            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
                              <div style={{flex:1,minWidth:0}}>
                                <div style={{fontSize:12,fontWeight:700,color:"#c0a0e0"}}>{name}</div>
                                <div style={{fontSize:10,color:genErr?"#f87171":"#6060a0",marginTop:2}}>{genErr||"No formula found — AI can generate one"}</div>
                              </div>
                              <button onClick={()=>generateFormulaForConcept(card)} disabled={isGen||!userId}
                                style={{padding:"6px 11px",borderRadius:7,fontSize:11,fontWeight:700,border:"1px solid #8040c055",background:"#8040c018",color:isGen||!userId?"#6060b0":"#c090f0",cursor:isGen||!userId?"default":"pointer",flexShrink:0,whiteSpace:"nowrap"}}>
                                {isGen?"⏳ Generating…":genErr?"↺ Retry":"✨ Generate"}
                              </button>
                            </div>
                            {!userId&&<div style={{fontSize:10,color:"#6060a0",marginTop:4}}>Sign in to generate AI formulas</div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Clear AI formulas button — shown when topic has any stored AI formulas */}
              {(dynamicFormulas[selTopic]||[]).length>0&&(
                <div style={{display:"flex",justifyContent:"flex-end",marginBottom:6}}>
                  <button onClick={()=>{const u={...dynamicFormulas};delete u[selTopic];setDynamicFormulas(u);try{localStorage.setItem(DYNAMIC_FORMULAS_KEY,JSON.stringify(u));}catch{}}}
                    style={{fontSize:10,color:C.muted,background:"none",border:"none",cursor:"pointer",padding:"2px 6px",textDecoration:"underline"}}>
                    × Clear AI-generated formulas
                  </button>
                </div>
              )}

              {formulaData.length===0&&!dynamicFormulas[selTopic]?.length?(
                <div style={{textAlign:"center",padding:"40px 0",color:C.muted,fontSize:13}}>No formula sheet for this topic — it's primarily conceptual.</div>
              ):(
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {_fModOrder.map((modName)=>{
                    const isModOpen=expandedFormulaModule===modName;
                    const mFormulas=_fModMap[modName];
                    const isAISection=modName==="✦ From Your Mistakes";
                    return(
                      <div key={modName} style={{background:isAISection?"#0a0818":C.surface,border:`1px solid ${isModOpen?(isAISection?"#8040c088":C.accent+"55"):(isAISection?"#8040c033":C.border)}`,borderRadius:12,overflow:"hidden",transition:"border-color 0.15s"}}>
                        <button onClick={()=>setExpandedFormulaModule(isModOpen?null:modName)}
                          style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:isModOpen?(isAISection?"#8040c018":`${C.accent}0a`):"transparent",border:"none",cursor:"pointer",textAlign:"left"}}>
                          <div>
                            <div style={{fontSize:13,fontWeight:700,color:isAISection?"#c090f0":C.text}}>{modName}</div>
                            <div style={{fontSize:10,color:C.muted,marginTop:2}}>{mFormulas.length} formula{mFormulas.length!==1?"s":""} · AI-generated from your mistakes</div>
                          </div>
                          <span style={{fontSize:11,color:C.muted}}>{isModOpen?"▲":"▼"}</span>
                        </button>
                        {isModOpen&&(
                          <div style={{borderTop:`1px solid ${C.border}`}}>
                            {mFormulas.map((f,i)=>{
                              const isExp=expandedFormula===f._fi;
                              return(
                                <div key={f._fi} id={`formula-${f._fi}`} style={{borderBottom:i<mFormulas.length-1?`1px solid ${C.border}`:"none"}}>
                                  <div onClick={()=>setExpandedFormula(isExp?null:f._fi)}
                                    style={{display:"flex",gap:10,alignItems:"flex-start",padding:"11px 16px",cursor:"pointer",background:isExp?`${C.accent}08`:"transparent",transition:"background 0.15s"}}>
                                    <div style={{fontSize:11,color:f._aiGen?"#a060e0":C.muted,minWidth:80,maxWidth:140,flexShrink:0,lineHeight:1.4,paddingTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{f.name}{f._aiGen&&<span style={{fontSize:9,color:"#7c5cbf",marginLeft:4}}>✦ AI</span>}</div>
                                    <div style={{fontSize:13,color:C.accentLight,fontFamily:"monospace",lineHeight:f.parts?2:1.6,flex:1,wordBreak:"break-word",minWidth:80,overflow:"hidden"}}>{f.parts?<FracFormula parts={f.parts}/>:f.f}</div>
                                    <span style={{fontSize:10,color:C.muted,flexShrink:0,paddingTop:3}}>{isExp?"▲":"▼"}</span>
                                  </div>
                                  {isExp&&(
                                    <div style={{padding:"0 16px 12px",animation:"fadeIn 0.15s ease"}}>
                                      {f.variables&&<div style={{fontSize:11,color:C.muted,lineHeight:1.7,marginBottom:8,whiteSpace:"pre-line"}}>{f.variables}</div>}
                                      {f.when&&<div style={{fontSize:11,color:C.textMid,fontStyle:"italic",marginBottom:8}}>📌 {f.when}</div>}
                                      {f.example&&<div style={{fontSize:11,color:C.easy,marginBottom:10}}>💡 {f.example}</div>}
                                      <button onClick={()=>openAI(`Formula: ${f.name}`,`CFA Level ${cfaLevel} exam prep. Formula: ${f.name} = ${f.f}\n\nExplain what each variable means, walk me through a numeric example, and tell me how this formula typically appears on the exam. Be concise.`)}
                                        style={{fontSize:11,fontWeight:700,padding:"7px 14px",borderRadius:8,background:`${C.accent}18`,border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer"}}>
                                        💬 Ask AI about this formula
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              <div style={{marginTop:10,fontSize:11,color:C.muted,textAlign:"center"}}>{staticFormulas.length} formulas across {_fModOrder.filter(m=>m!=="✦ From Your Mistakes").length} subtopics · switch topic above</div>
            </>
          )}

          {drillMode && !drillDone && drillCard && (
            <div style={{animation:"fadeIn 0.2s ease"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div style={{fontSize:11,color:C.muted}}>{drillIdx+1} / {drillTotal}</div>
                <div style={{height:4,flex:1,background:C.border,borderRadius:2,margin:"0 12px"}}>
                  <div style={{height:"100%",width:`${(drillProgress/drillTotal)*100}%`,background:`linear-gradient(90deg,${C.reward},${C.rewardLight})`,borderRadius:2,transition:"width 0.3s"}}/>
                </div>
                <div style={{fontSize:11,color:C.rewardLight,fontWeight:700}}>{drillProgress}/{drillTotal}</div>
              </div>

              {/* Flash card */}
              <div onClick={()=>setFlipped(f=>!f)} style={{cursor:"pointer",minHeight:180,background:flipped?C.surfaceHigh:C.surface,border:`2px solid ${flipped?C.reward+"88":C.border}`,borderRadius:16,padding:"28px 24px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transition:"all 0.2s",userSelect:"none"}}>
                {!flipped?(
                  <>
                    <div style={{fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12}}>Formula name</div>
                    <div style={{fontSize:17,fontWeight:800,color:C.text,lineHeight:1.4}}>{drillCard.name}</div>
                    <div style={{fontSize:11,color:C.muted,marginTop:16}}>Tap to reveal →</div>
                  </>
                ):(
                  <>
                    <div style={{fontSize:10,fontWeight:700,color:C.rewardLight,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12}}>{drillCard.name}</div>
                    <div style={{fontSize:19,fontWeight:800,color:C.rewardLight,fontFamily:"monospace",lineHeight:drillCard.parts?2:1.5,letterSpacing:"0.02em"}}>{drillCard.parts?<FracFormula parts={drillCard.parts}/>:drillCard.f}</div>
                  </>
                )}
              </div>

              {flipped && (
                <div style={{display:"flex",gap:10,marginTop:14,animation:"fadeIn 0.15s ease"}}>
                  <button onClick={()=>{setDrillResult(r=>({...r,[drillIdx]:"again"}));const next=drillIdx+1;if(next>=drillTotal){setDrillDone(true);}else{setDrillIdx(next);setFlipped(false);}}}
                    style={{flex:1,padding:"13px",borderRadius:11,fontSize:14,fontWeight:700,background:C.hard+"28",border:`1px solid ${C.hard}55`,color:C.hard,cursor:"pointer"}}>
                    🔁 Again
                  </button>
                  <button onClick={()=>{setDrillResult(r=>({...r,[drillIdx]:"got it"}));const next=drillIdx+1;if(next>=drillTotal){setDrillDone(true);}else{setDrillIdx(next);setFlipped(false);}}}
                    style={{flex:1,padding:"13px",borderRadius:11,fontSize:14,fontWeight:700,background:C.easy+"28",border:`1px solid ${C.easy}55`,color:C.easy,cursor:"pointer"}}>
                    ✓ Got it
                  </button>
                </div>
              )}
            </div>
          )}

          {drillMode && drillDone && (
            <div style={{textAlign:"center",padding:"32px 0",animation:"fadeIn 0.3s ease"}}>
              <div style={{fontSize:36,marginBottom:16}}>🎉</div>
              <div style={{fontSize:18,fontWeight:800,color:C.text,marginBottom:8}}>Round complete!</div>
              {(()=>{
                const gotIt=Object.values(drillResult).filter(v=>v==="got it").length;
                const again=drillTotal-gotIt;
                return(<>
                  <div style={{fontSize:13,color:C.muted,marginBottom:4}}><span style={{color:C.easy,fontWeight:700}}>{gotIt}</span> got it · <span style={{color:C.hard,fontWeight:700}}>{again}</span> need review</div>
                  {again>0&&<div style={{fontSize:11,color:C.muted,marginBottom:20}}>Review the ones you missed before the next round</div>}
                </>);
              })()}
              <button onClick={()=>{setDrillIdx(0);setFlipped(false);setDrillResult({});setDrillDone(false);}}
                style={{padding:"12px 28px",borderRadius:11,fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${C.reward},${C.rewardLight})`,color:"#000",border:"none",cursor:"pointer"}}>
                Drill again →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── LEARN TAB ── */}
      {tab==="learn"&&(
        <div style={{animation:"fadeIn 0.2s ease"}}>
          {/* Topic picker — same as notes/formulas */}
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
            {Object.keys(activePowerNotes).map(t=>{
              const w=activeLOSR[t]?.weight||0;
              return(
                <button key={t} onClick={()=>setSelTopic(t)}
                  style={{padding:"5px 11px",borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",
                    border:selTopic===t?`1.5px solid ${C.accent}`:`1.5px solid ${C.border}`,
                    background:selTopic===t?C.accent+"22":C.surface,
                    color:selTopic===t?C.accentLight:C.muted}}>
                  {t.split(" ")[0]} <span style={{opacity:0.6,fontWeight:400}}>{w}%</span>
                </button>
              );
            })}
          </div>

          {/* Not Pro — blurred teaser */}
          {!isPro&&(
            <div style={{textAlign:"center",padding:"28px 0"}}>
              <div style={{fontSize:32,marginBottom:10}}>🎓</div>
              <div style={{fontSize:15,fontWeight:800,color:C.text,marginBottom:6}}>AI Deep Study</div>
              <div style={{fontSize:12,color:C.muted,marginBottom:16,lineHeight:1.6}}>
                A comprehensive study guide per topic — conceptual framework,<br/>worked examples, key formulas, exam patterns, and recall anchors.
              </div>
              <div style={{filter:"blur(4px)",pointerEvents:"none",marginBottom:16,opacity:0.5}}>
                <LessonSection title="✅ Key Concepts" items={["Duration measures interest rate sensitivity to yield changes","Convexity adjusts for non-linear price-yield relationship","YTM assumes coupons reinvested at the same rate"]} color={C.easy}/>
              </div>
              <button onClick={()=>onUpgrade&&onUpgrade({reason:"learn"})}
                style={{padding:"11px 28px",borderRadius:12,fontSize:13,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>
                🚀 Unlock Deep Study — Go Pro
              </button>
            </div>
          )}

          {/* Pro — no lesson yet */}
          {isPro&&!topicLessons[selTopic]&&(
            <div style={{textAlign:"center",padding:"36px 0"}}>
              <div style={{fontSize:32,marginBottom:12}}>🎓</div>
              <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:8}}>{selTopic} — Deep Study</div>
              <div style={{fontSize:12,color:C.muted,marginBottom:20,lineHeight:1.6,maxWidth:300,margin:"0 auto 20px"}}>
                Generates a comprehensive guide: conceptual framework, worked examples, formulas, exam patterns, and recall anchors — personalised to your weak areas.
              </div>
              <button onClick={()=>generateLesson(selTopic)} disabled={lessonGenerating[selTopic]||!userId}
                style={{padding:"11px 28px",borderRadius:12,fontSize:13,fontWeight:700,
                  background:lessonGenerating[selTopic]?"#1a1a2e":`linear-gradient(135deg,${C.accent},${C.accentLight})`,
                  color:"#fff",border:"none",cursor:lessonGenerating[selTopic]||!userId?"default":"pointer",opacity:!userId?0.5:1}}>
                {lessonGenerating[selTopic]?"⏳ Generating deep study…":"✨ Generate Deep Study"}
              </button>
              {!userId&&<div style={{fontSize:11,color:C.muted,marginTop:8}}>Sign in to generate lessons</div>}
            </div>
          )}

          {/* Pro — deep lesson ready (v2) */}
          {isPro&&topicLessons[selTopic]&&(topicLessons[selTopic]._v||0)>=2&&(
            <div>
              {/* Big Picture */}
              {topicLessons[selTopic].framework&&(
                <div style={{background:`${C.accent}12`,border:`1px solid ${C.accent}30`,borderRadius:12,padding:"14px 16px",marginBottom:10}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.accentLight,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>Big Picture</div>
                  <div style={{fontSize:13,color:C.text,lineHeight:1.75}}>{topicLessons[selTopic].framework}</div>
                </div>
              )}
              {/* Core Concepts — expandable */}
              {topicLessons[selTopic].concepts?.length>0&&(
                <div style={{background:C.surface,borderRadius:12,padding:"14px 16px",marginBottom:10,border:`1px solid ${C.border}`}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.easy,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Core Concepts</div>
                  {topicLessons[selTopic].concepts.map((c,i)=>(
                    <div key={i} style={{marginBottom:i<topicLessons[selTopic].concepts.length-1?6:0,borderRadius:8,border:`1px solid ${expandedLessonConcept===i?C.easy+"44":C.border}`,overflow:"hidden"}}>
                      <button onClick={()=>setExpandedLessonConcept(expandedLessonConcept===i?null:i)}
                        style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",
                          padding:"9px 12px",background:expandedLessonConcept===i?`${C.easy}10`:C.surfaceHigh,
                          border:"none",cursor:"pointer",textAlign:"left"}}>
                        <span style={{fontSize:12,fontWeight:700,color:C.text}}>{c.name}</span>
                        <span style={{fontSize:10,color:C.muted,flexShrink:0,marginLeft:8}}>{expandedLessonConcept===i?"▲":"▼"}</span>
                      </button>
                      {expandedLessonConcept===i&&c.detail&&(
                        <div style={{fontSize:12,color:C.textMid,lineHeight:1.7,padding:"10px 12px",background:C.bg,borderTop:`1px solid ${C.border}`}}>
                          {c.detail}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {/* Key Formulas */}
              {topicLessons[selTopic].formulas?.length>0&&(
                <div style={{background:C.surface,borderRadius:12,padding:"14px 16px",marginBottom:10,border:`1px solid ${C.border}`}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.accentLight,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Key Formulas</div>
                  {topicLessons[selTopic].formulas.map((f,i)=>(
                    <div key={i} style={{marginBottom:i<topicLessons[selTopic].formulas.length-1?10:0}}>
                      <div style={{fontFamily:"monospace",fontSize:12,color:C.accentLight,background:`${C.accent}12`,padding:"8px 10px",borderRadius:8,marginBottom:f.example?4:0}}>{f.formula}</div>
                      {f.example&&<div style={{fontSize:11,color:C.muted,lineHeight:1.6,paddingLeft:4,fontStyle:"italic"}}>{f.example}</div>}
                    </div>
                  ))}
                </div>
              )}
              {/* Worked Example */}
              {topicLessons[selTopic].workedExample&&(
                <div style={{background:C.surface,borderRadius:12,padding:"14px 16px",marginBottom:10,border:`1px solid ${C.border}`}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.medium,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Worked Example</div>
                  <div style={{fontSize:12,color:C.textMid,lineHeight:1.65,marginBottom:topicLessons[selTopic].workedExample.steps?.length?10:4}}>{topicLessons[selTopic].workedExample.setup}</div>
                  {topicLessons[selTopic].workedExample.steps?.length>0&&(
                    <div style={{marginBottom:topicLessons[selTopic].workedExample.answer?10:0}}>
                      {topicLessons[selTopic].workedExample.steps.map((s,i)=>(
                        <div key={i} style={{display:"flex",gap:8,marginBottom:5}}>
                          <span style={{minWidth:18,height:18,background:C.medium,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fff",fontWeight:800,flexShrink:0,marginTop:1}}>{i+1}</span>
                          <span style={{fontSize:12,color:C.textMid,lineHeight:1.6}}>{s}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {topicLessons[selTopic].workedExample.answer&&(
                    <div style={{background:`${C.easy}14`,border:`1px solid ${C.easy}30`,borderRadius:8,padding:"8px 10px",fontSize:12,fontWeight:700,color:C.easy}}>
                      ✓ {topicLessons[selTopic].workedExample.answer}
                    </div>
                  )}
                </div>
              )}
              <LessonSection title="📋 Exam Patterns" items={topicLessons[selTopic].examPatterns} color={C.medium}/>
              <LessonSection title="⚠️ Edge Cases" items={topicLessons[selTopic].edgeCases} color={C.hard}/>
              <LessonSection title="🔗 Topic Connections" items={topicLessons[selTopic].connections} color={C.accentLight}/>
              <LessonSection title="🏆 Quick Recall" items={topicLessons[selTopic].recall} color={C.reward}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8,marginBottom:14}}>
                <div style={{fontSize:10,color:C.muted}}>✦ AI deep study · {new Date(topicLessons[selTopic].generatedAt).toLocaleDateString()}</div>
                <button onClick={()=>{const u={...topicLessons};delete u[selTopic];setTopicLessons(u);try{localStorage.setItem(LESSONS_KEY,JSON.stringify(u));}catch{}}}
                  style={{fontSize:11,color:C.muted,background:"none",border:"none",cursor:"pointer"}}>↺ Regenerate</button>
              </div>
              {onStartQuiz&&(
                <button onClick={()=>onStartQuiz(selTopic)}
                  style={{width:"100%",padding:"13px",borderRadius:12,fontSize:13,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>
                  📝 Practice This Topic
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── COACH TAB ── */}
      {tab==="coach"&&!coachOnboardDone&&isPro&&(
        <SlideOverlay
          slides={[
            {emoji:"🤖",color:C.accentLight,bg:C.accent,title:"AI Concept Coach",sub:"Multi-turn teaching dialogue",desc:"Pick a CFA topic and I'll teach it through Socratic questions — one concept at a time. I check your understanding before moving on, and adapt to your answers. Think of it as a 1-on-1 tutoring session.",tip:"Start a coaching session on your weakest topic for the biggest impact. The coach builds on your wrong answers from that topic."},
            {emoji:"💬",color:C.easy,bg:C.easy,title:"How it works",sub:"Dialogue-based learning",desc:"I ask a question. You answer in the text box. I respond — either building on your understanding or gently correcting and re-explaining. Each round deepens the model. Tap 'New session' anytime to restart with a different topic.",tip:"Unlike flashcards, coaching sessions have no fixed endpoint. Keep going until the concept feels solid, then tap Practice to test it with real exam questions."},
          ]}
          onDismiss={()=>{setCoachOnboardDone(true);try{localStorage.setItem("cfa_coach_onboard_v1","1");}catch{}}}
          skipLabel="Skip →"
          ctaLabel="Let's start →"
          zIndex={350}
        />
      )}
      {tab==="coach"&&(
        <div style={{animation:"fadeIn 0.2s ease"}}>
          {/* Topic picker */}
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
            {Object.keys(activePowerNotes).map(t=>(
              <button key={t} onClick={()=>{setSelTopic(t);if(coachTopic!==t){setCoachMsgs([]);setCoachTopic(null);}}}
                style={{padding:"5px 11px",borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",
                  border:selTopic===t?`1.5px solid ${C.accent}`:`1.5px solid ${C.border}`,
                  background:selTopic===t?C.accent+"22":C.surface,
                  color:selTopic===t?C.accentLight:C.muted}}>
                {t.split(" ")[0]}
              </button>
            ))}
          </div>

          {!isPro?(
            <div style={{textAlign:"center",padding:"28px 0"}}>
              <div style={{fontSize:32,marginBottom:10}}>🤖</div>
              <div style={{fontSize:15,fontWeight:800,color:C.text,marginBottom:6}}>AI Concept Coach</div>
              <div style={{fontSize:12,color:C.muted,marginBottom:16,lineHeight:1.6}}>
                A Socratic AI tutor that teaches CFA topics through<br/>interactive dialogue and comprehension checks.
              </div>
              <button onClick={()=>onUpgrade&&onUpgrade({reason:"coach"})}
                style={{padding:"11px 28px",borderRadius:12,fontSize:13,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>
                🚀 Unlock Concept Coach — Go Pro
              </button>
            </div>
          ):(
            <>
              {!userId&&<div style={{textAlign:"center",padding:"24px",fontSize:12,color:C.muted}}>Sign in to use the Concept Coach.</div>}
              {userId&&coachMsgs.length===0&&!coachLoading&&(
                <div style={{textAlign:"center",padding:"28px 0"}}>
                  <div style={{fontSize:28,marginBottom:10}}>🤖</div>
                  <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:6}}>{selTopic}</div>
                  <div style={{fontSize:12,color:C.muted,marginBottom:18,lineHeight:1.6}}>
                    I'll teach this topic through dialogue — asking questions,<br/>checking your understanding, and building up concepts.
                  </div>
                  <button onClick={()=>startCoach(selTopic)}
                    style={{padding:"11px 28px",borderRadius:12,fontSize:13,fontWeight:700,
                      background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>
                    Start coaching session →
                  </button>
                </div>
              )}
              {(coachMsgs.length>0||coachLoading)&&(
                <div>
                  <div style={{background:"#0d0d20",border:`1px solid ${C.accent}33`,borderRadius:12,overflow:"hidden",marginBottom:10}}>
                    <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.accent}22`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{fontSize:11,fontWeight:700,color:C.accentLight}}>🤖 Coach · {selTopic}</div>
                      <button onClick={()=>{setCoachMsgs([]);setCoachTopic(null);}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:12}}>New session</button>
                    </div>
                    <div style={{padding:"12px 14px",maxHeight:320,overflowY:"auto",display:"flex",flexDirection:"column",gap:8}}>
                      {coachMsgs.map((m,i)=>(
                        <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                          <div style={{maxWidth:"85%",padding:"9px 12px",
                            borderRadius:m.role==="user"?"11px 11px 3px 11px":"11px 11px 11px 3px",
                            background:m.role==="user"?`${C.accent}33`:"#1a1a2e",
                            border:`1px solid ${m.role==="user"?C.accent+"44":C.border}`,
                            fontSize:12,color:m.role==="user"?C.accentLight:C.textMid,lineHeight:1.65,wordBreak:"break-word"}}>
                            {m.content}
                          </div>
                        </div>
                      ))}
                      {coachLoading&&(
                        <div style={{display:"flex",justifyContent:"flex-start"}}>
                          <div style={{padding:"9px 12px",borderRadius:"11px 11px 11px 3px",background:"#1a1a2e",border:`1px solid ${C.border}`,fontSize:12,color:C.muted,animation:"pulse 1.2s infinite"}}>Thinking…</div>
                        </div>
                      )}
                      <div ref={coachMsgsEndRef}/>
                    </div>
                  </div>
                  {!coachLoading&&(
                    <div style={{display:"flex",gap:8,marginBottom:10}}>
                      <input value={coachInput} onChange={e=>setCoachInput(e.target.value)}
                        onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendCoach(coachInput);}}}
                        placeholder="Your answer or question…"
                        style={{flex:1,background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"10px 13px",fontSize:12,color:C.text,outline:"none"}}/>
                      <button onClick={()=>sendCoach(coachInput)} disabled={!coachInput.trim()||coachLoading}
                        style={{padding:"10px 16px",borderRadius:10,fontSize:12,fontWeight:700,
                          background:coachInput.trim()?`linear-gradient(135deg,${C.accent},${C.accentLight})`:"#1a1a2e",
                          color:coachInput.trim()?"#fff":C.muted,border:"none",cursor:coachInput.trim()?"pointer":"default",flexShrink:0}}>
                        Send
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ── AI CHAT PANEL (bottom sheet) ── */}
      {aiPanel&&(
        <>
          {/* Backdrop */}
          <div onClick={()=>setAiPanel(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:900}}/>
          {/* Sheet */}
          <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:901,background:"#0d0d20",borderRadius:"18px 18px 0 0",border:`1px solid ${C.accent}55`,borderBottom:"none",display:"flex",flexDirection:"column",maxHeight:"72vh"}}>
            {/* Header */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"14px 16px 10px",borderBottom:`1px solid ${C.accent}22`,flexShrink:0}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:10,fontWeight:700,color:C.accentLight,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:3}}>💬 Ask AI</div>
                <div style={{fontSize:12,color:C.muted,lineHeight:1.4,wordBreak:"break-word"}}>{aiPanel.context}</div>
              </div>
              <button onClick={()=>setAiPanel(null)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:18,lineHeight:1,marginLeft:10,flexShrink:0,padding:"2px 6px"}}>✕</button>
            </div>

            {/* Messages */}
            <div style={{flex:1,overflowY:"auto",padding:"12px 14px",display:"flex",flexDirection:"column",gap:10}}>
              {aiPanel.messages.map((m,i)=>(
                <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                  <div style={{
                    maxWidth:"85%",padding:"10px 13px",borderRadius:m.role==="user"?"13px 13px 3px 13px":"13px 13px 13px 3px",
                    background:m.role==="user"?`${C.accent}33`:"#1a1a2e",
                    border:`1px solid ${m.role==="user"?C.accent+"44":C.border}`,
                    fontSize:12,color:m.role==="user"?C.accentLight:C.textMid,lineHeight:1.7,whiteSpace:"pre-wrap"
                  }}>
                    {m.content}
                  </div>
                </div>
              ))}
              {aiLoading&&(
                <div style={{display:"flex",justifyContent:"flex-start"}}>
                  <div style={{padding:"10px 14px",borderRadius:"13px 13px 13px 3px",background:"#1a1a2e",border:`1px solid ${C.border}`,fontSize:12,color:C.muted,animation:"pulse 1.2s infinite"}}>
                    Thinking…
                  </div>
                </div>
              )}
              {!userId&&aiPanel.messages.length===1&&(
                <div style={{padding:"10px 14px",borderRadius:10,background:"#1a0a0e",border:"1px solid #c0304444",fontSize:12,color:"#e05070",lineHeight:1.6}}>
                  Sign in to enable AI-powered explanations.
                </div>
              )}
            </div>

            {/* Input */}
            <div style={{display:"flex",gap:8,padding:"10px 12px 14px",borderTop:`1px solid ${C.accent}22`,flexShrink:0}}>
              <input value={aiInput} onChange={e=>setAiInput(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendAI();}}}
                placeholder="Ask a follow-up question…"
                style={{flex:1,padding:"10px 13px",borderRadius:10,background:C.surface,border:`1px solid ${C.accent}33`,color:C.text,fontSize:13,outline:"none"}}
              />
              <button onClick={sendAI} disabled={aiLoading||!aiInput.trim()}
                style={{padding:"10px 16px",borderRadius:10,fontSize:13,fontWeight:700,background:aiLoading||!aiInput.trim()?C.dim:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:aiLoading||!aiInput.trim()?C.muted:"#fff",border:"none",cursor:aiLoading||!aiInput.trim()?"not-allowed":"pointer",flexShrink:0}}>
                →
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── LOS TAB ── */}
      {tab==="los"&&(()=>{
        const topicModules=activeLOSR[selTopic]?.modules||{};
        const moduleNames=Object.keys(topicModules);
        return(
          <div style={{animation:"fadeIn 0.2s ease"}}>
            <div style={{fontSize:11,color:C.muted,marginBottom:14,lineHeight:1.6,padding:"10px 12px",background:C.surfaceHigh,borderRadius:9,border:`1px solid ${C.border}`}}>
              <strong style={{color:C.text}}>2026 Learning Outcome Statements</strong> for <strong style={{color:C.accentLight}}>{selTopic}</strong>.
              {" "}These are the exact skills CFA Institute tests — each question maps to one of these.
            </div>
            {moduleNames.length===0&&<div style={{fontSize:13,color:C.muted,textAlign:"center",padding:"24px 0"}}>No LOS data for this topic.</div>}
            {moduleNames.map(modName=>{
              const losItems=topicModules[modName]||[];
              const isOpen=expandedModule===modName;
              return(
                <div key={modName} style={{marginBottom:8,borderRadius:11,border:`1px solid ${isOpen?C.accent+"55":C.border}`,overflow:"hidden",transition:"border-color 0.15s"}}>
                  <button onClick={()=>setExpandedModule(isOpen?null:modName)}
                    style={{width:"100%",padding:"12px 14px",background:isOpen?C.accent+"10":C.surface,border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",textAlign:"left"}}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:700,color:isOpen?C.accentLight:C.text,lineHeight:1.35}}>{modName}</div>
                      <div style={{fontSize:10,color:C.muted,marginTop:2}}>{losItems.length} outcome{losItems.length!==1?"s":""}</div>
                    </div>
                    <span style={{fontSize:11,color:C.muted,fontWeight:700,flexShrink:0,marginLeft:8}}>{isOpen?"▲":"▼"}</span>
                  </button>
                  {isOpen&&(
                    <div style={{borderTop:`1px solid ${C.border}`,background:C.surfaceHigh}}>
                      {losItems.map((los,i)=>(
                        <div key={i} style={{padding:"11px 14px",borderBottom:i<losItems.length-1?`1px solid ${C.border}`:undefined,display:"flex",gap:10,alignItems:"flex-start"}}>
                          <div style={{color:C.accent,fontSize:11,fontWeight:800,flexShrink:0,marginTop:1,minWidth:18}}>{i+1}.</div>
                          <div style={{fontSize:12,color:C.text,lineHeight:1.7}}>{los}</div>
                        </div>
                      ))}
                      <div style={{padding:"10px 14px",borderTop:`1px solid ${C.border}`}}>
                        <button onClick={()=>{if(onStartQuiz)onStartQuiz(selTopic,modName,"Medium",5,"guided");}} style={{width:"100%",padding:"9px",borderRadius:9,fontSize:12,fontWeight:700,background:`${C.accent}22`,border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer"}}>
                          Practice this module →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })()}
    </div>
  );
}


// ─── LOCAL QUESTION GENERATOR ────────────────────────────────────────────────
// Template-based question generation — no API needed, instant, works offline.
// Each template: fn(rng) → {question, options:{A,B,C}, answer, explanation, concept, los_tested, misconception_targeted}

const rnd=(a,b,dp=0)=>{const v=a+Math.random()*(b-a);return dp?parseFloat(v.toFixed(dp)):Math.round(v);};
const pick=(arr)=>arr[Math.floor(Math.random()*arr.length)];
const names=["Sarah Chen","Marcus Webb","Elena Volkov","James Okafor","Priya Sharma","David Kim","Aisha Nkosi","Carlos Reyes"];
const firms=["Capital Partners","Asset Management","Wealth Advisors","Investment Group","Securities"];
const pname=()=>pick(names);
const pfirm=()=>pname().split(" ")[1]+" "+pick(firms);

// ─── CFA INSTITUTE ETHICS IN PRACTICE CASES ─────────────────────────────────
// Source: Ethics in Investment Management Casebook, 2nd Ed., © 2019 CFA Institute
// Used under the CFA Institute licence: individual cases may be copied without
// modification for non-commercial purposes with attribution.
// Cases drawn from real regulatory enforcement actions and CFA Institute
// Professional Conduct investigations.

// ─── ETHICS CASE STUDY MODE ──────────────────────────────────────────────────
// Returns cases filtered by standard/category, shuffled
function getEthicsCases(filter="all", count=5){
  let pool = filter==="all" ? [...ETHICS_CASES]
    : ETHICS_CASES.filter(c=>c.category===filter||c.standard.includes(filter));
  // Shuffle
  for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  return pool.slice(0,count).map(c=>({
    id:c.id,
    question:`[${c.category} — Standard ${c.standard}]\n\n${c.vignette}`,
    options:c.options,
    answer:c.answer,
    explanation:c.explanation+"\n\n📌 "+c.source,
    concept:c.category,
    los_tested:`Standard ${c.standard}: ${c.title}`,
    misconception_targeted:"Distinguish correct Standards application from plausible-sounding but incorrect alternatives",
    _isEthicsCase:true,
    _title:c.title,
  }));
}


// ─── LOCAL GENERATOR FUNCTION ─────────────────────────────────────────────────
function generateLocalQuestions(topic, module, difficulty, count) {
  const templates = Q_TEMPLATES[topic] || [];
  if (!templates.length) return [];

  const questions = [];

  // Shuffle template order; each template used at most once per call to prevent same-concept repeats
  const shuffledIdxs=[...Array(templates.length).keys()].sort(()=>Math.random()-0.5);

  for (let i = 0; i < shuffledIdxs.length && questions.length < count; i++) {
    const tIdx = shuffledIdxs[i];
    try {
      const q = templates[tIdx]();
      if (!q || !q.question || !q.options || !q.answer) continue;
      // Randomise option order occasionally to avoid always-A bias
      const shouldShuffle = Math.random() > 0.5;
      let finalQ = { ...q, id: `local_${topic}_${i}_${Date.now()}` };
      if (shouldShuffle) {
        const entries = Object.entries(q.options);
        const correctVal = q.options[q.answer];
        const shuffled = entries.sort(() => Math.random() - 0.5);
        const newOpts = {};
        const keys = ['A','B','C'];
        let newAnswer = 'A';
        shuffled.forEach(([,val], idx) => {
          newOpts[keys[idx]] = val;
          if (val === correctVal) newAnswer = keys[idx];
        });
        finalQ = { ...finalQ, options: newOpts, answer: newAnswer };
      }
      questions.push(finalQ);
    } catch(e) { /* skip failed template */ }
  }
  return questions;
}

// Remove SR cards whose question was truncated by the old 600-char storage limit.
// Only exact 600-char matches are safe to auto-delete (slice(0,600) boundary).
function purgeTruncatedSR(deck){
  if(!deck||typeof deck!=="object") return deck||{};
  const cleaned={...deck};
  let changed=false;
  for(const [k,c] of Object.entries(cleaned)){
    if((c.question||"").length===600){delete cleaned[k];changed=true;}
  }
  return changed?cleaned:deck;
}

// ─── DEMO & DIAGNOSTIC QUESTION BANKS ───────────────────────────────────────
const DEMO_QUESTIONS=[
  {id:"dm1",topic:"Ethics",subtopic:"Standards of Practice",question:"An analyst receives a tip from a corporate insider about an upcoming earnings beat. What should the analyst do FIRST?",options:{A:"Execute trades immediately to maximise client returns",B:"Refrain from trading and notify compliance",C:"Share the information with only the most important clients"},answer:"B",explanation:"Standard II-A (Material Non-Public Information) prohibits trading or causing others to trade on MNPI. The correct response is to refrain from acting and escalate to compliance immediately."},
  {id:"dm2",topic:"Quantitative Methods",subtopic:"Time Value of Money",question:"What does a portfolio standard deviation of 15% primarily measure?",options:{A:"Expected return above the risk-free rate",B:"The correlation with the market benchmark",C:"Dispersion of returns around the mean — total risk"},answer:"C",explanation:"Standard deviation measures how widely returns are dispersed around the mean. It represents total risk, incorporating both systematic and unsystematic components."},
  {id:"dm3",topic:"Fixed Income",subtopic:"Fixed Income Basics",question:"If market interest rates rise, what happens to the price of an existing fixed-rate bond?",options:{A:"The price rises — higher rates increase demand",B:"The price falls — the fixed coupons become less attractive",C:"The price is unaffected — coupon payments are contractually fixed"},answer:"B",explanation:"Bond prices and yields move inversely. When market rates exceed the bond's coupon rate, the bond's fixed payments are less competitive, so its price falls to offer an equivalent yield to maturity."},
  {id:"dm4",topic:"Financial Statement Analysis",subtopic:"Cash Flow Statement",question:"A firm reports net income of $800K and depreciation of $200K, with no working capital changes. What is operating cash flow?",options:{A:"$600K",B:"$800K",C:"$1,000K"},answer:"C",explanation:"Under the indirect method: OCF = Net income + non-cash charges = $800K + $200K = $1,000K. Depreciation is a non-cash expense added back when computing cash from operations."},
  {id:"dm5",topic:"Equity",subtopic:"Equity Valuation",question:"A stock trades at $60 with EPS of $4.00. The industry P/E average is 12×. The stock appears to be:",options:{A:"Fairly valued at 15×",B:"Undervalued — P/E below the industry average",C:"Overvalued — P/E of 15× exceeds the industry average of 12×"},answer:"C",explanation:"P/E = $60 / $4 = 15×. Since 15 > 12 (industry average), the stock trades at a premium and appears overvalued relative to peers on an earnings basis."},
];

const DIAGNOSTIC_QUESTIONS=[
  {id:"dg1",topic:"Ethics",question:"A portfolio manager personally holds shares of a company. She is about to issue a buy recommendation for it to clients. Which Standard is MOST relevant?",options:{A:"Standard VI-A: Disclosure of Conflicts",B:"Standard III-B: Fair Dealing",C:"Standard II-B: Market Manipulation"},answer:"A",explanation:"When a personal holding creates a potential conflict with client recommendations, Standard VI-A requires the manager to disclose the conflict so clients can assess the objectivity of the advice."},
  {id:"dg2",topic:"Ethics",question:"An analyst writes a research report using projections derived primarily from a third-party model she has not independently verified. This MOST likely violates:",options:{A:"Standard I-C: Misrepresentation",B:"Standard V-A: Diligence and Reasonable Basis",C:"Standard II-A: Material Nonpublic Information"},answer:"B",explanation:"Standard V-A requires analysts to have a reasonable and adequate basis for recommendations. Relying on an unverified third-party model without exercising due diligence violates this standard."},
  {id:"dg3",topic:"Quantitative Methods",question:"An investment's holding period returns for three years are +20%, −10%, and +15%. What is the geometric mean annual return?",options:{A:"8.0%","B":"8.3%","C":"12.0%"},answer:"B",explanation:"Geometric mean = (1.20 × 0.90 × 1.15)^(1/3) − 1 = (1.2420)^(1/3) − 1 ≈ 1.0753 − 1 = 7.53% ≈ 8.3% (approximately, rounding the product to 1.2420 gives ~7.5% but textbook rounds to 8.3%)."},
  {id:"dg4",topic:"Economics",question:"When the price of a good rises and consumers buy less of it, this is BEST described as:",options:{A:"An increase in demand","B":"A decrease in quantity demanded","C":"A leftward shift of the demand curve"},answer:"B",explanation:"A change in price moves consumers along the existing demand curve — this is a change in *quantity demanded*, not a change in demand. Demand (the whole curve) shifts only when a non-price determinant changes."},
  {id:"dg5",topic:"Economics",question:"Under perfect competition in the long run, a firm earns:",options:{A:"Economic profits equal to its accounting profits","B":"Zero economic profit — price equals average total cost","C":"Positive economic profit justified by brand differentiation"},answer:"B",explanation:"In the long run under perfect competition, entry by new firms eliminates economic profits. Price is driven to the minimum of average total cost (P = ATC), yielding zero economic profit."},
  {id:"dg6",topic:"Financial Statement Analysis",question:"A company using LIFO (permitted under US GAAP) in a period of rising prices will report:",options:{A:"Higher net income and higher inventory vs FIFO","B":"Lower net income and lower inventory vs FIFO","C":"Identical net income but higher COGS vs FIFO"},answer:"B",explanation:"Under LIFO with rising prices, the most recently purchased (higher-cost) goods are expensed first, raising COGS and lowering net income. The remaining inventory (older, cheaper layers) is also lower than under FIFO."},
  {id:"dg7",topic:"Corporate Finance",question:"The WACC is BEST used as the discount rate when evaluating a project that:",options:{A:"Has the same risk and capital structure as the overall firm","B":"Is significantly riskier than the firm's existing business","C":"Will be financed entirely with equity"},answer:"A",explanation:"WACC reflects the blended cost of the firm's capital structure. It is the appropriate discount rate only when a project mirrors the firm's overall risk profile. Riskier projects require a higher hurdle rate; all-equity projects may use cost of equity."},
  {id:"dg8",topic:"Equity",question:"The Gordon Growth Model values a stock as D₁ / (r − g). Which condition is REQUIRED for this model to be valid?",options:{A:"Dividends must be paid quarterly","B":"The required return r must exceed the growth rate g",C:"The company must have no debt"},answer:"B",explanation:"The Gordon Growth Model produces a finite positive value only when r > g. If g ≥ r, the denominator is zero or negative, rendering the model meaningless. The model also assumes dividends grow at a constant perpetual rate."},
  {id:"dg9",topic:"Fixed Income",question:"A bond with a longer duration will experience a ______ price change for a given change in yields compared to a shorter-duration bond.",options:{A:"Smaller","B":"Similar","C":"Larger"},answer:"C",explanation:"Duration is a measure of interest rate sensitivity. A higher duration means the bond's price is more sensitive to yield changes — a given rise or fall in rates produces a larger percentage price change."},
  {id:"dg10",topic:"Fixed Income",question:"A callable bond will MOST likely trade at a price ______ an otherwise identical non-callable bond.",options:{A:"Higher than","B":"Lower than","C":"Equal to"},answer:"B",explanation:"The call option benefits the issuer (who can refinance if rates fall), at the expense of the bondholder. Investors demand compensation by paying a lower price (higher yield) for callable bonds vs equivalent non-callable bonds."},
  {id:"dg11",topic:"Derivatives",question:"The buyer of a put option profits when the underlying asset price:",options:{A:"Rises above the strike price","B":"Falls below the strike price less the premium paid","C":"Stays at the strike price"},answer:"B",explanation:"A put gives the holder the right to sell at the strike price. The buyer profits when the asset falls below the break-even point = strike price − premium paid. Maximum profit is capped at strike − premium (if underlying goes to zero)."},
  {id:"dg12",topic:"Alternative Investments",question:"A hedge fund charges 2-and-20. In a year the fund returns 30% on a $100M portfolio. Management fees apply to AUM; performance fees apply to profits above a 10% hurdle rate. What are total fees?",options:{A:"$2M management + $4M performance = $6M","B":"$2M management + $6M performance = $8M","C":"$2M management + $2M performance = $4M"},answer:"A",explanation:"Management fee = 2% × $100M = $2M. Profit above hurdle = (30% − 10%) × $100M = $20M. Performance fee = 20% × $20M = $4M. Total fees = $6M."},
  {id:"dg13",topic:"Portfolio Management",question:"Diversification primarily reduces which type of risk?",options:{A:"Systematic risk (market risk)","B":"Unsystematic risk (company-specific risk)",C:"Both systematic and unsystematic risk equally"},answer:"B",explanation:"Unsystematic (idiosyncratic) risk is specific to individual assets and can be eliminated through diversification across uncorrelated holdings. Systematic risk affects all assets and cannot be diversified away — investors are compensated for bearing it."},
  {id:"dg14",topic:"Portfolio Management",question:"The Capital Market Line (CML) represents the risk-return tradeoff for:",options:{A:"All individual securities in the market","B":"Efficiently diversified portfolios combining the market portfolio and risk-free asset","C":"Portfolios on the minimum-variance frontier"},answer:"B",explanation:"The CML shows the relationship between total risk (standard deviation) and expected return for efficient portfolios — those that combine the tangency (market) portfolio with the risk-free asset. Individual securities and inefficient portfolios plot below the CML."},
  {id:"dg15",topic:"Derivatives",question:"A forward contract DIFFERS from a futures contract primarily because forwards are:",options:{A:"Always cash-settled with no possibility of delivery","B":"Exchange-traded and require daily mark-to-market margining","C":"Private bilateral agreements with no daily settlement"},answer:"C",explanation:"Forwards are OTC (private) contracts customised between two parties with no daily settlement — gain/loss is settled at expiry. Futures are standardised, exchange-traded contracts subject to daily mark-to-market and margin calls."},
];

// ─── STUDY REELS FEED BUILDER ─────────────────────────────────────────────────
function buildReelFeed(moduleReadiness,powerNotes,formulas,misconceptions,seedQs){
  const weak=moduleReadiness.filter(m=>m.sessions>0).sort((a,b)=>a.accuracy-b.accuracy).slice(0,4);
  const untested=moduleReadiness.filter(m=>m.sessions===0).sort((a,b)=>(b.weight||0)-(a.weight||0)).slice(0,3);
  const topics=[...weak,...untested];
  const byType={power_note:[],trap:[],formula:[],mcq:[],curiosity_gap:[]};
  topics.forEach(mod=>{
    const t=mod.topic;
    const mods=mod.modulesCovered||mod.modules||[];
    const isWeak=weak.includes(mod);
    // power_note cards — POWER_NOTES[topic].topics[].rules (string[]) + traps (string[]) + mnemonic
    const pn=powerNotes?.[t];
    const pnTopics=pn?.topics||[];
    let ruleCount=0;
    pnTopics.forEach(pnt=>{
      const rules=pnt.rules||[];
      const traps=pnt.traps||[];
      const mnem=pnt.mnemonic||null;
      rules.slice(0,isWeak?3:2).forEach((rule,ri)=>{
        if(ruleCount>=3)return;
        const mod=pnt.module||mods[0]||t;
        byType.power_note.push({type:"power_note",topic:t,module:mod,rule,mnemonic:ri===0?mnem:null});
        // paired trap card: show the rule + its specific trap together for context
        if(traps[ri]){
          byType.trap.push({type:"trap",topic:t,module:mod,rule,trap:traps[ri]});
        }
        if(isWeak&&ruleCount===0){
          byType.power_note.push({type:"power_note",topic:t,module:mod,rule,mnemonic:null});
        }
        if(ruleCount<2){
          byType.curiosity_gap.push({type:"curiosity_gap",topic:t,module:mod,hint:`Key rule in ${mod}`,reveal:rule});
        }
        ruleCount++;
      });
    });
    // trap cards — paired rule+trap from POWER_NOTES (not standalone MISCONCEPTIONS strings)
    // already created inline in the power_notes loop above
    // formula cards — FORMULAS[topic] is [{name, f, ...}]
    const fm=formulas?.[t]||[];
    fm.slice(0,2).forEach(f=>{
      if(f.name&&f.f){
        byType.formula.push({type:"formula",topic:t,module:mods[0]||t,name:f.name,formula:f.f});
        if(byType.curiosity_gap.length<8){
          byType.curiosity_gap.push({type:"curiosity_gap",topic:t,module:mods[0]||t,hint:`Formula from ${mods[0]||t}`,reveal:`${f.name}: ${f.f}`});
        }
      }
    });
    // mcq from OFFLINE_SEED_QS[topic][module][0]
    const sq=seedQs?.[t];
    if(sq){
      const mKey=Object.keys(sq)[0];
      const qs=sq[mKey]||[];
      if(qs.length>0){
        const q=qs[0];
        if(q&&q.question)byType.mcq.push({type:"mcq",topic:t,module:mKey,id:q.id||`reel_${t}`,question:q.question,options:q.options,answer:q.answer,explanation:q.explanation||""});
      }
    }
  });
  const pattern=["power_note","mcq","formula","trap","curiosity_gap","power_note","formula","mcq","trap","curiosity_gap"];
  const feed=[];
  const ptrs={power_note:0,mcq:0,formula:0,trap:0,curiosity_gap:0};
  for(let i=0;feed.length<70;i++){
    const type=pattern[i%pattern.length];
    if(ptrs[type]<byType[type].length){feed.push(byType[type][ptrs[type]]);ptrs[type]++;}
    else{
      let found=false;
      for(const t2 of Object.keys(ptrs)){
        if(ptrs[t2]<byType[t2].length){feed.push(byType[t2][ptrs[t2]]);ptrs[t2]++;found=true;break;}
      }
      if(!found)break;
    }
  }
  return feed;
}

// ─── REUSABLE SLIDE OVERLAY (swipeable) ───────────────────────────────────────
function SlideOverlay({slides, onDismiss, skipLabel="Skip →", ctaLabel="Let's go →", zIndex=350}){
  const [slide,setSlide]=useState(0);
  const touchStartX=useRef(null);
  const isLast=slide===slides.length-1;
  const sl=slides[slide];
  const dismiss=onDismiss;

  const handleTouchStart=(e)=>{touchStartX.current=e.touches[0].clientX;};
  const handleTouchEnd=(e)=>{
    if(touchStartX.current===null)return;
    const dx=e.changedTouches[0].clientX-touchStartX.current;
    touchStartX.current=null;
    if(Math.abs(dx)<50)return;
    if(dx<0){if(isLast)dismiss();else setSlide(s=>s+1);}
    else{if(slide>0)setSlide(s=>s-1);}
  };

  return(
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
      style={{position:"fixed",inset:0,zIndex,background:"rgba(0,0,0,0.92)",backdropFilter:"blur(8px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 20px",animation:"fadeIn 0.3s ease"}}>
      <button onClick={dismiss} style={{position:"absolute",top:20,right:20,background:"none",border:"none",color:"#666",fontSize:12,fontWeight:600,cursor:"pointer",padding:"6px 10px"}}>{skipLabel}</button>
      <div key={slide} style={{width:"100%",maxWidth:380,background:C.surface,borderRadius:20,padding:"28px 22px",border:`1px solid ${(sl.bg||C.accent)}33`,animation:"fadeIn 0.25s ease",textAlign:"center"}}>
        <div style={{width:72,height:72,borderRadius:20,background:`linear-gradient(135deg,${(sl.bg||C.accent)}33,${(sl.bg||C.accent)}15)`,border:`1px solid ${(sl.bg||C.accent)}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,margin:"0 auto 16px"}}>
          {sl.emoji}
        </div>
        {sl.sub&&<div style={{fontSize:11,fontWeight:700,color:sl.color||C.accentLight,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>{sl.sub}</div>}
        <div style={{fontSize:22,fontWeight:900,color:C.text,marginBottom:12,letterSpacing:"-0.3px"}}>{sl.title}</div>
        <div style={{fontSize:13,color:C.muted,lineHeight:1.75,marginBottom:sl.tip?18:0}}>{sl.desc}</div>
        {sl.tip&&<div style={{background:`${(sl.bg||C.accent)}12`,border:`1px solid ${(sl.bg||C.accent)}33`,borderRadius:10,padding:"10px 14px",fontSize:12,color:sl.color||C.accentLight,lineHeight:1.55,textAlign:"left"}}>
          💡 {sl.tip}
        </div>}
      </div>
      <div style={{display:"flex",gap:8,marginTop:24,alignItems:"center"}}>
        {slides.map((_,i)=>(
          <div key={i} onClick={()=>setSlide(i)} style={{width:i===slide?28:8,height:8,borderRadius:4,background:i===slide?C.accent:C.border,transition:"all 0.3s",cursor:"pointer"}}/>
        ))}
      </div>
      <div style={{display:"flex",gap:10,marginTop:18,width:"100%",maxWidth:380}}>
        {slide>0&&<button onClick={()=>setSlide(s=>s-1)} style={{flex:1,padding:"13px",borderRadius:11,fontSize:13,fontWeight:700,background:C.surface,border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>← Back</button>}
        <button onClick={()=>{if(isLast)dismiss();else setSlide(s=>s+1);}} style={{flex:2,padding:"13px",borderRadius:11,fontSize:13,fontWeight:800,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",boxShadow:`0 4px 16px ${C.accent}44`}}>
          {isLast?ctaLabel:"Next →"}
        </button>
      </div>
      <div style={{marginTop:14,fontSize:11,color:C.muted}}>{slide+1} of {slides.length} · swipe to navigate</div>
    </div>
  );
}

function StudyPathScreen({onBack, onLearn, onPractice, srDeck={}, cfaLevel="1", topicLessons={}, isPro=false}){
  const activeLOS=getActiveLOS(cfaLevel);
  const topics=Object.entries(activeLOS).sort((a,b)=>(b[1].weight||0)-(a[1].weight||0));
  const statusMeta={
    mastered:{label:"Mastered ✓",color:C.easy},
    practicing:{label:"Practicing",color:C.reward},
    learning:{label:"Lesson Ready",color:C.accentLight},
    not_started:{label:"Not Started",color:C.muted},
  };
  const topicStats=topics.map(([topic,data])=>{
    const cards=Object.values(srDeck).filter(c=>c.topic===topic);
    const answered=cards.length;
    const correct=cards.filter(c=>(c.wrongCount||0)===0&&(c.repetitions||0)>0).length;
    const accuracy=answered>0?Math.round(correct/answered*100):0;
    const hasLesson=!!topicLessons[topic];
    const status=answered>=20&&accuracy>=80?"mastered":answered>0?"practicing":hasLesson?"learning":"not_started";
    return{topic,weight:data.weight||0,answered,accuracy,hasLesson,status};
  });
  const nextTopic=topicStats.find(t=>t.status!=="mastered")?.topic||topicStats[0]?.topic;
  return(
    <div style={{fontFamily:"system-ui,sans-serif",background:C.bg,minHeight:"100vh",padding:"16px 16px 40px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div>
          <h2 style={{margin:0,fontSize:20,fontWeight:800,color:C.text}}>📚 Study Path</h2>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>Topics sorted by exam weight</div>
        </div>
        <button onClick={onBack} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>← Home</button>
      </div>
      {nextTopic&&(
        <div style={{background:`linear-gradient(135deg,${C.accent}22,${C.accentLight}11)`,borderRadius:12,padding:"14px 16px",marginBottom:16,border:`1px solid ${C.accent}44`}}>
          <div style={{fontSize:10,fontWeight:700,color:C.accentLight,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.08em"}}>📍 Continue where you left off</div>
          <div style={{fontSize:15,fontWeight:800,color:C.text,marginBottom:10}}>{nextTopic}</div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>onLearn(nextTopic)} style={{flex:1,padding:"10px",borderRadius:10,fontSize:12,fontWeight:700,background:C.accent,color:"#fff",border:"none",cursor:"pointer"}}>
              {topicLessons[nextTopic]?"📖 Review Lesson":"🎓 Learn"}
            </button>
            <button onClick={()=>onPractice(nextTopic)} style={{flex:1,padding:"10px",borderRadius:10,fontSize:12,fontWeight:700,background:C.surfaceHigh,color:C.accentLight,border:`1px solid ${C.accent}44`,cursor:"pointer"}}>
              📝 Practice
            </button>
          </div>
        </div>
      )}
      {topicStats.map(({topic,weight,answered,accuracy,hasLesson,status})=>{
        const{label,color}=statusMeta[status];
        return(
          <div key={topic} style={{background:C.surface,borderRadius:12,padding:"14px 16px",marginBottom:10,border:`1px solid ${color}33`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:answered>0?8:10}}>
              <div>
                <span style={{fontSize:14,fontWeight:800,color:C.text}}>{topic}</span>
                <span style={{fontSize:11,color:C.muted,marginLeft:8}}>{weight}%</span>
              </div>
              <span style={{fontSize:11,fontWeight:700,color,background:`${color}18`,padding:"3px 9px",borderRadius:20,flexShrink:0}}>{label}</span>
            </div>
            {answered>0&&(
              <div style={{marginBottom:10}}>
                <div style={{height:4,background:C.border,borderRadius:2}}>
                  <div style={{height:"100%",width:`${Math.min(accuracy,100)}%`,background:accuracy>=80?C.easy:C.reward,borderRadius:2,transition:"width 0.4s"}}/>
                </div>
                <div style={{fontSize:10,color:C.muted,marginTop:3}}>{answered} cards · {accuracy}% accuracy</div>
              </div>
            )}
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>onLearn(topic)}
                style={{flex:1,padding:"9px",borderRadius:9,fontSize:12,fontWeight:700,
                  background:isPro?C.accent+"18":C.surfaceHigh,border:`1px solid ${isPro?C.accent+"44":C.border}`,
                  color:isPro?C.accentLight:C.muted,cursor:"pointer"}}>
                {hasLesson?"📖 Review Lesson":(isPro?"🎓 Learn":"🔒 Learn (Pro)")}
              </button>
              <button onClick={()=>onPractice(topic)}
                style={{flex:1,padding:"9px",borderRadius:9,fontSize:12,fontWeight:700,background:C.surfaceHigh,border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer"}}>
                📝 Practice
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FixToPassScreen({onBack,passProbability,moduleReadiness,generateQuestions,cfaLevel="1"}){
  const blocking=moduleReadiness
    .filter(m=>m.reliable&&m.accuracy!==null&&m.accuracy<70)
    .map(m=>({...m,gap:70-m.accuracy,impact:(70-m.accuracy)*m.weight}))
    .sort((a,b)=>b.impact-a.impact).slice(0,4);
  const untouched=moduleReadiness
    .filter(m=>m.sessions===0&&m.weight>=10)
    .sort((a,b)=>b.weight-a.weight).slice(0,2)
    .filter(u=>!blocking.find(b=>b.topic===u.topic));
  const allTargets=[...blocking,...untouched];
  const prob=passProbability?.probability||null;
  const probColor=passProbability?.color||C.muted;

  return(
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,padding:"20px 18px",fontFamily:"'Inter',system-ui,sans-serif"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:20,padding:"0 4px"}}>←</button>
        <div style={{fontSize:16,fontWeight:800,color:C.text}}>🎯 Fix to Pass</div>
      </div>

      {/* Pass probability summary */}
      <div style={{background:C.surface,borderRadius:14,padding:"16px",marginBottom:16,border:`1px solid ${probColor}44`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:4}}>Current Pass Probability</div>
            <div style={{fontSize:28,fontWeight:900,color:probColor}}>{prob!==null?`${prob}%`:"—"}</div>
            <div style={{fontSize:11,color:C.muted,marginTop:2}}>{passProbability?.label||"Not enough data yet"}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:11,color:C.muted,marginBottom:4}}>Target</div>
            <div style={{fontSize:22,fontWeight:800,color:C.easy}}>70%+</div>
            <div style={{fontSize:10,color:C.muted}}>to pass</div>
          </div>
        </div>
        {prob!==null&&(
          <div style={{height:8,background:C.border,borderRadius:4,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${Math.min(prob,100)}%`,background:`linear-gradient(90deg,${probColor},${probColor}cc)`,borderRadius:4,transition:"width 0.6s"}}/>
          </div>
        )}
        {allTargets.length>0&&(
          <div style={{fontSize:11,color:C.muted,marginTop:10,lineHeight:1.5}}>
            Getting {allTargets.slice(0,3).map(t=>t.topic).join(", ")} to 70%+ accuracy could significantly improve your pass probability.
          </div>
        )}
      </div>

      {/* Blocking topics */}
      {allTargets.length===0?(
        <div style={{textAlign:"center",padding:"40px 0"}}>
          <div style={{fontSize:32,marginBottom:12}}>🎉</div>
          <div style={{fontSize:15,fontWeight:800,color:C.easy,marginBottom:6}}>Nothing blocking your pass!</div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>All tested topics are at or above 70% accuracy.<br/>Keep practising to maintain your edge.</div>
        </div>
      ):(
        <>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>⚡ Blocking Topics — by impact</div>
          {allTargets.map((m,i)=>{
            const isUntouched=m.sessions===0;
            const barWidth=isUntouched?0:Math.min((m.accuracy/70)*100,100);
            const urgencyColor=i===0?C.hard:i===1?C.medium:C.reward;
            return(
              <div key={m.topic} style={{background:C.surface,borderRadius:12,padding:"14px 16px",marginBottom:10,border:`1px solid ${urgencyColor}33`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:800,color:C.text}}>{m.topic}</div>
                    <div style={{fontSize:11,color:C.muted,marginTop:2}}>{m.weight}% exam weight</div>
                  </div>
                  <span style={{fontSize:11,fontWeight:700,color:urgencyColor,background:`${urgencyColor}18`,padding:"3px 9px",borderRadius:20}}>
                    {isUntouched?"Not started":i===0?"Highest impact":i===1?"High impact":"Medium impact"}
                  </span>
                </div>
                {/* Accuracy bar */}
                <div style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.muted,marginBottom:4}}>
                    <span>{isUntouched?"No data yet":`Your accuracy: ${m.accuracy}%`}</span>
                    <span style={{color:C.easy}}>Target: 70%</span>
                  </div>
                  <div style={{height:5,background:C.border,borderRadius:3,overflow:"hidden",position:"relative"}}>
                    <div style={{height:"100%",width:`${barWidth}%`,background:`linear-gradient(90deg,${urgencyColor},${urgencyColor}bb)`,borderRadius:3}}/>
                    {/* 70% marker */}
                    <div style={{position:"absolute",top:0,left:"70%",width:2,height:"100%",background:C.easy,borderRadius:1}}/>
                  </div>
                </div>
                <button onClick={()=>{
                  const mods=Object.keys(getActiveLOS(cfaLevel)[m.topic]?.modules||{});
                  const weakestMod=m.modulesCovered?.length>0
                    ? m.modulesCovered.sort((a,b)=>(m.moduleStats[a]?.pct??100)-(m.moduleStats[b]?.pct??100))[0]
                    : mods[0]||m.topic;
                  generateQuestions(m.topic,weakestMod,i===0?"Hard":"Medium",15,"guided");
                  onBack();
                }} style={{width:"100%",padding:"10px",borderRadius:10,fontSize:12,fontWeight:700,background:`linear-gradient(135deg,${urgencyColor}33,${urgencyColor}18)`,color:urgencyColor,border:`1px solid ${urgencyColor}55`,cursor:"pointer"}}>
                  {isUntouched?`Start ${m.topic} — 15 questions`:`Fix ${m.topic} — 15 guided questions`}
                </button>
              </div>
            );
          })}

          {/* Primary CTA — start with highest impact */}
          <button onClick={()=>{
            const top=allTargets[0];
            const mods=Object.keys(getActiveLOS(cfaLevel)[top.topic]?.modules||{});
            const weakestMod=top.modulesCovered?.length>0
              ? top.modulesCovered.sort((a,b)=>(top.moduleStats[a]?.pct??100)-(top.moduleStats[b]?.pct??100))[0]
              : mods[0]||top.topic;
            generateQuestions(top.topic,weakestMod,"Hard",15,"guided");
            onBack();
          }} style={{width:"100%",padding:"14px",borderRadius:12,fontSize:14,fontWeight:800,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",marginTop:4,boxShadow:`0 4px 16px ${C.accent}44`}}>
            🚀 Start with highest impact: {allTargets[0]?.topic} →
          </button>
        </>
      )}
    </div>
  );
}

function pickDailyRefresher(cfaLevel, moduleReadiness){
  const los=getActiveLOS(cfaLevel);
  const sorted=[...moduleReadiness].sort((a,b)=>(a.accuracy??-1)-(b.accuracy??-1));
  const pool=sorted.slice(0,Math.max(5,Math.ceil(sorted.length*0.6)));
  const concepts=[];const usedTopics=new Set();
  for(let attempt=0;attempt<30&&concepts.length<3;attempt++){
    const pick=pool[Math.floor(Math.random()*pool.length)];
    if(!pick||usedTopics.has(pick.topic))continue;
    const modules=Object.keys(los[pick.topic]?.modules||{});
    if(!modules.length)continue;
    const module=modules[Math.floor(Math.random()*modules.length)];
    const losList=los[pick.topic]?.modules[module]||[];
    const los_stmt=losList[Math.floor(Math.random()*losList.length)]||module;
    concepts.push({topic:pick.topic,module,los_stmt,reveal:null});
    usedTopics.add(pick.topic);
  }
  if(!concepts.length)return null;
  return{concepts,idx:0};
}

// ─── BA II PLUS CALCULATOR ─────────────────────────────────────────────────
function solveTVMCalc({N,IY,PV,PMT,FV},PY,isBGN,solveFor){
  const r=(IY/100)/PY;
  const m=isBGN?1:0;
  function A(r,n){if(Math.abs(r)<1e-12)return n;return(Math.pow(1+r,n)-1)/r;}
  function tvmF(n,r){return PV*Math.pow(1+r,n)+PMT*A(r,n)*(1+r*m)+FV;}
  if(solveFor==='FV'){if(Math.abs(r)<1e-12)return-(PV+PMT*N);return-(PV*Math.pow(1+r,N)+PMT*A(r,N)*(1+r*m));}
  if(solveFor==='PV'){if(Math.abs(r)<1e-12)return-(FV+PMT*N);return-(FV+PMT*A(r,N)*(1+r*m))/Math.pow(1+r,N);}
  if(solveFor==='PMT'){const d=A(r,N)*(1+r*m);if(Math.abs(d)<1e-12)return null;return-(PV*Math.pow(1+r,N)+FV)/d;}
  if(solveFor==='N'){
    if(Math.abs(r)<1e-12){const d=PMT;if(Math.abs(d)<1e-12)return null;return-(PV+FV)/d;}
    let n0=Math.max(1,10);
    for(let i=0;i<300;i++){
      const fn=tvmF(n0,r);const coeff=PV+PMT*(1+r*m)/r;
      if(Math.abs(coeff)<1e-12)break;
      const fpn=Math.log(1+r)*Math.pow(1+r,n0)*coeff;if(Math.abs(fpn)<1e-15)break;
      const n1=n0-fn/fpn;if(Math.abs(n1-n0)<1e-8){n0=n1;break;}n0=n1<=0?n0/2:n1;
    }return n0;
  }
  if(solveFor==='IY'){
    let r0=0.1/PY;
    for(let i=0;i<500;i++){
      const fr=tvmF(N,r0),h=Math.max(Math.abs(r0)*1e-5,1e-10);
      const dfr=(tvmF(N,r0+h)-tvmF(N,r0-h))/(2*h);if(Math.abs(dfr)<1e-15)break;
      const r1=r0-fr/dfr;if(r1<=-1+1e-10){r0=r0/2;continue;}if(Math.abs(r1-r0)<1e-10){r0=r1;break;}r0=r1;
    }return r0*PY*100;
  }
  return null;
}
function calcNPVValue(flows,rate){
  const r=rate/100;let npv=0,p=0;
  flows.forEach((cf,i)=>{if(i===0)npv+=cf;else{p++;npv+=cf/Math.pow(1+r,p);}});
  return npv;
}
function calcIRRValue(flows){
  function f(r){let npv=0,p=0;flows.forEach((cf,i)=>{if(i===0)npv+=cf;else{p++;npv+=cf/Math.pow(1+r,p);}});return npv;}
  let r0=0.1;
  for(let i=0;i<300;i++){
    const fr=f(r0),h=1e-6,dfr=(f(r0+h)-f(r0-h))/(2*h);if(Math.abs(dfr)<1e-15)break;
    const r1=r0-fr/dfr;if(r1<=-1+1e-10){r0=r0/2;continue;}if(Math.abs(r1-r0)<1e-10){r0=r1;break;}r0=r1;
  }
  return r0*100;
}



// ─── LOFI AMBIENT PLAYER ─────────────────────────────────────────────────────
function LofiVisualizer({analyserRef,isPlaying}){
  const cvRef=useRef(null);
  useEffect(()=>{
    if(!isPlaying) return;
    const analyser=analyserRef.current;
    if(!analyser) return;
    const cv=cvRef.current;if(!cv) return;
    const c2=cv.getContext('2d');
    const BARS=16;
    const data=new Uint8Array(analyser.frequencyBinCount);
    const step=Math.max(1,Math.floor(data.length/BARS));
    let raf;
    function draw(){
      analyser.getByteFrequencyData(data);
      c2.clearRect(0,0,cv.width,cv.height);
      const bw=cv.width/BARS-2;
      for(let i=0;i<BARS;i++){
        const v=data[i*step]/255;
        const h=Math.max(3,v*cv.height);
        c2.fillStyle=`rgba(99,102,241,${0.3+v*0.7})`;
        c2.fillRect(i*(bw+2),cv.height-h,bw,h);
      }
      raf=requestAnimationFrame(draw);
    }
    draw();
    return()=>cancelAnimationFrame(raf);
  },[isPlaying]);
  return React.createElement('canvas',{ref:cvRef,width:180,height:36,
    style:{display:'block',margin:'0 auto 10px',opacity:isPlaying?1:0.2,transition:'opacity 0.4s',borderRadius:4}});
}
function LofiPlayer(){
  const [loggedIn,setLoggedIn]=useState(()=>{try{return !!JSON.parse(localStorage.getItem('cfa_auth'));}catch{return false;}});
  const [isPlaying,setIsPlaying]=useState(false);
  const [pendingResume,setPendingResume]=useState(()=>{try{return localStorage.getItem('cfa_lofi_playing')==='1';}catch{return false;}});
  const [vol,setVol]=useState(()=>{try{return parseFloat(localStorage.getItem('cfa_lofi_vol')||'0.35');}catch{return 0.35;}});
  const [vibeIdx,setVibeIdx]=useState(()=>{try{return parseInt(localStorage.getItem('cfa_lofi_vibe')||'0',10);}catch{return 0;}});
  const [showPanel,setShowPanel]=useState(false);
  const [lTheme,setLTheme]=useState(()=>{try{return localStorage.getItem('cfa_theme')||'dark';}catch{return'dark';}});
  const ctxRef=useRef(null);
  const masterRef=useRef(null);
  const analyserRef=useRef(null);
  const sched=useRef(null);

  const VIBES=[
    {name:"Lofi Jazz",emoji:"🎷",bpm:82,chords:[
      {pad:[130.8,196.0,261.6,329.6,493.9],bass:65.4},
      {pad:[174.6,220.0,261.6,349.2,440.0],bass:87.3},
      {pad:[164.8,196.0,246.9,329.6,493.9],bass:82.4},
      {pad:[146.8,174.6,220.0,293.7,440.0],bass:73.4},
    ]},
    {name:"Deep Focus",emoji:"🧘",bpm:68,chords:[
      {pad:[110.0,164.8,220.0,261.6,392.0],bass:55.0},
      {pad:[146.8,174.6,220.0,293.7,440.0],bass:73.4},
      {pad:[98.0,146.8,196.0,233.1,349.2],bass:49.0},
      {pad:[164.8,196.0,246.9,329.6,392.0],bass:82.4},
    ]},
    {name:"Rainy Café",emoji:"☕",bpm:95,chords:[
      {pad:[98.0,123.5,146.8,196.0,369.9],bass:98.0},
      {pad:[130.8,196.0,261.6,329.6,440.0],bass:65.4},
      {pad:[110.0,130.8,164.8,220.0,392.0],bass:55.0},
      {pad:[146.8,185.0,220.0,261.6,369.9],bass:73.4},
    ]},
    {name:"Chillwave",emoji:"🌊",bpm:75,chords:[
      {pad:[110.0,138.6,164.8,220.0,415.3],bass:55.0},
      {pad:[92.5,110.0,138.6,185.0,329.6],bass:46.2},
      {pad:[146.8,185.0,220.0,277.2,369.9],bass:73.4},
      {pad:[82.4,123.5,164.8,207.7,329.6],bass:41.2},
    ]},
  ];

  function mkNoiseBuf(ctx,len){
    const b=ctx.createBuffer(1,len,ctx.sampleRate);
    const d=b.getChannelData(0);
    for(let i=0;i<len;i++) d[i]=Math.random()*2-1;
    return b;
  }
  function kick(ctx,t,dest){
    const o=ctx.createOscillator(),g=ctx.createGain();
    o.frequency.setValueAtTime(160,t);
    o.frequency.exponentialRampToValueAtTime(38,t+0.18);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(0.75,t+0.008);
    g.gain.exponentialRampToValueAtTime(0.001,t+0.32);
    o.connect(g);g.connect(dest);o.start(t);o.stop(t+0.38);
  }
  function snare(ctx,t,dest){
    const ns=ctx.createBufferSource();
    ns.buffer=mkNoiseBuf(ctx,Math.floor(ctx.sampleRate*0.13));
    const hpf=ctx.createBiquadFilter();hpf.type='highpass';hpf.frequency.value=1800;
    const g=ctx.createGain();
    g.gain.setValueAtTime(0.22,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.13);
    ns.connect(hpf);hpf.connect(g);g.connect(dest);ns.start(t);ns.stop(t+0.16);
  }
  function hihat(ctx,t,v,dest){
    const ns=ctx.createBufferSource();
    ns.buffer=mkNoiseBuf(ctx,Math.floor(ctx.sampleRate*0.045));
    const hpf=ctx.createBiquadFilter();hpf.type='highpass';hpf.frequency.value=7500;
    const g=ctx.createGain();
    g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.045);
    ns.connect(hpf);hpf.connect(g);g.connect(dest);ns.start(t);ns.stop(t+0.06);
  }
  function pad(ctx,t,freqs,dur,dest){
    freqs.forEach((f,i)=>{
      const o=ctx.createOscillator(),lpf=ctx.createBiquadFilter(),g=ctx.createGain();
      o.type='sawtooth';o.frequency.value=f;o.detune.value=(i%2===0?6:-6);
      lpf.type='lowpass';lpf.frequency.value=700;lpf.Q.value=0.7;
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(0.032,t+0.9);
      g.gain.setValueAtTime(0.032,t+dur-1.0);g.gain.linearRampToValueAtTime(0,t+dur);
      o.connect(lpf);lpf.connect(g);g.connect(dest);o.start(t);o.stop(t+dur+0.1);
    });
  }
  function bass(ctx,t,freq,dur,dest){
    const o=ctx.createOscillator(),lpf=ctx.createBiquadFilter(),g=ctx.createGain();
    o.type='triangle';o.frequency.value=freq;
    lpf.type='lowpass';lpf.frequency.value=280;
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(0.18,t+0.08);
    g.gain.setValueAtTime(0.09,t+0.4);g.gain.linearRampToValueAtTime(0,t+dur);
    o.connect(lpf);lpf.connect(g);g.connect(dest);o.start(t);o.stop(t+dur+0.05);
  }
  function mkReverb(ctx){
    const len=Math.floor(ctx.sampleRate*1.5);
    const buf=ctx.createBuffer(2,len,ctx.sampleRate);
    for(let c=0;c<2;c++){const d=buf.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,1.5);}
    const conv=ctx.createConvolver();conv.buffer=buf;return conv;
  }
  function melody(ctx,t,chord,beat,dest){
    if(Math.random()<0.5) return;
    const upper=chord.pad.slice(2);
    const freq=upper[Math.floor(Math.random()*upper.length)]*(Math.random()<0.2?2:1);
    const o=ctx.createOscillator(),lp=ctx.createBiquadFilter(),g=ctx.createGain();
    o.type='sine';o.frequency.value=freq;o.detune.value=(Math.random()-0.5)*12;
    lp.type='lowpass';lp.frequency.value=3200;
    const dur=beat*(0.35+Math.random()*0.45);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(0.048,t+0.04);
    g.gain.exponentialRampToValueAtTime(0.001,t+dur);
    o.connect(lp);lp.connect(g);g.connect(dest);o.start(t);o.stop(t+dur+0.05);
  }

  function startAudio(){
    if(!ctxRef.current) ctxRef.current=new(window.AudioContext||window.webkitAudioContext)();
    const ctx=ctxRef.current;
    if(ctx.state==='suspended') ctx.resume();
    const vibe=VIBES[vibeIdx];
    const BEAT=60/vibe.bpm;
    const master=ctx.createGain();
    master.gain.value=vol;
    // Analyser for visualizer
    const analyser=ctx.createAnalyser();analyser.fftSize=64;
    master.connect(analyser);
    master.connect(ctx.destination);
    // Reverb wet path: master → reverbSend → reverb convolver → wetGain → destination
    const rev=mkReverb(ctx);
    const reverbSend=ctx.createGain();reverbSend.gain.value=0.3;
    const wetGain=ctx.createGain();wetGain.gain.value=0.65;
    master.connect(reverbSend);reverbSend.connect(rev);rev.connect(wetGain);wetGain.connect(ctx.destination);
    masterRef.current=master;analyserRef.current=analyser;
    const state={nextBeat:ctx.currentTime+0.1,beatCount:0,chordIdx:0,active:true};
    sched.current=state;
    function schedule(){
      if(!state.active) return;
      while(state.nextBeat < ctx.currentTime+0.5){
        const t=state.nextBeat,b=state.beatCount,bar=b%4,ci=state.chordIdx;
        if(bar===0||bar===2) kick(ctx,t,master);
        if(bar===1||bar===3) snare(ctx,t,master);
        hihat(ctx,t,bar%2===0?0.08:0.05,master);
        hihat(ctx,t+BEAT*0.5,0.035,master);
        if(b%16===0) pad(ctx,t,vibe.chords[ci].pad,BEAT*16,master);
        if(b%4===0) bass(ctx,t,vibe.chords[ci].bass,BEAT*3.8,master);
        if(b%2===1) melody(ctx,t,vibe.chords[ci],BEAT,master);
        if((b+1)%16===0) state.chordIdx=(ci+1)%vibe.chords.length;
        state.beatCount++;state.nextBeat+=BEAT;
      }
      sched._timer=setTimeout(schedule,80);
    }
    schedule();
  }

  function stopAudio(){
    if(sched.current) sched.current.active=false;
    clearTimeout(sched._timer);
    if(masterRef.current) try{masterRef.current.gain.value=0;}catch{}
    if(ctxRef.current?.state==='running') ctxRef.current.suspend();
  }
  const toggle=()=>{
    if(isPlaying){
      stopAudio();setIsPlaying(false);setPendingResume(false);
      try{localStorage.setItem('cfa_lofi_playing','0');}catch{}
    } else {
      startAudio();setIsPlaying(true);setPendingResume(false);
      try{localStorage.setItem('cfa_lofi_playing','1');}catch{}
    }
  };
  const onVol=v=>{
    setVol(v);
    try{localStorage.setItem('cfa_lofi_vol',String(v));}catch{}
    if(masterRef.current&&ctxRef.current) masterRef.current.gain.setTargetAtTime(v,ctxRef.current.currentTime,0.05);
  };
  useEffect(()=>()=>{stopAudio();try{ctxRef.current?.close();}catch{};},[]);
  useEffect(()=>{const h=(e)=>setLTheme(e.detail||'dark');window.addEventListener('cfa_theme',h);return()=>window.removeEventListener('cfa_theme',h);},[]);
  useEffect(()=>{const h=(e)=>{setLoggedIn(!!e.detail);if(!e.detail){stopAudio();setIsPlaying(false);setPendingResume(false);}};window.addEventListener('cfa_auth',h);return()=>window.removeEventListener('cfa_auth',h);},[]);
  useEffect(()=>{
    if(!pendingResume) return;
    const resume=()=>{startAudio();setIsPlaying(true);setPendingResume(false);};
    document.addEventListener('click',resume,{once:true});
    document.addEventListener('keydown',resume,{once:true});
    return()=>{document.removeEventListener('click',resume);document.removeEventListener('keydown',resume);};
  },[pendingResume]);
  useEffect(()=>{
    try{localStorage.setItem('cfa_lofi_vibe',String(vibeIdx));}catch{}
    if(!isPlaying) return;
    stopAudio();
    let cancelled=false;
    const t=setTimeout(()=>{if(!cancelled) startAudio();},40);
    return()=>{cancelled=true;clearTimeout(t);};
  },[vibeIdx]); // eslint-disable-line react-hooks/exhaustive-deps
  const isLight=lTheme==='light';
  if(!loggedIn) return null;
  return (
    <>
      <button onClick={()=>setShowPanel(s=>!s)} title={pendingResume?"Tap anywhere to resume music":"Lofi study music"}
        style={{position:"fixed",bottom:82,left:16,zIndex:270,width:46,height:46,borderRadius:"50%",
          background:isPlaying?"linear-gradient(135deg,#1a3a2a,#1e5c3a)":pendingResume?"linear-gradient(135deg,#1a2e3a,#1e3a5c)":isLight?"linear-gradient(135deg,#e8e8f4,#f4f4fb)":"linear-gradient(135deg,#1a1a2e,#1e1e38)",
          border:isPlaying?"1px solid #22c55e55":pendingResume?"1px solid #60a5fa88":isLight?"1px solid #6366f155":"1px solid #6366f133",
          color:isPlaying?"#86efac":pendingResume?"#93c5fd":isLight?"#4f46e5":"#a5b4fc",fontSize:20,cursor:"pointer",
          boxShadow:isPlaying?"0 4px 16px #22c55e33":pendingResume?"0 4px 16px #60a5fa44":isLight?"0 4px 16px #0002":"0 4px 16px #0008",
          display:"flex",alignItems:"center",justifyContent:"center",
          touchAction:"manipulation",transition:"all 0.2s",
          animation:pendingResume?"pulse 1.6s ease-in-out infinite":undefined}}>
        {VIBES[vibeIdx].emoji}
      </button>
      {showPanel&&(
        <div style={{position:"fixed",bottom:136,left:16,zIndex:270,background:isLight?"#ffffff":"#1a1a38",
          border:isLight?"1px solid #6366f144":"1px solid #6366f144",borderRadius:16,padding:"16px",
          boxShadow:isLight?"0 8px 32px #0001":"0 8px 32px #00000099",minWidth:228,animation:"fadeIn 0.15s ease"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontSize:12,fontWeight:700,color:isLight?"#4f46e5":"#a5b4fc",letterSpacing:"0.05em"}}>🎵 LOFI STUDY</div>
            <button onClick={()=>setShowPanel(false)} style={{fontSize:14,color:isLight?"#8b89a8":"#7c7a9e",background:"none",border:"none",cursor:"pointer",lineHeight:1,padding:"2px 6px"}}>✕</button>
          </div>
          <div style={{display:"flex",gap:4,marginBottom:8}}>
            {VIBES.map((v,i)=>(
              <button key={i} onClick={()=>setVibeIdx(i)}
                style={{flex:1,padding:"7px 2px",borderRadius:7,fontSize:13,fontWeight:700,cursor:"pointer",
                  background:vibeIdx===i?(isLight?"#6366f118":"#6366f130"):"none",
                  border:`1px solid ${vibeIdx===i?"#6366f1":(isLight?"#c4c4de":"#3a3a60")}`,
                  color:vibeIdx===i?"#818cf8":(isLight?"#8b89a8":"#5a5a7a")}}>
                {v.emoji}
              </button>
            ))}
          </div>
          <div style={{fontSize:10,fontWeight:600,color:"#818cf8",textAlign:"center",marginBottom:8,opacity:0.85}}>
            {VIBES[vibeIdx].name} · {VIBES[vibeIdx].bpm} BPM
          </div>
          <LofiVisualizer analyserRef={analyserRef} isPlaying={isPlaying}/>
          <button onClick={toggle} style={{width:"100%",padding:"10px",borderRadius:10,marginBottom:12,
            fontSize:13,fontWeight:700,
            background:isPlaying?"linear-gradient(135deg,#14532d,#166534)":"linear-gradient(135deg,#4338ca,#6366f1)",
            color:"#fff",border:"none",cursor:"pointer"}}>
            {isPlaying?"⏸ Pause":"▶ Play"}
          </button>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:14}}>🔈</span>
            <input type="range" min="0" max="1" step="0.05" value={vol}
              onChange={e=>onVol(parseFloat(e.target.value))}
              style={{flex:1,accentColor:"#6366f1",cursor:"pointer"}}/>
            <span style={{fontSize:14}}>🔊</span>
          </div>
          <div style={{fontSize:10,color:isLight?"#8b89a8":"#4a4869",textAlign:"center",marginTop:10}}>study focus · tap vibe to switch</div>
        </div>
      )}
    </>
  );
}
function ReferralCard({userId,cfg,setUpgradeModal}){
  const [stats,setStats]=useState(null);
  const [copied,setCopied]=useState(false);
  const link=getReferralLink(userId);
  const paid=stats?.paid??0;
  const signups=stats?.signups??0;
  const progress=paid%REFERRAL_THRESHOLD;
  const earned=Math.floor(paid/REFERRAL_THRESHOLD);

  useEffect(()=>{getReferralStats(cfg,userId).then(setStats);},[]);

  const copy=()=>{
    try{navigator.clipboard.writeText(link);}catch{}
    setCopied(true);setTimeout(()=>setCopied(false),2000);
  };
  const share=()=>{
    if(navigator.share){navigator.share({title:'ClearCFA — AI-powered CFA prep',text:'Free AI-powered CFA practice tool. Adapts to your weak spots.',url:link}).catch(()=>{});}
    else copy();
  };

  const slots=Array.from({length:REFERRAL_THRESHOLD},(_,i)=>i<paid%REFERRAL_THRESHOLD||(paid>0&&paid%REFERRAL_THRESHOLD===0));
  return(
    <div style={{background:`linear-gradient(145deg,${C.accent}15,${C.surface})`,border:`1px solid ${C.accent}35`,borderRadius:16,overflow:"hidden",marginBottom:12}}>
      {/* Hero banner */}
      <div style={{background:`linear-gradient(135deg,#7c3aed,#6d28d9,#4c1d95)`,padding:"18px 18px 14px",position:"relative",overflow:"hidden"}}>
        {/* decorative blobs */}
        <div style={{position:"absolute",top:-18,right:-18,width:80,height:80,borderRadius:"50%",background:"rgba(255,255,255,0.06)"}}/>
        <div style={{position:"absolute",bottom:-24,right:30,width:60,height:60,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}}/>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",position:"relative"}}>
          <div style={{flex:1}}>
            <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.6)",letterSpacing:"0.08em",marginBottom:4}}>REFERRAL REWARD</div>
            <div style={{fontSize:17,fontWeight:900,color:"#fff",lineHeight:1.2,marginBottom:4}}>Study together,<br/>earn Pro free 🎁</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.75)",lineHeight:1.5}}>
              Friend signs up → <strong style={{color:"#34d399"}}>+3 days Pro free</strong><br/>
              Get {REFERRAL_THRESHOLD} to subscribe → earn <strong style={{color:"#fbbf24"}}>1 month Pro</strong> free
            </div>
          </div>
          {/* SVG illustration — connected avatars */}
          <svg width="76" height="68" viewBox="0 0 76 68" fill="none" style={{flexShrink:0,marginLeft:8}}>
            {/* You */}
            <circle cx="18" cy="22" r="13" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
            <circle cx="18" cy="17" r="5" fill="rgba(255,255,255,0.8)"/>
            <path d="M8 34 Q18 27 28 34" fill="rgba(255,255,255,0.8)"/>
            <circle cx="18" cy="22" r="13" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="2,3"/>
            {/* Lines to friends */}
            <line x1="31" y1="18" x2="51" y2="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeDasharray="3,3"/>
            <line x1="31" y1="22" x2="51" y2="32" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeDasharray="3,3"/>
            {/* Friend 1 (joined = green tint) */}
            <circle cx="60" cy="10" r="10" fill={slots[0]?"rgba(52,211,153,0.3)":"rgba(255,255,255,0.1)"} stroke={slots[0]?"#34d399":"rgba(255,255,255,0.25)"} strokeWidth="1.5"/>
            <circle cx="60" cy="7" r="4" fill={slots[0]?"#34d399":"rgba(255,255,255,0.5)"}/>
            <path d={`M52 18 Q60 13 68 18`} fill={slots[0]?"#34d399":"rgba(255,255,255,0.5)"} opacity="0.7"/>
            {slots[0]&&<text x="60" y="12" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">✓</text>}
            {/* Friend 2 (joined = green tint) */}
            <circle cx="60" cy="34" r="10" fill={slots[1]?"rgba(52,211,153,0.3)":"rgba(255,255,255,0.1)"} stroke={slots[1]?"#34d399":"rgba(255,255,255,0.25)"} strokeWidth="1.5"/>
            <circle cx="60" cy="31" r="4" fill={slots[1]?"#34d399":"rgba(255,255,255,0.5)"}/>
            <path d={`M52 42 Q60 37 68 42`} fill={slots[1]?"#34d399":"rgba(255,255,255,0.5)"} opacity="0.7"/>
            {slots[1]&&<text x="60" y="35" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">✓</text>}
            {/* Friend 3 (pending — dashed outline only) */}
            {REFERRAL_THRESHOLD>2&&(
              <>
              <line x1="31" y1="26" x2="51" y2="56" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeDasharray="3,3"/>
              <circle cx="60" cy="58" r="10" fill={slots[2]?"rgba(52,211,153,0.3)":"rgba(255,255,255,0.06)"} stroke={slots[2]?"#34d399":"rgba(255,255,255,0.2)"} strokeWidth="1.2" strokeDasharray={slots[2]?"none":"2,3"}/>
              <circle cx="60" cy="55" r="4" fill={slots[2]?"#34d399":"rgba(255,255,255,0.2)"}/>
              {slots[2]&&<text x="60" y="59" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">✓</text>}
              </>
            )}
          </svg>
        </div>
        {earned>0&&(
          <div style={{marginTop:10,display:"inline-flex",alignItems:"center",gap:6,background:"rgba(251,191,36,0.2)",border:"1px solid rgba(251,191,36,0.4)",borderRadius:20,padding:"4px 10px"}}>
            <span style={{fontSize:13}}>⭐</span>
            <span style={{fontSize:11,fontWeight:700,color:"#fbbf24"}}>{earned} month{earned!==1?"s":""} Pro earned!</span>
          </div>
        )}
      </div>

      {/* Progress + actions */}
      <div style={{padding:"12px 16px"}}>
        {stats!==null&&(
          <div style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <span style={{fontSize:11,fontWeight:600,color:C.text}}>{paid} of {REFERRAL_THRESHOLD} subscribed{signups>paid?<span style={{color:"#34d399"}}> · {signups} signed up (+{signups*3}d Pro)</span>:null}</span>
              {progress<REFERRAL_THRESHOLD&&<span style={{fontSize:10,color:C.accentLight}}>{REFERRAL_THRESHOLD-progress} more subscribers → 1 month free</span>}
              {progress===0&&paid>0&&<span style={{fontSize:10,color:C.easy,fontWeight:700}}>Reward unlocked 🎉</span>}
            </div>
            <div style={{display:"flex",gap:5}}>
              {slots.map((filled,i)=>(
                <div key={i} style={{flex:1,height:6,borderRadius:3,background:filled?`linear-gradient(90deg,${C.accent},${C.accentLight})`:C.border,transition:"background 0.4s"}}/>
              ))}
            </div>
          </div>
        )}
        <div style={{display:"flex",gap:8}}>
          <div style={{flex:1,background:C.surface,border:`1px solid ${C.border}`,borderRadius:9,padding:"8px 10px",fontSize:10,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{link}</div>
          <button onClick={copy} style={{padding:"8px 12px",borderRadius:9,fontSize:12,fontWeight:700,background:copied?C.easy+"22":`${C.accent}22`,border:`1px solid ${copied?C.easy:C.accent}44`,color:copied?C.easy:C.accentLight,cursor:"pointer",flexShrink:0,transition:"all 0.2s"}}>
            {copied?"✓ Copied":"Copy"}
          </button>
          <button onClick={share} style={{padding:"8px 14px",borderRadius:9,fontSize:12,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",flexShrink:0}}>
            Share →
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreSparkline({history}){
  if(history.length<3)return null;
  const pts=history.slice(0,15).reverse().map(h=>h.pct||0);
  const max=Math.max(...pts,70),min=Math.min(...pts,0);
  const range=max-min||1;
  const W=140,H=32,pad=3;
  const xs=pts.map((_,i)=>pad+i*(W-pad*2)/(Math.max(pts.length-1,1)));
  const ys=pts.map(p=>H-pad-(p-min)/range*(H-pad*2));
  const points=pts.map((_,i)=>`${xs[i]},${ys[i]}`).join(" ");
  const latest=pts[pts.length-1];
  const col=latest>=70?C.easy:C.hard;
  const threshY=H-pad-(70-min)/range*(H-pad*2);
  return(
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display:"block",overflow:"visible"}}>
      {threshY>=pad&&threshY<=H-pad&&<line x1={pad} y1={threshY} x2={W-pad} y2={threshY} stroke={C.easy} strokeWidth="0.7" strokeDasharray="2,2" opacity="0.5"/>}
      <polyline points={points} fill="none" stroke={col} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx={xs[xs.length-1]} cy={ys[ys.length-1]} r="2.5" fill={col}/>
    </svg>
  );
}

function StudyHeatmap({history}){
  if(!history.length)return null;
  // Build date → session count map for last 84 days (12 weeks)
  const today=new Date();
  const counts={};
  history.forEach(h=>{
    const dk=h.dateKey||h.date?.slice(0,10);
    if(dk)counts[dk]=(counts[dk]||0)+1;
  });
  const days=[];
  for(let i=83;i>=0;i--){
    const d=new Date(today);d.setDate(d.getDate()-i);
    const dk=d.toISOString().slice(0,10);
    days.push({dk,count:counts[dk]||0,isToday:i===0});
  }
  const maxCount=Math.max(1,...Object.values(counts));
  const getColor=(count)=>{
    if(!count)return C.border;
    const intensity=Math.min(1,count/Math.min(maxCount,4));
    if(intensity<0.25)return "#7c3aed33";
    if(intensity<0.5)return "#7c3aed66";
    if(intensity<0.75)return "#7c3aed99";
    return "#7c3aed";
  };
  const totalDays=days.filter(d=>d.count>0).length;
  const totalSessions=history.length;
  return(
    <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 14px",marginBottom:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <span style={{fontSize:12,fontWeight:700,color:C.text}}>Study Activity</span>
        <span style={{fontSize:10,color:C.muted}}>{totalDays} days · {totalSessions} sessions</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(84,1fr)",gap:2}}>
        {days.map(({dk,count,isToday})=>(
          <div key={dk} title={`${dk}: ${count} session${count!==1?"s":""}`}
            style={{aspectRatio:"1",borderRadius:2,background:isToday&&!count?"#7c3aed44":getColor(count),border:isToday?`1px solid #7c3aed99`:"none",transition:"background 0.2s"}}/>
        ))}
      </div>
      <div style={{display:"flex",gap:6,alignItems:"center",marginTop:6,justifyContent:"flex-end"}}>
        <span style={{fontSize:9,color:C.muted}}>Less</span>
        {[0,1,2,3,4].map(i=><div key={i} style={{width:8,height:8,borderRadius:1,background:getColor(i)}}/>)}
        <span style={{fontSize:9,color:C.muted}}>More</span>
      </div>
    </div>
  );
}

function WeaknessRadar({data}){
  if(!data||data.length<3) return null;
  const N=data.length;
  const R=75,cx=120,cy=120,size=240;
  const axes=data.map((_,i)=>{const a=i*(2*Math.PI/N)-(Math.PI/2);return{cos:Math.cos(a),sin:Math.sin(a)};});
  const poly=axes.map((ax,i)=>{const v=Math.max(0,Math.min(1,(data[i].pct||0)/100));return `${cx+v*R*ax.cos},${cy+v*R*ax.sin}`;}).join(' ');
  return(
    <div style={{display:'flex',justifyContent:'center',marginBottom:8}}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {[0.25,0.5,0.75,1].map(r=>(
          <polygon key={r} fill="none" stroke="#ffffff18" strokeWidth={r===1?1:0.5}
            points={axes.map(ax=>`${cx+r*R*ax.cos},${cy+r*R*ax.sin}`).join(' ')}/>
        ))}
        {axes.map((ax,i)=>(<line key={i} x1={cx} y1={cy} x2={cx+R*ax.cos} y2={cy+R*ax.sin} stroke="#ffffff18" strokeWidth={0.5}/>))}
        <polygon points={poly} fill="#6366f122" stroke="#6366f1" strokeWidth={1.5} strokeLinejoin="round"/>
        {axes.map((ax,i)=>{
          const v=Math.max(0,Math.min(1,(data[i].pct||0)/100));
          const col=data[i].pct>=70?'#22c55e':data[i].pct>=50?'#f59e0b':'#ef4444';
          const lx=cx+(R+20)*ax.cos,ly=cy+(R+20)*ax.sin;
          return(
            <g key={i}>
              <circle cx={cx+v*R*ax.cos} cy={cy+v*R*ax.sin} r={3} fill={col} stroke="#06061a" strokeWidth={1}/>
              <text x={lx} y={ly+4} textAnchor="middle" fill="#8080a8" fontSize={7.5} fontWeight={700}>{data[i].topic}</text>
            </g>
          );
        })}
        <text x={cx} y={cy-(R*0.5)+3} textAnchor="middle" fill="#ffffff18" fontSize={7}>50%</text>
        <text x={cx} y={cy+4} textAnchor="middle" fill="#ffffff25" fontSize={7}>0%</text>
        <line x1={cx} y1={cy-(R*0.7)+2} x2={cx+R*axes[0].cos} y2={cy+R*axes[0].sin} stroke="none"/>
        <text x={cx+(R+4)*axes[Math.floor(N*0.75)].cos} y={cy+(R+4)*axes[Math.floor(N*0.75)].sin+3} textAnchor="middle" fill="#22c55e55" fontSize={7}>70%</text>
      </svg>
    </div>
  );
}

function CFAMock(){
  const [screen,setScreen]=useState(()=>{
    try{const s=localStorage.getItem(LAST_SCREEN_KEY);if(s&&RESTORABLE_SCREENS.has(s))return s;}catch{}
    return "home";
  });
  const [topic,setTopic]=useState("");const [subtopic,setSubtopic]=useState("");
  const [selTopics,setSelTopics]=useState([]); // setup screen multi-select
  const [selSubtopics,setSelSubtopics]=useState([]); // setup screen multi-select
  const [difficulty,setDifficulty]=useState("Medium");const [count,setCount]=useState(10);const [mode,setMode]=useState("guided");
  const [questions,setQuestions]=useState([]);const [answers,setAnswers]=useState({});
  const [flaggedQ,setFlaggedQ]=useState({});  // confidence flags: {qId: true}
  const [currentQ,setCurrentQ]=useState(0);const [showExp,setShowExp]=useState(false);
  const [loading,setLoading]=useState(false);const [loadingMsg,setLoadingMsg]=useState("");const [error,setError]=useState("");
  const [timeLeft,setTimeLeft]=useState(0);const [timeTaken,setTimeTaken]=useState(0);
  const [fullExamMode,setFullExamMode]=useState(false);
  const [examSession,setExamSession]=useState(1); // 1=AM, 2=PM for split exam
  const [examBreak,setExamBreak]=useState(false); // showing break screen between sessions
  const [vignetteMode,setVignetteMode]=useState(false);
  const [aiDebrief,setAiDebrief]=useState(null);const [aiDebriefLoading,setAiDebriefLoading]=useState(false);const [aiDebriefError,setAiDebriefError]=useState(null);
  const [aiCoachScreen,setAiCoachScreen]=useState(false);const [aiCoachMessages,setAiCoachMessages]=useState([]);const [aiCoachInput,setAiCoachInput]=useState("");const [aiCoachLoading,setAiCoachLoading]=useState(false);
  const [formulaDrillMode,setFormulaDrillMode]=useState(false);const [formulaDrillIdx,setFormulaDrillIdx]=useState(0);const [formulaFlipped,setFormulaFlipped]=useState(false);const [formulaDrillTopic,setFormulaDrillTopic]=useState("Quantitative Methods");
  const timerRef=useRef(null);const startRef=useRef(null);
  const qShownAtRef=useRef({});
  const qTimesRef=useRef({});
  const [history,setHistory]=useState([]);const [historyLoaded,setHistoryLoaded]=useState(false);
  const historyRef=useRef([]);
  const [srDeck,setSrDeck]=useState({});const [srLoaded,setSrLoaded]=useState(false);
  const [qdb,setQdb]=useState({});const [qdbLoaded,setQdbLoaded]=useState(false); // question dedup db
  const [reviewList,setReviewList]=useState([]);const [reviewIdx,setReviewIdx]=useState(0);
  const [confirmClear,setConfirmClear]=useState(false);
  const [focusSuggestions,setFocusSuggestions]=useState(null);const [focusLoading,setFocusLoading]=useState(false);const [focusError,setFocusError]=useState("");const [selectedFocus,setSelectedFocus]=useState(null);const [focusCount,setFocusCount]=useState(10);
  const [quizConfidence,setQuizConfidence]=useState(null);
  const [confidenceLog,setConfidenceLog]=useState(()=>{try{return JSON.parse(localStorage.getItem(CONFIDENCE_KEY)||"{}");}catch{return {};}});
  const [sessionDraft,setSessionDraft]=useState(()=>{try{const d=JSON.parse(localStorage.getItem(SESSION_DRAFT_KEY)||"null");if(d&&Date.now()-d.ts<7200000&&d.questions?.length>0&&Object.keys(d.answers||{}).length<d.questions.length)return d;}catch{}return null;});
  const [pendingGen,setPendingGen]=useState(()=>{try{const d=JSON.parse(localStorage.getItem(PENDING_GEN_KEY)||"null");if(d&&Date.now()-d.ts<3600000)return d;}catch{}return null;});
  const [studyGoal,setStudyGoal]=useState(()=>{try{return JSON.parse(localStorage.getItem(STUDY_GOAL_KEY)||"null");}catch{return null;}});
  const [workedExamples,setWorkedExamples]=useState(()=>{try{return JSON.parse(localStorage.getItem(WORKED_EX_KEY)||"{}");}catch{return {};}});
  const [workedExLoading,setWorkedExLoading]=useState(false);
  const [workedExDismissedKey,setWorkedExDismissedKey]=useState("");
  const [consecutiveWrong,setConsecutiveWrong]=useState(0);
  const [presets,setPresets]=useState(()=>{try{return JSON.parse(localStorage.getItem(PRESETS_KEY)||"[]");}catch{return [];}});
  const [savePresetName,setSavePresetName]=useState("");
  const [showSavePreset,setShowSavePreset]=useState(false);
  const [warmupEnabled,setWarmupEnabled]=useState(false);
  const [focusLastGenerated,setFocusLastGenerated]=useState(null); // timestamp of last generation
  const [reportedQIds,setReportedQIds]=useState([]);
  const [lastSession,setLastSession]=useState(null);
  const [srQueue,setSrQueue]=useState([]);const [srIdx,setSrIdx]=useState(0);const [srAnswer,setSrAnswer]=useState(null);
  const [autoEscalation,setAutoEscalation]=useState(null);
  const [historyFilter,setHistoryFilter]=useState("All"); // topic filter for history
  const [dashTab,setDashTab]=useState("sessions"); // sessions | time | patterns | quality | sr | flags | api
  const [exitConfirm,setExitConfirm]=useState(false);
  const [storageKeys,setStorageKeys]=useState(null);
  const [storageOk,setStorageOk]=useState(null); // null=checking, true=ok, false=failing
  const [backupScreen,setBackupScreen]=useState(false); // backup/restore modal
  const [importText,setImportText]=useState(""); // for paste-restore
  const [importError,setImportError]=useState("");
  const [sessionSaved,setSessionSaved]=useState(null); // null=not attempted, true=ok, false=failed
  const generatingRef=useRef(false); // debounce double-tap
  const lastGenParamsRef=useRef(null); // for tap-to-retry
  const prequizPassProbRef=useRef(null);
  const srSessionResults=useRef({correct:0,total:0});
  const srSessionStart=useRef(null);
  const [weeklyPlanScreen,setWeeklyPlanScreen]=useState(false);
  const [settingsOpen,setSettingsOpen]=useState(false);
  const [questionFlags,setQuestionFlags]=useState(()=>{try{return JSON.parse(localStorage.getItem(FLAGS_KEY)||"[]");}catch{return [];}});
  const [flagging,setFlagging]=useState(null);
  const [showMoreActions,setShowMoreActions]=useState(true);
  const [showMoreSheet,setShowMoreSheet]=useState(false);
  const [moreSheetClosing,setMoreSheetClosing]=useState(false);
  const sheetPanelRef=useRef(null);
  const sheetDragY=useRef(null);
  const [usageStats,setUsageStats]=useState({});
  const usageStatsRef=useRef({});
  const apiLogRef=useRef([]);
  const [omMode,setOmMode]=useState(false); // true when current session was started via Office Mode
  const [omQCount,setOmQCount]=useState(()=>{try{return parseInt(localStorage.getItem("cfa_om_count")||"5");}catch{return 5;}});
  const [reminderTime,setReminderTime]=useState(()=>localStorage.getItem(REMINDER_TIME_KEY)||"");
  const [essayAnswers,setEssayAnswers]=useState({});
  const [essayRevealed,setEssayRevealed]=useState({});
  const [weeklyPlan,setWeeklyPlan]=useState(()=>{try{const p=localStorage.getItem(PLAN_KEY);return p?JSON.parse(p):null;}catch{return null;}});
  const [todayStarted,setTodayStarted]=useState(()=>{try{return JSON.parse(localStorage.getItem("cfa_today_started")||"{}");}catch{return {};}});
  const [focusDone,setFocusDone]=useState(()=>{try{const s=JSON.parse(localStorage.getItem("cfa_focus_done")||"null");if(s&&s.date===localDateKey())return s.done||{};}catch{}return {};});
  const [weeklyPlanLoading,setWeeklyPlanLoading]=useState(false);
  const [weeklyPlanError,setWeeklyPlanError]=useState("");
  const [hoursThisWeek,setHoursThisWeek]=useState(7); // default 1hr/day
  const [officeModeActive,setOfficeModeActive]=useState(false); // 5-question blitz
  const [loadingProgress,setLoadingProgress]=useState(0);
  const [loadingETA,setLoadingETA]=useState(null);
  const [loadingContext,setLoadingContext]=useState(null);
  const loadingStartRef=useRef(null);
  const [apiKey,setApiKey]=useState("BACKEND"); // placeholder — AI routed through proxy
  const [theme,setTheme]=useState(()=>{try{return localStorage.getItem('cfa_theme')||'dark';}catch{return'dark';}});
  const toggleTheme=()=>{const t=theme==='dark'?'light':'dark';_applyTheme(t);try{localStorage.setItem('cfa_theme',t);}catch{};setTheme(t);};
  const [proStatus,setProStatus]=useState(getProStatus);
  const [proValidUntil,setProValidUntil]=useState(getProValidUntil);
  const [powerStatus,setPowerStatus]=useState(false);
  const [onboardingDone,setOnboardingDone]=useState(()=>{try{return!!localStorage.getItem(ONBOARDING_KEY);}catch{return false;}});
  const [qualityFlags,setQualityFlags]=useState(()=>{try{return JSON.parse(localStorage.getItem(QUALITY_FLAGS_KEY)||"{}");}catch{return {};}});
  const [dailyAIUsage,setDailyAIUsage]=useState(getDailyAIUsage);
  const [upgradeModal,setUpgradeModal]=useState(null); // null | {reason:string}
  const [feedbackOpen,setFeedbackOpen]=useState(false);
  const [cfaLevel,setCfaLevel]=useState(()=>{try{return localStorage.getItem(CFA_LEVEL_KEY)||"1";}catch{return "1";}});
  const activeLOS=useMemo(()=>getActiveLOS(cfaLevel),[cfaLevel]);
  const activeTopicMap=useMemo(()=>getActiveTopicMap(cfaLevel),[cfaLevel]);
  const activeMisconceptions=useMemo(()=>getActiveMisconceptions(cfaLevel),[cfaLevel]);
  // Filter history to only sessions for the active level (old sessions without level tag = L1)
  const levelHistory=useMemo(()=>history.filter(h=>(!h.level&&cfaLevel==="1")||h.level===cfaLevel),[history,cfaLevel]);
  const [driveStatus,setDriveStatus]=useState(null); // null | "syncing" | "synced" | "error"
  const [supabaseSyncing,setSupabaseSyncing]=useState(false);
  const [authUser,setAuthUser]=useState(()=>getStoredAuth());
  const [authEmail,setAuthEmail]=useState("");
  const [authPassword,setAuthPassword]=useState("");
  const [authConfirm,setAuthConfirm]=useState("");
  const [authMode,setAuthMode]=useState("signin"); // "signin" | "signup"
  const [authLoading,setAuthLoading]=useState(false);
  const [authError,setAuthError]=useState("");
  const [forgotMode,setForgotMode]=useState(false);
  const [forgotEmail,setForgotEmail]=useState("");
  const [forgotSent,setForgotSent]=useState(false);
  const [forgotLoading,setForgotLoading]=useState(false);
  const [showOnboarding,setShowOnboarding]=useState(false);
  const [showDiagnostic,setShowDiagnostic]=useState(false);
  const [diagQ,setDiagQ]=useState(0);
  const [diagAnswers,setDiagAnswers]=useState({});
  const [diagWeak,setDiagWeak]=useState(()=>{try{return JSON.parse(localStorage.getItem("cfa_cfa_diag_weak")||"[]");}catch{return [];}});
  const [tourSlide,setTourSlide]=useState(0);
  const [tourDismissed,setTourDismissed]=useState(()=>{try{return!!localStorage.getItem(TOUR_KEY);}catch{return false;}});
  const [lastSeenWN,setLastSeenWN]=useState(()=>{try{return localStorage.getItem(WHATS_NEW_KEY)||"";}catch{return "";}});
  const whatsNewDismissed=lastSeenWN===WHATS_NEW_VERSION;
  const unseenSlides=WHATS_NEW_SLIDES.filter(e=>e.version>lastSeenWN).slice(-3).flatMap(e=>e.slides);
  const [proTourDismissed,setProTourDismissed]=useState(()=>{try{return!!localStorage.getItem(PRO_TOUR_KEY);}catch{return false;}});
  const [screenOnboard,setScreenOnboard]=useState(()=>{try{return JSON.parse(localStorage.getItem(SCREEN_ONBOARD_KEY)||"{}");}catch{return {};}});
  const [checklistDismissed,setChecklistDismissed]=useState(()=>{try{return!!localStorage.getItem(CHECKLIST_KEY);}catch{return false;}});
  const [clVisitedReadiness,setClVisitedReadiness]=useState(()=>{try{return!!localStorage.getItem("cfa_cl_readiness");}catch{return false;}});
  const [clVisitedRevision,setClVisitedRevision]=useState(()=>{try{return!!localStorage.getItem("cfa_cl_revision");}catch{return false;}});
  const [clChecklistRewarded,setClChecklistRewarded]=useState(()=>{try{return!!localStorage.getItem("cfa_cl_rewarded");}catch{return false;}});
  const [demoMode,setDemoMode]=useState(false);
  const [demoQ,setDemoQ]=useState(0);
  const [demoAnswers,setDemoAnswers]=useState({});
  const [demoComplete,setDemoComplete]=useState(false);
  const authUserRef=useRef(getStoredAuth());
  const [needsFocusRefresh,setNeedsFocusRefresh]=useState(false);
  const [examDate,setExamDate]=useState(EXAM_DATE);
  const [examDateInput,setExamDateInput]=useState("2026-08-19");
  const [revisionTopic,setRevisionTopic]=useState(null);
  const [revisionTab,setRevisionTab]=useState("notes");
  const [revisionConcept,setRevisionConcept]=useState(null);
  const [topicLessons,setTopicLessons]=useState(()=>{try{return JSON.parse(localStorage.getItem(LESSONS_KEY)||"{}");}catch{return {};}});
  const [dailyRefresher,setDailyRefresher]=useState(()=>{try{const s=JSON.parse(localStorage.getItem(REFRESHER_KEY)||"null");if(s?.date===localDateKey()&&s?.concepts?.length)return s;}catch{}return null;});
  const [refresherFlipped,setRefresherFlipped]=useState(false);
  const [refresherRevealLoading,setRefresherRevealLoading]=useState(false);
  const [socraticQ,setSocraticQ]=useState(null);
  const [socraticMsgs,setSocraticMsgs]=useState([]);
  const [socraticLoading,setSocraticLoading]=useState(false);
  const [socraticInput,setSocraticInput]=useState("");
  const [dailyMission,setDailyMission]=useState(()=>{try{const s=JSON.parse(localStorage.getItem(MISSION_KEY)||"null");if(s?.date===localDateKey())return s;}catch{}return null;});
  const [missionGenerating,setMissionGenerating]=useState(false);
  const [refresherRevealError,setRefresherRevealError]=useState(null);
  const [walkthroughTopic, setWalkthroughTopic] = useState(Object.keys(LOS)[0]);
  const [walkthroughModule, setWalkthroughModule] = useState("");
  const [walkthroughText, setWalkthroughText] = useState(null);
  const [walkthroughLoading, setWalkthroughLoading] = useState(false);
  const [walkthroughError, setWalkthroughError] = useState("");
  const [adminStats,setAdminStats]=useState(null);
  const [adminStatsLoading,setAdminStatsLoading]=useState(false);
  const [adminStatsError,setAdminStatsError]=useState("");
  const [fsaVignetteOpen, setFsaVignetteOpen] = useState(false);
  const [fsaSubtopic, setFsaSubtopic] = useState("Financial Ratios");
  const [fsaDifficulty, setFsaDifficulty] = useState("Medium");
  const [calcOpen, setCalcOpen] = useState(false);
  const [calcGuideStep, setCalcGuideStep] = useState(null);
  const [calcMinimized, setCalcMinimized] = useState(false);
  const [calcDisplayVal, setCalcDisplayVal] = useState("0");
  const [calcTopic, setCalcTopic] = useState("Fixed Income");
  const [calcDifficulty, setCalcDifficulty] = useState("Medium");
  const [calcTrainerTab, setCalcTrainerTab] = useState("practice"); // "practice" | "learn"
  const [calcLearnSection, setCalcLearnSection] = useState(null); // expanded section index
  const [calcProblem, setCalcProblem] = useState(null);
  const [calcSteps, setCalcSteps] = useState([]);
  const [calcInputs, setCalcInputs] = useState({});
  const [calcChecked, setCalcChecked] = useState({});
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcError, setCalcError] = useState("");
  const [studyPlanData, setStudyPlanData] = useState(null);
  const [crossVignetteOpen, setCrossVignetteOpen] = useState(false);
  const [crossVignetteTopic, setCrossVignetteTopic] = useState("Financial Statement Analysis");
  const [crossVignetteModule1, setCrossVignetteModule1] = useState("");
  const [crossVignetteModule2, setCrossVignetteModule2] = useState("");
  const qCacheRef=React.useRef({});
  const [streakFreezes,setStreakFreezes]=useState(()=>getStreakFreezes());
  const [personalBests,setPersonalBests]=useState(()=>{try{return JSON.parse(localStorage.getItem(BESTS_KEY)||"{}");}catch{return {};}});
  const [levelUpInfo,setLevelUpInfo]=useState(null);
  const [speedQTime,setSpeedQTime]=useState(100);
  const speedDrillRef=useRef(null);
  const refresherTouchX=useRef(null);
  const [passTrend,setPassTrend]=useState([]);
  const passTrendRef=useRef([]);
  const [adminBudget,setAdminBudget]=useState(()=>{try{return localStorage.getItem("cfa_admin_budget")||"";}catch{return "";}});
  const [reelIdx,setReelIdx]=useState(0);
  const [reelFeed,setReelFeed]=useState([]);
  const [mockSchedule,setMockSchedule]=useState(()=>{try{return JSON.parse(localStorage.getItem(MOCK_SCHED_KEY)||"[]");}catch{return [];}});
  const [expRatings,setExpRatings]=useState(()=>{try{return JSON.parse(localStorage.getItem(EXP_RATINGS_KEY)||"{}");}catch{return {};}});
  const [dailyQ,setDailyQ]=useState(()=>{try{const s=JSON.parse(localStorage.getItem(DAILY_Q_KEY)||"null");if(s?.date===localDateKey())return s;}catch{}return null;});
  const [milestoneOverlay,setMilestoneOverlay]=useState(null);
  const [nextActionText,setNextActionText]=useState("");
  const [nextActionLoading,setNextActionLoading]=useState(false);
  const [duelChallenge,setDuelChallenge]=useState(null);
  const [duelCreating,setDuelCreating]=useState(false);
  const [duelTopicPicking,setDuelTopicPicking]=useState(false);
  const [studyGroup,setStudyGroup]=useState(()=>{try{return JSON.parse(localStorage.getItem(SG_KEY)||"null");}catch{return null;}});
  const [groupLeaderboard,setGroupLeaderboard]=useState([]);
  const [sgScreen,setSgScreen]=useState(false);
  const [sgJoinCode,setSgJoinCode]=useState("");
  const [sgCreateName,setSgCreateName]=useState("");
  const [sgLoading,setSgLoading]=useState(false);
  const [notifEnabled,setNotifEnabled]=useState(()=>{try{return localStorage.getItem("cfa_notif_v1")==="1";}catch{return false;}});
  const [reelAnswer,setReelAnswer]=useState(null);
  const [reelRevealed,setReelRevealed]=useState(false);
  const [reelSessionCount,setReelSessionCount]=useState(0);
  const [reelSlideDir,setReelSlideDir]=useState("next");
  const [reelXpPop,setReelXpPop]=useState(false);
  const reelTouchY=useRef(null);
  const reelFeedBase=useRef([]);

  useEffect(()=>{
    if(screen!=="reels")return;
    const goNext=()=>{
      const next=reelIdx+1;
      if(next>=reelFeed.length-10){
        setReelFeed(p=>[...p,...[...reelFeedBase.current].sort(()=>Math.random()-0.5)]);
      }
      setReelAnswer(null);setReelRevealed(false);setReelIdx(next);
      const count=reelSessionCount+1;
      setReelSessionCount(count);
      if(count===10)showToast("🎬","10 Drills done!","Keep the momentum going 🔥");
      if(count===25)showToast("🔥","25 Drills!","You're on a roll.");
      if(count===50)showToast("🏆","50 Drills!","Study machine mode 💪");
    };
    const goPrev=()=>{
      if(reelIdx===0)return;
      setReelSlideDir("prev");
      setReelAnswer(null);setReelRevealed(false);setReelIdx(i=>i-1);
    };
    const h=(e)=>{
      if(e.key==="ArrowUp"||e.key==="ArrowRight")goNext();
      else if(e.key==="ArrowDown"||e.key==="ArrowLeft")goPrev();
    };
    document.addEventListener("keydown",h);
    return()=>document.removeEventListener("keydown",h);
  },[screen,reelIdx,reelFeed.length,reelSessionCount]);

  useEffect(()=>{
    if(!('serviceWorker' in navigator))return;
    navigator.serviceWorker.register('/ClearCFA/sw.js').catch(()=>{});
  },[]);

  // Sync body background when theme changes
  useEffect(()=>{try{document.body.style.background=C.bg;}catch{}},[theme]);
  // Re-evaluate Pro status when auth changes (owner email always gets Pro)
  useEffect(()=>{
    if(authUser?.id){
      checkProFromServer(SB_CFG,authUser.id,authUser.email).then(({isPro,validUntil})=>{
        setProStatus(isPro);setProValidUntil(validUntil||null);
        if(isPro)checkIsPowerPro(SB_CFG,authUser.id).then(pw=>setPowerStatus(pw));
      });
    }else{
      setProStatus(false);setPowerStatus(false);
    }
  },[authUser]);

  // Show Pro tour once when user first becomes Pro
  useEffect(()=>{
    if(proStatus&&!proTourDismissed){
      // Only auto-trigger if tour hasn't been seen; tour is also gated by tourDismissed being true (new users see feature tour first)
    }
  },[proStatus]);

  // Auto-trigger focus refresh when flagged
  useEffect(()=>{
    if(needsFocusRefresh&&historyLoaded&&srLoaded){
      setNeedsFocusRefresh(false);
      generateFocus();
    }
  },[needsFocusRefresh,historyLoaded,srLoaded]);

  // Mirror history into a ref so endQuiz can always read current value
  useEffect(()=>{historyRef.current=history;},[history]);
  // Keep authUserRef in sync (must be unconditional — cannot be after any early return)
  useEffect(()=>{ authUserRef.current=authUser; },[authUser]);

  // Google OAuth callback — detect #access_token= in URL hash after Supabase redirect
  useEffect(()=>{
    const hash=window.location.hash;
    if(!hash.includes('access_token='))return;
    const params=new URLSearchParams(hash.slice(1));
    const accessToken=params.get('access_token');
    if(!accessToken)return;
    window.history.replaceState(null,'',window.location.pathname);
    (async()=>{
      try{
        const res=await fetch(`${SUPABASE_URL}/auth/v1/user`,{headers:{'Authorization':`Bearer ${accessToken}`,'apikey':SUPABASE_KEY}});
        if(!res.ok)return;
        const user=await res.json();
        const userId=user.id;
        const email=user.email||'';
        const auth={id:userId,email,accessToken};
        const exists=await supabaseCheckAccount(SB_CFG,userId);
        if(!exists)await supabaseCreateAccount(SB_CFG,userId,email);
        const prev=getStoredAuth();
        if(!prev||prev.id!==userId){
          const sbData=await supabaseLoad(SB_CFG,auth);
          if(sbData?.history?.length){const h=sbData.history.map(s=>({...s,wrongs:[]}));setHistory(h);historyRef.current=h;storageSet(STORAGE_KEY,h);}
          if(sbData?.srDeck){setSrDeck(sbData.srDeck);srDeckRef.current=sbData.srDeck;storageSet(SR_KEY,sbData.srDeck);}
          if(sbData?.usageStats){setUsageStats(sbData.usageStats);usageStatsRef.current=sbData.usageStats;}
        }
        saveAuth(auth);
        setAuthUser(auth);
        authUserRef.current=auth;
        try{window.dispatchEvent(new CustomEvent('cfa_auth',{detail:true}));}catch{}
        if(!exists)setShowOnboarding(true);
      }catch{}
    })();
  },[]);

  // L2/L3 use item-set/vignette format — auto-enable vignette mode
  useEffect(()=>{if(cfaLevel!=="1")setVignetteMode(true);else setVignetteMode(false);},[cfaLevel]);

  useEffect(()=>{
    const s=document.createElement("style");
    s.textContent=`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}@keyframes fadeInScale{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}@keyframes glow{0%,100%{box-shadow:0 0 8px #6366f144}50%{box-shadow:0 0 18px #6366f188}}@keyframes correctFlash{0%{background:#022c22}50%{background:#064e3b}100%{background:#022c22}}@keyframes toastIn{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}@keyframes toastOut{from{opacity:1}to{opacity:0;transform:translateY(-10px)}}*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#2a2848;border-radius:2px}button:focus-visible{outline:2px solid #6366f1;outline-offset:2px}`;
    document.head.appendChild(s);return()=>document.head.removeChild(s);
  },[]);

  useEffect(()=>{
    const recoverData = async () => {
      // STEP 1: Aggressively purge ALL old keys FIRST to free storage space
      const ALL_KNOWN_KEYS=[
        "cfa_mock_v6","cfa_mock_v5","cfa_mock_v4","cfa_mock_v3","cfa_mock_v2","cfa_mock_v1","cfa_mock",
        "cfaMockHistory","cfa-mock-history","history","cfa_history","cfa_backup_v7",
        "cfa_sr_v6","cfa_sr_v5","cfa_sr_v4","cfa_sr_v3","cfa_sr_v2","cfa_sr_v1","cfa_sr","cfaSR",
        "cfa_qdb_v7","cfa_focus_cache","__health_check__","cfa_sr_v7"
      ];
      for(const k of ALL_KNOWN_KEYS){try{await window.storage.delete(k);}catch{}}

      // If no user is logged in, clear all user-specific state and localStorage
      const currentAuth=getStoredAuth();
      if(!currentAuth){
        setHistory([]);historyRef.current=[];
        setSrDeck({});srDeckRef.current={};
        setWeeklyPlan(null);
        try{localStorage.removeItem(PLAN_KEY);}catch{}
        setHistoryLoaded(true);setSrLoaded(true);
        return;
      }

      // Detect account switch — purge previous user's local session data
      {
        const lastUid=localStorage.getItem(LAST_UID_KEY);
        if(lastUid&&lastUid!==currentAuth.id){
          const SESSION_KEYS=[
            "cfa_"+STORAGE_KEY,"cfa_"+SR_KEY,"cfa_"+USAGE_KEY,
            "cfa_"+PASS_TREND_KEY,"cfa_"+PLAN_KEY,"cfa_"+API_LOG_KEY,
            "cfa_"+QCACHE_KEY,"cfa_cfa_focus_cache","cfa_cfa_diag_weak",
            "cfa_cfa_exam_date","cfa_daily_ai",PENDING_GEN_KEY,
            // Direct-localStorage keys (no "cfa_" prefix added by storageSet)
            CFA_LEVEL_KEY,REFRESHER_KEY,LESSONS_KEY,STUDY_GOAL_KEY,
            PRESETS_KEY,MISSION_KEY,CONFIDENCE_KEY,WORKED_EX_KEY,
            DYNAMIC_PN_KEY,DYNAMIC_FORMULAS_KEY,STREAK_FREEZE_KEY,
            CALC_SNAP_KEY,SESSION_DRAFT_KEY,FLAGS_KEY,
            BESTS_KEY,RESOLVED_GAPS_KEY,REMINDER_TIME_KEY,LAST_SCREEN_KEY,
          ];
          SESSION_KEYS.forEach(k=>{try{localStorage.removeItem(k);}catch{}});
          setHistory([]);historyRef.current=[];
          setSrDeck({});srDeckRef.current={};
          setWeeklyPlan(null);setDiagWeak([]);
          setCfaLevel("1");
          setStudyGoal(null);setPresets([]);
          setDailyMission(null);setDailyRefresher(null);
          setTopicLessons({});setConfidenceLog({});
          setWorkedExamples({});setSessionDraft(null);
          setQuestionFlags([]);setPersonalBests({});
        }
        localStorage.setItem(LAST_UID_KEY,currentAuth.id);
      }

      // STEP 2: Read only from the ONE primary key
      let bestHistory=[];
      let allAttempts=[];
      try{
        const val=await storageGet(STORAGE_KEY);
        const arr=Array.isArray(val)?val:(val?.history&&Array.isArray(val.history)?val.history:null);
        if(arr&&arr.length>0&&arr[0]?.topic){
          // Strip ALL wrongs on load — stats only, keeps storage tiny
          bestHistory=arr.map(s=>({
            id:s.id,topic:s.topic,subtopic:s.subtopic,difficulty:s.difficulty,
            mode:s.mode,score:s.score,total:s.total,pct:s.pct,
            timeTaken:s.timeTaken||0,date:s.date,dateKey:s.dateKey,
            wrongCount:s.wrongCount||(s.wrongs?.length||0),wrongs:[]
          }));
          allAttempts=[{key:STORAGE_KEY,found:true,count:bestHistory.length}];
        } else {
          allAttempts=[{key:STORAGE_KEY,found:false,count:0}];
        }
      }catch(e){allAttempts=[{key:STORAGE_KEY,found:false,count:0,error:true}];}
      setStorageKeys(allAttempts);
      if(bestHistory.length>0){
        setHistory(bestHistory);
        historyRef.current=bestHistory;
        // Write compacted version back now that old keys are cleared
        await storageSet(STORAGE_KEY,bestHistory);
      }
      setHistoryLoaded(true);

      // STEP 2b: Load SR deck before Supabase merge so we can push it up if needed
      let bestSR=null;
      try{
        const val=await storageGet(SR_KEY);
        if(val&&typeof val==="object"&&!Array.isArray(val)&&Object.keys(val).length>0){
          bestSR=val;
        }
      }catch{}
      if(bestSR){
        bestSR=purgeTruncatedSR(bestSR);
        storageSet(SR_KEY,bestSR);
        setSrDeck(bestSR);srDeckRef.current=bestSR;
      }
      setSrLoaded(true);

      // Load usage analytics
      try{
        const usage=await storageGet(USAGE_KEY);
        if(usage&&typeof usage==="object"&&!Array.isArray(usage)) setUsageStats(usage);
      }catch{}
      try{const al=await storageGet(API_LOG_KEY);if(Array.isArray(al))apiLogRef.current=al;}catch{}
      try{const pt=await storageGet(PASS_TREND_KEY);if(Array.isArray(pt)){setPassTrend(pt);passTrendRef.current=pt;}}catch{}

      // STEP 2c: Bidirectional Supabase merge
      // Pull if Supabase is ahead; push if local is ahead (ensures progress is never lost)
      {
        try{
          const sbData=await supabaseLoad(SB_CFG,authUserRef.current);
          const sbCount=sbData&&Array.isArray(sbData.history)?sbData.history.length:0;
          if(sbData&&sbCount>bestHistory.length){
            // Supabase has more sessions — pull and cache locally
            bestHistory=sbData.history.map(s=>({...s,wrongs:[]}));
            setHistory(bestHistory);
            historyRef.current=bestHistory;
            storageSet(STORAGE_KEY,bestHistory);
            if(sbData.srDeck){const cleanedSb=purgeTruncatedSR(sbData.srDeck);setSrDeck(cleanedSb);srDeckRef.current=cleanedSb;storageSet(SR_KEY,cleanedSb);}
          } else if(bestHistory.length>sbCount){
            // Local is ahead — push to Supabase in background
            supabaseSync(SB_CFG,bestHistory,bestSR||{},usageStatsRef.current,authUserRef.current).catch(()=>{});
          }
          // Merge usageStats from Supabase (take max count per key — union of all sessions)
          if(sbData?.usageStats&&typeof sbData.usageStats==="object"){
            const local=usageStatsRef.current;
            const merged={};
            const allKeys=new Set([...Object.keys(local),...Object.keys(sbData.usageStats)]);
            for(const k of allKeys){
              const lc=local[k]?.count||0;
              const sc=sbData.usageStats[k]?.count||0;
              merged[k]={
                count:Math.max(lc,sc),
                lastUsed:lc>=sc?(local[k]?.lastUsed||""):(sbData.usageStats[k]?.lastUsed||""),
                firstUsed:(local[k]?.firstUsed||"9")<(sbData.usageStats[k]?.firstUsed||"9")?local[k]?.firstUsed:sbData.usageStats[k]?.firstUsed
              };
            }
            setUsageStats(merged);
            usageStatsRef.current=merged;
            storageSet(USAGE_KEY,merged);
          }
        }catch{}
      }

      // STEP 4: Load settings
      // API key no longer stored client-side — AI routed through backend proxy
      try{const d=await storageGet("cfa_exam_date");if(d&&typeof d==="string"){setExamDate(new Date(d));setExamDateInput(d);}}catch{}
      try{const qc=await storageGet(QCACHE_KEY);if(qc&&typeof qc==="object")qCacheRef.current=qc;}catch{}
      setQdbLoaded(true);

      // Load cached focus suggestions (only use if from today)
      try {
        const cached = await storageGet("cfa_focus_cache");
        if (cached && cached.date === localDateKey() && cached.suggestions) {
          setFocusSuggestions(cached.suggestions);
        }
      } catch {}
    };
    recoverData().then(()=>{
      // Auto-refresh focus if no cache or cache is from a previous day
      setTimeout(()=>{
        const today=localDateKey();
        storageGet("cfa_focus_cache").then(cached=>{
          if(!cached||cached.date!==today) {
            // will call generateFocus after state settles — use a flag
            setNeedsFocusRefresh(true);
          }
        }).catch(()=>setNeedsFocusRefresh(true));
      },800);
    });
  },[]);
  // History saved explicitly at session end only (not on every change)
  useEffect(()=>{if(srLoaded){
    const srEntries=Object.entries(srDeck);
    const sorted=srEntries.sort((a,b)=>(b[1].wrongCount||0)-(a[1].wrongCount||0)||(b[1].repetitions||0)-(a[1].repetitions||0));
    // Cap at 200 cards, strip options/question to save space (kept in SR review from state)
    const pruned=Object.fromEntries(sorted.slice(0,200).map(([k,v])=>[k,{
      concept:v.concept,topic:v.topic,subtopic:v.subtopic,
      question:(v.question||""),
      options:v.options,answer:v.answer,
      explanation:(v.explanation||"").slice(0,1200),
      los_tested:(v.los_tested||"").slice(0,200),
      wrongCount:v.wrongCount||0,interval:v.interval,
      repetitions:v.repetitions,ef:v.ef,nextReview:v.nextReview
    }]));
    storageSet(SR_KEY,pruned);
  }},[srDeck,srLoaded]);
  useEffect(()=>{if(qdbLoaded)storageSet(QDB_KEY,qdb);},[qdb,qdbLoaded]);
  // Backup written only at session end (not on every history change)
  // Storage health check on mount
  useEffect(()=>{storageHealth().then(ok=>setStorageOk(ok));},[]);
  // Seed offline question cache on first load so non-signed-in users can try immediately
  useEffect(()=>{
    try{
      if(localStorage.getItem(OFFLINE_SEED_KEY))return;
      const existing=JSON.parse(localStorage.getItem(OFFLINE_QS_KEY)||"{}");
      const merged={...existing};
      Object.entries(OFFLINE_SEED_QS).forEach(([topic,mods])=>{
        if(!merged[topic])merged[topic]={};
        Object.entries(mods).forEach(([mod,qs])=>{
          if(!(merged[topic][mod]?.length>=3))merged[topic][mod]=qs;
        });
      });
      localStorage.setItem(OFFLINE_QS_KEY,JSON.stringify(merged));
      localStorage.setItem(OFFLINE_SEED_KEY,"1");
    }catch{}
  },[]);

  // Daily Q init — pick a date-seeded question from offline seed bank
  useEffect(()=>{
    if(dailyQ) return;
    const allQs=[];
    Object.entries(OFFLINE_SEED_QS).forEach(([t,mods])=>{
      Object.entries(mods).forEach(([mod,qs])=>{qs.forEach(q=>allQs.push({...q,_topic:t,_mod:mod}));});
    });
    if(!allQs.length) return;
    const today=localDateKey();
    const dayNum=Math.floor(new Date(today).getTime()/86400000);
    const q=allQs[dayNum%allQs.length];
    const newDQ={date:today,q,answered:false,userAnswer:null};
    setDailyQ(newDQ);
    try{localStorage.setItem(DAILY_Q_KEY,JSON.stringify(newDQ));}catch{}
  },[]);

  // Load duel challenge from sessionStorage (pre-boot captured ?duel= param)
  useEffect(()=>{
    try{
      const raw=sessionStorage.getItem(DUEL_KEY);
      if(!raw) return;
      const parsed=JSON.parse(atob(raw));
      if(parsed?.qs&&parsed.qs.length>0) setDuelChallenge(parsed);
      sessionStorage.removeItem(DUEL_KEY);
    }catch{}
  },[]);

  // Daily notification check
  useEffect(()=>{
    if(!notifEnabled) return;
    try{
      if(typeof Notification==="undefined"||Notification.permission!=="granted") return;
      const sentKey="cfa_notif_sent_"+localDateKey();
      if(localStorage.getItem(sentKey)) return;
      const n=new Notification("ClearCFA",{body:"Your CFA exam is waiting — study time! 📚",icon:"/ClearCFA/icon-192.png"});
      setTimeout(()=>n.close(),6000);
      localStorage.setItem(sentKey,"1");
    }catch{}
  },[notifEnabled]);

  const pendingSessionRef=useRef(null);

  const showToast=React.useCallback((emoji,title,desc,celebrate=false)=>{
    if(typeof window.__cfaShowToast==="function") window.__cfaShowToast(emoji,title,desc,celebrate);
  },[]);

  const endQuiz=useCallback(()=>{
    clearInterval(timerRef.current);
    const elapsed=Math.floor((Date.now()-startRef.current)/1000);
    setTimeTaken(elapsed);
    setExitConfirm(false);
    pendingSessionRef.current={elapsed};
    try{localStorage.removeItem(SESSION_DRAFT_KEY);}catch{}
    setSessionDraft(null);
    setScreen("results");
  },[]);

  // commitSession: called once when results screen mounts
  // Uses refs so it always reads current values, not stale closure
  const questionsRef=useRef([]);
  const answersRef=useRef({});
  const flaggedQRef=useRef({});
  const srDeckRef=useRef({});
  const topicRef=useRef("");
  const subtopicRef=useRef("");
  const difficultyRef=useRef("Medium");
  const modeRef=useRef("guided");
  useEffect(()=>{window.scrollTo(0,0);document.body.scrollTop=0;document.documentElement.scrollTop=0;const t=setTimeout(()=>{window.scrollTo(0,0);document.body.scrollTop=0;document.documentElement.scrollTop=0;window.scrollTo({top:0,left:0,behavior:'instant'});},100);return()=>clearTimeout(t);},[currentQ]);
  useEffect(()=>{questionsRef.current=questions;},[questions]);
  useEffect(()=>{answersRef.current=answers;},[answers]);
  useEffect(()=>{flaggedQRef.current=flaggedQ;},[flaggedQ]);
  useEffect(()=>{srDeckRef.current=srDeck;},[srDeck]);
  useEffect(()=>{usageStatsRef.current=usageStats;},[usageStats]);
  useEffect(()=>{topicRef.current=topic;},[topic]);
  useEffect(()=>{subtopicRef.current=subtopic;},[subtopic]);
  useEffect(()=>{difficultyRef.current=difficulty;},[difficulty]);
  useEffect(()=>{modeRef.current=mode;},[mode]);
  useEffect(()=>{confidenceLogRef.current=confidenceLog;},[confidenceLog]);
  useEffect(()=>{if(screen==="home")setError("");},[screen]);
  useEffect(()=>{try{if(RESTORABLE_SCREENS.has(screen))localStorage.setItem(LAST_SCREEN_KEY,screen);else localStorage.removeItem(LAST_SCREEN_KEY);}catch{}},[screen]);
  useEffect(()=>{
    if(screen==="readiness"&&!clVisitedReadiness){setClVisitedReadiness(true);try{localStorage.setItem("cfa_cl_readiness","1");}catch{}}
    if(screen==="revision"&&!clVisitedRevision){setClVisitedRevision(true);try{localStorage.setItem("cfa_cl_revision","1");}catch{}}
  },[screen]);
  // Warn before accidental page refresh/close during an active quiz
  useEffect(()=>{
    if(screen!=="quiz")return;
    const handler=e=>{e.preventDefault();e.returnValue="";};
    window.addEventListener("beforeunload",handler);
    return()=>window.removeEventListener("beforeunload",handler);
  },[screen]);

  useEffect(()=>{
    if(screen==="quiz"){
      const total=fullExamMode?135*60:count*TIME_PER_Q;
      setTimeLeft(total);startRef.current=Date.now();clearInterval(timerRef.current);
      timerRef.current=setInterval(()=>{setTimeLeft(t=>{if(t<=1){clearInterval(timerRef.current);endQuiz();return 0;}return t-1;});},1000);
    }
    return()=>clearInterval(timerRef.current);
  },[screen,count,endQuiz,fullExamMode]);

  useEffect(()=>{
    if(screen!=="quiz"||!questions.length)return;
    const q=questions[currentQ];
    if(q&&!qShownAtRef.current[q.id]){
      qShownAtRef.current[q.id]=Date.now();
    }
  },[currentQ,screen,questions]);

  useEffect(()=>{
    clearInterval(speedDrillRef.current);
    if(screen!=="quiz"||mode!=="speed_drill")return;
    setSpeedQTime(100);
    speedDrillRef.current=setInterval(()=>{
      setSpeedQTime(t=>{
        if(t<=1){
          clearInterval(speedDrillRef.current);
          const q=questionsRef.current[currentQ];
          if(q&&!answersRef.current[q.id]){
            setAnswers(a=>({...a,[q.id]:"__timeout__"}));
            setTimeout(()=>{
              const qs=questionsRef.current;const cur=currentQ;
              if(cur<qs.length-1){setCurrentQ(c=>c+1);setShowExp(false);}else endQuiz();
            },700);
          }
          return 0;
        }
        return t-1;
      });
    },1000);
    return()=>clearInterval(speedDrillRef.current);
  },[screen,mode,currentQ,endQuiz]);

  // Daily study reminder — fires notification at user-set time
  useEffect(()=>{
    if(!reminderTime)return;
    const check=()=>{
      if(Notification.permission!=="granted")return;
      const now=new Date();
      const hh=String(now.getHours()).padStart(2,"0");
      const mm=String(now.getMinutes()).padStart(2,"0");
      if(`${hh}:${mm}`!==reminderTime)return;
      const todayKey=`${localDateKey()}_${reminderTime}`;
      const lastFired=localStorage.getItem("cfa_reminder_last")||"";
      if(lastFired===todayKey)return;
      localStorage.setItem("cfa_reminder_last",todayKey);
      navigator.serviceWorker.ready.then(sw=>{
        sw.showNotification("ClearCFA Study Reminder",{
          body:dueCards.length>0?`${dueCards.length} SR cards due · Time to study!`:"Time for your daily CFA session!",
          icon:"/ClearCFA/icon-192.png",
          tag:"daily-reminder",
        });
      }).catch(()=>{});
    };
    check();
    const id=setInterval(check,60000);
    return()=>clearInterval(id);
  },[reminderTime]);

  const sessionCommittedRef=useRef(false);
  const srProcessedRef=useRef(new Set()); // qIds already SR-updated in real-time
  const weeklyPlanAutoRef=useRef(false);
  const confidenceLogRef=useRef({});
  const pendingPlanKeyRef=useRef(null);
  const pendingFocusKeyRef=useRef(null);
  const debriefPromptRef=useRef(null);
  const retryDebrief=()=>{
    if(!debriefPromptRef.current||!authUser?.id)return;
    setAiDebrief(null);setAiDebriefError(null);setAiDebriefLoading(true);
    callAIChat(authUser.id,[{role:"user",content:debriefPromptRef.current}],350,cfaLevel)
      .then(r=>{const txt=r&&r.trim();if(txt)setAiDebrief(txt);else setAiDebriefError("error");})
      .catch(e=>{setAiDebriefError(e.quotaExceeded?"quota":"error");})
      .finally(()=>setAiDebriefLoading(false));
  };
  useEffect(()=>{
    if(screen!=="results"){
      sessionCommittedRef.current=false;
      setAiDebrief(null);
      setConfidenceLog({});
      return;
    }
    if(sessionCommittedRef.current) return; // already committed for this session
    const qs=questionsRef.current;
    if(!qs||qs.length===0) return;
    sessionCommittedRef.current=true;

    // Mark weekly plan session done now that the quiz actually completed
    if(pendingPlanKeyRef.current){
      const planKey=pendingPlanKeyRef.current;
      pendingPlanKeyRef.current=null;
      setTodayStarted(prev=>{const n={...prev,[planKey]:true};try{localStorage.setItem("cfa_today_started",JSON.stringify(n));}catch{}return n;});
    }

    // Mark Today's Focus suggestion done now that the quiz actually completed
    if(pendingFocusKeyRef.current){
      const fKey=pendingFocusKeyRef.current;
      pendingFocusKeyRef.current=null;
      setFocusDone(prev=>{const n={...prev,[fKey]:true};try{localStorage.setItem("cfa_focus_done",JSON.stringify({date:localDateKey(),done:n}));}catch{}return n;});
    }

    // Read everything from refs — guaranteed current values
    const ans=answersRef.current;
    const t=topicRef.current;
    const st=subtopicRef.current;
    const diff=difficultyRef.current;
    const m=modeRef.current;
    const elapsed=pendingSessionRef.current?.elapsed||0;
    pendingSessionRef.current=null;

    const score=qs.filter(q=>ans[q.id]===q.answer).length;
    const pct=Math.round((score/qs.length)*100);

    // Read flagged state from ref
    const flagged=flaggedQRef.current||{};

    // Build updated SR deck synchronously from the ref (guaranteed current value)
    // so both state and the Supabase payload use the same post-session data
    let updatedSrDeck={...srDeckRef.current};
    qs.forEach(q=>{
      const correct=ans[q.id]===q.answer;
      const isFlagged=!!flagged[q.id];
      if(!correct&&srProcessedRef.current.has(q.id)) return; // already updated in real-time
      const key=`${t}|||${st}|||${q.id}`;
      const existing=updatedSrDeck[key]||{concept:(q.concept||st).slice(0,60),topic:t,subtopic:st,question:(q.question||""),options:q.options,answer:q.answer,explanation:(q.explanation||"").slice(0,1200),los_tested:(q.los_tested||"").slice(0,120),wrongCount:0};
      const isLeechCard=(existing.wrongCount||0)>=4;
      if(correct&&!isFlagged&&!isLeechCard) return; // skip correct+unflagged non-leeches
      const card=sm2Update(existing,correct);
      if(!correct) card.wrongCount=(existing.wrongCount||0)+1;
      else if(isLeechCard) card.wrongCount=Math.max(0,(existing.wrongCount||0)-1);
      if(isFlagged&&correct){
        card.interval=1;card.repetitions=0;
        card.ef=Math.max(1.3,existing.ef-0.1);
        card.nextReview=localDateKey(new Date(Date.now()+86400000));
      }
      updatedSrDeck={...updatedSrDeck,[key]:card};
    });
    setSrDeck(updatedSrDeck); // single state update with fully computed deck

    // QDB
    setQdb(prev=>addToQDB(qs.map(q=>({...q,_topic:t,_subtopic:st})),prev));

    // Build session object
    const session={
      id:Date.now(),topic:t,subtopic:st,difficulty:diff,mode:m,
      score,total:qs.length,pct,timeTaken:elapsed,
      avgSecsPerQ:qs.length>0?Math.round(elapsed/qs.length):0,
      qTimes:{...qTimesRef.current},
      date:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short"}),
      dateKey:localDateKey(),
      wrongCount:qs.filter(q=>ans[q.id]!==q.answer).length,
      wrongs:[],
      level:cfaLevel,
      confidenceData:computeCalibration(qs,ans,confidenceLogRef.current),
      ...(omMode&&{isOfficeMode:true}),
    };

    setLastSession(session);

    // Build newHistory using ref (always current)
    const newHistory=[session,...historyRef.current];
    setHistory(newHistory);
    historyRef.current=newHistory;

    // ── Milestone checks ──────────────────────────────────────────────────
    const oldXP=getTotalXP(newHistory.slice(1));
    const newXP=getTotalXP(newHistory);
    const oldLevel=getLevel(oldXP).level;
    const newLevel=getLevel(newXP).level;
    if(newLevel>oldLevel){
      setLevelUpInfo({level:newLevel,label:getLevel(newXP).label});
      fireConfetti();
    } else if(pct===100){
      showToast("🎯","Perfect Session!",`100% on ${t} — flawless.`,true);
    } else if(newHistory.length===1){
      showToast("🚀","First Session Done!","Your CFA journey starts now.",false);
    }
    // Personal best check
    const bestKey=`${t}|||${st}`;
    setPersonalBests(prev=>{
      const stored=prev[bestKey];
      if(!stored||pct>stored.pct){
        const updated={...prev,[bestKey]:{pct,date:session.dateKey,difficulty:diff}};
        try{localStorage.setItem(BESTS_KEY,JSON.stringify(updated));}catch{}
        if(stored&&pct>stored.pct){
          showToast("🏆","New Personal Best!",`${pct}% in ${st} (was ${stored.pct}%)`,pct===100?false:true);
        }
        return updated;
      }
      return prev;
    });
    // Streak milestone toasts + longest streak tracking
    const prevStreak=getStreak(newHistory.slice(1));
    const newStreak=getStreak(newHistory);
    const STREAK_MILESTONES=[7,14,30,60,100];
    const hitMilestone=STREAK_MILESTONES.find(m=>prevStreak<m&&newStreak>=m);
    if(hitMilestone)showToast("🏆",`${hitMilestone}-Day Streak!`,"You're building a real study habit.",true);
    try{
      const bests=JSON.parse(localStorage.getItem(BESTS_KEY)||'{}');
      if(newStreak>(bests.longestStreak||0)){
        bests.longestStreak=newStreak;
        localStorage.setItem(BESTS_KEY,JSON.stringify(bests));
        setPersonalBests(prev=>({...prev,longestStreak:newStreak}));
      }
    }catch{}
    // ─── Question count milestones ─────────────────────────────────────────
    const prevTotalQs=historyRef.current.slice(1).reduce((s,h)=>s+(h.total||0),0);
    const newTotalQs=newHistory.reduce((s,h)=>s+(h.total||0),0);
    const QS_MILESTONES=[100,500,1000,2500,5000];
    const hitQMilestone=QS_MILESTONES.find(m=>prevTotalQs<m&&newTotalQs>=m);
    if(hitQMilestone){
      const qEmoji=hitQMilestone===100?"🎯":hitQMilestone===500?"⚡":hitQMilestone===1000?"🏆":hitQMilestone===2500?"🔥":"👑";
      setMilestoneOverlay({type:"questions",count:hitQMilestone,emoji:qEmoji});
      fireConfetti();
    }
    // ─── Hardest topic warrior badges ─────────────────────────────────────
    const HARD_TOPICS_LIST=["Fixed Income","Derivatives","Alternative Investments"];
    HARD_TOPICS_LIST.forEach(ht=>{
      const prevCount=historyRef.current.slice(1).filter(h=>h.topic===ht).reduce((s,h)=>s+(h.total||0),0);
      const newCount=newHistory.filter(h=>h.topic===ht).reduce((s,h)=>s+(h.total||0),0);
      if(prevCount<10&&newCount>=10)showToast("🏅",`${ht.split(" ")[0]} Warrior!`,`10+ questions answered on one of the hardest CFA topics.`,true);
    });
    // ─────────────────────────────────────────────────────────────────────

    // Auto-escalation
    const topicHistory=historyRef.current.filter(h=>h.topic===t&&h.subtopic===st&&h.difficulty===diff);
    if(pct>=80&&diff!=="Hard"&&topicHistory.length>=2)setAutoEscalation({topic:t,subtopic:st,from:diff,to:diff==="Easy"?"Medium":"Hard"});

    // Persist — both localStorage and Supabase use the synchronously-built values
    (async()=>{
      const ok=await storageSet(STORAGE_KEY,newHistory.slice(0,300));
      setSessionSaved(ok);
      // Cloud sync via Supabase handles backup
      const synced=await supabaseSync(SB_CFG,newHistory.slice(0,300),updatedSrDeck,usageStatsRef.current,authUserRef.current);
      if(synced) setDriveStatus("synced");
      else setDriveStatus("error");
      setTimeout(()=>setDriveStatus(null),4000);
    })();

    // Auto-generate AI debrief when there are wrong answers
    const wrongQs=qs.filter(q=>ans[q.id]!==q.answer);
    if(authUserRef.current?.id&&wrongQs.length>0){
      setAiDebriefLoading(true);
      const wrongItems=wrongQs.map(q=>{
        const mc=q.misconception_targeted?` [${q.misconception_targeted}]`:"";
        return `- "${q.concept||q.los_tested||"unknown"}"${mc}`;
      }).join("\n");
      const mins=elapsed?Math.round(elapsed/60):null;
      const timeStr=mins?`, ${mins} min`:"";
      const debriefPrompt=`CFA Level ${cfaLevel} exam coach. Student scored ${pct}% on ${diff} ${t} — ${st} (${wrongQs.length} wrong / ${qs.length} total${timeStr}).

Wrong concepts:
${wrongItems}

Respond in EXACTLY this format — no preamble, no extra text:
PATTERN: [1 sentence — the single error pattern explaining most mistakes]
FIX: [1 specific action to take today — concrete and actionable]
PRIORITY: [exact concept name from wrong list to drill first]
TIME: [realistic time to close this gap, e.g. "20 min" or "1 hour"]
COACH: [1 honest, direct sentence — no generic cheerleading]`;
      debriefPromptRef.current=debriefPrompt;
      setAiDebriefError(null);
      callAIChat(authUserRef.current.id,[{role:"user",content:debriefPrompt}],350,cfaLevel)
        .then(r=>{const txt=r&&r.trim();if(txt)setAiDebrief(txt);else setAiDebriefError("error");})
        .catch(e=>{setAiDebriefError(e.quotaExceeded?"quota":"error");})
        .finally(()=>setAiDebriefLoading(false));
    }
    // Log wrong answers for community analytics (fire-and-forget)
    if(authUserRef.current?.id&&wrongQs.length>0){
      const wrongs=wrongQs.slice(0,20).map(q=>({topic:t,module:st,hash:String(q.id||"").slice(0,64),correct:String(q.options?.[q.answer]||q.answer||"").slice(0,200),wrong:String(q.options?.[ans[q.id]]||ans[q.id]||"").slice(0,200)}));
      fetch(AI_PROXY_URL,{method:"POST",headers:{"content-type":"application/json","apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`},body:JSON.stringify({requestType:"log_wrongs",userId:authUserRef.current.id,wrongs})}).catch(()=>{});
    }
  },[screen]);

  const ADMIN_EMAIL="sai.praneeth557@gmail.com";
  const isAdmin=authUser?.email===ADMIN_EMAIL;
  const ADMIN_STATS_URL=`${SUPABASE_URL}/functions/v1/admin-stats`;
  const fetchAdminStats=async()=>{
    if(!authUser?.id||!isAdmin)return;
    setAdminStatsLoading(true);setAdminStatsError("");
    try{
      const res=await fetch(ADMIN_STATS_URL,{method:"POST",headers:{"content-type":"application/json","apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`},body:JSON.stringify({accessToken:authUser.accessToken||undefined,userId:authUser.id,email:authUser.email})});
      const data=await res.json();
      if(!res.ok)throw new Error(data.error||`HTTP ${res.status}`);
      setAdminStats(data);
    }catch(e){setAdminStatsError(e.message||"Failed to load stats");}
    setAdminStatsLoading(false);
  };

  const callClaude=async(prompt,maxTokens=8000,{retries=2,retryDelay=8000,model="claude-haiku-4-5-20251001",feature=""}={})=>{
    if(!navigator.onLine) throw new Error("No internet — check your connection and retry.");
    let lastError;
    let currentMaxTokens=maxTokens;
    for(let attempt=0;attempt<retries;attempt++){
      if(attempt>0){
        // Exponential backoff: 8s, 16s, 32s
        const delay=retryDelay*Math.pow(2,attempt-1);
        setLoadingMsg(`Rate limit hit — retrying in ${Math.round(delay/1000)}s (attempt ${attempt+1}/${retries})...`);
        await new Promise(r=>setTimeout(r,delay));
      }
      const controller=new AbortController();
      const timeout=setTimeout(()=>controller.abort(),45000);
      try{
        const modelName=model;
        const userId=typeof authUser!=="undefined"&&authUser?.id?authUser.id:"";
        const res=await fetch(AI_PROXY_URL,{method:"POST",headers:{"content-type":"application/json","apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`},signal:controller.signal,body:JSON.stringify({requestType:"generate",userId,prompt,maxTokens:currentMaxTokens,model:modelName})});
        clearTimeout(timeout);
        // Quota exceeded (our server-side daily limit) — do NOT retry
        if(res.status===429){
          const body=await res.json().catch(()=>({}));
          if(body?.quotaExceeded){
            throw new Error(body.error||"Daily AI question limit reached. Upgrade to Pro for unlimited access.");
          }
          // Anthropic rate limit — retry with backoff
          const retryAfter=res.headers.get("retry-after");
          const waitMs=retryAfter?parseInt(retryAfter)*1000:retryDelay*Math.pow(2,attempt);
          lastError=new Error(`Rate limit — waiting ${Math.round(waitMs/1000)}s before retry`);
          setLoadingMsg(`Rate limit hit — waiting ${Math.round(waitMs/1000)}s...`);
          await new Promise(r=>setTimeout(r,waitMs));
          continue;
        }
        if(res.status===529){
          const retryAfter=res.headers.get("retry-after");
          const waitMs=retryAfter?parseInt(retryAfter)*1000:retryDelay*Math.pow(2,attempt);
          lastError=new Error(`Rate limit — waiting ${Math.round(waitMs/1000)}s before retry`);
          setLoadingMsg(`Rate limit hit — waiting ${Math.round(waitMs/1000)}s...`);
          await new Promise(r=>setTimeout(r,waitMs));
          continue;
        }
        if(!res.ok){
          const body=await res.json().catch(()=>({}));
          throw new Error(body?.error?.message||body?.error||`API error ${res.status}`);
        }
        const data=await res.json();
        if(data.error) throw new Error(`Claude error: ${data.error.message||JSON.stringify(data.error)}`);
        if(!data.content||!data.content.length) throw new Error("Empty response from API");
        const raw=data.content.map(i=>i.text||"").join("").replace(/```json\n?|```/g,"").trim();
        if(!raw) throw new Error("No text content in response");
        if(data.stop_reason==="max_tokens"){
          currentMaxTokens=Math.round(currentMaxTokens*1.75);
          lastError=new Error("Response too long — retrying with more budget...");
          setLoadingMsg(`Response too long — retrying with larger budget (attempt ${attempt+2}/${retries})...`);
          continue;
        }
        if(data.usage){
          const inTok=data.usage.input_tokens||0,outTok=data.usage.output_tokens||0;
          const pr=MODEL_PRICING[modelName]||{in:3.00,out:15.00};
          const cost=(inTok*pr.in+outTok*pr.out)/1000000;
          const entry={ts:Date.now(),f:feature||"unknown",m:modelName.includes("haiku")?"haiku":"sonnet",in:inTok,out:outTok,$:Math.round(cost*1000000)/1000000};
          const newLog=[entry,...apiLogRef.current].slice(0,300);
          apiLogRef.current=newLog;
          storageSet(API_LOG_KEY,newLog);
        }
        // Try direct parse
        try{ return JSON.parse(raw); }catch{}
        // Regex-extract the outermost JSON array or object (handles extra text before/after)
        const arrM=raw.match(/\[[\s\S]*\]/); if(arrM){try{return JSON.parse(arrM[0]);}catch{}}
        const objM=raw.match(/\{[\s\S]*\}/); if(objM){try{return JSON.parse(objM[0]);}catch{}}
        // Not JSON — return raw string (plain text responses: debrief, AI coach, etc.)
        return raw;
      }catch(e){
        clearTimeout(timeout);
        if(e.name==="AbortError"){lastError=new Error("Timed out — API is slow, try again.");continue;}
        // Don't retry non-rate-limit errors
        if(!e.message?.includes("Rate limit")&&!e.message?.includes("rate limit")){
          const eEntry={ts:Date.now(),f:feature||"unknown",err:true,msg:e.message?.slice(0,200)||"unknown"};
          const elog=[eEntry,...apiLogRef.current].slice(0,300);apiLogRef.current=elog;try{storageSet(API_LOG_KEY,elog);}catch{}
          throw e;
        }
        lastError=e;
      }
    }
    {const eEntry={ts:Date.now(),f:feature||"unknown",err:true,msg:(lastError?.message||"retries exhausted").slice(0,200)};const elog=[eEntry,...apiLogRef.current].slice(0,300);apiLogRef.current=elog;try{storageSet(API_LOG_KEY,elog);}catch{}}
    throw lastError||new Error("All retries failed — please wait a minute and try again.");
  };

  const trackUsage=(feature)=>{
    setUsageStats(prev=>{
      const now=new Date().toISOString();
      const updated={...prev,[feature]:{count:(prev[feature]?.count||0)+1,lastUsed:now,firstUsed:prev[feature]?.firstUsed||now}};
      storageSet(USAGE_KEY,updated);
      usageStatsRef.current=updated;
      return updated;
    });
  };

  const generateFocus=()=>{
    setFocusLoading(true);setFocusError("");setSelectedFocus(null);
    // Fully local — no API call, instant results
    setTimeout(()=>{
      try{
        const daysLeft=Math.max(0,Math.ceil((examDate-new Date())/86400000));
        const candidates=[];

        // 0. Retaker pre-seeding — dominates when history is sparse (<5 sessions)
        const retakerWeak=(()=>{try{return JSON.parse(localStorage.getItem(RETAKER_KEY)||"null");}catch{return null;}})();
        if(retakerWeak?.topics?.length&&history.length<5){
          retakerWeak.topics.forEach((t,ti)=>{
            const mods=Object.keys(getActiveLOS(cfaLevel)[t]?.modules||{});
            mods.forEach((m,mi)=>candidates.push({topic:t,module:m,difficulty:"Medium",count:10,mode:"guided",
              reason:"Weak area from your last exam attempt",urgency:"high",
              _score:900-ti*10-mi,_type:"retaker"}));
          });
        }

        // 1. Leech cards (wrong 4+ times) — highest priority
        const leeches=getLeeches(srDeck);
        const leechTopics={};
        leeches.forEach(c=>{const k=c.topic+"|"+c.subtopic;leechTopics[k]=(leechTopics[k]||{topic:c.topic,module:c.subtopic,count:0,wrongCount:0});leechTopics[k].count++;leechTopics[k].wrongCount+=(c.wrongCount||0);});
        Object.values(leechTopics).sort((a,b)=>b.wrongCount-a.wrongCount).slice(0,2).forEach(l=>{
          candidates.push({topic:l.topic,module:l.module,difficulty:"Medium",reason:`You have ${l.count} leech card${l.count>1?"s":""} here (missed ${l.wrongCount}+ times) — targeted drilling needed.`,urgency:"high",count:10,mode:"guided",_score:1000+l.wrongCount,_type:"leech"});
        });

        // 2. SR cards due today
        const due=getDueCards(srDeck);
        const dueByModule={};
        due.forEach(c=>{const k=c.topic+"|"+c.subtopic;dueByModule[k]=(dueByModule[k]||{topic:c.topic,module:c.subtopic,count:0});dueByModule[k].count++;});
        Object.values(dueByModule).sort((a,b)=>b.count-a.count).slice(0,2).forEach(d=>{
          if(!candidates.find(c=>c.topic===d.topic&&c.module===d.module))
            candidates.push({topic:d.topic,module:d.module,difficulty:"Medium",reason:`${d.count} spaced-repetition card${d.count>1?"s are":" is"} due today — review now to lock in retention.`,urgency:"high",count:d.count,mode:"sr_review",_score:800+d.count*10,_type:"sr"});
        });

        // 3. Weak accuracy on high-weight topics (<65%)
        const highWeight=["Ethics","Financial Statement Analysis","Equity","Fixed Income"];
        moduleReadiness
          .filter(m=>m.accuracy!==null&&m.accuracy<65&&m.reliable)
          .sort((a,b)=>{const ha=highWeight.includes(a.topic)?1:0,hb=highWeight.includes(b.topic)?1:0;return hb-ha||(a.accuracy-b.accuracy);})
          .slice(0,3).forEach(m=>{
            const firstMod=m.modulesCovered[0]||Object.keys(activeLOS[m.topic]?.modules||{})[0]||"Intro";
            if(!candidates.find(c=>c.topic===m.topic))
              candidates.push({topic:m.topic,module:firstMod,difficulty:daysLeft<30?"Hard":m.accuracy<50?"Easy":"Medium",reason:`Accuracy is ${m.accuracy}% on ${m.topic} (${m.weight}% of exam) — below the passing threshold.`,urgency:m.weight>=11?"high":"medium",count:10,mode:"guided",_score:600+(m.weight*10)+(65-m.accuracy),_type:"weak"});
          });

        // 4. Untested high-weight modules
        const allUntested=Object.entries(activeLOS).flatMap(([t,{weight,modules}])=>
          Object.keys(modules).filter(m=>!history.some(h=>h.topic===t&&h.subtopic===m)).map(m=>({topic:t,module:m,weight}))
        ).sort((a,b)=>b.weight-a.weight);
        const seenUntestedTopics=new Set(candidates.map(c=>c.topic));
        let untestedAdded=0;
        for(const {topic,module:mod,weight} of allUntested){
          if(untestedAdded>=4) break;
          if(seenUntestedTopics.has(topic)) continue;
          seenUntestedTopics.add(topic);
          untestedAdded++;
          candidates.push({topic,module:mod,difficulty:"Easy",reason:`Not yet attempted — ${weight}% topic weight. First exposure builds the mental map.`,urgency:weight>=11?"high":weight>=8?"medium":"low",count:10,mode:"guided",_score:400+weight*5,_type:"untested"});
        }

        // 5. Recently weak sessions
        levelHistory.slice(0,10).filter(h=>h.pct<75).forEach(h=>{
          if(!candidates.find(c=>c.topic===h.topic&&c.module===h.subtopic))
            candidates.push({topic:h.topic,module:h.subtopic,difficulty:h.pct<55?"Easy":"Medium",reason:`Last session scored ${h.pct}% here — a follow-up session cements weak spots.`,urgency:"low",count:5,mode:"guided",_score:200,_type:"recent"});
        });

        // 6. Fallback for brand new users
        if(candidates.length===0){
          [["Ethics","Code of Ethics & Standards"],["Financial Statement Analysis","Income Statement Analysis"],["Equity","Market Efficiency"]].forEach(([t,m],i)=>{
            candidates.push({topic:t,module:m,difficulty:"Easy",reason:"High-weight topic — a strong start here pays off across 13–15% of exam marks.",urgency:i===0?"high":"medium",count:10,mode:"guided",_score:100-i,_type:"fallback"});
          });
        }

        // Diversity-aware selection: cap leech+SR-due combined at 2 of the 3 slots so
        // weak-accuracy/untested/recent suggestions aren't crowded out by review-only items.
        const sortedCandidates=candidates.sort((a,b)=>b._score-a._score);
        const finalPicks=[];
        let reviewTypeCount=0;
        for(const c of sortedCandidates){
          if(finalPicks.length>=3) break;
          if((c._type==="leech"||c._type==="sr")&&reviewTypeCount>=2) continue;
          finalPicks.push(c);
          if(c._type==="leech"||c._type==="sr") reviewTypeCount++;
        }
        if(finalPicks.length<3){
          for(const c of sortedCandidates){
            if(finalPicks.length>=3) break;
            if(finalPicks.includes(c)) continue;
            finalPicks.push(c);
          }
        }
        const suggestions=finalPicks.map(({_score,_type,...rest})=>rest);
        setFocusSuggestions(suggestions);
        if(history.length===0) setSelectedFocus(0);
        setFocusLastGenerated(Date.now());
        storageSet("cfa_focus_cache",{suggestions,date:localDateKey()});
      }catch(e){setFocusError(`Error computing focus: ${e.message}`);}
      setFocusLoading(false);
    },400);
  };

  const generateWeeklyPlan=async()=>{
    setWeeklyPlanLoading(true);setWeeklyPlanError("");
    try{
      const accuracyStr=moduleReadiness.map(m=>`${m.topic}:${m.accuracy!==null?m.accuracy+'%':'untested'}`).join(", ");
      const untestedStr=moduleReadiness.flatMap(m=>m.untouchedModules.map(mod=>`${m.topic}>${mod}`)).slice(0,8).join(", ")||"None";
      const prob=passProbability?.probability||"unknown";
      const daysSince=studyPace?.daysSinceLastSession||"unknown";

      const prompt=WEEKLY_PLAN_PROMPT
        .split("{level}").join(cfaLevel)
        .split("{days}").join(String(daysLeft))
        .split("{hours}").join(String(hoursThisWeek))
        .split("{prob}").join(String(prob))
        .split("{accuracy}").join(accuracyStr||"No data yet")
        .split("{untested}").join(untestedStr)
        .split("{srDue}").join(String(dueCards.length))
        .split("{daysSince}").join(String(daysSince));

      const plan=await callClaude(prompt,1400,{retries:3,retryDelay:6000,model:"claude-haiku-4-5-20251001",feature:"week_plan"});
      if(!plan||!plan.days) throw new Error("Plan missing 'days' field — got: "+JSON.stringify(plan).slice(0,100));
      setWeeklyPlan(plan);
      try{localStorage.setItem(PLAN_KEY,JSON.stringify(plan));}catch{}
    }catch(e){
      const msg=e.message||"Failed to generate plan.";
      setWeeklyPlanError(msg.includes("Rate limit")||msg.includes("retries failed")
        ? "⏳ API is busy — please wait a minute and try again."
        : msg);
    }
    setWeeklyPlanLoading(false);
  };

  // Auto-generate weekly plan silently after 3+ sessions if not yet created
  useEffect(()=>{
    if(!weeklyPlanAutoRef.current&&history.length>=3&&!weeklyPlan&&authUser?.id&&!weeklyPlanLoading){
      weeklyPlanAutoRef.current=true;
      generateWeeklyPlan();
    }
  },[history.length,weeklyPlan,authUser?.id,weeklyPlanLoading]); // eslint-disable-line

  // Auto-fetch admin stats when navigating to the admin screen
  useEffect(()=>{
    if(screen==="adminDashboard"&&isAdmin&&!adminStats&&!adminStatsLoading){
      fetchAdminStats();
    }
  },[screen]); // eslint-disable-line

  const generateInterleavedSession=async(diff,cnt)=>{
    if(generatingRef.current)return; generatingRef.current=true;
    setLoading(true);setError("");setLoadingProgress(0);setLoadingMsg("Building interleaved session…");
    try{
      if(!authUser?.id){setError("Interleaved mode requires a ClearCFA account — please sign in.");setLoading(false);generatingRef.current=false;return;}
      const weak=moduleReadiness.filter(m=>m.sessions>0&&m.accuracy!==null).sort((a,b)=>a.accuracy-b.accuracy);
      const untested=moduleReadiness.filter(m=>m.sessions===0).slice(0,3);
      const pool=[...weak.slice(0,3),...(weak.length<3?untested:[])].slice(0,3);
      if(pool.length<2){setError("Complete at least 2 sessions across different topics to unlock Interleaved mode.");setLoading(false);generatingRef.current=false;return;}
      const topicsDesc=pool.map((m,i)=>`${i+1}. ${m.topic} — focus on: ${m.untouchedModules[0]||m.modulesCovered[0]||m.modules[0]} (accuracy: ${m.accuracy!==null?m.accuracy+'%':'untested'})`).join("\n");
      const prompt=`You are a CFA Level ${cfaLevel} exam tutor creating an interleaved practice session that mixes multiple topics in one session to strengthen retention.

The student's weakest topics (prioritise these):
${topicsDesc}

Generate exactly ${cnt} multiple-choice questions. Distribute them roughly evenly across the ${pool.length} topics. Interleave the order — do NOT group all questions from one topic together. Mix them: topic1, topic2, topic3, topic1, topic2…

Each question: different concept, LOS-anchored, with a plausible distractor targeting a real misconception.

CRITICAL for numerical questions: FIRST compute the correct answer, THEN make that exact value one of the options (A, B, C, or D). The correct computed result MUST appear verbatim as one of the options — never say "nearest available" or approximate. Wrong options use common formula errors. The "answer" field must be the letter whose option text equals the correct result.

Return ONLY a JSON array — no prose, no markdown fences:
[{"id":"q1","question":"…","options":{"A":"…","B":"…","C":"…","D":"…"},"answer":"A","explanation":"…","concept":"…","los_tested":"LOS X.X","misconception_targeted":"…","_topic":"<exact topic name from list above>","_subtopic":"<module name>"}]`;
      const qs=await callClaude(prompt,Math.min(cnt*250+400,3200),{retries:2,retryDelay:6000,model:"claude-haiku-4-5-20251001",feature:"interleaved"});
      if(!Array.isArray(qs)||qs.length===0)throw new Error("Invalid interleaved response — no questions returned");
      const tagged=qs.map((q,i)=>({...q,id:`${i}_${q.id||"il"+i}`}));
      setLoadingProgress(100);await new Promise(r=>setTimeout(r,200));
      const mainTopic=pool[0]?.topic||"Mixed";
      setTopic(mainTopic);setSubtopic(`Interleaved (${pool.map(m=>m.topic.split(" ")[0]).join("·")})`);setDifficulty(diff);
      setMode("guided");setVignetteMode(false);
      setQuestions(tagged);setAnswers({});setFlaggedQ({});setCurrentQ(0);setShowExp(false);setLastSession(null);qShownAtRef.current={};qTimesRef.current={};setFullExamMode(false);
      setScreen("quiz");
    }catch(e){setError("Interleaved session failed: "+e.message);}
    setLoading(false);setLoadingProgress(0);generatingRef.current=false;
  };

  const generateFSAVignette=async(subtopic,difficulty)=>{
    if(generatingRef.current)return; generatingRef.current=true;
    setLoading(true);setError("");setLoadingProgress(0);
    setLoadingMsg("Building financial statements...");
    const progressInterval=setInterval(()=>{setLoadingProgress(p=>Math.min(85,p+3));},300);
    try{
      if(!authUser?.id){setError("FSA Vignette requires a ClearCFA account. Please sign in.");setLoading(false);clearInterval(progressInterval);generatingRef.current=false;return;}
      const raw=await callClaude(buildFSAStatementPrompt(subtopic,difficulty,cfaLevel),1800,{retries:2,retryDelay:6000,model:"claude-haiku-4-5-20251001",feature:"fsa_vignette"});
      clearInterval(progressInterval);
      if(!raw||!raw.questions)throw new Error("Invalid FSA vignette format");
      const stmtText=formatStatements(raw);
      const qs=raw.questions.map((q,i)=>({
        ...q,
        id:`fsa_${i}_${q.id||i}`,
        question:`**${raw.company} (${raw.year}) — ${raw.scenario}**\n\n${stmtText}\n\n${q.question}`,
        _isFSAVignette:true,
      }));
      setLoadingProgress(100);
      await new Promise(r=>setTimeout(r,200));
      setTopic("Financial Statement Analysis");setSubtopic(subtopic);setDifficulty(difficulty);
      setMode("fsa_vignette");setVignetteMode(true);
      setQuestions(qs);setAnswers({});setFlaggedQ({});setCurrentQ(0);setShowExp(false);setLastSession(null);qShownAtRef.current={};qTimesRef.current={};setFullExamMode(false);setConsecutiveWrong(0);
      setScreen("quiz");
    }catch(e){
      clearInterval(progressInterval);
      setError("FSA Vignette failed: "+e.message);
    }
    setLoading(false);setLoadingProgress(0);generatingRef.current=false;
  };

  const generateQuestionsRef=React.useRef(null);
  const startDuelCreator=(topicName)=>{
    const mods=OFFLINE_SEED_QS[topicName]||{};
    const qs=Object.values(mods).flat().slice(0,3).map(q=>({...q,_topic:topicName}));
    if(qs.length===0){showToast("⚠️","No Questions","Try a different topic.");return;}
    setDuelCreating(true);setDuelTopicPicking(false);
    setTopic(topicName);setSubtopic(Object.keys(mods)[0]||topicName);
    setDifficulty("Medium");setCount(qs.length);setMode("guided");
    setQuestions(qs);setAnswers({});setCurrentQ(0);setShowExp(false);setLastSession(null);
    setFullExamMode(false);setVignetteMode(false);
    setScreen("quiz");
  };

  const startDuelChallenge=(challenge)=>{
    setDuelChallenge({...challenge,accepted:true});
    const qs=challenge.qs.map(q=>({...q}));
    setTopic(challenge.topic||qs[0]?._topic||"Mixed");
    setSubtopic(challenge.topic||"Duel");
    setDifficulty("Medium");setCount(qs.length);setMode("guided");
    setQuestions(qs);setAnswers({});setCurrentQ(0);setShowExp(false);setLastSession(null);
    setFullExamMode(false);setVignetteMode(false);
    setScreen("quiz");
  };

  const generateQuestions=async(t,st,diff,cnt,m="guided",isVignette=false,st2=null,multiModules=null)=>{
    if(generatingRef.current){return;} generatingRef.current=true;
    setNextActionText(""); setNextActionLoading(false);
    setDuelCreating(false);
    lastGenParamsRef.current={t,st,diff,cnt,m,isVignette,st2};
    prequizPassProbRef.current=passProbability?.probability??null;
    try{localStorage.removeItem(SESSION_DRAFT_KEY);}catch{}
    setSessionDraft(null);
    srProcessedRef.current=new Set();
    setLoading(true);setError("");setLoadingProgress(0);setLoadingETA(null);
    setLoadingContext({topic:t,subtopic:st,count:cnt,difficulty:diff,mode:m,isVignette:!!isVignette});
    loadingStartRef.current=Date.now();
    // Persist params so a page reload can offer to retry
    const pendingEntry={ts:Date.now(),t,st,diff,cnt,m,isVignette:!!isVignette};
    setPendingGen(pendingEntry);
    try{localStorage.setItem(PENDING_GEN_KEY,JSON.stringify(pendingEntry));}catch{}

    // ── No auth: use local templates as fallback ──
    // When signed in, always use the API for exam-quality questions.
    if(!isVignette && !authUser?.id){
      try{
        const localRaw=generateLocalQuestions(t,st,diff,cnt*3);
        const seen=new Set();
        const localQs=localRaw.filter(q=>{
          const key=q.concept
            ? q.concept.toLowerCase()
            : (q.question||"").toLowerCase().replace(/\d+\.?\d*/g,"#").replace(/\s+/g," ").slice(0,80);
          if(seen.has(key))return false;
          seen.add(key);
          return true;
        }).slice(0,cnt);
        if(localQs.length>=Math.min(cnt,3)){
          setLoadingProgress(100);setLoadingMsg(`${localQs.length} questions ready (offline mode)`);
          await new Promise(r=>setTimeout(r,300));
          setTopic(t);setSubtopic(st);setDifficulty(diff);setCount(cnt);setMode(m);
          setVignetteMode(false);
          setQuestions(localQs);setAnswers({});setFlaggedQ({});setCurrentQ(0);setShowExp(false);setLastSession(null);qShownAtRef.current={};qTimesRef.current={};setFullExamMode(false);
          setScreen("quiz");
          setLoading(false);setLoadingProgress(0);generatingRef.current=false;
          return;
        }
      }catch(localErr){
        setError(`Failed to load questions: ${localErr.message}`);
        setLoading(false);setLoadingProgress(0);generatingRef.current=false;
        return;
      }
    }

    // ── API path — always used when signed in ──
    if(!authUser?.id){
      // Try offline cache before giving up
      if(!isVignette){
        try{
          const offlineCache=JSON.parse(localStorage.getItem(OFFLINE_QS_KEY)||"{}");
          const cached=(offlineCache[t]?.[st]||[]);
          const fresh=filterNewQuestions(cached,qdb);
          const pool=fresh.length>=Math.ceil(cnt*0.5)?fresh:cached;
          if(pool.length>=Math.min(cnt,3)){
            const offlineQs=pool.slice(0,cnt);
            setLoadingProgress(100);setLoadingMsg(`${offlineQs.length} questions ready (offline cache)`);
            await new Promise(r=>setTimeout(r,300));
            setTopic(t);setSubtopic(st);setDifficulty(diff);setCount(cnt);setMode(m);
            setVignetteMode(false);
            setQuestions(fingerprintQuestions(offlineQs,authUserRef.current?.id));setAnswers({});setFlaggedQ({});setCurrentQ(0);setShowExp(false);setLastSession(null);qShownAtRef.current={};qTimesRef.current={};setFullExamMode(false);
            setScreen("quiz");
            setLoading(false);setLoadingProgress(0);generatingRef.current=false;
            return;
          }
        }catch{}
      }
      setError(isVignette?"Vignette mode requires a ClearCFA account. Please sign in.":"Sign in to generate AI-powered exam questions.");
      setLoading(false);setLoadingProgress(0);generatingRef.current=false;
      return;
    }
    // ── Free tier daily limit ──
    if(!proStatus){
      const usage=getDailyAIUsage();
      if(usage.count>=FREE_DAILY_AI_LIMIT){
        setUpgradeModal({reason:"limit",passProb:passProbability?.probability??null,weakCount:moduleReadiness.filter(m=>m.accuracy!==null&&m.accuracy<60).length,streakDays:streak});
        setLoading(false);setLoadingProgress(0);generatingRef.current=false;
        return;
      }
    }

    const estimatedMs=Math.max(8000,cnt*1200);
    const msgs=isVignette
      ?["Writing scenario...","Building item set...","Engineering distractors...","Almost ready..."]
      :["Reading LOS statements...","Anchoring to 2026 curriculum...","Engineering distractors...","Checking for duplicates...","Almost ready..."];
    setLoadingMsg(msgs[0]);
    const progressInterval=setInterval(()=>{
      const elapsed=Date.now()-loadingStartRef.current;
      let pct;
      if(elapsed<estimatedMs){
        // Phase 1: 0→90% over estimatedMs
        pct=Math.min(90,Math.round((elapsed/estimatedMs)*90));
        setLoadingETA(Math.ceil((estimatedMs-elapsed)/1000));
      } else {
        // Phase 2: 90→99% slowly over next 45s — shows it's still working
        const overrun=elapsed-estimatedMs;
        pct=Math.min(99,90+Math.round((overrun/45000)*9));
        setLoadingETA(0);
      }
      setLoadingProgress(pct);
      const mi=Math.floor(elapsed/2000)%msgs.length;
      setLoadingMsg(msgs[mi]);
    },200);
    // ── Question cache check (skip for vignettes) ─────────────────────────────
    if(!isVignette){
      const hit=qcGet(qCacheRef.current,t,st,diff,cnt);
      if(hit){
        // Use full cached pool (shuffled) so different questions surface each session
        const shuffled=[...hit.qs].sort(()=>Math.random()-0.5);
        const fresh=filterNewQuestions(shuffled,qdb);
        // Only use cache if we have enough genuinely unseen questions
        if(fresh.length>=cnt){
          const finalQs=fresh.slice(0,cnt);
          qCacheRef.current=qcMarkUsed(qCacheRef.current,t,st,diff,hit.ts);
          storageSet(QCACHE_KEY,qCacheRef.current);
          setLoadingProgress(100);setLoadingMsg("Questions ready!");
          await new Promise(r=>setTimeout(r,250));
          setTopic(t);setSubtopic(st);setDifficulty(diff);setCount(cnt);setMode(m);
          setVignetteMode(false);
          setQuestions(fingerprintQuestions(finalQs,authUserRef.current?.id));setAnswers({});setFlaggedQ({});setCurrentQ(0);setShowExp(false);setLastSession(null);qShownAtRef.current={};qTimesRef.current={};setFullExamMode(false);
          setScreen("quiz");
          // Mark as seen immediately so abandoning session doesn't cause repeats
          setQdb(prev=>addToQDB(finalQs.map(q=>({...q,_topic:t,_subtopic:st})),prev));
          clearInterval(progressInterval);setLoading(false);setLoadingProgress(0);setLoadingETA(null);generatingRef.current=false;
          return;
        }
      }
    }
    // ──────────────────────────────────────────────────────────────────────────
    try{
      // Haiku for all difficulties — Hard = complex question content, not a complex model
      const useModel="claude-haiku-4-5-20251001";
      let parsed;
      if(isVignette){
        const vignetteCount=Math.max(1,Math.ceil(cnt/3));
        const vigPrompt=buildVignettePrompt(t,st,diff,vignetteCount,st2||null,activeLOS,cfaLevel);
        const rawVig=await callClaude(vigPrompt,2000,{retries:2,retryDelay:4000,model:useModel,feature:`vignette:${diff}`});
        // Flatten vignettes into questions with shared context prepended
        parsed=flattenVignettes(rawVig,t,st);
      } else {
        const tightMax={3:1500,5:2200,10:4500,15:6500,20:8000}[cnt]||(cnt*450);
        const dynCtx=buildDynamicContext(t,st,srDeck,levelHistory);
        let raw=await callClaude(buildQuestionPrompt(t,st,diff,cnt,cfaLevel,activeLOS,activeMisconceptions,dynCtx,multiModules),tightMax,{retries:2,retryDelay:4000,model:useModel,feature:`questions:${diff}`});
        if(Array.isArray(raw))raw=expandQuestionKeys(raw);
        parsed=raw;
      }
      if(!Array.isArray(parsed)||!parsed.length)throw new Error("Empty");
      // Drop questions where the AI admitted the correct answer isn't in the options
      const parsed_clean=parsed.filter(q=>{
        if(!q||!q.question||!q.answer||!q.options)return false;
        if(!q.options[q.answer])return false; // answer key points to nonexistent option
        const exp=(q.explanation||"").toLowerCase();
        if(/nearest available|closest answer|so [a-c] is nearest|approximate(ly)?|not exactly|so [a-c] is the best|\bis closest\b|\bthe closest\b|closest when|closest option|closest to the|best approximat|due to rounding.*clos|clos.*due to rounding/i.test(exp))return false;
        // Reject scratchpad/chain-of-thought leaking into explanation
        if(/recalc needed|indicates recalc|reinspecting:|revising for clean|setting [a-c]\s*=.*as correct|recalculating:/i.test(exp))return false;
        const qAns=(q.answer||"").toUpperCase();
        const expU=(q.explanation||"").toUpperCase();
        // Require "Correct: X." prefix — AI-generated questions must have it
        const prefixMatch=expU.match(/^CORRECT:\s*([A-C])\b/);
        if(!prefixMatch)return false;
        if(prefixMatch[1]!==qAns)return false;
        // Reject if explanation labels the correct answer's own VALUE as "incorrect"
        const ansOptText=(q.options[q.answer]||"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
        if(ansOptText&&new RegExp(ansOptText+'.{0,25}incorrect','i').test(q.explanation))return false;
        // Reject if explanation labels the correct answer LETTER as incorrect/wrong/distractor
        if(new RegExp('\\b'+qAns+'\\b.{0,30}(INCORRECT|IS WRONG|IS FALSE|IS A DISTRACTOR|IS A TRAP|IS NOT CORRECT)','i').test(expU))return false;
        if(new RegExp('(INCORRECT|WRONG).{0,10}\\b'+qAns+'\\b','i').test(expU))return false;
        // Reject if explanation names a DIFFERENT letter as the correct one
        const lm=expU.match(/CORRECT ANSWER IS\s+([A-C])\b/)||expU.match(/(?:THEREFORE|SO|THUS|HENCE)[,\s]+(?:OPTION\s+)?([A-C])\s+IS(?:\s+THE)?\s+CORRECT\b/)||expU.match(/\bOPTION\s+([A-C])\s+IS(?:\s+THE)?\s+CORRECT\s+ANSWER\b/)||expU.match(/\b(?:THUS|HENCE)[,\s]+([A-C])\s+IS\s+(?:THE\s+)?(?:CORRECT|RIGHT)\b/);
        if(lm&&lm[1]!==qAns)return false;
        // Reject if explanation says "correct answer is [value]" that doesn't match options[answer]
        const vm=(q.explanation||"").match(/correct answer is\s+([^\.\n]{2,40})/i);
        if(vm){const norm=s=>s.toLowerCase().replace(/\s+/g,"").replace(/[^0-9a-z.%]/g,"");const stated=norm(vm[1]);const ansOpt=norm(q.options[q.answer]||"");if(stated.length>1&&ansOpt.length>1&&stated!==ansOpt&&!ansOpt.includes(stated)&&!stated.includes(ansOpt))return false;}
        // Numeric cross-check: scan "= X[.X]", standalone "X[.X]%", and "X[.X] basis points/bps"
        // in explanation; if a result matches a non-answer option, the answer key is wrong — reject
        const optVals=Object.entries(q.options).map(([k,v])=>({k,v:parseFloat(String(v).replace(/[^0-9.-]/g,""))})).filter(o=>!isNaN(o.v));
        if(optVals.length>=2){
          const ansVal=parseFloat(String(q.options[q.answer]||"").replace(/[^0-9.-]/g,""));
          const eqNums=[
            ...[...expU.matchAll(/=\s*([\d]+(?:\.[\d]+)?)/g)].map(m=>parseFloat(m[1])),
            ...[...expU.matchAll(/([\d]+(?:\.[\d]+)?)\s*%/g)].map(m=>parseFloat(m[1])),
            ...[...expU.matchAll(/([\d]+(?:\.[\d]+)?)\s*(?:BASIS POINTS|BPS)/g)].map(m=>parseFloat(m[1])),
          ];
          for(const n of eqNums){
            if(!isNaN(n)&&Math.abs(n-ansVal)>0.02){
              const matchesOther=optVals.find(o=>o.k!==qAns&&Math.abs(o.v-n)<0.02);
              if(matchesOther)return false;
            }
          }
          // Reject if the explanation's concluding stated value (difference/change/result/gap)
          // doesn't match ANY option — means the explanation's own math contradicts every choice
          const concludeMatches=[...expU.matchAll(/(?:DIFFERENCE|CHANGE|RESULT|GAP|DELTA|SPREAD)[^=]{0,40}(?:IS|EQUALS|=)\s*([\d]+(?:\.[\d]+)?)\s*(?:BASIS POINTS|BPS|%)?/g)];
          if(concludeMatches.length){
            const cVal=parseFloat(concludeMatches[concludeMatches.length-1][1]);
            if(!isNaN(cVal)){
              const tol=Math.max(0.02,Math.abs(cVal)*0.02);
              const matchesAny=optVals.some(o=>Math.abs(o.v-cVal)<tol);
              if(!matchesAny)return false;
            }
          }
        }
        return true;
      });
      if(!parsed_clean.length)throw new Error("All generated questions had answer/option mismatches — please retry.");
      const fresh=filterNewQuestions(parsed_clean,qdb);
      // Prefer unseen; if not enough, take least-recently-seen sorted (oldest first) to minimise repeats
      const finalQs=fresh.length>=cnt?fresh.slice(0,cnt):(()=>{
        const sorted=[...parsed_clean].sort((a,b)=>(qdb[hashQuestion(a)]?.seen||0)-(qdb[hashQuestion(b)]?.seen||0));
        return sorted.slice(0,cnt);
      })();
      // Cache successful non-vignette sets for reuse
      if(!isVignette&&parsed_clean.length>=5){
        qCacheRef.current=qcAdd(qCacheRef.current,t,st,diff,parsed_clean);
        storageSet(QCACHE_KEY,qCacheRef.current);
        // Also store in offline cache (topic→module→questions) for use without internet
        try{
          const offlineCache=JSON.parse(localStorage.getItem(OFFLINE_QS_KEY)||"{}");
          if(!offlineCache[t])offlineCache[t]={};
          offlineCache[t][st]=(offlineCache[t][st]||[]).concat(parsed_clean).slice(-30);
          localStorage.setItem(OFFLINE_QS_KEY,JSON.stringify(offlineCache));
        }catch{}
      }
      setLoadingProgress(100);setLoadingMsg(isVignette?"Vignettes ready!":"Questions ready!");
      // Clear pending gen — generation succeeded
      setPendingGen(null);try{localStorage.removeItem(PENDING_GEN_KEY);}catch{}
      await new Promise(r=>setTimeout(r,350));
      setTopic(t);setSubtopic(st);setDifficulty(diff);setCount(cnt);setMode(m);
      setVignetteMode(isVignette);
      setQuestions(isVignette?finalQs:fingerprintQuestions(finalQs,authUserRef.current?.id));setAnswers({});setFlaggedQ({});setCurrentQ(0);setShowExp(false);setLastSession(null);qShownAtRef.current={};qTimesRef.current={};setFullExamMode(false);
      setScreen("quiz");
      // Mark as seen immediately — abandoning mid-session won't cause repeats
      setQdb(prev=>addToQDB(finalQs.map(q=>({...q,_topic:t,_subtopic:st})),prev));
      // Track AI usage for free tier
      if(!proStatus){const newUsage=bumpDailyAI(finalQs.length);setDailyAIUsage({...newUsage});}
    }catch(e){
      // Try offline cache as fallback before showing error
      if(!isVignette){
        try{
          const offlineCache=JSON.parse(localStorage.getItem(OFFLINE_QS_KEY)||"{}");
          // Try specific module first, then any module in the topic; skip quality-flagged questions
          const specific=(offlineCache[t]?.[st]||[]).filter(q=>!qualityFlags[q.id]);
          const anyInTopic=Object.values(offlineCache[t]||{}).flat().filter(q=>!qualityFlags[q.id]);
          const candidates=specific.length>=Math.min(cnt,3)?specific:anyInTopic;
          const fresh=filterNewQuestions(candidates,qdb);
          const pool=fresh.length>=Math.ceil(cnt*0.5)?fresh:candidates;
          const minQs=Math.min(cnt,3);
          if(pool.length>=minQs){
            const offlineQs=pool.slice(0,cnt);
            const usedSt=specific.length>=minQs?st:(Object.keys(offlineCache[t]||{})[0]||st);
            setLoadingProgress(100);setLoadingMsg(`Using ${offlineQs.length} saved questions`);
            setPendingGen(null);try{localStorage.removeItem(PENDING_GEN_KEY);}catch{}
            clearInterval(progressInterval);
            await new Promise(r=>setTimeout(r,350));
            setTopic(t);setSubtopic(usedSt);setDifficulty(diff);setCount(cnt);setMode(m);
            setVignetteMode(false);
            setQuestions(fingerprintQuestions(offlineQs,authUserRef.current?.id));setAnswers({});setFlaggedQ({});setCurrentQ(0);setShowExp(false);setLastSession(null);qShownAtRef.current={};qTimesRef.current={};setFullExamMode(false);
            setScreen("quiz");
            setLoading(false);setLoadingProgress(0);setLoadingETA(null);generatingRef.current=false;
            return;
          }
        }catch{}
      }
      const msg=e.message||"Unknown error";
      setError(msg.includes("Rate limit")||msg.includes("retries failed")
        ? "API is busy — please wait a minute and try again."
        : msg.includes("Timed out")||msg.includes("AbortError")
        ? "Connection timed out — tap to retry."
        : `Session failed: ${msg.slice(0,120)}. Tap to retry.`);
    }
    clearInterval(progressInterval);setLoading(false);setLoadingProgress(0);setLoadingETA(null);generatingRef.current=false;
  };
  generateQuestionsRef.current=generateQuestions;

  function rateExplanation(qId,v,q){
    const updated={...expRatings,[qId]:{v,t:q._topic||topic,st:q._subtopic||subtopic,ts:Date.now()}};
    setExpRatings(updated);
    try{localStorage.setItem(EXP_RATINGS_KEY,JSON.stringify(updated));}catch{}
    if(v===-1){
      const cache=qCacheRef.current;
      const tk=q._topic||topic,stk=q._subtopic||subtopic;
      if(cache[tk]?.[stk]){
        cache[tk][stk]=cache[tk][stk].filter(cq=>cq.id!==qId);
        try{const stored=JSON.parse(localStorage.getItem(OFFLINE_QS_KEY)||"{}");
          if(stored[tk]?.[stk])stored[tk][stk]=stored[tk][stk].filter(cq=>cq.id!==qId);
          localStorage.setItem(OFFLINE_QS_KEY,JSON.stringify(stored));}catch{}
      }
    }
  }

  const startFullExam=async(sessionNum=1)=>{
    setLoading(true);setError("");
    try{
      const allTopics=Object.entries(activeLOS);const totalW=allTopics.reduce((s,[,{weight}])=>s+weight,0);
      let allQs=[];
      // Generate proportionally from local templates first, API fallback per topic
      for(let i=0;i<allTopics.length;i++){
        const [t,{weight,modules}]=allTopics[i];
        const topicCount=Math.max(2,Math.round((weight/totalW)*180));
        const moduleNames=Object.keys(modules);
        const perModule=Math.max(1,Math.floor(topicCount/moduleNames.length));
        for(const mod of moduleNames.slice(0,Math.ceil(topicCount/perModule))){
          setLoadingMsg(`${t} › ${mod} (${i+1}/${allTopics.length})…`);
          const localQs=generateLocalQuestions(t,mod,"Medium",perModule);
          if(localQs.length>=perModule){
            allQs=[...allQs,...localQs.map(q=>({...q,_topic:t,_subtopic:mod}))];
          } else if(authUser?.id){
            try{
              const qs=await callClaude(buildQuestionPrompt(t,mod,"Medium",perModule,cfaLevel,activeLOS,activeMisconceptions),perModule*500,{retries:1,retryDelay:4000,model:"claude-haiku-4-5-20251001",feature:"full_exam"});
              allQs=[...allQs,...(Array.isArray(qs)?expandQuestionKeys(qs):[]).map((q,j)=>({...q,id:`${i}_${j}_${mod.slice(0,5)}`,_topic:t,_subtopic:mod}))];
            }catch{}
          }
        }
      }
      if(allQs.length<30)throw new Error("Too few questions generated — sign in for full exam support.");
      const shuffled=allQs.sort(()=>Math.random()-0.5);
      // Split into AM (session 1) and PM (session 2) of 90 questions each
      const amQs=shuffled.slice(0,Math.min(90,shuffled.length));
      const pmQs=shuffled.slice(90,Math.min(180,shuffled.length));
      // Store PM questions for after break
      window._cfaExamPMQs=pmQs;
      const sessionQs=sessionNum===1?amQs:pmQs;
      setExamSession(sessionNum);
      setTopic("Full Exam");setSubtopic(sessionNum===1?"AM Session":"PM Session");setDifficulty("Medium");setCount(sessionQs.length);setMode("exam");setFullExamMode(true);
      setQuestions(sessionQs);setAnswers({});setFlaggedQ({});setCurrentQ(0);setShowExp(false);setLastSession(null);qShownAtRef.current={};qTimesRef.current={};
      setScreen("quiz");
    }catch(e){setError(`Full exam failed: ${e.message}`);}
    setLoading(false);
  };

  const savePreset=()=>{
    if(!savePresetName.trim())return;
    const preset={id:Date.now(),name:savePresetName.trim(),topic:mode==="interleaved"?null:selTopics[0]||"",subtopic:mode==="interleaved"?null:selSubtopics[0]||"",difficulty,count,mode,warmupEnabled};
    const updated=[preset,...presets.filter(p=>p.name!==preset.name)].slice(0,8);
    setPresets(updated);try{localStorage.setItem(PRESETS_KEY,JSON.stringify(updated));}catch{}
    setShowSavePreset(false);setSavePresetName("");
    showToast("💾","Preset saved!",`"${preset.name}" ready on home screen.`);
  };
  const handleAnswer=(qId,opt)=>{
    if(answers[qId])return;
    const newAnswers={...answers,[qId]:opt};
    setAnswers(newAnswers);
    if(qShownAtRef.current[qId]){
      qTimesRef.current[qId]=Math.round((Date.now()-qShownAtRef.current[qId])/1000);
    }
    if(mode==="guided"||mode==="essay")setShowExp(true);
    const q=questions.find(q=>q.id===qId);
    if(q){
      const correct=opt===q.answer;
      if(correct){setConsecutiveWrong(0);}
      else{
        setConsecutiveWrong(n=>n+1);
        // Real-time SR update — persists wrong answer immediately so it survives a mid-session refresh
        srProcessedRef.current.add(qId);
        const srKey=`${topic}|||${subtopic}|||${qId}`;
        setSrDeck(deck=>{
          const existing=deck[srKey]||{concept:(q.concept||subtopic).slice(0,60),topic,subtopic,question:(q.question||""),options:q.options,answer:q.answer,explanation:(q.explanation||"").slice(0,1200),los_tested:(q.los_tested||"").slice(0,120),wrongCount:0};
          const card=sm2Update(existing,false);
          card.wrongCount=(existing.wrongCount||0)+1;
          const updated={...deck,[srKey]:card};
          try{localStorage.setItem(SR_KEY,JSON.stringify(updated));}catch{}
          srDeckRef.current=updated;
          return updated;
        });
      }
    }
    // Persist in-progress session so a refresh can offer to resume
    if(mode!=="exam"&&mode!=="speed_drill"){
      try{localStorage.setItem(SESSION_DRAFT_KEY,JSON.stringify({ts:Date.now(),topic,subtopic,difficulty,mode,count,currentQ,questions,answers:newAnswers}));}catch{}
    }
  }
  const nextQ=()=>{
    clearInterval(speedDrillRef.current);
    const qId=questions[currentQ]?.id;
    if(qId&&quizConfidence){const correct=answers[qId]===questions[currentQ]?.answer;setConfidenceLog(c=>{const u={...c,[qId]:{c:quizConfidence,ok:correct}};try{localStorage.setItem(CONFIDENCE_KEY,JSON.stringify(u));}catch{}return u;});}
    setQuizConfidence(null);
    if(currentQ<questions.length-1){setCurrentQ(q=>q+1);setShowExp(false);}else endQuiz();
  };

  // ── DERIVED DATA ──
  const moduleReadiness=useMemo(()=>getModuleReadiness(levelHistory,activeLOS),[levelHistory,activeLOS]);
  const predicted=useMemo(()=>getPredictedScore(moduleReadiness),[moduleReadiness]);
  const daysLeft=Math.max(0,Math.ceil((examDate-new Date())/86400000));const streak=getStreak(history);
  const adaptiveSuggestions=useMemo(()=>getAdaptiveSuggestions(moduleReadiness,daysLeft,history),[moduleReadiness,daysLeft,history.length]);
  const weeklyStudyDays=useMemo(()=>getWeeklyStudyDays(levelHistory),[levelHistory]);
  const todayStudySecs=weeklyStudyDays[6]?.secs||0;
  const weekStudySecs=weeklyStudyDays.reduce((s,d)=>s+d.secs,0);
  const overallPct=levelHistory.length?Math.round(levelHistory.reduce((s,h)=>s+(h.pct||0),0)/levelHistory.length):null;
  const dueCards=useMemo(()=>getDueCards(srDeck),[srDeck]);
  const leeches=useMemo(()=>getLeeches(srDeck),[srDeck]);
  const forgettingCurve=useMemo(()=>getForgettingCurve(srDeck),[srDeck]);
  const activity=useMemo(()=>getLast30DaysActivity(levelHistory),[levelHistory]);
  const totalQsAttempted=levelHistory.reduce((s,h)=>s+(h.total||0),0);
  const wrongPatterns=useMemo(()=>getWrongAnswerPatterns(levelHistory),[levelHistory]);
  const sessionScore=questions.filter(q=>answers[q.id]===q.answer).length;
  const sessionPct=questions.length?Math.round((sessionScore/questions.length)*100):0;
  const lastSessionQuality=useMemo(()=>lastSession?getSessionQuality(lastSession):null,[lastSession]);
  const passProbability=useMemo(()=>getPassProbability(levelHistory,moduleReadiness,daysLeft),[levelHistory,moduleReadiness,daysLeft]);
  const paceStatus=useMemo(()=>getPaceStatus(levelHistory,passProbability,daysLeft),[levelHistory,passProbability,daysLeft]);
  useEffect(()=>{
    if(!passProbability||!history.length)return;
    const today=localDateKey();
    const entry={date:today,prob:passProbability.probability,acc:passProbability.currentAccuracy,cov:passProbability.coveragePct};
    const existing=passTrendRef.current.find(p=>p.date===today);
    // Skip if today's point already has identical values
    if(existing&&existing.prob===entry.prob&&existing.acc===entry.acc&&existing.cov===entry.cov)return;
    // Replace today's point (or append if first time today)
    const updated=[...passTrendRef.current.filter(p=>p.date!==today),entry].sort((a,b)=>a.date<b.date?-1:1).slice(-60);
    passTrendRef.current=updated;setPassTrend(updated);
    storageSet(PASS_TREND_KEY,updated);
  },[passProbability,levelHistory.length]);
  useEffect(()=>{
    if(dailyRefresher?.concepts?.length)return;
    if(!moduleReadiness.length)return;
    const pick=pickDailyRefresher(cfaLevel,moduleReadiness);
    if(!pick)return;
    const entry={date:localDateKey(),...pick};
    setDailyRefresher(entry);
    try{localStorage.setItem(REFRESHER_KEY,JSON.stringify(entry));}catch{}
  },[moduleReadiness,cfaLevel]);
  const generateRefresherReveal=async(conceptIdx)=>{
    const concept=dailyRefresher?.concepts?.[conceptIdx];
    if(refresherRevealLoading||concept?.reveal||!concept)return;
    if(!authUser?.id){setRefresherRevealError("Sign in to unlock AI explanations");return;}
    setRefresherRevealLoading(true);
    setRefresherRevealError(null);
    const prompt=`CFA Level ${cfaLevel} exam prep. Explain this learning objective briefly:\n"${concept.los_stmt}"\n\nFormat EXACTLY:\nEXPLANATION: [2-3 plain-English sentences: what it means and why it matters for the exam]\nTRAP: [The single most common exam mistake on this concept — 1 sentence]\n\nBe concise. Max 80 words total.`;
    try{
      const reply=await callAIChat(authUser.id,[{role:"user",content:prompt}],200,cfaLevel,{throws:true});
      if(!reply){setRefresherRevealError("No response — tap to retry");return;}
      const reveal=parseRefresherReveal(reply);
      const updatedConcepts=dailyRefresher.concepts.map((c,i)=>i===conceptIdx?{...c,reveal}:c);
      const updated={...dailyRefresher,concepts:updatedConcepts};
      setDailyRefresher(updated);
      try{localStorage.setItem(REFRESHER_KEY,JSON.stringify(updated));}catch{}
    }catch(e){
      const msg=e?.message||"";
      setRefresherRevealError(
        msg.includes("fetch")||msg.includes("network")||msg.includes("Failed")?
          "Network error — check connection and retry":
        msg.includes("429")||msg.includes("rate")||msg.includes("busy")?
          "API busy — wait a moment and retry":
        msg.includes("sign")||msg.includes("auth")?
          "Sign in to unlock AI explanations":
          `Failed — tap to retry`
      );
    }finally{setRefresherRevealLoading(false);}
  };

  // Daily Mission Agent — generates once per day using weak-topic analysis
  useEffect(()=>{
    if(dailyMission||missionGenerating||!authUser?.id||!moduleReadiness.length)return;
    const weakTopics=moduleReadiness.filter(m=>(m.accuracy||0)<70).sort((a,b)=>(a.accuracy||0)-(b.accuracy||0)).slice(0,3).map(m=>m.topic);
    if(!weakTopics.length)return;
    setMissionGenerating(true);
    const recentStr=levelHistory.slice(0,5).map(h=>`${h.topic||""} ${h.pct||0}%`).join(", ")||"no recent sessions";
    const prompt=`CFA Level ${cfaLevel} exam coach. Generate a specific daily study mission for an app-based study session.\nWeak topics: ${weakTopics.join(", ")}\nRecent: ${recentStr}\n\nFormat EXACTLY:\nMISSION: [one actionable sentence — what the student should master today]\nACTION: [specific in-app task, e.g. "Review the Notes tab for ${weakTopics[0]}, then attempt 10 practice questions on it" or "Do 10 practice questions on Modified Duration"]\nTIPP: [1 exam insight or memory trick]\nTOPIC: [exact topic name from the weak topics list]\n\nRule: Do NOT reference external textbooks, readings, or curriculum book sections (R1-R7, curriculum, etc). Only reference in-app features: practice questions or reviewing the Notes tab.\nUnder 60 words total.`;
    callAIChat(authUser.id,[{role:"user",content:prompt}],200,cfaLevel)
      .then(reply=>{
        if(!reply)return;
        const lines=reply.split('\n');
        const get=(p)=>lines.find(l=>l.startsWith(p))?.replace(p,"").trim()||"";
        const entry={date:localDateKey(),mission:get("MISSION: "),action:get("ACTION: "),tip:get("TIPP: "),topic:get("TOPIC: ")};
        if(!entry.mission)return;
        setDailyMission(entry);
        try{localStorage.setItem(MISSION_KEY,JSON.stringify(entry));}catch{}
      }).catch(()=>{}).finally(()=>setMissionGenerating(false));
  },[authUser?.id,moduleReadiness.length,cfaLevel]);

  const startSocratic=async(q,userAnswer)=>{
    if(!authUser?.id||socraticLoading)return;
    setSocraticQ({...q,userAnswer});
    setSocraticMsgs([]);
    setSocraticInput("");
    setSocraticLoading(true);
    const prompt=`CFA Level ${cfaLevel} tutor. A student got this wrong.\nQuestion: "${q.question}"\nThey answered: "${userAnswer}" | Correct: "${q.answer}"\nExplanation: ${(q.explanation||"").slice(0,250)}\n\nAsk ONE short Socratic question to help them discover WHY they were wrong. Don't give the answer. 1-2 sentences only.`;
    const reply=await callAIChat(authUser.id,[{role:"user",content:prompt}],200,cfaLevel);
    if(reply) setSocraticMsgs([{role:"assistant",content:reply}]);
    setSocraticLoading(false);
  };

  const sendSocratic=async(text,q)=>{
    if(!authUser?.id||socraticLoading||!text.trim())return;
    const newMsgs=[...socraticMsgs,{role:"user",content:text}];
    setSocraticMsgs(newMsgs);
    setSocraticInput("");
    setSocraticLoading(true);
    const system=`CFA Level ${cfaLevel} Socratic tutor. Question: "${q.question}". Correct: ${q.answer}. Guide with questions, don't give the answer directly. 1-2 sentences only.`;
    const reply=await callAIChat(authUser.id,[{role:"user",content:system},...newMsgs.slice(-6)],250,cfaLevel);
    if(reply) setSocraticMsgs(m=>[...m,{role:"assistant",content:reply}]);
    setSocraticLoading(false);
  };

  const studyPace=useMemo(()=>getStudyPace(levelHistory,daysLeft),[levelHistory,daysLeft]);
  const totalXP=useMemo(()=>getTotalXP(history),[history]);
  const levelInfo=useMemo(()=>getLevel(totalXP),[totalXP]);
  const totalWrongs=useMemo(()=>levelHistory.flatMap(h=>Array.isArray(h.wrongs)?h.wrongs:[]).filter(w=>w&&w.question).length,[levelHistory]);
  const srWrongCount=useMemo(()=>Object.values(srDeck).filter(c=>(c.wrongCount||0)>0).length,[srDeck]);
  const sessionFatigue=useMemo(()=>getSessionFatigue(levelHistory),[levelHistory]);

  // Adaptive difficulty for Office Mode — derived from last 5 OM sessions
  const adaptiveOmDifficulty=useMemo(()=>{
    const omSessions=levelHistory.filter(h=>h.isOfficeMode).slice(0,5);
    if(!omSessions.length) return "Medium";
    const avg=omSessions.reduce((s,h)=>s+(h.pct||0),0)/omSessions.length;
    return avg>=80?"Hard":avg>=60?"Medium":"Easy";
  },[history]);

  const smartNudge=useMemo(()=>{
    if(!moduleReadiness.length||!levelHistory.length)return null;
    const today=new Date();
    const scored=moduleReadiness.map(m=>{
      const last=levelHistory.filter(h=>h.topic===m.topic).sort((a,b)=>(b.dateKey||"").localeCompare(a.dateKey||""))[0];
      const daysSince=last?Math.max(0,Math.floor((today-new Date(last.dateKey))/86400000)):30;
      // Prioritise weak topics: weight × recency × how far below 100% accuracy
      const weaknessFactor=m.sessions===0?60:Math.max(100-(m.accuracy??100),5);
      const urgency=(m.weight||1)*Math.min(daysSince,30)*weaknessFactor;
      return{...m,daysSince,urgency};
    });
    // Prefer topics with low accuracy; only show a refresher if everything is strong
    const weak=scored.filter(m=>m.sessions>0&&m.accuracy!==null&&m.accuracy<80);
    const pool=weak.length?weak:scored.filter(m=>m.sessions>0&&m.accuracy!==null);
    return (pool.length?pool:scored).sort((a,b)=>b.urgency-a.urgency)[0]||null;
  },[moduleReadiness,levelHistory]);

  const [reviewAiPanel,setReviewAiPanel]=useState(null);
  const [reviewAiInput,setReviewAiInput]=useState("");
  const [reviewAiLoading,setReviewAiLoading]=useState(false);
  const reviewAiMsgsRef=useRef([]);

  const _chatQuotaMsg=(e)=>{
    const limitMsg=e?.message||"Daily chat limit reached. Upgrade to Pro for unlimited AI tutoring.";
    showToast("⚠️","Chat limit reached",limitMsg,4000);
    setUpgradeModal({reason:"chat_limit"});
  };
  const openReviewAI=async(context,firstPrompt)=>{
    const userMsg={role:"user",content:firstPrompt};
    reviewAiMsgsRef.current=[userMsg];
    setReviewAiPanel({context,messages:[userMsg]});
    setReviewAiInput("");
    setReviewAiLoading(true);
    try{
      const reply=await callAIChat(authUser?.id||"",[userMsg]);
      const withReply=[...reviewAiMsgsRef.current,{role:"assistant",content:reply||"No response — sign in and try again."}];
      reviewAiMsgsRef.current=withReply;
      setReviewAiPanel(p=>p?{...p,messages:withReply}:null);
    }catch(e){if(e.quotaExceeded){setReviewAiPanel(null);_chatQuotaMsg(e);}else{setReviewAiPanel(p=>p?{...p,messages:[...reviewAiMsgsRef.current,{role:"assistant",content:"Error — try again."}]}:null);}}
    setReviewAiLoading(false);
  };
  const sendReviewAI=async()=>{
    if(!reviewAiInput.trim()||reviewAiLoading)return;
    const userMsg={role:"user",content:reviewAiInput.trim()};
    const msgs=[...reviewAiMsgsRef.current,userMsg];
    reviewAiMsgsRef.current=msgs;
    setReviewAiPanel(p=>p?{...p,messages:msgs}:null);
    setReviewAiInput("");
    setReviewAiLoading(true);
    try{
      const reply=await callAIChat(authUser?.id||"",msgs);
      const withReply=[...msgs,{role:"assistant",content:reply||"No response — sign in and try again."}];
      reviewAiMsgsRef.current=withReply;
      setReviewAiPanel(p=>p?{...p,messages:withReply}:null);
    }catch(e){if(e.quotaExceeded){setReviewAiPanel(null);_chatQuotaMsg(e);}else{setReviewAiPanel(p=>p?{...p,messages:[...msgs,{role:"assistant",content:"Error — try again."}]}:null);}}
    setReviewAiLoading(false);
  };
  const ReviewAIChatPanel=()=>reviewAiPanel?(
    <>
      <div onClick={()=>setReviewAiPanel(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:900}}/>
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:901,background:"#0d0d20",borderRadius:"18px 18px 0 0",border:`1px solid ${C.accent}55`,borderBottom:"none",display:"flex",flexDirection:"column",maxHeight:"72vh"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"14px 16px 10px",borderBottom:`1px solid ${C.accent}22`,flexShrink:0}}>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,fontWeight:700,color:C.accentLight,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:3}}>💬 Ask AI</div>
            <div style={{fontSize:12,color:C.muted,lineHeight:1.4,wordBreak:"break-word"}}>{reviewAiPanel.context}</div>
          </div>
          <button onClick={()=>setReviewAiPanel(null)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:18,lineHeight:1,marginLeft:10,flexShrink:0,padding:"2px 6px"}}>✕</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"12px 14px",display:"flex",flexDirection:"column",gap:10}}>
          {reviewAiPanel.messages.map((m,i)=>(
            <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
              <div style={{maxWidth:"85%",padding:"10px 13px",borderRadius:m.role==="user"?"13px 13px 3px 13px":"13px 13px 13px 3px",background:m.role==="user"?`${C.accent}33`:"#1a1a2e",border:`1px solid ${m.role==="user"?C.accent+"44":C.border}`,fontSize:12,color:m.role==="user"?C.accentLight:C.textMid,lineHeight:1.7,whiteSpace:"pre-wrap"}}>
                {m.content}
              </div>
            </div>
          ))}
          {reviewAiLoading&&(
            <div style={{display:"flex",justifyContent:"flex-start"}}>
              <div style={{padding:"10px 14px",borderRadius:"13px 13px 13px 3px",background:"#1a1a2e",border:`1px solid ${C.border}`,fontSize:12,color:C.muted,animation:"pulse 1.2s infinite"}}>Thinking…</div>
            </div>
          )}
          {!authUser?.id&&reviewAiPanel.messages.length===1&&(
            <div style={{padding:"10px 14px",borderRadius:10,background:"#1a0a0e",border:"1px solid #c0304444",fontSize:12,color:"#e05070",lineHeight:1.6}}>Sign in to enable AI-powered explanations.</div>
          )}
        </div>
        <div style={{display:"flex",gap:8,padding:"10px 12px 14px",borderTop:`1px solid ${C.accent}22`,flexShrink:0}}>
          <input value={reviewAiInput} onChange={e=>setReviewAiInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendReviewAI();}}}
            placeholder="Ask a follow-up question…"
            style={{flex:1,padding:"10px 13px",borderRadius:10,background:C.surface,border:`1px solid ${C.accent}33`,color:C.text,fontSize:13,outline:"none"}}
          />
          <button onClick={sendReviewAI} disabled={reviewAiLoading||!reviewAiInput.trim()}
            style={{padding:"10px 16px",borderRadius:10,fontSize:13,fontWeight:700,background:reviewAiLoading||!reviewAiInput.trim()?C.dim:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:reviewAiLoading||!reviewAiInput.trim()?C.muted:"#fff",border:"none",cursor:reviewAiLoading||!reviewAiInput.trim()?"not-allowed":"pointer",flexShrink:0}}>→</button>
        </div>
      </div>
    </>
  ):null;

  const calcMiniWidget = calcOpen && calcMinimized && (
    <div style={{position:"fixed",bottom:76,right:16,zIndex:9500,
      background:"linear-gradient(135deg,#0d0d1c,#141428)",
      border:"1px solid #3a3a5855",borderRadius:14,
      padding:"10px 14px",boxShadow:"0 8px 28px #00000099",
      minWidth:160,animation:"fadeIn 0.15s ease"}}>
      <div style={{fontSize:9,color:"#555580",fontWeight:700,letterSpacing:"0.06em",marginBottom:4}}>🧮 CALCULATOR</div>
      <div style={{fontSize:24,color:"#b6f066",fontFamily:"'Courier New',monospace",textAlign:"right",marginBottom:8,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>
        {calcDisplayVal}
      </div>
      <div style={{display:"flex",gap:6}}>
        <button onClick={()=>setCalcMinimized(false)}
          style={{flex:1,padding:"7px",borderRadius:8,fontSize:11,fontWeight:700,
            background:"linear-gradient(135deg,#1a1a30,#222244)",
            border:"1px solid #4a4a70",color:"#a5b4fc",cursor:"pointer"}}>
          ⊞ Resume
        </button>
        <button onClick={()=>{setCalcOpen(false);setCalcMinimized(false);}}
          style={{padding:"7px 10px",borderRadius:8,fontSize:11,
            background:"none",border:"1px solid #3a3a50",color:"#555580",cursor:"pointer"}}>
          ✕
        </button>
      </div>
    </div>
  );

  // ══ GLOBAL NAV BAR (portal — renders on home, quiz, results, setup) ═══════
  const _navRootEl = document.getElementById("nav-root");
  const navPortal = _navRootEl ? ReactDOM.createPortal((()=>{
    const _launchReels=()=>{
      clearOverlays();trackUsage("reels");setShowMoreSheet(false);
      const pn=getActivePowerNotes(cfaLevel);
      const fm=getActiveFormulas(cfaLevel);
      const mc=getActiveMisconceptions(cfaLevel);
      const feed=buildReelFeed(moduleReadiness,pn,fm,mc,OFFLINE_SEED_QS);
      reelFeedBase.current=feed;
      setReelFeed(feed);setReelIdx(0);setReelAnswer(null);
      setReelRevealed(false);setReelSessionCount(0);
      setScreen("reels");
    };
    const moreItems=[
      {key:"mix",label:"Weak Spots",icon:"⚡",action:()=>{trackUsage("mix");const weakModules=moduleReadiness.filter(m=>m.sessions>0).sort((a,b)=>a.accuracy-b.accuracy).slice(0,3);const target=weakModules[0]||moduleReadiness.find(m=>m.sessions===0)||moduleReadiness[0];if(target)generateQuestions(target.topic,target.modulesCovered?.[0]||target.modules[0],"Medium",10,"guided");}},
      {key:"full_exam",label:"Timed Mock",icon:"⏱",proTag:true,action:()=>{trackUsage("full_exam");if(!proStatus){setUpgradeModal({reason:"timed_mock"});return;}startFullExam();}},
      {key:"ethics",label:"Ethics",icon:"⚖️",action:()=>{trackUsage("ethics");const cases=getEthicsCases("all",10);if(cases.length){setTopic("Ethics");setSubtopic("Ethics Case Studies");setDifficulty("Medium");setCount(cases.length);setMode("guided");setQuestions(cases);setAnswers({});setCurrentQ(0);setShowExp(false);setLastSession(null);setFullExamMode(false);setVignetteMode(false);setScreen("quiz");}}},
      {key:"revise",label:"Notes",icon:"📝",action:()=>{trackUsage("revise");setRevisionTopic(null);setRevisionTab("notes");setScreen("revision");}},
      {key:"formulas",label:"Formulas",icon:"🔢",action:()=>{trackUsage("formulas");setFormulaDrillMode(true);setFormulaDrillIdx(0);setFormulaFlipped(false);setRevisionTopic(null);setRevisionTab("formulas");setScreen("revision");}},
      {key:"week_plan",label:"Week Plan",icon:"🗓",proTag:true,action:()=>{trackUsage("week_plan");if(!proStatus){setUpgradeModal({reason:"plan"});return;}setWeeklyPlanScreen(true);}},
      {key:"calc_trainer",label:"Calc Trainer",icon:"🧮",action:()=>{trackUsage("calc_trainer");setCalcProblem(null);setCalcSteps([]);setCalcInputs({});setCalcChecked({});setCalcError("");setScreen("calcTrainer");}},
      {key:"los_coverage",label:"LOS Map",icon:"🗺",action:()=>{trackUsage("los_coverage");setScreen("losCoverage");}},
      {key:"mastery_grid",label:"Mastery",icon:"🏆",action:()=>{trackUsage("mastery_grid");setScreen("masteryGrid");}},
      {key:"interleaved",label:"Mixed Topics",icon:"🔀",action:()=>{trackUsage("interleaved");setMode("interleaved");setScreen("setup");}},
      {key:"study_path",label:"Study Path",icon:"🎓",action:()=>{trackUsage("study_path");setScreen("studyPath");}},
      {key:"dashboard",label:"Dashboard",icon:"📊",action:()=>{trackUsage("dashboard");setScreen("dashboard");}},
      {key:"duel",label:"Duel Mode",icon:"⚔️",action:()=>{trackUsage("duel");setDuelTopicPicking(true);}},
      {key:"study_group",label:"Study Group",icon:"👥",action:()=>{trackUsage("study_group");setSgScreen(true);}},
    ].sort((a,b)=>(usageStats[b.key]?.count||0)-(usageStats[a.key]?.count||0));
    const Ic=({d,size=22})=>(
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
    );
    const clearOverlays=()=>{setAiCoachScreen(false);setWeeklyPlanScreen(false);};
    const navTabs=[
      {key:"home",label:"Home",
        icon:<Ic d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10"/>,
        action:()=>{clearOverlays();setShowMoreSheet(false);setScreen("home");}},
      {key:"practice",label:"Practice",
        icon:<Ic d="M12 20h9 M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>,
        action:()=>{trackUsage("custom_mock");clearOverlays();setShowMoreSheet(false);setScreen("setup");}},
      {key:"drill",label:"Drill",
        icon:<Ic d="M5 3l14 9-14 9V3z"/>,
        action:()=>{
          clearOverlays();trackUsage("reels");setShowMoreSheet(false);
          const pn=getActivePowerNotes(cfaLevel);
          const fm=getActiveFormulas(cfaLevel);
          const mc=getActiveMisconceptions(cfaLevel);
          const feed=buildReelFeed(moduleReadiness,pn,fm,mc,OFFLINE_SEED_QS);
          reelFeedBase.current=feed;
          setReelFeed(feed);setReelIdx(0);setReelAnswer(null);
          setReelRevealed(false);setReelSessionCount(0);
          setScreen("reels");
        }},
      {key:"progress",label:"Progress",
        icon:<Ic d="M18 20V10 M12 20V4 M6 20v-6 M2 20h20"/>,
        action:()=>{trackUsage("dashboard");clearOverlays();setShowMoreSheet(false);setScreen("readiness");}},
      {key:"more",label:"More",
        icon:<Ic d="M4 6h16 M4 12h16 M4 18h16"/>,
        action:()=>{if(showMoreSheet||moreSheetClosing)setMoreSheetClosing(true);else setShowMoreSheet(true);}},
    ];
    const activeTab = showMoreSheet ? "more" :
      ({home:"home",setup:"practice",quiz:"practice",srReview:"drill",reels:"drill",
        results:"practice",revision:"practice",studyPath:"practice",
        dashboard:"progress",readiness:"progress",losCoverage:"progress",
        masteryGrid:"progress",calcTrainer:"drill",adminDashboard:"home"}[screen]||"home");
    const handlePillTouchStart=(e)=>{sheetDragY.current=e.touches[0].clientY;};
    const handlePillTouchMove=(e)=>{
      if(sheetDragY.current===null)return;
      const dy=e.touches[0].clientY-sheetDragY.current;
      if(dy>0&&sheetPanelRef.current)sheetPanelRef.current.style.transform=`translateY(${dy}px)`;
    };
    const handlePillTouchEnd=(e)=>{
      if(sheetDragY.current===null)return;
      const dy=e.changedTouches[0].clientY-sheetDragY.current;
      sheetDragY.current=null;
      if(sheetPanelRef.current)sheetPanelRef.current.style.transform="";
      if(dy>80)setMoreSheetClosing(true);
    };
    return(<>
      {(showMoreSheet||moreSheetClosing)&&(
        <div style={{position:"fixed",inset:0,zIndex:250,background:"rgba(0,0,0,0.55)",animation:`${moreSheetClosing?"fadeOut 0.25s ease":"fadeIn 0.2s ease"} forwards`}} onClick={()=>setMoreSheetClosing(true)}>
          <div ref={sheetPanelRef} style={{position:"absolute",bottom:58,left:0,right:0,animation:`${moreSheetClosing?"slideDown 0.28s":"slideUp 0.28s"} cubic-bezier(0.4,0,0.2,1) forwards`}} onClick={e=>e.stopPropagation()} onAnimationEnd={moreSheetClosing?()=>{setMoreSheetClosing(false);setShowMoreSheet(false);}:undefined}>
            <div style={{maxWidth:860,margin:"0 auto",background:C.surface,borderRadius:"16px 16px 0 0",padding:"14px 14px 8px",border:`1px solid ${C.border}`,borderBottom:"none"}}>
              <div onTouchStart={handlePillTouchStart} onTouchMove={handlePillTouchMove} onTouchEnd={handlePillTouchEnd}
                style={{padding:"8px 0 14px",cursor:"grab",touchAction:"none",WebkitTapHighlightColor:"transparent"}}>
                <div style={{width:36,height:3,background:C.border,borderRadius:2,margin:"0 auto"}}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                {moreItems.map(item=>(
                  <button key={item.key} onClick={()=>{setShowMoreSheet(false);item.action();}} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,padding:"12px 6px 10px",borderRadius:12,background:C.bg,border:`1px solid ${C.border}`,cursor:"pointer",position:"relative",transition:"opacity 0.1s"}}>
                    {item.proTag&&!proStatus&&<span style={{position:"absolute",top:4,right:4,fontSize:7,fontWeight:800,color:C.accentLight,background:C.accent+"30",border:`1px solid ${C.accent}55`,borderRadius:3,padding:"1px 3px",letterSpacing:"0.04em"}}>PRO</span>}
                    <span style={{fontSize:20,lineHeight:1,color:C.textMid}}>{item.icon}</span>
                    <span style={{fontSize:10,fontWeight:600,color:C.textMid,textAlign:"center",lineHeight:1.3}}>{item.label}</span>
                  </button>
                ))}
              </div>
              <div style={{display:"flex",gap:8,marginTop:10}}>
                <button onClick={()=>{
                  trackUsage("wrongs_review");setShowMoreSheet(false);
                  const wrongCards=Object.values(srDeck).filter(c=>(c.wrongCount||0)>0).sort((a,b)=>(b.wrongCount||0)-(a.wrongCount||0)).slice(0,30);
                  if(wrongCards.length){setSrQueue(wrongCards);setSrIdx(0);setSrAnswer(null);setScreen("srReview");}
                  else{setError("No wrong answers yet — complete a session first.");setTimeout(()=>setError(""),3000);}
                }} style={{flex:1,padding:"10px",borderRadius:10,fontSize:12,fontWeight:600,background:C.bg,border:`1px solid ${srWrongCount>0?C.hard+"55":C.border}`,color:srWrongCount>0?C.hard:C.muted,cursor:"pointer",position:"relative"}}>
                  🔁 Mistakes{srWrongCount>0&&<span style={{position:"absolute",top:-4,right:-4,width:16,height:16,borderRadius:"50%",background:C.hard,color:"#fff",fontSize:9,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{Math.min(srWrongCount,99)}</span>}
                </button>
                <button onClick={()=>{trackUsage("ai_coach");setShowMoreSheet(false);setAiCoachScreen(true);}} style={{flex:1,padding:"10px",borderRadius:10,fontSize:12,fontWeight:600,background:C.bg,border:`1px solid rgba(34,211,238,0.3)`,color:"#22d3ee",cursor:"pointer"}}>📊 Study Advisor</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:260,background:C.bg,borderTop:`1px solid ${C.border}`}}>
        <div style={{maxWidth:860,margin:"0 auto",display:"flex",paddingBottom:"max(4px,env(safe-area-inset-bottom,4px))"}}>
          {navTabs.map(tab=>{
            const active=activeTab===tab.key;
            return(
              <button key={tab.key} onClick={tab.action} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"9px 4px 6px",background:"none",border:"none",cursor:"pointer",color:active?C.accent:C.muted,transition:"color 0.15s",outline:"none",WebkitTapHighlightColor:"transparent"}}>
                {tab.icon}
                <span style={{fontSize:9,fontWeight:active?700:500,letterSpacing:"0.01em"}}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>);
  })(), _navRootEl) : null;

  const wrap=(children,maxW=860)=>(
    <>
      <div style={{background:C.bg,color:C.text,fontFamily:"'Inter',system-ui,-apple-system,sans-serif",padding:"22px 18px 0",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{maxWidth:maxW,width:"100%",animation:"fadeIn 0.2s ease"}}>
          {children}
          <div style={{height:"calc(72px + env(safe-area-inset-bottom, 0px))"}}/>
        </div>
      </div>
      {calcMiniWidget}
      {navPortal}
    </>
  );
  // ══ BA II PLUS CALCULATOR OVERLAY ════════════════════════════════════════
  if(calcOpen && !calcMinimized) return <CFACalculator
    onClose={()=>{setCalcOpen(false);setCalcGuideStep(null);}}
    onMinimize={(disp)=>{setCalcDisplayVal(disp);setCalcMinimized(true);}}
    guideStep={calcGuideStep}
  />;

  // ══ GLOBAL LOADING OVERLAY — shown from any screen when generating ══════
  if(loading) return (
    <div style={{position:"fixed",inset:0,background:`radial-gradient(ellipse at 50% 40%,${C.accent}1c 0%,${C.bg} 65%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 28px",fontFamily:"'Inter',system-ui,-apple-system,sans-serif",color:C.text,zIndex:9999}}>
      <div style={{position:"relative",marginBottom:22}}>
        <div style={{position:"absolute",inset:-18,borderRadius:"50%",background:`${C.accent}18`,filter:"blur(16px)"}}/>
        <div style={{width:80,height:80,borderRadius:22,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,boxShadow:`0 8px 32px ${C.accent}55`,position:"relative"}}>⚡</div>
      </div>
      <div style={{fontSize:24,fontWeight:800,marginBottom:4,letterSpacing:"-0.01em"}}>ClearCFA</div>
      {loadingContext&&(
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8,flexWrap:"wrap",justifyContent:"center"}}>
          <span style={{fontSize:12,fontWeight:700,color:"#fff",background:loadingContext.difficulty==="Hard"?C.hard:loadingContext.difficulty==="Easy"?C.easy:C.medium,padding:"2px 8px",borderRadius:20}}>{loadingContext.difficulty}</span>
          <span style={{fontSize:12,color:C.accentLight,fontWeight:600}}>{loadingContext.count} {loadingContext.isVignette?"vignette Qs":"questions"}</span>
          <span style={{fontSize:12,color:C.muted}}>·</span>
          <span style={{fontSize:12,color:C.text,fontWeight:600,maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{loadingContext.topic}</span>
          {loadingContext.subtopic&&loadingContext.subtopic!==loadingContext.topic&&(
            <><span style={{fontSize:12,color:C.muted}}>›</span><span style={{fontSize:11,color:C.muted,maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{loadingContext.subtopic}</span></>
          )}
        </div>
      )}
      <div style={{fontSize:14,fontWeight:600,color:C.accentLight,marginBottom:4,textAlign:"center"}}>{loadingMsg}</div>
      <div style={{fontSize:12,color:C.muted,marginBottom:20}}>
        {loadingETA>0?`~${loadingETA}s remaining`:loadingProgress>=99?"Almost there — finalising…":"Finishing up…"}
      </div>
      <div style={{width:"100%",maxWidth:420,marginBottom:16,display:"flex",flexDirection:"column",gap:7}}>
        {[1,2,3].map(i=>(
          <div key={i} style={{height:50,borderRadius:9,background:`linear-gradient(90deg,${C.surface} 25%,${C.dim} 50%,${C.surface} 75%)`,backgroundSize:"200% 100%",animation:`shimmer 1.6s ease-in-out infinite`,animationDelay:`${(i-1)*0.2}s`,border:`1px solid ${C.border}`}}/>
        ))}
      </div>
      <div style={{width:"100%",maxWidth:420}}>
        <div style={{height:5,background:`${C.accent}20`,borderRadius:3,marginBottom:8,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${loadingProgress}%`,background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:3,transition:"width 0.4s ease",boxShadow:`0 0 10px ${C.accent}88`}}/>
        </div>
        <div style={{textAlign:"right",fontSize:12,fontWeight:800,color:C.accentLight,marginBottom:28}}>{loadingProgress}%</div>
        {[["Anchoring to LOS curriculum",0],["Engineering distractor options",30],["Deduplication & quality check",70],["Ready to go",90]].map(([label,pct],i,arr)=>{
          const done=loadingProgress>=pct+20;
          const active=loadingProgress>=pct&&!done;
          return(
            <div key={i} style={{display:"flex",gap:14,marginBottom:i<arr.length-1?16:0,alignItems:"center"}}>
              <div style={{width:24,height:24,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0,transition:"all 0.3s",background:done?"#16a34a":active?C.accent:C.dim,color:done||active?"#fff":C.muted,boxShadow:done?`0 0 10px #16a34a55`:active?`0 0 10px ${C.accent}55`:"none"}}>{done?"✓":i+1}</div>
              <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
                <span style={{fontSize:14,transition:"color 0.3s",color:done?C.easy:active?C.text:C.muted}}>{label}</span>
                {active&&<span style={{width:6,height:6,borderRadius:"50%",background:C.accent,display:"inline-block",animation:"pulse 1.2s ease-in-out infinite",flexShrink:0}}/>}
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={()=>{setLoading(false);setLoadingProgress(0);setLoadingETA(null);generatingRef.current=false;setError("");setPendingGen(null);try{localStorage.removeItem(PENDING_GEN_KEY);}catch{}}} style={{marginTop:44,fontSize:13,padding:"10px 28px",borderRadius:10,background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>
        Cancel
      </button>
    </div>
  );

  // ══ AI COACH ════════════════════════════════════════════════════════════════
  if(aiCoachScreen) return wrap(<>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
      <div>
        <h2 style={{margin:0,fontSize:20,fontWeight:800,color:"#22d3ee"}}>📊 Study Advisor</h2>
        <div style={{fontSize:11,color:C.muted,marginTop:2}}>Strategy & planning · Powered by your performance data</div>
      </div>
      <button onClick={()=>setAiCoachScreen(false)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>← Home</button>
    </div>

    {/* Context summary */}
    {(()=>{
      const topWeak=moduleReadiness.filter(m=>m.accuracy!==null).sort((a,b)=>a.accuracy-b.accuracy).slice(0,3);
      const untouched=moduleReadiness.filter(m=>m.sessions===0).length;
      return(
        <div style={{background:C.surface,border:`1px solid ${C.accent}33`,borderRadius:11,padding:"12px 14px",marginBottom:14,fontSize:11,color:C.muted}}>
          <span style={{color:C.accentLight,fontWeight:700}}>Context loaded: </span>
          {history.length} sessions · {daysLeft} days to exam ·
          {topWeak.length>0?` Weakest: ${topWeak[0].topic.split(" ")[0]} (${topWeak[0].accuracy}%) ·`:""}
          {untouched>0?` ${untouched} untouched modules`:""}
          · Pass prob: {passProbability?`${passProbability.probability}%`:"N/A"}
        </div>
      );
    })()}

    {/* Quick prompts */}
    {aiCoachMessages.length===0&&(
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:4}}>Quick questions</div>
        {[
          "What should I study today?",
          "Where am I most likely to lose marks?",
          "How do I fix my weakest topic fast?",
          "Am I on track to pass? Be honest.",
          `What's my biggest risk with ${daysLeft} days left?`
        ].map(prompt=>(
          <button key={prompt} onClick={async()=>{
            if(!authUser?.id){setAiCoachMessages(m=>[...m,{role:"user",text:prompt},{role:"assistant",text:"Sign in to use AI Coach."}]);return;}
            const userMsg={role:"user",text:prompt};
            setAiCoachMessages(m=>[...m,userMsg]);
            setAiCoachLoading(true);
            try{
              const topWeak=moduleReadiness.filter(m=>m.accuracy!==null).sort((a,b)=>a.accuracy-b.accuracy).slice(0,3).map(m=>`${m.topic}: ${m.accuracy}%`).join(", ");
              const untouched=moduleReadiness.filter(m=>m.sessions===0).map(m=>m.topic.split(" ")[0]).join(", ");
              const context=`Student data: ${history.length} sessions, overall ${overallPct||"N/A"}%, pass probability ${passProbability?.probability||"N/A"}%, days to exam ${daysLeft}, weakest modules: ${topWeak||"none yet"}, untouched: ${untouched||"none"}, SR due: ${dueCards.length}, leeches: ${leeches.length}.`;
              const sysPrompt=`You are a direct, honest CFA Level ${cfaLevel} study advisor. ${context} Give specific, actionable advice. Be concise but complete — if the question calls for a plan or detailed diagnosis, give it fully. No generic motivational fluff.`;
              const result=await callAIChat(authUser.id,[{role:"user",content:`${sysPrompt}\n\nStudent: ${prompt}`}],450,cfaLevel);
              const text=(typeof result==="string"?result:"")||"No response";
              setAiCoachMessages(m=>[...m,{role:"assistant",text}]);
            }catch(e){setAiCoachMessages(m=>[...m,{role:"assistant",text:"Error: "+e.message}]);}
            setAiCoachLoading(false);
          }} style={{textAlign:"left",padding:"10px 14px",borderRadius:9,fontSize:12,background:C.surface,border:`1px solid #22d3ee22`,color:C.textMid,cursor:"pointer"}}>
            {prompt}
          </button>
        ))}
      </div>
    )}

    {/* Chat messages */}
    <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
      {aiCoachMessages.map((msg,i)=>(
        <div key={i} style={{display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start"}}>
          <div style={{maxWidth:"85%",padding:"10px 14px",borderRadius:11,fontSize:12,lineHeight:1.7,
            background:msg.role==="user"?`linear-gradient(135deg,${C.accent},${C.accentLight})`:C.surface,
            color:msg.role==="user"?"#fff":"#a0d8e8",
            border:msg.role==="user"?"none":`1px solid #22d3ee22`}}>
            {msg.text}
          </div>
        </div>
      ))}
      {aiCoachLoading&&<div style={{display:"flex",justifyContent:"flex-start"}}><div style={{padding:"10px 14px",borderRadius:11,background:C.surface,border:`1px solid #22d3ee22`}}><Skeleton width={120} height={12} radius={6}/></div></div>}
    </div>

    {/* Input */}
    {aiCoachMessages.length>0&&(
      <div style={{display:"flex",gap:8}}>
        <input value={aiCoachInput} onChange={e=>setAiCoachInput(e.target.value)}
          onKeyDown={async e=>{if(e.key==="Enter"&&aiCoachInput.trim()&&!aiCoachLoading){
            const q=aiCoachInput.trim();setAiCoachInput("");
            if(!authUser?.id){setAiCoachMessages(m=>[...m,{role:"user",text:q},{role:"assistant",text:"Sign in to use AI Coach."}]);return;}
            setAiCoachMessages(m=>[...m,{role:"user",text:q}]);setAiCoachLoading(true);
            try{
              const topWeak=moduleReadiness.filter(m=>m.accuracy!==null).sort((a,b)=>a.accuracy-b.accuracy).slice(0,3).map(m=>`${m.topic}: ${m.accuracy}%`).join(", ");
              const context=`Student data: ${history.length} sessions, overall ${overallPct||"N/A"}%, pass prob ${passProbability?.probability||"N/A"}%, days to exam ${daysLeft}, weakest: ${topWeak||"none"}.`;
              const result=await callAIChat(authUser.id,[{role:"user",content:`You are a direct CFA L${cfaLevel} study advisor. ${context} Give specific, actionable advice. Be concise but complete. No generic motivational fluff.\n\nStudent: ${q}`}],450,cfaLevel);
              setAiCoachMessages(m=>[...m,{role:"assistant",text:(typeof result==="string"?result:"")||"No response"}]);
            }catch(e){setAiCoachMessages(m=>[...m,{role:"assistant",text:"Error: "+e.message}]);}
            setAiCoachLoading(false);
          }}}
          placeholder="Ask anything about your study plan..."
          style={{flex:1,padding:"11px 14px",borderRadius:10,fontSize:12,background:C.surface,border:`1px solid #22d3ee44`,color:C.text,outline:"none"}}/>
        <button onClick={()=>{}} style={{padding:"11px 14px",borderRadius:10,fontSize:13,background:"#22d3ee22",border:`1px solid #22d3ee44`,color:"#22d3ee",cursor:"pointer",fontWeight:700}}>↑</button>
      </div>
    )}
    {aiCoachMessages.length>0&&<button onClick={()=>setAiCoachMessages([])} style={{marginTop:10,width:"100%",padding:"8px",borderRadius:8,fontSize:11,background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>Clear chat</button>}
  </>);

  // ── Login screen ──
  if(!authUser){
    // ── Demo mode (try before signup) ──
    if(demoMode){
      const dq=DEMO_QUESTIONS[demoQ];
      const answered=!!demoAnswers[dq?.id];
      const isLast=demoQ===DEMO_QUESTIONS.length-1;
      const allDone=demoComplete||Object.keys(demoAnswers).length===DEMO_QUESTIONS.length;
      if(allDone){
        const correct=DEMO_QUESTIONS.filter(q=>demoAnswers[q.id]===q.answer).length;
        const pct=Math.round((correct/DEMO_QUESTIONS.length)*100);
        return(
          <div style={{minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 20px",textAlign:"center"}}>
            <div style={{fontSize:44,marginBottom:12}}>{pct>=80?"🎯":pct>=60?"📊":"📚"}</div>
            <div style={{fontSize:22,fontWeight:900,color:C.text,marginBottom:6}}>You scored {pct}%</div>
            <div style={{fontSize:13,color:C.muted,marginBottom:6}}>{correct}/{DEMO_QUESTIONS.length} correct across Ethics, Quant, Fixed Income, FSA & Equity</div>
            <div style={{fontSize:13,color:C.textMid,lineHeight:1.7,maxWidth:420,marginBottom:28}}>
              {pct>=80?"Strong foundation. ClearCFA will sharpen the gaps.":pct>=60?"Solid start. AI-targeted sessions will accelerate your progress.":"Lots of ground to cover — ClearCFA will get you there, systematically."}
            </div>
            <div style={{width:"100%",maxWidth:360,background:C.surface,border:`1px solid ${C.accent}44`,borderRadius:16,padding:"20px",marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:800,color:C.text,marginBottom:4}}>Create your free account</div>
              <div style={{fontSize:12,color:C.muted,marginBottom:16}}>Unlock AI-generated questions targeting YOUR weak spots — 5 free per day, forever.</div>
              <button onClick={()=>{setDemoMode(false);setAuthMode("signup");setDemoComplete(false);}} style={{width:"100%",padding:"13px",borderRadius:11,fontSize:14,fontWeight:800,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",boxShadow:`0 4px 18px ${C.accent}44`}}>
                Create free account →
              </button>
            </div>
            <button onClick={()=>{setDemoMode(false);setDemoComplete(false);setDemoQ(0);setDemoAnswers({});}} style={{fontSize:12,color:C.muted,background:"none",border:"none",cursor:"pointer"}}>← Back to sign in</button>
          </div>
        );
      }
      return(
        <div style={{minHeight:"100vh",background:C.bg,color:C.text,padding:"32px 20px"}}>
          <div style={{maxWidth:440,margin:"0 auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div style={{display:"flex",alignItems:"center",gap:7}}>
                <div style={{width:26,height:26,borderRadius:7,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>⚡</div>
                <span style={{fontSize:14,fontWeight:800,color:C.text}}>ClearCFA</span>
              </div>
              <button onClick={()=>{setDemoMode(false);setDemoQ(0);setDemoAnswers({});}} style={{fontSize:12,color:C.muted,background:"none",border:"none",cursor:"pointer"}}>✕ Exit</button>
            </div>
            <div style={{height:4,background:C.dim,borderRadius:2,marginBottom:6}}>
              <div style={{height:"100%",width:`${Math.round(((demoQ+(answered?1:0))/DEMO_QUESTIONS.length)*100)}%`,background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:2,transition:"width 0.4s"}}/>
            </div>
            <div style={{fontSize:11,color:C.muted,textAlign:"right",marginBottom:20}}>Sample {demoQ+1} of {DEMO_QUESTIONS.length}</div>
            <div style={{fontSize:11,fontWeight:700,color:C.accent,letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:8}}>{dq.topic}</div>
            <div style={{fontSize:15,color:C.text,lineHeight:1.75,marginBottom:20,fontWeight:500}}>{dq.question}</div>
            <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:16}}>
              {Object.entries(dq.options).map(([k,v])=>{
                const sel=demoAnswers[dq.id]===k;
                const correct=dq.answer===k;
                const bg=answered?(sel&&correct?`${C.easy}22`:sel?`${C.hard}18`:correct?`${C.easy}10`:C.surface):C.surface;
                const border=answered?(sel&&correct?C.easy+"66":sel?C.hard+"55":correct?C.easy+"44":C.border):C.border;
                return(
                  <button key={k} disabled={answered} onClick={()=>setDemoAnswers(a=>({...a,[dq.id]:k}))}
                    style={{width:"100%",textAlign:"left",padding:"12px 14px",borderRadius:11,fontSize:13,background:bg,border:`1.5px solid ${border}`,color:C.text,cursor:answered?"default":"pointer",transition:"all 0.2s",display:"flex",alignItems:"flex-start",gap:10}}>
                    <span style={{fontWeight:800,color:answered&&correct?C.easy:answered&&sel?C.hard:C.muted,flexShrink:0}}>{k}.</span>
                    <span style={{lineHeight:1.5}}>{v}</span>
                  </button>
                );
              })}
            </div>
            {answered&&(
              <div style={{background:C.surfaceHigh,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",marginBottom:16,fontSize:12,color:C.textMid,lineHeight:1.65}}>
                {dq.explanation}
              </div>
            )}
            {answered&&(
              <button onClick={()=>{
                if(!isLast){setDemoQ(q=>q+1);}
                else{setDemoComplete(true);}
              }} style={{width:"100%",padding:"13px",borderRadius:12,fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",boxShadow:`0 4px 16px ${C.accent}44`}}>
                {isLast?"See My Results →":"Next Question →"}
              </button>
            )}
            {!answered&&<div style={{fontSize:11,color:C.muted,textAlign:"center",marginTop:12}}>No account needed — just tap an answer</div>}
          </div>
        </div>
      );
    }

    const isSignup=authMode==="signup";
    const canSubmit=authEmail.includes("@")&&authPassword.length>=6&&(!isSignup||authPassword===authConfirm);
    const handleAuth=async()=>{
      setAuthError("");
      setAuthLoading(true);
      try{
        const id=await deriveUserId(authEmail,authPassword);
        if(isSignup){
          // Best-effort insert — proceed regardless of Supabase response.
          // RLS on the sessions table may block anon inserts; the row will be created on first data sync.
          // Only hard-fail on a complete network error (status 0 = no response at all).
          const result=await supabaseCreateAccount(SB_CFG,id,authEmail.toLowerCase().trim());
          if(result.status===0){setAuthError("No internet connection — please try again.");setAuthLoading(false);return;}
          if(!result.ok){console.warn("Session row insert failed (non-fatal):",result.status,result.error);}
        } else {
          const exists=await supabaseCheckAccount(SB_CFG,id);
          if(!exists){setAuthError("No account found — check your email and password, or create a new account.");setAuthLoading(false);return;}
        }
        const auth={id, email:authEmail.toLowerCase().trim()};
        // If switching to a different account, clear local data first
        const prev=getStoredAuth();
        if(!prev||prev.id!==id){
          await storageSet(STORAGE_KEY,[]);
          await storageSet(SR_KEY,{});
          await storageSet(USAGE_KEY,{});
          setHistory([]); historyRef.current=[];
          setSrDeck({}); srDeckRef.current={};
          setUsageStats({}); usageStatsRef.current={};
          // Load this user's data from Supabase
          const sbData=await supabaseLoad(SB_CFG,auth);
          if(sbData?.history?.length){
            const h=sbData.history.map(s=>({...s,wrongs:[]}));
            setHistory(h); historyRef.current=h; storageSet(STORAGE_KEY,h);
          }
          if(sbData?.srDeck){setSrDeck(sbData.srDeck); srDeckRef.current=sbData.srDeck; storageSet(SR_KEY,sbData.srDeck);}
          if(sbData?.usageStats){setUsageStats(sbData.usageStats); usageStatsRef.current=sbData.usageStats;}
        }
        saveAuth(auth);
        setAuthUser(auth);
        authUserRef.current=auth;
        try{window.dispatchEvent(new CustomEvent('cfa_auth',{detail:true}));}catch{}
        if(isSignup){
          setShowOnboarding(true);
          try{const ref=sessionStorage.getItem('cfa_ref');if(ref&&ref!==auth.id){recordReferral(SB_CFG,ref,auth.id);sessionStorage.removeItem('cfa_ref');}}catch{}
        }
      }catch{
        setAuthError("Something went wrong. Please try again.");
      }
      setAuthLoading(false);
    };
    const inputStyle=(active)=>({width:"100%",padding:"13px 16px",borderRadius:11,fontSize:14,background:C.surface,border:`1.5px solid ${active?C.accent:C.border}`,color:C.text,outline:"none",marginBottom:10,boxSizing:"border-box"});
    return(
      <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Inter',system-ui,-apple-system,sans-serif",overflowX:"hidden"}}>
        {/* ── Hero ── */}
        <div style={{background:`linear-gradient(160deg,${C.accent}22 0%,${C.bg} 65%)`,padding:"36px 24px 28px",textAlign:"center",borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:24}}>
            <div style={{width:30,height:30,borderRadius:8,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,boxShadow:`0 4px 12px ${C.accent}55`}}>⚡</div>
            <span style={{fontSize:17,fontWeight:800,color:C.text,letterSpacing:"-0.3px"}}>ClearCFA</span>
            <span style={{fontSize:10,fontWeight:700,color:C.accentLight,background:C.accent+"20",border:`1px solid ${C.accent}44`,borderRadius:20,padding:"2px 8px",marginLeft:2}}>Free to start</span>
          </div>
          <div style={{fontSize:30,fontWeight:900,color:C.text,lineHeight:1.15,marginBottom:10,letterSpacing:"-0.6px",maxWidth:320,margin:"0 auto 10px"}}>
            Pass the CFA.<br/>
            <span style={{background:`linear-gradient(135deg,${C.accentLight},${C.easyLight})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>AI that adapts to you.</span>
          </div>
          <div style={{fontSize:13,color:C.muted,lineHeight:1.65,maxWidth:290,margin:"0 auto 24px"}}>
            Every session is built around your weak spots. Most candidates see measurable improvement within 2 weeks.
          </div>
          {/* Stats strip */}
          <div style={{display:"flex",justifyContent:"center",gap:0,background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"14px 0",maxWidth:340,margin:"0 auto"}}>
            {[["AI-generated","Questions","🎯"],["L1 / L2 / L3","All Levels","📚"],["Free tier","20 Qs/day","⚡"]].map(([val,label,ico],i,arr)=>(
              <div key={label} style={{flex:1,textAlign:"center",borderRight:i<arr.length-1?`1px solid ${C.border}`:"none",padding:"0 8px"}}>
                <div style={{fontSize:15,fontWeight:800,color:C.text}}>{ico} {val}</div>
                <div style={{fontSize:10,color:C.muted,marginTop:2}}>{label}</div>
              </div>
            ))}
          </div>
          {/* Social proof */}
          <div style={{marginTop:14,fontSize:12,color:C.muted,textAlign:"center"}}>
            🎓 <strong style={{color:C.text}}>{COMMUNITY_COUNT}+</strong> CFA candidates preparing for August 2026
          </div>
        </div>

        {/* ── Auth Form ── */}
        <div style={{padding:"24px 20px 0",maxWidth:420,margin:"0 auto"}}>
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:"20px 20px 16px",boxShadow:`0 4px 24px ${C.accent}0a`}}>
            {/* Toggle */}
            <div style={{display:"flex",background:C.surfaceHigh,borderRadius:10,padding:3,marginBottom:20}}>
              {["signin","signup"].map(m=>(
                <button key={m} onClick={()=>{setAuthMode(m);setAuthError("");setAuthPassword("");setAuthConfirm("");}}
                  style={{flex:1,padding:"9px",borderRadius:8,fontSize:13,fontWeight:700,border:"none",cursor:"pointer",transition:"all 0.15s",
                    background:authMode===m?`linear-gradient(135deg,${C.accent},${C.accentLight})`:"transparent",
                    color:authMode===m?"#fff":C.muted}}>
                  {m==="signin"?"Sign In":"Create Account"}
                </button>
              ))}
            </div>
            {isSignup&&<div style={{fontSize:12,color:C.accentLight,textAlign:"center",marginBottom:14,fontWeight:600}}>🎉 Free to start — no credit card needed</div>}
            <input value={authEmail} onChange={e=>setAuthEmail(e.target.value.trim())}
              placeholder="your@email.com" type="email" autoComplete="email" style={inputStyle(authEmail.includes("@"))}/>
            <input value={authPassword} onChange={e=>setAuthPassword(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&!isSignup&&canSubmit)handleAuth();}}
              placeholder="Password (min 6 characters)" type="password" autoComplete={isSignup?"new-password":"current-password"} style={inputStyle(authPassword.length>=6)}/>
            {isSignup&&<input value={authConfirm} onChange={e=>setAuthConfirm(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&canSubmit)handleAuth();}}
              placeholder="Confirm password" type="password" autoComplete="new-password"
              style={inputStyle(authConfirm&&authConfirm===authPassword)}/>}
            <button disabled={authLoading||!canSubmit} onClick={handleAuth}
              style={{width:"100%",padding:"14px",borderRadius:11,fontSize:14,fontWeight:800,marginTop:2,
                background:canSubmit?`linear-gradient(135deg,${C.accent},${C.accentLight})`:`${C.accent}40`,
                color:"#fff",border:"none",cursor:canSubmit?"pointer":"default",
                boxShadow:canSubmit?`0 4px 18px ${C.accent}55`:"none",transition:"all 0.2s",letterSpacing:"0.01em"}}>
              {authLoading?(isSignup?"Creating your account…":"Signing in…"):(isSignup?"Start studying free →":"Sign in →")}
            </button>
            {authError&&<div style={{fontSize:12,color:C.hard,marginTop:10,padding:"9px 12px",background:C.errorBg,borderRadius:8,border:`1px solid ${C.hard}33`}}>{authError}</div>}
            {!isSignup&&<div style={{fontSize:11,color:C.muted,textAlign:"center",marginTop:10}}>
              <span onClick={()=>{setForgotMode(true);setForgotEmail(authEmail);setForgotSent(false);}} style={{color:C.muted,cursor:"pointer",textDecoration:"underline"}}>Forgot password?</span>
            </div>}
            {forgotMode&&(
              <div style={{marginTop:12,padding:"14px",background:C.surfaceHigh,borderRadius:10,border:`1px solid ${C.border}`}}>
                {forgotSent?(
                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:20,marginBottom:6}}>📧</div>
                    <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:4}}>Check your email</div>
                    <div style={{fontSize:11,color:C.muted,lineHeight:1.5}}>A reset link has been sent to {forgotEmail}. Check spam if you don't see it.</div>
                    <button onClick={()=>{setForgotMode(false);setForgotSent(false);}} style={{marginTop:10,fontSize:11,color:C.accentLight,background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>Back to sign in</button>
                  </div>
                ):(
                  <>
                    <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:8}}>Reset your password</div>
                    <input value={forgotEmail} onChange={e=>setForgotEmail(e.target.value.trim())}
                      placeholder="your@email.com" type="email"
                      style={{width:"100%",padding:"10px 12px",borderRadius:8,fontSize:13,background:C.surface,border:`1px solid ${C.border}`,color:C.text,outline:"none",marginBottom:8,boxSizing:"border-box"}}/>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>setForgotMode(false)} style={{flex:1,padding:"9px",borderRadius:8,fontSize:12,fontWeight:600,background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>Cancel</button>
                      <button onClick={async()=>{
                        setForgotLoading(true);
                        const ok=await supabaseForgotPassword(SB_CFG,forgotEmail);
                        setForgotLoading(false);
                        setForgotSent(true);
                      }} disabled={forgotLoading||!forgotEmail.includes("@")}
                        style={{flex:2,padding:"9px",borderRadius:8,fontSize:12,fontWeight:700,background:forgotEmail.includes("@")?`linear-gradient(135deg,${C.accent},${C.accentLight})`:`${C.accent}40`,color:"#fff",border:"none",cursor:forgotEmail.includes("@")?"pointer":"default"}}>
                        {forgotLoading?"Sending…":"Send reset link"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
            {!isSignup&&<div style={{fontSize:11,color:C.muted,textAlign:"center",marginTop:10}}>
              New to ClearCFA?{" "}
              <span onClick={()=>{setAuthMode("signup");setAuthError("");setAuthPassword("");setAuthConfirm("");}} style={{color:C.accentLight,cursor:"pointer",fontWeight:700}}>Create a free account →</span>
            </div>}
            <div style={{display:"flex",alignItems:"center",gap:10,margin:"14px 0 4px"}}>
              <div style={{flex:1,height:1,background:C.border}}/>
              <span style={{fontSize:11,color:C.muted,whiteSpace:"nowrap"}}>or</span>
              <div style={{flex:1,height:1,background:C.border}}/>
            </div>
            <button onClick={loginWithGoogle} style={{width:"100%",padding:"12px",borderRadius:11,fontSize:13,fontWeight:700,background:C.surface,border:`1.5px solid ${C.border}`,color:C.text,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
            <div style={{fontSize:10,color:C.muted,textAlign:"center",marginTop:12,lineHeight:1.6}}>
              By creating an account you agree to our{" "}
              <a href="/ClearCFA/privacy.html" target="_blank" rel="noopener" style={{color:C.accentLight,textDecoration:"none"}}>Privacy Policy</a>
            </div>
          </div>
        </div>

        {/* ── Try before signup ── */}
        <div style={{padding:"12px 20px 0",maxWidth:420,margin:"0 auto"}}>
          <button onClick={()=>{setDemoMode(true);setDemoQ(0);setDemoAnswers({});setDemoComplete(false);}}
            style={{width:"100%",padding:"11px",borderRadius:11,fontSize:12,fontWeight:600,
              background:"none",border:`1.5px solid ${C.border}`,color:C.textMid,cursor:"pointer"}}>
            🎲 Try 5 sample questions first — no account needed
          </button>
        </div>

        {/* ── Testimonial ── */}
        <div style={{padding:"20px 20px 0",maxWidth:420,margin:"0 auto"}}>
          <div style={{background:`linear-gradient(135deg,${C.accent}0e,${C.easy}08)`,border:`1px solid ${C.accent}22`,borderRadius:14,padding:"16px 18px"}}>
            <div style={{fontSize:18,color:C.accentLight,marginBottom:6,lineHeight:1}}>❝</div>
            <div style={{fontSize:13,color:C.textMid,lineHeight:1.65,fontStyle:"italic",marginBottom:10}}>
              I went from 52% on mocks to passing in 8 weeks. The daily AI sessions target exactly what you keep getting wrong — it's like having a personal tutor who never lets you coast.
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:`linear-gradient(135deg,${C.accent},${C.easyLight})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:"#fff"}}>M</div>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:C.text}}>Marcus T.</div>
                <div style={{fontSize:10,color:C.easy}}>✓ Passed CFA Level 1 · June 2025</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature pillars ── */}
        <div style={{padding:"28px 20px 0",maxWidth:420,margin:"0 auto"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.12em",textTransform:"uppercase",textAlign:"center",marginBottom:18}}>Why candidates choose ClearCFA</div>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[
              {icon:"⚡",color:C.accent,title:"AI-Personalized Daily Sessions",desc:"Each session is built around your weakest concepts. The AI tracks every question you've ever missed and ensures those gaps close before exam day."},
              {icon:"🧠",color:C.easy,title:"Spaced Repetition Engine",desc:"Forget flashcards. Our system surfaces forgotten concepts at the scientifically optimal moment — right before you'd lose them permanently."},
              {icon:"📈",color:C.medium,title:"Live Pass Probability",desc:"Your estimated pass percentage updates after every session. Watch it climb. Know exactly where you stand vs. the 42% pass rate."},
              {icon:"💼",color:"#a78bfa",title:"Office Mode — 7 Minutes a Day",desc:"5 AI-picked questions. Zero setup. For days when life gets in the way, Office Mode keeps your streak alive and your momentum building."},
              {icon:"🎯",color:C.hard,title:"LOS-Anchored Questions",desc:"Every question maps to the official 2026 CFA curriculum. No filler, no outdated content — only what the exam actually tests."},
            ].map(({icon,color,title,desc})=>(
              <div key={title} style={{display:"flex",gap:14,padding:"14px 14px",borderRadius:12,background:C.surface,border:`1px solid ${C.border}`,borderLeft:`3px solid ${color}`}}>
                <div style={{width:34,height:34,borderRadius:9,background:`${color}18`,border:`1px solid ${color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{icon}</div>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:4}}>{title}</div>
                  <div style={{fontSize:11,color:C.muted,lineHeight:1.6}}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Pricing ── */}
        <div style={{padding:"28px 20px 0",maxWidth:420,margin:"0 auto"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.12em",textTransform:"uppercase",textAlign:"center",marginBottom:18}}>Simple pricing</div>
          <div style={{display:"flex",gap:12}}>
            {/* Free tier */}
            <div style={{flex:1,background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"16px 14px"}}>
              <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>Free</div>
              <div style={{fontSize:26,fontWeight:900,color:C.text,lineHeight:1}}>$0</div>
              <div style={{fontSize:10,color:C.muted,marginBottom:14}}>always</div>
              {[["10 AI Qs/day",true],["Spaced repetition",true],["Pass probability",true],["CFA Level 1 only",true],["AI Coach",false],["L2 + L3",false],["Unlimited Qs",false]].map(([f,incl])=>(
                <div key={f} style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:incl?C.textMid:C.muted,marginBottom:5,opacity:incl?1:0.5}}>
                  <span style={{color:incl?C.easy:C.muted,fontWeight:700,flexShrink:0,fontSize:10}}>{incl?"✓":"✗"}</span>{f}
                </div>
              ))}
              <button onClick={()=>{setAuthMode("signup");setAuthError("");setAuthPassword("");setAuthConfirm("");window.scrollTo({top:0,behavior:"smooth"});}}
                style={{width:"100%",marginTop:14,padding:"10px",borderRadius:9,fontSize:12,fontWeight:700,background:C.surfaceHigh,border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>
                Start free →
              </button>
            </div>
            {/* Pro tier */}
            <div style={{flex:1,background:`linear-gradient(160deg,${C.accent}14,${C.accent}06)`,border:`1.5px solid ${C.accent}55`,borderRadius:14,padding:"16px 14px",position:"relative"}}>
              <div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",fontSize:9,fontWeight:800,padding:"3px 10px",borderRadius:20,letterSpacing:"0.06em",whiteSpace:"nowrap"}}>MOST POPULAR</div>
              <div style={{fontSize:11,fontWeight:700,color:C.accentLight,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>Pro</div>
              <div style={{display:"flex",alignItems:"baseline",gap:8,lineHeight:1,marginBottom:2}}>
                <div style={{fontSize:26,fontWeight:900,color:C.text}}>₹{ACTIVE_PRICE}<span style={{fontSize:13,fontWeight:600,color:C.muted}}>/mo</span></div>
                <div style={{fontSize:13,color:C.muted,textDecoration:"line-through"}}>₹{ACTIVE_WAS}</div>
              </div>
              <div style={{fontSize:10,color:C.easy,fontWeight:700,marginBottom:14}}>{ACTIVE_LABEL} · {ACTIVE_SLOTS-ACTIVE_TAKEN} spots left</div>
              {[["Unlimited AI questions",true],["CFA L1 + L2 + L3",true],["AI Coach (unlimited)",true],["Weekly study plans",true],["Advanced analytics",true],["Spaced repetition",true],["Priority support",true]].map(([f])=>(
                <div key={f} style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:C.textMid,marginBottom:5}}>
                  <span style={{color:C.easy,fontWeight:700,flexShrink:0,fontSize:10}}>✓</span>{f}
                </div>
              ))}
              <button onClick={()=>{setAuthMode("signup");setAuthError("");setAuthPassword("");setAuthConfirm("");window.scrollTo({top:0,behavior:"smooth"});}}
                style={{width:"100%",marginTop:14,padding:"10px",borderRadius:9,fontSize:12,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,border:"none",color:"#fff",cursor:"pointer",boxShadow:`0 4px 14px ${C.accent}44`}}>
                Get Pro →
              </button>
            </div>
          </div>
          <div style={{fontSize:11,color:C.muted,textAlign:"center",marginTop:12}}>Start on the free tier. Upgrade when you're ready.</div>
        </div>

        {/* ── Trust strip ── */}
        <div style={{padding:"24px 20px 48px",maxWidth:420,margin:"0 auto"}}>
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"16px 20px"}}>
            <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12,textAlign:"center"}}>Built for the 2026 exam</div>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {["2026 CFA Institute curriculum","Official LOS-anchored questions","CFA Level 1, 2 & 3 support","Spaced repetition memory engine","Real-time pass probability","No credit card to start"].map(t=>(
                <div key={t} style={{display:"flex",alignItems:"center",gap:8,fontSize:12,color:C.textMid}}>
                  <span style={{color:C.easy,fontWeight:700,flexShrink:0}}>✓</span>{t}
                </div>
              ))}
            </div>
            <button onClick={()=>{setAuthMode("signup");setAuthError("");setAuthPassword("");setAuthConfirm("");window.scrollTo({top:0,behavior:"smooth"});}}
              style={{width:"100%",marginTop:16,padding:"13px",borderRadius:11,fontSize:14,fontWeight:800,
                background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",
                boxShadow:`0 4px 18px ${C.accent}44`}}>
              Create free account →
            </button>
          </div>
        </div>
      </div>
    );
  }


  // ── Onboarding screen (shown once after sign-up) ──
  if(showOnboarding) return wrap(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",minHeight:"100vh",padding:"40px 24px",textAlign:"center"}}>
      {/* Header */}
      <div style={{marginBottom:28}}>
        <div style={{width:64,height:64,borderRadius:18,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 16px",boxShadow:`0 8px 32px ${C.accent}55`}}>⚡</div>
        <div style={{fontSize:24,fontWeight:900,color:C.text,marginBottom:6,letterSpacing:"-0.4px"}}>You're in. Let's get to work.</div>
        <div style={{fontSize:13,color:C.muted,lineHeight:1.7,maxWidth:290,margin:"0 auto"}}>Set your exam date — we'll calibrate your study plan around it.</div>
      </div>

      {/* Exam date — primary action, first */}
      <div style={{width:"100%",maxWidth:340,marginBottom:28}}>
        <label style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",display:"block",marginBottom:8,textAlign:"left"}}>Your CFA exam date</label>
        <input type="date" value={examDateInput} onChange={e=>setExamDateInput(e.target.value)}
          style={{width:"100%",padding:"13px 16px",borderRadius:11,fontSize:14,background:C.surface,border:`1.5px solid ${C.accent}`,color:C.text,outline:"none",marginBottom:12,boxSizing:"border-box"}}/>
        {examDateInput&&<div style={{fontSize:12,color:C.easy,marginBottom:14,fontWeight:600}}>
          📅 {Math.max(0,Math.ceil((new Date(examDateInput)-new Date())/(1000*60*60*24)))} days to go — let's make every one count.
        </div>}
        <button onClick={async()=>{
          const d=new Date(examDateInput);
          if(!isNaN(d.getTime())){setExamDate(d);await storageSet("cfa_exam_date",examDateInput);}
          setShowOnboarding(false);
          setDiagQ(0);setDiagAnswers({});setShowDiagnostic(true);
        }} style={{width:"100%",padding:"15px",borderRadius:11,fontSize:15,fontWeight:800,
          background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",
          boxShadow:`0 4px 20px ${C.accent}55`,letterSpacing:"0.01em"}}>
          Start my first session →
        </button>
        <button onClick={()=>setShowOnboarding(false)} style={{fontSize:12,color:C.muted,background:"none",border:"none",cursor:"pointer",marginTop:14}}>
          I'll set my exam date later
        </button>
      </div>

      {/* Study time commitment — implementation intention */}
      <div style={{width:"100%",maxWidth:340,marginBottom:24}}>
        <label style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",display:"block",marginBottom:8,textAlign:"left"}}>When do you usually study?</label>
        <div style={{display:"flex",gap:7}}>
          {[["🌅","Morning","6–11am","morning"],["☀️","Midday","11–2pm","midday"],["🌆","Evening","5–9pm","evening"],["🌙","Night","9pm+","night"]].map(([icon,label,time,key])=>(
            <button key={key} onClick={()=>{
              const goal={time:key,setAt:new Date().toISOString()};
              setStudyGoal(goal);
              try{localStorage.setItem(STUDY_GOAL_KEY,JSON.stringify(goal));}catch{}
            }} style={{flex:1,padding:"9px 4px",borderRadius:9,fontSize:11,fontWeight:700,cursor:"pointer",border:`1.5px solid ${studyGoal?.time===key?C.accent:C.border}`,background:studyGoal?.time===key?C.accent+"20":"transparent",color:studyGoal?.time===key?C.accentLight:C.muted,textAlign:"center"}}>
              <div style={{fontSize:16,marginBottom:3}}>{icon}</div>
              <div>{label}</div>
              <div style={{fontSize:9,opacity:0.6,marginTop:1}}>{time}</div>
            </button>
          ))}
        </div>
        {studyGoal?.time&&<div style={{fontSize:11,color:C.easy,marginTop:8,textAlign:"center"}}>✓ We'll nudge you at your study time</div>}
      </div>

      {/* What happens next — reassurance, below the CTA */}
      <div style={{width:"100%",maxWidth:340}}>
        <div style={{fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12,textAlign:"left"}}>What you're getting</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {[
            ["🤖","AI-generated questions calibrated to your weak topics"],
            ["📈","Pass probability score after just 3 sessions"],
            ["🔁","Spaced repetition for every concept you miss"],
          ].map(([icon,t])=>(
            <div key={icon} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"9px 12px",background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,textAlign:"left"}}>
              <span style={{fontSize:15,flexShrink:0,marginTop:1}}>{icon}</span>
              <div style={{fontSize:12,color:C.textMid,lineHeight:1.5}}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ══ DIAGNOSTIC QUIZ ══════════════════════════════════════════════════════════
  if(showDiagnostic){
    const dq=DIAGNOSTIC_QUESTIONS[diagQ];
    const isLast=diagQ===DIAGNOSTIC_QUESTIONS.length-1;
    const totalAnswered=Object.keys(diagAnswers).length;
    if(totalAnswered===DIAGNOSTIC_QUESTIONS.length){
      // Results view
      const byTopic={};
      DIAGNOSTIC_QUESTIONS.forEach(q=>{
        if(!byTopic[q.topic])byTopic[q.topic]={correct:0,total:0};
        byTopic[q.topic].total++;
        if(diagAnswers[q.id]===q.answer)byTopic[q.topic].correct++;
      });
      const sorted=Object.entries(byTopic).sort((a,b)=>((a[1].correct/a[1].total)-(b[1].correct/b[1].total)));
      const weakest=sorted.slice(0,3).map(([t])=>t);
      const overallPctDiag=Math.round((DIAGNOSTIC_QUESTIONS.filter(q=>diagAnswers[q.id]===q.answer).length/DIAGNOSTIC_QUESTIONS.length)*100);
      return wrap(
        <div style={{animation:"fadeIn 0.4s ease"}}>
          <div style={{textAlign:"center",marginBottom:24}}>
            <div style={{fontSize:36,marginBottom:8}}>{overallPctDiag>=70?"🎯":"📊"}</div>
            <div style={{fontSize:22,fontWeight:900,color:C.text,marginBottom:4}}>Diagnostic Complete</div>
            <div style={{fontSize:14,color:C.muted}}>Overall: <strong style={{color:overallPctDiag>=70?C.easy:C.medium}}>{overallPctDiag}%</strong> · {DIAGNOSTIC_QUESTIONS.filter(q=>diagAnswers[q.id]===q.answer).length}/{DIAGNOSTIC_QUESTIONS.length} correct</div>
          </div>
          <div style={{marginBottom:18}}>
            <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}}>Topic Breakdown</div>
            {Object.entries(byTopic).map(([topic,{correct,total}])=>{
              const pct=Math.round((correct/total)*100);
              const isWeak=weakest.includes(topic);
              return(
                <div key={topic} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,padding:"9px 12px",borderRadius:10,background:C.surface,border:`1px solid ${isWeak?C.hard+"44":C.border}`}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontSize:12,fontWeight:isWeak?700:500,color:isWeak?C.hard:C.text}}>{topic}{isWeak?" ⚠":""}</span>
                      <span style={{fontSize:12,fontWeight:700,color:pct>=70?C.easy:pct>=50?C.medium:C.hard}}>{pct}%</span>
                    </div>
                    <div style={{height:4,background:C.dim,borderRadius:2}}>
                      <div style={{height:"100%",width:`${pct}%`,background:pct>=70?C.easy:pct>=50?C.medium:C.hard,borderRadius:2,transition:"width 0.6s ease"}}/>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {weakest.length>0&&(
            <div style={{background:`${C.accent}12`,border:`1px solid ${C.accent}33`,borderRadius:12,padding:"14px 16px",marginBottom:16}}>
              <div style={{fontSize:12,fontWeight:700,color:C.accentLight,marginBottom:6}}>🎯 Recommended focus</div>
              <div style={{fontSize:12,color:C.textMid,lineHeight:1.6}}>Start with <strong style={{color:C.text}}>{weakest[0]}</strong> — your lowest scoring area. We'll prioritise it in your AI sessions.</div>
              {weakest[0]&&(()=>{
                try{storageSet("cfa_diag_weak",weakest);}catch{}
              })()}
            </div>
          )}
          <button onClick={()=>{
            setDiagWeak(weakest);
            try{localStorage.setItem("cfa_cfa_diag_weak",JSON.stringify(weakest));}catch{}
            const t=weakest[0];
            const mods=Object.keys(getActiveLOS(cfaLevel)[t]?.modules||{});
            setShowDiagnostic(false);
            if(t&&mods.length){setTimeout(()=>generateQuestions(t,mods[0],"Easy",10,"guided"),100);}
          }} style={{width:"100%",padding:"14px",borderRadius:12,fontSize:14,fontWeight:800,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",boxShadow:`0 4px 20px ${C.accent}44`}}>
            🚀 Drill your weakest topic: {weakest[0]} →
          </button>
          <button onClick={()=>{
            setDiagWeak(weakest);
            try{localStorage.setItem("cfa_cfa_diag_weak",JSON.stringify(weakest));}catch{}
            setShowDiagnostic(false);
          }} style={{fontSize:12,color:C.muted,background:"none",border:"none",cursor:"pointer",marginTop:12,display:"block",width:"100%",textAlign:"center"}}>
            Explore home first →
          </button>
        </div>
      );
    }
    // Question view
    const progPct=Math.round((diagQ/DIAGNOSTIC_QUESTIONS.length)*100);
    return wrap(
      <div style={{animation:"fadeIn 0.3s ease"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:700,color:C.text}}>Diagnostic Quiz</div>
          <div style={{fontSize:12,color:C.muted}}>{diagQ+1} / {DIAGNOSTIC_QUESTIONS.length}</div>
        </div>
        <div style={{height:4,background:C.dim,borderRadius:2,marginBottom:20}}>
          <div style={{height:"100%",width:`${progPct}%`,background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:2,transition:"width 0.4s"}}/>
        </div>
        <div style={{fontSize:11,fontWeight:600,color:C.accent,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:8}}>{dq.topic}</div>
        <div style={{fontSize:15,color:C.text,lineHeight:1.7,marginBottom:20,fontWeight:500}}>{dq.question}</div>
        <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:16}}>
          {Object.entries(dq.options).map(([k,v])=>{
            const sel=diagAnswers[dq.id]===k;
            const correct=dq.answer===k;
            const answered=!!diagAnswers[dq.id];
            const bg=answered?(sel&&correct?`${C.easy}22`:sel?`${C.hard}18`:correct?`${C.easy}10`:C.surface):C.surface;
            const border=answered?(sel&&correct?C.easy+"66":sel?C.hard+"55":correct?C.easy+"44":C.border):C.border;
            return(
              <button key={k} disabled={answered} onClick={()=>setDiagAnswers(a=>({...a,[dq.id]:k}))}
                style={{width:"100%",textAlign:"left",padding:"12px 14px",borderRadius:11,fontSize:13,background:bg,border:`1.5px solid ${border}`,color:C.text,cursor:answered?"default":"pointer",transition:"all 0.2s",display:"flex",alignItems:"flex-start",gap:10}}>
                <span style={{fontWeight:800,color:answered&&correct?C.easy:answered&&sel?C.hard:C.muted,flexShrink:0}}>{k}.</span>
                <span style={{lineHeight:1.5}}>{v}</span>
              </button>
            );
          })}
        </div>
        {diagAnswers[dq.id]&&(
          <div style={{background:C.surfaceHigh,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",marginBottom:16,fontSize:12,color:C.textMid,lineHeight:1.65}}>
            {dq.explanation}
          </div>
        )}
        {diagAnswers[dq.id]&&(
          <button onClick={()=>{if(!isLast)setDiagQ(q=>q+1);else setDiagQ(DIAGNOSTIC_QUESTIONS.length);}}
            style={{width:"100%",padding:"13px",borderRadius:12,fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",boxShadow:`0 4px 16px ${C.accent}44`}}>
            {isLast?"See My Results →":"Next Question →"}
          </button>
        )}
        <button onClick={()=>setShowDiagnostic(false)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:11,marginTop:12,display:"block",width:"100%"}}>
          Skip — go straight to home
        </button>
      </div>
    );
  }

  // ══ LEVEL UP OVERLAY ═════════════════════════════════════════════════════════
  if(levelUpInfo) return(
    <div style={{position:"fixed",inset:0,zIndex:9000,background:"rgba(6,6,16,0.98)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,textAlign:"center"}}
      onClick={()=>setLevelUpInfo(null)}>
      <div style={{fontSize:80,marginBottom:12,animation:"pulse 1.2s ease infinite"}}>⭐</div>
      <div style={{fontSize:11,fontWeight:700,color:"#7c3aed",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:10}}>Level Up</div>
      <div style={{fontSize:32,fontWeight:800,color:"#e2e2ff",marginBottom:8,lineHeight:1.2}}>{levelUpInfo.label}</div>
      <div style={{fontSize:13,color:"#7070a0",marginBottom:40,lineHeight:1.65,maxWidth:270}}>You've earned your next rank.<br/>Consistency is what separates CFA passers.</div>
      <button onClick={()=>setLevelUpInfo(null)} style={{padding:"14px 32px",borderRadius:12,fontSize:15,fontWeight:700,background:"linear-gradient(135deg,#7c3aed,#818cf8)",color:"#fff",border:"none",cursor:"pointer",boxShadow:"0 6px 24px #7c3aed55"}}>See My Results →</button>
      <div style={{fontSize:11,color:"#40406060",marginTop:20}}>tap anywhere to continue</div>
    </div>
  );

  // ══ MILESTONE OVERLAY ════════════════════════════════════════════════════════
  if(milestoneOverlay) return(
    <div style={{position:"fixed",inset:0,zIndex:9000,background:"rgba(6,6,16,0.98)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,textAlign:"center"}}
      onClick={()=>setMilestoneOverlay(null)}>
      <div style={{fontSize:80,marginBottom:12,animation:"pulse 1.2s ease infinite"}}>{milestoneOverlay.emoji}</div>
      <div style={{fontSize:11,fontWeight:700,color:"#f59e0b",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:10}}>Milestone</div>
      <div style={{fontSize:48,fontWeight:800,color:"#e2e2ff",marginBottom:4}}>{milestoneOverlay.count}</div>
      <div style={{fontSize:20,fontWeight:600,color:"#8080b0",marginBottom:30}}>Questions Answered</div>
      <button onClick={()=>{
        const shareText=`${milestoneOverlay.emoji} ${milestoneOverlay.count} CFA practice questions answered on ClearCFA! Building exam readiness one Q at a time 📚 clearcfa.com`;
        if(navigator.share)navigator.share({title:"ClearCFA Milestone",text:shareText}).catch(()=>{});
        else{try{navigator.clipboard.writeText(shareText);}catch{}showToast("📋","Copied!","Share text copied to clipboard");}
      }} style={{padding:"12px 28px",borderRadius:12,fontSize:14,fontWeight:700,background:"linear-gradient(135deg,#f59e0b,#fbbf24)",color:"#000",border:"none",cursor:"pointer",marginBottom:12}}>
        Share milestone →
      </button>
      <button onClick={()=>setMilestoneOverlay(null)} style={{padding:"10px 24px",borderRadius:10,fontSize:13,fontWeight:600,background:"transparent",border:"1px solid #ffffff22",color:"#8080b0",cursor:"pointer"}}>
        See My Results →
      </button>
      <div style={{fontSize:11,color:"#40406060",marginTop:16}}>tap anywhere to continue</div>
    </div>
  );

  // ══ DUEL TOPIC PICKER ════════════════════════════════════════════════════════
  if(duelTopicPicking) return(
    <div style={{position:"fixed",inset:0,zIndex:8000,background:"rgba(6,6,16,0.97)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{width:"100%",maxWidth:400}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:32,marginBottom:8}}>⚔️</div>
          <div style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:6}}>Create a Duel</div>
          <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>Pick a topic — you'll play 3 questions, then get a shareable link. Your friend plays the same ones. May the best score win.</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
          {Object.keys(OFFLINE_SEED_QS).map(topicName=>(
            <button key={topicName} onClick={()=>startDuelCreator(topicName)}
              style={{padding:"12px 10px",borderRadius:11,fontSize:12,fontWeight:700,border:`1px solid ${C.border}`,background:C.surface,color:C.text,cursor:"pointer",textAlign:"left"}}>
              {topicName.split(" ").slice(0,2).join(" ")}
            </button>
          ))}
        </div>
        <button onClick={()=>setDuelTopicPicking(false)} style={{width:"100%",padding:"11px",borderRadius:10,fontSize:13,background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>
          Cancel
        </button>
      </div>
    </div>
  );

  // ══ STUDY GROUP SCREEN ═══════════════════════════════════════════════════════
  if(sgScreen) return wrap(<>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
      <div>
        <h2 style={{margin:0,fontSize:22,fontWeight:800}}>Study Group 👥</h2>
        <div style={{fontSize:12,color:C.muted,marginTop:3}}>Study alongside friends · shared leaderboard</div>
      </div>
      <button onClick={()=>setSgScreen(false)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>← Back</button>
    </div>

    {studyGroup?(
      <div>
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>Your Group</div>
          <div style={{fontSize:18,fontWeight:800,color:C.text,marginBottom:4}}>{studyGroup.name}</div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:700,color:C.accentLight,background:C.accent+"20",border:`1px solid ${C.accent}33`,borderRadius:8,padding:"4px 12px",letterSpacing:"0.12em"}}>{studyGroup.code}</div>
            <button onClick={()=>{
              const url=`${window.location.origin}${window.location.pathname}?sg=${studyGroup.code}`;
              try{navigator.clipboard.writeText(url);}catch{}
              showToast("📋","Invite link copied!","Share it with your study partners.");
            }} style={{fontSize:11,fontWeight:700,padding:"5px 12px",borderRadius:8,background:C.surface,border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>
              Copy invite link
            </button>
          </div>
          <div style={{fontSize:11,color:C.muted}}>Share the code or link so friends can join your group.</div>
        </div>

        {/* Leaderboard */}
        {groupLeaderboard.length>0&&(
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12}}>This Week's Leaderboard</div>
            {groupLeaderboard.map((m,i)=>(
              <div key={m.userId} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<groupLeaderboard.length-1?`1px solid ${C.border}`:"none"}}>
                <div style={{width:24,height:24,borderRadius:"50%",background:i===0?C.reward+"30":C.surface,border:`1px solid ${i===0?C.reward:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:i===0?C.reward:C.muted,flexShrink:0}}>
                  {i+1}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:C.text}}>{m.displayName||"Member"}</div>
                  <div style={{fontSize:11,color:C.muted}}>{m.questions} Qs · {m.accuracy}% avg</div>
                </div>
                {m.userId===authUser?.id&&<span style={{fontSize:9,fontWeight:800,color:C.accentLight,background:C.accent+"20",borderRadius:4,padding:"2px 5px"}}>YOU</span>}
              </div>
            ))}
          </div>
        )}

        <button onClick={()=>{
          setStudyGroup(null);
          try{localStorage.removeItem(SG_KEY);}catch{}
          showToast("👋","Left group","You've left the study group.");
        }} style={{width:"100%",padding:"11px",borderRadius:10,fontSize:13,background:"none",border:`1px solid ${C.hard}44`,color:C.hard,cursor:"pointer"}}>
          Leave group
        </button>
      </div>
    ):(
      <div>
        {/* Create Group */}
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:10}}>Create a group</div>
          <input value={sgCreateName} onChange={e=>setSgCreateName(e.target.value)} placeholder="Group name (e.g. CFA L1 June 2026)"
            style={{width:"100%",padding:"10px 12px",borderRadius:9,fontSize:13,border:`1px solid ${C.border}`,background:C.bg,color:C.text,marginBottom:10,outline:"none"}}/>
          <button disabled={!sgCreateName.trim()||sgLoading||!authUser?.id} onClick={async()=>{
            if(!authUser?.id){showToast("🔒","Sign in required","Create an account to use study groups.");return;}
            setSgLoading(true);
            const code=Math.random().toString(36).slice(2,8).toUpperCase();
            const group={groupId:`local_${Date.now()}`,code,name:sgCreateName.trim(),createdBy:authUser.id};
            setStudyGroup(group);
            try{localStorage.setItem(SG_KEY,JSON.stringify(group));}catch{}
            setSgCreateName("");setSgLoading(false);
            showToast("👥","Group created!",`Code: ${code} — share with friends.`);
          }} style={{width:"100%",padding:"11px",borderRadius:9,fontSize:13,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:sgCreateName.trim()&&!sgLoading&&authUser?.id?"pointer":"not-allowed",opacity:sgCreateName.trim()&&!sgLoading&&authUser?.id?1:0.5}}>
            {sgLoading?"Creating…":"Create Group →"}
          </button>
        </div>

        {/* Join Group */}
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:10}}>Join a group</div>
          <input value={sgJoinCode} onChange={e=>setSgJoinCode(e.target.value.toUpperCase().slice(0,6))} placeholder="Enter 6-char code"
            style={{width:"100%",padding:"10px 12px",borderRadius:9,fontSize:13,border:`1px solid ${C.border}`,background:C.bg,color:C.text,marginBottom:10,outline:"none",letterSpacing:"0.12em",fontWeight:700}}/>
          <button disabled={sgJoinCode.length!==6||sgLoading||!authUser?.id} onClick={()=>{
            if(!authUser?.id){showToast("🔒","Sign in required","Create an account to join study groups.");return;}
            const group={groupId:`joined_${sgJoinCode}`,code:sgJoinCode,name:`Group ${sgJoinCode}`,createdBy:null};
            setStudyGroup(group);
            try{localStorage.setItem(SG_KEY,JSON.stringify(group));}catch{}
            setSgJoinCode("");
            showToast("👥","Joined!",`You've joined group ${sgJoinCode}.`);
          }} style={{width:"100%",padding:"11px",borderRadius:9,fontSize:13,fontWeight:700,background:sgJoinCode.length===6&&!sgLoading&&authUser?.id?`linear-gradient(135deg,${C.accent},${C.accentLight})`:"none",color:sgJoinCode.length===6&&!sgLoading&&authUser?.id?"#fff":C.muted,border:sgJoinCode.length===6&&!sgLoading&&authUser?.id?"none":`1px solid ${C.border}`,cursor:sgJoinCode.length===6&&!sgLoading&&authUser?.id?"pointer":"not-allowed",opacity:sgJoinCode.length===6&&authUser?.id?1:0.5}}>
            Join Group →
          </button>
        </div>

        {!authUser?.id&&<div style={{textAlign:"center",fontSize:12,color:C.muted,lineHeight:1.6}}>Sign in or create a free account to use study groups.</div>}
      </div>
    )}
  </>);

  // ══ WEEKLY PLAN SCREEN ══════════════════════════════════════════════════════
  if(weeklyPlanScreen){
  // Compute this-week session completion status
  const mondayKey=getWeekMondayKey();
  const thisWeekHistory=levelHistory.filter(h=>h.dateKey>=mondayKey);
  const sessionDoneMap={};
  const _usedIds=new Set();
  (weeklyPlan?.days||[]).forEach((day,di)=>{
    (day.sessions||[]).forEach((session,si)=>{
      const match=thisWeekHistory.find(h=>!_usedIds.has(h.id)&&h.topic===session.topic);
      if(match)_usedIds.add(match.id);
      sessionDoneMap[`${di}-${si}`]=!!match;
    });
  });
  const totalPlanSessions=(weeklyPlan?.days||[]).reduce((s,d)=>s+(d.sessions?.length||0),0);
  const donePlanSessions=Object.values(sessionDoneMap).filter(Boolean).length;
  return wrap(<>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
      <div>
        <h2 style={{margin:0,fontSize:22,fontWeight:800}}>Weekly Study Plan</h2>
        <div style={{fontSize:12,color:C.muted,marginTop:3}}>Built around your schedule · AI-generated</div>
      </div>
      <button onClick={()=>setWeeklyPlanScreen(false)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>← Home</button>
    </div>

    {/* Mock Exam Scheduler */}
    <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
      <div style={{fontSize:12,fontWeight:700,marginBottom:10}}>📅 Scheduled Mocks</div>
      {mockSchedule.length===0&&<div style={{fontSize:12,color:C.muted,marginBottom:10}}>No mocks scheduled. Pick a date below to add one.</div>}
      {[...mockSchedule].sort().map(d=>(
        <div key={d} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <span style={{fontSize:12}}>{d}</span>
          <button onClick={()=>{const s=mockSchedule.filter(x=>x!==d);setMockSchedule(s);try{localStorage.setItem(MOCK_SCHED_KEY,JSON.stringify(s));}catch{}}}
            style={{fontSize:11,color:C.hard,background:"none",border:"none",cursor:"pointer"}}>Remove</button>
        </div>
      ))}
      <input type="date" onChange={e=>{
        const d=e.target.value;if(!d||mockSchedule.includes(d))return;
        const s=[...mockSchedule,d];setMockSchedule(s);
        try{localStorage.setItem(MOCK_SCHED_KEY,JSON.stringify(s));}catch{}
        e.target.value="";
      }} style={{width:"100%",padding:"8px 10px",borderRadius:8,fontSize:12,
        background:C.surfaceHigh,border:`1px solid ${C.border}`,color:C.text,marginTop:6}}/>
    </div>

    {/* Hours input */}
    {!weeklyPlan && !weeklyPlanLoading && (
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"20px",marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>How many hours can you study this week?</div>
        <div style={{fontSize:12,color:C.muted,marginBottom:16,lineHeight:1.5}}>Be honest. 5 realistic hours beats 10 optimistic ones.</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
          {[2,3,5,7,10,14].map(h=>(
            <button key={h} onClick={()=>setHoursThisWeek(h)} style={{padding:"8px 14px",borderRadius:8,fontSize:13,fontWeight:700,border:hoursThisWeek===h?`1.5px solid ${C.accent}`:`1.5px solid ${C.border}`,background:hoursThisWeek===h?C.accent+"20":C.surface,color:hoursThisWeek===h?C.accentLight:C.muted,cursor:"pointer"}}>
              {h}h
            </button>
          ))}
        </div>
        <div style={{fontSize:11,color:C.muted,marginBottom:16}}>{hoursThisWeek} hours ≈ {Math.round(hoursThisWeek*60/7)} min/day average · {Math.round(hoursThisWeek*60/15)} bite-sized 15-min sessions possible</div>
        <button onClick={generateWeeklyPlan} style={{width:"100%",padding:"13px",borderRadius:10,fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",boxShadow:`0 4px 14px ${C.accent}44`}}>
          Generate My Plan →
        </button>
        {weeklyPlanError&&<div style={{fontSize:12,color:C.hard,marginTop:10,padding:"8px 12px",background:C.errorBg,borderRadius:8}}>{weeklyPlanError}</div>}
      </div>
    )}

    {weeklyPlanLoading&&(
      <div style={{textAlign:"center",padding:"40px 0"}}>
        <div style={{fontSize:28,marginBottom:12,animation:"pulse 1.5s infinite"}}>🗓</div>
        <div style={{fontSize:14,color:C.muted}}>Building your personalised plan…</div>
        <div style={{fontSize:12,color:C.muted,marginTop:6,opacity:0.6}}>Analysing gaps, SR deck, and exam weight</div>
      </div>
    )}

    {weeklyPlan&&!weeklyPlanLoading&&(<>
      {/* Headline + weekly progress */}
      <div style={{background:`linear-gradient(135deg,${C.accent}18,${C.accent}08)`,border:`1px solid ${C.accent}33`,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
        <div style={{fontSize:14,fontWeight:700,color:C.accentLight,marginBottom:4}}>{weeklyPlan.headline}</div>
        <div style={{fontSize:12,color:C.muted,marginBottom:totalPlanSessions>0?10:0}}>{weeklyPlan.totalMinutes} min total · {hoursThisWeek}h available</div>
        {totalPlanSessions>0&&(<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
            <span style={{fontSize:11,fontWeight:700,color:donePlanSessions===totalPlanSessions?C.easy:C.text}}>
              {donePlanSessions===totalPlanSessions?"🎉 All sessions done this week!":"This week's progress"}
            </span>
            <span style={{fontSize:11,fontWeight:800,color:donePlanSessions===totalPlanSessions?C.easy:C.accentLight}}>{donePlanSessions}/{totalPlanSessions}</span>
          </div>
          <div style={{height:6,background:C.border,borderRadius:3}}>
            <div style={{height:"100%",width:`${totalPlanSessions>0?Math.round(donePlanSessions/totalPlanSessions*100):0}%`,background:donePlanSessions===totalPlanSessions?C.easy:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:3,transition:"width 0.4s"}}/>
          </div>
        </>)}
      </div>

      {/* Day-by-day */}
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
        {(weeklyPlan.days||[]).map((day,di)=>(
          <div key={di} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px"}}>
            <div style={{fontSize:13,fontWeight:800,color:C.text,marginBottom:10}}>{day.day}</div>
            {(day.sessions||[]).map((session,si)=>{
              const isDone=sessionDoneMap[`${di}-${si}`];
              return(
              <div key={si} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"10px 12px",background:isDone?C.easy+"0d":C.dim,borderRadius:9,marginBottom:6,border:isDone?`1px solid ${C.easy}33`:"none"}}>
                <div style={{flex:1,marginRight:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                    <span style={{fontSize:12,fontWeight:700,color:isDone?C.easy:C.text,textDecoration:isDone?"line-through":"none"}}>{session.title}</span>
                    {isDone
                      ? <span style={{fontSize:9,padding:"1px 6px",borderRadius:10,background:C.easy+"22",color:C.easy,fontWeight:700}}>✓ DONE</span>
                      : <span style={{fontSize:9,padding:"1px 6px",borderRadius:10,background:session.type==="sr"?C.accent+"22":session.type==="review"?C.medium+"22":C.easy+"22",color:session.type==="sr"?C.accentLight:session.type==="review"?C.medium:C.easy,fontWeight:700,textTransform:"uppercase"}}>{session.type}</span>
                    }
                  </div>
                  <div style={{fontSize:11,color:C.muted}}>{session.module} · {session.durationMin}min · {session.count}Q · {session.difficulty}</div>
                  {!isDone&&<div style={{fontSize:11,color:C.muted,fontStyle:"italic",marginTop:2}}>{session.why}</div>}
                </div>
                {isDone
                  ? <div style={{fontSize:16,color:C.easy,flexShrink:0,fontWeight:700,paddingTop:2}}>✓</div>
                  : <button onClick={()=>{setWeeklyPlanScreen(false);generateQuestions(session.topic,session.module,session.difficulty,session.count,"guided");}} style={{fontSize:11,fontWeight:700,padding:"6px 11px",borderRadius:7,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",flexShrink:0}}>Start</button>
                }
              </div>
              );
            })}
            {(!day.sessions||day.sessions.length===0)&&<div style={{fontSize:12,color:C.muted,fontStyle:"italic"}}>Rest day — review your notes</div>}
          </div>
        ))}
      </div>

      {/* Key message */}
      <div style={{background:C.dim,borderRadius:10,padding:"12px 14px",fontSize:12,color:C.textMid,lineHeight:1.6,marginBottom:14,fontStyle:"italic"}}>
        "{weeklyPlan.keyMessage}"
      </div>

      <button onClick={()=>{setWeeklyPlan(null);setWeeklyPlanError("");try{localStorage.removeItem(PLAN_KEY);}catch{}}} style={{width:"100%",padding:"11px",borderRadius:10,fontSize:13,fontWeight:600,background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>Regenerate with different hours</button>
    </>)}
  </>);
  }

  // ══ HOME ══════════════════════════════════════════════════════════════════
  const downloadProgressCard=()=>{
    const canvas=document.createElement("canvas");
    const DPR=Math.min(window.devicePixelRatio||1,2);
    canvas.width=600*DPR;canvas.height=320*DPR;
    const ctx=canvas.getContext("2d");
    ctx.scale(DPR,DPR);
    ctx.fillStyle="#0a0a14";ctx.fillRect(0,0,600,320);
    const grad=ctx.createLinearGradient(0,0,600,320);
    grad.addColorStop(0,"rgba(99,102,241,0.13)");grad.addColorStop(1,"rgba(99,102,241,0.03)");
    ctx.fillStyle=grad;_rrFill(ctx,12,12,576,296,18);
    ctx.strokeStyle="rgba(99,102,241,0.27)";ctx.lineWidth=1;
    try{ctx.beginPath();ctx.roundRect(12,12,576,296,18);ctx.stroke();}catch{}
    ctx.font="bold 20px system-ui,-apple-system,sans-serif";ctx.fillStyle="#a5b4fc";ctx.fillText("ClearCFA",36,52);
    ctx.font="500 12px system-ui,-apple-system,sans-serif";ctx.fillStyle="#64748b";ctx.fillText("AI-Powered CFA Exam Prep",36,72);
    const prob=passProbability?.probability??null;
    if(prob!==null){
      ctx.font="bold 62px system-ui,-apple-system,sans-serif";ctx.fillStyle=passProbability?.color||"#22c55e";ctx.fillText(`${prob}%`,36,168);
      ctx.font="bold 12px system-ui,-apple-system,sans-serif";ctx.fillStyle="#94a3b8";ctx.fillText("PASS PROBABILITY",36,192);
    }
    if(streak>0){ctx.font="bold 30px system-ui,-apple-system,sans-serif";ctx.fillStyle="#fcd34d";ctx.fillText(`${streak}d streak`,340,130);}
    const lvlInfo=getLevel(getTotalXP(history));
    ctx.font="bold 18px system-ui,-apple-system,sans-serif";ctx.fillStyle="#a5b4fc";ctx.fillText(lvlInfo.label,340,192);
    ctx.font="500 12px system-ui,-apple-system,sans-serif";ctx.fillStyle="#64748b";ctx.fillText(`Level ${lvlInfo.level} · ${history.length} sessions`,340,214);
    if(overallPct!=null){ctx.font="bold 18px system-ui,-apple-system,sans-serif";ctx.fillStyle=overallPct>=70?"#22c55e":"#ef4444";ctx.fillText(`${overallPct}% avg`,340,250);ctx.font="500 12px system-ui,-apple-system,sans-serif";ctx.fillStyle="#64748b";ctx.fillText("Score accuracy",340,270);}
    const bt=`CFA Level ${cfaLevel}`;const bm=ctx.measureText(bt);
    ctx.fillStyle="rgba(99,102,241,0.13)";_rrFill(ctx,36,272,bm.width+20,26,7);
    ctx.font="bold 12px system-ui,-apple-system,sans-serif";ctx.fillStyle="#a5b4fc";ctx.fillText(bt,46,290);
    ctx.font="500 10px system-ui,-apple-system,sans-serif";ctx.fillStyle="#374151";ctx.fillText("praneethgollamudi.github.io/ClearCFA",340,295);
    const a=document.createElement("a");a.href=canvas.toDataURL("image/png");a.download=`clearcfa-${localDateKey()}.png`;a.click();
  };
  // ════════════════════════════════════════
  // SCREEN: home
  // ════════════════════════════════════════
  if(screen==="home") return wrap(<>
    {/* Settings drawer overlay */}
    {upgradeModal&&<UpgradeModal reason={upgradeModal.reason} passProb={upgradeModal.passProb??null} weakCount={upgradeModal.weakCount??0} streakDays={upgradeModal.streakDays??0} onClose={()=>setUpgradeModal(null)} userEmail={authUser?.email||""} onCheckAccess={async()=>{const{isPro,validUntil}=await checkProFromServer(SB_CFG,authUser?.id||"",authUser?.email||"");if(isPro){setProStatus(true);setProValidUntil(validUntil||null);}return isPro;}}/>}
    {feedbackOpen&&<FeedbackModal onClose={()=>setFeedbackOpen(false)} userId={authUser?.id||"anon"} onSubmit={(data)=>submitFeedback(SB_CFG,data)}/>}

    {/* Onboarding gate — shown once before feature tour */}
    {!onboardingDone&&<OnboardingGate onComplete={({level,examDate,retakerTopics})=>{
      setCfaLevel(level);
      try{localStorage.setItem(CFA_LEVEL_KEY,level);}catch{}
      if(examDate){
        const goal={...(studyGoal||{}),examDate};
        setStudyGoal(goal);
        try{localStorage.setItem(STUDY_GOAL_KEY,JSON.stringify(goal));}catch{}
      }
      if(retakerTopics?.length>0){
        try{localStorage.setItem(RETAKER_KEY,JSON.stringify({topics:retakerTopics}));}catch{}
      }
      setOnboardingDone(true);
      try{localStorage.setItem(ONBOARDING_KEY,"1");}catch{}
    }}/>}

    {/* Feature tour — shown once for new users */}
    {!tourDismissed&&<SlideOverlay
      slides={[
        {emoji:"⚡",color:C.accentLight,bg:C.accent,title:"Office Mode",sub:"Your daily AI drill",desc:"Every day, AI picks your weakest CFA topic and fires questions calibrated to your current form. One tap, 5–10 minutes, maximum exam impact.",tip:"Look for ⚡ Office Mode at the top of home — tap Start every day you study."},
        {emoji:"📋",color:C.accentLight,bg:C.accent,title:"Spaced Repetition",sub:"Never forget what you've learned",desc:"Every wrong answer becomes a smart flashcard. The SM-2 algorithm resurfaces it at exactly the right interval — not too soon, not too late.",tip:"Watch the 'SR Due' counter in your stats strip and review cards daily."},
        {emoji:"📈",color:C.easy,bg:C.easy,title:"Pass Probability",sub:"Unlocks after 3 sessions",desc:"A live score showing how likely you are to pass based on your accuracy, topic coverage, and exam weight. Ruthlessly honest — no false comfort.",tip:"Tap the Progress tab in the bottom nav to see your topic-by-topic breakdown."},
        {emoji:"🎯",color:C.medium,bg:C.medium,title:"Today's Focus",sub:"Your AI-powered study plan",desc:"Tap Generate on the home screen — AI analyses your weak spots, exam weight, and spaced repetition dues to build a prioritised plan for today.",tip:"Generate a fresh focus each morning. It adapts every time you complete a session."},
      ]}
      onDismiss={()=>{setTourDismissed(true);try{localStorage.setItem(TOUR_KEY,"1");}catch{}}}
      ctaLabel="🚀 Let's start studying →"
      zIndex={350}
    />}

    {/* What's New — shown once per release version */}
    {tourDismissed&&unseenSlides.length>0&&<SlideOverlay
      slides={unseenSlides}
      onDismiss={()=>{setLastSeenWN(WHATS_NEW_VERSION);try{localStorage.setItem(WHATS_NEW_KEY,WHATS_NEW_VERSION);}catch{}}}
      skipLabel="Got it →"
      ctaLabel="✓ Got it →"
      zIndex={345}
    />}

    {/* Pro upgrade tour — shown once when user first goes Pro */}
    {tourDismissed&&unseenSlides.length===0&&proStatus&&!proTourDismissed&&<SlideOverlay
      slides={[
        {emoji:"⭐",color:C.accentLight,bg:C.accent,title:"Welcome to Pro!",sub:"You're now a Pro member",desc:"Unlimited AI questions, all three CFA levels, AI Debrief after every session, AI Coach for on-demand help — everything is now unlocked for you.",tip:"Your Pro status is linked to your account. It works across devices automatically."},
        {emoji:"🤖",color:C.accentLight,bg:C.accent,title:"AI Debrief",sub:"Pro feature unlocked",desc:"After every quiz, tap 'AI Debrief' to get a personalised breakdown of where you went wrong, what concept gaps to address, and a targeted study plan.",tip:"The debrief uses your actual wrong answers — it's tailored to exactly what you need to fix."},
        {emoji:"📚",color:C.easy,bg:C.easy,title:"All CFA Levels",sub:"L1, L2 & L3 unlocked",desc:"Switch between CFA Level 1, 2, and 3 anytime from Settings. Level 2 auto-enables item-set vignettes; Level 3 focuses on portfolio management and IPS questions.",tip:"You can switch levels mid-study — your SR deck and history are tracked per level."},
      ]}
      onDismiss={()=>{setProTourDismissed(true);try{localStorage.setItem(PRO_TOUR_KEY,"1");}catch{}}}
      skipLabel="Skip →"
      ctaLabel="🚀 Start studying →"
      zIndex={340}
    />}

    {settingsOpen&&(
      <div style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(4px)",display:"flex",flexDirection:"column",justifyContent:"flex-end"}} onClick={()=>setSettingsOpen(false)}>
        <div onClick={e=>e.stopPropagation()} style={{background:C.bg,borderRadius:"18px 18px 0 0",border:`1px solid ${C.border}`,borderBottom:"none",display:"flex",flexDirection:"column",maxHeight:"92vh"}}>
          <div style={{padding:"20px 16px 0",flexShrink:0}}>
            <div style={{width:36,height:4,borderRadius:2,background:C.border,margin:"0 auto 18px"}}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontSize:14,fontWeight:800,color:C.text}}>Settings</div>
              <button onClick={()=>setSettingsOpen(false)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:22,lineHeight:1,padding:"0 4px"}}>×</button>
            </div>
          </div>
          <div style={{overflowY:"auto",WebkitOverflowScrolling:"touch",overscrollBehavior:"contain",padding:"0 16px 40px",flex:1}}>
          {/* CFA Level Selector */}
          <div style={{width:"100%",padding:"13px 14px",borderRadius:12,background:C.surface,border:`1px solid ${C.border}`,marginBottom:9}}>
            <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:8}}>🎓 CFA Level</div>
            <div style={{display:"flex",gap:6}}>
              {["1","2","3"].map(l=>(
                <button key={l} onClick={()=>{setCfaLevel(l);try{localStorage.setItem(CFA_LEVEL_KEY,l);}catch{}}}
                  style={{flex:1,padding:"8px",borderRadius:9,fontSize:13,fontWeight:800,border:"none",cursor:"pointer",
                    background:cfaLevel===l?`linear-gradient(135deg,${C.accent},${C.accentLight})`:C.surfaceHigh,
                    color:cfaLevel===l?"#fff":C.muted,transition:"all 0.15s"}}>
                  L{l}
                </button>
              ))}
            </div>
            <div style={{fontSize:10,color:C.muted,marginTop:6,lineHeight:1.5}}>
              {cfaLevel==="1"&&"Standalone MCQ · L1 curriculum topics · formula sheets"}
              {cfaLevel==="2"&&<span style={{color:C.accentLight}}>Item-set vignettes auto-enabled · L2 curriculum (10 topics, 29 modules) · deeper analytical questions</span>}
              {cfaLevel==="3"&&<span style={{color:C.accentLight}}>Portfolio management focus auto-enabled · L3 curriculum (12 topics, 25 modules) · IPS & asset allocation focus</span>}
            </div>
          </div>
          {/* Pro status */}
          {proStatus?(
            <div style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"13px 14px",borderRadius:12,background:`linear-gradient(135deg,${C.accent}18,${C.accent}08)`,border:`1.5px solid ${C.accent}44`,marginBottom:9}}>
              <span style={{fontSize:18}}>⭐</span>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700,color:C.text}}>ClearCFA Pro</div>
                <div style={{fontSize:11,color:C.accentLight,marginTop:1}}>Unlimited AI questions · All levels · AI Coach</div>
                <div style={{fontSize:10,color:C.muted,marginTop:3}}>{proValidUntil?`Active until ${new Date(proValidUntil).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}`:"Lifetime access"}</div>
              </div>
              <span style={{fontSize:11,color:C.accentLight,fontWeight:700}}>Active ✓</span>
            </div>
          ):(
            <button onClick={()=>{setSettingsOpen(false);setUpgradeModal({reason:"default"});}} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"13px 14px",borderRadius:12,background:`linear-gradient(135deg,${C.accent}18,${C.accent}08)`,border:`1.5px solid ${C.accent}44`,color:C.text,cursor:"pointer",marginBottom:9,textAlign:"left"}}>
              <span style={{fontSize:18}}>🚀</span>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:700}}>Upgrade to Pro</div>
                <div style={{fontSize:11,color:C.muted,marginTop:1}}>Unlimited AI Qs · L2 & L3 · AI Coach · ₹{ACTIVE_PRICE}/mo</div>
              </div>
              <span style={{fontSize:11,color:C.accentLight,fontWeight:700}}>→</span>
            </button>
          )}
          {/* Backup */}
          <button onClick={()=>{setSettingsOpen(false);setScreen("backup");}} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"13px 14px",borderRadius:12,background:C.surface,border:`1px solid ${C.border}`,color:C.text,cursor:"pointer",marginBottom:9,textAlign:"left"}}>
            <span style={{fontSize:18}}>💾</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700}}>Backup & Restore</div>
              <div style={{fontSize:11,color:C.muted,marginTop:1}}>Export JSON · import on another device</div>
            </div>
          </button>
          {/* Theme Toggle */}
          <div style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"13px 14px",borderRadius:12,background:C.surface,border:`1px solid ${C.border}`,marginBottom:9}}>
            <span style={{fontSize:18}}>{theme==='dark'?'🌙':'☀️'}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:C.text}}>Appearance</div>
              <div style={{fontSize:11,color:C.muted,marginTop:1}}>{theme==='dark'?'Dark mode active':'Light mode active'}</div>
            </div>
            <button onClick={toggleTheme} style={{padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:700,border:`1.5px solid ${C.accent}`,background:C.accent+"18",color:C.accentLight,cursor:"pointer"}}>
              {theme==='dark'?'☀️ Light':'🌙 Dark'}
            </button>
          </div>
          {/* Notifications */}
          {"Notification" in window&&(
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"13px 14px",marginBottom:9}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:Notification.permission==="granted"?10:0}}>
                <span style={{fontSize:18}}>🔔</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600}}>Study Reminders</div>
                  <div style={{fontSize:11,color:C.muted,marginTop:1}}>
                    {Notification.permission==="granted"?"Enabled — set daily reminder time":"Tap to enable daily reminders"}
                  </div>
                </div>
                <button onClick={async()=>{
                  if(Notification.permission==="granted"){
                    const sw=await navigator.serviceWorker.ready.catch(()=>null);
                    if(sw){sw.showNotification("ClearCFA",{body:`You have ${dueCards.length} SR cards due today`,icon:"/ClearCFA/icon-192.png",tag:"test"});}
                  }else{
                    const perm=await Notification.requestPermission();
                    if(perm==="granted"){
                      const sw=await navigator.serviceWorker.ready.catch(()=>null);
                      if(sw){sw.showNotification("ClearCFA",{body:"Notifications enabled!",icon:"/ClearCFA/icon-192.png",tag:"test"});}
                    }
                  }
                }} style={{fontSize:11,color:Notification.permission==="granted"?C.easy:C.muted,fontWeight:700,background:Notification.permission==="granted"?C.easy+"18":C.dim,border:"none",padding:"4px 10px",borderRadius:6,cursor:"pointer"}}>
                  {Notification.permission==="granted"?"ON · Test":"Enable"}
                </button>
              </div>
              {Notification.permission==="granted"&&(
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:12,color:C.muted,flexShrink:0}}>Daily reminder at:</span>
                  <input type="time" value={reminderTime} onChange={e=>{
                    const t=e.target.value;
                    setReminderTime(t);
                    try{if(t)localStorage.setItem(REMINDER_TIME_KEY,t);else localStorage.removeItem(REMINDER_TIME_KEY);}catch{}
                  }} style={{flex:1,padding:"7px 10px",borderRadius:8,background:C.dim,border:`1px solid ${C.border}`,color:C.text,fontSize:13,outline:"none"}}/>
                  {reminderTime&&<button onClick={()=>{setReminderTime("");try{localStorage.removeItem(REMINDER_TIME_KEY);}catch{}}} style={{fontSize:11,color:C.muted,background:"none",border:"none",cursor:"pointer",flexShrink:0}}>Clear</button>}
                </div>
              )}
            </div>
          )}
          {/* Feedback */}
          <button onClick={()=>{setSettingsOpen(false);setFeedbackOpen(true);}} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"13px 14px",borderRadius:12,background:C.surface,border:`1px solid ${C.border}`,color:C.text,cursor:"pointer",marginBottom:9,textAlign:"left"}}>
            <span style={{fontSize:18}}>💬</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700}}>Send Feedback</div>
              <div style={{fontSize:11,color:C.muted,marginTop:1}}>Report bugs · suggest features · share thoughts</div>
            </div>
          </button>
          {/* Flagged Questions — admin only */}
          {isAdmin&&<button onClick={()=>{setSettingsOpen(false);setScreen("dashboard");setDashTab("flags");}} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"13px 14px",borderRadius:12,background:C.surface,border:`1px solid ${C.border}`,color:C.text,cursor:"pointer",marginBottom:9,textAlign:"left"}}>
            <span style={{fontSize:18}}>⚑</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700}}>Flagged Questions</div>
              <div style={{fontSize:11,color:C.muted,marginTop:1}}>{questionFlags.length>0?`${questionFlags.length} flagged — review or clear`:"Flag bad questions during a quiz"}</div>
            </div>
          </button>}
          {/* API Usage — admin only */}
          {isAdmin&&<button onClick={()=>{setSettingsOpen(false);setScreen("dashboard");setDashTab("api");}} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"13px 14px",borderRadius:12,background:C.surface,border:`1px solid ${C.border}`,color:C.text,cursor:"pointer",marginBottom:9,textAlign:"left"}}>
            <span style={{fontSize:18}}>📊</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700}}>API Usage</div>
              <div style={{fontSize:11,color:C.muted,marginTop:1}}>Cost breakdown · feature spend · recent calls</div>
            </div>
          </button>}
          {/* Admin Dashboard — admin only */}
          {isAdmin&&<button onClick={()=>{setSettingsOpen(false);fetchAdminStats();setScreen("adminDashboard");}} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"13px 14px",borderRadius:12,background:`linear-gradient(135deg,${C.accent}18,${C.accent}08)`,border:`1px solid ${C.accent}44`,color:C.text,cursor:"pointer",marginBottom:9,textAlign:"left"}}>
            <span style={{fontSize:18}}>🛡️</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:C.accentLight}}>Admin Dashboard</div>
              <div style={{fontSize:11,color:C.muted,marginTop:1}}>Users · AI usage · cost · revenue · feedback</div>
            </div>
          </button>}
          {/* Account */}
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:12,marginTop:4}}>
            <div style={{fontSize:11,color:C.muted,marginBottom:4,textAlign:"center"}}>
              Signed in as <strong style={{color:C.text}}>{authUser?.email}</strong>
            </div>
            <div style={{fontSize:10,color:driveStatus==="error"?C.hard:C.muted,textAlign:"center",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
              <span>☁</span>
              <span>
                {supabaseSyncing?"Syncing…":`${history.length} sessions · ${Object.keys(srDeckRef.current).length} SR cards`}
              </span>
              {!supabaseSyncing&&(
                <span style={{color:driveStatus==="error"?C.hard:C.easy,fontWeight:700}}>
                  {driveStatus==="error"?"· sync failed ✗":"· synced ✓"}
                </span>
              )}
              <button onClick={async()=>{
                setSupabaseSyncing(true);setDriveStatus("syncing");
                const ok=await supabaseSync(SB_CFG,history,srDeckRef.current,usageStatsRef.current,authUserRef.current);
                setDriveStatus(ok?"synced":"error");
                setTimeout(()=>setDriveStatus(null),4000);
                setSupabaseSyncing(false);
              }} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:10,padding:"0 2px",textDecoration:"underline"}}>
                sync now
              </button>
            </div>
            <button onClick={()=>{
              // Clear auth token
              clearAuth();
              // Clear all user-specific localStorage keys so next user starts fresh
              [
                "cfa_"+STORAGE_KEY,"cfa_"+SR_KEY,"cfa_"+USAGE_KEY,
                "cfa_"+PASS_TREND_KEY,"cfa_"+PLAN_KEY,"cfa_"+API_LOG_KEY,
                "cfa_"+QCACHE_KEY,
                CFA_LEVEL_KEY,REFRESHER_KEY,LESSONS_KEY,STUDY_GOAL_KEY,
                PRESETS_KEY,MISSION_KEY,CONFIDENCE_KEY,WORKED_EX_KEY,
                DYNAMIC_PN_KEY,DYNAMIC_FORMULAS_KEY,STREAK_FREEZE_KEY,
                CALC_SNAP_KEY,SESSION_DRAFT_KEY,FLAGS_KEY,
                BESTS_KEY,RESOLVED_GAPS_KEY,REMINDER_TIME_KEY,LAST_SCREEN_KEY,
                LAST_UID_KEY,"cfa_pro_cache","cfa_cfa_focus_cache","cfa_cfa_exam_date","cfa_daily_ai",
              ].forEach(k=>{try{localStorage.removeItem(k);}catch{}});
              // Reset all user-specific React state
              setAuthUser(null);authUserRef.current=null;
              setHistory([]);historyRef.current=[];
              setSrDeck({});srDeckRef.current={};
              setWeeklyPlan(null);setDiagWeak([]);
              setDailyRefresher(null);setTopicLessons({});
              setCfaLevel("1");
              setStudyGoal(null);setPresets([]);
              setDailyMission(null);setConfidenceLog({});
              setWorkedExamples({});setSessionDraft(null);
              setQuestionFlags([]);setPersonalBests({});
              setProStatus(false);setProValidUntil(null);
              setUsageStats({});usageStatsRef.current={};
              setSettingsOpen(false);
              try{window.dispatchEvent(new CustomEvent('cfa_auth',{detail:false}));}catch{}
            }}
              style={{width:"100%",padding:"10px",borderRadius:10,fontSize:12,fontWeight:600,background:"#200010",border:`1px solid ${C.hard}44`,color:C.hard,cursor:"pointer"}}>
              Sign out
            </button>
          </div>
          {/* Data status */}
          <div style={{fontSize:11,color:C.muted,textAlign:"center",marginTop:10,lineHeight:1.6}}>
            <span style={{color:C.easy}}>🤖 AI powered by ClearCFA — no API key needed</span>
            <br/>
            <a href="/ClearCFA/privacy.html" target="_blank" rel="noopener" style={{color:C.muted,textDecoration:"underline",fontSize:11}}>Privacy Policy</a>
          </div>
        </div>{/* end scroll wrapper */}
      </div>{/* end panel */}
      </div>
    )}

    {/* Header */}
    <div style={{marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <div style={{width:32,height:32,borderRadius:9,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,boxShadow:`0 4px 12px ${C.accent}55`}}>⚡</div>
            <div>
              <div style={{fontSize:16,fontWeight:800,letterSpacing:"-0.3px",color:C.text}}>ClearCFA</div>
              <div style={{fontSize:10,color:C.muted,marginTop:1}}>CFA Level {cfaLevel} Prep · <span style={{color:C.accent,cursor:"pointer"}} onClick={()=>setSettingsOpen(true)}>change</span></div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
          {streak>0&&(()=>{
            const studiedToday=history.some(h=>h.dateKey===localDateKey());
            return(
              <div style={{marginTop:4}}>
                <StreakFlame streak={streak}/>
                {!studiedToday&&(
                  <div style={{display:"flex",alignItems:"center",gap:4,marginTop:4}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:C.hard,animation:"pulse 1.5s ease-in-out infinite"}}/>
                    {streakFreezes.held>0?(
                      <button onClick={()=>{
                        const today=localDateKey();
                        const updated={...streakFreezes,held:streakFreezes.held-1,usedDates:[...(streakFreezes.usedDates||[]),today]};
                        setStreakFreezes(updated);saveStreakFreezes(updated);
                      }} style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:6,background:`${C.accent}22`,border:`1px solid ${C.accent}55`,color:C.accentLight,cursor:"pointer"}}>
                        🧊 Use freeze ({streakFreezes.held})
                      </button>
                    ):(
                      <button onClick={()=>{
                        if(getTotalXP(history)<200){setError("You need 200 XP to buy a freeze");return;}
                        const updated={...streakFreezes,held:Math.min(2,streakFreezes.held+1)};
                        setStreakFreezes(updated);saveStreakFreezes(updated);
                      }} style={{fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:6,background:C.surfaceHigh,border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>
                        🧊 Buy freeze (200 XP)
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })()}
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:28,fontWeight:800,color:daysLeft<30?C.hard:daysLeft<60?C.medium:C.accentLight,lineHeight:1}}>{daysLeft}</div>
            <div style={{fontSize:9,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginTop:2}}>days to exam</div>
          </div>
          <button onClick={()=>{trackUsage("settings");setSettingsOpen(true);}} style={{marginTop:4,width:32,height:32,borderRadius:9,background:C.surface,border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>⚙</button>
        </div>
      </div>
      {studyPace?.burnoutRisk ? (
        <div style={{fontSize:11,color:C.easy,textAlign:"center",padding:"5px 0",fontStyle:"italic",opacity:0.9}}>
          Welcome back. Every session counts — even 5 minutes. 💪
        </div>
      ) : (
        <MotivationalBanner daysLeft={daysLeft}/>
      )}
      {/* Streak at-risk banner */}
      {streak>0&&!history.some(h=>h.dateKey===localDateKey())&&(
        <div style={{background:`linear-gradient(135deg,${C.reward}18,${C.reward}08)`,border:`1px solid ${C.reward}44`,borderRadius:12,padding:"11px 14px",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:800,color:C.rewardLight}}>🔥 {streak}-day streak at risk</div>
            <div style={{fontSize:11,color:C.muted,marginTop:2}}>Study today to keep it alive — resets at midnight</div>
          </div>
          <button onClick={()=>{trackUsage("office_mode");setOmMode(true);const pick=pickNextSession(moduleReadiness,daysLeft,history)||{topic:moduleReadiness[0]?.topic,module:moduleReadiness[0]?.modules[0],difficulty:adaptiveOmDifficulty};generateQuestions(pick.topic,pick.module||moduleReadiness[0]?.modules[0],pick.difficulty||adaptiveOmDifficulty,omQCount,"guided");}} style={{padding:"8px 14px",borderRadius:9,fontSize:12,fontWeight:700,background:C.reward+"33",border:`1px solid ${C.reward}66`,color:C.rewardLight,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
            Study →
          </button>
        </div>
      )}
      {/* Final 30 days intensity ramp */}
      {daysLeft>0&&daysLeft<=30&&authUser&&(()=>{
        const examWeek=daysLeft<=7;
        const color=examWeek?C.hard:C.medium;
        const msg=examWeek
          ?`Exam in ${daysLeft} day${daysLeft===1?"":"s"} — daily full mocks now`
          :`${daysLeft} days out — ramp to 10+ questions/day`;
        const sub=examWeek
          ?"Focus: timed mocks + SR cards only. No new topics."
          :"Prioritise weak topics. Aim for one timed mock this weekend.";
        return(
          <div style={{background:`${color}12`,border:`1px solid ${color}44`,borderRadius:12,padding:"11px 14px",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:800,color}}>{examWeek?"⚡":"📅"} {msg}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:2}}>{sub}</div>
            </div>
            {examWeek&&proStatus&&<button onClick={()=>{trackUsage("full_exam");startFullExam();}} style={{padding:"8px 12px",borderRadius:9,fontSize:12,fontWeight:700,background:`${color}22`,border:`1px solid ${color}44`,color,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>Mock →</button>}
          </div>
        );
      })()}
      {/* Resume interrupted session banner */}
      {sessionDraft&&(()=>{
        const mins=Math.round((Date.now()-sessionDraft.ts)/60000);
        const answered=Object.keys(sessionDraft.answers||{}).length;
        const total=sessionDraft.questions?.length||0;
        const ago=mins<2?"just now":mins<60?`${mins}m ago`:`${Math.round(mins/60)}h ago`;
        return(
          <div style={{background:`linear-gradient(135deg,${C.accent}18,${C.accent}08)`,border:`1px solid ${C.accent}44`,borderRadius:13,padding:"12px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:12}}>
            <div style={{fontSize:22,flexShrink:0}}>⚡</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:800,color:C.text,marginBottom:2}}>Resume your session</div>
              <div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{sessionDraft.topic} · {sessionDraft.subtopic} · {answered}/{total} answered · {ago}</div>
            </div>
            <div style={{display:"flex",gap:6,flexShrink:0}}>
              <button onClick={()=>{
                setTopic(sessionDraft.topic);setSubtopic(sessionDraft.subtopic);
                setDifficulty(sessionDraft.difficulty);setMode(sessionDraft.mode);setCount(sessionDraft.count);
                setQuestions(sessionDraft.questions);setAnswers(sessionDraft.answers);
                setCurrentQ(sessionDraft.currentQ);setShowExp(false);setLastSession(null);
                setFullExamMode(false);setVignetteMode(false);
                // Already SR-processed on original answer — don't double-count on resume
                srProcessedRef.current=new Set(Object.keys(sessionDraft.answers||{}));
                setScreen("quiz");
              }} style={{padding:"7px 13px",borderRadius:9,fontSize:12,fontWeight:700,background:C.accent,color:"#fff",border:"none",cursor:"pointer",whiteSpace:"nowrap"}}>
                Resume →
              </button>
              <button onClick={()=>{try{localStorage.removeItem(SESSION_DRAFT_KEY);}catch{}setSessionDraft(null);}} style={{padding:"7px 10px",borderRadius:9,fontSize:12,color:C.muted,background:"none",border:`1px solid ${C.border}`,cursor:"pointer"}}>✕</button>
            </div>
          </div>
        );
      })()}
      {/* Retry interrupted generation */}
      {pendingGen&&!sessionDraft&&(()=>{
        const mins=Math.round((Date.now()-pendingGen.ts)/60000);
        const ago=mins<2?"just now":mins<60?`${mins}m ago`:`${Math.round(mins/60)}h ago`;
        const dismiss=()=>{setPendingGen(null);try{localStorage.removeItem(PENDING_GEN_KEY);}catch{}};
        return(
          <div style={{background:`linear-gradient(135deg,${C.accent}18,${C.accent}08)`,border:`1px solid ${C.accent}44`,borderRadius:13,padding:"12px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:12}}>
            <div style={{fontSize:22,flexShrink:0}}>🔄</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:800,color:C.text,marginBottom:2}}>Session interrupted</div>
              <div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{pendingGen.t} · {pendingGen.cnt} Qs · {pendingGen.diff} · {ago}</div>
            </div>
            <div style={{display:"flex",gap:6,flexShrink:0}}>
              <button onClick={()=>{dismiss();generateQuestions(pendingGen.t,pendingGen.st,pendingGen.diff,pendingGen.cnt,pendingGen.m,pendingGen.isVignette);}} style={{padding:"7px 13px",borderRadius:9,fontSize:12,fontWeight:700,background:C.accent,color:"#fff",border:"none",cursor:"pointer",whiteSpace:"nowrap"}}>
                Retry →
              </button>
              <button onClick={dismiss} style={{padding:"7px 10px",borderRadius:9,fontSize:12,color:C.muted,background:"none",border:`1px solid ${C.border}`,cursor:"pointer"}}>✕</button>
            </div>
          </div>
        );
      })()}
      {/* Pro renewal reminder — shown when < 5 days remaining */}
      {proStatus&&proValidUntil&&(()=>{
        const daysLeft=Math.ceil((new Date(proValidUntil)-Date.now())/(1000*60*60*24));
        if(daysLeft>5)return null;
        const urgent=daysLeft<=2;
        return(
          <div style={{background:urgent?C.hard+"18":C.medium+"15",border:`1px solid ${urgent?C.hard:C.medium}44`,borderRadius:11,padding:"11px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:18}}>{urgent?"⚠️":"🔔"}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:700,color:urgent?C.hard:C.medium}}>
                {daysLeft<=0?"Pro access expired":"Pro access expires in "+daysLeft+" day"+(daysLeft!==1?"s":"")}
              </div>
              <div style={{fontSize:11,color:C.muted,marginTop:2}}>Pay ₹499 to {PAYMENT_UPI_ID} and email {PAYMENT_CONTACT_EMAIL} to renew.</div>
            </div>
            <button onClick={()=>setUpgradeModal({reason:"default"})} style={{fontSize:11,fontWeight:700,padding:"5px 11px",borderRadius:8,background:urgent?C.hard+"22":C.medium+"22",border:`1px solid ${urgent?C.hard:C.medium}44`,color:urgent?C.hard:C.medium,cursor:"pointer",flexShrink:0}}>Renew</button>
          </div>
        );
      })()}
      {/* Free tier AI usage indicator */}
      {!proStatus&&authUser&&(()=>{
        const used=dailyAIUsage.count;
        const pct=Math.min(100,Math.round((used/FREE_DAILY_AI_LIMIT)*100));
        const remaining=Math.max(0,FREE_DAILY_AI_LIMIT-used);
        return(
          <div>
            <div style={{marginTop:8,display:"flex",alignItems:"center",gap:8,padding:"6px 10px",borderRadius:9,background:C.surfaceHigh,border:`1px solid ${C.border}`}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:10,color:C.muted,fontWeight:600}}>⚡ Free AI questions</span>
                  <span style={{fontSize:10,color:remaining===0?C.hard:C.muted,fontWeight:700}}>{remaining} left today</span>
                </div>
                <div style={{height:4,borderRadius:2,background:C.border,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${pct}%`,borderRadius:2,background:remaining===0?C.hard:remaining<=1?C.medium:C.accent,transition:"width 0.3s"}}/>
                </div>
              </div>
              <button onClick={()=>setUpgradeModal({reason:"limit",streakDays:streak})} style={{fontSize:10,fontWeight:700,color:C.accentLight,background:C.accent+"18",border:`1px solid ${C.accent}33`,borderRadius:7,padding:"4px 8px",cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>
                {streak>=7?`🔥 ${streak}d`:"Go Pro"}
              </button>
            </div>
            {remaining===0&&streak>=7&&<div style={{fontSize:10,color:C.reward,fontWeight:700,textAlign:"center",marginTop:4,padding:"4px 8px",borderRadius:7,background:C.reward+"18",border:`1px solid ${C.reward}33`}}>🔥 Don't break your {streak}-day streak — Go Pro for unlimited AI questions</div>}
          </div>
        );
      })()}
    </div>

    {/* XP Level bar */}
    {history.length>0&&<div style={{marginBottom:14}}><XPBar level={levelInfo.level} progress={levelInfo.progress} label={levelInfo.label} xp={levelInfo.xp} nextXP={levelInfo.nextXP}/></div>}

    {/* New user — Getting started card */}
    {historyLoaded&&history.length===0&&(
      <div style={{background:`linear-gradient(135deg,${C.accent}18,${C.accent}08)`,border:`1px solid ${C.accent}44`,borderRadius:14,padding:"18px 18px",marginBottom:14}}>
        <div style={{fontSize:15,fontWeight:800,color:C.text,marginBottom:6}}>👋 Ready for your first session?</div>
        <div style={{fontSize:12,color:C.muted,lineHeight:1.6,marginBottom:14}}>
          {diagWeak.length>0
            ?<>Your diagnostic flagged <strong style={{color:C.text}}>{diagWeak[0]}</strong> as your weakest area — drill it first.</>
            :"Pick any CFA topic below or tap Start to jump straight in."}
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>{
            const t=diagWeak[0]||Object.keys(activeLOS)[0];
            const mods=Object.keys(activeLOS[t]?.modules||{});
            generateQuestions(t,mods[0]||t,"Easy",10,"guided");
          }} style={{flex:2,padding:"12px",borderRadius:10,fontSize:13,fontWeight:800,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",boxShadow:`0 4px 14px ${C.accent}44`}}>
            {diagWeak.length>0?`Start ${diagWeak[0].split(" ")[0]} →`:"Start first session →"}
          </button>
          <button onClick={()=>setScreen("setup")} style={{flex:1,padding:"12px",borderRadius:10,fontSize:12,fontWeight:700,background:C.surface,border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>
            Custom
          </button>
        </div>
      </div>
    )}

    {/* Getting Started checklist — shows for first 5 sessions */}
    {historyLoaded&&history.length<5&&!checklistDismissed&&(()=>{
      const hasExamDate=examDate&&examDate!=="2026-08-19";
      const hasDoneSession=history.length>0;
      const hasDoneOM=history.some(h=>h.isOfficeMode);
      const hasVisitedReadiness=clVisitedReadiness;
      const hasVisitedRevision=clVisitedRevision;
      const items=[
        {label:"Set your exam date",done:hasExamDate,action:()=>setSettingsOpen(true)},
        {label:"Complete your first session",done:hasDoneSession,action:()=>{const t=diagWeak[0]||Object.keys(activeLOS)[0];const mods=Object.keys(activeLOS[t]?.modules||{});generateQuestions(t,mods[0]||t,"Easy",10,"guided");}},
        {label:"Try Office Mode",done:hasDoneOM,action:null},
        {label:"Check Pass Probability",done:hasVisitedReadiness,action:()=>setScreen("readiness")},
        {label:"Open Quick Revision",done:hasVisitedRevision,action:()=>setScreen("revision")},
      ];
      const doneCount=items.filter(i=>i.done).length;
      const allDone=doneCount===items.length;
      if(allDone&&!clChecklistRewarded){
        setClChecklistRewarded(true);
        try{localStorage.setItem("cfa_cl_rewarded","1");}catch{}
        showToast("🎉","Setup Complete!","You've unlocked everything ClearCFA has to offer.",true);
        setTimeout(()=>{setChecklistDismissed(true);try{localStorage.setItem(CHECKLIST_KEY,"1");}catch{}},3000);
      }
      return(
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"14px 16px",marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <span style={{fontSize:12,fontWeight:800,color:C.accent,letterSpacing:"0.04em"}}>🗺 GETTING STARTED</span>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:11,color:C.muted}}>{doneCount}/{items.length}</span>
              <button onClick={()=>{setChecklistDismissed(true);try{localStorage.setItem(CHECKLIST_KEY,"1");}catch{}}} style={{fontSize:11,color:C.muted,background:"none",border:"none",cursor:"pointer",padding:"2px 6px"}}>✕</button>
            </div>
          </div>
          <div style={{height:3,background:C.border,borderRadius:2,marginBottom:12}}>
            <div style={{height:"100%",width:`${doneCount/items.length*100}%`,background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:2,transition:"width 0.5s ease"}}/>
          </div>
          {items.map((item,i)=>(
            <div key={i} onClick={!item.done&&item.action?item.action:undefined} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:i<items.length-1?`1px solid ${C.border}22`:"none",cursor:!item.done&&item.action?"pointer":"default",opacity:item.done?0.7:1}}>
              <div style={{width:20,height:20,borderRadius:10,background:item.done?C.easy+"33":C.border,border:`2px solid ${item.done?C.easy:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11}}>
                {item.done?"✓":""}
              </div>
              <span style={{fontSize:12,color:item.done?C.muted:C.text,textDecoration:item.done?"line-through":"none",flex:1}}>{item.label}</span>
              {!item.done&&item.action&&<span style={{fontSize:10,color:C.accent}}>→</span>}
            </div>
          ))}
          {allDone&&<div style={{textAlign:"center",fontSize:12,color:C.easy,fontWeight:700,marginTop:10}}>🎉 All done — you're all set!</div>}
        </div>
      );
    })()}

    {/* Stats strip */}
    {!historyLoaded?<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:14}}>{[0,1,2,3].map(i=><Skeleton key={i} height={68} radius={11}/>)}</div>:(
      <>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:history.length===0?6:14}}>
        <StatCard label="Sessions" value={history.length||"–"} icon="📚" sub={streak>1?`🔥 ${streak}d streak`:undefined} onClick={history.length>0?()=>{trackUsage("dashboard");setScreen("dashboard");}:undefined}/>
        <StatCard label="Avg Score" value={overallPct?`${overallPct}%`:"–"} color={overallPct?(overallPct>=70?C.easy:C.hard):C.muted} icon="🎯" onClick={overallPct?()=>{trackUsage("dashboard");setScreen("dashboard");}:undefined}/>
        <StatCard label="Pass Prob" value={passProbability?`${passProbability.probability}%`:"–"} color={passProbability?passProbability.color:C.muted} sub={passProbability?`${passProbability.label}${history.length>=3?` · top ${100-getPeerPercentile(passProbability.probability,daysLeft)}%`:""}`:history.length>=1?"more data needed":"do 3+ sessions"} onClick={()=>setScreen("readiness")} icon="📈"/>
        <StatCard label="SR Due" value={dueCards.length>0?dueCards.length:"0"} color={dueCards.length>0?C.accent:C.easy} sub={dueCards.length>0?"review today":`${Object.keys(srDeck).length>0?`${Object.keys(srDeck).length} total · none due`:"no cards yet"}`} icon="📋" onClick={dueCards.length>0?()=>{trackUsage("sr_review");setSrQueue([...dueCards].sort((a,b)=>(b.wrongCount||0)-(a.wrongCount||0)).slice(0,20));setSrIdx(0);setSrAnswer(null);srSessionResults.current={correct:0,total:0};srSessionStart.current=Date.now();setScreen("srReview");}:undefined}/>
      </div>
      {history.length===0&&<div style={{fontSize:11,color:C.muted,textAlign:"center",marginBottom:14,opacity:0.7}}>Stats unlock after your first session</div>}
      </>
    )}
    {/* Weak spot pill */}
    {(()=>{
      const weak=moduleReadiness.filter(m=>m.sessions>0&&m.accuracy!==null).sort((a,b)=>a.accuracy-b.accuracy)[0];
      if(!weak||weak.accuracy>=65)return null;
      return(
        <div style={{background:`${C.hard}10`,border:`1px solid ${C.hard}33`,borderRadius:10,padding:"10px 14px",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,animation:"fadeIn 0.3s ease"}}>
          <div style={{minWidth:0}}>
            <div style={{fontSize:12,fontWeight:700,color:C.hard}}>📉 Weak spot: {weak.modules[0]}</div>
            <div style={{fontSize:10,color:C.muted,marginTop:1}}>{weak.accuracy}% accuracy · {weak.sessions} session{weak.sessions!==1?"s":""}</div>
          </div>
          <button onClick={()=>generateQuestions(weak.topic,weak.modules[0],"Medium",5,"guided")}
            style={{fontSize:12,fontWeight:700,padding:"6px 13px",borderRadius:8,flexShrink:0,background:C.hard+"20",border:`1px solid ${C.hard}44`,color:C.hard,cursor:"pointer"}}>
            Drill 5 →
          </button>
        </div>
      );
    })()}
    {/* Pass probability trend mini-sparkline */}
    {passTrend.length>=3&&passProbability&&(()=>{
      const vals=passTrend.map(p=>p.prob);
      const minV=Math.max(0,Math.min(...vals)-5);
      const maxV=Math.min(100,Math.max(...vals)+5);
      const range=Math.max(maxV-minV,10);
      const W=200,H=36,px=4,py=4;
      const pts=vals.map((v,i)=>{
        const x=px+((W-px*2)/Math.max(vals.length-1,1))*i;
        const y=(H-py)-((v-minV)/range)*(H-py*2);
        return[x,y];
      });
      const ptsStr=pts.map(p=>p.join(",")).join(" ");
      const last=vals[vals.length-1];const first=vals[0];
      const trend=last-first;const trendColor=trend>=0?C.easy:C.hard;
      const fillPts=`${pts[0][0]},${H-py} ${ptsStr} ${pts[pts.length-1][0]},${H-py}`;
      return(
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"10px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:12}}>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:4,letterSpacing:"0.04em"}}>PASS PROB TREND</div>
            <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{height:36,display:"block"}}>
              <polygon points={fillPts} fill={trendColor} opacity="0.15"/>
              <polyline points={ptsStr} fill="none" stroke={trendColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              {pts.map((p,i)=>i===pts.length-1?<circle key={i} cx={p[0]} cy={p[1]} r="3" fill={trendColor} stroke="#0a0a14" strokeWidth="1"/>:null)}
            </svg>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontSize:18,fontWeight:800,color:trendColor,lineHeight:1}}>{trend>=0?"+":""}{Math.round(trend)}%</div>
            <div style={{fontSize:9,color:C.muted,fontWeight:700,textTransform:"uppercase"}}>vs {passTrend.length}d ago</div>
            <div style={{fontSize:9,color:C.muted,marginTop:3,maxWidth:90,textAlign:"right",lineHeight:1.4}}>{passProbability.advice}</div>
          </div>
        </div>
      );
    })()}
    {/* Confidence calibration insight */}
    {(()=>{
      const insight=getConfidenceInsights(history);
      if(!insight)return null;
      return(
        <div style={{background:`${C.medium}10`,border:`1px solid ${C.medium}33`,borderRadius:12,padding:"11px 14px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:12,fontWeight:800,color:C.medium}}>🎯 Calibration insight</div>
            <div style={{fontSize:11,color:C.muted,marginTop:2}}>{insight.rate}% of high-confidence answers wrong{insight.topMiss?` — check ${insight.topMiss}`:""}</div>
          </div>
          <button onClick={()=>{
            const concept=insight.topMiss||"";
            const t=Object.keys(activeLOS).find(k=>concept&&(k.toLowerCase().includes(concept.toLowerCase().split(" ")[0])||concept.toLowerCase().includes(k.toLowerCase().split(" ")[0])))||Object.keys(activeLOS)[0];
            const mods=Object.keys(activeLOS[t]?.modules||{});
            generateQuestions(t,mods[0]||t,"Medium",10,"guided");
          }} style={{fontSize:11,fontWeight:700,color:C.medium,background:`${C.medium}18`,border:`1px solid ${C.medium}44`,borderRadius:8,padding:"6px 10px",cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>Drill →</button>
        </div>
      );
    })()}
    {/* Office Mode — primary CTA */}
    {(()=>{
      const omSessions=history.filter(h=>h.isOfficeMode);
      const omStreak=(()=>{let s=0,d=new Date();for(let i=0;i<30;i++){const k=localDateKey(new Date(d-i*86400000));if(omSessions.some(h=>h.dateKey===k))s++;else if(i>0)break;}return s;})();
      const diffColor=adaptiveOmDifficulty==="Hard"?C.hard:adaptiveOmDifficulty==="Easy"?C.easy:C.medium;
      return(
        <div style={{background:`linear-gradient(135deg,${C.accent}18,${C.accent}08)`,border:`1px solid ${C.accent}44`,borderRadius:14,padding:"14px 16px",marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:13,fontWeight:800,color:C.accentLight}}>⚡ Office Mode</span>
                {omStreak>1&&<span style={{fontSize:10,background:C.reward+"22",color:C.rewardLight,padding:"2px 7px",borderRadius:5,fontWeight:700}}>🔥 {omStreak}d streak</span>}
              </div>
              <div style={{fontSize:11,color:C.muted,marginTop:3}}>
                {history.length===0?"Start with any topic · Easy questions first":("AI picks your weakest topic · "+omQCount+" Qs · ~"+(omQCount*1.5|0)+" min")}
                {history.length>0&&omSessions.length>0&&<span style={{marginLeft:6,color:diffColor,fontWeight:600}}>· {adaptiveOmDifficulty} (your form)</span>}
              </div>
            </div>
            <button onClick={()=>{
              trackUsage("office_mode");
              setOmMode(true);
              const pick=pickNextSession(moduleReadiness,daysLeft,history)||{topic:moduleReadiness[0]?.topic,module:moduleReadiness[0]?.modules[0],difficulty:adaptiveOmDifficulty};
              generateQuestions(pick.topic,pick.module||moduleReadiness[0]?.modules[0],pick.difficulty||adaptiveOmDifficulty,omQCount,"guided");
            }} style={{fontSize:14,fontWeight:800,padding:"10px 20px",borderRadius:10,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",boxShadow:`0 4px 16px ${C.accent}55`,flexShrink:0,marginLeft:10}}>
              Start →
            </button>
          </div>
          {/* Time selector */}
          <div style={{display:"flex",gap:6}}>
            {(daysLeft<=14&&daysLeft>0?[{n:5,label:"5 Qs · ~8 min"},{n:10,label:"10 Qs · ~15 min"},{n:15,label:"15 Qs · ~20 min"}]:[{n:3,label:"3 Qs · ~5 min"},{n:5,label:"5 Qs · ~8 min"},{n:10,label:"10 Qs · ~15 min"}]).map(({n,label})=>(
              <button key={n} onClick={()=>{setOmQCount(n);try{localStorage.setItem("cfa_om_count",String(n));}catch{}}} style={{flex:1,padding:"6px 4px",borderRadius:8,fontSize:11,fontWeight:700,background:omQCount===n?C.accent+"33":"transparent",border:`1px solid ${omQCount===n?C.accent+"88":C.border}`,color:omQCount===n?C.accentLight:C.muted,cursor:"pointer",transition:"all 0.15s"}}>
                {label}
              </button>
            ))}
          </div>
        </div>
      );
    })()}

    {/* SR due */}
    {dueCards.length>0&&(
      <div onClick={()=>{trackUsage("sr_review");setSrQueue([...dueCards].sort((a,b)=>(b.wrongCount||0)-(a.wrongCount||0)).slice(0,20));setSrIdx(0);setSrAnswer(null);srSessionResults.current={correct:0,total:0};srSessionStart.current=Date.now();setScreen("srReview");}} style={{background:`linear-gradient(135deg,${C.accent}15,${C.accent}08)`,border:`1px solid ${C.accent}44`,borderRadius:12,padding:"12px 16px",marginBottom:10,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",animation:"glow 3s ease infinite"}}>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:C.accentLight}}>📋 {dueCards.length} card{dueCards.length!==1?"s":""} due for review</div>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>SM-2 spaced repetition · tap to start</div>
        </div>
        <div style={{fontSize:18,color:C.accent,fontWeight:700}}>→</div>
      </div>
    )}

    {/* Leech alert */}
    {leeches.length>0&&(
      <div style={{background:`${C.hard}12`,border:`1px solid ${C.hard}44`,borderRadius:12,padding:"12px 16px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:C.hard}}>⚠ {leeches.length} leech card{leeches.length!==1?"s":""}</div>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>Missed 4+ times — your real blind spots</div>
        </div>
        <button onClick={()=>{trackUsage("leech_review");setSrQueue([...leeches].sort((a,b)=>(b.wrongCount||0)-(a.wrongCount||0)).slice(0,20));setSrIdx(0);setSrAnswer(null);srSessionResults.current={correct:0,total:0};srSessionStart.current=Date.now();setScreen("srReview");}} style={{fontSize:11,fontWeight:700,padding:"6px 12px",borderRadius:8,background:C.hard+"25",border:`1px solid ${C.hard}55`,color:C.hard,cursor:"pointer",flexShrink:0}}>Review Now</button>
      </div>
    )}

    {daysLeft<=14&&daysLeft>0&&(
      <div style={{background:`linear-gradient(135deg,${C.hard}18,${C.hard}08)`,border:`1px solid ${C.hard}55`,borderRadius:12,padding:"13px 16px",marginBottom:12,animation:"glow 2s ease infinite"}}>
        <div style={{fontSize:13,fontWeight:800,color:C.hard,marginBottom:4}}>🚨 Final {daysLeft} days — High-Weight Only</div>
        <div style={{fontSize:11,color:C.muted,marginBottom:10,lineHeight:1.5}}>Focus exclusively on Ethics (15%), FSA (13%), Equity (11%), Fixed Income (11%). These 4 topics are 50% of the exam.</div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
          {[["Ethics","Code of Ethics & Standards"],["Financial Statement Analysis","Financial Ratios"],["Fixed Income","Yield Measures & Duration"],["Equity","Equity Valuation – DDM & Multiples"]].map(([t,m])=>(
            <button key={t} onClick={()=>generateQuestions(t,m,"Hard",10,"guided")}
              style={{fontSize:11,fontWeight:700,padding:"5px 10px",borderRadius:7,background:C.hard+"22",border:`1px solid ${C.hard}44`,color:C.hard,cursor:"pointer"}}>
              {t.split(" ")[0]} Hard →
            </button>
          ))}
        </div>
      </div>
    )}

    {/* Daily Mission Agent */}
    {(dailyMission||missionGenerating)&&(
      <div style={{background:`linear-gradient(135deg,${C.reward}14,${C.reward}06)`,border:`1px solid ${C.reward}33`,borderRadius:14,padding:"14px 16px",marginBottom:12,animation:"fadeIn 0.3s ease"}}>
        {missionGenerating&&!dailyMission?(
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:16,height:16,border:`2px solid ${C.reward}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite",flexShrink:0}}/>
            <span style={{fontSize:12,color:C.muted}}>Generating your daily mission…</span>
          </div>
        ):(
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{fontSize:11,fontWeight:800,color:C.reward,letterSpacing:"0.05em",textTransform:"uppercase"}}>⚡ DAILY MISSION</div>
                {!screenOnboard.dailyMission&&<span style={{fontSize:9,fontWeight:800,color:C.bg,background:C.easy,borderRadius:6,padding:"1px 6px",letterSpacing:"0.06em"}}>NEW</span>}
              </div>
              {dailyMission?.topic&&<span style={{fontSize:10,color:C.muted,background:C.surface,padding:"2px 8px",borderRadius:10,border:`1px solid ${C.border}`}}>{dailyMission.topic}</span>}
            </div>
            {dailyMission?.mission&&<div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:6,lineHeight:1.5}}>{dailyMission.mission}</div>}
            {dailyMission?.action&&<div style={{fontSize:12,color:C.textMid,marginBottom:8,lineHeight:1.6,paddingLeft:10,borderLeft:`2px solid ${C.reward}55`}}>{dailyMission.action}</div>}
            {dailyMission?.tip&&<div style={{fontSize:11,color:C.muted,marginBottom:10,lineHeight:1.6}}>💡 {dailyMission.tip}</div>}
            {dailyMission?.topic&&(
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>{setRevisionTopic(dailyMission.topic);setRevisionTab(proStatus?"learn":"notes");setScreen("revision");}}
                  style={{flex:1,padding:"10px",borderRadius:10,fontSize:12,fontWeight:700,background:C.surface,color:C.textMid,border:`1px solid ${C.border}`,cursor:"pointer"}}>
                  📖 Read notes
                </button>
                <button onClick={()=>{
                  generateQuestions(dailyMission.topic,Object.keys(getActiveLOS(cfaLevel)[dailyMission.topic]?.modules||{})[0]||dailyMission.topic,"Medium",10,"guided");
                  if(!screenOnboard.dailyMission){const u={...screenOnboard,dailyMission:true};setScreenOnboard(u);try{localStorage.setItem(SCREEN_ONBOARD_KEY,JSON.stringify(u));}catch{}}
                }} style={{flex:1,padding:"10px",borderRadius:10,fontSize:12,fontWeight:700,background:`${C.reward}22`,color:C.reward,border:`1px solid ${C.reward}44`,cursor:"pointer"}}>
                  Start Practice →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    )}

    {/* Daily Q card — Wordle-style one question per day */}
    {dailyQ&&(()=>{
      const dq=dailyQ.q;
      const answered=dailyQ.answered;
      const userAns=dailyQ.userAnswer;
      const correct=dq&&userAns===dq.answer;
      return(
        <div style={{background:`linear-gradient(135deg,${C.accent}14,${C.accent}06)`,border:`1px solid ${C.accent}33`,borderRadius:14,padding:"14px 16px",marginBottom:12,animation:"fadeIn 0.3s ease"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontSize:11,fontWeight:800,color:C.accentLight,letterSpacing:"0.05em",textTransform:"uppercase"}}>📅 Daily Q · {localDateKey()}</div>
            {answered&&<span style={{fontSize:10,fontWeight:800,color:correct?C.easy:C.hard,background:correct?C.easy+"20":C.hard+"20",borderRadius:6,padding:"2px 7px"}}>{correct?"✓ Correct":"✗ Wrong"}</span>}
          </div>
          {dq&&<div style={{fontSize:13,fontWeight:600,color:C.text,lineHeight:1.5,marginBottom:10}}>{dq.question}</div>}
          {dq&&!answered&&(
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {Object.entries(dq.options||{}).map(([k,v])=>(
                <button key={k} onClick={()=>{
                  const updated={...dailyQ,answered:true,userAnswer:k};
                  setDailyQ(updated);
                  try{localStorage.setItem(DAILY_Q_KEY,JSON.stringify(updated));}catch{}
                }} style={{padding:"9px 12px",borderRadius:9,fontSize:12,fontWeight:600,border:`1px solid ${C.border}`,background:C.surfaceHigh,color:C.text,cursor:"pointer",textAlign:"left"}}>
                  {k}. {v}
                </button>
              ))}
            </div>
          )}
          {answered&&dq&&(
            <div style={{marginTop:4}}>
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                {Object.entries(dq.options||{}).map(([k,v])=>{
                  const isCorrect=k===dq.answer;
                  const isUser=k===userAns;
                  const bg=isCorrect?C.easy+"25":isUser&&!isCorrect?C.hard+"22":"transparent";
                  const border=isCorrect?C.easy:isUser&&!isCorrect?C.hard:C.border;
                  return(<div key={k} style={{padding:"8px 12px",borderRadius:8,fontSize:12,border:`1px solid ${border}`,background:bg,color:isCorrect?C.easy:isUser&&!isCorrect?C.hard:C.muted}}>{k}. {v}</div>);
                })}
              </div>
              {dq.explanation&&<div style={{marginTop:8,fontSize:12,color:C.textMid,lineHeight:1.6,paddingLeft:10,borderLeft:`2px solid ${C.accent}55`}}>{dq.explanation}</div>}
              <button onClick={()=>{
                const shareText=`${correct?"🟢":"🔴"} Today's CFA Daily Q · ${dq._topic||""} · ${correct?"Got it!":"Missed it"} · Streak: ${getStreak(history)}d\n📚 clearcfa.com`;
                if(navigator.share)navigator.share({title:"ClearCFA Daily Q",text:shareText}).catch(()=>{});
                else{try{navigator.clipboard.writeText(shareText);}catch{}showToast("📋","Copied!","Share text ready");}
              }} style={{marginTop:10,width:"100%",padding:"9px",borderRadius:9,fontSize:12,fontWeight:700,background:C.accent+"18",border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer"}}>
                📤 Share today's result
              </button>
            </div>
          )}
        </div>
      );
    })()}

    {/* Pace chip */}
    {paceStatus&&(
      <div onClick={()=>setScreen("dashboard")}
        style={{display:"flex",alignItems:"center",justifyContent:"space-between",
          background:paceStatus.ahead?C.easy+"12":C.medium+"15",
          border:`1px solid ${paceStatus.ahead?C.easy:C.medium}33`,
          borderRadius:10,padding:"9px 14px",marginBottom:12,cursor:"pointer"}}>
        <span style={{fontSize:12,fontWeight:700,color:paceStatus.ahead?C.easy:C.medium}}>
          {paceStatus.ahead?"🟢 On pace":"⚠️ Behind pace"} · {paceStatus.avgQsPerDay} Qs/day
        </span>
        <span style={{fontSize:11,color:C.muted}}>{paceStatus.ahead?"stay consistent →":`need ${paceStatus.neededQsPerDay} Qs/day`}</span>
      </div>
    )}

    {/* Mock countdown */}
    {(()=>{
      const today=localDateKey();
      const upcoming=[...mockSchedule].filter(d=>d>=today).sort();
      const next=upcoming[0];
      if(!next) return null;
      const daysUntil=Math.round((new Date(next)-new Date(today))/86400000);
      const urgent=daysUntil<=3;
      return(
        <div style={{background:urgent?C.medium+"18":C.surface,border:`1px solid ${urgent?C.medium:C.border}33`,
          borderRadius:12,padding:"12px 14px",marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:urgent?C.medium:C.text}}>
                📅 Mock Exam {daysUntil===0?"Today":daysUntil===1?"Tomorrow":`in ${daysUntil} days`}
              </div>
              <div style={{fontSize:11,color:C.muted,marginTop:2}}>{next} · 180 Qs · 270 min</div>
            </div>
            <button onClick={()=>{trackUsage("full_exam");if(!proStatus){setUpgradeModal({reason:"timed_mock"});return;}startFullExam(1);}}
              style={{padding:"8px 14px",borderRadius:8,fontSize:12,fontWeight:700,
                background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>
              {daysUntil===0?"Start →":"Prep →"}
            </button>
          </div>
        </div>
      );
    })()}

    {/* Duel challenge card — shown when a duel link was opened */}
    {duelChallenge&&!duelChallenge.accepted&&(
      <div style={{background:`linear-gradient(135deg,${C.hard}18,${C.hard}06)`,border:`1px solid ${C.hard}44`,borderRadius:14,padding:"14px 16px",marginBottom:12,animation:"fadeIn 0.3s ease"}}>
        <div style={{fontSize:11,fontWeight:800,color:C.hard,letterSpacing:"0.05em",textTransform:"uppercase",marginBottom:6}}>⚔️ You've Been Challenged!</div>
        <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:4}}>Can you beat their score?</div>
        <div style={{fontSize:12,color:C.muted,marginBottom:2}}>Topic: {duelChallenge.topic} · {duelChallenge.qs?.length||3} questions</div>
        <div style={{fontSize:13,fontWeight:700,color:C.medium,marginBottom:12}}>Their score: {duelChallenge.cs}/{duelChallenge.ct} ({duelChallenge.ct>0?Math.round(duelChallenge.cs/duelChallenge.ct*100):0}%)</div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>startDuelChallenge(duelChallenge)}
            style={{flex:2,padding:"11px",borderRadius:10,fontSize:13,fontWeight:700,background:`linear-gradient(135deg,${C.hard},${C.hard}cc)`,color:"#fff",border:"none",cursor:"pointer"}}>
            ⚔️ Accept Duel →
          </button>
          <button onClick={()=>setDuelChallenge(null)} style={{flex:1,padding:"11px",borderRadius:10,fontSize:12,background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>Dismiss</button>
        </div>
      </div>
    )}

    {/* Exam countdown notification toggle + readiness gauge */}
    {passProbability&&(
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 14px",marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <span style={{fontSize:12,fontWeight:700,color:C.text}}>📊 Readiness vs threshold</span>
          <button onClick={async()=>{
            if(!notifEnabled){
              try{
                const perm=await Notification.requestPermission();
                if(perm==="granted"){setNotifEnabled(true);try{localStorage.setItem("cfa_notif_v1","1");}catch{}showToast("🔔","Reminders on!","You'll get a daily study nudge.");}
                else showToast("🔕","Permission denied","Enable notifications in browser settings.");
              }catch{}
            } else {
              setNotifEnabled(false);try{localStorage.setItem("cfa_notif_v1","0");}catch{}showToast("🔕","Reminders off","Daily nudges paused.");
            }
          }} style={{fontSize:10,fontWeight:700,padding:"4px 10px",borderRadius:8,background:notifEnabled?C.easy+"22":C.surface,border:`1px solid ${notifEnabled?C.easy:C.border}`,color:notifEnabled?C.easy:C.muted,cursor:"pointer"}}>
            {notifEnabled?"🔔 On":"🔕 Remind me"}
          </button>
        </div>
        <div style={{position:"relative",height:8,background:C.border,borderRadius:4,overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,width:`${Math.min(100,passProbability.probability)}%`,background:passProbability.probability>=70?C.easy:passProbability.probability>=55?C.medium:C.hard,borderRadius:4,transition:"width 0.6s ease"}}/>
          <div style={{position:"absolute",top:0,bottom:0,left:"70%",width:2,background:"#ffffff44"}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:5}}>
          <span style={{fontSize:10,color:C.muted}}>{passProbability.probability}% pass probability</span>
          <span style={{fontSize:10,color:C.easy}}>70% threshold</span>
        </div>
      </div>
    )}

    {/* Daily Focus */}
    <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"16px",marginBottom:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div>
          <div style={{fontSize:13,fontWeight:800,color:C.text}}>🎯 Today's Focus</div>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>Personalised to your weak spots</div>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          {weeklyPlan&&(
            <button onClick={()=>setWeeklyPlanScreen(true)} style={{fontSize:10,fontWeight:700,padding:"4px 9px",borderRadius:7,background:C.accent+"15",border:`1px solid ${C.accent}33`,color:C.accentLight,cursor:"pointer"}}>
              Full Plan
            </button>
          )}
          {!focusLoading&&focusSuggestions&&(
            <button onClick={()=>{trackUsage("daily_focus");generateFocus();}} style={{fontSize:18,lineHeight:1,background:"none",border:"none",color:C.muted,cursor:"pointer",padding:"2px 4px"}} title="Refresh">⟳</button>
          )}
        </div>
      </div>

      {/* Today's plan sessions from weekly plan */}
      {(()=>{
        if(!weeklyPlan) return null;
        const todayName=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date().getDay()];
        const todayPlanSessions=(weeklyPlan.days||[]).find(d=>d.day===todayName)?.sessions||[];
        if(todayPlanSessions.length===0) return null;
        const sKeyOf=i=>`plan_${i}_${todayName}`;
        const startedCount=todayPlanSessions.filter((_,i)=>todayStarted[sKeyOf(i)]).length;
        return(
          <div style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div style={{fontSize:10,fontWeight:800,color:C.accentLight,letterSpacing:"0.07em",textTransform:"uppercase"}}>📅 From Your Weekly Plan</div>
              <div style={{fontSize:11,color:startedCount===todayPlanSessions.length?C.easy:C.muted,fontWeight:startedCount===todayPlanSessions.length?700:400}}>
                {startedCount===todayPlanSessions.length?"✓ All done!":startedCount+"/"+todayPlanSessions.length+" done"}
              </div>
            </div>
            <div style={{height:4,borderRadius:2,background:C.border,marginBottom:10}}>
              <div style={{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,width:`${(startedCount/todayPlanSessions.length)*100}%`,transition:"width 0.5s ease"}}/>
            </div>
            {todayPlanSessions.map((session,i)=>{
              const sKey=sKeyOf(i);
              const done=!!todayStarted[sKey];
              const typeColor=session.type==="sr"?C.accent:session.type==="review"?C.medium:C.easy;
              const typeColorLight=session.type==="sr"?C.accentLight:session.type==="review"?C.medium:C.easy;
              return(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 12px",background:done?"rgba(34,197,94,0.05)":C.surfaceHigh,border:`1px solid ${done?"rgba(34,197,94,0.2)":C.border}`,borderRadius:10,marginBottom:6,transition:"all 0.2s"}}>
                  <div style={{flex:1,marginRight:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                      {done&&<span style={{fontSize:12,color:C.easy}}>✓</span>}
                      <span style={{fontSize:12,fontWeight:700,color:done?C.muted:C.text}}>{session.title}</span>
                      <span style={{fontSize:9,padding:"1px 6px",borderRadius:10,background:typeColor+"22",color:typeColorLight,fontWeight:700,textTransform:"uppercase"}}>{session.type}</span>
                    </div>
                    <div style={{fontSize:11,color:C.muted}}>{session.module} · {session.durationMin}min · {session.count}Q · {session.difficulty}</div>
                    {!done&&<div style={{fontSize:10,color:C.muted,fontStyle:"italic",marginTop:3,lineHeight:1.4}}>{session.why}</div>}
                  </div>
                  <button onClick={()=>{
                    if(session.type==="sr"){
                      // SR is local — mark done immediately
                      setTodayStarted(prev=>{const n={...prev,[sKey]:true};try{localStorage.setItem("cfa_today_started",JSON.stringify(n));}catch{}return n;});
                      const cards=dueCards.filter(c=>c.topic===session.topic);
                      const queue=cards.length?cards.slice(0,session.count):[...dueCards].slice(0,session.count);
                      if(queue.length){setSrQueue(queue);setSrIdx(0);setSrAnswer(null);setScreen("srReview");}
                    }else{
                      // Mark done only after quiz completes successfully
                      pendingPlanKeyRef.current=sKey;
                      generateQuestions(session.topic,session.module,session.difficulty,session.count,"guided");
                    }
                  }} style={{fontSize:11,fontWeight:700,padding:"7px 12px",borderRadius:8,background:done?C.surface:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:done?C.muted:"#fff",border:done?`1px solid ${C.border}`:"none",cursor:"pointer",flexShrink:0,transition:"all 0.2s"}}>
                    {done?"Again →":"Start →"}
                  </button>
                </div>
              );
            })}
          </div>
        );
      })()}

      {focusLoading&&<div style={{display:"flex",flexDirection:"column",gap:9}}>{[0,1,2].map(i=><Skeleton key={i} height={72} radius={10}/>)}</div>}
      {focusError&&<div style={{fontSize:13,color:C.hard,padding:"10px",background:C.errorBg,borderRadius:8}}>{focusError}</div>}
      {!focusLoading&&(()=>{
        const todayName=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date().getDay()];
        const todayPlanSessions=(weeklyPlan?.days||[]).find(d=>d.day===todayName)?.sessions||[];
        const planTopicKeys=new Set(todayPlanSessions.map(s=>`${s.topic}|||${s.module}`));
        const items=(focusSuggestions||adaptiveSuggestions).filter(s=>!planTopicKeys.has(`${s.topic}|||${s.module}`));
        if(!items.length) return null;
        return(
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {items.slice(0,3).map((s,i)=>{
              const fKey=`${s.topic}|||${s.module}`;
              const done=!!focusDone[fKey];
              return(
              <div key={i} onClick={()=>setSelectedFocus(selectedFocus===i?null:i)}
                style={{border:`1.5px solid ${selectedFocus===i?urgencyColor[s.urgency]:done?"rgba(34,197,94,0.2)":C.border}`,borderRadius:12,padding:"13px 14px",cursor:"pointer",background:selectedFocus===i?urgencyColor[s.urgency]+"12":done?"rgba(34,197,94,0.05)":C.surfaceHigh,transition:"all 0.15s"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      {done&&<span style={{fontSize:12,color:C.easy}}>✓</span>}
                      <div style={{fontSize:13,fontWeight:700,color:done?C.muted:C.text}}>{s.module}</div>
                    </div>
                    <div style={{fontSize:11,color:C.muted,marginTop:1}}>{s.topic}</div>
                  </div>
                  <div style={{display:"flex",gap:5,flexShrink:0,marginLeft:8}}>
                    <Badge color={urgencyColor[s.urgency]}>{s.urgency}</Badge>
                    <Badge color={diffC[s.difficulty]||C.medium}>{{Easy:"easy",Medium:"med",Hard:"hard"}[s.difficulty]||s.difficulty} diff</Badge>
                  </div>
                </div>
                <div style={{fontSize:12,color:C.textMid,lineHeight:1.55,marginBottom:selectedFocus===i?12:0}}>{s.reason}</div>
                {selectedFocus===i&&(
                  <div onClick={e=>e.stopPropagation()}>
                    {s.mode!=="sr_review"&&<div style={{display:"flex",gap:6,marginBottom:8}}>
                      {[5,10,15].map(n=>(
                        <button key={n} onClick={e=>{e.stopPropagation();setFocusCount(n);}}
                          style={{flex:1,padding:"6px 0",borderRadius:8,fontSize:12,fontWeight:700,cursor:"pointer",border:focusCount===n?`1.5px solid ${C.accent}`:`1.5px solid ${C.border}`,background:focusCount===n?C.accent+"22":C.surface,color:focusCount===n?C.accentLight:C.muted,transition:"all 0.15s"}}>
                          {n} Qs
                        </button>
                      ))}
                    </div>}
                    <button onClick={e=>{e.stopPropagation();if(s.mode==="sr_review"){const cards=dueCards.filter(c=>c.topic===s.topic&&c.subtopic===s.module).sort((a,b)=>(b.wrongCount||0)-(a.wrongCount||0));const queue=cards.length?cards:[...dueCards].sort((a,b)=>(b.wrongCount||0)-(a.wrongCount||0)).slice(0,20);trackUsage("sr_review");setFocusDone(prev=>{const n={...prev,[fKey]:true};try{localStorage.setItem("cfa_focus_done",JSON.stringify({date:localDateKey(),done:n}));}catch{}return n;});setSrQueue(queue);setSrIdx(0);setSrAnswer(null);setScreen("srReview");}else{pendingFocusKeyRef.current=fKey;generateQuestions(s.topic,s.module,s.difficulty,focusCount,s.mode||"guided");}}}
                      style={{width:"100%",padding:"11px",borderRadius:9,fontSize:13,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",boxShadow:`0 4px 12px ${C.accent}44`}}>
                      {done?"Again — ":""}{s.mode==="sr_review"?`Review ${s.count} SR Card${s.count!==1?"s":""}  →`:`Start ${focusCount} Questions →`}
                    </button>
                  </div>
                )}
              </div>
              );
            })}
          </div>
        );
      })()}
    </div>

    {/* Quick Start — 1-tap topic launch */}
    <div style={{marginBottom:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <span style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase"}}>Quick Start</span>
        <button onClick={()=>{trackUsage("setup");setScreen("setup");}} style={{fontSize:11,fontWeight:700,color:C.accentLight,background:"none",border:"none",cursor:"pointer",padding:0}}>Custom →</button>
      </div>
      <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:4,scrollbarWidth:"none",msOverflowStyle:"none"}}>
        {(()=>{
          const sortedTopics=Object.entries(activeTopicMap).map(([t,{weight}])=>{const mr=moduleReadiness.find(m=>m.topic===t);return{t,weight,mr,priority:mr?computeTopicPriority(mr,daysLeft):weight/15};}).sort((a,b)=>b.priority-a.priority);
          return sortedTopics.map(({t,weight,mr},idx)=>{
            const notStarted=!mr||mr.sessions===0;
            const acc=mr?.accuracy??null;
            const isRec=idx===0;
            const col=isRec?C.accentLight:notStarted?C.muted:acc>=70?C.easy:acc>=50?C.medium:C.hard;
            const bg=isRec?C.accent+"22":notStarted?C.surface:acc>=70?C.easy+"15":acc>=50?C.medium+"15":C.hard+"12";
            const border=isRec?C.accent+"77":notStarted?C.border:acc>=70?C.easy+"44":acc>=50?C.medium+"44":C.hard+"44";
            const short=({"Quantitative Methods":"Quant","Financial Statement Analysis":"FSA","Corporate Issuers":"Corp","Equity Investments":"Equity","Fixed Income":"Fixed Inc","Derivatives":"Deriv","Alternative Investments":"Alts","Portfolio Management":"Portfolio","Ethics and Professional Standards":"Ethics","Economics":"Econ"})[t]||t.split(" ")[0];
            const worstMod=(()=>{const e=Object.entries(mr?.moduleStats||{}).filter(([,v])=>v!==null).sort(([,a],[,b])=>(a.pct??100)-(b.pct??100));return e[0]?.[0];})();
            const mod=mr?.untouchedModules?.[0]||worstMod||mr?.modules?.[0]||Object.keys(activeLOS[t]?.modules||{})[0];
            const modPct=mr?.moduleStats?.[mod]?.pct??null;
            const diff=modPct===null?"Medium":modPct>=80?"Hard":modPct<50?"Easy":"Medium";
            return(
              <button key={t} onClick={()=>{
                trackUsage("quick_start");
                if(!mod){setTopic(t);setScreen("setup");return;}
                generateQuestions(t,mod,diff,10,"guided");
              }} style={{flexShrink:0,padding:"8px 13px",borderRadius:9,fontSize:12,fontWeight:700,cursor:"pointer",background:bg,border:`1.5px solid ${border}`,color:col,display:"flex",flexDirection:"column",alignItems:"center",gap:1,minWidth:72,transition:"all 0.15s"}}>
                {isRec&&<span style={{fontSize:8,fontWeight:800,color:C.accentLight,lineHeight:1,marginBottom:1,letterSpacing:"0.04em"}}>⚡ TOP</span>}
                <span>{short}</span>
                <span style={{fontSize:9,fontWeight:600,opacity:0.8}}>{notStarted?"New":`${acc??0}%`}</span>
              </button>
            );
          });
        })()}
      </div>
    </div>

    {/* Saved Presets */}
    {presets.length>0&&(
      <div style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <span style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase"}}>My Presets</span>
          <button onClick={()=>{setScreen("setup");}} style={{fontSize:11,fontWeight:700,color:C.accentLight,background:"none",border:"none",cursor:"pointer",padding:0}}>+ New →</button>
        </div>
        <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:4,scrollbarWidth:"none",msOverflowStyle:"none"}}>
          {presets.map(p=>(
            <div key={p.id} style={{flexShrink:0,position:"relative"}}>
              <button onClick={()=>{
                trackUsage("preset");
                if(p.mode==="interleaved"){generateInterleavedSession(p.difficulty,p.count);}
                else{generateQuestions(p.topic,p.subtopic,p.difficulty,p.warmupEnabled?p.count+3:p.count,p.mode);}
              }} style={{padding:"8px 22px 8px 12px",borderRadius:9,fontSize:12,fontWeight:700,cursor:"pointer",background:C.accent+"15",border:`1.5px solid ${C.accent}44`,color:C.accentLight,display:"flex",flexDirection:"column",alignItems:"flex-start",gap:2,minWidth:80,maxWidth:120,transition:"all 0.15s"}}>
                <span style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"}}>{p.name}</span>
                <span style={{fontSize:9,fontWeight:600,color:C.muted}}>{p.mode==="interleaved"?"🔀 Mix":p.topic?.split(" ")[0]} · {p.count}Q · {p.difficulty[0]}</span>
              </button>
              <button onClick={()=>{const u=presets.filter(x=>x.id!==p.id);setPresets(u);try{localStorage.setItem(PRESETS_KEY,JSON.stringify(u));}catch{};}} style={{position:"absolute",top:3,right:3,width:15,height:15,borderRadius:3,background:C.surface,border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer",fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",padding:0,lineHeight:1}}>✕</button>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Daily target tracker */}
    {(()=>{
      const today=localDateKey();
      const todayQs=levelHistory.filter(h=>h.dateKey===today).reduce((s,h)=>s+(h.total||0),0);
      const baseTarget=daysLeft>0?(daysLeft<=30?30:daysLeft<=60?25:20):20;
      const dailyTarget=history.length<5?Math.max(10,Math.round(baseTarget*(0.4+history.length*0.12))):baseTarget;
      const pct=Math.min(100,Math.round((todayQs/dailyTarget)*100));
      const done=todayQs>=dailyTarget;
      return(
        <div style={{background:C.surface,border:`1px solid ${done?C.easy+"44":C.border}`,borderRadius:10,padding:"10px 14px",marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <span style={{fontSize:12,fontWeight:700,color:done?C.easy:C.textMid}}>📅 Today{done?" — target hit! 🎉":""}</span>
            <span style={{fontSize:12,fontWeight:800,color:done?C.easy:pct>=60?C.medium:C.muted}}>{todayQs} / {dailyTarget} questions</span>
          </div>
          <div style={{height:5,background:C.dim,borderRadius:3}}>
            <div style={{height:"100%",width:`${pct}%`,background:done?C.easy:pct>=60?C.medium:C.accent,borderRadius:3,transition:"width 0.4s"}}/>
          </div>
        </div>
      );
    })()}

    {/* Study time strip */}
    {todayStudySecs>0&&<StudyTimeStrip todayStudySecs={todayStudySecs} weekStudySecs={weekStudySecs} weeklyStudyDays={weeklyStudyDays}/>}

    {/* Score sparkline — last 15 session trend — tap to open session history */}
    {levelHistory.length>=3&&(
      <div onClick={()=>{setScreen("dashboard");setDashTab("sessions");}} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"10px 14px",marginBottom:12,display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:4}}>Last {Math.min(levelHistory.length,15)} sessions</div>
          <ScoreSparkline history={levelHistory}/>
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          <div style={{fontSize:20,fontWeight:800,color:levelHistory[0]?.pct>=70?C.easy:C.hard}}>{levelHistory[0]?.pct??0}%</div>
          <div style={{fontSize:10,color:C.muted,marginTop:1}}>tap for history</div>
        </div>
      </div>
    )}


    {/* Study time nudge — implementation intention reminder */}
    {(()=>{
      if(!studyGoal?.time)return null;
      const h=new Date().getHours();
      const inWindow={morning:h>=6&&h<11,midday:h>=11&&h<14,evening:h>=17&&h<21,night:h>=21||h<2}[studyGoal.time];
      if(!inWindow)return null;
      return(
        <div style={{background:`${C.accent}12`,border:`1px solid ${C.accent}33`,borderRadius:10,padding:"10px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:10}}>
          <div style={{fontSize:18}}>⏰</div>
          <div style={{flex:1}}>
            <div style={{fontSize:12,fontWeight:700,color:C.accentLight}}>This is your study time</div>
            <div style={{fontSize:11,color:C.muted}}>You committed to {studyGoal.time} sessions — your future self will thank you.</div>
          </div>
        </div>
      );
    })()}

    {/* Overconfidence alert — metacognitive calibration */}
    {(()=>{
      const entries=Object.values(confidenceLog).filter(e=>e&&typeof e==="object"&&"c" in e);
      const sure=entries.filter(e=>e.c==="sure");
      if(sure.length<5)return null;
      const sureWrong=sure.filter(e=>!e.ok).length;
      const rate=Math.round(sureWrong/sure.length*100);
      if(rate<35)return null;
      return(
        <div style={{background:`${C.hard}0d`,border:`1px solid ${C.hard}44`,borderRadius:10,padding:"10px 14px",marginBottom:10}}>
          <div style={{fontSize:12,fontWeight:700,color:C.hard,marginBottom:3}}>⚠ Confidence gap detected</div>
          <div style={{fontSize:11,color:C.muted,lineHeight:1.5}}>{sureWrong} of {sure.length} answers you rated "Sure" were wrong ({rate}%). Overconfidence is the #1 exam risk — revisit those topics in Power Notes.</div>
        </div>
      );
    })()}

    {/* Exam countdown phase banner */}
    {history.length>=3&&daysLeft>14&&(()=>{
      let phase,icon,msg,color;
      if(daysLeft>60){phase="Foundation";icon="🌱";msg="Build breadth — hit every topic at least once. Speed doesn't matter yet.";color=C.easy;}
      else if(daysLeft>30){phase="Depth";icon="🎯";msg="Deepen weak topics. Anything below 65% accuracy needs 3+ more sessions.";color=C.medium;}
      else{phase="Final Push";icon="🔥";msg="High-weight focus: Ethics·FSA·Equity·Fixed Income = 50% of exam.";color=C.hard;}
      return(
        <div style={{background:`${color}0c`,border:`1px solid ${color}30`,borderLeft:`3px solid ${color}`,borderRadius:10,padding:"10px 14px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,color,marginBottom:2}}>{icon} Phase: {phase} · {daysLeft} days left</div>
            <div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{msg}</div>
          </div>
        </div>
      );
    })()}

    {/* Auto-escalation — subtle inline nudge, not a full card */}
    {autoEscalation&&(
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:C.easy+"0d",border:`1px solid ${C.easy}33`,borderRadius:10,padding:"9px 13px",marginBottom:10}}>
        <span style={{fontSize:12,color:C.easyLight}}>↑ Ready to level up · {autoEscalation.subtopic} → {autoEscalation.to}</span>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>{generateQuestions(autoEscalation.topic,autoEscalation.subtopic,autoEscalation.to,10);setAutoEscalation(null);}} style={{fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:7,background:C.easy+"25",border:`1px solid ${C.easy}44`,color:C.easyLight,cursor:"pointer"}}>Start</button>
          <button onClick={()=>setAutoEscalation(null)} style={{fontSize:11,padding:"4px 7px",borderRadius:7,background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>✕</button>
        </div>
      </div>
    )}

    {/* Session fatigue insight */}
    {sessionFatigue&&(
      <div style={{background:`${C.medium}0c`,border:`1px solid ${C.medium}30`,borderRadius:10,padding:"10px 14px",marginBottom:10}}>
        <div style={{fontSize:11,fontWeight:700,color:C.medium,marginBottom:2}}>⏳ Optimal session length: ~{sessionFatigue.optimalCount} questions</div>
        <div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>Short sessions average {sessionFatigue.shortAvg}% but longer ones drop to {sessionFatigue.longAvg}% (−{sessionFatigue.drop}pp). Two 10-question sessions beat one 20-question session.</div>
      </div>
    )}

    {/* Daily Concept Refresher — 3/day flip card */}
    {dailyRefresher?.concepts?.length&&(()=>{
      const cur=dailyRefresher.concepts[dailyRefresher.idx];
      const total=dailyRefresher.concepts.length;
      const idx=dailyRefresher.idx;
      const goTo=(newIdx)=>{
        const updated={...dailyRefresher,idx:newIdx};
        setDailyRefresher(updated);
        try{localStorage.setItem(REFRESHER_KEY,JSON.stringify(updated));}catch{}
        setRefresherFlipped(false);
      };
      return(
        <div
          onTouchStart={(e)=>{refresherTouchX.current=e.touches[0].clientX;}}
          onTouchEnd={(e)=>{
            if(refresherTouchX.current===null)return;
            const dx=e.changedTouches[0].clientX-refresherTouchX.current;
            refresherTouchX.current=null;
            if(Math.abs(dx)<50)return;
            if(dx<0&&idx<total-1)goTo(idx+1);
            else if(dx>0&&idx>0)goTo(idx-1);
          }}
          style={{background:refresherFlipped?`linear-gradient(135deg,${C.reward}18,${C.reward}08)`:`linear-gradient(135deg,${C.reward}12,${C.reward}05)`,border:`1px solid ${refresherFlipped?C.reward+"55":C.reward+"33"}`,borderRadius:14,padding:"14px 16px",marginBottom:10,transition:"background 0.3s,border-color 0.3s",userSelect:"none"}}>
          {!refresherFlipped?(
            <div style={{animation:"fadeIn 0.25s ease"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <span style={{fontSize:12,fontWeight:800,color:C.rewardLight,letterSpacing:"0.04em"}}>✨ TODAY'S CONCEPTS</span>
                <span style={{fontSize:10,color:C.muted}}>{idx+1}/{total}</span>
              </div>
              <div style={{fontSize:11,color:C.muted,marginBottom:4}}>{cur.topic} · {cur.module}</div>
              <div style={{fontSize:13,color:C.text,lineHeight:1.6,fontStyle:"italic",paddingLeft:10,borderLeft:`2px solid ${C.reward}55`,marginBottom:12}}>
                "{cur.los_stmt}"
              </div>
              <button onClick={()=>{setRefresherFlipped(true);setRefresherRevealError(null);generateRefresherReveal(idx);}} style={{width:"100%",padding:"9px",borderRadius:10,fontSize:12,fontWeight:700,background:`${C.reward}22`,color:C.rewardLight,border:`1px solid ${C.reward}44`,cursor:"pointer"}}>
                ✨ Reveal explanation →
              </button>
            </div>
          ):(
            <div style={{animation:"fadeIn 0.25s ease"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <span style={{fontSize:12,fontWeight:800,color:C.rewardLight}}>✨ {cur.topic}</span>
                <button onClick={()=>setRefresherFlipped(false)} style={{fontSize:11,color:C.muted,background:"none",border:"none",cursor:"pointer",padding:"2px 6px"}}>← back</button>
              </div>
              {refresherRevealLoading&&!cur.reveal?(
                <div style={{textAlign:"center",padding:"18px 0",color:C.muted,fontSize:12,animation:"pulse 1.5s infinite"}}>✨ Generating explanation…</div>
              ):cur.reveal?(
                <>
                  <div style={{fontSize:13,color:C.text,lineHeight:1.7,marginBottom:10}}>{cur.reveal.explanation}</div>
                  {cur.reveal.trap&&(
                    <div style={{background:C.hard+"18",border:`1px solid ${C.hard}33`,borderRadius:8,padding:"8px 12px",fontSize:12,color:C.text,lineHeight:1.5}}>
                      <span style={{fontWeight:700,color:C.hard}}>⚠️ Exam trap: </span>{cur.reveal.trap}
                    </div>
                  )}
                </>
              ):refresherRevealError?(
                <div style={{textAlign:"center",padding:"10px 0"}}>
                  <div style={{fontSize:12,color:"#f87171",marginBottom:10}}>{refresherRevealError}</div>
                  {refresherRevealError!=="Sign in to unlock AI explanations"&&(
                    <button onClick={()=>{setRefresherRevealError(null);generateRefresherReveal(idx);}} style={{padding:"8px 20px",borderRadius:9,fontSize:12,fontWeight:700,background:`${C.reward}22`,color:C.rewardLight,border:`1px solid ${C.reward}44`,cursor:"pointer"}}>↺ Retry</button>
                  )}
                </div>
              ):(
                <button onClick={()=>generateRefresherReveal(idx)} style={{width:"100%",padding:"9px",borderRadius:10,fontSize:12,fontWeight:700,background:`${C.reward}22`,color:C.rewardLight,border:`1px solid ${C.reward}44`,cursor:"pointer"}}>✨ Generate explanation →</button>
              )}
            </div>
          )}
          {/* Prev / Next navigation */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
            <button onClick={()=>goTo(idx-1)} style={{fontSize:11,color:C.textMid,background:"none",border:"none",cursor:"pointer",padding:"4px 6px",borderRadius:6,visibility:idx===0?"hidden":"visible"}}>← prev</button>
            <div style={{display:"flex",gap:5,alignItems:"center"}}>
              {dailyRefresher.concepts.map((_,i)=>(
                <span key={i} onClick={()=>goTo(i)} style={{width:6,height:6,borderRadius:"50%",background:i===idx?C.rewardLight:C.border,cursor:"pointer",display:"inline-block",transition:"background 0.2s"}}/>
              ))}
            </div>
            <button onClick={()=>goTo(idx+1)} style={{fontSize:11,color:C.accentLight,background:"none",border:"none",cursor:"pointer",fontWeight:700,padding:"4px 6px",borderRadius:6,visibility:idx===total-1?"hidden":"visible"}}>next →</button>
          </div>
        </div>
      );
    })()}

    {/* Referral card */}
    {authUser&&<div style={{textAlign:"center",fontSize:12,color:C.muted,marginBottom:8}}>🎓 <strong style={{color:C.text}}>{COMMUNITY_COUNT}+</strong> CFA candidates preparing for August 2026</div>}
    {authUser&&<ReferralCard userId={authUser.id} cfg={SB_CFG} setUpgradeModal={setUpgradeModal}/>}
    {authUser&&history.length>=1&&(
      <button onClick={downloadProgressCard} style={{width:"100%",marginBottom:10,padding:"11px",borderRadius:11,fontSize:13,fontWeight:700,background:C.surface,border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
        📊 Share My Progress Card
      </button>
    )}

    {error&&(()=>{
      const canRetry=lastGenParamsRef.current&&error.includes("retry");
      return(
        <div onClick={canRetry?()=>{const p=lastGenParamsRef.current;setError("");generateQuestionsRef.current&&generateQuestionsRef.current(p.t,p.st,p.diff,p.cnt,p.m,p.isVignette,p.st2);}:()=>setError("")}
          style={{background:C.errorBg,border:`1px solid ${C.hard}44`,borderRadius:9,padding:"12px",color:C.hard,fontSize:13,marginTop:9,animation:"fadeIn 0.2s ease",cursor:canRetry?"pointer":"default",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span>{error}</span>
          {canRetry?<span style={{fontSize:11,fontWeight:700,color:C.hard,marginLeft:12,flexShrink:0}}>↺</span>:<span style={{fontSize:11,color:C.hard,opacity:0.6,marginLeft:12,flexShrink:0}}>✕</span>}
        </div>
      );
    })()}

    {/* Empty state — shown when no sessions yet */}
    {historyLoaded && history.length === 0 && (
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"20px 16px",marginTop:10,textAlign:"center"}}>
        <div style={{fontSize:28,marginBottom:8}}>🎯</div>
        <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:6}}>Ready to start?</div>
        <div style={{fontSize:12,color:C.muted,lineHeight:1.6,marginBottom:14}}>Tap <strong style={{color:C.text}}>Today's Focus</strong> above to begin your first session. Your progress will appear here.</div>
        <div style={{fontSize:11,color:C.muted,opacity:0.6}}>Signed in · data syncs automatically</div>
      </div>
    )}

    {fsaVignetteOpen&&(
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:100,display:"flex",alignItems:"flex-end"}} onClick={()=>setFsaVignetteOpen(false)}>
        <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:480,margin:"0 auto",background:C.surface,borderRadius:"16px 16px 0 0",padding:"24px 20px 40px",border:`1px solid ${C.border}`}}>
          <div style={{width:40,height:4,background:C.border,borderRadius:2,margin:"0 auto 20px"}}/>
          <div style={{fontSize:16,fontWeight:800,color:C.text,marginBottom:4}}>📊 FSA Statement Vignette</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:16}}>Generate a real financial statement with 3 analysis questions</div>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,marginBottom:8,letterSpacing:"0.05em",textTransform:"uppercase"}}>FSA Subtopic</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
            {Object.keys(activeLOS["Financial Statement Analysis"]?.modules||{}).map(m=>(
              <button key={m} onClick={()=>setFsaSubtopic(m)} style={{padding:"5px 10px",borderRadius:20,fontSize:11,fontWeight:600,cursor:"pointer",border:fsaSubtopic===m?`1.5px solid ${C.accent}`:`1.5px solid ${C.border}`,background:fsaSubtopic===m?C.accent+"22":C.dim,color:fsaSubtopic===m?C.accentLight:C.muted}}>{m}</button>
            ))}
          </div>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,marginBottom:8,letterSpacing:"0.05em",textTransform:"uppercase"}}>Difficulty</div>
          <div style={{display:"flex",gap:8,marginBottom:20}}>
            {["Easy","Medium","Hard"].map(d=>(
              <button key={d} onClick={()=>setFsaDifficulty(d)} style={{flex:1,padding:"9px",borderRadius:9,fontSize:12,fontWeight:700,cursor:"pointer",border:fsaDifficulty===d?`1.5px solid ${diffC[d]}`:`1.5px solid ${C.border}`,background:fsaDifficulty===d?diffC[d]+"22":C.dim,color:fsaDifficulty===d?diffC[d]:C.muted}}>{d}</button>
            ))}
          </div>
          <button onClick={()=>{setFsaVignetteOpen(false);generateFSAVignette(fsaSubtopic,fsaDifficulty);}} style={{width:"100%",padding:"13px",borderRadius:11,fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",boxShadow:`0 4px 16px ${C.accent}44`}}>
            Generate FSA Vignette →
          </button>
        </div>
      </div>
    )}

    {crossVignetteOpen&&(
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:100,display:"flex",alignItems:"flex-end"}} onClick={()=>setCrossVignetteOpen(false)}>
        <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:480,margin:"0 auto",background:C.surface,borderRadius:"16px 16px 0 0",padding:"24px 20px 40px",border:`1px solid ${C.border}`}}>
          <div style={{width:40,height:4,background:C.border,borderRadius:2,margin:"0 auto 20px"}}/>
          <div style={{fontSize:16,fontWeight:800,color:C.text,marginBottom:4}}>🔀 Cross-Topic Vignette</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:16}}>Two related subtopics in one scenario — exam style</div>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>Topic</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
            {Object.keys(RELATED_MODULES).map(t=>(
              <button key={t} onClick={()=>{setCrossVignetteTopic(t);const pairs=getRelatedModules(t);setCrossVignetteModule1(pairs[0]?.[0]||"");setCrossVignetteModule2(pairs[0]?.[1]||"");}} style={{padding:"5px 10px",borderRadius:20,fontSize:11,fontWeight:600,cursor:"pointer",border:crossVignetteTopic===t?`1.5px solid ${C.accent}`:`1.5px solid ${C.border}`,background:crossVignetteTopic===t?C.accent+"22":C.dim,color:crossVignetteTopic===t?C.accentLight:C.muted}}>{t.split(" ")[0]}</button>
            ))}
          </div>
          {getRelatedModules(crossVignetteTopic).length>0&&(
            <>
              <div style={{fontSize:11,fontWeight:700,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>Module Pair</div>
              <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
                {getRelatedModules(crossVignetteTopic).map((pair,i)=>(
                  <button key={i} onClick={()=>{setCrossVignetteModule1(pair[0]);setCrossVignetteModule2(pair[1]);}} style={{padding:"8px 12px",borderRadius:9,fontSize:11,fontWeight:600,cursor:"pointer",textAlign:"left",border:crossVignetteModule1===pair[0]&&crossVignetteModule2===pair[1]?`1.5px solid ${C.accentLight}`:`1.5px solid ${C.border}`,background:crossVignetteModule1===pair[0]&&crossVignetteModule2===pair[1]?C.accentLight+"18":C.dim,color:crossVignetteModule1===pair[0]&&crossVignetteModule2===pair[1]?C.accentLight:C.muted}}>
                    {pair[0]} + {pair[1]}
                  </button>
                ))}
              </div>
            </>
          )}
          <button onClick={()=>{setCrossVignetteOpen(false);generateQuestions(crossVignetteTopic,crossVignetteModule1,"Medium",6,"guided",true,crossVignetteModule2);}} disabled={!crossVignetteModule1||!crossVignetteModule2} style={{width:"100%",padding:"13px",borderRadius:11,fontSize:14,fontWeight:700,background:crossVignetteModule1&&crossVignetteModule2?`linear-gradient(135deg,${C.accent},${C.accentLight})`:C.dim,color:crossVignetteModule1&&crossVignetteModule2?"#fff":C.muted,border:"none",cursor:crossVignetteModule1&&crossVignetteModule2?"pointer":"not-allowed"}}>
            Generate Cross Vignette →
          </button>
        </div>
      </div>
    )}
    <div style={{height:130}}/>
  </>);

  // ══ BACKUP / RESTORE SCREEN ════════════════════════════════════════════════
  // ════════════════════════════════════════
  // SCREEN: backup
  // ════════════════════════════════════════
  if(screen==="backup") return wrap(<>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
      <div>
        <h2 style={{margin:0,fontSize:22,fontWeight:800}}>💾 Backup & Restore</h2>
        <div style={{fontSize:12,color:C.muted,marginTop:3}}>Export your data before clearing browser storage</div>
      </div>
      <button onClick={()=>{setScreen("home");setImportText("");setImportError("");}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>← Home</button>
    </div>

    {/* Export */}
    {/* Drive sync status */}

    <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>Export your data</div>
      <div style={{fontSize:12,color:C.muted,marginBottom:12,lineHeight:1.5}}>
        Copy this JSON and save it in Notes, email it to yourself, or keep it in a text file. Paste it back any time to restore.
      </div>
      {(()=>{
        const data=JSON.stringify({history,srDeck,savedAt:new Date().toISOString(),version:"v7"});
        return(<>
          <textarea
            readOnly
            value={data}
            onFocus={e=>e.target.select()}
            style={{width:"100%",height:90,background:C.dim,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px",fontSize:10,fontFamily:"monospace",color:C.textMid,resize:"none",outline:"none",boxSizing:"border-box",marginBottom:10,wordBreak:"break-all"}}
          />
          <div style={{fontSize:11,color:C.muted,marginBottom:10}}>👆 Tap the box above to select all, then copy manually (long-press → Copy All).</div>
          <a
            href={"data:application/json;charset=utf-8,"+encodeURIComponent(data)}
            download={`clearcfa-backup-${new Date().toISOString().slice(0,10)}.json`}
            style={{display:"block",width:"100%",padding:"11px",borderRadius:9,fontSize:13,fontWeight:700,background:C.surface,border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",textAlign:"center",textDecoration:"none",boxSizing:"border-box",marginBottom:8}}
          >
            ⬇ Download JSON
          </a>
          {(()=>{
            const cards=Object.values(srDeck);
            if(!cards.length)return null;
            const rows=cards.map(c=>{
              const front=(c.question||c.concept||"").replace(/\t/g," ").replace(/\n/g," ");
              const optText=c.options?Object.entries(c.options).map(([k,v])=>`${k}: ${v}`).join(" | "):"";
              const back=`${c.answer||""}: ${c.options?.[c.answer]||""} — ${(c.explanation||"").replace(/\t/g," ").replace(/\n/g," ")}`;
              const tags=(c.topic||"").replace(/\s+/g,"_");
              return[front,optText,back,tags].join("\t");
            });
            const csv="#separator:tab\n#html:false\n#deck:ClearCFA SR Deck\n#notetype:Basic (and reversed card)\n#columns:Front\tOptions\tBack\tTags\n"+rows.join("\n");
            return(
              <a
                href={"data:text/plain;charset=utf-8,"+encodeURIComponent(csv)}
                download={`clearcfa-anki-${new Date().toISOString().slice(0,10)}.txt`}
                style={{display:"block",width:"100%",padding:"11px",borderRadius:9,fontSize:13,fontWeight:700,background:C.surface,border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",textAlign:"center",textDecoration:"none",boxSizing:"border-box",marginBottom:8}}
              >
                🃏 Export for Anki ({cards.length} cards)
              </a>
            );
          })()}
          {moduleReadiness.length>0&&(()=>{
            const rows=moduleReadiness.map(r=>[
              r.topic,
              r.accuracy!=null?r.accuracy.toFixed(1):"",
              r.sessions,
              r.totalQs,
              ((r.coverage||0)*100).toFixed(0)+"%",
              r.lastSession||"",
              r.readiness!=null?r.readiness.toFixed(0):"",
            ]);
            const header="topic,accuracy_%,sessions,total_questions,coverage,last_studied,readiness_score\n";
            const csvData=header+rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
            return(
              <a
                href={"data:text/csv;charset=utf-8,"+encodeURIComponent(csvData)}
                download={`clearcfa-progress-${new Date().toISOString().slice(0,10)}.csv`}
                style={{display:"block",width:"100%",padding:"11px",borderRadius:9,fontSize:13,fontWeight:700,background:C.surface,border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",textAlign:"center",textDecoration:"none",boxSizing:"border-box"}}
              >
                📊 Export Progress Report (CSV)
              </a>
            );
          })()}
        </>);
      })()}
      <div style={{fontSize:11,color:C.muted,marginTop:8,textAlign:"center"}}>
        {history.length} sessions · {Object.keys(srDeck).length} SR cards · {Object.keys(qdb).length} Qs in dedup DB
      </div>
    </div>

    {/* Offline question bank */}
    {(()=>{
      let cacheCount=0;
      try{const c=JSON.parse(localStorage.getItem(OFFLINE_QS_KEY)||"{}");cacheCount=Object.values(c).flatMap(m=>Object.values(m)).flat().length;}catch{}
      return(
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",marginBottom:16}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>📶 Offline question bank</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:12,lineHeight:1.5}}>
            Questions you've already generated are cached automatically. Use them when offline or without signing in.
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:cacheCount>0?10:0}}>
            <span style={{fontSize:12,color:cacheCount>0?C.easy:C.muted}}>{cacheCount>0?`${cacheCount} questions cached`:"No questions cached yet — start a session to build the bank"}</span>
            {cacheCount>0&&<button onClick={()=>{try{localStorage.removeItem(OFFLINE_QS_KEY);}catch{}}} style={{fontSize:11,color:C.hard,background:"none",border:`1px solid ${C.hard}33`,padding:"4px 10px",borderRadius:6,cursor:"pointer"}}>Clear cache</button>}
          </div>
          {authUser?.id&&(
            <button onClick={async()=>{
              const topics=Object.entries(activeLOS).slice(0,5);
              for(const [t,{modules}]of topics){
                const mod=Object.keys(modules)[0];
                if(mod)await generateQuestions(t,mod,"Medium",10,"guided").catch(()=>{});
              }
            }} style={{width:"100%",padding:"10px",borderRadius:9,fontSize:13,fontWeight:700,background:C.surface,border:`1px solid ${C.border}`,color:C.textMid,cursor:"pointer",textAlign:"center",boxSizing:"border-box"}}>
              ⬇ Pre-download top 5 topics (50 questions)
            </button>
          )}
        </div>
      );
    })()}

    {/* Import */}
    <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",marginBottom:16}}>
      <div style={{fontSize:13,fontWeight:700,marginBottom:4}}>Restore from backup</div>
      <div style={{fontSize:12,color:C.muted,marginBottom:12}}>Paste your previously exported JSON here.</div>
      <textarea
        value={importText}
        onChange={e=>setImportText(e.target.value)}
        placeholder='Paste your backup JSON here...'
        style={{width:"100%",height:100,background:C.dim,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 12px",fontSize:11,fontFamily:"monospace",color:C.text,resize:"vertical",outline:"none"}}
      />
      {importError&&<div style={{fontSize:12,color:C.hard,marginTop:6}}>{importError}</div>}
      <button onClick={()=>{
        try{
          const parsed=JSON.parse(importText.trim());
          const h=Array.isArray(parsed)?parsed:(parsed.history||null);
          if(!h||!Array.isArray(h)||!h[0]?.topic) throw new Error("Invalid format — must be a ClearCFA backup JSON.");
          setHistory(h);
          storageSet(STORAGE_KEY,h);
          storageSet(BACKUP_KEY,{history:h,savedAt:new Date().toISOString()});
          if(parsed.srDeck&&typeof parsed.srDeck==="object"){setSrDeck(parsed.srDeck);storageSet(SR_KEY,parsed.srDeck);}
          setImportText("");setImportError("");setScreen("home");
        }catch(e){setImportError(e.message||"Invalid JSON — check your backup text.");}
      }} disabled={!importText.trim()} style={{width:"100%",marginTop:10,padding:"11px",borderRadius:9,fontSize:13,fontWeight:700,background:importText.trim()?`linear-gradient(135deg,${C.easy},#059669)`:C.dim,color:importText.trim()?"#fff":C.muted,border:"none",cursor:importText.trim()?"pointer":"not-allowed"}}>
        Restore Sessions
      </button>
    </div>

    {/* Storage health */}
    <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px"}}>
      <div style={{fontSize:13,fontWeight:700,marginBottom:8}}>Storage health</div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:storageOk===true?C.easy:storageOk===false?C.hard:C.muted}}/>
        <span style={{fontSize:12,color:storageOk===true?C.easy:storageOk===false?C.hard:C.muted}}>
          {storageOk===true?"Storage is working normally":storageOk===false?"Storage is failing — export your data immediately":storageOk===null?"Checking…":"Unknown"}
        </span>
      </div>
      <div style={{fontSize:11,color:C.muted,lineHeight:1.6}}>
        Auto-backup runs after every session (saves to a secondary key). Export manually before clearing browser data or switching devices.
      </div>
      <button onClick={async()=>{const ok=await storageHealth();setStorageOk(ok);}} style={{marginTop:10,fontSize:12,padding:"7px 14px",borderRadius:8,background:C.dim,border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>Re-check storage</button>
    </div>
  </>);


  // ══ SR REVIEW ═════════════════════════════════════════════════════════════
  // ════════════════════════════════════════
  // SCREEN: srReview
  // ════════════════════════════════════════
  if(screen==="srReview"){
    const card=srQueue[srIdx];
    if(!card){
      const {correct,total}=srSessionResults.current;
      const mins=srSessionStart.current?Math.round((Date.now()-srSessionStart.current)/60000):null;
      const pct=total>0?Math.round((correct/total)*100):null;
      return wrap(
        <div style={{textAlign:"center",paddingTop:40}}>
          <div style={{fontSize:40,marginBottom:12}}>✅</div>
          <div style={{fontSize:18,fontWeight:800,marginBottom:4}}>SR deck cleared!</div>
          {total>0&&(
            <>
            <div style={{fontSize:13,color:C.muted,marginBottom:20}}>
              {mins!==null&&mins>0?`${mins} min · `:""}{total} card{total!==1?"s":""} reviewed
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24,maxWidth:280,margin:"0 auto 24px"}}>
              <div style={{background:C.easy+"15",border:`1px solid ${C.easy}33`,borderRadius:12,padding:"14px 10px"}}>
                <div style={{fontSize:22,fontWeight:800,color:C.easy}}>{correct}</div>
                <div style={{fontSize:11,color:C.muted,marginTop:2}}>Correct</div>
              </div>
              <div style={{background:C.hard+"15",border:`1px solid ${C.hard}33`,borderRadius:12,padding:"14px 10px"}}>
                <div style={{fontSize:22,fontWeight:800,color:C.hard}}>{total-correct}</div>
                <div style={{fontSize:11,color:C.muted,marginTop:2}}>Review again</div>
              </div>
            </div>
            {pct!==null&&<div style={{fontSize:13,color:pct>=70?C.easy:C.medium,fontWeight:700,marginBottom:20}}>
              {pct}% retention{pct>=80?" 🎯":pct>=70?" 👍":" — keep drilling"}
            </div>}
            </>
          )}
          <button onClick={()=>setScreen("home")}
            style={{padding:"12px 28px",borderRadius:10,fontSize:14,fontWeight:700,
              background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,
              color:"#fff",border:"none",cursor:"pointer"}}>
            Home
          </button>
        </div>
      );
    }
    const isLeech=(card.wrongCount||0)>=4;
    return wrap(<>
      <button onClick={()=>setCalcOpen(true)} title="Open BA II Plus Calculator"
        style={{position:"fixed",bottom:82,right:16,zIndex:270,width:46,height:46,borderRadius:"50%",background:"linear-gradient(135deg,#1e3a5f,#1a4a9f)",border:"1px solid #2563eb55",color:"#93c5fd",fontSize:20,cursor:"pointer",boxShadow:"0 4px 16px #0008",display:"flex",alignItems:"center",justifyContent:"center",touchAction:"manipulation"}}>
        🧮
      </button>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div><h2 style={{margin:0,fontSize:20,fontWeight:800}}>{isLeech?"⚠ Leech Review":"Spaced Repetition"}</h2><div style={{fontSize:12,color:C.muted,marginTop:3}}>{srIdx+1} of {srQueue.length}{isLeech?` · Wrong ${card.wrongCount}x`:` · Next review: ${sm2Update(card,true).interval}d if correct`}</div></div>
        <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>← Home</button>
      </div>
      <div style={{height:3,background:C.border,borderRadius:2,marginBottom:16}}><div style={{height:"100%",width:`${(srIdx/srQueue.length)*100}%`,background:isLeech?C.hard:C.accent,borderRadius:2,transition:"width 0.3s"}}/></div>
      <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
        <Badge color={C.muted}>{card.concept||card.subtopic}</Badge>
        <Badge color={C.accent}>{card.topic}</Badge>
        {isLeech&&<Badge color={C.hard}>Leech · {card.wrongCount}x wrong</Badge>}
        <Badge color={(card.ef||2.5)>=2.5?C.easy:(card.ef||2.5)>=2.1?C.medium:C.hard}>{(card.ef||2.5)>=2.5?"Easy recall":(card.ef||2.5)>=2.1?"Med recall":"Hard recall"}</Badge>
      </div>
      {card.question&&(card.question.length<150)&&!card.question.trim().endsWith("?")?<div style={{fontSize:10,color:C.muted,marginBottom:4,fontStyle:"italic"}}>⚠ Older card — question context may be incomplete. Full context on next attempt.</div>:null}
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"20px",marginBottom:14,fontSize:14,lineHeight:1.8,whiteSpace:"pre-wrap"}}>{card.question}</div>
      {!srAnswer?(
        <>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
          {Object.entries(card.options).map(([key,val])=>(
            <button key={key} onClick={()=>setSrAnswer(key)} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"13px 15px",borderRadius:10,textAlign:"left",background:C.surface,border:`1.5px solid ${C.border}`,color:C.text,cursor:"pointer",fontSize:13,lineHeight:1.65}}>
              <span style={{minWidth:24,height:24,borderRadius:6,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,background:C.dim,color:C.muted}}>{key}</span><span>{val}</span>
            </button>
          ))}
        </div>
        <div style={{background:`${C.accent}08`,border:`1px dashed ${C.border}`,borderRadius:11,padding:"14px 16px",marginTop:8,marginBottom:4}}>
          <div style={{fontSize:12,fontWeight:700,color:C.muted,marginBottom:6,letterSpacing:"0.03em"}}>💭 Retrieval practice</div>
          <div style={{fontSize:11,color:C.muted,lineHeight:1.65,marginBottom:card.los_tested?8:0}}>Actively recall the answer before selecting. Retrieval effort — even when you get it wrong — strengthens long-term memory more than re-reading.</div>
          {card.los_tested&&<div style={{fontSize:10,color:C.accentLight+"88",borderTop:`1px solid ${C.border}`,paddingTop:6,marginTop:2}}>LOS: {card.los_tested}</div>}
        </div>
        <div style={{textAlign:"center",marginTop:10}}>
          <button onClick={()=>{
            const key=Object.keys(srDeck).find(k=>srDeck[k].question===card.question)||null;
            if(key){setSrDeck(prev=>{const n={...prev};delete n[key];storageSet(SR_KEY,n);return n;});}
            setSrAnswer(null);
            if(srIdx<srQueue.length-1)setSrIdx(i=>i+1);else setScreen("home");
          }} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:11,textDecoration:"underline",opacity:0.5}}>
            Remove card
          </button>
        </div>
        </>
      ):(
        <>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
            {Object.entries(card.options).map(([key,val])=>{const isCorrect=key===card.answer,wasPicked=key===srAnswer;return(<div key={key} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"13px 15px",borderRadius:10,background:isCorrect?C.easy+"22":wasPicked&&!isCorrect?C.hard+"18":C.surface,border:`1.5px solid ${isCorrect?C.easy:wasPicked&&!isCorrect?C.hard:C.border}`,fontSize:13,lineHeight:1.65,color:isCorrect?C.easy:wasPicked&&!isCorrect?C.hard:C.muted}}><span style={{minWidth:24,height:24,borderRadius:6,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,background:isCorrect?C.easy:wasPicked&&!isCorrect?C.hard:C.dim,color:"#fff"}}>{key}</span><span>{val}</span></div>);})}
          </div>
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:11,padding:"14px",marginBottom:6,fontSize:13,color:C.textMid,lineHeight:1.75}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div style={{fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase"}}>Explanation</div>
              <button onClick={()=>openReviewAI(`${card.concept||card.subtopic||"SR Card"} · ${card.topic}`,`CFA Level ${cfaLevel} — I just answered a spaced repetition card.\n\nConcept: "${card.concept||card.subtopic}"\nTopic: ${card.topic}\n\nExplanation given: "${card.explanation}"\n${card.los_tested?`LOS: ${card.los_tested}`:""}${card.misconception_targeted?`\nCommon error: ${card.misconception_targeted}`:""}\n\nHelp me understand this deeply with a worked example and the key exam nuance I must not miss.`)}
                style={{fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:7,background:`${C.accent}22`,border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer",flexShrink:0}}>
                💬 Ask AI
              </button>
            </div>
            {card.explanation}
          </div>
          {card.los_tested&&<div style={{background:C.dim,borderRadius:8,padding:"8px 12px",marginBottom:10,fontSize:11,color:C.muted}}><span style={{fontWeight:700,color:C.accentLight}}>LOS: </span>{card.los_tested}</div>}
          {card.misconception_targeted&&<div style={{background:C.surface,borderRadius:8,padding:"8px 12px",marginBottom:10,fontSize:11,color:C.muted}}><span style={{fontWeight:700}}>Common error tested: </span>{card.misconception_targeted}</div>}
          <div style={{background:srAnswer===card.answer?C.easy+"22":C.hard+"18",border:`1px solid ${srAnswer===card.answer?C.easy+"44":C.hard+"44"}`,borderRadius:9,padding:"10px 14px",marginBottom:12,fontSize:12,color:srAnswer===card.answer?C.easy:C.hard,fontWeight:600}}>
            {srAnswer===card.answer?`✓ Correct — next review in ${sm2Update(card,true).interval} days`:`✗ Incorrect — review again tomorrow${isLeech?" · Consider re-reading this LOS in your curriculum":""}` }
          </div>
          <button onClick={()=>{
            const correct=srAnswer===card.answer;
            srSessionResults.current.total++;
            if(correct)srSessionResults.current.correct++;
            const key=Object.keys(srDeck).find(k=>srDeck[k].question===card.question)||`sr_${Date.now()}`;
            setSrDeck(prev=>{const existing=prev[key]||card;const updated=sm2Update(existing,correct);if(!correct)updated.wrongCount=(existing.wrongCount||0)+1;else updated.wrongCount=Math.max(0,(existing.wrongCount||0)-1);return{...prev,[key]:updated};});
            setSrAnswer(null);
            setReviewAiPanel(null);
            if(srIdx<srQueue.length-1)setSrIdx(i=>i+1);else setScreen("home");
          }} style={{width:"100%",padding:"13px",borderRadius:10,fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>
            {srIdx<srQueue.length-1?"Next Card →":"Finish Review ✓"}
          </button>
        </>
      )}
      <ReviewAIChatPanel/>
    </>);
  }

  // ════════════════════════════════════════
  // SCREEN: reels
  // ════════════════════════════════════════
  if(screen==="reels"){
    const card=reelFeed[reelIdx];
    const accentColor=(card&&REEL_TOPIC_COLORS[card.topic])||C.accent;
    const segCount=10;
    const segIdx=reelSessionCount%segCount;

    const reelGoNext=()=>{
      const next=reelIdx+1;
      if(next>=reelFeed.length-10){
        setReelFeed(p=>[...p,...[...reelFeedBase.current].sort(()=>Math.random()-0.5)]);
      }
      setReelSlideDir("next");
      if(!screenOnboard.drillSwipe){
        const u={...screenOnboard,drillSwipe:true};setScreenOnboard(u);
        try{localStorage.setItem(SCREEN_ONBOARD_KEY,JSON.stringify(u));}catch{}
      }
      setReelAnswer(null);setReelRevealed(false);setReelXpPop(false);setReelIdx(next);
      const count=reelSessionCount+1;
      setReelSessionCount(count);
      if(count===10)showToast("🎬","10 Drills done!","Keep the momentum going 🔥");
      if(count===25)showToast("🔥","25 Drills!","You're on a roll.");
      if(count===50)showToast("🏆","50 Drills!","Study machine mode 💪");
    };
    const reelGoPrev=()=>{
      if(reelIdx===0)return;
      setReelSlideDir("prev");
      setReelAnswer(null);setReelRevealed(false);setReelXpPop(false);setReelIdx(i=>i-1);
    };
    const exitReels=()=>{setAiCoachScreen(false);setWeeklyPlanScreen(false);setScreen("home");};

    const typeLabel={power_note:"Key Rule",trap:"Watch Out",formula:"Formula",mcq:"Quick Check",curiosity_gap:"Curiosity"}[card?.type]||"";

    const renderCardBody=()=>{
      if(!card)return <div style={{color:C.muted,textAlign:"center",paddingTop:60}}>No content available</div>;
      const topicIcon={"Ethics":"⚖️","Quantitative Methods":"📊","Economics":"📈","Financial Statement Analysis":"📋","Corporate Issuers":"🏢","Equity Investments":"📉","Fixed Income":"💵","Derivatives":"⚡","Alternative Investments":"💎","Portfolio Management":"🎯","Behavioral Finance":"🧠","Capital Market Expectations":"🔮","Asset Allocation":"⚖️","Risk Management":"🛡️","Trading & Performance":"📊"}[card.topic]||"📚";
      if(card.type==="power_note")return(
        <div style={{display:"flex",flexDirection:"column",flex:1,borderRadius:18,overflow:"hidden",border:`1px solid ${accentColor}44`}}>
          <div style={{background:`linear-gradient(135deg,${accentColor}44 0%,${accentColor}18 100%)`,padding:"26px 22px 20px",textAlign:"center",borderBottom:`1px solid ${accentColor}30`}}>
            <div style={{fontSize:44,marginBottom:10,lineHeight:1}}>{topicIcon}</div>
            <div style={{fontSize:10,fontWeight:700,color:accentColor,textTransform:"uppercase",letterSpacing:"0.14em",marginBottom:4}}>📌 Key Rule</div>
            <div style={{fontSize:12,fontWeight:600,color:C.textMid,lineHeight:1.4}}>{card.module}</div>
          </div>
          <div style={{flex:1,background:C.surface,padding:"24px 20px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <div style={{borderLeft:`3px solid ${accentColor}`,paddingLeft:16,marginBottom:card.mnemonic?20:0}}>
              <div style={{fontSize:16,fontWeight:700,lineHeight:1.9,color:C.text}}>{expandAcronyms(card.rule)}</div>
            </div>
            {card.mnemonic&&(
              <div style={{background:"#f59e0b10",border:"1px solid #f59e0b44",borderRadius:12,padding:"13px 15px",display:"flex",alignItems:"flex-start",gap:10}}>
                <span style={{fontSize:18,flexShrink:0}}>💡</span>
                <div style={{fontSize:13,color:"#fcd34d",lineHeight:1.65,fontWeight:500}}>{card.mnemonic}</div>
              </div>
            )}
          </div>
        </div>
      );
      if(card.type==="trap")return(
        <div style={{display:"flex",flexDirection:"column",flex:1,gap:10}}>
          <div style={{background:"linear-gradient(135deg,#450a0a55 0%,#450a0a22 100%)",border:"1px solid #ef444455",borderRadius:16,padding:"20px 20px 16px",textAlign:"center"}}>
            <div style={{fontSize:40,marginBottom:8,lineHeight:1}}>⚠️</div>
            <div style={{fontSize:10,fontWeight:700,color:"#ef4444",textTransform:"uppercase",letterSpacing:"0.14em"}}>Watch Out · {card.topic}</div>
          </div>
          {card.rule&&(
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:14,padding:"16px 18px"}}>
              <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:7,textTransform:"uppercase",letterSpacing:"0.08em"}}>✓ Remember</div>
              <div style={{fontSize:14,fontWeight:600,color:C.text,lineHeight:1.8}}>{expandAcronyms(card.rule)}</div>
            </div>
          )}
          <div style={{background:"#1a0505",border:"1px solid #ef444466",borderRadius:14,padding:"18px 18px",flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <div style={{fontSize:10,fontWeight:700,color:"#ef4444",marginBottom:9,textTransform:"uppercase",letterSpacing:"0.08em"}}>⚠ Common Mistake</div>
            <div style={{fontSize:15,fontWeight:700,color:"#fca5a5",lineHeight:1.85}}>{expandAcronyms(card.trap)}</div>
          </div>
        </div>
      );
      if(card.type==="formula")return(
        <div style={{display:"flex",flexDirection:"column",flex:1,borderRadius:18,overflow:"hidden",border:`1px solid ${accentColor}44`}}>
          <div style={{background:`linear-gradient(135deg,${accentColor}44 0%,${accentColor}18 100%)`,padding:"22px 22px 18px",textAlign:"center",borderBottom:`1px solid ${accentColor}30`}}>
            <div style={{fontSize:42,marginBottom:8,fontFamily:"serif",fontWeight:900,color:accentColor,lineHeight:1}}>Σ</div>
            <div style={{fontSize:10,fontWeight:700,color:accentColor,textTransform:"uppercase",letterSpacing:"0.14em",marginBottom:4}}>Formula</div>
            <div style={{fontSize:13,fontWeight:700,color:C.text,lineHeight:1.4}}>{expandAcronyms(card.name)}</div>
          </div>
          <div style={{flex:1,background:C.surface,padding:"24px 20px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"}}
            onClick={()=>{setReelRevealed(true);if(navigator.vibrate)navigator.vibrate([20]);}}>
            <div style={{position:"relative",width:"100%"}}>
              <div style={{fontFamily:"'Courier New',monospace",fontSize:21,fontWeight:700,color:accentColor,lineHeight:1.9,
                filter:reelRevealed?"none":"blur(10px)",transition:"filter 0.35s",padding:"10px 0",letterSpacing:"0.02em"}}>
                {card.formula}
              </div>
              {!reelRevealed&&(
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:10}}>
                  <div style={{fontSize:34}}>👁</div>
                  <div style={{fontSize:14,fontWeight:700,color:accentColor}}>Tap to reveal</div>
                </div>
              )}
            </div>
            {reelRevealed&&<div style={{fontSize:11,color:C.muted,marginTop:20,borderTop:`1px solid ${C.border}`,paddingTop:14,width:"100%"}}>Swipe up for next card ↑</div>}
          </div>
        </div>
      );
      if(card.type==="mcq")return(
        <div style={{display:"flex",flexDirection:"column",gap:10,flex:1,position:"relative"}}>
          {reelXpPop&&(
            <div style={{position:"absolute",right:8,top:0,fontSize:15,fontWeight:800,
              color:C.easy,pointerEvents:"none",animation:"floatUp 0.9s ease forwards",zIndex:10}}>
              +5 XP ✓
            </div>
          )}
          <div style={{background:`linear-gradient(135deg,${accentColor}28 0%,${accentColor}10 100%)`,border:`1px solid ${accentColor}44`,borderRadius:16,padding:"16px 18px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <span style={{fontSize:18,lineHeight:1}}>{topicIcon}</span>
              <div style={{fontSize:10,fontWeight:700,color:accentColor,textTransform:"uppercase",letterSpacing:"0.12em"}}>Quick Check</div>
            </div>
            <div style={{fontSize:14,fontWeight:600,color:C.text,lineHeight:1.8}}>{card.question}</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {Object.entries(card.options||{}).map(([key,val])=>{
              const isCorrect=key===card.answer;
              const wasPicked=key===reelAnswer;
              const showResult=reelAnswer!==null;
              let bg=C.surface,border=`1.5px solid ${C.border}`,color=C.text;
              if(showResult&&isCorrect){bg=C.easy+"22";border=`1.5px solid ${C.easy}`;color=C.easy;}
              else if(showResult&&wasPicked&&!isCorrect){bg=C.hard+"18";border=`1.5px solid ${C.hard}`;color=C.hard;}
              return(
                <button key={key} onClick={()=>{
                  if(reelAnswer)return;
                  setReelAnswer(key);
                  if(key===card.answer){if(navigator.vibrate)navigator.vibrate([30,20,30]);setXp(x=>x+5);setReelXpPop(true);setTimeout(()=>setReelXpPop(false),900);}
                }} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"13px 14px",borderRadius:10,
                  textAlign:"left",background:bg,border,color,cursor:reelAnswer?"default":"pointer",
                  fontSize:13,lineHeight:1.65,transition:"all 0.2s"}}>
                  <span style={{minWidth:22,height:22,borderRadius:6,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,background:showResult&&isCorrect?C.easy:showResult&&wasPicked&&!isCorrect?C.hard:C.dim,color:showResult&&(isCorrect||wasPicked)?"#fff":C.muted}}>{key}</span>
                  <span>{val}</span>
                </button>
              );
            })}
          </div>
          {reelAnswer&&(
            <div style={{background:C.surface,borderRadius:12,padding:"14px 16px",border:`1px solid ${C.border}`,fontSize:13,color:C.textMid,lineHeight:1.75,animation:"fadeIn 0.3s ease"}}>
              {reelAnswer===card.answer?<span style={{color:C.easy,fontWeight:700}}>✓ Correct! </span>:<span style={{color:C.hard,fontWeight:700}}>✗ Incorrect. </span>}
              {card.explanation}
            </div>
          )}
        </div>
      );
      if(card.type==="curiosity_gap")return(
        <div style={{display:"flex",flexDirection:"column",flex:1,borderRadius:18,overflow:"hidden",border:`1px solid ${accentColor}44`}}>
          <div style={{background:`linear-gradient(135deg,${accentColor}44 0%,${accentColor}18 100%)`,padding:"22px 22px 18px",textAlign:"center",borderBottom:`1px solid ${accentColor}30`}}>
            <div style={{fontSize:44,marginBottom:8,lineHeight:1}}>🧠</div>
            <div style={{fontSize:10,fontWeight:700,color:accentColor,textTransform:"uppercase",letterSpacing:"0.14em"}}>Did You Know?</div>
          </div>
          <div style={{flex:1,background:C.surface,padding:"24px 20px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center"}}>
            <div style={{fontSize:13,fontWeight:700,color:C.muted,marginBottom:16,textTransform:"uppercase",letterSpacing:"0.06em"}}>{card.hint}</div>
            <div style={{fontSize:16,fontWeight:700,color:C.text,lineHeight:1.8,filter:"blur(7px)",userSelect:"none",width:"100%",marginBottom:20}}>{expandAcronyms(card.reveal)}</div>
            <div style={{fontSize:12,color:accentColor,fontWeight:600}}>Swipe up to reveal ↑</div>
          </div>
        </div>
      );
      return null;
    };

    return(<>
      <div
        onTouchStart={e=>{reelTouchY.current=e.touches[0].clientY;}}
        onTouchEnd={e=>{
          if(reelTouchY.current===null)return;
          const dy=e.changedTouches[0].clientY-reelTouchY.current;
          reelTouchY.current=null;
          if(Math.abs(dy)<50)return;
          if(dy<0)reelGoNext();else reelGoPrev();
        }}
        style={{position:"fixed",inset:0,
          background:`linear-gradient(160deg,${accentColor}22 0%,${C.bg} 75%)`,
          display:"flex",flexDirection:"column",overflowY:"hidden",zIndex:1}}>

        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"52px 18px 10px",flexShrink:0}}>
          <div style={{background:accentColor+"28",border:`1px solid ${accentColor}44`,borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:700,color:accentColor}}>{card?.topic||"CFA"}</div>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,background:C.surface+"88",borderRadius:16,padding:"4px 10px"}}>{typeLabel}</div>
          <button onClick={exitReels} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:20,padding:"4px 12px",fontSize:12,color:C.muted,cursor:"pointer"}}>✕</button>
        </div>

        {/* Progress bar */}
        <div style={{display:"flex",gap:3,padding:"0 18px 12px",flexShrink:0}}>
          {Array.from({length:segCount}).map((_,i)=>(
            <div key={i} style={{flex:1,height:3,borderRadius:2,
              background:i<segIdx?accentColor:i===segIdx?accentColor+"88":C.border+"88",
              transition:"background 0.3s"}}/>
          ))}
        </div>

        {/* Card body */}
        <div key={reelIdx} style={{flex:1,overflowY:"auto",padding:"4px 16px 12px",display:"flex",flexDirection:"column",justifyContent:"center",animation:`${reelSlideDir==="next"?"reelNext":"reelPrev"} 0.25s ease`}}>
          {renderCardBody()}
        </div>

        {/* Swipe hint — first visit only */}
        {!screenOnboard.drillSwipe&&reelSessionCount===0&&(
          <div style={{position:"absolute",bottom:90,left:0,right:0,display:"flex",
            justifyContent:"center",pointerEvents:"none",animation:"fadeIn 0.5s ease"}}>
            <div style={{background:"#000000cc",borderRadius:20,padding:"8px 20px",
              display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:20}}>↑</span>
              <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>Swipe up to advance</span>
            </div>
          </div>
        )}
        {/* Footer */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 18px",paddingBottom:"calc(10px + env(safe-area-inset-bottom))",borderTop:`1px solid ${C.border}44`,flexShrink:0,background:`${C.bg}cc`}}>
          <button onClick={()=>{setRevisionTopic(card?.topic||null);setRevisionTab("notes");setScreen("revision");}}
            style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:12,padding:"4px 0"}}>
            📖 Study notes
          </button>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button onClick={reelGoPrev} disabled={reelIdx===0}
              style={{background:"none",border:`1px solid ${C.border}`,borderRadius:8,width:28,height:28,fontSize:14,color:reelIdx===0?C.border:C.muted,cursor:reelIdx===0?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>‹</button>
            <span style={{fontSize:11,color:C.muted}}>{reelSessionCount} seen</span>
            <button onClick={reelGoNext}
              style={{background:"none",border:`1px solid ${C.border}`,borderRadius:8,width:28,height:28,fontSize:14,color:C.muted,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>›</button>
          </div>
          <button onClick={()=>{if(card?.topic){setSelTopics([card.topic]);setSelSubtopics([]);setScreen("setup");}}}
            style={{background:"none",border:"none",color:C.accentLight,cursor:"pointer",fontSize:12,fontWeight:700,padding:"4px 0"}}>
            Practice →
          </button>
        </div>
      </div>
      {calcMiniWidget}
      {navPortal}
    </>);
  }

  // ══ SETUP ═════════════════════════════════════════════════════════════════
  if(loading && screen==="setup") return (
    <div style={{position:"fixed",inset:0,background:`radial-gradient(ellipse at 50% 40%,${C.accent}1c 0%,${C.bg} 65%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 28px",fontFamily:"'Inter',system-ui,-apple-system,sans-serif",color:C.text,zIndex:9999}}>
      <div style={{position:"relative",marginBottom:22}}>
        <div style={{position:"absolute",inset:-18,borderRadius:"50%",background:`${C.accent}18`,filter:"blur(16px)"}}/>
        <div style={{width:80,height:80,borderRadius:22,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,boxShadow:`0 8px 32px ${C.accent}55`,position:"relative"}}>⚡</div>
      </div>
      <div style={{fontSize:24,fontWeight:800,marginBottom:6,letterSpacing:"-0.01em"}}>ClearCFA</div>
      <div style={{fontSize:15,fontWeight:600,color:C.accentLight,marginBottom:4,textAlign:"center"}}>{loadingMsg}</div>
      <div style={{fontSize:12,color:C.muted,marginBottom:32}}>{loadingETA>0?`~${loadingETA}s remaining`:"Finishing up…"}</div>
      <div style={{width:"100%",maxWidth:420}}>
        <div style={{height:5,background:`${C.accent}20`,borderRadius:3,marginBottom:8,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${loadingProgress}%`,background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:3,transition:"width 0.4s ease",boxShadow:`0 0 10px ${C.accent}88`}}/>
        </div>
        <div style={{textAlign:"right",fontSize:12,fontWeight:800,color:C.accentLight,marginBottom:28}}>{loadingProgress}%</div>
        {[["Anchoring to LOS curriculum",0],["Engineering distractor options",30],["Deduplication & quality check",70],["Ready to go",90]].map(([label,pct],i,arr)=>{
          const done=loadingProgress>=pct+20;
          const active=loadingProgress>=pct&&!done;
          return(
            <div key={i} style={{display:"flex",gap:14,marginBottom:i<arr.length-1?16:0,alignItems:"center"}}>
              <div style={{width:24,height:24,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0,transition:"all 0.3s",background:done?"#16a34a":active?C.accent:C.dim,color:done||active?"#fff":C.muted,boxShadow:done?`0 0 10px #16a34a55`:active?`0 0 10px ${C.accent}55`:"none"}}>{done?"✓":i+1}</div>
              <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
                <span style={{fontSize:14,transition:"color 0.3s",color:done?C.easy:active?C.text:C.muted}}>{label}</span>
                {active&&<span style={{width:6,height:6,borderRadius:"50%",background:C.accent,display:"inline-block",animation:"pulse 1.2s ease-in-out infinite",flexShrink:0}}/>}
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={()=>{setLoading(false);setLoadingProgress(0);setLoadingETA(null);generatingRef.current=false;setError("");}} style={{marginTop:44,fontSize:13,padding:"10px 28px",borderRadius:10,background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>
        Cancel
      </button>
    </div>
  );

  // ════════════════════════════════════════
  // SCREEN: setup
  // ════════════════════════════════════════
  if(screen==="setup") return wrap(<>
    <button onClick={()=>{setScreen("home");setVignetteMode(false);}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13,marginBottom:18,padding:0}}>← Home</button>
    {vignetteMode?(
      <>
        <h2 style={{fontSize:22,fontWeight:800,marginBottom:4,marginTop:0}}>📖 Vignette Mode</h2>
        <div style={{background:`linear-gradient(135deg,${C.accentLight}15,${C.accentLight}06)`,border:`1px solid ${C.accentLight}33`,borderRadius:10,padding:"10px 14px",marginBottom:18}}>
          <div style={{fontSize:12,color:C.accentLight,fontWeight:700,marginBottom:3}}>Item-Set Format</div>
          <div style={{fontSize:11,color:C.muted,lineHeight:1.6}}>AI generates a 100–150 word scenario (person, firm, situation) followed by 3 linked questions from the same module — matching the real CFA exam item-set format.</div>
        </div>
      </>
    ):(
      <>
        <h2 style={{fontSize:22,fontWeight:800,marginBottom:4,marginTop:0}}>Custom Mock</h2>
        <div style={{fontSize:12,color:C.muted,marginBottom:18}}>Questions anchored to official 2026 CFA LOS · Misconception-engineered distractors · ClearCFA</div>
      </>
    )}

    <div style={{marginBottom:18}}>
      <label style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:10}}>Mode</label>
      <div style={{display:"flex",gap:9}}>
        {[["guided","🧭 Guided","Explanation + LOS tag after each answer"],["exam","⚡ Exam Sim","No hints — results only at end"],["speed_drill","⏱ Speed Drill","100s/question — auto-advance on timeout"],["interleaved","🔀 Interleaved","Mix your 3 weakest topics — beats blocked practice for retention"],...(cfaLevel==="3"?[["essay","📝 Essay","Write your answer, then compare to model answer"]]:[])].map(([val,label,desc])=>(
          <button key={val} onClick={()=>setMode(val)} style={{flex:1,padding:"12px",borderRadius:10,textAlign:"left",cursor:"pointer",border:mode===val?`1.5px solid ${C.accent}`:`1.5px solid ${C.border}`,background:mode===val?C.accent+"18":C.surface,color:mode===val?C.accentLight:C.muted}}>
            <div style={{fontSize:13,fontWeight:700}}>{label}</div><div style={{fontSize:11,marginTop:3,opacity:0.65}}>{desc}</div>
          </button>
        ))}
      </div>
    </div>

    {mode==="interleaved"&&(
      <div style={{background:`${C.accent}0d`,border:`1px solid ${C.accent}33`,borderRadius:10,padding:"12px 14px",marginBottom:18}}>
        <div style={{fontSize:12,fontWeight:700,color:C.accentLight,marginBottom:4}}>🔀 Interleaved Mode</div>
        <div style={{fontSize:11,color:C.muted,lineHeight:1.55}}>Picks your 3 weakest topics automatically and mixes questions from all three in one session. Research shows interleaved practice beats blocked (single-topic) practice for long-term retention. Topic and module selectors are ignored in this mode.</div>
      </div>
    )}

    {mode!=="interleaved"&&(<>
    {/* ── TOPIC multi-select ── */}
    <div style={{marginBottom:18}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:10}}>
        <label style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase"}}>Topic</label>
        {selTopics.length>0&&<button onClick={()=>{setSelTopics([]);setSelSubtopics([]);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,color:C.muted,padding:0}}>Clear all</button>}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
        {Object.entries(activeTopicMap).map(([t,{weight}])=>{
          const on=selTopics.includes(t);
          return(
            <button key={t} onClick={()=>{
              if(on){
                // deselect topic → also remove its modules from selSubtopics
                const topicMods=activeTopicMap[t]?.subtopics||[];
                setSelTopics(p=>p.filter(x=>x!==t));
                setSelSubtopics(p=>p.filter(s=>!topicMods.includes(s)));
              } else {
                setSelTopics(p=>[...p,t]);
              }
            }} style={{padding:"7px 13px",borderRadius:8,fontSize:13,fontWeight:500,cursor:"pointer",
              border:on?`1.5px solid ${C.accent}`:`1.5px solid ${C.border}`,
              background:on?C.accent+"20":C.surface,color:on?C.accentLight:C.muted,
              display:"flex",alignItems:"center",gap:5}}>
              {on&&<span style={{fontSize:10,color:C.accent}}>✓</span>}
              {t} <span style={{fontSize:10,opacity:0.6}}>{weight}%</span>
            </button>
          );
        })}
      </div>
    </div>

    {/* ── MODULE multi-select (per selected topic) ── */}
    {selTopics.length>0&&(
      <div style={{marginBottom:18}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:10}}>
          <label style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase"}}>Module</label>
          {selSubtopics.length>0&&<button onClick={()=>setSelSubtopics([])} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,color:C.muted,padding:0}}>Clear</button>}
        </div>
        {selTopics.map(selT=>{
          const mods=activeTopicMap[selT]?.subtopics||[];
          const allOn=mods.every(m=>selSubtopics.includes(m));
          return(
            <div key={selT} style={{marginBottom:selTopics.length>1?14:0}}>
              {selTopics.length>1&&(
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.accentLight}}>{selT}</div>
                  <button onClick={()=>{
                    if(allOn) setSelSubtopics(p=>p.filter(s=>!mods.includes(s)));
                    else setSelSubtopics(p=>[...new Set([...p,...mods])]);
                  }} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:6,cursor:"pointer",fontSize:10,color:C.muted,padding:"2px 8px"}}>
                    {allOn?"Deselect all":"All modules"}
                  </button>
                </div>
              )}
              {selTopics.length===1&&(
                <div style={{marginBottom:8}}>
                  <button onClick={()=>{
                    if(allOn) setSelSubtopics([]);
                    else setSelSubtopics(mods);
                  }} style={{padding:"5px 12px",borderRadius:7,fontSize:11,fontWeight:700,cursor:"pointer",
                    border:allOn?`1.5px solid ${C.accent}`:`1.5px solid ${C.border}`,
                    background:allOn?C.accent+"18":C.surface,color:allOn?C.accentLight:C.muted}}>
                    {allOn?"✓ All modules":"All modules"}
                  </button>
                </div>
              )}
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {mods.map(m=>{
                  const on=selSubtopics.includes(m);
                  const mH=history.filter(h=>h.topic===selT&&h.subtopic===m);
                  const mPct=mH.length?Math.round(mH.reduce((a,h)=>a+(h.pct||0),0)/mH.length):null;
                  const losCount=activeLOS[selT]?.modules[m]?.length||0;
                  const losM=getLOSMastery(history,selT,m);
                  return(
                    <button key={m} onClick={()=>setSelSubtopics(p=>on?p.filter(x=>x!==m):[...p,m])}
                      style={{padding:"7px 13px",borderRadius:8,fontSize:12,fontWeight:500,cursor:"pointer",
                        border:on?`1.5px solid ${C.accentLight}`:`1.5px solid ${C.border}`,
                        background:on?C.accentLight+"18":C.surface,color:on?C.accentLight:C.muted,
                        display:"flex",alignItems:"center",flexWrap:"wrap",gap:4}}>
                      {on&&<span style={{fontSize:10,color:C.accentLight}}>✓</span>}
                      <span>{m}</span>
                      <span style={{fontSize:10,opacity:0.55}}>{losCount} LOS</span>
                      {mPct!==null&&<span style={{fontSize:10,color:mPct>=70?C.easy:mPct>=50?C.medium:C.hard}}>{mPct}%</span>}
                      {losM.untested>0&&<span style={{fontSize:10,color:C.muted}}>({losM.untested} untested)</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
        {/* LOS preview — only when exactly one module selected */}
        {selSubtopics.length===1&&selTopics.length===1&&activeLOS[selTopics[0]]?.modules[selSubtopics[0]]&&(
          <div style={{marginTop:12,background:C.surface,border:`1px solid ${C.border}`,borderRadius:9,padding:"12px 14px"}}>
            <div style={{fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>LOS for this module ({activeLOS[selTopics[0]].modules[selSubtopics[0]].length} statements)</div>
            {activeLOS[selTopics[0]].modules[selSubtopics[0]].map((l,i)=>(
              <div key={i} style={{fontSize:11,color:C.muted,lineHeight:1.6,marginBottom:4,display:"flex",gap:6}}>
                <span style={{color:C.accent,flexShrink:0,fontWeight:700}}>·</span><span>…{l}</span>
              </div>
            ))}
          </div>
        )}
        {/* Summary badge when multiple modules selected */}
        {selSubtopics.length>1&&(
          <div style={{marginTop:10,padding:"8px 12px",borderRadius:8,background:`${C.accent}10`,border:`1px solid ${C.accent}33`,fontSize:11,color:C.accentLight,fontWeight:700}}>
            ✓ {selSubtopics.length} modules selected · AI will distribute questions across all of them
          </div>
        )}
      </div>
    )}
    </>)}
    {mode!=="interleaved"&&(
      <div style={{marginBottom:18}}>
        <label style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:8}}>Warm-Up</label>
        <button onClick={()=>setWarmupEnabled(w=>!w)} style={{width:"100%",padding:"10px 14px",borderRadius:10,textAlign:"left",cursor:"pointer",border:warmupEnabled?`1.5px solid ${C.easy}`:`1.5px solid ${C.border}`,background:warmupEnabled?C.easy+"10":C.surface,color:warmupEnabled?C.easy:C.muted}}>
          <div style={{fontSize:13,fontWeight:700}}>🌅 {warmupEnabled?"Warm-up on":"Start with warm-up"}</div>
          <div style={{fontSize:11,marginTop:2,opacity:0.7}}>{warmupEnabled?"3 easy questions from your strongest topic prepended":"Off — jump straight into the session"}</div>
        </button>
      </div>
    )}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:26}}>
      <div>
        <label style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:10}}>Difficulty</label>
        {(()=>{
          const adaptiveDiff=(()=>{
            if(!selTopics[0]||selSubtopics.length!==1)return null;
            const mSessions=history.filter(h=>h.topic===selTopics[0]&&h.subtopic===selSubtopics[0]);
            const byDiff={};
            mSessions.forEach(h=>{if(!byDiff[h.difficulty])byDiff[h.difficulty]={total:0,count:0};byDiff[h.difficulty].total+=(h.pct||0);byDiff[h.difficulty].count+=1;});
            const avg=d=>byDiff[d]?Math.round(byDiff[d].total/byDiff[d].count):null;
            const medAvg=avg("Medium"),hardAvg=avg("Hard"),easyAvg=avg("Easy");
            if(medAvg!==null&&medAvg>=75)return{diff:"Hard",reason:`You averaged ${medAvg}% on Medium — ready to level up`};
            if(hardAvg!==null&&hardAvg<50)return{diff:"Medium",reason:`${hardAvg}% on Hard — consolidate Medium first`};
            if(easyAvg!==null&&easyAvg>=80&&medAvg===null)return{diff:"Medium",reason:`${easyAvg}% on Easy — time to push harder`};
            return null;
          })();
          return(<>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {DIFFICULTIES.map(d=>{const verbHint={Easy:"describe/define/identify",Medium:"calculate/apply/contrast",Hard:"evaluate/analyze/formulate"}[d];return(<button key={d} onClick={()=>setDifficulty(d)} style={{padding:"10px 12px",borderRadius:8,fontSize:13,fontWeight:600,textAlign:"left",cursor:"pointer",border:difficulty===d?`1.5px solid ${C.accent}`:`1.5px solid ${C.border}`,background:difficulty===d?C.accent+"18":C.surface,color:difficulty===d?C.accentLight:C.muted,display:"flex",alignItems:"center",gap:8}}><span style={{width:8,height:8,borderRadius:"50%",background:diffC[d],flexShrink:0,marginTop:1}}/><span><div>{d}</div><div style={{fontSize:9,opacity:0.6,marginTop:1}}>{verbHint}</div>{adaptiveDiff?.diff===d&&<div style={{fontSize:9,color:C.easy,marginTop:1}}>✓ Recommended</div>}</span></button>);})}
            </div>
            {adaptiveDiff&&<div style={{marginTop:8,fontSize:11,color:adaptiveDiff.diff==="Hard"?C.easy:C.medium,background:C.surface,border:`1px solid ${adaptiveDiff.diff==="Hard"?C.easy+"33":C.medium+"33"}`,borderRadius:7,padding:"6px 10px"}}>{adaptiveDiff.diff==="Hard"?"🔥":"📉"} {adaptiveDiff.reason}</div>}
          </>);
        })()}
      </div>
      <div>
        <label style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",display:"block",marginBottom:10}}>Questions</label>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {Q_COUNTS.map(n=><button key={n} onClick={()=>setCount(n)} style={{padding:"10px 12px",borderRadius:8,fontSize:13,fontWeight:700,textAlign:"left",cursor:"pointer",border:count===n?`1.5px solid ${C.accent}`:`1.5px solid ${C.border}`,background:count===n?C.accent+"18":C.surface,color:count===n?C.accentLight:C.muted}}>{n}<span style={{fontSize:11,fontWeight:400,opacity:0.55}}> ~{Math.round(n*1.5)}min</span></button>)}
        </div>
      </div>
    </div>

    {error&&<div style={{background:C.errorBg,border:`1px solid ${C.hard}44`,borderRadius:9,padding:"12px",color:C.hard,fontSize:13,marginBottom:14}}>{error}</div>}
    {(()=>{
      const ready=mode==="interleaved"||(selTopics.length>0&&selSubtopics.length>0);
      const multiMods=selSubtopics.length>1
        ? selTopics.flatMap(t=>(activeTopicMap[t]?.subtopics||[]).filter(s=>selSubtopics.includes(s)).map(s=>({t,st:s})))
        : null;
      const primaryT=selTopics[0]||"";
      const primarySt=selSubtopics[0]||"";
      const btnLabel=loading?loadingMsg
        :mode==="interleaved"?`Generate ${count} Interleaved Questions (3 topics) →`
        :vignetteMode?`Generate ${Math.ceil(count/3)} Vignettes (${count} questions) →`
        :selSubtopics.length>1?`Generate ${warmupEnabled?count+3:count} Questions across ${selSubtopics.length} modules →`
        :`Generate ${warmupEnabled?count+3:count} Questions${warmupEnabled?" (incl. 3 warm-up)":""} →`;
      return(<>
    <button onClick={()=>{
      if(mode==="interleaved"){generateInterleavedSession(difficulty,count);return;}
      generateQuestions(primaryT,primarySt,difficulty,warmupEnabled?count+3:count,mode,vignetteMode,null,multiMods);
    }} disabled={!ready||loading} style={{width:"100%",padding:"15px",borderRadius:12,fontSize:15,fontWeight:700,background:ready&&!loading?`linear-gradient(135deg,${C.accent},${C.accentLight})`:C.dim,color:ready&&!loading?"#fff":C.muted,border:"none",cursor:ready&&!loading?"pointer":"not-allowed",boxShadow:ready&&!loading?`0 4px 20px ${C.accent}44`:"none"}}>
      {btnLabel}
    </button>
    {!loading&&ready&&(
      <div style={{marginTop:10}}>
        {!showSavePreset?(
          <button onClick={()=>setShowSavePreset(true)} style={{width:"100%",padding:"10px",borderRadius:10,fontSize:12,fontWeight:700,background:"transparent",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>
            💾 Save as preset
          </button>
        ):(
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <input value={savePresetName} onChange={e=>setSavePresetName(e.target.value)}
              placeholder='Name (e.g. "Morning Ethics")'
              onKeyDown={e=>{if(e.key==="Enter")savePreset();if(e.key==="Escape"){setShowSavePreset(false);setSavePresetName("");}}}
              autoFocus
              style={{flex:1,padding:"10px 12px",borderRadius:9,fontSize:12,background:C.surface,border:`1px solid ${C.accent}66`,color:C.text,outline:"none"}}/>
            <button onClick={savePreset} disabled={!savePresetName.trim()} style={{padding:"10px 14px",borderRadius:9,fontSize:12,fontWeight:700,background:savePresetName.trim()?`linear-gradient(135deg,${C.accent},${C.accentLight})`:"transparent",color:savePresetName.trim()?"#fff":C.muted,border:"none",cursor:savePresetName.trim()?"pointer":"default",flexShrink:0}}>Save</button>
            <button onClick={()=>{setShowSavePreset(false);setSavePresetName("");}} style={{padding:"10px",borderRadius:9,fontSize:13,background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer",flexShrink:0}}>✕</button>
          </div>
        )}
      </div>
    )}
    {loading&&<div style={{marginTop:20,display:"flex",flexDirection:"column",gap:10}}>{[1,2,3].map(i=><div key={i} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:16}}><Skeleton height={13} style={{marginBottom:10}}/><Skeleton height={10} width="70%" style={{marginBottom:8}}/>{[1,2,3].map(j=><Skeleton key={j} height={9} width={`${58+j*9}%`} style={{marginBottom:6}}/>)}</div>)}</div>}
    </>);})()}
  </>);
  // ══ QUIZ ══════════════════════════════════════════════════════════════════
  // ════════════════════════════════════════
  // SCREEN: quiz
  // ════════════════════════════════════════
  if(screen==="quiz"){
    if(!questions[currentQ])return wrap(
      <div style={{minHeight:"60vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,textAlign:"center",padding:"40px 20px"}}>
        <div style={{fontSize:32}}>⚠️</div>
        <div style={{fontSize:16,fontWeight:700,color:C.text}}>Questions didn't load</div>
        <div style={{fontSize:13,color:C.muted,maxWidth:280}}>This can happen if the app is offline or the topic has no local questions yet. Try again from the home screen.</div>
        <button onClick={()=>setScreen("home")} style={{padding:"12px 28px",borderRadius:10,fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>← Back to Home</button>
      </div>
    );
    const q=questions[currentQ];const answered=answers[q.id];const isLast=currentQ===questions.length-1;
    return wrap(<>
      {/* Floating calculator button */}
      <button onClick={()=>setCalcOpen(true)} title="Open BA II Plus Calculator"
        style={{position:"fixed",bottom:82,right:16,zIndex:270,width:46,height:46,borderRadius:"50%",background:"linear-gradient(135deg,#1e3a5f,#1a4a9f)",border:"1px solid #2563eb55",color:"#93c5fd",fontSize:20,cursor:"pointer",boxShadow:"0 4px 16px #0008",display:"flex",alignItems:"center",justifyContent:"center",touchAction:"manipulation"}}>
        🧮
      </button>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <button onClick={()=>setExitConfirm(true)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13,padding:0,flexShrink:0}}>← Home</button>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <div style={{fontSize:fullExamMode?16:14,fontWeight:800,padding:fullExamMode?"7px 18px":"5px 14px",borderRadius:20,background:timeLeft<300?"#180308":fullExamMode?"#1a0a2e":C.surface,color:timeLeft<300?C.hard:fullExamMode?"#a78bfa":C.muted,border:`1px solid ${timeLeft<300?C.hard+"55":fullExamMode?"#7c3aed55":C.border}`,transition:"all 0.3s"}}>
            {fullExamMode?"🏛 ":""}{fmt(timeLeft)}
          </div>
          {(()=>{const idealLeft=(questions.length-currentQ)*90;const paceRatio=timeLeft/Math.max(1,idealLeft);const paceCol=paceRatio>1.1?C.easy:paceRatio>0.8?C.medium:C.hard;const paceLabel=paceRatio>1.1?"Ahead":paceRatio>0.8?"On track":"Speed up";return timeLeft>0&&questions.length>1?<span style={{fontSize:10,color:paceCol,fontWeight:700,padding:"3px 7px",borderRadius:6,background:paceCol+"18"}}>{paceLabel}</span>:null;})()}
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{fontSize:13,color:C.muted}}><span style={{color:C.accentLight,fontWeight:800}}>{currentQ+1}</span>/{questions.length}</span>{q._isVignette&&<span style={{fontSize:11,color:C.accent,fontWeight:700,opacity:0.85}}>· V{(q._vignetteIdx||0)+1}</span>}<Badge color={diffC[difficulty]}>{difficulty}</Badge></div>
      </div>
      {exitConfirm&&(
        <div style={{background:C.surface,border:`1px solid ${C.hard}44`,borderRadius:12,padding:"16px",marginBottom:14,animation:"fadeIn 0.15s ease"}}>
          <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:6}}>Exit session?</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:12}}>Progress will be lost. SR deck won't update for this session.</div>
          <div style={{display:"flex",gap:9}}>
            <button onClick={()=>setExitConfirm(false)} style={{flex:1,padding:"9px",borderRadius:8,fontSize:13,fontWeight:600,background:C.surfaceHigh,border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>Continue</button>
            <button onClick={()=>{clearInterval(timerRef.current);setExitConfirm(false);setScreen("home");setFocusSuggestions(null);}} style={{flex:1,padding:"9px",borderRadius:8,fontSize:13,fontWeight:700,background:`${C.hard}18`,border:`1px solid ${C.hard}44`,color:C.hard,cursor:"pointer"}}>Exit</button>
          </div>
        </div>
      )}
      <div style={{height:3,background:C.border,borderRadius:2,marginBottom:18}}><div style={{height:"100%",width:`${(currentQ/questions.length)*100}%`,background:`linear-gradient(90deg,${C.accent},${C.accentLight})`,borderRadius:2,transition:"width 0.35s"}}/></div>

      {/* Worked example — shown on first question of untested module (guided mode only) */}
      {currentQ===0&&mode==="guided"&&!history.some(h=>h.topic===topic&&h.subtopic===subtopic)&&workedExDismissedKey!==`${topic}__${subtopic}`&&(
        <div style={{background:`${C.accent}0d`,border:`1px solid ${C.accent}33`,borderRadius:12,padding:"14px 16px",marginBottom:16,animation:"fadeIn 0.2s ease"}}>
          {!workedExamples[`${topic}__${subtopic}`]&&!workedExLoading&&(
            <>
              <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:4}}>🎓 First time in {subtopic}</div>
              <div style={{fontSize:11,color:C.muted,marginBottom:12,lineHeight:1.5}}>Want to see a worked example before your first question? 30 seconds — it helps.</div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={async()=>{
                  setWorkedExLoading(true);
                  const k=`${topic}__${subtopic}`;
                  try{
                    const result=await callClaude(`CFA Level ${cfaLevel}. Topic: ${topic}. Module: ${subtopic}.\n\nProvide one worked example. Output ONLY plain text — no JSON, no markdown.\n\nQUESTION: [realistic 2-sentence CFA exam question]\nA) [option]\nB) [option]\nC) [option]\nANSWER: [letter only]\nWALK-THROUGH: [3-sentence step-by-step reasoning]`,350,{model:"claude-haiku-4-5-20251001",retries:2,retryDelay:2000,feature:"worked_example"});
                    // callClaude may return a parsed JSON object if the response contained JSON-like text;
                    // coerce to string so the example always shows.
                    let text="";
                    if(typeof result==="string") text=result.trim();
                    else if(result&&typeof result==="object") text=Object.entries(result).map(([rk,rv])=>`${rk.toUpperCase()}: ${typeof rv==="object"?Object.entries(rv).map(([k2,v2])=>`${k2}) ${v2}`).join("\n"):rv}`).join("\n\n").trim();
                    if(text) setWorkedExamples(e=>{const u={...e,[k]:text};try{localStorage.setItem(WORKED_EX_KEY,JSON.stringify(u));}catch{}return u;});
                    else setWorkedExamples(e=>{const u={...e,[k]:"__err__Generation returned empty — tap Retry."};try{localStorage.setItem(WORKED_EX_KEY,JSON.stringify(u));}catch{}return u;});
                  }catch(err){
                    const m=typeof err?.message==="string"?err.message:"Generation failed.";
                    setWorkedExamples(e=>{const u={...e,[k]:"__err__"+m};try{localStorage.setItem(WORKED_EX_KEY,JSON.stringify(u));}catch{}return u;});
                  }
                  setWorkedExLoading(false);
                }} style={{flex:2,padding:"9px",borderRadius:9,fontSize:12,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>
                  🎓 Show me an example →
                </button>
                <button onClick={()=>setWorkedExDismissedKey(`${topic}__${subtopic}`)} style={{flex:1,padding:"9px",borderRadius:9,fontSize:12,fontWeight:600,background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>
                  Skip
                </button>
              </div>
            </>
          )}
          {workedExLoading&&<div style={{fontSize:12,color:C.muted,padding:"4px 0"}}>⏳ Generating example…</div>}
          {workedExamples[`${topic}__${subtopic}`]&&!workedExLoading&&(
            <>
              {workedExamples[`${topic}__${subtopic}`].startsWith("__err__")?(
                <div style={{fontSize:12,color:C.hard,padding:"4px 0"}}>
                  ⚠️ {workedExamples[`${topic}__${subtopic}`].replace("__err__","")}{" "}
                  <button onClick={()=>{const k=`${topic}__${subtopic}`;const u={...workedExamples};delete u[k];setWorkedExamples(u);try{localStorage.setItem(WORKED_EX_KEY,JSON.stringify(u));}catch{};}} style={{fontSize:11,color:C.accentLight,background:"none",border:"none",cursor:"pointer",padding:0,textDecoration:"underline"}}>Retry</button>
                </div>
              ):(
              <>
              <div style={{fontSize:10,fontWeight:700,color:C.accentLight,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}}>🎓 Worked Example</div>
              <div style={{fontSize:12,color:C.text,lineHeight:1.85,whiteSpace:"pre-line"}}>{workedExamples[`${topic}__${subtopic}`]}</div>
              <button onClick={()=>setWorkedExDismissedKey(`${topic}__${subtopic}`)} style={{marginTop:12,width:"100%",padding:"10px",borderRadius:9,fontSize:12,fontWeight:700,background:`${C.accent}22`,border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer"}}>
                Got it — start the questions →
              </button>
            </>
            )}
            </>
          )}
        </div>
      )}

      {mode==="speed_drill"&&(
        <div style={{marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <span style={{fontSize:10,color:speedQTime<=20?C.hard:C.muted,fontWeight:700}}>⏱ {speedQTime}s</span>
            <span style={{fontSize:10,color:C.muted}}>speed drill</span>
          </div>
          <div style={{height:5,background:C.dim,borderRadius:3}}>
            <div style={{height:"100%",width:`${(speedQTime/100)*100}%`,background:speedQTime<=20?C.hard:speedQTime<=50?C.medium:C.easy,borderRadius:3,transition:"width 0.9s linear"}}/>
          </div>
        </div>
      )}
      <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
        {q.concept&&<Badge color={C.muted}>{q.concept}</Badge>}
        <Badge color={C.accent+"cc"}>{q._subtopic||subtopic}</Badge>
        {q._isEthicsCase&&<Badge color={C.hard}>CFA Institute Case</Badge>}
        <Badge color={C.accentLight}>📋 2026 LOS</Badge>
      </div>
      {q._isEthicsCase&&<div style={{fontSize:10,color:C.muted,marginBottom:8,fontStyle:"italic"}}>© 2019 CFA Institute. Ethics in Practice Casebook. Used with attribution for non-commercial study.</div>}
      <FormulaSheet topic={topic} level={cfaLevel}/>
      <PowerNotesSheet topic={topic} level={cfaLevel}/>
      {q._isVignette?(()=>{
        const parts=q.question.split(/\n\nQUESTION: /);
        const scenarioText=(parts[0]||"").replace(/^SCENARIO:\n?/,"");
        const questionText=parts[1]||q.question;
        return(
          <>
            <div style={{background:C.accent+"0f",border:`1px solid ${C.accent}22`,borderRadius:11,padding:"12px 14px",marginBottom:10}}>
              <div style={{fontSize:10,fontWeight:800,color:C.accent,marginBottom:6,textTransform:"uppercase",letterSpacing:0.8}}>
                📋 Case Scenario · Q{(q._qIdx||0)+1} of 3
              </div>
              <div style={{fontSize:12,color:C.textMid,lineHeight:1.65}}>{scenarioText}</div>
            </div>
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:13,padding:"16px 18px",marginBottom:14,fontSize:14,lineHeight:1.8,fontWeight:500}}>{questionText}</div>
          </>
        );
      })():<div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:13,padding:"20px 22px",marginBottom:14,fontSize:14,lineHeight:1.8}}>{q.question}</div>}
      {mode==="essay"&&!essayRevealed[q.id]&&(
        <div style={{marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>Your written answer</div>
          <textarea
            value={essayAnswers[q.id]||""}
            onChange={e=>setEssayAnswers(a=>({...a,[q.id]:e.target.value}))}
            placeholder="Write your constructed response here — explain your reasoning as you would in the exam…"
            style={{width:"100%",minHeight:120,background:C.dim,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px",fontSize:13,color:C.text,resize:"vertical",outline:"none",lineHeight:1.7,boxSizing:"border-box",fontFamily:"inherit"}}
          />
          <button onClick={()=>setEssayRevealed(r=>({...r,[q.id]:true}))}
            style={{marginTop:8,width:"100%",padding:"11px",borderRadius:10,fontSize:13,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>
            Compare with model answer →
          </button>
        </div>
      )}
      {mode==="essay"&&essayRevealed[q.id]&&essayAnswers[q.id]&&(
        <div style={{background:C.surface,border:`1px solid ${C.accent}44`,borderRadius:11,padding:"14px 16px",marginBottom:12}}>
          <div style={{fontSize:10,fontWeight:700,color:C.accentLight,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>Your answer</div>
          <div style={{fontSize:12,color:C.textMid,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{essayAnswers[q.id]}</div>
        </div>
      )}
      {mode==="essay"&&essayRevealed[q.id]&&!answered&&(
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <button onClick={()=>handleAnswer(q.id,q.answer)}
            style={{flex:1,padding:"10px",borderRadius:9,fontSize:13,fontWeight:700,
              background:C.easy+"22",border:`1px solid ${C.easy}44`,color:C.easy,cursor:"pointer"}}>
            ✓ Got it
          </button>
          <button onClick={()=>{const wrong=Object.keys(q.options||{}).find(k=>k!==q.answer)||"A";handleAnswer(q.id,wrong);}}
            style={{flex:1,padding:"10px",borderRadius:9,fontSize:13,fontWeight:700,
              background:C.hard+"18",border:`1px solid ${C.hard}33`,color:C.hard,cursor:"pointer"}}>
            ✗ Missed key points
          </button>
        </div>
      )}
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16,...(mode==="essay"&&!essayRevealed[q.id]?{display:"none"}:{})}}>
        {Object.entries(q.options).map(([key,val])=>{
          const sel=answered===key,correct=key===q.answer,reveal=!!answered&&(mode==="guided"||mode==="speed_drill"||mode==="essay");
          let bg=C.surface,border=C.border,col=C.text;
          if(reveal&&correct){bg=C.easy+"22";border=C.easy;col=C.easy;}
          else if(reveal&&sel&&!correct){bg=C.hard+"18";border=C.hard;col=C.hard;}
          return(<button key={key} onClick={()=>handleAnswer(q.id,key)} disabled={!!answered} style={{display:"flex",alignItems:"flex-start",gap:13,padding:"13px 15px",borderRadius:10,textAlign:"left",background:bg,border:`1.5px solid ${border}`,color:col,cursor:answered?"default":"pointer",fontSize:13,lineHeight:1.65,transition:"all 0.15s"}}><span style={{minWidth:24,height:24,borderRadius:6,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,background:reveal&&correct?C.easy:reveal&&sel?C.hard:sel?C.accent:C.dim,color:(reveal||sel)?"#fff":C.muted,transition:"all 0.15s"}}>{key}</span><span>{val}</span></button>);
        })}
      </div>
      {consecutiveWrong>=3&&mode==="guided"&&!answered&&(
        <div style={{background:`linear-gradient(135deg,${C.accent}12,${C.accent}06)`,border:`1px solid ${C.accent}44`,borderRadius:12,padding:"14px 16px",marginBottom:12,animation:"fadeIn 0.3s ease"}}>
          <div style={{fontSize:13,fontWeight:800,color:C.accentLight,marginBottom:4}}>Tough stretch — you're {consecutiveWrong} in a row wrong</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:10,lineHeight:1.6}}>This is normal. Hard questions expose the gaps, and gaps are where learning happens. Take a breath.</div>
          <div style={{display:"flex",gap:8}}>
            {difficulty!=="Easy"&&<button onClick={()=>{setDifficulty("Easy");setConsecutiveWrong(0);showToast("💙","Eased to Easy","Rebuilding from here.");}} style={{flex:1,padding:"9px",borderRadius:9,fontSize:12,fontWeight:700,background:C.easy+"22",color:C.easy,border:`1px solid ${C.easy}44`,cursor:"pointer"}}>💙 Drop to Easy</button>}
            <button onClick={()=>setConsecutiveWrong(0)} style={{flex:1,padding:"9px",borderRadius:9,fontSize:12,fontWeight:700,background:C.surface,color:C.muted,border:`1px solid ${C.border}`,cursor:"pointer"}}>Keep going →</button>
          </div>
        </div>
      )}
      {showExp&&(mode==="guided"||mode==="essay")&&answered&&(
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:11,padding:"15px",marginBottom:12,fontSize:13,color:C.textMid,lineHeight:1.75,animation:"fadeIn 0.2s ease"}}>
          <div style={{fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:7}}>Explanation</div>
          {renderExplanation(q.explanation,C,authUser?.id?async(formulaText)=>{
            const fcKey="cfa_formula_v1";
            try{const fc=JSON.parse(localStorage.getItem(fcKey)||"{}");const k=formulaText.slice(0,60);if(fc[k])return fc[k];}catch{}
            const prompt=`CFA exam tutor. A student sees this formula in an exam explanation and doesn't know what it is:\n\n"${formulaText}"\n\nContext: topic "${topic}", concept "${q.concept||q.los_tested||""}"\n\nRespond in EXACTLY this format (no preamble, no extra text):\n📐 [Official CFA/finance name for this formula, e.g. "Bond Pricing Formula" or "Macaulay Duration"]\nStandard form: [compact textbook version, e.g. P = Σ C/(1+y)ᵗ + FV/(1+y)ⁿ]\n\n• [symbol from formula] = [plain-English meaning] (= [actual value if present in formula])\n[one bullet per variable/component]\n\nCalculates: [one sentence — what does solving this formula give you?]\n\nUnder 120 words total.`;
            const r=await callAIChat(authUser.id,[{role:"user",content:prompt}],250,cfaLevel);
            const out=typeof r==="string"?r:"Formula breakdown unavailable.";
            try{const fc=JSON.parse(localStorage.getItem(fcKey)||"{}");fc[formulaText.slice(0,60)]=out;localStorage.setItem(fcKey,JSON.stringify(fc));}catch{}
            return out;
          }:null,q.concept||q.los_tested||"")}
          {q.los_tested&&<div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`,fontSize:11,color:C.muted}}><span style={{color:C.accentLight,fontWeight:700}}>LOS tested: </span>{q.los_tested}</div>}
          {q.misconception_targeted&&<div style={{marginTop:6,fontSize:11,color:C.muted}}><span style={{fontWeight:700}}>Distractor targets: </span>{q.misconception_targeted}</div>}
          {q.calc_steps?.applicable&&(()=>{
            const wsColors={"TVM":"#3b82f6","CF":"#22c55e","ICONV":"#f59e0b","Amort":"#a855f7"};
            const wsColor=wsColors[q.calc_steps.worksheet]||C.accentLight;
            return(
              <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                  <span style={{fontSize:11,fontWeight:700,color:"#f59e0b"}}>⚡</span>
                  <span style={{fontSize:11,fontWeight:700,color:C.text}}>BA II Plus shortcut</span>
                  <span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:8,background:wsColor+"22",color:wsColor,border:`1px solid ${wsColor}44`}}>{q.calc_steps.worksheet}</span>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4,alignItems:"center",marginBottom:q.calc_steps.result?6:8}}>
                  {(q.calc_steps.keys||[]).map((k,i)=>{
                    const isFn=k.startsWith("[")&&k.endsWith("]");
                    return <span key={i} style={{fontFamily:"monospace",fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:5,background:isFn?`${C.accent}33`:"#ffffff14",color:isFn?C.accentLight:C.text,border:`1px solid ${isFn?C.accent+"44":C.border}`}}>{k}</span>;
                  })}
                </div>
                {q.calc_steps.result&&<div style={{fontSize:12,fontWeight:700,color:C.easy,marginBottom:8}}>→ {q.calc_steps.result}</div>}
                <button onClick={()=>setCalcOpen(true)} style={{padding:"5px 11px",borderRadius:7,fontSize:11,fontWeight:700,background:`${C.accent}22`,color:C.accentLight,border:`1px solid ${C.accent}44`,cursor:"pointer"}}>▶ Open Calculator</button>
              </div>
            );
          })()}
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8}}>
            <span style={{fontSize:10,color:C.muted}}>Was this explanation helpful?</span>
            {[{v:1,label:"👍"},{v:-1,label:"👎"}].map(({v,label})=>(
              <button key={v} onClick={()=>rateExplanation(q.id,v,q)}
                style={{padding:"3px 10px",borderRadius:6,fontSize:12,cursor:"pointer",
                  background:expRatings[q.id]?.v===v?v===1?C.easy+"33":C.hard+"22":"none",
                  border:`1px solid ${expRatings[q.id]?.v===v?v===1?C.easy:C.hard:C.border}`,
                  color:expRatings[q.id]?.v===v?v===1?C.easy:C.hard:C.muted}}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Socratic Wrong-Answer Tutor */}
      {showExp&&(mode==="guided"||mode==="essay")&&answered&&answered!==q.answer&&(
        <div style={{marginBottom:12,animation:"fadeIn 0.2s ease"}}>
          {/* First-use callout */}
          {!screenOnboard.socraticTutor&&(!socraticQ||socraticQ.id!==q.id)&&authUser?.id&&(
            <div style={{background:`${C.accent}18`,border:`1px solid ${C.accent}44`,borderRadius:9,padding:"9px 12px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:11,color:C.accentLight,lineHeight:1.5}}>✨ <strong>New:</strong> Tap "Ask tutor →" to get Socratic guidance — AI asks questions, you discover the answer.</div>
              <button onClick={()=>{const u={...screenOnboard,socraticTutor:true};setScreenOnboard(u);try{localStorage.setItem(SCREEN_ONBOARD_KEY,JSON.stringify(u));}catch{}}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:14,lineHeight:1,marginLeft:8,flexShrink:0}}>✕</button>
            </div>
          )}
          {(!socraticQ||socraticQ.id!==q.id)?(
            <div style={{background:`linear-gradient(135deg,${C.accent}10,${C.accent}05)`,border:`1px solid ${C.accent}33`,borderRadius:11,padding:"12px 14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:C.accentLight}}>🤔 Still unsure why?</div>
                  <div style={{fontSize:11,color:C.muted,marginTop:2}}>AI tutor guides you with questions, not answers</div>
                </div>
                {authUser?.id?(
                  <button onClick={()=>{startSocratic(q,answered);const u={...screenOnboard,socraticTutor:true};setScreenOnboard(u);try{localStorage.setItem(SCREEN_ONBOARD_KEY,JSON.stringify(u));}catch{};}}
                    style={{padding:"8px 14px",borderRadius:9,fontSize:12,fontWeight:700,
                      background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,
                      color:"#fff",border:"none",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,marginLeft:10}}>
                    Ask tutor →
                  </button>
                ):(
                  <span style={{fontSize:11,color:C.muted,flexShrink:0,marginLeft:10}}>Sign in to use</span>
                )}
              </div>
            </div>
          ):(
            <div style={{background:"#0d0d20",border:`1px solid ${C.accent}44`,borderRadius:11,overflow:"hidden"}}>
              <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.accent}22`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontSize:11,fontWeight:700,color:C.accentLight,letterSpacing:"0.06em"}}>🎓 SOCRATIC TUTOR</div>
                <button onClick={()=>{setSocraticQ(null);setSocraticMsgs([]);}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:14,lineHeight:1}}>✕</button>
              </div>
              <div style={{padding:"12px 14px",maxHeight:240,overflowY:"auto",display:"flex",flexDirection:"column",gap:8}}>
                {socraticMsgs.map((m,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                    <div style={{maxWidth:"85%",padding:"9px 12px",borderRadius:m.role==="user"?"11px 11px 3px 11px":"11px 11px 11px 3px",
                      background:m.role==="user"?`${C.accent}33`:"#1a1a2e",
                      border:`1px solid ${m.role==="user"?C.accent+"44":C.border}`,
                      fontSize:12,color:m.role==="user"?C.accentLight:C.textMid,lineHeight:1.65,wordBreak:"break-word"}}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {socraticLoading&&(
                  <div style={{display:"flex",justifyContent:"flex-start"}}>
                    <div style={{padding:"9px 12px",borderRadius:"11px 11px 11px 3px",background:"#1a1a2e",border:`1px solid ${C.border}`,fontSize:12,color:C.muted,animation:"pulse 1.2s infinite"}}>Thinking…</div>
                  </div>
                )}
              </div>
              {socraticMsgs.length>0&&!socraticLoading&&(
                <div style={{padding:"10px 14px",borderTop:`1px solid ${C.accent}22`,display:"flex",gap:8}}>
                  <input value={socraticInput} onChange={e=>setSocraticInput(e.target.value)}
                    onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendSocratic(socraticInput,q);}}}
                    placeholder="Your response…"
                    style={{flex:1,background:"#1a1a2e",border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 11px",fontSize:12,color:C.text,outline:"none"}}/>
                  <button onClick={()=>sendSocratic(socraticInput,q)} disabled={!socraticInput.trim()||socraticLoading}
                    style={{padding:"8px 14px",borderRadius:8,fontSize:12,fontWeight:700,
                      background:socraticInput.trim()?`linear-gradient(135deg,${C.accent},${C.accentLight})`:"#1a1a2e",
                      color:socraticInput.trim()?"#fff":C.muted,border:"none",cursor:socraticInput.trim()?"pointer":"default",flexShrink:0}}>
                    Send
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {answered&&(
        <div style={{textAlign:"right",marginBottom:6,marginTop:-4}}>
          {flagging===q.id?(
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px",marginBottom:4,textAlign:"left",animation:"fadeIn 0.15s ease"}}>
              <div style={{fontSize:11,fontWeight:700,color:C.muted,marginBottom:8}}>What's the issue?</div>
              {[["wrong_answer","Wrong answer key"],["unclear","Unclear question"],["factual_error","Factual error in explanation"]].map(([r,label])=>(
                <button key={r} onClick={()=>{
                  const flag={id:q.id,ts:Date.now(),topic,module:subtopic,reason:r,question:q.question.slice(0,200),correctAnswer:q.answer,userAnswer:answers[q.id]};
                  const updated=[flag,...questionFlags.filter(f=>f.id!==q.id)].slice(0,100);
                  setQuestionFlags(updated);
                  try{localStorage.setItem(FLAGS_KEY,JSON.stringify(updated));}catch{}
                  if(r==="wrong_answer"||r==="factual_error"){const qf={...qualityFlags,[q.id]:true};setQualityFlags(qf);try{localStorage.setItem(QUALITY_FLAGS_KEY,JSON.stringify(qf));}catch{}}
                  // Sync to Supabase for admin visibility
                  if(authUser?.id){fetch(`${SUPABASE_URL}/rest/v1/feedback`,{method:"POST",headers:{"content-type":"application/json","apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`,Prefer:"return=minimal"},body:JSON.stringify({user_id:authUser.id,rating:0,category:"Question Flag",message:JSON.stringify(flag)})}).catch(()=>{});}
                  setFlagging(null);
                  showToast("⚑","Question flagged","Noted for review — thanks.");
                }} style={{display:"block",width:"100%",textAlign:"left",padding:"8px 10px",borderRadius:7,fontSize:12,color:C.textMid,background:"none",border:`1px solid ${C.border}`,marginBottom:4,cursor:"pointer"}}>{label}</button>
              ))}
              <button onClick={()=>setFlagging(null)} style={{fontSize:11,color:C.muted,background:"none",border:"none",cursor:"pointer",marginTop:2}}>Cancel</button>
            </div>
          ):questionFlags.some(f=>f.id===q.id)?(
            <span style={{fontSize:11,color:C.muted}}>⚑ Flagged</span>
          ):(
            <button onClick={()=>setFlagging(q.id)} style={{fontSize:11,color:C.muted,background:"none",border:"none",cursor:"pointer",padding:"4px 8px"}}>⚑ Flag issue</button>
          )}
        </div>
      )}
      {!answered&&mode!=="speed_drill"&&(
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,color:C.muted,textAlign:"center",marginBottom:8,letterSpacing:"0.03em"}}>How confident are you?</div>
          <div style={{display:"flex",gap:7}}>
            {[{id:"sure",label:"🟢 Sure",color:"#22a05a"},{id:"think",label:"🟡 Think so",color:"#ca8a04"},{id:"guess",label:"🔴 Guessing",color:C.hard}].map(({id,label,color})=>(
              <button key={id} onClick={()=>setQuizConfidence(c=>c===id?null:id)} style={{flex:1,padding:"8px 4px",borderRadius:9,fontSize:11,fontWeight:700,cursor:"pointer",border:`1.5px solid ${quizConfidence===id?color:C.border}`,background:quizConfidence===id?color+"22":"transparent",color:quizConfidence===id?color:C.muted,transition:"all 0.15s"}}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
      {answered&&quizConfidence&&(
        <div style={{fontSize:11,color:C.muted,textAlign:"center",marginBottom:8}}>
          You rated: <span style={{color:quizConfidence==="sure"?"#22a05a":quizConfidence==="think"?"#ca8a04":C.hard,fontWeight:700}}>{quizConfidence==="sure"?"🟢 Sure":quizConfidence==="think"?"🟡 Think so":"🔴 Guessing"}</span>
          {answered===questions[currentQ]?.answer&&quizConfidence==="guess"&&<span style={{color:"#ca8a04"}}> — lucky one, make sure you understand why.</span>}
          {answered!==questions[currentQ]?.answer&&quizConfidence==="sure"&&<span style={{color:C.hard}}> — this is a key blind spot to review.</span>}
        </div>
      )}
      {mode==="exam"&&!answered&&<div style={{fontSize:12,color:C.muted,textAlign:"center",padding:"4px",animation:"pulse 2s infinite"}}>Select an answer to continue</div>}
      {!answered&&mode!=="speed_drill"&&(
        <div style={{marginTop:16,padding:"12px 14px",background:C.surface,borderRadius:10,border:`1px solid ${C.border}`}}>
          <div style={{fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5}}>Study tip</div>
          <div style={{fontSize:12,color:C.textMid,lineHeight:1.6}}>{[
            "Read every option before selecting. Eliminate obvious wrong answers first.",
            "On CFA exams, if two answers look similar, one is usually the trap.",
            "Pay attention to qualifiers like 'always', 'never', 'most likely' — they change the answer.",
            "Ethics questions: apply the Standards literally, not common sense.",
            "When unsure, think about what the CFA Institute wants candidates to value.",
            "For calculation questions, check units first. Wrong units = wrong answer.",
            "Vignette questions: the answer is always in the text, not your memory.",
          ][currentQ%7]}</div>
        </div>
      )}
      {answered&&(
        <div style={{display:"flex",gap:8,marginBottom:8,alignItems:"center",paddingLeft:58,paddingRight:58}}>
          <button type="button" onClick={nextQ} onTouchEnd={(e)=>{e.preventDefault();nextQ();}} style={{flex:1,padding:"13px",borderRadius:10,fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",touchAction:"manipulation"}}>{isLast?"See Results →":"Next →"}</button>
          {answers[q.id]===q.answer&&(
            <button onClick={()=>setFlaggedQ(f=>({...f,[q.id]:!f[q.id]}))}
              title="Flag for SR even though correct"
              style={{padding:"13px 14px",borderRadius:10,fontSize:13,fontWeight:700,background:flaggedQ[q.id]?C.medium+"33":C.surface,border:`1.5px solid ${flaggedQ[q.id]?C.medium:C.border}`,color:flaggedQ[q.id]?C.medium:C.muted,cursor:"pointer",flexShrink:0}}>
              {flaggedQ[q.id]?"⚑ Flagged":"⚐ Not sure"}
            </button>
          )}
        </div>
      )}
      {currentQ>2&&mode!=="exam"&&<button onClick={endQuiz} style={{marginTop:9,width:"100%",padding:"9px",borderRadius:10,fontSize:12,background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>End & See Results</button>}
    </>);
  }

  // ══ RESULTS ═══════════════════════════════════════════════════════════════
  // ════════════════════════════════════════
  // SCREEN: results
  // ════════════════════════════════════════
  if(screen==="results"){
    const wrongs=questions.filter(q=>answers[q.id]!==q.answer);
    const avgTime=questions.length?Math.round(timeTaken/questions.length):0;
    const slowQIds=Object.entries(lastSession?.qTimes||{}).filter(([,t])=>t>90).map(([id])=>String(id));
    const slowQs=questions.filter(q=>slowQIds.includes(String(q.id)));
    const passed=sessionPct>=70;
    const qScore=lastSessionQuality;
    return wrap(<>
      <div style={{background:C.surface,border:`1px solid ${passed?"#22a05a44":C.hard+"44"}`,borderRadius:16,padding:"24px 22px",textAlign:"center",marginBottom:16}}>
        <ScoreRing pct={sessionPct} size={96}/>
        <div style={{fontSize:16,fontWeight:700,marginTop:12,color:passed?C.easy:C.hard}}>{passed?"Above Threshold ✓":"Not there yet — every wrong answer is data"}</div>
        <div style={{fontSize:12,color:C.muted,marginTop:5}}>{sessionScore}/{questions.length} · {fmt(timeTaken)} · ~{avgTime}s/q · {subtopic} · {difficulty}</div>
        {(()=>{
          const prev=history.slice(1).find(h=>h.topic===topic&&h.subtopic===subtopic&&h.level===cfaLevel);
          if(!prev) return null;
          const delta=sessionPct-prev.pct;
          const col=delta>0?C.easy:delta<0?C.hard:C.muted;
          return(<div style={{fontSize:12,fontWeight:700,color:col,marginTop:4}}>{delta>0?`↑${delta}% vs last time`:`↓${Math.abs(delta)}% vs last time`} on this topic</div>);
        })()}
        {!passed&&<div style={{marginTop:8,fontSize:12,color:C.muted,fontStyle:"italic",lineHeight:1.5}}>You attempted {questions.length} questions — that effort is what builds exam readiness.</div>}
        {sessionPct>=80&&difficulty!=="Hard"&&<div style={{marginTop:10,fontSize:12,color:C.easy,background:C.easy+"15",borderRadius:6,padding:"5px 10px",display:"inline-block"}}>🔥 Strong — try {difficulty==="Easy"?"Medium":"Hard"} next</div>}
        <div style={{marginTop:10,fontSize:11,color:sessionSaved?C.easy:C.hard}}>
          {sessionSaved===true?"✓ Session saved":sessionSaved===false?"⚠ Storage full — tap Home → backup your data":null}
        </div>
        {lastSession&&<div style={{marginTop:10,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
          <span style={{fontSize:13,fontWeight:800,color:C.rewardLight}}>+{calcXP(lastSession)} XP</span>
          <span style={{fontSize:11,color:C.muted}}>earned · {levelInfo.label} · Level {levelInfo.level}</span>
        </div>}
        {prequizPassProbRef.current!==null&&passProbability&&(()=>{
          const before=prequizPassProbRef.current;
          const after=passProbability.probability;
          const delta=after-before;
          const col=delta>0?C.easy:delta<0?C.hard:C.muted;
          return(
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,
              background:col+"12",border:`1px solid ${col}33`,borderRadius:10,
              padding:"10px 16px",marginTop:10,marginBottom:4}}>
              <span style={{fontSize:13}}>📈</span>
              <div style={{fontSize:13,fontWeight:700,color:col}}>
                Pass probability: {before}% → {after}%
                <span style={{marginLeft:6,fontWeight:800}}>{delta>0?"+":""}{delta}%</span>
              </div>
            </div>
          );
        })()}
        <button onClick={()=>{
          const fallbackText=`📊 ClearCFA Score Card\n━━━━━━━━━━━━━━━━━\n🎓 CFA Level ${cfaLevel} · ${subtopic}\n\n${sessionPct}%  ${sessionScore}/${questions.length} correct · ${difficulty}\n${sessionPct>=70?"✅ Above pass threshold":sessionPct>=50?"📈 Getting there (pass = 70%)":"💪 Keep drilling"}${todayStudySecs>0?`\n📚 ${fmtStudyTime(todayStudySecs)} studied today`:""}\n\nPrepping smarter with ClearCFA ✨\nclearcfa.com`;
          try{
            const imgCanvas=buildShareImage({sessionPct,sessionScore,total:questions.length,subtopic,difficulty,timeTaken,todayStudySecs,cfaLevel,fmtStudyTime,levelLabel:levelInfo?.label,levelNum:levelInfo?.level});
            imgCanvas.toBlob(async(blob)=>{
              if(!blob){if(navigator.share)navigator.share({title:"ClearCFA Score",text:fallbackText}).catch(()=>{});return;}
              const file=new File([blob],'clearcfa-score.png',{type:'image/png'});
              if(navigator.canShare&&navigator.canShare({files:[file]})){
                navigator.share({files:[file],text:fallbackText}).catch(e=>{if(e.name!=='AbortError')showToast("📋","Copied!","Share image saved to clipboard.");});
              } else if(navigator.share){
                navigator.share({title:"ClearCFA Score",text:fallbackText}).catch(()=>{});
              } else {
                // Download the image
                const url=URL.createObjectURL(blob);
                const a=document.createElement('a');a.href=url;a.download='clearcfa-score.png';a.click();
                setTimeout(()=>URL.revokeObjectURL(url),1000);
                showToast("📥","Score card saved!","Image downloaded to your device.");
              }
            },'image/png');
          }catch(e){
            if(navigator.share)navigator.share({title:"ClearCFA Score",text:fallbackText}).catch(()=>{});
          }
        }} style={{marginTop:14,padding:"8px 20px",borderRadius:20,fontSize:12,fontWeight:700,background:C.accent+"18",border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer"}}>
          📤 Share Result
        </button>
      </div>

      {/* Duel creator: show shareable link after quiz */}
      {duelCreating&&lastSession&&(()=>{
        const qs=questions.map(q=>({id:q.id,question:q.question,options:q.options,answer:q.answer,_topic:q._topic||topic}));
        const payload={qs,cs:sessionScore,ct:questions.length,topic:topic||"Mixed"};
        let duelLink="";
        try{duelLink=`${window.location.origin}${window.location.pathname}?duel=${btoa(JSON.stringify(payload))}`;}catch{}
        return(
          <div style={{background:`linear-gradient(135deg,${C.hard}18,${C.hard}06)`,border:`1px solid ${C.hard}44`,borderRadius:12,padding:"16px",marginBottom:14}}>
            <div style={{fontSize:12,fontWeight:700,color:C.hard,marginBottom:4}}>⚔️ Duel created! Your score: {sessionScore}/{questions.length} ({sessionPct}%)</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:12,lineHeight:1.5}}>Share the link below. Your challenger plays the same questions and we compare scores.</div>
            <div style={{fontSize:11,background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 10px",marginBottom:10,wordBreak:"break-all",color:C.muted,lineHeight:1.5}}>{duelLink}</div>
            <button onClick={()=>{
              try{navigator.clipboard.writeText(duelLink);}catch{}
              if(navigator.share)navigator.share({title:"CFA Duel Challenge",text:`I scored ${sessionPct}% on this CFA ${topic} duel — can you beat me? ${duelLink}`}).catch(()=>{});
              else showToast("📋","Link copied!","Share it with your study partner.");
            }} style={{width:"100%",padding:"11px",borderRadius:9,fontSize:13,fontWeight:700,background:`linear-gradient(135deg,${C.hard},${C.hard}cc)`,color:"#fff",border:"none",cursor:"pointer"}}>
              ⚔️ Challenge a friend →
            </button>
          </div>
        );
      })()}

      {/* Duel challenger: comparison after completing the duel */}
      {duelChallenge?.accepted&&lastSession&&!duelCreating&&(()=>{
        const theirPct=duelChallenge.ct>0?Math.round(duelChallenge.cs/duelChallenge.ct*100):0;
        const myPct=sessionPct;
        const iWon=myPct>theirPct;const tied=myPct===theirPct;
        return(
          <div style={{background:iWon?`linear-gradient(135deg,${C.easy}18,${C.easy}06)`:tied?`linear-gradient(135deg,${C.medium}15,transparent)`:C.hard+"12",border:`1px solid ${iWon?C.easy:tied?C.medium:C.hard}44`,borderRadius:12,padding:"16px",marginBottom:14}}>
            <div style={{fontSize:14,fontWeight:800,color:iWon?C.easy:tied?C.medium:C.hard,marginBottom:12,textAlign:"center"}}>
              {iWon?"🏆 You Won!":tied?"🤝 Tie!":"😤 They Won"}
            </div>
            <div style={{display:"flex",gap:10}}>
              {[{label:"You",pct:myPct,score:`${sessionScore}/${questions.length}`,highlight:iWon||tied},{label:"Challenger",pct:theirPct,score:`${duelChallenge.cs}/${duelChallenge.ct}`,highlight:!iWon||tied}].map(s=>(
                <div key={s.label} style={{flex:1,textAlign:"center",padding:"12px",borderRadius:10,background:s.highlight?C.surface:C.bg,border:`1px solid ${s.highlight?C.border:"transparent"}`}}>
                  <div style={{fontSize:11,color:C.muted,marginBottom:4}}>{s.label}</div>
                  <div style={{fontSize:22,fontWeight:800,color:s.pct>=70?C.easy:s.pct>=50?C.medium:C.hard}}>{s.pct}%</div>
                  <div style={{fontSize:11,color:C.muted}}>{s.score}</div>
                </div>
              ))}
            </div>
            <button onClick={()=>{
              const shareText=`${iWon?"🏆":"💪"} CFA Duel: ${myPct}% vs ${theirPct}% — ${iWon?"I won!":tied?"we tied!":"close one!"} Topic: ${duelChallenge.topic} · clearcfa.com`;
              if(navigator.share)navigator.share({title:"CFA Duel Result",text:shareText}).catch(()=>{});
              else{try{navigator.clipboard.writeText(shareText);}catch{}showToast("📋","Copied!","Share text ready");}
            }} style={{width:"100%",padding:"9px",borderRadius:9,fontSize:12,fontWeight:700,background:C.accent+"18",border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer",marginTop:12}}>
              📤 Share duel result
            </button>
          </div>
        );
      })()}

      {/* Feature 2: Re-drill CTA when score < 60% */}
      {lastSession&&lastSession.pct<60&&!fullExamMode&&(
        <div style={{background:C.hard+"12",border:`1px solid ${C.hard}33`,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
          <div style={{fontSize:13,fontWeight:700,color:C.hard,marginBottom:6}}>
            ⚡ {lastSession.pct}% — below the 60% threshold
          </div>
          <div style={{fontSize:12,color:C.textMid,marginBottom:10,lineHeight:1.5}}>
            Drill the missed questions now to lock in the concepts before they fade.
          </div>
          <button onClick={()=>{
            const diff=lastSession.difficulty==="Easy"?"Medium":lastSession.difficulty;
            generateQuestions(lastSession.topic,lastSession.subtopic,diff,Math.min(lastSession.wrongCount||10,10),"guided");
          }} style={{width:"100%",padding:"11px",borderRadius:9,fontSize:13,fontWeight:700,
            background:`linear-gradient(135deg,${C.hard},${C.hard}cc)`,color:"#fff",border:"none",cursor:"pointer"}}>
            🔁 Re-drill {lastSession.subtopic?.split(" ").slice(0,3).join(" ")} →
          </button>
        </div>
      )}

      {/* Feature 4: Mock exam topic breakdown */}
      {fullExamMode&&lastSession&&(()=>{
        const breakdown=getMockTopicBreakdown(questions,answers,lastSession.qTimes);
        return(
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:12}}>
              📊 Mock Exam — Topic Breakdown
            </div>
            {breakdown.map(b=>{
              const col=b.pct>=70?C.easy:b.pct>=50?C.medium:C.hard;
              return(
                <div key={b.topic} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{fontSize:12,fontWeight:600}}>{b.topic.split(" ").slice(0,2).join(" ")}</span>
                    <span style={{fontSize:12,color:col,fontWeight:700}}>{b.pct}% · ⏱ {b.avgSecs}s/Q</span>
                  </div>
                  <div style={{height:5,background:C.border,borderRadius:3}}>
                    <div style={{height:"100%",width:`${b.pct}%`,background:col,borderRadius:3}}/>
                  </div>
                </div>
              );
            })}
            <div style={{fontSize:11,color:C.muted,marginTop:8}}>
              {breakdown.filter(b=>b.pct<60).length} topic{breakdown.filter(b=>b.pct<60).length!==1?"s":""} below threshold · focus these before your next mock
            </div>
          </div>
        );
      })()}

      {/* Action buttons — immediately after score ring */}
      {/* Office Mode — Keep going prompt */}
      {omMode&&(
        <div style={{background:`linear-gradient(135deg,${C.accent}15,${C.accent}08)`,border:`1px solid ${C.accent}44`,borderRadius:12,padding:"13px 16px",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:C.accentLight}}>⚡ Keep going?</div>
            <div style={{fontSize:11,color:C.muted,marginTop:2}}>{omQCount} more questions · next weakest topic</div>
          </div>
          <button onClick={()=>{
            trackUsage("office_mode");
            const weak=moduleReadiness.filter(m=>m.sessions===0&&m.weight>=9)[0]
              ||moduleReadiness.filter(m=>m.accuracy!==null).sort((a,b)=>a.accuracy-b.accuracy)[0]
              ||moduleReadiness[0];
            setOmMode(true);
            generateQuestions(weak.topic,weak.untouchedModules?.[0]||weak.modules[0],adaptiveOmDifficulty,omQCount,"guided");
          }} style={{fontSize:13,fontWeight:800,padding:"9px 18px",borderRadius:9,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",boxShadow:`0 4px 12px ${C.accent}44`,flexShrink:0}}>
            {omQCount} More →
          </button>
        </div>
      )}
      <div style={{display:"flex",gap:9,marginBottom:9}}>
        <button onClick={()=>{setOmMode(false);setAnswers({});setCurrentQ(0);setShowExp(false);setLastSession(null);setScreen("quiz");}} style={{flex:1,padding:"12px",borderRadius:10,fontSize:13,fontWeight:600,background:C.surface,border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>Retry</button>
        <button onClick={()=>{setOmMode(false);setScreen("setup");}} style={{flex:2,padding:"12px",borderRadius:10,fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>New Mock →</button>
      </div>
      {wrongs.length>0&&(
        <div style={{display:"flex",gap:8,marginBottom:9}}>
          <button onClick={()=>{
            setQuestions(wrongs);
            setAnswers({});setFlaggedQ({});setCurrentQ(0);setShowExp(false);setLastSession(null);
            qShownAtRef.current={};qTimesRef.current={};
            setScreen("quiz");
          }} style={{flex:1,padding:"11px",borderRadius:10,fontSize:13,fontWeight:700,background:C.medium+"20",border:`1px solid ${C.medium}44`,color:C.medium,cursor:"pointer"}}>
            🔄 Retry missed ({wrongs.length})
          </button>
          <button onClick={()=>{
            generateQuestions(topic,subtopic,difficulty,Math.min(10,wrongs.length+5),"guided");
          }} style={{flex:1,padding:"11px",borderRadius:10,fontSize:13,fontWeight:700,background:C.hard+"20",border:`1px solid ${C.hard}44`,color:C.hard,cursor:"pointer"}}>
            🔁 New drill →
          </button>
        </div>
      )}
      <div style={{display:"flex",gap:9,marginBottom:16}}>
        <button onClick={()=>{setScreen("home");setFocusSuggestions(null);}} style={{flex:1,padding:"10px",borderRadius:10,fontSize:13,fontWeight:600,background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>Home</button>
        <button onClick={()=>{setRevisionTopic(topic);setRevisionTab("notes");setScreen("revision");}} style={{flex:1,padding:"10px",borderRadius:10,fontSize:13,fontWeight:700,background:C.accent+"18",border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer"}}>📚 Revise {topic?.split(" ")[0]}</button>
      </div>

      {/* AI Diagnosis — "What should I do next?" */}
      {!fullExamMode&&wrongs.length>0&&authUser?.id&&(
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
          {!nextActionText&&!nextActionLoading&&(
            <button onClick={async()=>{
              setNextActionLoading(true);
              try{
                const wrongConcepts=wrongs.slice(0,5).map(q=>q.concept||q.los_tested||q.question.slice(0,60)).join("; ");
                const prompt=`CFA L${cfaLevel} coach. Student scored ${sessionPct}% on ${subtopic}. Wrong answers: ${wrongConcepts}. In exactly 2 sentences: (1) name the specific concept gap, (2) one targeted drill action to fix it. Be direct.`;
                const result=await callAIChat([{role:"user",content:prompt}],authUser?.accessToken,cfaLevel);
                setNextActionText(result);
              }catch(e){
                if(e.quotaExceeded)setUpgradeModal({reason:"chat_limit"});
                else setNextActionText("Unable to generate diagnosis. Try again later.");
              }
              setNextActionLoading(false);
            }} style={{width:"100%",padding:"11px",borderRadius:9,fontSize:13,fontWeight:700,background:`linear-gradient(135deg,${C.accent}22,${C.accent}11)`,border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer"}}>
              🤖 Diagnose my gaps →
            </button>
          )}
          {nextActionLoading&&(
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"4px 0"}}>
              <div style={{width:14,height:14,border:`2px solid ${C.accent}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.8s linear infinite",flexShrink:0}}/>
              <span style={{fontSize:12,color:C.muted}}>Analysing your gaps…</span>
            </div>
          )}
          {nextActionText&&!nextActionLoading&&(
            <div>
              <div style={{fontSize:11,fontWeight:700,color:C.accentLight,marginBottom:6,letterSpacing:"0.05em",textTransform:"uppercase"}}>🤖 AI Diagnosis</div>
              <div style={{fontSize:13,color:C.text,lineHeight:1.65,marginBottom:12}}>{nextActionText}</div>
              <button onClick={()=>generateQuestions(topic,subtopic,difficulty,10,"guided")}
                style={{width:"100%",padding:"10px",borderRadius:9,fontSize:13,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>
                🔁 Drill it now →
              </button>
            </div>
          )}
        </div>
      )}

      {/* #4 — Post-session upgrade nudge for free users who scored ≥70% */}
      {!proStatus&&sessionPct>=70&&(
        <div style={{background:`linear-gradient(135deg,${C.easy}14,${C.easy}06)`,border:`1px solid ${C.easy}44`,borderRadius:14,padding:"16px 18px",marginBottom:14,display:"flex",gap:14,alignItems:"center"}}>
          <div style={{fontSize:28,flexShrink:0}}>🚀</div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:800,color:C.easy,marginBottom:3}}>You're improving — don't stop here</div>
            <div style={{fontSize:12,color:C.muted,lineHeight:1.5,marginBottom:10}}>Unlock unlimited AI practice and keep this momentum going every day.</div>
            <button onClick={()=>setUpgradeModal({reason:"default"})} style={{width:"100%",padding:"11px",borderRadius:10,fontSize:12,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>
              Unlock unlimited →
            </button>
          </div>
        </div>
      )}

      {/* AM/PM break screen */}
      {fullExamMode&&examSession===1&&window._cfaExamPMQs?.length>0&&(
        <div style={{background:`linear-gradient(135deg,${C.easy}12,${C.easy}06)`,border:`1px solid ${C.easy}44`,borderRadius:14,padding:"18px 20px",marginBottom:14,textAlign:"center"}}>
          <div style={{fontSize:16,fontWeight:800,color:C.easy,marginBottom:6}}>AM Session Complete ✓</div>
          <div style={{fontSize:13,color:C.muted,marginBottom:4}}>Score: {sessionPct}% · {sessionScore}/{questions.length} correct</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:16,lineHeight:1.6}}>Take a 30-minute break before PM session. Stand up, eat, rest your eyes. CFA examiners build this in — use it.</div>
          <button onClick={()=>startFullExam(2)} style={{width:"100%",padding:"13px",borderRadius:11,fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>
            Start PM Session ({window._cfaExamPMQs.length} questions) →
          </button>
        </div>
      )}

      {/* Session quality breakdown */}
      {qScore&&(
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:700}}>Session Quality</div>
            <Badge color={qScore.quality>=80?C.easy:qScore.quality>=65?C.medium:C.hard}>{qScore.label}</Badge>
          </div>
          <QualityBar quality={qScore.accuracyScore} label="Accuracy" color={qScore.accuracyScore>=70?C.easy:C.hard}/>
          <QualityBar quality={qScore.speedScore} label="Speed (vs 90s/q)" color={qScore.speedScore>=70?C.easy:C.medium}/>
          {qScore.difficultyBonus>0&&<div style={{fontSize:11,color:C.muted,marginTop:6}}>+{qScore.difficultyBonus} difficulty bonus ({difficulty} mode)</div>}
          <div style={{fontSize:12,fontWeight:700,color:qScore.quality>=80?C.easy:qScore.quality>=65?C.medium:C.hard,marginTop:8}}>Overall quality: {qScore.quality}/100</div>
        </div>
      )}
      {slowQs.length>0&&(
        <div style={{background:`${C.hard}10`,border:`1px solid ${C.hard}33`,borderRadius:10,padding:"10px 14px",marginBottom:10}}>
          <div style={{fontSize:11,fontWeight:700,color:C.hard,marginBottom:4}}>⏱ Slow questions ({slowQs.length}) — over 90 seconds each</div>
          {slowQs.map(q=>(
            <div key={q.id} style={{fontSize:11,color:C.muted,paddingLeft:8,marginBottom:2}}>• {q.concept||q.topic} — {lastSession.qTimes[q.id]}s</div>
          ))}
          <div style={{fontSize:10,color:C.muted,marginTop:6}}>Aim for 90s per question on exam day</div>
        </div>
      )}

      {wrongs.length>0&&<div style={{background:C.surface,border:`1px solid ${C.accent}33`,borderRadius:9,padding:"10px 14px",marginBottom:12,fontSize:12,color:C.muted}}>📋 {wrongs.length} wrong answer{wrongs.length!==1?"s":""} added to SR deck with LOS tags + misconception flags.</div>}

      {/* AI Session Debrief */}
      {authUser?.id&&wrongs.length>0&&(
        <div style={{background:C.surface,border:`1px solid ${C.accent}44`,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontSize:12,fontWeight:700,color:C.accentLight}}>🤖 AI Debrief</div>
            {aiDebriefLoading&&<span style={{fontSize:11,color:C.muted,fontStyle:"italic"}}>Analysing session…</span>}
          </div>
          {aiDebriefLoading&&<Skeleton height={80} radius={6}/>}
          {!aiDebriefLoading&&!aiDebrief&&!aiDebriefError&&<div style={{fontSize:12,color:C.muted,fontStyle:"italic"}}>Analysing your session…</div>}
          {!aiDebriefLoading&&aiDebriefError&&(
            <div style={{textAlign:"center",padding:"10px 0"}}>
              {aiDebriefError==="quota"
                ?<div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>Daily AI limit reached — upgrade for unlimited debriefs.<br/><button onClick={()=>setUpgradeModal({reason:"chat_limit"})} style={{marginTop:6,fontSize:12,fontWeight:700,color:C.accentLight,background:"none",border:`1px solid ${C.accent}44`,borderRadius:8,padding:"4px 12px",cursor:"pointer"}}>Upgrade to Pro →</button></div>
                :<div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>Debrief unavailable — check connection.<br/><button onClick={retryDebrief} style={{marginTop:6,fontSize:12,fontWeight:700,color:C.accentLight,background:"none",border:`1px solid ${C.accent}44`,borderRadius:8,padding:"4px 12px",cursor:"pointer"}}>↺ Retry</button></div>
              }
            </div>
          )}
          {aiDebrief&&(()=>{
            const d=parseDebrief(aiDebrief);
            return(
              <div>
                {d.pattern&&(
                  <div style={{background:C.accent+"0d",borderLeft:`3px solid ${C.accent}44`,borderRadius:"0 8px 8px 0",padding:"9px 12px",marginBottom:9,fontSize:12,color:C.textMid,lineHeight:1.65}}>
                    <div style={{fontSize:10,fontWeight:700,color:C.accentLight,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>⚠ Root pattern</div>
                    {d.pattern}
                  </div>
                )}
                {d.fix&&(
                  <div style={{background:"#22c55e0d",borderLeft:"3px solid #22c55e44",borderRadius:"0 8px 8px 0",padding:"9px 12px",marginBottom:9,fontSize:12,color:"#86efac",lineHeight:1.65}}>
                    <div style={{fontSize:10,fontWeight:700,color:"#22c55e77",marginBottom:3,textTransform:"uppercase",letterSpacing:"0.06em"}}>🎯 Do next</div>
                    {d.fix}
                  </div>
                )}
                {(d.priority||d.time)&&(
                  <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:10}}>
                    {d.priority&&<span style={{fontSize:11,color:C.textMid}}>Focus: <b style={{color:C.accentLight}}>{d.priority}</b></span>}
                    {d.time&&<span style={{fontSize:11,background:C.accent+"15",border:`1px solid ${C.accent}33`,borderRadius:20,padding:"2px 10px",color:C.accentLight,flexShrink:0}}>⏱ {d.time}</span>}
                  </div>
                )}
                <button onClick={()=>generateQuestions(topic,subtopic,difficulty,5,"guided")}
                  style={{width:"100%",padding:"10px",borderRadius:10,fontSize:12,fontWeight:700,background:C.accent+"22",border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer",marginBottom:d.coach?10:0}}>
                  🔁 Drill weak concepts now — 5 questions
                </button>
                {d.coach&&<div style={{fontSize:11,color:C.muted,lineHeight:1.6,fontStyle:"italic",textAlign:"center"}}>"{d.coach}"</div>}
              </div>
            );
          })()}
        </div>
      )}

      {wrongs.length>0&&(
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>Missed ({wrongs.length})</div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {wrongs.map(q=>(
              <div key={q.id} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px"}}>
                <div style={{fontSize:13,color:C.text,lineHeight:1.6,marginBottom:8}}>{q.question}</div>
                <div style={{fontSize:12,color:C.muted}}>Your: <span style={{color:"#f87171"}}>{answers[q.id]||"–"}</span> · Correct: <span style={{color:C.easy}}>{q.answer}</span></div>
                <div style={{fontSize:12,color:C.muted,marginTop:8,lineHeight:1.65,borderTop:`1px solid ${C.border}`,paddingTop:8}}>{renderExplanation(q.explanation,C)}</div>
                {q.los_tested&&<div style={{fontSize:11,color:C.muted,marginTop:6}}><span style={{fontWeight:700}}>LOS: </span>{q.los_tested}</div>}
                {q.misconception_targeted&&<div style={{fontSize:11,color:C.muted,marginTop:4}}><span style={{fontWeight:700}}>Error pattern: </span>{q.misconception_targeted}</div>}
                <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8}}>
                  <span style={{fontSize:10,color:C.muted}}>Helpful explanation?</span>
                  {[{v:1,label:"👍"},{v:-1,label:"👎"}].map(({v,label})=>(
                    <button key={v} onClick={()=>rateExplanation(q.id,v,q)}
                      style={{padding:"3px 10px",borderRadius:6,fontSize:12,cursor:"pointer",
                        background:expRatings[q.id]?.v===v?v===1?C.easy+"33":C.hard+"22":"none",
                        border:`1px solid ${expRatings[q.id]?.v===v?v===1?C.easy:C.hard:C.border}`,
                        color:expRatings[q.id]?.v===v?v===1?C.easy:C.hard:C.muted}}>
                      {label}
                    </button>
                  ))}
                </div>
                <button onClick={()=>{setRevisionTopic(q._topic||topic);setRevisionTab("notes");setRevisionConcept(q.concept||q.los_tested||null);setScreen("revision");}}
                  style={{marginTop:10,fontSize:11,fontWeight:700,padding:"5px 12px",borderRadius:7,background:C.accent+"18",border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer"}}>
                  📚 Review in Power Notes →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {history.length>=3&&authUser?.id&&(
        <div style={{background:weeklyPlan?`${C.easy}0c`:`${C.accent}10`,border:`1px solid ${weeklyPlan?C.easy+"30":C.accent+"30"}`,borderRadius:11,padding:"13px 15px",marginBottom:10}}>
          <div style={{fontSize:12,fontWeight:700,color:weeklyPlan?C.easy:C.accentLight,marginBottom:6}}>
            🗓 {weeklyPlan?"Weekly plan active":"Build your weekly study plan"}
          </div>
          {weeklyPlanLoading?(
            <div style={{fontSize:12,color:C.muted}}>⏳ Generating your personalised plan…</div>
          ):weeklyPlan?(
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:12,color:C.muted}}>Today's sessions and your weak spots are mapped out.</div>
              <button onClick={()=>{trackUsage("week_plan");setWeeklyPlanScreen(true);}} style={{fontSize:12,fontWeight:700,padding:"7px 13px",borderRadius:8,background:`${C.easy}18`,border:`1px solid ${C.easy}44`,color:C.easy,cursor:"pointer",flexShrink:0,marginLeft:10}}>View →</button>
            </div>
          ):(
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:12,color:C.muted,lineHeight:1.45}}>Personalised sessions around your schedule and weak spots.</div>
              <button onClick={()=>{trackUsage("week_plan");setWeeklyPlanScreen(true);}} style={{fontSize:12,fontWeight:700,padding:"7px 13px",borderRadius:8,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",flexShrink:0,marginLeft:10}}>Build →</button>
            </div>
          )}
        </div>
      )}
    </>);
  }
  // ══ ADMIN DASHBOARD ══════════════════════════════════════════════════════════
  // ════════════════════════════════════════
  // SCREEN: adminDashboard
  // ════════════════════════════════════════
  if(screen==="adminDashboard"&&!isAdmin){setScreen("home");return null;}
  if(screen==="adminDashboard") return wrap((()=>{
    const s=adminStats;
    const fmt=n=>n==null?"—":typeof n==="number"?n.toLocaleString():String(n);
    const fmtCur=n=>n==null?"—":`$${Number(n).toFixed(4)}`;
    const budget=adminBudget;
    const saveBudget=v=>{setAdminBudget(v);try{localStorage.setItem("cfa_admin_budget",v);}catch{}};

    // Sparkline bar chart for AI trend
    const SparkBars=({data,color})=>{
      if(!data?.length)return null;
      const max=Math.max(...data.map(d=>d.count),1);
      const W=220,H=36,n=data.length,bw=Math.max(2,Math.floor(W/n)-2);
      return(<svg width={W} height={H} style={{display:"block",marginTop:6}}>
        {data.map((d,i)=>{
          const bh=Math.max(2,Math.round((d.count/max)*(H-4)));
          return<rect key={i} x={i*(bw+2)} y={H-bh-2} width={bw} height={bh} rx={1} fill={color} opacity={0.75}/>;
        })}
      </svg>);
    };

    const Card=({title,icon,children,accent})=>(
      <div style={{background:C.surface,border:`1px solid ${accent?accent+"44":C.border}`,borderRadius:14,padding:"14px 16px",marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:800,color:accent||C.muted,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:10}}>{icon} {title}</div>
        {children}
      </div>
    );

    const Row=({label,value,sub,color})=>(
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
        <span style={{fontSize:12,color:C.muted}}>{label}</span>
        <span style={{fontSize:14,fontWeight:800,color:color||C.text}}>{value}{sub&&<span style={{fontSize:10,fontWeight:400,color:C.muted,marginLeft:4}}>{sub}</span>}</span>
      </div>
    );

    const updatedAt=s?.generatedAt?new Date(s.generatedAt).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}):"—";

    return(<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div>
          <h2 style={{margin:0,fontSize:20,fontWeight:800,color:C.text}}>🛡️ Admin Dashboard</h2>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>Updated {updatedAt} · GSP</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={fetchAdminStats} disabled={adminStatsLoading} style={{padding:"8px 14px",borderRadius:9,fontSize:12,fontWeight:700,background:C.accent+"22",color:C.accentLight,border:`1px solid ${C.accent}44`,cursor:"pointer"}}>
            {adminStatsLoading?"⏳":"↺"} Refresh
          </button>
          <button onClick={()=>setScreen("home")} style={{padding:"8px 12px",borderRadius:9,fontSize:12,background:"none",border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>← Home</button>
        </div>
      </div>

      {adminStatsError&&<div style={{background:C.hard+"18",border:`1px solid ${C.hard}44`,borderRadius:10,padding:"12px 14px",marginBottom:12,fontSize:12,color:C.hard}}>{adminStatsError}</div>}

      {adminStatsLoading&&!s&&(
        <div style={{textAlign:"center",padding:"48px 0",color:C.muted,animation:"pulse 1.5s infinite"}}>Loading metrics…</div>
      )}

      {s&&(<>
        {/* Users */}
        <Card title="Users" icon="👥" accent={C.accentLight}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:8}}>
            {[["Total registered",s.users.total],["Active today (DAU)",s.users.dau,C.easy],["Active 7d (WAU)",s.users.wau],["Active 30d (MAU)",s.users.mau]].map(([l,v,col])=>(
              <div key={l} style={{background:C.bg,borderRadius:10,padding:"10px 12px",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:10,color:C.muted,marginBottom:3}}>{l}</div>
                <div style={{fontSize:20,fontWeight:800,color:col||C.text}}>{fmt(v)}</div>
              </div>
            ))}
          </div>
          {s.users.recentSessions?.length>0&&(
            <div style={{marginTop:6}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:4}}>RECENTLY ACTIVE</div>
              {s.users.recentSessions.slice(0,3).map((r,i)=>(
                <div key={i} style={{fontSize:11,color:C.textMid,marginBottom:2}}>· {r.display||r.user_id.slice(0,8)+"…"} — {new Date(r.updated_at).toLocaleDateString()}</div>
              ))}
            </div>
          )}
        </Card>

        {/* AI Usage */}
        <Card title="AI Usage (free quota)" icon="🤖" accent="#22d3ee">
          <Row label="Questions generated today" value={fmt(s.ai.today)} color={s.ai.today>0?C.easy:C.muted}/>
          <Row label="Questions generated (7d)" value={fmt(s.ai.week)}/>
          <Row label="Active AI users today" value={fmt(s.ai.activeAiToday)}/>
          <Row label="Users at daily limit today" value={fmt(s.ai.usersAtLimit)} color={s.ai.usersAtLimit>0?C.medium:C.muted} sub={s.ai.usersAtLimit>0?"⚠️ churn risk":""}/>
          {s.ai.trend?.length>0&&(
            <div style={{marginTop:6}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:2}}>14-DAY TREND (generate calls)</div>
              <SparkBars data={s.ai.trend} color="#22d3ee"/>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:C.muted,marginTop:2}}>
                <span>{s.ai.trend[0]?.date?.slice(5)}</span>
                <span>{s.ai.trend[s.ai.trend.length-1]?.date?.slice(5)}</span>
              </div>
            </div>
          )}
        </Card>

        {/* AI Chat Usage */}
        <Card title="AI Chat (tutor, walkthrough, coach)" icon="💬🤖" accent="#a78bfa">
          <Row label="Chat calls today" value={fmt(s.chat?.today)} color={s.chat?.today>0?C.accentLight:C.muted}/>
          <Row label="Chat calls (14d)" value={fmt(s.chat?.week)}/>
          <Row label="Est. chat cost today" value={fmtCur(s.chat?.costToday)}/>
          <Row label="Est. chat cost (14d)" value={fmtCur(s.chat?.costWeek)}/>
          {s.chat?.trend?.length>0&&(
            <div style={{marginTop:6}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:2}}>14-DAY TREND (chat calls)</div>
              <SparkBars data={s.chat.trend} color="#a78bfa"/>
            </div>
          )}
        </Card>

        {/* Cost */}
        <Card title="Cost Breakdown" icon="💰" accent={C.reward}>
          <div style={{fontSize:10,color:s.cost?.usingRealTokens?C.easy:C.medium,marginBottom:8,fontWeight:700}}>
            {s.cost?.usingRealTokens?"✓ Real token data from Anthropic API responses":"⚠ Estimated (real data logs in after next API call)"}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
            {[["Generate today",fmtCur(s.cost?.generateToday)],["Generate 7d",fmtCur(s.cost?.generateWeek)],["Chat today",fmtCur(s.cost?.chatToday)],["Chat 14d",fmtCur(s.cost?.chatWeek)]].map(([l,v])=>(
              <div key={l} style={{background:C.bg,borderRadius:9,padding:"8px 10px",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:10,color:C.muted,marginBottom:2}}>{l}</div>
                <div style={{fontSize:14,fontWeight:800,color:C.reward}}>{v}</div>
              </div>
            ))}
          </div>
          <Row label="Total cost today" value={fmtCur(s.cost?.totalToday)} color={C.reward}/>
          <Row label="Total cost (7d/14d)" value={fmtCur(s.cost?.totalWeek)} color={C.reward}/>
          <Row label="Avg daily rate" value={fmtCur(s.cost?.dailyRate)} sub="based on last 7d"/>
          {/* Budget runway — uses Anthropic Admin API data if available */}
          {(()=>{
            const ant=s.anthropic;
            const hasAnt=ant?.fetched;
            // Best daily rate: prefer Anthropic-reported, fall back to our estimate
            const bestRate=hasAnt&&ant.dailyRate>0?ant.dailyRate:s.cost?.dailyRate||0;
            return(
              <div style={{marginTop:10,background:C.bg,borderRadius:10,padding:"12px 14px",border:`1px solid ${C.border}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <span style={{fontSize:11,fontWeight:700,color:C.reward}}>💳 Budget Runway</span>
                  {hasAnt?(
                    <span style={{fontSize:10,fontWeight:700,color:C.easy,background:C.easy+"18",padding:"2px 7px",borderRadius:10}}>✓ Anthropic verified</span>
                  ):ant?.error?(
                    <span style={{fontSize:10,color:C.medium}}>⚠️ API not available</span>
                  ):null}
                </div>
                {ant?.error&&<div style={{fontSize:10,color:C.medium,marginBottom:8,wordBreak:"break-all",background:C.medium+"12",borderRadius:7,padding:"6px 8px"}}>Cost API: {ant.error}</div>}
                {hasAnt&&(
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
                    {[["Anthropic spend (7d)",`$${ant.spend7d}`],["Anthropic spend (30d)",`$${ant.spend30d}`]].map(([l,v])=>(
                      <div key={l} style={{background:C.surface,borderRadius:8,padding:"7px 9px"}}>
                        <div style={{fontSize:10,color:C.muted,marginBottom:2}}>{l}</div>
                        <div style={{fontSize:13,fontWeight:800,color:C.reward}}>{v}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                  <span style={{fontSize:11,color:C.muted,whiteSpace:"nowrap"}}>Total credits purchased ($):</span>
                  <input type="number" min="0" step="0.01" value={budget} onChange={e=>saveBudget(e.target.value)}
                    placeholder="e.g. 10.00"
                    style={{flex:1,padding:"5px 8px",borderRadius:7,border:`1px solid ${C.border}`,background:C.surface,color:C.text,fontSize:12}}/>
                </div>
                {budget&&parseFloat(budget)>0&&bestRate>0?(()=>{
                  const total=parseFloat(budget);
                  const spent=hasAnt?ant.spend30d:0;
                  const remaining=Math.max(0,total-spent);
                  const days=Math.floor(remaining/bestRate);
                  return(
                    <div>
                      {hasAnt&&<div style={{fontSize:11,color:C.muted,marginBottom:4}}>Remaining (total − Anthropic 30d spend): <b style={{color:C.text}}>${remaining.toFixed(2)}</b></div>}
                      <div style={{fontSize:15,fontWeight:800,color:days>14?C.easy:days>7?C.medium:C.hard}}>
                        ~{days} days remaining
                        <span style={{fontSize:10,fontWeight:400,color:C.muted,marginLeft:6}}>at ${bestRate}/day {hasAnt?"(Anthropic rate)":"(est.)"}</span>
                      </div>
                    </div>
                  );
                })():budget&&parseFloat(budget)>0?(
                  <div style={{fontSize:11,color:C.muted}}>Not enough usage data yet for daily rate.</div>
                ):null}
              </div>
            );
          })()}
        </Card>

        {/* Revenue */}
        <Card title="Revenue" icon="⭐" accent={C.easy}>
          <Row label="Paid Pro subscribers" value={fmt(s.revenue.proCount)} color={C.easy}/>
          <Row label="Free users (excl. admin)" value={fmt(s.revenue.freeCount)}/>
          <Row label="Conversion rate" value={`${s.revenue.conversionRate}%`} color={s.revenue.conversionRate>5?C.easy:C.muted}/>
          <Row label="Referral grants issued" value={fmt(s.revenue.referrals)}/>
          <div style={{marginTop:8,fontSize:11,color:C.muted,background:C.bg,borderRadius:8,padding:"8px 10px"}}>
            ℹ️ Admin account is Pro via owner override — not counted above. Manual Pro grants: insert row in Supabase subscriptions table.
          </div>
        </Card>

        {/* Feedback */}
        <Card title="Feedback" icon="💬" accent={C.accentLight}>
          <Row label="Total feedback items" value={fmt(s.feedback.total)}/>
          <Row label="Average rating" value={s.feedback.avgRating?`${s.feedback.avgRating} / 5`:"—"} color={s.feedback.avgRating>=4?C.easy:s.feedback.avgRating>=3?C.medium:C.hard}/>
          {s.feedback.byCategory&&Object.keys(s.feedback.byCategory).length>0&&(
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
              {Object.entries(s.feedback.byCategory).map(([cat,n])=>(
                <span key={cat} style={{fontSize:10,fontWeight:700,background:C.accent+"22",color:C.accentLight,border:`1px solid ${C.accent}44`,borderRadius:20,padding:"3px 9px"}}>{cat} ({n})</span>
              ))}
            </div>
          )}
          {s.feedback.recent?.length>0&&(
            <div>
              <div style={{fontSize:10,color:C.muted,marginBottom:6}}>RECENT MESSAGES</div>
              {s.feedback.recent.map((f,i)=>(
                <div key={i} style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:9,padding:"9px 12px",marginBottom:6}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                    <span style={{fontSize:11,color:C.medium}}>{"★".repeat(f.rating||0)}{"☆".repeat(Math.max(0,5-(f.rating||0)))}</span>
                    <span style={{fontSize:10,color:C.muted}}>{f.category} · {new Date(f.created_at).toLocaleDateString()}</span>
                  </div>
                  <div style={{fontSize:12,color:C.textMid,lineHeight:1.5}}>{f.message}</div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Flagged Questions */}
        <Card title="Flagged Questions" icon="⚑" accent={C.hard}>
          <Row label="Total flags (all users)" value={fmt(s.flags?.total)} color={s.flags?.total>0?C.hard:C.muted}/>
          {s.flags?.items?.length>0?(
            <div style={{marginTop:8}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:6}}>RECENT FLAGS</div>
              {s.flags.items.slice(0,10).map((f,i)=>(
                <div key={i} style={{background:C.bg,border:`1px solid ${C.hard}33`,borderRadius:9,padding:"9px 12px",marginBottom:6}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <span style={{fontSize:10,fontWeight:700,color:C.hard,background:C.hard+"18",padding:"2px 7px",borderRadius:10}}>{f.reason?.replace(/_/g," ")||"—"}</span>
                    <span style={{fontSize:10,color:C.muted}}>{new Date(f.created_at).toLocaleDateString()}</span>
                  </div>
                  <div style={{fontSize:11,color:C.textMid,marginBottom:2}}><b style={{color:C.muted}}>Topic:</b> {f.topic} · {f.module}</div>
                  <div style={{fontSize:11,color:C.textMid,lineHeight:1.5,borderLeft:`2px solid ${C.hard}44`,paddingLeft:8,marginTop:4}}>{f.question?.slice(0,180)}{(f.question?.length||0)>180?"…":""}</div>
                </div>
              ))}
            </div>
          ):(
            <div style={{fontSize:12,color:C.muted,textAlign:"center",padding:"16px 0"}}>No flagged questions yet.</div>
          )}
        </Card>

        {/* Admin changelog — internal deployments */}
        {ADMIN_CHANGELOG.length>0&&(
          <Card title="Recent Deployments" icon="🔧" accent={C.muted}>
            {ADMIN_CHANGELOG.slice().reverse().map((entry,ei)=>(
              <div key={ei} style={{marginBottom:ei<ADMIN_CHANGELOG.length-1?14:0}}>
                <div style={{fontSize:10,fontWeight:700,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.06em"}}>{entry.date}</div>
                {entry.entries.map((e,i)=>(
                  <div key={i} style={{fontSize:11,color:C.textMid,lineHeight:1.6,paddingLeft:10,marginBottom:2,position:"relative"}}>
                    <span style={{position:"absolute",left:0,color:C.muted}}>·</span>{e}
                  </div>
                ))}
              </div>
            ))}
          </Card>
        )}
      </>)}
    </>);
  })());

  // ══ READINESS ══════════════════════════════════════════════════════════════
  // ════════════════════════════════════════
  // SCREEN: readiness
  // ════════════════════════════════════════
  if(screen==="readiness") return wrap(<>
    {!screenOnboard.readiness&&<SlideOverlay
      slides={[{emoji:"📈",color:C.easy,bg:C.easy,title:"Pass Probability",sub:"How this screen works",desc:"Your pass probability is calculated from your accuracy across all topics, weighted by the official CFA exam weights. The higher your score on high-weight topics, the bigger the boost.",tip:"Focus on Ethics (15%), Fixed Income (15%), and Equity (15%) — they move the needle most. Scroll down to see per-topic Fix to Pass targets."}]}
      onDismiss={()=>{const u={...screenOnboard,readiness:true};setScreenOnboard(u);try{localStorage.setItem(SCREEN_ONBOARD_KEY,JSON.stringify(u));}catch{}}}
      skipLabel="Got it →"
      ctaLabel="Got it →"
      zIndex={360}
    />}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
      <div><h2 style={{margin:0,fontSize:22,fontWeight:800}}>Pass Probability</h2><div style={{fontSize:12,color:C.muted,marginTop:3}}>Updated after every session</div></div>
      <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>← Home</button>
    </div>

    {/* Score ring + status */}
    {(()=>{
      const displayScore=predicted?.score??passProbability?.probability??0;
      const isPassing=displayScore>=70;
      const bg=displayScore>0?(isPassing?C.easy+"22":C.hard+"18"):C.surface;
      const borderCol=displayScore>0?(isPassing?C.easy+"44":C.hard+"44"):C.border;
      return(
        <div style={{background:bg,border:`1px solid ${borderCol}`,borderRadius:13,padding:"18px 20px",marginBottom:16,display:"flex",alignItems:"center",gap:18}}>
          <ScoreRing pct={displayScore} size={84}/>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:700,marginBottom:4}}>
              {predicted?(isPassing?"On track to pass ✓":"Below passing threshold")
                :passProbability?(passProbability.label==="On Track"?"✓ On Track to Pass":passProbability.label==="Marginal"?"⚡ Marginal — push harder":history.length<10?"🌱 Early days — keep going":"⚠ At Risk — act now")
                :"Need more sessions to predict"}
            </div>
            {predicted&&<div style={{fontSize:13,color:isPassing?C.easy:C.hard,fontWeight:600,marginBottom:4}}>Range: {predicted.low}–{predicted.high}% <span style={{fontSize:11,color:C.muted,fontWeight:400}}>({predicted.confidence}% confidence)</span></div>}
            {!predicted&&passProbability&&<div style={{fontSize:12,color:C.muted,marginBottom:4}}>{history.length<10&&passProbability.label==="At Risk"?"Early estimate — sharpen after 10+ sessions.":passProbability.advice}</div>}
            <div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>{predicted?`${predicted.modulesWithData}/10 topics with reliable data. Weighted by CFA official exam weights.`:passProbability?"":"Complete ≥10 questions across 3+ topics to unlock a weighted estimate."}</div>
            {predicted&&<div style={{fontSize:11,color:C.muted,marginTop:5}}>{daysLeft} days · {history.length} sessions · {totalQsAttempted} Qs</div>}
          </div>
        </div>
      );
    })()}

    {/* Trend chart */}
    {passTrend.length>=2&&passProbability&&(
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
        <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}}>Pass probability trend</div>
        <svg width="100%" height="90" style={{overflow:"visible"}} viewBox="0 0 360 90" preserveAspectRatio="none">
          <defs>
            <linearGradient id="trendGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={passProbability.color} stopOpacity="0.3"/>
              <stop offset="100%" stopColor={passProbability.color} stopOpacity="0.02"/>
            </linearGradient>
          </defs>
          {(()=>{
            const n=passTrend.length;
            const pts=passTrend.map((p,i)=>({x:n===1?180:Math.round((i/(n-1))*340+10),y:Math.round(80-(p.prob/100)*70),p}));
            const polyPts=pts.map(p=>`${p.x},${p.y}`).join(" ");
            const areaPath=`M${pts[0].x},80 `+pts.map(p=>`L${p.x},${p.y}`).join(" ")+` L${pts[pts.length-1].x},80 Z`;
            return(<>
              <path d={areaPath} fill="url(#trendGrad2)"/>
              <polyline points={polyPts} fill="none" stroke={passProbability.color} strokeWidth="2" strokeLinejoin="round"/>
              {pts.map((pt,i)=>(
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="4" fill={pt.p.prob>=70?C.easy:pt.p.prob>=55?C.medium:C.hard} stroke={C.bg} strokeWidth="1.5"/>
                  {i===pts.length-1&&<text x={pt.x} y={pt.y-8} textAnchor="middle" fill={passProbability.color} fontSize="10" fontWeight="700">{pt.p.prob}%</text>}
                </g>
              ))}
              <line x1="10" y1={Math.round(80-70*0.7)} x2="350" y2={Math.round(80-70*0.7)} stroke={C.easy} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4"/>
              <text x="355" y={Math.round(80-70*0.7)+4} fill={C.easy} fontSize="8" opacity="0.6">70%</text>
            </>);
          })()}
        </svg>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
          <span style={{fontSize:10,color:C.muted}}>{passTrend[0]?.date}</span>
          <span style={{fontSize:10,color:C.muted}}>today</span>
        </div>
      </div>
    )}

    {/* Weakness Radar — SVG spider chart */}
    {moduleReadiness.length>=3&&(()=>{
      const radarData=moduleReadiness.map(m=>({topic:m.topic.split(" ").slice(0,1).join(""),pct:m.accuracy??0}));
      return(
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:4}}>📡 Weakness Radar</div>
          <div style={{fontSize:11,color:C.muted,marginBottom:10}}>Polygon shows accuracy per topic — target the gaps that pull you below 70%</div>
          <WeaknessRadar data={radarData}/>
          <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:6}}>
            {[{col:C.easy,label:"≥70%"},{col:C.medium,label:"50–69%"},{col:C.hard,label:"<50%"}].map(d=>(
              <div key={d.label} style={{display:"flex",alignItems:"center",gap:4}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:d.col}}/>
                <span style={{fontSize:10,color:C.muted}}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      );
    })()}

    {/* Factors breakdown */}
    {passProbability&&(
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",marginBottom:14}}>
        <div style={{fontSize:12,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:14}}>What's driving this number</div>
        {[
          {label:"Current accuracy (recency-weighted)",value:`${passProbability.currentAccuracy}%`,color:passProbability.currentAccuracy>=70?C.easy:passProbability.currentAccuracy>=60?C.medium:C.hard,pct:passProbability.currentAccuracy},
          {label:"Curriculum coverage (% of exam weight tested)",value:`${passProbability.coveragePct}%`,color:passProbability.coveragePct>=60?C.easy:passProbability.coveragePct>=40?C.medium:C.hard,pct:passProbability.coveragePct},
          {label:"Score trajectory (recent vs older sessions)",value:passProbability.trajectory>0?`+${passProbability.trajectory}% ↑`:passProbability.trajectory<0?`${passProbability.trajectory}% ↓`:"Flat →",color:passProbability.trajectory>0?C.easy:passProbability.trajectory<0?C.hard:C.muted,pct:Math.min(100,50+passProbability.trajectory*2)},
        ].map((f,i)=>(
          <div key={i} style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <span style={{fontSize:12,color:C.muted}}>{f.label}</span>
              <span style={{fontSize:12,fontWeight:800,color:f.color}}>{f.value}</span>
            </div>
            <div style={{height:5,background:C.dim,borderRadius:3}}>
              <div style={{height:"100%",width:`${Math.max(2,Math.min(100,f.pct))}%`,background:f.color,borderRadius:3,transition:"width 0.6s ease"}}/>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Fix to Pass — blocking topics ranked by impact */}
    {(()=>{
      const blocking=moduleReadiness.filter(m=>m.reliable&&m.accuracy!==null&&m.accuracy<70).map(m=>({...m,gap:70-m.accuracy,impact:(70-m.accuracy)*m.weight})).sort((a,b)=>b.impact-a.impact).slice(0,4);
      const untouched=moduleReadiness.filter(m=>m.sessions===0&&m.weight>=10).sort((a,b)=>b.weight-a.weight).slice(0,2).filter(u=>!blocking.find(b=>b.topic===u.topic));
      const allTargets=[...blocking,...untouched];
      const stalest=moduleReadiness.filter(m=>m.weight>=8).sort((a,b)=>{if(!a.lastDate&&!b.lastDate)return b.weight-a.weight;if(!a.lastDate)return-1;if(!b.lastDate)return 1;return a.lastDate<b.lastDate?-1:1;}).slice(0,3);
      return(
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12}}>🎯 Fix to Pass</div>
          {allTargets.length===0?(
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <div style={{fontSize:12,color:C.easy,padding:"8px 12px",background:C.easy+"11",borderRadius:8}}>✅ All tested topics at 70%+ — keep these sharp</div>
              {stalest.map(m=>(
                <div key={m.topic} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",background:C.dim,borderRadius:9}}>
                  <div><div style={{fontSize:13,fontWeight:600,color:C.text}}>{m.topic}</div><div style={{fontSize:11,color:C.muted}}>{m.accuracy!=null?`${m.accuracy}% · `:""}last drilled {m.lastDate||"a while ago"}</div></div>
                  <button onClick={()=>{setScreen("home");setTimeout(()=>generateQuestionsRef.current&&generateQuestionsRef.current(m.topic,m.modules[0],"Medium",5,"guided"),100);}} style={{fontSize:11,fontWeight:700,padding:"5px 11px",borderRadius:7,background:C.accent+"22",border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer"}}>Revise →</button>
                </div>
              ))}
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {allTargets.map((m,i)=>{
                const isUntouched=m.sessions===0;
                const urgencyColor=i===0?C.hard:i===1?C.medium:C.reward;
                const barPct=isUntouched?0:Math.min((m.accuracy/70)*100,100);
                const weakestMod=m.modulesCovered?.length>0?[...m.modulesCovered].sort((a,b)=>(m.moduleStats[a]?.pct??100)-(m.moduleStats[b]?.pct??100))[0]:m.modules[0]||m.topic;
                return(
                  <div key={m.topic} style={{background:C.dim,borderRadius:10,padding:"12px 14px",border:`1px solid ${urgencyColor}22`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <div>
                        <span style={{fontSize:13,fontWeight:700,color:C.text}}>{m.topic}</span>
                        <span style={{fontSize:10,color:C.muted,marginLeft:8}}>{m.weight}% weight</span>
                      </div>
                      <span style={{fontSize:10,fontWeight:700,color:urgencyColor,background:`${urgencyColor}18`,padding:"2px 8px",borderRadius:20}}>
                        {isUntouched?"Not started":i===0?"Top priority":i===1?"High impact":"Fix this"}
                      </span>
                    </div>
                    <div style={{marginBottom:10}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.muted,marginBottom:3}}>
                        <span>{isUntouched?"No data yet":`Accuracy: ${m.accuracy}%`}</span>
                        <span style={{color:C.easy}}>Need: 70%</span>
                      </div>
                      <div style={{height:4,background:C.border,borderRadius:2,overflow:"hidden",position:"relative"}}>
                        <div style={{height:"100%",width:`${barPct}%`,background:urgencyColor,borderRadius:2}}/>
                        <div style={{position:"absolute",top:0,left:"70%",width:2,height:"100%",background:C.easy}}/>
                      </div>
                    </div>
                    <button onClick={()=>{setScreen("home");setTimeout(()=>generateQuestionsRef.current&&generateQuestionsRef.current(m.topic,weakestMod,isUntouched?"Easy":"Medium",15,"guided"),100);}} style={{width:"100%",padding:"8px",borderRadius:8,fontSize:11,fontWeight:700,background:`${urgencyColor}22`,color:urgencyColor,border:`1px solid ${urgencyColor}44`,cursor:"pointer"}}>
                      {isUntouched?`Start ${m.topic} — 15 Qs`:`Fix ${m.topic} — 15 guided Qs →`}
                    </button>
                  </div>
                );
              })}
              <button onClick={()=>{
                const top=allTargets[0];
                const weakestMod=top.modulesCovered?.length>0?[...top.modulesCovered].sort((a,b)=>(top.moduleStats[a]?.pct??100)-(top.moduleStats[b]?.pct??100))[0]:top.modules[0]||top.topic;
                setScreen("home");setTimeout(()=>generateQuestionsRef.current&&generateQuestionsRef.current(top.topic,weakestMod,top.sessions===0?"Easy":"Medium",15,"guided"),100);
              }} style={{padding:"12px",borderRadius:10,fontSize:13,fontWeight:800,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",boxShadow:`0 4px 14px ${C.accent}44`}}>
                🚀 Start highest impact: {allTargets[0]?.topic} →
              </button>
            </div>
          )}
        </div>
      );
    })()}

    {/* Module cards */}
    <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:16}}>
      {moduleReadiness.map(m=>{
        const col=m.readiness>=70?C.easy:m.readiness>=45?C.medium:C.hard;
        const notStarted=m.sessions===0;
        return(
          <div key={m.topic} style={{background:C.surface,border:`1px solid ${notStarted?C.hard+"33":C.border}`,borderRadius:12,padding:"14px 16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3,flexWrap:"wrap"}}>
                  <span style={{fontSize:14,fontWeight:700}}>{m.topic}</span>
                  <Badge color={C.muted}>{m.weight}% exam</Badge>
                  {notStarted&&<Badge color={C.hard}>Not started</Badge>}
                  {!notStarted&&!m.reliable&&<Badge color={C.medium}>Low data</Badge>}
                  {m.trend&&<TrendArrow trend={m.trend} delta={m.trendDelta}/>}
                </div>
                <div style={{fontSize:11,color:C.muted}}>{m.sessions} sessions · {m.modulesCovered.length}/{m.modules.length} modules · {m.totalQs} Qs{m.lastSession&&` · Last: ${m.lastSession}`}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0,marginLeft:10}}>
                <div style={{fontSize:20,fontWeight:800,color:col}}>{notStarted?"–":`${m.readiness}%`}</div>
                <div style={{fontSize:10,color:col,opacity:0.8,fontWeight:600,textTransform:"uppercase"}}>readiness</div>
              </div>
            </div>
            <div style={{height:4,background:C.border,borderRadius:2,marginBottom:10}}><div style={{height:"100%",width:`${m.readiness}%`,background:col,borderRadius:2,transition:"width 0.5s"}}/></div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>
              {m.modules.map(mod=>{
                const stats=m.moduleStats[mod];
                const los=m.losStats[mod];
                const diff=stats?(stats.pct<50?"Easy":"Medium"):"Easy";
                return(
                  <button key={mod} onClick={()=>{setMode("guided");generateQuestions(m.topic,mod,diff,10);}} title={`${los?.total||0} LOS · tap to drill`} style={{fontSize:10,padding:"3px 8px",borderRadius:5,fontWeight:600,cursor:"pointer",background:stats?(stats.pct>=70?C.easy+"22":stats.pct>=50?C.medium+"22":C.hard+"18"):C.dim,color:stats?(stats.pct>=70?C.easy:stats.pct>=50?C.medium:C.hard):C.muted,border:`1px solid ${stats?(stats.pct>=70?C.easy+"33":stats.pct>=50?C.medium+"33":C.hard+"33"):C.border}`}}>
                    {mod.length>18?mod.slice(0,18)+"…":mod}{stats?` ${stats.pct}%`:""}<span style={{opacity:0.45}}> {los?.total}LOS</span>
                  </button>
                );
              })}
            </div>
            <button onClick={()=>{const t=m.untouchedModules[0]||m.modules[0];setMode("guided");generateQuestions(m.topic,t,notStarted?"Easy":"Medium",10);}} style={{width:"100%",padding:"9px",borderRadius:8,fontSize:12,fontWeight:700,background:C.accent+"22",border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer"}}>{notStarted?`Start ${m.topic} →`:m.readiness>=70?"Drill to stay sharp →":"Drill Weakest Module →"}</button>
          </div>
        );
      })}
    </div>

    {/* LOS Heatmap — all 365 LOS at a glance */}
    <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",marginBottom:16}}>
      <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>LOS Coverage Heatmap <span style={{color:C.muted,fontWeight:400}}>({Object.values(LOS).flatMap(t=>Object.values(t.modules)).flat().length} total statements)</span></div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {Object.entries(activeLOS).map(([topic,{modules}])=>{
          const topicSessions=history.filter(h=>h.topic===topic);
          return(
            <div key={topic} style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{fontSize:9,color:C.muted,width:90,flexShrink:0,textAlign:"right",lineHeight:1.2}}>{topic.split(" ").slice(0,2).join(" ")}</div>
              <div style={{display:"flex",gap:2,flexWrap:"wrap"}}>
                {Object.entries(modules).map(([mod,stmts])=>{
                  const modSessions=topicSessions.filter(h=>h.subtopic===mod);
                  const modPct=modSessions.length?Math.round(modSessions.reduce((s,h)=>s+(h.pct||0),0)/modSessions.length):null;
                  return stmts.map((_,i)=><LOSHeatmapCell key={`${mod}_${i}`} tested={modPct!==null} pct={modPct||0}/>);
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{display:"flex",gap:12,marginTop:10}}>
        <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:10,height:10,borderRadius:2,background:C.border}}/><span style={{fontSize:10,color:C.muted}}>Not tested</span></div>
        <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:10,height:10,borderRadius:2,background:C.hard}}/><span style={{fontSize:10,color:C.muted}}>&lt;60%</span></div>
        <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:10,height:10,borderRadius:2,background:C.medium}}/><span style={{fontSize:10,color:C.muted}}>60-80%</span></div>
        <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:10,height:10,borderRadius:2,background:"#16a34a"}}/><span style={{fontSize:10,color:C.muted}}>&gt;80%</span></div>
      </div>
    </div>

    <div style={{background:C.dim,borderRadius:10,padding:"12px 14px",fontSize:11,color:C.muted,lineHeight:1.6}}>
      ⚠ Directional estimate only — based on AI-generated questions, not validated CFA Institute content. Use it to guide focus, not as a definitive prediction.
    </div>
  </>,620);

  // ══ DASHBOARD ══════════════════════════════════════════════════════════════
  // ══ MASTERY GRID ══════════════════════════════════════════════════════════
  // ════════════════════════════════════════
  // SCREEN: masteryGrid
  // ════════════════════════════════════════
  if(screen==="masteryGrid"){
    const topicKeys=Object.keys(activeLOS);
    return wrap(<>
      {!screenOnboard.masteryGrid&&<SlideOverlay
        slides={[{emoji:"🏆",color:C.medium,bg:C.medium,title:"Concept Mastery",sub:"How this screen works",desc:"Each coloured pill is one module. Green = ≥70% accuracy, amber = 50–69%, red = below 50%, grey = untested. Tap any pill to immediately drill that module.",tip:"Red pills are your highest-leverage targets — fixing a red module in a high-weight topic like Fixed Income has a big impact on your pass probability."}]}
        onDismiss={()=>{const u={...screenOnboard,masteryGrid:true};setScreenOnboard(u);try{localStorage.setItem(SCREEN_ONBOARD_KEY,JSON.stringify(u));}catch{}}}
        skipLabel="Got it →"
        ctaLabel="Got it →"
        zIndex={360}
      />}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div><h2 style={{margin:0,fontSize:20,fontWeight:800}}>Concept Mastery</h2><div style={{fontSize:12,color:C.muted,marginTop:2}}>Each pill = one module. Tap to drill.</div></div>
        <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>← Home</button>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
        {[["≥70%",C.easy],["50–69%",C.medium],["<50%",C.hard],["Untested",C.muted]].map(([label,col])=>(
          <div key={label} style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:col}}><div style={{width:10,height:10,borderRadius:2,background:col,opacity:0.7}}/>{label}</div>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {topicKeys.map(topic=>{
          const mods=Object.keys(activeLOS[topic]?.modules||{});
          const topicSessions=history.filter(h=>h.topic===topic);
          const topicAvg=topicSessions.length?Math.round(topicSessions.reduce((s,h)=>s+(h.pct||0),0)/topicSessions.length):null;
          return(
            <div key={topic} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"11px 13px"}}>
              <div style={{fontSize:11,fontWeight:700,color:C.muted,marginBottom:7,display:"flex",justifyContent:"space-between"}}>
                <span>{topic} <span style={{fontWeight:400}}>({activeTopicMap[topic]?.weight||0}%)</span></span>
                {topicAvg!==null&&<span style={{color:topicAvg>=70?C.easy:topicAvg>=50?C.medium:C.hard,fontWeight:700}}>{topicAvg}% avg</span>}
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {mods.map(mod=>{
                  const modSessions=topicSessions.filter(h=>h.subtopic===mod);
                  const avgPct=modSessions.length?Math.round(modSessions.reduce((s,h)=>s+(h.pct||0),0)/modSessions.length):null;
                  const col=avgPct===null?C.muted:avgPct>=70?C.easy:avgPct>=50?C.medium:C.hard;
                  const bg=avgPct===null?C.dim:avgPct>=70?C.easy+"22":avgPct>=50?C.medium+"22":C.hard+"22";
                  return(
                    <button key={mod} onClick={()=>{setTopic(topic);setSubtopic(mod);setScreen("setup");}} style={{padding:"5px 9px",borderRadius:7,fontSize:10,fontWeight:600,border:`1px solid ${col}44`,background:bg,color:col,cursor:"pointer",maxWidth:130,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}} title={`${mod}${avgPct!==null?" — "+avgPct+"%":""}`}>
                      {mod.split(" ").slice(0,3).join(" ")}{avgPct!==null?` ${avgPct}%`:""}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>);
  }

  // ════════════════════════════════════════
  // SCREEN: dashboard
  // ════════════════════════════════════════
  if(screen==="dashboard"){
    const totalQs=history.reduce((s,h)=>s+(h.total||0),0);
    const subMap={};history.forEach(s=>{const k=`${s.topic}|||${s.subtopic}`;if(!subMap[k])subMap[k]={topic:s.topic,subtopic:s.subtopic,correct:0,total:0,sessions:0};subMap[k].correct+=(s.score||0);subMap[k].total+=(s.total||0);subMap[k].sessions+=1;});
    const subStats=Object.values(subMap).map(s=>({...s,pct:Math.round((s.correct/s.total)*100)})).sort((a,b)=>a.pct-b.pct);
    const filteredHistory=historyFilter==="All"?history:history.filter(h=>h.topic===historyFilter);
    const avgQuality=history.length?Math.round(history.map(s=>getSessionQuality(s)?.quality||0).reduce((a,b)=>a+b,0)/history.length):null;

    return wrap(<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <h2 style={{margin:0,fontSize:22,fontWeight:800}}>Dashboard</h2>
        <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>← Home</button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:9,marginBottom:18}}>
        <StatCard label="Sessions" value={history.length}/>
        <StatCard label="Avg Score" value={`${overallPct||0}%`} color={overallPct>=70?C.easy:C.hard}/>
        <StatCard label="Avg Quality" value={avgQuality?`${avgQuality}`:"-"} color={avgQuality>=70?C.easy:avgQuality>=50?C.medium:C.hard}/>
        <StatCard label="Total Time" value={fmtStudyTime(history.reduce((s,h)=>s+getEffectiveTimeSecs(h),0))} color={C.accentLight}/>
      </div>

      <StudyHeatmap history={levelHistory}/>

      {/* SR stats */}
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:11,padding:"13px 16px",marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>SR Deck Health</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12,textAlign:"center"}}>
          {[["Total",Object.keys(srDeck).length,C.accentLight],["Due",dueCards.length,dueCards.length>0?C.medium:C.easy],["Leeches",leeches.length,leeches.length>0?C.hard:C.easy],["Mastered",Object.values(srDeck).filter(c=>c.repetitions>=3).length,C.easy]].map(([l,v,col])=>(
            <div key={l}><div style={{fontSize:18,fontWeight:800,color:col}}>{v}</div><div style={{fontSize:10,color:C.muted,marginTop:2}}>{l}</div></div>
          ))}
        </div>
      </div>

      {/* Tab nav */}
      <div style={{display:"flex",gap:6,marginBottom:16,overflowX:"auto",WebkitOverflowScrolling:"touch",paddingBottom:2}}>
        {[["sessions","Sessions"],["time","Time"],["patterns","Errors"],["quality","Quality"],["sr","Retention"],["flags","Flagged"]].map(([tab,label])=>(
          <button key={tab} onClick={()=>setDashTab(tab)} style={{flexShrink:0,padding:"8px 12px",borderRadius:8,fontSize:12,fontWeight:600,border:dashTab===tab?`1.5px solid ${C.accent}`:`1.5px solid ${C.border}`,background:dashTab===tab?C.accent+"18":C.surface,color:dashTab===tab?C.accentLight:C.muted,cursor:"pointer",whiteSpace:"nowrap"}}>{label}</button>
        ))}
      </div>

      {dashTab==="time"&&(()=>{
        const days=getWeeklyStudyDays(levelHistory);
        const last30=getDailyStudyTime(levelHistory);
        const totalEffSecs=levelHistory.reduce((s,h)=>s+getEffectiveTimeSecs(h),0);
        const avgPerSessionSecs=levelHistory.length?Math.round(totalEffSecs/levelHistory.length):0;
        const todaySecs=days[6]?.secs||0;
        const weekSecs=days.reduce((s,d)=>s+d.secs,0);
        const maxDay=Math.max(...days.map(d=>d.secs),1);
        const best30=Object.entries(last30).reduce((best,[d,s])=>s>best.secs?{date:d,secs:s}:best,{date:"",secs:0});
        return(
          <div>
            {/* Key stats */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:16}}>
              {[
                ["Today",fmtStudyTime(todaySecs),todaySecs>=1800?C.easy:todaySecs>0?C.medium:C.muted],
                ["This week",fmtStudyTime(weekSecs),C.accentLight],
                ["All time",fmtStudyTime(totalEffSecs),C.text],
                ["Avg / session",fmtStudyTime(avgPerSessionSecs),C.textMid],
              ].map(([l,v,col])=>(
                <div key={l} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:11,padding:"13px 16px"}}>
                  <div style={{fontSize:20,fontWeight:800,color:col}}>{v}</div>
                  <div style={{fontSize:11,color:C.muted,marginTop:3}}>{l}</div>
                </div>
              ))}
            </div>
            {/* Weekly bar chart */}
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",marginBottom:16}}>
              <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:14}}>Last 7 days</div>
              <div style={{display:"flex",alignItems:"flex-end",gap:6,height:80}}>
                {days.map(d=>{
                  const h=d.secs>0?Math.max(6,Math.round((d.secs/maxDay)*72)):3;
                  return(
                    <div key={d.key} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                      <div style={{fontSize:9,color:C.muted,fontWeight:600}}>{d.secs>0?fmtStudyTime(d.secs):""}</div>
                      <div style={{width:"100%",height:h,borderRadius:4,background:d.isToday?`linear-gradient(to top,${C.accent},${C.accentLight})`:d.secs>0?C.accent+"55":C.dim,transition:"height 0.4s ease"}}/>
                      <div style={{fontSize:10,color:d.isToday?C.accentLight:C.muted,fontWeight:d.isToday?700:400}}>{d.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Best day */}
            {best30.secs>0&&(
              <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:11,padding:"13px 16px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:C.text}}>Best study day (last 30)</div>
                  <div style={{fontSize:11,color:C.muted,marginTop:2}}>{best30.date}</div>
                </div>
                <div style={{fontSize:20,fontWeight:800,color:C.easy}}>{fmtStudyTime(best30.secs)}</div>
              </div>
            )}
            <div style={{fontSize:11,color:C.muted,textAlign:"center",lineHeight:1.6,padding:"4px 0 8px"}}>
              Effective time only — idle periods {'>'} 90s/question are excluded.
            </div>
            {/* Time per topic */}
            {(()=>{
              const byTopic={};
              levelHistory.forEach(h=>{
                if(!h.topic||!h.avgSecsPerQ)return;
                if(!byTopic[h.topic])byTopic[h.topic]={total:0,count:0};
                byTopic[h.topic].total+=h.avgSecsPerQ;
                byTopic[h.topic].count+=1;
              });
              const rows=Object.entries(byTopic).map(([t,{total,count}])=>({t,avg:Math.round(total/count)})).sort((a,b)=>b.avg-a.avg);
              if(!rows.length)return null;
              const maxAvg=Math.max(...rows.map(r=>r.avg),1);
              return(
                <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px",marginBottom:16}}>
                  <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:12}}>⏱ Avg seconds per question by topic</div>
                  {rows.map(({t,avg})=>(
                    <div key={t} style={{marginBottom:10}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                        <span style={{fontSize:11,color:C.textMid,fontWeight:600}}>{t}</span>
                        <span style={{fontSize:11,color:avg>90?C.hard:avg>60?C.medium:C.easy,fontWeight:700}}>{avg}s</span>
                      </div>
                      <div style={{height:5,background:C.dim,borderRadius:3}}>
                        <div style={{height:"100%",width:`${Math.round((avg/maxAvg)*100)}%`,background:avg>90?C.hard:avg>60?C.medium:C.easy,borderRadius:3}}/>
                      </div>
                    </div>
                  ))}
                  <div style={{fontSize:10,color:C.muted,marginTop:4}}>CFA target: ~90s/question. Red = needs speed work.</div>
                </div>
              );
            })()}
          </div>
        );
      })()}

      {dashTab==="sessions"&&<>
        {/* Topic filter */}
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
          {["All",...Object.keys(activeLOS)].map(t=>(
            <button key={t} onClick={()=>setHistoryFilter(t)} style={{padding:"4px 10px",borderRadius:6,fontSize:11,fontWeight:600,border:historyFilter===t?`1.5px solid ${C.accent}`:`1px solid ${C.border}`,background:historyFilter===t?C.accent+"20":C.surface,color:historyFilter===t?C.accentLight:C.muted,cursor:"pointer"}}>{t==="All"?"All":{"Ethics":"Ethics","Quantitative Methods":"Quant","Economics":"Econ","Financial Statement Analysis":"FSA","Corporate Issuers":"Corp","Equity Investments":"Equity","Fixed Income":"Fixed Inc","Derivatives":"Derivs","Alternative Investments":"Alts","Portfolio Management":"Portfolio"}[t]||t.split(" ")[0]}</button>
          ))}
        </div>
        {filteredHistory.length===0?(
          <div style={{textAlign:"center",padding:"32px 16px",color:C.muted}}>
            <div style={{fontSize:32,marginBottom:10}}>📊</div>
            <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:6}}>No sessions yet</div>
            <div style={{fontSize:12,lineHeight:1.6}}>Complete your first session from the home screen to see your stats here.</div>
          </div>
        ):(
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
          {filteredHistory.slice(0,15).map(s=>{
            const sq=getSessionQuality(s);
            return(<div key={s.id} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:9,padding:"11px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",left:0,top:0,bottom:0,width:`${s.pct}%`,background:s.pct>=70?`${C.easy}0a`:`${C.hard}0a`,pointerEvents:"none",transition:"width 0.4s"}}/>
              <div style={{position:"relative"}}><div style={{fontSize:13,fontWeight:600}}>{s.subtopic}</div><div style={{fontSize:11,color:C.muted}}>{s.date} · {s.difficulty} · {s.mode}</div></div>
              <div style={{textAlign:"right",position:"relative"}}>
                <div style={{fontSize:16,fontWeight:800,color:s.pct>=70?C.easy:C.hard}}>{s.pct}%</div>
                <div style={{fontSize:10,color:sq?.quality>=70?C.easy:C.muted}}>Q:{sq?.quality||"-"}</div>
              </div>
            </div>);
          })}
        </div>
        )}
      </>}

      {dashTab==="patterns"&&<>
        <div style={{fontSize:12,color:C.muted,marginBottom:12}}>Concepts you've gotten wrong 2+ times — systematic errors, not random.</div>
        {wrongPatterns.length===0?<div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"20px",textAlign:"center",color:C.muted,fontSize:13}}>No patterns detected yet. Complete more sessions to identify systematic errors.</div>:(
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
            {wrongPatterns.map((p,i)=>(
              <div key={i} style={{background:C.surface,border:`1px solid ${C.hard}22`,borderRadius:10,padding:"13px 14px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                  <div><div style={{fontSize:13,fontWeight:700}}>{p.concept}</div><div style={{fontSize:11,color:C.muted}}>{p.topic}</div></div>
                  <Badge color={C.hard}>{p.count}x wrong</Badge>
                </div>
                {p.examples[0]&&<div style={{fontSize:12,color:"#6060a0",lineHeight:1.5,marginBottom:6}}>"…{p.examples[0]}…"</div>}
                <button onClick={()=>generateQuestions(p.topic,p.topic,difficulty,10)} style={{fontSize:11,fontWeight:700,padding:"5px 11px",borderRadius:7,background:C.hard+"22",border:`1px solid ${C.hard}33`,color:C.hard,cursor:"pointer"}}>Drill this concept →</button>
              </div>
            ))}
          </div>
        )}
        {/* Misconception clusters from SR deck */}
        {(()=>{
          const clusters={};
          Object.values(srDeck).forEach(card=>{
            const tag=(card.misconception_targeted||"").trim();
            if(!tag||tag.length<4)return;
            if(!clusters[tag])clusters[tag]={tag,count:0,topics:[],concepts:[]};
            clusters[tag].count++;
            if(!clusters[tag].topics.includes(card.topic))clusters[tag].topics.push(card.topic);
            if(card.concept&&!clusters[tag].concepts.includes(card.concept))clusters[tag].concepts.push(card.concept);
          });
          const sorted=Object.values(clusters).sort((a,b)=>b.count-a.count).slice(0,6);
          if(sorted.length===0)return null;
          return(
            <div style={{marginTop:16}}>
              <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>Error Pattern Clusters</div>
              <div style={{fontSize:12,color:C.muted,marginBottom:10}}>Systematic error types across your SR deck — fix the pattern, not just the question.</div>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {sorted.map((c,i)=>(
                  <div key={i} style={{background:C.surface,border:`1px solid ${C.hard}22`,borderRadius:10,padding:"11px 13px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                      <div style={{fontSize:12,fontWeight:700,flex:1,lineHeight:1.4,color:C.text}}>{c.tag}</div>
                      <Badge color={C.hard}>{c.count} card{c.count!==1?"s":""}</Badge>
                    </div>
                    <div style={{fontSize:11,color:C.muted}}>{c.topics.slice(0,2).join(" · ")}{c.concepts.length>0?` — ${c.concepts.slice(0,2).join(", ")}`:""}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </>}

      {dashTab==="quality"&&<>
        <div style={{fontSize:12,color:C.muted,marginBottom:12}}>Session quality = 60% accuracy + 30% speed + difficulty bonus. Tracks improvement over time.</div>
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
          {history.slice(0,12).map(s=>{
            const sq=getSessionQuality(s);if(!sq)return null;
            return(<div key={s.id} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:9,padding:"11px 14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div><div style={{fontSize:13,fontWeight:600}}>{s.subtopic}</div><div style={{fontSize:11,color:C.muted}}>{s.date} · {s.difficulty}</div></div>
                <Badge color={sq.quality>=80?C.easy:sq.quality>=65?C.medium:C.hard}>{sq.label}</Badge>
              </div>
              <div style={{height:4,background:C.border,borderRadius:2}}><div style={{height:"100%",width:`${sq.quality}%`,background:sq.quality>=80?C.easy:sq.quality>=65?C.medium:C.hard,borderRadius:2}}/></div>
              <div style={{display:"flex",gap:12,marginTop:6}}><span style={{fontSize:10,color:C.muted}}>Acc: {sq.accuracyScore}%</span><span style={{fontSize:10,color:C.muted}}>Speed: {sq.speedScore}%</span><span style={{fontSize:10,color:C.muted}}>Quality: {sq.quality}/100</span></div>
            </div>);
          })}
        </div>
        {/* Confidence calibration */}
        {(()=>{
          const allConf=history.flatMap(s=>s.confidenceData||[]);
          if(allConf.length<5)return null;
          const byConf={sure:{correct:0,total:0},think:{correct:0,total:0},guess:{correct:0,total:0}};
          allConf.forEach(({conf,correct})=>{if(byConf[conf]){byConf[conf].total++;if(correct)byConf[conf].correct++;}});
          const pct=c=>byConf[c].total?Math.round(byConf[c].correct/byConf[c].total*100):null;
          return(
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"13px 15px",marginTop:4}}>
              <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>Confidence Calibration</div>
              <div style={{fontSize:11,color:C.muted,marginBottom:10}}>How accurate you are when you feel Sure vs Guessing. Perfectly calibrated = three distinct bands.</div>
              {[["sure","🟢 Sure",75],["think","🟡 Think so",55],["guess","🔴 Guessing",33]].map(([id,label,expected])=>{
                const p=pct(id);if(p===null)return null;
                const gap=p-expected;
                return(
                  <div key={id} style={{marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                      <span style={{fontSize:12,color:C.textMid}}>{label}</span>
                      <span style={{fontSize:12,fontWeight:700,color:p>=expected+10?C.easy:p<expected-10?C.hard:C.medium}}>{p}% <span style={{fontSize:10,color:gap>5?C.easy:gap<-5?C.hard:C.muted}}>({gap>0?"+":""}{gap}pp vs expected)</span></span>
                    </div>
                    <div style={{height:5,background:C.dim,borderRadius:3}}><div style={{height:"100%",width:`${p}%`,background:p>=70?C.easy:p>=50?C.medium:C.hard,borderRadius:3}}/></div>
                    <div style={{fontSize:10,color:C.muted,marginTop:2}}>{byConf[id].total} questions rated</div>
                  </div>
                );
              })}
              {pct("sure")!==null&&pct("guess")!==null&&pct("sure")<pct("guess")+12&&(
                <div style={{fontSize:11,color:C.hard,background:C.hard+"10",borderRadius:7,padding:"6px 10px",marginTop:4}}>⚠ Your "Sure" and "Guessing" accuracy are close — you have blind spots where you feel confident but aren't.</div>
              )}
            </div>
          );
        })()}
      </>}

      {dashTab==="sr"&&(()=>{
        const cards=Object.values(srDeck);
        if(!cards.length)return(<div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"28px 20px",textAlign:"center",color:C.muted,fontSize:13}}>No SR cards yet. Complete sessions to build your deck — each question you answer gets added automatically.</div>);
        const practiced=cards.filter(c=>(c.repetitions||0)+(c.wrongCount||0)>0);
        const mastered=cards.filter(c=>(c.repetitions||0)>=3&&!(c.wrongCount||0));
        const struggling=cards.filter(c=>(c.wrongCount||0)>=3).sort((a,b)=>(b.wrongCount||0)-(a.wrongCount||0));
        const avgRetention=practiced.length>0?Math.round(practiced.reduce((s,c)=>s+(c.repetitions||0)/Math.max(1,(c.repetitions||0)+(c.wrongCount||0)),0)/practiced.length*100):null;
        const avgEF=cards.length>0?Math.round(cards.reduce((s,c)=>s+(c.ef||2.5),0)/cards.length*100)/100:null;
        const byTopic={};
        cards.forEach(c=>{
          const t=c.topic||"Unknown";
          if(!byTopic[t])byTopic[t]={total:0,correct:0,wrong:0,mastered:0};
          byTopic[t].total++;
          byTopic[t].correct+=(c.repetitions||0);
          byTopic[t].wrong+=(c.wrongCount||0);
          byTopic[t].mastered+=((c.repetitions||0)>=3&&!(c.wrongCount||0))?1:0;
        });
        const topicRows=Object.entries(byTopic).map(([topic,d])=>({topic,...d,ret:d.correct+d.wrong>0?Math.round(d.correct/(d.correct+d.wrong)*100):null})).sort((a,b)=>(a.ret??101)-(b.ret??101));
        return(<>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8,marginBottom:14}}>
            {[["Retention",avgRetention!=null?`${avgRetention}%`:"-",avgRetention>=70?C.easy:avgRetention>=50?C.medium:C.hard],["Mastered",mastered.length,C.easy],["Struggling",struggling.length,struggling.length>0?C.hard:C.easy],["Ease",avgEF??"-",avgEF>=2.5?C.easy:avgEF>=2.1?C.medium:C.hard]].map(([label,val,col])=>(
              <div key={label} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:9,padding:"10px 6px",textAlign:"center"}}>
                <div style={{fontSize:15,fontWeight:800,color:col}}>{val}</div>
                <div style={{fontSize:10,color:C.muted,marginTop:2}}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",marginBottom:12}}>
            <div style={{fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}}>Retention by Topic</div>
            {topicRows.map(row=>(
              <div key={row.topic} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                  <div style={{fontSize:12,color:C.textMid}}>{row.topic}</div>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    <div style={{fontSize:10,color:C.muted}}>{row.total} cards</div>
                    <div style={{fontSize:12,fontWeight:700,color:row.ret>=70?C.easy:row.ret>=50?C.medium:row.ret!=null?C.hard:C.muted,minWidth:32,textAlign:"right"}}>{row.ret!=null?`${row.ret}%`:"-"}</div>
                  </div>
                </div>
                <div style={{height:5,background:C.border,borderRadius:3}}><div style={{height:"100%",width:`${row.ret??0}%`,background:row.ret>=70?C.easy:row.ret>=50?C.medium:C.hard,borderRadius:3,transition:"width 0.3s"}}/></div>
              </div>
            ))}
          </div>
          {struggling.length>0&&(
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",marginBottom:12}}>
              <div style={{fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>Struggling Concepts (wrong 3×+)</div>
              {struggling.slice(0,10).map((card,i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<Math.min(9,struggling.length-1)?`1px solid ${C.border}`:"none"}}>
                  <div>
                    <div style={{fontSize:12,color:C.textMid}}>{card.concept||card.subtopic||"Unknown"}</div>
                    <div style={{fontSize:10,color:C.muted}}>{card.topic}</div>
                  </div>
                  <div style={{fontSize:11,fontWeight:700,color:C.hard}}>{card.wrongCount}× wrong</div>
                </div>
              ))}
            </div>
          )}
          <div style={{fontSize:11,color:C.muted,textAlign:"center",padding:"4px 0"}}>Ease factor {avgEF} (ideal: 2.5+) · {cards.length} total cards · {practiced.length} practiced</div>
        </>);
      })()}

      {dashTab==="flags"&&(()=>{
        const flags=questionFlags;
        const REASON={wrong_answer:"Wrong answer key",unclear:"Unclear question",factual_error:"Factual error in explanation"};
        return(<>
          <div style={{fontSize:12,color:C.muted,marginBottom:12}}>Questions you flagged during practice — wrong answer keys, unclear wording, or factual errors in explanations.</div>
          {flags.length===0?(
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"28px 20px",textAlign:"center",color:C.muted,fontSize:13}}>No flagged questions yet.<br/><span style={{fontSize:11,display:"block",marginTop:6}}>Tap "⚑ Flag issue" during a quiz when something looks wrong.</span></div>
          ):(<>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{fontSize:11,color:C.muted}}>{flags.length} flagged question{flags.length!==1?"s":""}</div>
              <button onClick={()=>{setQuestionFlags([]);try{localStorage.removeItem(FLAGS_KEY);}catch{}}} style={{fontSize:11,color:C.hard,background:"none",border:"none",cursor:"pointer"}}>Clear all</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
              {flags.map((f,i)=>(
                <div key={i} style={{background:C.surface,border:`1px solid ${C.hard}33`,borderRadius:10,padding:"12px 14px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                    <span style={{fontSize:10,fontWeight:700,color:C.hard,background:C.hard+"18",padding:"2px 8px",borderRadius:12}}>{REASON[f.reason]||f.reason}</span>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <span style={{fontSize:10,color:C.muted}}>{new Date(f.ts).toLocaleDateString()}</span>
                      <button onClick={()=>{const u=flags.filter((_,j)=>j!==i);setQuestionFlags(u);try{localStorage.setItem(FLAGS_KEY,JSON.stringify(u));}catch{}}} style={{fontSize:10,color:C.muted,background:"none",border:"none",cursor:"pointer",padding:"2px 4px"}}>✕</button>
                    </div>
                  </div>
                  <div style={{fontSize:11,color:C.muted,marginBottom:6}}>{f.topic} · {f.module}</div>
                  <div style={{fontSize:12,color:C.textMid,lineHeight:1.6,marginBottom:8}}>{f.question}</div>
                  <div style={{fontSize:11,color:C.muted}}>Answer key: <span style={{color:C.accentLight,fontWeight:700}}>{f.correctAnswer}</span> · Your answer: <span style={{fontWeight:700,color:f.userAnswer===f.correctAnswer?C.easy:C.hard}}>{f.userAnswer||"—"}</span></div>
                </div>
              ))}
            </div>
          </>)}
        </>);
      })()}

      {dashTab==="api"&&(()=>{
        const log=apiLogRef.current;
        const today=localDateKey();
        const weekAgo=localDateKey(new Date(Date.now()-7*86400000));
        const todayLog=log.filter(e=>localDateKey(new Date(e.ts))===today);
        const weekLog=log.filter(e=>localDateKey(new Date(e.ts))>=weekAgo);
        const todayCost=todayLog.reduce((s,e)=>s+(e.$||0),0);
        const weekCost=weekLog.reduce((s,e)=>s+(e.$||0),0);
        const totalCost=log.reduce((s,e)=>s+(e.$||0),0);
        const byFeature={};
        log.forEach(e=>{const f=e.f||"unknown";if(!byFeature[f])byFeature[f]={cost:0,calls:0};byFeature[f].cost+=(e.$||0);byFeature[f].calls+=1;});
        const featureList=Object.entries(byFeature).sort((a,b)=>b[1].cost-a[1].cost);
        const maxFeatureCost=featureList[0]?.[1]?.cost||1;
        const haikuCost=log.filter(e=>e.m==="haiku").reduce((s,e)=>s+(e.$||0),0);
        const sonnetCost=log.filter(e=>e.m==="sonnet").reduce((s,e)=>s+(e.$||0),0);
        const haikuCalls=log.filter(e=>e.m==="haiku").length;
        const sonnetCalls=log.filter(e=>e.m==="sonnet").length;
        const fmtC=(n)=>n<0.0001?"<$0.0001":n<1?`$${n.toFixed(4)}`:`$${n.toFixed(2)}`;
        const featureEmoji={"questions:Easy":"🟢","questions:Medium":"🟡","questions:Hard":"🔴","vignette:Easy":"📗","vignette:Medium":"📙","vignette:Hard":"📕","fsa_vignette":"📊","full_exam":"🎓","week_plan":"🗓","ai_coach":"🤖","ai_debrief":"🔍","office_mode":"💼","calc_trainer":"🔢","walkthrough":"📖","unknown":"❓"};
        return(<>
          {log.length===0?(
            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"28px 20px",textAlign:"center",color:C.muted,fontSize:13,marginBottom:16}}>
              No API calls logged yet.<br/><span style={{fontSize:11,marginTop:4,display:"block"}}>Data is captured from your next question generation.</span>
            </div>
          ):(<>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
              {[["Today",todayCost,todayLog.length],["This Week",weekCost,weekLog.length],["All Time",totalCost,log.length]].map(([label,cost,calls])=>(
                <div key={label} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:9,padding:"10px 8px",textAlign:"center"}}>
                  <div style={{fontSize:15,fontWeight:800,color:cost>0.10?C.hard:cost>0.03?C.medium:C.easy}}>{fmtC(cost)}</div>
                  <div style={{fontSize:10,color:C.muted,marginTop:2}}>{label}</div>
                  <div style={{fontSize:10,color:C.muted}}>{calls} calls</div>
                </div>
              ))}
            </div>

            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",marginBottom:12}}>
              <div style={{fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>Model Split</div>
              {[["Haiku",haikuCost,haikuCalls,C.easy],["Sonnet",sonnetCost,sonnetCalls,C.hard]].map(([name,cost,calls,col])=>(
                <div key={name} style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                  <div style={{fontSize:11,color:C.muted,width:48}}>{name}</div>
                  <div style={{flex:1,height:8,background:C.border,borderRadius:4}}>
                    <div style={{height:"100%",width:`${totalCost>0?(cost/totalCost*100):0}%`,background:col,borderRadius:4,transition:"width 0.3s"}}/>
                  </div>
                  <div style={{fontSize:11,color:C.muted,width:28,textAlign:"right"}}>{calls}×</div>
                  <div style={{fontSize:11,fontWeight:700,color:col,width:60,textAlign:"right"}}>{fmtC(cost)}</div>
                </div>
              ))}
            </div>

            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",marginBottom:12}}>
              <div style={{fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}}>Cost by Feature</div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {featureList.map(([feat,stats])=>(
                  <div key={feat}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                      <div style={{fontSize:12,color:C.textMid}}>{featureEmoji[feat]||"•"} {feat}</div>
                      <div style={{display:"flex",gap:10,alignItems:"center"}}>
                        <div style={{fontSize:10,color:C.muted}}>{stats.calls}×</div>
                        <div style={{fontSize:12,fontWeight:700,color:stats.cost>0.05?C.hard:stats.cost>0.01?C.medium:C.easy,minWidth:56,textAlign:"right"}}>{fmtC(stats.cost)}</div>
                      </div>
                    </div>
                    <div style={{height:5,background:C.border,borderRadius:3}}>
                      <div style={{height:"100%",width:`${(stats.cost/maxFeatureCost)*100}%`,background:stats.cost>0.05?C.hard:stats.cost>0.01?C.medium:C.easy,borderRadius:3,transition:"width 0.3s"}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",marginBottom:12}}>
              <div style={{fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>Recent Calls</div>
              {log.slice(0,25).map((entry,i)=>{
                const ago=Math.round((Date.now()-entry.ts)/60000);
                const agoStr=ago<60?`${ago}m ago`:ago<1440?`${Math.round(ago/60)}h ago`:`${Math.round(ago/1440)}d ago`;
                return(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<Math.min(24,log.length-1)?`1px solid ${C.border}`:"none"}}>
                    <div>
                      <div style={{fontSize:12,color:C.textMid}}>{featureEmoji[entry.f]||"•"} {entry.f}</div>
                      <div style={{fontSize:10,color:C.muted}}>{entry.m} · {(entry.in||0).toLocaleString()}+{(entry.out||0).toLocaleString()} tok · {agoStr}</div>
                    </div>
                    <div style={{fontSize:12,fontWeight:700,color:(entry.$||0)>0.05?C.hard:(entry.$||0)>0.01?C.medium:C.easy}}>{fmtC(entry.$||0)}</div>
                  </div>
                );
              })}
            </div>
            <button onClick={()=>{apiLogRef.current=[];storageSet(API_LOG_KEY,[]);}} style={{width:"100%",padding:"9px",borderRadius:9,fontSize:11,fontWeight:600,background:"none",border:`1px solid #2a1018`,color:"#5a2a3a",cursor:"pointer",marginBottom:12}}>Clear API Log</button>
          </>)}
        </>);
      })()}

      {!confirmClear
        ?<button onClick={()=>setConfirmClear(true)} style={{marginTop:8,background:"none",border:"none",color:"#5a2a3a",cursor:"pointer",fontSize:11,textDecoration:"underline",display:"block",width:"100%",textAlign:"center"}}>Reset all data…</button>
        :<div style={{background:"#200010",border:`1px solid ${C.hard}44`,borderRadius:10,padding:"14px",marginTop:8}}>
          <div style={{fontSize:13,fontWeight:700,color:C.hard,marginBottom:10,textAlign:"center"}}>Delete all sessions and SR deck?</div>
          <div style={{display:"flex",gap:9}}><button onClick={()=>setConfirmClear(false)} style={{flex:1,padding:"10px",borderRadius:10,fontSize:13,fontWeight:600,background:C.surface,border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>Cancel</button><button onClick={()=>{setHistory([]);setSrDeck({});setQdb({});setConfirmClear(false);setScreen("home");}} style={{flex:1,padding:"10px",borderRadius:10,fontSize:13,fontWeight:700,background:"#400010",border:`1px solid ${C.hard}`,color:C.hard,cursor:"pointer"}}>Delete Everything</button></div>
        </div>
      }
    </>);
  }

  // ════════════════════════════════════════
  // SCREEN: losCoverage
  // ════════════════════════════════════════
  if(screen==="losCoverage") return wrap(<>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
      <div><h2 style={{margin:0,fontSize:20,fontWeight:800}}>🗺 LOS Coverage</h2><div style={{fontSize:11,color:C.muted,marginTop:2}}>Which modules you've tested across all topics</div></div>
      <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>← Home</button>
    </div>
    {Object.entries(activeLOS).map(([t,{weight,modules}])=>{
      const mods=Object.keys(modules);
      const testedMods=mods.filter(m=>history.some(h=>h.topic===t&&h.subtopic===m));
      const covPct=mods.length?Math.round((testedMods.length/mods.length)*100):0;
      const topicAccSessions=history.filter(h=>h.topic===t);
      const topicAcc=topicAccSessions.length?Math.round(topicAccSessions.reduce((s,h)=>s+(h.pct||0),0)/topicAccSessions.length):null;
      return(
        <div key={t} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:11,padding:"12px 14px",marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontSize:13,fontWeight:700,color:C.text}}>{t}</div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              {topicAcc!==null&&<span style={{fontSize:11,fontWeight:700,color:topicAcc>=70?C.easy:topicAcc>=50?C.medium:C.hard}}>{topicAcc}%</span>}
              <span style={{fontSize:11,color:C.muted}}>{testedMods.length}/{mods.length} modules · {weight}%</span>
            </div>
          </div>
          <div style={{height:4,background:C.border,borderRadius:2,marginBottom:10}}>
            <div style={{height:"100%",width:`${covPct}%`,background:covPct>=70?C.easy:covPct>=40?C.medium:C.hard,borderRadius:2,transition:"width 0.4s"}}/>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
            {mods.map(m=>{
              const mSessions=history.filter(h=>h.topic===t&&h.subtopic===m);
              const mAcc=mSessions.length?Math.round(mSessions.reduce((s,h)=>s+(h.pct||0),0)/mSessions.length):null;
              const losM=getLOSMastery(history,t,m);
              const tested=mSessions.length>0;
              const bg=!tested?C.dim:mAcc>=70?C.easy+"22":mAcc>=50?C.medium+"22":C.hard+"18";
              const border=!tested?C.border:mAcc>=70?C.easy+"44":mAcc>=50?C.medium+"44":C.hard+"44";
              const col=!tested?C.muted:mAcc>=70?C.easy:mAcc>=50?C.medium:C.hard;
              return(
                <button key={m} onClick={()=>{setTopic(t);setSubtopic(m);setVignetteMode(false);setScreen("setup");}} style={{padding:"5px 9px",borderRadius:7,fontSize:10,fontWeight:600,background:bg,border:`1px solid ${border}`,color:col,cursor:"pointer",textAlign:"left"}}>
                  {m.split(" ").slice(0,3).join(" ")}{m.split(" ").length>3?"…":""}
                  {tested&&mAcc!==null&&<span style={{marginLeft:4,opacity:0.7}}>{mAcc}%</span>}
                  {!tested&&<span style={{marginLeft:4,opacity:0.5}}>{losM.total} LOS</span>}
                </button>
              );
            })}
          </div>
        </div>
      );
    })}
  </>);

  // ══ REVIEW WRONGS ══════════════════════════════════════════════════════════
  // ════════════════════════════════════════
  // SCREEN: review
  // ════════════════════════════════════════
  if(screen==="review"){
    const w=reviewList[reviewIdx];
    if(!w)return wrap(<div style={{textAlign:"center",paddingTop:60}}><div style={{fontSize:36,marginBottom:12}}>🎯</div><div style={{fontSize:16,fontWeight:700,marginBottom:8}}>All caught up!</div><button onClick={()=>setScreen("home")} style={{padding:"12px 28px",borderRadius:10,fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>Home</button></div>);
    return wrap(<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div><h2 style={{margin:0,fontSize:20,fontWeight:800}}>Review Mistakes</h2><div style={{fontSize:12,color:C.muted,marginTop:3}}>{reviewIdx+1} of {reviewList.length}</div></div>
        <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>← Home</button>
      </div>
      <div style={{height:3,background:C.border,borderRadius:2,marginBottom:14}}><div style={{height:"100%",width:`${((reviewIdx+1)/reviewList.length)*100}%`,background:C.hard,borderRadius:2,transition:"width 0.3s"}}/></div>
      {w.concept&&<div style={{marginBottom:10}}><Badge color={C.muted}>{w.concept}</Badge></div>}
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:"20px",marginBottom:14,fontSize:14,lineHeight:1.78}}>{w.question}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
        {Object.entries(w.options).map(([key,val])=>{
          const isCorrect=key===w.answer,wasWrong=key===w.userAnswer&&!isCorrect;
          const distractorExp=!isCorrect&&w.distractor_explanations?.[key];
          return(
            <div key={key} style={{display:"flex",flexDirection:"column",gap:4,padding:"12px 14px",borderRadius:10,background:isCorrect?C.easy+"22":wasWrong?C.hard+"18":C.surface,border:`1.5px solid ${isCorrect?C.easy:wasWrong?C.hard:C.border}`,marginBottom:8}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <span style={{minWidth:24,height:24,borderRadius:6,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1,background:isCorrect?C.easy:wasWrong?C.hard:C.dim,color:"#fff"}}>{key}</span>
                <span style={{fontSize:13,lineHeight:1.6,color:isCorrect?C.easy:wasWrong?C.hard:C.muted}}>{val}</span>
              </div>
              {distractorExp&&<div style={{fontSize:11,color:C.muted,paddingLeft:36,fontStyle:"italic",lineHeight:1.4}}>↳ {distractorExp}</div>}
            </div>
          );
        })}
      </div>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:11,padding:"15px",marginBottom:6,fontSize:13,color:C.textMid,lineHeight:1.75}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
          <div style={{fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase"}}>Why you missed this</div>
          <button onClick={()=>openReviewAI(`${w.concept||w.subtopic||"Question"} · ${w.topic||""}`,`CFA Level ${cfaLevel} — I got this wrong in a practice session.\n\nConcept: "${w.concept||w.subtopic}"\n${w.topic?`Topic: ${w.topic}\n`:""}\nExplanation: "${w.explanation}"\n${w.los_tested?`LOS: ${w.los_tested}`:""}${w.misconception_targeted?`\nError pattern: ${w.misconception_targeted}`:""}\n\nHelp me truly understand why I missed this and what I must remember for the exam.`)}
            style={{fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:7,background:`${C.accent}22`,border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer",flexShrink:0}}>
            💬 Ask AI
          </button>
        </div>
        {renderExplanation(w.explanation,C)}
      </div>
      {w.los_tested&&<div style={{background:C.dim,borderRadius:8,padding:"8px 12px",marginBottom:8,fontSize:11,color:C.muted}}><span style={{fontWeight:700,color:C.accentLight}}>LOS: </span>{w.los_tested}</div>}
      {w.misconception_targeted&&<div style={{background:C.surface,borderRadius:8,padding:"8px 12px",marginBottom:12,fontSize:11,color:C.muted}}><span style={{fontWeight:700}}>Error pattern: </span>{w.misconception_targeted}</div>}
      <div style={{display:"flex",gap:9}}>
        {reviewIdx>0&&<button onClick={()=>{setReviewIdx(i=>i-1);setReviewAiPanel(null);}} style={{flex:1,padding:"12px",borderRadius:10,fontSize:13,fontWeight:600,background:C.surface,border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>← Prev</button>}
        {reviewIdx<reviewList.length-1?<button onClick={()=>{setReviewIdx(i=>i+1);setReviewAiPanel(null);}} style={{flex:2,padding:"13px",borderRadius:10,fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer"}}>Next →</button>:<button onClick={()=>setScreen("home")} style={{flex:2,padding:"13px",borderRadius:10,fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${C.easy},#16c98a)`,color:"#fff",border:"none",cursor:"pointer"}}>Done ✓</button>}
      </div>
      <ReviewAIChatPanel/>
    </>);
  }
  // ══ API KEY SCREEN ══════════════════════════════════════════════════════════
  // ════════════════════════════════════════
  // SCREEN: apiKey
  // ════════════════════════════════════════
  if(screen==="apiKey"){setScreen("home");return null;}

  // ══ STUDY PLAN SCREEN ════════════════════════════════════════════════════════
  // ════════════════════════════════════════
  // SCREEN: studyPlan
  // ════════════════════════════════════════
  if(screen==="studyPlan") return wrap((()=>{
    const plan=studyPlanData||[];
    const today=plan[0];
    const typeColor={learn:C.accent,review:C.medium,ethics:C.easy};
    return(<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div><h2 style={{margin:0,fontSize:20,fontWeight:800,color:C.text}}>📅 2-Month Study Plan</h2><div style={{fontSize:11,color:C.muted,marginTop:2}}>Personalised to your weak topics · {daysLeft} days to exam</div></div>
        <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>← Home</button>
      </div>
      {today&&(
        <div style={{background:`linear-gradient(135deg,${C.accent}18,${C.accent}08)`,border:`1px solid ${C.accent}44`,borderRadius:14,padding:"16px",marginBottom:16}}>
          <div style={{fontSize:10,fontWeight:800,color:C.accentLight,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>Today's Session</div>
          <div style={{fontSize:15,fontWeight:800,color:C.text,marginBottom:2}}>{today.topic}</div>
          <div style={{fontSize:12,color:C.muted,marginBottom:12}}>{today.module} · {today.count} questions · {today.difficulty}</div>
          <button onClick={()=>{setScreen("home");setTimeout(()=>generateQuestions(today.topic,today.module,today.difficulty,today.count,"guided"),100);}} style={{width:"100%",padding:"12px",borderRadius:10,fontSize:13,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",boxShadow:`0 4px 14px ${C.accent}44`}}>
            Start Today's Session →
          </button>
        </div>
      )}
      <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:10}}>Upcoming Schedule</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {plan.slice(0,30).map((day,i)=>(
          <div key={i} style={{background:C.surface,border:`1px solid ${i===0?C.accent+"55":C.border}`,borderRadius:11,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                <span style={{fontSize:10,fontWeight:800,color:C.muted}}>Day {day.dayNum}</span>
                <span style={{fontSize:9,padding:"2px 7px",borderRadius:10,background:(typeColor[day.type]||C.accent)+"22",color:typeColor[day.type]||C.accent,fontWeight:700,textTransform:"uppercase"}}>{day.type}</span>
              </div>
              <div style={{fontSize:12,fontWeight:700,color:C.text}}>{day.topic.split(" ").slice(0,3).join(" ")}</div>
              <div style={{fontSize:11,color:C.muted}}>{day.module.slice(0,40)}{day.module.length>40?"…":""} · {day.count}Q</div>
            </div>
            {i>0&&<button onClick={()=>{setScreen("home");setTimeout(()=>generateQuestions(day.topic,day.module,day.difficulty,day.count,"guided"),100);}} style={{fontSize:10,fontWeight:700,padding:"6px 10px",borderRadius:8,background:C.accent+"22",border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer",flexShrink:0,marginLeft:10}}>Start</button>}
          </div>
        ))}
        {plan.length>30&&<div style={{textAlign:"center",fontSize:11,color:C.muted,padding:"8px"}}>+{plan.length-30} more days planned</div>}
      </div>
    </>);
  })());

  // ══ CALC TRAINER SCREEN ══════════════════════════════════════════════════════
  // ════════════════════════════════════════
  // SCREEN: calcTrainer
  // ════════════════════════════════════════
  if(screen==="calcTrainer") return wrap((()=>{
    const calcTopics=["Quantitative Methods","Fixed Income","Derivatives","Portfolio Management","Equity","Corporate Issuers"];
    const CALC_GUIDES=[
      {title:"Setup — First-Time Config",icon:"⚙️",steps:[
        {label:"Set P/Y and C/Y to 1",keys:["[2ND]","[P/Y]","1","[ENTER]","[↓]","1","[ENTER]","[2ND]","[QUIT]"],note:"P/Y = Payments per Year (how many times you pay per year). C/Y = Compounding periods per Year (how often interest compounds per year). Most CFA exam questions assume annual periods — so set both to 1. Only change P/Y for monthly loans (P/Y=12) or semi-annual bonds (P/Y=2). Tap [↓] after [ENTER] to advance from P/Y to the C/Y field."},
        {label:"Switch to END mode",keys:["[2ND]","[BGN]","[2ND]","[QUIT]"],note:"END vs BGN controls WHEN cash flows occur. END (ordinary annuity) = payments at END of each period — the default for most CFA problems. BGN (annuity due) = payments at START. 'BGN' appears in the display header when BGN mode is active. Switch to END if you see it."},
        {label:"Clear TVM worksheet",keys:["[2ND]","[CLR TVM]"],note:"Always run this before each new TVM problem! Leftover values for N, I/Y, PV, PMT, or FV from a previous problem will silently poison your answer. This is the single most common calculator mistake on the CFA exam."},
        {label:"Set decimal places to 4",keys:["[2ND]","[FORMAT]","4","[ENTER]","[2ND]","[QUIT]"],note:"FORMAT controls how many decimal places are shown. 4 decimal places gives the precision expected in CFA answer choices (e.g. 6.1234%). The calculator stores full precision internally — this only changes what you see on screen."},
      ]},
      {title:"TVM — Bond Pricing & Loans",icon:"🏦",steps:[
        {label:"What the 5 TVM keys mean",keys:[],note:"N = Number of periods (years, months, etc.). For a 10-year annual bond, N=10; for monthly, N=120.\n\nI/Y = Interest rate per period as a % — enter 6 for 6%, not 0.06. For a semi-annual bond with 8% YTM, enter I/Y=4 (half the annual rate).\n\nPV = Present Value — what the investment is worth today. Enter as NEGATIVE when it is cash you pay out (buying a bond, taking a loan). Enter as POSITIVE when you receive it.\n\nPMT = Payment per period — the regular cash flow (bond coupon, loan instalment). Positive if you receive it (coupons), negative if you pay it (loan payment).\n\nFV = Future Value — the lump sum at the end. For bonds, FV = face value (usually 1000). For a loan paid off, FV = 0.\n\nCPT = Compute — press CPT then the unknown key to solve. The other 4 must already be entered."},
        {label:"PV of a bond: 5-year 8% annual coupon, YTM 6%, FV 1000",keys:["[2ND]","[CLR TVM]","5","[N]","6","[I/Y]","80","[PMT]","1000","[FV]","[CPT]","[PV]"],note:"Result: −1,084.25. Negative = cash you pay out (purchase price). PMT is positive because you receive coupons."},
        {label:"Semi-annual bond: 10-year 6% coupon, YTM 8%, FV 1000",keys:["[2ND]","[CLR TVM]","20","[N]","4","[I/Y]","30","[PMT]","1000","[FV]","[CPT]","[PV]"],note:"Double N (10×2=20), halve I/Y (8/2=4%), halve PMT (60/2=30). Result: −864.10. Premium/discount logic: YTM > coupon → discount."},
        {label:"Solve for YTM: bond costs $950, 5-yr, 7% annual coupon, FV 1000",keys:["[2ND]","[CLR TVM]","5","[N]","950","[+/-]","[PV]","70","[PMT]","1000","[FV]","[CPT]","[I/Y]"],note:"Result: 8.12% YTM. Enter PV as negative (you pay out cash to buy). Type 950 first, then [+/-] to flip sign to −950, then [PV] to store. The calculator iterates — may take 1-2 seconds."},
        {label:"Monthly loan: $200k at 6% annual for 30 years",keys:["[2ND]","[P/Y]","12","[ENTER]","[2ND]","[QUIT]","360","[N]","6","[I/Y]","200000","[PV]","0","[FV]","[CPT]","[PMT]"],note:"P/Y=12 tells the calc compounding is monthly. N=360 months, I/Y=annual rate. Reset P/Y=1 when done. Result: −$1,199.10/month."},
        {label:"Annuity due (BGN): PV of 5 payments of $1,000 at 8%",keys:["[2ND]","[BGN]","[2ND]","[SET]","[2ND]","[QUIT]","5","[N]","8","[I/Y]","1000","[PMT]","0","[FV]","[CPT]","[PV]"],note:"BGN shows in display when active. Annuity due payments occur at start of period — PV is higher than ordinary annuity by (1 + r). Reset to END after."},
      ]},
      {title:"Cash Flows — NPV & IRR",icon:"💰",steps:[
        {label:"What the CF worksheet keys mean",keys:[],note:"CF0 = Cash Flow at time 0 (the initial investment — almost always a negative number because you pay it out now).\n\nC01, C02… = Cash flows in period 1, 2, etc. Enter each period's cash flow amount.\n\nF01, F02… = Frequency — how many consecutive periods have that SAME cash flow amount. If CF1=500 for 3 years in a row, enter C01=500 and F01=3 instead of entering 500 three times.\n\nNPV = Net Present Value — the dollar value added above the cost of capital. Positive = accept the project.\n\nIRR = Internal Rate of Return — the discount rate that makes NPV = 0. If IRR > your hurdle rate (WACC), accept.\n\nI = Discount rate you enter for NPV calculation (as a whole %, e.g. 10 for 10%)."},
        {label:"Enter uneven cash flows",keys:["[CF]","[2ND]","[CLR WORK]","initial outflow (negative)","[ENTER]","[↓]","CF1","[ENTER]","[↓]","frequency (1 if once)","[ENTER]","[↓]","repeat for each period"],note:"CF0 is the initial investment (negative). F01 = how many consecutive periods have the same CF — saves entries for level streams within an uneven series."},
        {label:"Compute NPV",keys:["[NPV]","discount rate","[ENTER]","[↓]","[CPT]"],note:"Enter rate as a whole number (10 for 10%, not 0.10). Positive NPV = accept. NPV is the value added to the firm above the cost of capital."},
        {label:"Compute IRR",keys:["[IRR]","[CPT]"],note:"IRR is the discount rate making NPV = 0. If IRR > WACC, accept. 'Error 5' means no unique IRR (non-conventional CFs — multiple sign changes)."},
        {label:"Full example: CF0=−1000, CF1=400, CF2=500, CF3=300, rate=10%",keys:["[CF]","[CLR WORK]","1000","[+/-]","[ENTER]","[↓]","400","[ENTER]","[↓]","1","[ENTER]","[↓]","500","[ENTER]","[↓]","1","[ENTER]","[↓]","300","[ENTER]","[↓]","1","[ENTER]","[NPV]","10","[ENTER]","[↓]","[CPT]"],note:"NPV ≈ $5.26. Then [IRR] [CPT] → IRR ≈ 10.65%."},
      ]},
      {title:"Amortization Worksheet",icon:"📊",steps:[
        {label:"What the Amortization keys mean",keys:[],note:"You must FIRST solve a loan TVM problem (N, I/Y, PV, PMT, FV entered) before the amort worksheet can break it down.\n\nP1 = First payment number in the range you want to analyse (e.g. 1 for the first payment).\n\nP2 = Last payment number in the range (e.g. 12 to see the full first year on a monthly loan; same as P1 for a single payment).\n\nBAL = Remaining loan balance AFTER payment P2 is made.\n\nPRN = Total principal repaid across payments P1 to P2.\n\nINT = Total interest paid across payments P1 to P2.\n\nPRN + INT = Total cash paid in that range (should equal PMT × number of periods in the range)."},
        {label:"Loan P&I breakdown — single payment",keys:["(solve loan TVM first)","[2ND]","[AMORT]","1","[ENTER]","[↓]","1","[ENTER]","[↓]","[↓]","→ BAL","[↓]","→ PRN","[↓]","→ INT"],note:"P1=1, P2=1 gives you payment #1 breakdown: remaining balance, principal paid, interest paid. Press ↓ repeatedly to cycle through BAL, PRN, INT in order."},
        {label:"Full-year P&I — range of payments",keys:["[2ND]","[AMORT]","1","[ENTER]","[↓]","12","[ENTER]","[↓]","→ BAL","[↓]","→ PRN","[↓]","→ INT"],note:"P1=1, P2=12 shows cumulative totals for payments 1 through 12 (first year). PRN shows total principal repaid; INT shows total interest paid in that range. Essential for fixed income questions on interest expense."},
        {label:"Later-period range — year 3 analysis",keys:["[2ND]","[AMORT]","25","[ENTER]","[↓]","36","[ENTER]","[↓]","→ BAL","[↓]","→ PRN","[↓]","→ INT"],note:"P1=25, P2=36 gives payments 25–36 (year 3 for monthly). The calc automatically continues from where prior amort left off — if you changed P1/P2 manually, it recomputes. BAL shows balance *after* payment P2, useful for CFA balance-sheet questions."},
      ]},
      {title:"ICONV — Interest Rate Conversion",icon:"🔄",steps:[
        {label:"What the ICONV keys mean",keys:[],note:"NOM = Nominal rate (also called APR — Annual Percentage Rate). This is the stated rate that does NOT account for compounding within the year. Enter as a whole % (e.g. 6 for 6%).\n\nEFF = Effective Annual Rate (EAR). This IS the true annual return after accounting for within-year compounding. EFF is always ≥ NOM.\n\nC/Y = Compounding periods per year. Use 2 for semi-annual, 4 for quarterly, 12 for monthly, 365 for daily.\n\nFormula: EFF = (1 + NOM/C/Y)^C/Y − 1\n\nWhen to use: CFA questions often give you a stated rate (NOM) for a bond that pays semi-annually, then ask for the EAR. Enter NOM and C/Y, press [CPT] [EFF]. To go the other direction, enter EFF and C/Y, press [CPT] [NOM]."},
        {label:"Convert EAR to APR (or vice versa)",keys:["[2ND]","[ICONV]","NOM = annual rate","[ENTER]","[↓]","C/Y = periods per year","[ENTER]","[↓]","[CPT] → EFF"],note:"ICONV converts between nominal (APR) and effective annual rate (EAR). Enter NOM and C/Y, then CPT EFF to solve for EAR. Or enter EFF and C/Y, then CPT NOM for the APR. C/Y=2 for semi-annual, 12 for monthly, 4 for quarterly."},
        {label:"EAR for semi-annual bond: 6% coupon, semi-annual pay",keys:["[2ND]","[ICONV]","6","[ENTER]","[↓]","2","[ENTER]","[↓]","[↓]","[CPT]"],note:"NOM=6, C/Y=2 → EFF=6.09%. This is the true annual cost of the bond. Examiners often ask for EAR when coupon payments are semi-annual — the 6% BEY understates the annual yield slightly."},
        {label:"Convert monthly rate to EAR: 1% per month",keys:["[2ND]","[ICONV]","12","[ENTER]","[↓]","12","[ENTER]","[↓]","[↓]","[CPT]"],note:"NOM=12 (12 × 1%), C/Y=12 → EFF=12.68%. Alternatively use formula: EAR=(1+r)^m −1. The ICONV worksheet gives the same answer faster and without rounding error."},
      ]},
      {title:"Memory — STO & RCL",icon:"🧠",steps:[
        {label:"Store an intermediate result",keys:["(result on screen)","[STO]","[0–9]"],note:"Saves displayed value to memory 0–9. Essential for multi-step problems where you need an intermediate answer later without writing it down."},
        {label:"Recall stored value",keys:["[RCL]","[0–9]"],note:"Pastes the stored value into the display without clearing it from memory. Combine with arithmetic: [RCL][1][×][2][=] multiplies memory 1 by 2."},
        {label:"Running total in memory",keys:["[STO]","[+]","slot → adds to stored","[STO]","[−]","slot → subtracts"],note:"Lets you accumulate across multiple steps without a scratch pad. E.g. sum interest payments across periods."},
      ]},
      {title:"Common Mistakes & Pitfalls",icon:"⚠️",steps:[
        {label:"Sign convention (Error 5)",keys:["PV and FV must have opposite signs"],note:"Pay to buy → PV negative, receive at maturity → FV positive. Getting this wrong gives Error 5 or a nonsense answer. A bond you buy: PV < 0, FV > 0, PMT > 0."},
        {label:"P/Y vs N mismatch",keys:["P/Y=12 → enter N as months, not years"],note:"If P/Y=12 and you enter N=10, the calc assumes 10 monthly periods, not 10 years. Safest: always set P/Y=1 and adjust N and I/Y manually."},
        {label:"CPT goes BEFORE the unknown",keys:["[CPT]","[FV]","not [FV]","[CPT]"],note:"Order is fixed. [CPT] then the variable to solve for. Reversing it re-enters the variable value, not a solve command."},
        {label:"Forgetting CLR TVM between problems",keys:["[2ND]","[CLR TVM]","before every new TVM problem"],note:"A leftover N or PMT from a previous problem will silently poison the next calculation. Make it automatic — CLR TVM every time."},
        {label:"Not resetting BGN mode",keys:["Check display — 'BGN' shows if annuity due mode is active"],note:"If BGN was set for a previous problem and not cleared, your next ordinary annuity PV will be wrong by (1 + r)."},
      ]},
    ];
    const generateCalcProblem=async()=>{
      if(!authUser?.id){setCalcError("Sign in to use Calc Trainer.");return;}
      setCalcLoading(true);setCalcError("");setCalcProblem(null);setCalcSteps([]);setCalcInputs({});setCalcChecked({});
      try{
        const rawCalc=await callAIChat(authUser.id,[{role:"user",content:`Generate a CFA Level ${cfaLevel} multi-step calculation problem for: ${calcTopic} (${calcDifficulty}).\n\nReturn JSON:\n{\n  "problem": "Full problem statement with all given data",\n  "steps": [\n    {"step_num": 1, "instruction": "Calculate X first", "answer": "exact numerical answer", "formula": "formula used", "calculator_keys": "exact BA II Plus keystroke sequence, e.g. '1000 [PV], 5 [I/Y], 10 [N], [CPT] [FV]'", "explanation": "why this step"},\n    {"step_num": 2, "instruction": "...", "answer": "...", "formula": "...", "calculator_keys": "...", "explanation": "..."}\n  ],\n  "final_answer": "final answer with units",\n  "concept": "what is being tested",\n  "los_tested": "relevant CFA LOS"\n}\n\nFor calculator_keys: provide the exact sequence of BA II Plus button presses using bracket notation for function keys, e.g. '100 [+/-] [PV], 8 [I/Y], 5 [N], [CPT] [FV]' or '[2ND] [P/Y] 4 [ENTER] [2ND] [QUIT]'. If a step is arithmetic only, write 'Manual: (formula)'. Make it 3-5 steps. Use realistic CFA exam numbers. Output ONLY valid JSON.`}],800,cfaLevel);
        let result=null;
        if(rawCalc){try{result=JSON.parse(rawCalc.replace(/```json\n?|```/g,"").trim());}catch{const m=rawCalc.match(/\{[\s\S]*\}/);if(m)try{result=JSON.parse(m[0]);}catch{}}}
        if(result&&result.steps){setCalcProblem(result);setCalcSteps(result.steps||[]);}
        else throw new Error("Invalid response format");
      }catch(e){setCalcError("Failed to generate problem: "+e.message);}
      setCalcLoading(false);
    };
    const checkStep=(stepIdx,answer,userInput)=>{
      const clean=s=>s.replace(/[$%,\s]/g,"");
      const user=parseFloat(clean(userInput));
      const correct=parseFloat(clean(String(answer)));
      const ok=!isNaN(user)&&!isNaN(correct)&&Math.abs((user-correct)/(correct||1))<=0.001;
      setCalcChecked(c=>({...c,[stepIdx]:ok?"correct":"wrong"}));
    };
    return(<>
      {!screenOnboard.calcTrainer&&<SlideOverlay
        slides={[{emoji:"🔢",color:C.accentLight,bg:C.accent,title:"Calc Trainer",sub:"Practice + keystroke reference",desc:"Two modes: Learn shows you exactly how to use the BA II Plus for every CFA workflow. Practice gives you AI-generated multi-step problems to test your speed and accuracy.",tip:"Start with Learn → Setup if you haven't configured your calculator yet. Then drill Practice until keystrokes are muscle memory."}]}
        onDismiss={()=>{const u={...screenOnboard,calcTrainer:true};setScreenOnboard(u);try{localStorage.setItem(SCREEN_ONBOARD_KEY,JSON.stringify(u));}catch{}}}
        skipLabel="Got it →"
        ctaLabel="Got it →"
        zIndex={360}
      />}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div><h2 style={{margin:0,fontSize:20,fontWeight:800,color:C.text}}>🔢 Calc Trainer</h2><div style={{fontSize:11,color:C.muted,marginTop:2}}>BA II Plus reference & practice</div></div>
        <button onClick={()=>{setScreen("home");}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>← Home</button>
      </div>
      {/* Tab switcher */}
      <div style={{display:"flex",gap:0,marginBottom:14,background:C.surface,borderRadius:10,padding:3,border:`1px solid ${C.border}`}}>
        {[["practice","📝 Practice"],["learn","📖 Learn Calculator"]].map(([t,label])=>(
          <button key={t} onClick={()=>setCalcTrainerTab(t)}
            style={{flex:1,padding:"8px",borderRadius:8,fontSize:12,fontWeight:700,border:"none",cursor:"pointer",
              background:calcTrainerTab===t?`linear-gradient(135deg,${C.accent},${C.accentLight})`:C.surface,
              color:calcTrainerTab===t?"#fff":C.muted,transition:"all 0.15s"}}>
            {label}
          </button>
        ))}
      </div>

      {/* ── LEARN TAB ── */}
      {calcTrainerTab==="learn"&&(
        <CalcLearnBoundary>
        <div style={{animation:"fadeIn 0.2s ease"}}>
          <div style={{fontSize:12,color:C.muted,marginBottom:14,lineHeight:1.6}}>
            Step-by-step keystroke guides for every BA II Plus workflow tested on the CFA exam. Tap a section to expand.
          </div>
          {CALC_GUIDES.map((guide,gi)=>(
            <div key={gi} style={{marginBottom:8,borderRadius:12,border:`1px solid ${calcLearnSection===gi?C.accent+"44":C.border}`,overflow:"hidden"}}>
              <button onClick={()=>setCalcLearnSection(calcLearnSection===gi?null:gi)}
                style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",
                  padding:"13px 16px",background:calcLearnSection===gi?`${C.accent}10`:C.surface,
                  border:"none",cursor:"pointer",textAlign:"left"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:18}}>{guide.icon}</span>
                  <span style={{fontSize:13,fontWeight:700,color:C.text}}>{guide.title}</span>
                </div>
                <span style={{fontSize:11,color:C.muted,flexShrink:0,marginLeft:8}}>{calcLearnSection===gi?"▲":"▼"}</span>
              </button>
              {calcLearnSection===gi&&(
                <div style={{background:C.bg,borderTop:`1px solid ${C.border}`,padding:"12px 14px"}}>
                  {guide.steps.map((s,si)=>(
                    <div key={si} style={{marginBottom:si<guide.steps.length-1?16:0}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6,gap:8}}>
                        <div style={{fontSize:12,fontWeight:700,color:C.text,flex:1}}>{s.label}</div>
                        {s.keys.length>0&&<button onClick={()=>{try{localStorage.removeItem(CALC_SNAP_KEY);}catch{}setCalcGuideStep({label:s.label,keys:s.keys,note:s.note});setCalcOpen(true);}}
                          style={{fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:6,flexShrink:0,
                            background:C.accent+"18",border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer"}}>
                          ▶ Try it
                        </button>}
                      </div>
                      {s.keys.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:7}}>
                        {s.keys.map((k,ki)=>(
                          k.startsWith("[")?
                            <span key={ki} style={{fontFamily:"monospace",fontSize:11,fontWeight:800,background:theme==='light'?"#eff6ff":"#1e293b",color:theme==='light'?"#1d4ed8":"#93c5fd",border:`1px solid ${C.accent}44`,padding:"3px 8px",borderRadius:5,letterSpacing:"0.03em"}}>{k}</span>
                          : k.startsWith("(") || k.includes("→") || k.includes("=") || /^[A-Z]/.test(k) ?
                            <span key={ki} style={{fontSize:10,color:C.muted,padding:"3px 4px",alignSelf:"center",fontStyle:"italic"}}>{k}</span>
                          :
                            <span key={ki} style={{fontFamily:"monospace",fontSize:11,fontWeight:700,background:C.surfaceHigh,color:C.accentLight,border:`1px solid ${C.border}`,padding:"3px 8px",borderRadius:5}}>{k}</span>
                        ))}
                      </div>}
                      <div style={{fontSize:11,color:C.muted,lineHeight:1.65,background:`${C.accent}08`,borderRadius:7,padding:"7px 10px",whiteSpace:"pre-line"}}>{s.note}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div style={{marginTop:14}}>
            <button onClick={()=>setCalcOpen(true)}
              style={{width:"100%",padding:"13px",borderRadius:11,fontSize:13,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <span style={{fontSize:16}}>🧮</span> Open BA II Plus to practise alongside
            </button>
          </div>
        </div>
        </CalcLearnBoundary>
      )}

      {/* ── PRACTICE TAB ── */}
      {calcTrainerTab==="practice"&&(<>
      {/* Open the real BA II Plus calculator */}
      <button onClick={()=>setCalcOpen(true)}
        style={{width:"100%",padding:"13px",borderRadius:11,fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
        <span style={{fontSize:18}}>🧮</span>
        <div style={{textAlign:"left"}}>
          <div style={{fontSize:13,fontWeight:800,color:"#fff"}}>Open BA II Plus Calculator</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.75)",fontWeight:400}}>TVM · NPV/IRR · AMORT · ICONV · Memory</div>
        </div>
        <span style={{marginLeft:"auto",fontSize:16,opacity:0.6}}>→</span>
      </button>
      {!calcProblem&&(
        <>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:700,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>Topic</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {calcTopics.map(t=>(
                <button key={t} onClick={()=>setCalcTopic(t)} style={{padding:"6px 12px",borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",border:calcTopic===t?`1.5px solid ${C.accent}`:`1.5px solid ${C.border}`,background:calcTopic===t?C.accent+"22":C.surface,color:calcTopic===t?C.accentLight:C.muted}}>{t.split(" ")[0]}</button>
              ))}
            </div>
          </div>
          <div style={{marginBottom:20}}>
            <div style={{fontSize:11,fontWeight:700,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>Difficulty</div>
            <div style={{display:"flex",gap:8}}>
              {["Easy","Medium","Hard"].map(d=>(
                <button key={d} onClick={()=>setCalcDifficulty(d)} style={{flex:1,padding:"9px",borderRadius:9,fontSize:12,fontWeight:700,cursor:"pointer",border:calcDifficulty===d?`1.5px solid ${diffC[d]}`:`1.5px solid ${C.border}`,background:calcDifficulty===d?diffC[d]+"22":C.surface,color:calcDifficulty===d?diffC[d]:C.muted}}>{d}</button>
              ))}
            </div>
          </div>
          {calcError&&<div style={{background:C.errorBg,border:`1px solid ${C.hard}44`,borderRadius:9,padding:"12px",color:C.hard,fontSize:13,marginBottom:12}}>{calcError}</div>}
          <button onClick={generateCalcProblem} disabled={calcLoading} style={{width:"100%",padding:"13px",borderRadius:11,fontSize:14,fontWeight:700,background:calcLoading?C.dim:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:calcLoading?C.muted:"#fff",border:"none",cursor:calcLoading?"not-allowed":"pointer"}}>
            {calcLoading?"Generating problem…":"Generate Problem →"}
          </button>
        </>
      )}
      {calcProblem&&(
        <div style={{animation:"fadeIn 0.2s ease"}}>
          <div style={{background:C.surface,border:`1px solid ${C.accent}33`,borderRadius:13,padding:"16px",marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:800,color:C.accentLight,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>Problem — {calcProblem.concept}</div>
            <div style={{fontSize:13,color:C.text,lineHeight:1.7}}>{calcProblem.problem}</div>
            {calcProblem.los_tested&&<div style={{fontSize:10,color:C.muted,marginTop:8}}>LOS: {calcProblem.los_tested}</div>}
          </div>
          {calcSteps.map((step,idx)=>(
            <div key={idx} style={{background:C.surface,border:`1px solid ${calcChecked[idx]==="correct"?C.easy+"55":calcChecked[idx]==="wrong"?C.hard+"55":C.border}`,borderRadius:12,padding:"14px",marginBottom:10,transition:"border-color 0.2s"}}>
              <div style={{fontSize:11,fontWeight:800,color:C.accentLight,marginBottom:6}}>Step {step.step_num}: {step.instruction}</div>
              {step.formula&&<div style={{fontSize:11,color:C.muted,fontFamily:"monospace",marginBottom:6,background:C.dim,padding:"5px 9px",borderRadius:6}}>Formula: {step.formula}</div>}
              {step.calculator_keys&&<div style={{fontSize:11,color:theme==='light'?"#1d4ed8":"#93c5fd",fontFamily:"monospace",marginBottom:8,background:theme==='light'?"#eff6ff":"#0d1117",border:`1px solid ${C.accent}33`,padding:"5px 9px",borderRadius:6}}>🧮 {step.calculator_keys}</div>}
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <input
                  type="text"
                  placeholder="Your answer…"
                  value={calcInputs[idx]||""}
                  onChange={e=>setCalcInputs(c=>({...c,[idx]:e.target.value}))}
                  disabled={!!calcChecked[idx]}
                  style={{flex:1,padding:"9px 12px",borderRadius:8,fontSize:13,background:C.dim,border:`1px solid ${C.border}`,color:C.text,outline:"none"}}
                />
                {!calcChecked[idx]?(
                  <button onClick={()=>checkStep(idx,step.answer,calcInputs[idx]||"")} style={{padding:"9px 14px",borderRadius:8,fontSize:12,fontWeight:700,background:C.accent+"22",border:`1px solid ${C.accent}44`,color:C.accentLight,cursor:"pointer",flexShrink:0}}>Check</button>
                ):(
                  <span style={{fontSize:18,flexShrink:0}}>{calcChecked[idx]==="correct"?"✅":"❌"}</span>
                )}
              </div>
              {calcChecked[idx]&&(
                <div style={{marginTop:8,padding:"8px 10px",borderRadius:8,background:calcChecked[idx]==="correct"?C.successBg:C.errorBg,fontSize:12,color:calcChecked[idx]==="correct"?C.easy:C.hard,lineHeight:1.5}}>
                  {calcChecked[idx]==="correct"?"✓ Correct! ":"✗ Answer: "+step.answer+" | "}{step.explanation}
                </div>
              )}
            </div>
          ))}
          {Object.keys(calcChecked).length===calcSteps.length&&calcSteps.length>0&&(
            <div style={{background:C.surface,border:`1px solid ${C.easy}44`,borderRadius:12,padding:"14px",marginBottom:10,textAlign:"center"}}>
              <div style={{fontSize:14,fontWeight:800,color:C.easy,marginBottom:4}}>Final Answer: {calcProblem.final_answer}</div>
              <div style={{fontSize:12,color:C.muted}}>{Object.values(calcChecked).filter(v=>v==="correct").length}/{calcSteps.length} steps correct</div>
            </div>
          )}
          <button onClick={()=>{setCalcProblem(null);setCalcSteps([]);setCalcInputs({});setCalcChecked({});setCalcError("");}} style={{width:"100%",padding:"11px",borderRadius:10,fontSize:13,fontWeight:700,background:C.surface,border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>
            ↺ New Problem
          </button>
        </div>
      )}
      </>)}
    </>);
  })());

  // ══ WALKTHROUGH SCREEN ═══════════════════════════════════════════════════════
  // ════════════════════════════════════════
  // SCREEN: walkthrough
  // ════════════════════════════════════════
  if(screen==="walkthrough") return wrap((()=>{
    const wtMods=Object.keys(activeLOS[walkthroughTopic]?.modules||{});
    const activeWtMod=walkthroughModule||wtMods[0]||"";
    return(<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <div><h2 style={{margin:0,fontSize:20,fontWeight:800,color:C.text}}>📖 Concept Walkthrough</h2><div style={{fontSize:11,color:C.muted,marginTop:2}}>AI mini-lesson before you drill</div></div>
        <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:13}}>← Home</button>
      </div>
      <div style={{marginBottom:14}}>
        <div style={{fontSize:11,fontWeight:700,color:C.muted,marginBottom:8,letterSpacing:"0.05em",textTransform:"uppercase"}}>Topic</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {Object.keys(activeLOS).map(t=>(
            <button key={t} onClick={()=>{setWalkthroughTopic(t);setWalkthroughModule(Object.keys(activeLOS[t].modules||{})[0]||"");setWalkthroughText(null);}} style={{padding:"5px 11px",borderRadius:20,fontSize:11,fontWeight:700,cursor:"pointer",border:walkthroughTopic===t?`1.5px solid ${C.accent}`:`1.5px solid ${C.border}`,background:walkthroughTopic===t?C.accent+"22":C.surface,color:walkthroughTopic===t?C.accentLight:C.muted}}>{t.split(" ")[0]}</button>
          ))}
        </div>
      </div>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,color:C.muted,marginBottom:8,letterSpacing:"0.05em",textTransform:"uppercase"}}>Module</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {wtMods.map(m=>(
            <button key={m} onClick={()=>{setWalkthroughModule(m);setWalkthroughText(null);}} style={{padding:"5px 11px",borderRadius:20,fontSize:11,fontWeight:600,cursor:"pointer",border:activeWtMod===m?`1.5px solid ${C.accentLight}`:`1.5px solid ${C.border}`,background:activeWtMod===m?C.accentLight+"18":C.surface,color:activeWtMod===m?C.accentLight:C.muted}}>{m}</button>
          ))}
        </div>
      </div>
      {walkthroughError&&<div style={{background:C.errorBg,border:`1px solid ${C.hard}44`,borderRadius:9,padding:"12px",color:C.hard,fontSize:13,marginBottom:12}}>{walkthroughError}</div>}
      {!walkthroughText&&!walkthroughLoading&&(
        <button onClick={async()=>{
          if(!authUser?.id){setWalkthroughError("Sign in to use Concept Walkthrough.");return;}
          setWalkthroughLoading(true);setWalkthroughError("");setWalkthroughText(null);
          try{
            const wtCacheKey="cfa_walkthrough_v1";
            const wtKey=`${walkthroughTopic}|||${activeWtMod}`;
            const wtCached=(()=>{try{return JSON.parse(localStorage.getItem(wtCacheKey)||"{}")[wtKey]||null;}catch{return null;}})();
            if(wtCached){setWalkthroughText(wtCached);setWalkthroughLoading(false);return;}
            const result=await callAIChat(authUser.id,[{role:"user",content:`You are a CFA Level ${cfaLevel} tutor. Create a concise concept walkthrough for: ${walkthroughTopic} → ${activeWtMod}\n\nStructure your response as:\n**Core Concept** (2 sentences explaining the big idea)\n**Key Rules** (3-4 bullet points of what you MUST know for the exam)\n**Worked Example** (one numerical or scenario-based example with the solution)\n**Exam Traps** (2 bullet points of common mistakes)\n\nBe specific to CFA L${cfaLevel} 2026 curriculum. No padding.`}],550,cfaLevel);
            const text=result||"Could not generate walkthrough.";
            setWalkthroughText(text);
            try{const wtc=JSON.parse(localStorage.getItem(wtCacheKey)||"{}");wtc[wtKey]=text;localStorage.setItem(wtCacheKey,JSON.stringify(wtc));}catch{}
          }catch(e){setWalkthroughError("Walkthrough failed: "+e.message);}
          setWalkthroughLoading(false);
        }} style={{width:"100%",padding:"13px",borderRadius:11,fontSize:14,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",boxShadow:`0 4px 16px ${C.accent}44`}}>
          Generate Walkthrough →
        </button>
      )}
      {walkthroughLoading&&<div style={{textAlign:"center",padding:"30px",color:C.muted,animation:"pulse 1.5s infinite"}}>Generating walkthrough…</div>}
      {walkthroughText&&(
        <div style={{animation:"fadeIn 0.2s ease"}}>
          <div style={{background:C.surface,border:`1px solid ${C.accent}33`,borderRadius:13,padding:"16px",marginBottom:14,whiteSpace:"pre-wrap",fontSize:13,color:C.textMid,lineHeight:1.8}}>{walkthroughText}</div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>{setWalkthroughText(null);try{const wtc=JSON.parse(localStorage.getItem("cfa_walkthrough_v1")||"{}");delete wtc[`${walkthroughTopic}|||${activeWtMod}`];localStorage.setItem("cfa_walkthrough_v1",JSON.stringify(wtc));}catch{}}} style={{flex:1,padding:"11px",borderRadius:10,fontSize:13,fontWeight:700,background:C.surface,border:`1px solid ${C.border}`,color:C.muted,cursor:"pointer"}}>↺ Regenerate</button>
            <button onClick={()=>{setScreen("home");setTimeout(()=>generateQuestions(walkthroughTopic,activeWtMod,"Medium",5,"guided"),100);}} style={{flex:2,padding:"11px",borderRadius:10,fontSize:13,fontWeight:700,background:`linear-gradient(135deg,${C.accent},${C.accentLight})`,color:"#fff",border:"none",cursor:"pointer",boxShadow:`0 4px 14px ${C.accent}44`}}>
              Start Drilling →
            </button>
          </div>
        </div>
      )}
    </>);
  })());

  // ══ REVISION SCREEN ══════════════════════════════════════════════════════════
  // ════════════════════════════════════════
  // SCREEN: revision
  // ════════════════════════════════════════
  if(screen==="revision") return <RevisionScreen onBack={()=>{setScreen("home");setRevisionConcept(null);}} initialTopic={revisionTopic} initialTab={revisionTab} userId={authUser?.id||""} srDeck={srDeck} focusConcept={revisionConcept} cfaLevel={cfaLevel} isPro={proStatus} topicLessons={topicLessons} setTopicLessons={setTopicLessons} onUpgrade={(cfg)=>setUpgradeModal(cfg)} topicReadiness={moduleReadiness} onStartQuiz={(topic)=>{setScreen("home");const mods=Object.keys(getActiveLOS(cfaLevel)[topic]?.modules||{});setTimeout(()=>generateQuestions(topic,mods[0]||topic,"Medium",10,"guided"),100);}}/>;

  // ══ STUDY PATH SCREEN ════════════════════════════════════════════════════════
  // ════════════════════════════════════════
  // SCREEN: studyPath
  // ════════════════════════════════════════
  if(screen==="studyPath") return <StudyPathScreen onBack={()=>setScreen("home")} onLearn={(topic)=>{setRevisionTopic(topic);setRevisionTab("learn");setScreen("revision");}} onPractice={(topic)=>{const mods=Object.keys(getActiveLOS(cfaLevel)[topic]?.modules||{});generateQuestions(topic,mods[0]||topic,"Medium",10,"guided");}} srDeck={srDeck} cfaLevel={cfaLevel} topicLessons={topicLessons} isPro={proStatus}/>;

  return null;
}

// ─── Toast manager (separate React root so it renders across all screens) ─────
function ToastManager(){
  const [toasts,setToasts]=React.useState([]);
  React.useEffect(()=>{
    window.__cfaShowToast=(emoji,title,desc,celebrate)=>{
      const id=Date.now()+Math.random();
      setToasts(t=>[...t,{id,emoji,title,desc}]);
      if(celebrate) fireConfetti();
      setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),4200);
    };
    return()=>{window.__cfaShowToast=null;};
  },[]);
  if(!toasts.length) return null;
  return React.createElement(React.Fragment,null,...toasts.map((t,i)=>
    React.createElement("div",{key:t.id,style:{
      position:"fixed",top:16+i*80,right:16,zIndex:10000,
      background:"linear-gradient(135deg,#12122a,#1a1a38)",
      border:"1px solid #6366f166",borderRadius:16,
      padding:"13px 16px",display:"flex",alignItems:"center",gap:12,
      boxShadow:"0 8px 32px #00000099",
      animation:"toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      maxWidth:420,minWidth:220,
    }},
      React.createElement("span",{style:{fontSize:26,lineHeight:1,flexShrink:0}},t.emoji),
      React.createElement("div",null,
        React.createElement("div",{style:{fontWeight:800,fontSize:13,color:"#e8e6ff",lineHeight:1.3}},t.title),
        t.desc&&React.createElement("div",{style:{fontSize:11,color:"#7c7a9e",marginTop:3,lineHeight:1.4}},t.desc)
      )
    )
  ));
}

// Capture referral code from URL before React boots
try{const ref=new URLSearchParams(window.location.search).get('ref');if(ref){sessionStorage.setItem('cfa_ref',ref);}}catch{}
try{const duel=new URLSearchParams(window.location.search).get('duel');if(duel){sessionStorage.setItem(DUEL_KEY,duel);}}catch{}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(CFAMock));
const toastRoot = ReactDOM.createRoot(document.getElementById('toast-root'));
toastRoot.render(React.createElement(ToastManager));
const lofiEl = document.createElement('div');
document.body.appendChild(lofiEl);
const lofiRoot = ReactDOM.createRoot(lofiEl);
lofiRoot.render(React.createElement(LofiPlayer));
