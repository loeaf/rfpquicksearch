import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RFPListModel} from '../pages/components/rfp-list/rfp-list.component';
import {nodeDebugInfo} from '@angular/compiler-cli/src/ngtsc/util/src/typescript';

@Injectable({
  providedIn: 'root'
})
export class RfpManagerService {

  constructor(private httpClient: HttpClient) { }
  @Output() rfpListCompoRenderEmit: EventEmitter<RFPListModel> = new EventEmitter();
  @Output() rfpListCompoRenderEmitByPrjNum: EventEmitter<any> = new EventEmitter();
  @Output() rfpListCompoRenderEmitByFullText: EventEmitter<any> = new EventEmitter();

  createRFPInfo(rfpInfo) {
    return this.httpClient.post<RFPListModel>('http://localhost:3000/rfp', rfpInfo);
  }
  patchRFPInfo(rfpInfo) {
    return this.httpClient.patch<RFPListModel>(`http://localhost:3000/rfp/${rfpInfo.id}`, rfpInfo);
  }
  getAllRFPList() {
    return this.httpClient.get('http://localhost:3000/rfp');
  }
  getAllRFPListByPrjNum(prjId) {
    return this.httpClient.get(`http://localhost:3000/rfp?prjId=${prjId}`);
  }
  getAllRFPListByFullText(fullText) {
    return this.httpClient.get(`http://localhost:3000/rfp?q=${fullText}`);
  }
  deleteUser(user) {
    return this.httpClient.delete("http://localhost:3000/users/"+user.id);
  }
  procReqDefiSentense(strReqDef) {
  }
}
