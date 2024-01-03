import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private router: Router, private http: HttpClient) { }
  getWords(){
    return this.http.get(`${baseUrl}/words`)
  }
  addWord(data:any){
    return this.http.post(`${baseUrl}/words`,data)
  }
  updateWord(data:any,id:number){
    return this.http.put(`${baseUrl}/words/${id}`,data)
  }
  deleteWord(id:number){
    return this.http.delete(`${baseUrl}/words/${id}`)
  }
}
