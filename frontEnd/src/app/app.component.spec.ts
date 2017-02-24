import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SellerComponent } from './seller/seller.component';
import { ProductComponent } from './product/product.component';
import { AppRoutingModule } from './app.routing.module';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SellerComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render the seller component by default', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-seller').textContent).toBeTruthy;
  }));
});
