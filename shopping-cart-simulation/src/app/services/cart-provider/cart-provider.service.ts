import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShoppingCart, CartItem } from 'src/app/models';
import { FRESH_CART, DEFAULT_PRICING } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartFacade {
  currId = 0;
  activeCart$ = new BehaviorSubject<ShoppingCart>(FRESH_CART);

  constructor() {}

  addItem = (item: CartItem) => {
    const currCart = this.activeCart$.value;
    const withId = { ...item, id: this.generateItemId() } as CartItem;
    this.activeCart$.next({ ...currCart, items: [...currCart.items, withId] });
  };

  applyPromoCode = (promo: string) => {
    const currCart = this.activeCart$.value;
    this.activeCart$.next({ ...currCart, promoCode: promo });
  };

  requestCart = (rules = DEFAULT_PRICING) =>
    this.activeCart$.next({ ...FRESH_CART, pricingRule: rules });

  private generateItemId = () => this.currId++;
}
