import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud.service';



@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
})
export class CreateTodoPage implements OnInit {
  todoForm : FormGroup

  constructor(
    private service: CrudService,
    public formBuilder: FormBuilder,
    private route : Router
  ) { }

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: [''],
      descricao: ['']
    })
  }

  onSubmit() {
    if (!this.todoForm.valid) {
      return false
    } else {
      this.service.create(this.todoForm.value).then(() => {
        this.todoForm.reset();
        this.route.navigate(['/list-todo'])
      }).catch((err) => console.log(err))
    }
  }

}
