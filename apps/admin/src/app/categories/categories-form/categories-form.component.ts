import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@nx-repo/products';
import { ToastService } from '@nx-repo/ui';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  /**
   * 'Category' is an interface and it doesn't declare initial values for properties,
   * therefore we need to either use 'Category | undefined' or 'category!: Category'
   */
  category: Category | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private toastService: ToastService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required]
    });
  }

  /**
   * Submits form values
   */
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    console.group('Form values');
    console.log(this.form.controls['name'].value);
    console.log(this.form.controls['icon'].value);

    this.category = {
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value
    };

    this.categoriesService.createCategory(this.category).subscribe({
      next: (response) => {
        this.toastService.categoryCreatedMessage(response.name);
        timer(2000).subscribe(() => {
          this.goBack();
        });
      },
      // complete: () => {
      // },
      error: (e) => {
        this.toastService.displayMessage('Category not created:', e.message, 'error');
      }
    });
  }

  /**
   * Back to Categories list
   */
  goBack() {
    this.location.back();
    // this.router.navigate(['categories']);
    // this.toastService.displayMessage('Router', 'Going back to categories', 'info');
  }
}
