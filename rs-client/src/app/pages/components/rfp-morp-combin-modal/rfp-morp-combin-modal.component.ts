import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from '../rfp-info-input/rfp-info-input.component';
import {RfpManagerService} from '../../../services/rfp-manager.service';

@Component({
  selector: 'app-rfp-morp-combin-modal',
  templateUrl: './rfp-morp-combin-modal.component.html',
  styleUrls: ['./rfp-morp-combin-modal.component.css']
})
export class RfpMorpCombinModalComponent implements OnInit {
  morpCombins = Array<MorpCombinModalData>();
  procSentens;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MorpCombinModalData,
    private rfpManagerservie: RfpManagerService) { }

  ngOnInit(): void {
    const sentensData = this.data.morpCombinData;
    const porcData = sentensData.split('\+').forEach(obj => this.morpCombins.push({
      morpCombinData: obj
    }));
  }
}

export interface MorpCombinModalData {
  morpCombinData: string;
}
