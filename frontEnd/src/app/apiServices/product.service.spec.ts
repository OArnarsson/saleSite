import { TestBed, inject } from '@angular/core/testing';
import { ProductService } from './product.service';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from "@angular/http/testing";

const mockHttpProvider = {
  deps: [ MockBackend, BaseRequestOptions ],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
    return new Http(backend, defaultOptions);
  }
};

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        {provide: Http, useValue: mockHttpProvider},
        MockBackend,
        BaseRequestOptions]
    });
  });

  it('should ...', inject([ProductService, Http], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});
