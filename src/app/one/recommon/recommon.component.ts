import { Component, OnInit } from '@angular/core';
import { flyIn } from '../../share/allAnimations';


@Component({
  selector: 'app-recommon',
  templateUrl: './recommon.component.html',
  styleUrls: ['./recommon.component.css'],
  animations: [flyIn]
})
export class RecommonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
