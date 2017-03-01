import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { SellerComponent } from './seller/seller.component';
import { DialogComponent } from './dialog/dialog.component';
import { SellerService } from './apiServices/seller.service';
import { ToastyModule } from 'ng2-toasty';
import { ProductComponent } from './product/product.component';
import { AppRoutingModule } from "./app.routing.module";
import { SellerDetailsComponent } from './seller-details/seller-details.component';


@NgModule({
  declarations: [
    AppComponent,
    SellerComponent,
    DialogComponent,
    ProductComponent,
    SellerDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ToastyModule.forRoot(),
    AppRoutingModule
  ],
  providers: [SellerService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule {
}
