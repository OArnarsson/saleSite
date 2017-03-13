import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerComponent } from './seller.component';

// This is used for the routerLinks
import { RouterTestingModule } from'@angular/router/testing';

// Constructor dependencies
import { ToastyModule } from 'ng2-toasty';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../apiServices/seller.service';


const mockService = {
  successGetSellers: true,
  sellers: [
    {id: 1, name: 'Hannyrðaþjónusta Hannesar', category: 'Fatnaður', imagePath: 'http://i.imgur.com/OYVpe2W.jpg?fb'},
    {id: 2, name: 'Smíðaverkstæði Sigríðar', category: 'Skartgripir', imagePath: 'http://i.imgur.com/OYVpe2W.jpg?fb'},
    {id: 3, name: 'Sælgætisgerð Sjonna og Súsí', category: 'Matvörur', imagePath: 'http://i.imgur.com/OYVpe2W.jpg?fb'}
  ],
  getSellers: function () {
    return {
      subscribe: function (success, err) {
        if (mockService.successGetSellers === true) {
          success(mockService.sellers);
        }
        else {
          err();
        }
      }
    }
  }
}

describe('SellerComponent', () => {
  let component: SellerComponent;
  let fixture: ComponentFixture<SellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToastyModule,
        NgbModule.forRoot()
      ],
      providers: [
        {provide: SellerService, useValue: mockService}
      ],
      declarations: [SellerComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
