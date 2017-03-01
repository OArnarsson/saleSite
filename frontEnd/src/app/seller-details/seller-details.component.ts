import { Component, OnInit } from '@angular/core';
import { Product} from '../classes/product';
import { ProductService } from '../apiServices/product.service';
import { SellerService } from '../apiServices/seller.service';
import { Seller } from '../classes/seller';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.scss']
})
export class SellerDetailsComponent implements OnInit {
  private sellerId: number;
  public page = 1;
  public seller: Seller;
  public products: Product[];

  constructor(private productService: ProductService, private sellerService: SellerService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.products = [];
    this.seller = new Seller(0,'','','');
    this.router.params.subscribe((params) => {
      this.sellerId = +params['id'];
      console.log('got the param: ' + this.sellerId);
    });
    this.getInitData();
  }

  getInitData() {
    this.sellerService.getSingleSeller(this.sellerId).subscribe(
        (seller) => {
          this.seller = seller;
          console.log(JSON.stringify(this.seller));
        }
    );

    this.productService.getProductsById(this.sellerId).subscribe(
        (products) => {
          this.products = products;
          console.log(JSON.stringify(this.products));
        }
    )
  }

}
