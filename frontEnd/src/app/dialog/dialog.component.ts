import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Seller } from '../classes/seller'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  private sellerCategories = ['Fatnaður', 'Skartgripir', 'Matvörur', 'Keramik'];
  public seller: Seller;
  public title: string;
  public onOkButton: string;
  constructor(public modal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  onOk() {
    this.modal.close(this.seller);
  }

  onCancel() {
    this.modal.dismiss();
  }

}
