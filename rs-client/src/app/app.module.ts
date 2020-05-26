import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PrjRegistComponent } from './pages/prj-regist/prj-regist.component';
import { RfpRegistComponent } from './pages/rfp-regist/rfp-regist.component';
import { RfpSearchComponent } from './pages/rfp-search/rfp-search.component';
import { RfpInfoInputComponent } from './pages/components/rfp-info-input/rfp-info-input.component';
import { PrjListComponent } from './pages/components/prj-list/prj-list.component';
import {PrjInfoInputComponent} from './pages/components/prj-info-input/prj-info-input.component';
import { RfpMorphemeModalComponent } from './pages/components/rfp-morpheme-modal/rfp-morpheme-modal.component';
import { RfpMorphDicComponent } from './pages/rfp-morph-dic/rfp-morph-dic.component';
import { RfpMorphemDicListComponent } from './pages/components/rfp-morphem-dic-list/rfp-morphem-dic-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { RfpListComponent } from './pages/components/rfp-list/rfp-list.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrjRegistComponent,
    RfpRegistComponent,
    RfpSearchComponent,
    RfpListComponent,
    RfpInfoInputComponent,
    PrjListComponent,
    PrjInfoInputComponent,
    RfpMorphemeModalComponent,
    RfpMorphDicComponent,
    RfpMorphemDicListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatSliderModule,
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }