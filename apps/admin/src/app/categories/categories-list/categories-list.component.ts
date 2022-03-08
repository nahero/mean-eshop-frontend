import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
    constructor() {}

    categories = [
        { id: 1, name: 'Mobile', products: 15 },
        { id: 2, name: 'Gadgets', products: 148 },
        { id: 3, name: 'Desktop', products: 27 },
        { id: 4, name: 'Keyboards', products: 22 }
    ];

    ngOnInit(): void {}
}
