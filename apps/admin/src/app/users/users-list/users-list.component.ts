import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@nx-repo/ui';
import { User, UsersService } from '@nx-repo/users';
import { ConfirmationService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';

declare const require: (arg0: string) => countriesLib.LocaleData;

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private toastService: ToastService
  ) {}

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

  /**
   * Delete user
   */
  deleteUser(userName: string, userID: string) {
    // Display confirmation dialog
    this.confirmationService.confirm({
      message: `Are you sure you want to delete <strong>${userName}</strong>?`,
      accept: () => {
        this.usersService.deleteUser(userID).subscribe({
          next: () => {
            this.toastService.displayMessage('Product Deleted', 'Product was deleted successfully');
          },
          complete: () => {
            this.getUsers();
          },
          error: (e) => {
            this.toastService.displayMessage('User not deleted:', e.message, 'error');
          }
        });
      }
    });
  }

  /**
   * Get countries name from iso code
   */
  getCountryName(iso: string) {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    return countriesLib.getName(iso, 'en', { select: 'official' });
  }
}
