import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  constructor(private loggingService: LoggingService, private angularFireStore: AngularFirestore, private authService: AuthService) {
    this.userCollection = this.angularFireStore.collection<User>("Users");
  }

  getUser(id) {
    return this.userCollection.doc<User>(id).valueChanges();
  }

  updateUser(user: User, id: string) {
    return this.userCollection.doc(id).update(user);
  }

  addUser(user: User) {
    var promise = new Promise((resolve, reject) => {
      var record = {};
      for (var attr in user) {
        this.loggingService.log(attr);
        if (user[attr] != undefined) {
          record[attr] = user[attr];
        }
      }
      this.authService.angularFireAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(user.Email, user.Password).then(data => {
        var id = data.user.uid;
        this.loggingService.log(data);
        resolve();
        this.userCollection.doc(id).set(record).catch(error => {
          this.loggingService.log(error);
          reject(error);
        })
      }).catch(error => {
        this.loggingService.log(error);
        reject(error);
      });
    });
    return promise;
  }

  removeTodo(id) {
    return this.userCollection.doc(id).delete();
  }
  logout() {
    this.authService.angularFireAuth.auth.signOut();
  }


}
