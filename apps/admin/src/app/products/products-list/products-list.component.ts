import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@nx-repo/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    console.log('Products list init');
    this.getProducts();
    // this.getProductsByCategory('6203972e885a4dc3179db13b');
  }

  private getProducts() {
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
}
