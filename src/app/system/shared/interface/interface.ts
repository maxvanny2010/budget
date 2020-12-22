export interface Bill {
  value: number;
  currency: string;
}

export interface Category {
  name: string;
  capacity: number;
  id?: string;
}

export interface WFMEvent {
  type: string;
  amount: number;
  category: number;
  date: string;
  description: string;
  id?: number;
  catName?: string;
}

export interface Currency {
  base: string;
  date: string;
  rates: any;
  symbol: string;
  value: number;
}
