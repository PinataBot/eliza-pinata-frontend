export enum MessageActionType {
  ANALYZE_PORTFOLIO = "PORTFOLIO_ANALYSIS",
  PORTFOLIO_ANALYSIS = "PORTFOLIO_ANALYSIS",
  TRENDING_TOKENS = "TRENDING_TOKENS",
  ANALYZE_TRADE = "ANALYZE_TRADE",
  SWAP_TOKEN = "SWAP_TOKEN",
}

export const PortfolioAnalysis: PortfolioAnalysisType =
  MessageActionType.PORTFOLIO_ANALYSIS || MessageActionType.ANALYZE_PORTFOLIO;
export const TrendingTokens: TrendingTokensType = MessageActionType.TRENDING_TOKENS || MessageActionType.ANALYZE_TRADE;

export type PortfolioAnalysisType = MessageActionType.PORTFOLIO_ANALYSIS | MessageActionType.ANALYZE_PORTFOLIO;
export type TrendingTokensType = MessageActionType.TRENDING_TOKENS | MessageActionType.ANALYZE_TRADE;
