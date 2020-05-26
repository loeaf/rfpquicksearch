import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProgressService} from './services/progress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'rs-client';
  navbarOpen = false;
  query: any;
  progressEmmit;
  ngOnDestroy(): void {
    this.progressEmmit.unsubscribe();
  }
  ngOnInit(): void {
    this.subscribeProgress();
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  constructor(private progressServ: ProgressService) {
    this.query = `determinate`;
  }

  subscribeProgress() {
    this.progressEmmit = this.progressServ.ProgressEmmit.subscribe(res => {
      if (res === true) {
        this.query = `indeterminate`;
      } else {
        this.query = `determinate`;
      }
    });
  }
}
