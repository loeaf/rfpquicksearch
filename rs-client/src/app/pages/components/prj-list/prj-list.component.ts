import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {PrjManagerService} from '../../../services/prj-manager.service';
import {RfpManagerService} from '../../../services/rfp-manager.service';

@Component({
  selector: 'app-prj-list',
  templateUrl: './prj-list.component.html',
  styleUrls: ['./prj-list.component.css']
})
export class PrjListComponent implements OnInit, OnDestroy {

  constructor(private prjManagerService: PrjManagerService, private rfpManagerService: RfpManagerService) { }
  displayedColumns: string[];
  @Input()
  public set DisplayedColums(value) {
    if (value === 'normal') {
      this.displayedColumns = ['id', 'prjName', 'prjYear'];
    } else if (value === 'check') {
      this.displayedColumns = ['select', 'id', 'prjName', 'prjYear'];
    } else {
      alert('need a compoent param "normal" or "check"');
      return;
    }
  }
  dataSource = new MatTableDataSource<PRJListModel>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  selection = new SelectionModel<PRJListModel>(false, []);
  @Output() prjListCompoRenderEmit: EventEmitter<any> = new EventEmitter();
  private preSelection;

  ngOnInit(): void {
    this.initPagination();
    this.subScribeRenderGrid();
    this.initAll();
  }
  ngOnDestroy(): void {
    this.prjListCompoRenderEmit.unsubscribe();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  private isAllSelected() {
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

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PRJListModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  subScribeRenderGrid() {
    this.prjListCompoRenderEmit.subscribe((res) => this.addDataSource(res));
  }
  private initAll() {
    this.prjManagerService.getAllProject().subscribe((res) => this.setDataSource(res));
  }
  setDataSource(res) {
    this.dataSource.data = res;
    this.initPagination();
  }
  initPagination() {
    this.dataSource.paginator = this.paginator;
  }
  addDataSource(res) {
    this.dataSource.data.push(res);
    this.initPagination();
  }
  selectItem(nowRow: any) {
    this.selection.toggle(nowRow);
    if (this.preSelection !== undefined) {
      if (nowRow.id === this.preSelection.id) {
        this.preSelection = undefined;
        this.rfpManagerService.rfpListCompoRenderEmitByPrjNum.emit(null);
        return;
      } else {
        this.preSelection = nowRow;
        this.rfpManagerService.rfpListCompoRenderEmitByPrjNum.emit(nowRow.id);
        return;
      }
    }
    this.preSelection = nowRow;
    this.rfpManagerService.rfpListCompoRenderEmitByPrjNum.emit(nowRow.id);
  }
}

export interface PRJListModel {
  id: number;
  prjName: string;
  prjYear: number;
}
