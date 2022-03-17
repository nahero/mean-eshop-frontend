import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  isEditMode = false;
  currentCategoryID: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      icon: ['', Validators.required]
    });

    this._checkAndSetEditMode();
  }

  /**
   * Submits form values
   */
  createCategory() {
    this._checkIsFormSubmittedAndValid();

    this.category = {
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value
    };

    this.categoriesService.createCategory(this.category).subscribe({
      next: (response) => {
        this.toastService.categoryCreatedMessage(response.name);
      },
      complete: () => {
        this.goBackAfterDelay();
      },
      error: (e) => {
        this.toastService.displayMessage('Category not created:', e.message, 'error');
      }
    });
  }

  /**
   * Update current category
   */
  updateCategory() {
    this._checkIsFormSubmittedAndValid();

    this.category = {
      _id: this.currentCategoryID,
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value
    };

    this.categoriesService.updateCategory(this.category).subscribe({
      next: (response) => {
        this.toastService.displayMessage('Category Updated', `Category ${response.name} was successfully updated`);
      },
      complete: () => {
        this.goBackAfterDelay();
      },
      error: (e) => {
        this.toastService.displayMessage('Category not updated:', e.message, 'error');
      }
    });
  }

  /**
   * Get category by id
   */
  getCategory(categoryID: string) {
    this.categoriesService.getCategory(categoryID).subscribe((category) => {
      this.form.controls['name'].setValue(category.name);
      this.form.controls['icon'].setValue(category.icon);
    });
  }

  /**
   * Check for edit mode by checking if id exists in route params
   */
  private _checkAndSetEditMode() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.getCategory(params['id']);
        this.currentCategoryID = params['id'];
      }
    });
  }

  /**
   * Form actions on submit
   */
  private _checkIsFormSubmittedAndValid() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    console.group('Form values');
    console.log(this.form.controls['name'].value);
    console.log(this.form.controls['icon'].value);
  }

  /**
   * Back to Categories list
   */
  goBack() {
    this.location.back();
    // this.router.navigate(['categories']);
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
}
