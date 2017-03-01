import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';
import { SellerComponent } from './seller/seller.component';
import { ProductComponent } from './product/product.component';
import { SellerDetailsComponent } from './seller-details/seller-details.component';

const appRoutes: Routes = [
    {path: '', component: SellerComponent},
    {path: 'seller/:id', component: SellerDetailsComponent},
    {path: 'product', component: ProductComponent},
    {path: '**', component: SellerComponent}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes),
    ],
    exports:[
        RouterModule
    ],
  declarations: []
})
export class AppRoutingModule { }