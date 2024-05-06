import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/Helpers/ValidateForm';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  
  onSubmit(){
    if(this.signupForm.valid){
      this.auth.signUp(this.signupForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          this.signupForm.reset();
          this.router.navigate(['login']);
        })
        ,error:(err)=>{ 
            alert(err.error.message); 
        }
      })
    }else{
      ValidateForm.validateAllFormFields(this.signupForm)
    }
  }
}
