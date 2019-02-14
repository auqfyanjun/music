import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../allservices/album.service';
import { InfoAndLists } from '../../allservices/allplaylist.service';
import { ActivatedRoute } from '@angular/router';

import { PlayingService } from '../../allservices/playing.service';
import { CommonService } from '../../allservices/common.service';
import { SearchMusic } from '../../allservices/searchMusic.service';
import { mergeMap } from 'rxjs/operators';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-albuminfo',
  templateUrl: './albuminfo.component.html',
  styleUrls: ['./albuminfo.component.css']
})
export class AlbuminfoComponent implements OnInit {

  id: string = "";
  infoAndLists: InfoAndLists = null;

  constructor(
    private albumSer: AlbumService,
    private routeInfo: ActivatedRoute,
    private playingSer: PlayingService,
    private commonSer: CommonService) { }

  ngOnInit() {

    this.routeInfo.paramMap.pipe(mergeMap(param => {
      this.id = param["params"]["id"];
      this.commonSer.commonSubject.next(this.id);
      return this.albumSer.getOneAlbum(this.id)
    })).subscribe(res => this.infoAndLists = res)

  }

  playingone(searchMusicRef: SearchMusic) {

    if (searchMusicRef) {
      this.playingSer.setMusicSubject.next(searchMusicRef);
    }
  }

  pushIds() {
    this.playingSer.pushArrayEvent.emit(this.infoAndLists.searchMusic);
    this.playingSer.setMusicSubject.next(this.infoAndLists.searchMusic[0]);
  }

}
