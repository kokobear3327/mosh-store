import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private userService: UserService,
    router: Router
  ) {
    auth.user$.subscribe(user => {
      if (!user) return;
      userService.save(user);
      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
}
