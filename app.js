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
async function supabaseSync(cfg, history, srDeck) {
  if (!cfg || !cfg.url || !cfg.key) return false;
  try {
    const payload = {
      user_id: "default",
      data: JSON.stringify({
        version: 3,
        history,
        srDeck,
        savedAt: new Date().toISOString()
      }),
      updated_at: new Date().toISOString()
    };
    const res = await fetch(`${cfg.url}/rest/v1/sessions?user_id=eq.default`, {
      method: "GET",
      headers: {
        "apikey": cfg.key,
        "Authorization": `Bearer ${cfg.key}`,
        "Content-Type": "application/json"
      }
    });
    const existing = await res.json();
    const method = existing && existing.length > 0 ? "PATCH" : "POST";
    const url = method === "PATCH" ? `${cfg.url}/rest/v1/sessions?user_id=eq.default` : `${cfg.url}/rest/v1/sessions`;
    await fetch(url, {
      method,
      headers: {
        "apikey": cfg.key,
        "Authorization": `Bearer ${cfg.key}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)
    });
    return true;
  } catch {
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
      rules: ["Code has 6 components; Standards has 7 (I–VII). Know both by number.", "Standard I-A: Follow the STRICTER of local law vs CFA Standards — whichever is more restrictive.", "Standard I-B: Independence — gifts >US$100 from clients need employer written permission.", "Standard I-C: Misrepresentation includes plagiarism and guaranteeing investment returns.", "Standard II-A: Material = would affect price or reasonable investor's decision. Nonpublic = not yet released. BOTH required.", "Standard III-A: Loyalty, Prudence, Care — duty to clients first, then employer, then self.", "Standard III-C: Suitability — must consider TOTAL portfolio, not just the product being sold.", "Standard III-E: Confidentiality survives end of client relationship unless illegal activity involved.", "Standard IV-A: Loyalty to employer — moonlighting allowed if no conflict, employer notified.", "Standard VI-B: Priority — client trades first, then employer proprietary, then personal.", "Standard VII-B: Can say 'CFA candidate' only if actively enrolled. Cannot say 'CFA Level II passed'."],
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

// ─── REVISION SCREEN COMPONENTS ──────────────────────────────────────────────
function RevisionScreen({
  onBack,
  initialTopic = null,
  initialTab = "notes"
}) {
  const [selTopic, setSelTopic] = useState(initialTopic || Object.keys(POWER_NOTES)[0]);
  const [tab, setTab] = useState(initialTab); // "notes" | "formulas"
  const [expandedModule, setExpandedModule] = useState(null);
  const topicData = POWER_NOTES[selTopic];
  const formulaData = FORMULAS[selTopic] || [];
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
        display: "flex",
        gap: 8,
        alignItems: "flex-start",
        fontSize: 12,
        color: C.textMid,
        lineHeight: 1.6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.easy,
        flexShrink: 0,
        fontWeight: 700,
        marginTop: 1
      }
    }, "·"), /*#__PURE__*/React.createElement("span", null, r))))), /*#__PURE__*/React.createElement("div", {
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
  })), tab === "formulas" && /*#__PURE__*/React.createElement("div", null, formulaData.length === 0 ? /*#__PURE__*/React.createElement("div", {
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
  }, formulaData.length, " formulas · All topics in topic picker above")));
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
    const threshold = 100;
    return {
      question: `${name}, CFA, is offered a gift worth $${gift} from a client whose portfolio she manages, as a thank-you for strong performance. She has NOT yet notified her employer. What should she do?`,
      options: {
        A: `Accept the gift since it is a gesture of appreciation, not a bribe`,
        B: `Decline the gift as it exceeds the $${threshold} threshold and she has not obtained employer permission`,
        C: `Accept the gift but disclose it to her employer within 30 days`
      },
      answer: "B",
      explanation: `Standard I-B requires written permission from employer before accepting gifts above $${threshold} from clients. Accepting first and disclosing later is not compliant. She must disclose and get approval BEFORE accepting.`,
      concept: "Standard I-B",
      los_tested: "demonstrate application of Standard I-B: Independence and Objectivity",
      misconception_targeted: "thinking disclosure after the fact is sufficient"
    };
  },
  // Standard II-A Material Nonpublic
  () => {
    const name = pname();
    const info = pick(["overheard a conversation between two executives about an unannounced merger", "read an analyst report based on publicly available data", "received a tip from a friend who works at the company"]);
    return {
      question: `${name}, CFA, ${info} suggesting the company's stock will rise significantly. She buys shares for client accounts before the information becomes public. Which Standard is MOST likely violated?`,
      options: {
        A: `Standard I-C: Misrepresentation`,
        B: `Standard II-A: Material Nonpublic Information`,
        C: `Standard III-A: Loyalty, Prudence and Care`
      },
      answer: "B",
      explanation: `Standard II-A prohibits trading on material nonpublic information. Information is material if it would affect a reasonable investor's decision. Acting on this before public release violates this Standard.`,
      concept: "Standard II-A",
      los_tested: "demonstrate application of Standard II-A: Material Nonpublic Information",
      misconception_targeted: "confusing duties to clients with market integrity standards"
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
  // ── Real CFA Institute case studies (via getEthicsCases) ──
  () => {
    const cases = getEthicsCases("all", 1);
    return cases.length ? cases[0] : null;
  }, () => {
    const cases = getEthicsCases("all", 1);
    return cases.length ? cases[0] : null;
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
      question: `A company has Days Sales Outstanding of ${dso} days, Days Inventory Outstanding of ${dso} days (DIO = ${dio}), and Days Payable Outstanding of ${dpo} days. What is the Cash Conversion Cycle?`,
      options: {
        A: `${ccc} days`,
        B: `${wrong1} days`,
        C: `${wrong2} days`
      },
      answer: "A",
      explanation: `CCC = DSO + DIO − DPO = ${dso} + ${dio} − ${dpo} = ${ccc} days. DPO is SUBTRACTED because paying suppliers later extends the time before cash is needed. A shorter CCC = more efficient working capital management.`,
      concept: "Cash Conversion Cycle",
      los_tested: "calculate and interpret activity liquidity solvency and profitability ratios",
      misconception_targeted: "adding DPO instead of subtracting it in the CCC formula"
    };
  },
  // LIFO vs FIFO in inflation
  () => {
    const inflation = pick(["rising", "increasing"]);
    return {
      question: `During a period of ${inflation} inventory costs, compared to FIFO, a company using LIFO will report:`,
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
  }],
  "Fixed Income": [
  // Duration price sensitivity
  () => {
    const md = parseFloat(rnd(40, 90) / 10).toFixed(1);
    const dy = parseFloat(rnd(20, 80) / 100).toFixed(2);
    const price = rnd(95, 105);
    const dp = parseFloat(-parseFloat(md) * parseFloat(dy) / 100 * price).toFixed(3);
    const wrong1 = parseFloat(parseFloat(md) * parseFloat(dy) / 100 * price).toFixed(3);
    const wrong2 = parseFloat(-parseFloat(md) * parseFloat(dy) * price).toFixed(3);
    return {
      question: `A bond has a modified duration of ${md} and is priced at $${price}. If yields rise by ${dy}%, what is the approximate price change?`,
      options: {
        A: `$${dp}`,
        B: `$${wrong1} (positive — price rises with yields)`,
        C: `$${wrong2} (incorrect scaling)`
      },
      answer: "A",
      explanation: `ΔP ≈ −ModDuration × Δy × Price = −${md} × ${parseFloat(dy) / 100} × $${price} = $${dp}. The negative sign reflects the inverse price-yield relationship. A ${dy}% yield rise causes approximately a $${Math.abs(parseFloat(dp))} price decline.`,
      concept: "Modified Duration",
      los_tested: "define calculate and interpret modified duration money duration and the price value of a basis point",
      misconception_targeted: "forgetting the negative sign in the duration price change formula"
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
        B: `${wrong1} years (same as Macaulay)`,
        C: `${wrong2} years`
      },
      answer: "A",
      explanation: `Modified Duration = Macaulay Duration / (1 + y/m) = ${mac} / (1 + ${y}%/${m}) = ${mod}. Modified duration always < Macaulay duration. It directly measures the % price change for a 1% change in yield.`,
      concept: "Modified Duration",
      los_tested: "define calculate and interpret Macaulay duration",
      misconception_targeted: "confusing Macaulay and modified duration or treating them as equal"
    };
  },
  // Coupon and duration relationship
  () => {
    const c1 = rnd(2, 5),
      c2 = rnd(8, 12);
    const mat = rnd(5, 15);
    return {
      question: `Two bonds have identical maturities of ${mat} years and the same yield-to-maturity. Bond A has a coupon of ${c1}% and Bond B has a coupon of ${c2}%. Which bond has higher interest rate risk?`,
      options: {
        A: `Bond A (${c1}% coupon) — lower coupon means higher duration`,
        B: `Bond B (${c2}% coupon) — higher coupon means more cash flows to be discounted`,
        C: `Both bonds have identical interest rate risk since maturity and yield are the same`
      },
      answer: "A",
      explanation: `Lower coupon → higher duration → higher price sensitivity to yield changes. Bond A (${c1}% coupon) returns less cash earlier, so the weighted average time to receive cash flows (duration) is longer. Bond B's higher coupons reduce its duration despite identical maturity.`,
      concept: "Coupon and Duration",
      los_tested: "explain how a bond's maturity coupon and yield level affect its interest rate risk",
      misconception_targeted: "ignoring coupon rate's effect on duration when maturity is equal"
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
      question: `A stock just paid a dividend of $${d0} per share. The dividend is expected to grow at ${g}% per year indefinitely. The required return is ${r}%. What is the intrinsic value per share?`,
      options: {
        A: `$${v}`,
        B: `$${wrong1} (uses D₀ instead of D₁)`,
        C: `$${wrong2} (adds g instead of subtracting)`
      },
      answer: "A",
      explanation: `Gordon Growth Model: V = D₁/(r−g). D₁ = D₀×(1+g) = $${d0}×(1+${g}%) = $${d1}. V = $${d1}/(${r}%−${g}%) = $${v}. Always use next period's dividend (D₁), not the just-paid dividend (D₀).`,
      concept: "Gordon Growth Model",
      los_tested: "calculate and interpret the intrinsic value of an equity security based on the Gordon growth dividend discount model",
      misconception_targeted: "using D₀ instead of D₁ in the Gordon Growth Model"
    };
  },
  // P/E and growth
  () => {
    const pout = rnd(30, 60);
    const r = rnd(9, 13);
    const g = rnd(3, 6);
    const pe = parseFloat(pout / 100 / (r / 100 - g / 100)).toFixed(1);
    const wrong1 = parseFloat(1 / (r / 100 - g / 100)).toFixed(1);
    const wrong2 = parseFloat((1 - pout / 100) / (r / 100 - g / 100)).toFixed(1);
    return {
      question: `A company has a dividend payout ratio of ${pout}%, required return of ${r}%, and sustainable growth rate of ${g}%. What is the justified leading P/E?`,
      options: {
        A: `${pe}×`,
        B: `${wrong1}× (ignores payout ratio)`,
        C: `${wrong2}× (uses retention ratio instead of payout)`
      },
      answer: "A",
      explanation: `Justified leading P/E = Payout ratio / (r − g) = ${pout}% / (${r}% − ${g}%) = ${pe}×. The payout ratio reflects what fraction of earnings is distributed. Higher payout or lower (r−g) spread = higher justified P/E.`,
      concept: "P/E Valuation",
      los_tested: "explain the rationale for using price multiples to value equity and how the price to earnings multiple relates to fundamentals",
      misconception_targeted: "using retention ratio instead of payout ratio in the P/E formula"
    };
  },
  // Market Efficiency
  () => {
    const form = pick(["weak", "semi-strong", "strong"]);
    const implication = {
      "weak": "Technical analysis cannot generate consistent excess returns, but fundamental analysis may.",
      "semi-strong": "Neither technical nor fundamental analysis can generate consistent excess returns. Only inside information could.",
      "strong": "No analysis — including insider information — can generate consistent excess returns. Markets fully reflect all information."
    }[form];
    const wrongA = {
      "weak": "Both technical and fundamental analysis are useless",
      "semi-strong": "Technical analysis still works since only public info is priced in",
      "strong": "Fundamental analysis can still earn excess returns"
    }[form];
    return {
      question: `If markets are ${form}-form efficient, which statement BEST describes the implication for investment analysis?`,
      options: {
        A: wrongA,
        B: implication,
        C: "Passive management always outperforms active management regardless of efficiency form"
      },
      answer: "B",
      explanation: `${form.charAt(0).toUpperCase() + form.slice(1)}-form efficiency: ${implication} Each level of efficiency subsumes the previous — semi-strong includes weak-form, strong includes both.`,
      concept: "Market Efficiency",
      los_tested: "contrast weak-form semi-strong-form and strong-form market efficiency",
      misconception_targeted: "confusing which forms of analysis are rendered ineffective by each EMH form"
    };
  }],
  "Derivatives": [
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
      question: `A firm has ${wd}% debt (cost ${rd}%) and ${we}% equity (cost ${re}%), with a tax rate of ${t}%. What is the WACC?`,
      options: {
        A: `${wacc}%`,
        B: `${wrong1}% (no tax shield on debt)`,
        C: `${wrong2}% (simple average)`
      },
      answer: "A",
      explanation: `WACC = w_d×r_d×(1−t) + w_e×r_e = ${wd}%×${rd}%×(1−${t}%) + ${we}%×${re}% = ${wacc}%. The after-tax cost of debt reflects the interest tax shield. Use market value weights, not book value.`,
      concept: "WACC",
      los_tested: "calculate and interpret the weighted-average cost of capital for a company",
      misconception_targeted: "ignoring the tax shield on debt when calculating WACC"
    };
  },
  // NPV vs IRR conflict
  () => {
    const npvA = rnd(50, 200);
    const npvB = rnd(30, 160);
    const irrA = rnd(15, 22);
    const irrB = rnd(18, 28);
    const winner = npvA > npvB ? "A" : "B";
    const irrwinner = irrA > irrB ? "A" : "B";
    if (irrwinner === winner) {
      irrA += 5;
    } // ensure conflict
    return {
      question: `Project A has NPV = $${npvA}K and IRR = ${irrA}%. Project B has NPV = $${npvB}K and IRR = ${irrB}%. The projects are mutually exclusive. Which should be selected?`,
      options: {
        A: `Project ${winner} — NPV is the correct decision criterion for mutually exclusive projects`,
        B: `Project ${irrA > irrB ? "A" : "B"} — always choose the higher IRR`,
        C: `Cannot determine without knowing the cost of capital`
      },
      answer: "A",
      explanation: `When NPV and IRR conflict for mutually exclusive projects, use NPV. NPV measures absolute value creation, which is the firm's goal. IRR assumes reinvestment at the IRR rate — often unrealistic. Project ${winner} (NPV = $${Math.max(npvA, npvB)}K) creates more value.`,
      concept: "NPV vs IRR",
      los_tested: "describe the capital allocation process calculate NPV IRR and ROIC and contrast their use in capital allocation",
      misconception_targeted: "using IRR over NPV when they conflict for mutually exclusive projects"
    };
  }],
  "Portfolio Management": [
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
  const usedTemplates = new Set();

  // Shuffle template order to avoid always using same templates first
  const shuffledIdxs = [...Array(templates.length).keys()].sort(() => Math.random() - 0.5);
  for (let i = 0; i < count * 4 && questions.length < count; i++) {
    // Rotate through all templates before repeating
    const tIdx = shuffledIdxs[i % shuffledIdxs.length];
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
  const [currentQ, setCurrentQ] = useState(0);
  const [showExp, setShowExp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [fullExamMode, setFullExamMode] = useState(false);
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
    s.textContent = `@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}@keyframes fadeInScale{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}@keyframes glow{0%,100%{box-shadow:0 0 8px #6366f144}50%{box-shadow:0 0 18px #6366f188}}@keyframes correctFlash{0%{background:#022c22}50%{background:#064e3b}100%{background:#022c22}}*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#2a2848;border-radius:2px}button:focus-visible{outline:2px solid #6366f1;outline-offset:2px}`;
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

      // STEP 2b: If Supabase configured, try to load from there (more sessions may exist)
      const sbCfg = getSupabaseConfig();
      if (sbCfg) {
        const sbData = await supabaseLoad(sbCfg);
        if (sbData && Array.isArray(sbData.history) && sbData.history.length > bestHistory.length) {
          bestHistory = sbData.history.map(s => ({
            ...s,
            wrongs: []
          }));
          setHistory(bestHistory);
          historyRef.current = bestHistory;
          storageSet(STORAGE_KEY, bestHistory); // cache locally
          if (sbData.srDeck) setSrDeck(sbData.srDeck);
        }
      }

      // STEP 3: Load SR deck (stripped down)
      let bestSR = null;
      try {
        const val = await storageGet(SR_KEY);
        if (val && typeof val === "object" && !Array.isArray(val) && Object.keys(val).length > 0) {
          bestSR = val;
        }
      } catch {}
      if (bestSR) setSrDeck(bestSR);
      setSrLoaded(true);

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

    // Update SR deck
    qs.forEach(q => {
      const correct = ans[q.id] === q.answer;
      const key = `${t}|||${st}|||${q.id}`;
      setSrDeck(prev => {
        const existing = prev[key] || {
          concept: (q.concept || st).slice(0, 60),
          topic: t,
          subtopic: st,
          question: (q.question || "").slice(0, 180),
          options: q.options,
          answer: q.answer,
          explanation: (q.explanation || "").slice(0, 300),
          los_tested: (q.los_tested || "").slice(0, 100),
          wrongCount: 0
        };
        const updated = sm2Update(existing, correct);
        if (!correct) updated.wrongCount = (existing.wrongCount || 0) + 1;
        return {
          ...prev,
          [key]: updated
        };
      });
    });

    // QDB
    setQdb(prev => addToQDB(qs.map(q => ({
      ...q,
      _topic: t,
      _subtopic: st
    })), prev));

    // Build session object
    // History stores ONLY stats — no wrongs (they live in SR deck, keeps storage <100KB)
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
      wrongs: []
    };
    setLastSession(session);

    // Build newHistory using ref (always current)
    const newHistory = [session, ...historyRef.current];
    setHistory(newHistory); // update state for UI
    historyRef.current = newHistory; // update ref immediately

    // Auto-escalation
    const topicHistory = historyRef.current.filter(h => h.topic === t && h.subtopic === st && h.difficulty === diff);
    if (pct >= 80 && diff !== "Hard" && topicHistory.length >= 2) setAutoEscalation({
      topic: t,
      subtopic: st,
      from: diff,
      to: diff === "Easy" ? "Medium" : "Hard"
    });

    // Save to storage — progressive fallback
    // All sessions stats-only (no wrongs) — data is tiny, simple save
    (async () => {
      const ok = await storageSet(STORAGE_KEY, newHistory.slice(0, 300));
      setSessionSaved(ok);
      if (ok && apiKey) syncToDrive(newHistory.slice(0, 100));
      // Supabase sync (non-blocking)
      const sbCfg = getSupabaseConfig();
      if (sbCfg) supabaseSync(sbCfg, newHistory.slice(0, 300), srDeck).then(ok => ok && setDriveStatus("synced")).catch(() => {});
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
        const raw = data.content.map(i => i.text || "").join("").replace(/```json|```/g, "").trim();
        if (!raw) throw new Error("No text content in response");
        try {
          return JSON.parse(raw);
        } catch (e) {
          throw new Error(`JSON parse failed. Raw: ${raw.slice(0, 200)}`);
        }
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
  const generateQuestions = async (t, st, diff, cnt, m = "guided") => {
    if (generatingRef.current) {
      return;
    }
    generatingRef.current = true;
    setLoading(true);
    setError("");
    setLoadingProgress(0);
    setLoadingETA(null);
    loadingStartRef.current = Date.now();

    // ── Try local generation first (instant, no API needed) ──
    // Generate more than needed, then deduplicate by question text similarity
    const localRaw = generateLocalQuestions(t, st, diff, cnt * 3);
    const seen = new Set();
    const localQs = localRaw.filter(q => {
      // Dedup by first 60 chars of question (catches same template, different numbers somewhat)
      const key = (q.question || "").slice(0, 60).toLowerCase().replace(/\d+/g, "#");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, cnt);
    if (localQs.length >= Math.min(cnt, 3)) {
      setLoadingProgress(100);
      setLoadingMsg(`${localQs.length} questions ready!`);
      await new Promise(r => setTimeout(r, 300));
      setTopic(t);
      setSubtopic(st);
      setDifficulty(diff);
      setCount(cnt);
      setMode(m);
      setQuestions(localQs);
      setAnswers({});
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

    // ── Fallback to API (only if local templates don't cover this topic) ──
    if (!apiKey) {
      setError("No local questions available for this topic yet, and no API key is set. Add your API key via the 🔑 button.");
      setLoading(false);
      setLoadingProgress(0);
      generatingRef.current = false;
      return;
    }
    const estimatedMs = Math.max(5000, cnt * 900);
    const msgs = ["Reading LOS statements...", "Anchoring to 2026 curriculum...", "Engineering distractors...", "Checking for duplicates...", "Almost ready..."];
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
      const tightMax = {
        5: 700,
        10: 1400,
        15: 2000,
        20: 2600
      }[cnt] || 1400;
      const useModel = diff === "Easy" ? "claude-haiku-4-5-20251001" : "claude-sonnet-4-6";
      let parsed = await callClaude(buildQuestionPrompt(t, st, diff, cnt), tightMax, {
        retries: 3,
        retryDelay: 8000,
        model: useModel
      });
      // Expand short keys to full names
      if (Array.isArray(parsed)) parsed = expandQuestionKeys(parsed);
      if (!Array.isArray(parsed) || !parsed.length) throw new Error("Empty");
      const fresh = filterNewQuestions(parsed, qdb);
      const finalQs = fresh.length >= Math.ceil(cnt * 0.7) ? fresh : parsed;
      setLoadingProgress(100);
      setLoadingMsg("Questions ready!");
      await new Promise(r => setTimeout(r, 350));
      setTopic(t);
      setSubtopic(st);
      setDifficulty(diff);
      setCount(cnt);
      setMode(m);
      setQuestions(finalQs);
      setAnswers({});
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
  const startFullExam = async () => {
    setLoading(true);
    setError("");
    try {
      const allTopics = Object.entries(LOS);
      const totalW = allTopics.reduce((s, [, {
        weight
      }]) => s + weight, 0);
      let allQs = [];
      for (let i = 0; i < allTopics.length; i++) {
        const [t, {
          weight,
          modules
        }] = allTopics[i];
        const topicCount = Math.max(2, Math.round(weight / totalW * 180));
        const moduleNames = Object.keys(modules);
        // Distribute across ALL modules for this topic proportionally
        const perModule = Math.max(1, Math.floor(topicCount / moduleNames.length));
        for (const mod of moduleNames.slice(0, Math.ceil(topicCount / perModule))) {
          setLoadingMsg(`${t} › ${mod} (${i + 1}/${allTopics.length})…`);
          try {
            const qs = await callClaude(buildQuestionPrompt(t, mod, "Medium", perModule));
            allQs = [...allQs, ...qs.map((q, j) => ({
              ...q,
              id: `${i}_${j}_${mod.slice(0, 5)}`,
              _topic: t,
              _subtopic: mod
            }))];
          } catch {}
        }
      }
      if (allQs.length < 30) throw new Error("Too few questions generated");
      const shuffled = allQs.sort(() => Math.random() - 0.5);
      setTopic("Full Exam");
      setSubtopic("All Modules");
      setDifficulty("Medium");
      setCount(Math.min(90, shuffled.length));
      setMode("exam");
      setFullExamMode(true);
      setQuestions(shuffled.slice(0, Math.min(90, shuffled.length)));
      setAnswers({});
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

  // ══ HOME ══════════════════════════════════════════════════════════════════
  if (screen === "home") return wrap(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
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
  }, "days to exam"))), studyPace?.burnoutRisk ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.easy,
      textAlign: "center",
      padding: "5px 0",
      fontStyle: "italic",
      opacity: 0.9
    }
  }, "Welcome back. Every session counts — even 5 minutes. You've done this before. 💪") : /*#__PURE__*/React.createElement(MotivationalBanner, {
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
      background: `linear-gradient(135deg,${C.easy}12,${C.easy}06)`,
      border: `1px solid ${C.easy}44`,
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
      color: C.easyLight
    }
  }, "↑ Ready to level up"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 2
    }
  }, autoEscalation.subtopic, " → try ", autoEscalation.to)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      generateQuestions(autoEscalation.topic, autoEscalation.subtopic, autoEscalation.to, 10);
      setAutoEscalation(null);
    },
    style: {
      fontSize: 12,
      fontWeight: 700,
      padding: "6px 12px",
      borderRadius: 8,
      background: C.easy + "25",
      border: `1px solid ${C.easy}44`,
      color: C.easyLight,
      cursor: "pointer"
    }
  }, "Start ", autoEscalation.to), /*#__PURE__*/React.createElement("button", {
    onClick: () => setAutoEscalation(null),
    style: {
      fontSize: 12,
      padding: "5px 8px",
      borderRadius: 8,
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
    onClick: generateFocus,
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
  }, s.reason), selectedFocus === i && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      generateQuestions(s.topic, s.module, s.difficulty, s.count || 10, s.mode || "guided");
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
  }, "Start ", s.count || 10, " Questions →"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "13px 16px",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      letterSpacing: "0.08em",
      textTransform: "uppercase"
    }
  }, "30-Day Activity"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.muted
    }
  }, Object.values(activity).filter(v => v > 0).length, "/30 active days")), /*#__PURE__*/React.createElement("div", {
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
        width: 16,
        height: 16,
        borderRadius: 3,
        background: bg,
        transition: "background 0.2s"
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: C.muted
    }
  }, totalQsAttempted, " Qs attempted"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: C.muted
    }
  }, Object.keys(qdb).length, " unique seen"), totalWrongs > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: C.hard
    }
  }, totalWrongs, " wrong answers logged"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.surface,
      border: `1px solid ${C.accent}33`,
      borderRadius: 12,
      padding: "12px 14px",
      marginBottom: 12,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: C.accentLight
    }
  }, "⚡ Office Mode — 5 questions, ~7 min"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 2
    }
  }, "For lunch breaks or commutes. AI picks the highest-priority topic.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      // Pick highest-priority topic automatically
      const weak = moduleReadiness.filter(m => m.sessions === 0 && m.weight >= 9)[0] || moduleReadiness.filter(m => m.accuracy !== null).sort((a, b) => a.accuracy - b.accuracy)[0] || moduleReadiness[0];
      generateQuestions(weak.topic, weak.untouchedModules[0] || weak.modules[0], "Medium", 5, "guided");
    },
    style: {
      fontSize: 12,
      fontWeight: 700,
      padding: "8px 14px",
      borderRadius: 9,
      background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
      color: "#fff",
      border: "none",
      cursor: "pointer",
      flexShrink: 0
    }
  }, "Start →")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9,
      marginBottom: 9
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen("setup"),
    style: {
      flex: 2,
      padding: "14px",
      borderRadius: 12,
      fontSize: 14,
      fontWeight: 700,
      background: `linear-gradient(135deg,${C.accent},${C.accentLight})`,
      color: "#fff",
      border: "none",
      cursor: "pointer",
      boxShadow: `0 6px 20px ${C.accent}55`,
      letterSpacing: "-0.2px"
    }
  }, "Custom Mock →"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const weakModules = moduleReadiness.filter(m => m.sessions > 0).sort((a, b) => a.accuracy - b.accuracy).slice(0, 3);
      const target = weakModules[0] || moduleReadiness.find(m => m.sessions === 0) || moduleReadiness[0];
      if (target) generateQuestions(target.topic, target.modulesCovered[0] || target.modules[0], "Medium", 10, "guided");
    },
    style: {
      flex: 1,
      padding: "14px",
      borderRadius: 12,
      fontSize: 13,
      fontWeight: 700,
      background: C.surfaceHigh,
      border: `1px solid ${C.medium}44`,
      color: C.medium,
      cursor: "pointer"
    }
  }, "🎲 Mix")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 9,
      marginBottom: 9
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen("readiness"),
    style: {
      padding: "11px 8px",
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 600,
      background: C.surface,
      border: `1px solid ${C.border}`,
      color: C.textMid,
      cursor: "pointer"
    }
  }, "📊 Readiness"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen("passProbability"),
    style: {
      padding: "11px 8px",
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 700,
      background: passProbability ? `${passProbability.color}18` : C.surface,
      border: `1px solid ${passProbability ? passProbability.color + "44" : C.border}`,
      color: passProbability ? passProbability.color : C.muted,
      cursor: "pointer"
    }
  }, passProbability ? `${passProbability.probability}% Pass` : "Pass %"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setWeeklyPlanScreen(true),
    style: {
      padding: "11px 8px",
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 600,
      background: C.surface,
      border: `1px solid ${C.border}`,
      color: C.textMid,
      cursor: "pointer"
    }
  }, "🗓 Week Plan"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen("dashboard"),
    style: {
      padding: "11px 8px",
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 600,
      background: C.surface,
      border: `1px solid ${C.border}`,
      color: C.textMid,
      cursor: "pointer"
    }
  }, "📈 Dashboard"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setRevisionTopic(null);
      setRevisionTab("notes");
      setScreen("revision");
    },
    style: {
      padding: "11px 8px",
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 700,
      background: C.accent + "18",
      border: `1px solid ${C.accent}44`,
      color: C.accentLight,
      cursor: "pointer"
    }
  }, "📚 Revise"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
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
        setScreen("quiz");
      }
    },
    style: {
      padding: "11px 8px",
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 700,
      background: "#0a0820",
      border: `1px solid ${C.hard}44`,
      color: C.hard,
      cursor: "pointer"
    }
  }, "⚖️ Ethics Cases"), /*#__PURE__*/React.createElement("button", {
    onClick: startFullExam,
    disabled: loading,
    style: {
      padding: "11px 8px",
      borderRadius: 12,
      fontSize: 11,
      fontWeight: 700,
      background: C.surfaceHigh,
      border: `1px solid ${C.accentLight}33`,
      color: C.accentLight,
      cursor: loading ? "not-allowed" : "pointer"
    }
  }, "🎓 Full Exam")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9,
      marginBottom: 9
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const all = history.flatMap(h => Array.isArray(h.wrongs) ? h.wrongs : []).filter(w => w && w.question).slice(0, 50);
      if (all.length) {
        setReviewList(all);
        setReviewIdx(0);
        setScreen("review");
      } else {
        setError("No wrong answers yet — complete a session first.");
        setTimeout(() => setError(""), 3000);
      }
    },
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 600,
      background: C.surface,
      border: `1px solid ${C.border}`,
      color: totalWrongs > 0 ? C.hard : C.muted,
      cursor: "pointer",
      position: "relative"
    }
  }, "🔁 Wrongs", totalWrongs > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -4,
      right: -4,
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
  }, Math.min(totalWrongs, 99))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen("apiKey"),
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 600,
      background: apiKey ? C.easy + "15" : C.surface,
      border: `1px solid ${apiKey ? C.easy + "44" : C.border}`,
      color: apiKey ? C.easy : C.muted,
      cursor: "pointer"
    }
  }, "🔑 ", apiKey ? "API ✓" : "API Key"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen("backup"),
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 12,
      fontSize: 12,
      fontWeight: 600,
      background: C.surface,
      border: `1px solid ${C.border}`,
      color: C.muted,
      cursor: "pointer"
    }
  }, "💾 Backup")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: C.surface,
      border: `1px solid ${sessionSaved === false ? C.hard + "55" : C.border}`,
      borderRadius: 10,
      padding: "9px 14px",
      marginBottom: error ? 9 : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.textMid,
      fontWeight: 700
    }
  }, history.length), " sessions", history.length > 0 && /*#__PURE__*/React.createElement("span", null, " · ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.textMid
    }
  }, history[0]?.date), " ", history[0]?.topic?.split(" ")[0], " ", history[0]?.pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, driveStatus === "syncing" && /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.medium
    }
  }, "☁ syncing…"), driveStatus === "synced" && /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.easy
    }
  }, "☁ Drive ✓"), driveStatus === "error" && /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.hard
    }
  }, "☁ Drive ✗"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: sessionSaved === false ? C.hard : sessionSaved === true ? C.easy : C.muted
    }
  }, sessionSaved === false ? "⚠ local save failed" : sessionSaved === true ? "✓ saved" : ""))), error && /*#__PURE__*/React.createElement("div", {
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
  }, "Keys scanned: ", storageKeys.map(k => k.key).join(", ")))))));

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
    onClick: () => setScreen("home"),
    style: {
      background: "none",
      border: "none",
      color: C.muted,
      cursor: "pointer",
      fontSize: 13,
      marginBottom: 18,
      padding: 0
    }
  }, "← Back"), /*#__PURE__*/React.createElement("h2", {
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
  }, "Questions anchored to official 2026 CFA LOS · Misconception-engineered distractors · ClearCFA"), /*#__PURE__*/React.createElement("div", {
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
    onClick: () => generateQuestions(topic, subtopic, difficulty, count, mode),
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
  }, loading ? loadingMsg : `Generate ${count} LOS-Anchored Questions →`), loading && /*#__PURE__*/React.createElement("div", {
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
    }, "Select an answer to continue"), answered && /*#__PURE__*/React.createElement("button", {
      onClick: nextQ,
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
    }, isLast ? "See Results →" : "Next →"), currentQ > 2 && mode !== "exam" && /*#__PURE__*/React.createElement("button", {
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
    }, "📋 ", wrongs.length, " wrong answer", wrongs.length !== 1 ? "s" : "", " added to SR deck with LOS tags + misconception flags."), wrongs.length > 0 && /*#__PURE__*/React.createElement("div", {
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
    }, "Error pattern: "), q.misconception_targeted))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 9,
        marginBottom: 9
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
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
      onClick: () => setScreen("setup"),
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
      marginBottom: 16
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
      const ok = await supabaseSync(cfg, history, srDeck);
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
      fontSize: 11,
      color: "#22c55e",
      background: "#0a1f0a",
      borderRadius: 8,
      padding: "8px 12px",
      marginBottom: 12
    }
  }, "✅ Supabase connected — sessions auto-sync after every quiz")), /*#__PURE__*/React.createElement("div", {
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

  // ══ REVISION SCREEN ══════════════════════════════════════════════════════════
  if (screen === "revision") return /*#__PURE__*/React.createElement(RevisionScreen, {
    onBack: () => setScreen("home"),
    initialTopic: revisionTopic,
    initialTab: revisionTab
  });
  return null;
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(CFAMock));