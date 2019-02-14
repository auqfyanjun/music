
import { mergeMap, map } from 'rxjs/operators';
// import "rxjs/add/operator/mergeMap"

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AllplaylistService, InfoAndLists, Collection } from '../../allservices/allplaylist.service';
import { PlayingService } from '../../allservices/playing.service';

import { SearchMusic } from '../../allservices/searchMusic.service';
import { CommonService } from '../../allservices/common.service';
@Component({
  selector: 'app-detailbyid',
  templateUrl: './detailbyid.component.html',
  styleUrls: ['./detailbyid.component.css']
})
export class DetailbyidComponent implements OnInit {
  collection: Collection = null;
  searchMusics: SearchMusic[] = [];
  isShow: boolean = false;
  constructor(private routeInfo: ActivatedRoute, private AllplaylistSer: AllplaylistService, private playingSer: PlayingService, private commonSer: CommonService) { }

  ngOnInit() {
    this.routeInfo.paramMap.pipe(mergeMap(param => {
      this.isShow = false;
      let id = param["params"]["id"];
      this.commonSer.commonSubject.next(id);
      return this.AllplaylistSer.getPlayById(id)
    })).subscribe(res => {
      this.collection = res["col"];
      this.searchMusics = res["list"];
    });
  }

  playingone(searchMusicRef: SearchMusic) {
    if (searchMusicRef) {
      this.playingSer.setMusicSubject.next(searchMusicRef);
    }
  }
  pushIds() {
    this.playingSer.pushArrayEvent.emit(this.searchMusics);
    this.playingSer.setMusicSubject.next(this.searchMusics[0]);
  }

  showing() {
    this.isShow = !this.isShow;
  }

}
