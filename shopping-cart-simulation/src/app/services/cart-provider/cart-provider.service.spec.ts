import { TestBed } from '@angular/core/testing';

import { ShoppingCartFacade } from './cart-provider.service';

describe('CartProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingCartFacade = TestBed.get(ShoppingCartFacade);
    expect(service).toBeTruthy();
  });
});
