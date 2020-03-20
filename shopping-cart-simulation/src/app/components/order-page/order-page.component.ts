import { Component, OnInit } from '@angular/core';
import { ProductCode } from 'src/app/models';
import { ShoppingCartFacade } from 'src/app/services/cart-provider/cart-provider.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
  runningList$ = this.cartFacade.activeCart$.pipe(map(({ items }) => items));

  constructor(private cartFacade: ShoppingCartFacade) {}

  ngOnInit() {}

  onAdd = (product: ProductCode) => this.cartFacade.addItem(product);
}
