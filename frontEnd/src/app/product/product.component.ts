import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../apiServices/product.service';
import { Product } from '../classes/product';
import { Tab } from '../classes/tab';
import { throttleTime } from "rxjs/operator/throttleTime";

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
    let def = new Tab('Products', []);
    let top10 = new Tab('Top 10', []);
    this.tabs = [];
    this.tabs.push(def);
    this.tabs.push(top10);
    this.productService.getProductsById(this.sellerId).subscribe(
        (products) => {
          this.tabs[0].products = products;
          console.log(JSON.stringify(this.tabs[0].products));
        }
    )
  }

}
