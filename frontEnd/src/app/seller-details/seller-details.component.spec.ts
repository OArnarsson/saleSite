import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerDetailsComponent } from './seller-details.component';
import { ReplaceSpecialPipe} from '../replace-special.pipe';
// Constructor dependencies
import { SellerService } from '../apiServices/seller.service';
import { ProductComponent } from '../product/product.component';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { ProductService } from "../apiServices/product.service";
import { ReplaceSpecialPipe } from '../replace-special.pipe';

let mockRouter = {
  params: () => {return 1}
};

const mockService = {
  successGetProducts: true,
  seller: {
    id: 1,
    name: 'Hannyrðaþjónusta Hannesar',
    category: 'Fatnaður',
    imagePath: 'http://i.imgur.com/OYVpe2W.jpg?fb'
  },
  getSingleSeller: function (sellerId) {
    return {
      subscribe: function (success, err) {
        if (mockService.successGetProducts === true) {
          success(mockService.seller);
        }
        else {
          err();
        }
      }
    }
  },
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

describe('SellerDetailsComponent', () => {
  let component: SellerDetailsComponent;
  let fixture: ComponentFixture<SellerDetailsComponent>;
  let pipe: ReplaceSpecialPipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SellerDetailsComponent,
        ProductComponent,
        ReplaceSpecialPipe
      ],
      imports: [
        ToastyModule,
        NgbModule.forRoot()
      ],
      providers: [
        {provide: ActivatedRoute,
          useValue: {
            params: Observable.of({id: 1})
          }
        },
        {provide: SellerService, useValue: mockService},
        {provide: ProductService, useValue: mockService}
      ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pipe = new ReplaceSpecialPipe();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should replace special characters', () => {
    let string = pipe.transform('Fatnaður');
    expect(string).toEqual('Fatnadur');
  });

});
