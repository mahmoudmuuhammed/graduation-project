import { Component, ViewChild, ElementRef, EventEmitter, Output,Input } from '@angular/core';

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  postCategoyString: string = null;
  public imagePath;
  imgURL: any;
  @ViewChild('postingOuterDiv') outerDiv: ElementRef;
  @Output() closeDivEmit = new EventEmitter();
  @Input()currentDate;

  closePosting() {
    this.closeDivEmit.emit();
  }

  postCategory(event) {
    this.postCategoyString = event.target.innerText;
  }
  deleteCategory() {
    this.postCategoyString = null
  }

  preview(files) {
    if (files.length === 0)
      return;

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}
