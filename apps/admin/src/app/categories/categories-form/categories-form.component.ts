import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@nx-repo/products';
import { MessageService } from 'primeng/api';

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
    private messageService: MessageService,
    private router: Router
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
    this.categoriesService.createCategory(this.category).subscribe();

    this.displayMessage(this.category.name);
    this.goBack();
  }

  /**
   * Back to Categories list
   */
  goBack() {
    this.router.navigate(['categories']);
  }

  /**
   * Toast message functions
   */
  displayMessage(category: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Category created',
      detail: `Category "${category}" was created successfully`
    });
  }

  displayMessageMultiple() {
    this.messageService.addAll([
      { severity: 'success', summary: 'Service Message', detail: 'Via MessageService' },
      { severity: 'info', summary: 'Info Message', detail: 'Via MessageService' }
    ]);
  }

  clear() {
    this.messageService.clear();
  }
}
