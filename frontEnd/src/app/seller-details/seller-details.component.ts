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
  public sellerId: number;
  public page = 1;
  public seller: Seller;

  constructor(private modalService: NgbModal, private productService: ProductService, private sellerService: SellerService, private router: ActivatedRoute) { }

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
          console.log(JSON.stringify(this.seller));
        }
    );
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
