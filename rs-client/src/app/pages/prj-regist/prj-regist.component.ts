import {Component, OnInit, ViewChild} from '@angular/core';
import {PrjInfoInputComponent} from '../components/prj-info-input/prj-info-input.component';
import {PrjManagerService} from '../../services/prj-manager.service';
import {PrjListComponent} from '../components/prj-list/prj-list.component';

@Component({
  selector: 'app-prj-regist',
  templateUrl: './prj-regist.component.html',
  styleUrls: ['./prj-regist.component.css']
})
export class PrjRegistComponent implements OnInit {
  @ViewChild(PrjInfoInputComponent)
  private prjInfoInputCompo: PrjInfoInputComponent;
  @ViewChild(PrjListComponent)
  private prjListCompo: PrjListComponent;

  constructor(private prjService: PrjManagerService) { }

  ngOnInit(): void {
  }

  onClick() {
    const prjName = this.prjInfoInputCompo.prjInfoModel.prjName;
    const prjYear = this.prjInfoInputCompo.prjInfoModel.prjYear;
    if (prjName === '' || prjYear === 0) {
      alert('프로젝트 이름 또는 년도를 설정했는지 확인해주세요!');
      return;
    }
    this.prjService.createProject(this.prjInfoInputCompo.prjInfoModel).subscribe((res) => {
      this.prjListCompo.prjListCompoRenderEmit.emit(res);
    });
  }
}
