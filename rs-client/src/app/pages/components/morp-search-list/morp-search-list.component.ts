import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RfpMorphDicService} from '../../../services/rfp-morph-dic.service';
import {Subscription} from 'rxjs';
import {SnackBarService, SnackBarType} from '../../../services/snack-bar.service';

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
          this.snackBarServ.alertSanckBar(SnackBarType.NounsNotFound);
        } else {
          const resultArr = [];
          const result: DefaultRFPMorphDicVM = {
            id: p.nounsFullName,
            nounsFullName: p.nounsFullName,
            combinNounsName: p.combinNounsName,
            nounsType: p.nounsType
          };
          this.rfpMorphDicServ.sendMorpSchList2WrtieSJ(result);

          resultArr.push(result);
          this.dataSource = resultArr;
        }
      });
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
