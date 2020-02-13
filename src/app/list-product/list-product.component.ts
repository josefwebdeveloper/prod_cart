import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {StateService} from '../services/state.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Product} from '../Product.model';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['image', 'name', 'description', 'price', 'date', 'control'];
  dataSource: MatTableDataSource<Product>;
  subProd: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public stateService: StateService) {
  }

  ngOnInit(): void {
    this.subProd = this.stateService.products$.subscribe(data => {
      console.log(data);
      if (data) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);

      }

    });

  }

  emitEditProduct(product: Product) {
    this.stateService.emitProduct(product);
    this.stateService.switch(true);
  }

  deleteProduct(id) {
    if (id) {
      this.stateService.removeProd(id);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    if (this.subProd) {
      this.subProd.unsubscribe();
    }
  }
}
