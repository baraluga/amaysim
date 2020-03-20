import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShoppingCart, CartItem, ProductCode } from 'src/app/models';
import { FRESH_CART, DEFAULT_PRICING, AvailableProducts } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartFacade {
  currId = 0;
  activeCart$ = new BehaviorSubject<ShoppingCart>(FRESH_CART);

  constructor() {}

  addItem = (product: ProductCode) => {
    const currCart = this.activeCart$.value;
    const { tarrif } = currCart.pricingRule;
    const newItem = {
      id: this.generateItemId(),
      applicablePrice: tarrif[product],
      product: AvailableProducts[product],
    } as CartItem;
    this.activeCart$.next({ ...currCart, items: [...currCart.items, newItem] });
  };

  applyPromoCode = (promo: string) => {
    const currCart = this.activeCart$.value;
    this.activeCart$.next({ ...currCart, promoCode: promo });
  };

  requestCart = (rules = DEFAULT_PRICING) =>
    this.activeCart$.next({ ...FRESH_CART, pricingRule: rules });

  private generateItemId = () => this.currId++;
}
