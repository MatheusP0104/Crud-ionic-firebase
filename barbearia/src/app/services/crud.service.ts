import { Injectable } from '@angular/core';
import { } from '@angular/fire/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


export class TODO{
  id: string;
  title: string;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firebase: AngularFirestore, private route: Router) { }
  
  create(todo: TODO) {
    return this.firebase.collection('tasks').add(todo);
  }

  getTasks() {
    return this.firebase.collection('tasks').snapshotChanges();
  }

  getTask(id) {
    return this.firebase.collection('tasks').doc(id).valueChanges();
  }

  update(id, todo: TODO) {
    this.firebase.collection('tasks').doc(id).update(todo).then(() => {
      this.route.navigate(['/list-todo']);
    }).catch((err) => console.log(err))
  }

  delete(id: string) {
    this.firebase.doc('tasks/' + id).delete();
  }
}
