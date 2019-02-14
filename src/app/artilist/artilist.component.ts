import { Component, OnInit } from '@angular/core';
import { ArtService, SingerInfo } from '../allservices/art.service';

@Component({
  selector: 'app-artilist',
  templateUrl: './artilist.component.html',
  styleUrls: ['./artilist.component.css']
})
export class ArtilistComponent implements OnInit {

  constructor(private artSer:ArtService) { }

  ngOnInit() {
    // this.artSer.getHotSingerList();

  }

 

}


