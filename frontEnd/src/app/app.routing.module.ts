import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';
import { SellerComponent } from './seller/seller.component';
import { ProductComponent } from './product/product.component';

const appRoutes: Routes = [
    {path: '', component: SellerComponent},
    {path: 'seller/:name', component: SellerComponent},
    {path: 'product', component: ProductComponent},
    {path: 'product/:name', component: ProductComponent},
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