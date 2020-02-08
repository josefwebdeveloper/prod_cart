import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StateService} from '../services/state.service';

@Component({
  selector: 'app-list-to-do',
  templateUrl: './list-to-do.component.html',
  styleUrls: ['./list-to-do.component.scss']
})
export class ListToDoComponent implements OnInit {
  @ViewChild('todoTitleInput', {static: false}) todoTitleInput: ElementRef;

  // optimization, rerenders only todos that change instead of the entire list of todos
  todosTrackFn = (i, todo) => todo.id;


  constructor(public stateService: StateService) {
  }

  ngOnInit() {
  }

  setToDo(id, isComplete) {
    console.log(id, isComplete);
    this.stateService.setCompleted(id, isComplete);
  }

  onAddTodo(title: string) {
    this.stateService.addTodo(title);
    this.todoTitleInput.nativeElement.value = '';
  }

}
