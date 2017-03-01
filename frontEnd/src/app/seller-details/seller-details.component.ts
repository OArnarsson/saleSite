import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../dialog/dialog.component';
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


  constructor(private modalService: NgbModal, private productService: ProductService, private sellerService: SellerService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.products = [];
    this.seller = new Seller(0, '', '', '');
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

  newProduct() {
    this.popModal('Create a new product', 'Create', new Product(this.sellerId, 9, '', 0, 0, 0, ''), 'POST');
  }

  popModal(title: string, okBut: string, product: Product, rest: string) {
    const newProduct = product;
    const modal = this.modalService.open(DialogComponent);
    modal.componentInstance.title = title;
    modal.componentInstance.onOkButton = okBut;
    modal.componentInstance.product = newProduct;
    modal.result.then(obj => {
      //this.addProductToDb(obj, rest);
      console.log('modal closed successfully');
    }).catch(err => {
      console.log(err);
    })
  }
}
