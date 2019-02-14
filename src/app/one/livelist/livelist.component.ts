
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livelist',
  templateUrl: './livelist.component.html',
  styleUrls: ['./livelist.component.css']
})
export class LivelistComponent implements OnInit {
  liveList = []
  constructor() { }

  ngOnInit() {
  }

}
