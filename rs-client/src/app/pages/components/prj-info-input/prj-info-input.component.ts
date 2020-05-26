import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-prj-info-input',
  templateUrl: './prj-info-input.component.html',
  styleUrls: ['./prj-info-input.component.css']
})
export class PrjInfoInputComponent implements OnInit {
  prjInfoModel: PRJInfoModel = {
    prjName: '',
    prjYear: 0,
  };
  prjNameControl = new FormControl('', Validators.required);
  prjYearControl = new FormControl('', Validators.required);
  prjYears: PrjRegistYear[] = [];
  prjYear: PrjRegistYear;

  constructor() {
    let stdYear = 2005;
    for (let i = 0; i < 20; i++) {
      const prj: PrjRegistYear = {
        year: stdYear
      };
      this.prjYears.push(prj);
      stdYear += 1;
    }
  }

  ngOnInit(): void {
  }
}

interface PrjRegistYear {
  year: number;
}

export interface PRJInfoModel {
  prjName: string;
  prjYear: number;
}
