import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';
import { mergeMap, catchError} from 'rxjs/operators';
import { SearchMusic } from './../../allservices/searchMusic.service';

import { BillboardList, BillboardService } from '../../allservices/billboard.service';
import { PlayingService } from '../../allservices/playing.service';
import { CommonService } from '../../allservices/common.service';


@Component({
  selector: 'app-boardplaylist',
  templateUrl: './boardplaylist.component.html',
  styleUrls: ['./boardplaylist.component.css']
})
export class BoardplaylistComponent implements OnInit {

  billboardList: BillboardList;
  id: string;

  constructor(private routeInfo: ActivatedRoute,
    private billboardSer: BillboardService,
    private playingSer: PlayingService,
    private commonSer: CommonService) { }

  ngOnInit() {
    this.routeInfo.paramMap.pipe(mergeMap(param => {
      this.id = param["params"]["boardTypeId"];
      this.commonSer.commonSubject.next(this.id);
      return this.billboardSer.topList(this.id).pipe(catchError(this.handleErr)) 
    })).subscribe(res => this.billboardList = res,err=>console.log("发生错误:",err))
  }
  
  handleErr(err){
    console.log("err:",err);
    return of(null)
  }
  
  playingone(searchMusicRef: SearchMusic) {

    if (searchMusicRef) {
      this.playingSer.setMusicSubject.next(searchMusicRef);
    }
  }

  pushIds() {
    this.playingSer.pushArrayEvent.emit(this.billboardList.searchMusicS);
    this.playingSer.setMusicSubject.next(this.billboardList.searchMusicS[0]);
  }
}
