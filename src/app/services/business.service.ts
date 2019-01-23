import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Business } from '../models/business';
@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private businessCollection: AngularFirestoreCollection<Business>;
  private businesses: Observable<Business[]>;
  constructor(db: AngularFirestore) {
    this.businessCollection = db.collection<Business>('Businesses');

    this.businesses = this.businessCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getBusinesss() {
    return this.businessCollection.valueChanges();
  }

  getBusiness(id) {
    return this.businessCollection.doc<Business>(id).valueChanges();
  }

  updateBusiness(business: Business, id: string) {
    return this.businessCollection.doc(id).update(business);
  }

  addBusiness(business: Business) {
    return this.businessCollection.add(business);
  }

  removeBusiness(id) {
    return this.businessCollection.doc(id).delete();
  }
}