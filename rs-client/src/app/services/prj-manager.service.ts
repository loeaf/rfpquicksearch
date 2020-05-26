import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PRJInfoModel} from '../pages/components/prj-info-input/prj-info-input.component';

@Injectable({
  providedIn: 'root'
})
export class PrjManagerService {

  constructor(private httpClient: HttpClient) { }

  createProject(prjInfoModel: PRJInfoModel) {
    return this.httpClient.post('http://localhost:3000/prj', prjInfoModel);
  }
  getAllProject() {
    return this.httpClient.get('http://localhost:3000/prj');
  }
  updateUser(user) {
    // return this.httpClient.put("http://localhost:3000/users/"+user.id,user);
  }
  deleteUser(user) {
    // return this.httpClient.delete("http://localhost:3000/users/"+user.id);
  }
}
