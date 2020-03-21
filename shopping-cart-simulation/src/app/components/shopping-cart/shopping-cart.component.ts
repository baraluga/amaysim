import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AvailableProducts } from 'src/app/constants';
import { CartItem, ProductCode } from 'src/app/models';
import { map, startWith } from 'rxjs/operators';

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

  @Input() totalValue = 0;
  savings = 0;
  @Input() set savingsValue(value: number) {
    this.savings = 0 - value;
  }
  get savingsValue() {
    return this.savings;
  }
  @Input() finalPrice = 0;
  @Output() applyPromo = new EventEmitter<string>();
  @Output() checkout = new EventEmitter();

  cartForm = this.formBuilder.group({
    selectedItems: [],
    promoCode: '',
  });
  promoCodeControl = this.cartForm.get('promoCode');

  applyPromoDisabled$ = this.promoCodeControl.valueChanges.pipe(
    startWith(undefined),
    map(v => !!!v),
  );
  checkoutDisabled$ = this.cartItems$.pipe(map(items => !!!items.length));

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  translateProductCode = (code: ProductCode) => AvailableProducts[code].name;

  onPromoApply = () => this.applyPromo.next(this.promoCodeControl.value);

  onCheckout = () => {
    alert('Pay with your life!');
    this.checkout.next();
  };
}
