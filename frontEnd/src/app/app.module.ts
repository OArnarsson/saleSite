import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { SellerComponent } from './seller/seller.component';
import { DialogComponent } from './dialog/dialog.component';
import { SellerService } from './apiServices/seller.service';
import { ToastyModule } from 'ng2-toasty';
import { ProductComponent } from './product/product.component';
import { AppRoutingModule } from './app.routing.module';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { ProductService } from './apiServices/product.service';
import { ReplaceSpecialPipe } from './replace-special.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SellerComponent,
    DialogComponent,
    ProductComponent,
    SellerDetailsComponent,
    ReplaceSpecialPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    NgbTabsetModule.forRoot(),
    ToastyModule.forRoot(),
    AppRoutingModule
  ],
  providers: [SellerService, ProductService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, ProductComponent]
})
export class AppModule {
}
