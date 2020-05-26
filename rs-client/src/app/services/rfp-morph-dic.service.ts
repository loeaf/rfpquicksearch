import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RFPListModel} from '../pages/components/rfp-list/rfp-list.component';
import {RFPMorphemDicModel} from '../pages/components/rfp-morphem-dic-list/rfp-morphem-dic-list.component';

@Injectable({
  providedIn: 'root'
})
export class RfpMorphDicService {

  constructor(private httpClient: HttpClient) { }
  @Output() rfpDicListCompoRenderEmit: EventEmitter<RFPMorphemDicModel> = new EventEmitter();
  createUser(user) {
    return this.httpClient.post(  `http://localhost:3000/users`, user);
  }
  getRfpMorphDic(sentence) {
    debugger;
    return this.httpClient.get<RFPMorphemDicModel>(`http://localhost:8080/api/doc/morphList/${sentence}`);
  }
  updateUser(user) {
    // return this.httpClient.put(`http://localhost:3000/users/`+user.id,user);
  }
  deleteUser(user) {
    // return this.httpClient.delete("http://localhost:3000/users/"+user.id);
  }
}
