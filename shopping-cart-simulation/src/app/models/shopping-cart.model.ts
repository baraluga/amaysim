export enum ProductCode {
  ULT_SMALL = 'ult_small',
  ULT_MEDIUM = 'ult_medium',
  ULT_LARGE = 'ult_large',
  LT_1GB = '1gb',
}

export interface Product {
  code: string;
  name: string;
}

export interface PricingRule {
  tarrif: { [productCode: string]: number };
  activePromos?: ((items: CartItem[]) => CartItem[])[];
}

export interface CartItem {
  id: number;
  product: Product;
  applicablePrice: number;
}

export interface ShoppingCart {
  pricingRule: PricingRule;
  items: CartItem[];
  promoCode: string;
}
