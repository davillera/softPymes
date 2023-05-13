import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

  constructor(
    private aFAuth: AngularFireAuth,
    private router: Router
  ){ }

  ngOnInit() {
    this.aFAuth.authState.subscribe(user => {
      if (!user) {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
