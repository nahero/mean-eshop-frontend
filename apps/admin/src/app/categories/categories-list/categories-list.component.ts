import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@nx-repo/products';
import { ToastService } from '@nx-repo/ui';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  constructor(private categoriesService: CategoriesService, private toastService: ToastService) {}

  categories: Category[] = [];

  /**
   * Gets categories from categoriesService as array of Category int
   */
  getCategories() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }

  /**
   * Deletes selected category
   */
  deleteCategory(categoryID: string) {
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

  ngOnInit(): void {
    this.getCategories();
  }
}
