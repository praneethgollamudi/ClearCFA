// ─── CURRICULUM DATA (L1 / L2 / L3) ─────────────────────────────────────────
const LOS = {
  "Ethics": { weight:15, modules: {
    "Ethics & Trust in Investment Profession": ["explain ethics and describe the role of a code of ethics in defining a profession","describe professions and how they establish trust and the need for high ethical standards","explain professionalism in investment management and identify challenges to ethical behavior","compare and contrast ethical standards with legal standards","describe a framework for ethical decision making"],
    "Code of Ethics & Standards": ["describe the structure of the CFA Institute Professional Conduct Program and enforcement process","identify the six components of the Code of Ethics and the seven Standards of Professional Conduct","explain the ethical responsibilities required by the Code and Standards including sub-sections of each Standard"],
    "Standard I – Professionalism": ["demonstrate application of Standard I-A: Knowledge of the Law","demonstrate application of Standard I-B: Independence and Objectivity","demonstrate application of Standard I-C: Misrepresentation","demonstrate application of Standard I-D: Misconduct"],
    "Standard II – Integrity of Capital Markets": ["demonstrate application of Standard II-A: Material Nonpublic Information","demonstrate application of Standard II-B: Market Manipulation"],
    "Standard III – Duties to Clients": ["demonstrate application of Standard III-A: Loyalty, Prudence, and Care","demonstrate application of Standard III-B: Fair Dealing","demonstrate application of Standard III-C: Suitability","demonstrate application of Standard III-D: Performance Presentation","demonstrate application of Standard III-E: Preservation of Confidentiality"],
    "Standard IV – Duties to Employers": ["demonstrate application of Standard IV-A: Loyalty","demonstrate application of Standard IV-B: Additional Compensation Arrangements","demonstrate application of Standard IV-C: Responsibilities of Supervisors"],
    "Standard V – Investment Analysis": ["demonstrate application of Standard V-A: Diligence and Reasonable Basis","demonstrate application of Standard V-B: Communication with Clients and Prospective Clients","demonstrate application of Standard V-C: Record Retention"],
    "Standard VI – Conflicts of Interest": ["demonstrate application of Standard VI-A: Disclosure of Conflicts","demonstrate application of Standard VI-B: Priority of Transactions","demonstrate application of Standard VI-C: Referral Fees"],
    "Standard VII – CFA Member Responsibilities": ["demonstrate application of Standard VII-A: Conduct as Participants in CFA Institute Programs","demonstrate application of Standard VII-B: Reference to CFA Institute, the CFA Designation, and CFA Program"],
    "GIPS": ["explain why the GIPS standards were created, who can claim compliance, and who benefits","describe the key concepts of the GIPS Standards for Firms","explain the purpose of composites in performance reporting","describe the fundamentals of compliance including the firm's definition of discretion","describe the concept of independent verification","evaluate practices, policies, and conduct relative to Code of Ethics and Standards"],
  }},
  "Quantitative Methods": { weight:8, modules: {
    "Rates and Returns": ["interpret interest rates as required rates of return, discount rates, or opportunity costs","calculate and interpret different approaches to return measurement over time","compare money-weighted and time-weighted rates of return and evaluate portfolio performance","calculate and interpret annualized return measures and continuously compounded returns"],
    "Time Value of Money": ["calculate and interpret the present value of fixed-income and equity instruments based on expected future cash flows","calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments","explain the cash flow additivity principle and its use in calculating implied forward interest rates and option values"],
    "Statistical Concepts & Distributions": ["calculate interpret and evaluate measures of central tendency and location","calculate interpret and evaluate measures of dispersion","interpret and evaluate measures of skewness and kurtosis","interpret correlation between two variables","explain the relationship between normal and lognormal distributions and why lognormal is used to model asset prices","describe Monte Carlo simulation and explain how it can be used in investment applications","describe bootstrap resampling in conducting a simulation based on observed data"],
    "Probability Concepts": ["calculate expected values variances and standard deviations and demonstrate their application to investment problems","formulate an investment problem as a probability tree and explain conditional expectations","calculate and interpret an updated probability using Bayes' formula","calculate and interpret expected value variance standard deviation covariances and correlations of portfolio returns","define shortfall risk calculate the safety-first ratio and identify an optimal portfolio using Roy's safety-first criterion"],
    "Hypothesis Testing": ["explain hypothesis testing and its components including statistical significance Type I and Type II errors and the power of a test","construct hypothesis tests and determine their statistical significance associated Type I and Type II errors and power given a significance level","compare and contrast parametric and nonparametric tests","explain parametric and nonparametric tests of the hypothesis that the population correlation coefficient equals zero","explain tests of independence based on contingency table data","compare simple random stratified random cluster convenience and judgmental sampling","explain the central limit theorem and its importance for the distribution and standard error of the sample mean"],
    "Correlation & Regression": ["describe a simple linear regression model and how least squares criterion is used to estimate regression coefficients","explain the assumptions underlying the simple linear regression model and how residuals indicate if assumptions are violated","calculate and interpret measures of fit and formulate and evaluate tests of fit and regression coefficients","describe the use of ANOVA in regression analysis and calculate the standard error of estimate","calculate and interpret the predicted value for the dependent variable and a prediction interval","describe different functional forms of simple linear regressions"],
  }},
  "Economics": { weight:8, modules: {
    "Firm & Market Structures": ["determine and interpret breakeven and shutdown points of production and how economies of scale affect costs","describe characteristics of perfect competition monopolistic competition oligopoly and pure monopoly","explain supply and demand relationships under monopolistic competition including optimal price and output","explain supply and demand relationships under oligopoly including optimal price and output","identify the type of market structure within which a firm operates and describe concentration measures"],
    "Aggregate Output & Business Cycles": ["describe the business cycle and its phases","describe credit cycles","describe how resource use consumer and business activity housing sector activity and external trade vary over the business cycle"],
    "Monetary Policy": ["describe the roles and objectives of central banks","describe tools used to implement monetary policy and the monetary transmission mechanism","describe qualities of effective central banks and contrast their use of inflation interest rate and exchange rate targeting","explain the interaction of monetary and fiscal policy"],
    "Fiscal Policy": ["compare monetary and fiscal policy","describe roles and objectives of fiscal policy and arguments about whether the size of national debt relative to GDP matters","describe tools of fiscal policy including their advantages and disadvantages","explain the implementation of fiscal policy and difficulties of implementation"],
    "International Trade & Currency": ["describe the benefits and costs of international trade","compare types of trade restrictions such as tariffs quotas and export subsidies","explain motivations for and advantages of trading blocs common markets and economic unions","describe the foreign exchange market including its functions and participants","describe exchange rate regimes and explain the effects of exchange rates on international trade and capital flows","calculate and interpret currency cross-rates","explain the arbitrage relationship between spot and forward exchange rates and calculate a forward rate","describe geopolitical risk and tools of geopolitics and their impact on regions and economies"],
  }},
  "Financial Statement Analysis": { weight:13, modules: {
    "FSA Framework & Sources": ["describe the steps in the financial statement analysis framework","describe the roles of financial statement analysis","describe the importance of regulatory filings financial statement notes management's commentary and audit reports","describe implications for financial analysis of alternative financial reporting systems"],
    "Income Statement Analysis": ["describe general principles of revenue recognition and specific revenue recognition applications","describe general principles of expense recognition and contrast costs that are capitalized versus those that are expensed","describe the financial reporting treatment of non-recurring items and changes in accounting policies","describe how earnings per share is calculated and calculate basic and diluted EPS for companies with simple and complex capital structures","evaluate a company's financial performance using common-size income statements and financial ratios"],
    "Balance Sheet Analysis": ["explain the financial reporting and disclosures related to intangible assets","explain the financial reporting and disclosures related to goodwill","explain the financial reporting and disclosures related to financial instruments","explain the financial reporting and disclosures related to non-current liabilities","calculate and interpret common-size balance sheets and related financial ratios"],
    "Cash Flow Statement": ["describe how the cash flow statement is linked to the income statement and the balance sheet","describe the steps in the preparation of direct and indirect cash flow statements","demonstrate the conversion of cash flows from the indirect to direct method","contrast cash flow statements prepared under IFRS and US GAAP","analyze and interpret both reported and common-size cash flow statements","calculate and interpret free cash flow to the firm free cash flow to equity and performance and coverage cash flow ratios"],
    "Inventories & Long-Lived Assets": ["describe the measurement of inventory at the lower of cost and net realisable value and its implications","calculate and explain how inflation and deflation of inventory costs affect financial statements and ratios","compare the financial reporting of intangible assets purchased internally developed and acquired in a business combination","explain and evaluate how impairment and derecognition of property plant and equipment and intangible assets affect financial statements"],
    "Income Taxes & Long-Term Liabilities": ["contrast accounting profit taxable income taxes payable and income tax expense and temporary versus permanent differences","explain how deferred tax liabilities and assets are created and factors that determine how they should be treated for financial analysis","calculate interpret and contrast an issuer's effective tax rate statutory tax rate and cash tax rate","explain the financial reporting of leases from the perspectives of lessors and lessees","explain the financial reporting of defined contribution defined benefit and stock-based compensation plans"],
    "Financial Ratios": ["describe tools and techniques used in financial analysis including their uses and limitations","calculate and interpret activity liquidity solvency and profitability ratios","describe relationships among ratios and evaluate a company using ratio analysis","demonstrate the application of DuPont analysis of return on equity and calculate and interpret effects of changes in its components","describe the uses of industry-specific ratios used in financial analysis"],
    "Financial Reporting Quality": ["compare financial reporting quality with the quality of reported results including quality of earnings cash flow and balance sheet items","describe a spectrum for assessing financial reporting quality","explain the difference between conservative and aggressive accounting","describe motivations that might cause management to issue financial reports that are not high quality","describe accounting warning signs and methods for detecting manipulation of information in financial reports","describe presentation choices including non-GAAP measures that could be used to influence an analyst's opinion"],
  }},
  "Corporate Issuers": { weight:9, modules: {
    "Corporate Structure & Governance": ["compare the organizational forms of businesses","describe key features of corporate issuers","compare publicly and privately owned corporate issuers","describe the principal-agent relationship and conflicts that may arise between stakeholder groups","describe corporate governance and mechanisms to manage stakeholder relationships and mitigate risks","describe potential risks of poor corporate governance and benefits of effective corporate governance","describe environmental social and governance factors of corporate issuers considered by investors"],
    "Working Capital Management": ["explain the cash conversion cycle and compare issuers' cash conversion cycles","explain liquidity and compare issuers' liquidity levels","describe issuers' objectives and compare methods for managing working capital and liquidity"],
    "Capital Investments & Allocation": ["describe types of capital investments","describe the capital allocation process calculate NPV IRR and ROIC and contrast their use in capital allocation","describe principles of capital allocation and common capital allocation pitfalls","describe types of real options relevant to capital investments"],
    "Capital Structure & Leverage": ["calculate and interpret the weighted-average cost of capital for a company","explain factors affecting capital structure and the weighted-average cost of capital","explain the Modigliani-Miller propositions regarding capital structure","describe optimal and target capital structures"],
    "Business Models & ESG": ["describe key features of business models","describe various types of business models","compare the financial claims and motivations of lenders and shareholders","describe a company's stakeholder groups and compare their interests"],
  }},
  "Equity": { weight:11, modules: {
    "Market Organization & Structure": ["explain the main functions of the financial system","describe classifications of assets and markets","describe the major types of securities currencies contracts commodities and real assets that trade in organized markets","compare positions an investor can take in an asset","calculate and interpret the leverage ratio the rate of return on a margin transaction and the security price at which the investor would receive a margin call","compare execution validity and clearing instructions and compare market orders with limit orders","describe how securities contracts and currencies are traded in quote-driven order-driven and brokered markets","describe objectives of market regulation"],
    "Security Market Indices": ["describe a security market index and calculate and interpret the value price return and total return of an index","describe the choices and issues in index construction and management","compare the different weighting methods used in index construction and calculate value and return given weighting method","describe rebalancing and reconstitution of an index","describe types of equity indexes fixed-income indexes and indexes representing alternative investments"],
    "Market Efficiency": ["describe market efficiency and related concepts including their importance to investment practitioners","contrast market value and intrinsic value and explain factors that affect a market's efficiency","contrast weak-form semi-strong-form and strong-form market efficiency","explain the implications of each form of market efficiency for fundamental analysis technical analysis and active vs passive management","describe market anomalies and behavioral finance and its potential relevance to understanding market anomalies"],
    "Equity Valuation – DDM & Multiples": ["evaluate whether a security given its current market price and a value estimate is overvalued fairly valued or undervalued","describe major categories of equity valuation models","explain the rationale for using present value models to value equity and describe the dividend discount and free-cash-flow-to-equity models","calculate and interpret the intrinsic value of an equity security based on the Gordon growth dividend discount model or a two-stage DDM","explain the rationale for using price multiples to value equity and how the price to earnings multiple relates to fundamentals","calculate and interpret price to earnings price to operating cash flow price to sales and price to book value multiples","describe enterprise value multiples and their use in estimating equity value","calculate the intrinsic value of a non-callable non-convertible preferred stock"],
    "Industry & Company Analysis": ["describe the purposes of and steps involved in industry and competitive analysis","determine an industry's size growth characteristics profitability and market share trends","analyze an industry's structure and external influences using Porter's Five Forces and PESTLE frameworks","evaluate the competitive strategy and position of a company","evaluate a company's revenue and revenue drivers including pricing power","evaluate a company's operating profitability and working capital using key measures"],
  }},
  "Fixed Income": { weight:11, modules: {
    "Bond Features & Pricing": ["describe the features of a fixed-income security and the contents of a bond indenture","describe common cash flow structures of fixed-income instruments and contrast cash flow contingency provisions","describe how legal regulatory and tax considerations affect the issuance and trading of fixed-income securities","calculate a bond's price given a yield-to-maturity on or between coupon dates","identify the relationships among a bond's price coupon rate maturity and yield-to-maturity","describe matrix pricing","describe funding choices by sovereign and non-sovereign governments quasi-government entities and supranational agencies"],
    "Yield Measures & Duration": ["calculate annual yield on a bond for varying compounding periods in a year","compare calculate and interpret yield and yield spread measures for fixed-rate bonds","calculate and interpret yield spread measures for floating-rate instruments and yield measures for money market instruments","define spot rates and the spot curve and calculate the price of a bond using spot rates","define par and forward rates and calculate par rates forward rates from spot rates spot rates from forward rates","calculate and interpret the sources of return from investing in a fixed-rate bond","define calculate and interpret Macaulay duration","define calculate and interpret modified duration money duration and the price value of a basis point","explain how a bond's maturity coupon and yield level affect its interest rate risk","calculate and interpret convexity and describe the convexity adjustment","calculate the percentage price change of a bond for a specified change in yield given duration and convexity"],
    "Credit Analysis": ["describe credit risk and its components probability of default and loss given default","describe the uses of ratings from credit rating agencies and their limitations","describe macroeconomic market and issuer-specific factors that influence the level and volatility of yield spreads","explain special considerations when evaluating the credit of sovereign and non-sovereign government debt issuers","describe the qualitative and quantitative factors used to evaluate a corporate borrower's creditworthiness","calculate and interpret financial ratios used in credit analysis","describe the seniority rankings of debt secured versus unsecured debt and the priority of claims in bankruptcy"],
    "Structured Products & MBS": ["explain benefits of securitization for issuers investors economies and financial markets","describe securitization including the parties and the roles they play","describe characteristics and risks of covered bonds and how they differ from other asset-backed securities","describe typical credit enhancement structures used in securitizations","describe types and characteristics of non-mortgage asset-backed securities including the cash flows and risks","define prepayment risk and describe time tranching structures in securitizations","describe types and characteristics of residential mortgage-backed securities including mortgage pass-through securities and CMOs","describe characteristics and risks of commercial mortgage-backed securities"],
    "Short-Term Funding & Repos": ["compare short-term funding alternatives available to corporations and financial institutions","describe repurchase agreements their uses and their benefits and risks","contrast the long-term funding of investment-grade versus high-yield corporate issuers"],
  }},
  "Derivatives": { weight:6, modules: {
    "Derivative Features & Markets": ["define a derivative and describe basic features of a derivative instrument","describe the basic features of derivative markets and contrast over-the-counter and exchange-traded derivative markets","define forward contracts futures contracts swaps options and credit derivatives and compare their basic characteristics","contrast forward commitments with contingent claims","describe benefits and risks of derivative instruments and compare the use of derivatives among issuers and investors"],
    "Forwards & Futures": ["explain how the value and price of a forward contract are determined at initiation during the life of the contract and at expiration","explain how forward rates are determined for interest rate forward contracts","compare the value and price of forward and futures contracts and explain why forward and futures prices differ","explain how the concepts of arbitrage and replication are used in pricing derivatives","explain the difference between the spot and expected future price of an underlying and the cost of carry"],
    "Options – Payoffs & Strategies": ["determine the value at expiration and profit from a long or a short position in a call or put option","explain the exercise value moneyness and time value of an option","identify the factors that determine the value of an option and describe how each factor affects the value of an option","explain put-call parity for European options and put-call forward parity for European options","explain how to value a derivative using a one-period binomial model","describe the concept of risk neutrality in derivatives pricing"],
    "Swaps": ["describe how swap contracts are similar to but different from a series of forward contracts","contrast the value and price of swaps","explain the pricing and valuation of interest rate and other swaps"],
  }},
  "Alternatives": { weight:7, modules: {
    "Alternative Investment Features": ["describe features and categories of alternative investments","compare direct investment co-investment and fund investment methods for alternative investments","describe investment ownership and compensation structures commonly used in alternative investments","describe the performance appraisal of alternative investments","calculate and interpret alternative investment returns both before and after fees"],
    "Private Equity & Debt": ["explain features of private equity and its investment characteristics","explain features of private debt and its investment characteristics","describe the diversification benefits that private capital can provide"],
    "Real Assets & Infrastructure": ["explain features and characteristics of real estate and the investment characteristics of real estate investments","explain features and characteristics of infrastructure and the investment characteristics of infrastructure investments","explain features of raw land timberland and farmland and their investment characteristics","describe features of commodities and their investment characteristics","analyze sources of risk return and diversification among natural resource investments"],
    "Hedge Funds": ["explain investment features of hedge funds and contrast them with other asset classes","describe investment forms and vehicles used in hedge fund investments","analyze sources of risk return and diversification among hedge fund investments"],
    "Digital Assets": ["describe financial applications of distributed ledger technology","explain investment features of digital assets and contrast them with other asset classes","describe investment forms and vehicles used in digital asset investments","analyze sources of risk return and diversification among digital asset investments"],
  }},
  "Portfolio Management": { weight:8, modules: {
    "Portfolio Risk & Return": ["describe characteristics of the major asset classes that investors consider in forming portfolios","explain risk aversion and its implications for portfolio selection","calculate and interpret the mean variance and covariance of asset returns based on historical data","calculate and interpret portfolio standard deviation","describe the effect on a portfolio's risk of investing in assets that are less than perfectly correlated","describe and interpret the minimum-variance and efficient frontiers of risky assets and the global minimum-variance portfolio","explain the selection of an optimal portfolio given an investor's utility and the capital allocation line"],
    "CAPM & Factor Models": ["describe the implications of combining a risk-free asset with a portfolio of risky assets","explain the capital allocation line and the capital market line","explain systematic and nonsystematic risk and why an investor should not expect to receive additional return for bearing nonsystematic risk","explain return generating models including the market model and their uses","calculate and interpret beta","explain the capital asset pricing model including its assumptions and the security market line","calculate and interpret the expected return of an asset using the CAPM","calculate and interpret the Sharpe ratio Treynor ratio M2 and Jensen's alpha"],
    "Portfolio Planning & Construction": ["describe the reasons for a written investment policy statement","describe the major components of an IPS","describe risk and return objectives and how they may be developed for a client","explain the difference between the willingness and the ability to take risk","describe the investment constraints of liquidity time horizon tax concerns legal and regulatory factors and unique circumstances","explain the specification of asset classes in relation to asset allocation","describe how ESG considerations may be integrated into portfolio planning and construction","describe the steps in the portfolio management process","describe types of investors and distinctive characteristics and needs of each"],
    "Behavioral Finance & Biases": ["compare and contrast cognitive errors and emotional biases","discuss commonly recognized behavioral biases and their implications for financial decision making","describe how behavioral biases of investors can lead to market characteristics not explained by traditional finance"],
    "Risk Management": ["define risk management and describe features of a risk management framework","define risk governance and describe elements of effective risk governance","explain how risk tolerance affects risk management","describe risk budgeting and its role in risk governance","identify financial and non-financial sources of risk and describe how they may interact","describe methods for measuring and modifying risk exposures and factors to consider in choosing among the methods"],
  }},
};

// LOS verb difficulty mapping
const LOS_VERB_DIFFICULTY = {
  Easy: ["describe","define","identify","explain","list","name","state","recognize","recall","outline"],
  Medium: ["calculate","compare","contrast","interpret","demonstrate","apply","classify","distinguish"],
  Hard: ["evaluate","analyze","formulate","assess","critique","justify","recommend","construct","synthesize"],
};

const TOPIC_MAP = {};
Object.entries(LOS).forEach(([topic,{weight,modules}])=>{TOPIC_MAP[topic]={weight,subtopics:Object.keys(modules)};});

// Common misconceptions per topic for distractor engineering
const MISCONCEPTIONS = {
  "Ethics": ["confusing 'should' with 'must' in Standards","applying employer policy over CFA Standards","assuming disclosure alone removes conflict of interest","confusing independence with objectivity","mixing personal trading rules with client trading rules"],
  "Quantitative Methods": ["confusing Type I and Type II error","mixing money-weighted with time-weighted return","applying arithmetic mean when geometric mean is required","confusing standard deviation with variance","misidentifying the null hypothesis direction"],
  "Financial Statement Analysis": ["confusing operating and financing cash flows","mixing LIFO and FIFO effects on profitability vs inventory","confusing deferred tax asset with deferred tax liability","misapplying direct vs indirect cash flow method","confusing basic and diluted EPS for antidilutive securities"],
  "Fixed Income": ["confusing Macaulay and modified duration","misidentifying price-yield relationship direction","confusing coupon rate with current yield with YTM","mixing par value with market value in yield calculations","confusing prepayment risk with extension risk"],
  "Equity": ["confusing price return with total return index","misapplying Gordon growth model assumptions","confusing EV/EBITDA with P/E interpretation","mixing strong-form with semi-strong-form market efficiency","confusing book value with market value"],
  "Portfolio Management": ["confusing systematic with unsystematic risk","misinterpreting beta greater than 1 vs less than 1","confusing Sharpe ratio with Treynor ratio use cases","mixing CML with SML application","confusing risk tolerance with risk capacity"],
  "Derivatives": ["confusing long put payoff with short call","misidentifying which party benefits from forward price vs spot","confusing intrinsic value with time value of options","mixing cost of carry direction for different underlying assets","confusing value and price of a swap at inception"],
  "Alternatives": ["confusing 2-and-20 calculation timing","mixing committed capital with invested capital for PE IRR","confusing direct cap rate with discount rate for real estate","misidentifying hedge fund strategy from return pattern","confusing NAV per share calculation for funds"],
  "Economics": ["confusing monetary vs fiscal policy transmission","misidentifying expansionary vs contractionary policy","confusing current account with capital account","mixing nominal and real exchange rate appreciation direction","confusing oligopoly with monopolistic competition features"],
  "Corporate Issuers": ["confusing NPV and IRR decision rules when they conflict","misidentifying Modigliani-Miller proposition with vs without taxes","confusing cash conversion cycle components","mixing target capital structure with optimal capital structure","confusing operating leverage with financial leverage"],
};
const LOS_L2 = {
  "Ethics": {weight: 10, modules: {
    "Code & Standards Application": [
      "evaluate professional conduct and identify violations of the CFA Institute Code of Ethics and Standards of Professional Conduct in complex multi-party scenarios",
      "distinguish between conduct that violates Standard II-A (Material Nonpublic Information) and legitimate mosaic theory research",
      "apply Standard III-C (Suitability) to institutional clients including updating IPS when client circumstances change",
      "evaluate conflicts of interest under Standard VI-A and determine whether disclosure alone is sufficient or whether recusal is required",
      "demonstrate correct application of Standard V-A (Diligence and Reasonable Basis) when relying on quantitative models and third-party research",
      "apply Standard I-B (Independence and Objectivity) in research analyst contexts involving investment banking relationships and issuer-paid research"
    ],
    "Research Objectivity Standards": [
      "describe the CFA Institute Research Objectivity Standards and their purpose in promoting unbiased investment research",
      "identify policies required under the Research Objectivity Standards including coverage initiation, rating systems, and compensation structures",
      "evaluate whether a firm's research practices comply with Research Objectivity Standards in scenarios involving conflicts between research and investment banking",
      "distinguish between required and recommended policies under the Research Objectivity Standards",
      "explain how the Research Objectivity Standards address analyst compensation, personal trading, and quiet periods around IPOs"
    ],
    "Asset Manager Code": [
      "describe the six components of the Asset Manager Code of Professional Conduct",
      "explain the loyalty, care, and acting in good faith duties owed to clients under the Asset Manager Code",
      "evaluate whether an asset management firm's practices comply with the Asset Manager Code in scenarios involving performance reporting, disclosure, and trading",
      "distinguish between the Asset Manager Code (firm-level) and the CFA Standards (individual-level) and explain how they interact",
      "identify required disclosures to clients under the Asset Manager Code including conflicts of interest, fee structures, and risk exposures",
      "explain the risk management, compliance, and support provisions of the Asset Manager Code"
    ]
  }},
  "Quantitative Methods": {weight: 5, modules: {
    "Multiple Regression & Issues": [
      "formulate and interpret a multiple regression model including coefficients, t-statistics, F-statistic, and R²",
      "explain the assumptions of multiple regression and describe the consequences of violating each assumption",
      "identify and correct for heteroskedasticity using White-corrected standard errors and describe how it affects hypothesis tests",
      "identify and correct for serial correlation using Newey-West standard errors and the Durbin-Watson statistic",
      "identify multicollinearity using variance inflation factors and condition numbers and describe its effects on regression estimates",
      "evaluate model specification errors including omitted variables, inappropriate functional form, and data mining bias"
    ],
    "Time-Series Analysis": [
      "describe the structure of autoregressive (AR) models and calculate one-step-ahead forecasts",
      "explain the mean-reversion level of an AR model and determine whether an AR model is covariance stationary",
      "test for unit roots using the Dickey-Fuller test and explain why non-stationarity causes spurious regressions",
      "describe cointegration and explain how error-correction models exploit cointegrated relationships",
      "explain seasonality in time series and describe how to detect and correct for it",
      "compare AR, MA, and ARMA models and select the appropriate model using the AIC and BIC criteria"
    ],
    "Machine Learning": [
      "explain the differences between supervised, unsupervised, and reinforcement learning methods and provide investment applications of each",
      "describe the bias-variance trade-off and explain overfitting, underfitting, and regularization techniques (LASSO, ridge)",
      "explain cross-validation and its role in preventing overfitting and selecting hyperparameters",
      "describe k-means clustering, principal component analysis, and their applications in portfolio construction and risk decomposition",
      "explain neural networks and deep learning and identify their limitations in financial applications including interpretability and data requirements"
    ]
  }},
  "Economics": {weight: 5, modules: {
    "Currency Exchange Rates": [
      "calculate and interpret currency cross-rates and identify arbitrage opportunities from triangular arbitrage",
      "explain covered interest rate parity and calculate the forward exchange rate given spot rate and interest rates in two countries",
      "explain uncovered interest rate parity and distinguish it from covered interest rate parity in terms of risk and empirical validity",
      "explain purchasing power parity (absolute and relative) and evaluate whether currencies are overvalued or undervalued relative to PPP",
      "describe the international Fisher effect and its relationship to uncovered interest rate parity",
      "explain the balance of payments approach and the asset market approach to exchange rate determination"
    ],
    "Economic Growth": [
      "explain the sources of economic growth including labor, capital, and total factor productivity",
      "describe the neoclassical (Solow) growth model including steady state, convergence, and the role of saving rates and technology",
      "explain endogenous growth theory and contrast it with neoclassical theory regarding the long-run role of capital accumulation and policy",
      "evaluate the sustainability of a country's growth rate given labor force growth and capital investment trends",
      "describe factors that affect long-run economic growth including human capital, infrastructure, and institutional quality"
    ],
    "Regulation & Market Structure": [
      "explain the rationale for and tools of government regulation in financial markets",
      "describe regulatory capture and explain how it can undermine the effectiveness of financial regulation",
      "compare the costs and benefits of different regulatory approaches including principles-based vs rules-based regulation",
      "explain how market structure (industry concentration, barriers to entry) affects pricing power and profitability",
      "analyze the effects of different types of regulation on market competition, innovation, and consumer welfare"
    ]
  }},
  "Financial Statement Analysis": {weight: 10, modules: {
    "Intercorporate Investments": [
      "describe the classification and measurement of intercorporate investments under IFRS and US GAAP including held-to-maturity, available-for-sale, trading, and fair value through OCI",
      "apply the equity method to account for investments in associates and calculate equity income, carrying value, and the investor's share of earnings",
      "explain when consolidation is required and describe the acquisition method including calculation of goodwill and non-controlling interest",
      "compare the financial statement effects of the equity method versus full consolidation on revenue, assets, leverage, and profitability ratios",
      "evaluate the impact of impairment of goodwill and equity-method investments on financial statements",
      "describe the accounting for joint ventures under IFRS (equity method) and US GAAP and explain differences in reporting"
    ],
    "Employee Compensation": [
      "explain defined contribution (DC) and defined benefit (DB) pension plans and the financial reporting implications for each",
      "calculate pension expense, plan assets, projected benefit obligation (PBO), and funded status under IFRS and US GAAP",
      "explain the components of periodic pension cost including service cost, interest cost, expected return on assets, and actuarial gains/losses",
      "describe how IFRS and US GAAP differ in recognizing actuarial gains and losses (OCI corridor vs immediate recognition)",
      "evaluate the impact of key actuarial assumptions (discount rate, expected return on assets, salary growth) on pension expense and funded status",
      "explain stock-based compensation including stock options and restricted stock and describe the financial reporting under IFRS and US GAAP"
    ],
    "Multinational Operations": [
      "distinguish between the functional currency, local currency, and presentation currency and explain how each affects translation",
      "apply the current rate method and the temporal method of foreign currency translation and identify when each is appropriate",
      "calculate the cumulative translation adjustment (CTA) and explain how it arises and where it appears in financial statements",
      "evaluate the impact of exchange rate movements on translated financial statements under current rate vs temporal methods",
      "explain transaction exposure versus translation exposure and describe how companies manage each",
      "describe the impact of hyperinflationary accounting on multinational financial statements under IFRS and US GAAP"
    ],
    "Financial Institutions Analysis": [
      "describe the unique features of financial institution balance sheets including leverage, liquidity, and asset quality considerations",
      "explain key regulatory ratios for banks including Tier 1 capital ratio, leverage ratio, and liquidity coverage ratio (LCR)",
      "analyze bank performance using net interest margin, efficiency ratio, return on assets, and return on equity",
      "evaluate credit risk for banks using non-performing loan ratios, loan loss provision coverage, and allowance for credit losses",
      "describe the business models of insurance companies and the metrics used to evaluate their performance including combined ratio and reserve adequacy"
    ],
    "Quality of Earnings": [
      "describe the spectrum of financial reporting quality from GAAP-compliant high-quality earnings to fraudulent misrepresentation",
      "identify accrual-based and real earnings management techniques and explain how each distorts reported earnings",
      "calculate accruals ratios and interpret the relationship between high accruals and low earnings quality",
      "identify red flags in financial reports including aggressive revenue recognition, unusual reserve changes, and unexplained ratio movements",
      "evaluate the sustainability and predictability of reported earnings by distinguishing recurring from non-recurring items",
      "explain how management can use discretionary accounting choices (depreciation method, expense capitalization, provision levels) to influence reported results"
    ]
  }},
  "Corporate Issuers": {weight: 5, modules: {
    "Capital Structure": [
      "explain the Modigliani-Miller propositions with and without taxes and their implications for optimal capital structure",
      "calculate the value of a levered firm using the tax shield benefit and explain the impact of financial distress costs",
      "describe the trade-off theory of capital structure and identify the optimal debt level where marginal tax benefit equals marginal distress cost",
      "explain the pecking order theory and signaling effects of capital structure decisions",
      "evaluate how agency costs of debt (asset substitution, underinvestment) and agency costs of equity affect capital structure",
      "calculate the weighted average cost of capital (WACC) and describe how it changes with leverage under MM assumptions"
    ],
    "Dividends & Share Repurchases": [
      "describe the dividend irrelevance theory and the conditions under which it holds",
      "explain the clientele effect and how different investor tax situations create preferences for dividends versus capital gains",
      "evaluate the information content (signaling) of dividend initiations, increases, decreases, and omissions",
      "compare the financial statement effects of cash dividends, stock dividends, stock splits, and share repurchases",
      "analyze share repurchases as an alternative to dividends and evaluate when each is preferable from a shareholder perspective",
      "calculate the impact of a share repurchase on EPS, book value per share, and stock price under different assumptions"
    ],
    "Corporate Governance & ESG": [
      "describe the principal-agent problem and explain how corporate governance mechanisms mitigate it",
      "evaluate board composition, structure, and independence as indicators of governance quality",
      "explain shareholder rights including voting mechanisms (proxy, cumulative voting, dual-class shares) and their impact on governance",
      "describe ESG factors and explain how they can affect risk, return, and the cost of capital for corporate issuers",
      "evaluate shareholder engagement and activist investor strategies as corporate governance mechanisms",
      "explain the role of executive compensation structure in aligning management incentives with shareholder interests"
    ]
  }},
  "Equity": {weight: 15, modules: {
    "Equity Valuation Approaches": [
      "describe the major categories of equity valuation models and identify the appropriate model for a given situation",
      "explain the going-concern value versus liquidation value and describe when each is relevant",
      "evaluate the strengths and limitations of income-based, asset-based, and market-based valuation approaches",
      "explain the concept of intrinsic value and describe how analysts use it relative to market price to generate buy/sell recommendations",
      "describe sum-of-the-parts valuation and conglomerate discount and apply them to multi-segment companies"
    ],
    "Return Concepts": [
      "explain the equity risk premium (ERP) and describe methods for estimating it including historical, survey, and implied approaches",
      "calculate the required return on equity using the CAPM and multifactor models",
      "describe the build-up method for estimating required return for non-publicly traded companies",
      "explain the concept of the weighted average cost of capital and calculate it given capital structure and component costs",
      "evaluate the strengths and limitations of different methods for estimating the equity risk premium and required return"
    ],
    "Industry & Company Analysis": [
      "explain the role of industry analysis in equity valuation and describe the top-down, bottom-up, and hybrid approaches",
      "apply Porter's Five Forces framework to assess industry competitive intensity and long-run profitability",
      "describe the industry life cycle and explain how the stage affects appropriate valuation multiples and growth assumptions",
      "evaluate a company's competitive position using barriers to entry, pricing power, switching costs, and economies of scale",
      "analyze revenue drivers, cost structure, and operating leverage to forecast company earnings",
      "evaluate the impact of competitive dynamics and disruptive innovation on industry attractiveness"
    ],
    "Discounted Dividend Valuation": [
      "calculate the intrinsic value of a stock using the Gordon Growth Model (GGM) and identify the assumptions required",
      "calculate stock value using the H-model for a company with an initially high growth rate declining to a stable rate",
      "apply the two-stage and three-stage dividend discount models and identify the appropriate model for different company types",
      "calculate the implied required return or implied growth rate from current stock price using the GGM",
      "explain the PRAT model and use it to calculate sustainable growth rate",
      "evaluate the strengths and limitations of DDM models including sensitivity to assumptions and applicability across company types"
    ],
    "Free Cash Flow Valuation": [
      "distinguish between FCFF and FCFE and calculate each from net income and from operating cash flow",
      "explain the relationship between FCFF, FCFE, and dividends and identify which to use in different valuation contexts",
      "calculate firm value using FCFF discounted at WACC and equity value using FCFE discounted at the required return on equity",
      "calculate FCFF and FCFE for companies with different capital structures and explain how changes in leverage affect FCFE",
      "evaluate single-stage, two-stage, and three-stage FCFF/FCFE models and select the appropriate model given company characteristics",
      "identify the limitations of free cash flow models including sensitivity to terminal value assumptions"
    ],
    "Price Multiples": [
      "calculate and interpret trailing and forward P/E ratios and justify the P/E multiple using the Gordon Growth Model",
      "explain the factors that influence justified P/E including growth, payout ratio, and required return",
      "calculate and interpret P/B, P/S, P/CF, and EV/EBITDA multiples and explain the advantages and disadvantages of each",
      "evaluate the use of enterprise value multiples versus equity multiples in comparing companies with different capital structures",
      "compare a stock's price multiple to peers and historical levels and identify potential mis-pricing",
      "describe the momentum and earnings surprise anomalies and their relationship to forward P/E ratios"
    ],
    "Residual Income": [
      "calculate residual income as net income minus an equity charge and explain its relationship to economic profit",
      "derive the residual income model from the dividend discount model and apply the RI model to value equity",
      "calculate Economic Value Added (EVA) and explain how it differs from accounting earnings as a performance measure",
      "describe Market Value Added (MVA) and its relationship to EVA and firm value",
      "evaluate the strengths and limitations of residual income models versus DDM and FCF models",
      "explain the persistence factor for residual income and apply the continuing RI model for terminal value"
    ],
    "Private Company Valuation": [
      "describe the key differences in valuing private versus publicly traded companies including lack of marketability, control, and information",
      "explain the discount for lack of marketability (DLOM) and discount for lack of control (DLOC) and methods for estimating each",
      "describe the control premium and explain when it is applicable in private company acquisitions",
      "apply income-based (DCF), market-based (guideline companies and transactions), and asset-based approaches to private company valuation",
      "evaluate company-specific risk adjustments to the discount rate for private companies using the build-up method",
      "describe the stages of venture capital and private equity financing and explain how valuation differs at each stage"
    ]
  }},
  "Fixed Income": {weight: 15, modules: {
    "Term Structure & Interest Rate Dynamics": [
      "describe the relationships among spot rates, forward rates, and par rates and derive one from another",
      "explain the theories of the yield curve including pure expectations, liquidity preference, preferred habitat, and market segmentation",
      "calculate and interpret forward rates from spot rates and explain their use in bond valuation",
      "describe key rate durations and explain how they differ from effective duration in measuring non-parallel yield curve shifts",
      "evaluate the impact of shifts, twists, and butterfly changes in the yield curve on bond portfolio value"
    ],
    "Arbitrage-Free Valuation": [
      "explain the arbitrage-free valuation framework and its relationship to law of one price",
      "construct and calibrate a binomial interest rate tree to value option-free and option-embedded bonds",
      "calculate the value of a bond using a binomial interest rate tree and verify it is arbitrage-free",
      "explain the concept of option-adjusted spread (OAS) and calculate it using a binomial tree",
      "describe Monte Carlo simulation as a valuation method for path-dependent securities including MBS"
    ],
    "Bonds with Embedded Options": [
      "explain how embedded call and put options affect the value of a bond and calculate the option value",
      "calculate effective duration and effective convexity for bonds with embedded options using binomial trees",
      "explain one-sided durations, key rate durations, and their use in analyzing bonds with embedded options",
      "describe callable, putable, convertible, and floating-rate bonds and explain how each option affects yield and risk",
      "evaluate the impact of interest rate volatility on the value of embedded options and option-adjusted spread",
      "compare and contrast OAS for callable, putable, and option-free bonds and explain what a negative OAS implies"
    ],
    "Credit Analysis Models": [
      "describe structural models of credit risk and explain how equity value and asset volatility determine probability of default",
      "describe reduced-form models of credit risk and contrast them with structural models in terms of inputs and applications",
      "calculate the expected loss on a bond given probability of default, loss given default, and recovery rate",
      "explain credit migration risk and describe the use of transition matrices in credit risk assessment",
      "explain credit value at risk (CVaR) and describe how credit risk is incorporated into bond portfolio management",
      "evaluate the relative merits of structural versus reduced-form models for different applications"
    ],
    "Credit Default Swaps": [
      "describe the mechanics of a credit default swap including the roles of protection buyer, protection seller, and reference entity",
      "explain CDS spreads and the CDS-bond basis and interpret deviations from theoretical CDS spread values",
      "calculate the value of a CDS position given changes in credit spreads and explain settlement (physical vs cash)",
      "describe index CDS, first-to-default baskets, and nth-to-default baskets and their applications in credit portfolio management",
      "explain how CDS can be used to express credit views, hedge credit risk, and exploit basis trades"
    ],
    "Mortgage-Backed Securities": [
      "describe prepayment risk and distinguish between contraction risk and extension risk in MBS",
      "explain the PSA prepayment benchmark and calculate projected prepayments given a PSA speed",
      "describe the structure and cash flows of CMO tranches including sequential-pay, PAC, support, and Z-tranches",
      "calculate weighted average life (WAL) of an MBS and explain how it differs from stated maturity and duration",
      "evaluate the impact of interest rate changes on MBS prepayments, price, and negative convexity",
      "describe commercial mortgage-backed securities (CMBS) and explain how they differ from residential MBS in structure and risk"
    ]
  }},
  "Derivatives": {weight: 10, modules: {
    "Forward Commitments Pricing & Valuation": [
      "explain the cost-of-carry model and calculate the no-arbitrage forward price for equities, currencies, and bonds",
      "calculate the value of a forward contract at initiation, during the contract period, and at expiration",
      "calculate the no-arbitrage forward rate for a forward rate agreement (FRA) and calculate the payoff at settlement",
      "explain how futures differ from forwards in terms of marking to market, credit risk, and liquidity and explain why futures prices and forward prices may differ",
      "calculate the value of currency forwards using covered interest rate parity and identify arbitrage opportunities",
      "explain the pricing of equity forwards with dividends and bond forwards with coupon payments"
    ],
    "Valuation of Contingent Claims": [
      "explain the assumptions and inputs of the Black-Scholes-Merton (BSM) model and calculate European option prices",
      "calculate and interpret the five option Greeks: delta, gamma, vega, theta, and rho and explain their use in risk management",
      "explain delta hedging and describe why a delta-hedged portfolio must be continuously rebalanced (gamma risk)",
      "apply put-call parity to identify and exploit arbitrage opportunities and to value puts from calls",
      "calculate the value of interest rate options (caps, floors, caplets, floorlets) using the Black model",
      "describe swaptions and explain their valuation using the Black model including the distinction between payer and receiver swaptions"
    ]
  }},
  "Alternative Investments": {weight: 10, modules: {
    "Private Equity Valuation": [
      "describe the stages of private equity investment and explain the J-curve effect on PE fund returns",
      "calculate IRR and multiple on invested capital (MOIC) for private equity investments and compare NAV-based and market-based approaches",
      "apply DCF, comparable company, and LBO analysis to estimate private equity portfolio company values",
      "explain the leveraged buyout model and identify the key value drivers including entry multiple, exit multiple, leverage, and operational improvement",
      "calculate distributions to limited partners and general partners under a waterfall structure with carried interest and hurdle rate",
      "describe exit strategies for PE investments including IPO, strategic sale, secondary sale, and recapitalization"
    ],
    "Commodities": [
      "explain the components of commodity futures returns including spot return, roll yield, and collateral yield",
      "describe the term structure of commodity futures (backwardation and contango) and explain the theory of normal backwardation",
      "calculate roll yield for commodity futures positions in both backwardated and contangoed markets",
      "explain the storage costs, convenience yield, and cost-of-carry model for commodity pricing",
      "evaluate the diversification benefits of commodity investments in a portfolio context including their relationship to inflation",
      "describe the major commodity sectors and the factors that drive supply and demand for each"
    ]
  }},
  "Portfolio Management": {weight: 10, modules: {
    "Multifactor Models": [
      "describe macroeconomic, fundamental, and statistical multifactor models and the differences in their construction and use",
      "calculate the expected return and factor exposures (betas) of a portfolio using a multifactor model",
      "explain the Fama-French three-factor model and identify the market, size (SMB), and value (HML) factors",
      "construct a factor-mimicking portfolio and explain its use in hedging and arbitrage pricing",
      "evaluate active factor risk versus active specific risk and use the information ratio to assess active management efficiency",
      "explain the arbitrage pricing theory (APT) and compare it to the CAPM in terms of assumptions and applications"
    ],
    "Active Portfolio Management": [
      "explain the Fundamental Law of Active Management and describe the roles of the information ratio, information coefficient, and breadth",
      "calculate the information ratio (IR) and explain its relationship to the Sharpe ratio of an active versus passive portfolio",
      "apply the Grinold-Kahn formula (IR = IC × √BR) and identify the limitations of the fundamental law",
      "describe the active return, active risk (tracking error), and optimal level of active risk for a portfolio given investor constraints",
      "explain how constraints such as long-only and benchmark-relative risk limits affect optimal portfolio construction",
      "evaluate the trade-off between breadth and depth of manager research in constructing a high-IR portfolio"
    ],
    "Economics & Investment Markets": [
      "describe the intertemporal rate of substitution and explain how it links economic conditions to required returns on risky assets",
      "explain how the business cycle affects the risk premiums required on different asset classes including equities, bonds, and credit",
      "describe the Taylor rule and explain how central bank policy responds to output gaps and inflation deviations",
      "evaluate how changes in expected inflation, real interest rates, and credit spreads affect equity and fixed income valuations",
      "explain how investor risk aversion and the consumption-wealth ratio affect equilibrium risk premiums",
      "describe the concept of a risk premium puzzle and evaluate the empirical evidence on equity and credit risk premiums"
    ]
  }}
};

const MISCONCEPTIONS_L2 = {
  "Ethics": [
    "assuming that disclosure of a conflict of interest fully eliminates the conflict and no further action (such as recusal) is required",
    "applying Standard I-A (Knowledge of the Law) by following the more permissive of local law vs CFA Standards rather than the more restrictive",
    "confusing the Asset Manager Code (firm-level voluntary compliance) with the CFA Standards (individual-level mandatory conduct)",
    "believing that mosaic theory permits trading on material nonpublic information so long as some public information is also used",
    "treating the Research Objectivity Standards as mandatory for all CFA charterholders rather than voluntary firm-level standards"
  ],
  "Quantitative Methods": [
    "concluding that heteroskedasticity biases regression coefficients when it actually only inflates or deflates standard errors, making t-tests unreliable without affecting point estimates",
    "using the Durbin-Watson statistic to test for multicollinearity rather than serial correlation, or interpreting DW near 2 as evidence of no autocorrelation in any form",
    "assuming a time series is stationary simply because it lacks a visible trend, when a unit root test (Dickey-Fuller) is required to confirm",
    "applying a standard OLS forecast to a cointegrated pair without an error-correction term, producing biased dynamic predictions",
    "confusing the information coefficient (IC) in machine learning classification accuracy with the Pearson correlation used in the Fundamental Law of Active Management"
  ],
  "Economics": [
    "confusing covered interest rate parity (no-arbitrage, locked-in forward rate) with uncovered interest rate parity (expectation-based, risky) and using covered IRP to predict future spot rates",
    "applying relative PPP to short-run exchange rate forecasting when PPP is only a reasonable predictor over very long horizons",
    "concluding that a current account deficit is always unsustainable, ignoring that it can be financed by productive capital inflows and remain sustainable indefinitely",
    "assuming that in the Solow model, higher saving rates permanently increase a country's long-run growth rate, when they only raise the steady-state level of output per capita",
    "treating endogenous growth theory as predicting convergence between rich and poor countries when it actually predicts persistent divergence without technology transfer"
  ],
  "Financial Statement Analysis": [
    "applying full consolidation to an equity-method investment, inflating revenue and assets and understating return on assets for a minority-interest investment",
    "using the pension funded status reported on the balance sheet as the total pension expense on the income statement, confusing a stock measure with a flow measure",
    "applying the current rate method to translate a subsidiary whose functional currency is the local currency when the subsidiary's operations are primarily conducted in the parent's currency (requiring the temporal method)",
    "concluding that high accruals indicate fraudulent reporting rather than aggressive but GAAP-compliant accounting choices that may still be legal",
    "treating all goodwill impairment charges as non-recurring adjustments to core earnings without first evaluating whether they reflect a permanent loss of competitive position"
  ],
  "Corporate Issuers": [
    "applying MM Proposition I (with taxes) to conclude that maximum leverage is always optimal, ignoring financial distress costs that eventually exceed the tax shield at high debt levels",
    "assuming that share repurchases always increase stock price, when under MM in a perfect market a buyback and a dividend are equivalent in terms of shareholder wealth",
    "interpreting a dividend cut as necessarily negative signaling when it may reflect a shift to a higher-NPV reinvestment opportunity (the 'new projects' explanation)",
    "confusing the cost of debt used in WACC (after-tax rate on new borrowing) with the coupon rate on existing debt or the book yield",
    "treating dual-class share structures as automatically bad governance without evaluating whether founder control enables long-horizon value creation"
  ],
  "Equity": [
    "using a single-stage Gordon Growth Model for a company whose near-term growth rate exceeds its required return, producing a negative or meaningless value",
    "confusing the trailing P/E (based on reported EPS) with the justified P/E (derived from GGM fundamentals) and misinterpreting which is appropriate for relative valuation",
    "applying EV/EBITDA without adjusting for differences in capital intensity, depreciation policy, and lease capitalization across comparables",
    "treating FCFE as simply net income minus CapEx, omitting changes in net working capital and the net borrowing term",
    "applying a DLOM to a controlling interest in a private company when the discount for lack of marketability applies only to minority interests"
  ],
  "Fixed Income": [
    "interpreting a negative OAS on a callable bond as indicating the bond is overpriced, when a negative OAS signals the model spread is negative — a true negative OAS implies the bond trades richer than the benchmark even after removing optionality",
    "computing effective duration for a callable bond the same way as modified duration, ignoring that effective duration requires option-adjusted price changes from the binomial tree",
    "assuming that all CMO tranches have lower prepayment risk than the underlying mortgage pool, when support tranches absorb prepayment variation and carry more risk than the pool",
    "confusing the CDS spread (periodic coupon paid for protection) with the credit spread on the reference bond, ignoring basis differences from accrued interest, cheapest-to-deliver, and market segmentation",
    "treating a PSA speed of 100% as 100% prepayment rather than as the standard prepayment benchmark (0.2% CPR in month 1, rising to 6% CPR by month 30)"
  ],
  "Derivatives": [
    "confusing the forward price (no-arbitrage delivery price set at initiation) with the forward value (mark-to-market gain/loss during the contract's life, which is zero at initiation)",
    "applying Black-Scholes delta as the hedge ratio without recognizing that delta changes as the underlying moves (gamma risk), requiring continuous rebalancing",
    "calculating FRA payoff without discounting back from the settlement date to the payment date, or discounting at the wrong rate",
    "treating a payer swaption as equivalent to a put on a bond when it is actually a call on interest rates (the right to pay fixed, benefit from rising rates)",
    "confusing vega (sensitivity to volatility) with gamma (sensitivity of delta to the underlying price) and misidentifying which Greek dominates for at-the-money near-expiry options"
  ],
  "Alternative Investments": [
    "calculating PE IRR using committed capital rather than invested capital, overstating the IRR by including periods when capital was not yet deployed",
    "treating contango in commodity futures as always generating a negative roll yield, without recognizing that roll yield depends on where along the term structure you roll, not just the overall slope",
    "confusing the J-curve for PE funds (negative early returns as fees exceed gains) with the J-curve in international trade (short-run current account worsening after depreciation)",
    "applying DLOM and DLOC additively to a private company minority interest without recognizing that the two discounts should be applied sequentially (control value × (1−DLOC) × (1−DLOM))",
    "using a hurdle rate net of fees to evaluate PE performance when the hurdle rate in most LPAs is applied gross of management fees but net of fund expenses"
  ],
  "Portfolio Management": [
    "treating the information ratio as purely a function of skill (IC) and ignoring that breadth (number of independent bets per year) equally determines the fundamental law result",
    "conflating the information coefficient (IC) with the hit rate (percent of correct calls), when IC measures rank correlation between forecast and outcome, not binary accuracy",
    "applying the Fama-French SMB and HML factors as risk factors that require compensation without distinguishing whether size and value premiums reflect systematic risk or mispricing",
    "treating active factor risk and active specific (idiosyncratic) risk as additive when total active variance equals the sum of squared active factor exposures times factor variances plus specific variance",
    "assuming that adding more independent strategies always increases the IR proportionally, ignoring that constraints (long-only, turnover limits) reduce effective breadth below the theoretical maximum"
  ]
};

const FORMULAS_L2 = {
  "Quantitative Methods": [
    {name:"Multiple regression fitted value", f:"Ŷᵢ = b₀ + b₁X₁ᵢ + b₂X₂ᵢ + … + bₖXₖᵢ"},
    {name:"F-statistic (overall regression)", f:"F = (RSS/k) / (SSE/(n−k−1))  where RSS=explained, SSE=residual"},
    {name:"t-stat for regression coefficient", f:"t = (b̂ⱼ − bⱼ) / s(b̂ⱼ),  df = n − k − 1"},
    {name:"Variance Inflation Factor", f:"VIFⱼ = 1 / (1 − R²ⱼ),  VIF > 5 = concern, > 10 = severe"},
    {name:"Durbin-Watson statistic", f:"DW = Σ(eₜ − eₜ₋₁)² / Σeₜ²  ≈  2(1 − r̂),  DW ≈ 2 = no autocorrelation"},
    {name:"AR(1) model", f:"Yₜ = b₀ + b₁Yₜ₋₁ + εₜ"},
    {name:"AR(1) mean-reversion level", f:"X̄ = b₀ / (1 − b₁)"},
    {name:"Covariance-stationary condition (AR)", f:"|b₁| < 1  (AR model is stationary iff all roots outside unit circle)"},
    {name:"Dickey-Fuller unit root test", f:"ΔYₜ = b₀ + γYₜ₋₁ + εₜ;  H₀: γ = 0 (unit root)  vs  H₁: γ < 0 (stationary)"},
    {name:"Information Ratio (IR)", f:"IR = IC × √BR  (IC = information coefficient, BR = breadth/year)"},
    {name:"Optimal active weight (Grinold)", f:"wᵢ* = (ICᵢ × σᵢ) / σ_active  (scale by forecast skill and volatility)"}
  ],
  "Economics": [
    {name:"Covered Interest Rate Parity", f:"F/S = (1 + r_d) / (1 + r_f)  ⟹  F = S × (1 + r_d)/(1 + r_f)"},
    {name:"Uncovered Interest Rate Parity", f:"E(%ΔS) = r_d − r_f  (expected domestic appreciation equals interest differential)"},
    {name:"Relative PPP", f:"%ΔS_{d/f} ≈ π_d − π_f  (% change in spot = inflation differential)"},
    {name:"International Fisher Effect", f:"r_d − r_f ≈ π_d − π_f  (real rates equalize internationally)"},
    {name:"Real exchange rate", f:"q = S_{d/f} × (P_f / P_d)  (how many domestic goods per unit foreign good)"},
    {name:"Forward premium/discount", f:"F/S − 1 ≈ r_d − r_f  (annualized)"},
    {name:"Solow steady-state output", f:"y* = (s/δ)^(α/(1−α)) × A^(1/(1−α))  where s=saving rate, δ=depreciation, α=capital share"}
  ],
  "Financial Statement Analysis": [
    {name:"Equity method carrying value", f:"Carrying Value = Cost + Investor Share × Net Income − Dividends Received"},
    {name:"Goodwill (acquisition method)", f:"Goodwill = Purchase Price − Fair Value of Net Identifiable Assets"},
    {name:"Non-controlling interest (NCI)", f:"NCI = NCI% × Fair Value of Subsidiary Net Assets"},
    {name:"Pension expense (components)", f:"Pension Expense = Service Cost + Interest Cost − Expected Return on Assets ± Amortization"},
    {name:"PBO funded status", f:"Funded Status = Fair Value of Plan Assets − PBO  (positive = overfunded)"},
    {name:"Accruals ratio (balance sheet)", f:"Accruals Ratio = (NOA_end − NOA_beg) / [(NOA_end + NOA_beg)/2]"},
    {name:"Accruals ratio (cash flow)", f:"Accruals Ratio = (NI − CFO − CFI) / [(NOA_end + NOA_beg)/2]"},
    {name:"Current rate translation (CTA)", f:"CTA = Assets translated at current rate − Liabilities at current rate − Equity at historical rate"}
  ],
  "Corporate Issuers": [
    {name:"MM Firm Value with taxes", f:"V_L = V_U + T_c × D  (levered = unlevered + PV of tax shield)"},
    {name:"MM Proposition II (with taxes)", f:"r_e = r_0 + (r_0 − r_d)(1 − T_c)(D/E)"},
    {name:"WACC (after-tax)", f:"WACC = w_d × r_d(1−T) + w_e × r_e + w_ps × r_ps"},
    {name:"EPS impact of buyback", f:"New EPS = (NI − Dividends on retired shares) / (Shares_0 − Shares repurchased)"},
    {name:"Sustainable growth rate", f:"g = ROE × (1 − Payout Ratio)  =  ROE × b"}
  ],
  "Equity": [
    {name:"Gordon Growth Model (GGM)", f:"V₀ = D₁ / (r − g)  =  D₀(1+g) / (r − g)"},
    {name:"H-Model", f:"V₀ = D₀ × [(1+g_L) + H(g_S − g_L)] / (r − g_L)  where H = half-life of high growth"},
    {name:"Justified leading P/E", f:"P₀/E₁ = (1 − b) / (r − g)  =  Payout Ratio / (r − g)"},
    {name:"Justified trailing P/E", f:"P₀/E₀ = (1 − b)(1 + g) / (r − g)"},
    {name:"FCFF from net income", f:"FCFF = NI + NCC + Int(1−T) − FCInv − WCInv"},
    {name:"FCFE from FCFF", f:"FCFE = FCFF − Int(1−T) + Net Borrowing"},
    {name:"FCFF from CFO", f:"FCFF = CFO + Int(1−T) − FCInv"},
    {name:"FCFE from CFO", f:"FCFE = CFO − FCInv + Net Borrowing"},
    {name:"Firm value (FCFF single-stage)", f:"V_firm = FCFF₁ / (WACC − g)"},
    {name:"Equity value (FCFE single-stage)", f:"V_equity = FCFE₁ / (r_e − g)"},
    {name:"Residual Income (RI)", f:"RIₜ = EPS_t − r_e × BV_{t-1}  =  (ROE − r_e) × BV_{t-1}"},
    {name:"RI intrinsic value", f:"V₀ = BV₀ + Σ [RIₜ / (1+r_e)ᵗ]  =  BV₀ + PV(future RI)"},
    {name:"Economic Value Added (EVA)", f:"EVA = NOPAT − WACC × Invested Capital  =  (ROIC − WACC) × IC"},
    {name:"Tobin's q (approx.)", f:"q = Market Value of Assets / Replacement Cost of Assets"},
    {name:"EV/EBITDA", f:"EV = Market Cap + Debt + Preferred − Cash;  Multiple = EV / EBITDA"},
    {name:"P/B ratio", f:"P/B = (ROE − g) / (r − g)  (justified P/B from GGM)"},
    {name:"PRAT model (g)", f:"g = P × R × A × T  =  NI/Sales × RE/NI × Sales/Assets × Assets/Equity"}
  ],
  "Fixed Income": [
    {name:"Spot rate from forward rates", f:"(1 + S_n)ⁿ = (1 + S_1)(1 + ₁f₁)(1 + ₁f₂)…(1 + ₁f_{n-1})"},
    {name:"Forward rate from spots", f:"(1 + ₁fₙ) = (1 + S_{n+1})^{n+1} / (1 + S_n)ⁿ"},
    {name:"Bond price using spot rates", f:"P = C/(1+S₁) + C/(1+S₂)² + … + (C+F)/(1+Sₙ)ⁿ"},
    {name:"Option-Adjusted Spread (OAS)", f:"P = Σ [CF_t / (1 + r_t + OAS)^t]  (OAS = spread added to tree rates to match market price)"},
    {name:"Effective duration (option bonds)", f:"EffDur = (P₋ − P₊) / (2 × P₀ × ΔCurve)"},
    {name:"Effective convexity", f:"EffCvx = (P₋ + P₊ − 2P₀) / (P₀ × ΔCurve²)"},
    {name:"OAS relationship", f:"Z-spread = OAS + Option Cost  (callable: Z > OAS;  putable: Z < OAS)"},
    {name:"CDS spread (approx.)", f:"CDS Spread ≈ (1 − Recovery Rate) × Hazard Rate  ≈  Credit Spread on bond"},
    {name:"CDS value change", f:"ΔCDS value ≈ (Spread Change) × Duration × Notional  (for protection buyer: spread widens = gain)"},
    {name:"PSA prepayment (CPR)", f:"CPR_t = 0.06 × (t/30) × PSA%  for t ≤ 30;  CPR = 0.06 × PSA% for t > 30"},
    {name:"SMM from CPR", f:"SMM = 1 − (1 − CPR)^{1/12}"},
    {name:"Expected loss (credit)", f:"EL = PD × LGD × EAD  where LGD = 1 − Recovery Rate"},
    {name:"Key rate duration (KRD)", f:"KRD_k = −(1/P) × (∂P/∂y_k)  where y_k is the key rate at maturity k"}
  ],
  "Derivatives": [
    {name:"Forward price (no-dividend stock)", f:"F₀(T) = S₀ × (1 + r_f)^T  =  S₀ × e^{r_f T} (continuous)"},
    {name:"Forward price (dividend-paying stock)", f:"F₀(T) = (S₀ − PV(D)) × (1 + r_f)^T"},
    {name:"Forward value (long) during life", f:"V_t = [F_t(T) − F₀(T)] / (1 + r_f)^{T−t}"},
    {name:"Currency forward (CIP)", f:"F_{d/f} = S_{d/f} × (1 + r_d)^T / (1 + r_f)^T"},
    {name:"FRA value at settlement", f:"FRA payoff = [L (FRA Rate − Libor) × (days/360)] / [1 + Libor × (days/360)]  (discounted to payment date)"},
    {name:"BSM call price", f:"c = S₀N(d₁) − Xe^{-rT}N(d₂)"},
    {name:"BSM put price", f:"p = Xe^{-rT}N(−d₂) − S₀N(−d₁)"},
    {name:"d₁ (BSM)", f:"d₁ = [ln(S₀/X) + (r + σ²/2)T] / (σ√T)"},
    {name:"d₂ (BSM)", f:"d₂ = d₁ − σ√T"},
    {name:"Delta (call)", f:"Δ_call = N(d₁)  ∈ (0,1);  Δ_put = N(d₁) − 1  ∈ (−1,0)"},
    {name:"Gamma", f:"Γ = N'(d₁) / (S₀σ√T)  (same for calls and puts;  largest ATM near expiry)"},
    {name:"Vega", f:"ν = S₀√T × N'(d₁)  (always positive; options gain value with higher volatility)"},
    {name:"Theta (call)", f:"Θ = −[S₀N'(d₁)σ/(2√T)] − rXe^{-rT}N(d₂)  (usually negative — time decay)"},
    {name:"Rho (call)", f:"ρ = TXe^{-rT}N(d₂)  (positive for calls: higher rates → higher call value)"},
    {name:"Put-call parity", f:"c + PV(X) = p + S₀  ⟹  c − p = S₀ − PV(X)"},
    {name:"Black model (caplet)", f:"caplet value = P(0,T₂) × [F_R × N(d₁) − Cap Rate × N(d₂)] × notional × (days/360)"}
  ],
  "Alternative Investments": [
    {name:"PE IRR (net to LPs)", f:"Solve: Σ [CF_t / (1+IRR)^t] = 0  using actual cash call and distribution dates"},
    {name:"MOIC (gross multiple)", f:"MOIC = Total Distributions / Total Invested Capital"},
    {name:"Commodity futures total return", f:"Total Return = Spot Return + Roll Yield + Collateral Yield"},
    {name:"Roll yield (backwardation)", f:"Roll Yield = (F_near − F_far) / F_near  (positive in backwardation, negative in contango)"},
    {name:"Commodity futures price (cost of carry)", f:"F₀ = S₀ × e^{(r + u − c)T}  where u=storage cost, c=convenience yield"},
    {name:"GP carried interest", f:"Carry = Carry% × (Distributions − Invested Capital − Preferred Return)  subject to clawback"},
    {name:"Private company discount (sequential)", f:"Minority value = Control Value × (1 − DLOC) × (1 − DLOM)"}
  ],
  "Portfolio Management": [
    {name:"Multifactor return (APT)", f:"E(Rᵢ) = RF + β_{i1}×λ₁ + β_{i2}×λ₂ + … + β_{ik}×λₖ  (λ = factor risk premium)"},
    {name:"Active return", f:"R_A = R_P − R_B  (portfolio return minus benchmark return)"},
    {name:"Information Ratio", f:"IR = R_A / σ_A  =  Active Return / Tracking Error"},
    {name:"Fundamental Law", f:"IR = IC × √BR  (information coefficient × square root of breadth)"},
    {name:"Optimal active risk", f:"σ*_A = (IR / SR_B) × σ_B  (SR_B = Sharpe ratio of benchmark)"},
    {name:"Sharpe ratio of active portfolio", f:"SR_P² = SR_B² + IR²"},
    {name:"Tracking error (active risk)", f:"σ_A = √[Σᵢ Σⱼ wᵢΔwⱼ Cov(Rᵢ,Rⱼ)]  where Δw = active weights"},
    {name:"Factor model expected return", f:"E(Rᵢ) = α + b₁F₁ + b₂F₂ + … + ε  (b=factor loading, F=factor value)"}
  ]
};

const POWER_NOTES_L2 = {
  "Ethics": [
    {
      module: "Code & Standards Application",
      rules: [
        "When a scenario involves both a firm policy and a CFA Standard, apply whichever is MORE restrictive — CFA Standards set the floor, stricter firm/local rules apply on top.",
        "Disclosure of a conflict is necessary but never sufficient on its own — ask whether the member also managed, mitigated, or recused themselves from the conflict.",
        "Standard V-A (Reasonable Basis) requires the member to have independently evaluated the research or model — blindly relying on a third-party model without understanding its assumptions violates the Standard."
      ],
      traps: [
        "Choosing 'disclose the conflict and proceed' as the correct answer when the conflict is severe enough to require recusal or refusal of the assignment.",
        "Applying mosaic theory to justify acting on nonpublic information when the information obtained from the company contact is in fact material (test: would it move the price?)."
      ],
      mnemonic: "DISC — Disclose, Investigate, Step back if needed, Comply with strictest standard"
    },
    {
      module: "Research Objectivity Standards",
      rules: [
        "Research Objectivity Standards are VOLUNTARY firm-level policies — they do not override or duplicate the mandatory CFA Standards that apply to individuals.",
        "Quiet periods are required around IPOs and secondary offerings — analysts cannot publish new research or change ratings during these windows.",
        "Analyst compensation must not be linked directly to specific investment banking transactions — it may be tied to overall firm profitability."
      ],
      traps: [
        "Treating a violation of Research Objectivity Standards as automatically a violation of Standard I-B (Independence and Objectivity) — they are separate frameworks and a firm can violate one without violating the other.",
        "Assuming that any analyst contact with investment banking constitutes a violation, when the Standards only prohibit compensation linkage and pressure to alter research conclusions."
      ],
      mnemonic: "ROS = Research is Objective and Separate from banking"
    },
    {
      module: "Asset Manager Code",
      rules: [
        "The Asset Manager Code applies to the FIRM as an entity — it is distinct from the CFA Standards that govern individual member conduct.",
        "Firms claiming AMC compliance must provide clients with full disclosure of fees, conflicts of interest, valuation methods, and risk management policies — selective disclosure is not sufficient.",
        "Under the AMC, performance must be presented fairly and accurately — cherry-picking composites or excluding poor-performing accounts is a violation."
      ],
      traps: [
        "Confusing AMC compliance (voluntary, firm-level) with GIPS compliance — a firm can comply with one and not the other; they address different aspects of client reporting.",
        "Assuming the AMC only covers portfolio management when it also requires compliance and risk management infrastructure, business continuity planning, and client communication standards."
      ],
      mnemonic: "AMC = Assets, Managers, Clients — the firm serves clients, not the other way around"
    }
  ],
  "Quantitative Methods": [
    {
      module: "Multiple Regression & Issues",
      rules: [
        "Heteroskedasticity only inflates/deflates standard errors — use White-corrected SEs to fix the t-tests; the coefficient estimates remain unbiased.",
        "Serial correlation (autocorrelation) biases standard errors AND can bias slope estimates in dynamic models — use Newey-West SEs and check DW statistic (target ≈ 2).",
        "Multicollinearity inflates standard errors and makes individual coefficients unreliable, but does NOT bias them — the model's overall R² and F-stat remain valid."
      ],
      traps: [
        "Concluding that heteroskedasticity has biased the regression coefficients — it has not; only the standard errors are affected.",
        "Using DW ≈ 2 to conclude there is no problem of any kind, when DW only tests for first-order serial correlation and cannot detect higher-order autocorrelation or multicollinearity."
      ],
      mnemonic: "HeSMA: Heterosk = Standard errors; Serial = both; Multicollinearity = Amplifies SEs"
    },
    {
      module: "Time-Series Analysis",
      rules: [
        "If |b₁| ≥ 1 in an AR(1) model, the series is non-stationary — do not use AR models on it without first differencing.",
        "Two non-stationary series may still be cointegrated (share a long-run equilibrium) — in that case, use an error-correction model, not individual AR models.",
        "Always test for seasonality before finalizing an AR model — add seasonal lags (e.g., AR(4) for quarterly data) or seasonal dummy variables if seasonal patterns remain in residuals."
      ],
      traps: [
        "Running a regression on two trending series and concluding they are related because R² is high, when both series contain unit roots and the regression is spurious.",
        "Applying a Dickey-Fuller test and forgetting that the null hypothesis is a unit root (non-stationary) — rejecting H₀ means the series IS stationary, not that it has a unit root."
      ],
      mnemonic: "SURE: Stationarity — Unit root test — Residuals check — Error-correction if cointegrated"
    },
    {
      module: "Machine Learning",
      rules: [
        "Supervised learning requires labeled training data — if no labels exist, use unsupervised methods (clustering, PCA); reinforcement learning is for sequential decision-making with rewards.",
        "Regularization (LASSO, ridge) penalizes model complexity to reduce overfitting — LASSO can shrink coefficients to exactly zero (feature selection); ridge shrinks them toward zero.",
        "Cross-validation is the standard check for overfitting — use k-fold CV to estimate out-of-sample performance before deploying a model."
      ],
      traps: [
        "Choosing a model because it maximizes in-sample accuracy, when high in-sample fit with poor cross-validation performance signals overfitting.",
        "Applying classification metrics (accuracy, F1 score) to a regression ML problem, or vice versa — match the evaluation metric to the output type."
      ],
      mnemonic: "SUR-OV: Supervised/Unsupervised/Reinforcement — Overfit check with Validation"
    }
  ],
  "Economics": [
    {
      module: "Currency Exchange Rates",
      rules: [
        "Covered IRP gives the no-arbitrage FORWARD rate — it is locked in and risk-free; uncovered IRP gives an EXPECTED future spot rate — it is a prediction and carries currency risk.",
        "Relative PPP predicts long-run exchange rate changes, not short-run levels — currencies can deviate from PPP for years due to capital flows and sticky prices.",
        "When using the formula F = S × (1+r_d)/(1+r_f), always quote both rates consistently (d/f convention) and check whether the answer implies appreciation or depreciation of the base currency."
      ],
      traps: [
        "Using covered IRP to forecast the expected future spot rate when it only gives the no-arbitrage forward rate — they are equal only if uncovered IRP holds (an empirical assumption, not a guaranteed equality).",
        "Forgetting to annualize the interest rates when the forward horizon is less than one year — multiply the rate by (days/360) rather than compound."
      ],
      mnemonic: "CUP: Covered = forward (no risk); Uncovered = Prediction (risky); PPP = long-run only"
    },
    {
      module: "Economic Growth",
      rules: [
        "In the Solow model, a higher saving rate raises the steady-state LEVEL of output per worker, not the long-run GROWTH rate — long-run growth equals exogenous technological progress only.",
        "Endogenous growth theory predicts that capital (broadly defined, including human capital and knowledge) does not exhibit diminishing returns — policies that raise investment can permanently raise growth.",
        "Convergence is a Solow prediction (poor countries grow faster than rich ones, conditional on similar fundamentals) — endogenous growth theory predicts non-convergence without technology spillovers."
      ],
      traps: [
        "Stating that in the Solow model a country's saving rate determines its long-run per capita growth rate — it only determines the steady-state level; TFP growth drives the long-run rate.",
        "Applying Solow convergence as unconditional (all countries converge) when the model predicts only conditional convergence — countries converge to their own steady state, not to each other."
      ],
      mnemonic: "SOLD: Solow = Only Level Determined by saving; endogenous = long-run growth"
    },
    {
      module: "Regulation & Market Structure",
      rules: [
        "Regulatory capture occurs when the regulated industry gains influence over its regulator — it predicts under-enforcement, delayed rule-making, and rules written to benefit incumbents.",
        "Principles-based regulation sets broad objectives and leaves implementation to firms — rules-based regulation specifies exact requirements; principles-based allows more flexibility but is harder to enforce uniformly.",
        "Market concentration (HHI) measures structural market power, but high concentration does not guarantee pricing power if barriers to entry are low and the market is contestable."
      ],
      traps: [
        "Assuming that more regulation is always better for market efficiency — excessive regulation can create barriers to entry, reduce competition, and generate compliance costs that outweigh consumer benefits.",
        "Treating high HHI as proof of monopoly pricing when high concentration with low barriers to entry and competitive pricing is consistent with a contestable market."
      ],
      mnemonic: "CARP: Capture, Arms-length (principles vs rules), Regulation costs, Porter forces"
    }
  ],
  "Financial Statement Analysis": [
    {
      module: "Intercorporate Investments",
      rules: [
        "Equity method: book value tracks investment (cost + share of income − dividends); report ONE line (equity income) on the income statement — do not consolidate revenue or debt.",
        "Under consolidation, 100% of subsidiary assets/liabilities appear on the balance sheet even if the parent owns less than 100% — minority interest (NCI) offsets the overstated equity.",
        "Goodwill is only tested for impairment (not amortized) under both IFRS and US GAAP — impairment is a one-way write-down; no write-up is permitted."
      ],
      traps: [
        "Including the subsidiary's revenue and debt in ratio analysis when only the equity method applies — equity method investments appear as a single asset line, not consolidated assets.",
        "Confusing the equity pick-up (investor's share of associate's net income, less any excess amortization) with dividends received from the associate — dividends reduce the carrying value, not income."
      ],
      mnemonic: "ECG: Equity method = one-line pickup; Consolidation = 100% assets; Goodwill = impairment only"
    },
    {
      module: "Employee Compensation",
      rules: [
        "DB pension funded status = Plan Assets − PBO; positive means overfunded (asset on balance sheet), negative means underfunded (liability) — both IFRS and US GAAP require recognition of net funded status.",
        "IFRS requires immediate recognition of actuarial gains/losses in OCI (no corridor) — US GAAP allows the corridor method (defer recognition if within 10% of the larger of PBO or plan assets).",
        "A higher discount rate assumption lowers the PBO and current service cost, reducing reported pension expense and liability — watch for opportunistic assumption changes."
      ],
      traps: [
        "Using expected return on plan assets as the actual asset return in projecting future pension expense — expected return is an actuarial assumption; actual returns flow through OCI (IFRS) or are deferred (US GAAP).",
        "Confusing pension expense on the income statement (service cost + net interest cost under IFRS) with cash contributions to the pension fund — they can differ significantly."
      ],
      mnemonic: "PIES: PBO minus Assets = funded status; IFRS = Immediate OCI; Expected return ≠ actual; Sensitivity to discount rate"
    },
    {
      module: "Multinational Operations",
      rules: [
        "If the subsidiary's functional currency = its local currency, use the current rate method (all assets at current rate, equity at historical, OCI absorbs the translation gain/loss as CTA).",
        "If the subsidiary's functional currency = the parent's presentation currency (subsidiary is integrated), use the temporal method (monetary items at current rate, nonmonetary at historical, translation gain/loss goes to income statement).",
        "Under the current rate method, financial ratios calculated in the local currency are preserved in the translated statements — under the temporal method, ratios change after translation."
      ],
      traps: [
        "Applying the current rate method when the subsidiary operates in a highly inflationary (hyperinflationary) economy — hyperinflationary subsidiaries must restate using inflation-adjusted figures first under IFRS.",
        "Assuming translation always produces a gain when the domestic currency appreciates — whether it's a gain or loss depends on the net asset vs net liability position exposed and the direction of rate movement."
      ],
      mnemonic: "CHIT: Current rate = Highly autonomous subsidiaries (integrated = Temporal); Hyperinflation = restate first"
    },
    {
      module: "Financial Institutions Analysis",
      rules: [
        "Net interest margin (NIM) = Net Interest Income / Average Earning Assets — the primary profitability driver for banks, driven by the spread between lending and deposit rates.",
        "Tier 1 capital ratio = Tier 1 Capital / Risk-Weighted Assets — core equity; higher ratio = more loss-absorbing capacity; minimum Basel III = 6% Tier 1, 4.5% CET1.",
        "Non-performing loan (NPL) ratio = NPLs / Total Loans — elevated NPL ratio is the leading indicator of credit quality deterioration; compare to allowance coverage ratio (Loan Loss Reserves / NPLs)."
      ],
      traps: [
        "Treating a high ROE at a bank as unambiguously positive without checking the leverage ratio — banks can inflate ROE by increasing leverage to dangerous levels.",
        "Analyzing bank revenue using the same top-line metrics as industrial companies — net interest income and non-interest income replace revenue as the relevant operating metrics for banks."
      ],
      mnemonic: "NICER: NIM, Insurance (combined ratio), Capital adequacy, Efficiency ratio, Reserve coverage"
    },
    {
      module: "Quality of Earnings",
      rules: [
        "High accruals relative to cash earnings signal lower-quality earnings — cash flow from operations persistently below net income indicates aggressive accrual accounting.",
        "Beneish M-score uses eight financial ratios to flag potential earnings manipulation — a score above −1.78 indicates a higher probability of manipulation.",
        "Real earnings management (cutting R&D, accelerating sales) is harder to detect than accrual management and has real economic costs — it is more damaging long-term."
      ],
      traps: [
        "Assuming that GAAP-compliant earnings are always high quality — management has wide discretion in timing, classification, and estimation that can produce low-quality earnings without violating GAAP.",
        "Treating a large non-recurring gain as neutral to earnings quality assessment — frequent 'non-recurring' items that recur every few years are a red flag for income smoothing."
      ],
      mnemonic: "ACCRUAL: Accruals high = Cash flow low = Red flag; Use both ratio and cash flow analysis"
    }
  ],
  "Corporate Issuers": [
    {
      module: "Capital Structure",
      rules: [
        "Under MM with taxes, V_L = V_U + T_c × D — firm value increases monotonically with debt due to the tax shield (no costs assumed); the trade-off theory adds financial distress costs to find an interior optimum.",
        "The pecking order predicts firms prefer internal financing first, then debt, then equity — equity issuance is last resort because it signals management believes stock is overvalued.",
        "WACC declines with leverage at first (cheap after-tax debt replaces equity) but rises again when financial distress costs and the rising required return on levered equity dominate."
      ],
      traps: [
        "Using MM without taxes to conclude capital structure is irrelevant in all real-world cases — MM irrelevance requires no taxes, no distress costs, and perfect markets; adding taxes makes debt valuable.",
        "Confusing the target capital structure (long-run strategic objective) with the actual capital structure at a point in time — WACC should use target weights, not current market weights, for investment analysis."
      ],
      mnemonic: "TV+D: Trade-off = Value maximized where tax shield = distress cost; Pecking order = internal → Debt → equity"
    },
    {
      module: "Dividends & Share Repurchases",
      rules: [
        "Under MM dividend irrelevance, shareholders are indifferent between dividends and capital gains in a perfect market — in practice, taxes, signaling, and clientele effects make dividend policy matter.",
        "A share repurchase at fair value is equivalent to a cash dividend under MM — EPS rises (fewer shares), but P/E compresses by the same amount, leaving stock price unchanged.",
        "The clientele effect implies firms should not change dividend policy arbitrarily — changing the payout ratio will cause clientele disruption and trading costs even if long-run value is unchanged."
      ],
      traps: [
        "Assuming that an EPS increase following a buyback always creates value — if the shares were repurchased above intrinsic value, the buyback destroys value for continuing shareholders even as EPS rises.",
        "Treating a special dividend as equivalent to a regular dividend for signaling purposes — a special one-time dividend commits management to nothing; a regular dividend initiating or increasing implies a durable commitment."
      ],
      mnemonic: "DISC: Dividends signal commitment; Irrelevance holds only with perfect markets; Share buyback ≠ free EPS boost; Clientele — don't change policy abruptly"
    },
    {
      module: "Corporate Governance & ESG",
      rules: [
        "Board independence requires a majority of independent directors — look for CEO duality (CEO = Chairman), related-party transactions, and directors serving on too many boards as governance red flags.",
        "Cumulative voting gives minority shareholders more power to elect board representation — straight (statutory) voting allows a majority shareholder to elect all directors.",
        "ESG risks are relevant to valuation: E and S risks affect regulatory costs, reputational costs, and operating licenses; G risks directly affect principal-agent conflicts and cost of capital."
      ],
      traps: [
        "Treating a staggered board (directors elected in classes over multiple years) as always bad governance — while it entrenches management, it can also protect against short-term activist pressure that destroys long-term value.",
        "Equating higher ESG scores with higher returns without recognizing that ESG integration is about risk-adjusted returns — ESG may reduce tail risks without necessarily boosting average returns."
      ],
      mnemonic: "BISE: Board independence; Independent chair; Shareholder rights (voting); ESG = risk lens"
    }
  ],
  "Equity": [
    {
      module: "Equity Valuation Approaches",
      rules: [
        "Match the valuation model to the company: DDM for stable dividend payers, FCFE for non-dividend payers with predictable capex, EV/EBITDA for capital-intensive or leveraged companies, RI when accounting data is reliable.",
        "Going-concern value (DCF) is appropriate when the firm will continue operations; liquidation value is appropriate when the firm is in distress — always state which premise you are using.",
        "Sum-of-the-parts (SOTP) valuation is best for conglomerates where different segments have different risk profiles — apply the appropriate multiple or WACC to each segment separately."
      ],
      traps: [
        "Applying a DDM to a company that pays no dividends by assuming it pays out 100% of earnings — FCFE or RI models are more appropriate when dividend capacity ≠ actual dividends.",
        "Using book value of equity as a proxy for intrinsic value — book value reflects historical cost; for most companies, intrinsic value diverges significantly from book value."
      ],
      mnemonic: "MoPV: Model selection → (D)ividends / (F)CF / (M)ultiples / (R)esidual → match to firm type"
    },
    {
      module: "Return Concepts",
      rules: [
        "The equity risk premium (ERP) used in a DCF must be consistent with the beta estimate — use the same historical period, frequency, and market proxy for both.",
        "The implied ERP (derived from current market prices and long-run earnings growth estimates) is forward-looking and preferable to historical estimates when the past may not represent future conditions.",
        "The build-up method for private companies starts with the risk-free rate and adds the ERP, size premium, and company-specific risk premium — do not apply CAPM beta to a non-traded firm."
      ],
      traps: [
        "Using the arithmetic mean historical return premium as the ERP in a DCF (appropriate for single-period expected return estimates) instead of the geometric mean (appropriate for multi-period compounding contexts).",
        "Treating the CAPM required return and the investor's expected return (E(r)) as the same thing — the stock is fairly valued only if they are equal; if E(r) > required, the stock is undervalued."
      ],
      mnemonic: "HIRE: Historical vs Implied ERP; Risk-free consistency; Expected ≠ required unless fairly priced"
    },
    {
      module: "Industry & Company Analysis",
      rules: [
        "Porter's Five Forces determine industry-level profitability — all five must be assessed together; a single powerful force (e.g., buyer power) can suppress profitability even if the other four are favorable.",
        "The industry life cycle stage dictates the appropriate valuation method: growth stage → revenue multiples or DCF with high terminal growth; mature → normalized earnings multiples; declining → asset-based.",
        "Pricing power is the single most important driver of long-term profitability — evaluate it through gross margin stability across cycles, not just current margins."
      ],
      traps: [
        "Treating high industry growth as sufficient for attractive equity returns — fast-growing industries often attract competition that compresses margins, destroying value for incumbents.",
        "Confusing industry market share analysis with Porter's framework — market share measures competitive position, while Porter's Forces measure structural industry attractiveness regardless of who has share."
      ],
      mnemonic: "5F-CLAPS: Customer, Labor (substitutes), Assets (rivalry), Producers (new entrants), Suppliers — all 5 together"
    },
    {
      module: "Discounted Dividend Valuation",
      rules: [
        "GGM requires g < r — if g ≥ r, the model produces a negative or infinite value; use a multi-stage model or H-model for companies with currently high growth.",
        "H-model formula: V₀ = D₀[(1+g_L) + H(g_S − g_L)] / (r − g_L) where H is the HALF-LIFE of the high-growth period (years / 2), not total years.",
        "PRAT model: g = profit margin (P) × retention (R) × asset turnover (A) × leverage (T) — this is the sustainable growth rate from ROE × (1 − payout)."
      ],
      traps: [
        "Using H as the total length of the high-growth period in the H-model formula — H is half that length; using the wrong H produces an over- or undervalued answer.",
        "Applying the GGM terminal value with the near-term high growth rate rather than the long-run sustainable growth rate — always ensure the terminal growth rate is sustainable (≤ nominal GDP growth)."
      ],
      mnemonic: "GGM: g < r always; H-model: H = half-life; Multi-stage for high-growth firms"
    },
    {
      module: "Free Cash Flow Valuation",
      rules: [
        "FCFF is pre-debt, pre-tax (add back after-tax interest) — discount at WACC to get firm value, then subtract net debt for equity value.",
        "FCFE is post-debt (add net new borrowing, subtract debt repayment) — discount at cost of equity to get equity value directly; do not discount at WACC.",
        "Net working capital investment = increase in current operating assets minus increase in current operating liabilities — exclude short-term debt and cash from the calculation."
      ],
      traps: [
        "Discounting FCFF at the cost of equity (too high a rate), understating firm value — FCFF belongs to both debt and equity holders, so use WACC.",
        "Omitting the net borrowing term when computing FCFE from FCFF — FCFE = FCFF − Interest(1−T) + Net Borrowing; forgetting net borrowing understates or overstates FCFE."
      ],
      mnemonic: "FF: FCFF → Firm → WACC; FCFE → Equity → r_e; add interest back for FCFF, add net borrowing for FCFE"
    },
    {
      module: "Price Multiples",
      rules: [
        "Justified P/E = (1 − b) / (r − g) — this is the LEADING P/E (based on next year's earnings); the trailing justified P/E = (1 − b)(1 + g) / (r − g).",
        "EV/EBITDA is better than P/E for comparing companies with different capital structures or depreciation policies because it is capital structure-neutral and pre-depreciation.",
        "When comparing P/B across firms, normalize for ROE — a high P/B is justified only if ROE exceeds the cost of equity; the justified P/B = (ROE − g) / (r − g)."
      ],
      traps: [
        "Using trailing EPS in a justified P/E formula — the GGM-derived justified P/E uses FORWARD earnings (D₁/E₁ = payout ratio); using trailing EPS mixes the formulas.",
        "Applying raw P/E comparisons across firms with different growth rates — a high-P/E stock may be CHEAPER than a low-P/E stock if it has proportionally higher growth (PEG ratio corrects for this)."
      ],
      mnemonic: "PEG: P/E is only comparable after adjusting for Growth and capital structure differences"
    },
    {
      module: "Residual Income",
      rules: [
        "RI = Net Income − (r_e × BV_{t-1}) — any earnings above the equity charge create positive RI; this is the economic profit concept applied to equity.",
        "V₀ = BV₀ + PV(all future RI) — if ROE > r_e forever, V₀ > BV₀ (P/B > 1); if ROE = r_e, V₀ = BV₀; if ROE < r_e permanently, V₀ < BV₀.",
        "EVA = NOPAT − WACC × Invested Capital = (ROIC − WACC) × IC — positive EVA means the firm is creating value above its cost of capital."
      ],
      traps: [
        "Using ending book value (BV_t) instead of beginning book value (BV_{t-1}) in the equity charge calculation — the charge is on capital at the START of the period.",
        "Applying the RI model when the clean surplus relation is violated — if comprehensive income items bypass the income statement (OCI items that don't flow through NI), RI model results will be distorted."
      ],
      mnemonic: "RI = ROE above hurdle × BV; V = BV + PV(RI); EVA = ROIC − WACC × IC"
    },
    {
      module: "Private Company Valuation",
      rules: [
        "Apply discounts sequentially: start with control value, apply DLOC to get minority interest value, then apply DLOM to get minority non-marketable value — do NOT add them as simple percentages.",
        "The build-up method for private company discount rate = risk-free rate + ERP + size premium + company-specific risk premium — beta is not applicable to non-traded firms.",
        "Venture capital valuation uses a pre-money / post-money framework: Post-money = Pre-money + Investment; VC ownership % = Investment / Post-money value."
      ],
      traps: [
        "Adding DLOC and DLOM percentages (e.g., 20% + 30% = 50% total discount) instead of applying them sequentially (value × 0.80 × 0.70 = 44% discount, not 50%).",
        "Using the public market WACC directly for a private company without adding a size premium and company-specific risk premium — private companies are riskier than their public peers due to concentration and illiquidity."
      ],
      mnemonic: "DISC-P: Discounts are Sequential (not additive); Private firms need Build-up rate, not CAPM beta"
    }
  ],
  "Fixed Income": [
    {
      module: "Term Structure & Interest Rate Dynamics",
      rules: [
        "Spot rates are zero-coupon rates for a single cash flow at time T; forward rates are rates for a future period implied by the spot curve — derive forwards from spots using (1+S_{n+1})^{n+1} / (1+S_n)^n.",
        "An upward-sloping yield curve is consistent with (a) expectations of rising rates, (b) liquidity premiums for longer maturities, or (c) preferred habitat demand concentrated in short maturities — all three theories can explain the same curve shape.",
        "Key rate durations measure sensitivity to changes at specific maturities — they sum to effective duration and are essential for analyzing non-parallel yield curve shifts."
      ],
      traps: [
        "Concluding that an inverted yield curve must reflect expectations of falling short rates, ignoring that preferred habitat investors may be driving demand for long bonds regardless of rate expectations.",
        "Using yield-to-maturity as the discount rate for each cash flow in a bond with a structured cash flow pattern — each cash flow should be discounted at its own spot rate, not a single YTM."
      ],
      mnemonic: "SFP: Spot → Forward → Par; each derived from the previous; yield curve theories = Expectations + Liquidity + Habitat"
    },
    {
      module: "Arbitrage-Free Valuation",
      rules: [
        "A binomial interest rate tree is calibrated to match the current term structure exactly — each node's rate is chosen so that the tree prices on-the-run bonds at their market prices.",
        "OAS is the spread added to every node in the interest rate tree to match the market price of an option-embedded bond — for callable bonds, OAS < Z-spread (option has value); for putables, OAS > Z-spread.",
        "Monte Carlo simulation is needed for path-dependent securities (MBS, CMOs) because their cash flows depend on the entire interest rate path, not just the current rate."
      ],
      traps: [
        "Interpreting a high OAS as unambiguously cheap — OAS may be wide because the model's interest rate volatility assumption is too low, making the option appear less costly than it really is.",
        "Using the Z-spread instead of OAS to compare option-embedded bonds — Z-spread includes option cost, making callable bonds appear to offer more spread than they actually do after adjusting for the call option given away."
      ],
      mnemonic: "OAS = Z − Option Cost (for callables); tree is calibrated to market; Monte Carlo for path-dependent"
    },
    {
      module: "Bonds with Embedded Options",
      rules: [
        "Callable bond: V_callable = V_option-free − V_call_option (issuer OWNS the call, so it costs the bondholder — callable bond is worth LESS than the straight bond).",
        "Effective duration for callable bonds is shorter than for straight bonds when rates fall (call risk shortens duration); putable bonds have shorter effective duration when rates rise (put protects the investor).",
        "Higher interest rate volatility increases the value of ALL embedded options — callable bond prices FALL (call option worth more to issuer) and putable bond prices RISE (put option worth more to investor)."
      ],
      traps: [
        "Calculating OAS for a callable bond and concluding a NEGATIVE OAS means the bond is cheap — negative OAS means the bond is priced expensive relative to the benchmark after removing the option; the option is underpriced in the model.",
        "Treating modified duration as applicable to callable bonds — modified duration assumes yields and cash flows are independent, which is violated when embedded options alter cash flows as rates change."
      ],
      mnemonic: "CAVE: Callable = value Adjusted lower (issuer owns call); Volatility lifts all options; Effective duration ≠ modified for embedded bonds"
    },
    {
      module: "Credit Analysis Models",
      rules: [
        "Structural models treat equity as a call option on firm assets — default occurs when asset value falls below the debt face value at maturity; inputs are asset value, asset volatility, and leverage.",
        "Reduced-form models use observable market variables (credit spreads, historical default rates) to estimate hazard rates — they do not model the firm's balance sheet but are more tractable for pricing.",
        "Expected loss = PD × LGD × EAD — reducing any one of the three components (PD via better underwriting, LGD via collateral, EAD via credit limits) reduces expected credit loss."
      ],
      traps: [
        "Applying structural model logic to frequently traded bonds where asset value is unobservable — reduced-form models are preferred for publicly traded credits where spread data is available.",
        "Confusing the credit spread (compensation for expected loss + credit risk premium) with the pure default premium (compensation for expected loss only) — the spread includes both components."
      ],
      mnemonic: "SR-EL: Structural = equity as option on assets; Reduced-form = hazard rate from spreads; EL = PD × LGD × EAD"
    },
    {
      module: "Credit Default Swaps",
      rules: [
        "CDS protection buyer pays the CDS spread (periodic coupon) and receives par minus recovery if a credit event occurs — the buyer profits when credit quality deteriorates (spreads widen).",
        "CDS spread ≈ (1 − Recovery Rate) × Hazard Rate; when the CDS spread widens, the mark-to-market value of protection INCREASES for the buyer and DECREASES for the seller.",
        "Index CDS (CDX in the US, iTraxx in Europe) allow traders to express broad credit market views — buying protection on the index hedges a portfolio of corporate bonds without selling individual positions."
      ],
      traps: [
        "Confusing the protection buyer (pays spread, benefits from default/spread widening) with the protection seller (receives spread, benefits from stable/improving credit) — exam questions frequently reverse roles.",
        "Assuming CDS spread equals bond credit spread exactly — the CDS-bond basis (CDS spread minus bond spread) can be positive or negative due to cheapest-to-deliver options, counterparty risk, and funding costs."
      ],
      mnemonic: "BUY = pays, Benefits from default; SELL = receives spread, Suffers on default; Basis ≠ zero"
    },
    {
      module: "Mortgage-Backed Securities",
      rules: [
        "PSA 100% = CPR of 0.2% × (month number) for the first 30 months, then 6% CPR constant — PSA 200% doubles these rates; PSA 50% halves them.",
        "PAC tranches have a planned amortization schedule protected by support tranches — support tranches absorb prepayment variability (both faster and slower prepayments) and carry more extension AND contraction risk.",
        "Negative convexity in callable bonds and MBS means price appreciation is capped when rates fall (prepayments or calls accelerate), while price declines are full when rates rise."
      ],
      traps: [
        "Treating the sequential-pay CMO structure as giving all tranches lower prepayment risk than the underlying pool — only the longest-maturity (last-pay) tranche has more extension protection; shorter tranches may have MORE contraction risk.",
        "Confusing WAL (weighted average life) with duration for MBS — WAL measures the average time to principal repayment, not price sensitivity to rate changes; MBS duration is shorter than WAL because of cash flow weighting."
      ],
      mnemonic: "PAC SAFE: PAC = planned schedule protected by Support tranches; Adverse prepayments absorbed by support; Faster = contraction; Extension = support gets hit both ways"
    }
  ],
  "Derivatives": [
    {
      module: "Forward Commitments Pricing & Valuation",
      rules: [
        "Forward PRICE is set at initiation so the initial VALUE is zero — during the contract, the value changes as the spot price or interest rates change; these are distinct concepts.",
        "For a dividend-paying stock forward: F₀ = (S₀ − PV(D)) × (1+r)^T — dividends REDUCE the forward price because the forward buyer does not receive them during the holding period.",
        "FRA payoff is settled at the beginning of the loan period (in arrears from the perspective of the loan start), so the settlement amount must be discounted at the reference rate for the loan period."
      ],
      traps: [
        "Forgetting to discount the FRA payoff from the end to the start of the loan period — FRAs settle at the beginning of the reference period, not at the end.",
        "Using the futures price when the question requires a forward price (or vice versa) — futures prices equal forward prices only when interest rates are non-stochastic; in practice, marking to market creates a difference."
      ],
      mnemonic: "FV=0: Forward Value = 0 at initiation; Forward Price ≠ Forward Value; Dividends lower the forward price"
    },
    {
      module: "Valuation of Contingent Claims",
      rules: [
        "BSM requires: continuous trading, no dividends (or known dividends), no transaction costs, constant volatility, and log-normally distributed prices — vega being non-zero means volatility matters greatly.",
        "Delta hedging neutralizes small price moves but not large moves (gamma risk) — a delta-neutral portfolio requires continuous rebalancing as the underlying price and time change.",
        "A payer swaption gives the right to ENTER a swap paying fixed, receiving floating — it increases in value when rates rise (like a put on a bond); a receiver swaption increases in value when rates fall."
      ],
      traps: [
        "Applying BSM to American options on dividend-paying stocks — BSM is for European options; American calls on dividend-paying stocks may be optimally exercised early before the ex-dividend date.",
        "Confusing theta (time decay, generally negative for options) with time value — as expiration approaches, time value → 0 for all options, but theta is largest (most negative) for at-the-money options near expiry."
      ],
      mnemonic: "DGV-TRP: Delta = hedge ratio; Gamma = rebalancing need; Vega = volatility sensitivity; Theta = time decay; Rho = rate sensitivity; Payer swaption = benefits from rising rates"
    }
  ],
  "Alternative Investments": [
    {
      module: "Private Equity Valuation",
      rules: [
        "Use actual invested capital (money deployed) for IRR calculations — committed capital (total promised to the fund) is used only for management fee calculations, not for return measurement.",
        "LBO value drivers are: entry multiple, exit multiple, debt paydown, and operational improvement (EBITDA growth) — the highest IRR comes from buying cheap, selling dear, and using maximum leverage.",
        "The J-curve reflects that PE funds show negative early returns (fees, investments written at cost or below) before realizations — vintage year diversification reduces J-curve exposure."
      ],
      traps: [
        "Computing IRR using committed capital in the denominator instead of invested (called) capital — this dramatically understates IRR during the early deployment phase when capital is only partially drawn.",
        "Treating MOIC and IRR as equivalent performance measures — a 3× MOIC over 10 years has a much lower IRR than a 3× MOIC over 3 years; IRR is time-sensitive, MOIC is not."
      ],
      mnemonic: "LBO-JIRR: LBO = leverage + buy cheap sell dear; J-curve = negative early; IRR uses INVESTED (not committed) capital"
    },
    {
      module: "Commodities",
      rules: [
        "Total commodity futures return = spot return + roll yield + collateral yield — the roll yield is the dominant long-run return driver, not spot price changes.",
        "Backwardation (futures price < expected spot) produces positive roll yield — as the futures contract converges to spot, a long position gains; contango produces negative roll yield.",
        "Convenience yield captures the benefit of holding physical inventory (production flexibility, avoiding stockouts) — it is high when spot inventories are tight and is the reason energy markets can be in persistent backwardation."
      ],
      traps: [
        "Assuming that commodity prices rising (positive spot return) implies a positive total futures return — in a heavily contangoed market, roll losses can exceed spot gains, producing a negative total return.",
        "Confusing the theory of normal backwardation (Keynes — hedgers pay a risk premium to speculators, so futures < expected future spot) with backwardation (futures < current spot, which is an observable market condition)."
      ],
      mnemonic: "SRC: Spot + Roll + Collateral = total return; Roll is positive in Backwardation, negative in Contango; Convenience yield → backwardation"
    }
  ],
  "Portfolio Management": [
    {
      module: "Multifactor Models",
      rules: [
        "Macroeconomic factor models use surprises in observable factors (GDP, inflation, spreads) as the risk factors; fundamental factor models use firm attributes (P/B, size) — returns are regressed on attributes.",
        "APT pricing: E(Rᵢ) = RF + Σ(βᵢₖ × λₖ) — if a portfolio has zero factor exposures and a positive expected return, it is a pure arbitrage (no-arbitrage condition eliminates it).",
        "In the Fama-French model: market (MKT) captures systematic equity risk; SMB captures small-cap premium; HML captures value premium — each factor's loading (beta) can be positive or negative."
      ],
      traps: [
        "Treating a positive factor loading on HML (value factor) as always increasing expected return — if the HML factor realized return is negative in a period, a positive loading produces a negative contribution.",
        "Confusing APT (any number of factors, derived from no-arbitrage) with CAPM (single factor, derived from mean-variance optimization) — APT does not require all investors to hold the market portfolio."
      ],
      mnemonic: "MAF: Macro surprises → returns; Attributes → Fundamental factors; APT = no-arbitrage pricing with multiple betas"
    },
    {
      module: "Active Portfolio Management",
      rules: [
        "IR = IC × √BR — to double the IR, either quadruple the breadth (number of independent bets) or double the IC (skill per bet); increasing breadth via correlated bets does NOT increase IR.",
        "Optimal active risk (tracking error) = (IR / SR_B) × σ_B — higher-skill managers (high IR) should take more active risk; the optimal blend of active + passive maximizes the overall Sharpe ratio.",
        "Constraints reduce effective breadth below theoretical breadth — long-only mandates eliminate short positions and reduce the number of ways to express negative views, lowering realized IR vs theoretical."
      ],
      traps: [
        "Applying the fundamental law to a manager who makes 100 correlated bets, counting breadth as 100 — the law requires INDEPENDENT bets; if bets are correlated, effective breadth is much less than 100.",
        "Equating a high IC (strong forecasting skill) with a high IR without considering breadth — a manager with IC = 0.10 and BR = 25 has IR = 0.50, the same as a manager with IC = 0.05 and BR = 100."
      ],
      mnemonic: "ICBR: Information is Created by IC and Breadth (independent bets); Constraints cut Breadth"
    },
    {
      module: "Economics & Investment Markets",
      rules: [
        "The intertemporal rate of substitution (IRS) links investor preferences to risk premiums — when consumption growth is expected to be high, the IRS is low (investors save less) and risk premiums fall.",
        "Equity risk premiums are counter-cyclical — they rise in recessions (when investors demand more compensation for bearing risk) and fall in expansions; credit spreads follow the same pattern.",
        "The Taylor rule guides central bank policy: policy rate = neutral rate + 0.5(inflation gap) + 0.5(output gap) — knowing this helps forecast rate changes from economic data surprises."
      ],
      traps: [
        "Assuming that rising real interest rates always lower equity valuations — rising real rates that reflect higher expected real growth can be POSITIVE for equities if earnings growth expectations rise proportionally.",
        "Treating all asset class risk premiums as constant through time — risk premiums are time-varying and business-cycle-dependent; applying a long-run average spread during a recession underestimates required return."
      ],
      mnemonic: "CITE: Consumption links to IRS and risk premiums; InTertemporal substitution falls when growth expected; ERP is counter-cyclical"
    }
  ]
};

const LOS_L3 = {
  "Ethics": { weight: 10, modules: {
    "Application of Code & Standards at L3": [
      "evaluate practices and policies related to the CFA Institute Code of Ethics and Standards of Professional Conduct in portfolio management contexts",
      "formulate policies and procedures that a firm should adopt to comply with CFA Institute Standards, including soft dollar and trade allocation policies",
      "discuss investment manager responsibilities under the Standards, including duties to clients, employers, and the profession",
      "recommend appropriate actions in response to conflicts of interest, compensation arrangements, and referral fees in an investment management setting",
      "justify compliance procedures for trade allocation, IPO allocation, and block trade policies consistent with Standard III-B (Fair Dealing)",
      "evaluate soft dollar arrangements and distinguish permissible research from impermissible uses of client brokerage"
    ],
    "GIPS Standards": [
      "describe the requirements and recommendations of the GIPS standards with respect to composite construction, including the treatment of new accounts and terminated portfolios",
      "explain the purpose, scope, and key features of the GIPS standards, including the definition of the firm and composite",
      "evaluate composite construction decisions and distinguish discretionary from non-discretionary portfolios",
      "discuss the requirements for GIPS verification and distinguish verification from performance examination",
      "formulate policies for GIPS-compliant portability of investment performance records following a firm merger or personnel change",
      "recommend appropriate treatment of carve-outs under current GIPS standards, including cash allocation requirements"
    ]
  }},
  "Behavioral Finance": { weight: 5, modules: {
    "Behavioral Finance Perspectives": [
      "compare traditional finance and behavioral finance perspectives on investor decision making",
      "explain the concept of bounded rationality and its implications for portfolio construction",
      "describe the key tenets of prospect theory, including loss aversion, diminishing sensitivity, and probability weighting",
      "discuss how behavioral finance challenges the assumptions of market efficiency and rational expectations",
      "evaluate the implications of prospect theory for asset pricing anomalies and investor behavior",
      "compare adaptive markets hypothesis with the traditional efficient market hypothesis"
    ],
    "Behavioral Biases of Individuals": [
      "identify and evaluate cognitive errors of belief perseverance, including conservatism, confirmation, representativeness, illusion of control, and hindsight biases",
      "identify and evaluate cognitive errors of information processing, including anchoring, mental accounting, framing, and availability biases",
      "identify and evaluate emotional biases, including loss aversion, overconfidence, self-control, status quo, endowment, and regret-aversion biases",
      "discuss how behavioral biases affect investment decision making and portfolio construction",
      "recommend techniques to mitigate the impact of cognitive errors and emotional biases in individual portfolios",
      "compare and contrast cognitive errors and emotional biases with respect to their susceptibility to correction"
    ],
    "Behavioral Finance & Investment Processes": [
      "discuss how behavioral factors affect analyst forecasts, committee decisions, and portfolio construction",
      "evaluate market anomalies — momentum, value premium, size effect — from a behavioral finance perspective",
      "formulate behavioral finance-informed approaches to managing the advisor-client relationship, including goal elicitation and risk tolerance assessment",
      "discuss how a goals-based investing framework reflects behavioral finance principles",
      "recommend portfolio construction adjustments to account for identified behavioral biases of individual investors",
      "compare the behavioral portfolio theory with mean-variance optimization in portfolio construction"
    ]
  }},
  "Capital Market Expectations": { weight: 5, modules: {
    "Framework & Macro Considerations": [
      "discuss the role of macroeconomic analysis in forming capital market expectations and identify common pitfalls",
      "evaluate the information content of leading, coincident, and lagging economic indicators for asset class forecasting",
      "describe the phases of the business cycle and their typical implications for equity, fixed income, and commodity returns",
      "apply the Taylor rule to estimate a central bank's policy rate target and evaluate its implications for bond markets",
      "interpret the shape of the yield curve and explain its implications for the economic outlook and asset allocation",
      "discuss the limitations of econometric models, checklists, and surveys as tools for forming capital market expectations"
    ],
    "Forecasting Asset Class Returns": [
      "formulate expected returns for equity using the Singer-Terhaar model, including the equity risk premium and degree of integration adjustment",
      "apply the building block approach to forecast fixed income returns, including the risk-free rate, term premium, credit premium, and liquidity premium components",
      "compare survey-based and model-based approaches to forming capital market expectations and evaluate their strengths and limitations",
      "discuss the risks and biases in historical data when used to estimate future asset class returns",
      "evaluate the impact of currency risk on international asset class return expectations",
      "recommend adjustments to capital market expectations based on cyclical and structural macroeconomic conditions"
    ]
  }},
  "Asset Allocation": { weight: 15, modules: {
    "Overview of Asset Allocation": [
      "describe and compare strategic asset allocation, tactical asset allocation, and dynamic asset allocation approaches",
      "evaluate asset allocation approaches from liability-relative, goals-based, and asset-only perspectives",
      "discuss the role of asset allocation in the overall investment process and its relationship to the IPS",
      "compare mean-variance optimization with liability-relative and goals-based frameworks for determining asset allocation",
      "justify the choice of asset allocation approach given investor type, liability structure, and investment objectives",
      "describe the impact of non-normal return distributions and parameter uncertainty on asset allocation decisions"
    ],
    "Principles of Asset Allocation": [
      "evaluate the inputs and outputs of mean-variance optimization and discuss its practical limitations",
      "formulate an asset allocation using the Black-Litterman model, explaining how investor views are incorporated",
      "construct a risk budget and allocate risk across asset classes using marginal contribution to risk",
      "evaluate factor-based asset allocation approaches and compare them to traditional asset class-based approaches",
      "discuss the use of Monte Carlo simulation to evaluate asset allocation outcomes and address parameter uncertainty",
      "recommend an asset allocation using the reverse-optimization approach embedded in the Black-Litterman framework"
    ],
    "Asset Allocation with Real-World Constraints": [
      "evaluate the impact of taxes on asset allocation decisions, including asset location and after-tax optimization",
      "discuss how illiquidity constraints affect asset allocation, including the treatment of private equity and real assets",
      "formulate rebalancing policies including corridor width, rebalancing triggers, and transaction cost considerations",
      "evaluate ESG integration approaches in asset allocation, including negative screening and factor tilts",
      "recommend adjustments to asset allocation to accommodate investor-specific constraints such as concentrated positions or short time horizons",
      "discuss the tax-efficient placement of asset classes across taxable and tax-deferred accounts (asset location)"
    ],
    "Currency Management": [
      "evaluate the impact of currency risk on international portfolio returns and volatility",
      "formulate a currency hedging policy and recommend hedge ratios given risk tolerance and return objectives",
      "construct a forward currency hedge and evaluate its effectiveness in reducing portfolio currency exposure",
      "evaluate cross-hedge and proxy hedge strategies and their applicability when direct hedging is unavailable",
      "calculate the minimum variance hedge ratio and apply it to a hedging decision",
      "discuss the costs and benefits of dynamic versus passive currency hedging in an international equity portfolio"
    ]
  }},
  "Fixed Income": { weight: 15, modules: {
    "Overview of Fixed-Income Portfolio Management": [
      "describe fixed-income mandate types — liability-driven, benchmark-driven, and absolute return — and evaluate their appropriateness",
      "evaluate the sources of return in a fixed-income portfolio, including coupon, roll return, price change, and currency contribution",
      "compare leverage strategies in fixed income portfolios, including repo agreements, futures, and total return swaps",
      "discuss the risks inherent in leveraged fixed-income portfolios and recommend appropriate risk controls",
      "formulate a fixed-income portfolio strategy given mandate type, liability structure, and benchmark constraints",
      "evaluate the risks and portfolio implications of ESG integration in fixed-income management"
    ],
    "Liability-Driven & Index Strategies": [
      "evaluate cash flow matching and duration matching strategies for immunizing a single liability or set of liabilities",
      "construct a duration-matched portfolio and verify that the immunization conditions are satisfied",
      "discuss the risks of immunization strategies, including reinvestment risk, credit risk, and contingent immunization triggers",
      "evaluate index replication approaches — full replication, stratified sampling, and optimization — for fixed-income portfolios",
      "recommend enhancements to a passive fixed-income strategy, including credit quality tilts and duration deviations",
      "compare liability-driven investing for DB pension plans with immunization strategies for insurance company portfolios"
    ],
    "Yield Curve Strategies": [
      "formulate yield curve positioning strategies — bullet, barbell, and ladder — and evaluate their risk-return tradeoffs",
      "evaluate carry and roll-down return as sources of return in a fixed-income portfolio and compare strategies to capture them",
      "construct a yield curve trade using duration-neutral positioning to express a view on yield curve steepening or flattening",
      "evaluate the risks and return drivers of riding the yield curve as a fixed-income strategy",
      "discuss the use of interest rate swaps and futures to implement yield curve positioning without changing the underlying bond portfolio",
      "compare active yield curve strategies with passive index replication on risk, cost, and return attribution dimensions"
    ],
    "Credit Strategies": [
      "evaluate credit strategies across investment grade and high yield sectors, including the role of spread duration",
      "formulate a credit portfolio strategy using sector rotation based on credit cycle positioning",
      "discuss the use of credit default swaps in portfolio management, including credit protection and synthetic credit exposure",
      "evaluate the liquidity risk premium in credit markets and its implications for portfolio construction",
      "recommend credit risk management techniques, including diversification, CDS protection, and covenant analysis",
      "compare bottom-up and top-down credit portfolio construction approaches and their implications for risk management"
    ]
  }},
  "Equity": { weight: 10, modules: {
    "Overview of Equity Portfolio Management": [
      "describe the roles of equities in a multi-asset portfolio, including capital appreciation, dividend income, and inflation hedging",
      "evaluate equity investment mandates and compare their risk-return objectives — absolute return, relative return, and factor-based",
      "discuss equity benchmarks and their construction methodologies, including market-cap, fundamental, and factor-weighted indexes",
      "compare active versus passive equity management on cost, tracking error, and information ratio dimensions",
      "evaluate factor exposures in an equity portfolio and recommend adjustments to align with the investment mandate",
      "discuss the return expectations and risks associated with various equity investment styles — value, growth, momentum, quality"
    ],
    "Passive Equity Investing": [
      "compare full replication, stratified sampling, and optimization approaches to constructing a passive equity portfolio",
      "evaluate the sources of tracking error in passive equity funds and recommend methods to minimize them",
      "discuss the structure, advantages, and risks of equity ETFs versus index mutual funds for passive exposure",
      "evaluate the tax efficiency of ETFs relative to index mutual funds and discuss the creation/redemption mechanism",
      "recommend between passive equity implementation vehicles — ETFs, index futures, total return swaps — given cost, tax, and liquidity constraints",
      "discuss the equity ETF ecosystem including authorized participants, arbitrage mechanism, and premium/discount dynamics"
    ],
    "Active Equity: Strategies": [
      "evaluate fundamental active equity strategies and distinguish between value and growth investment approaches",
      "discuss quantitative equity strategies and evaluate their dependence on factor models and data quality",
      "evaluate activist investing as a strategy, including engagement tactics and the role of shareholder advocacy",
      "compare long/short equity and long-only active strategies on risk, return, and leverage dimensions",
      "recommend an active equity strategy appropriate for given investor constraints, market conditions, and return objectives",
      "discuss statistical arbitrage and market-neutral strategies and evaluate their return drivers and risk exposures"
    ],
    "Active Equity: Portfolio Construction": [
      "evaluate approaches to position sizing in an active equity portfolio, including conviction weighting and equal weighting",
      "discuss the role of factor neutralization in managing unintended factor exposures in active equity portfolios",
      "construct a risk budget for an active equity portfolio and allocate active risk across positions",
      "evaluate the impact of portfolio turnover on net returns and recommend turnover management techniques",
      "recommend portfolio construction adjustments to achieve target active share and tracking error",
      "discuss how to decompose active return into factor return and security selection components"
    ]
  }},
  "Alternative Investments": { weight: 5, modules: {
    "Portfolio Role of Alternatives": [
      "evaluate the diversification benefits and risks of alternative investments in a multi-asset portfolio",
      "discuss the liquidity risk premium associated with private market investments and its implications for portfolio construction",
      "formulate a due diligence framework for evaluating alternative investment managers, including operational and investment risk",
      "compare alternative investment risk-return characteristics to traditional asset classes using appropriate performance metrics",
      "evaluate the impact of survivorship bias and backfill bias on reported alternative investment returns",
      "recommend an allocation to alternative investments given portfolio objectives, liquidity constraints, and risk tolerance"
    ],
    "Hedge Fund Strategies": [
      "describe and evaluate major hedge fund strategies, including equity long/short, global macro, event-driven, relative value, and multi-strategy",
      "evaluate the sources of return and key risks for each major hedge fund strategy",
      "discuss the role of leverage in hedge fund strategies and evaluate its impact on risk and return",
      "compare the risk-return profiles of directional and non-directional hedge fund strategies",
      "evaluate hedge fund performance using appropriate benchmarks and metrics, accounting for illiquidity and option-like payoffs",
      "recommend hedge fund strategy allocations given portfolio objectives, market conditions, and diversification needs"
    ],
    "Allocating to Alternatives": [
      "evaluate the limitations of mean-variance optimization for allocating to alternative investments with illiquid and non-normal return profiles",
      "discuss the J-curve effect and the distinction between committed capital and invested capital in private markets",
      "formulate a pacing model for private equity allocations to manage vintage year diversification and capital calls",
      "evaluate the use of scenario analysis and stress testing to assess alternative investment portfolio risks",
      "recommend approaches to managing the illiquidity of private market investments, including secondary market strategies",
      "discuss the role of real assets — infrastructure, real estate, timberland — in providing inflation protection and portfolio diversification"
    ]
  }},
  "Derivatives": { weight: 5, modules: {
    "Options Strategies": [
      "construct and evaluate options strategies — covered calls, protective puts, collars, spreads, straddles — including payoff diagrams and breakeven points",
      "evaluate the risk-return tradeoff of covered call writing and protective put strategies in portfolio management contexts",
      "formulate a collar strategy to limit downside while sacrificing upside on a concentrated equity position",
      "discuss the Greeks — delta, gamma, theta, vega, rho — and evaluate their portfolio implications for options positions",
      "evaluate the use of spread strategies — bull spread, bear spread, calendar spread — for expressing directional and volatility views",
      "recommend an options strategy appropriate to a given portfolio objective, including income enhancement and downside protection"
    ],
    "Swaps/Forwards/Futures Strategies": [
      "formulate an equity futures overlay strategy to adjust portfolio beta without transacting in the underlying equities",
      "construct a fixed-income futures position to achieve a target portfolio duration",
      "evaluate the use of currency forwards to hedge or modify the currency exposure of an international portfolio",
      "discuss total return swaps as instruments for gaining synthetic exposure to asset classes or transferring risk",
      "evaluate the basis risk, roll costs, and liquidity considerations in implementing futures-based overlay strategies",
      "recommend derivative instruments — futures, forwards, swaps — for implementing tactical asset allocation changes efficiently"
    ]
  }},
  "Risk Management": { weight: 5, modules: {
    "Risk Management for Individuals": [
      "evaluate the human capital and financial capital components of an individual's total wealth and their implications for asset allocation",
      "formulate life insurance coverage needs using the human capital approach and evaluate appropriate insurance types",
      "discuss the distinction between risk capacity (ability to bear risk) and risk tolerance (willingness to bear risk) in individual portfolio management",
      "evaluate the impact of career risk, mortality risk, and longevity risk on individual financial planning",
      "recommend portfolio adjustments to hedge human capital risk, including industry concentration and labor income volatility",
      "discuss the role of annuities and guaranteed income products in managing longevity risk for individual investors"
    ],
    "Derivatives-Based Risk Management": [
      "evaluate delta hedging as a risk management technique and discuss the role of gamma in dynamic hedging costs",
      "formulate a tail risk hedging strategy using long put options or put spreads and evaluate the cost-benefit tradeoff",
      "discuss variance swaps as instruments for hedging or expressing views on realized volatility",
      "evaluate the use of options to manage the risk of a concentrated equity position, including costless collars and prepaid variable forwards",
      "construct a delta-neutral portfolio using options and the underlying, and evaluate the cost of rebalancing as gamma changes",
      "recommend derivative-based risk management strategies appropriate to a given portfolio risk profile and hedging objective"
    ]
  }},
  "Trading & Performance": { weight: 5, modules: {
    "Trade Strategy & Execution": [
      "evaluate order types — market, limit, stop, algorithmic — and their appropriateness for different trading objectives",
      "discuss implementation shortfall as a measure of trading cost and decompose it into delay, realized, and missed trade components",
      "evaluate pre-trade and post-trade analysis frameworks for assessing execution quality",
      "describe algorithmic trading strategies — TWAP, VWAP, participation, dark pool — and their tradeoffs in minimizing market impact",
      "recommend an execution strategy appropriate to a trade's urgency, order size, and market liquidity conditions",
      "evaluate the role of the trading desk in portfolio management and discuss best execution obligations"
    ],
    "Portfolio Performance Evaluation": [
      "compare time-weighted rate of return and money-weighted rate of return and evaluate their appropriateness for manager performance assessment",
      "evaluate risk-adjusted performance measures — Sharpe ratio, Treynor ratio, Jensen's alpha, M², information ratio — and identify their appropriate applications",
      "construct a performance attribution analysis using the Brinson-Hood-Beebower model, decomposing return into allocation, selection, and interaction effects",
      "evaluate factor-based performance attribution and compare it to returns-based style analysis",
      "discuss the limitations of performance measurement, including survivorship bias, benchmark gaming, and appraisal period sensitivity",
      "recommend appropriate performance benchmarks for different equity mandate types — custom, broad market, factor-based"
    ],
    "Investment Manager Selection": [
      "formulate an investment manager due diligence framework covering investment process, risk management, and operational infrastructure",
      "evaluate style consistency and style drift using returns-based style analysis and holdings-based analysis",
      "discuss operational risks in investment manager selection, including custody, valuation, compliance, and key-person risk",
      "evaluate manager performance track records, distinguishing skill from luck using statistical significance frameworks",
      "recommend appropriate fee structures — flat, performance-based, fulcrum — and evaluate their alignment with investor interests",
      "discuss the ongoing monitoring process for investment managers, including triggers for termination"
    ]
  }},
  "Private Wealth Management": { weight: 10, modules: {
    "Overview of Private Wealth": [
      "discuss the goals-based planning framework and evaluate its advantages over traditional mean-variance approaches for private clients",
      "evaluate the life-cycle model of wealth accumulation and decumulation and its implications for asset allocation across investor age cohorts",
      "formulate an investment policy statement for a private wealth client incorporating goals, constraints, time horizons, and risk tolerance",
      "discuss the role of human capital in private wealth planning and evaluate strategies to hedge income risk",
      "compare the balance sheet approach and goals-based approach to private wealth management",
      "evaluate the impact of taxes, inflation, and spending needs on long-run wealth accumulation for private clients"
    ],
    "Topics in Private Wealth": [
      "evaluate tax planning strategies for private wealth clients, including tax-loss harvesting, asset location, and tax-deferred accounts",
      "discuss the risks of concentrated single-stock positions and evaluate strategies to manage them, including diversification, hedging, and exchange funds",
      "formulate a comprehensive risk management program for a high-net-worth individual, covering property, liability, and personal risk",
      "evaluate the after-tax return impact of different portfolio rebalancing approaches for taxable investors",
      "discuss the use of tax-exempt and tax-deferred investment vehicles in private wealth management",
      "recommend portfolio strategies to address multiple, potentially conflicting financial goals across different time horizons"
    ],
    "Estate Planning": [
      "evaluate strategies for transferring wealth across generations, including gifts, trusts, and charitable vehicles",
      "discuss the role of wills, living trusts, revocable and irrevocable trusts in a comprehensive estate plan",
      "evaluate gift strategies and the use of annual exclusion gifts, grantor retained annuity trusts (GRATs), and charitable remainder trusts (CRTs)",
      "discuss generation-skipping transfer strategies and evaluate their tax efficiency relative to direct bequests",
      "evaluate cross-border estate planning issues, including domicile, situs rules, and international estate tax treaties",
      "formulate an estate plan that balances wealth transfer efficiency with retained financial security for the grantor"
    ],
    "Concentrated Single-Asset Positions": [
      "evaluate hedging strategies for concentrated equity positions, including protective puts, collars, and forward sales",
      "discuss exchange funds as a diversification strategy for concentrated equity positions and evaluate their tax and eligibility requirements",
      "evaluate charitable strategies — charitable remainder trusts, donor-advised funds, charitable lead trusts — for diversifying concentrated positions with tax benefits",
      "recommend tax lot selection strategies — HIFO, FIFO, specific identification — to minimize capital gains tax on portfolio sales",
      "formulate a monetization strategy for a concentrated position using prepaid variable forwards or margin loans",
      "evaluate the tradeoffs between immediate diversification, tax deferral, and hedging costs for a concentrated single-stock holding"
    ]
  }},
  "Institutional Investors": { weight: 5, modules: {
    "Institutional Investor Types & IPS": [
      "compare the objectives, constraints, and typical asset allocations of defined benefit pension plans, endowments, foundations, insurance companies, and sovereign wealth funds",
      "formulate an investment policy statement for a defined benefit pension plan, incorporating liability structure, funded status, and risk tolerance",
      "evaluate the investment objectives and constraints of endowments and foundations, including spending rules and perpetual time horizon",
      "discuss the unique regulatory, tax, and liability-driven constraints facing insurance companies in their investment programs",
      "evaluate the role of sovereign wealth funds and distinguish stabilization, savings, and development fund mandates",
      "recommend appropriate asset allocation and benchmark choices for each institutional investor type"
    ],
    "Asset Allocation for Institutions": [
      "evaluate asset-liability management approaches for defined benefit pension plans, including surplus optimization and liability-hedging portfolios",
      "formulate a spending rule for an endowment or foundation and evaluate its sustainability given capital market assumptions",
      "discuss the implications of plan funded status, liability duration, and risk tolerance on DB pension asset allocation",
      "evaluate the use of overlay strategies — interest rate swaps, futures — to manage duration gap in pension portfolios",
      "compare mean-variance optimization and liability-relative optimization for institutional asset allocation",
      "recommend adjustments to institutional asset allocation in response to changes in liability structure, funding status, or regulatory environment"
    ]
  }}
};

const MISCONCEPTIONS_L3 = {
  "Ethics": [
    "believing GIPS verification is mandatory — it is voluntary, but if a firm claims verification it must cover the entire firm, not selected composites",
    "assuming disclosure of a soft dollar arrangement automatically makes it permissible — disclosure is necessary but the arrangement must also benefit clients",
    "treating trade allocation on a pro-rata basis as always required — while rotation or other systematic methods are acceptable if consistently applied and disclosed",
    "confusing performance portability: a manager who moves firms can only port their track record if they have autonomous investment decision-making authority at the prior firm",
    "including non-discretionary portfolios in composites — only actual, fee-paying, discretionary portfolios must be included; non-discretionary accounts are excluded"
  ],
  "Behavioral Finance": [
    "confusing loss aversion (an emotional bias) with risk aversion (a rational preference) — loss aversion involves asymmetric weighting of losses vs gains, not just preferring lower variance",
    "classifying all behavioral biases as cognitive errors susceptible to education — emotional biases (loss aversion, overconfidence, status quo) are harder to correct and require structural portfolio guardrails",
    "applying representativeness bias when anchoring is the correct diagnosis — representativeness involves classifying based on superficial similarity; anchoring involves insufficient adjustment from an initial value",
    "assuming behavioral finance implies markets are always mispriced — the adaptive markets hypothesis allows efficiency to vary across market conditions and investor populations",
    "treating mental accounting as always harmful — at L3, goals-based frameworks deliberately use mental accounting-like bucket structures, making it a feature, not a bug, when properly implemented"
  ],
  "Capital Market Expectations": [
    "applying the Singer-Terhaar model without adjusting for the degree of global market integration — ignoring the integration weight between fully integrated and fully segmented ERP produces an incorrect estimate",
    "using the Taylor rule output as a definitive rate forecast rather than as a guideline — the Taylor rule estimates a neutral policy rate; actual central bank behavior may deviate significantly",
    "assuming a steep yield curve always signals economic recovery — the curve shape reflects both growth expectations and term premium, and can be steep due to inflation concerns even in weak growth environments",
    "using arithmetic mean historical equity returns as the capital market expectation for future equity returns without geometric mean adjustment — overstates expected compounded returns",
    "treating survey-based forecasts as unbiased — surveys reflect consensus views and are subject to anchoring, herding, and recency bias, limiting their independent forecasting value"
  ],
  "Asset Allocation": [
    "treating MVO output as a precise prescription rather than a starting point — small changes in return assumptions produce large portfolio weight shifts; Black-Litterman or constraint overlays are needed in practice",
    "confusing strategic and tactical asset allocation — SAA reflects long-run equilibrium weights from the IPS; TAA involves short-term deviations from SAA based on shorter-horizon return expectations",
    "applying the minimum variance hedge ratio as a fixed rule rather than estimating it from return regression — the optimal hedge ratio is β from regressing spot price changes on futures price changes, not simply 1.0",
    "ignoring the distinction between liability-relative and asset-only optimization for pension funds — for a pension, the relevant risk measure is surplus volatility, not portfolio volatility in isolation",
    "using equal rebalancing corridors for all asset classes — higher-volatility assets with lower transaction costs warrant wider corridors; illiquid asset classes may require asymmetric policies"
  ],
  "Fixed Income": [
    "believing duration matching alone satisfies immunization — true immunization for a single liability also requires (1) PV of assets = PV of liability and (2) asset convexity ≥ liability convexity",
    "confusing cash flow matching with duration matching — cash flow matching eliminates reinvestment risk by directly matching liability cash flows; duration matching still requires reinvestment at the assumed rate",
    "treating a bullet portfolio as always superior to a barbell for riding the yield curve — the barbell outperforms if the yield curve flattens; bullet outperforms under parallel shifts or steepening",
    "misidentifying spread duration as the same as modified duration for all credit instruments — floating-rate notes have low modified duration but positive spread duration equal to time to next coupon reset",
    "assuming high yield bonds provide more diversification benefit in stress periods — HY credit correlations with equities spike during risk-off environments, reducing diversification precisely when it is most needed"
  ],
  "Equity": [
    "assuming low tracking error implies low active risk — if the benchmark itself has concentrated factor exposures, low tracking error may embed significant systematic risk without active management value",
    "confusing active share with information ratio — active share measures portfolio differentiation from the benchmark but does not predict whether the active bets will be rewarded",
    "treating stratified sampling as always inferior to full replication for passive indexing — for large, liquid indexes full replication is preferred, but for illiquid small-cap or international indexes, stratified sampling reduces transaction costs",
    "assuming quantitative strategies are free from behavioral bias — quant models embed the biases of their designers in factor selection and backtesting, and are subject to overfitting and data mining",
    "confusing long/short equity (typically net long, equity beta > 0) with market-neutral strategies (net zero equity beta) — these differ materially in risk exposure and expected return in down markets"
  ],
  "Alternative Investments": [
    "treating reported hedge fund Sharpe ratios as directly comparable to equity fund Sharpe ratios — hedge fund returns exhibit autocorrelation from stale pricing, understating volatility and overstating Sharpe",
    "ignoring the J-curve effect when modeling private equity allocations — early capital calls with no distributions produce negative early returns; the time-zero NAV comparison understates eventual performance",
    "assuming committed capital equals invested capital in NAV-based portfolio weight calculations — committed but uncalled capital is not yet invested and should not be counted in current portfolio weight",
    "treating alternatives as providing unconditional diversification — correlation of alternatives with equities typically rises in market stress periods, reducing diversification when it is most needed",
    "applying standard MVO to alternatives without modification — illiquidity, non-normality, and smoothed returns make MVO inputs unreliable; scenario-based or liability-relative approaches are preferred"
  ],
  "Derivatives": [
    "confusing a covered call with a fully hedged position — covered call writing caps upside and provides only limited downside offset equal to the premium received; it is not a hedge",
    "treating delta as a constant sensitivity measure — delta changes as the underlying price moves (captured by gamma); a delta-neutral portfolio becomes directional unless dynamically rebalanced",
    "using futures contract face value as the number of contracts needed for beta or duration adjustment — the correct formula divides by (futures price × contract multiplier × futures beta or duration)",
    "assuming a collar is costless by definition — a collar can be structured near zero net premium but is not free; the specific strike prices determine whether it is exactly zero cost",
    "confusing basis risk in cross-hedging with credit risk in CDS — basis risk arises when the hedging instrument and the exposure differ; it is a market risk, not a counterparty credit risk"
  ],
  "Risk Management": [
    "equating risk tolerance with risk capacity — risk capacity is objectively determined by financial resources, time horizon, and liabilities; risk tolerance is a subjective psychological preference that may be inconsistent with capacity",
    "treating human capital as always bond-like — human capital resembles bonds for stable-income professionals but resembles equity for entrepreneurs or commission-based workers with volatile, procyclical income",
    "assuming delta hedging eliminates all options risk — delta hedging neutralizes directional risk but leaves gamma risk (curvature) and vega risk (volatility exposure) unhedged",
    "confusing CVaR (expected shortfall) with VaR — CVaR is the expected loss conditional on exceeding VaR; it captures tail severity whereas VaR only identifies the loss threshold",
    "believing variance swaps can be replicated with a single ATM straddle — a variance swap requires a continuous strip of options across all strikes to replicate; a straddle only approximates it near the current price"
  ],
  "Trading & Performance": [
    "using MWRR (IRR) to evaluate portfolio manager skill — MWRR reflects the timing of client cash flows which are outside manager control; TWRR isolates manager decision-making and is the correct measure",
    "applying the Sharpe ratio to compare managers with different benchmark exposures — Treynor ratio (using beta, not total risk) is appropriate when comparing managers who hold only a portion of an investor's total portfolio",
    "treating a positive information ratio as evidence of skill without testing statistical significance — an IR of 0.5 over 3 years is not statistically significant; at least 4-5 years of data are typically needed",
    "using BHB attribution without recognizing that the interaction effect is implicitly assigned to selection — the Brinson model interaction term reflects timing of security selection within sectors and should not be ignored",
    "confusing implementation shortfall with market impact alone — implementation shortfall includes delay cost, realized market impact, and opportunity cost of unexecuted trades; conflating them underestimates true execution cost"
  ],
  "Private Wealth Management": [
    "applying a goals-based framework without recognizing that mental accounting bucket structures can lead to suboptimal total portfolio risk — the sum of bucket allocations may not produce an efficient aggregate portfolio",
    "ignoring the after-tax return when comparing asset location strategies — placing high-yield bonds in taxable accounts and equities in tax-deferred accounts is often suboptimal; the highest tax-cost assets belong in tax-advantaged accounts",
    "treating GRAT success as guaranteed — a GRAT fails to transfer wealth if the grantor dies during the term or if asset returns fall below the Section 7520 hurdle rate; returns must exceed the hurdle to generate gift-tax-free transfers",
    "confusing revocable and irrevocable trusts for estate planning purposes — only irrevocable trusts remove assets from the taxable estate; revocable trusts provide control and probate avoidance but do not reduce estate taxes",
    "assuming charitable remainder trusts (CRTs) provide an immediate full income-tax deduction equal to the donated value — the deduction equals only the present value of the remainder interest, not the full contributed amount"
  ],
  "Institutional Investors": [
    "treating all pension plan risk aversion as equal regardless of funded status — a well-funded plan near its target can afford to de-risk aggressively; an underfunded plan may rationally take more risk to close the funding gap",
    "applying a fixed percentage spending rule to an endowment without considering market value volatility — a fixed percentage of current market value creates highly volatile spending; a smoothed or hybrid spending rule is standard practice",
    "assuming the liability discount rate for a DB pension is the same as the expected return on assets — discount rates for liabilities typically use AA corporate bond yields; conflating them understates or overstates the funding deficit",
    "treating endowment and foundation spending rules interchangeably — foundations typically have a 5% minimum distribution requirement under tax law; endowments have no such requirement and follow discretionary policies",
    "ignoring the duration gap in insurance company portfolios — if asset duration is less than liability duration, rising rates improve the surplus; confusing the direction of the duration gap leads to incorrect risk management recommendations"
  ]
};

const FORMULAS_L3 = {
  "Asset Allocation": [
    {name:"Black-Litterman Expected Return", f:"E(R)_BL = [(τΣ)⁻¹ + P'Ω⁻¹P]⁻¹ × [(τΣ)⁻¹Π + P'Ω⁻¹Q]"},
    {name:"Equilibrium (Reverse-Optimization) Return", f:"Π = λΣw_mkt  (λ = risk aversion coefficient)"},
    {name:"Risk Contribution of Asset i", f:"RC_i = w_i × (Σw)_i / σ_p  (marginal contribution × weight)"},
    {name:"Minimum Variance Hedge Ratio", f:"h* = ρ_{S,F} × (σ_S / σ_F)  = β from regression ΔS on ΔF"},
    {name:"Rebalancing Corridor Width (approx.)", f:"Corridor width ∝ Transaction costs × (1 / Volatility) × (1 / Correlation with rest of portfolio)"},
    {name:"After-Tax Portfolio Return", f:"r_AT = r_pre-tax × (1 − t)  [for fully taxable income; realized gains use capital gains rate]"}
  ],
  "Fixed Income": [
    {name:"Immunization Conditions (Single Liability)", f:"(1) PV(assets) = PV(liability)  (2) D_assets = D_liability  (3) Convexity_assets ≥ Convexity_liability"},
    {name:"Duration Gap", f:"Duration Gap = D_A − (MVL/MVA) × D_L"},
    {name:"Number of Futures for Duration Adjustment", f:"N_f = [(MDT − MDP) / MDf] × (MV_P / P_f × Multiplier)"},
    {name:"Fixed Income Return Decomposition", f:"R ≈ Coupon income + Roll-down return + ΔPrice(Δyield) + Currency return − Funding cost"},
    {name:"Spread Duration Impact", f:"ΔP/P ≈ −SD × ΔSpread  (SD = spread duration)"},
    {name:"Carry Trade Return", f:"Carry return ≈ (Coupon − Repo rate) + Roll-down return along the curve"}
  ],
  "Equity": [
    {name:"Number of Futures for Beta Adjustment", f:"N_f = [(β_T − β_P) / β_f] × (MV_P / P_f × Multiplier)"},
    {name:"Active Return", f:"R_A = R_P − R_B  (portfolio return minus benchmark return)"},
    {name:"Information Ratio", f:"IR = R_A / σ(R_A)  = Active return / Tracking error"},
    {name:"Fundamental Law of Active Management", f:"IR ≈ IC × √BR  (IC = information coefficient, BR = breadth)"}
  ],
  "Capital Market Expectations": [
    {name:"Taylor Rule (Policy Rate)", f:"r* = r_neutral + 0.5(π − π*) + 0.5(GDP_growth − GDP_potential)"},
    {name:"Singer-Terhaar Equity Risk Premium", f:"ERP = ρ × σ_i × SR_GIM × φ + (1−φ) × [σ_i × SR_GIM]  (φ = degree of integration)"},
    {name:"Building Block: Required Return (Fixed Income)", f:"r_bond = r_f + Term premium + Credit premium + Liquidity premium"},
    {name:"Grinold-Kroner Equity Return Model", f:"E(R_e) ≈ Dividend yield + Earnings growth rate + P/E repricing + Currency return"}
  ],
  "Trading & Performance": [
    {name:"Time-Weighted Rate of Return", f:"TWRR = [(1+r₁)(1+r₂)…(1+rₙ)]^(1/n) − 1"},
    {name:"Money-Weighted Rate of Return", f:"Solve: Σ [CF_t / (1+MWR)^t] = 0  (IRR of all portfolio cash flows)"},
    {name:"Sharpe Ratio", f:"S = (R_P − R_f) / σ_P"},
    {name:"Treynor Ratio", f:"T = (R_P − R_f) / β_P"},
    {name:"Jensen's Alpha", f:"α = R_P − [R_f + β_P(R_M − R_f)]"},
    {name:"M² (Modigliani)", f:"M² = R_f + S_P × σ_M  (Sharpe of portfolio × market σ + risk-free rate)"},
    {name:"Information Ratio", f:"IR = (R_P − R_B) / σ(R_P − R_B)"},
    {name:"BHB Allocation Effect", f:"Alloc_i = (w_{Pi} − w_{Bi}) × (R_{Bi} − R_B)"},
    {name:"BHB Selection Effect", f:"Select_i = w_{Bi} × (R_{Pi} − R_{Bi})"},
    {name:"BHB Interaction Effect", f:"Interact_i = (w_{Pi} − w_{Bi}) × (R_{Pi} − R_{Bi})"},
    {name:"Implementation Shortfall", f:"IS = (Paper return − Actual return) = Delay cost + Market impact + Opportunity cost"}
  ],
  "Derivatives": [
    {name:"Covered Call Payoff at Expiry", f:"Profit = (S_T − S_0) + C_0 − max(S_T − X, 0)"},
    {name:"Protective Put Payoff at Expiry", f:"Profit = (S_T − S_0) − P_0 + max(X − S_T, 0)"},
    {name:"Collar Net Payoff", f:"Collar = max(X_L − S_T, 0) − max(S_T − X_H, 0) + (C_H − P_L)  (net premium received if call > put)"},
    {name:"Delta (Δ)", f:"Δ = ∂C/∂S  [Call: 0 < Δ < 1;  Put: −1 < Δ < 0]"},
    {name:"Gamma (Γ)", f:"Γ = ∂²C/∂S²  (rate of change of delta; highest for ATM near expiry)"},
    {name:"Delta-Neutral Hedge Ratio", f:"N_options = −(Δ_portfolio / Δ_option)  to make net delta = 0"},
    {name:"Futures for Currency Hedge", f:"N_f = (MV_foreign × ΔS_target) / (Contract size × Futures price)"}
  ],
  "Risk Management": [
    {name:"CVaR (Expected Shortfall)", f:"CVaR = E[Loss | Loss > VaR_α]  = Average of losses beyond the VaR threshold"},
    {name:"Human Capital (PV of Future Earnings)", f:"HC = Σ [w_t / (1 + r + π)^t]  (w_t = expected wage; r = risk-free + risk premium)"},
    {name:"Life Insurance Need (Human Capital Approach)", f:"Coverage = PV(future earnings) − PV(personal consumption) = Net HC to be replaced"}
  ],
  "Private Wealth Management": [
    {name:"After-Tax Wealth Accumulation (Deferred Capital Gain)", f:"FW_AT = (1 + r)ⁿ − [(1 + r)ⁿ − 1] × t_cg  (if entire gain realized at end)"},
    {name:"Endowment/Foundation Spending Rule (Simple)", f:"Spending = Spending rate × Beginning-of-period portfolio value"},
    {name:"Spending Rule (Smoothed)", f:"Spending_t = α × Spending_{t-1} × (1 + inflation) + (1−α) × rate × MV_{t-1}"}
  ],
  "Institutional Investors": [
    {name:"DB Pension Surplus", f:"Surplus = MV(Assets) − PV(Liabilities)"},
    {name:"Funded Ratio", f:"Funded Ratio = MV(Assets) / PV(Liabilities)"},
    {name:"GIPS Composite Return (Asset-Weighted)", f:"R_composite = Σ (w_i × R_i)  where w_i = beginning-of-period MV_i / Σ MV_i"}
  ]
};

const POWER_NOTES_L3 = {
  "Ethics": { topics: [
    {
      module: "Application of Code & Standards at L3",
      rules: [
        "Soft dollars: the key test is whether client brokerage buys research that benefits CLIENTS — proprietary software, office furniture, or overhead never qualifies regardless of disclosure",
        "Trade allocation: any systematic method (pro-rata, rotation, random) is acceptable as long as it is written, consistently applied, and does not favor house accounts or favored clients",
        "Manager responsibility runs to clients first — when employer policy conflicts with Standard III (Duties to Clients), the Standards take precedence; the manager must protect the client even at personal cost to employment"
      ],
      traps: [
        "Disclosure of a conflict does NOT cure it — at L3 a common error is selecting 'disclose' as sufficient when the Standards require both disclosure AND elimination or management of the conflict",
        "Assuming compliance with local law is enough — CFA Standards impose the stricter standard; a jurisdiction permitting a practice does not make it CFA-compliant"
      ],
      mnemonic: "SOFT = Standards Over Firm policy; disclosure isn't enough; Fiduciary first; Trade allocation must be consistent"
    },
    {
      module: "GIPS Standards",
      rules: [
        "Composite inclusion is mandatory for ALL actual, fee-paying, discretionary portfolios — no cherry-picking; firm must define and maintain a list of all composites available to prospective clients",
        "Performance portability requires: (1) same investment decision-makers, (2) same process, (3) records available — ALL three must hold; if a single manager moves alone, the track record stays at the old firm",
        "Verification is firm-wide and voluntary; once claimed, it cannot be limited to selected composites or strategies — partial verification claims violate GIPS"
      ],
      traps: [
        "Confusing the required 5-year minimum GIPS history with a 5-year track record for portability — these are separate requirements; portability requires continuity of process and people, not just years",
        "Assuming carve-outs with allocated cash automatically comply — under current GIPS (2020), carve-outs with allocated cash are only permitted if the carve-out is managed separately with its own cash balance"
      ],
      mnemonic: "GIPS CAVES: Composite (all discretionary), Asset-weighted, Verified (firm-wide), Porting requires same team, Five-year minimum, Specific carve-out rules"
    }
  ]},
  "Behavioral Finance": { topics: [
    {
      module: "Behavioral Finance Perspectives",
      rules: [
        "Prospect theory: losses are weighted roughly 2× more painfully than equivalent gains — this loss aversion directly explains the equity premium puzzle, disposition effect, and investor reluctance to realize losses",
        "Bounded rationality implies investors use heuristics (mental shortcuts) that work well on average but produce systematic errors under stress — the implication is NOT irrationality but constrained optimization",
        "Adaptive markets hypothesis reconciles EMH and behavioral finance: market efficiency varies over time as participants learn; arbitrage opportunities exist but are competed away over time"
      ],
      traps: [
        "Assuming behavioral finance proves markets are always wrong — the L3 exam tests whether you can identify when behavioral forces create exploitable mispricings (momentum, value) vs when they are priced in",
        "Conflating probability weighting in prospect theory with risk aversion — people overweight small probabilities (lotteries, insurance) and underweight moderate-to-high probabilities; this is distinct from standard risk aversion over wealth levels"
      ],
      mnemonic: "BLAP: Bounded rationality, Loss aversion, Adaptive markets, Prospect theory — the four pillars of behavioral finance"
    },
    {
      module: "Behavioral Biases of Individuals",
      rules: [
        "Cognitive errors (belief perseverance + processing errors) respond to education and better frameworks; emotional biases require structural portfolio constraints because they persist even when the investor understands the error",
        "Loss aversion (emotional) manifests as holding losers too long and selling winners too soon — the disposition effect; regret aversion (also emotional) causes investors to favor consensus positions to avoid regret from underperforming peers",
        "Overconfidence is the most dangerous bias for active managers: it drives excessive trading, under-diversification, and over-concentration in familiar securities"
      ],
      traps: [
        "Misclassifying framing (cognitive processing error) as an emotional bias — framing is how a choice is presented affecting decisions; it is a cognitive error correctable by reframing, not an emotional response",
        "Applying the same mitigation strategy to emotional and cognitive biases — cognitive errors can be corrected with checklists and structured processes; emotional biases require adapting the portfolio to accommodate the bias rather than eliminating it"
      ],
      mnemonic: "CLAIM-ER: Cognitive biases = Learn to correct; Anchoring, Illusion of control, Mental accounting, Confirmation — Emotional biases = Restructure portfolio; Loss aversion, Overconfidence, Regret aversion, Endowment, Status quo"
    },
    {
      module: "Behavioral Finance & Investment Processes",
      rules: [
        "Goals-based investing deliberately uses mental accounting buckets — safety bucket (bonds/annuities), market bucket (equity), and aspirational bucket (alternatives) — to match asset risk to goal urgency",
        "Market anomalies (momentum, value, size) persist partly because behavioral biases of institutional investors prevent full arbitrage — the key L3 application is identifying which bias sustains which anomaly",
        "Advisor-client relationship management requires identifying client biases in the risk questionnaire stage, not after portfolio construction — confirm biases with both stated (risk tolerance) and revealed (past behavior) preferences"
      ],
      traps: [
        "Assuming goals-based portfolios are optimal in mean-variance terms — the aggregate bucket portfolio is often less efficient than a single optimized portfolio; the behavioral benefit of rule-following trades off against expected return",
        "Treating herding as always irrational — at L3, herding by institutional managers can be rational career-risk management (closet indexing); the exam distinguishes rational herding from irrational momentum chasing"
      ],
      mnemonic: "BAGS: Behavioral goals-based = Anchor to mental buckets; Advisor identifies biases early; Goals drive bucket design; Sum of buckets ≠ MVO optimal"
    }
  ]},
  "Capital Market Expectations": { topics: [
    {
      module: "Framework & Macro Considerations",
      rules: [
        "Taylor rule estimates the neutral policy rate — the formula adds 0.5 × inflation gap + 0.5 × output gap to the neutral rate; a positive output gap and inflation above target produce a rate above neutral, signaling tightening",
        "Business cycle phase determines asset class preference: early expansion favors equities and credit; late expansion favors real assets; contraction favors government bonds and defensive equities; trough favors credit and cyclicals",
        "A flat or inverted yield curve signals monetary tightening or growth pessimism — always distinguish between the real rate component (growth expectations) and the inflation component when interpreting curve shape"
      ],
      traps: [
        "Applying Taylor rule mechanically without recognizing that central banks also consider financial stability, exchange rates, and political constraints — the Taylor rule is a benchmark, not a prediction",
        "Treating leading indicators as contemporaneous — leading indicators (e.g., yield curve inversion, ISM new orders) predict turning points 6–12 months ahead; using them as current economic descriptions is a timing error"
      ],
      mnemonic: "TRAY: Taylor rule = Rate anchor; Recovery/Expansion/Contraction/Trough = asset class rotation; Yield curve = monetary policy signal"
    },
    {
      module: "Forecasting Asset Class Returns",
      rules: [
        "Singer-Terhaar ERP = weighted average of integrated market ERP and segmented market ERP; the integration weight (φ) rises as markets open — higher integration means local ERP converges toward the global ERP",
        "Building block approach for bonds stacks components: risk-free rate + term premium + credit premium + liquidity premium — each component is independently estimated and summed; the exam often tests which premium to adjust for a given market change",
        "Grinold-Kroner model for equity return: dividend yield + real earnings growth + inflation + P/E change + currency — the nominal earnings growth and multiple expansion/contraction components are most frequently adjusted in CME scenarios"
      ],
      traps: [
        "Using arithmetic mean historical returns as the forward-looking equity return expectation — geometric mean is the correct compounded return expectation; arithmetic mean overstates expected terminal wealth",
        "Treating the term premium as always positive — in some regimes (quantitative easing, flight to quality) term premiums can compress to near zero or become negative; assume positive only absent a specific argument"
      ],
      mnemonic: "SING to BUILD: Singer-Terhaar = ρ × σ × SR_GIM × integration weight; Building blocks = RF + Term + Credit + Liquidity"
    }
  ]},
  "Asset Allocation": { topics: [
    {
      module: "Overview of Asset Allocation",
      rules: [
        "SAA is derived from long-run CME and investor IPS — it represents the optimal long-run portfolio, not a short-term trade; TAA creates short-term deviations from SAA with the expectation of reversion",
        "Liability-relative allocation (pension, insurance) optimizes surplus (assets − liabilities), not asset-only return — the liability is a negative asset; duration of liabilities must be hedged in the asset portfolio",
        "Goals-based allocation treats each goal as a separate liability to be funded — risk assets are assigned to long-horizon growth goals; low-risk assets fund near-term essential spending; the surplus can be allocated to aspirational goals"
      ],
      traps: [
        "Assuming SAA is fixed forever — SAA should be reviewed when IPS objectives change (e.g., funded status improves, beneficiary demographics shift) or when CME change materially and persistently",
        "Applying MVO directly to a pension without converting to surplus optimization — using asset-only volatility ignores liability-driven interest rate risk; the surplus can fall even as assets rise if rates drop and liabilities rise more"
      ],
      mnemonic: "SAT-G: Strategic (long-run CME) → Tactical (short-term deviation) → Goals-based (bucket per goal) — choose framework based on investor type"
    },
    {
      module: "Principles of Asset Allocation",
      rules: [
        "Black-Litterman starts from market equilibrium (reverse-optimization implied returns) and blends in investor views weighted by confidence — output is a more stable, well-diversified expected return vector than raw MVO inputs",
        "Risk budgeting assigns the total portfolio risk budget to asset classes by marginal contribution to risk (MCTR = β_i × σ_p × w_i); an equally risk-weighted portfolio differs significantly from an equally dollar-weighted portfolio",
        "Factor-based allocation decomposes asset class returns into underlying risk factors (equity beta, term, credit, illiquidity, inflation) — exposures to the same factor in different asset classes create hidden concentration risk"
      ],
      traps: [
        "Confusing Black-Litterman output (stable expected returns) with eliminating corner solutions — BL reduces but does not eliminate extreme weights; constraints on individual asset classes are still typically applied",
        "Assuming equal risk contribution implies low portfolio risk — a risk-parity portfolio using leverage to equalize risk contributions across bonds and equities can have higher portfolio volatility than a 60/40 if leverage is employed"
      ],
      mnemonic: "BRF: Black-Litterman blends views with equilibrium; Risk budgeting by MCTR; Factor exposures reveal hidden concentration"
    },
    {
      module: "Asset Allocation with Real-World Constraints",
      rules: [
        "Asset location rule: place high-tax assets (taxable bonds, REITs) in tax-deferred accounts; place low-tax assets (broad equities, ETFs with low turnover) in taxable accounts — this maximizes after-tax wealth",
        "Rebalancing corridors should be wider for high-volatility, high-transaction-cost, illiquid assets and narrower for low-volatility, liquid, low-cost assets — use ±% of target weight, not fixed dollar amounts",
        "ESG integration does not require sacrificing returns — the exam tests whether ESG screens (negative, best-in-class, ESG momentum) affect tracking error, benchmark deviation, and factor exposures rather than whether ESG is good or bad"
      ],
      traps: [
        "Treating illiquid assets as zero weight until capital is deployed — committed private equity should be counted as part of the target allocation; the liquid portfolio must be sized to fund future capital calls without distress",
        "Assuming tax-loss harvesting is always beneficial — wash-sale rules, transaction costs, and the need to reinvest proceeds in correlated securities limit the net after-tax benefit; the exam tests whether the benefit exceeds the cost"
      ],
      mnemonic: "TIRE: Tax-efficient location; Illiquidity reserves for capital calls; Rebalancing corridors by asset characteristics; ESG = tracking error impact"
    },
    {
      module: "Currency Management",
      rules: [
        "Minimum variance hedge ratio = ρ(spot, futures) × (σ_spot / σ_futures) — this is the regression beta of spot price changes on futures price changes; a ratio of 1.0 (full hedge) is only optimal when ρ = 1 and σ are equal",
        "Cross-hedging (proxy hedging) uses a correlated currency pair when the direct currency forward is unavailable or costly — the hedge is imperfect and introduces basis risk between the proxy and target currency",
        "Currency return on an unhedged international position = foreign asset return in local currency + currency appreciation − (if hedged) forward premium or discount — distinguish between currency gain and asset gain at L3"
      ],
      traps: [
        "Assuming full hedging always reduces portfolio risk — for some currency pairs, currency exposure may reduce overall portfolio volatility if the currency is negatively correlated with local asset returns; partial hedging may be optimal",
        "Confusing carry trade return with hedge cost — the forward rate reflects interest rate differentials (covered interest parity); when forward rate = expected spot rate, the hedge cost equals the carry trade return sacrificed"
      ],
      mnemonic: "MVHC: Minimum Variance Hedge = ρσ ratio; partial hedge when currency diversifies; Hedge cost = interest differential; Cross-hedge adds basis risk"
    }
  ]},
  "Fixed Income": { topics: [
    {
      module: "Overview of Fixed-Income Portfolio Management",
      rules: [
        "Fixed income return decomposition: coupon income + roll-down return + price impact of yield changes + currency return − financing cost (repo) — the roll-down return is the price gain from moving down the yield curve as time passes",
        "Liability-driven mandates prioritize matching liabilities over maximizing return — the success metric is funded status or surplus change, not benchmark relative return",
        "Leverage amplifies both income and losses — repo financing, futures, and TRS all introduce leverage; the exam tests whether leverage is recognized and whether its risks (margin calls, counterparty) are appropriately managed"
      ],
      traps: [
        "Treating rolling down the yield curve as riskless — roll-down return assumes the yield curve remains unchanged; if the curve shifts up or flattens, the roll-down gain may be offset or reversed",
        "Confusing gross return with funded ratio improvement — in LDI, the relevant measure is surplus change (asset return − liability return); a high gross return during rising rates may coincide with a larger liability increase if duration is unhedged"
      ],
      mnemonic: "CARP: Coupon + rolldown + rate change price impact + positioning = total return; subtract funding cost for leveraged portfolios"
    },
    {
      module: "Liability-Driven & Index Strategies",
      rules: [
        "Immunization requires THREE conditions simultaneously: PV(assets) = PV(liability), D(assets) = D(liability), AND convexity(assets) ≥ convexity(liability) — meeting only two out of three leaves the portfolio exposed",
        "Cash flow matching is more conservative than duration matching — it eliminates reinvestment risk by exactly matching each liability cash flow with an asset cash flow; duration matching still depends on reinvestment at the assumed yield",
        "For index replication: full replication minimizes tracking error for large liquid indexes but becomes impractical for broad credit indexes; stratified sampling and optimization trade small tracking error for lower transaction costs"
      ],
      traps: [
        "Assuming duration matching works for any yield curve shift — classical immunization assumes parallel yield curve shifts; non-parallel shifts (twist, butterfly) can cause asset duration and liability duration to diverge even when initially matched",
        "Treating stratified sampling as inferior to optimization — optimization minimizes tracking error directly using factor models; stratified sampling is simpler, more transparent, and less sensitive to model error in the factor covariance matrix"
      ],
      mnemonic: "3Cs of Immunization: Cash PV equal, Clock (duration) equal, Convexity (assets ≥ liabilities) — fail any one and you're not immunized"
    },
    {
      module: "Yield Curve Strategies",
      rules: [
        "Bullet concentrates maturity near the liability date — it outperforms barbell when the yield curve shifts upward in parallel (less convexity drag); barbell outperforms when the curve flattens (wings appreciate more than the bullet)",
        "Carry trade return = coupon − repo rate + roll-down return — ride the curve only when the positively sloped yield curve is expected to be stable; a rising short-rate environment kills carry trade profitability",
        "Duration-neutral curve trades: to express a steepening view — short the belly (intermediate), long the wings (short + long duration); to express a flattening view — long the belly, short the wings"
      ],
      traps: [
        "Treating a barbell as always higher convexity than a bullet with the same duration — this is true by construction, but higher convexity has a cost (lower yield); the barbell's advantage only materializes if yield curve volatility is sufficiently high to offset the yield give-up",
        "Confusing riding the yield curve with a duration extension trade — riding the curve assumes the yield curve remains unchanged and captures roll-down return as the bond ages into a lower-yield portion of the curve; duration extension bets on falling rates"
      ],
      mnemonic: "CARL: Carry + Roll-down = curve riding premium; Bullet vs. Barbell = convexity tradeoff; parallel shift favors bullet; Level change favors carry"
    },
    {
      module: "Credit Strategies",
      rules: [
        "Spread duration (not modified duration) drives price sensitivity to credit spread changes — a floating-rate HY bond has low modified duration but positive spread duration equal to time to next coupon reset",
        "CDS can be used to add or reduce credit risk synthetically — buying protection (short credit risk) is equivalent to shorting a bond; selling protection (long credit risk) is equivalent to owning the bond without funding cost",
        "Credit cycle positioning: early cycle — add HY/EM credit; mid-cycle — hold IG and selective HY; late cycle and contraction — reduce credit risk, shift to government bonds or buy CDS protection"
      ],
      traps: [
        "Assuming high yield diversifies equity risk in all environments — HY correlation with equities spikes to 0.7–0.9 during risk-off periods; at L3, the exam tests whether you recognize HY credit is cyclical equity-like risk in stress",
        "Using modified duration to estimate HY bond price sensitivity to credit spread changes — modified duration measures sensitivity to yield changes (rate risk); spread duration measures sensitivity to credit spread changes; for floaters, the two are very different"
      ],
      mnemonic: "SCCD: Spread duration drives credit price sensitivity; CDS for synthetic credit; Cycle-aware rotation; Don't confuse HY diversification with equity hedge"
    }
  ]},
  "Equity": { topics: [
    {
      module: "Overview of Equity Portfolio Management",
      rules: [
        "Active share = 0.5 × Σ|w_portfolio_i − w_benchmark_i| — measures portfolio differentiation from the benchmark; must be combined with tracking error to distinguish concentrated active bets from diversified active management",
        "Factor exposures (value, growth, quality, momentum, low volatility) are the primary drivers of equity return variation — the exam tests whether you can identify unintended factor tilts and recommend corrective trades",
        "Benchmark selection drives everything downstream — a mismatched benchmark creates misleading performance attribution, incorrect tracking error targets, and inappropriate risk comparisons"
      ],
      traps: [
        "Confusing high active share with high skill — active share measures how different the portfolio is from the benchmark, not whether the differences are profitable; a closet indexer has low active share but is not necessarily inferior to a high active share manager",
        "Treating smart beta (factor) strategies as either fully active or fully passive — factor-based strategies have systematic rule-based processes (passive-like) but deviate from cap-weighted benchmarks (active-like); fees and capacity differ from both"
      ],
      mnemonic: "BFAST: Benchmark drives tracking error; Factor exposures explain return; Active Share ≠ skill; Style consistency is monitored; Turnover has costs"
    },
    {
      module: "Passive Equity Investing",
      rules: [
        "Full replication (buy all index constituents) eliminates sampling error but increases transaction costs for large, illiquid indexes — practical only for large-cap domestic indexes with < 500 constituents",
        "ETF creation/redemption mechanism keeps ETF price close to NAV — authorized participants arbitrage away premiums/discounts; this mechanism also creates tax efficiency via in-kind redemptions that avoid embedded capital gains",
        "Stratified sampling groups index constituents by key characteristics (sector, size, style, geography) and buys representative securities from each cell — tracking error rises as sample coverage falls"
      ],
      traps: [
        "Assuming ETFs always trade at NAV — in stress markets or for illiquid underlying assets (e.g., HY bond ETFs), premiums or discounts can persist because the arbitrage mechanism breaks down when APs cannot hedge the underlying",
        "Treating index fund total expense ratios as the only cost of passive investing — hidden costs include index reconstitution impact, dividend reinvestment timing, securities lending income offset, and bid-ask spreads on ETF trades"
      ],
      mnemonic: "FEAST: Full replication for liquid large-cap; ETF arbitrage via APs; Authorized participants keep NAV tight; Stratified sampling for broad indexes; Transaction costs rise with full replication in illiquid markets"
    },
    {
      module: "Active Equity: Strategies",
      rules: [
        "Fundamental active strategies rely on analyst research to identify mispricings relative to intrinsic value — success depends on information advantage, analytical skill, and behavioral discipline; turnover is typically lower",
        "Quantitative strategies rely on factor models and systematic signals — alpha decay is the key risk; as factors become widely known (momentum, value), spreads compress and returns diminish",
        "Activist investing uses ownership stakes (typically >5%) to influence corporate governance, capital structure, or strategy — the investment thesis combines fundamental value with a catalyst to close the gap to intrinsic value"
      ],
      traps: [
        "Assuming long/short equity is market neutral — most L/S equity hedge funds maintain a net long bias (40–60% net) and have significant equity beta; true market-neutral strategies target net beta of zero",
        "Treating quant strategies as black boxes immune to crowding risk — quant strategies can crowd into similar factor positions; when deleveraging occurs (quant quake), correlation among quant strategies rises sharply and losses cluster"
      ],
      mnemonic: "FQAL: Fundamental = research edge; Quantitative = factor model + decay risk; Activist = catalyst needed; Long/Short ≠ market neutral unless net beta = 0"
    },
    {
      module: "Active Equity: Portfolio Construction",
      rules: [
        "Position sizing should reflect conviction weighted by liquidity — larger positions in high-conviction, liquid ideas; smaller positions in low-conviction or illiquid ideas; never size by equal weighting alone",
        "Factor neutralization removes unintended systematic exposures — if an active manager has a value tilt in stock picks, neutralizing the value factor ensures active returns reflect pure stock selection, not factor exposure",
        "Turnover is a direct tax on returns — each round-trip trade costs the bid-ask spread plus market impact; the portfolio construction optimizer should penalize turnover and require a minimum alpha improvement threshold before trading"
      ],
      traps: [
        "Confusing information ratio with Sharpe ratio in evaluating active managers — IR uses active return (vs benchmark) and tracking error; Sharpe uses total return and total risk; they answer different questions and cannot be interchanged",
        "Assuming optimized portfolios are always better than judgmental constructions — optimizers amplify input errors; if return estimates are noisy, the optimizer produces extreme, unstable weights; robust optimization or Black-Litterman inputs improve stability"
      ],
      mnemonic: "PRINT: Position sizing by conviction; Rebalance only when alpha ≥ cost; Intended factor exposures only; Neutralize unintended factors; Turnover has a cost"
    }
  ]},
  "Alternative Investments": { topics: [
    {
      module: "Portfolio Role of Alternatives",
      rules: [
        "Liquidity risk premium is the extra return demanded for illiquid investments — it is distinct from credit or equity risk premia; the investor must be confident they will not need to liquidate during the lock-up period",
        "Reported alternative returns are subject to survivorship bias (failed funds excluded) and backfill bias (only winning track records reported retroactively) — true risk-adjusted returns are systematically overstated in databases",
        "Due diligence for alternatives requires both investment due diligence (process, team, track record) and operational due diligence (prime broker, custodian, valuation policies, NAV calculation, investor redemption terms)"
      ],
      traps: [
        "Assuming Sharpe ratio correctly ranks hedge funds — autocorrelated returns from stale pricing understate measured volatility and inflate Sharpe; Sortino ratio or Calmar ratio may be more appropriate for non-normal return distributions",
        "Treating diversification benefits of alternatives as unconditional — correlations of private equity, hedge funds, and real assets with equities rise significantly during market stress; the diversification benefit shrinks exactly when it is most needed"
      ],
      mnemonic: "LADS: Liquidity premium compensates for lockup; Autocorrelation inflates Sharpe; Due diligence = investment + operational; Survivorship bias inflates reported returns"
    },
    {
      module: "Hedge Fund Strategies",
      rules: [
        "Equity long/short has net long equity beta — returns driven by stock selection and net market exposure; market-neutral variants target zero beta and earn pure alpha from long/short spread",
        "Event-driven strategies (merger arb, distressed, special situations) have hidden tail risk — the spread is collected when the event succeeds; when deals break, the loss is much larger than the expected gain (negative skew)",
        "Relative value strategies (convertible arb, fixed income arb) are typically leverage-dependent — they exploit small mispricings that require 5–20× leverage to generate acceptable returns; leverage creates liquidity crisis vulnerability"
      ],
      traps: [
        "Assuming macro hedge funds are low-risk because they trade liquid instruments — macro funds can take highly concentrated directional positions with significant leverage; liquidity of instruments does not equal low portfolio risk",
        "Treating multi-strategy funds as inherently diversified — internal capital allocation across strategies creates correlation during redemption stress; all strategies may deleverage simultaneously, concentrating losses"
      ],
      mnemonic: "EVRL: Event-driven = negative skew from deal breaks; Value/relative = leverage-dependent small spreads; Relative value + leverage = liquidity crisis risk; Long/short equity = net long bias"
    },
    {
      module: "Allocating to Alternatives",
      rules: [
        "J-curve effect: private equity funds show negative returns in early years (fees + capital calls with no distributions) and positive returns in later years (realizations) — NAV in year 1-3 understates ultimate performance",
        "Committed capital ≠ invested capital — only deployed capital earns a return; committed capital sits in a liquid portfolio earning cash-equivalent returns until called; target allocation is based on expected invested capital, not commitments",
        "Vintage year diversification reduces pacing risk — committing to private equity every year across multiple vintages smooths the J-curve and reduces dependence on a single market environment at the time of investment"
      ],
      traps: [
        "Using MVO directly for private equity allocation — illiquid, smoothed valuations and non-normal returns make MVO inputs unreliable; scenario analysis, pacing models, and stress tests supplement or replace MVO for alternatives",
        "Counting committed but uncalled private equity as part of the portfolio in weight calculations — until capital is deployed, it is not invested; including commitments inflates the alternatives allocation and understates the liquid portfolio weight"
      ],
      mnemonic: "J-CAP: J-curve means early losses; Committed ≠ Allocated; Allocate over time for vintage diversity; Pacing model smooths capital call risk"
    }
  ]},
  "Derivatives": { topics: [
    {
      module: "Options Strategies",
      rules: [
        "Covered call = long stock + short call: income enhancement strategy that caps upside at the strike price; downside protection = only the premium received; appropriate for modest or flat market outlook on a held stock position",
        "Protective put = long stock + long put: insurance strategy that floors downside at the strike price; cost = put premium; appropriate for near-term downside concern while maintaining long-term equity upside",
        "Collar = long stock + long put + short call: limits both upside and downside; near-zero net cost when call premium ≈ put premium; used to protect concentrated positions while deferring immediate capital gains realization"
      ],
      traps: [
        "Confusing which Greek matters for portfolio managers — delta matters for directional exposure (hedge ratio); gamma matters for dynamic rebalancing cost (higher gamma = more frequent and costly rebalancing of delta hedge); theta is daily time decay cost on long option positions",
        "Assuming a zero-cost collar has no cost — a zero-net-premium collar sacrifices the upside above the call strike; the economic cost is the foregone appreciation if the asset rises above the call strike; it is not costless in an economic sense"
      ],
      mnemonic: "CPC Delta: Covered call Caps upside; Protective put Creates floor; Collar Caps both; Delta tells you how much the option moves with the stock"
    },
    {
      module: "Swaps/Forwards/Futures Strategies",
      rules: [
        "Equity futures for beta adjustment: N_f = [(β_T − β_P) / β_f] × (MV_P / (P_f × multiplier)) — positive N_f means buy futures (increase beta); negative means sell futures (reduce beta); no underlying transaction required",
        "Fixed income futures for duration adjustment: N_f = [(MDT − MDP) / MDf] × (MV_P / (P_f × multiplier)) — buy futures to increase duration; sell to reduce duration; the futures price uses the cheapest-to-deliver bond's duration",
        "Total return swap allows synthetic exposure — pay fixed or floating, receive total return of reference asset; can gain equity exposure without buying the underlying (synthetic long) or hedge equity without selling (synthetic short)"
      ],
      traps: [
        "Forgetting to account for the futures beta (β_f) in equity futures calculations — if the futures contract has β_f = 1.0, the formula simplifies; but if futures track the index and portfolio tracks a different index, β_f adjustment matters",
        "Confusing currency forward P&L direction — a domestic investor with foreign assets who sells foreign currency forward locks in the exchange rate; if the foreign currency appreciates, the hedge produces a loss on the forward that offsets the currency gain on the assets"
      ],
      mnemonic: "BEDS: Beta adjustment uses Equity futures; Duration adjustment uses bond futures; Exposure gained synthetically via TRS; Sell currency forward to hedge foreign asset exposure"
    }
  ]},
  "Risk Management": { topics: [
    {
      module: "Risk Management for Individuals",
      rules: [
        "Human capital = PV of future expected labor income — it behaves like a bond for stable-salary workers (government, academia) and like equity for entrepreneurs, commission salespeople, or workers in cyclical industries",
        "Risk capacity (ability to bear risk) is determined objectively by time horizon, income stability, asset base, and liability structure; risk tolerance (willingness to bear risk) is subjective and may differ materially from capacity — the more conservative of the two should constrain the allocation",
        "Life insurance need = PV(future income) − PV(personal consumption) = net human capital at risk — term life covers the working years; the need declines as financial capital accumulates to replace human capital"
      ],
      traps: [
        "Treating risk tolerance questionnaire scores as equivalent to risk capacity — questionnaires measure stated preferences; past portfolio behavior, balance sheet analysis, and income stability determine actual capacity; high stated tolerance ≠ high capacity",
        "Ignoring the correlation between human capital and the investment portfolio — a technology employee with stock options and a concentrated equity portfolio in the tech sector has hidden concentration in the same risk factor; the financial portfolio should underweight tech to offset human capital exposure"
      ],
      mnemonic: "HCRL: Human Capital type (bond vs equity) determines portfolio tilt; Capacity > Tolerance ⟹ use Capacity; Risk declines as Lifecycle progresses; Life insurance = net HC to replace"
    },
    {
      module: "Derivatives-Based Risk Management",
      rules: [
        "Delta hedging neutralizes directional (delta) risk but leaves gamma (curvature) and vega (volatility sensitivity) exposures — as the underlying moves, delta changes and the hedge must be dynamically rebalanced; the cost of rebalancing is proportional to realized gamma",
        "Tail risk hedging via long puts or put spreads: buying far OTM puts is cheap but provides protection only in extreme scenarios; a put spread (long lower-strike put, short even lower-strike put) reduces cost but caps protection; the tradeoff is cost versus coverage",
        "Variance swaps pay the difference between realized variance and strike variance — long variance swap profits if realized volatility exceeds the strike; they are pure volatility instruments unaffected by the direction of asset price moves"
      ],
      traps: [
        "Assuming delta-neutral means risk-neutral — a delta-neutral portfolio still has gamma (convexity) risk, vega (implied vol) risk, and theta (time decay) exposure; delta neutrality only hedges small instantaneous moves",
        "Confusing CVaR with the maximum possible loss — CVaR (expected shortfall) is the expected loss conditional on exceeding VaR, not the worst possible outcome; maximum possible loss in an unlevered equity portfolio is 100% of value, which far exceeds CVaR at typical confidence levels"
      ],
      mnemonic: "DGVT: Delta hedging only; Gamma rebalancing has cost; Vega exposed to vol changes; Tail risk via puts or variance swaps"
    }
  ]},
  "Trading & Performance": { topics: [
    {
      module: "Trade Strategy & Execution",
      rules: [
        "Implementation shortfall = (paper portfolio return − actual portfolio return) = delay cost + market impact cost + opportunity cost of unexecuted trades — it is the total cost of the decision-to-trade to execution-complete process",
        "Algorithmic strategies: VWAP/TWAP minimize market impact for large orders by spreading execution over time; participation algorithms peg to a fraction of market volume; dark pools reduce market impact at the cost of uncertain fill and information leakage risk",
        "Order urgency drives execution choice: high urgency (corporate event, mandate change) favors market orders and aggressive algorithms despite higher cost; low urgency favors limit orders, dark pools, and patient algorithms to minimize market impact"
      ],
      traps: [
        "Treating pre-trade analysis benchmarks (VWAP, arrival price) as interchangeable — VWAP measures execution vs the day's average price (better for low-urgency trades); arrival price (implementation shortfall) measures vs price at decision time (better for high-urgency trades where delay is costly)",
        "Assuming zero market impact for small-cap stocks with limit orders — limit orders have execution risk (may not fill); in illiquid markets, even limit orders can move the market if the order is a large fraction of daily volume"
      ],
      mnemonic: "DUST: Decision-to-execution = implementation shortfall; Urgency determines algo choice; Spread + market impact = explicit + implicit costs; TWAP/VWAP spread over time"
    },
    {
      module: "Portfolio Performance Evaluation",
      rules: [
        "TWRR is the correct measure for evaluating portfolio manager skill — it removes the effect of client-driven cash flows; MWRR measures the client's actual return experience and is appropriate for evaluating wealth outcomes, not manager skill",
        "Treynor ratio is appropriate for comparing managers who represent only one component of a diversified portfolio — it uses systematic risk (beta) because unsystematic risk is irrelevant when diversified; Sharpe ratio uses total risk and is appropriate for evaluating a standalone fund",
        "BHB attribution: Allocation effect = (active weight) × (benchmark sector return − total benchmark return); Selection effect = (benchmark weight) × (active sector return − benchmark sector return); Interaction = (active weight) × (active security selection)"
      ],
      traps: [
        "Using information ratio to compare managers across different benchmark types — IR is only comparable when benchmarks are similarly volatile; a manager with a low-volatility benchmark can have a high IR with modest active returns",
        "Ignoring the interaction effect in BHB attribution — the interaction term captures whether the manager's sector overweights align with sectors where stock selection was also positive; incorrectly assigning it to selection or allocation distorts the analysis"
      ],
      mnemonic: "STAMP: Sharpe for standalone; Treynor for part of portfolio; Alpha (Jensen) for CAPM excess return; M² for risk-adjusted comparison vs market; Performance attribution via BHB"
    },
    {
      module: "Investment Manager Selection",
      rules: [
        "Style analysis: returns-based style analysis regresses returns against style factor indexes to infer exposures without examining holdings; holdings-based analysis directly examines portfolio weights but requires full transparency — use both to detect style drift",
        "Operational due diligence covers: custody arrangements, NAV calculation (third-party administrator vs in-house), valuation policies for illiquid assets, compliance infrastructure, key-person risk, and business continuity plans",
        "Performance track record evaluation: require at least 5 years of audited returns; adjust for survivorship bias in peer group comparisons; use t-test of alpha to distinguish skill from luck (typically need IR > 0.5 and ≥ 4 years for statistical significance)"
      ],
      traps: [
        "Treating past outperformance as definitive evidence of skill — a manager with 3 years of positive alpha has only a ~50–60% probability of true skill at standard confidence levels; short track records are statistically unreliable",
        "Selecting a manager purely on performance without operational due diligence — fraud, valuation errors, and operational failures (Madoff, Amaranth) destroy far more value than performance underperformance; operational risk assessment is non-negotiable"
      ],
      mnemonic: "SHOP: Style consistency via returns-based + holdings-based; History (≥5 years audited); Operational DD covers custody, valuation, compliance; Performance IR needs 4+ years to be significant"
    }
  ]},
  "Private Wealth Management": { topics: [
    {
      module: "Overview of Private Wealth",
      rules: [
        "Total wealth = human capital (PV future earnings) + financial capital (investment portfolio) + other assets (real estate, business interests) — asset allocation must consider the nature of human capital (bond-like vs equity-like) to determine the right financial portfolio tilt",
        "Life-cycle model: human capital dominates early in life (allocate financial capital aggressively to equities); financial capital dominates later (shift to income-generating, lower-volatility assets); the crossover point depends on savings rate and career path",
        "The IPS for private wealth clients must address after-tax return objectives — always state return goals in after-tax, after-inflation terms; institutional IPS often uses pre-tax returns, making direct comparison inappropriate"
      ],
      traps: [
        "Treating all private clients as risk-averse because they are individuals — high-net-worth individuals with long time horizons, stable income, and significant financial capital may have higher risk capacity than many institutional investors",
        "Ignoring correlation between business value and investment portfolio for entrepreneurs — a business owner whose wealth is concentrated in a privately-held firm in one sector has enormous human and financial capital concentration; the investment portfolio must provide maximum diversification away from that sector"
      ],
      mnemonic: "HALT: Human capital type drives portfolio; After-tax return target; Life-cycle shifts from equity-heavy to income-heavy; Total wealth includes HC + FC + real assets"
    },
    {
      module: "Topics in Private Wealth",
      rules: [
        "Tax-loss harvesting benefits: realize capital losses to offset gains; maintain economic exposure by buying a correlated (not substantially identical) security to avoid wash-sale rules; net benefit = tax savings − transaction costs − tracking error from substitute security",
        "Concentrated position risk management options: (1) immediate diversification (triggers capital gains tax), (2) hedging via collar or forward (defers tax but has basis risk and costs), (3) exchange funds (diversify tax-deferred, 7-year lockup, accredited investor required), (4) charitable donation (avoids gains tax, generates deduction)",
        "Asset location optimization: high-yield bonds and REITs (high ordinary income) → tax-deferred accounts; equities with qualified dividends and long-term appreciation → taxable accounts; actively managed funds with high turnover → tax-deferred accounts"
      ],
      traps: [
        "Assuming exchange funds are always tax-free — exchange funds defer tax on the contributed securities but do not eliminate it; the investor receives a diversified portfolio with carryover basis equal to the contributed securities' cost basis",
        "Using pre-tax return to compare asset location alternatives — the decision to place assets in taxable vs tax-deferred accounts must be evaluated on an after-tax, after-inflation equivalent return basis; pre-tax comparisons lead to incorrect location decisions"
      ],
      mnemonic: "THATCH: Tax-loss harvesting with wash-sale awareness; Hedge concentrated position (collar/forward); Asset location high-income assets in tax-deferred; Taxes drive after-tax return comparison; Charitable giving avoids gain and generates deduction; Hard to undo exchange fund lockup"
    },
    {
      module: "Estate Planning",
      rules: [
        "Irrevocable trusts remove assets from the taxable estate — revocable trusts retain control and avoid probate but the assets remain in the grantor's estate for estate tax purposes; the key distinction is control vs tax efficiency",
        "GRATs work by transferring appreciation above the Section 7520 rate to beneficiaries gift-tax-free — if assets grow faster than the hurdle rate, the excess passes without transfer tax; if the grantor dies during the term, the GRAT fails and assets revert to the estate",
        "Generation-skipping transfer (GST) tax applies when wealth is transferred to grandchildren or more remote descendants — the GST exemption (same as estate tax exemption) can be allocated to trust transfers to pass wealth across multiple generations efficiently"
      ],
      traps: [
        "Confusing the estate tax exemption with the gift tax annual exclusion — the annual exclusion ($18,000 per recipient in 2024) is separate from the lifetime exemption; gifts within the annual exclusion require no reporting and do not reduce the lifetime exemption",
        "Assuming cross-border estate planning only involves the residence country — situs rules assign estate tax jurisdiction based on location of assets (real property and tangible assets in the jurisdiction where they are located), not just the decedent's domicile; foreign real estate is taxed where it sits"
      ],
      mnemonic: "GRITS: GRAT transfers appreciation above 7520 rate; Revocable trusts = no estate tax benefit; Irrevocable trusts = out of estate; Transfer timing matters; Situs rules for cross-border assets"
    },
    {
      module: "Concentrated Single-Asset Positions",
      rules: [
        "Collar (long put + short call) on a concentrated stock: defers capital gains tax while limiting downside to the put floor and upside to the call ceiling; net cost depends on relative premiums; at-the-money collar is most protective but sacrifices all upside above the call strike",
        "Prepaid variable forward (PVF): monetize a concentrated position today by receiving cash from a counterparty and delivering shares at a future date based on a formula — effectively a forward sale; defers tax until delivery but eliminates downside risk and most upside",
        "Tax lot selection: HIFO (highest cost first) minimizes capital gains when selling; FIFO produces gains based on oldest lots (often lowest cost, highest gain); specific identification is the most flexible and tax-optimal approach"
      ],
      traps: [
        "Treating a collar as eliminating all risk — a collar eliminates downside below the put floor and upside above the call ceiling, but retains exposure between the strikes; the stock can still go to zero if the put is not in-the-money at expiry",
        "Ignoring the 5-year holding and 7-year lockup requirements for exchange funds — exchange funds require contributed securities to be eligible (illiquid assets, not just public stocks), a 5-year holding period, and accredited investor status; they cannot be used for immediate tax-free diversification"
      ],
      mnemonic: "PETS: Prepaid variable forward = monetize and defer tax; Exchange fund = diversify in-kind (7-year lockup); Tax lot = HIFO minimizes gains; Specific identification is most flexible"
    }
  ]},
  "Institutional Investors": { topics: [
    {
      module: "Institutional Investor Types & IPS",
      rules: [
        "DB pension: return objective is to fund the liability (meet actuarial rate of return), not maximize return; risk tolerance depends on funded status (surplus buffer), time horizon to benefit payments, and sponsor financial strength",
        "Endowments/foundations: typically have perpetual time horizons and broad risk tolerance, but foundations have a mandatory 5% annual distribution requirement under IRS rules; endowment spending rules vary but typically target 4–5% to preserve real capital",
        "Insurance companies: investment portfolio must match the duration and credit quality of insurance liabilities (policy reserves); regulation constrains holdings to investment-grade bonds; the key risk is asset-liability mismatch, not benchmark tracking error"
      ],
      traps: [
        "Assuming a fully-funded pension plan should take maximum equity risk — a well-funded plan should de-risk to lock in the surplus; only an underfunded plan with a risk-tolerant sponsor should take significant equity risk to close the funding gap",
        "Treating foundation and endowment investment policies as identical — foundations have mandatory 5% payout, an often shorter time horizon (grant cycle dependencies), and tax reporting requirements that endowments (typically nonprofit university entities) do not face in the same form"
      ],
      mnemonic: "DEFIS: DB uses actuarial return target; Endowments → perpetual horizon; Foundations → 5% mandatory payout; Insurance → ALM-driven IG bonds; SWFs → mandate-specific (stabilization vs savings)"
    },
    {
      module: "Asset Allocation for Institutions",
      rules: [
        "ALM for DB pensions: separate assets into return-seeking portfolio (equities, alternatives) and liability-hedging portfolio (long-duration bonds, interest rate swaps) — as funded ratio improves, shift weight from return-seeking to liability-hedging",
        "Surplus optimization for pensions: minimize variance of surplus (not asset variance) — use surplus efficient frontier where the liability is modeled as a short bond position; the optimal portfolio may hold more long-duration bonds than a pure asset-only optimizer would recommend",
        "Endowment spending rule smoothing: hybrid rule = α × (prior year spending × (1+inflation)) + (1−α) × (spending rate × current MV) — smoothing reduces spending volatility at the cost of slightly less market-value sensitivity"
      ],
      traps: [
        "Using the expected return on assets to discount pension liabilities — pension liabilities must be discounted at high-quality corporate bond yields (AA-rated); using the expected asset return understates the PV of liabilities and overstates the funded status",
        "Assuming pension liability duration equals the average benefit payment horizon — liability duration depends on the timing and magnitude of all benefit payments discounted at the current rate; it must be calculated explicitly, not approximated by average payment date"
      ],
      mnemonic: "SURFS: Surplus optimization = liability is a short bond; Use AA bond yield to discount liabilities; Return-seeking + liability-hedging split; Funded ratio drives de-risking; Spending rule smoothing for endowments"
    }
  ]}
};

