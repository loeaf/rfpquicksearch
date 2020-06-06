import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {RfpMorphDicService} from '../../../services/rfp-morph-dic.service';
import {ProgressService} from '../../../services/progress.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {SnackBarService, SnackBarType} from '../../../services/snack-bar.service';
import {MatDialog} from '@angular/material/dialog';
import {MorpCombinModalData, RfpMorpCombinModalComponent} from '../rfp-morp-combin-modal/rfp-morp-combin-modal.component';

@Component({
  selector: 'app-rfp-morphem-dic-list',
  templateUrl: './rfp-morphem-dic-list.component.html',
  styleUrls: ['./rfp-morphem-dic-list.component.css']
})
export class RfpMorphemDicListComponent implements OnInit,  OnDestroy{
  dataSource = new MatTableDataSource<RFPMorphemDicViewModel>();
  displayedColumns = ['select', 'nounsFullName', 'nounsType', 'combinNounsName', 'exsist', 'btn'];
  private preSelection;
  private preSelectionByModifiy = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  selection = new SelectionModel<RFPMorphemDicViewModel>(false, []);
  rfpDicListCompoEmit;
  options: NounsTypesStr[] = [
    {name: 'NNG'},
    {name: 'NNP'}
  ];
  constructor(
    private rfpDicManageService: RfpMorphDicService, private progressServ: ProgressService,
    private snackBarService: SnackBarService, public dialog: MatDialog) { }

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
        const formControlObj = new FormControl();
        const filterOptionsObj = formControlObj.valueChanges
            .pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : value.name),
              map(name => name ? this._filter(name) : this.options.slice())
            );
        let nounsTypeObj = null;
        if (resObj.nd.nounsType === null) {
          nounsTypeObj = this.options[0].name;
        } else {
          nounsTypeObj = resObj.nd.nounsType;
        }
        const nounsMorphem: RFPMorphemDicViewModel = {
          id: resObj.nd.nounsFullName,
          nounsFullName: resObj.nd.nounsFullName,
          nounsType: nounsTypeObj,
          combinNounsName: resObj.nd.combinNounsName,
          combinNounsCheck: false,
          combinNounsClick: false,
          exsist: resObj.exsist,
          hover: false,
          modifiy: false,
          nounsTypeFC: formControlObj,
          filteredOptions: filterOptionsObj,
          nounsCombinFC: new FormControl()
        };
        resultArr.push(nounsMorphem);
      }
      this.dataSource.data = resultArr;
      this.dataSource.paginator = this.paginator;
    });
  }
  private _filter(name: string): NounsTypesStr[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(nounsTypeStr: NounsTypesStr): string {
    return nounsTypeStr && nounsTypeStr.name ? nounsTypeStr.name : '';
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

  selectModify(id: any) {
    const selctModi = this.dataSource.data.find(obj => obj.id === id);
    if (selctModi.modifiy === true) { // 수정중
      this.rfpDicManageService.putRfpMorphDic(selctModi).subscribe(obj => {
        selctModi.modifiy = false;
        selctModi.nounsType = obj.nd.nounsType;
        selctModi.exsist = 1;
        console.log(obj);
      });
    } else { // 수정중아님
      selctModi.modifiy = true;
    }
    const p = new MatTableDataSource<any>(this.dataSource.data)
    this.dataSource = p;
    this.dataSource.paginator = this.paginator;
  }

  selectDelete(id) {
    const selctModi = this.dataSource.data.find(obj => obj.id === id);
    this.rfpDicManageService.delRfpMorphDic(selctModi).subscribe(obj => {
      if ( obj === 1 ) {
        const index = this.findDataSourceByIndex(id);
        this.dataSource.data.splice(index, 1);
        const p = new MatTableDataSource<any>(this.dataSource.data)
        this.dataSource = p;
        this.dataSource.paginator = this.paginator;
      } else {
        alert('error');
      }
    });
  }
  private findDataSourceByIndex(id) {
    const index = this.dataSource.data.findIndex(findObj => findObj.id === id);
    return index;
  }

  checkMixMorph(combinNouns: RFPMorphemDicViewModel) {
    // checkMixMorph 전송
    const combineNounsArr = combinNouns.combinNounsName.split(`+`);
    this.rfpDicManageService.getRfpMorphDicByCombinNouns(combinNouns.combinNounsName)
      .subscribe(p => {
        if (combineNounsArr.length === p.length) {
         this.snackBarService.alertSanckBar(SnackBarType.RFPDicFinish);
        } else {
          const param: MorpCombinModalData = {
            morpCombinData: combinNouns.combinNounsName
          };
          this.snackBarService.alertSanckBar(SnackBarType.RFPDicFail)
            .onAction().subscribe(obj => {
            const morpCombinModal = this.dialog.open(RfpMorpCombinModalComponent, {
              data: param
            });
            morpCombinModal.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
            });
          });
        }
    });
  }

  selectCancle(id: any) {
    const selctModi = this.dataSource.data.find(obj => obj.id === id);
    if (selctModi.modifiy === true) { // 수정중
      selctModi.modifiy = false;
    } else { // 수정중아님
      selctModi.modifiy = true;
    }
    const p = new MatTableDataSource<any>(this.dataSource.data)
    this.dataSource = p;
    this.dataSource.paginator = this.paginator;
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
  id?: string;
  nounsFullName?: string;
  nounsType: string;
  nounsTypeFC: FormControl;
  filteredOptions: Observable<NounsTypesStr[]>;
  nounsCombinFC: FormControl;
  combinNounsName: string;
  combinNounsCheck: boolean;
  combinNounsClick: boolean;
  exsist: number;
  hover: boolean;
  modifiy: boolean;
}

export interface NounsTypesStr {
  name: string;
}
