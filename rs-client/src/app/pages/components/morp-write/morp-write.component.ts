import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RfpMorphDicService} from '../../../services/rfp-morph-dic.service';
import {DefaultRFPMorphDicVM} from '../morp-search-list/morp-search-list.component';

@Component({
  selector: 'app-morp-write',
  templateUrl: './morp-write.component.html',
  styleUrls: ['./morp-write.component.css']
})
export class MorpWriteComponent implements OnInit, OnDestroy {
  nounsFullName;
  nounsType;
  combinNounsName;
  rfpMphDicSevSub;
  rfpMphDicSeach2AddSub;
  rfpMphDicClick2AddSub;

  constructor(private rfpMorphDicServ: RfpMorphDicService) { }

  ngOnInit(): void {
    this.rfpMphDicSevSub = this.rfpMorphDicServ.getMorpSchList2WrtieSJ().subscribe(p => {
      this.nounsType = p.nounsType;
      this.nounsFullName = p.nounsFullName;
      this.combinNounsName = p.combinNounsName;
    });
    this.rfpMphDicSeach2AddSub = this.rfpMorphDicServ.rfpDicMorpSeach2AddEmit.subscribe(p => {
      this.nounsFullName = p;
    });
    this.rfpMphDicClick2AddSub = this.rfpMorphDicServ.rfpDicMorpClick2AddEmit.subscribe(p => {
      this.nounsFullName = p.nounsFullName;
      this.nounsType = p.nounsType;
      this.combinNounsName = p.combinNounsName;
    });
  }
  ngOnDestroy(): void {
    this.rfpMphDicSevSub.unsubscribe();
    this.rfpMphDicSeach2AddSub.unsubscribe();
    this.rfpMphDicClick2AddSub.unsubscribe();
  }


  onSave() {
    const obj = {
      nounsType: this.nounsType,
      nounsFullName: this.nounsFullName,
      combinNounsName: this.combinNounsName,
    };
    this.rfpMorphDicServ.postNouns(obj).subscribe(p => {
      alert(p);
    });
  }
}
