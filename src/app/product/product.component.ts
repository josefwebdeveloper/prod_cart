import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {StateService} from '../services/state.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Product} from '../Product.model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})


export class ProductComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Output() fileChanged = new EventEmitter<File>();
  // uploadIcon = faUpload;
  public prodForm: FormGroup;
  isShow = false;
  isEdit: boolean;
  switch$: Observable<boolean>;
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  productSubscription: Subscription;
  isEditSubscription: Subscription;

  constructor(
    // private fb: FormBuilder,
    public stateService: StateService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.productSubscription = this.stateService.product$.subscribe(prod => {
      if (prod) {
        console.log(prod);
        this.getValueToForm(prod);
      }
    });
    this.isEditSubscription = this.stateService.switch$.subscribe(isEdit => {
      if (isEdit) {
        this.isEdit = isEdit;
      } else {
        this.createForm();
        this.isEdit = false;
      }
    });
    // this.switch$ = this.stateService.switch$;
  }

  onFileChange(event) {
    /*const fileReader = new FileReader();
    const fileData = fileReader.readAsText(event.target.files[0]);*/
    console.log(event.target.files[0]);
    this.fileChanged.emit(event.target.files[0]);
  }

  createForm() {
    this.prodForm = new FormGroup({
      url: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4),
        Validators.maxLength(120)])),
      price: new FormControl('', [Validators.required, Validators.maxLength(6)])
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.prodForm.controls[controlName].hasError(errorName);
  }

  onCancel() {
    this.formDirective.resetForm();

  }

  productIt(product: Product) {
    this.isShow = true;
    if (this.isEdit) {
      this.getValueToForm(product);
      this.stateService.editProduct(product);
    } else {
      this.createProduct(product);
    }
  }

  getValueToForm(product: Product) {
    this.prodForm.setValue({
      name: product.name,
      description: product.description,
      price: product.price
    });
  }

  createProduct(formValue) {
    console.log(formValue);
    console.log(this.prodForm);
    if (this.prodForm.valid) {
      this.stateService.addProduct(formValue);
      this.formDirective.resetForm();
    }
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

}
