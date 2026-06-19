const {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} = React;

// React loaded from CDN

// ─── 2026 OFFICIAL LOS ────────────────────────────────────────────────────────
const LOS = {
  "Ethics": {
    weight: 15,
    modules: {
      "Ethics & Trust in Investment Profession": ["explain ethics and describe the role of a code of ethics in defining a profession", "describe professions and how they establish trust and the need for high ethical standards", "explain professionalism in investment management and identify challenges to ethical behavior", "compare and contrast ethical standards with legal standards", "describe a framework for ethical decision making"],
      "Code of Ethics & Standards": ["describe the structure of the CFA Institute Professional Conduct Program and enforcement process", "identify the six components of the Code of Ethics and the seven Standards of Professional Conduct", "explain the ethical responsibilities required by the Code and Standards including sub-sections of each Standard"],
      "Standard I – Professionalism": ["demonstrate application of Standard I-A: Knowledge of the Law", "demonstrate application of Standard I-B: Independence and Objectivity", "demonstrate application of Standard I-C: Misrepresentation", "demonstrate application of Standard I-D: Misconduct"],
      "Standard II – Integrity of Capital Markets": ["demonstrate application of Standard II-A: Material Nonpublic Information", "demonstrate application of Standard II-B: Market Manipulation"],
      "Standard III – Duties to Clients": ["demonstrate application of Standard III-A: Loyalty, Prudence, and Care", "demonstrate application of Standard III-B: Fair Dealing", "demonstrate application of Standard III-C: Suitability", "demonstrate application of Standard III-D: Performance Presentation", "demonstrate application of Standard III-E: Preservation of Confidentiality"],
      "Standard IV – Duties to Employers": ["demonstrate application of Standard IV-A: Loyalty", "demonstrate application of Standard IV-B: Additional Compensation Arrangements", "demonstrate application of Standard IV-C: Responsibilities of Supervisors"],
      "Standard V – Investment Analysis": ["demonstrate application of Standard V-A: Diligence and Reasonable Basis", "demonstrate application of Standard V-B: Communication with Clients and Prospective Clients", "demonstrate application of Standard V-C: Record Retention"],
      "Standard VI – Conflicts of Interest": ["demonstrate application of Standard VI-A: Disclosure of Conflicts", "demonstrate application of Standard VI-B: Priority of Transactions", "demonstrate application of Standard VI-C: Referral Fees"],
      "Standard VII – CFA Member Responsibilities": ["demonstrate application of Standard VII-A: Conduct as Participants in CFA Institute Programs", "demonstrate application of Standard VII-B: Reference to CFA Institute, the CFA Designation, and CFA Program"],
      "GIPS": ["explain why the GIPS standards were created, who can claim compliance, and who benefits", "describe the key concepts of the GIPS Standards for Firms", "explain the purpose of composites in performance reporting", "describe the fundamentals of compliance including the firm's definition of discretion", "describe the concept of independent verification", "evaluate practices, policies, and conduct relative to Code of Ethics and Standards"]
    }
  },
  "Quantitative Methods": {
    weight: 8,
    modules: {
      "Rates and Returns": ["interpret interest rates as required rates of return, discount rates, or opportunity costs", "calculate and interpret different approaches to return measurement over time", "compare money-weighted and time-weighted rates of return and evaluate portfolio performance", "calculate and interpret annualized return measures and continuously compounded returns"],
      "Time Value of Money": ["calculate and interpret the present value of fixed-income and equity instruments based on expected future cash flows", "calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments", "explain the cash flow additivity principle and its use in calculating implied forward interest rates and option values"],
      "Statistical Concepts & Distributions": ["calculate interpret and evaluate measures of central tendency and location", "calculate interpret and evaluate measures of dispersion", "interpret and evaluate measures of skewness and kurtosis", "interpret correlation between two variables", "explain the relationship between normal and lognormal distributions and why lognormal is used to model asset prices", "describe Monte Carlo simulation and explain how it can be used in investment applications", "describe bootstrap resampling in conducting a simulation based on observed data"],
      "Probability Concepts": ["calculate expected values variances and standard deviations and demonstrate their application to investment problems", "formulate an investment problem as a probability tree and explain conditional expectations", "calculate and interpret an updated probability using Bayes' formula", "calculate and interpret expected value variance standard deviation covariances and correlations of portfolio returns", "define shortfall risk calculate the safety-first ratio and identify an optimal portfolio using Roy's safety-first criterion"],
      "Hypothesis Testing": ["explain hypothesis testing and its components including statistical significance Type I and Type II errors and the power of a test", "construct hypothesis tests and determine their statistical significance associated Type I and Type II errors and power given a significance level", "compare and contrast parametric and nonparametric tests", "explain parametric and nonparametric tests of the hypothesis that the population correlation coefficient equals zero", "explain tests of independence based on contingency table data", "compare simple random stratified random cluster convenience and judgmental sampling", "explain the central limit theorem and its importance for the distribution and standard error of the sample mean"],
      "Correlation & Regression": ["describe a simple linear regression model and how least squares criterion is used to estimate regression coefficients", "explain the assumptions underlying the simple linear regression model and how residuals indicate if assumptions are violated", "calculate and interpret measures of fit and formulate and evaluate tests of fit and regression coefficients", "describe the use of ANOVA in regression analysis and calculate the standard error of estimate", "calculate and interpret the predicted value for the dependent variable and a prediction interval", "describe different functional forms of simple linear regressions"]
    }
  },
  "Economics": {
    weight: 8,
    modules: {
      "Firm & Market Structures": ["determine and interpret breakeven and shutdown points of production and how economies of scale affect costs", "describe characteristics of perfect competition monopolistic competition oligopoly and pure monopoly", "explain supply and demand relationships under monopolistic competition including optimal price and output", "explain supply and demand relationships under oligopoly including optimal price and output", "identify the type of market structure within which a firm operates and describe concentration measures"],
      "Aggregate Output & Business Cycles": ["describe the business cycle and its phases", "describe credit cycles", "describe how resource use consumer and business activity housing sector activity and external trade vary over the business cycle"],
      "Monetary Policy": ["describe the roles and objectives of central banks", "describe tools used to implement monetary policy and the monetary transmission mechanism", "describe qualities of effective central banks and contrast their use of inflation interest rate and exchange rate targeting", "explain the interaction of monetary and fiscal policy"],
      "Fiscal Policy": ["compare monetary and fiscal policy", "describe roles and objectives of fiscal policy and arguments about whether the size of national debt relative to GDP matters", "describe tools of fiscal policy including their advantages and disadvantages", "explain the implementation of fiscal policy and difficulties of implementation"],
      "International Trade & Currency": ["describe the benefits and costs of international trade", "compare types of trade restrictions such as tariffs quotas and export subsidies", "explain motivations for and advantages of trading blocs common markets and economic unions", "describe the foreign exchange market including its functions and participants", "describe exchange rate regimes and explain the effects of exchange rates on international trade and capital flows", "calculate and interpret currency cross-rates", "explain the arbitrage relationship between spot and forward exchange rates and calculate a forward rate", "describe geopolitical risk and tools of geopolitics and their impact on regions and economies"]
    }
  },
  "Financial Statement Analysis": {
    weight: 13,
    modules: {
      "FSA Framework & Sources": ["describe the steps in the financial statement analysis framework", "describe the roles of financial statement analysis", "describe the importance of regulatory filings financial statement notes management's commentary and audit reports", "describe implications for financial analysis of alternative financial reporting systems"],
      "Income Statement Analysis": ["describe general principles of revenue recognition and specific revenue recognition applications", "describe general principles of expense recognition and contrast costs that are capitalized versus those that are expensed", "describe the financial reporting treatment of non-recurring items and changes in accounting policies", "describe how earnings per share is calculated and calculate basic and diluted EPS for companies with simple and complex capital structures", "evaluate a company's financial performance using common-size income statements and financial ratios"],
      "Balance Sheet Analysis": ["explain the financial reporting and disclosures related to intangible assets", "explain the financial reporting and disclosures related to goodwill", "explain the financial reporting and disclosures related to financial instruments", "explain the financial reporting and disclosures related to non-current liabilities", "calculate and interpret common-size balance sheets and related financial ratios"],
      "Cash Flow Statement": ["describe how the cash flow statement is linked to the income statement and the balance sheet", "describe the steps in the preparation of direct and indirect cash flow statements", "demonstrate the conversion of cash flows from the indirect to direct method", "contrast cash flow statements prepared under IFRS and US GAAP", "analyze and interpret both reported and common-size cash flow statements", "calculate and interpret free cash flow to the firm free cash flow to equity and performance and coverage cash flow ratios"],
      "Inventories & Long-Lived Assets": ["describe the measurement of inventory at the lower of cost and net realisable value and its implications", "calculate and explain how inflation and deflation of inventory costs affect financial statements and ratios", "compare the financial reporting of intangible assets purchased internally developed and acquired in a business combination", "explain and evaluate how impairment and derecognition of property plant and equipment and intangible assets affect financial statements"],
      "Income Taxes & Long-Term Liabilities": ["contrast accounting profit taxable income taxes payable and income tax expense and temporary versus permanent differences", "explain how deferred tax liabilities and assets are created and factors that determine how they should be treated for financial analysis", "calculate interpret and contrast an issuer's effective tax rate statutory tax rate and cash tax rate", "explain the financial reporting of leases from the perspectives of lessors and lessees", "explain the financial reporting of defined contribution defined benefit and stock-based compensation plans"],
      "Financial Ratios": ["describe tools and techniques used in financial analysis including their uses and limitations", "calculate and interpret activity liquidity solvency and profitability ratios", "describe relationships among ratios and evaluate a company using ratio analysis", "demonstrate the application of DuPont analysis of return on equity and calculate and interpret effects of changes in its components", "describe the uses of industry-specific ratios used in financial analysis"],
      "Financial Reporting Quality": ["compare financial reporting quality with the quality of reported results including quality of earnings cash flow and balance sheet items", "describe a spectrum for assessing financial reporting quality", "explain the difference between conservative and aggressive accounting", "describe motivations that might cause management to issue financial reports that are not high quality", "describe accounting warning signs and methods for detecting manipulation of information in financial reports", "describe presentation choices including non-GAAP measures that could be used to influence an analyst's opinion"]
    }
  },
  "Corporate Issuers": {
    weight: 9,
    modules: {
      "Corporate Structure & Governance": ["compare the organizational forms of businesses", "describe key features of corporate issuers", "compare publicly and privately owned corporate issuers", "describe the principal-agent relationship and conflicts that may arise between stakeholder groups", "describe corporate governance and mechanisms to manage stakeholder relationships and mitigate risks", "describe potential risks of poor corporate governance and benefits of effective corporate governance", "describe environmental social and governance factors of corporate issuers considered by investors"],
      "Working Capital Management": ["explain the cash conversion cycle and compare issuers' cash conversion cycles", "explain liquidity and compare issuers' liquidity levels", "describe issuers' objectives and compare methods for managing working capital and liquidity"],
      "Capital Investments & Allocation": ["describe types of capital investments", "describe the capital allocation process calculate NPV IRR and ROIC and contrast their use in capital allocation", "describe principles of capital allocation and common capital allocation pitfalls", "describe types of real options relevant to capital investments"],
      "Capital Structure & Leverage": ["calculate and interpret the weighted-average cost of capital for a company", "explain factors affecting capital structure and the weighted-average cost of capital", "explain the Modigliani-Miller propositions regarding capital structure", "describe optimal and target capital structures"],
      "Business Models & ESG": ["describe key features of business models", "describe various types of business models", "compare the financial claims and motivations of lenders and shareholders", "describe a company's stakeholder groups and compare their interests"]
    }
  },
  "Equity": {
    weight: 11,
    modules: {
      "Market Organization & Structure": ["explain the main functions of the financial system", "describe classifications of assets and markets", "describe the major types of securities currencies contracts commodities and real assets that trade in organized markets", "compare positions an investor can take in an asset", "calculate and interpret the leverage ratio the rate of return on a margin transaction and the security price at which the investor would receive a margin call", "compare execution validity and clearing instructions and compare market orders with limit orders", "describe how securities contracts and currencies are traded in quote-driven order-driven and brokered markets", "describe objectives of market regulation"],
      "Security Market Indices": ["describe a security market index and calculate and interpret the value price return and total return of an index", "describe the choices and issues in index construction and management", "compare the different weighting methods used in index construction and calculate value and return given weighting method", "describe rebalancing and reconstitution of an index", "describe types of equity indexes fixed-income indexes and indexes representing alternative investments"],
      "Market Efficiency": ["describe market efficiency and related concepts including their importance to investment practitioners", "contrast market value and intrinsic value and explain factors that affect a market's efficiency", "contrast weak-form semi-strong-form and strong-form market efficiency", "explain the implications of each form of market efficiency for fundamental analysis technical analysis and active vs passive management", "describe market anomalies and behavioral finance and its potential relevance to understanding market anomalies"],
      "Equity Valuation – DDM & Multiples": ["evaluate whether a security given its current market price and a value estimate is overvalued fairly valued or undervalued", "describe major categories of equity valuation models", "explain the rationale for using present value models to value equity and describe the dividend discount and free-cash-flow-to-equity models", "calculate and interpret the intrinsic value of an equity security based on the Gordon growth dividend discount model or a two-stage DDM", "explain the rationale for using price multiples to value equity and how the price to earnings multiple relates to fundamentals", "calculate and interpret price to earnings price to operating cash flow price to sales and price to book value multiples", "describe enterprise value multiples and their use in estimating equity value", "calculate the intrinsic value of a non-callable non-convertible preferred stock"],
      "Industry & Company Analysis": ["describe the purposes of and steps involved in industry and competitive analysis", "determine an industry's size growth characteristics profitability and market share trends", "analyze an industry's structure and external influences using Porter's Five Forces and PESTLE frameworks", "evaluate the competitive strategy and position of a company", "evaluate a company's revenue and revenue drivers including pricing power", "evaluate a company's operating profitability and working capital using key measures"]
    }
  },
  "Fixed Income": {
    weight: 11,
    modules: {
      "Bond Features & Pricing": ["describe the features of a fixed-income security and the contents of a bond indenture", "describe common cash flow structures of fixed-income instruments and contrast cash flow contingency provisions", "describe how legal regulatory and tax considerations affect the issuance and trading of fixed-income securities", "calculate a bond's price given a yield-to-maturity on or between coupon dates", "identify the relationships among a bond's price coupon rate maturity and yield-to-maturity", "describe matrix pricing", "describe funding choices by sovereign and non-sovereign governments quasi-government entities and supranational agencies"],
      "Yield Measures & Duration": ["calculate annual yield on a bond for varying compounding periods in a year", "compare calculate and interpret yield and yield spread measures for fixed-rate bonds", "calculate and interpret yield spread measures for floating-rate instruments and yield measures for money market instruments", "define spot rates and the spot curve and calculate the price of a bond using spot rates", "define par and forward rates and calculate par rates forward rates from spot rates spot rates from forward rates", "calculate and interpret the sources of return from investing in a fixed-rate bond", "define calculate and interpret Macaulay duration", "define calculate and interpret modified duration money duration and the price value of a basis point", "explain how a bond's maturity coupon and yield level affect its interest rate risk", "calculate and interpret convexity and describe the convexity adjustment", "calculate the percentage price change of a bond for a specified change in yield given duration and convexity"],
      "Credit Analysis": ["describe credit risk and its components probability of default and loss given default", "describe the uses of ratings from credit rating agencies and their limitations", "describe macroeconomic market and issuer-specific factors that influence the level and volatility of yield spreads", "explain special considerations when evaluating the credit of sovereign and non-sovereign government debt issuers", "describe the qualitative and quantitative factors used to evaluate a corporate borrower's creditworthiness", "calculate and interpret financial ratios used in credit analysis", "describe the seniority rankings of debt secured versus unsecured debt and the priority of claims in bankruptcy"],
      "Structured Products & MBS": ["explain benefits of securitization for issuers investors economies and financial markets", "describe securitization including the parties and the roles they play", "describe characteristics and risks of covered bonds and how they differ from other asset-backed securities", "describe typical credit enhancement structures used in securitizations", "describe types and characteristics of non-mortgage asset-backed securities including the cash flows and risks", "define prepayment risk and describe time tranching structures in securitizations", "describe types and characteristics of residential mortgage-backed securities including mortgage pass-through securities and CMOs", "describe characteristics and risks of commercial mortgage-backed securities"],
      "Short-Term Funding & Repos": ["compare short-term funding alternatives available to corporations and financial institutions", "describe repurchase agreements their uses and their benefits and risks", "contrast the long-term funding of investment-grade versus high-yield corporate issuers"]
    }
  },
  "Derivatives": {
    weight: 6,
    modules: {
      "Derivative Features & Markets": ["define a derivative and describe basic features of a derivative instrument", "describe the basic features of derivative markets and contrast over-the-counter and exchange-traded derivative markets", "define forward contracts futures contracts swaps options and credit derivatives and compare their basic characteristics", "contrast forward commitments with contingent claims", "describe benefits and risks of derivative instruments and compare the use of derivatives among issuers and investors"],
      "Forwards & Futures": ["explain how the value and price of a forward contract are determined at initiation during the life of the contract and at expiration", "explain how forward rates are determined for interest rate forward contracts", "compare the value and price of forward and futures contracts and explain why forward and futures prices differ", "explain how the concepts of arbitrage and replication are used in pricing derivatives", "explain the difference between the spot and expected future price of an underlying and the cost of carry"],
      "Options – Payoffs & Strategies": ["determine the value at expiration and profit from a long or a short position in a call or put option", "explain the exercise value moneyness and time value of an option", "identify the factors that determine the value of an option and describe how each factor affects the value of an option", "explain put-call parity for European options and put-call forward parity for European options", "explain how to value a derivative using a one-period binomial model", "describe the concept of risk neutrality in derivatives pricing"],
      "Swaps": ["describe how swap contracts are similar to but different from a series of forward contracts", "contrast the value and price of swaps", "explain the pricing and valuation of interest rate and other swaps"]
    }
  },
  "Alternatives": {
    weight: 7,
    modules: {
      "Alternative Investment Features": ["describe features and categories of alternative investments", "compare direct investment co-investment and fund investment methods for alternative investments", "describe investment ownership and compensation structures commonly used in alternative investments", "describe the performance appraisal of alternative investments", "calculate and interpret alternative investment returns both before and after fees"],
      "Private Equity & Debt": ["explain features of private equity and its investment characteristics", "explain features of private debt and its investment characteristics", "describe the diversification benefits that private capital can provide"],
      "Real Assets & Infrastructure": ["explain features and characteristics of real estate and the investment characteristics of real estate investments", "explain features and characteristics of infrastructure and the investment characteristics of infrastructure investments", "explain features of raw land timberland and farmland and their investment characteristics", "describe features of commodities and their investment characteristics", "analyze sources of risk return and diversification among natural resource investments"],
      "Hedge Funds": ["explain investment features of hedge funds and contrast them with other asset classes", "describe investment forms and vehicles used in hedge fund investments", "analyze sources of risk return and diversification among hedge fund investments"],
      "Digital Assets": ["describe financial applications of distributed ledger technology", "explain investment features of digital assets and contrast them with other asset classes", "describe investment forms and vehicles used in digital asset investments", "analyze sources of risk return and diversification among digital asset investments"]
    }
  },
  "Portfolio Management": {
    weight: 8,
    modules: {
      "Portfolio Risk & Return": ["describe characteristics of the major asset classes that investors consider in forming portfolios", "explain risk aversion and its implications for portfolio selection", "calculate and interpret the mean variance and covariance of asset returns based on historical data", "calculate and interpret portfolio standard deviation", "describe the effect on a portfolio's risk of investing in assets that are less than perfectly correlated", "describe and interpret the minimum-variance and efficient frontiers of risky assets and the global minimum-variance portfolio", "explain the selection of an optimal portfolio given an investor's utility and the capital allocation line"],
      "CAPM & Factor Models": ["describe the implications of combining a risk-free asset with a portfolio of risky assets", "explain the capital allocation line and the capital market line", "explain systematic and nonsystematic risk and why an investor should not expect to receive additional return for bearing nonsystematic risk", "explain return generating models including the market model and their uses", "calculate and interpret beta", "explain the capital asset pricing model including its assumptions and the security market line", "calculate and interpret the expected return of an asset using the CAPM", "calculate and interpret the Sharpe ratio Treynor ratio M2 and Jensen's alpha"],
      "Portfolio Planning & Construction": ["describe the reasons for a written investment policy statement", "describe the major components of an IPS", "describe risk and return objectives and how they may be developed for a client", "explain the difference between the willingness and the ability to take risk", "describe the investment constraints of liquidity time horizon tax concerns legal and regulatory factors and unique circumstances", "explain the specification of asset classes in relation to asset allocation", "describe how ESG considerations may be integrated into portfolio planning and construction", "describe the steps in the portfolio management process", "describe types of investors and distinctive characteristics and needs of each"],
      "Behavioral Finance & Biases": ["compare and contrast cognitive errors and emotional biases", "discuss commonly recognized behavioral biases and their implications for financial decision making", "describe how behavioral biases of investors can lead to market characteristics not explained by traditional finance"],
      "Risk Management": ["define risk management and describe features of a risk management framework", "define risk governance and describe elements of effective risk governance", "explain how risk tolerance affects risk management", "describe risk budgeting and its role in risk governance", "identify financial and non-financial sources of risk and describe how they may interact", "describe methods for measuring and modifying risk exposures and factors to consider in choosing among the methods"]
    }
  }
};

// LOS verb difficulty mapping
const LOS_VERB_DIFFICULTY = {
  Easy: ["describe", "define", "identify", "explain", "list", "name", "state", "recognize", "recall", "outline"],
  Medium: ["calculate", "compare", "contrast", "interpret", "demonstrate", "apply", "classify", "distinguish"],
  Hard: ["evaluate", "analyze", "formulate", "assess", "critique", "justify", "recommend", "construct", "synthesize"]
};
const TOPIC_MAP = {};
Object.entries(LOS).forEach(([topic, {
  weight,
  modules
}]) => {
  TOPIC_MAP[topic] = {
    weight,
    subtopics: Object.keys(modules)
  };
});

// Common misconceptions per topic for distractor engineering
const MISCONCEPTIONS = {
  "Ethics": ["confusing 'should' with 'must' in Standards", "applying employer policy over CFA Standards", "assuming disclosure alone removes conflict of interest", "confusing independence with objectivity", "mixing personal trading rules with client trading rules"],
  "Quantitative Methods": ["confusing Type I and Type II error", "mixing money-weighted with time-weighted return", "applying arithmetic mean when geometric mean is required", "confusing standard deviation with variance", "misidentifying the null hypothesis direction"],
  "Financial Statement Analysis": ["confusing operating and financing cash flows", "mixing LIFO and FIFO effects on profitability vs inventory", "confusing deferred tax asset with deferred tax liability", "misapplying direct vs indirect cash flow method", "confusing basic and diluted EPS for antidilutive securities"],
  "Fixed Income": ["confusing Macaulay and modified duration", "misidentifying price-yield relationship direction", "confusing coupon rate with current yield with YTM", "mixing par value with market value in yield calculations", "confusing prepayment risk with extension risk"],
  "Equity": ["confusing price return with total return index", "misapplying Gordon growth model assumptions", "confusing EV/EBITDA with P/E interpretation", "mixing strong-form with semi-strong-form market efficiency", "confusing book value with market value"],
  "Portfolio Management": ["confusing systematic with unsystematic risk", "misinterpreting beta greater than 1 vs less than 1", "confusing Sharpe ratio with Treynor ratio use cases", "mixing CML with SML application", "confusing risk tolerance with risk capacity"],
  "Derivatives": ["confusing long put payoff with short call", "misidentifying which party benefits from forward price vs spot", "confusing intrinsic value with time value of options", "mixing cost of carry direction for different underlying assets", "confusing value and price of a swap at inception"],
  "Alternatives": ["confusing 2-and-20 calculation timing", "mixing committed capital with invested capital for PE IRR", "confusing direct cap rate with discount rate for real estate", "misidentifying hedge fund strategy from return pattern", "confusing NAV per share calculation for funds"],
  "Economics": ["confusing monetary vs fiscal policy transmission", "misidentifying expansionary vs contractionary policy", "confusing current account with capital account", "mixing nominal and real exchange rate appreciation direction", "confusing oligopoly with monopolistic competition features"],
  "Corporate Issuers": ["confusing NPV and IRR decision rules when they conflict", "misidentifying Modigliani-Miller proposition with vs without taxes", "confusing cash conversion cycle components", "mixing target capital structure with optimal capital structure", "confusing operating leverage with financial leverage"]
};
// ─── STORAGE (localStorage + optional Supabase sync) ─────────────────────────
const BACKUP_KEY = "cfa_backup_v7";

// Supabase config — set via app settings, persisted in localStorage
function getSupabaseConfig() {
  try {
    return JSON.parse(localStorage.getItem("cfa_supabase_config") || "null");
  } catch {
    return null;
  }
}

// localStorage-based storage (primary — works in real browsers with no size limits)
async function storageGet(key) {
  try {
    const v = localStorage.getItem("cfa_" + key);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}
async function storageSet(key, val) {
  try {
    localStorage.setItem("cfa_" + key, JSON.stringify(val));
    return true;
  } catch (e) {
    // localStorage quota exceeded — try clearing non-essential keys
    try {
      ["cfa_cfa_qdb_v7", "cfa___health_check__", "cfa_cfa_focus_cache"].forEach(k => {
        try {
          localStorage.removeItem(k);
        } catch {}
      });
      localStorage.setItem("cfa_" + key, JSON.stringify(val));
      return true;
    } catch {
      return false;
    }
  }
}
async function storageHealth() {
  try {
    localStorage.setItem("__hc__", "1");
    localStorage.removeItem("__hc__");
    return true;
  } catch {
    return false;
  }
}

// Supabase sync — saves entire data blob as one row
async function supabaseSync(cfg, history, srDeck, usageStats = {}) {
  if (!cfg || !cfg.url || !cfg.key) return false;
  try {
    const payload = {
      user_id: "default",
      data: JSON.stringify({
        version: 3,
        history,
        srDeck,
        usageStats,
        savedAt: new Date().toISOString()
      }),
      updated_at: new Date().toISOString()
    };
    // Upsert in one request — avoids GET+PATCH race and silent PATCH failures
    const res = await fetch(`${cfg.url}/rest/v1/sessions`, {
      method: "POST",
      headers: {
        "apikey": cfg.key,
        "Authorization": `Bearer ${cfg.key}`,
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,return=minimal"
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Supabase sync failed:", res.status, errText);
      return false;
    }
    return true;
  } catch (e) {
    console.error("Supabase sync error:", e);
    return false;
  }
}
async function supabaseLoad(cfg) {
  if (!cfg || !cfg.url || !cfg.key) return null;
  try {
    const res = await fetch(`${cfg.url}/rest/v1/sessions?user_id=eq.default&order=updated_at.desc&limit=1`, {
      headers: {
        "apikey": cfg.key,
        "Authorization": `Bearer ${cfg.key}`
      }
    });
    const rows = await res.json();
    if (rows && rows.length > 0 && rows[0].data) return JSON.parse(rows[0].data);
    return null;
  } catch {
    return null;
  }
}

// ─── SM-2 ─────────────────────────────────────────────────────────────────────
function sm2Update(card, correct) {
  let {
    interval = 0,
    repetitions = 0,
    ef = 2.5
  } = card;
  if (correct) {
    repetitions += 1;
    interval = SM2_INTERVALS[Math.min(repetitions - 1, SM2_INTERVALS.length - 1)];
    ef = Math.max(1.3, ef + 0.1);
  } else {
    repetitions = 0;
    interval = 1;
    ef = Math.max(1.3, ef - 0.2);
  }
  return {
    ...card,
    interval,
    repetitions,
    ef,
    nextReview: new Date(Date.now() + interval * 86400000).toISOString().slice(0, 10)
  };
}
function getDueCards(srDeck) {
  const today = new Date().toISOString().slice(0, 10);
  return Object.values(srDeck).filter(c => c.nextReview <= today);
}
function getLeeches(srDeck) {
  return Object.values(srDeck).filter(c => (c.wrongCount || 0) >= 4);
}
function getForgettingCurve(srDeck) {
  const today = new Date();
  const upcoming = {
    tomorrow: 0,
    in3days: 0,
    in7days: 0
  };
  Object.values(srDeck).forEach(c => {
    if (!c.nextReview) return;
    const daysUntil = Math.ceil((new Date(c.nextReview) - today) / 86400000);
    if (daysUntil === 1) upcoming.tomorrow++;else if (daysUntil <= 3) upcoming.in3days++;else if (daysUntil <= 7) upcoming.in7days++;
  });
  return upcoming;
}

// ─── QUESTION DEDUPLICATION ──────────────────────────────────────────────────
function hashQuestion(q) {
  // Simple hash: first 60 chars of question text normalised
  return q.question.slice(0, 60).toLowerCase().replace(/\s+/g, " ").trim();
}
function filterNewQuestions(questions, qdb) {
  return questions.filter(q => {
    const h = hashQuestion(q);
    return !qdb[h];
  });
}
function addToQDB(questions, qdb) {
  const updated = {
    ...qdb
  };
  questions.forEach(q => {
    const h = hashQuestion(q);
    updated[h] = {
      seen: Date.now(),
      topic: q._topic,
      subtopic: q._subtopic
    };
  });
  // Cap at 400 entries — prune oldest to prevent unbounded growth
  const entries = Object.entries(updated);
  if (entries.length > 400) {
    entries.sort((a, b) => a[1].seen - b[1].seen);
    const pruned = {};
    entries.slice(-400).forEach(([k, v]) => {
      pruned[k] = v;
    });
    return pruned;
  }
  return updated;
}

// ─── PROMPTS ─────────────────────────────────────────────────────────────────
function buildQuestionPrompt(topic, module, difficulty, count) {
  const losStatements = LOS[topic]?.modules[module] || [];
  const misconceptions = (MISCONCEPTIONS[topic] || []).slice(0, 3).join("; ");
  const verbsForDiff = LOS_VERB_DIFFICULTY[difficulty];
  const priorityLOS = losStatements.filter(l => verbsForDiff.some(v => l.toLowerCase().startsWith(v) || l.toLowerCase().includes(` ${v} `)));
  const allLOS = (priorityLOS.length >= count ? priorityLOS : losStatements).slice(0, count + 2);
  const losText = allLOS.map((l, i) => `${i + 1}. ${l}`).join("\n");
  return `CFA L1 question generator. Topic: ${topic} | Module: ${module} | Difficulty: ${difficulty} | Generate: ${count} questions.

LOS (test these):
${losText}

Misconceptions to use in wrong options: ${misconceptions}

Difficulty: ${difficulty === "Easy" ? "recall/definition" : difficulty === "Medium" ? "apply formula to scenario with numbers" : "multi-step analysis or nuanced judgment"}

Return ONLY a JSON array, no markdown:
[{"id":1,"question":"...","options":{"A":"...","B":"...","C":"..."},"answer":"A","explanation":"...","concept":"3-5 word tag","los_tested":"LOS text","misconception_targeted":"error exploited"}]

Rules: 3 options only (A,B,C). Each wrong option exploits a misconception. Spread questions across different LOS. Ethics=scenario with named person+Standard number. Quant Medium/Hard=specific numbers.`;
}

// Expand compact JSON keys returned by optimised prompt
function buildFSAStatementPrompt(subtopic, difficulty) {
  return `You are a CFA Level 1 exam writer. Create an FSA financial statement analysis problem.

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
function formatStatements(raw) {
  const is = raw.statements?.income_statement || {};
  const bs = raw.statements?.balance_sheet || {};
  const sup = raw.statements?.supplemental || {};
  const fmt = n => n != null ? `$${Number(n).toLocaleString()}M` : "—";
  return `INCOME STATEMENT: Revenue ${fmt(is.Revenue)} | COGS ${fmt(is.COGS)} | Gross Profit ${fmt(is.Gross_Profit)} | OpEx ${fmt(is.Operating_Expenses)} | EBIT ${fmt(is.EBIT)} | Interest ${fmt(is.Interest_Expense)} | Net Income ${fmt(is.Net_Income)}\nBALANCE SHEET: Cash ${fmt(bs.Cash)} | AR ${fmt(bs.Accounts_Receivable)} | Inventory ${fmt(bs.Inventory)} | Current Assets ${fmt(bs.Total_Current_Assets)} | Total Assets ${fmt(bs.Total_Assets)} | AP ${fmt(bs.Accounts_Payable)} | Curr Liab ${fmt(bs.Total_Current_Liabilities)} | LT Debt ${fmt(bs.Long_Term_Debt)} | Total Equity ${fmt(bs.Total_Equity)}\nSUPP: Shares ${fmt(sup.Shares_Outstanding)} | DPS $${sup.Dividends_Per_Share || 0} | D&A ${fmt(sup.Depreciation)} | CapEx ${fmt(sup.CapEx)}`;
}
const RELATED_MODULES = {
  "Financial Statement Analysis": [["Income Statement Analysis", "Financial Ratios"], ["Cash Flow Statement", "Financial Ratios"], ["Inventories & Long-Lived Assets", "Income Taxes & Long-Term Liabilities"]],
  "Fixed Income": [["Bond Features & Pricing", "Yield Measures & Duration"], ["Yield Measures & Duration", "Credit Analysis"]],
  "Equity": [["Equity Valuation – DDM & Multiples", "Industry & Company Analysis"], ["Market Efficiency", "Equity Valuation – DDM & Multiples"]],
  "Derivatives": [["Forwards & Futures", "Options – Payoffs & Strategies"], ["Options – Payoffs & Strategies", "Swaps"]],
  "Corporate Issuers": [["Capital Structure & Leverage", "Capital Investments & Allocation"], ["Working Capital Management", "Capital Structure & Leverage"]],
  "Portfolio Management": [["Portfolio Risk & Return", "CAPM & Factor Models"], ["CAPM & Factor Models", "Portfolio Planning & Construction"]]
};
function getRelatedModules(topic) {
  return RELATED_MODULES[topic] || [];
}
function generateStudyPlan(history, srDeck, examDate, daysLeft) {
  const topics = Object.entries(LOS).map(([name, {
    weight,
    modules
  }]) => {
    const topicSessions = history.filter(h => h.topic === name);
    const accuracy = topicSessions.length ? topicSessions.reduce((s, h) => s + (h.pct || 0), 0) / topicSessions.length : 0;
    const adjustedWeight = weight * (topicSessions.length === 0 ? 1.5 : accuracy < 60 ? 1.3 : accuracy > 80 ? 0.8 : 1.0);
    return {
      name,
      weight,
      adjustedWeight,
      modules: Object.keys(modules),
      accuracy,
      totalModules: Object.keys(modules).length
    };
  });
  const studyDays = Math.min(daysLeft - 3, 55);
  const plan = [];
  const totalWeight = topics.reduce((s, t) => s + t.adjustedWeight, 0);
  let dayIdx = 0;
  for (const t of topics.sort((a, b) => b.adjustedWeight - a.adjustedWeight)) {
    const daysForTopic = Math.max(1, Math.round(t.adjustedWeight / totalWeight * studyDays * 0.7));
    for (let d = 0; d < daysForTopic && dayIdx < studyDays; d++, dayIdx++) {
      const mod = t.modules[d % t.modules.length];
      plan.push({
        dayNum: dayIdx + 1,
        date: new Date(Date.now() + dayIdx * 86400000),
        topic: t.name,
        module: mod,
        count: 10,
        difficulty: t.accuracy < 60 ? "Easy" : "Medium",
        type: "learn"
      });
    }
  }
  while (dayIdx < studyDays) {
    const weakTopic = topics.sort((a, b) => a.accuracy - b.accuracy)[0];
    plan.push({
      dayNum: dayIdx + 1,
      date: new Date(Date.now() + dayIdx * 86400000),
      topic: weakTopic.name,
      module: weakTopic.modules[0],
      count: 10,
      difficulty: "Hard",
      type: "review"
    });
    dayIdx++;
  }
  for (let i = 0; i < 3 && dayIdx < daysLeft; i++, dayIdx++) {
    plan.push({
      dayNum: dayIdx + 1,
      date: new Date(Date.now() + dayIdx * 86400000),
      topic: "Ethics",
      module: "Code of Ethics & Standards",
      count: 10,
      difficulty: "Hard",
      type: "ethics"
    });
  }
  return plan;
}
function buildVignettePrompt(topic, module, difficulty, vigCount, subtopic2 = null) {
  const los = (LOS[topic]?.modules[module] || []).slice(0, 4).map((l, i) => `${i + 1}. ${l}`).join("\n");
  return `You are a CFA Level 1 exam writer. Generate ${vigCount} item set(s) for ${topic} — ${module} at ${difficulty} difficulty.

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
- Difficulty ${difficulty}: ${difficulty === "Easy" ? "recall/identify" : difficulty === "Medium" ? "apply/calculate" : "evaluate/synthesize across multiple LOS"}
- Output ONLY valid JSON, no markdown${subtopic2 ? `\n- The vignette MUST require analysis of BOTH ${module} AND ${subtopic2} — integrate them naturally into a single realistic scenario` : ""}`;
}
function flattenVignettes(rawVignettes, topic, module) {
  const arr = Array.isArray(rawVignettes) ? rawVignettes : rawVignettes?.vignettes || [];
  const qs = [];
  arr.forEach((v, vi) => {
    const scenario = v.scenario || v.vignette || "";
    (v.questions || []).forEach((q, qi) => {
      qs.push({
        id: `vig_${vi}_${qi}_${Date.now()}`,
        question: scenario ? `SCENARIO:\n${scenario}\n\nQUESTION: ${q.q || q.question || ""}` : q.q || q.question || "",
        options: q.o || q.options || {},
        answer: q.a || q.answer || "A",
        explanation: q.e || q.explanation || "",
        concept: q.c || q.concept || "",
        los_tested: q.l || q.los_tested || "",
        misconception_targeted: q.m || q.misconception_targeted || "",
        _topic: topic,
        _subtopic: module,
        _isVignette: true,
        _vignetteIdx: vi,
        _qIdx: qi
      });
    });
  });
  return qs;
}
function expandQuestionKeys(qs) {
  return qs.map(q => ({
    id: q.id,
    question: q.q || q.question || "",
    options: q.o || q.options || {},
    answer: q.a || q.answer || "A",
    explanation: q.e || q.explanation || "",
    concept: q.c || q.concept || "",
    los_tested: q.l || q.los_tested || "",
    misconception_targeted: q.m || q.misconception_targeted || ""
  }));
}
const FOCUS_PROMPT = `You are a CFA Level 1 study coach. Based on this student's data, recommend exactly 3 modules to focus on TODAY.

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
const fmt = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
function getDaysToExam() {
  return Math.max(0, Math.ceil((EXAM_DATE - new Date()) / 86400000));
}
function getLOSMastery(history, topic, module) {
  const losStatements = LOS[topic]?.modules[module] || [];
  const sessions = history.filter(h => h.topic === topic && h.subtopic === module);
  const testedLOS = new Set(sessions.flatMap(s => s.wrongs?.map(w => w.los_tested) || []));
  return {
    total: losStatements.length,
    tested: Math.min(sessions.length * 2, losStatements.length),
    untested: Math.max(0, losStatements.length - Math.min(sessions.length * 2, losStatements.length))
  };
}
function getWrongAnswerPatterns(history) {
  const patterns = {};
  history.forEach(session => {
    (session.wrongs || []).forEach(w => {
      if (!w.userAnswer || !w.answer) return;
      const key = `${w.concept || session.subtopic}`;
      if (!patterns[key]) patterns[key] = {
        concept: key,
        topic: session.topic,
        wrongChoice: w.userAnswer,
        correctChoice: w.answer,
        count: 0,
        examples: []
      };
      patterns[key].count++;
      if (patterns[key].examples.length < 2) patterns[key].examples.push(w.question?.slice(0, 80));
    });
  });
  return Object.values(patterns).filter(p => p.count >= 2).sort((a, b) => b.count - a.count).slice(0, 5);
}
function getSessionQuality(session) {
  if (!session) return null;
  const accuracyScore = session.pct;
  const speedScore = session.total && session.timeTaken ? Math.min(100, Math.round(TIME_PER_Q * session.total / session.timeTaken * 100)) : 100;
  const difficultyBonus = {
    Easy: 0,
    Medium: 10,
    Hard: 20
  }[session.difficulty] || 0;
  const quality = Math.min(100, Math.round(accuracyScore * 0.6 + speedScore * 0.3 + difficultyBonus));
  return {
    quality,
    accuracyScore,
    speedScore,
    difficultyBonus,
    label: quality >= 80 ? "Excellent" : quality >= 65 ? "Good" : quality >= 50 ? "Fair" : "Needs work"
  };
}
function getModuleReadiness(history) {
  const now = Date.now();
  return Object.entries(LOS).map(([topic, {
    weight,
    modules
  }]) => {
    const moduleNames = Object.keys(modules);
    const sessions = history.filter(h => h.topic === topic);
    const modulesCovered = [...new Set(sessions.map(h => h.subtopic))];
    const coverage = modulesCovered.length / moduleNames.length;
    let wCorrect = 0,
      wTotal = 0;
    sessions.forEach(s => {
      const ageDays = (now - s.id) / 86400000;
      const w = ageDays <= 7 ? 3 : ageDays <= 30 ? 2 : 1;
      wCorrect += s.score * w;
      wTotal += s.total * w;
    });
    const accuracy = wTotal > 0 ? Math.round(wCorrect / wTotal * 100) : null;
    const recent3 = sessions.slice(0, 3),
      prev3 = sessions.slice(3, 6);
    const r3avg = recent3.length ? recent3.reduce((s, h) => s + h.pct, 0) / recent3.length : null;
    const p3avg = prev3.length ? prev3.reduce((s, h) => s + h.pct, 0) / prev3.length : null;
    const trend = r3avg !== null && p3avg !== null ? r3avg - p3avg > 3 ? "up" : r3avg - p3avg < -3 ? "down" : "flat" : null;
    const trendDelta = r3avg !== null && p3avg !== null ? Math.round(r3avg - p3avg) : null;
    const totalQs = sessions.reduce((s, h) => s + h.total, 0);
    const reliable = totalQs >= 10;
    let readiness = 0;
    if (accuracy !== null) {
      readiness = Math.round(accuracy * 0.55 + coverage * 100 * 0.30 + Math.min(sessions.length * 3, 15));
      if (!reliable) readiness = Math.round(readiness * 0.7);
    }
    readiness = Math.min(99, readiness);
    const untouchedModules = moduleNames.filter(m => !modulesCovered.includes(m));
    const moduleStats = {};
    moduleNames.forEach(m => {
      const ms = sessions.filter(h => h.subtopic === m);
      moduleStats[m] = ms.length ? {
        pct: Math.round(ms.reduce((s, h) => s + h.pct, 0) / ms.length),
        sessions: ms.length,
        totalQs: ms.reduce((s, h) => s + h.total, 0)
      } : null;
    });
    // LOS mastery per module
    const losStats = {};
    moduleNames.forEach(m => {
      losStats[m] = getLOSMastery(history, topic, m);
    });
    return {
      topic,
      weight,
      modules: moduleNames,
      modulesCovered,
      untouchedModules,
      moduleStats,
      losStats,
      sessions: sessions.length,
      totalQs,
      accuracy,
      coverage,
      readiness,
      reliable,
      trend,
      trendDelta,
      lastSession: sessions.length ? new Date(sessions[0].id).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short"
      }) : null
    };
  });
}
function getPredictedScore(moduleReadiness) {
  const withData = moduleReadiness.filter(m => m.accuracy !== null && m.reliable);
  if (withData.length < 3) return null;
  const totalWeight = withData.reduce((s, m) => s + m.weight, 0);
  const score = Math.round(withData.reduce((s, m) => s + m.accuracy * m.weight, 0) / totalWeight);
  // Confidence interval based on session variance
  const variance = withData.reduce((s, m) => {
    const sessions = [];
    return s + (m.sessions > 2 ? 5 : m.sessions > 1 ? 10 : 15);
  }, 0) / withData.length;
  return {
    score,
    low: Math.max(0, score - variance),
    high: Math.min(99, score + variance),
    confidence: Math.min(100, Math.round(withData.length / 10 * 100)),
    modulesWithData: withData.length
  };
}
function getStreak(history) {
  if (!history.length) return 0;
  const days = [...new Set(history.map(h => h.dateKey))].sort().reverse();
  const today = new Date().toISOString().slice(0, 10),
    yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (days[0] !== today && days[0] !== yesterday) return 0;
  let streak = 1;
  for (let i = 1; i < days.length; i++) {
    if ((new Date(days[i - 1]) - new Date(days[i])) / 86400000 === 1) streak++;else break;
  }
  return streak;
}
function getLast30DaysActivity(history) {
  const counts = {};
  for (let i = 0; i < 30; i++) {
    const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    counts[d] = 0;
  }
  history.forEach(h => {
    if (counts[h.dateKey] !== undefined) counts[h.dateKey]++;
  });
  return counts;
}
function getTopicTrends(history) {
  const out = {};
  Object.keys(LOS).forEach(t => {
    const s = history.filter(h => h.topic === t).slice(0, 6);
    if (s.length < 2) {
      out[t] = null;
      return;
    }
    const r = s.slice(0, 3).reduce((a, h) => a + h.pct, 0) / Math.min(3, s.length);
    const p = s.slice(3, 6).reduce((a, h) => a + h.pct, 0) / Math.max(1, s.slice(3, 6).length);
    out[t] = {
      recent: Math.round(r),
      prev: Math.round(p),
      delta: Math.round(r - p)
    };
  });
  return out;
}

// ─── PASS PROBABILITY ENGINE ─────────────────────────────────────────────────
function getPassProbability(history, moduleReadiness, daysLeft) {
  if (history.length < 3) return null;

  // Weighted accuracy across all sessions (recency-weighted)
  const now = Date.now();
  let wCorrect = 0,
    wTotal = 0;
  history.forEach(s => {
    const ageDays = (now - s.id) / 86400000;
    const w = ageDays <= 7 ? 3 : ageDays <= 14 ? 2 : 1;
    wCorrect += s.score * w;
    wTotal += s.total * w;
  });
  const currentAccuracy = wTotal > 0 ? wCorrect / wTotal * 100 : 0;

  // Coverage factor: % of exam weight that has been tested
  const totalWeight = 100;
  const coveredWeight = moduleReadiness.reduce((s, m) => s + (m.sessions > 0 ? m.weight : 0), 0);
  const coverageFactor = coveredWeight / totalWeight;

  // Trajectory: improving or declining?
  const recentSessions = history.slice(0, 5);
  const olderSessions = history.slice(5, 10);
  const recentAvg = recentSessions.length ? recentSessions.reduce((s, h) => s + h.pct, 0) / recentSessions.length : currentAccuracy;
  const olderAvg = olderSessions.length ? olderSessions.reduce((s, h) => s + h.pct, 0) / olderSessions.length : recentAvg;
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
  const accuracyProbBase = Math.max(0, Math.min(95, currentAccuracy >= 80 ? 70 + (currentAccuracy - 80) * 1.5 : currentAccuracy >= 70 ? 45 + (currentAccuracy - 70) * 2.5 : currentAccuracy >= 60 ? 20 + (currentAccuracy - 60) * 2.5 : currentAccuracy * 0.33));

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
    advice: finalProb >= 75 ? "Keep your current pace. Focus on weak modules." : finalProb >= 55 ? "Increase session frequency. Cover untested modules urgently." : "Prioritise high-weight topics only. Every session counts now."
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
  const sessionsPerWeek30 = Math.round(last30.length / 30 * 7);
  const qPerDay7 = last7.length ? Math.round(last7.reduce((s, h) => s + h.total, 0) / 7) : 0;

  // Burnout detection: last session was >3 days ago AND had 7+ sessions before
  const daysSinceLastSession = history.length ? Math.floor((Date.now() - history[0].id) / 86400000) : 999;
  const burnoutRisk = daysSinceLastSession >= 3 && history.length >= 7;
  return {
    sessionsPerWeek7,
    sessionsPerWeek30,
    qPerDay7,
    daysSinceLastSession,
    burnoutRisk
  };
}

// ─── WEEKLY PLAN GENERATOR (AI-powered) ─────────────────────────────────────
const WEEKLY_PLAN_PROMPT = `You are a CFA Level 1 study coach. Generate a practical weekly study plan.

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

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────
function Badge({
  children,
  color = C.accent
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      padding: "2px 9px",
      borderRadius: 20,
      background: color + "22",
      color,
      letterSpacing: "0.08em",
      textTransform: "uppercase"
    }
  }, children);
}
function Skeleton({
  width = "100%",
  height = 14,
  radius = 6,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: radius,
      background: `linear-gradient(90deg,${C.border} 25%,${C.dim} 50%,${C.border} 75%)`,
      backgroundSize: "200% 100%",
      animation: "shimmer 1.4s infinite",
      ...style
    }
  });
}
const EXAM_DATE = new Date("2026-08-19");
const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const Q_COUNTS = [5, 10, 15, 20];
const TIME_PER_Q = 90;
const STORAGE_KEY = "cfa_mock_v7";
const SR_KEY = "cfa_sr_v7";
const QDB_KEY = "cfa_qdb_v7";
const USAGE_KEY = "cfa_usage_v1";
const BESTS_KEY = "cfa_bests_v1";
const SM2_INTERVALS = [1, 3, 7, 16, 35, 70];

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
// Psychological design principles applied:
// 1. Warm amber accent for streaks/rewards (dopamine trigger - warm = reward)
// 2. Progress indicators everywhere (completion loop - Zeigarnik effect)
// 3. Micro-animations on success (positive reinforcement)
// 4. Deep navy base (focus mode - reduces distraction anxiety)
// 5. Green for correct answers (operant conditioning)
// 6. Card-based layout with clear hierarchy (reduces cognitive load)
// 7. Streak + XP gamification (variable reward schedule)
const C = {
  bg: "#06060f",
  // deep navy - focus mode
  surface: "#0e0e1c",
  // card surface
  surfaceHigh: "#14142a",
  // elevated surface
  border: "#1c1c35",
  // subtle border
  borderHigh: "#2a2a50",
  // highlighted border
  accent: "#6366f1",
  // indigo - primary
  accentLight: "#818cf8",
  // indigo light
  accentGlow: "#6366f133",
  // indigo glow
  reward: "#f59e0b",
  // amber - streak/XP (warm reward colour)
  rewardLight: "#fcd34d",
  // amber light
  easy: "#10b981",
  // emerald - correct/pass
  easyLight: "#34d399",
  // emerald light
  medium: "#f59e0b",
  // amber
  hard: "#ef4444",
  // red
  text: "#e8e6ff",
  // slightly purple-tinted white (matches palette)
  textMid: "#a8a5cc",
  // mid text
  muted: "#52506e",
  // muted
  dim: "#1e1c38",
  // dimmed bg for badges etc
  success: "#059669",
  // dark green bg
  successBg: "#022c22",
  // success card bg
  errorBg: "#1c0505" // error card bg
};
const diffC = {
  Easy: C.easy,
  Medium: C.medium,
  Hard: C.hard
};
const urgencyColor = {
  high: C.hard,
  medium: C.medium,
  low: C.easy
};

// XP system - makes every session feel rewarding
function calcXP(session) {
  const base = session.score * 10;
  const diffBonus = {
    Easy: 1,
    Medium: 1.5,
    Hard: 2.2
  }[session.difficulty] || 1;
  const speedBonus = session.timeTaken < session.total * 60 ? 1.2 : 1;
  const streakBonus = 1; // applied externally
  return Math.round(base * diffBonus * speedBonus * streakBonus);
}
function getTotalXP(history) {
  return history.reduce((s, h) => s + calcXP(h), 0);
}
function getLevel(xp) {
  // Level thresholds: 0, 500, 1200, 2500, 5000, 9000...
  const thresholds = [0, 500, 1200, 2500, 5000, 9000, 15000, 25000];
  const labels = ["Beginner", "Analyst I", "Analyst II", "Associate", "Senior Associate", "CFA Candidate", "CFA Ready", "CFA Master"];
  let level = 0;
  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) level = i;
  }
  const nextThreshold = thresholds[level + 1] || thresholds[thresholds.length - 1] * 2;
  const progress = Math.round((xp - thresholds[level]) / (nextThreshold - thresholds[level]) * 100);
  return {
    level: level + 1,
    label: labels[level],
    xp,
    nextXP: nextThreshold,
    progress: Math.min(99, progress)
  };
}
function fireConfetti(duration = 2400) {
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const colors = ["#f59e0b", "#6366f1", "#10b981", "#ef4444", "#a78bfa", "#fcd34d", "#34d399", "#f472b6"];
  const particles = Array.from({
    length: 90
  }, (_, i) => ({
    x: Math.random() * canvas.width,
    y: -10 - Math.random() * 60,
    vx: (Math.random() - 0.5) * 5,
    vy: Math.random() * 4 + 1.5,
    color: colors[i % colors.length],
    size: Math.random() * 7 + 3,
    angle: Math.random() * 360,
    spin: (Math.random() - 0.5) * 0.25,
    opacity: 1
  }));
  const end = Date.now() + duration;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const remaining = end - Date.now();
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.06;
      p.angle += p.spin;
      if (remaining < 600) p.opacity = Math.max(0, remaining / 600);
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });
    if (Date.now() < end) requestAnimationFrame(draw);else canvas.remove();
  }
  draw();
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function XPBar({
  level,
  progress,
  label,
  xp,
  nextXP
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 11,
      padding: "11px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 6,
      background: `linear-gradient(135deg,${C.reward},${C.rewardLight})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 800,
      color: "#000"
    }
  }, level), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: C.rewardLight
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.muted
    }
  }, xp.toLocaleString(), " / ", nextXP.toLocaleString(), " XP")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 5,
      background: C.dim,
      borderRadius: 3,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${progress}%`,
      background: `linear-gradient(90deg,${C.reward},${C.rewardLight})`,
      borderRadius: 3,
      transition: "width 0.6s ease",
      boxShadow: `0 0 8px ${C.reward}66`
    }
  })));
}
function StatCard({
  label,
  value,
  color,
  sub,
  onClick,
  icon
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 11,
      padding: "12px 13px",
      cursor: onClick ? "pointer" : "default",
      transition: "border-color 0.15s",
      position: "relative",
      overflow: "hidden"
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 10,
      top: 10,
      fontSize: 16,
      opacity: 0.15
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      fontWeight: 800,
      color: color || C.accentLight,
      lineHeight: 1
    }
  }, value), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: color || C.accentLight,
      opacity: 0.75,
      marginTop: 2
    }
  }, sub), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 4
    }
  }, label));
}
function TrendArrow({
  trend,
  delta
}) {
  if (!trend) return null;
  const col = trend === "up" ? C.easy : trend === "down" ? C.hard : C.muted;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: col,
      fontWeight: 700,
      background: col + "18",
      padding: "1px 6px",
      borderRadius: 4
    }
  }, trend === "up" ? "↑" : trend === "down" ? "↓" : "→", delta != null ? ` ${Math.abs(delta)}%` : "");
}
function ScoreRing({
  pct,
  size = 96,
  showLabel = true
}) {
  const r = (size - 12) / 2,
    circ = 2 * Math.PI * r,
    offset = circ - pct / 100 * circ;
  const col = pct >= 70 ? C.easy : pct >= 50 ? C.medium : C.hard;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: "rotate(-90deg)"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: C.dim,
    strokeWidth: 7
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: col,
    strokeWidth: 7,
    strokeDasharray: circ,
    strokeDashoffset: offset,
    strokeLinecap: "round",
    style: {
      transition: "stroke-dashoffset 0.8s cubic-bezier(0.34,1.56,0.64,1)",
      filter: `drop-shadow(0 0 6px ${col}88)`
    }
  }), showLabel && /*#__PURE__*/React.createElement("text", {
    x: size / 2,
    y: size / 2,
    textAnchor: "middle",
    dominantBaseline: "middle",
    style: {
      fill: col,
      fontSize: size > 80 ? 16 : 12,
      fontWeight: 800,
      transform: `rotate(90deg)`,
      transformOrigin: `${size / 2}px ${size / 2}px`
    }
  }, pct, "%"));
}
function StreakFlame({
  streak
}) {
  if (streak === 0) return null;
  const intensity = streak >= 7 ? "🔥" : streak >= 3 ? "🔥" : "🔥";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      background: `linear-gradient(135deg,${C.reward}22,${C.reward}11)`,
      border: `1px solid ${C.reward}44`,
      borderRadius: 20,
      padding: "4px 10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, intensity), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: C.rewardLight
    }
  }, streak), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: C.reward,
      opacity: 0.8
    }
  }, "day streak"));
}
function ProgressPill({
  label,
  value,
  total,
  color
}) {
  const pct = total > 0 ? Math.round(value / total * 100) : 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color
    }
  }, value, "/", total)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      background: C.dim,
      borderRadius: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${pct}%`,
      background: color,
      borderRadius: 2,
      transition: "width 0.5s"
    }
  }))));
}
function QualityBar({
  quality,
  label,
  color
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color
    }
  }, quality, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      background: C.dim,
      borderRadius: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${quality}%`,
      background: color,
      borderRadius: 2,
      transition: "width 0.5s"
    }
  })));
}
function LOSHeatmapCell({
  tested,
  pct
}) {
  const bg = !tested ? C.border : pct >= 80 ? C.easy : pct >= 60 ? C.medium : C.hard;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      borderRadius: 2,
      background: bg,
      flexShrink: 0,
      transition: "background 0.3s"
    },
    title: tested ? `${pct}% accuracy` : "Not yet tested"
  });
}
function MotivationalBanner({
  daysLeft
}) {
  const msg = daysLeft <= 7 ? {
    text: "Final week — every question counts.",
    color: C.hard
  } : daysLeft <= 14 ? {
    text: "Two weeks out. Make them count.",
    color: C.medium
  } : daysLeft <= 30 ? {
    text: "One month to exam. Stay consistent.",
    color: C.reward
  } : {
    text: "You're building the habit that passes exams.",
    color: C.accentLight
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: msg.color,
      textAlign: "center",
      padding: "6px 0",
      fontStyle: "italic",
      opacity: 0.85
    }
  }, msg.text);
}
// ─── FORMULA SHEETS ──────────────────────────────────────────────────────────
const FORMULAS = {
  "Quantitative Methods": [{
    name: "FV (single)",
    f: "FV = PV × (1 + r)ⁿ"
  }, {
    name: "PV (single)",
    f: "PV = FV / (1 + r)ⁿ"
  }, {
    name: "EAR",
    f: "EAR = (1 + r/m)ᵐ − 1"
  }, {
    name: "HPR",
    f: "HPR = (P₁ − P₀ + D) / P₀"
  }, {
    name: "TWR",
    f: "TWR = (1+r₁)(1+r₂)…(1+rₙ) − 1"
  }, {
    name: "Variance",
    f: "σ² = Σ(xᵢ − μ)² / N"
  }, {
    name: "Covariance",
    f: "Cov(A,B) = ρ × σ_A × σ_B"
  }, {
    name: "Portfolio σ",
    f: "σ_p = √(w²_Aσ²_A + w²_Bσ²_B + 2w_Aw_BρABσ_Aσ_B)"
  }, {
    name: "Safety-first",
    f: "SFR = (E(R) − R_min) / σ"
  }, {
    name: "Bayes",
    f: "P(A|B) = P(B|A)·P(A) / P(B)"
  }],
  "Financial Statement Analysis": [{
    name: "ROE (DuPont)",
    f: "ROE = Net Margin × Asset Turnover × Equity Multiplier"
  }, {
    name: "ROE (3-factor)",
    f: "ROE = (NI/Sales) × (Sales/Assets) × (Assets/Equity)"
  }, {
    name: "Current Ratio",
    f: "Current Assets / Current Liabilities"
  }, {
    name: "Quick Ratio",
    f: "(Cash + ST Investments + AR) / CL"
  }, {
    name: "DSO",
    f: "365 / (Revenue / AR)"
  }, {
    name: "DIO",
    f: "365 / (COGS / Inventory)"
  }, {
    name: "DPO",
    f: "365 / (COGS / AP)"
  }, {
    name: "CCC",
    f: "DSO + DIO − DPO"
  }, {
    name: "Basic EPS",
    f: "(NI − Pref Div) / Wtd Avg Shares"
  }, {
    name: "Diluted EPS",
    f: "(NI − Pref Div + Convertible Int) / (Wtd Avg + Dilutive Shares)"
  }, {
    name: "Debt-to-Equity",
    f: "Total Debt / Total Equity"
  }, {
    name: "Interest Coverage",
    f: "EBIT / Interest Expense"
  }],
  "Fixed Income": [{
    name: "Bond Price",
    f: "P = Σ C/(1+y)ᵗ + FV/(1+y)ⁿ"
  }, {
    name: "Current Yield",
    f: "CY = Annual Coupon / Price"
  }, {
    name: "Macaulay Duration",
    f: "D = Σ[t × PV(CFₜ)] / Price"
  }, {
    name: "Modified Duration",
    f: "MD = Macaulay D / (1 + y/m)"
  }, {
    name: "Price Change (Duration)",
    f: "ΔP/P ≈ −MD × Δy"
  }, {
    name: "Full Price w/ Convexity",
    f: "ΔP/P ≈ −MD·Δy + ½·Convexity·(Δy)²"
  }, {
    name: "PVBP",
    f: "PVBP = MD × Price × 0.0001"
  }, {
    name: "Yield Spread",
    f: "Spread = YTM_bond − YTM_benchmark"
  }, {
    name: "Forward Rate",
    f: "(1+S₂)² = (1+S₁)(1+₁f₁)"
  }],
  "Equity": [{
    name: "Gordon Growth (DDM)",
    f: "V = D₁ / (r − g)"
  }, {
    name: "Two-stage DDM",
    f: "V = PV(Divs stage 1) + PV(Terminal Value)"
  }, {
    name: "FCFE",
    f: "FCFE = NI + Dep − CapEx − ΔNWC + Net Borrowing"
  }, {
    name: "P/E (leading)",
    f: "P/E = Div payout / (r − g)"
  }, {
    name: "EV",
    f: "EV = Mkt Cap + Debt − Cash"
  }, {
    name: "CAPM",
    f: "E(R) = Rf + β(E(Rm) − Rf)"
  }, {
    name: "Beta",
    f: "β = Cov(R_i, R_m) / Var(R_m)"
  }, {
    name: "Sharpe",
    f: "S = (Rp − Rf) / σ_p"
  }, {
    name: "Treynor",
    f: "T = (Rp − Rf) / β"
  }, {
    name: "Jensen's α",
    f: "α = Rp − [Rf + β(Rm − Rf)]"
  }],
  "Derivatives": [{
    name: "Call Payoff (long)",
    f: "max(S_T − X, 0)"
  }, {
    name: "Put Payoff (long)",
    f: "max(X − S_T, 0)"
  }, {
    name: "Put-Call Parity",
    f: "C + PV(X) = P + S"
  }, {
    name: "Forward Price",
    f: "F = S₀ × (1 + r)ᵀ"
  }, {
    name: "FRA Settlement",
    f: "(L − FRA_rate) × D/360 × NP / (1 + L × D/360)"
  }, {
    name: "Swap (fixed rate)",
    f: "Fixed rate where PV(fixed) = PV(floating)"
  }],
  "Corporate Issuers": [{
    name: "WACC",
    f: "WACC = w_d×r_d(1−t) + w_e×r_e"
  }, {
    name: "NPV",
    f: "NPV = Σ CF_t/(1+r)ᵗ − Initial Cost"
  }, {
    name: "IRR",
    f: "NPV = 0 → solve for r"
  }, {
    name: "Operating Leverage",
    f: "DOL = % ΔOP Income / % ΔRevenue"
  }, {
    name: "Financial Leverage",
    f: "DFL = % ΔEPS / % ΔOP Income"
  }, {
    name: "D/E Modigliani-Miller",
    f: "V_L = V_U + T×D (with taxes)"
  }],
  "Alternatives": [{
    name: "NAV per share",
    f: "NAV = (Assets − Liabilities) / Shares Outstanding"
  }, {
    name: "PE Return",
    f: "IRR: solve PV(invested) = PV(exit proceeds)"
  }, {
    name: "Mgmt Fee (PE)",
    f: "Typically 2% × Committed Capital"
  }, {
    name: "Carried Interest",
    f: "Typically 20% × Profits above hurdle rate"
  }, {
    name: "Cap Rate (RE)",
    f: "Cap Rate = NOI / Property Value"
  }, {
    name: "Gross Return",
    f: "R_gross = (NAV_end + Distributions) / NAV_beg − 1"
  }]
};
function FormulaSheet({
  topic
}) {
  const [open, setOpen] = useState(false);
  const formulas = FORMULAS[topic] || [];
  if (!formulas.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(v => !v),
    style: {
      width: "100%",
      padding: "9px 14px",
      borderRadius: 10,
      fontSize: 12,
      fontWeight: 700,
      background: "#0a0a20",
      border: `1px solid ${C.accentLight}33`,
      color: C.accentLight,
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", null, "📐 Formula Sheet — ", topic.split(" ")[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      opacity: 0.7
    }
  }, open ? "▲ Hide" : "▼ Show", " ", formulas.length, " formulas")), open && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#08081a",
      border: `1px solid ${C.accentLight}22`,
      borderRadius: "0 0 10px 10px",
      padding: "10px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, formulas.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      paddingBottom: 6,
      borderBottom: i < formulas.length - 1 ? `1px solid ${C.border}` : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.muted,
      minWidth: 110,
      flexShrink: 0,
      paddingTop: 2
    }
  }, f.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.accentLight,
      fontFamily: "monospace",
      lineHeight: 1.5
    }
  }, f.f)))));
}

// ─── POWER NOTES ─────────────────────────────────────────────────────────────
const POWER_NOTES = {
  "Ethics": {
    topics: [{
      module: "Code of Ethics & Standards",
      rules: ["Code has 6 components; Standards has 7 (I–VII). Know both by number.", "Standard I-A: Follow the STRICTER of local law vs CFA Standards — whichever is more restrictive.", "Standard I-B: Independence — any gift/benefit that could compromise objectivity must be disclosed to employer; decline or obtain written pre-approval before accepting. No dollar threshold in CFA Standards.", "Standard I-C: Misrepresentation includes plagiarism and guaranteeing investment returns.", "Standard II-A: Material = would affect price or reasonable investor's decision. Nonpublic = not yet released. BOTH required.", "Standard III-A: Loyalty, Prudence, Care — duty to clients first, then employer, then self.", "Standard III-C: Suitability — must consider TOTAL portfolio, not just the product being sold.", "Standard III-E: Confidentiality survives end of client relationship unless illegal activity involved.", "Standard IV-A: Loyalty to employer — moonlighting allowed if no conflict, employer notified.", "Standard VI-B: Priority — client trades first, then employer proprietary, then personal.", "Standard VII-B: Can say 'CFA candidate' only if actively enrolled. Cannot say 'CFA Level II passed'."],
      traps: ["Disclosure does NOT cure a conflict — it's necessary but not sufficient.", "'Should' in Standards = recommended best practice. 'Must' = required.", "Soft dollar arrangements are allowed if brokerage benefits clients (research counts).", "Employer policy > CFA Standards is NEVER correct — Standards always floor.", "Mosaic theory: public info + nonmaterial nonpublic info = OK to trade on."],
      mnemonic: "Standards I–VII: PIMDS-CA → Professionalism, Integrity, Duties to Clients, Duties to Employers, Investment Analysis, Conflicts, CFA Responsibilities"
    }, {
      module: "GIPS",
      rules: ["GIPS compliance is firm-wide — cannot claim compliance for a single product.", "Composites: ALL actual fee-paying discretionary portfolios must be in at least one composite.", "Must present 5 years of compliant history (or since inception if <5 years), then build to 10.", "Verification is voluntary — but if done, must cover entire firm, not selected composites.", "Asset-weighted composite returns (not simple average)."],
      traps: ["Prospective clients can request composite list — firms must provide.", "Non-discretionary portfolios are excluded from composites.", "GIPS requires 'fair value' — mark-to-market, not cost basis."],
      mnemonic: "GIPS = Global, Input, Performance, Standards — covers Firms, not individuals"
    }]
  },
  "Quantitative Methods": {
    topics: [{
      module: "Time Value of Money & Returns",
      rules: ["EAR = (1 + r/m)^m − 1. Continuous: EAR = e^r − 1.", "Geometric mean ≤ Arithmetic mean (always). Use geometric for multi-period performance.", "Money-weighted return = IRR of cash flows. Time-weighted = chain-link HPRs (eliminates timing effect).", "TWR preferred for evaluating manager skill; MWR for client's actual experience.", "Annualised return: (1 + HPR)^(365/days) − 1."],
      traps: ["When cash flows occur mid-period, TWR requires sub-period returns.", "Arithmetic mean overestimates compound growth — always use geometric for 'what did the portfolio earn over N years'.", "EAR always > stated rate when m > 1."],
      mnemonic: "TWR = manager skill (Time = True skill). MWR = investor experience (Money = Mine)."
    }, {
      module: "Statistics & Probability",
      rules: ["Normal distribution: 68%/95%/99% within 1/2/3 std devs.", "Lognormal distribution used for asset prices (cannot go below zero).", "Skewness: positive = right tail (mean > median > mode). Negative = left tail.", "Excess kurtosis > 0 = leptokurtic = fat tails (more extreme outcomes than normal).", "Roy's Safety-First: maximise SFR = (E(Rp) − RL) / σp. Pick highest SFR.", "Bayes: P(A|B) = P(B|A)·P(A) / P(B).", "Type I error: reject true H₀ (false positive). Type II: fail to reject false H₀ (false negative).", "Power of test = 1 − P(Type II). Larger sample → more power."],
      traps: ["Significance level α = P(Type I error). Reducing α increases P(Type II).", "p-value < α → reject H₀. p-value is NOT the probability H₀ is true.", "CLT: sample mean is approx normal for n ≥ 30, regardless of population distribution."],
      mnemonic: "BLUE estimators: Best Linear Unbiased Estimators. Type I = 'crying wolf' (false alarm)."
    }]
  },
  "Economics": {
    topics: [{
      module: "Market Structures",
      rules: ["Perfect competition: P = MC = ATC in long run. Zero economic profit.", "Monopoly: MR < P, produces where MR = MC, charges higher P. Deadweight loss.", "Monopolistic competition: differentiated products, easy entry, zero LR economic profit.", "Oligopoly: few firms, interdependent pricing, kinked demand curve (sticky prices).", "Natural monopoly: LRAC declines over entire relevant output range."],
      traps: ["Shutdown point: P < AVC (short run). Exit point: P < ATC (long run).", "Economic profit ≠ accounting profit. EP includes opportunity cost of capital.", "Concentration ratio (CR4/CR8) measures market power but ignores imports and substitutes."],
      mnemonic: "PC→MC→OC→M for Perfect/Monopolistic/Oligopoly/Monopoly — competition decreases, P-MC spread increases."
    }, {
      module: "Monetary & Fiscal Policy",
      rules: ["Expansionary monetary: ↓ rates → ↑ lending → ↑ spending → ↑ GDP.", "Contractionary fiscal: ↑ taxes or ↓ spending → ↓ aggregate demand.", "Quantitative easing: central bank buys assets (beyond cutting rates to zero).", "Fiscal multiplier: 1/(1-MPC). Higher MPC = larger multiplier.", "Crowding out: government borrowing raises rates, reducing private investment.", "Exchange rate target: most rigid monetary framework; sacrifices domestic policy independence."],
      traps: ["Monetary policy lags: recognition + action + impact. Fiscal has longer action lag (legislative).", "Ricardian equivalence: taxpayers anticipate future taxes from deficits → save more → fiscal stimulus offset.", "Central bank independence correlates with lower inflation — political pressure → inflation bias."],
      mnemonic: "FAME: Fiscal (govt spending/tax), Asset purchases (QE), Monetary rate changes, Exchange rate policy — tools ordered by flexibility."
    }]
  },
  "Financial Statement Analysis": {
    topics: [{
      module: "Core Ratios & DuPont",
      rules: ["DuPont (3-factor): ROE = Net Margin × Asset Turnover × Equity Multiplier.", "DuPont (5-factor): ROE = Tax Burden × Interest Burden × EBIT Margin × Asset Turnover × Leverage.", "Current ratio = CA/CL. Quick = (Cash+AR)/CL. Cash ratio = Cash/CL.", "DSO = 365/(Revenue/AR). DIO = 365/(COGS/Inventory). DPO = 365/(COGS/AP).", "CCC = DSO + DIO − DPO. Lower CCC = better working capital efficiency.", "Interest coverage = EBIT/Interest. Debt-to-capital = Debt/(Debt+Equity).", "FCFF = NI + NCC + Int(1−t) − FCInv − WCInv.", "FCFE = NI + NCC − FCInv − WCInv + Net Borrowing."],
      traps: ["LIFO (US GAAP only): higher COGS in inflation → lower NI → lower taxes (cash benefit).", "LIFO reserve: add to inventory to convert LIFO to FIFO. Add (1−t)×LIFO reserve to equity.", "Capitalising costs → higher assets, higher NI (short term), higher CFO (lower CFI).", "Operating lease (IFRS 16/ASC 842): now on balance sheet for lessees. Right-of-use asset + liability.", "Deferred tax liability: tax paid later (accelerated depreciation common cause).", "Deferred tax asset: tax paid early (warranty expense, pension accruals)."],
      mnemonic: "DuPont = Profitability × Efficiency × Leverage. 'PEL' — think of a PELlet gun firing ROE."
    }, {
      module: "Financial Reporting Quality",
      rules: ["Earnings quality spectrum: GAAP compliant + sustainable → GAAP compliant + unsustainable → Non-compliant.", "Aggressive accounting: accelerate revenue, defer expenses, inflate assets.", "Conservative accounting: delay revenue, accelerate expenses — less misleading long-term.", "Beneish M-score flags earnings manipulation (>−1.78 suggests manipulation).", "Warning signs: rising DSO, falling asset turnover, diverging NI vs CFO."],
      traps: ["Non-GAAP metrics: always check what's been excluded. Often strips out recurring costs.", "Channel stuffing: recognises revenue early by pushing excess inventory to distributors.", "Bill-and-hold: revenue recognition before delivery — requires strict criteria."],
      mnemonic: "CRIME: Channel stuffing, Related-party transactions, Income smoothing, Misclassification, Expense timing — key manipulation red flags."
    }]
  },
  "Corporate Issuers": {
    topics: [{
      module: "Capital Structure & WACC",
      rules: ["WACC = w_d×r_d×(1−t) + w_p×r_p + w_e×r_e. Use market weights, not book.", "MM Proposition I (no tax): capital structure irrelevant; firm value unchanged.", "MM Proposition II (no tax): cost of equity rises with leverage; WACC constant.", "MM with taxes: debt tax shield adds value; V_L = V_U + t×D.", "Optimal structure: balance tax shield benefit vs financial distress costs.", "NPV > 0 → accept. IRR > WACC → accept. Conflicting NPV/IRR: trust NPV.", "Payback ignores TVM and cash flows after payback. Avoid as primary criterion."],
      traps: ["IRR assumes reinvestment at IRR — often unrealistic. NPV assumes reinvestment at WACC.", "Multiple IRRs possible when cash flows change sign more than once.", "DOL = % change in EBIT / % change in revenue = (Revenue − VC) / EBIT.", "High fixed costs → high DOL → earnings more sensitive to revenue swings."],
      mnemonic: "WACC: 'We All Cost Capital' — debt cheapest (tax shield), equity most expensive."
    }]
  },
  "Equity": {
    topics: [{
      module: "Valuation Models",
      rules: ["Gordon Growth: V = D₁/(r−g). D₁ = D₀×(1+g). Requires r > g.", "g = ROE × retention ratio (b). Retention ratio = 1 − payout ratio.", "Two-stage DDM: discount dividends in Stage 1 + PV of terminal value at end of Stage 1.", "P/E (justified leading) = payout ratio / (r − g).", "EV = Mkt Cap + Debt + Minority Interest − Cash.", "EV/EBITDA useful for capital-intensive firms or comparing firms with different leverage.", "Price/Book: compares market value to accounting value. P/B < 1 may signal distress.", "Price/Sales: useful for firms with negative earnings (not distorted by accounting)."],
      traps: ["Trailing P/E uses last 12 months EPS. Leading P/E uses next 12 months EPS forecast.", "High P/E ≠ overvalued. Could reflect high growth expectations.", "DDM assumes constant growth forever — inappropriate for cyclical firms.", "Strong-form EMH: prices reflect ALL info including private. Almost universally rejected.", "Semi-strong: prices reflect all PUBLIC info. Most research supports this."],
      mnemonic: "GARP: Growth At Reasonable Price — P/E relative to growth (PEG ratio = P/E ÷ g%)."
    }, {
      module: "Market Efficiency & Indices",
      rules: ["Price-weighted index (e.g. DJIA): high-price stocks dominate. Splits distort.", "Market-cap weighted (e.g. S&P 500): large caps dominate. Momentum bias.", "Equal-weighted: small caps have more influence. Requires frequent rebalancing.", "Fundamental-weighted: based on earnings/dividends — avoids momentum bias.", "Weak-form EMH: past prices can't predict future returns. Technical analysis fails.", "Semi-strong: fundamental analysis fails to earn excess returns consistently."],
      traps: ["Anomalies (January effect, momentum, size premium) don't necessarily disprove EMH — data mining risk.", "Behavioural biases: overconfidence, loss aversion, anchoring, herding — explain apparent inefficiencies.", "Index rebalancing creates price pressure on added stocks — temporary, not exploitable after costs."],
      mnemonic: "EMH Weak/Semi/Strong = Technical/Fundamental/Inside info all priced in."
    }]
  },
  "Fixed Income": {
    topics: [{
      module: "Duration & Convexity",
      rules: ["Macaulay duration = weighted average time to receive cash flows (in years).", "Modified duration = Macaulay D / (1 + y/m). Measures price sensitivity.", "ΔP/P ≈ −ModD × Δy. For +1% rise in yield, price falls by ~ModD%.", "Convexity adjustment: add ½ × Convexity × (Δy)². Always positive for option-free bonds.", "Duration increases with: lower coupon, longer maturity, lower YTM.", "PVBP (DV01) = Modified Duration × Price × 0.0001.", "Callable bond: negative convexity at low yields (price appreciation capped).", "Putable bond: positive convexity throughout (floor on price decline)."],
      traps: ["Macaulay duration = maturity only for zero-coupon bonds.", "Higher coupon → lower duration (more cash flows returned earlier).", "Floating rate bonds: duration ≈ time to next reset date (very short).", "For parallel yield curve shift, use portfolio duration (weighted average).", "Prepayment risk: extension risk (rates rise, prepay slows) vs contraction risk (rates fall, prepay accelerates)."],
      mnemonic: "CALM: Coupon↓, Age↑ (maturity), Lower yield, More duration. Duration = sensitivity thermostat."
    }, {
      module: "Credit Analysis",
      rules: ["4 Cs of credit: Capacity (can they pay?), Collateral, Covenants, Character.", "Priority of claims: secured debt → senior unsecured → subordinated → preferred equity → common equity.", "Investment grade: BBB−/Baa3 and above. Below = high yield / 'junk'.", "Credit spread = YTM_corporate − YTM_benchmark_govt. Widens in recession.", "Expected loss = PD × LGD. LGD = 1 − recovery rate.", "Sovereign debt risk: ability to pay (fiscal capacity) + willingness to pay (political)."],
      traps: ["Ratings lag the market — credit spreads move faster than rating changes.", "Negative covenants restrict borrower actions. Positive (affirmative) covenants require actions.", "Event risk: sudden rating downgrade from M&A, restructuring — not captured in duration.", "High-yield issuers: analyse as equity (enterprise value, cash flow coverage) not just ratios."],
      mnemonic: "4 Cs: Capacity, Collateral, Covenants, Character — think of a 'credit character check'."
    }]
  },
  "Derivatives": {
    topics: [{
      module: "Options & Forwards",
      rules: ["Call payoff (long): max(S_T − X, 0). Put payoff (long): max(X − S_T, 0).", "Put-call parity: C + PV(X) = P + S (European options).", "Long call + short put = synthetic forward (same as buying forward).", "Forward price: F = S₀ × (1+r)^T (no income). With income: F = (S₀−PV(I)) × (1+r)^T.", "Option value = intrinsic value + time value. Time value always ≥ 0.", "Deep ITM options: mostly intrinsic value. OTM options: entirely time value.", "Delta: call delta 0 to +1. Put delta −1 to 0. ATM ≈ ±0.5.", "Higher volatility → higher option value (both calls and puts)."],
      traps: ["American call on non-dividend stock: never optimal to exercise early (time value loss).", "American put: may be optimal to exercise early if deeply ITM (interest on proceeds).", "Futures marked to market daily — gains/losses settled each day (unlike forwards).", "Futures price ≠ expected future spot price. F = S × (1+r)^T ± cost of carry.", "Short forward obligation — must sell at F regardless of market price."],
      mnemonic: "PCP: Put + Cash = Call + Stock. Rearrange to find any missing value."
    }]
  },
  "Alternatives": {
    topics: [{
      module: "Alternative Investment Features",
      rules: ["PE return calculation: use IRR on actual cash flows (committed ≠ invested capital).", "2-and-20: 2% management fee on committed/invested capital; 20% carried interest above hurdle.", "J-curve: PE funds show negative early returns (fees + early write-downs) before exits.", "NAV per share = (Total Assets − Total Liabilities) / Shares Outstanding.", "Real estate cap rate = NOI / Property Value. Higher cap rate = lower value (like P/E inverse).", "Infrastructure: long duration, inflation-linked cash flows, often regulated monopolies.", "Commodity futures return = spot return + roll return + collateral return."],
      traps: ["Hedge fund return calculation: gross vs net (after 2-and-20 fees). Always check which.", "Survivorship bias: databases exclude failed funds → overstate average returns.", "Backfill bias: funds choose when to enter database → only report good early history.", "PE IRR inflated by early distributions (J-curve reversal) — compare with PME.", "Direct vs fund investment: direct = control but concentrated; fund = diversified but double fees."],
      mnemonic: "J-CURVE: Junior fees and write-downs before Cumulative Returns Unfold via Exits."
    }]
  },
  "Portfolio Management": {
    topics: [{
      module: "CAPM & Risk",
      rules: ["CAPM: E(R) = Rf + β × (E(Rm) − Rf). Beta = systematic risk.", "SML plots E(R) vs beta. CML plots E(R) vs total risk (σ) — only efficient portfolios.", "Systematic (market) risk: cannot diversify away. Non-systematic: diversifiable.", "Portfolio variance: σ²_p = w²_Aσ²_A + w²_Bσ²_B + 2w_Aw_BρABσ_Aσ_B.", "Minimum variance portfolio: lowest risk for a given combination of two assets.", "Sharpe = (Rp−Rf)/σp. Treynor = (Rp−Rf)/β. Jensen's α = Rp − CAPM_return.", "M² (Modigliani): Sharpe adjusted to match market volatility. Comparable across funds.", "Use Sharpe when portfolio = total wealth. Use Treynor when portfolio is one of many."],
      traps: ["Beta > 1: more volatile than market. Beta < 1: less volatile. Beta = 0: risk-free asset.", "Zero-beta portfolio expected return = Rf (on SML). Above SML = undervalued.", "Correlation drives diversification benefit. ρ = −1 → maximum diversification.", "Efficient frontier assumes investors are risk-averse — maximise return for given risk.", "CAL (Capital Allocation Line): risk-free asset + any risky portfolio. CML: risk-free + market portfolio."],
      mnemonic: "SML = all assets (by beta). CML = only efficient portfolios (by sigma). 'Security vs Capital'."
    }, {
      module: "Behavioural Finance",
      rules: ["Cognitive errors: information processing mistakes. Can be corrected with better data.", "Emotional biases: driven by feelings. Harder to correct — must accommodate.", "Loss aversion: losses feel ~2× worse than equivalent gains (Kahneman/Tversky).", "Overconfidence: overestimates skill, underestimates risk. Common in experienced investors.", "Anchoring: over-reliance on first piece of information seen.", "Herding: following crowd — amplifies market bubbles and crashes.", "Mental accounting: treating money differently based on source/intended use.", "Framing: decision changes based on how question is presented."],
      traps: ["Representativeness: assuming recent pattern continues (gambler's fallacy).", "Availability bias: overweight easily recalled events (recent crashes).", "Confirmation bias: seek info that confirms existing view, ignore contradictory.", "Disposition effect: selling winners too early, holding losers too long (loss aversion + pride)."],
      mnemonic: "FOCAL: Framing, Overconfidence, Confirmation, Anchoring, Loss aversion — 5 core biases to know cold."
    }]
  }
};
async function askClaudeText(apiKey, prompt, maxTokens = 400) {
  if (!apiKey) return null;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
        "x-api-key": apiKey
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: maxTokens,
        messages: [{
          role: "user",
          content: prompt
        }]
      })
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.content?.map(i => i.text || "").join("").trim() || null;
  } catch {
    return null;
  }
}

// ─── REVISION SCREEN COMPONENTS ──────────────────────────────────────────────
function RevisionScreen({
  onBack,
  initialTopic = null,
  initialTab = "notes",
  apiKey = ""
}) {
  const [selTopic, setSelTopic] = useState(initialTopic || Object.keys(POWER_NOTES)[0]);
  const [tab, setTab] = useState(initialTab); // "notes" | "formulas"
  const [expandedModule, setExpandedModule] = useState(null);
  const [drillMode, setDrillMode] = useState(false);
  const [drillIdx, setDrillIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [drillResult, setDrillResult] = useState({}); // {idx: "got it"|"again"}
  const [drillDone, setDrillDone] = useState(false);
  const [explainCache, setExplainCache] = useState({});
  const [explainLoading, setExplainLoading] = useState(null);
  const [explainOpen, setExplainOpen] = useState(null);
  const topicData = POWER_NOTES[selTopic];
  const formulaData = FORMULAS[selTopic] || [];
  const allFormulas = Object.values(FORMULAS).flat();
  const drillData = formulaData.length > 0 ? formulaData : allFormulas;
  const drillTotal = drillData.length;
  const drillCard = drillData[drillIdx] || null;
  const drillProgress = Object.keys(drillResult).length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "system-ui,sans-serif",
      background: C.bg,
      minHeight: "100vh",
      padding: "16px 16px 40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 20,
      fontWeight: 800,
      color: C.text
    }
  }, "📚 Quick Revision"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 2
    }
  }, "Curated high-yield facts · Zero API cost")), /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: "none",
      border: "none",
      color: C.muted,
      cursor: "pointer",
      fontSize: 13
    }
  }, "← Home")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 0,
      marginBottom: 14,
      background: C.surface,
      borderRadius: 10,
      padding: 3,
      border: `1px solid ${C.border}`
    }
  }, [["notes", "📝 Power Notes"], ["formulas", "📐 Formulas"]].map(([t, label]) => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setTab(t),
    style: {
      flex: 1,
      padding: "8px",
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 700,
      border: "none",
      cursor: "pointer",
      background: tab === t ? `linear-gradient(135deg,${C.accent},${C.accentLight})` : C.surface,
      color: tab === t ? "#fff" : C.muted,
      transition: "all 0.15s"
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: 14
    }
  }, Object.keys(tab === "notes" ? POWER_NOTES : FORMULAS).map(t => {
    const w = LOS[t]?.weight || 0;
    const hasContent = tab === "notes" ? POWER_NOTES[t]?.topics?.length > 0 : FORMULAS[t]?.length > 0;
    if (!hasContent) return null;
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: () => {
        setSelTopic(t);
        setExpandedModule(null);
      },
      style: {
        padding: "5px 11px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 700,
        cursor: "pointer",
        border: selTopic === t ? `1.5px solid ${C.accent}` : `1.5px solid ${C.border}`,
        background: selTopic === t ? C.accent + "22" : C.surface,
        color: selTopic === t ? C.accentLight : C.muted
      }
    }, t.split(" ")[0], " ", /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: 0.6,
        fontWeight: 400
      }
    }, w, "%"));
  })), tab === "notes" && topicData && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, topicData.topics.map((mod, mi) => {
    const isOpen = expandedModule === mi;
    return /*#__PURE__*/React.createElement("div", {
      key: mi,
      style: {
        background: C.surface,
        border: `1px solid ${isOpen ? C.accent + "55" : C.border}`,
        borderRadius: 13,
        overflow: "hidden",
        transition: "border-color 0.15s"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setExpandedModule(isOpen ? null : mi),
      style: {
        width: "100%",
        padding: "13px 16px",
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: C.text
      }
    }, mod.module), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        marginTop: 2
      }
    }, mod.rules.length, " rules · ", mod.traps.length, " traps", mod.mnemonic ? " · 1 mnemonic" : "")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: C.accentLight,
        fontWeight: 700,
        flexShrink: 0,
        marginLeft: 8
      }
    }, isOpen ? "▲" : "▼")), isOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 16px 16px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 800,
        color: C.easy,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: 8
      }
    }, "✅ Key Rules"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6
      }
    }, mod.rules.map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        marginBottom: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: async () => {
        if (explainOpen === r) {
          setExplainOpen(null);
          return;
        }
        setExplainOpen(r);
        if (!explainCache[r] && !explainLoading) {
          setExplainLoading(r);
          const result = await askClaudeText(apiKey, `CFA Level 1 exam prep. Explain this rule in 3-4 sentences for a student, include one concrete worked example (with numbers if relevant), and name one common exam trap:\n\n"${r}"\n\nBe direct and specific. No fluff.`, 400);
          setExplainCache(c => ({
            ...c,
            [r]: result || "Could not load explanation."
          }));
          setExplainLoading(null);
        }
      },
      style: {
        display: "flex",
        gap: 8,
        alignItems: "flex-start",
        fontSize: 12,
        color: C.textMid,
        lineHeight: 1.6,
        cursor: "pointer",
        padding: "3px 0",
        borderRadius: 6,
        transition: "background 0.1s"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.easy,
        flexShrink: 0,
        fontWeight: 700,
        marginTop: 1
      }
    }, "·"), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, r), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.accent,
        flexShrink: 0,
        marginTop: 2
      }
    }, explainOpen === r ? "▲" : "💡")), explainOpen === r && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#0a1020",
        border: `1px solid ${C.accent}33`,
        borderRadius: 8,
        padding: "10px 12px",
        marginTop: 4,
        marginLeft: 16,
        animation: "fadeIn 0.15s ease"
      }
    }, explainLoading === r ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        animation: "pulse 1.5s infinite"
      }
    }, "Loading explanation…") : /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#c0c8e8",
        lineHeight: 1.7
      }
    }, explainCache[r])))))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: mod.mnemonic ? 14 : 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 800,
        color: C.hard,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: 8
      }
    }, "⚠ Common Traps"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6
      }
    }, mod.traps.map((t, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        gap: 8,
        alignItems: "flex-start",
        fontSize: 12,
        color: "#c0a0a0",
        lineHeight: 1.6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.hard,
        flexShrink: 0,
        fontWeight: 700,
        marginTop: 1
      }
    }, "!"), /*#__PURE__*/React.createElement("span", null, t))))), mod.mnemonic && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#0a0820",
        border: `1px solid ${C.accent}33`,
        borderRadius: 9,
        padding: "10px 13px",
        marginTop: 2
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 800,
        color: C.accentLight,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: 5
      }
    }, "💡 Mnemonic"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#a0a0d0",
        lineHeight: 1.6,
        fontStyle: "italic"
      }
    }, mod.mnemonic))));
  })), tab === "formulas" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 0,
      marginBottom: 14,
      background: C.surface,
      borderRadius: 10,
      padding: 3,
      border: `1px solid ${C.border}`
    }
  }, [["ref", "📋 Reference"], ["drill", "🃏 Drill Mode"]].map(([m, label]) => /*#__PURE__*/React.createElement("button", {
    key: m,
    onClick: () => {
      setDrillMode(m === "drill");
      setDrillIdx(0);
      setFlipped(false);
      setDrillResult({});
      setDrillDone(false);
    },
    style: {
      flex: 1,
      padding: "7px",
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 700,
      border: "none",
      cursor: "pointer",
      background: drillMode && m === "drill" || !drillMode && m === "ref" ? `linear-gradient(135deg,${C.reward},${C.rewardLight})` : C.surface,
      color: drillMode && m === "drill" || !drillMode && m === "ref" ? "#000" : C.muted,
      transition: "all 0.15s"
    }
  }, label))), !drillMode && /*#__PURE__*/React.createElement(React.Fragment, null, formulaData.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "40px 0",
      color: C.muted,
      fontSize: 13
    }
  }, "No formula sheet for this topic — it's primarily conceptual.") : /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      overflow: "hidden"
    }
  }, formulaData.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      padding: "11px 16px",
      borderBottom: i < formulaData.length - 1 ? `1px solid ${C.border}` : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      minWidth: 120,
      flexShrink: 0,
      paddingTop: 2,
      lineHeight: 1.4
    }
  }, f.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.accentLight,
      fontFamily: "monospace",
      lineHeight: 1.6,
      flex: 1
    }
  }, f.f)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontSize: 11,
      color: C.muted,
      textAlign: "center"
    }
  }, formulaData.length, " formulas · switch topic above")), drillMode && !drillDone && drillCard && /*#__PURE__*/React.createElement("div", {
    style: {
      animation: "fadeIn 0.2s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, drillIdx + 1, " / ", drillTotal), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      flex: 1,
      background: C.border,
      borderRadius: 2,
      margin: "0 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${drillProgress / drillTotal * 100}%`,
      background: `linear-gradient(90deg,${C.reward},${C.rewardLight})`,
      borderRadius: 2,
      transition: "width 0.3s"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.rewardLight,
      fontWeight: 700
    }
  }, drillProgress, "/", drillTotal)), /*#__PURE__*/React.createElement("div", {
    onClick: () => setFlipped(f => !f),
    style: {
      cursor: "pointer",
      minHeight: 180,
      background: flipped ? C.surfaceHigh : C.surface,
      border: `2px solid ${flipped ? C.reward + "88" : C.border}`,
      borderRadius: 16,
      padding: "28px 24px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s",
      userSelect: "none"
    }
  }, !flipped ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      marginBottom: 12
    }
  }, "Formula name"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: C.text,
      lineHeight: 1.4
    }
  }, drillCard.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 16
    }
  }, "Tap to reveal →")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: C.rewardLight,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      marginBottom: 12
    }
  }, drillCard.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      fontWeight: 800,
      color: C.rewardLight,
      fontFamily: "monospace",
      lineHeight: 1.5,
      letterSpacing: "0.02em"
    }
  }, drillCard.f))), flipped && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 14,
      animation: "fadeIn 0.15s ease"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setDrillResult(r => ({
        ...r,
        [drillIdx]: "again"
      }));
      const next = drillIdx + 1;
      if (next >= drillTotal) {
        setDrillDone(true);
      } else {
        setDrillIdx(next);
        setFlipped(false);
      }
    },
    style: {
      flex: 1,
      padding: "13px",
      borderRadius: 11,
      fontSize: 14,
      fontWeight: 700,
      background: C.hard + "28",
      border: `1px solid ${C.hard}55`,
      color: C.hard,
      cursor: "pointer"
    }
  }, "🔁 Again"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setDrillResult(r => ({
        ...r,
        [drillIdx]: "got it"
      }));
      const next = drillIdx + 1;
      if (next >= drillTotal) {
        setDrillDone(true);
      } else {
        setDrillIdx(next);
        setFlipped(false);
      }
    },
    style: {
      flex: 1,
      padding: "13px",
      borderRadius: 11,
      fontSize: 14,
      fontWeight: 700,
      background: C.easy + "28",
      border: `1px solid ${C.easy}55`,
      color: C.easy,
      cursor: "pointer"
    }
  }, "✓ Got it"))), drillMode && drillDone && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "32px 0",
      animation: "fadeIn 0.3s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      marginBottom: 16
    }
  }, "🎉"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: C.text,
      marginBottom: 8
    }
  }, "Round complete!"), (() => {
    const gotIt = Object.values(drillResult).filter(v => v === "got it").length;
    const again = drillTotal - gotIt;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: C.muted,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.easy,
        fontWeight: 700
      }
    }, gotIt), " got it · ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.hard,
        fontWeight: 700
      }
    }, again), " need review"), again > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        marginBottom: 20
      }
    }, "Review the ones you missed before the next round"));
  })(), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setDrillIdx(0);
      setFlipped(false);
      setDrillResult({});
      setDrillDone(false);
    },
    style: {
      padding: "12px 28px",
      borderRadius: 11,
      fontSize: 14,
      fontWeight: 700,
      background: `linear-gradient(135deg,${C.reward},${C.rewardLight})`,
      color: "#000",
      border: "none",
      cursor: "pointer"
    }
  }, "Drill again →"))));
}

// ─── LOCAL QUESTION GENERATOR ────────────────────────────────────────────────
// Template-based question generation — no API needed, instant, works offline.
// Each template: fn(rng) → {question, options:{A,B,C}, answer, explanation, concept, los_tested, misconception_targeted}

const rnd = (a, b, dp = 0) => {
  const v = a + Math.random() * (b - a);
  return dp ? parseFloat(v.toFixed(dp)) : Math.round(v);
};
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const names = ["Sarah Chen", "Marcus Webb", "Elena Volkov", "James Okafor", "Priya Sharma", "David Kim", "Aisha Nkosi", "Carlos Reyes"];
const firms = ["Capital Partners", "Asset Management", "Wealth Advisors", "Investment Group", "Securities"];
const pname = () => pick(names);
const pfirm = () => pname().split(" ")[1] + " " + pick(firms);

// ─── CFA INSTITUTE ETHICS IN PRACTICE CASES ─────────────────────────────────
// Source: Ethics in Investment Management Casebook, 2nd Ed., © 2019 CFA Institute
// Used under the CFA Institute licence: individual cases may be copied without
// modification for non-commercial purposes with attribution.
// Cases drawn from real regulatory enforcement actions and CFA Institute
// Professional Conduct investigations.

const ETHICS_CASES = [{
  id: "ec01",
  category: "Billing & Fees",
  standard: "V(B)",
  title: "Fee Methodology Change",
  vignette: `Maalouf works in a branch office for a large wealth management firm. The firm's fees are based on a percentage of the value of assets managed in each client account. The firm has a standard method for valuing assets and calculating fees for all clients, disclosed at the outset. Over time, the firm transitions to: (1) using market value at end of billing cycle instead of average daily balance; (2) including previously-excluded assets such as cash equivalents in the fee calculation; and (3) charging clients for a full billing period rather than prorating fees for accounts that start or terminate mid-period. Maalouf:`,
  options: {
    A: "cannot use end-of-cycle valuations, include cash equivalents, or charge full fees for partial cycle accounts.",
    B: "can change the valuation and fee calculation methodology as long as actual fees charged to clients are lower.",
    C: "must notify clients of the changes in the valuation and fee calculation methods.",
    D: "cannot change fundamental elements of the client relationship such as valuation and fee calculation methodology once disclosed."
  },
  answer: "C",
  explanation: `Standard V(B): Communication with Clients requires disclosure of the basic format and general principles of the investment process. Advisory fees are a critical part of that process. Any changes to fee methodology — even if fees end up lower — must be disclosed to clients. It is improper to change fee calculation methodology without disclosure. Maalouf and his firm can change the methodology but must notify clients first. Answer C is correct.`,
  source: "Based on a US SEC Office of Compliance Inspections and Examinations Risk Alert."
}, {
  id: "ec02",
  category: "Billing & Fees",
  standard: "I(A), I(C), V(A), V(C)",
  title: "Sub-Adviser Payments and Bribery",
  vignette: `Corrales manages a hedge fund seeking investment opportunities in developing markets. Using fund assets, the fund hires local companies as "sub-advisers" to obtain investment opportunities and navigate local regulation. The sub-advisers have very limited financial experience but have close relationships with high-ranking government officials. Payments often cover substantial "deal fees" that facilitate governmental support. Corrales does not require the local partners to document their activities. He reports these expenditures to investors as "operating expenses necessary to the success of the investment." Over several years the fund produces an 18% annual return. Did Corrales violate the Code and Standards?`,
  options: {
    A: "Yes.",
    B: "No, because it is acceptable to hire sub-advisers and consultants to assist in procuring investment opportunities.",
    C: "No, because the payments represent legitimate expenses to protect the interests of investors.",
    D: "No, as long as the sub-advisers provide more detail about payments and this is disclosed to investors."
  },
  answer: "A",
  explanation: `Corrales is not hiring true sub-advisers — he is essentially paying connected government officials to secure deals. The 'sub-advisers' have no financial experience and fees are undocumented. This violates multiple Standards: I(A) Knowledge of the Law (anti-bribery laws), I(C) Misrepresentation (labelling bribes as investment fees), V(A) Diligence and Reasonable Basis (no adequate basis for the 'investment' action), V(C) Record Retention (no appropriate records kept). Strong returns do not cure ethical violations.`,
  source: "Based on a US SEC enforcement action from 2017."
}, {
  id: "ec03",
  category: "Billing & Fees",
  standard: "III(A)",
  title: "Expense Billing on Client Trips",
  vignette: `Braun and his firm are hired by a regional government to serve as financial adviser for issuing general obligation bonds. For rating agency meetings in New York, Braun plans trips on Mondays or Fridays to get cheaper travel rates. His wife accompanies him and they spend weekends attending sporting events, theatre performances, and museums. Braun often changes flights and hotels to accommodate other client meetings, incurring change fees. His supervisor deducts expenses she believes are unrelated to the business purpose before submitting bills to the municipality. Which expenses can MOST LIKELY be billed to the client?`,
  options: {
    A: "Braun's accommodation and meal expenses for the weekend days, because the travel rates are cheaper over a weekend.",
    B: "Tickets to sporting and theatre events, as long as they do not exceed an amount for reasonable business entertainment.",
    C: "Flight and hotel change fees that result from the regular course of Braun's business activities.",
    D: "The travel and accommodation expenses for Braun's wife if he discloses this to his supervisor and receives written approval."
  },
  answer: "A",
  explanation: `Standard III(A): Loyalty, Prudence, and Care — members must not engage in deceptive, dishonest, or unfair practice when handling client accounts. Charging lavish personal expenses to clients violates this Standard. However, if the savings in travel fees from a weekend schedule exceed the extra accommodation and meal cost, the total cost to the client is actually lower — satisfying the duty of loyalty. Entertainment for the spouse, personal entertainment, and change fees from other client obligations are all personal/overhead costs that should not be charged to this client.`,
  source: "Based on a FINRA enforcement action."
}, {
  id: "ec04",
  category: "Billing & Fees",
  standard: "III(A)",
  title: "Inherited Billing Errors Post-Merger",
  vignette: `O'Reilly is CFO of Global Strategic Partners (GSP), which merges with Holland Advisers. GSP maintains Holland's legacy billing system for former Holland clients during the transition. When converting, O'Reilly reviews the billing information to ensure it is correctly copied into GSP's system. Unknown to O'Reilly, Holland's billing system has errors: fees default to the highest available rate when accounts transfer between branches; outside manager fees are charged on money market accounts that don't use outside managers; and advance-billed fees are not refunded when clients terminate accounts. Some errors stemmed from coding issues, others from failure to input negotiated lower rates. As CFO, O'Reilly:`,
  options: {
    A: "is not responsible for inadvertent billing system errors by Holland before the merger.",
    B: "fulfils his responsibilities by reviewing client billing information to ensure it is correctly copied into the system.",
    C: "fails to meet his ethical responsibilities to his firm's advisory clients.",
    D: "acts appropriately as long as he remedies Holland's billing errors once client accounts are converted to GSP's system."
  },
  answer: "C",
  explanation: `Standard III(A): Loyalty, Prudence, and Care. Although the billing errors were inadvertent and predated O'Reilly's involvement, they became GSP's responsibility once GSP used the inaccurate billing system, even temporarily. As CFO, O'Reilly is responsible for the accuracy of rates charged to clients. Fixing issues only upon conversion does not account for the initial period of overbilling by GSP using the Holland system. O'Reilly should have confirmed that fee information was accurate and consistent with clients' advisory agreements — not merely that it was correctly copied.`,
  source: "Based on a 2017 US SEC Enforcement Action."
}, {
  id: "ec05",
  category: "Billing & Fees",
  standard: "I(C), III(A), VI(A)",
  title: "Misleading Brokerage Arrangements",
  vignette: `Washington is a senior portfolio manager for Valley Forge Asset Management. The firm offers three brokerage options. Under 'Affiliated Brokerage', clients can direct brokerage to Valley Forge's own full-service brokerage. Washington states clients can negotiate commissions and the firm offers a 70% discount off its full rate. Around 1,200 clients choose this option, and 92% receive the 70% discount. However, Valley Forge does not provide any services to Affiliated Brokerage clients that are not also provided to clients under the other (cheaper) options. The minimum commission per trade under Affiliated Brokerage is more than double the maximum commission under other options, making nearly every trade more expensive even after the 70% 'discount'. Washington's actions are:`,
  options: {
    A: "acceptable because clients are free to choose which brokerage option to use.",
    B: "acceptable because Washington significantly discounts brokerage fees for clients choosing Affiliated Brokerage.",
    C: "acceptable because the conflicts regarding Affiliated Brokerage are fully disclosed in the advisory agreement.",
    D: "unacceptable."
  },
  answer: "D",
  explanation: `Standard I(C) Misrepresentation prohibits knowingly making misrepresentations about investment services. Standard III(A) requires acting in clients' best interests. Washington states the Affiliated Brokerage provides 'full-service' brokerage, but the firm provides no additional services compared to cheaper alternatives. The 70% discount off an inflated 'full rate' still results in costs 4.5x higher than other options. Clients lack the information to make an informed decision. Disclosure of a conflict of interest is not sufficient when the disclosure itself is misleading.`,
  source: "Based on a March 2019 US SEC Enforcement Action."
}, {
  id: "ec06",
  category: "Billing & Fees",
  standard: "III(A)",
  title: "Soft Dollar Misuse for Personal Rent",
  vignette: `Murdoch is founder and head portfolio manager of IOM Capital Management. IOM accumulates soft dollar credits through equity and options trading. IOM discloses that soft dollars may be used for 'overhead expenses, including office services, equipment, and supplies.' IOM rents a portion of Murdoch's personal residence to conduct business. IOM pays $6,000 in rent to a company Murdoch owns, which pays $5,855 to a bank for the monthly mortgage. IOM later requests the broker use soft dollars to make the rental payment. Once soft dollars are used for rent, Murdoch raises the rent first to $10,000 then to $15,000 per month. Murdoch's actions are:`,
  options: {
    A: "appropriate because rental payment on office space is an acceptable use of soft dollars.",
    B: "appropriate because IOM disclosed it would use soft dollars for overhead expenses.",
    C: "appropriate because Murdoch may charge market rates for use of his property.",
    D: "inappropriate."
  },
  answer: "D",
  explanation: `Standard III(A): Loyalty, Prudence, and Care. Soft dollars must benefit clients. Using client commissions to pay rent on a property that also serves Murdoch's personal use is improper. Even if overhead expenses were an allowable use, IOM's disclosure did not specifically state that soft dollars would be used to pay rent — making the disclosure incomplete. Furthermore, the 150% rent increase once soft dollars fund the payments is simply an attempt to enrich Murdoch at clients' expense. Clients would not know their commissions were funding personal mortgage payments on inflated rent.`,
  source: "Based on a May 2019 US SEC Enforcement Action."
}, {
  id: "ec07",
  category: "Billing & Fees",
  standard: "I(A)",
  title: "Fraudulent Fee Schedule and Dissociation",
  vignette: `Mandracken, a VP at Slate Brothers Bank (SBS) custody bank, oversees client services. SBS charges custody clients an established rate for SWIFT messages, but this rate is greater than the actual cost. Mandracken recognises this and emails his supervisor: 'the SWIFT fee is not a true pass-through to the client because we tack on a margin.' His supervisor directs him only to reduce the SWIFT rate for new clients and revisit rates for existing clients during contract renewals — leaving historical overcharges unaddressed. To comply with the Code and Standards, Mandracken should:`,
  options: {
    A: "comply with his duty of loyalty to his employer and implement the corrective procedures as directed by his supervisor.",
    B: "implement the corrective procedures as directed but report objections to the bank's board of directors.",
    C: "refuse to participate in any interactions with clients utilising the fee schedule until the bank revises the SWIFT rate for ALL clients to reflect actual out-of-pocket costs.",
    D: "report SBS's billing practices to the bank's regulator."
  },
  answer: "C",
  explanation: `Standard I(A): Knowledge of the Law requires members to dissociate from illegal or unethical conduct. The corrective measures directed by the supervisor are inadequate — they address new clients only and do not remedy historical overcharges. Mandracken cannot continue interacting with clients using a fraudulent fee schedule. The minimum required action is C: refuse to participate until all clients are charged correctly. Mandracken may also need to escalate to the board or regulators, but these additional steps do not replace the baseline obligation to dissociate. Mere compliance with inadequate supervisor instructions violates the Standards.`,
  source: "Based on a June 2019 US SEC Enforcement Action."
}, {
  id: "ec08",
  category: "Client Relationships",
  standard: "III(A), III(E)",
  title: "Confidentiality After Client Death",
  vignette: `Fontaine manages investments for an elderly client, Lafortune. Lafortune passes away and his estate becomes a new client of Fontaine's firm. During the estate administration process, Lafortune's adult children request information about their father's investment accounts, asset values, and transaction history prior to his death. The children are not named as account beneficiaries and have no written authority from the estate administrator. Fontaine should:`,
  options: {
    A: "provide the account information because the children are the heirs and have a natural right to this information.",
    B: "decline to provide account information because the client relationship and confidentiality obligations survive the client's death.",
    C: "provide the account information to the estate administrator only upon receiving a proper legal request.",
    D: "refer all queries to the firm's compliance department and take no further action."
  },
  answer: "C",
  explanation: `Standard III(E): Preservation of Confidentiality survives the end of a client relationship, including the client's death. Lafortune's children are not the account beneficiaries and have no authority. Fontaine must protect the estate and act in its interests. Information should only be disclosed to the estate administrator — the proper legal authority — upon a formal request. Providing account details to the children without authorisation would violate both III(E) and III(A) duties to the client (now represented by the estate).`,
  source: "Illustrative case based on CFA Institute Standards guidance."
}, {
  id: "ec09",
  category: "Investments & Trading",
  standard: "II(A)",
  title: "Mosaic Theory and Information Sources",
  vignette: `Holt is an equity analyst at a large investment management firm. While attending an industry conference, she speaks separately with a company's CFO (who provides only publicly available earnings guidance) and with a supply chain consultant (who shares, from his own research, that industry-wide component shortages are worsening). Neither piece of information alone is material nonpublic information. Combining both sources, Holt concludes that the company will likely miss earnings estimates. She issues a sell recommendation to her firm's portfolio managers. Holt has:`,
  options: {
    A: "violated Standard II(A) because she combined two sources of information to reach a conclusion not available to the public.",
    B: "not violated Standard II(A) because both pieces of information were individually non-material or public.",
    C: "violated Standard III(B) Fair Dealing by issuing the recommendation only to portfolio managers and not all clients simultaneously.",
    D: "violated Standard V(A) because she lacks a reasonable basis without additional research."
  },
  answer: "B",
  explanation: `This is the Mosaic Theory. Analysts may combine public information with non-material, non-public information from legitimate sources to reach conclusions that are not available to the general public — and act on those conclusions without violating Standard II(A). The CFO's guidance was public; the consultant's supply chain insights, while non-public, were not 'material' on their own. Holt is free to reach her own analytical conclusions. Her sell recommendation is based on legitimate research and analysis, not on possession of material nonpublic information.`,
  source: "Illustrative case based on CFA Institute Standards guidance on Mosaic Theory."
}, {
  id: "ec10",
  category: "Research",
  standard: "I(B), V(A)",
  title: "Analyst Independence Under Pressure",
  vignette: `Park is a sell-side equity analyst who covers a technology company that is also an investment banking client of his firm. His research model produces a 'Sell' rating. His firm's investment banking division asks him to change the rating to 'Hold' before publication, arguing that a negative report would damage the client relationship and jeopardise future underwriting business. Park's supervisor suggests that Park is 'being too conservative' in his assumptions. Park believes his assumptions are reasonable and well-supported. Park should:`,
  options: {
    A: "change the rating to 'Hold' as a compromise — it is less negative than 'Sell' and maintains the client relationship.",
    B: "maintain the 'Sell' rating and publish the research report with his honest assessment.",
    C: "withdraw the report entirely to avoid the conflict of interest.",
    D: "change the rating to 'Hold' but disclose in the report that investment banking has a relationship with the subject company."
  },
  answer: "B",
  explanation: `Standard I(B): Independence and Objectivity — members must not let commercial relationships compromise their analytical judgments. Standard V(A): Diligence and Reasonable Basis — recommendations must be supported by thorough analysis. Changing a rating due to investment banking pressure is a clear violation of I(B). A disclosure (option D) does not cure the violation if the rating itself is dishonest. Withdrawing the report (option C) avoids the violation but deprives clients of useful information. Park must maintain his 'Sell' rating if that is his honest, well-supported conclusion.`,
  source: "Illustrative case based on CFA Institute guidance on analyst independence."
}, {
  id: "ec11",
  category: "Personal Trading",
  standard: "VI(B)",
  title: "Front-Running Client Orders",
  vignette: `Martinez is a portfolio manager who identifies an attractive small-cap stock for inclusion in client portfolios. Before placing the client orders — which are large enough to move the stock price — Martinez purchases shares in her personal account. She then places the client orders. The stock price rises after the client orders are filled and Martinez sells her personal shares at a profit. Martinez has:`,
  options: {
    A: "not violated any Standard because she identified the opportunity through her own research.",
    B: "violated Standard VI(B): Priority of Transactions by trading for her personal account before client accounts.",
    C: "violated Standard II(B): Market Manipulation by artificially inflating the stock price.",
    D: "violated Standard III(A): Loyalty, Prudence, and Care by exposing clients to a higher purchase price."
  },
  answer: "B",
  explanation: `Standard VI(B): Priority of Transactions — client and employer trades must take priority over personal trades. Martinez front-ran client orders by buying personally before placing client orders. This is a direct violation of VI(B) regardless of how the investment idea was generated. Note: She may ALSO have violated III(A) since clients paid a higher price due to her personal trade moving the price, but VI(B) is the primary and most direct violation. Front-running is one of the most serious violations of the Standards.`,
  source: "Illustrative case based on CFA Institute Standards guidance."
}, {
  id: "ec12",
  category: "Employment Issues",
  standard: "IV(A)",
  title: "Departing Employee and Client Solicitation",
  vignette: `Chen is a portfolio manager who plans to leave her current employer to start her own investment advisory firm. Before resigning, she copies client contact information and account details from her employer's systems onto a personal device, intending to contact these clients after she leaves. She also begins soliciting two colleagues to join her new firm while still employed. Chen has:`,
  options: {
    A: "not violated any Standard because she plans to use the information only after she has resigned.",
    B: "violated Standard IV(A): Loyalty by misappropriating client information and soliciting colleagues while still employed.",
    C: "acted appropriately because clients have the right to follow their preferred adviser to a new firm.",
    D: "violated Standard III(E) only, because she is taking confidential client information."
  },
  answer: "B",
  explanation: `Standard IV(A): Loyalty — while employed, members must not misappropriate employer assets or take actions that harm the employer. Client lists and account information are proprietary employer property. Taking this information before resignation — even intending to use it only afterward — violates IV(A). Soliciting colleagues while still employed also harms the employer. Note that members may, without violating IV(A), inform clients of their impending departure (but not solicit them) and can work on their new firm in their own time without using employer resources or information.`,
  source: "Illustrative case based on CFA Institute Standards guidance."
}, {
  id: "ec13",
  category: "Supervisory Responsibility",
  standard: "IV(C)",
  title: "Failure to Supervise",
  vignette: `Reynolds is the head of equity trading at a large asset management firm. One of the traders he supervises, Diaz, is discovered to have been executing personal trades ahead of large client block orders — a practice that has been occurring for 18 months. Reynolds had received two prior written warnings from the compliance department that Diaz's personal trading patterns were unusual and warranted review. Reynolds took no action on either warning, stating he was 'too busy' and 'trusted Diaz'. Reynolds:`,
  options: {
    A: "is not responsible because the violations were committed by Diaz, not Reynolds.",
    B: "is responsible only if he had direct knowledge of Diaz's trading violations.",
    C: "violated Standard IV(C): Responsibilities of Supervisors by failing to take prompt action when warned of potential violations.",
    D: "violated Standard II(A): Material Nonpublic Information as a result of his knowledge of the client block orders."
  },
  answer: "C",
  explanation: `Standard IV(C): Responsibilities of Supervisors — members must make reasonable efforts to ensure that subordinates comply with laws, regulations, and the Code and Standards. Reynolds received two written warnings that Diaz's trading was suspicious and took no action. This is a direct violation of IV(C). A supervisor does not need to have directly known about the violation to be liable — they are responsible for responding to red flags. Ignorance chosen through inaction ('too busy', 'trust') is not a defence. Reynolds should have placed Diaz under heightened supervision, restricted his trading, or escalated to compliance immediately.`,
  source: "Illustrative case based on CFA Institute guidance on supervisory responsibility."
}, {
  id: "ec14",
  category: "Performance Reporting",
  standard: "III(D)",
  title: "Cherry-Picked Performance Records",
  vignette: `Silva manages several fixed-income portfolios for institutional clients. When pitching a new institutional prospect, she presents performance data for her three best-performing portfolios over the past three years, all of which significantly outperformed their benchmark. She does not present performance for her other six portfolios, which had mixed results including two that significantly underperformed the same benchmark. Silva:`,
  options: {
    A: "has not violated any Standard because she accurately presented the performance of the three portfolios shown.",
    B: "violated Standard III(D): Performance Presentation by presenting incomplete and misleading performance data.",
    C: "acted appropriately because all investment managers highlight their best work when marketing.",
    D: "should have presented all nine portfolios but is only in violation if the two underperforming portfolios had the same strategy as the three presented."
  },
  answer: "B",
  explanation: `Standard III(D): Performance Presentation — members must make reasonable efforts to ensure that performance information presented is fair, accurate, and complete. Selectively presenting only best-performing portfolios creates a misleading picture of the manager's overall capabilities. It is irrelevant that the data shown was accurate for those three portfolios. 'Cherry-picking' the best track record misrepresents overall performance. A proper presentation would include composite performance across all portfolios with a similar strategy, consistent with GIPS principles.`,
  source: "Illustrative case based on CFA Institute Standards guidance."
}, {
  id: "ec15",
  category: "CFA Institute",
  standard: "VII(A)",
  title: "Exam Integrity Violation",
  vignette: `During the CFA Level II exam, Petrov finishes the morning session early. While waiting for the session to end, he quietly photographs several questions on his exam booklet with a concealed device, intending to review them later to understand where he went wrong. He does not share the photographs with anyone. After the exam, the photographs remain on his personal device unused. Petrov has:`,
  options: {
    A: "not violated any Standard because he did not share the questions or gain an unfair advantage.",
    B: "not violated any Standard because his intent was self-improvement, not to compromise exam integrity.",
    C: "violated Standard VII(A): Conduct as Participants in CFA Institute Programs.",
    D: "violated Standard I(C): Misrepresentation by attempting to misrepresent his knowledge level."
  },
  answer: "C",
  explanation: `Standard VII(A): Conduct as Participants in CFA Institute Programs — members must not engage in any conduct that compromises the integrity, validity, or security of CFA Institute programs. Photographing exam questions violates exam confidentiality regardless of intent or subsequent use. Candidates sign a pledge not to reproduce exam content in any form. The act of photographing itself — even without sharing — compromises exam security and violates VII(A). Intent and outcome are irrelevant to this violation.`,
  source: "Illustrative case based on CFA Institute Standards guidance."
}, {
  id: "ec16",
  category: "Disclosures",
  standard: "VI(A)",
  title: "Undisclosed Referral Fee",
  vignette: `Okonkwo is a financial adviser who recommends clients to a local estate planning law firm. The law firm pays Okonkwo a flat fee of $500 for each client referral that results in a retained engagement. Okonkwo believes these referrals are genuinely in his clients' best interests and the law firm provides quality service. He does not disclose the referral fee arrangement to clients or his employer because he believes it does not affect the quality of his recommendation. Okonkwo has:`,
  options: {
    A: "not violated any Standard because the referrals are genuinely in his clients' best interests.",
    B: "not violated any Standard because the fee is paid by the law firm, not deducted from client assets.",
    C: "violated Standard VI(C): Referral Fees by failing to disclose the referral fee to clients and his employer.",
    D: "violated Standard III(A): Loyalty, Prudence, and Care by placing the law firm's interests above his clients' interests."
  },
  answer: "C",
  explanation: `Standard VI(C): Referral Fees — members must disclose to their employer, clients, and prospective clients any compensation received for recommending products or services. The quality of the recommendation is irrelevant to the disclosure obligation. Even if the referrals are genuinely good for clients, the existence of a financial arrangement creates a potential conflict of interest that clients are entitled to know about so they can assess the recommendation objectively. Failure to disclose is a violation regardless of intent.`,
  source: "Illustrative case based on CFA Institute Standards guidance."
}, {
  id: "ec17",
  category: "Outside Activities",
  standard: "IV(A), I(B)",
  title: "Outside Board Membership and Conflict",
  vignette: `Nakamura is a portfolio manager at a large asset manager. He also serves on the board of directors of a publicly traded technology company — an outside activity his employer is unaware of. While serving on the board, Nakamura learns material non-public information about the company's pending acquisition of a competitor. He does not trade on this information in client portfolios or his personal account. However, he also does not inform his employer about the board membership. Nakamura has:`,
  options: {
    A: "not violated any Standard because he did not trade on the inside information.",
    B: "violated Standard IV(A): Loyalty by failing to inform his employer of the outside activity.",
    C: "violated Standard II(A): Material Nonpublic Information by possessing inside information, regardless of whether he traded.",
    D: "violated Standards IV(A) and I(B) only."
  },
  answer: "B",
  explanation: `Standard IV(A): Loyalty requires members to inform their employer of activities that could conflict with their duties or the firm's interests. Serving on a public company board without disclosure creates significant potential conflicts — including receiving material nonpublic information (as occurred here). Nakamura violated IV(A) by not disclosing the board membership. Note: merely possessing MNPI without trading does not violate II(A) — the prohibition is on ACTING on such information. However, IV(A) is violated regardless. Proper procedure would have been to disclose the board membership and have a compliance process to manage the information barrier.`,
  source: "Illustrative case based on CFA Institute Standards guidance."
}, {
  id: "ec18",
  category: "Client Advice",
  standard: "III(C)",
  title: "Suitability and Changing Client Circumstances",
  vignette: `Reeves manages a balanced portfolio for a client who is 58 years old, planning to retire in 7 years, with moderate risk tolerance. Two years ago, they agreed on a 60% equity / 40% fixed income allocation. The client has not contacted Reeves in 18 months. During that time, the client's equity portfolio appreciated significantly, shifting the allocation to 75% equity / 25% fixed income. Reeves takes no rebalancing action because the client has not complained and equity markets continue to perform well. Reeves has:`,
  options: {
    A: "acted appropriately because the client has not objected to the drift.",
    B: "acted appropriately because the strong equity performance benefits the client.",
    C: "violated Standard III(C): Suitability by failing to manage the portfolio in line with the client's agreed objectives.",
    D: "violated Standard V(B): Communication with Clients by failing to inform the client of the allocation drift."
  },
  answer: "C",
  explanation: `Standard III(C): Suitability — members must manage portfolios in line with client objectives and constraints and must reassess and update information regularly. A 75%/25% equity/bond split is materially different from the agreed 60%/40% for a pre-retirement investor with moderate risk tolerance — it exposes the client to more equity risk than agreed. The client's silence and market performance are irrelevant; it is Reeves' responsibility to monitor and rebalance. Failure to act is a violation of III(C). Note: III(V)(B) may also be relevant since the client should be informed of significant portfolio changes.`,
  source: "Illustrative case based on CFA Institute Standards guidance."
}, {
  id: "ec19",
  category: "Research",
  standard: "I(C), V(B)",
  title: "Misleading Research Report",
  vignette: `Bergmann is a research analyst who publishes a report upgrading a stock from 'Hold' to 'Buy'. The report prominently features the base case valuation showing 35% upside. The report includes a downside scenario in a footnote on page 12 of 14 that shows a 40% loss under bear case assumptions. Bergmann considers the bear case highly unlikely but believes it is material. His firm's compliance department approved the report. Bergmann:`,
  options: {
    A: "has met his obligations because the bear case scenario is disclosed in the report.",
    B: "violated Standard I(C): Misrepresentation by burying material risk information in a footnote.",
    C: "has acted appropriately because both scenarios are included and compliance approved the report.",
    D: "violated Standard III(B): Fair Dealing by providing different information to different clients."
  },
  answer: "B",
  explanation: `Standard I(C): Misrepresentation and Standard V(B): Communication with Clients — members must not make misrepresentations and must distinguish between fact and opinion and communicate material risks effectively. Compliance approval does not create an ethical safe harbour. While the bear case is technically disclosed, burying a material 40% downside scenario in a footnote on page 12 while prominently featuring the 35% upside creates a misleading overall impression. Material information must be communicated in a way that clients can actually identify and evaluate it, not buried where it is effectively hidden.`,
  source: "Illustrative case based on CFA Institute Standards guidance."
}, {
  id: "ec20",
  category: "Employment Issues",
  standard: "IV(B)",
  title: "Additional Compensation Without Disclosure",
  vignette: `Watanabe is a portfolio manager whose investment performance has been excellent. A wealthy client offers to pay Watanabe a personal bonus of $50,000 at year-end if the portfolio outperforms its benchmark by more than 3% for the year. Watanabe intends to accept this arrangement. He has not disclosed it to his employer. Watanabe:`,
  options: {
    A: "may accept the arrangement because it aligns his incentives with the client's interests.",
    B: "may accept the arrangement as long as he discloses it to his employer after the year-end payment.",
    C: "must obtain written consent from all parties — including his employer — before entering into this arrangement.",
    D: "should decline the arrangement as any personal compensation from clients is prohibited by the Standards."
  },
  answer: "C",
  explanation: `Standard IV(B): Additional Compensation Arrangements — members must not accept any benefit that competes with or could create a conflict of interest with their employer's interests unless they obtain WRITTEN consent from ALL parties involved BEFORE entering the arrangement. The arrangement must be disclosed and approved in advance — not after payment. The fact that the incentive aligns with the client's interests does not exempt it from disclosure. Additional compensation from clients can create perverse incentives (e.g. excessive risk-taking to hit the performance threshold) that could harm other clients or the employer.`,
  source: "Illustrative case based on CFA Institute Standards guidance."
}];

// ─── ETHICS CASE STUDY MODE ──────────────────────────────────────────────────
// Returns cases filtered by standard/category, shuffled
function getEthicsCases(filter = "all", count = 5) {
  let pool = filter === "all" ? [...ETHICS_CASES] : ETHICS_CASES.filter(c => c.category === filter || c.standard.includes(filter));
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count).map(c => ({
    id: c.id,
    question: `[${c.category} — Standard ${c.standard}]\n\n${c.vignette}`,
    options: c.options,
    answer: c.answer,
    explanation: c.explanation + "\n\n📌 " + c.source,
    concept: c.category,
    los_tested: `Standard ${c.standard}: ${c.title}`,
    misconception_targeted: "Distinguish correct Standards application from plausible-sounding but incorrect alternatives",
    _isEthicsCase: true,
    _title: c.title
  }));
}
const Q_TEMPLATES = {
  "Ethics": [
  // Standard I-A Knowledge of Law
  () => {
    const name = pname();
    const country = pick(["Country A", "Country B", "Ruritania"]);
    const local = pick(["requires disclosure of all personal trades within 5 days", "prohibits trading in securities of employers", "mandates a 30-day blackout period before client trades"]);
    const cfa = pick(["recommends disclosure within 10 days", "has no specific blackout requirement", "requires prior approval but no specific timeline"]);
    return {
      question: `${name}, CFA, works in ${country} where local law ${local}. The CFA Standards ${cfa}. Which action is most appropriate?`,
      options: {
        A: `Follow the CFA Standards since they are the global benchmark`,
        B: `Follow whichever standard is stricter`,
        C: `Follow local law since it takes legal precedence`
      },
      answer: "B",
      explanation: `Standard I-A requires members to follow the stricter of applicable law or CFA Standards. When local law is stricter, follow local law. When CFA Standards are stricter, follow them.`,
      concept: "Standard I-A",
      los_tested: "demonstrate application of Standard I-A: Knowledge of the Law",
      misconception_targeted: "assuming CFA Standards always take precedence over local law"
    };
  },
  // Standard I-B Independence
  () => {
    const name = pname();
    const gift = rnd(150, 500);
    return {
      question: `${name}, CFA, is offered a gift worth $${gift} from a client whose portfolio she manages, as a thank-you for strong performance. She has NOT yet obtained written permission from her employer. What is the MOST appropriate action?`,
      options: {
        A: `Accept the gift — it is a gesture of appreciation and does not impair independence`,
        B: `Disclose the gift to her employer after accepting, since the intent was not improper`,
        C: `Decline the gift until she has disclosed it and received written permission from her employer`
      },
      answer: "C",
      explanation: `Standard I-B (Independence and Objectivity) requires members to obtain written permission from their employer BEFORE accepting gifts from clients or other parties that could reasonably be expected to create a conflict of interest. The CFA Standards set no specific dollar threshold — any gift that could impair independence requires pre-approval. Accepting first and disclosing later is not compliant.`,
      concept: "Standard I-B",
      los_tested: "demonstrate application of Standard I-B: Independence and Objectivity",
      misconception_targeted: "thinking post-facto disclosure is sufficient, or that small gifts require no approval"
    };
  },
  // Standard II-A Material Nonpublic
  () => {
    const name = pname();
    const scenario = pick([{
      info: "overheard two executives at a restaurant discussing an unannounced acquisition at a premium",
      action: "purchases shares of the target company for client accounts before any announcement"
    }, {
      info: "received a call from a company's investor relations officer hinting that next week's earnings will significantly exceed analyst estimates",
      action: "adds to client positions in the company the same afternoon"
    }, {
      info: "works in a company's legal department and knows about a pending government contract that has not been disclosed",
      action: "tips off a friend who then buys shares"
    }]);
    return {
      question: `${name}, CFA, ${scenario.info}. She then ${scenario.action}. Which Standard is MOST likely violated?`,
      options: {
        A: `Standard I-C: Misrepresentation — the information was obtained deceptively`,
        B: `Standard II-A: Material Nonpublic Information — trading on or tipping non-public, price-sensitive information`,
        C: `Standard III-B: Fair Dealing — she did not offer the opportunity to all clients equally`
      },
      answer: "B",
      explanation: `Standard II-A prohibits members from acting or causing others to act on material nonpublic information. Information is material if a reasonable investor would consider it important in making an investment decision. It is nonpublic until it has been disseminated broadly to the marketplace. Both trading on and tipping such information are violations.`,
      concept: "Standard II-A",
      los_tested: "demonstrate application of Standard II-A: Material Nonpublic Information",
      misconception_targeted: "confusing market integrity standards with duties to clients"
    };
  },
  // Standard III-C Suitability
  () => {
    const name = pname(),
      age = rnd(62, 75),
      pct = rnd(60, 90);
    return {
      question: `${name} is ${age} years old, retired, and relies on her portfolio for living expenses. Her advisor recommends allocating ${pct}% of her portfolio to small-cap growth stocks. The client agrees enthusiastically. Which Standard is MOST relevant?`,
      options: {
        A: `The advisor may proceed since the client has given explicit consent`,
        B: `Standard III-C requires the advisor to assess suitability based on the client's total profile, not just stated preferences`,
        C: `Standard IV-A requires the advisor to act in the employer's best interest first`
      },
      answer: "B",
      explanation: `Standard III-C: Suitability requires assessing investments in the context of the client's TOTAL portfolio and circumstances — age, income needs, risk tolerance. Client consent does not override suitability obligations. A ${pct}% allocation to small-caps is likely unsuitable for a retired investor dependent on the portfolio.`,
      concept: "Standard III-C",
      los_tested: "demonstrate application of Standard III-C: Suitability",
      misconception_targeted: "assuming client consent overrides suitability assessment"
    };
  },
  // Standard VI-B Priority of Transactions
  () => {
    const name = pname();
    return {
      question: `${name}, CFA, identifies an attractive investment opportunity. In what order should trades be placed?`,
      options: {
        A: `Personal account first, then clients, then employer proprietary accounts`,
        B: `Client accounts first, then employer proprietary accounts, then personal account`,
        C: `All accounts simultaneously to ensure equal treatment`
      },
      answer: "B",
      explanation: `Standard VI-B: Priority of Transactions requires: (1) client trades first, (2) employer proprietary accounts second, (3) personal trades last. This prevents front-running and conflicts of interest.`,
      concept: "Standard VI-B",
      los_tested: "demonstrate application of Standard VI-B: Priority of Transactions",
      misconception_targeted: "thinking simultaneous execution satisfies priority requirements"
    };
  },
  // Standard V-A Diligence and Reasonable Basis
  () => {
    const name = pname();
    const scenario = pick([{
      act: "relies solely on a single sell-side analyst's report without conducting any independent analysis",
      issue: "relying on a single third-party source without verifying the underlying reasoning"
    }, {
      act: "issues a 'Buy' recommendation based on a quantitative screen without reviewing the company's financial statements or business model",
      issue: "using a mechanical screen as a substitute for diligence"
    }, {
      act: "recommends a complex structured product to clients after attending only a 30-minute sales presentation by the issuer",
      issue: "insufficient understanding of a complex product before recommending it"
    }]);
    return {
      question: `${name}, CFA, ${scenario.act}. Which Standard is MOST likely violated?`,
      options: {
        A: `Standard V-A: Diligence and Reasonable Basis — she did not have an adequate basis for the recommendation`,
        B: `Standard III-C: Suitability — the investment may not suit all clients`,
        C: `Standard VI-A: Disclosure of Conflicts — she should have disclosed her reliance on third parties`
      },
      answer: "A",
      explanation: `Standard V-A requires members to have a reasonable and adequate basis for all investment recommendations, supported by appropriate diligence. The violation here is ${scenario.issue}. Members may rely on third-party research but must assess whether that research has a sound basis. Failing to do so before making a recommendation violates V-A.`,
      concept: "Standard V-A",
      los_tested: "demonstrate application of Standard V-A: Diligence and Reasonable Basis",
      misconception_targeted: "assuming reliance on external research automatically satisfies diligence requirements"
    };
  },
  // GIPS Standards
  () => {
    const name = pname();
    return {
      question: `A firm claims GIPS compliance in its marketing materials. According to the Global Investment Performance Standards, which of the following is REQUIRED?`,
      options: {
        A: `All portfolios managed by the firm must be included in at least one composite`,
        B: `The firm must obtain third-party verification to claim compliance`,
        C: `Performance must be calculated using a time-weighted return for all periods`
      },
      answer: "A",
      explanation: `GIPS requires that all actual, fee-paying, discretionary portfolios must be included in at least one composite — firms cannot cherry-pick their best portfolios. Verification is recommended but not required to claim compliance. GIPS requires time-weighted returns for composites but the specific calculation method may vary. The key anti-cherry-picking rule (all discretionary portfolios in a composite) is a cornerstone of GIPS.`,
      concept: "GIPS",
      los_tested: "explain the purpose of the GIPS standards and how they are implemented",
      misconception_targeted: "believing GIPS verification is mandatory, or that firms can select which portfolios to include"
    };
  },
  // Standard VII-B CFA Designation
  () => {
    const passed = pick(["passed all three CFA exams but has not yet completed the work experience requirement", "passed CFA Level II and is registered for Level III", "completed the CFA Program 10 years ago but let their membership lapse"]);
    const name = pname();
    return {
      question: `${name} has ${passed}. Which description is acceptable on his business card?`,
      options: {
        A: `CFA Charterholder`,
        B: `CFA Candidate`,
        C: `Neither — no reference to CFA is permitted`
      },
      answer: passed.includes("registered for Level III") ? "B" : "C",
      explanation: `The CFA designation can only be used by those who have earned the charter AND maintain active membership. 'CFA Candidate' is permitted only for those actively enrolled in the program. ${passed.includes("registered") ? "Since he is registered for Level III, 'CFA Candidate' is appropriate." : "In this case, no CFA reference is appropriate."}`,
      concept: "Standard VII-B",
      los_tested: "demonstrate application of Standard VII-B: Reference to CFA Institute, the CFA Designation, and CFA Program",
      misconception_targeted: "using CFA designation without completing all requirements"
    };
  }],
  "Quantitative Methods": [
  // Confidence interval
  () => {
    const mu = rnd(8, 15);
    const se = parseFloat(rnd(10, 30) / 10).toFixed(1);
    const z = pick([1.645, 1.96, 2.576]);
    const conf = z === 1.645 ? "90%" : z === 1.96 ? "95%" : "99%";
    const lo = parseFloat(mu - z * parseFloat(se)).toFixed(2);
    const hi = parseFloat(mu + z * parseFloat(se)).toFixed(2);
    const wrongLo = parseFloat(mu - parseFloat(se)).toFixed(2);
    const wrongHi = parseFloat(mu + parseFloat(se)).toFixed(2);
    return {
      question: `A sample of equity returns has a mean of ${mu}% and a standard error of ${se}%. What is the ${conf} confidence interval for the population mean?`,
      options: {
        A: `[${lo}%, ${hi}%]`,
        B: `[${wrongLo}%, ${wrongHi}%] (uses ±1 SE, not the correct z-score)`,
        C: `[${parseFloat(mu - 2 * parseFloat(se)).toFixed(2)}%, ${parseFloat(mu + 2 * parseFloat(se)).toFixed(2)}%] (uses z=2 regardless of confidence level)`
      },
      answer: "A",
      explanation: `${conf} CI = x̄ ± z × SE = ${mu}% ± ${z} × ${se}% = [${lo}%, ${hi}%]. Critical z-values: 90% → 1.645, 95% → 1.96, 99% → 2.576. The CI means: if we repeated this sampling process many times, ${conf} of the resulting intervals would contain the true population mean.`,
      concept: "Confidence Intervals",
      los_tested: "explain the construction and interpretation of confidence intervals",
      misconception_targeted: "using the wrong z-score for a given confidence level"
    };
  },
  // EAR calculation
  () => {
    const r = rnd(4, 12);
    const m = pick([2, 4, 12, 365]);
    const mname = {
      2: "semi-annual",
      4: "quarterly",
      12: "monthly",
      365: "daily"
    }[m];
    const ear = ((1 + r / 100 / m) ** m - 1) * 100;
    const wrong1 = parseFloat((r * 1.1).toFixed(3));
    const wrong2 = parseFloat((r + r * r / 100 / m / 2).toFixed(3));
    const correct = parseFloat(ear.toFixed(3));
    return {
      question: `A bank offers a stated annual rate of ${r}% compounded ${mname}. What is the effective annual rate (EAR)?`,
      options: {
        A: `${correct}%`,
        B: `${wrong1}%`,
        C: `${wrong2}%`
      },
      answer: "A",
      explanation: `EAR = (1 + ${r}%/${m})^${m} − 1 = (1 + ${(r / m / 100).toFixed(5)})^${m} − 1 = ${correct}%. The EAR is always higher than the stated rate when compounding occurs more than once per year.`,
      concept: "EAR",
      los_tested: "calculate and interpret annualized return measures and continuously compounded returns",
      misconception_targeted: "confusing stated rate with effective annual rate"
    };
  },
  // Time-weighted vs money-weighted
  () => {
    const r1 = rnd(8, 20),
      r2 = rnd(-15, -3);
    const twr = parseFloat(((1 + r1 / 100) * (1 + r2 / 100) - 1) * 100).toFixed(2);
    const awr = parseFloat((r1 + r2) / 2).toFixed(2);
    return {
      question: `A portfolio returns ${r1}% in Year 1 and ${r2}% in Year 2. What is the time-weighted return over the two-year period?`,
      options: {
        A: `${awr}% (arithmetic average)`,
        B: `${twr}% (chain-linked geometric)`,
        C: `${parseFloat((r1 + r2) / 2 * 0.9).toFixed(2)}% (adjusted for compounding)`
      },
      answer: "B",
      explanation: `Time-weighted return = (1 + ${r1}%) × (1 + ${r2}%) − 1 = ${twr}%. TWR chains sub-period returns multiplicatively, eliminating the effect of external cash flows. The arithmetic average (${awr}%) overstates compound growth.`,
      concept: "TWR",
      los_tested: "compare money-weighted and time-weighted rates of return and evaluate portfolio performance",
      misconception_targeted: "using arithmetic mean instead of geometric chain-linking for TWR"
    };
  },
  // Type I vs Type II error
  () => {
    const alpha = pick([1, 5, 10]);
    return {
      question: `A researcher sets a significance level of ${alpha}%. She fails to reject the null hypothesis when it is actually false. This is best described as:`,
      options: {
        A: `A Type I error — incorrectly rejecting a true null hypothesis`,
        B: `A Type II error — failing to reject a false null hypothesis`,
        C: `A correct decision since the null was not rejected`
      },
      answer: "B",
      explanation: `Type II error = failing to reject H₀ when H₀ is actually false (false negative). Type I error = rejecting H₀ when H₀ is true (false positive). The probability of Type II error is β; power = 1 − β. The significance level (${alpha}%) controls Type I error only.`,
      concept: "Hypothesis Testing",
      los_tested: "explain hypothesis testing and its components including statistical significance Type I and Type II errors and the power of a test",
      misconception_targeted: "confusing Type I and Type II errors"
    };
  },
  // Roy's Safety First
  () => {
    const rl = rnd(3, 8);
    const p1 = {
      e: rnd(12, 18),
      s: rnd(8, 15)
    };
    const p2 = {
      e: rnd(10, 16),
      s: rnd(5, 10)
    };
    const sfr1 = parseFloat(((p1.e - rl) / p1.s).toFixed(3));
    const sfr2 = parseFloat(((p2.e - rl) / p2.s).toFixed(3));
    const winner = sfr1 > sfr2 ? "A" : "B";
    return {
      question: `An investor's minimum acceptable return is ${rl}%. Portfolio A has E(R)=${p1.e}%, σ=${p1.s}%. Portfolio B has E(R)=${p2.e}%, σ=${p2.s}%. Using Roy's Safety-First criterion, which portfolio is optimal?`,
      options: {
        A: `Portfolio A (SFR = ${sfr1})`,
        B: `Portfolio B (SFR = ${sfr2})`,
        C: `The portfolio with the higher Sharpe ratio`
      },
      answer: winner,
      explanation: `Safety-First Ratio = (E(R) − R_min) / σ. Portfolio A: (${p1.e}−${rl})/${p1.s} = ${sfr1}. Portfolio B: (${p2.e}−${rl})/${p2.s} = ${sfr2}. Select the HIGHEST SFR — Portfolio ${winner}. Roy's criterion minimises probability of falling below the minimum return.`,
      concept: "Safety-First",
      los_tested: "define shortfall risk calculate the safety-first ratio and identify an optimal portfolio using Roy's safety-first criterion",
      misconception_targeted: "confusing safety-first ratio with Sharpe ratio"
    };
  }],
  "Financial Statement Analysis": [
  // DuPont decomposition
  () => {
    const npm = rnd(5, 20);
    const at = parseFloat(rnd(80, 200) / 100).toFixed(2);
    const em = parseFloat(rnd(150, 300) / 100).toFixed(2);
    const roe = parseFloat(npm / 100 * parseFloat(at) * parseFloat(em) * 100).toFixed(2);
    const wrong1 = parseFloat(npm / 100 * parseFloat(at) * 100).toFixed(2);
    const wrong2 = parseFloat(npm * parseFloat(em)).toFixed(2);
    return {
      question: `A company has net profit margin of ${npm}%, asset turnover of ${at}×, and equity multiplier of ${em}×. What is the Return on Equity (ROE) using the DuPont formula?`,
      options: {
        A: `${roe}%`,
        B: `${wrong1}% (margin × turnover only)`,
        C: `${wrong2}% (margin × leverage only)`
      },
      answer: "A",
      explanation: `DuPont ROE = Net Profit Margin × Asset Turnover × Equity Multiplier = ${npm}% × ${at} × ${em} = ${roe}%. All three components must be included: profitability, efficiency, and leverage.`,
      concept: "DuPont ROE",
      los_tested: "demonstrate the application of DuPont analysis of return on equity",
      misconception_targeted: "omitting one of the three DuPont components"
    };
  },
  // Cash Conversion Cycle
  () => {
    const dso = rnd(30, 60);
    const dio = rnd(40, 80);
    const dpo = rnd(20, 45);
    const ccc = dso + dio - dpo;
    const wrong1 = dso + dio + dpo;
    const wrong2 = dso + dio;
    return {
      question: `A company has Days Sales Outstanding of ${dso} days, Days Inventory Outstanding (DIO) of ${dio} days, and Days Payable Outstanding of ${dpo} days. What is the Cash Conversion Cycle?`,
      options: {
        A: `${ccc} days`,
        B: `${wrong1} days`,
        C: `${wrong2} days`
      },
      answer: "A",
      explanation: `CCC = DSO + DIO − DPO = ${dso} + ${dio} − ${dpo} = ${ccc} days. DPO is SUBTRACTED because paying suppliers later reduces the cash conversion period. A shorter CCC = more efficient working capital management.`,
      concept: "Cash Conversion Cycle",
      los_tested: "calculate and interpret activity liquidity solvency and profitability ratios",
      misconception_targeted: "adding DPO instead of subtracting it in the CCC formula"
    };
  },
  // LIFO vs FIFO in inflation
  () => {
    return {
      question: `During a period of rising inventory costs, compared to FIFO, a company using LIFO will report:`,
      options: {
        A: `Higher net income and higher inventory on the balance sheet`,
        B: `Lower net income and lower inventory on the balance sheet`,
        C: `Lower net income and higher inventory on the balance sheet`
      },
      answer: "B",
      explanation: `Under LIFO during inflation: most recent (higher cost) units are expensed first → higher COGS → lower gross profit → lower net income. Older (lower cost) units remain in inventory → lower balance sheet inventory. LIFO gives a tax benefit (lower taxes) but understates inventory.`,
      concept: "LIFO vs FIFO",
      los_tested: "calculate and explain how inflation and deflation of inventory costs affect financial statements and ratios",
      misconception_targeted: "mixing LIFO effects on income statement vs balance sheet"
    };
  },
  // Current ratio & quick ratio
  () => {
    const ca = rnd(200, 500);
    const cl = rnd(100, 250);
    const inv = rnd(50, 150);
    const prep = rnd(10, 40);
    const cr = parseFloat(ca / cl).toFixed(2);
    const qr = parseFloat((ca - inv - prep) / cl).toFixed(2);
    const wrong1 = parseFloat((ca - inv) / cl).toFixed(2);
    return {
      question: `A firm has current assets of $${ca}M, current liabilities of $${cl}M, inventory of $${inv}M, and prepaid expenses of $${prep}M. What is the quick ratio?`,
      options: {
        A: `${qr}×`,
        B: `${cr}× (current ratio, not quick ratio)`,
        C: `${wrong1}× (excluding only inventory)`
      },
      answer: "A",
      explanation: `Quick ratio = (Current Assets − Inventory − Prepaid Expenses) / Current Liabilities = ($${ca} − $${inv} − $${prep}) / $${cl} = ${qr}×. Prepaid expenses are excluded because they cannot be quickly converted to cash. The current ratio (${cr}×) includes all current assets.`,
      concept: "Quick Ratio",
      los_tested: "calculate and interpret activity liquidity solvency and profitability ratios",
      misconception_targeted: "forgetting to exclude prepaid expenses from the quick ratio"
    };
  },
  // Revenue recognition (percentage of completion)
  () => {
    const total = rnd(50, 200);
    const pct = rnd(30, 70);
    const cost = Math.round(total * rnd(60, 80) / 100);
    const rev = Math.round(total * pct / 100);
    const costRec = Math.round(cost * pct / 100);
    const gp = rev - costRec;
    return {
      question: `Under the percentage-of-completion method, a $${total}M contract is ${pct}% complete. Total estimated costs are $${cost}M. How much gross profit is recognised in the current period?`,
      options: {
        A: `$${gp}M`,
        B: `$0 — profit recognised only on completion`,
        C: `$${total - cost}M — total contract profit recognised immediately`
      },
      answer: "A",
      explanation: `Revenue recognised = ${pct}% × $${total}M = $${rev}M. Costs recognised = ${pct}% × $${cost}M = $${costRec}M. Gross profit = $${rev}M − $${costRec}M = $${gp}M. Under percentage-of-completion (IFRS15 / ASC 606), revenue is recognised proportionally as work progresses.`,
      concept: "Revenue Recognition Percentage of Completion",
      los_tested: "describe the general principles of revenue recognition",
      misconception_targeted: "deferring all profit until contract completion"
    };
  },
  // Deferred tax
  () => {
    const pretax = rnd(100, 300);
    const rate = pick([20, 25, 30]);
    const bookDep = rnd(20, 60);
    const diff = rnd(10, 30);
    const taxDep = bookDep + diff;
    const dtl = Math.round(diff * rate / 100);
    const taxExp = Math.round(pretax * rate / 100);
    const wrongVal = Math.round(pretax * rate / 100 - dtl);
    return {
      question: `A company has pre-tax income of $${pretax}M and a tax rate of ${rate}%. Book depreciation is $${bookDep}M while tax depreciation is $${taxDep}M (accelerated). What is the deferred tax liability created this period?`,
      options: {
        A: `$${dtl}M`,
        B: `$${taxExp}M (total income tax expense, not the deferred portion)`,
        C: `$${wrongVal}M (taxes currently payable)`
      },
      answer: "A",
      explanation: `Temporary difference = tax depreciation − book depreciation = $${taxDep}M − $${bookDep}M = $${diff}M. DTL = $${diff}M × ${rate}% = $${dtl}M. Accelerated tax depreciation reduces taxes payable now but creates a deferred liability that reverses in later periods when tax depreciation falls below book depreciation.`,
      concept: "Deferred Tax Liability",
      los_tested: "explain how deferred tax liabilities and assets are created and the factors that determine how a company's deferred tax liabilities and assets should be treated for purposes of financial analysis",
      misconception_targeted: "confusing total income tax expense with the deferred tax component"
    };
  },
  // Operating vs investing cash flows
  () => {
    const ni = rnd(50, 150);
    const dep = rnd(10, 40);
    const wc = rnd(5, 30);
    const capex = rnd(30, 100);
    const cfo = ni + dep - wc;
    const cfi = -capex;
    return {
      question: `A company reports net income of $${ni}M, depreciation of $${dep}M, an increase in working capital of $${wc}M, and capital expenditures of $${capex}M. What is cash flow from operations (CFO) under the indirect method?`,
      options: {
        A: `$${cfo}M`,
        B: `$${ni + dep}M (ignoring working capital change)`,
        C: `$${cfo + cfi}M (including capex)`
      },
      answer: "A",
      explanation: `CFO (indirect) = Net Income + Depreciation − Increase in Working Capital = $${ni} + $${dep} − $${wc} = $${cfo}M. Depreciation is added back (non-cash charge). Working capital increases use cash, so they are subtracted. Capital expenditures ($${capex}M) belong in CFI, not CFO.`,
      concept: "Cash Flow from Operations Indirect Method",
      los_tested: "describe how the cash flow statement is linked to the income statement and balance sheet",
      misconception_targeted: "including capex in CFO or mishandling working capital direction"
    };
  },
  // EPS diluted vs basic
  () => {
    const ni = rnd(50, 200);
    const shares = rnd(50, 150);
    const opts = rnd(5, 20);
    const price = rnd(20, 50);
    const strike = Math.round(price * rnd(50, 80) / 100);
    const basic = parseFloat(ni / shares).toFixed(2);
    const treasury = Math.round(opts * (price - strike) / price);
    const dilutedShares = shares + opts - treasury;
    const diluted = parseFloat(ni / dilutedShares).toFixed(2);
    return {
      question: `A company earns $${ni}M net income with ${shares}M basic shares. It has ${opts}M dilutive options (strike $${strike}, market $${price}). Using the treasury stock method, what is diluted EPS?`,
      options: {
        A: `$${diluted}`,
        B: `$${basic} (basic EPS, options ignored)`,
        C: `$${parseFloat(ni / (shares + opts)).toFixed(2)} (ignoring treasury stock buyback)`
      },
      answer: "A",
      explanation: `Treasury stock method: Options exercised = ${opts}M. Proceeds = ${opts}M × $${strike} = $${opts * strike}M. Shares bought back at market price = $${opts * strike}M / $${price} = ${treasury}M shares. Net dilution = ${opts}M − ${treasury}M = ${opts - treasury}M shares. Diluted shares = ${shares}M + ${opts - treasury}M = ${dilutedShares}M. Diluted EPS = $${ni}M / ${dilutedShares}M = $${diluted}.`,
      concept: "Diluted EPS Treasury Stock Method",
      los_tested: "calculate and interpret basic and diluted EPS",
      misconception_targeted: "adding all option shares without applying treasury stock method"
    };
  },
  // Inventory write-down LCNRV
  () => {
    const cost = rnd(100, 300);
    const nrv = Math.round(cost * rnd(70, 95) / 100);
    const writedown = cost - nrv;
    return {
      question: `A company's inventory has a historical cost of $${cost}M. The estimated net realisable value (NRV) is $${nrv}M. Under IFRS, what is the required accounting treatment?`,
      options: {
        A: `Write down inventory to $${nrv}M, recognising a $${writedown}M loss on the income statement`,
        B: `No adjustment required; IFRS requires inventory at historical cost`,
        C: `Write down only under US GAAP; IFRS allows the higher of cost or NRV`
      },
      answer: "A",
      explanation: `Under IFRS (IAS 2), inventory is carried at the lower of cost or NRV. Since NRV ($${nrv}M) < cost ($${cost}M), inventory is written down to $${nrv}M, recording a $${writedown}M loss. Under US GAAP the rule is lower of cost or market (LCM), but the principle is similar. Write-downs cannot be reversed under US GAAP; IFRS allows reversal if NRV recovers.`,
      concept: "Inventory Lower of Cost or NRV",
      los_tested: "calculate and explain how inventories are reported in the financial statements",
      misconception_targeted: "believing IFRS uses historical cost without NRV test"
    };
  },
  // Debt-to-equity vs debt-to-assets
  () => {
    const debt = rnd(100, 400);
    const equity = rnd(100, 300);
    const assets = debt + equity;
    const dte = parseFloat(debt / equity).toFixed(2);
    const dta = parseFloat(debt / assets).toFixed(2);
    const wrong = parseFloat(equity / assets).toFixed(2);
    return {
      question: `A firm has total debt of $${debt}M and total equity of $${equity}M (total assets = $${assets}M). What is the debt-to-equity ratio?`,
      options: {
        A: `${dte}×`,
        B: `${dta}× (debt-to-assets, not D/E)`,
        C: `${wrong}× (equity-to-assets)`
      },
      answer: "A",
      explanation: `Debt-to-Equity = Total Debt / Total Equity = $${debt}M / $${equity}M = ${dte}×. Debt-to-Assets = $${debt}M / $${assets}M = ${dta}×. These ratios measure leverage differently; D/E shows how many dollars of debt per dollar of equity, while D/A shows the proportion of assets financed by debt.`,
      concept: "Solvency Ratios Debt-to-Equity",
      los_tested: "calculate and interpret activity liquidity solvency and profitability ratios",
      misconception_targeted: "confusing debt-to-equity with debt-to-assets"
    };
  }],
  "Fixed Income": [
  // Duration price sensitivity
  () => {
    const md = parseFloat(rnd(40, 90) / 10).toFixed(1);
    const dy = parseFloat(rnd(25, 75) / 100).toFixed(2);
    const price = rnd(95, 105);
    const dp = parseFloat(-parseFloat(md) * parseFloat(dy) / 100 * price).toFixed(2);
    const wrong1 = parseFloat(parseFloat(md) * parseFloat(dy) / 100 * price).toFixed(2);
    const wrong2 = parseFloat(-parseFloat(md) * parseFloat(dy) * price / 10).toFixed(2);
    return {
      question: `A bond has a modified duration of ${md} and a full price of $${price}. If the yield-to-maturity rises by ${dy}%, what is the approximate change in full price?`,
      options: {
        A: `$${dp}`,
        B: `+$${wrong1} (price rises when yields rise)`,
        C: `$${wrong2} (yield change not converted to decimal)`
      },
      answer: "A",
      explanation: `ΔPrice ≈ −ModDuration × Δy × Price = −${md} × ${(parseFloat(dy) / 100).toFixed(4)} × $${price} ≈ $${dp}. The negative sign captures the inverse price-yield relationship. This approximation improves with convexity adjustment for large yield moves.`,
      concept: "Modified Duration Price Change",
      los_tested: "define calculate and interpret modified duration money duration and the price value of a basis point",
      misconception_targeted: "forgetting the negative sign or not converting yield change to decimal"
    };
  },
  // Macaulay vs Modified Duration
  () => {
    const mac = parseFloat(rnd(30, 80) / 10).toFixed(1);
    const y = rnd(3, 8);
    const m = pick([1, 2]);
    const mod = parseFloat(parseFloat(mac) / (1 + y / 100 / m)).toFixed(3);
    const wrong1 = mac;
    const wrong2 = parseFloat(parseFloat(mac) * (1 + y / 100 / m)).toFixed(3);
    return {
      question: `A bond has a Macaulay duration of ${mac} years and a yield-to-maturity of ${y}% compounded ${m === 1 ? "annually" : "semi-annually"}. What is its modified duration?`,
      options: {
        A: `${mod} years`,
        B: `${wrong1} years (same as Macaulay — no adjustment needed)`,
        C: `${wrong2} years (multiplied instead of divided)`
      },
      answer: "A",
      explanation: `Modified Duration = Macaulay Duration / (1 + y/m) = ${mac} / (1 + ${y}%/${m}) = ${mod} years. Modified duration is always slightly less than Macaulay duration. It directly estimates the percentage price change for a 1% change in yield: %ΔP ≈ −ModDur × Δy.`,
      concept: "Macaulay vs Modified Duration",
      los_tested: "define calculate and interpret Macaulay duration and modified duration",
      misconception_targeted: "treating Macaulay and modified duration as equal"
    };
  },
  // Coupon and duration relationship
  () => {
    const c1 = rnd(2, 5),
      c2 = rnd(8, 12);
    const mat = rnd(5, 15);
    return {
      question: `Two bonds have identical maturities of ${mat} years and the same yield-to-maturity. Bond A has a coupon of ${c1}% and Bond B has a coupon of ${c2}%. Which bond has higher interest rate risk, and why?`,
      options: {
        A: `Bond A — lower coupon means a higher proportion of value comes from the par payment at maturity, so duration and price sensitivity are higher`,
        B: `Bond B — higher coupon rate means higher cash flows, so more to lose if yields rise`,
        C: `Both bonds have identical interest rate risk because they have the same maturity and YTM`
      },
      answer: "A",
      explanation: `Lower coupon → less cash returned early → longer weighted average time to cash flows → higher Macaulay and modified duration → greater price sensitivity to yield changes. Bond A (${c1}% coupon) has a longer duration than Bond B (${c2}% coupon) despite identical maturity. In the extreme, a zero-coupon bond has the highest duration equal to its maturity.`,
      concept: "Coupon Rate and Duration",
      los_tested: "explain how a bond's maturity coupon and yield level affect its interest rate risk",
      misconception_targeted: "assuming equal maturity means equal interest rate risk"
    };
  },
  // YTM vs coupon rate and price
  () => {
    const par = 1000;
    const coup = rnd(4, 8);
    const ytm = rnd(3, 10);
    const relation = ytm < coup ? "above par (premium bond)" : ytm > coup ? "below par (discount bond)" : "at par";
    const logic = ytm < coup ? `YTM (${ytm}%) < coupon rate (${coup}%) — investors accept a lower yield, so they bid the price above par` : ytm > coup ? `YTM (${ytm}%) > coupon rate (${coup}%) — investors require a higher yield, so they pay less than par` : `YTM equals coupon rate — the bond is priced exactly at par`;
    const wrong1 = ytm < coup ? "below par (discount bond)" : "above par (premium bond)";
    const wrong2 = "at par regardless of coupon and yield";
    return {
      question: `A bond has a ${coup}% annual coupon rate and a yield-to-maturity of ${ytm}%. Assuming annual coupon payments, the bond is priced:`,
      options: {
        A: relation,
        B: wrong1,
        C: wrong2
      },
      answer: "A",
      explanation: `${logic}. Key rule: If YTM > coupon rate → discount bond (price < par). If YTM < coupon rate → premium bond (price > par). If YTM = coupon rate → par bond (price = par). This relationship holds for all conventional bonds.`,
      concept: "Bond Price YTM Coupon Relationship",
      los_tested: "describe relationships among a bond's price coupon rate maturity and yield-to-maturity",
      misconception_targeted: "inverting the direction of the price-yield relationship relative to coupon rate"
    };
  },
  // Credit spreads
  () => {
    const govt = parseFloat(rnd(20, 50) / 10).toFixed(1);
    const corp = parseFloat(parseFloat(rnd(20, 50) / 10) + rnd(10, 40) / 10).toFixed(1);
    const spread = parseFloat(parseFloat(corp) - parseFloat(govt)).toFixed(1);
    const spreadBps = Math.round(parseFloat(spread) * 100);
    return {
      question: `A government bond yields ${govt}% and a comparable-maturity corporate bond yields ${corp}%. The credit spread (G-spread) is ${spreadBps} bps. If the credit spread widens by 50 bps and the corporate bond has a modified duration of 5 years, what is the approximate price impact?`,
      options: {
        A: `−${(5 * 0.50).toFixed(2)}% (price falls as spreads widen)`,
        B: `+${(5 * 0.50).toFixed(2)}% (price rises as spreads widen)`,
        C: `No change — credit spread changes affect yield but not price`
      },
      answer: "A",
      explanation: `Credit spread widening raises the bond's YTM. Using duration: %ΔP ≈ −ModDur × ΔSpread = −5 × 0.50% = −${(5 * 0.50).toFixed(2)}%. Wider spreads = higher required yield = lower price. Credit spread = compensation for credit risk, liquidity risk, and taxation. G-spread = corporate YTM − government YTM for the same maturity.`,
      concept: "Credit Spreads",
      los_tested: "define spread measures and explain how they are used to value a bond",
      misconception_targeted: "not applying duration to spread changes, or reversing the price direction"
    };
  },
  // Callable vs straight bond
  () => {
    const y = rnd(5, 9);
    const coup = rnd(6, 10);
    return {
      question: `A callable bond and an otherwise identical straight (non-callable) bond both have a ${coup}% coupon. As interest rates fall significantly below the coupon rate, how does the price of the callable bond compare to the straight bond?`,
      options: {
        A: `The callable bond's price rises less than the straight bond's price — price compression occurs as the call option becomes more valuable to the issuer`,
        B: `The callable bond's price rises more than the straight bond's price — investors demand higher yields on the callable bond`,
        C: `Both bonds rise identically in price since they have the same coupon and maturity`
      },
      answer: "A",
      explanation: `Callable bond price = Straight bond price − Value of call option. As rates fall, the call option becomes more valuable to the issuer (likely to be exercised), capping the callable bond's price appreciation. This is called negative convexity or price compression. The callable bond will lag the straight bond in price appreciation when rates fall significantly below the coupon rate.`,
      concept: "Callable Bond Negative Convexity",
      los_tested: "describe how the presence of embedded options changes the features of fixed-income securities",
      misconception_targeted: "assuming callable and straight bonds behave identically when rates fall below coupon"
    };
  },
  // Accrued interest / full vs flat price
  () => {
    const coup = rnd(4, 8);
    const par = 1000;
    const days = rnd(30, 150);
    const period = 180;
    const accrued = parseFloat(coup / 100 * par / 2 * days / period).toFixed(2);
    const flat = parseFloat(rnd(950, 1050) + Math.random() * 10).toFixed(2);
    const full = parseFloat(parseFloat(flat) + parseFloat(accrued)).toFixed(2);
    return {
      question: `A bond with a ${coup}% semi-annual coupon (par $${par}) has a flat (clean) price of $${flat}. The bond is ${days} days into a ${period}-day coupon period. What is the full (dirty) price?`,
      options: {
        A: `$${full}`,
        B: `$${flat} — flat price is the actual settlement price`,
        C: `$${parseFloat(parseFloat(flat) - parseFloat(accrued)).toFixed(2)} — subtract accrued interest`
      },
      answer: "A",
      explanation: `Full (dirty) price = Flat (clean) price + Accrued Interest. Accrued interest = (Coupon / 2) × (Days since last coupon / Days in period) = ($${coup / 100 * par / 2}) × (${days}/${period}) = $${accrued}. Full price = $${flat} + $${accrued} = $${full}. Bond quotes use the flat price, but settlement occurs at the full price. The buyer compensates the seller for accrued interest.`,
      concept: "Full Price vs Flat Price",
      los_tested: "calculate and interpret the full price of a bond given the flat price",
      misconception_targeted: "using the flat price as the settlement price or subtracting accrued interest"
    };
  }],
  "Equity": [
  // Gordon Growth Model
  () => {
    const d0 = parseFloat(rnd(100, 300) / 100).toFixed(2);
    const g = rnd(3, 6);
    const r = rnd(8, 12);
    const d1 = parseFloat(parseFloat(d0) * (1 + g / 100)).toFixed(4);
    const v = parseFloat(parseFloat(d1) / (r / 100 - g / 100)).toFixed(2);
    const wrong1 = parseFloat(parseFloat(d0) / (r / 100 - g / 100)).toFixed(2);
    const wrong2 = parseFloat(parseFloat(d1) / (r / 100 + g / 100)).toFixed(2);
    return {
      question: `A stock just paid a dividend of $${d0} per share (D₀). Dividends are expected to grow at ${g}% per year indefinitely. The required return is ${r}%. What is the intrinsic value per share?`,
      options: {
        A: `$${v}`,
        B: `$${wrong1} (uses D₀ instead of D₁)`,
        C: `$${wrong2} (adds g to required return instead of subtracting)`
      },
      answer: "A",
      explanation: `Gordon Growth Model (GGM): V₀ = D₁/(r−g). D₁ = D₀×(1+g) = $${d0}×${1 + g / 100} = $${d1}. V₀ = $${d1}/(${r}%−${g}%) = $${v}. Always use next period's dividend D₁. Using D₀ ($${wrong1}) understates value by a factor of (1+g).`,
      concept: "Gordon Growth Model",
      los_tested: "calculate and interpret the intrinsic value of an equity security based on the Gordon growth dividend discount model",
      misconception_targeted: "using D₀ instead of D₁ in the Gordon Growth Model"
    };
  },
  // Justified trailing P/E
  () => {
    const pout = rnd(30, 60);
    const r = rnd(9, 13);
    const g = rnd(3, 6);
    const leadPE = parseFloat(pout / 100 / (r / 100 - g / 100)).toFixed(1);
    const trailPE = parseFloat(pout / 100 * (1 + g / 100) / (r / 100 - g / 100)).toFixed(1);
    const wrong1 = parseFloat(1 / (r / 100 - g / 100)).toFixed(1);
    const wrong2 = parseFloat((1 - pout / 100) / (r / 100 - g / 100)).toFixed(1);
    return {
      question: `A company has a dividend payout ratio of ${pout}%, required return of ${r}%, and sustainable growth rate of ${g}%. What is the justified LEADING P/E ratio?`,
      options: {
        A: `${leadPE}×`,
        B: `${trailPE}× (trailing P/E, not leading)`,
        C: `${wrong2}× (uses retention ratio in place of payout ratio)`
      },
      answer: "A",
      explanation: `Justified leading P/E = Payout ratio / (r − g) = ${pout}% / (${r}% − ${g}%) = ${leadPE}×. The trailing P/E = leading P/E × (1+g) = ${leadPE}× × ${1 + g / 100} = ${trailPE}×. Leading P/E uses next year's expected earnings; trailing P/E uses last year's actual earnings. Higher payout ratio or lower (r−g) spread → higher justified P/E.`,
      concept: "Justified P/E",
      los_tested: "calculate and interpret the justified trailing and leading P/E ratios for a stock",
      misconception_targeted: "using retention ratio in the P/E formula or confusing leading with trailing P/E"
    };
  },
  // Market Efficiency
  () => {
    const form = pick(["weak", "semi-strong", "strong"]);
    const implication = {
      "weak": "Technical analysis cannot generate consistent excess returns, but fundamental analysis may still work.",
      "semi-strong": "Neither technical analysis nor fundamental analysis based on public information can generate consistent excess returns. Only inside information could provide an edge.",
      "strong": "No analysis — including the use of insider information — can generate consistent excess returns. All information is fully reflected in prices."
    }[form];
    const wrongA = {
      "weak": "Neither technical nor fundamental analysis can earn excess returns — all information is priced in",
      "semi-strong": "Technical analysis is ineffective but fundamental analysis still works because only historical prices are priced in",
      "strong": "Fundamental analysis can still earn excess returns by identifying mispriced stocks"
    }[form];
    return {
      question: `If markets are ${form}-form efficient, which statement BEST describes the implication?`,
      options: {
        A: wrongA,
        B: implication,
        C: "Passive index funds always underperform active managers in the long run"
      },
      answer: "B",
      explanation: `${form.charAt(0).toUpperCase() + form.slice(1)}-form EMH: ${implication} The three forms are cumulative: semi-strong subsumes weak-form; strong subsumes both. Anomalies (e.g., momentum, value premium) are debated evidence against semi-strong efficiency.`,
      concept: "Market Efficiency EMH",
      los_tested: "contrast weak-form semi-strong-form and strong-form market efficiency",
      misconception_targeted: "confusing which forms of analysis are ineffective under each EMH form"
    };
  },
  // Price-to-Book ratio
  () => {
    const roe = rnd(12, 20);
    const r = rnd(8, 12);
    const g = rnd(3, 6);
    const pb = parseFloat((roe / 100 - g / 100) / (r / 100 - g / 100)).toFixed(2);
    const wrong1 = parseFloat(roe / r).toFixed(2);
    const wrong2 = parseFloat((r / 100 - g / 100) / (roe / 100 - g / 100)).toFixed(2);
    return {
      question: `A firm has ROE = ${roe}%, required return = ${r}%, and sustainable growth rate = ${g}%. What is the justified Price-to-Book (P/B) ratio?`,
      options: {
        A: `${pb}×`,
        B: `${wrong1}× (ROE / required return — missing growth)`,
        C: `${wrong2}× (ratio inverted)`
      },
      answer: "A",
      explanation: `Justified P/B = (ROE − g) / (r − g) = (${roe}% − ${g}%) / (${r}% − ${g}%) = ${pb}×. When ROE > required return, P/B > 1 (firm earns above its cost of equity). When ROE = r, P/B = 1. When ROE < r, P/B < 1. This links directly to the GGM: P/B = ROE × payout / (r − g) per share.`,
      concept: "Justified P/B Ratio",
      los_tested: "calculate and interpret the justified P/B ratio for a stock",
      misconception_targeted: "using ROE/r without accounting for the growth differential"
    };
  },
  // EV/EBITDA
  () => {
    const ev = rnd(500, 2000);
    const ebitda = rnd(50, 200);
    const mult = parseFloat(ev / ebitda).toFixed(1);
    const debt = rnd(100, 400);
    const cash = rnd(20, 100);
    const shares = rnd(50, 200);
    const sp = Math.round((ev - debt + cash) / shares);
    return {
      question: `A company has enterprise value of $${ev}M and EBITDA of $${ebitda}M (EV/EBITDA = ${mult}×). A comparable company trades at 8.5× EV/EBITDA with EBITDA of $${ebitda}M. EV/EBITDA is preferred over P/E for which of the following reasons?`,
      options: {
        A: `EV/EBITDA is unaffected by differences in capital structure, depreciation policies, and tax rates, making cross-company comparison more reliable`,
        B: `EV/EBITDA always gives a lower valuation than P/E, making acquisitions appear cheaper`,
        C: `P/E cannot be calculated for companies with positive earnings, so EV/EBITDA must be used`
      },
      answer: "A",
      explanation: `EV/EBITDA is useful for comparing companies because: (1) EV includes debt, making it capital-structure-neutral; (2) EBITDA adds back D&A, removing distortions from different depreciation policies; (3) It's pre-tax, avoiding tax rate differences. EV = Market cap + Debt − Cash. Particularly useful for capital-intensive, levered, or cross-border comparisons where tax and depreciation differ.`,
      concept: "EV EBITDA Multiple",
      los_tested: "calculate and interpret EV multiples and evaluate the usefulness of EV/EBITDA",
      misconception_targeted: "not understanding why EV/EBITDA is preferred over P/E for leveraged or capital-intensive comparisons"
    };
  }],
  "Derivatives": [
  // Forward price
  () => {
    const s = rnd(40, 100);
    const r = rnd(2, 6);
    const t = pick([0.25, 0.5, 1]);
    const tname = {
      0.25: "3 months",
      0.5: "6 months",
      1: "1 year"
    }[t];
    const div = parseFloat(rnd(0, 30) / 10).toFixed(1);
    const fp = parseFloat((s - parseFloat(div)) * (1 + r / 100) ** t).toFixed(2);
    const wrong1 = parseFloat(s * (1 + r / 100) ** t).toFixed(2);
    const wrong2 = parseFloat(s * (1 + r / 100) * t).toFixed(2);
    return {
      question: `A stock trades at $${s} and is expected to pay a dividend of $${div} in ${tname}. The risk-free rate is ${r}% per year. What is the no-arbitrage forward price for a ${tname} forward contract?`,
      options: {
        A: `$${fp}`,
        B: `$${wrong1} (ignores the dividend payment)`,
        C: `$${wrong2} (uses simple interest and ignores dividend)`
      },
      answer: "A",
      explanation: `Forward price = (S₀ − PV(dividends)) × (1+r)^T. PV(div) ≈ $${div} (paid close to delivery, so discounting is minor). F = ($${s} − $${div}) × (1+${r}%)^${t} = $${fp}. Dividends reduce the cost-of-carry because the dividend is received by the holder of the spot (not the forward). Ignoring dividends overstates the forward price to $${wrong1}.`,
      concept: "Forward Price No-Arbitrage",
      los_tested: "describe and calculate the no-arbitrage forward price for equity forward contracts",
      misconception_targeted: "ignoring dividend payments in the forward price formula"
    };
  },
  // Options — intrinsic vs time value
  () => {
    const s = rnd(50, 80);
    const x = rnd(55, 75);
    const premium = parseFloat(rnd(300, 900) / 100).toFixed(2);
    const isCall = Math.random() > 0.5;
    const intrinsic = isCall ? Math.max(s - x, 0) : Math.max(x - s, 0);
    const tv = parseFloat(parseFloat(premium) - intrinsic).toFixed(2);
    const inMoney = intrinsic > 0;
    const moneyness = isCall ? s > x ? "in-the-money" : s < x ? "out-of-the-money" : "at-the-money" : x > s ? "in-the-money" : x < s ? "out-of-the-money" : "at-the-money";
    return {
      question: `A European ${isCall ? "call" : "put"} option with strike $${x} is priced at $${premium}. The underlying stock is at $${s}. What is the option's time value?`,
      options: {
        A: `$${tv} (premium minus intrinsic value of $${intrinsic})`,
        B: `$${premium} (the full premium is time value)`,
        C: `$${intrinsic} (the intrinsic value is the time value)`
      },
      answer: "A",
      explanation: `Option premium = Intrinsic value + Time value. Intrinsic value = max(${isCall ? `S−X = $${s}−$${x}` : `X−S = $${x}−$${s}`}, 0) = $${intrinsic}. Time value = $${premium} − $${intrinsic} = $${tv}. This option is ${moneyness}. Time value reflects the probability that the option moves further in-the-money before expiration; it decays to zero at expiration (theta decay).`,
      concept: "Option Intrinsic vs Time Value",
      los_tested: "identify the moneyness of an option explain time value and explain the value of an option at expiration",
      misconception_targeted: "confusing total premium with time value, or intrinsic value with time value"
    };
  },
  // Put-call parity
  () => {
    const s = rnd(45, 65);
    const x = rnd(48, 62);
    const r = rnd(2, 6);
    const t = parseFloat(rnd(3, 12) / 12).toFixed(4);
    const pvx = parseFloat(x / (1 + r / 100) ** parseFloat(t)).toFixed(2);
    const c = parseFloat(rnd(200, 800) / 100).toFixed(2);
    const p = parseFloat(parseFloat(c) + parseFloat(pvx) - s).toFixed(2);
    const wrong1 = parseFloat(parseFloat(c) - parseFloat(pvx) + s).toFixed(2);
    const wrong2 = parseFloat(parseFloat(c) + x - s).toFixed(2);
    return {
      question: `A European call option with strike $${x} is priced at $${c}. The underlying stock trades at $${s}, the risk-free rate is ${r}%, and time to expiry is ${Math.round(parseFloat(t) * 12)} months. What is the put option price?`,
      options: {
        A: `$${p}`,
        B: `$${wrong1}`,
        C: `$${wrong2} (uses undiscounted strike)`
      },
      answer: "A",
      explanation: `Put-call parity: C + PV(X) = P + S → P = C + PV(X) − S. PV(X) = $${x}/(1+${r}%)^${Math.round(parseFloat(t) * 12)}/12 = $${pvx}. P = $${c} + $${pvx} − $${s} = $${p}. Always discount the strike price.`,
      concept: "Put-Call Parity",
      los_tested: "explain put-call parity for European options and put-call forward parity for European options",
      misconception_targeted: "using undiscounted strike price in put-call parity"
    };
  },
  // Option payoffs
  () => {
    const x = rnd(45, 60);
    const st = rnd(40, 75);
    const premium = parseFloat(rnd(200, 600) / 100).toFixed(2);
    const isCall = Math.random() > 0.5;
    const isLong = Math.random() > 0.5;
    const intrinsic = isCall ? Math.max(st - x, 0) : Math.max(x - st, 0);
    const payoff = isLong ? intrinsic - parseFloat(premium) : parseFloat(premium) - intrinsic;
    const wrong1 = isLong ? intrinsic : parseFloat(premium) - intrinsic + parseFloat(premium);
    const wrong2 = parseFloat(payoff * -1).toFixed(2);
    return {
      question: `An investor holds a ${isLong ? "long" : "short"} ${isCall ? "call" : "put"} option with strike $${x}, purchased for a premium of $${premium}. At expiration, the stock trades at $${st}. What is the investor's profit/loss?`,
      options: {
        A: `$${payoff.toFixed(2)}`,
        B: `$${intrinsic} (ignores premium paid)`,
        C: `$${wrong2} (wrong sign)`
      },
      answer: "A",
      explanation: `${isCall ? "Call" : "Put"} intrinsic value at expiration = max(${isCall ? `$${st}−$${x}` : `$${x}−$${st}`}, 0) = $${intrinsic}. ${isLong ? "Long" : "Short"} position profit = ${isLong ? `intrinsic − premium = $${intrinsic} − $${premium}` : `premium − intrinsic = $${premium} − $${intrinsic}`} = $${payoff.toFixed(2)}.`,
      concept: "Option Payoff",
      los_tested: "determine the value at expiration and profit from a long or a short position in a call or put option",
      misconception_targeted: "ignoring the premium cost when calculating option profit"
    };
  }],
  "Corporate Issuers": [
  // WACC calculation
  () => {
    const wd = rnd(30, 50);
    const we = 100 - wd;
    const rd = rnd(4, 8);
    const re = rnd(10, 16);
    const t = rnd(25, 35);
    const wacc = parseFloat((wd / 100 * rd / 100 * (1 - t / 100) + we / 100 * re / 100) * 100).toFixed(2);
    const wrong1 = parseFloat((wd / 100 * rd / 100 + we / 100 * re / 100) * 100).toFixed(2);
    const wrong2 = parseFloat((rd + re) / 2).toFixed(2);
    return {
      question: `A firm's capital structure is ${wd}% debt (pre-tax cost ${rd}%) and ${we}% equity (cost ${re}%), with a marginal tax rate of ${t}%. What is the WACC?`,
      options: {
        A: `${wacc}%`,
        B: `${wrong1}% (pre-tax cost of debt used — no tax shield applied)`,
        C: `${wrong2}% (simple average of debt and equity costs)`
      },
      answer: "A",
      explanation: `WACC = w_d × r_d × (1−t) + w_e × r_e = ${wd}% × ${rd}% × (1−${t}%) + ${we}% × ${re}% = ${wacc}%. The after-tax cost of debt accounts for the tax deductibility of interest (the interest tax shield). Always use marginal tax rate and market-value weights, not book-value weights.`,
      concept: "WACC",
      los_tested: "calculate and interpret the weighted-average cost of capital for a company",
      misconception_targeted: "using pre-tax cost of debt or simple average instead of WACC formula"
    };
  },
  // Modigliani-Miller
  () => {
    const scenario = pick([{
      tax: "no taxes",
      "MM": "firm value is unaffected by capital structure — the total value of the firm depends only on its operating cash flows, not how they are divided between debt and equity holders",
      wrong1: "increasing debt always increases firm value via the interest tax shield",
      wrong2: "firms should use maximum equity to minimise financial distress risk"
    }, {
      tax: "corporate taxes (no financial distress costs)",
      "MM": "firm value increases with leverage because interest payments are tax-deductible, creating an interest tax shield",
      wrong1: "firm value is unaffected by capital structure — the tax shield has no value",
      wrong2: "firm value decreases with leverage because more debt increases required equity returns"
    }]);
    return {
      question: `Under the Modigliani-Miller framework with ${scenario.tax}, which proposition is correct regarding capital structure?`,
      options: {
        A: scenario["MM"],
        B: scenario.wrong1,
        C: scenario.wrong2
      },
      answer: "A",
      explanation: `MM with ${scenario.tax}: ${scenario["MM"]}. The MM irrelevance theorem (no taxes) established that in a perfect market, the value of a levered firm equals the value of an unlevered firm. Adding corporate taxes introduces the interest tax shield (PV of tax shield = T×D), making debt financing beneficial up to the point where financial distress costs offset the shield.`,
      concept: "Modigliani-Miller Capital Structure",
      los_tested: "explain the Modigliani-Miller propositions regarding capital structure",
      misconception_targeted: "reversing the MM conclusions about the role of taxes in capital structure"
    };
  },
  // Dividend policy irrelevance
  () => {
    return {
      question: `Under Miller and Modigliani's dividend irrelevance proposition (perfect markets), which statement is CORRECT?`,
      options: {
        A: `A firm's dividend policy has no effect on shareholder wealth — investors can create homemade dividends by selling shares`,
        B: `Higher dividends always increase stock price because they signal management confidence`,
        C: `Firms should retain all earnings since dividends are taxed at a higher rate than capital gains`
      },
      answer: "A",
      explanation: `Under MM (perfect markets, no taxes, no transaction costs): dividend policy is irrelevant. Shareholders can create 'homemade dividends' by selling shares if they want cash, or reinvest dividends if they prefer capital gains. Real-world factors that matter: taxes (preferring capital gains), signalling (dividends signal confidence), clientele effect (different investors prefer different payout policies), and agency costs.`,
      concept: "Dividend Policy Irrelevance",
      los_tested: "describe MM propositions regarding dividend policy",
      misconception_targeted: "assuming dividends always increase value or that retained earnings are always preferable"
    };
  },
  // NPV vs IRR conflict
  () => {
    // Generate guaranteed NPV-IRR conflict: NPV winner ≠ IRR winner
    let npvA = rnd(80, 200);
    let npvB = rnd(30, 100); // A wins on NPV
    let irrA = rnd(15, 20);
    let irrB = rnd(22, 32); // B wins on IRR
    // Randomly swap so the "correct" answer isn't always A
    if (Math.random() > 0.5) {
      const t1 = npvA;
      npvA = npvB;
      npvB = t1;
      const t2 = irrA;
      irrA = irrB;
      irrB = t2;
    }
    const npvWinner = npvA > npvB ? "A" : "B";
    const irrWinner = irrA > irrB ? "A" : "B";
    const loser = npvWinner === "A" ? "B" : "A";
    return {
      question: `Two mutually exclusive projects: Project A has NPV = $${npvA}K and IRR = ${irrA}%. Project B has NPV = $${npvB}K and IRR = ${irrB}%. Which project should be selected, and why?`,
      options: {
        A: `Project ${npvWinner} — when NPV and IRR conflict, NPV is the correct criterion for mutually exclusive projects`,
        B: `Project ${irrWinner} — always select the project with the higher IRR`,
        C: `Project ${loser} — it has the better risk-adjusted return`
      },
      answer: "A",
      explanation: `When NPV and IRR conflict for mutually exclusive projects, NPV is the theoretically correct decision rule. NPV measures the absolute dollar value added to shareholder wealth. IRR can be misleading because it implicitly assumes cash flows are reinvested at the IRR rate (often unrealistic) and ignores project scale. Project ${npvWinner} (NPV = $${Math.max(npvA, npvB)}K) creates more value for shareholders despite having the lower IRR of ${Math.min(irrA, irrB)}%.`,
      concept: "NPV vs IRR",
      los_tested: "describe the capital allocation process calculate NPV IRR and ROIC and contrast their use in capital allocation",
      misconception_targeted: "choosing the higher IRR over the higher NPV for mutually exclusive projects"
    };
  }],
  "Portfolio Management": [
  // CML vs SML
  () => {
    return {
      question: `An analyst plots two lines on a risk-return graph: the Capital Market Line (CML) and the Security Market Line (SML). Which statement BEST distinguishes them?`,
      options: {
        A: `The CML uses total risk (standard deviation) on the x-axis and applies only to efficient portfolios; the SML uses systematic risk (beta) and applies to all assets and portfolios`,
        B: `The CML uses beta on the x-axis and applies to all assets; the SML uses standard deviation and applies only to efficient portfolios`,
        C: `The CML and SML are the same line — both plot expected return against market risk`
      },
      answer: "A",
      explanation: `CML: x-axis = portfolio standard deviation (total risk); valid only for efficient portfolios on the efficient frontier. SML: x-axis = beta (systematic risk); valid for all individual assets and portfolios, efficient or not. An underpriced asset plots above the SML (positive alpha); an overpriced asset plots below it. Both lines share the risk-free rate as the y-intercept.`,
      concept: "CML vs SML",
      los_tested: "explain the capital market line CML and the security market line SML",
      misconception_targeted: "confusing which risk measure and which investment universe applies to CML vs SML"
    };
  },
  // CAPM expected return
  () => {
    const rf = rnd(2, 4);
    const rm = rnd(8, 12);
    const beta = parseFloat(rnd(60, 180) / 100).toFixed(2);
    const er = parseFloat(rf + (rm - rf) * parseFloat(beta)).toFixed(2);
    const wrong1 = parseFloat(rf * parseFloat(beta) + (rm - rf)).toFixed(2);
    const wrong2 = parseFloat(rm * parseFloat(beta)).toFixed(2);
    return {
      question: `The risk-free rate is ${rf}%, the expected market return is ${rm}%, and a stock has a beta of ${beta}. What is the expected return using CAPM?`,
      options: {
        A: `${er}%`,
        B: `${wrong1}% (beta applied to risk-free rate)`,
        C: `${wrong2}% (beta × market return, ignores risk-free)`
      },
      answer: "A",
      explanation: `CAPM: E(R) = Rf + β×(E(Rm)−Rf) = ${rf}% + ${beta}×(${rm}%−${rf}%) = ${rf}% + ${beta}×${rm - rf}% = ${er}%. The equity risk premium is (Rm−Rf), not Rm itself. Beta scales the market risk premium.`,
      concept: "CAPM",
      los_tested: "calculate and interpret the expected return of an asset using the CAPM",
      misconception_targeted: "applying beta to the full market return rather than the equity risk premium"
    };
  },
  // Systematic vs unsystematic risk
  () => {
    const stocks = rnd(1, 3);
    const stocks2 = rnd(20, 30);
    return {
      question: `An investor holds a portfolio of ${stocks} stock${stocks > 1 ? "s" : ""}. By adding more stocks to reach ${stocks2}, the investor can most effectively reduce:`,
      options: {
        A: `Systematic (market) risk`,
        B: `Unsystematic (company-specific) risk`,
        C: `Both systematic and unsystematic risk equally`
      },
      answer: "B",
      explanation: `Diversification eliminates unsystematic (company-specific) risk — the unique risk of individual securities. Systematic risk (market risk, measured by beta) CANNOT be diversified away as it affects all assets simultaneously. A well-diversified portfolio retains only systematic risk.`,
      concept: "Diversification",
      los_tested: "explain systematic and nonsystematic risk and why an investor should not expect to receive additional return for bearing nonsystematic risk",
      misconception_targeted: "thinking diversification reduces systematic risk"
    };
  },
  // Sharpe vs Treynor
  () => {
    return {
      question: `An analyst is evaluating a portfolio manager who runs one of many sub-portfolios within a larger pension fund. Which performance measure is MOST appropriate?`,
      options: {
        A: `Sharpe ratio — it uses total risk and is always the best measure`,
        B: `Treynor ratio — when the portfolio is combined with others, only systematic risk (beta) is relevant`,
        C: `Jensen's alpha — it always provides the most accurate risk-adjusted return`
      },
      answer: "B",
      explanation: `Use Treynor ratio when the portfolio is part of a diversified whole — unsystematic risk is diversified away at the total fund level, so only beta (systematic risk) matters. Use Sharpe ratio when the portfolio represents an investor's entire wealth. Jensen's alpha is useful but doesn't rank portfolios with different risk levels.`,
      concept: "Performance Measures",
      los_tested: "calculate and interpret the Sharpe ratio Treynor ratio M2 and Jensen's alpha",
      misconception_targeted: "using Sharpe ratio regardless of whether the portfolio is a component of a larger portfolio"
    };
  }],
  "Economics": [
  // Business cycles
  () => {
    const phase = pick(["expansion", "peak", "contraction", "trough"]);
    const indicators = {
      "expansion": "rising GDP, falling unemployment, increasing consumer spending, rising inflation",
      "peak": "GDP at maximum, unemployment at minimum, inflation high, leading indicators turning down",
      "contraction": "falling GDP, rising unemployment, declining consumer confidence, falling inflation",
      "trough": "GDP at minimum, unemployment at maximum, leading indicators turning up, accommodative monetary policy"
    };
    const next = {
      "expansion": "peak",
      "peak": "contraction",
      "contraction": "trough",
      "trough": "expansion"
    };
    const wrong1 = pick(Object.keys(indicators).filter(p => p !== phase));
    const wrong2 = pick(Object.keys(indicators).filter(p => p !== phase && p !== wrong1));
    return {
      question: `An economy shows: ${indicators[phase]}. Which phase of the business cycle is this MOST consistent with?`,
      options: {
        A: phase.charAt(0).toUpperCase() + phase.slice(1),
        B: wrong1.charAt(0).toUpperCase() + wrong1.slice(1),
        C: wrong2.charAt(0).toUpperCase() + wrong2.slice(1)
      },
      answer: "A",
      explanation: `These characteristics describe the ${phase} phase. The next phase is typically ${next[phase]}. During ${phase}: ${indicators[phase]}.`,
      concept: "Business Cycles",
      los_tested: "describe the business cycle and its phases",
      misconception_targeted: "confusing adjacent business cycle phases"
    };
  },
  // Monetary policy
  () => {
    const action = pick(["raise", "lower"]);
    const rationale = action === "raise" ? "combat inflation (economy overheating)" : "stimulate growth (economy slowing)";
    const effect1 = action === "raise" ? "borrowing costs rise, investment falls, aggregate demand decreases" : "borrowing costs fall, investment rises, aggregate demand increases";
    const effect2 = action === "raise" ? "currency typically appreciates (higher yields attract foreign capital)" : "currency typically depreciates (lower yields reduce foreign capital inflows)";
    const wrong1 = action === "raise" ? "Stimulate borrowing and increase aggregate demand" : "Reduce borrowing costs and slow the economy";
    const wrong2 = action === "raise" ? "Depreciate the currency to boost exports" : "Appreciate the currency to increase inflation";
    return {
      question: `A central bank decides to ${action} its policy interest rate. The MOST likely primary objective is to ${rationale}. Which effect on the economy is MOST expected?`,
      options: {
        A: effect1,
        B: wrong1,
        C: wrong2
      },
      answer: "A",
      explanation: `When a central bank ${action}s rates: ${effect1}. Additionally, ${effect2}. Central banks use interest rates as the primary tool for managing the money supply and economic activity.`,
      concept: "Monetary Policy",
      los_tested: "describe how monetary policy affects the economy",
      misconception_targeted: "reversing the direction of monetary policy effects"
    };
  },
  // Fiscal policy
  () => {
    const policy = pick(["expansionary", "contractionary"]);
    const tools = policy === "expansionary" ? "increasing government spending or cutting taxes" : "decreasing government spending or raising taxes";
    const effect = policy === "expansionary" ? "increases aggregate demand, stimulates GDP growth, may raise inflation" : "reduces aggregate demand, slows GDP growth, may lower inflation";
    const crowd = policy === "expansionary" ? "Crowding out: higher government borrowing may raise interest rates, reducing private investment" : "Fiscal drag: reduced spending and higher taxes reduce private sector activity";
    const wrong = policy === "expansionary" ? "reduces aggregate demand and slows growth" : "stimulates aggregate demand and increases growth";
    return {
      question: `A government pursues ${policy} fiscal policy through ${tools}. Which outcome is MOST likely?`,
      options: {
        A: effect,
        B: wrong,
        C: "Has no effect on aggregate demand or inflation"
      },
      answer: "A",
      explanation: `${policy.charAt(0).toUpperCase() + policy.slice(1)} fiscal policy ${effect}. Key side effect: ${crowd}. Fiscal multiplier: the ultimate GDP impact exceeds the initial spending change.`,
      concept: "Fiscal Policy",
      los_tested: "describe how fiscal policy affects the economy",
      misconception_targeted: "confusing expansionary and contractionary fiscal effects"
    };
  },
  // GDP components
  () => {
    const component = pick(["consumption (C)", "investment (I)", "government spending (G)", "net exports (X-M)"]);
    const desc = {
      "consumption (C)": "largest component of GDP (~70% in most economies); household spending on goods and services",
      "investment (I)": "business spending on capital goods, inventory changes, and residential construction",
      "government spending (G)": "federal, state, and local purchases of goods and services (excludes transfer payments)",
      "net exports (X-M)": "exports minus imports; negative when imports exceed exports (trade deficit)"
    };
    const wrong1 = pick(Object.keys(desc).filter(c => c !== component));
    const wrong2 = pick(Object.keys(desc).filter(c => c !== component && c !== wrong1));
    return {
      question: `In the expenditure approach to GDP, which component is described as: "${desc[component]}"?`,
      options: {
        A: component,
        B: wrong1,
        C: wrong2
      },
      answer: "A",
      explanation: `GDP = C + I + G + (X-M). ${component}: ${desc[component]}. Note: transfer payments (welfare, pensions) are NOT included in G because no good/service is produced.`,
      concept: "GDP Components",
      los_tested: "calculate and describe GDP using the expenditure approach",
      misconception_targeted: "including transfer payments in government spending component"
    };
  },
  // Market structures
  () => {
    const structure = pick(["perfect competition", "monopolistic competition", "oligopoly", "monopoly"]);
    const features = {
      "perfect competition": "many sellers, homogeneous products, free entry/exit, price takers",
      "monopolistic competition": "many sellers, differentiated products, relatively easy entry, some pricing power",
      "oligopoly": "few sellers, high barriers to entry, mutual interdependence, kinked demand curve",
      "monopoly": "single seller, unique product, very high barriers to entry, price maker"
    };
    const longrun = {
      "perfect competition": "economic profit = 0 (P = MC = ATC)",
      "monopolistic competition": "economic profit = 0, but P > MC (excess capacity)",
      "oligopoly": "may earn positive economic profit due to barriers",
      "monopoly": "may earn sustained economic profit due to barriers"
    };
    return {
      question: `Which market structure is BEST described by these characteristics: ${features[structure]}?`,
      options: {
        A: structure.charAt(0).toUpperCase() + structure.slice(1),
        B: pick(["perfect competition", "monopolistic competition", "oligopoly", "monopoly"].filter(s => s !== structure)),
        C: pick(["perfect competition", "monopolistic competition", "oligopoly", "monopoly"].filter(s => s !== structure && s !== pick(["perfect competition", "monopolistic competition", "oligopoly", "monopoly"].filter(s => s !== structure))))
      },
      answer: "A",
      explanation: `The described structure is ${structure}. Key long-run outcome: ${longrun[structure]}. In the long run, free entry/exit eliminates economic profit in competitive markets, while barriers preserve it in oligopoly and monopoly.`,
      concept: "Market Structures",
      los_tested: "describe characteristics of perfect competition monopolistic competition oligopoly and pure monopoly",
      misconception_targeted: "confusing features of adjacent market structures"
    };
  }],
  "Alternatives": [
  // Hedge fund strategies
  () => {
    const strategy = pick(["long/short equity", "global macro", "event-driven", "relative value"]);
    const desc = {
      "long/short equity": "takes long positions in undervalued stocks and short positions in overvalued stocks; net market exposure varies",
      "global macro": "takes positions across asset classes (equities, FX, rates, commodities) based on macroeconomic views",
      "event-driven": "exploits pricing inefficiencies around corporate events such as mergers, spin-offs, and restructurings",
      "relative value": "exploits pricing discrepancies between related instruments (e.g., convertible bond arbitrage, fixed income arbitrage)"
    };
    const wrong1 = pick(Object.keys(desc).filter(s => s !== strategy));
    const wrong2 = pick(Object.keys(desc).filter(s => s !== strategy && s !== wrong1));
    return {
      question: `A hedge fund "${desc[strategy]}." This fund is BEST classified as which strategy?`,
      options: {
        A: strategy,
        B: wrong1,
        C: wrong2
      },
      answer: "A",
      explanation: `${strategy.charAt(0).toUpperCase() + strategy.slice(1)}: ${desc[strategy]}. Key distinction: long/short equity has equity market beta exposure; global macro takes directional macro bets; event-driven requires catalyst; relative value is market-neutral with spread risk.`,
      concept: "Hedge Fund Strategies",
      los_tested: "describe hedge funds types characteristics and strategies",
      misconception_targeted: "confusing event-driven with global macro strategies"
    };
  },
  // Private equity stages
  () => {
    const stage = pick(["seed", "venture capital", "growth equity", "leveraged buyout"]);
    const desc = {
      "seed": "provides capital to develop a business concept; highest risk, pre-revenue",
      "venture capital": "funds early-stage companies with proven concept but limited revenue; equity financing",
      "growth equity": "invests in established companies seeking expansion capital without changing control",
      "leveraged buyout": "acquires a mature company using significant debt; aims to improve operations and exit via sale or IPO"
    };
    const wrong1 = pick(Object.keys(desc).filter(s => s !== stage));
    const wrong2 = pick(Object.keys(desc).filter(s => s !== stage && s !== wrong1));
    return {
      question: `A PE investor "${desc[stage]}." This investment is BEST described as:`,
      options: {
        A: stage,
        B: wrong1,
        C: wrong2
      },
      answer: "A",
      explanation: `${stage.charAt(0).toUpperCase() + stage.slice(1)}: ${desc[stage]}. LBO uses highest leverage (50-70% debt). Venture has highest equity return potential but highest failure rate. Growth equity is minority stake with no control change.`,
      concept: "Private Equity Stages",
      los_tested: "describe private equity strategies including venture capital growth equity and LBOs",
      misconception_targeted: "confusing growth equity with LBO (control vs minority)"
    };
  },
  // Real estate
  () => {
    const capRate = parseFloat((rnd(4, 8) + Math.random()).toFixed(1));
    const noi = rnd(800, 2000) * 1000;
    const value = Math.round(noi / capRate * 100);
    const wrongLow = Math.round(noi / (capRate + 2) * 100);
    const wrongHigh = Math.round(noi / (capRate - 1.5) * 100);
    return {
      question: `A commercial property generates NOI of $${(noi / 1000).toFixed(0)}K per year. Market cap rates for comparable properties are ${capRate}%. What is the estimated property value?`,
      options: {
        A: `$${(value / 1000).toFixed(0)}K`,
        B: `$${(wrongLow / 1000).toFixed(0)}K`,
        C: `$${(wrongHigh / 1000).toFixed(0)}K`
      },
      answer: "A",
      explanation: `Property Value = NOI ÷ Cap Rate = $${(noi / 1000).toFixed(0)}K ÷ ${capRate}% = $${(value / 1000).toFixed(0)}K. The cap rate is the NOI yield — a higher cap rate means lower value (more risk). Common error: dividing by the wrong cap rate or inverting the formula.`,
      concept: "Real Estate Valuation",
      los_tested: "calculate and interpret the value of real estate using the income approach",
      misconception_targeted: "inverting NOI/cap rate or using wrong cap rate"
    };
  },
  // Commodity characteristics
  () => {
    const commodity = pick(["gold", "oil", "agricultural commodities", "infrastructure"]);
    const char = {
      "gold": "store of value, inflation hedge, low correlation with equities, no income stream",
      "oil": "economically sensitive, geopolitical risk, contango/backwardation roll yield, income via futures",
      "agricultural commodities": "seasonal price patterns, weather-dependent supply, perishable (storage costs), speculative demand",
      "infrastructure": "long-duration cash flows, regulated monopoly characteristics, inflation-linked revenues, illiquid"
    };
    const hedge = {
      "gold": "inflation and currency debasement",
      "oil": "energy cost inflation and geopolitical disruption",
      "agricultural commodities": "food price inflation",
      "infrastructure": "inflation via regulated price escalators"
    };
    const wrong1 = pick(Object.keys(char).filter(c => c !== commodity));
    const wrong2 = pick(Object.keys(char).filter(c => c !== commodity && c !== wrong1));
    return {
      question: `An investor wants exposure to an asset with these characteristics: "${char[commodity]}." Which alternative investment is the BEST match?`,
      options: {
        A: commodity,
        B: wrong1,
        C: wrong2
      },
      answer: "A",
      explanation: `${commodity.charAt(0).toUpperCase() + commodity.slice(1)}: ${char[commodity]}. Primary hedge use: ${hedge[commodity]}. Key consideration for portfolio allocation: real assets typically have low correlation with financial assets, providing diversification benefits.`,
      concept: "Commodity Characteristics",
      los_tested: "describe investment characteristics of alternative investments",
      misconception_targeted: "confusing commodity inflation-hedging properties across asset types"
    };
  },
  // 2-and-20 fee structure
  () => {
    const committed = rnd(50, 200);
    const mgmt = 2;
    const carry = 20;
    const hurdle = rnd(6, 10);
    const grossReturn = rnd(15, 30);
    const grossProfit = parseFloat(committed * grossReturn / 100).toFixed(1);
    const mgmtFee = parseFloat(committed * mgmt / 100).toFixed(1);
    const carriedInterest = parseFloat((parseFloat(grossProfit) - committed * hurdle / 100) * carry / 100).toFixed(1);
    const netToInvestor = parseFloat(parseFloat(grossProfit) - parseFloat(mgmtFee) - parseFloat(carriedInterest)).toFixed(1);
    return {
      question: `A PE fund has $${committed}M committed capital, a ${mgmt}-and-${carry} fee structure, and a ${hurdle}% hurdle rate. The fund earns a gross return of ${grossReturn}%. What is the carried interest?`,
      options: {
        A: `$${carriedInterest}M`,
        B: `$${parseFloat(parseFloat(grossProfit) * carry / 100).toFixed(1)}M (no hurdle deducted)`,
        C: `$${parseFloat(committed * carry / 100).toFixed(1)}M (applied to committed capital)`
      },
      answer: "A",
      explanation: `Carried interest = ${carry}% × (Gross Profit − Hurdle). Gross Profit = $${committed}M × ${grossReturn}% = $${grossProfit}M. Hurdle = $${committed}M × ${hurdle}% = $${committed * hurdle / 100}M. Carry = ${carry}% × ($${grossProfit}M − $${committed * hurdle / 100}M) = $${carriedInterest}M. The hurdle rate must be exceeded before carry is earned.`,
      concept: "PE Fee Structure",
      los_tested: "calculate and interpret alternative investment returns both before and after fees",
      misconception_targeted: "applying carried interest to gross profit without subtracting hurdle"
    };
  }]
};

// ─── LOCAL GENERATOR FUNCTION ─────────────────────────────────────────────────
function generateLocalQuestions(topic, module, difficulty, count) {
  const templates = Q_TEMPLATES[topic] || [];
  if (!templates.length) return [];
  const questions = [];

  // Shuffle template order; each template used at most once per call to prevent same-concept repeats
  const shuffledIdxs = [...Array(templates.length).keys()].sort(() => Math.random() - 0.5);
  for (let i = 0; i < shuffledIdxs.length && questions.length < count; i++) {
    const tIdx = shuffledIdxs[i];
    try {
      const q = templates[tIdx]();
      if (!q || !q.question || !q.options || !q.answer) continue;
      // Randomise option order occasionally to avoid always-A bias
      const shouldShuffle = Math.random() > 0.5;
      let finalQ = {
        ...q,
        id: `local_${topic}_${i}_${Date.now()}`
      };
      if (shouldShuffle) {
        const entries = Object.entries(q.options);
        const correctVal = q.options[q.answer];
        const shuffled = entries.sort(() => Math.random() - 0.5);
        const newOpts = {};
        const keys = ['A', 'B', 'C'];
        let newAnswer = 'A';
        shuffled.forEach(([, val], idx) => {
          newOpts[keys[idx]] = val;
          if (val === correctVal) newAnswer = keys[idx];
        });
        finalQ = {
          ...finalQ,
          options: newOpts,
          answer: newAnswer
        };
      }
      questions.push(finalQ);
    } catch (e) {/* skip failed template */}
  }
  return questions;
}
function CFAMock() {
  const [screen, setScreen] = useState("home");
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [count, setCount] = useState(10);
  const [mode, setMode] = useState("guided");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [flaggedQ, setFlaggedQ] = useState({}); // confidence flags: {qId: true}
  const [currentQ, setCurrentQ] = useState(0);
  const [showExp, setShowExp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [fullExamMode, setFullExamMode] = useState(false);
  const [examSession, setExamSession] = useState(1); // 1=AM, 2=PM for split exam
  const [examBreak, setExamBreak] = useState(false); // showing break screen between sessions
  const [vignetteMode, setVignetteMode] = useState(false);
  const [aiDebrief, setAiDebrief] = useState(null);
  const [aiDebriefLoading, setAiDebriefLoading] = useState(false);
  const [aiCoachScreen, setAiCoachScreen] = useState(false);
  const [aiCoachMessages, setAiCoachMessages] = useState([]);
  const [aiCoachInput, setAiCoachInput] = useState("");
  const [aiCoachLoading, setAiCoachLoading] = useState(false);
  const [formulaDrillMode, setFormulaDrillMode] = useState(false);
  const [formulaDrillIdx, setFormulaDrillIdx] = useState(0);
  const [formulaFlipped, setFormulaFlipped] = useState(false);
  const [formulaDrillTopic, setFormulaDrillTopic] = useState("Quantitative Methods");
  const timerRef = useRef(null);
  const startRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const historyRef = useRef([]);
  const [srDeck, setSrDeck] = useState({});
  const [srLoaded, setSrLoaded] = useState(false);
  const [qdb, setQdb] = useState({});
  const [qdbLoaded, setQdbLoaded] = useState(false); // question dedup db
  const [reviewList, setReviewList] = useState([]);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [confirmClear, setConfirmClear] = useState(false);
  const [focusSuggestions, setFocusSuggestions] = useState(null);
  const [focusLoading, setFocusLoading] = useState(false);
  const [focusError, setFocusError] = useState("");
  const [selectedFocus, setSelectedFocus] = useState(null);
  const [focusCount, setFocusCount] = useState(10);
  const [focusLastGenerated, setFocusLastGenerated] = useState(null); // timestamp of last generation
  const [lastSession, setLastSession] = useState(null);
  const [srQueue, setSrQueue] = useState([]);
  const [srIdx, setSrIdx] = useState(0);
  const [srAnswer, setSrAnswer] = useState(null);
  const [autoEscalation, setAutoEscalation] = useState(null);
  const [historyFilter, setHistoryFilter] = useState("All"); // topic filter for history
  const [dashTab, setDashTab] = useState("sessions"); // sessions | patterns | quality
  const [exitConfirm, setExitConfirm] = useState(false);
  const [storageKeys, setStorageKeys] = useState(null);
  const [storageOk, setStorageOk] = useState(null); // null=checking, true=ok, false=failing
  const [backupScreen, setBackupScreen] = useState(false); // backup/restore modal
  const [importText, setImportText] = useState(""); // for paste-restore
  const [importError, setImportError] = useState("");
  const [sessionSaved, setSessionSaved] = useState(false); // confirm session was saved
  const generatingRef = useRef(false); // debounce double-tap
  const [weeklyPlanScreen, setWeeklyPlanScreen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [usageStats, setUsageStats] = useState({});
  const usageStatsRef = useRef({});
  const [omMode, setOmMode] = useState(false); // true when current session was started via Office Mode
  const [omQCount, setOmQCount] = useState(() => {
    try {
      return parseInt(localStorage.getItem("cfa_om_count") || "5");
    } catch {
      return 5;
    }
  });
  const [weeklyPlan, setWeeklyPlan] = useState(null);
  const [weeklyPlanLoading, setWeeklyPlanLoading] = useState(false);
  const [weeklyPlanError, setWeeklyPlanError] = useState("");
  const [hoursThisWeek, setHoursThisWeek] = useState(7); // default 1hr/day
  const [officeModeActive, setOfficeModeActive] = useState(false); // 5-question blitz
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingETA, setLoadingETA] = useState(null);
  const loadingStartRef = useRef(null);
  const [apiKey, setApiKey] = useState("");
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeyScreen, setApiKeyScreen] = useState(false);
  const [driveStatus, setDriveStatus] = useState(null); // null | "syncing" | "synced" | "error"
  const [supabaseCfg, setSupabaseCfg] = useState(() => getSupabaseConfig());
  const [supabaseUrl, setSupabaseUrl] = useState(() => getSupabaseConfig()?.url || "");
  const [supabaseKey, setSupabaseKey] = useState(() => getSupabaseConfig()?.key || "");
  const [supabaseSyncing, setSupabaseSyncing] = useState(false);
  const [needsFocusRefresh, setNeedsFocusRefresh] = useState(false);
  const [examDate, setExamDate] = useState(EXAM_DATE);
  const [examDateInput, setExamDateInput] = useState("2026-08-19");
  const [revisionTopic, setRevisionTopic] = useState(null);
  const [revisionTab, setRevisionTab] = useState("notes");
  const [walkthroughTopic, setWalkthroughTopic] = useState(Object.keys(LOS)[0]);
  const [walkthroughModule, setWalkthroughModule] = useState("");
  const [walkthroughText, setWalkthroughText] = useState(null);
  const [walkthroughLoading, setWalkthroughLoading] = useState(false);
  const [walkthroughError, setWalkthroughError] = useState("");
  const [fsaVignetteOpen, setFsaVignetteOpen] = useState(false);
  const [fsaSubtopic, setFsaSubtopic] = useState("Financial Ratios");
  const [fsaDifficulty, setFsaDifficulty] = useState("Medium");
  const [calcTopic, setCalcTopic] = useState("Fixed Income");
  const [calcDifficulty, setCalcDifficulty] = useState("Medium");
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
  const [luckyDipSpinning, setLuckyDipSpinning] = useState(false);
  const [luckyDipLabel, setLuckyDipLabel] = useState("");
  const [personalBests, setPersonalBests] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(BESTS_KEY) || "{}");
    } catch {
      return {};
    }
  });

  // Auto-trigger focus refresh when flagged
  useEffect(() => {
    if (needsFocusRefresh && historyLoaded && srLoaded) {
      setNeedsFocusRefresh(false);
      generateFocus();
    }
  }, [needsFocusRefresh, historyLoaded, srLoaded]);

  // Mirror history into a ref so endQuiz can always read current value
  useEffect(() => {
    historyRef.current = history;
  }, [history]);
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}@keyframes fadeInScale{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}@keyframes glow{0%,100%{box-shadow:0 0 8px #6366f144}50%{box-shadow:0 0 18px #6366f188}}@keyframes correctFlash{0%{background:#022c22}50%{background:#064e3b}100%{background:#022c22}}@keyframes toastIn{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}@keyframes toastOut{from{opacity:1}to{opacity:0;transform:translateY(-10px)}}*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#2a2848;border-radius:2px}button:focus-visible{outline:2px solid #6366f1;outline-offset:2px}`;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);
  useEffect(() => {
    const recoverData = async () => {
      // STEP 1: Aggressively purge ALL old keys FIRST to free storage space
      const ALL_KNOWN_KEYS = ["cfa_mock_v6", "cfa_mock_v5", "cfa_mock_v4", "cfa_mock_v3", "cfa_mock_v2", "cfa_mock_v1", "cfa_mock", "cfaMockHistory", "cfa-mock-history", "history", "cfa_history", "cfa_backup_v7", "cfa_sr_v6", "cfa_sr_v5", "cfa_sr_v4", "cfa_sr_v3", "cfa_sr_v2", "cfa_sr_v1", "cfa_sr", "cfaSR", "cfa_qdb_v7", "cfa_focus_cache", "__health_check__", "cfa_sr_v7"];
      for (const k of ALL_KNOWN_KEYS) {
        try {
          await window.storage.delete(k);
        } catch {}
      }

      // STEP 2: Read only from the ONE primary key
      let bestHistory = [];
      let allAttempts = [];
      try {
        const val = await storageGet(STORAGE_KEY);
        const arr = Array.isArray(val) ? val : val?.history && Array.isArray(val.history) ? val.history : null;
        if (arr && arr.length > 0 && arr[0]?.topic) {
          // Strip ALL wrongs on load — stats only, keeps storage tiny
          bestHistory = arr.map(s => ({
            id: s.id,
            topic: s.topic,
            subtopic: s.subtopic,
            difficulty: s.difficulty,
            mode: s.mode,
            score: s.score,
            total: s.total,
            pct: s.pct,
            timeTaken: s.timeTaken || 0,
            date: s.date,
            dateKey: s.dateKey,
            wrongCount: s.wrongCount || s.wrongs?.length || 0,
            wrongs: []
          }));
          allAttempts = [{
            key: STORAGE_KEY,
            found: true,
            count: bestHistory.length
          }];
        } else {
          allAttempts = [{
            key: STORAGE_KEY,
            found: false,
            count: 0
          }];
        }
      } catch (e) {
        allAttempts = [{
          key: STORAGE_KEY,
          found: false,
          count: 0,
          error: true
        }];
      }
      setStorageKeys(allAttempts);
      if (bestHistory.length > 0) {
        setHistory(bestHistory);
        historyRef.current = bestHistory;
        // Write compacted version back now that old keys are cleared
        await storageSet(STORAGE_KEY, bestHistory);
      }
      setHistoryLoaded(true);

      // STEP 2b: Load SR deck before Supabase merge so we can push it up if needed
      let bestSR = null;
      try {
        const val = await storageGet(SR_KEY);
        if (val && typeof val === "object" && !Array.isArray(val) && Object.keys(val).length > 0) {
          bestSR = val;
        }
      } catch {}
      if (bestSR) {
        setSrDeck(bestSR);
        srDeckRef.current = bestSR;
      }
      setSrLoaded(true);

      // Load usage analytics
      try {
        const usage = await storageGet(USAGE_KEY);
        if (usage && typeof usage === "object" && !Array.isArray(usage)) setUsageStats(usage);
      } catch {}

      // STEP 2c: Bidirectional Supabase merge
      // Pull if Supabase is ahead; push if local is ahead (ensures progress is never lost)
      const sbCfg = getSupabaseConfig();
      if (sbCfg) {
        try {
          const sbData = await supabaseLoad(sbCfg);
          const sbCount = sbData && Array.isArray(sbData.history) ? sbData.history.length : 0;
          if (sbData && sbCount > bestHistory.length) {
            // Supabase has more sessions — pull and cache locally
            bestHistory = sbData.history.map(s => ({
              ...s,
              wrongs: []
            }));
            setHistory(bestHistory);
            historyRef.current = bestHistory;
            storageSet(STORAGE_KEY, bestHistory);
            if (sbData.srDeck) {
              setSrDeck(sbData.srDeck);
              srDeckRef.current = sbData.srDeck;
            }
          } else if (bestHistory.length > sbCount) {
            // Local is ahead — push to Supabase in background
            supabaseSync(sbCfg, bestHistory, bestSR || {}, usageStatsRef.current).catch(() => {});
          }
          // Merge usageStats from Supabase (take max count per key — union of all sessions)
          if (sbData?.usageStats && typeof sbData.usageStats === "object") {
            const local = usageStatsRef.current;
            const merged = {};
            const allKeys = new Set([...Object.keys(local), ...Object.keys(sbData.usageStats)]);
            for (const k of allKeys) {
              const lc = local[k]?.count || 0;
              const sc = sbData.usageStats[k]?.count || 0;
              merged[k] = {
                count: Math.max(lc, sc),
                lastUsed: lc >= sc ? local[k]?.lastUsed || "" : sbData.usageStats[k]?.lastUsed || "",
                firstUsed: (local[k]?.firstUsed || "9") < (sbData.usageStats[k]?.firstUsed || "9") ? local[k]?.firstUsed : sbData.usageStats[k]?.firstUsed
              };
            }
            setUsageStats(merged);
            usageStatsRef.current = merged;
            storageSet(USAGE_KEY, merged);
          }
        } catch {}
      }

      // STEP 4: Load settings
      try {
        const k = await storageGet("cfa_api_key");
        if (k && typeof k === "string" && k.startsWith("sk-")) {
          setApiKey(k);
          setApiKeyInput(k);
        }
      } catch {}
      try {
        const d = await storageGet("cfa_exam_date");
        if (d && typeof d === "string") {
          setExamDate(new Date(d));
          setExamDateInput(d);
        }
      } catch {}
      setQdbLoaded(true);

      // Load cached focus suggestions (only use if from today)
      try {
        const cached = await storageGet("cfa_focus_cache");
        if (cached && cached.date === new Date().toISOString().slice(0, 10) && cached.suggestions) {
          setFocusSuggestions(cached.suggestions);
        }
      } catch {}
    };
    recoverData().then(() => {
      // Auto-refresh focus if no cache or cache is from a previous day
      setTimeout(() => {
        const today = new Date().toISOString().slice(0, 10);
        storageGet("cfa_focus_cache").then(cached => {
          if (!cached || cached.date !== today) {
            // will call generateFocus after state settles — use a flag
            setNeedsFocusRefresh(true);
          }
        }).catch(() => setNeedsFocusRefresh(true));
      }, 800);
    });
  }, []);
  // History saved explicitly at session end only (not on every change)
  useEffect(() => {
    if (srLoaded) {
      const srEntries = Object.entries(srDeck);
      const sorted = srEntries.sort((a, b) => (b[1].wrongCount || 0) - (a[1].wrongCount || 0) || (b[1].repetitions || 0) - (a[1].repetitions || 0));
      // Cap at 200 cards, strip options/question to save space (kept in SR review from state)
      const pruned = Object.fromEntries(sorted.slice(0, 200).map(([k, v]) => [k, {
        concept: v.concept,
        topic: v.topic,
        subtopic: v.subtopic,
        question: (v.question || "").slice(0, 120),
        options: v.options,
        answer: v.answer,
        explanation: (v.explanation || "").slice(0, 200),
        los_tested: (v.los_tested || "").slice(0, 80),
        wrongCount: v.wrongCount || 0,
        interval: v.interval,
        repetitions: v.repetitions,
        ef: v.ef,
        nextReview: v.nextReview
      }]));
      storageSet(SR_KEY, pruned);
    }
  }, [srDeck, srLoaded]);
  useEffect(() => {
    if (qdbLoaded) storageSet(QDB_KEY, qdb);
  }, [qdb, qdbLoaded]);
  // Backup written only at session end (not on every history change)
  // Storage health check on mount
  useEffect(() => {
    storageHealth().then(ok => setStorageOk(ok));
  }, []);
  const pendingSessionRef = useRef(null);
  const showToast = React.useCallback((emoji, title, desc, celebrate = false) => {
    if (typeof window.__cfaShowToast === "function") window.__cfaShowToast(emoji, title, desc, celebrate);
  }, []);
  const endQuiz = useCallback(() => {
    clearInterval(timerRef.current);
    const elapsed = Math.floor((Date.now() - startRef.current) / 1000);
    setTimeTaken(elapsed);
    setExitConfirm(false);
    pendingSessionRef.current = {
      elapsed
    };
    setScreen("results");
  }, []);

  // commitSession: called once when results screen mounts
  // Uses refs so it always reads current values, not stale closure
  const questionsRef = useRef([]);
  const answersRef = useRef({});
  const flaggedQRef = useRef({});
  const srDeckRef = useRef({});
  const topicRef = useRef("");
  const subtopicRef = useRef("");
  const difficultyRef = useRef("Medium");
  const modeRef = useRef("guided");
  useEffect(() => {
    questionsRef.current = questions;
  }, [questions]);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);
  useEffect(() => {
    flaggedQRef.current = flaggedQ;
  }, [flaggedQ]);
  useEffect(() => {
    srDeckRef.current = srDeck;
  }, [srDeck]);
  useEffect(() => {
    usageStatsRef.current = usageStats;
  }, [usageStats]);
  useEffect(() => {
    topicRef.current = topic;
  }, [topic]);
  useEffect(() => {
    subtopicRef.current = subtopic;
  }, [subtopic]);
  useEffect(() => {
    difficultyRef.current = difficulty;
  }, [difficulty]);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);
  useEffect(() => {
    if (screen === "quiz") {
      const total = fullExamMode ? 135 * 60 : count * TIME_PER_Q;
      setTimeLeft(total);
      startRef.current = Date.now();
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            endQuiz();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [screen, count, endQuiz, fullExamMode]);
  const sessionCommittedRef = useRef(false);
  useEffect(() => {
    if (screen !== "results") {
      sessionCommittedRef.current = false;
      setAiDebrief(null);
      return;
    }
    if (sessionCommittedRef.current) return; // already committed for this session
    const qs = questionsRef.current;
    if (!qs || qs.length === 0) return;
    sessionCommittedRef.current = true;

    // Read everything from refs — guaranteed current values
    const ans = answersRef.current;
    const t = topicRef.current;
    const st = subtopicRef.current;
    const diff = difficultyRef.current;
    const m = modeRef.current;
    const elapsed = pendingSessionRef.current?.elapsed || 0;
    pendingSessionRef.current = null;
    const score = qs.filter(q => ans[q.id] === q.answer).length;
    const pct = Math.round(score / qs.length * 100);

    // Read flagged state from ref
    const flagged = flaggedQRef.current || {};

    // Build updated SR deck synchronously from the ref (guaranteed current value)
    // so both state and the Supabase payload use the same post-session data
    let updatedSrDeck = {
      ...srDeckRef.current
    };
    qs.forEach(q => {
      const correct = ans[q.id] === q.answer;
      const isFlagged = !!flagged[q.id];
      if (correct && !isFlagged) return; // skip correct+unflagged
      const key = `${t}|||${st}|||${q.id}`;
      const existing = updatedSrDeck[key] || {
        concept: (q.concept || st).slice(0, 60),
        topic: t,
        subtopic: st,
        question: (q.question || "").slice(0, 600),
        options: q.options,
        answer: q.answer,
        explanation: (q.explanation || "").slice(0, 500),
        los_tested: (q.los_tested || "").slice(0, 120),
        wrongCount: 0
      };
      const card = sm2Update(existing, correct);
      if (!correct) card.wrongCount = (existing.wrongCount || 0) + 1;
      if (isFlagged && correct) {
        card.interval = 1;
        card.repetitions = 0;
        card.ef = Math.max(1.3, existing.ef - 0.1);
        card.nextReview = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
      }
      updatedSrDeck = {
        ...updatedSrDeck,
        [key]: card
      };
    });
    setSrDeck(updatedSrDeck); // single state update with fully computed deck

    // QDB
    setQdb(prev => addToQDB(qs.map(q => ({
      ...q,
      _topic: t,
      _subtopic: st
    })), prev));

    // Build session object
    const session = {
      id: Date.now(),
      topic: t,
      subtopic: st,
      difficulty: diff,
      mode: m,
      score,
      total: qs.length,
      pct,
      timeTaken: elapsed,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short"
      }),
      dateKey: new Date().toISOString().slice(0, 10),
      wrongCount: qs.filter(q => ans[q.id] !== q.answer).length,
      wrongs: [],
      ...(omMode && {
        isOfficeMode: true
      })
    };
    setLastSession(session);

    // Build newHistory using ref (always current)
    const newHistory = [session, ...historyRef.current];
    setHistory(newHistory);
    historyRef.current = newHistory;

    // ── Milestone checks ──────────────────────────────────────────────────
    const oldXP = getTotalXP(newHistory.slice(1));
    const newXP = getTotalXP(newHistory);
    const oldLevel = getLevel(oldXP).level;
    const newLevel = getLevel(newXP).level;
    if (newLevel > oldLevel) {
      showToast("⭐", `Level Up! You're now ${getLevel(newXP).label}`, "Keep the momentum going!", true);
    } else if (pct === 100) {
      showToast("🎯", "Perfect Session!", `100% on ${t} — flawless.`, true);
    } else if (newHistory.length === 1) {
      showToast("🚀", "First Session Done!", "Your CFA journey starts now.", false);
    }
    // Personal best check
    const bestKey = `${t}|||${st}`;
    setPersonalBests(prev => {
      const stored = prev[bestKey];
      if (!stored || pct > stored.pct) {
        const updated = {
          ...prev,
          [bestKey]: {
            pct,
            date: session.dateKey,
            difficulty: diff
          }
        };
        try {
          localStorage.setItem(BESTS_KEY, JSON.stringify(updated));
        } catch {}
        if (stored && pct > stored.pct) {
          showToast("🏆", "New Personal Best!", `${pct}% in ${st} (was ${stored.pct}%)`, pct === 100 ? false : true);
        }
        return updated;
      }
      return prev;
    });
    // ─────────────────────────────────────────────────────────────────────

    // Auto-escalation
    const topicHistory = historyRef.current.filter(h => h.topic === t && h.subtopic === st && h.difficulty === diff);
    if (pct >= 80 && diff !== "Hard" && topicHistory.length >= 2) setAutoEscalation({
      topic: t,
      subtopic: st,
      from: diff,
      to: diff === "Easy" ? "Medium" : "Hard"
    });

    // Persist — both localStorage and Supabase use the synchronously-built values
    (async () => {
      const ok = await storageSet(STORAGE_KEY, newHistory.slice(0, 300));
      setSessionSaved(ok);
      if (ok && apiKey) syncToDrive(newHistory.slice(0, 100));
      const sbCfg = getSupabaseConfig();
      if (sbCfg) {
        const synced = await supabaseSync(sbCfg, newHistory.slice(0, 300), updatedSrDeck, usageStatsRef.current);
        if (synced) setDriveStatus("synced");else setDriveStatus("error");
        setTimeout(() => setDriveStatus(null), 4000);
      }
    })();
  }, [screen]);
  const callClaude = async (prompt, maxTokens = 8000, {
    retries = 3,
    retryDelay = 8000,
    model = "claude-sonnet-4-6"
  } = {}) => {
    if (!navigator.onLine) throw new Error("No internet — check your connection and retry.");
    let lastError;
    for (let attempt = 0; attempt < retries; attempt++) {
      if (attempt > 0) {
        // Exponential backoff: 8s, 16s, 32s
        const delay = retryDelay * Math.pow(2, attempt - 1);
        setLoadingMsg(`Rate limit hit — retrying in ${Math.round(delay / 1000)}s (attempt ${attempt + 1}/${retries})...`);
        await new Promise(r => setTimeout(r, delay));
      }
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 90000);
      try {
        const activeKey = apiKey || "";
        const modelName = model;
        const headers = {
          "content-type": "application/json",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        };
        if (activeKey) headers["x-api-key"] = activeKey;
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers,
          signal: controller.signal,
          body: JSON.stringify({
            model: modelName,
            max_tokens: maxTokens,
            messages: [{
              role: "user",
              content: prompt
            }]
          })
        });
        clearTimeout(timeout);
        // Rate limit: 429 or 529 — retry
        if (res.status === 429 || res.status === 529) {
          const retryAfter = res.headers.get("retry-after");
          const waitMs = retryAfter ? parseInt(retryAfter) * 1000 : retryDelay * Math.pow(2, attempt);
          lastError = new Error(`Rate limit — waiting ${Math.round(waitMs / 1000)}s before retry`);
          setLoadingMsg(`Rate limit hit — waiting ${Math.round(waitMs / 1000)}s...`);
          clearTimeout(timeout);
          await new Promise(r => setTimeout(r, waitMs));
          continue;
        }
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error?.message || `API error ${res.status}`);
        }
        const data = await res.json();
        if (data.error) throw new Error(`Claude error: ${data.error.message || JSON.stringify(data.error)}`);
        if (!data.content || !data.content.length) throw new Error("Empty response from API");
        const raw = data.content.map(i => i.text || "").join("").replace(/```json\n?|```/g, "").trim();
        if (!raw) throw new Error("No text content in response");
        if (data.stop_reason === "max_tokens") throw new Error("Response too long — tap retry (using more budget next time).");
        // Try direct parse
        try {
          return JSON.parse(raw);
        } catch {}
        // Regex-extract the outermost JSON array or object (handles extra text before/after)
        const arrM = raw.match(/\[[\s\S]*\]/);
        if (arrM) {
          try {
            return JSON.parse(arrM[0]);
          } catch {}
        }
        const objM = raw.match(/\{[\s\S]*\}/);
        if (objM) {
          try {
            return JSON.parse(objM[0]);
          } catch {}
        }
        // Not JSON — return raw string (plain text responses: debrief, AI coach, etc.)
        return raw;
      } catch (e) {
        clearTimeout(timeout);
        if (e.name === "AbortError") {
          lastError = new Error("Timed out — API is slow, try again.");
          continue;
        }
        // Don't retry non-rate-limit errors
        if (!e.message?.includes("Rate limit") && !e.message?.includes("rate limit")) throw e;
        lastError = e;
      }
    }
    throw lastError || new Error("All retries failed — please wait a minute and try again.");
  };
  const trackUsage = feature => {
    setUsageStats(prev => {
      const now = new Date().toISOString();
      const updated = {
        ...prev,
        [feature]: {
          count: (prev[feature]?.count || 0) + 1,
          lastUsed: now,
          firstUsed: prev[feature]?.firstUsed || now
        }
      };
      storageSet(USAGE_KEY, updated);
      usageStatsRef.current = updated;
      return updated;
    });
  };
  const generateFocus = () => {
    setFocusLoading(true);
    setFocusError("");
    setSelectedFocus(null);
    // Fully local — no API call, instant results
    setTimeout(() => {
      try {
        const daysLeft = Math.max(0, Math.ceil((examDate - new Date()) / 86400000));
        const candidates = [];

        // 1. Leech cards (wrong 4+ times) — highest priority
        const leeches = getLeeches(srDeck);
        const leechTopics = {};
        leeches.forEach(c => {
          const k = c.topic + "|" + c.subtopic;
          leechTopics[k] = leechTopics[k] || {
            topic: c.topic,
            module: c.subtopic,
            count: 0,
            wrongCount: 0
          };
          leechTopics[k].count++;
          leechTopics[k].wrongCount += c.wrongCount || 0;
        });
        Object.values(leechTopics).sort((a, b) => b.wrongCount - a.wrongCount).slice(0, 2).forEach(l => {
          candidates.push({
            topic: l.topic,
            module: l.module,
            difficulty: "Medium",
            reason: `You have ${l.count} leech card${l.count > 1 ? "s" : ""} here (missed ${l.wrongCount}+ times) — targeted drilling needed.`,
            urgency: "high",
            count: 10,
            mode: "guided",
            _score: 1000 + l.wrongCount
          });
        });

        // 2. SR cards due today
        const due = getDueCards(srDeck);
        const dueByModule = {};
        due.forEach(c => {
          const k = c.topic + "|" + c.subtopic;
          dueByModule[k] = dueByModule[k] || {
            topic: c.topic,
            module: c.subtopic,
            count: 0
          };
          dueByModule[k].count++;
        });
        Object.values(dueByModule).sort((a, b) => b.count - a.count).slice(0, 2).forEach(d => {
          if (!candidates.find(c => c.topic === d.topic && c.module === d.module)) candidates.push({
            topic: d.topic,
            module: d.module,
            difficulty: "Medium",
            reason: `${d.count} spaced-repetition card${d.count > 1 ? "s are" : " is"} due today — review now to lock in retention.`,
            urgency: "high",
            count: 5,
            mode: "guided",
            _score: 800 + d.count * 10
          });
        });

        // 3. Weak accuracy on high-weight topics (<65%)
        const highWeight = ["Ethics", "Financial Statement Analysis", "Equity", "Fixed Income"];
        moduleReadiness.filter(m => m.accuracy !== null && m.accuracy < 65 && m.reliable).sort((a, b) => {
          const ha = highWeight.includes(a.topic) ? 1 : 0,
            hb = highWeight.includes(b.topic) ? 1 : 0;
          return hb - ha || a.accuracy - b.accuracy;
        }).slice(0, 3).forEach(m => {
          const firstMod = m.modulesCovered[0] || Object.keys(LOS[m.topic]?.modules || {})[0] || "Intro";
          if (!candidates.find(c => c.topic === m.topic)) candidates.push({
            topic: m.topic,
            module: firstMod,
            difficulty: daysLeft < 30 ? "Hard" : m.accuracy < 50 ? "Easy" : "Medium",
            reason: `Accuracy is ${m.accuracy}% on ${m.topic} (${m.weight}% of exam) — below the passing threshold.`,
            urgency: m.weight >= 11 ? "high" : "medium",
            count: 10,
            mode: "guided",
            _score: 600 + m.weight * 10 + (65 - m.accuracy)
          });
        });

        // 4. Untested high-weight modules
        const allUntested = Object.entries(LOS).flatMap(([t, {
          weight,
          modules
        }]) => Object.keys(modules).filter(m => !history.some(h => h.topic === t && h.subtopic === m)).map(m => ({
          topic: t,
          module: m,
          weight
        }))).sort((a, b) => b.weight - a.weight);
        allUntested.slice(0, 4).forEach(({
          topic,
          module: mod,
          weight
        }) => {
          if (!candidates.find(c => c.topic === topic && c.module === mod)) candidates.push({
            topic,
            module: mod,
            difficulty: "Easy",
            reason: `Not yet attempted — ${weight}% topic weight. First exposure builds the mental map.`,
            urgency: weight >= 11 ? "high" : weight >= 8 ? "medium" : "low",
            count: 10,
            mode: "guided",
            _score: 400 + weight * 5
          });
        });

        // 5. Recently weak sessions
        history.slice(0, 10).filter(h => h.pct < 75).forEach(h => {
          if (!candidates.find(c => c.topic === h.topic && c.module === h.subtopic)) candidates.push({
            topic: h.topic,
            module: h.subtopic,
            difficulty: h.pct < 55 ? "Easy" : "Medium",
            reason: `Last session scored ${h.pct}% here — a follow-up session cements weak spots.`,
            urgency: "low",
            count: 5,
            mode: "guided",
            _score: 200
          });
        });

        // 6. Fallback for brand new users
        if (candidates.length === 0) {
          [["Ethics", "Code of Ethics & Standards"], ["Financial Statement Analysis", "Income Statement Analysis"], ["Equity", "Market Efficiency"]].forEach(([t, m], i) => {
            candidates.push({
              topic: t,
              module: m,
              difficulty: "Easy",
              reason: "High-weight topic — a strong start here pays off across 13–15% of exam marks.",
              urgency: i === 0 ? "high" : "medium",
              count: 10,
              mode: "guided",
              _score: 100 - i
            });
          });
        }
        const suggestions = candidates.sort((a, b) => b._score - a._score).slice(0, 3).map(({
          _score,
          ...rest
        }) => rest);
        setFocusSuggestions(suggestions);
        setFocusLastGenerated(Date.now());
        storageSet("cfa_focus_cache", {
          suggestions,
          date: new Date().toISOString().slice(0, 10)
        });
      } catch (e) {
        setFocusError(`Error computing focus: ${e.message}`);
      }
      setFocusLoading(false);
    }, 400);
  };
  const syncToDrive = async historyData => {
    if (!apiKey) return; // Drive sync requires API key
    setDriveStatus("syncing");
    try {
      const payload = {
        version: 3,
        exportedAt: new Date().toISOString(),
        sessions: historyData.length,
        history: historyData.map(s => ({
          id: s.id,
          topic: s.topic,
          subtopic: s.subtopic,
          difficulty: s.difficulty,
          mode: s.mode,
          score: s.score,
          total: s.total,
          pct: s.pct,
          timeTaken: s.timeTaken,
          date: s.date,
          dateKey: s.dateKey,
          wrongCount: s.wrongCount || 0
        }))
      };
      const content64 = btoa(unescape(encodeURIComponent(JSON.stringify(payload, null, 2))));
      // Use Anthropic API with Drive MCP to write the file
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
          "x-api-key": apiKey
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 500,
          mcp_servers: [{
            "type": "url",
            "url": "https://drivemcp.googleapis.com/mcp/v1",
            "name": "gdrive"
          }],
          messages: [{
            role: "user",
            content: `Save this JSON as a file named "cfa_mock_backup.json" in my Google Drive root folder. If the file already exists, overwrite it. File content (base64): ${content64}

Reply with just "saved" when done.`
          }]
        })
      });
      const data = await res.json();
      const text = (data.content || []).map(c => c.text || "").join("");
      setDriveStatus(text.toLowerCase().includes("saved") || text.toLowerCase().includes("success") ? "synced" : "error");
      setTimeout(() => setDriveStatus(null), 4000);
    } catch (e) {
      setDriveStatus("error");
      setTimeout(() => setDriveStatus(null), 4000);
    }
  };
  const generateWeeklyPlan = async () => {
    setWeeklyPlanLoading(true);
    setWeeklyPlanError("");
    try {
      const accuracyStr = moduleReadiness.map(m => `${m.topic}:${m.accuracy !== null ? m.accuracy + '%' : 'untested'}`).join(", ");
      const untestedStr = moduleReadiness.flatMap(m => m.untouchedModules.map(mod => `${m.topic}>${mod}`)).slice(0, 8).join(", ") || "None";
      const prob = passProbability?.probability || "unknown";
      const daysSince = studyPace?.daysSinceLastSession || "unknown";
      const prompt = WEEKLY_PLAN_PROMPT.split("{days}").join(String(daysLeft)).split("{hours}").join(String(hoursThisWeek)).split("{prob}").join(String(prob)).split("{accuracy}").join(accuracyStr || "No data yet").split("{untested}").join(untestedStr).split("{srDue}").join(String(dueCards.length)).split("{daysSince}").join(String(daysSince));
      const plan = await callClaude(prompt, 2000, {
        retries: 3,
        retryDelay: 6000
      });
      if (!plan || !plan.days) throw new Error("Plan missing 'days' field — got: " + JSON.stringify(plan).slice(0, 100));
      setWeeklyPlan(plan);
    } catch (e) {
      const msg = e.message || "Failed to generate plan.";
      setWeeklyPlanError(msg.includes("Rate limit") || msg.includes("retries failed") ? "⏳ API is busy — please wait a minute and try again." : msg);
    }
    setWeeklyPlanLoading(false);
  };
  const generateFSAVignette = async (subtopic, difficulty) => {
    if (generatingRef.current) return;
    generatingRef.current = true;
    setLoading(true);
    setError("");
    setLoadingProgress(0);
    setLoadingMsg("Building financial statements...");
    const progressInterval = setInterval(() => {
      setLoadingProgress(p => Math.min(85, p + 3));
    }, 300);
    try {
      if (!apiKey) {
        setError("FSA Statement Vignette requires an API key.");
        setLoading(false);
        clearInterval(progressInterval);
        generatingRef.current = false;
        return;
      }
      const raw = await callClaude(buildFSAStatementPrompt(subtopic, difficulty), 2500, {
        retries: 2,
        retryDelay: 6000,
        model: "claude-sonnet-4-6"
      });
      clearInterval(progressInterval);
      if (!raw || !raw.questions) throw new Error("Invalid FSA vignette format");
      const stmtText = formatStatements(raw);
      const qs = raw.questions.map(q => ({
        ...q,
        id: `fsa_${Date.now()}_${q.id}`,
        question: `**${raw.company} (${raw.year}) — ${raw.scenario}**\n\n${stmtText}\n\n${q.question}`,
        _isFSAVignette: true
      }));
      setLoadingProgress(100);
      await new Promise(r => setTimeout(r, 200));
      setTopic("Financial Statement Analysis");
      setSubtopic(subtopic);
      setDifficulty(difficulty);
      setMode("fsa_vignette");
      setVignetteMode(true);
      setQuestions(qs);
      setAnswers({});
      setFlaggedQ({});
      setCurrentQ(0);
      setShowExp(false);
      setLastSession(null);
      setFullExamMode(false);
      setScreen("quiz");
    } catch (e) {
      clearInterval(progressInterval);
      setError("FSA Vignette failed: " + e.message);
    }
    setLoading(false);
    setLoadingProgress(0);
    generatingRef.current = false;
  };
  const generateQuestions = async (t, st, diff, cnt, m = "guided", isVignette = false, st2 = null) => {
    if (generatingRef.current) {
      return;
    }
    generatingRef.current = true;
    setLoading(true);
    setError("");
    setLoadingProgress(0);
    setLoadingETA(null);
    loadingStartRef.current = Date.now();

    // ── No API key: use local templates as fallback ──
    // When an API key IS set, always use the API for exam-quality questions.
    if (!isVignette && !apiKey) {
      const localRaw = generateLocalQuestions(t, st, diff, cnt * 3);
      const seen = new Set();
      const localQs = localRaw.filter(q => {
        const key = q.concept ? q.concept.toLowerCase() : (q.question || "").toLowerCase().replace(/\d+\.?\d*/g, "#").replace(/\s+/g, " ").slice(0, 80);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }).slice(0, cnt);
      if (localQs.length >= Math.min(cnt, 3)) {
        setLoadingProgress(100);
        setLoadingMsg(`${localQs.length} questions ready (offline mode)`);
        await new Promise(r => setTimeout(r, 300));
        setTopic(t);
        setSubtopic(st);
        setDifficulty(diff);
        setCount(cnt);
        setMode(m);
        setVignetteMode(false);
        setQuestions(localQs);
        setAnswers({});
        setFlaggedQ({});
        setCurrentQ(0);
        setShowExp(false);
        setLastSession(null);
        setFullExamMode(false);
        setScreen("quiz");
        setLoading(false);
        setLoadingProgress(0);
        generatingRef.current = false;
        return;
      }
    }

    // ── API path (always used when key is set; fallback error when not) ──
    if (!apiKey) {
      setError(isVignette ? "Vignette mode requires an API key. Add yours via the 🔑 button." : "Add your Anthropic API key (🔑 on the home screen) to generate exam-quality questions.");
      setLoading(false);
      setLoadingProgress(0);
      generatingRef.current = false;
      return;
    }
    const estimatedMs = Math.max(5000, cnt * 900);
    const msgs = isVignette ? ["Writing scenario...", "Building item set...", "Engineering distractors...", "Almost ready..."] : ["Reading LOS statements...", "Anchoring to 2026 curriculum...", "Engineering distractors...", "Checking for duplicates...", "Almost ready..."];
    setLoadingMsg(msgs[0]);
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - loadingStartRef.current;
      const pct = Math.min(90, Math.round(elapsed / estimatedMs * 90));
      setLoadingProgress(pct);
      const remainingMs = Math.max(0, estimatedMs - elapsed);
      setLoadingETA(Math.ceil(remainingMs / 1000));
      const mi = Math.floor(elapsed / 1800) % msgs.length;
      setLoadingMsg(msgs[mi]);
    }, 200);
    try {
      const useModel = diff === "Easy" ? "claude-haiku-4-5-20251001" : "claude-sonnet-4-6";
      let parsed;
      if (isVignette) {
        const vignetteCount = Math.max(1, Math.ceil(cnt / 3));
        const vigPrompt = buildVignettePrompt(t, st, diff, vignetteCount, st2 || null);
        const rawVig = await callClaude(vigPrompt, 3000, {
          retries: 3,
          retryDelay: 8000,
          model: useModel
        });
        // Flatten vignettes into questions with shared context prepended
        parsed = flattenVignettes(rawVig, t, st);
      } else {
        const tightMax = {
          3: 2000,
          5: 3500,
          10: 6000,
          15: 8000,
          20: 8000
        }[cnt] || cnt * 700;
        let raw = await callClaude(buildQuestionPrompt(t, st, diff, cnt), tightMax, {
          retries: 3,
          retryDelay: 8000,
          model: useModel
        });
        if (Array.isArray(raw)) raw = expandQuestionKeys(raw);
        parsed = raw;
      }
      if (!Array.isArray(parsed) || !parsed.length) throw new Error("Empty");
      const fresh = filterNewQuestions(parsed, qdb);
      const finalQs = fresh.length >= Math.ceil(cnt * 0.7) ? fresh : parsed;
      setLoadingProgress(100);
      setLoadingMsg(isVignette ? "Vignettes ready!" : "Questions ready!");
      await new Promise(r => setTimeout(r, 350));
      setTopic(t);
      setSubtopic(st);
      setDifficulty(diff);
      setCount(cnt);
      setMode(m);
      setVignetteMode(isVignette);
      setQuestions(finalQs);
      setAnswers({});
      setFlaggedQ({});
      setCurrentQ(0);
      setShowExp(false);
      setLastSession(null);
      setFullExamMode(false);
      setScreen("quiz");
    } catch (e) {
      const msg = e.message || "Unknown error";
      setError(msg.includes("Rate limit") || msg.includes("retries failed") ? "API is busy - please wait a minute and try again." : `Generation failed: ${msg}. Tap to retry.`);
    }
    clearInterval(progressInterval);
    setLoading(false);
    setLoadingProgress(0);
    setLoadingETA(null);
    generatingRef.current = false;
  };
  const startFullExam = async (sessionNum = 1) => {
    setLoading(true);
    setError("");
    try {
      const allTopics = Object.entries(LOS);
      const totalW = allTopics.reduce((s, [, {
        weight
      }]) => s + weight, 0);
      let allQs = [];
      // Generate proportionally from local templates first, API fallback per topic
      for (let i = 0; i < allTopics.length; i++) {
        const [t, {
          weight,
          modules
        }] = allTopics[i];
        const topicCount = Math.max(2, Math.round(weight / totalW * 180));
        const moduleNames = Object.keys(modules);
        const perModule = Math.max(1, Math.floor(topicCount / moduleNames.length));
        for (const mod of moduleNames.slice(0, Math.ceil(topicCount / perModule))) {
          setLoadingMsg(`${t} › ${mod} (${i + 1}/${allTopics.length})…`);
          const localQs = generateLocalQuestions(t, mod, "Medium", perModule);
          if (localQs.length >= perModule) {
            allQs = [...allQs, ...localQs.map(q => ({
              ...q,
              _topic: t,
              _subtopic: mod
            }))];
          } else if (apiKey) {
            try {
              const qs = await callClaude(buildQuestionPrompt(t, mod, "Medium", perModule), perModule * 500, {
                retries: 1,
                retryDelay: 4000,
                model: "claude-haiku-4-5-20251001"
              });
              allQs = [...allQs, ...(Array.isArray(qs) ? expandQuestionKeys(qs) : []).map((q, j) => ({
                ...q,
                id: `${i}_${j}_${mod.slice(0, 5)}`,
                _topic: t,
                _subtopic: mod
              }))];
            } catch {}
          }
        }
      }
      if (allQs.length < 30) throw new Error("Too few questions generated. Add an API key for full exam support.");
      const shuffled = allQs.sort(() => Math.random() - 0.5);
      // Split into AM (session 1) and PM (session 2) of 90 questions each
      const amQs = shuffled.slice(0, Math.min(90, shuffled.length));
      const pmQs = shuffled.slice(90, Math.min(180, shuffled.length));
      // Store PM questions for after break
      window._cfaExamPMQs = pmQs;
      const sessionQs = sessionNum === 1 ? amQs : pmQs;
      setExamSession(sessionNum);
      setTopic("Full Exam");
      setSubtopic(sessionNum === 1 ? "AM Session" : "PM Session");
      setDifficulty("Medium");
      setCount(sessionQs.length);
      setMode("exam");
      setFullExamMode(true);
      setQuestions(sessionQs);
      setAnswers({});
      setFlaggedQ({});
      setCurrentQ(0);
      setShowExp(false);
      setLastSession(null);
      setScreen("quiz");
    } catch (e) {
      setError(`Full exam failed: ${e.message}`);
    }
    setLoading(false);
  };
  const handleAnswer = (qId, opt) => {
    if (answers[qId]) return;
    setAnswers(a => ({
      ...a,
      [qId]: opt
    }));
    if (mode === "guided") setShowExp(true);
  };
  const nextQ = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
      setShowExp(false);
    } else endQuiz();
  };

  // ── DERIVED DATA ──
  const moduleReadiness = useMemo(() => getModuleReadiness(history), [history]);
  const predicted = useMemo(() => getPredictedScore(moduleReadiness), [moduleReadiness]);
  const daysLeft = Math.max(0, Math.ceil((examDate - new Date()) / 86400000));
  const streak = getStreak(history);
  const overallPct = history.length ? Math.round(history.reduce((s, h) => s + h.pct, 0) / history.length) : null;
  const dueCards = useMemo(() => getDueCards(srDeck), [srDeck]);
  const leeches = useMemo(() => getLeeches(srDeck), [srDeck]);
  const forgettingCurve = useMemo(() => getForgettingCurve(srDeck), [srDeck]);
  const activity = useMemo(() => getLast30DaysActivity(history), [history]);
  const totalQsAttempted = history.reduce((s, h) => s + h.total, 0);
  const wrongPatterns = useMemo(() => getWrongAnswerPatterns(history), [history]);
  const sessionScore = questions.filter(q => answers[q.id] === q.answer).length;
  const sessionPct = questions.length ? Math.round(sessionScore / questions.length * 100) : 0;
  const lastSessionQuality = useMemo(() => lastSession ? getSessionQuality(lastSession) : null, [lastSession]);
  const passProbability = useMemo(() => getPassProbability(history, moduleReadiness, daysLeft), [history, moduleReadiness, daysLeft]);
  const studyPace = useMemo(() => getStudyPace(history, daysLeft), [history, daysLeft]);
  const totalXP = useMemo(() => getTotalXP(history), [history]);
  const levelInfo = useMemo(() => getLevel(totalXP), [totalXP]);
  const totalWrongs = useMemo(() => history.flatMap(h => Array.isArray(h.wrongs) ? h.wrongs : []).filter(w => w && w.question).length, [history]);
  const srWrongCount = useMemo(() => Object.values(srDeck).filter(c => (c.wrongCount || 0) > 0).length, [srDeck]);

  // Adaptive difficulty for Office Mode — derived from last 5 OM sessions
  const adaptiveOmDifficulty = useMemo(() => {
    const omSessions = history.filter(h => h.isOfficeMode).slice(0, 5);
    if (!omSessions.length) return "Medium";
    const avg = omSessions.reduce((s, h) => s + (h.pct || 0), 0) / omSessions.length;
    return avg >= 80 ? "Hard" : avg >= 60 ? "Medium" : "Easy";
  }, [history]);
  const wrap = (children, maxW = 580) => /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: C.bg,
      color: C.text,
      fontFamily: "'Inter',system-ui,-apple-system,sans-serif",
      padding: "22px 18px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: maxW,
      width: "100%",
      animation: "fadeIn 0.2s ease"
    }
  }, children));
  // ══ GLOBAL LOADING OVERLAY — shown from any screen when generating ══════
  if (loading) return wrap(/*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 400,
      width: "100%",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 16,
      background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 26,
      margin: "0 auto 14px"
    }
  }, "⚡"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      marginBottom: 4,
      color: C.text
    }
  }, "ClearCFA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 6,
      color: C.accentLight
    }
  }, loadingMsg), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 28
    }
  }, loadingETA > 0 ? `About ${loadingETA}s remaining` : "Finishing up..."), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: C.border,
      borderRadius: 3,
      marginBottom: 12,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${loadingProgress}%`,
      background: `linear-gradient(90deg,${C.accent},${C.accentLight})`,
      borderRadius: 3,
      transition: "width 0.2s ease",
      boxShadow: `0 0 8px ${C.accent}88`
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.accent,
      fontWeight: 700
    }
  }, loadingProgress, "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 8,
      marginTop: 24,
      flexWrap: "wrap"
    }
  }, ["LOS anchor", "Distractor eng.", "Deduplication", "Ready"].map((step, i) => {
    const stepPct = [0, 30, 70, 90][i];
    const done = loadingProgress >= stepPct + 20;
    const active = loadingProgress >= stepPct && !done;
    return /*#__PURE__*/React.createElement("div", {
      key: step,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 16,
        height: 16,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 9,
        fontWeight: 700,
        background: done ? "#22a05a" : active ? C.accent : C.dim,
        color: done || active ? "#fff" : C.muted,
        transition: "background 0.3s"
      }
    }, done ? "✓" : i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        color: done ? C.easy : active ? C.accentLight : C.muted,
        transition: "color 0.3s"
      }
    }, step));
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setLoading(false);
      setLoadingProgress(0);
      setLoadingETA(null);
      generatingRef.current = false;
      setError("");
    },
    style: {
      marginTop: 32,
      fontSize: 12,
      padding: "8px 20px",
      borderRadius: 8,
      background: "none",
      border: `1px solid ${C.border}`,
      color: C.muted,
      cursor: "pointer"
    }
  }, "Cancel"))));

  // ══ AI COACH ════════════════════════════════════════════════════════════════
  if (aiCoachScreen) return wrap(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 20,
      fontWeight: 800,
      color: "#22d3ee"
    }
  }, "🤖 AI Study Coach"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 2
    }
  }, "Powered by Claude · Knows your performance data")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setAiCoachScreen(false),
    style: {
      background: "none",
      border: "none",
      color: C.muted,
      cursor: "pointer",
      fontSize: 13
    }
  }, "← Home")), (() => {
    const topWeak = moduleReadiness.filter(m => m.accuracy !== null).sort((a, b) => a.accuracy - b.accuracy).slice(0, 3);
    const untouched = moduleReadiness.filter(m => m.sessions === 0).length;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#080818",
        border: `1px solid #22d3ee22`,
        borderRadius: 11,
        padding: "12px 14px",
        marginBottom: 14,
        fontSize: 11,
        color: C.muted
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#22d3ee",
        fontWeight: 700
      }
    }, "Context loaded: "), history.length, " sessions · ", daysLeft, " days to exam ·", topWeak.length > 0 ? ` Weakest: ${topWeak[0].topic.split(" ")[0]} (${topWeak[0].accuracy}%) ·` : "", untouched > 0 ? ` ${untouched} untouched modules` : "", "· Pass prob: ", passProbability ? `${passProbability.probability}%` : "N/A");
  })(), aiCoachMessages.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      marginBottom: 4
    }
  }, "Quick questions"), ["What should I study today?", "Where am I most likely to lose marks?", "How do I fix my weakest topic fast?", "Am I on track to pass? Be honest.", "What's my biggest risk with 62 days left?"].map(prompt => /*#__PURE__*/React.createElement("button", {
    key: prompt,
    onClick: async () => {
      if (!apiKey) {
        setAiCoachMessages(m => [...m, {
          role: "user",
          text: prompt
        }, {
          role: "assistant",
          text: "Add an API key first (🔑 on home screen) to use AI Coach."
        }]);
        return;
      }
      const userMsg = {
        role: "user",
        text: prompt
      };
      setAiCoachMessages(m => [...m, userMsg]);
      setAiCoachLoading(true);
      try {
        const topWeak = moduleReadiness.filter(m => m.accuracy !== null).sort((a, b) => a.accuracy - b.accuracy).slice(0, 3).map(m => `${m.topic}: ${m.accuracy}%`).join(", ");
        const untouched = moduleReadiness.filter(m => m.sessions === 0).map(m => m.topic.split(" ")[0]).join(", ");
        const context = `Student data: ${history.length} sessions, overall ${overallPct || "N/A"}%, pass probability ${passProbability?.probability || "N/A"}%, days to exam ${daysLeft}, weakest modules: ${topWeak || "none yet"}, untouched: ${untouched || "none"}, SR due: ${dueCards.length}, leeches: ${leeches.length}.`;
        const sysPrompt = `You are a direct, honest CFA Level 1 study coach. ${context} Give specific, actionable advice in 2-4 sentences. No generic motivational fluff.`;
        const result = await callClaude(`${sysPrompt}\n\nStudent: ${prompt}`, 300, {
          model: "claude-haiku-4-5-20251001",
          retries: 1,
          retryDelay: 2000
        });
        const text = (typeof result === "string" ? result : "") || "No response";
        setAiCoachMessages(m => [...m, {
          role: "assistant",
          text
        }]);
      } catch (e) {
        setAiCoachMessages(m => [...m, {
          role: "assistant",
          text: "Error: " + e.message
        }]);
      }
      setAiCoachLoading(false);
    },
    style: {
      textAlign: "left",
      padding: "10px 14px",
      borderRadius: 9,
      fontSize: 12,
      background: C.surface,
      border: `1px solid #22d3ee22`,
      color: C.textMid,
      cursor: "pointer"
    }
  }, prompt))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginBottom: 16
    }
  }, aiCoachMessages.map((msg, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "85%",
      padding: "10px 14px",
      borderRadius: 11,
      fontSize: 12,
      lineHeight: 1.7,
      background: msg.role === "user" ? `linear-gradient(135deg,${C.accent},${C.accentLight})` : C.surface,
      color: msg.role === "user" ? "#fff" : "#a0d8e8",
      border: msg.role === "user" ? "none" : `1px solid #22d3ee22`
    }
  }, msg.text))), aiCoachLoading && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 14px",
      borderRadius: 11,
      background: C.surface,
      border: `1px solid #22d3ee22`
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    width: 120,
    height: 12,
    radius: 6
  })))), aiCoachMessages.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: aiCoachInput,
    onChange: e => setAiCoachInput(e.target.value),
    onKeyDown: async e => {
      if (e.key === "Enter" && aiCoachInput.trim() && !aiCoachLoading) {
        const q = aiCoachInput.trim();
        setAiCoachInput("");
        if (!apiKey) {
          setAiCoachMessages(m => [...m, {
            role: "user",
            text: q
          }, {
            role: "assistant",
            text: "Add an API key first."
          }]);
          return;
        }
        setAiCoachMessages(m => [...m, {
          role: "user",
          text: q
        }]);
        setAiCoachLoading(true);
        try {
          const topWeak = moduleReadiness.filter(m => m.accuracy !== null).sort((a, b) => a.accuracy - b.accuracy).slice(0, 3).map(m => `${m.topic}: ${m.accuracy}%`).join(", ");
          const context = `Student data: ${history.length} sessions, overall ${overallPct || "N/A"}%, pass prob ${passProbability?.probability || "N/A"}%, days to exam ${daysLeft}, weakest: ${topWeak || "none"}.`;
          const result = await callClaude(`You are a direct CFA L1 coach. ${context}\n\nStudent: ${q}`, 300, {
            model: "claude-haiku-4-5-20251001",
            retries: 1,
            retryDelay: 2000
          });
          setAiCoachMessages(m => [...m, {
            role: "assistant",
            text: (typeof result === "string" ? result : "") || "No response"
          }]);
        } catch (e) {
          setAiCoachMessages(m => [...m, {
            role: "assistant",
            text: "Error: " + e.message
          }]);
        }
        setAiCoachLoading(false);
      }
    },
    placeholder: "Ask anything about your study plan...",
    style: {
      flex: 1,
      padding: "11px 14px",
      borderRadius: 10,
      fontSize: 12,
      background: C.surface,
      border: `1px solid #22d3ee44`,
      color: C.text,
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => {},
    style: {
      padding: "11px 14px",
      borderRadius: 10,
      fontSize: 13,
      background: "#22d3ee22",
      border: `1px solid #22d3ee44`,
      color: "#22d3ee",
      cursor: "pointer",
      fontWeight: 700
    }
  }, "↑")), aiCoachMessages.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setAiCoachMessages([]),
    style: {
      marginTop: 10,
      width: "100%",
      padding: "8px",
      borderRadius: 8,
      fontSize: 11,
      background: "none",
      border: `1px solid ${C.border}`,
      color: C.muted,
      cursor: "pointer"
    }
  }, "Clear chat")));

  // ══ HOME ══════════════════════════════════════════════════════════════════
  if (screen === "home") return wrap(/*#__PURE__*/React.createElement(React.Fragment, null, settingsOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 200,
      background: "rgba(0,0,0,0.7)",
      backdropFilter: "blur(4px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end"
    },
    onClick: () => setSettingsOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: C.bg,
      borderRadius: "18px 18px 0 0",
      padding: "20px 16px 32px",
      border: `1px solid ${C.border}`,
      borderBottom: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 4,
      borderRadius: 2,
      background: C.border,
      margin: "0 auto 18px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: C.text,
      marginBottom: 16
    }
  }, "Settings"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setSettingsOpen(false);
      setScreen("apiKey");
    },
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "13px 14px",
      borderRadius: 12,
      background: apiKey ? C.easy + "15" : C.surface,
      border: `1px solid ${apiKey ? C.easy + "44" : C.border}`,
      color: C.text,
      cursor: "pointer",
      marginBottom: 9,
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "🔑"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700
    }
  }, "API Key"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 1
    }
  }, apiKey ? "Claude AI connected" : "Not configured — questions use templates")), apiKey && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.easy,
      fontWeight: 700
    }
  }, "✓")), /*#__PURE__*/React.createElement("button", {
    onClick: async () => {
      if (!supabaseCfg) return;
      setSupabaseSyncing(true);
      setDriveStatus("syncing");
      const ok = await supabaseSync(supabaseCfg, history, srDeckRef.current, usageStatsRef.current);
      setDriveStatus(ok ? "synced" : "error");
      setTimeout(() => setDriveStatus(null), 4000);
      setSupabaseSyncing(false);
    },
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "13px 14px",
      borderRadius: 12,
      background: supabaseCfg ? "#080f18" : C.surface,
      border: `1px solid ${supabaseCfg ? "#22d3ee33" : C.border}`,
      color: C.text,
      cursor: supabaseCfg ? "pointer" : "default",
      marginBottom: 9,
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "☁"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700
    }
  }, "Supabase Cloud Sync"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 1
    }
  }, supabaseCfg ? supabaseSyncing ? "Syncing…" : `${history.length} sessions · ${Object.keys(srDeckRef.current).length} SR cards · ${Object.keys(usageStatsRef.current).length} usage events${driveStatus === "synced" ? " · synced ✓" : driveStatus === "error" ? " · sync failed ✗" : " · tap to sync"}` : "Configure in quiz setup screen")), supabaseCfg && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: driveStatus === "synced" ? C.easy : driveStatus === "error" ? C.hard : "#22d3ee",
      fontWeight: 700
    }
  }, driveStatus === "synced" ? "✓" : driveStatus === "error" ? "✗" : "↑")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setSettingsOpen(false);
      setScreen("backup");
    },
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "13px 14px",
      borderRadius: 12,
      background: C.surface,
      border: `1px solid ${C.border}`,
      color: C.text,
      cursor: "pointer",
      marginBottom: 9,
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "💾"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700
    }
  }, "Backup & Restore"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 1
    }
  }, "Export JSON · import on another device"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      textAlign: "center",
      marginTop: 6
    }
  }, history.length, " sessions saved locally", sessionSaved === false && /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.hard
    }
  }, " · ⚠ last save failed")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
      boxShadow: `0 4px 12px ${C.accent}55`
    }
  }, "⚡"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      letterSpacing: "-0.3px",
      color: C.text
    }
  }, "ClearCFA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.muted,
      marginTop: 1
    }
  }, "Complete CFA L1 Prep")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      color: daysLeft < 30 ? C.hard : daysLeft < 60 ? C.medium : C.accentLight,
      lineHeight: 1
    }
  }, daysLeft), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: C.muted,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      marginTop: 2
    }
  }, "days to exam")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      trackUsage("settings");
      setSettingsOpen(true);
    },
    style: {
      marginTop: 4,
      width: 32,
      height: 32,
      borderRadius: 9,
      background: C.surface,
      border: `1px solid ${C.border}`,
      color: C.muted,
      cursor: "pointer",
      fontSize: 15,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, "⚙"))), studyPace?.burnoutRisk ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.easy,
      textAlign: "center",
      padding: "5px 0",
      fontStyle: "italic",
      opacity: 0.9
    }
  }, "Welcome back. Every session counts — even 5 minutes. 💪") : /*#__PURE__*/React.createElement(MotivationalBanner, {
    daysLeft: daysLeft
  })), history.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(XPBar, {
    level: levelInfo.level,
    progress: levelInfo.progress,
    label: levelInfo.label,
    xp: levelInfo.xp,
    nextXP: levelInfo.nextXP
  })), !historyLoaded ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gap: 8,
      marginBottom: 14
    }
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement(Skeleton, {
    key: i,
    height: 68,
    radius: 11
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Sessions",
    value: history.length || "–",
    icon: "📚"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Avg Score",
    value: overallPct ? `${overallPct}%` : "–",
    color: overallPct ? overallPct >= 70 ? C.easy : C.hard : C.muted,
    icon: "🎯"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Predicted",
    value: predicted ? `${predicted.low}–${predicted.high}%` : "–",
    color: predicted ? predicted.score >= 70 ? C.easy : C.hard : C.muted,
    sub: predicted ? `${predicted.confidence}% conf` : null,
    onClick: () => setScreen("readiness"),
    icon: "📈"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "XP",
    value: totalXP > 0 ? totalXP.toLocaleString() : "–",
    color: C.reward,
    sub: levelInfo.label,
    icon: "⭐"
  })), studyPace?.burnoutRisk && /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg,${C.easy}12,${C.easy}06)`,
      border: `1px solid ${C.easy}33`,
      borderRadius: 12,
      padding: "14px 16px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.easyLight,
      marginBottom: 4
    }
  }, "👋 ", studyPace.daysSinceLastSession === 1 ? "Yesterday" : `${studyPace.daysSinceLastSession} days`, " since your last session"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 10,
      lineHeight: 1.5
    }
  }, "No pressure. Start with just 5 questions — that's all. The habit matters more than the volume right now."), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      // Find easiest entry point — best-performing topic at Easy
      const best = moduleReadiness.filter(m => m.sessions > 0).sort((a, b) => b.accuracy - a.accuracy)[0];
      const target = best || moduleReadiness.find(m => m.sessions === 0);
      if (target) generateQuestions(target.topic, target.modulesCovered[0] || target.modules[0], "Easy", 5, "guided");
    },
    style: {
      fontSize: 13,
      fontWeight: 700,
      padding: "9px 18px",
      borderRadius: 9,
      background: `linear-gradient(135deg,${C.easy},#059669)`,
      color: "#fff",
      border: "none",
      cursor: "pointer"
    }
  }, "Ease back in — 5 questions →")), daysLeft <= 14 && daysLeft > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg,${C.hard}18,${C.hard}08)`,
      border: `1px solid ${C.hard}55`,
      borderRadius: 12,
      padding: "13px 16px",
      marginBottom: 12,
      animation: "glow 2s ease infinite"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: C.hard,
      marginBottom: 4
    }
  }, "🚨 Final ", daysLeft, " days — High-Weight Only"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginBottom: 10,
      lineHeight: 1.5
    }
  }, "Focus exclusively on Ethics (15%), FSA (13%), Equity (11%), Fixed Income (11%). These 4 topics are 50% of the exam."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 7,
      flexWrap: "wrap"
    }
  }, [["Ethics", "Code of Ethics & Standards"], ["Financial Statement Analysis", "Financial Ratios"], ["Fixed Income", "Yield Measures & Duration"], ["Equity", "Equity Valuation – DDM & Multiples"]].map(([t, m]) => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => generateQuestions(t, m, "Hard", 10, "guided"),
    style: {
      fontSize: 11,
      fontWeight: 700,
      padding: "5px 10px",
      borderRadius: 7,
      background: C.hard + "22",
      border: `1px solid ${C.hard}44`,
      color: C.hard,
      cursor: "pointer"
    }
  }, t.split(" ")[0], " Hard →")))), streak > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(StreakFlame, {
    streak: streak
  })), (forgettingCurve.tomorrow > 0 || forgettingCurve.in3days > 0 || forgettingCurve.in7days > 0) && /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 11,
      padding: "10px 14px",
      marginBottom: 10,
      display: "flex",
      gap: 4,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginRight: 4
    }
  }, "SR forecast:"), forgettingCurve.tomorrow > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      background: C.hard + "18",
      color: C.hard,
      padding: "2px 8px",
      borderRadius: 6,
      fontWeight: 700
    }
  }, forgettingCurve.tomorrow, " tomorrow"), forgettingCurve.in3days > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      background: C.medium + "18",
      color: C.medium,
      padding: "2px 8px",
      borderRadius: 6,
      fontWeight: 700
    }
  }, forgettingCurve.in3days, " in 3d"), forgettingCurve.in7days > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      background: C.easy + "18",
      color: C.easy,
      padding: "2px 8px",
      borderRadius: 6,
      fontWeight: 700
    }
  }, forgettingCurve.in7days, " in 7d")), leeches.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg,#1c0508,#12030a)`,
      border: `1px solid ${C.hard}44`,
      borderRadius: 12,
      padding: "12px 16px",
      marginBottom: 10,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.hard
    }
  }, "⚠ ", leeches.length, " leech card", leeches.length !== 1 ? "s" : ""), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 2
    }
  }, "Missed 4+ times — your real blind spots")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      trackUsage("leech_review");
      setSrQueue([...leeches].sort((a, b) => (b.wrongCount || 0) - (a.wrongCount || 0)).slice(0, 20));
      setSrIdx(0);
      setSrAnswer(null);
      setScreen("srReview");
    },
    style: {
      fontSize: 11,
      fontWeight: 700,
      padding: "6px 12px",
      borderRadius: 8,
      background: C.hard + "25",
      border: `1px solid ${C.hard}55`,
      color: C.hard,
      cursor: "pointer",
      flexShrink: 0
    }
  }, "Review Now")), dueCards.length > 0 && /*#__PURE__*/React.createElement("div", {
    onClick: () => {
      trackUsage("sr_review");
      setSrQueue([...dueCards].sort((a, b) => (b.wrongCount || 0) - (a.wrongCount || 0)).slice(0, 20));
      setSrIdx(0);
      setSrAnswer(null);
      setScreen("srReview");
    },
    style: {
      background: `linear-gradient(135deg,${C.accent}15,${C.accent}08)`,
      border: `1px solid ${C.accent}44`,
      borderRadius: 12,
      padding: "12px 16px",
      marginBottom: 10,
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      animation: "glow 3s ease infinite"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.accentLight
    }
  }, "📋 ", dueCards.length, " card", dueCards.length !== 1 ? "s" : "", " due for review"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 2
    }
  }, "SM-2 spaced repetition · tap to start")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      color: C.accent,
      fontWeight: 700
    }
  }, "→")), autoEscalation && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: C.easy + "0d",
      border: `1px solid ${C.easy}33`,
      borderRadius: 10,
      padding: "9px 13px",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: C.easyLight
    }
  }, "↑ Ready to level up · ", autoEscalation.subtopic, " → ", autoEscalation.to), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      generateQuestions(autoEscalation.topic, autoEscalation.subtopic, autoEscalation.to, 10);
      setAutoEscalation(null);
    },
    style: {
      fontSize: 11,
      fontWeight: 700,
      padding: "4px 10px",
      borderRadius: 7,
      background: C.easy + "25",
      border: `1px solid ${C.easy}44`,
      color: C.easyLight,
      cursor: "pointer"
    }
  }, "Start"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setAutoEscalation(null),
    style: {
      fontSize: 11,
      padding: "4px 7px",
      borderRadius: 7,
      background: "none",
      border: `1px solid ${C.border}`,
      color: C.muted,
      cursor: "pointer"
    }
  }, "✕"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: "16px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: C.text
    }
  }, "🎯 Today's Focus"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 2
    }
  }, "AI-powered · LOS gaps · SR · leeches")), !focusLoading && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      trackUsage("daily_focus");
      generateFocus();
    },
    style: {
      fontSize: 11,
      fontWeight: 700,
      padding: "5px 12px",
      borderRadius: 8,
      background: C.accent + "22",
      border: `1px solid ${C.accent}44`,
      color: C.accentLight,
      cursor: "pointer"
    }
  }, focusSuggestions ? "Refresh" : "Generate")), focusLoading && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 9
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement(Skeleton, {
    key: i,
    height: 72,
    radius: 10
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      textAlign: "center",
      animation: "pulse 1.5s infinite"
    }
  }, "Analysing history + LOS gaps + SR deck…")), focusError && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.hard,
      padding: "10px",
      background: C.errorBg,
      borderRadius: 8
    }
  }, focusError), !focusLoading && !focusSuggestions && !focusError && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "14px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      marginBottom: 8
    }
  }, "🤖"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.muted,
      lineHeight: 1.6
    }
  }, "Claude analyses your accuracy trends, SR due cards, leech cards, and LOS coverage gaps to recommend what to drill today.")), focusSuggestions && !focusLoading && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, focusSuggestions.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: () => setSelectedFocus(selectedFocus === i ? null : i),
    style: {
      border: `1.5px solid ${selectedFocus === i ? urgencyColor[s.urgency] : C.border}`,
      borderRadius: 12,
      padding: "13px 14px",
      cursor: "pointer",
      background: selectedFocus === i ? urgencyColor[s.urgency] + "12" : C.surfaceHigh,
      transition: "all 0.15s",
      animation: selectedFocus === i ? "fadeInScale 0.15s ease" : undefined
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.text
    }
  }, s.module), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 1
    }
  }, s.topic)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      flexShrink: 0,
      marginLeft: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    color: urgencyColor[s.urgency]
  }, s.urgency), /*#__PURE__*/React.createElement(Badge, {
    color: diffC[s.difficulty]
  }, s.difficulty))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.textMid,
      lineHeight: 1.55,
      marginBottom: selectedFocus === i ? 12 : 0
    }
  }, s.reason), selectedFocus === i && /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 8
    }
  }, [5, 10, 15].map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    onClick: e => {
      e.stopPropagation();
      setFocusCount(n);
    },
    style: {
      flex: 1,
      padding: "6px 0",
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      border: focusCount === n ? `1.5px solid ${C.accent}` : `1.5px solid ${C.border}`,
      background: focusCount === n ? C.accent + "22" : C.surface,
      color: focusCount === n ? C.accentLight : C.muted,
      transition: "all 0.15s"
    }
  }, n, " Qs"))), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      generateQuestions(s.topic, s.module, s.difficulty, focusCount, s.mode || "guided");
    },
    style: {
      width: "100%",
      padding: "11px",
      borderRadius: 9,
      fontSize: 13,
      fontWeight: 700,
      background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
      color: "#fff",
      border: "none",
      cursor: "pointer",
      boxShadow: `0 4px 12px ${C.accent}44`
    }
  }, "Start ", focusCount, " Questions →")))))), (() => {
    const omSessions = history.filter(h => h.isOfficeMode);
    const omStreak = (() => {
      let s = 0,
        d = new Date();
      for (let i = 0; i < 30; i++) {
        const k = new Date(d - i * 86400000).toISOString().slice(0, 10);
        if (omSessions.some(h => h.dateKey === k)) s++;else if (i > 0) break;
      }
      return s;
    })();
    const diffColor = adaptiveOmDifficulty === "Hard" ? C.hard : adaptiveOmDifficulty === "Easy" ? C.easy : C.medium;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: `linear-gradient(135deg,${C.accent}18,${C.accent}08)`,
        border: `1px solid ${C.accent}44`,
        borderRadius: 14,
        padding: "14px 16px",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 800,
        color: C.accentLight
      }
    }, "⚡ Office Mode"), omStreak > 1 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        background: C.reward + "22",
        color: C.rewardLight,
        padding: "2px 7px",
        borderRadius: 5,
        fontWeight: 700
      }
    }, "🔥 ", omStreak, "d streak")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        marginTop: 3
      }
    }, "AI picks your weakest topic · ", omQCount, " Qs · ~", omQCount * 1.5 | 0, " min", omSessions.length > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 6,
        color: diffColor,
        fontWeight: 600
      }
    }, "· ", adaptiveOmDifficulty, " (your form)"))), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        trackUsage("office_mode");
        setOmMode(true);
        const weak = moduleReadiness.filter(m => m.sessions === 0 && m.weight >= 9)[0] || moduleReadiness.filter(m => m.accuracy !== null).sort((a, b) => a.accuracy - b.accuracy)[0] || moduleReadiness[0];
        generateQuestions(weak.topic, weak.untouchedModules?.[0] || weak.modules[0], adaptiveOmDifficulty, omQCount, "guided");
      },
      style: {
        fontSize: 14,
        fontWeight: 800,
        padding: "10px 20px",
        borderRadius: 10,
        background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
        color: "#fff",
        border: "none",
        cursor: "pointer",
        boxShadow: `0 4px 16px ${C.accent}55`,
        flexShrink: 0,
        marginLeft: 10
      }
    }, "Start →")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6
      }
    }, [{
      n: 3,
      label: "3 Qs · ~5 min"
    }, {
      n: 5,
      label: "5 Qs · ~8 min"
    }, {
      n: 10,
      label: "10 Qs · ~15 min"
    }].map(({
      n,
      label
    }) => /*#__PURE__*/React.createElement("button", {
      key: n,
      onClick: () => {
        setOmQCount(n);
        try {
          localStorage.setItem("cfa_om_count", String(n));
        } catch {}
      },
      style: {
        flex: 1,
        padding: "6px 4px",
        borderRadius: 8,
        fontSize: 11,
        fontWeight: 700,
        background: omQCount === n ? C.accent + "33" : "transparent",
        border: `1px solid ${omQCount === n ? C.accent + "88" : C.border}`,
        color: omQCount === n ? C.accentLight : C.muted,
        cursor: "pointer",
        transition: "all 0.15s"
      }
    }, label))));
  })(), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      trackUsage("custom_mock");
      setScreen("setup");
    },
    style: {
      flex: 1,
      padding: "11px",
      borderRadius: 11,
      fontSize: 12,
      fontWeight: 700,
      background: C.surface,
      border: `1px solid ${C.border}`,
      color: C.textMid,
      cursor: "pointer"
    }
  }, "Custom Mock"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      trackUsage("fix_weakest");
      const byReadiness = moduleReadiness.filter(m => m.weight >= 8).sort((a, b) => {
        if (a.accuracy === null && b.accuracy === null) return b.weight - a.weight;
        if (a.accuracy === null) return -1;
        if (b.accuracy === null) return 1;
        return a.accuracy - b.accuracy;
      });
      const target = byReadiness[0] || moduleReadiness[0];
      const mod = target.untouchedModules?.[0] || target.modules?.[0];
      if (target && mod) generateQuestions(target.topic, mod, "Medium", 10, "guided");
    },
    style: {
      flex: 1,
      padding: "11px",
      borderRadius: 11,
      fontSize: 12,
      fontWeight: 700,
      background: C.hard + "18",
      border: `1px solid ${C.hard}44`,
      color: C.hard,
      cursor: "pointer"
    }
  }, "🎯 Fix Weakest"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      trackUsage("wrongs_review");
      const wrongCards = Object.values(srDeck).filter(c => (c.wrongCount || 0) > 0).sort((a, b) => (b.wrongCount || 0) - (a.wrongCount || 0)).slice(0, 30);
      if (wrongCards.length) {
        setSrQueue(wrongCards);
        setSrIdx(0);
        setSrAnswer(null);
        setScreen("srReview");
      } else {
        setError("No wrong answers in SR deck yet — complete a session first.");
        setTimeout(() => setError(""), 3000);
      }
    },
    style: {
      flex: 1,
      padding: "11px",
      borderRadius: 11,
      fontSize: 12,
      fontWeight: 600,
      background: C.surface,
      border: `1px solid ${srWrongCount > 0 ? C.hard + "44" : C.border}`,
      color: srWrongCount > 0 ? C.hard : C.muted,
      cursor: "pointer",
      position: "relative"
    }
  }, "🔁 Wrongs", srWrongCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -5,
      right: -5,
      width: 16,
      height: 16,
      borderRadius: "50%",
      background: C.hard,
      color: "#fff",
      fontSize: 9,
      fontWeight: 800,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, Math.min(srWrongCount, 99)))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (luckyDipSpinning) return;
      trackUsage("lucky_dip");
      setLuckyDipSpinning(true);
      const allTopics = Object.keys(LOS);
      let count = 0;
      const spin = () => {
        const t = allTopics[Math.floor(Math.random() * allTopics.length)];
        setLuckyDipLabel(t);
        count++;
        if (count < 9) {
          setTimeout(spin, 80 + count * 55);
        } else {
          setTimeout(() => {
            setLuckyDipSpinning(false);
            const mods = Object.keys(LOS[t].modules || {});
            const m = mods[Math.floor(Math.random() * mods.length)];
            generateQuestions(t, m, "Medium", 10, "guided");
          }, 600);
        }
      };
      spin();
    },
    style: {
      width: "100%",
      marginBottom: 12,
      padding: "12px",
      borderRadius: 11,
      fontSize: 13,
      fontWeight: 700,
      background: luckyDipSpinning ? "#1a1a2e" : `linear-gradient(135deg,#7c3aed22,#6366f118)`,
      border: `1px solid ${luckyDipSpinning ? "#7c3aed88" : "#6366f144"}`,
      color: luckyDipSpinning ? "#a78bfa" : C.textMid,
      cursor: luckyDipSpinning ? "default" : "pointer",
      transition: "all 0.15s",
      letterSpacing: luckyDipSpinning ? 0.3 : 0,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis"
    }
  }, luckyDipSpinning ? `🎲 ${luckyDipLabel}` : "🎲 Lucky Dip — Surprise me!"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "11px 14px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: "0.08em",
      textTransform: "uppercase"
    }
  }, "30-Day Activity"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: C.muted
    }
  }, totalQsAttempted, " Qs · ", Object.keys(qdb).length, " unique", totalWrongs > 0 ? ` · ` + totalWrongs + ` wrong` : "")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3,
      flexWrap: "wrap"
    }
  }, Object.entries(activity).reverse().map(([date, cnt]) => {
    const bg = cnt === 0 ? C.border : cnt === 1 ? "#2d1f6e" : cnt === 2 ? "#4a35b0" : C.accent;
    return /*#__PURE__*/React.createElement("div", {
      key: date,
      title: `${date}: ${cnt} session${cnt !== 1 ? "s" : ""}`,
      style: {
        width: 14,
        height: 14,
        borderRadius: 3,
        background: bg,
        transition: "background 0.2s"
      }
    });
  }))), (() => {
    const moreItems = [{
      key: "mix",
      label: "🎲 Mix",
      style: {
        background: C.surfaceHigh,
        border: `1px solid ${C.medium}44`,
        color: C.medium
      },
      action: () => {
        trackUsage("mix");
        const weakModules = moduleReadiness.filter(m => m.sessions > 0).sort((a, b) => a.accuracy - b.accuracy).slice(0, 3);
        const target = weakModules[0] || moduleReadiness.find(m => m.sessions === 0) || moduleReadiness[0];
        if (target) generateQuestions(target.topic, target.modulesCovered?.[0] || target.modules[0], "Medium", 10, "guided");
      }
    }, {
      key: "vignette",
      label: "📖 Vignette",
      style: {
        background: C.surfaceHigh,
        border: `1px solid ${C.accentLight}33`,
        color: C.accentLight
      },
      action: () => {
        trackUsage("vignette");
        setVignetteMode(true);
        setScreen("setup");
      }
    }, {
      key: "full_exam",
      label: "🎓 Full Exam",
      style: {
        background: C.surfaceHigh,
        border: `1px solid ${C.accentLight}33`,
        color: C.accentLight
      },
      action: () => {
        trackUsage("full_exam");
        startFullExam();
      }
    }, {
      key: "ethics",
      label: "⚖️ Ethics",
      style: {
        background: "#0a0820",
        border: `1px solid ${C.hard}44`,
        color: C.hard
      },
      action: () => {
        trackUsage("ethics");
        const cases = getEthicsCases("all", 10);
        if (cases.length) {
          setTopic("Ethics");
          setSubtopic("Ethics Case Studies");
          setDifficulty("Medium");
          setCount(cases.length);
          setMode("guided");
          setQuestions(cases);
          setAnswers({});
          setCurrentQ(0);
          setShowExp(false);
          setLastSession(null);
          setFullExamMode(false);
          setVignetteMode(false);
          setScreen("quiz");
        }
      }
    }, {
      key: "ai_coach",
      label: "🤖 Coach",
      style: {
        background: "#0a1a20",
        border: `1px solid #22d3ee44`,
        color: "#22d3ee"
      },
      action: () => {
        trackUsage("ai_coach");
        setAiCoachScreen(true);
      }
    }, {
      key: "readiness",
      label: "📊 Readiness",
      style: {
        background: C.surface,
        border: `1px solid ${C.border}`,
        color: C.textMid
      },
      action: () => {
        trackUsage("readiness");
        setScreen("readiness");
      }
    }, {
      key: "dashboard",
      label: "📈 Dashboard",
      style: {
        background: C.surface,
        border: `1px solid ${C.border}`,
        color: C.textMid
      },
      action: () => {
        trackUsage("dashboard");
        setScreen("dashboard");
      }
    }, {
      key: "pass_pct",
      label: passProbability ? `${passProbability.probability}% Pass` : "Pass %",
      style: {
        background: passProbability ? `${passProbability.color}18` : C.surface,
        border: `1px solid ${passProbability ? passProbability.color + "44" : C.border}`,
        color: passProbability ? passProbability.color : C.muted
      },
      action: () => {
        trackUsage("pass_pct");
        setScreen("passProbability");
      }
    }, {
      key: "revise",
      label: "📚 Revise",
      style: {
        background: C.accent + "18",
        border: `1px solid ${C.accent}44`,
        color: C.accentLight
      },
      action: () => {
        trackUsage("revise");
        setRevisionTopic(null);
        setRevisionTab("notes");
        setScreen("revision");
      }
    }, {
      key: "formulas",
      label: "🔢 Formulas",
      style: {
        background: C.reward + "15",
        border: `1px solid ${C.reward}44`,
        color: C.rewardLight
      },
      action: () => {
        trackUsage("formulas");
        setFormulaDrillMode(true);
        setFormulaDrillIdx(0);
        setFormulaFlipped(false);
        setRevisionTopic(null);
        setRevisionTab("formulas");
        setScreen("revision");
      }
    }, {
      key: "week_plan",
      label: "🗓 Week Plan",
      style: {
        background: C.surface,
        border: `1px solid ${C.border}`,
        color: C.textMid
      },
      action: () => {
        trackUsage("week_plan");
        setWeeklyPlanScreen(true);
      }
    }, {
      key: "sr_review",
      label: `📋 SR${dueCards.length > 0 ? " (" + dueCards.length + ")" : ""}`,
      style: {
        background: dueCards.length > 0 ? C.accent + "15" : C.surface,
        border: `1px solid ${dueCards.length > 0 ? C.accent + "44" : C.border}`,
        color: dueCards.length > 0 ? C.accentLight : C.muted
      },
      action: () => {
        trackUsage("sr_review");
        if (dueCards.length > 0) {
          setSrQueue([...dueCards].sort((a, b) => (b.wrongCount || 0) - (a.wrongCount || 0)).slice(0, 20));
          setSrIdx(0);
          setSrAnswer(null);
          setScreen("srReview");
        }
      }
    }, {
      key: "learn",
      label: "📖 Learn",
      style: {
        background: C.surface,
        border: `1px solid ${C.border}`,
        color: C.textMid
      },
      action: () => {
        trackUsage("learn");
        setWalkthroughTopic(Object.keys(LOS)[0]);
        setWalkthroughModule(Object.keys(LOS[Object.keys(LOS)[0]].modules || {})[0] || "");
        setWalkthroughText(null);
        setWalkthroughError("");
        setScreen("walkthrough");
      }
    }, {
      key: "fsa_vignette",
      label: "📊 FSA Statement",
      style: {
        background: C.surface,
        border: `1px solid ${C.border}`,
        color: C.textMid
      },
      action: () => {
        trackUsage("fsa_vignette");
        setFsaVignetteOpen(true);
      }
    }, {
      key: "calc_trainer",
      label: "🔢 Calc Trainer",
      style: {
        background: C.surface,
        border: `1px solid ${C.border}`,
        color: C.textMid
      },
      action: () => {
        trackUsage("calc_trainer");
        setCalcProblem(null);
        setCalcSteps([]);
        setCalcInputs({});
        setCalcChecked({});
        setCalcError("");
        setScreen("calcTrainer");
      }
    }, {
      key: "study_plan",
      label: "📅 2-Month Plan",
      style: {
        background: C.surface,
        border: `1px solid ${C.border}`,
        color: C.textMid
      },
      action: () => {
        trackUsage("study_plan");
        const plan = generateStudyPlan(history, srDeck, examDate, daysLeft);
        setStudyPlanData(plan);
        setScreen("studyPlan");
      }
    }, {
      key: "cross_vignette",
      label: "🔀 Cross Vignette",
      style: {
        background: C.surface,
        border: `1px solid ${C.border}`,
        color: C.textMid
      },
      action: () => {
        trackUsage("cross_vignette");
        const pairs = getRelatedModules("Financial Statement Analysis");
        setCrossVignetteTopic("Financial Statement Analysis");
        setCrossVignetteModule1(pairs[0]?.[0] || "");
        setCrossVignetteModule2(pairs[0]?.[1] || "");
        setCrossVignetteOpen(true);
      }
    }].sort((a, b) => (usageStats[b.key]?.count || 0) - (usageStats[a.key]?.count || 0));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        trackUsage("more_toggle");
        setShowMoreActions(v => !v);
      },
      style: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 14px",
        borderRadius: 11,
        background: C.surface,
        border: `1px solid ${C.border}`,
        color: C.muted,
        cursor: "pointer",
        marginBottom: showMoreActions ? 8 : 0,
        fontSize: 12,
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement("span", null, "More", !showMoreActions && usageStats && Object.keys(usageStats).length > 0 ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.muted,
        marginLeft: 6,
        fontWeight: 400
      }
    }, "· sorted by your usage") : ""), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        transition: "transform 0.2s",
        display: "inline-block",
        transform: showMoreActions ? "rotate(180deg)" : "none"
      }
    }, "▾")), showMoreActions && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 8,
        marginBottom: 9
      }
    }, moreItems.map(item => /*#__PURE__*/React.createElement("button", {
      key: item.key,
      onClick: item.action,
      style: {
        padding: "11px 8px",
        borderRadius: 11,
        fontSize: 12,
        fontWeight: item.key === "pass_pct" ? 700 : 600,
        ...item.style,
        cursor: "pointer"
      }
    }, item.label))));
  })(), error && /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.errorBg,
      border: `1px solid ${C.hard}44`,
      borderRadius: 9,
      padding: "12px",
      color: "#fca5a5",
      fontSize: 13,
      marginTop: 9,
      animation: "fadeIn 0.2s ease"
    }
  }, error), historyLoaded && history.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "13px 16px",
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: C.muted,
      marginBottom: 8
    }
  }, "No sessions found · Storage scan"), storageKeys === null ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      animation: "pulse 1.5s infinite"
    }
  }, "Scanning storage…") : /*#__PURE__*/React.createElement("div", null, storageKeys.filter(k => k.found).length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted
    }
  }, "Scanned ", storageKeys.length, " keys — no session data found in storage. Your session may have been saved in a different browser session or the data has expired.") : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.easy,
      marginBottom: 8
    }
  }, "Found data in ", storageKeys.filter(k => k.found).length, " key(s):"), storageKeys.filter(k => k.found).map(k => /*#__PURE__*/React.createElement("div", {
    key: k.key,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.textMid,
      fontFamily: "monospace"
    }
  }, k.key, " (", k.count, " sessions)"), /*#__PURE__*/React.createElement("button", {
    onClick: async () => {
      const val = await storageGet(k.key);
      if (Array.isArray(val) && val.length > 0) {
        setHistory(val);
        await storageSet(STORAGE_KEY, val);
        setStorageKeys(null);
      }
    },
    style: {
      fontSize: 10,
      padding: "4px 10px",
      borderRadius: 6,
      background: C.easy + "22",
      border: `1px solid ${C.easy}44`,
      color: C.easyLight,
      cursor: "pointer",
      flexShrink: 0,
      marginLeft: 8
    }
  }, "Restore →"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.muted,
      marginTop: 8
    }
  }, "Keys scanned: ", storageKeys.map(k => k.key).join(", "))))), fsaVignetteOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.7)",
      zIndex: 100,
      display: "flex",
      alignItems: "flex-end"
    },
    onClick: () => setFsaVignetteOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: 480,
      margin: "0 auto",
      background: C.surface,
      borderRadius: "16px 16px 0 0",
      padding: "24px 20px 40px",
      border: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      background: C.border,
      borderRadius: 2,
      margin: "0 auto 20px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: C.text,
      marginBottom: 4
    }
  }, "📊 FSA Statement Vignette"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 16
    }
  }, "Generate a real financial statement with 3 analysis questions"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      marginBottom: 8,
      letterSpacing: "0.05em",
      textTransform: "uppercase"
    }
  }, "FSA Subtopic"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: 16
    }
  }, Object.keys(LOS["Financial Statement Analysis"]?.modules || {}).map(m => /*#__PURE__*/React.createElement("button", {
    key: m,
    onClick: () => setFsaSubtopic(m),
    style: {
      padding: "5px 10px",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      cursor: "pointer",
      border: fsaSubtopic === m ? `1.5px solid ${C.accent}` : `1.5px solid ${C.border}`,
      background: fsaSubtopic === m ? C.accent + "22" : C.dim,
      color: fsaSubtopic === m ? C.accentLight : C.muted
    }
  }, m))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      marginBottom: 8,
      letterSpacing: "0.05em",
      textTransform: "uppercase"
    }
  }, "Difficulty"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 20
    }
  }, ["Easy", "Medium", "Hard"].map(d => /*#__PURE__*/React.createElement("button", {
    key: d,
    onClick: () => setFsaDifficulty(d),
    style: {
      flex: 1,
      padding: "9px",
      borderRadius: 9,
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      border: fsaDifficulty === d ? `1.5px solid ${diffC[d]}` : `1.5px solid ${C.border}`,
      background: fsaDifficulty === d ? diffC[d] + "22" : C.dim,
      color: fsaDifficulty === d ? diffC[d] : C.muted
    }
  }, d))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setFsaVignetteOpen(false);
      generateFSAVignette(fsaSubtopic, fsaDifficulty);
    },
    style: {
      width: "100%",
      padding: "13px",
      borderRadius: 11,
      fontSize: 14,
      fontWeight: 700,
      background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
      color: "#fff",
      border: "none",
      cursor: "pointer",
      boxShadow: `0 4px 16px ${C.accent}44`
    }
  }, "Generate FSA Vignette →"))), crossVignetteOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.7)",
      zIndex: 100,
      display: "flex",
      alignItems: "flex-end"
    },
    onClick: () => setCrossVignetteOpen(false)
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: 480,
      margin: "0 auto",
      background: C.surface,
      borderRadius: "16px 16px 0 0",
      padding: "24px 20px 40px",
      border: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      background: C.border,
      borderRadius: 2,
      margin: "0 auto 20px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: C.text,
      marginBottom: 4
    }
  }, "🔀 Cross-Topic Vignette"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 16
    }
  }, "Two related subtopics in one scenario — exam style"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, "Topic"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: 14
    }
  }, Object.keys(RELATED_MODULES).map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => {
      setCrossVignetteTopic(t);
      const pairs = getRelatedModules(t);
      setCrossVignetteModule1(pairs[0]?.[0] || "");
      setCrossVignetteModule2(pairs[0]?.[1] || "");
    },
    style: {
      padding: "5px 10px",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      cursor: "pointer",
      border: crossVignetteTopic === t ? `1.5px solid ${C.accent}` : `1.5px solid ${C.border}`,
      background: crossVignetteTopic === t ? C.accent + "22" : C.dim,
      color: crossVignetteTopic === t ? C.accentLight : C.muted
    }
  }, t.split(" ")[0]))), getRelatedModules(crossVignetteTopic).length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, "Module Pair"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      marginBottom: 16
    }
  }, getRelatedModules(crossVignetteTopic).map((pair, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => {
      setCrossVignetteModule1(pair[0]);
      setCrossVignetteModule2(pair[1]);
    },
    style: {
      padding: "8px 12px",
      borderRadius: 9,
      fontSize: 11,
      fontWeight: 600,
      cursor: "pointer",
      textAlign: "left",
      border: crossVignetteModule1 === pair[0] && crossVignetteModule2 === pair[1] ? `1.5px solid ${C.accentLight}` : `1.5px solid ${C.border}`,
      background: crossVignetteModule1 === pair[0] && crossVignetteModule2 === pair[1] ? C.accentLight + "18" : C.dim,
      color: crossVignetteModule1 === pair[0] && crossVignetteModule2 === pair[1] ? C.accentLight : C.muted
    }
  }, pair[0], " + ", pair[1])))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setCrossVignetteOpen(false);
      generateQuestions(crossVignetteTopic, crossVignetteModule1, "Medium", 6, "guided", true, crossVignetteModule2);
    },
    disabled: !crossVignetteModule1 || !crossVignetteModule2,
    style: {
      width: "100%",
      padding: "13px",
      borderRadius: 11,
      fontSize: 14,
      fontWeight: 700,
      background: crossVignetteModule1 && crossVignetteModule2 ? `linear-gradient(135deg,${C.accent},${C.accentLight})` : C.dim,
      color: crossVignetteModule1 && crossVignetteModule2 ? "#fff" : C.muted,
      border: "none",
      cursor: crossVignetteModule1 && crossVignetteModule2 ? "pointer" : "not-allowed"
    }
  }, "Generate Cross Vignette →")))));

  // ══ BACKUP / RESTORE SCREEN ════════════════════════════════════════════════
  if (screen === "backup") return wrap(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 800
    }
  }, "💾 Backup & Restore"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 3
    }
  }, "Export your data before clearing browser storage")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setScreen("home");
      setImportText("");
      setImportError("");
    },
    style: {
      background: "none",
      border: "none",
      color: C.muted,
      cursor: "pointer",
      fontSize: 13
    }
  }, "← Back")), apiKey && /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.accent}33`,
      borderRadius: 12,
      padding: "14px 16px",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      marginBottom: 6
    }
  }, "☁ Google Drive Auto-Sync"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 10,
      lineHeight: 1.5
    }
  }, "Since your API key is set, every session is automatically saved to ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: C.accentLight
    }
  }, "cfa_mock_backup.json"), " in your Google Drive root folder."), /*#__PURE__*/React.createElement("button", {
    onClick: async () => {
      setDriveStatus("syncing");
      await syncToDrive(history);
    },
    style: {
      width: "100%",
      padding: "10px",
      borderRadius: 9,
      fontSize: 12,
      fontWeight: 700,
      background: C.accent + "22",
      border: `1px solid ${C.accent}44`,
      color: C.accentLight,
      cursor: "pointer"
    }
  }, driveStatus === "syncing" ? "Syncing…" : "☁ Sync to Drive Now")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "16px",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      marginBottom: 4
    }
  }, "Export your data"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 12,
      lineHeight: 1.5
    }
  }, "Copy this JSON and save it in Notes, email it to yourself, or keep it in a text file. Paste it back any time to restore."), (() => {
    const data = JSON.stringify({
      history,
      srDeck,
      savedAt: new Date().toISOString(),
      version: "v7"
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("textarea", {
      readOnly: true,
      value: data,
      onFocus: e => e.target.select(),
      style: {
        width: "100%",
        height: 90,
        background: C.dim,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "10px 12px",
        fontSize: 10,
        fontFamily: "monospace",
        color: C.textMid,
        resize: "none",
        outline: "none",
        boxSizing: "border-box",
        marginBottom: 10,
        wordBreak: "break-all"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        marginBottom: 10
      }
    }, "👆 Tap the box above to select all, then copy manually (long-press → Copy All)."), /*#__PURE__*/React.createElement("a", {
      href: "data:application/json;charset=utf-8," + encodeURIComponent(data),
      download: `clearcfa-backup-${new Date().toISOString().slice(0, 10)}.json`,
      style: {
        display: "block",
        width: "100%",
        padding: "11px",
        borderRadius: 9,
        fontSize: 13,
        fontWeight: 700,
        background: C.surface,
        border: `1px solid ${C.border}`,
        color: C.textMid,
        cursor: "pointer",
        textAlign: "center",
        textDecoration: "none",
        boxSizing: "border-box"
      }
    }, "⬇ Download JSON"));
  })(), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 8,
      textAlign: "center"
    }
  }, history.length, " sessions · ", Object.keys(srDeck).length, " SR cards · ", Object.keys(qdb).length, " Qs in dedup DB")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "16px",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      marginBottom: 4
    }
  }, "Restore from backup"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 12
    }
  }, "Paste your previously exported JSON here."), /*#__PURE__*/React.createElement("textarea", {
    value: importText,
    onChange: e => setImportText(e.target.value),
    placeholder: "Paste your backup JSON here...",
    style: {
      width: "100%",
      height: 100,
      background: C.dim,
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "10px 12px",
      fontSize: 11,
      fontFamily: "monospace",
      color: C.text,
      resize: "vertical",
      outline: "none"
    }
  }), importError && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.hard,
      marginTop: 6
    }
  }, importError), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      try {
        const parsed = JSON.parse(importText.trim());
        const h = Array.isArray(parsed) ? parsed : parsed.history || null;
        if (!h || !Array.isArray(h) || !h[0]?.topic) throw new Error("Invalid format — must be a ClearCFA backup JSON.");
        setHistory(h);
        storageSet(STORAGE_KEY, h);
        storageSet(BACKUP_KEY, {
          history: h,
          savedAt: new Date().toISOString()
        });
        if (parsed.srDeck && typeof parsed.srDeck === "object") {
          setSrDeck(parsed.srDeck);
          storageSet(SR_KEY, parsed.srDeck);
        }
        setImportText("");
        setImportError("");
        setScreen("home");
      } catch (e) {
        setImportError(e.message || "Invalid JSON — check your backup text.");
      }
    },
    disabled: !importText.trim(),
    style: {
      width: "100%",
      marginTop: 10,
      padding: "11px",
      borderRadius: 9,
      fontSize: 13,
      fontWeight: 700,
      background: importText.trim() ? `linear-gradient(135deg,${C.easy},#059669)` : C.dim,
      color: importText.trim() ? "#fff" : C.muted,
      border: "none",
      cursor: importText.trim() ? "pointer" : "not-allowed"
    }
  }, "Restore Sessions")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "14px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      marginBottom: 8
    }
  }, "Storage health"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: storageOk === true ? C.easy : storageOk === false ? C.hard : C.muted
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: storageOk === true ? C.easy : storageOk === false ? C.hard : C.muted
    }
  }, storageOk === true ? "Storage is working normally" : storageOk === false ? "Storage is failing — export your data immediately" : storageOk === null ? "Checking…" : "Unknown")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      lineHeight: 1.6
    }
  }, "Auto-backup runs after every session (saves to a secondary key). Export manually before clearing browser data or switching devices."), /*#__PURE__*/React.createElement("button", {
    onClick: async () => {
      const ok = await storageHealth();
      setStorageOk(ok);
    },
    style: {
      marginTop: 10,
      fontSize: 12,
      padding: "7px 14px",
      borderRadius: 8,
      background: C.dim,
      border: `1px solid ${C.border}`,
      color: C.muted,
      cursor: "pointer"
    }
  }, "Re-check storage"))));

  // ══ PASS PROBABILITY SCREEN ════════════════════════════════════════════════
  if (screen === "passProbability") return wrap(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 800
    }
  }, "Pass Probability"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 3
    }
  }, "Updated after every session")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen("home"),
    style: {
      background: "none",
      border: "none",
      color: C.muted,
      cursor: "pointer",
      fontSize: 13
    }
  }, "← Home")), !passProbability ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: "28px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      marginBottom: 12
    }
  }, "📊"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      marginBottom: 8
    }
  }, "Not enough data yet"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.muted,
      lineHeight: 1.6,
      marginBottom: 20
    }
  }, "Complete at least 3 sessions across different topics to unlock your pass probability estimate."), /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen("setup"),
    style: {
      padding: "12px 24px",
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 700,
      background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
      color: "#fff",
      border: "none",
      cursor: "pointer"
    }
  }, "Start a Session →")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg,${passProbability.color}18,${passProbability.color}08)`,
      border: `1px solid ${passProbability.color}44`,
      borderRadius: 16,
      padding: "28px 24px",
      textAlign: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 64,
      fontWeight: 900,
      color: passProbability.color,
      lineHeight: 1,
      marginBottom: 8
    }
  }, passProbability.probability, "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: passProbability.color,
      marginBottom: 6
    }
  }, passProbability.label === "On Track" ? "✓ On Track to Pass" : passProbability.label === "Marginal" ? "⚡ Marginal — needs work" : "⚠ At Risk — act now"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.textMid,
      lineHeight: 1.6,
      maxWidth: 360,
      margin: "0 auto"
    }
  }, passProbability.advice)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "16px",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      marginBottom: 14
    }
  }, "What's driving this number"), [{
    label: "Current accuracy (recency-weighted)",
    value: `${passProbability.currentAccuracy}%`,
    color: passProbability.currentAccuracy >= 70 ? C.easy : passProbability.currentAccuracy >= 60 ? C.medium : C.hard,
    pct: passProbability.currentAccuracy
  }, {
    label: "Curriculum coverage (% of exam weight tested)",
    value: `${passProbability.coveragePct}%`,
    color: passProbability.coveragePct >= 60 ? C.easy : passProbability.coveragePct >= 40 ? C.medium : C.hard,
    pct: passProbability.coveragePct
  }, {
    label: "Score trajectory (recent vs older sessions)",
    value: passProbability.trajectory > 0 ? `+${passProbability.trajectory}% ↑` : passProbability.trajectory < 0 ? `${passProbability.trajectory}% ↓` : "Flat →",
    color: passProbability.trajectory > 0 ? C.easy : passProbability.trajectory < 0 ? C.hard : C.muted,
    pct: Math.min(100, 50 + passProbability.trajectory * 2)
  }].map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: C.muted
    }
  }, f.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: f.color
    }
  }, f.value)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 5,
      background: C.dim,
      borderRadius: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${Math.max(2, Math.min(100, f.pct))}%`,
      background: f.color,
      borderRadius: 3,
      transition: "width 0.6s ease"
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "16px",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      marginBottom: 12
    }
  }, "To move the needle this week"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, moduleReadiness.filter(m => m.sessions === 0 && m.weight >= 9).slice(0, 3).map(m => /*#__PURE__*/React.createElement("div", {
    key: m.topic,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 12px",
      background: C.dim,
      borderRadius: 9
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: C.text
    }
  }, m.topic), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, "Untested · ", m.weight, "% of exam")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setScreen("home");
      setTimeout(() => generateQuestions(m.topic, m.modules[0], "Easy", 5, "guided"), 100);
    },
    style: {
      fontSize: 11,
      fontWeight: 700,
      padding: "5px 11px",
      borderRadius: 7,
      background: C.accent + "22",
      border: `1px solid ${C.accent}44`,
      color: C.accentLight,
      cursor: "pointer"
    }
  }, "5 Qs →"))), moduleReadiness.filter(m => m.accuracy !== null && m.accuracy < 65 && m.weight >= 8).slice(0, 2).map(m => /*#__PURE__*/React.createElement("div", {
    key: m.topic,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 12px",
      background: C.dim,
      borderRadius: 9
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: C.text
    }
  }, m.topic), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.hard
    }
  }, m.accuracy, "% accuracy · needs work")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setScreen("home");
      setTimeout(() => generateQuestions(m.topic, m.untouchedModules[0] || m.modules[0], "Medium", 5, "guided"), 100);
    },
    style: {
      fontSize: 11,
      fontWeight: 700,
      padding: "5px 11px",
      borderRadius: 7,
      background: C.hard + "22",
      border: `1px solid ${C.hard}44`,
      color: C.hard,
      cursor: "pointer"
    }
  }, "Drill →"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.dim,
      borderRadius: 10,
      padding: "12px 14px",
      fontSize: 11,
      color: C.muted,
      lineHeight: 1.6
    }
  }, "⚠ This is a directional estimate, not a guarantee. It's based on your performance on AI-generated questions, not validated CFA Institute content. Use it to guide where to focus, not as a definitive prediction."))));

  // ══ WEEKLY PLAN SCREEN ══════════════════════════════════════════════════════
  if (weeklyPlanScreen) return wrap(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 800
    }
  }, "Weekly Study Plan"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 3
    }
  }, "Built around your schedule · AI-generated")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setWeeklyPlanScreen(false),
    style: {
      background: "none",
      border: "none",
      color: C.muted,
      cursor: "pointer",
      fontSize: 13
    }
  }, "← Back")), !weeklyPlan && !weeklyPlanLoading && /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      padding: "20px",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      marginBottom: 4
    }
  }, "How many hours can you study this week?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 16,
      lineHeight: 1.5
    }
  }, "Be honest. 5 realistic hours beats 10 optimistic ones."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginBottom: 16
    }
  }, [2, 3, 5, 7, 10, 14].map(h => /*#__PURE__*/React.createElement("button", {
    key: h,
    onClick: () => setHoursThisWeek(h),
    style: {
      padding: "8px 14px",
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 700,
      border: hoursThisWeek === h ? `1.5px solid ${C.accent}` : `1.5px solid ${C.border}`,
      background: hoursThisWeek === h ? C.accent + "20" : C.surface,
      color: hoursThisWeek === h ? C.accentLight : C.muted,
      cursor: "pointer"
    }
  }, h, "h"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginBottom: 16
    }
  }, hoursThisWeek, " hours ≈ ", Math.round(hoursThisWeek * 60 / 7), " min/day average · ", Math.round(hoursThisWeek * 60 / 15), " bite-sized 15-min sessions possible"), /*#__PURE__*/React.createElement("button", {
    onClick: generateWeeklyPlan,
    style: {
      width: "100%",
      padding: "13px",
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 700,
      background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
      color: "#fff",
      border: "none",
      cursor: "pointer",
      boxShadow: `0 4px 14px ${C.accent}44`
    }
  }, "Generate My Plan →"), weeklyPlanError && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.hard,
      marginTop: 10,
      padding: "8px 12px",
      background: C.errorBg,
      borderRadius: 8
    }
  }, weeklyPlanError)), weeklyPlanLoading && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "40px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      marginBottom: 12,
      animation: "pulse 1.5s infinite"
    }
  }, "🗓"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: C.muted
    }
  }, "Building your personalised plan…"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 6,
      opacity: 0.6
    }
  }, "Analysing gaps, SR deck, and exam weight")), weeklyPlan && !weeklyPlanLoading && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg,${C.accent}18,${C.accent}08)`,
      border: `1px solid ${C.accent}33`,
      borderRadius: 12,
      padding: "14px 16px",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: C.accentLight,
      marginBottom: 4
    }
  }, weeklyPlan.headline), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted
    }
  }, weeklyPlan.totalMinutes, " min total · ", hoursThisWeek, "h available")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginBottom: 14
    }
  }, (weeklyPlan.days || []).map((day, di) => /*#__PURE__*/React.createElement("div", {
    key: di,
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: C.text,
      marginBottom: 10
    }
  }, day.day), (day.sessions || []).map((session, si) => /*#__PURE__*/React.createElement("div", {
    key: si,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: "10px 12px",
      background: C.dim,
      borderRadius: 9,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      marginRight: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: C.text
    }
  }, session.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      padding: "1px 6px",
      borderRadius: 10,
      background: session.type === "sr" ? C.accent + "22" : session.type === "review" ? C.medium + "22" : C.easy + "22",
      color: session.type === "sr" ? C.accentLight : session.type === "review" ? C.medium : C.easy,
      fontWeight: 700,
      textTransform: "uppercase"
    }
  }, session.type)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, session.module, " · ", session.durationMin, "min · ", session.count, "Q · ", session.difficulty), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      fontStyle: "italic",
      marginTop: 2
    }
  }, session.why)), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setWeeklyPlanScreen(false);
      generateQuestions(session.topic, session.module, session.difficulty, session.count, "guided");
    },
    style: {
      fontSize: 11,
      fontWeight: 700,
      padding: "6px 11px",
      borderRadius: 7,
      background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
      color: "#fff",
      border: "none",
      cursor: "pointer",
      flexShrink: 0
    }
  }, "Start"))), (!day.sessions || day.sessions.length === 0) && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      fontStyle: "italic"
    }
  }, "Rest day — review your notes")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.dim,
      borderRadius: 10,
      padding: "12px 14px",
      fontSize: 12,
      color: C.textMid,
      lineHeight: 1.6,
      marginBottom: 14,
      fontStyle: "italic"
    }
  }, "\"", weeklyPlan.keyMessage, "\""), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setWeeklyPlan(null);
      setWeeklyPlanError("");
    },
    style: {
      width: "100%",
      padding: "11px",
      borderRadius: 10,
      fontSize: 13,
      fontWeight: 600,
      background: "none",
      border: `1px solid ${C.border}`,
      color: C.muted,
      cursor: "pointer"
    }
  }, "Regenerate with different hours"))));

  // ══ SR REVIEW ═════════════════════════════════════════════════════════════
  if (screen === "srReview") {
    const card = srQueue[srIdx];
    if (!card) return wrap(/*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        paddingTop: 60
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 36,
        marginBottom: 12
      }
    }, "✅"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        marginBottom: 8
      }
    }, "SR deck cleared!"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setScreen("home"),
      style: {
        padding: "12px 28px",
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 700,
        background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
        color: "#fff",
        border: "none",
        cursor: "pointer"
      }
    }, "Home")));
    const isLeech = (card.wrongCount || 0) >= 4;
    return wrap(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: 20,
        fontWeight: 800
      }
    }, isLeech ? "⚠ Leech Review" : "Spaced Repetition"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        marginTop: 3
      }
    }, srIdx + 1, " of ", srQueue.length, isLeech ? ` · Wrong ${card.wrongCount}x` : ` · Next review: ${sm2Update(card, true).interval}d if correct`)), /*#__PURE__*/React.createElement("button", {
      onClick: () => setScreen("home"),
      style: {
        background: "none",
        border: "none",
        color: C.muted,
        cursor: "pointer",
        fontSize: 13
      }
    }, "← Home")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 3,
        background: C.border,
        borderRadius: 2,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: `${srIdx / srQueue.length * 100}%`,
        background: isLeech ? C.hard : C.accent,
        borderRadius: 2,
        transition: "width 0.3s"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 12,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      color: C.muted
    }, card.concept || card.subtopic), /*#__PURE__*/React.createElement(Badge, {
      color: C.accent
    }, card.topic), isLeech && /*#__PURE__*/React.createElement(Badge, {
      color: C.hard
    }, "Leech · ", card.wrongCount, "x wrong"), /*#__PURE__*/React.createElement(Badge, {
      color: C.muted
    }, "EF: ", (card.ef || 2.5).toFixed(1))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: "20px",
        marginBottom: 14,
        fontSize: 14,
        lineHeight: 1.8
      }
    }, card.question), !srAnswer ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginBottom: 14
      }
    }, Object.entries(card.options).map(([key, val]) => /*#__PURE__*/React.createElement("button", {
      key: key,
      onClick: () => setSrAnswer(key),
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "13px 15px",
        borderRadius: 10,
        textAlign: "left",
        background: C.surface,
        border: `1.5px solid ${C.border}`,
        color: C.text,
        cursor: "pointer",
        fontSize: 13,
        lineHeight: 1.65
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 24,
        height: 24,
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 1,
        background: C.dim,
        color: C.muted
      }
    }, key), /*#__PURE__*/React.createElement("span", null, val)))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginBottom: 14
      }
    }, Object.entries(card.options).map(([key, val]) => {
      const isCorrect = key === card.answer,
        wasPicked = key === srAnswer;
      return /*#__PURE__*/React.createElement("div", {
        key: key,
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          padding: "13px 15px",
          borderRadius: 10,
          background: isCorrect ? "#041a0e" : wasPicked && !isCorrect ? "#1a0407" : C.surface,
          border: `1.5px solid ${isCorrect ? "#22a05a" : wasPicked && !isCorrect ? C.hard : C.border}`,
          fontSize: 13,
          lineHeight: 1.65,
          color: isCorrect ? "#4ade80" : wasPicked && !isCorrect ? "#fca5a5" : C.muted
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          minWidth: 24,
          height: 24,
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 1,
          background: isCorrect ? "#22a05a" : wasPicked && !isCorrect ? C.hard : C.dim,
          color: "#fff"
        }
      }, key), /*#__PURE__*/React.createElement("span", null, val));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#09091a",
        border: `1px solid #1e1e40`,
        borderRadius: 11,
        padding: "14px",
        marginBottom: 10,
        fontSize: 13,
        color: "#a0a0c0",
        lineHeight: 1.75
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: C.muted,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: 6
      }
    }, "Explanation"), card.explanation), card.los_tested && /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.dim,
        borderRadius: 8,
        padding: "8px 12px",
        marginBottom: 10,
        fontSize: 11,
        color: C.muted
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: C.accentLight
      }
    }, "LOS: "), card.los_tested), card.misconception_targeted && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#0a0518",
        borderRadius: 8,
        padding: "8px 12px",
        marginBottom: 10,
        fontSize: 11,
        color: "#8060c0"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700
      }
    }, "Common error tested: "), card.misconception_targeted), /*#__PURE__*/React.createElement("div", {
      style: {
        background: srAnswer === card.answer ? "#041a0e" : "#1a0407",
        border: `1px solid ${srAnswer === card.answer ? "#22a05a44" : C.hard + "44"}`,
        borderRadius: 9,
        padding: "10px 14px",
        marginBottom: 12,
        fontSize: 12,
        color: srAnswer === card.answer ? C.easy : C.hard,
        fontWeight: 600
      }
    }, srAnswer === card.answer ? `✓ Correct — next review in ${sm2Update(card, true).interval} days` : `✗ Incorrect — review again tomorrow${isLeech ? " · Consider re-reading this LOS in your curriculum" : ""}`), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        const correct = srAnswer === card.answer;
        const key = Object.keys(srDeck).find(k => srDeck[k].question === card.question) || `sr_${Date.now()}`;
        setSrDeck(prev => {
          const existing = prev[key] || card;
          const updated = sm2Update(existing, correct);
          if (!correct) updated.wrongCount = (existing.wrongCount || 0) + 1;
          return {
            ...prev,
            [key]: updated
          };
        });
        setSrAnswer(null);
        if (srIdx < srQueue.length - 1) setSrIdx(i => i + 1);else setScreen("home");
      },
      style: {
        width: "100%",
        padding: "13px",
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 700,
        background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
        color: "#fff",
        border: "none",
        cursor: "pointer"
      }
    }, srIdx < srQueue.length - 1 ? "Next Card →" : "Finish Review ✓"))));
  }

  // ══ SETUP ═════════════════════════════════════════════════════════════════
  if (loading && screen === "setup") return wrap(/*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 400,
      width: "100%",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 16,
      background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 26,
      margin: "0 auto 20px"
    }
  }, "⚡"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 6
    }
  }, loadingMsg), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 28
    }
  }, loadingETA > 0 ? `About ${loadingETA}s remaining` : "Finishing up..."), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: C.border,
      borderRadius: 3,
      marginBottom: 12,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${loadingProgress}%`,
      background: `linear-gradient(90deg,${C.accent},${C.accentLight})`,
      borderRadius: 3,
      transition: "width 0.2s ease",
      boxShadow: `0 0 8px ${C.accent}88`
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.accent,
      fontWeight: 700,
      marginBottom: 24
    }
  }, loadingProgress, "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 8,
      flexWrap: "wrap"
    }
  }, ["LOS anchor", "Distractor eng.", "Deduplication", "Ready"].map((step, i) => {
    const stepPct = [0, 30, 70, 90][i];
    const done = loadingProgress >= stepPct + 20;
    const active = loadingProgress >= stepPct && !done;
    return /*#__PURE__*/React.createElement("div", {
      key: step,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 16,
        height: 16,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 9,
        fontWeight: 700,
        background: done ? "#22a05a" : active ? C.accent : C.dim,
        color: done || active ? "#fff" : C.muted,
        transition: "background 0.3s"
      }
    }, done ? "checkmark" : i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        color: done ? C.easy : active ? C.accentLight : C.muted
      }
    }, step));
  })))));
  if (screen === "setup") return wrap(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setScreen("home");
      setVignetteMode(false);
    },
    style: {
      background: "none",
      border: "none",
      color: C.muted,
      cursor: "pointer",
      fontSize: 13,
      marginBottom: 18,
      padding: 0
    }
  }, "← Back"), vignetteMode ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      marginBottom: 4,
      marginTop: 0
    }
  }, "📖 Vignette Mode"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg,${C.accentLight}15,${C.accentLight}06)`,
      border: `1px solid ${C.accentLight}33`,
      borderRadius: 10,
      padding: "10px 14px",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.accentLight,
      fontWeight: 700,
      marginBottom: 3
    }
  }, "Item-Set Format"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      lineHeight: 1.6
    }
  }, "AI generates a 100–150 word scenario (person, firm, situation) followed by 3 linked questions from the same module — matching the real CFA exam item-set format."))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      marginBottom: 4,
      marginTop: 0
    }
  }, "Custom Mock"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 18
    }
  }, "Questions anchored to official 2026 CFA LOS · Misconception-engineered distractors · ClearCFA")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      display: "block",
      marginBottom: 10
    }
  }, "Topic"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 7
    }
  }, Object.entries(TOPIC_MAP).map(([t, {
    weight
  }]) => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => {
      setTopic(t);
      setSubtopic("");
    },
    style: {
      padding: "7px 13px",
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 500,
      cursor: "pointer",
      border: topic === t ? `1.5px solid ${C.accent}` : `1.5px solid ${C.border}`,
      background: topic === t ? C.accent + "20" : C.surface,
      color: topic === t ? C.accentLight : C.muted
    }
  }, t, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      opacity: 0.6
    }
  }, weight, "%"))))), topic && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      display: "block",
      marginBottom: 10
    }
  }, "Module"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 7
    }
  }, TOPIC_MAP[topic].subtopics.map(m => {
    const mH = history.filter(h => h.topic === topic && h.subtopic === m);
    const mPct = mH.length ? Math.round(mH.reduce((a, h) => a + h.pct, 0) / mH.length) : null;
    const losCount = LOS[topic]?.modules[m]?.length || 0;
    const losM = getLOSMastery(history, topic, m);
    return /*#__PURE__*/React.createElement("button", {
      key: m,
      onClick: () => setSubtopic(m),
      style: {
        padding: "7px 13px",
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 500,
        cursor: "pointer",
        border: subtopic === m ? `1.5px solid ${C.accentLight}` : `1.5px solid ${C.border}`,
        background: subtopic === m ? C.accentLight + "18" : C.surface,
        color: subtopic === m ? C.accentLight : C.muted
      }
    }, m, /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 5,
        fontSize: 10,
        opacity: 0.55
      }
    }, losCount, " LOS"), mPct !== null && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 4,
        fontSize: 10,
        color: mPct >= 70 ? C.easy : mPct >= 50 ? C.medium : C.hard
      }
    }, mPct, "%"), losM.untested > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 4,
        fontSize: 10,
        color: C.muted
      }
    }, "(", losM.untested, " untested)"));
  })), subtopic && LOS[topic]?.modules[subtopic] && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      background: "#0a0a18",
      border: `1px solid ${C.border}`,
      borderRadius: 9,
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      marginBottom: 8
    }
  }, "LOS for this module (", LOS[topic].modules[subtopic].length, " statements)"), LOS[topic].modules[subtopic].map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: 11,
      color: "#7070a0",
      lineHeight: 1.6,
      marginBottom: 4,
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.accent,
      flexShrink: 0,
      fontWeight: 700
    }
  }, "·"), /*#__PURE__*/React.createElement("span", null, "…", l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      display: "block",
      marginBottom: 10
    }
  }, "Mode"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9
    }
  }, [["guided", "🧭 Guided", "Explanation + LOS tag after each answer"], ["exam", "⚡ Exam Sim", "No hints — results only at end"]].map(([val, label, desc]) => /*#__PURE__*/React.createElement("button", {
    key: val,
    onClick: () => setMode(val),
    style: {
      flex: 1,
      padding: "12px",
      borderRadius: 10,
      textAlign: "left",
      cursor: "pointer",
      border: mode === val ? `1.5px solid ${C.accent}` : `1.5px solid ${C.border}`,
      background: mode === val ? C.accent + "18" : C.surface,
      color: mode === val ? C.accentLight : C.muted
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      marginTop: 3,
      opacity: 0.65
    }
  }, desc))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      display: "block",
      marginBottom: 10
    }
  }, "Difficulty"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7
    }
  }, DIFFICULTIES.map(d => {
    const verbHint = {
      Easy: "describe/define/identify",
      Medium: "calculate/apply/contrast",
      Hard: "evaluate/analyze/formulate"
    }[d];
    return /*#__PURE__*/React.createElement("button", {
      key: d,
      onClick: () => setDifficulty(d),
      style: {
        padding: "10px 12px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        textAlign: "left",
        cursor: "pointer",
        border: difficulty === d ? `1.5px solid ${diffC[d]}` : `1.5px solid ${C.border}`,
        background: difficulty === d ? diffC[d] + "18" : C.surface,
        color: difficulty === d ? diffC[d] : C.muted
      }
    }, d, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        opacity: 0.6,
        marginTop: 2
      }
    }, verbHint));
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      display: "block",
      marginBottom: 10
    }
  }, "Questions"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 7
    }
  }, Q_COUNTS.map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    onClick: () => setCount(n),
    style: {
      padding: "10px 12px",
      borderRadius: 8,
      fontSize: 13,
      fontWeight: 700,
      textAlign: "left",
      cursor: "pointer",
      border: count === n ? `1.5px solid ${C.accent}` : `1.5px solid ${C.border}`,
      background: count === n ? C.accent + "18" : C.surface,
      color: count === n ? C.accentLight : C.muted
    }
  }, n, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 400,
      opacity: 0.55
    }
  }, " ~", Math.round(n * 1.5), "min")))))), error && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#180808",
      border: `1px solid #5a1a1a`,
      borderRadius: 9,
      padding: "12px",
      color: "#fca5a5",
      fontSize: 13,
      marginBottom: 14
    }
  }, error), /*#__PURE__*/React.createElement("button", {
    onClick: () => generateQuestions(topic, subtopic, difficulty, count, mode, vignetteMode),
    disabled: !topic || !subtopic || loading,
    style: {
      width: "100%",
      padding: "15px",
      borderRadius: 12,
      fontSize: 15,
      fontWeight: 700,
      background: topic && subtopic && !loading ? `linear-gradient(135deg,${C.accent},${C.accentLight})` : C.dim,
      color: topic && subtopic && !loading ? "#fff" : C.muted,
      border: "none",
      cursor: topic && subtopic && !loading ? "pointer" : "not-allowed",
      boxShadow: topic && subtopic && !loading ? `0 4px 20px ${C.accent}44` : "none"
    }
  }, loading ? loadingMsg : vignetteMode ? `Generate ${Math.ceil(count / 3)} Vignettes (${count} questions) →` : `Generate ${count} LOS-Anchored Questions →`), loading && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, [1, 2, 3].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    height: 13,
    style: {
      marginBottom: 10
    }
  }), /*#__PURE__*/React.createElement(Skeleton, {
    height: 10,
    width: "70%",
    style: {
      marginBottom: 8
    }
  }), [1, 2, 3].map(j => /*#__PURE__*/React.createElement(Skeleton, {
    key: j,
    height: 9,
    width: `${58 + j * 9}%`,
    style: {
      marginBottom: 6
    }
  })))))));
  // ══ QUIZ ══════════════════════════════════════════════════════════════════
  if (screen === "quiz") {
    if (!questions[currentQ]) return null;
    const q = questions[currentQ];
    const answered = answers[q.id];
    const isLast = currentQ === questions.length - 1;
    return wrap(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setExitConfirm(true),
      style: {
        background: "none",
        border: "none",
        color: C.muted,
        cursor: "pointer",
        fontSize: 13,
        padding: 0,
        flexShrink: 0
      }
    }, "← Home"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 800,
        padding: "5px 14px",
        borderRadius: 20,
        background: timeLeft < 120 ? "#180308" : C.surface,
        color: timeLeft < 120 ? C.hard : C.muted,
        border: `1px solid ${timeLeft < 120 ? C.hard + "55" : C.border}`,
        transition: "all 0.3s"
      }
    }, "⏱ ", fmt(timeLeft)), (() => {
      const idealLeft = (questions.length - currentQ) * 90;
      const paceRatio = timeLeft / Math.max(1, idealLeft);
      const paceCol = paceRatio > 1.1 ? C.easy : paceRatio > 0.8 ? C.medium : C.hard;
      const paceLabel = paceRatio > 1.1 ? "On pace" : paceRatio > 0.8 ? "Watch pace" : "Speed up";
      return timeLeft > 0 && questions.length > 1 ? /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          color: paceCol,
          fontWeight: 700,
          padding: "3px 7px",
          borderRadius: 6,
          background: paceCol + "18"
        }
      }, paceLabel) : null;
    })()), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: C.muted
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.accentLight,
        fontWeight: 800
      }
    }, currentQ + 1), "/", questions.length), /*#__PURE__*/React.createElement(Badge, {
      color: diffC[difficulty]
    }, difficulty))), exitConfirm && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#12101a",
        border: `1px solid ${C.hard}44`,
        borderRadius: 12,
        padding: "16px",
        marginBottom: 14,
        animation: "fadeIn 0.15s ease"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        marginBottom: 6
      }
    }, "Exit session?"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        marginBottom: 12
      }
    }, "Progress will be lost. SR deck won't update for this session."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 9
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setExitConfirm(false),
      style: {
        flex: 1,
        padding: "9px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        background: C.surface,
        border: `1px solid ${C.border}`,
        color: C.muted,
        cursor: "pointer"
      }
    }, "Continue"), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        clearInterval(timerRef.current);
        setExitConfirm(false);
        setScreen("home");
        setFocusSuggestions(null);
      },
      style: {
        flex: 1,
        padding: "9px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 700,
        background: "#400010",
        border: `1px solid ${C.hard}44`,
        color: C.hard,
        cursor: "pointer"
      }
    }, "Exit"))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 3,
        background: C.border,
        borderRadius: 2,
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: `${currentQ / questions.length * 100}%`,
        background: `linear-gradient(90deg,${C.accent},${C.accentLight})`,
        borderRadius: 2,
        transition: "width 0.35s"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 12,
        flexWrap: "wrap"
      }
    }, q.concept && /*#__PURE__*/React.createElement(Badge, {
      color: C.muted
    }, q.concept), /*#__PURE__*/React.createElement(Badge, {
      color: C.accent + "cc"
    }, q._subtopic || subtopic), q._isEthicsCase && /*#__PURE__*/React.createElement(Badge, {
      color: C.hard
    }, "CFA Institute Case")), q._isEthicsCase && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.muted,
        marginBottom: 8,
        fontStyle: "italic"
      }
    }, "© 2019 CFA Institute. Ethics in Practice Casebook. Used with attribution for non-commercial study."), /*#__PURE__*/React.createElement(FormulaSheet, {
      topic: topic
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 13,
        padding: "20px 22px",
        marginBottom: 14,
        fontSize: 14,
        lineHeight: 1.8
      }
    }, q.question), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginBottom: 16
      }
    }, Object.entries(q.options).map(([key, val]) => {
      const sel = answered === key,
        correct = key === q.answer,
        reveal = !!answered && mode === "guided";
      let bg = C.surface,
        border = C.border,
        col = C.text;
      if (reveal && correct) {
        bg = "#041a0e";
        border = "#22a05a";
        col = "#4ade80";
      } else if (reveal && sel && !correct) {
        bg = "#1a0407";
        border = C.hard;
        col = "#fca5a5";
      }
      return /*#__PURE__*/React.createElement("button", {
        key: key,
        onClick: () => handleAnswer(q.id, key),
        disabled: !!answered,
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: 13,
          padding: "13px 15px",
          borderRadius: 10,
          textAlign: "left",
          background: bg,
          border: `1.5px solid ${border}`,
          color: col,
          cursor: answered ? "default" : "pointer",
          fontSize: 13,
          lineHeight: 1.65,
          transition: "all 0.15s"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          minWidth: 24,
          height: 24,
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 1,
          background: reveal && correct ? "#22a05a" : reveal && sel ? C.hard : sel ? C.accent : C.dim,
          color: reveal || sel ? "#fff" : C.muted,
          transition: "all 0.15s"
        }
      }, key), /*#__PURE__*/React.createElement("span", null, val));
    })), showExp && mode === "guided" && answered && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#09091a",
        border: `1px solid #1e1e40`,
        borderRadius: 11,
        padding: "15px",
        marginBottom: 12,
        fontSize: 13,
        color: "#a0a0c0",
        lineHeight: 1.75,
        animation: "fadeIn 0.2s ease"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: C.muted,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: 7
      }
    }, "Explanation"), q.explanation, q.los_tested && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        paddingTop: 10,
        borderTop: `1px solid ${C.border}`,
        fontSize: 11,
        color: "#6060a0"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.accentLight,
        fontWeight: 700
      }
    }, "LOS tested: "), q.los_tested), q.misconception_targeted && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6,
        fontSize: 11,
        color: "#60508a"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700
      }
    }, "Distractor targets: "), q.misconception_targeted)), mode === "exam" && !answered && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        textAlign: "center",
        padding: "8px",
        animation: "pulse 2s infinite"
      }
    }, "Select an answer to continue"), answered && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginBottom: 8,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: nextQ,
      style: {
        flex: 1,
        padding: "13px",
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 700,
        background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
        color: "#fff",
        border: "none",
        cursor: "pointer"
      }
    }, isLast ? "See Results →" : "Next →"), answers[q.id] === q.answer && /*#__PURE__*/React.createElement("button", {
      onClick: () => setFlaggedQ(f => ({
        ...f,
        [q.id]: !f[q.id]
      })),
      title: "Flag for SR even though correct",
      style: {
        padding: "13px 14px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 700,
        background: flaggedQ[q.id] ? C.medium + "33" : C.surface,
        border: `1.5px solid ${flaggedQ[q.id] ? C.medium : C.border}`,
        color: flaggedQ[q.id] ? C.medium : C.muted,
        cursor: "pointer",
        flexShrink: 0
      }
    }, flaggedQ[q.id] ? "⚑ Flagged" : "⚐ Not sure")), currentQ > 2 && mode !== "exam" && /*#__PURE__*/React.createElement("button", {
      onClick: endQuiz,
      style: {
        marginTop: 9,
        width: "100%",
        padding: "9px",
        borderRadius: 10,
        fontSize: 12,
        background: "none",
        border: `1px solid ${C.border}`,
        color: C.muted,
        cursor: "pointer"
      }
    }, "End & See Results")));
  }

  // ══ RESULTS ═══════════════════════════════════════════════════════════════
  if (screen === "results") {
    const wrongs = questions.filter(q => answers[q.id] !== q.answer);
    const avgTime = questions.length ? Math.round(timeTaken / questions.length) : 0;
    const passed = sessionPct >= 70;
    const qScore = lastSessionQuality;
    return wrap(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.surface,
        border: `1px solid ${passed ? "#22a05a44" : C.hard + "44"}`,
        borderRadius: 16,
        padding: "24px 22px",
        textAlign: "center",
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(ScoreRing, {
      pct: sessionPct,
      size: 96
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        marginTop: 12,
        color: passed ? C.easy : C.hard
      }
    }, passed ? "Above Threshold ✓" : "Below Threshold — keep drilling"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        marginTop: 5
      }
    }, sessionScore, "/", questions.length, " · ", fmt(timeTaken), " · ~", avgTime, "s/q · ", subtopic, " · ", difficulty), sessionPct >= 80 && difficulty !== "Hard" && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        fontSize: 12,
        color: C.easy,
        background: C.easy + "15",
        borderRadius: 6,
        padding: "5px 10px",
        display: "inline-block"
      }
    }, "🔥 Strong — try ", difficulty === "Easy" ? "Medium" : "Hard", " next"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        fontSize: 11,
        color: sessionSaved ? C.easy : C.hard
      }
    }, sessionSaved === true ? "✓ Session saved" : sessionSaved === false ? "⚠ Storage full — tap Home → backup your data" : null), lastSession && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 800,
        color: C.rewardLight
      }
    }, "+", calcXP(lastSession), " XP"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: C.muted
      }
    }, "earned · ", levelInfo.label, " · Level ", levelInfo.level))), qScore && /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: "14px 16px",
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700
      }
    }, "Session Quality"), /*#__PURE__*/React.createElement(Badge, {
      color: qScore.quality >= 80 ? C.easy : qScore.quality >= 65 ? C.medium : C.hard
    }, qScore.label)), /*#__PURE__*/React.createElement(QualityBar, {
      quality: qScore.accuracyScore,
      label: "Accuracy",
      color: qScore.accuracyScore >= 70 ? C.easy : C.hard
    }), /*#__PURE__*/React.createElement(QualityBar, {
      quality: qScore.speedScore,
      label: "Speed (vs 90s/q)",
      color: qScore.speedScore >= 70 ? C.easy : C.medium
    }), qScore.difficultyBonus > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        marginTop: 6
      }
    }, "+", qScore.difficultyBonus, " difficulty bonus (", difficulty, " mode)"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: qScore.quality >= 80 ? C.easy : qScore.quality >= 65 ? C.medium : C.hard,
        marginTop: 8
      }
    }, "Overall quality: ", qScore.quality, "/100")), wrongs.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#0a0a1f",
        border: `1px solid ${C.accent}33`,
        borderRadius: 9,
        padding: "10px 14px",
        marginBottom: 12,
        fontSize: 12,
        color: C.muted
      }
    }, "📋 ", wrongs.length, " wrong answer", wrongs.length !== 1 ? "s" : "", " added to SR deck with LOS tags + misconception flags."), apiKey && wrongs.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#080818",
        border: `1px solid #22d3ee33`,
        borderRadius: 12,
        padding: "14px 16px",
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: "#22d3ee"
      }
    }, "🤖 AI Debrief"), !aiDebrief && /*#__PURE__*/React.createElement("button", {
      onClick: async () => {
        setAiDebriefLoading(true);
        try {
          const wrongSummary = wrongs.slice(0, 5).map(q => `- "${q.concept || q.los_tested}": got ${answers[q.id]}, correct ${q.answer}`).join("\n");
          const prompt = `You are a CFA Level 1 tutor. A student just scored ${sessionPct}% on a ${difficulty} ${subtopic} mock (${wrongs.length}/${questions.length} wrong).

Wrong answers:
${wrongSummary}

Give a 3-sentence debrief: (1) root cause of errors, (2) one specific thing to do next, (3) one honest motivational sentence. Be direct and specific, not generic. No markdown.`;
          const result = await callClaude(prompt, 400, {
            model: "claude-haiku-4-5-20251001",
            retries: 1,
            retryDelay: 2000
          });
          setAiDebrief(typeof result === "string" ? result : JSON.stringify(result));
        } catch (e) {
          setAiDebrief("Could not load debrief — check API key.");
        }
        setAiDebriefLoading(false);
      },
      style: {
        fontSize: 11,
        fontWeight: 700,
        padding: "5px 12px",
        borderRadius: 7,
        background: "#22d3ee22",
        border: "1px solid #22d3ee44",
        color: "#22d3ee",
        cursor: "pointer"
      }
    }, "Get debrief")), aiDebriefLoading && /*#__PURE__*/React.createElement(Skeleton, {
      height: 48,
      radius: 6
    }), aiDebrief && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#a0d8e8",
        lineHeight: 1.7
      }
    }, aiDebrief)), wrongs.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: C.muted,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: 10
      }
    }, "Missed (", wrongs.length, ")"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, wrongs.map(q => /*#__PURE__*/React.createElement("div", {
      key: q.id,
      style: {
        background: C.surface,
        border: `1px solid #2a1018`,
        borderRadius: 10,
        padding: "14px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: C.text,
        lineHeight: 1.6,
        marginBottom: 8
      }
    }, q.question), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted
      }
    }, "Your: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#f87171"
      }
    }, answers[q.id] || "–"), " · Correct: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.easy
      }
    }, q.answer)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#6a6a8a",
        marginTop: 8,
        lineHeight: 1.65,
        borderTop: `1px solid ${C.border}`,
        paddingTop: 8
      }
    }, q.explanation), q.los_tested && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#5050a0",
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700
      }
    }, "LOS: "), q.los_tested), q.misconception_targeted && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "#60508a",
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700
      }
    }, "Error pattern: "), q.misconception_targeted), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setRevisionTopic(q._topic || topic);
        setRevisionTab("notes");
        setScreen("revision");
      },
      style: {
        marginTop: 10,
        fontSize: 11,
        fontWeight: 700,
        padding: "5px 12px",
        borderRadius: 7,
        background: C.accent + "18",
        border: `1px solid ${C.accent}44`,
        color: C.accentLight,
        cursor: "pointer"
      }
    }, "📚 Review in Power Notes →"))))), fullExamMode && examSession === 1 && window._cfaExamPMQs?.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        background: `linear-gradient(135deg,${C.easy}12,${C.easy}06)`,
        border: `1px solid ${C.easy}44`,
        borderRadius: 14,
        padding: "18px 20px",
        marginBottom: 14,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 800,
        color: C.easy,
        marginBottom: 6
      }
    }, "AM Session Complete ✓"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: C.muted,
        marginBottom: 4
      }
    }, "Score: ", sessionPct, "% · ", sessionScore, "/", questions.length, " correct"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        marginBottom: 16,
        lineHeight: 1.6
      }
    }, "Take a 30-minute break before PM session. Stand up, eat, rest your eyes. CFA examiners build this in — use it."), /*#__PURE__*/React.createElement("button", {
      onClick: () => startFullExam(2),
      style: {
        width: "100%",
        padding: "13px",
        borderRadius: 11,
        fontSize: 14,
        fontWeight: 700,
        background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
        color: "#fff",
        border: "none",
        cursor: "pointer"
      }
    }, "Start PM Session (", window._cfaExamPMQs.length, " questions) →")), omMode && /*#__PURE__*/React.createElement("div", {
      style: {
        background: `linear-gradient(135deg,${C.accent}15,${C.accent}08)`,
        border: `1px solid ${C.accent}44`,
        borderRadius: 12,
        padding: "13px 16px",
        marginBottom: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: C.accentLight
      }
    }, "⚡ Keep going?"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        marginTop: 2
      }
    }, omQCount, " more questions · next weakest topic")), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        trackUsage("office_mode");
        const weak = moduleReadiness.filter(m => m.sessions === 0 && m.weight >= 9)[0] || moduleReadiness.filter(m => m.accuracy !== null).sort((a, b) => a.accuracy - b.accuracy)[0] || moduleReadiness[0];
        setOmMode(true);
        generateQuestions(weak.topic, weak.untouchedModules?.[0] || weak.modules[0], adaptiveOmDifficulty, omQCount, "guided");
      },
      style: {
        fontSize: 13,
        fontWeight: 800,
        padding: "9px 18px",
        borderRadius: 9,
        background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
        color: "#fff",
        border: "none",
        cursor: "pointer",
        boxShadow: `0 4px 12px ${C.accent}44`,
        flexShrink: 0
      }
    }, omQCount, " More →")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 9,
        marginBottom: 9
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setOmMode(false);
        setAnswers({});
        setCurrentQ(0);
        setShowExp(false);
        setLastSession(null);
        setScreen("quiz");
      },
      style: {
        flex: 1,
        padding: "12px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 600,
        background: C.surface,
        border: `1px solid ${C.border}`,
        color: C.muted,
        cursor: "pointer"
      }
    }, "Retry"), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setOmMode(false);
        setScreen("setup");
      },
      style: {
        flex: 2,
        padding: "12px",
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 700,
        background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
        color: "#fff",
        border: "none",
        cursor: "pointer"
      }
    }, "New Mock →")), wrongs.length > 0 && /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        // Generate new questions targeting only the LOS that were missed
        const missedLOS = wrongs.map(q => q.los_tested).filter(Boolean);
        const missedConcepts = wrongs.map(q => q.concept).filter(Boolean);
        const drillModule = subtopic;
        generateQuestions(topic, drillModule, difficulty, Math.min(10, wrongs.length + 5), "guided");
      },
      style: {
        width: "100%",
        padding: "11px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 700,
        background: C.hard + "20",
        border: `1px solid ${C.hard}44`,
        color: C.hard,
        cursor: "pointer",
        marginBottom: 9
      }
    }, "🔁 Drill Missed LOS (", wrongs.length, " gaps) →"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 9,
        marginTop: 9
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setScreen("home");
        setFocusSuggestions(null);
      },
      style: {
        flex: 1,
        padding: "10px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 600,
        background: "none",
        border: `1px solid ${C.border}`,
        color: C.muted,
        cursor: "pointer"
      }
    }, "Home"), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setRevisionTopic(topic);
        setRevisionTab("notes");
        setScreen("revision");
      },
      style: {
        flex: 1,
        padding: "10px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 700,
        background: C.accent + "18",
        border: `1px solid ${C.accent}44`,
        color: C.accentLight,
        cursor: "pointer"
      }
    }, "📚 Revise ", topic?.split(" ")[0]))));
  }
  // ══ READINESS ══════════════════════════════════════════════════════════════
  if (screen === "readiness") return wrap(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 800
    }
  }, "Module Readiness"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 3
    }
  }, "Accuracy · LOS Coverage · Recency · Trend")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen("home"),
    style: {
      background: "none",
      border: "none",
      color: C.muted,
      cursor: "pointer",
      fontSize: 13
    }
  }, "← Home")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: predicted ? predicted.score >= 70 ? "#041a0e" : "#1a0407" : C.surface,
      border: `1px solid ${predicted ? predicted.score >= 70 ? "#22a05a44" : C.hard + "44" : C.border}`,
      borderRadius: 13,
      padding: "18px 20px",
      marginBottom: 16,
      display: "flex",
      alignItems: "center",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(ScoreRing, {
    pct: predicted?.score || 0,
    size: 84
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      marginBottom: 4
    }
  }, predicted ? predicted.score >= 70 ? "On track to pass ✓" : "Below passing threshold" : "Need more sessions to predict"), predicted && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: predicted.score >= 70 ? C.easy : C.hard,
      fontWeight: 600,
      marginBottom: 4
    }
  }, "Range: ", predicted.low, "–", predicted.high, "% ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.muted,
      fontWeight: 400
    }
  }, "(", predicted.confidence, "% confidence)")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      lineHeight: 1.5
    }
  }, predicted ? `${predicted.modulesWithData}/10 topics with reliable data. Weighted by CFA official exam weights.` : "Complete ≥10 questions across 3+ topics to unlock."), predicted && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 5
    }
  }, daysLeft, " days · ", history.length, " sessions · ", totalQsAttempted, " Qs"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "14px 16px",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      marginBottom: 10
    }
  }, "LOS Coverage Heatmap ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted,
      fontWeight: 400
    }
  }, "(", Object.values(LOS).flatMap(t => Object.values(t.modules)).flat().length, " total statements)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, Object.entries(LOS).map(([topic, {
    modules
  }]) => {
    const topicSessions = history.filter(h => h.topic === topic);
    return /*#__PURE__*/React.createElement("div", {
      key: topic,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.muted,
        width: 120,
        flexShrink: 0,
        textAlign: "right"
      }
    }, topic.slice(0, 16)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 2,
        flexWrap: "wrap"
      }
    }, Object.entries(modules).map(([mod, stmts]) => {
      const modSessions = topicSessions.filter(h => h.subtopic === mod);
      const modPct = modSessions.length ? Math.round(modSessions.reduce((s, h) => s + h.pct, 0) / modSessions.length) : null;
      return stmts.map((_, i) => /*#__PURE__*/React.createElement(LOSHeatmapCell, {
        key: `${mod}_${i}`,
        tested: modPct !== null,
        pct: modPct || 0
      }));
    })));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: C.border
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: C.muted
    }
  }, "Not tested")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: C.hard
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: C.muted
    }
  }, "<60%")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: C.medium
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: C.muted
    }
  }, "60-80%")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: "#16a34a"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: C.muted
    }
  }, ">80%")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 9,
      marginBottom: 16
    }
  }, moduleReadiness.map(m => {
    const col = m.readiness >= 70 ? C.easy : m.readiness >= 45 ? C.medium : C.hard;
    const notStarted = m.sessions === 0;
    return /*#__PURE__*/React.createElement("div", {
      key: m.topic,
      style: {
        background: C.surface,
        border: `1px solid ${notStarted ? C.hard + "33" : C.border}`,
        borderRadius: 12,
        padding: "14px 16px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 7,
        marginBottom: 3,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 700
      }
    }, m.topic), /*#__PURE__*/React.createElement(Badge, {
      color: C.muted
    }, m.weight, "% exam"), notStarted && /*#__PURE__*/React.createElement(Badge, {
      color: C.hard
    }, "Not started"), !notStarted && !m.reliable && /*#__PURE__*/React.createElement(Badge, {
      color: C.medium
    }, "Low data"), m.trend && /*#__PURE__*/React.createElement(TrendArrow, {
      trend: m.trend,
      delta: m.trendDelta
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted
      }
    }, m.sessions, " sessions · ", m.modulesCovered.length, "/", m.modules.length, " modules · ", m.totalQs, " Qs", m.lastSession && ` · Last: ${m.lastSession}`)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right",
        flexShrink: 0,
        marginLeft: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 20,
        fontWeight: 800,
        color: col
      }
    }, notStarted ? "–" : `${m.readiness}%`), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: col,
        opacity: 0.8,
        fontWeight: 600,
        textTransform: "uppercase"
      }
    }, "readiness"))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 4,
        background: C.border,
        borderRadius: 2,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: `${m.readiness}%`,
        background: col,
        borderRadius: 2,
        transition: "width 0.5s"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 5,
        marginBottom: notStarted || m.readiness < 60 ? 10 : 0
      }
    }, m.modules.map(mod => {
      const stats = m.moduleStats[mod];
      const los = m.losStats[mod];
      return /*#__PURE__*/React.createElement("span", {
        key: mod,
        title: `${los?.total || 0} LOS · ${los?.untested || 0} untested`,
        style: {
          fontSize: 10,
          padding: "3px 8px",
          borderRadius: 5,
          fontWeight: 600,
          background: stats ? stats.pct >= 70 ? "#041a0e" : stats.pct >= 50 ? "#1a1200" : "#1a0407" : C.dim,
          color: stats ? stats.pct >= 70 ? C.easy : stats.pct >= 50 ? C.medium : C.hard : C.muted,
          border: `1px solid ${stats ? stats.pct >= 70 ? "#22a05a33" : stats.pct >= 50 ? C.medium + "33" : C.hard + "33" : C.border}`
        }
      }, mod.length > 18 ? mod.slice(0, 18) + "…" : mod, stats ? ` ${stats.pct}%` : "", /*#__PURE__*/React.createElement("span", {
        style: {
          opacity: 0.45
        }
      }, " ", los?.total, "LOS"));
    })), (notStarted || m.readiness < 60) && /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        const t = m.untouchedModules[0] || m.modules[0];
        setMode("guided");
        generateQuestions(m.topic, t, notStarted ? "Easy" : "Medium", 10);
      },
      style: {
        width: "100%",
        padding: "9px",
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 700,
        background: C.accent + "22",
        border: `1px solid ${C.accent}44`,
        color: C.accentLight,
        cursor: "pointer"
      }
    }, notStarted ? `Start ${m.topic} →` : "Drill Weakest Module →"));
  }))), 620);

  // ══ DASHBOARD ══════════════════════════════════════════════════════════════
  if (screen === "dashboard") {
    const totalQs = history.reduce((s, h) => s + h.total, 0);
    const subMap = {};
    history.forEach(s => {
      const k = `${s.topic}|||${s.subtopic}`;
      if (!subMap[k]) subMap[k] = {
        topic: s.topic,
        subtopic: s.subtopic,
        correct: 0,
        total: 0,
        sessions: 0
      };
      subMap[k].correct += s.score;
      subMap[k].total += s.total;
      subMap[k].sessions += 1;
    });
    const subStats = Object.values(subMap).map(s => ({
      ...s,
      pct: Math.round(s.correct / s.total * 100)
    })).sort((a, b) => a.pct - b.pct);
    const filteredHistory = historyFilter === "All" ? history : history.filter(h => h.topic === historyFilter);
    const avgQuality = history.length ? Math.round(history.map(s => getSessionQuality(s)?.quality || 0).reduce((a, b) => a + b, 0) / history.length) : null;
    return wrap(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: 22,
        fontWeight: 800
      }
    }, "Dashboard"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setScreen("home"),
      style: {
        background: "none",
        border: "none",
        color: C.muted,
        cursor: "pointer",
        fontSize: 13
      }
    }, "← Home")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: 9,
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      label: "Sessions",
      value: history.length
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Avg Score",
      value: `${overallPct || 0}%`,
      color: overallPct >= 70 ? C.easy : C.hard
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Avg Quality",
      value: avgQuality ? `${avgQuality}` : "-",
      color: avgQuality >= 70 ? C.easy : avgQuality >= 50 ? C.medium : C.hard
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Questions",
      value: totalQs,
      color: C.accentLight
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 11,
        padding: "13px 16px",
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: C.muted,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: 10
      }
    }, "SR Deck Health"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: 12,
        textAlign: "center"
      }
    }, [["Total", Object.keys(srDeck).length, C.accentLight], ["Due", dueCards.length, dueCards.length > 0 ? C.medium : C.easy], ["Leeches", leeches.length, leeches.length > 0 ? C.hard : C.easy], ["Mastered", Object.values(srDeck).filter(c => c.repetitions >= 3).length, C.easy]].map(([l, v, col]) => /*#__PURE__*/React.createElement("div", {
      key: l
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 800,
        color: col
      }
    }, v), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.muted,
        marginTop: 2
      }
    }, l))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        marginBottom: 16
      }
    }, [["sessions", "Sessions"], ["patterns", "Error Patterns"], ["quality", "Quality"]].map(([tab, label]) => /*#__PURE__*/React.createElement("button", {
      key: tab,
      onClick: () => setDashTab(tab),
      style: {
        flex: 1,
        padding: "8px",
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 600,
        border: dashTab === tab ? `1.5px solid ${C.accent}` : `1.5px solid ${C.border}`,
        background: dashTab === tab ? C.accent + "18" : C.surface,
        color: dashTab === tab ? C.accentLight : C.muted,
        cursor: "pointer"
      }
    }, label))), dashTab === "sessions" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        marginBottom: 12
      }
    }, ["All", ...Object.keys(LOS)].map(t => /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: () => setHistoryFilter(t),
      style: {
        padding: "4px 10px",
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 600,
        border: historyFilter === t ? `1.5px solid ${C.accent}` : `1px solid ${C.border}`,
        background: historyFilter === t ? C.accent + "20" : C.surface,
        color: historyFilter === t ? C.accentLight : C.muted,
        cursor: "pointer"
      }
    }, t === "All" ? "All Topics" : t.split(" ")[0]))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
        marginBottom: 16
      }
    }, filteredHistory.slice(0, 15).map(s => {
      const sq = getSessionQuality(s);
      return /*#__PURE__*/React.createElement("div", {
        key: s.id,
        style: {
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 9,
          padding: "11px 14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600
        }
      }, s.subtopic), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: C.muted
        }
      }, s.date, " · ", s.difficulty, " · ", s.mode)), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 16,
          fontWeight: 800,
          color: s.pct >= 70 ? C.easy : C.hard
        }
      }, s.pct, "%"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: sq?.quality >= 70 ? C.easy : C.muted
        }
      }, "Q:", sq?.quality || "-")));
    }))), dashTab === "patterns" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        marginBottom: 12
      }
    }, "Concepts you've gotten wrong 2+ times — systematic errors, not random."), wrongPatterns.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "20px",
        textAlign: "center",
        color: C.muted,
        fontSize: 13
      }
    }, "No patterns detected yet. Complete more sessions to identify systematic errors.") : /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginBottom: 16
      }
    }, wrongPatterns.map((p, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: C.surface,
        border: `1px solid ${C.hard}22`,
        borderRadius: 10,
        padding: "13px 14px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700
      }
    }, p.concept), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted
      }
    }, p.topic)), /*#__PURE__*/React.createElement(Badge, {
      color: C.hard
    }, p.count, "x wrong")), p.examples[0] && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#6060a0",
        lineHeight: 1.5,
        marginBottom: 6
      }
    }, "\"…", p.examples[0], "…\""), /*#__PURE__*/React.createElement("button", {
      onClick: () => generateQuestions(p.topic, p.topic, difficulty, 10),
      style: {
        fontSize: 11,
        fontWeight: 700,
        padding: "5px 11px",
        borderRadius: 7,
        background: C.hard + "22",
        border: `1px solid ${C.hard}33`,
        color: C.hard,
        cursor: "pointer"
      }
    }, "Drill this concept →"))))), dashTab === "quality" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        marginBottom: 12
      }
    }, "Session quality = 60% accuracy + 30% speed + difficulty bonus. Tracks improvement over time."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
        marginBottom: 16
      }
    }, history.slice(0, 12).map(s => {
      const sq = getSessionQuality(s);
      if (!sq) return null;
      return /*#__PURE__*/React.createElement("div", {
        key: s.id,
        style: {
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 9,
          padding: "11px 14px"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600
        }
      }, s.subtopic), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: C.muted
        }
      }, s.date, " · ", s.difficulty)), /*#__PURE__*/React.createElement(Badge, {
        color: sq.quality >= 80 ? C.easy : sq.quality >= 65 ? C.medium : C.hard
      }, sq.label)), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 4,
          background: C.border,
          borderRadius: 2
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: "100%",
          width: `${sq.quality}%`,
          background: sq.quality >= 80 ? C.easy : sq.quality >= 65 ? C.medium : C.hard,
          borderRadius: 2
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 12,
          marginTop: 6
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          color: C.muted
        }
      }, "Acc: ", sq.accuracyScore, "%"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          color: C.muted
        }
      }, "Speed: ", sq.speedScore, "%"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          color: C.muted
        }
      }, "Quality: ", sq.quality, "/100")));
    }))), !confirmClear ? /*#__PURE__*/React.createElement("button", {
      onClick: () => setConfirmClear(true),
      style: {
        width: "100%",
        padding: "10px",
        borderRadius: 10,
        fontSize: 12,
        fontWeight: 600,
        background: "none",
        border: `1px solid #2a1018`,
        color: "#5a2a3a",
        cursor: "pointer"
      }
    }, "Clear All History & SR Deck") : /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 9
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setConfirmClear(false),
      style: {
        flex: 1,
        padding: "10px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 600,
        background: C.surface,
        border: `1px solid ${C.border}`,
        color: C.muted,
        cursor: "pointer"
      }
    }, "Cancel"), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setHistory([]);
        setSrDeck({});
        setQdb({});
        setConfirmClear(false);
        setScreen("home");
      },
      style: {
        flex: 1,
        padding: "10px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 700,
        background: "#400010",
        border: `1px solid ${C.hard}`,
        color: C.hard,
        cursor: "pointer"
      }
    }, "Clear All"))));
  }

  // ══ REVIEW WRONGS ══════════════════════════════════════════════════════════
  if (screen === "review") {
    const w = reviewList[reviewIdx];
    if (!w) return wrap(/*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        paddingTop: 60
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 36,
        marginBottom: 12
      }
    }, "🎯"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        marginBottom: 8
      }
    }, "All caught up!"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setScreen("home"),
      style: {
        padding: "12px 28px",
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 700,
        background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
        color: "#fff",
        border: "none",
        cursor: "pointer"
      }
    }, "Home")));
    return wrap(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: 20,
        fontWeight: 800
      }
    }, "Review Wrongs"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        marginTop: 3
      }
    }, reviewIdx + 1, " of ", reviewList.length)), /*#__PURE__*/React.createElement("button", {
      onClick: () => setScreen("home"),
      style: {
        background: "none",
        border: "none",
        color: C.muted,
        cursor: "pointer",
        fontSize: 13
      }
    }, "← Home")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 3,
        background: C.border,
        borderRadius: 2,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: `${(reviewIdx + 1) / reviewList.length * 100}%`,
        background: C.hard,
        borderRadius: 2,
        transition: "width 0.3s"
      }
    })), w.concept && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      color: C.muted
    }, w.concept)), /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: "20px",
        marginBottom: 14,
        fontSize: 14,
        lineHeight: 1.78
      }
    }, w.question), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginBottom: 14
      }
    }, Object.entries(w.options).map(([key, val]) => {
      const isCorrect = key === w.answer,
        wasWrong = key === w.userAnswer && !isCorrect;
      return /*#__PURE__*/React.createElement("div", {
        key: key,
        style: {
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
          padding: "12px 14px",
          borderRadius: 10,
          background: isCorrect ? "#041a0e" : wasWrong ? "#1a0407" : C.surface,
          border: `1.5px solid ${isCorrect ? "#22a05a" : wasWrong ? C.hard : C.border}`,
          fontSize: 13,
          lineHeight: 1.6,
          color: isCorrect ? "#4ade80" : wasWrong ? "#fca5a5" : C.muted
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          minWidth: 24,
          height: 24,
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 1,
          background: isCorrect ? "#22a05a" : wasWrong ? C.hard : C.dim,
          color: "#fff"
        }
      }, key), /*#__PURE__*/React.createElement("span", null, val));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#08081a",
        border: `1px solid ${C.border}`,
        borderRadius: 11,
        padding: "15px",
        marginBottom: w.los_tested ? 8 : 16,
        fontSize: 13,
        color: "#9090b8",
        lineHeight: 1.75
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: C.muted,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: 7
      }
    }, "Why you missed this"), w.explanation), w.los_tested && /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.dim,
        borderRadius: 8,
        padding: "8px 12px",
        marginBottom: 8,
        fontSize: 11,
        color: C.muted
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: C.accentLight
      }
    }, "LOS: "), w.los_tested), w.misconception_targeted && /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#0a0518",
        borderRadius: 8,
        padding: "8px 12px",
        marginBottom: 16,
        fontSize: 11,
        color: "#8060c0"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700
      }
    }, "Error pattern: "), w.misconception_targeted), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 9
      }
    }, reviewIdx > 0 && /*#__PURE__*/React.createElement("button", {
      onClick: () => setReviewIdx(i => i - 1),
      style: {
        flex: 1,
        padding: "12px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 600,
        background: C.surface,
        border: `1px solid ${C.border}`,
        color: C.muted,
        cursor: "pointer"
      }
    }, "← Prev"), reviewIdx < reviewList.length - 1 ? /*#__PURE__*/React.createElement("button", {
      onClick: () => setReviewIdx(i => i + 1),
      style: {
        flex: 2,
        padding: "13px",
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 700,
        background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
        color: "#fff",
        border: "none",
        cursor: "pointer"
      }
    }, "Next →") : /*#__PURE__*/React.createElement("button", {
      onClick: () => setScreen("home"),
      style: {
        flex: 2,
        padding: "13px",
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 700,
        background: `linear-gradient(135deg,${C.easy},#16c98a)`,
        color: "#fff",
        border: "none",
        cursor: "pointer"
      }
    }, "Done ✓"))));
  }
  // ══ API KEY SCREEN ══════════════════════════════════════════════════════════
  if (screen === "apiKey") return wrap(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 20,
      fontWeight: 800
    }
  }, "API Key"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen("home"),
    style: {
      background: "none",
      border: "none",
      color: C.muted,
      cursor: "pointer",
      fontSize: 13
    }
  }, "← Back")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "16px",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: C.accentLight,
      marginBottom: 8
    }
  }, "Why do I need this?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      lineHeight: 1.7
    }
  }, "Question generation uses the Claude API. The claude.ai interface has a shared rate limit across chat and artifacts — when it's exceeded you see the \"rate limit\" error. Adding your own API key gives you a ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.accentLight,
      fontWeight: 600
    }
  }, "separate quota"), " that's never affected by chat usage.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#080814",
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "16px",
      marginBottom: 16,
      fontSize: 12,
      color: C.muted,
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: C.textMid,
      marginBottom: 6
    }
  }, "How to get a free key:"), "1. Go to ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.accentLight,
      fontWeight: 600
    }
  }, "console.anthropic.com"), /*#__PURE__*/React.createElement("br", null), "2. Sign up / log in → API Keys → Create Key", /*#__PURE__*/React.createElement("br", null), "3. Copy the key (starts with ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "monospace",
      color: C.accentLight
    }
  }, "sk-ant-"), ")", /*#__PURE__*/React.createElement("br", null), "4. Paste it below and tap Save"), apiKey && /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.easy + "12",
      border: `1px solid ${C.easy}44`,
      borderRadius: 10,
      padding: "11px 14px",
      marginBottom: 14,
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, "✅"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: C.easy
    }
  }, "API key active"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 2
    }
  }, "Ends in …", apiKey.slice(-6), " · Questions use your own quota"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      display: "block",
      marginBottom: 8
    }
  }, "Your API Key"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: showApiKey ? "text" : "password",
    value: apiKeyInput,
    onChange: e => setApiKeyInput(e.target.value),
    placeholder: "sk-ant-api03-...",
    style: {
      width: "100%",
      padding: "12px 44px 12px 14px",
      borderRadius: 10,
      fontSize: 13,
      background: C.surface,
      border: `1.5px solid ${apiKeyInput.startsWith("sk-") ? C.accent : C.border}`,
      color: C.text,
      outline: "none",
      fontFamily: "monospace",
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowApiKey(v => !v),
    style: {
      position: "absolute",
      right: 12,
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      color: C.muted,
      cursor: "pointer",
      fontSize: 14,
      padding: 0
    }
  }, showApiKey ? "🙈" : "👁️")), apiKeyInput && !apiKeyInput.startsWith("sk-") && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.hard,
      marginTop: 6
    }
  }, "Key should start with sk-ant- or sk-")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: async () => {
      const k = apiKeyInput.trim();
      if (!k) {
        setApiKey("");
        setApiKeyInput("");
        await storageSet("cfa_api_key", "");
        setScreen("home");
        return;
      }
      if (!k.startsWith("sk-")) {
        return;
      }
      setApiKey(k);
      await storageSet("cfa_api_key", k);
      setScreen("home");
    },
    disabled: apiKeyInput && !apiKeyInput.startsWith("sk-"),
    style: {
      flex: 2,
      padding: "13px",
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 700,
      background: apiKeyInput.startsWith("sk-") ? `linear-gradient(135deg,${C.accent},${C.accentLight})` : C.dim,
      color: apiKeyInput.startsWith("sk-") ? "#fff" : C.muted,
      border: "none",
      cursor: apiKeyInput.startsWith("sk-") ? "pointer" : "not-allowed"
    }
  }, "Save Key"), apiKey && /*#__PURE__*/React.createElement("button", {
    onClick: async () => {
      setApiKey("");
      setApiKeyInput("");
      await storageSet("cfa_api_key", "");
    },
    style: {
      flex: 1,
      padding: "13px",
      borderRadius: 10,
      fontSize: 13,
      fontWeight: 600,
      background: "#200010",
      border: `1px solid ${C.hard}44`,
      color: C.hard,
      cursor: "pointer"
    }
  }, "Remove")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      lineHeight: 1.6,
      textAlign: "center"
    }
  }, "Your key is stored only in this browser's local storage — never sent anywhere except directly to the Anthropic API."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      paddingTop: 16,
      borderTop: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.text,
      marginBottom: 6
    }
  }, "🗄 Supabase (Reliable Storage)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginBottom: 10,
      lineHeight: 1.6
    }
  }, "Connect a free Supabase database for unlimited, permanent session storage. Your data syncs automatically after every session."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      display: "block",
      marginBottom: 5
    }
  }, "Project URL"), /*#__PURE__*/React.createElement("input", {
    value: supabaseUrl,
    onChange: e => setSupabaseUrl(e.target.value),
    placeholder: "https://xxxx.supabase.co",
    style: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: 9,
      fontSize: 12,
      background: C.surface,
      border: `1.5px solid ${supabaseUrl ? "#44aa8844" : C.border}`,
      color: C.text,
      outline: "none",
      boxSizing: "border-box"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      display: "block",
      marginBottom: 5
    }
  }, "Anon Public Key"), /*#__PURE__*/React.createElement("input", {
    value: supabaseKey,
    onChange: e => setSupabaseKey(e.target.value),
    placeholder: "eyJhbGci...",
    style: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: 9,
      fontSize: 12,
      background: C.surface,
      border: `1.5px solid ${supabaseKey ? "#44aa8844" : C.border}`,
      color: C.text,
      outline: "none",
      boxSizing: "border-box"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: async () => {
      if (!supabaseUrl || !supabaseKey) {
        return;
      }
      setSupabaseSyncing(true);
      const cfg = {
        url: supabaseUrl.replace(/\/$/, ""),
        key: supabaseKey
      };
      const ok = await supabaseSync(cfg, history, srDeckRef.current, usageStatsRef.current);
      if (ok) {
        localStorage.setItem("cfa_supabase_config", JSON.stringify(cfg));
        setSupabaseCfg(cfg);
        setDriveStatus("synced");
        setTimeout(() => setDriveStatus(null), 3000);
      } else setDriveStatus("error");
      setSupabaseSyncing(false);
    },
    style: {
      flex: 2,
      padding: "11px",
      borderRadius: 9,
      fontSize: 13,
      fontWeight: 700,
      background: supabaseUrl && supabaseKey ? `linear-gradient(135deg,#22c55e,#16a34a)` : "#1a2a1a",
      color: supabaseUrl && supabaseKey ? "#fff" : "#4a6a4a",
      border: "none",
      cursor: "pointer"
    }
  }, supabaseSyncing ? "Testing…" : "Save & Test Connection"), supabaseCfg && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      localStorage.removeItem("cfa_supabase_config");
      setSupabaseCfg(null);
      setSupabaseUrl("");
      setSupabaseKey("");
    },
    style: {
      flex: 1,
      padding: "11px",
      borderRadius: 9,
      fontSize: 12,
      fontWeight: 600,
      background: "#200010",
      border: `1px solid ${C.hard}44`,
      color: C.hard,
      cursor: "pointer"
    }
  }, "Disconnect")), supabaseCfg && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#22c55e",
      background: "#0a1f0a",
      borderRadius: 8,
      padding: "8px 12px",
      marginBottom: 8
    }
  }, "✅ Supabase connected · ", history.length, " session", history.length !== 1 ? "s" : "", " · ", Object.keys(srDeckRef.current).length, " SR cards"), /*#__PURE__*/React.createElement("button", {
    onClick: async () => {
      if (!supabaseCfg) return;
      setSupabaseSyncing(true);
      const ok = await supabaseSync(supabaseCfg, history, srDeckRef.current, usageStatsRef.current);
      setDriveStatus(ok ? "synced" : "error");
      setTimeout(() => setDriveStatus(null), 4000);
      setSupabaseSyncing(false);
    },
    style: {
      width: "100%",
      padding: "10px",
      borderRadius: 9,
      fontSize: 12,
      fontWeight: 700,
      background: "#0a1f2a",
      border: `1.5px solid #22d3ee44`,
      color: "#22d3ee",
      cursor: "pointer"
    }
  }, supabaseSyncing ? "Syncing…" : "⬆ Sync All Data to Supabase Now"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      paddingTop: 16,
      borderTop: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: C.text,
      marginBottom: 10
    }
  }, "📅 Exam Date"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginBottom: 10
    }
  }, "Current: ", examDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }), " (", daysLeft, " days away)"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: examDateInput,
    onChange: e => setExamDateInput(e.target.value),
    style: {
      width: "100%",
      padding: "10px 14px",
      borderRadius: 10,
      fontSize: 13,
      background: C.surface,
      border: `1.5px solid ${C.border}`,
      color: C.text,
      outline: "none",
      boxSizing: "border-box",
      marginBottom: 10
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: async () => {
      const d = new Date(examDateInput);
      if (isNaN(d.getTime())) return;
      setExamDate(d);
      await storageSet("cfa_exam_date", examDateInput);
      setScreen("home");
    },
    style: {
      width: "100%",
      padding: "11px",
      borderRadius: 10,
      fontSize: 13,
      fontWeight: 700,
      background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
      color: "#fff",
      border: "none",
      cursor: "pointer"
    }
  }, "Save Exam Date"))));

  // ══ STUDY PLAN SCREEN ════════════════════════════════════════════════════════
  if (screen === "studyPlan") return wrap((() => {
    const plan = studyPlanData || [];
    const today = plan[0];
    const typeColor = {
      learn: C.accent,
      review: C.medium,
      ethics: C.easy
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: 20,
        fontWeight: 800,
        color: C.text
      }
    }, "📅 2-Month Study Plan"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        marginTop: 2
      }
    }, "Personalised to your weak topics · ", daysLeft, " days to exam")), /*#__PURE__*/React.createElement("button", {
      onClick: () => setScreen("home"),
      style: {
        background: "none",
        border: "none",
        color: C.muted,
        cursor: "pointer",
        fontSize: 13
      }
    }, "← Home")), today && /*#__PURE__*/React.createElement("div", {
      style: {
        background: `linear-gradient(135deg,${C.accent}18,${C.accent}08)`,
        border: `1px solid ${C.accent}44`,
        borderRadius: 14,
        padding: "16px",
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 800,
        color: C.accentLight,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: 6
      }
    }, "Today's Session"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 800,
        color: C.text,
        marginBottom: 2
      }
    }, today.topic), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        marginBottom: 12
      }
    }, today.module, " · ", today.count, " questions · ", today.difficulty), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setScreen("home");
        setTimeout(() => generateQuestions(today.topic, today.module, today.difficulty, today.count, "guided"), 100);
      },
      style: {
        width: "100%",
        padding: "12px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 700,
        background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
        color: "#fff",
        border: "none",
        cursor: "pointer",
        boxShadow: `0 4px 14px ${C.accent}44`
      }
    }, "Start Today's Session →")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: C.text,
        marginBottom: 10
      }
    }, "Upcoming Schedule"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, plan.slice(0, 30).map((day, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: C.surface,
        border: `1px solid ${i === 0 ? C.accent + "55" : C.border}`,
        borderRadius: 11,
        padding: "12px 14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 800,
        color: C.muted
      }
    }, "Day ", day.dayNum), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        padding: "2px 7px",
        borderRadius: 10,
        background: (typeColor[day.type] || C.accent) + "22",
        color: typeColor[day.type] || C.accent,
        fontWeight: 700,
        textTransform: "uppercase"
      }
    }, day.type)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: C.text
      }
    }, day.topic.split(" ").slice(0, 3).join(" ")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted
      }
    }, day.module.slice(0, 40), day.module.length > 40 ? "…" : "", " · ", day.count, "Q")), i > 0 && /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setScreen("home");
        setTimeout(() => generateQuestions(day.topic, day.module, day.difficulty, day.count, "guided"), 100);
      },
      style: {
        fontSize: 10,
        fontWeight: 700,
        padding: "6px 10px",
        borderRadius: 8,
        background: C.accent + "22",
        border: `1px solid ${C.accent}44`,
        color: C.accentLight,
        cursor: "pointer",
        flexShrink: 0,
        marginLeft: 10
      }
    }, "Start"))), plan.length > 30 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        fontSize: 11,
        color: C.muted,
        padding: "8px"
      }
    }, "+", plan.length - 30, " more days planned")));
  })());

  // ══ CALC TRAINER SCREEN ══════════════════════════════════════════════════════
  if (screen === "calcTrainer") return wrap((() => {
    const calcTopics = ["Quantitative Methods", "Fixed Income", "Derivatives", "Portfolio Management", "Equity", "Corporate Issuers"];
    const generateCalcProblem = async () => {
      if (!apiKey) {
        setCalcError("API key required for Calc Trainer.");
        return;
      }
      setCalcLoading(true);
      setCalcError("");
      setCalcProblem(null);
      setCalcSteps([]);
      setCalcInputs({});
      setCalcChecked({});
      try {
        const result = await callClaude(`Generate a CFA Level 1 multi-step calculation problem for: ${calcTopic} (${calcDifficulty}).\n\nReturn JSON:\n{\n  "problem": "Full problem statement with all given data",\n  "steps": [\n    {"step_num": 1, "instruction": "Calculate X first", "answer": "exact numerical answer", "formula": "formula used", "explanation": "why this step"},\n    {"step_num": 2, "instruction": "...", "answer": "...", "formula": "...", "explanation": "..."}\n  ],\n  "final_answer": "final answer with units",\n  "concept": "what is being tested",\n  "los_tested": "relevant CFA LOS"\n}\n\nMake it 3-5 steps. Use realistic CFA exam numbers. Output ONLY valid JSON.`, 1200, {
          retries: 2,
          retryDelay: 5000,
          model: "claude-haiku-4-5-20251001"
        });
        if (result && result.steps) {
          setCalcProblem(result);
          setCalcSteps(result.steps || []);
        } else throw new Error("Invalid response format");
      } catch (e) {
        setCalcError("Failed to generate problem: " + e.message);
      }
      setCalcLoading(false);
    };
    const checkStep = (stepIdx, answer, userInput) => {
      const clean = s => s.replace(/[$%,\s]/g, "");
      const user = parseFloat(clean(userInput));
      const correct = parseFloat(clean(String(answer)));
      const ok = !isNaN(user) && !isNaN(correct) && Math.abs((user - correct) / (correct || 1)) <= 0.001;
      setCalcChecked(c => ({
        ...c,
        [stepIdx]: ok ? "correct" : "wrong"
      }));
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: 20,
        fontWeight: 800,
        color: C.text
      }
    }, "🔢 Calc Trainer"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        marginTop: 2
      }
    }, "Step-by-step calculation practice")), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setScreen("home");
      },
      style: {
        background: "none",
        border: "none",
        color: C.muted,
        cursor: "pointer",
        fontSize: 13
      }
    }, "← Home")), !calcProblem && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: C.muted,
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Topic"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap"
      }
    }, calcTopics.map(t => /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: () => setCalcTopic(t),
      style: {
        padding: "6px 12px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 700,
        cursor: "pointer",
        border: calcTopic === t ? `1.5px solid ${C.accent}` : `1.5px solid ${C.border}`,
        background: calcTopic === t ? C.accent + "22" : C.surface,
        color: calcTopic === t ? C.accentLight : C.muted
      }
    }, t.split(" ")[0])))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: C.muted,
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }
    }, "Difficulty"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, ["Easy", "Medium", "Hard"].map(d => /*#__PURE__*/React.createElement("button", {
      key: d,
      onClick: () => setCalcDifficulty(d),
      style: {
        flex: 1,
        padding: "9px",
        borderRadius: 9,
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        border: calcDifficulty === d ? `1.5px solid ${diffC[d]}` : `1.5px solid ${C.border}`,
        background: calcDifficulty === d ? diffC[d] + "22" : C.surface,
        color: calcDifficulty === d ? diffC[d] : C.muted
      }
    }, d)))), calcError && /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.errorBg,
        border: `1px solid ${C.hard}44`,
        borderRadius: 9,
        padding: "12px",
        color: "#fca5a5",
        fontSize: 13,
        marginBottom: 12
      }
    }, calcError), /*#__PURE__*/React.createElement("button", {
      onClick: generateCalcProblem,
      disabled: calcLoading,
      style: {
        width: "100%",
        padding: "13px",
        borderRadius: 11,
        fontSize: 14,
        fontWeight: 700,
        background: calcLoading ? C.dim : `linear-gradient(135deg,${C.accent},${C.accentLight})`,
        color: calcLoading ? C.muted : "#fff",
        border: "none",
        cursor: calcLoading ? "not-allowed" : "pointer"
      }
    }, calcLoading ? "Generating problem…" : "Generate Problem →")), calcProblem && /*#__PURE__*/React.createElement("div", {
      style: {
        animation: "fadeIn 0.2s ease"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.surface,
        border: `1px solid ${C.accent}33`,
        borderRadius: 13,
        padding: "16px",
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 800,
        color: C.accentLight,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: 8
      }
    }, "Problem — ", calcProblem.concept), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: C.text,
        lineHeight: 1.7
      }
    }, calcProblem.problem), calcProblem.los_tested && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: C.muted,
        marginTop: 8
      }
    }, "LOS: ", calcProblem.los_tested)), calcSteps.map((step, idx) => /*#__PURE__*/React.createElement("div", {
      key: idx,
      style: {
        background: C.surface,
        border: `1px solid ${calcChecked[idx] === "correct" ? C.easy + "55" : calcChecked[idx] === "wrong" ? C.hard + "55" : C.border}`,
        borderRadius: 12,
        padding: "14px",
        marginBottom: 10,
        transition: "border-color 0.2s"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        color: C.accentLight,
        marginBottom: 6
      }
    }, "Step ", step.step_num, ": ", step.instruction), step.formula && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        fontFamily: "monospace",
        marginBottom: 8,
        background: C.dim,
        padding: "5px 9px",
        borderRadius: 6
      }
    }, "Formula: ", step.formula), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      placeholder: "Your answer…",
      value: calcInputs[idx] || "",
      onChange: e => setCalcInputs(c => ({
        ...c,
        [idx]: e.target.value
      })),
      disabled: !!calcChecked[idx],
      style: {
        flex: 1,
        padding: "9px 12px",
        borderRadius: 8,
        fontSize: 13,
        background: C.dim,
        border: `1px solid ${C.border}`,
        color: C.text,
        outline: "none"
      }
    }), !calcChecked[idx] ? /*#__PURE__*/React.createElement("button", {
      onClick: () => checkStep(idx, step.answer, calcInputs[idx] || ""),
      style: {
        padding: "9px 14px",
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 700,
        background: C.accent + "22",
        border: `1px solid ${C.accent}44`,
        color: C.accentLight,
        cursor: "pointer",
        flexShrink: 0
      }
    }, "Check") : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18,
        flexShrink: 0
      }
    }, calcChecked[idx] === "correct" ? "✅" : "❌")), calcChecked[idx] && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        padding: "8px 10px",
        borderRadius: 8,
        background: calcChecked[idx] === "correct" ? C.successBg : C.errorBg,
        fontSize: 12,
        color: calcChecked[idx] === "correct" ? C.easy : "#fca5a5",
        lineHeight: 1.5
      }
    }, calcChecked[idx] === "correct" ? "✓ Correct! " : "✗ Answer: " + step.answer + " | ", step.explanation))), Object.keys(calcChecked).length === calcSteps.length && calcSteps.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.surface,
        border: `1px solid ${C.easy}44`,
        borderRadius: 12,
        padding: "14px",
        marginBottom: 10,
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 800,
        color: C.easy,
        marginBottom: 4
      }
    }, "Final Answer: ", calcProblem.final_answer), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted
      }
    }, Object.values(calcChecked).filter(v => v === "correct").length, "/", calcSteps.length, " steps correct")), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setCalcProblem(null);
        setCalcSteps([]);
        setCalcInputs({});
        setCalcChecked({});
        setCalcError("");
      },
      style: {
        width: "100%",
        padding: "11px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 700,
        background: C.surface,
        border: `1px solid ${C.border}`,
        color: C.muted,
        cursor: "pointer"
      }
    }, "↺ New Problem")));
  })());

  // ══ WALKTHROUGH SCREEN ═══════════════════════════════════════════════════════
  if (screen === "walkthrough") return wrap((() => {
    const wtMods = Object.keys(LOS[walkthroughTopic]?.modules || {});
    const activeWtMod = walkthroughModule || wtMods[0] || "";
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontSize: 20,
        fontWeight: 800,
        color: C.text
      }
    }, "📖 Concept Walkthrough"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        marginTop: 2
      }
    }, "AI mini-lesson before you drill")), /*#__PURE__*/React.createElement("button", {
      onClick: () => setScreen("home"),
      style: {
        background: "none",
        border: "none",
        color: C.muted,
        cursor: "pointer",
        fontSize: 13
      }
    }, "← Home")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: C.muted,
        marginBottom: 8,
        letterSpacing: "0.05em",
        textTransform: "uppercase"
      }
    }, "Topic"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap"
      }
    }, Object.keys(LOS).map(t => /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: () => {
        setWalkthroughTopic(t);
        setWalkthroughModule(Object.keys(LOS[t].modules || {})[0] || "");
        setWalkthroughText(null);
      },
      style: {
        padding: "5px 11px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 700,
        cursor: "pointer",
        border: walkthroughTopic === t ? `1.5px solid ${C.accent}` : `1.5px solid ${C.border}`,
        background: walkthroughTopic === t ? C.accent + "22" : C.surface,
        color: walkthroughTopic === t ? C.accentLight : C.muted
      }
    }, t.split(" ")[0])))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: C.muted,
        marginBottom: 8,
        letterSpacing: "0.05em",
        textTransform: "uppercase"
      }
    }, "Module"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap"
      }
    }, wtMods.map(m => /*#__PURE__*/React.createElement("button", {
      key: m,
      onClick: () => {
        setWalkthroughModule(m);
        setWalkthroughText(null);
      },
      style: {
        padding: "5px 11px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        cursor: "pointer",
        border: activeWtMod === m ? `1.5px solid ${C.accentLight}` : `1.5px solid ${C.border}`,
        background: activeWtMod === m ? C.accentLight + "18" : C.surface,
        color: activeWtMod === m ? C.accentLight : C.muted
      }
    }, m)))), walkthroughError && /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.errorBg,
        border: `1px solid ${C.hard}44`,
        borderRadius: 9,
        padding: "12px",
        color: "#fca5a5",
        fontSize: 13,
        marginBottom: 12
      }
    }, walkthroughError), !walkthroughText && !walkthroughLoading && /*#__PURE__*/React.createElement("button", {
      onClick: async () => {
        if (!apiKey) {
          setWalkthroughError("API key required for Concept Walkthrough.");
          return;
        }
        setWalkthroughLoading(true);
        setWalkthroughError("");
        setWalkthroughText(null);
        try {
          const result = await callClaude(`You are a CFA Level 1 tutor. Create a concise concept walkthrough for: ${walkthroughTopic} → ${activeWtMod}\n\nStructure your response as:\n**Core Concept** (2 sentences explaining the big idea)\n**Key Rules** (3-4 bullet points of what you MUST know for the exam)\n**Worked Example** (one numerical or scenario-based example with the solution)\n**Exam Traps** (2 bullet points of common mistakes)\n\nBe specific to CFA L1 2026 curriculum. No padding.`, 800, {
            retries: 2,
            retryDelay: 6000,
            model: "claude-haiku-4-5-20251001"
          });
          setWalkthroughText(typeof result === "string" ? result : JSON.stringify(result));
        } catch (e) {
          setWalkthroughError("Walkthrough failed: " + e.message);
        }
        setWalkthroughLoading(false);
      },
      style: {
        width: "100%",
        padding: "13px",
        borderRadius: 11,
        fontSize: 14,
        fontWeight: 700,
        background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
        color: "#fff",
        border: "none",
        cursor: "pointer",
        boxShadow: `0 4px 16px ${C.accent}44`
      }
    }, "Generate Walkthrough →"), walkthroughLoading && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "30px",
        color: C.muted,
        animation: "pulse 1.5s infinite"
      }
    }, "Generating walkthrough…"), walkthroughText && /*#__PURE__*/React.createElement("div", {
      style: {
        animation: "fadeIn 0.2s ease"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.surface,
        border: `1px solid ${C.accent}33`,
        borderRadius: 13,
        padding: "16px",
        marginBottom: 14,
        whiteSpace: "pre-wrap",
        fontSize: 13,
        color: C.textMid,
        lineHeight: 1.8
      }
    }, walkthroughText), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setWalkthroughText(null);
      },
      style: {
        flex: 1,
        padding: "11px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 700,
        background: C.surface,
        border: `1px solid ${C.border}`,
        color: C.muted,
        cursor: "pointer"
      }
    }, "↺ Regenerate"), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setScreen("home");
        setTimeout(() => generateQuestions(walkthroughTopic, activeWtMod, "Medium", 5, "guided"), 100);
      },
      style: {
        flex: 2,
        padding: "11px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 700,
        background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
        color: "#fff",
        border: "none",
        cursor: "pointer",
        boxShadow: `0 4px 14px ${C.accent}44`
      }
    }, "Start Drilling →"))));
  })());

  // ══ REVISION SCREEN ══════════════════════════════════════════════════════════
  if (screen === "revision") return /*#__PURE__*/React.createElement(RevisionScreen, {
    onBack: () => setScreen("home"),
    initialTopic: revisionTopic,
    initialTab: revisionTab,
    apiKey: apiKey
  });
  return null;
}

// ─── Toast manager (separate React root so it renders across all screens) ─────
function ToastManager() {
  const [toasts, setToasts] = React.useState([]);
  React.useEffect(() => {
    window.__cfaShowToast = (emoji, title, desc, celebrate) => {
      const id = Date.now() + Math.random();
      setToasts(t => [...t, {
        id,
        emoji,
        title,
        desc
      }]);
      if (celebrate) fireConfetti();
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4200);
    };
    return () => {
      window.__cfaShowToast = null;
    };
  }, []);
  if (!toasts.length) return null;
  return React.createElement(React.Fragment, null, ...toasts.map((t, i) => React.createElement("div", {
    key: t.id,
    style: {
      position: "fixed",
      top: 16 + i * 80,
      right: 16,
      zIndex: 10000,
      background: "linear-gradient(135deg,#12122a,#1a1a38)",
      border: "1px solid #6366f166",
      borderRadius: 16,
      padding: "13px 16px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      boxShadow: "0 8px 32px #00000099",
      animation: "toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      maxWidth: 300,
      minWidth: 220
    }
  }, React.createElement("span", {
    style: {
      fontSize: 26,
      lineHeight: 1,
      flexShrink: 0
    }
  }, t.emoji), React.createElement("div", null, React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 13,
      color: "#e8e6ff",
      lineHeight: 1.3
    }
  }, t.title), t.desc && React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#7c7a9e",
      marginTop: 3,
      lineHeight: 1.4
    }
  }, t.desc)))));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(CFAMock));
const toastRoot = ReactDOM.createRoot(document.getElementById('toast-root'));
toastRoot.render(React.createElement(ToastManager));