import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RfpSerchService {

  constructor(private httpClient: HttpClient) { }

  createUser(user) {
    return this.httpClient.post(  `http://localhost:3000/users`, user);
  }
  getAllUser() {
    return this.httpClient.get(`http://localhost:3000/users`);
  }
  updateUser(user) {
    // return this.httpClient.put(`http://localhost:3000/users/`+user.id,user);
  }
  deleteUser(user) {
    // return this.httpClient.delete("http://localhost:3000/users/"+user.id);
  }
}
