import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formRegister: any

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }


  ngOnInit(): void {
    sessionStorage.clear

    this.formRegister = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  Validate() {
    const password1 = this.formRegister.value.password1
    const password2 = this.formRegister.value.password2

    if (password1 === password2) {
      this.loginService.register(this.formRegister.value.email, this.formRegister.value.password2)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Creaste un nuevo usuario',
            text: 'Ya puedes ingresar a la aplicación',
          });
          this.router.navigate(['/auth/login']);
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden',
      })
    }
  }
}
