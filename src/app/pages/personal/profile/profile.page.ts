import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoggingService } from '../../../services/logging.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user = null;
  constructor(private loggingService: LoggingService, private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.user = this.activatedRoute.snapshot.data['user'];
    this.user = this.authService.user;
    this.loggingService.log('User data: ', this.user);
  }

}
