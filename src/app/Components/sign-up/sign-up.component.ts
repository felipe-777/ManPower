import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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
  signupForm!: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
    ){}

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
          this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          this.signupForm.reset();
          this.router.navigate(['login']);
        })
        ,error:(err)=>{ 
          this.toast.error({detail:"ERROR", summary:err.message, duration: 5000});
        }
      })
    }else{
      ValidateForm.validateAllFormFields(this.signupForm)
    }
  }
}
