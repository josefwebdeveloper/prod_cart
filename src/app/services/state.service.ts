import {Injectable} from '@angular/core';
import {BehaviorSubject, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {v4 as uuid} from 'uuid';
import {Product} from '../Product.model';
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId();

@Injectable({
  providedIn: 'root'
})
export class StateService {

  baseUrl = '../../assets/images/';
  url = '../../assets/images/images.jpeg';
  initialState = [
    {image: this.url, id: uid.randomUUID(8), name: 'Milk', description: 'country milk', price: 3, date: this.getCurrentDate()},
    {image: this.url, id: uid.randomUUID(8), name: 'Tea', description: 'Black Tea', price: 6, date: this.getCurrentDate()},
    {image: this.url, id: uid.randomUUID(8), name: 'Coffee', description: 'Black Coffee', price: 12, date: this.getCurrentDate()},
    {image: this.url, id: uid.randomUUID(8), name: 'Tea', description: 'Black Tea', price: 6, date: this.getCurrentDate()},
    {image: this.url, id: uid.randomUUID(8), name: 'Sugar', description: 'Sugar', price: 12, date: this.getCurrentDate()},
    {image: this.url, id: uid.randomUUID(8), name: 'Bread', description: 'Bread', price: 6, date: this.getCurrentDate()},
    {image: this.url, id: uid.randomUUID(8), name: 'Cookies', description: 'Cookies ', price: 12, date: this.getCurrentDate()},
    {image: this.url, id: uid.randomUUID(8), name: 'Tea2', description: 'Black Tea', price: 6, date: this.getCurrentDate()},
    {image: this.url, id: uid.randomUUID(8), name: 'Coffee3', description: 'Black Coffee', price: 12, date: this.getCurrentDate()},
    {image: this.url, id: uid.randomUUID(8), name: 'Tea4', description: 'Black Tea', price: 6, date: this.getCurrentDate()},
    {image: this.url, id: uid.randomUUID(8), name: 'Coffee5', description: 'Black Coffee', price: 12, date: this.getCurrentDate()},
    {image: this.url, id: uid.randomUUID(8), name: 'Tea6', description: 'Black Tea', price: 6, date: this.getCurrentDate()},
    {image: this.url, id: uid.randomUUID(8), name: 'Coffe8', description: 'Black Coffee', price: 12, date: this.getCurrentDate()},
  ];
  private readonly subProducts = new BehaviorSubject<Product[]>(this.initialState);
  private readonly subSwitch = new BehaviorSubject<boolean>(false);
  private readonly subProduct = new ReplaySubject<Product>();

  readonly products$ = this.subProducts.asObservable();
  readonly switch$ = this.subSwitch.asObservable();
  readonly product$ = this.subProduct.asObservable();


  // readonly completedTodos$ = this.products$.pipe(
  //   map(todos => todos.filter(todo => todo.isCompleted))
  // );
  // readonly products = this.products$.pipe(
  //   map(todos => todos.filter(todo => !todo.isCompleted))
  // );

  private get products(): Product[] {
    console.log(this.subProducts.getValue());
    return this.subProducts.getValue();
  }

  getUrl(file) {
    if (file) {
      return `${this.url}file`;
    } else {
      return this.url;
    }
  }

  private set products(val: Product[]) {
    console.log(val, 'set');

    this.subProducts.next(val);
  }

  switch(val) {
    this.subSwitch.next(val);
  }

  emitProduct(val) {
    this.subProduct.next(val);
  }

  addProduct(product) {
    console.log('add');
    this.products = [
      ...this.products,
      {
        image: this.getUrl(product.url),
        id: uid.randomUUID(8),
        name: product.name,
        description: product.description,
        price: product.price,
        date: this.getCurrentDate()
      }
    ];
  }

  removeProd(id: string) {
    this.products = this.products.filter(product => product.id !== id);
  }

  // setCompleted(id: string, isCompleted: boolean) {
  //   const todo = this.todos.find(el => el.id === id);
  //
  //   if (todo) {
  //     const index = this.todos.indexOf(todo);
  //     this.todos[index] = {
  //       ...todo,
  //       isCompleted
  //     };
  //     this.todos = [...this.todos];
  //   }
  // }

  editProduct(product) {
    const prod = this.products.find(el => el.id === product.id);

    if (prod) {
      console.log(prod, 'prod');

      const index = this.products.indexOf(prod);
      this.products[index] = {
        ...prod,
        name: product.name, description: product.description, price: product.price
      };
      console.log(this.products[index]);
      // this.products = [...this.products];
    }
  }

  getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  }

  constructor() {
  }
}
