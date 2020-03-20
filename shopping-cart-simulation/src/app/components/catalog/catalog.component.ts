import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { AvailableProducts } from 'src/app/constants';
import { ProductCode } from 'src/app/models';
import { map, startWith } from 'rxjs/operators';

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
