import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthFbService} from '../../../../shared/services/authfb.service';
import {NameService} from '../../../../shared/services/name.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'wfm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  date: Date = new Date();
  name: Observable<string>;

  constructor(private authService: AuthFbService,
              private storage: NameService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.name = this.storage.getNameStorage();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']).then(() => {
    });

  }
}
