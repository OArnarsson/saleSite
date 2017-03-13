import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';

// Constructor dependencies
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../apiServices/product.service';

const mockService = {
  successGetProducts: true,
  products: [
    {
      id: 13,
      name: 'Sokkar',
      price: 499,
      quantitySold: 991,
      quantityInStock: 23,
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/4/42/HandKnittedWhiteLaceSock.jpg'
    }, {
      id: 12,
      name: 'Teppi',
      price: 499,
      quantitySold: 819,
      quantityInStock: 98,
      imagePath: 'https://pixabay.com/static/uploads/photo/2015/11/07/14/40/fabric-1031932_960_720.jpg'
    }
  ],
  getProductsById: function (sellerId) {
    return {
      subscribe: function (success, err) {
        if (mockService.successGetProducts === true) {
          success(mockService.products);
        }
        else {
          err();
        }
      }
    }
  }
}

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [
        ToastyModule,
        NgbModule.forRoot()],
      providers: [
        {provide: ProductService, useValue: mockService}
      ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
