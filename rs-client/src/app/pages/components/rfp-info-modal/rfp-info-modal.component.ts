import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../rfp-info-input/rfp-info-input.component';
import {RFPListModel} from '../rfp-list/rfp-list.component';
import {RfpMorphemeManager} from '../rfp-morpheme-modal/rfp-morpheme-modal.component';

@Component({
  selector: 'app-rfp-info-modal',
  templateUrl: './rfp-info-modal.component.html',
  styleUrls: ['./rfp-info-modal.component.css']
})
export class RfpInfoModalComponent implements OnInit {
  modalData;
  constructor(public dialogRef: MatDialogRef<RfpInfoModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RFPListModel) {
    debugger;
    this.modalData = {...data};
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    debugger;
    this.dialogRef.close();
  }

  detParse() {
    const sentence = this.modalData.detInfo;
    const morphResult = new RfpMorphemeManager().procDetString2Morpheme(sentence);
    this.modalData.detInfo = ``.concat(morphResult);
  }

  modifi(modalData: RFPListModel): void {
    this.dialogRef.close(modalData);
  }
}
