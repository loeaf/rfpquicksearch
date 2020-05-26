import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RfpMorphemeModalComponent} from '../rfp-morpheme-modal/rfp-morpheme-modal.component';

export interface DialogData {
  sentens: string;
}

@Component({
  selector: 'app-rfp-info-input',
  templateUrl: './rfp-info-input.component.html',
  styleUrls: ['./rfp-info-input.component.css']
})
export class RfpInfoInputComponent implements OnInit, OnDestroy {
  constructor(public dialog: MatDialog) { }
  @Output() rfpInputClearEmmiter: EventEmitter<any> = new EventEmitter<any>();
  rfpInfoObj: RFPInfoModel = {
    type: '',
    fullNum: '',
    reqName: '',
    reqDefi: '',
    detInfo: ''
  };
  textAreaStr = '○ 국정원, 국토부, 공사 보안규정 및 지침을 준수하여 개발이 수행되어야 함 ○ 계약상대자가 원격지 개발을 희망할 경우 보안사고 등 위험요인을 식별하여 이에 대한 대응방안을 제안하고, 제안요청서에 명시한 보안요구사항 등을 준수하여 원격지 개발에 따른 구체적인 원격지 보안관리대책(참여 인원, 원격지 개발장소 및 장비, 원격지 개발 장소의 노트북·USB 등 휴대용 저장매체, 네트워크, 자료 등)을 제시하여야 함';
  ngModuleOption = {
    standalone: true
  }
  ngOnInit(): void {
    this.clearAllInputEmmit();
  }
  ngOnDestroy(): void {
    this.rfpInputClearEmmiter.unsubscribe();
  }
  clearAllInputEmmit(): void {
    this.rfpInputClearEmmiter.subscribe((res) => {
      debugger;
      this.rfpInfoObj = {
        type: '',
        fullNum: '',
        reqName: '',
        reqDefi: '',
        detInfo: ''
      };
    });
  }

  openDialog() {
    const dialogDat: DialogData = {
      sentens: this.rfpInfoObj.detInfo
    }
    const dialogRef = this.dialog.open(RfpMorphemeModalComponent, {
      data: dialogDat
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.rfpInfoObj.detInfo = result;
    });
  }
}

interface RFPInfoModel {
  type: string;
  fullNum: string;
  reqName: string;
  reqDefi: string;
  detInfo: string;
}
