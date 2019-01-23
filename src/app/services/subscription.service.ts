import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subscription } from '../models/subscription';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private subscriptionCollection: AngularFirestoreCollection<Subscription>;
  constructor(private angularFireStore: AngularFirestore, private authService: AuthService) {
    this.subscriptionCollection = this.angularFireStore.collection<Subscription>("Subscriptions");
  }
  getSubscription(id) {
    return this.subscriptionCollection.doc<Subscription>(id).valueChanges();
  }

  update(id: string, subscription: Subscription) {
    return this.subscriptionCollection.doc(id).update(subscription);
  }
  create(subscription: Subscription) {
    return this.subscriptionCollection.add(subscription);
  }

  getPersonalSubscription() {
    return this.angularFireStore.collection<Subscription>("Subscriptions", ref => ref.where('By', '==', this.authService.angularFireAuth.auth.currentUser.uid)).valueChanges();
  }



}
