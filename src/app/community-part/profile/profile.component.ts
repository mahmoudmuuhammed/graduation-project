import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class Profile implements OnInit {
  user={type:'1',name:"Moemen Said",gender:'Male',location:'Egypt, Alexandria',email:'moemen.said@yahoo.com',phone:'002123456789',noOfPosts:'222',noOfComments:'556'}
  constructor() { }
  
  ngOnInit(): void {
  }

}
