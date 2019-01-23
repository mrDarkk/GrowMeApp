import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gender } from '../models/business';

@Injectable({
  providedIn: 'root'
})
export class StaticresourcesService {
  private resourceCollection: AngularFirestoreCollection<any>;
  // private resources: Observable<any[]>;
  constructor(private angularFireStore: AngularFirestore) {
    this.resourceCollection = angularFireStore.collection<any>('Resources');

    // this.resources = this.resourceCollection.snapshotChanges().pipe(
    //   map(actions => {
    //     return actions.map(a => {
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc.id;
    //       return { id, ...data };
    //     });
    //   })
    // );

  }

  getResource(resource: string) {
    return this.resourceCollection.doc<Gender>(resource).valueChanges();
  }
}
