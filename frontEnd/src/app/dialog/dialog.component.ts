import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public seller: string;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }
  onOk() {
    this.modal.close(this.seller);
  }

  onCancel() {
    this.modal.dismiss();
  }

}
