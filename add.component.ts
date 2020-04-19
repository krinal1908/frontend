import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  registerForm: FormGroup;
  
  submitted = false;
  // let form = document.querySelector('form');
  // ?data : any[] = ["roll","name"];
  data = null;
  constructor(private http : HttpClient , private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roll : ['',Validators.required]
  });
  }

  
get f() { return this.registerForm.controls; }


onSubmit(body:any)
{
  this.submitted = true;
  if (this.registerForm.invalid) 
  {
    // alert("enter details");
    return;
    
  }
  else
  {
    // let formData: FormData = new FormData();
   
    console.log(this.registerForm.value);
    // formData.append("",this.registerForm.value);

   this.http.post<any>("http://localhost:5000/auth", this.registerForm.value )
     .subscribe((response) => {
          console.log('response received is ', response);
      })
  }
  
}

}
