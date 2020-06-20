import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, UrlTree, ActivatedRoute } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({ providedIn: 'root' })

export class EditGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean |
        UrlTree |
        Promise<boolean | UrlTree> |
        Observable<boolean | UrlTree> {
        return this.authService.currentUser.pipe(map(user => {
            if (user.uid == route.params.id) {
                return true
            }
            else {
                return this.router.createUrlTree([`/community/Profile/${route.params.id}`]);
            }
        }))
    }
}