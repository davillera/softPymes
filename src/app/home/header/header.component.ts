import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  logout() {
    Swal.fire({
      title: 'Quieres Cerrar Sesión?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Cerrar Sesión',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.loginService.logout()
        this.router.navigate(['/auth/login'])
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
