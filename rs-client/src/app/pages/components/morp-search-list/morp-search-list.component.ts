import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RfpMorphDicService} from '../../../services/rfp-morph-dic.service';
import {Subscription} from 'rxjs';
import {SnackBarService, SnackBarType} from '../../../services/snack-bar.service';
import {RFPMorphemDicModel} from '../rfp-morphem-dic-list/rfp-morphem-dic-list.component';

@Component({
  selector: 'app-morp-search-list',
  templateUrl: './morp-search-list.component.html',
  styleUrls: ['./morp-search-list.component.css']
})
export class MorpSearchListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['nounsFullName', 'nounsType', 'combinNounsName'];
  dataSource: Array<DefaultRFPMorphDicVM> = [];
  @Input()
  searchItem: string;
  subMorphChipItem: Subscription;

  constructor(private rfpMorphDicServ: RfpMorphDicService, private snackBarServ: SnackBarService) { }

  ngOnInit(): void {
    this.subMorphChipItemInit();
  }
  subMorphChipItemInit() {
    this.subMorphChipItem = this.rfpMorphDicServ.getMorphChipItem2List().subscribe((item) => {
      this.rfpMorphDicServ.getNounsWord(item).subscribe(p => {
        if (p === null) {
          const resultArr = [];
          this.dataSource = resultArr;
          this.rfpMorphDicServ.rfpDicMorpClick2AddEmit.emit(item);
          this.snackBarServ.alertSanckBar(SnackBarType.NounsNotFound).onAction().subscribe(snackResult => {
            this.rfpMorphDicServ.rfpDicMorpSeach2AddEmit.emit(item);
          });
          this.emitClikc2Input(item, 'NNG', '');

        } else {
          const resultArr = [];
          const result: DefaultRFPMorphDicVM = {
            id: p.nounsFullName,
            nounsFullName: p.nounsFullName,
            combinNounsName: p.combinNounsName,
            nounsType: p.nounsType
          };
          this.emitClikc2Input(p.nounsFullName, p.nounsType, p.combinNounsName);

          resultArr.push(result);
          this.dataSource = resultArr;
        }
      });
    });
  }

  private emitClikc2Input(nounsFullName, nounsType, combinNounsName) {
    this.rfpMorphDicServ.rfpDicMorpClick2AddEmit.emit({
      nounsFullName,
      nounsType,
      combinNounsName,
    });
  }

  ngOnDestroy(): void {
    this.subMorphChipItem.unsubscribe();
  }
}

export interface DefaultRFPMorphDicVM {
  id?: string;
  nounsFullName?: string;
  nounsType: string;
  combinNounsName: string;
}
