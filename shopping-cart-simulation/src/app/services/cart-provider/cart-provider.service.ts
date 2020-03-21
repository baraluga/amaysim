import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ActivePromos,
  AvailableProducts,
  DEFAULT_PRICING,
  FRESH_CART,
  PROMO_CODES,
} from 'src/app/constants';
import { CartItem, PricingRule, ProductCode, ShoppingCart } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartFacade {
  currId = 0;
  private cart$ = new BehaviorSubject<ShoppingCart>(FRESH_CART);
  activeCart$ = this.cart$.pipe(
    map(cart => ({
      ...cart,
      items: ActivePromos.reduce((acc, curr) => curr(acc), cart.items),
    })),
  );
  totalValue$ = this.activeCart$.pipe(
    map(({ items, pricingRule }) =>
      items.reduce((acc, curr) => acc + pricingRule.tarrif[curr.product.code], 0),
    ),
  );
  finalPrice$ = this.activeCart$.pipe(
    map(({ items, pricingRule }) =>
      items.reduce((acc, curr) => acc + this.howMuch(curr, pricingRule), 0),
    ),
    // apply inputted promo code to final price
    map(price => {
      const code = this.cart$.value.promoCode;
      const multiplier = !!!code ? 1 : PROMO_CODES[code.toLowerCase()] || 1;
      return price * multiplier;
    }),
  );

  constructor() {}

  addItem = (product: ProductCode) => {
    const currCart = this.cart$.value;
    const newItem = {
      id: this.generateItemId(),
      product: AvailableProducts[product],
    } as CartItem;
    this.cart$.next({ ...currCart, items: [...currCart.items, newItem] });
  };

  applyPromoCode = (promo: string) => {
    const currCart = this.cart$.value;
    this.cart$.next({ ...currCart, promoCode: promo });
  };

  clearPromo = () => this.applyPromoCode(undefined);

  requestCart = (rules = DEFAULT_PRICING) =>
    this.cart$.next({ ...FRESH_CART, pricingRule: rules });

  private generateItemId = () => this.currId++;
  private howMuch = (
    { product: { code }, applicablePrice }: CartItem,
    { tarrif }: PricingRule,
  ) => (applicablePrice !== undefined ? applicablePrice : tarrif[code]);
}
