import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@nx-repo/products';
import { ToastService } from '@nx-repo/ui';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  isEditMode = false;
  product!: Product;
  currentProductID: string | undefined;
  categories!: Category[];
  imageDisplay!: string | ArrayBuffer;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this._initFormGroup();
    this.getCategories();
  }

  /**
   * Get product by ID
   */
  getProduct(productID: string) {
    this.productsService.getProduct(productID).subscribe((product) => {
      this.form.controls['name'].setValue(product.name);
      this.form.controls['description'].setValue(product.description);
      this.form.controls['richDescription'].setValue(product.richDescription);
      this.form.controls['image'].setValue(product.image);
      this.form.controls['images'].setValue(product.images);
      this.form.controls['price'].setValue(product.price);
      this.form.controls['countInStock'].setValue(product.countInStock);
      this.form.controls['rating'].setValue(product.rating);
      this.form.controls['numReviews'].setValue(product.numReviews);
      this.form.controls['category'].setValue(product.category);
      this.form.controls['isFeatured'].setValue(product.isFeatured);
      this.form.controls['dateCreated'].setValue(product.dateCreated);
    });
  }

  /**
   * Submit form to create product
   */
  createProduct() {
    this._checkIsFormSubmittedAndValid();

    this.product = {
      name: this.form.controls['name'].value,
      price: this.form.controls['price'].value,
      image: 'http://localhost:3000/public/uploads/rc-car-blue.jpeg-1645784757737.jpeg',
      isFeatured: this.form.controls['isFeatured'].value,
      description: this.form.controls['description'].value,
      richDescription: this.form.controls['richDescription'].value,
      // category: '6202ad5fc7d6478ecbe7be45'
      category: this.form.controls['category'].value._id
    };
    console.log('Product: ', this.product);

    this.productsService.createProduct(this.product).subscribe({
      next: (response) => {
        this.toastService.displayMessage('Product Created', `Product ${response.name} was successfully created`);
      },
      complete: () => {
        this.goBackAfterDelay();
      },
      error: (e) => {
        this.toastService.displayMessage('Product not created:', e.message, 'error');
      }
    });
  }

  /**
   * Submit form to update existing product
   */
  updateProduct() {}

  /**
   * Gets categories
   */
  getCategories() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats;
      console.group('Categories:');
      console.table(this.categories);
    });
  }

  /**
   * Initialize form group
   */
  private _initFormGroup() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      images: [''],
      price: ['', Validators.required],
      countInStock: ['', Validators.required],
      rating: [''],
      numReviews: [''],
      category: [''],
      isFeatured: [''],
      dateCreated: ['']
    });
    this._checkAndSetEditMode();
  }

  /**
   * Check for edit mode by checking if id exists in route params
   */
  private _checkAndSetEditMode() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.getProduct(params['id']);
        this.currentProductID = params['id'];
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
    console.log(this.form.controls['price'].value);
  }

  /**
   * Back to Products list
   */
  goBack() {
    this.location.back();
    // this.router.navigate(['products']);
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
   * Why is this getter used?
   */
  get productsForm() {
    return this.form.controls;
  }

  /**
   * On image upload
   * @param event
   */
  onImageUpload(event: Event) {
    // console.log('Image uploaded', event.target.);
    // this.imageDisplay = event.target.file[0];
  }
}
