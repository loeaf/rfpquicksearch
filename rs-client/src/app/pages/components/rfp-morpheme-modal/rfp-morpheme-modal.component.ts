import {Component, Inject, OnInit} from '@angular/core';
import {DialogData} from '../rfp-info-input/rfp-info-input.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RfpManagerService} from '../../../services/rfp-manager.service';

@Component({
  selector: 'app-rfp-morpheme-modal',
  templateUrl: './rfp-morpheme-modal.component.html',
  styleUrls: ['./rfp-morpheme-modal.component.css']
})
export class RfpMorphemeModalComponent implements OnInit {
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
