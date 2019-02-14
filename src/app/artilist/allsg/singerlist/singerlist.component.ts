import { Component, OnInit, Input } from '@angular/core';
import { SingerInfo, ArtService } from '../../../allservices/art.service';
import { Output } from '@angular/core';

@Component({
  selector: 'app-singerlist',
  templateUrl: './singerlist.component.html',
  styleUrls: ['./singerlist.component.css']
})
export class SingerlistComponent implements OnInit {
 
  @Input() singerInfo: SingerInfo[] = [];
 
  @Input() hasBotModel :boolean = true;
  @Input() showMore :boolean = false;

  @Input() barTitle: string = "";

  @Output() barTitle1: string = "";
  constructor() { }

  ngOnInit() {
 
  }

 

}
