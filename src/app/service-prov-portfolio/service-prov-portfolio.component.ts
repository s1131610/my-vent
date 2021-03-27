import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';


import { User } from '../_models';
import { ServiceProvider } from '../_models';
import { UserService, AuthenticationService } from '../_services';
@Component({
  selector: 'service-prov-portfolio',
  templateUrl: './service-prov-portfolio.component.html',
  styleUrls: ['./service-prov-portfolio.component.css']
})
export class ServiceProvPortfolioComponent implements OnInit {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
  constructor( private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser;
        });
    }
    
  ngOnInit() {
     this.loadAllProviders();
  }
private loadAllProviders() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users ;
        });
}
}