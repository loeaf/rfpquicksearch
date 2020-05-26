import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {PRJInfoModel} from '../components/prj-info-input/prj-info-input.component';

@Component({
  selector: 'app-rfp-morph-dic',
  templateUrl: './rfp-morph-dic.component.html',
  styleUrls: ['./rfp-morph-dic.component.css']
})
export class RfpMorphDicComponent implements OnInit {
  prjInfoModel = {
    prjName: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {

  }
}
