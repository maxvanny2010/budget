import {Component, OnInit} from '@angular/core';
import {User} from '../../../../shared/models/user.model';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'wfm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  date: Date = new Date();
  user: User;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']).then(() => {
    });

  }
}
