import { Component, OnInit } from '@angular/core';
import { SingerInfo, ArtService } from '../../../allservices/art.service';

@Component({
  selector: 'app-oursinger',
  templateUrl: './oursinger.component.html',
  styleUrls: ['./oursinger.component.css']
})
export class OursingerComponent implements OnInit {
  singerInfo: SingerInfo[] = [];
  constructor(private artSer:ArtService) { }

  ngOnInit() {
    this.artSer.getSingerList("5001",0,60).subscribe(res=>this.singerInfo = res )
  }

}
