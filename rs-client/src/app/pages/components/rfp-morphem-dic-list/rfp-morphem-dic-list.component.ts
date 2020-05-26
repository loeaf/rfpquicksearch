import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {RFPListModel} from '../rfp-list/rfp-list.component';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {RfpMorphDicService} from '../../../services/rfp-morph-dic.service';
import {ProgressService} from '../../../services/progress.service';

@Component({
  selector: 'app-rfp-morphem-dic-list',
  templateUrl: './rfp-morphem-dic-list.component.html',
  styleUrls: ['./rfp-morphem-dic-list.component.css']
})
export class RfpMorphemDicListComponent implements OnInit,  OnDestroy{
  dataSource = new MatTableDataSource<RFPMorphemDicViewModel>();
  displayedColumns = ['nounsFullName', 'nounsType', 'combinNounsName', 'exsist'];
  private preSelection;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  selection = new SelectionModel<RFPMorphemDicViewModel>(false, []);
  rfpDicListCompoEmit;
  constructor(private rfpDicManageService: RfpMorphDicService, private progressServ: ProgressService) { }

  ngOnDestroy(): void {
    this.rfpDicListCompoEmit.unsubscribe();
  }
  ngOnInit(): void {
    this.rfpDicListCompoEmit = this.rfpDicManageService.rfpDicListCompoRenderEmit.subscribe(res => {
      this.progressServ.ProgressEmmit.emit(false);
      if (res === null) {
        this.dataSource.data = [];
        this.dataSource.paginator = this.paginator;
        return;
      }
      const resultArr = [];
      for (const resObj of res) {
        const nounsMorphem: RFPMorphemDicViewModel = {
          nounsFullName: resObj.nd.nounsFullName,
          nounsType: resObj.nd.nounsType,
          combinNounsName: resObj.nd.combinNounsName,
          exsist: resObj.exsist
        };
        resultArr.push(nounsMorphem);
      }
      this.dataSource.data = resultArr;
      this.dataSource.paginator = this.paginator;
    });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: RFPMorphemDicViewModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  selectItem(nowRow: any) {
    this.selection.toggle(nowRow);
    if (this.preSelection !== undefined) {
      if (nowRow.id === this.preSelection.id) {
        this.preSelection = undefined;
        // this.rfpManagerService.rfpListCompoRenderEmitByPrjNum.emit(null);
        return;
      } else {
        this.preSelection = nowRow;
        // this.rfpManagerService.rfpListCompoRenderEmitByPrjNum.emit(nowRow.id);
        return;
      }
    }
    this.preSelection = nowRow;
    // this.rfpManagerService.rfpListCompoRenderEmitByPrjNum.emit(nowRow.id);
  }
}
export interface NounsDicModel {
  nounsFullName?: string;
  nounsType: string;
  combinNounsName: string;
}

export interface RFPMorphemDicModel {
  id?: number;
  nd: NounsDicModel;
  exsist: number;
}

export interface RFPMorphemDicViewModel {
  id?: number;
  nounsFullName?: string;
  nounsType: string;
  combinNounsName: string;
  exsist: number;
}