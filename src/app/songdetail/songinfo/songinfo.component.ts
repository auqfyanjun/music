import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchMusic } from '../../allservices/searchMusic.service';
import { PlayingService } from '../../allservices/playing.service';
import { CommonService } from '../../allservices/common.service';

@Component({
  selector: 'app-songinfo',
  templateUrl: './songinfo.component.html',
  styleUrls: ['./songinfo.component.css']
})
export class SonginfoComponent implements OnInit {

  safe: any = null;
  isShow: boolean = false;
  searchMusic: SearchMusic;
  id: string;
  constructor(private routeInfo: ActivatedRoute, private playingSer: PlayingService, private commonSer: CommonService) { }

  ngOnInit() {

    this.routeInfo.paramMap.subscribe(param => {
      // console.log("param",param);
      this.isShow = false;
      this.id = param["params"]["songid"];
      this.commonSer.commonSubject.next(this.id);
      this.playingSer.lrc(this.id).subscribe(res => this.safe = res);
      this.playingSer.songDetail(this.id).subscribe(res => this.searchMusic = res);
    })
  }

  showing() {
    this.isShow = !this.isShow;
  }

  playing(songIdRef) {
    if (songIdRef) {
      this.playingSer.setMusicSubject.next(songIdRef);
    }
  }



}
