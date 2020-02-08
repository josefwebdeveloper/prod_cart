import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Todo} from '../Product.model';
import {StateService} from '../services/state.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @ViewChild('todoEditInput', {static: false}) todoEditInput: ElementRef;
  @Input() todo: Todo;
  @Output() complete = new EventEmitter<boolean>();
  @Output() remove = new EventEmitter<string>();
  isEdit = false;

  constructor(private stateService: StateService) {
  }

  ngOnInit() {
  }

  toEdit() {
    this.isEdit = !this.isEdit;
  }

  editToDo(id, title) {
    console.log(id, title);
    this.stateService.editToDo(id, title);
    this.isEdit = !this.isEdit;
    this.todoEditInput.nativeElement.value = '';
  }

  isComplete(e) {
    this.complete.emit(e.target.checked);
  }
}
