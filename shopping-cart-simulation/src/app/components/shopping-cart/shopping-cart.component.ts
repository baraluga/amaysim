import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { AvailableProducts } from 'src/app/constants';
import { CartItem, ProductCode } from 'src/app/models';
import { map, startWith, filter, skip } from 'rxjs/operators';

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
  @Input() promoEffect: string;
  @Output() applyPromo = new EventEmitter<string>();
  @Output() clearPromo = new EventEmitter();
  @Output() checkout = new EventEmitter();

  cartForm = this.formBuilder.group({
    selectedItems: [],
    promoCode: '',
  });
  promoCodeControl = this.cartForm.get('promoCode');
  hasPromoCode$ = this.promoCodeControl.valueChanges.pipe(
    startWith(undefined),
    map(v => !!v),
  );
  promoApplied$ = new BehaviorSubject<boolean>(false);

  applyPromoDisabled$ = combineLatest([this.hasPromoCode$, this.promoApplied$]).pipe(
    map(([hasP, promA]) => !hasP || promA),
  );

  checkoutDisabled$ = this.cartItems$.pipe(map(items => !!!items.length));

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.promoApplied$.pipe(skip(1)).subscribe(applied => {
      {
        if (applied) {
          this.promoCodeControl.disable();
          this.applyPromo.emit(this.promoCodeControl.value);
        } else {
          this.promoCodeControl.enable();
          this.promoCodeControl.reset();
          this.clearPromo.emit();
        }
      }
    });
  }

  translateProductCode = (code: ProductCode) => AvailableProducts[code].name;

  onPromoApply = () => this.promoApplied$.next(true);

  onPromoClear = () => this.promoApplied$.next(false);

  onCheckout = () => {
    alert('Pay with your life!');
    this.promoApplied$.next(false);
    this.checkout.next();
  };
}
