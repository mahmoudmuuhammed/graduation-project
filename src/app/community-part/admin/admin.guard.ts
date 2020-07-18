// import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, UrlTree, ActivatedRoute } from '@angular/router';
// import { Injectable } from "@angular/core";
// import { Observable } from 'rxjs';
// import { map, take } from 'rxjs/operators';
// import { AuthService } from 'src/app/services/auth.service';
// import { FirestoreService } from 'src/app/services/firestore.service';

// @Injectable({ providedIn: 'root' })

// export class AdminGuard implements CanActivate {
//     constructor(private authService: AuthService,
//         private router: Router,
//         private firestoreService: FirestoreService) { }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
//         boolean |
//         UrlTree |
//         Promise<boolean | UrlTree> |
//         Observable<boolean | UrlTree> {
//         return this.authService.currentUser.pipe(map(user => {
//             this.firestoreService.getUser(user.uid).pipe(map(user => {
//                 if (user.uid == route.params.id) {
//                     return true
//                 }
//                 else {
//                     return this.router.createUrlTree([`/community/Profile/${route.params.id}`]);
//                 }
//             }))
//         }))


//     }
// }