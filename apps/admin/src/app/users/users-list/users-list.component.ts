import { Component, OnInit } from '@angular/core';
import { UsersService } from '@nx-repo/users';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    console.log('Users List initiated');
  }
}
