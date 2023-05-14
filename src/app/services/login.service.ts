import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private aFAuth: AngularFireAuth
  ) { }

  login(email: string, password: string) {
    return this.aFAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.aFAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.aFAuth.signOut();
  }


}
