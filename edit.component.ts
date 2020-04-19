import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { $ } from 'protractor';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  MyArray : any = [];
  registerForm: FormGroup;
  firstname : string;

  constructor( private modalService: NgbModal , private http : HttpClient , private formBuilder: FormBuilder) {this.default(); }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roll : ['',Validators.required]
  });
  }

  openModal(targetModal, item) {
   
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   
    this.registerForm.patchValue({
    
      firstName: item.First_name,
     lastName: item.Last_name,
     roll: item.Rollno ,
    });
   }
 

  default(){
    console.log("Hello default");
    this.http.get<any[]>("http://localhost:5000/edit")
  .subscribe((res:any[]) => {
       this.MyArray = res;
       console.log(this.MyArray);
   })

  //  return this.MyArray;
  }

  onSubmit(){
    
   this.http.put<any>("http://localhost:5000/auth2", this.registerForm.value )
   .subscribe((response) => {
        console.log('response received after updation ', response);
    })
  }
  
  delete(roll : number){
    
     console.log(roll);
    return this.http.delete("http://localhost:5000/edit"+"/"+ roll  ).subscribe(response =>{
      console.log("Deleted");
    })
  }
}

// search(){
//   this.MyArray = this.MyArray.filter(res=>{
//     return res.First_name.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase());
//   });
// }
