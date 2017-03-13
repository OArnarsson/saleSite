import { TestBed, inject } from '@angular/core/testing';
import { SellerService } from './seller.service';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from "@angular/http/testing";

const mockHttpProvider = {
  deps: [ MockBackend, BaseRequestOptions ],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
    return new Http(backend, defaultOptions);
  }
};

describe('SellerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SellerService,
        {provide: Http, useValue: mockHttpProvider},
        MockBackend,
        BaseRequestOptions]
    });
  });

  it('should ...', inject([SellerService], (service: SellerService) => {
    expect(service).toBeTruthy();
  }));
});
