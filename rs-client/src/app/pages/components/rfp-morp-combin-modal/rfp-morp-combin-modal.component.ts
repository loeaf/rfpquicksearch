import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from '../rfp-info-input/rfp-info-input.component';
import {RfpManagerService} from '../../../services/rfp-manager.service';

@Component({
  selector: 'app-rfp-morp-combin-modal',
  templateUrl: './rfp-morp-combin-modal.component.html',
  styleUrls: ['./rfp-morp-combin-modal.component.css']
})
export class RfpMorpCombinModalComponent implements OnInit {
  sentens = [];
  procSentens;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private rfpManagerservie: RfpManagerService) { }

  ngOnInit(): void {
    const sentensData = this.data.sentens;
    const porcData = sentensData.split('\n')
      .map(obj => obj.split(' ')
        .filter(mapData => mapData.length > 1)
        .join(' '))
      .filter(result => result.length > 0);
    this.procSentens = porcData.join(' ');
    porcData.forEach(obj => this.sentens.push(obj));
  }
}
