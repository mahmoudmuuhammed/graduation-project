import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FeedsService } from 'src/app/services/feeds.service';

@Component({
  selector: 'posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.scss']
})
export class PostsFilterComponent implements OnInit {

  Category: string = 'All';
  @ViewChild('filter') filter;

  constructor(private feedsService: FeedsService, private render: Renderer2) { }

  ngOnInit(): void {
    this.feedsService.filteredPostCategory.emit(this.Category);
  }

  postFilterSelection(event) {
    if (this.Category == event.target.value) return
    this.Category = event.target.value
    this.feedsService.filteredPostCategory.emit(this.Category);
  }
}
