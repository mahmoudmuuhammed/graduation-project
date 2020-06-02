import { Component, OnInit } from '@angular/core';
import { FeedsService } from 'src/app/services/feeds.service';

@Component({
  selector: 'posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.scss']
})
export class PostsFilterComponent implements OnInit {
  Category: string = 'All';

  constructor(private feddsService: FeedsService) { }

  ngOnInit(): void {
    this.feddsService.filteredPostCategory.emit(this.Category);
  }

  postFilterSelection(event) {
    this.Category = event.target.value
    this.feddsService.filteredPostCategory.emit(this.Category);
  }
}
