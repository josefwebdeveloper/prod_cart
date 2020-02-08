import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {v4 as uuid} from 'uuid';
import {Product} from '../Product.model';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  initialState = [
    {Id: uuid(), Name: 'Milk', Description: 'country milk', Price: 3, Date: this.getCurrentDate()},
    {Id: uuid(), Name: 'Tea', Description: 'Black Tea', Price: 6, Date: this.getCurrentDate()},
    {Id: uuid(), Name: 'Coffee', Description: 'Black Coffee', Price: 12, Date: this.getCurrentDate()},
  ];

  private readonly sub = new BehaviorSubject<Product[]>(this.initialState);

  readonly products$ = this.sub.asObservable();


  // readonly completedTodos$ = this.products$.pipe(
  //   map(todos => todos.filter(todo => todo.isCompleted))
  // );
  // readonly uncompletedTodos$ = this.products$.pipe(
  //   map(todos => todos.filter(todo => !todo.isCompleted))
  // );

  private get products(): Product[] {
    console.log(this.sub.getValue());
    return this.sub.getValue();
  }


  private set products(val: Product[]) {
    this.sub.next(val);
  }

  addProduct(product) {
    this.products = [
      ...this.products,
      {Id: uuid(), Name: product.name, Description: product.description, Price: product.price, Date: this.getCurrentDate()}
    ];
  }

  removeTodo(id: string) {
    this.products = this.products.filter(product => product.Id !== id);
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

  editToDo(product) {
    const prod = this.products.find(el => el.Id === product.Id);

    if (prod) {
      const index = this.products.indexOf(prod);
      this.products[index] = {
        ...prod,
        Name: product.name, Description: product.description, Price: product.price
      };
      this.products = [...this.products];
    }
  }

  getCurrentDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  }

  constructor() {
  }
}
