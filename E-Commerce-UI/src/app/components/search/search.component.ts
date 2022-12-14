import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  keyword!: string | any

  onSearchProducts() {

    console.log(this.keyword);

    this.router.navigateByUrl(`/home/search/${this.keyword}`)
    this.keyword = null

  }

}
