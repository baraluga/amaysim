import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CartItem, ProductCode } from 'src/app/models';
import { BehaviorSubject } from 'rxjs';
import { AvailableProducts } from 'src/app/constants';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems$ = new BehaviorSubject<CartItem[]>([]);
  @Input() set cartItems(items: CartItem[]) {
    this.cartItems$.next(items);
  }
  get cartItems() {
    return this.cartItems$.value;
  }

  selectedItemsControl = new FormControl();

  constructor() {}

  ngOnInit() {}

  translateProductCode = (code: ProductCode) => AvailableProducts[code].name;
}
