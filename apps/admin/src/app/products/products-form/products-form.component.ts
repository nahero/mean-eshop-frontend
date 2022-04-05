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
  currentProductID!: string;
  categories!: Category[];
  imageDisplay!: string | ArrayBuffer | null;

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
      console.group('Product');
      console.log(product);

      this.productForm['name'].setValue(product.name);
      this.productForm['description'].setValue(product.description);
      this.productForm['richDescription'].setValue(product.richDescription);
      this.productForm['image'].setValue(product.image);
      this.productForm['images'].setValue(product.images);
      this.productForm['price'].setValue(product.price);
      this.productForm['countInStock'].setValue(product.countInStock);
      this.productForm['rating'].setValue(product.rating);
      this.productForm['numReviews'].setValue(product.numReviews);
      this.productForm['category'].setValue(product.category?._id);
      this.productForm['isFeatured'].setValue(product.isFeatured);
      // this.form.controls['dateCreated'].setValue(product.dateCreated);

      // when editing the product we set the imageDisplay to the URI of the image,
      // we don't need the file as when adding product
      this.imageDisplay = product.image;
      if (this.isEditMode) {
        this.productForm['image'].setValidators([]);
        this.productForm['image'].updateValueAndValidity();
      }
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
      // image: 'http://localhost:3000/public/uploads/rc-car-blue.jpeg-1645784757737.jpeg',
      image: this.imageDisplay,
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
   * Submit Form data to create product
   */
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      console.error('Form is invalid!');
      return;
    }

    /**
     * FormData comes with basic JS, no need to import anything.
     * FormData is necessary to send image file, not JSON.
     */
    const productFormData = new FormData();

    Object.keys(this.productForm).map((key) => {
      console.log(key);
      console.log(this.productForm[key].value);

      productFormData.append(key, this.productForm[key].value);
    });

    if (this.isEditMode) {
      console.group('Updating product');
      console.log(productFormData);

      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }

  /**
   * Add product using FormData
   * @param productData
   */
  private _addProduct(productData: FormData) {
    this.productsService.createProductWithFormData(productData).subscribe({
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
  private _updateProduct(productFormData: FormData) {
    this.productsService.updateProduct(productFormData, this.currentProductID).subscribe({
      next: (response) => {
        this.toastService.displayMessage('Product Updated', `Product ${response.name} was successfully updated`);
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
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: [1, Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      images: [''],
      rating: [''],
      numReviews: [''],
      isFeatured: [false]
      // dateCreated: ['']
    });
    this._checkAndSetEditMode();
  }

  /**
   * Check for edit mode by checking if id exists in route params,
   * get product
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
  get productForm() {
    return this.form.controls;
  }

  /**
   * On image upload
   * @param event
   */
  onImageUpload(event: any) {
    const file = event.target.files[0];
    console.log('Image uploaded', event.target.files[0]);

    if (file) {
      /**
       * We need to patch the actual image FILE to the form image property
       * and then updateValueAndValidity of the image form field
       */

      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
}
