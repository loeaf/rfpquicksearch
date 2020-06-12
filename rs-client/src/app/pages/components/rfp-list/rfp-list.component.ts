import {Component, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {RfpManagerService} from '../../../services/rfp-manager.service';
import {SelectionModel} from '@angular/cdk/collections';
import {RfpMorphDicService} from '../../../services/rfp-morph-dic.service';
import {ProgressService} from '../../../services/progress.service';
import {MatDialog} from '@angular/material/dialog';
import {RfpInfoModalComponent} from '../rfp-info-modal/rfp-info-modal.component';

@Component({
  selector: 'app-rfp-list',
  templateUrl: './rfp-list.component.html',
  styleUrls: ['./rfp-list.component.css']
})
export class RfpListComponent implements OnInit, OnDestroy {

  constructor(private rfpManagerService: RfpManagerService, private rfpDicManageService: RfpMorphDicService,
              private progressServ: ProgressService, public dialog: MatDialog) { }
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<RFPListModel>();
  private rfpListTypeObj;
  private preSelection;
  rfpListCompoRenderEmit;
  rfpListCompoRenderEmitByPrjNum;
  rfpListCompoRenderEmitByFullText;
  @Input()
  set rfpListType(value) {
    this.rfpListTypeObj = value;
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  selection = new SelectionModel<RFPListModel>(false, []);

  ngOnInit() {
    this.subScribRfpList();
    if (this.rfpListTypeObj === 'useSubPrjNum') {
      this.getRefAllList();
      this.subScribRfpListByPrjNum();
      this.displayedColumns = ['id', 'prjId', 'type', 'fullNum', 'reqName', 'reqDefi', 'detInfo', 'btn'];
    } else if (this.rfpListTypeObj === 'useSubFullTextSch') {
      this.getRefAllList();
      this.subScribRfpListByFullText();
      this.displayedColumns = ['id', 'prjId', 'type', 'fullNum', 'reqName', 'reqDefi', 'detInfo', 'btn'];
    } else if (this.rfpListTypeObj === 'useSubDic') {
      this.subScribRfpListByPrjNum();
      this.displayedColumns = ['select', 'id', 'prjId', 'detInfo'];
    }
  }
  ngOnDestroy(): void {
    this.rfpListCompoRenderEmit.unsubscribe();
    if (this.rfpListTypeObj === 'useSubPrjNum' && this.rfpListTypeObj !== undefined) {
      this.rfpListCompoRenderEmitByPrjNum.unsubscribe();
    } else if (this.rfpListTypeObj === 'useSubFullTextSch' && this.rfpListTypeObj !== undefined) {
      this.rfpListCompoRenderEmitByFullText.unsubscribe();
    } else if (this.rfpListTypeObj === 'useSubDic' &&  this.rfpListTypeObj !== undefined) {
      this.rfpListCompoRenderEmitByPrjNum.unsubscribe();
    }
  }

  getRefAllList() {
    this.rfpManagerService.getAllRFPList().subscribe(res => this.setDataSource(res));
  }
  setDataSource(res) {
   this.dataSource.data = res;
   this.dataSource.paginator = this.paginator;
  }
  addDataSource(res) {
    this.dataSource.data.push(res);
    this.dataSource.paginator = this.paginator;
  }
  subScribRfpList() {
    this.rfpListCompoRenderEmit = this.rfpManagerService.rfpListCompoRenderEmit.subscribe(res => this.addDataSource(res));
  }
  subScribRfpListByFullText() {
    this.rfpListCompoRenderEmitByFullText = this.rfpManagerService.rfpListCompoRenderEmitByFullText
      .subscribe(res => this.setDataSource(res));
  }
  subScribRfpListByPrjNum() {
    this. rfpListCompoRenderEmitByPrjNum = this.rfpManagerService.rfpListCompoRenderEmitByPrjNum.subscribe(res => {
      if (res === null) {
        this.setDataSource([]);
      } else {
        this.rfpManagerService.getAllRFPListByPrjNum(res).subscribe((rfpList) => this.setDataSource(rfpList));
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: RFPListModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  selectItem(nowRow: any) {
    this.selection.toggle(nowRow);
    this.progressServ.ProgressEmmit.emit(true);
    if (this.preSelection !== undefined) { // 다른것 클릭
      if (nowRow.id === this.preSelection.id) { // 같은것 클릭
        this.preSelection = undefined;
        this.rfpDicManageService.rfpDicListCompoRenderEmit.emit(null);
        return;
      } else { // 다른것 클릭
        this.preSelection = nowRow;
        this.rfpDicManageService.getRfpMorphDic(nowRow.detInfo).subscribe(res => {
          this.rfpDicManageService.rfpDicListCompoRenderEmit.emit(res);
        },
        err => {
          this.progressServ.ProgressEmmit.emit(false);
          alert(err);
        });
        return;
      }
    }
    this.preSelection = nowRow;
    this.rfpDicManageService.getRfpMorphDic(nowRow.detInfo).subscribe(res => {
      this.rfpDicManageService.rfpDicListCompoRenderEmit.emit(res);
    },
    err => {
      this.progressServ.ProgressEmmit.emit(false);
      alert(err);
    });
  }

  selectModify(data: RFPListModel) {
    const dialogRef = this.dialog.open(RfpInfoModalComponent, {
      width: '800px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dataSource.data = result;
    });
  }

  selectDelete(id: any) {

  }
}

export interface RFPListModel {
  id?: number;
  prjId: number;
  type: string;
  fullNum: string;
  reqName: string;
  reqDefi: string;
  detInfo: string;
}
