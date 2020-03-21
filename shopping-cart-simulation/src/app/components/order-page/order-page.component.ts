import { Component, OnInit } from '@angular/core';
import { ProductCode } from 'src/app/models';
import { ShoppingCartFacade } from 'src/app/services/cart-provider/cart-provider.service';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
  runningList$ = this.cartFacade.activeCart$.pipe(map(({ items }) => items));
  totalValue$ = this.cartFacade.totalValue$;
  finalPrice$ = this.cartFacade.finalPrice$;
  savingsValue$ = combineLatest([this.totalValue$, this.finalPrice$]).pipe(
    map(([total, discounted]) => total - discounted),
  );

  constructor(private cartFacade: ShoppingCartFacade) {}

  ngOnInit() {}

  onAdd = (product: ProductCode) => this.cartFacade.addItem(product);

  onApplyPromo = (code: string) => this.cartFacade.applyPromoCode(code);

  onCheckout = () => this.cartFacade.requestCart();
}
