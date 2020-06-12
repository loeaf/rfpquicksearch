import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {RFPListModel} from '../pages/components/rfp-list/rfp-list.component';
import {NounsDicModel, RFPMorphemDicModel} from '../pages/components/rfp-morphem-dic-list/rfp-morphem-dic-list.component';
import { catchError } from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';
import {ProgressService} from './progress.service';
import {DefaultRFPMorphDicVM} from '../pages/components/morp-search-list/morp-search-list.component';

@Injectable({
  providedIn: 'root'
})
export class RfpMorphDicService {
  constructor(private httpClient: HttpClient, private progressServ: ProgressService) { }
  @Output() rfpDicListCompoRenderEmit: EventEmitter<RFPMorphemDicModel> = new EventEmitter();
  @Output() rfpDicMorpSeach2AddEmit: EventEmitter<RFPMorphemDicModel> = new EventEmitter();
  @Output() rfpDicMorpClick2AddEmit: EventEmitter<NounsDicModel> = new EventEmitter();
  private MorphChipItem2ListSJ = new Subject<any>();
  private MorpSchList2WrtieSJ = new Subject<any>();
  createUser(user) {
    return this.httpClient.post(  `http://localhost:3000/users`, user);
  }
  getRfpMorphDic(sentence) {
    // url 호출할때 /가 경로로 인식되어 처리되는 문제를 기존에 방지
    sentence = sentence.replace(/[/|,|\[|\]|.|(|)|｢|｣]/g, ',');
    console.log(sentence);
    return this.httpClient
      .get<RFPMorphemDicModel>(`http://localhost:8080/api/doc/morph/${sentence}`)
      .pipe(catchError(this.erroHandler));
  }
  getRfpMorphDicByCombinNouns(sentence) {
    return this.httpClient
      .get<Array<NounsDicModel>>(`http://localhost:8080/api/doc/combinNouns/${sentence}`);
  }
  putRfpMorphDic(nouns: NounsDicModel) {
    const headerJson = {
      'Content-Type': 'application/json;charset=utf-8'
    };
    const nounsParam = JSON.stringify({
      nounsType: 1,
      combinNounsName: `C;$(${nouns.combinNounsName})`
    });
    const headers = new HttpHeaders(headerJson);
    return this.httpClient.put<any>(`http://localhost:8080/api/doc/morph/${nouns.nounsFullName}`, nounsParam, {headers});
  }
  delRfpMorphDic(nouns: NounsDicModel) {
    return this.httpClient.delete(`http://localhost:8080/api/doc/morph/${nouns.nounsFullName}`);
  }
  getNounsWord(nounsWord: string) {
    return this.httpClient
      .get<NounsDicModel>(`http://localhost:8080/api/doc/nouns/${nounsWord}`);
  }
  postNouns(nouns: NounsDicModel) {
    nouns.combinNounsName = `C;$(${nouns.combinNounsName})`;
    return this.httpClient
      .post<NounsDicModel>(`http://localhost:8080/api/doc/nouns`, nouns);
  }
  sendMorphChipItem2List(chipItem: string) {
   this.MorphChipItem2ListSJ.next(chipItem);
  }
  clearMorphChipItem2List(chipItem: string) {
   this.MorphChipItem2ListSJ.next();
  }
  getMorphChipItem2List() {
   return this.MorphChipItem2ListSJ.asObservable();
  }
  sendMorpSchList2WrtieSJ(rfpMphDic: DefaultRFPMorphDicVM) {
    this.MorphChipItem2ListSJ.next(rfpMphDic);
  }
  clearMorpSchList2WrtieSJ(rfpMphDic: DefaultRFPMorphDicVM) {
    this.MorphChipItem2ListSJ.next();
  }
  getMorpSchList2WrtieSJ() {
    return this.MorphChipItem2ListSJ.asObservable();
  }

  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
}
