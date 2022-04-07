import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@nx-repo/ui';
import { User, UsersService } from '@nx-repo/users';
import { timer } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';

declare const require: (arg0: string) => countriesLib.LocaleData;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  isEditMode = false;
  user!: User;
  currentUserID!: string;
  countries = [{}];

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    console.log('Users Form initialized');
    this._initFormGroup();
    this.getCountries();
  }

  /**
   * Initialize form group
   */
  private _initFormGroup() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false, Validators.required],
      country: ['', Validators.required],
      city: [''],
      street: [''],
      apartment: [''],
      zip: [''],
      password: ['', Validators.required]
    });
    this._checkAndSetEditMode();
  }

  /**
   * Check for edit mode by checking if id exists in route params,
   * get user
   */
  private _checkAndSetEditMode() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.getUser(params['id']);
        this.currentUserID = params['id'];
      }
    });
  }

  /**
   * Get user by id
   */
  getUser(userID: string) {
    this.userService.getUserByID(userID).subscribe((user) => {
      this.userForm['name'].setValue(user.name);
      this.userForm['email'].setValue(user.email);
      this.userForm['phone'].setValue(user.phone);
      this.userForm['isAdmin'].setValue(user.isAdmin);
      this.userForm['country'].setValue(user.country);
      this.userForm['city'].setValue(user.city);
      this.userForm['street'].setValue(user.street);
      this.userForm['apartment'].setValue(user.apartment);
      this.userForm['zip'].setValue(user.zip);
      // Password is only required when creating a new user, not in editing
      this.userForm['password'].setValidators([]);
      this.userForm['password'].updateValueAndValidity();
    });
  }

  /**
   * Submits form values
   */
  createUser() {
    if (this.form.invalid) {
      console.log('Form invalid');
      return;
    }

    console.log('Form valid, moving on with user creation');

    this.user = {
      name: this.userForm['name'].value,
      email: this.userForm['email'].value,
      phone: this.userForm['phone'].value,
      isAdmin: this.userForm['isAdmin'].value,
      country: this.userForm['country'].value,
      city: this.userForm['city'].value,
      street: this.userForm['street'].value,
      zip: this.userForm['zip'].value,
      apartment: this.userForm['apartment'].value,
      password: this.userForm['password'].value
    };

    this.userService.createUser(this.user).subscribe({
      next: (response) => {
        this.toastService.displayMessage('User created', `User ${response.name} was created successfully`);
      },
      complete: () => {
        this.goBackAfterDelay();
      },
      error: (e) => {
        this.toastService.displayMessage('User not created:', e.message, 'error');
      }
    });
  }

  /**
   * Update current user
   */
  updateUser() {
    if (this.form.invalid) return;

    this.user = {
      _id: this.currentUserID,
      name: this.userForm['name'].value,
      email: this.userForm['email'].value,
      phone: this.userForm['phone'].value,
      isAdmin: this.userForm['isAdmin'].value,
      country: this.userForm['country'].value,
      city: this.userForm['city'].value,
      street: this.userForm['street'].value,
      zip: this.userForm['zip'].value,
      apartment: this.userForm['apartment'].value,
      password: this.userForm['password'].value
    };

    this.userService.updateUser(this.user).subscribe({
      next: (response) => {
        this.toastService.displayMessage('User Updated', `User ${response.name} was successfully updated`);
      },
      complete: () => {
        this.goBackAfterDelay();
      },
      error: (e) => {
        this.toastService.displayMessage('User not updated:', e.message, 'error');
      }
    });
  }

  /**
   * get countries iso codes
   */
  getCountries() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    const countriesList = countriesLib.getNames('en', { select: 'official' });
    this.countries = Object.entries(countriesList).map((entry) => {
      return {
        iso: entry[0],
        name: entry[1]
      };
    });
    // console.log(this.countries);
  }

  /**
   * Why is this getter used?
   */
  get userForm() {
    return this.form.controls;
  }

  /**
   * Go back one step in navigation history
   * @param delay A number in ms how much to wait before triggering the navigation,
   * default is 2000
   */
  goBackAfterDelay(delay: number = 2000) {
    timer(delay).subscribe(() => {
      this.goBack();
    });
  }

  /**
   * Back to Users list
   */
  goBack() {
    this.location.back();
    // this.router.navigate(['users']);
  }
}
