import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {RFPListModel} from '../pages/components/rfp-list/rfp-list.component';
import {NounsDicModel, RFPMorphemDicModel} from '../pages/components/rfp-morphem-dic-list/rfp-morphem-dic-list.component';

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
    return this.httpClient.get<RFPMorphemDicModel>(`http://localhost:8080/api/doc/morph/${sentence}`);
  }
  putRfpMorphDic(nouns: NounsDicModel) {
    const headerJson = {
      'Content-Type': 'application/json;charset=utf-8'
    };
    const nounsParam = JSON.stringify({
      nounsType: 1,
      combinNounsName: nouns.combinNounsName
    });
    const headers = new HttpHeaders(headerJson);
    return this.httpClient.put(`http://localhost:8080/api/doc/morph/${nouns.nounsFullName}`, nounsParam, {headers});
  }
  delRfpMorphDic(nouns: NounsDicModel) {
    return this.httpClient.delete(`http://localhost:8080/api/doc/morph/${nouns.nounsFullName}`);
  }
}
