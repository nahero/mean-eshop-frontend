import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@nx-repo/products';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
    constructor(private categoriesService: CategoriesService) {}

    categories: Category[] = [];

    /**
     * Gets categories from categoriesService as array of Category int
     */
    getCategories() {
        this.categoriesService.getCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }

    ngOnInit(): void {
        this.getCategories();
    }
}
