import { Component, OnInit } from '@angular/core';
import {RfpSerchService} from '../../services/rfp-serch.service';
import {RfpManagerService} from '../../services/rfp-manager.service';
import {FormControl, Validators} from '@angular/forms';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];


@Component({
  selector: 'app-rfp-search',
  templateUrl: './rfp-search.component.html',
  styleUrls: ['./rfp-search.component.css']
})
export class RfpSearchComponent implements OnInit {
  rfpSeachModel = {
    fullText: ''
  };
  constructor(private rfpManageService: RfpManagerService) { }
  prjFullTextSchControl = new FormControl('', Validators.required);

  ngOnInit(): void {
  }

  onSearch() {
    this.rfpManageService.getAllRFPListByFullText(this.rfpSeachModel.fullText).subscribe(res => {
      this.rfpManageService.rfpListCompoRenderEmitByFullText.emit(res);
      this.rfpSeachModel = {
        fullText: ''
      };
      this.prjFullTextSchControl = new FormControl('', Validators.required);
    });
  }
}
