import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@nx-repo/users';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  constructor(private usersService: UsersService, private router: Router) {}

  users: User[] = [];

  ngOnInit(): void {
    console.log('Users List initiated');

    this.getUsers();
  }

  /**
   * Gets users from usersService
   */
  getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
      console.table(this.users);
    });
  }

  /**
   * Edit user
   */
  editUser(userID: string) {
    this.router.navigateByUrl(`/users/form/${userID}`);
  }
}
