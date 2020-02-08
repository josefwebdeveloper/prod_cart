import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductsDetailsComponent} from './products-details/products-details.component';


function DashboardComponent() {

}

const routes: Routes = [
  {
    path: 'products',
    component: ProductsDetailsComponent,
    data: { title: 'Products' }
  },
  {
    path: 'products/:id',
    component: ProductsDetailsComponent,
    data: {title: 'Product Details'}
  },
// {
//   path: 'product-add',
//   component: ProductAddComponent,
//   data: { title: 'Add Product' }
// },
// {
//   path: 'product-edit/:id',
//   component: ProductEditComponent,
//   data: { title: 'Edit Product' }
// },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
