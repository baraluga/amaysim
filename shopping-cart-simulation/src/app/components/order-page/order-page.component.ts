import { Component, OnInit } from '@angular/core';
import { ProductCode } from 'src/app/models';
import { ShoppingCartFacade } from 'src/app/services/cart-provider/cart-provider.service';
import { map, tap, pluck, filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { PROMO_CODES } from 'src/app/constants';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
  runningList$ = this.cartFacade.activeCart$.pipe(map(({ items }) => items));
  promoEffect$ = this.cartFacade.activeCart$.pipe(
    pluck('promoCode'),
    map(promoCode => (!!promoCode ? PROMO_CODES[promoCode.toLowerCase()] : undefined)),
    map(multiplier => (!!multiplier ? `${(1 - multiplier) * 100}% discount` : undefined)),
  );
  totalValue$ = this.cartFacade.totalValue$;
  finalPrice$ = this.cartFacade.finalPrice$;
  savingsValue$ = combineLatest([this.totalValue$, this.finalPrice$]).pipe(
    map(([total, discounted]) => total - discounted),
  );

  constructor(private cartFacade: ShoppingCartFacade) {}

  ngOnInit() {}

  onAdd = (product: ProductCode) => this.cartFacade.addItem(product);

  onApplyPromo = (code: string) => this.cartFacade.applyPromoCode(code);

  onClearPromo = () => this.cartFacade.clearPromo();

  onCheckout = () => this.cartFacade.requestCart();
}
