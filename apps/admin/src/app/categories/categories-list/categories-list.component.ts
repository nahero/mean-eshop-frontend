import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@nx-repo/products';
import { ToastService } from '@nx-repo/ui';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  constructor(
    private categoriesService: CategoriesService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  categories: Category[] = [];

  ngOnInit(): void {
    this.getCategories();
  }

  /**
   * Gets categories from categoriesService as array of Category int
   */
  getCategories() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }

  /**
   * Edit category
   */
  editCategory(categoryID: string) {
    this.router.navigateByUrl(`/categories/form/${categoryID}`);
  }

  /**
   * Delete selected category after confirmation
   */
  deleteCategory(categoryName: string, categoryID: string) {
    // Display confirmation dialog
    this.confirmationService.confirm({
      message: `Are you sure you want to delete <strong>${categoryName}</strong>?`,
      accept: () => {
        // Perform deletion on confirm
        this.categoriesService.deleteCategory(categoryID).subscribe({
          next: () => {
            this.toastService.displayMessage('Category Deleted', 'Category was deleted successfully');
          },
          complete: () => {
            this.getCategories();
          },
          error: (e) => {
            this.toastService.displayMessage('Category not deleted:', e.message, 'error');
          }
        });
      }
    });
  }
}
