import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StateService} from '../services/state.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Product} from '../Product.model';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})


export class ProductComponent implements OnInit {
  public prodForm: FormGroup;
  subProduct: Subscription;
  prodEdit$: Observable<Product>;

  constructor(
    private fb: FormBuilder,
    public stateService: StateService
  ) {
  }

  ngOnInit(): void {
    // this.subProduct = this.prodEdit$.subscribe(data => {
    //   if (data) {
    //     console.log(data);
    //   }
    // });
    this.prodForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      description: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10),
        Validators.maxLength(120)])),
      price: new FormControl('', [Validators.required, Validators.maxLength(6)])
    });
  }

  hasError(controlName: string, errorName: string) {
    return this.prodForm.controls[controlName].hasError(errorName);
  }

  onCancel() {
    this.prodForm.reset();
  }

  createProduct(formValue) {
    console.log(formValue);
    console.log(this.prodForm);
    if (this.prodForm.valid) {
      this.stateService.addProduct(formValue);
    }
  }


}
