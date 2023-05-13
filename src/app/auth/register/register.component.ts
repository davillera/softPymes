import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formRegister: any

  constructor(
    private aFAuth: AngularFireAuth,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    sessionStorage.clear

    this.formRegister = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  Validate(){
    const password1 = this.formRegister.value.password1
    const password2 = this.formRegister.value.password2

    if(password1 === password2){
      Swal.fire({
        icon: 'success',
        title: 'Creaste un nuevo usuario',
        text: 'Ya puedes ingresar a la aplicación',
      })
      this.router.navigate(['/auth/login'])
      this.Register()
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden',
      })
    }
  }

  Register(){
    const email = this.formRegister.value.email
    const password = this.formRegister.value.password2

    this.aFAuth.createUserWithEmailAndPassword(email, password).then((user) =>{

    }).catch((error)=>{
      console.log(error);

    })
  }
}
