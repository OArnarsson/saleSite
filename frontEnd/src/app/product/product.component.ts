import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../apiServices/product.service';
import { Product } from '../classes/product';
import { Tab } from '../classes/tab';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input () sellerId: any;
  public page = 1;
  public tabs: Tab[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    let x = new Tab('Products', []);
    this.tabs = [];
    this.tabs.push(x);
    this.productService.getProductsById(this.sellerId).subscribe(
        (products) => {
          this.tabs[0].products = products;
          console.log(JSON.stringify(this.tabs[0].products));
        }
    )
  }

}
