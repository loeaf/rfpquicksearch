import {Component, OnInit, ViewChild} from '@angular/core';
import {RfpInfoInputComponent} from '../components/rfp-info-input/rfp-info-input.component';
import {PrjListComponent} from '../components/prj-list/prj-list.component';
import {RfpManagerService} from '../../services/rfp-manager.service';
import {RfpListComponent, RFPListModel} from '../components/rfp-list/rfp-list.component';

@Component({
  selector: 'app-rfp-regist',
  templateUrl: './rfp-regist.component.html',
  styleUrls: ['./rfp-regist.component.css']
})
export class RfpRegistComponent implements OnInit {
  @ViewChild(RfpInfoInputComponent)
  private rfpInfoCompo: RfpInfoInputComponent;
  @ViewChild(RfpListComponent)
  private rfpListCompo: RfpListComponent;
  @ViewChild(PrjListComponent)
  private prjListCopo: PrjListComponent;

  constructor(private rfpManagerService: RfpManagerService) { }

  ngOnInit(): void {
  }
  onClick() {
    console.log();
    console.log(this.rfpInfoCompo.rfpInfoObj);
    const obj = this.rfpInfoCompo.rfpInfoObj;

    if (this.prjListCopo.selection.selected.length === 0) {
      alert('어떤 프로젝트를 수행하는지 선택해주세요!');
      return;
    }
    if (obj.type === '' || obj.fullNum === '' || obj.reqName === '' || obj.detInfo === '') {
      alert('상세 정보 항목을 모두 입력해주세요!');
      return;
    }
    const select = this.prjListCopo.selection.selected[0];
    const rfpInfo: RFPListModel = {
      prjId: select.id,
      reqDefi: obj.reqDefi,
      detInfo: obj.detInfo,
      detOriginInfo: obj.detOriginInfo,
      fullNum: obj.fullNum,
      reqName: obj.reqName,
      type: obj.type,
    }
    this.rfpManagerService.createRFPInfo(rfpInfo).subscribe(res => {
      this.rfpManagerService.rfpListCompoRenderEmit.emit(res);
      this.rfpInfoCompo.rfpInputClearEmmiter.emit(1);
    });
  }

}
