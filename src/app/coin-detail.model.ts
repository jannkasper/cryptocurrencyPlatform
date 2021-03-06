export interface CoinDetailModel {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  roi?: any;
  last_updated: string;
}

export interface CoinChartModel {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

export interface CoinName {
  id: string;
  symbol: string;
  name: string;
}


