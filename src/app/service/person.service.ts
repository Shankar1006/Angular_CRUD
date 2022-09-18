import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../modal/person.modal';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  baseUrl = "http://localhost:3000/posts";
   constructor(private http: HttpClient) { }

  getPersons(){
    return this.http.get<Person>(this.baseUrl)
  }

  postPerson(person:Person){
    return this.http.post<Person>(this.baseUrl,person)
  }

  deletePerson(id: string){
    return this.http.delete<any>(this.baseUrl + '/'+id)
  }
  updatePerson(person:Person,id:number){
    return this.http.put<Person>(this.baseUrl+'/'+id,person)
  }

}
