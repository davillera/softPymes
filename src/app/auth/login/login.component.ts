import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formLogin: any

  constructor(
    private formBuilder: FormBuilder,
    private aFAuth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
    sessionStorage.clear

    this.formLogin = this.formBuilder.group({
      email: ['davillera@softpymes.com', [Validators.required, Validators.email]],
      password: ['xk221ac4', [Validators.required, Validators.minLength(8)]]
    })
  }

  login() {
    const email = this.formLogin.value.email
    const password = this.formLogin.value.password

    this.aFAuth.signInWithEmailAndPassword(email, password).then((user) => {
      console.log('con exito mi rey');
    }).catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Revisa las credenciales de acceso',
      })
    })
  }


}
