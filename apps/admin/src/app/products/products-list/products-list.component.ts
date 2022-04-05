import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@nx-repo/products';
import { ToastService } from '@nx-repo/ui';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    console.log('Products list init');
    this.getProducts();
    // this.getProductsByCategory('6203972e885a4dc3179db13b');
  }

  getProducts() {
    this.productsService.getProducts().subscribe((prods) => {
      this.products = prods;
    });
  }

  /**
   * Get products by category (single or multiple)
   * @param categoryIDs
   */
  private getProductsByCategory(categoryIDs: string | string[]) {
    this.productsService.getProductsByCategory(categoryIDs).subscribe((prods) => {
      this.products = prods;
    });
  }

  /**
   * Edit product
   * @param productID
   */
  editProduct(productID: string) {
    this.router.navigateByUrl(`/products/form/${productID}`);
  }

  /**
   * Delete product
   */
  deleteProduct(productName: string, productID: string) {
    // Display confirmation dialog
    this.confirmationService.confirm({
      message: `Are you sure you want to delete <strong>${productName}</strong>?`,
      accept: () => {
        // Perform deletion on confirm
        this.productsService.deleteProduct(productID).subscribe({
          next: () => {
            this.toastService.displayMessage('Product Deleted', 'Product was deleted successfully');
          },
          complete: () => {
            this.getProducts();
          },
          error: (e) => {
            this.toastService.displayMessage('Product not deleted:', e.message, 'error');
          }
        });
      }
    });
  }
}
