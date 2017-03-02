import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product';
import { ProductService } from '../apiServices/product.service';
import { SellerService } from '../apiServices/seller.service';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Seller } from '../classes/seller';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.scss']
})
export class SellerDetailsComponent implements OnInit {
  public sellerId: number;
  public page = 1;
  public seller: Seller;
  private errorHandler: any;
  private successHandler: any;

  constructor(private productService: ProductService, private sellerService: SellerService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.sellerId = +params['id'];
      this.getInitData(this.sellerId);
    });
  }

  getInitData(sellerId: number) {
    this.sellerService.getSingleSeller(sellerId).subscribe(
      (seller) => {
        this.seller = seller;
      }
    );
  }
}
