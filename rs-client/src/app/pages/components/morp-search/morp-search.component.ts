import {Component, Input, OnInit} from '@angular/core';
import {MorpCombinModalData} from '../rfp-morp-combin-modal/rfp-morp-combin-modal.component';
import {RfpMorphDicService} from '../../../services/rfp-morph-dic.service';

@Component({
  selector: 'app-morp-search',
  templateUrl: './morp-search.component.html',
  styleUrls: ['./morp-search.component.css']
})
export class MorpSearchComponent implements OnInit {
  @Input(`morpCombinsArr`)
  morpItems: Array<MorpCombinModalData> = [];
  clickItem;

  constructor(private rfpMorphDicServ: RfpMorphDicService) { }

  ngOnInit(): void {
    console.log(this.morpItems);
  }

  matChipClick(contentVal) {
    this.rfpMorphDicServ.sendMorphChipItem2List(contentVal);
  }
}
