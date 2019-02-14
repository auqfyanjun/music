import { Component, OnInit } from '@angular/core';
import { SingerInfo, ArtService } from '../../../allservices/art.service';

@Component({
  selector: 'app-sug',
  templateUrl: './sug.component.html',
  styleUrls: ['./sug.component.css']
})
export class SugComponent implements OnInit {

  singerInfo1: SingerInfo[] = [];
  singerInfo2: SingerInfo[] = [];
  
  constructor(private artSer:ArtService) { }

  ngOnInit() {
    this.artSer.getSingerList("5001").subscribe(res=>this.singerInfo1 = res )
    this.artSer.getHotSingerList().subscribe(res=>this.singerInfo2 = res )
  }

}
