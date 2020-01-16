import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user$ = angularFireAuth.authState;
  }

  login() {
    this.angularFireAuth.auth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }
}
