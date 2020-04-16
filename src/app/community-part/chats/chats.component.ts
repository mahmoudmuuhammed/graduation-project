import { Component, ElementRef, Renderer2, ViewEncapsulation, HostBinding } from '@angular/core';
import { messaging } from 'firebase';
import { formatDate } from '@angular/common';

@Component({
  selector: 'chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Chats {
  pivateMessages;
  message: string;
  messageDiv;
  messageTime;

  lastPeople = [
    { name: 'Adel Ahmed', imgSrc: '../../../assets/images/adel.jpg', lastMsgTime: '2m' },
    { name: 'Mohamed Mahmod', imgSrc: '../../../assets/images/mody.jpg', lastMsgTime: '50m' },
    { name: 'Mahmod Mohamed', imgSrc: '../../../assets/images/dod.jpg', lastMsgTime: '2h' },
    { name: 'Ahmed Medra', imgSrc: '../../../assets/images/medra.jpg', lastMsgTime: '8h' }
  ]

  constructor(private renderer: Renderer2, private el: ElementRef) { }


  //viewing contact mssages Area
  ShowUserMsgs(event) {
    //for messages area
    var pivateMessages = document.querySelector('.pivateMessages');
    var inputMessages = document.querySelector('.messageInputDivCont');
    this.renderer.setStyle(pivateMessages, 'background', 'transparent')
    this.renderer.setStyle(inputMessages, 'display', 'block')
    //for active class
    var userMainDiv = document.querySelectorAll('.userMainDiv')
    userMainDiv.forEach(element => { this.renderer.removeClass(element, 'active') });
    if (event.target.classList.contains('userMainDiv')) { this.renderer.addClass(event.target, 'active') }
    else { this.renderer.addClass(event.target.parentElement, 'active') }
  }

  //sending message Area
  sendMessage() {
    this.message = this.el.nativeElement.querySelector('.inputText').value.trim()
    if (this.message != "") {
      this.messageTime = Date.now()
      this.messageTime = formatDate(this.messageTime, 'hh:mm a', 'en-US')
      this.pivateMessages = this.el.nativeElement.querySelector('.pivateMessages');
      this.messageDiv = this.renderer.createElement('div');
      this.messageDiv.classList.add('currentUserChat');
      this.messageDiv.innerHTML = "<div class='msgDiv animated fadeIn'><span class='msgTime'>" + this.messageTime + "</span> <span class='msgContent'>" + this.message + "</span></div>"
      this.renderer.appendChild(this.pivateMessages, this.messageDiv)
      this.el.nativeElement.querySelector('.inputText').value = ""
      this.el.nativeElement.querySelector('.inputText').focus();
      this.pivateMessages.scrollTop = this.pivateMessages.scrollHeight
    }
  }
  sendMessageViaEnter(event) {
    if (event.keyCode === 13) {
      this.sendMessage()
    }
  }

}
