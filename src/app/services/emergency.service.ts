import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Emergency } from '../models/emergency.model';

@Injectable({ providedIn: 'root' })

export class EmegencyService {

    user = auth().currentUser;

    constructor(private authService: AuthService, private afs: AngularFirestore) { }

    sendEmergencyAlert(): Observable<Position> {
        return Observable.create(
            (observer) => {
                navigator.geolocation.getCurrentPosition((pos: Position) => {
                    let currentLongitude = pos.coords.longitude
                    let currentLatitude = pos.coords.latitude
                    let userId = this.user.uid
                    this.afs.collection<Emergency>('Trusted_Alert').add({
                        userId: userId,
                        userLongitude: currentLongitude.toString(),
                        userLatitude: currentLatitude.toString()
                    })
                }),
                {
                    enableHighAccuracy: true
                };
            });
    }
}