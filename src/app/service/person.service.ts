import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../modal/person.modal';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  baseUrl = "http://localhost:3000/posts";
   constructor(private http: HttpClient) { }

  getPersons(){
    return this.http.get<Person>(this.baseUrl)
    .pipe(map((res:any)=>{
      return res;
    }));
  }

  postPerson(person:Person){
    return this.http.post<Person>(this.baseUrl,person)
    .pipe(map((res:any)=>{
      return res;
    }));
  }

  deletePerson(id: string){
    return this.http.delete<any>(this.baseUrl + '/'+id)
    .pipe(map((res:any)=>{
      return res;
    }));
  }
  updatePerson(person:Person,id:number){
    return this.http.put<Person>(this.baseUrl+'/'+id,person)
    .pipe(map((res:any)=>{
      return res;
    }));
  }

}
