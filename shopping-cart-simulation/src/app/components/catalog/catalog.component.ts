import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { AvailableProducts } from 'src/app/constants';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  providers: [FormBuilder],
})
export class CatalogComponent implements OnInit {
  @Output() add = new EventEmitter();

  availableProducts = Object.keys(AvailableProducts).map(k => AvailableProducts[k]);
  productControl = new FormControl();
  disableAdd$ = this.productControl.valueChanges.pipe(
    startWith(undefined),
    map(value => !!!value),
  );

  constructor() {}

  ngOnInit() {}

  onAdd = () => {
    this.add.emit(this.productControl.value);
    this.productControl.reset();
  };
}
