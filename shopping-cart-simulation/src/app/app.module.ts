import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatCardModule,
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatListModule,
  MatInputModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { OrderPageComponent, ShoppingCartComponent, CatalogModule } from './components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, OrderPageComponent, ShoppingCartComponent],
  imports: [
    BrowserModule,
    MatCardModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatListModule,
    MatInputModule,
    CatalogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
