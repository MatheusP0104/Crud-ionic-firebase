import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../services/crud.service';


@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.page.html',
  styleUrls: ['./update-todo.page.scss'],
})
export class UpdateTodoPage implements OnInit {
  editForm: FormGroup
  id: any

  constructor(
    private service: CrudService,
    private activateRoute: ActivatedRoute,
    private route: Router,
    public formBuilder : FormBuilder
  ) { 
    this.id = this.activateRoute.snapshot.paramMap.get('id')
    this.service.getTask(this.id).subscribe((data) => {
      this.editForm = this.formBuilder.group({
        title: [data['title']],
        descricao: [data['descricao']],
      })
    })
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      title: [''],
      descricao: ['']
    })
  }

  onSubmit() {
    this.service.update(this.id, this.editForm.value)
  }

}
