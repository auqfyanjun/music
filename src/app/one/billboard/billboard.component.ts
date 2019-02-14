
import { Component, OnInit, Input } from '@angular/core';
import { BillboardService, BillboardList } from '../../allservices/billboard.service';
import { PlayingService } from '../../allservices/playing.service';
import { SearchMusic } from '../../allservices/searchMusic.service';


@Component({
  selector: 'app-billboard',
  templateUrl: './billboard.component.html',
  styleUrls: ['./billboard.component.css']
})
export class BillboardComponent implements OnInit {

  //区分榜单类型，默认是新歌榜
  @Input() id: string = "";
  @Input() title: string = "";
  count: number = 10;

  billboardPlayList: BillboardList;
  constructor(private billboardSer: BillboardService, private playingSer: PlayingService) { }

  ngOnInit() {
    this.billboardSer.topList(this.id, this.count).subscribe(res => this.billboardPlayList = res);
  }

  playingone(searchMusicRef: SearchMusic) {

    if (searchMusicRef) {
      // console.log("我推送数据:",searchMusicRef) 
      this.playingSer.setMusicSubject.next(searchMusicRef);
    }

  }
  pushIds() {

    this.billboardSer.topList(this.id).subscribe(res => {
      this.playingSer.pushArrayEvent.emit(res["searchMusicS"]);
      this.playingSer.setMusicSubject.next(res["searchMusicS"][0]);
    });
    return false;
  }

}














