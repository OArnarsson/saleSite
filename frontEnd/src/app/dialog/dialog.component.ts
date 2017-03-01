import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Seller } from '../classes/seller';
import { Product } from '../classes/product';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  private sellerCategories = ['Fatnaður', 'Skartgripir', 'Matvörur', 'Keramik'];
  public seller: Seller;
  public product: Product;
  public title: string;
  public onOkButton: string;
  constructor(public modal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  onOk() {
    if (this.seller) {
      this.modal.close(this.seller);
    }
    else {
      this.modal.close(this.product)
    }
  }

  onCancel() {
    this.modal.dismiss();
  }

}
