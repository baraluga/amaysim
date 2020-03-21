import { ProductCode, PricingRule, ShoppingCart, Product, CartItem } from '../models';

export const AvailableProducts: { [key: string]: Product } = {
  [ProductCode.ULT_SMALL]: { code: ProductCode.ULT_SMALL, name: 'Unlimited 1GB' },
  [ProductCode.ULT_MEDIUM]: { code: ProductCode.ULT_MEDIUM, name: 'Unlimited 2GB' },
  [ProductCode.ULT_LARGE]: { code: ProductCode.ULT_LARGE, name: 'Unlimited 5GB' },
  [ProductCode.LT_1GB]: { code: ProductCode.LT_1GB, name: '1GB Data-pack' },
};

export const DEFAULT_PRICING: PricingRule = {
  tarrif: {
    [ProductCode.ULT_SMALL]: 24.9,
    [ProductCode.ULT_MEDIUM]: 29.9,
    [ProductCode.ULT_LARGE]: 44.9,
    [ProductCode.LT_1GB]: 9.9,
  },
};

export const FRESH_CART: ShoppingCart = {
  items: [],
  promoCode: undefined,
  pricingRule: DEFAULT_PRICING,
};

export const PROMO_CODES = {
  'i<3amaysim': 0.9,
  chunky: 0.5,
  'covid-19': 0.1,
};
