import { EventEmitter } from '@angular/core';

export class SideBarToggler{
    
    topNavTogBtnClicked = new EventEmitter<boolean>();
    sideBarNavItemClicked = new EventEmitter<boolean>();
    
}