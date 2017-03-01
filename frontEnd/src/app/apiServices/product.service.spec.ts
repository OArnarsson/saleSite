import { TestBed, inject } from '@angular/core/testing';
import { ProductService } from './product.service';
import { Http } from '@angular/http';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService, Http]
    });
  });

  it('should ...', inject([ProductService, Http], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});
