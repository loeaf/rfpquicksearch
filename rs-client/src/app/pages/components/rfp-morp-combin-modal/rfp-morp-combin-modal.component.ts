import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from '../rfp-info-input/rfp-info-input.component';
import {RfpManagerService} from '../../../services/rfp-manager.service';
import {RfpMorphDicService} from '../../../services/rfp-morph-dic.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-rfp-morp-combin-modal',
  templateUrl: './rfp-morp-combin-modal.component.html',
  styleUrls: ['./rfp-morp-combin-modal.component.css']
})
export class RfpMorpCombinModalComponent implements OnInit, OnDestroy {
  morpCombins = Array<MorpCombinModalData>();
  procSentens;
  rfpMphDicSeach2AddSub;
  selected = new FormControl(0);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MorpCombinModalData,
    private rfpManagerservie: RfpManagerService,
    private rfpMorphDicServ: RfpMorphDicService) { }

  ngOnInit(): void {
    debugger;
    const sentensData = this.data.morpCombinData;
    if (this.data.morpCombinData === null) {
      alert('결합데이터에 문제가있습니다. 관리자에게 문의해주세요!')
      return;
    }
    const porcData = sentensData.split('\+').forEach(obj => this.morpCombins.push({
      morpCombinData: obj
    }));
    this.rfpMphDicSeach2AddSub = this.rfpMorphDicServ.rfpDicMorpSeach2AddEmit.subscribe(p => {
      this.selected.setValue(1);
    });
  }

  ngOnDestroy(): void {
    this.rfpMphDicSeach2AddSub.unsubscribe();
  }
}

export interface MorpCombinModalData {
  morpCombinData: string;
}
