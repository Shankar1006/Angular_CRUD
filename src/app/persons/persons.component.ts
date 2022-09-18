import { Component, OnInit, ViewChild } from '@angular/core';
import{FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Person } from 'src/app/modal/person.modal';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any                 //for uploading file               

  personForm : FormGroup;
  
  personObj : Person = new Person();                    //To store data recieved from json server
  personData :any;                                      //initialising personData for getting it //get method
  showAdd !: boolean;                    
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder,
    private personService: PersonService
  ) { 
    this.personForm = formbuilder.group({});
  }

  ngOnInit(): void {
    this.personForm=this.formbuilder.group({
      name : ['', Validators.required],                       //validators
      email : ['',[Validators.required, Validators.email]],
      age : ['',Validators.required],
      country :['',Validators.required],
    });

    this.getAllPerson();                               // for getting persons on page refreshing              
  }

  addPerson(){                                        //for adding person to json server(post method)
    this.personObj.name=this.personForm.value.name;
    this.personObj.email=this.personForm.value.email;
    this.personObj.age=this.personForm.value.age;
    this.personObj.country=this.personForm.value.country;
    this.personObj.profile=this.fileInput.nativeElement.files[0]?.name;

    this.personService.postPerson(this.personObj)
    .subscribe((res)=>{
      this.personForm.reset();                        // for resetting the form
      this.clear();
      alert("Person added successfully");
      this.getAllPerson();                            //calling the method once we add details 
    });
  }
  clear(){
    this.fileInput.nativeElement.value = '';
  }
   
  getAllPerson(){                            //method for getting input from json server to html
    this.personService.getPersons()
    .subscribe(res=>{
      this.personData = res; 
    })
  }
  deletePerson(per:any){                     //method for deleting person
    this.personService.deletePerson(per.id)  //per.id gives id of particular person
    .subscribe(res=>{
      alert("Person deleted!");
      this.getAllPerson();                    //for getting persons after click event 
    });   
  }
  onEdit(per:any){                                       //method for editing form
    this.showAdd = false;
    this.showUpdate = true;
    this.personObj.id=per.id;                            //to store id value for updating
    this.personForm.controls['name'].setValue(per.name); //for accessing values present in the form
    this.personForm.controls['email'].setValue(per.email);
    this.personForm.controls['age'].setValue(per.age);
    this.personForm.controls['country'].setValue(per.country);
    this.personForm.controls['profile'].setValue(per.profile); 
  }
  updatePerson(){                                        //method for updating details
    this.personObj.name=this.personForm.value.name;
    this.personObj.email=this.personForm.value.email;
    this.personObj.age=this.personForm.value.age;
    this.personObj.country=this.personForm.value.country;
    this.personObj.profile=this.fileInput.nativeElement.files[0]?.name;

    this.personService.updatePerson(this.personObj,this.personObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      this.personForm.reset();
      this.clear();
      this.getAllPerson();
    });
  }
  clickaddperson(){
    this.personForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
}
