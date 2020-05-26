import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {PrjRegistComponent} from './pages/prj-regist/prj-regist.component';
import {RfpRegistComponent} from './pages/rfp-regist/rfp-regist.component';
import {RfpSearchComponent} from './pages/rfp-search/rfp-search.component';
import {RfpMorphDicComponent} from './pages/rfp-morph-dic/rfp-morph-dic.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'prj-regist', component: PrjRegistComponent},
  {path: 'rfp-regist', component: RfpRegistComponent},
  {path: 'rfp-search', component: RfpSearchComponent},
  {path: 'rfp-dic-manage', component: RfpMorphDicComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes,
  { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
