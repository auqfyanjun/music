import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SearchMusic } from '../../../allservices/searchMusic.service';
import { ArtService } from '../../../allservices/art.service';
import { PlayingService } from '../../../allservices/playing.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-top50',
  templateUrl: './top50.component.html',
  styleUrls: ['./top50.component.css']
})
export class Top50Component implements OnInit {

  searchMusic: SearchMusic[] = [];

  constructor(private artSer: ArtService, private playingSer: PlayingService,private routerInfo: ActivatedRoute) { }

  ngOnInit() {
    this.artSer.getTop().subscribe(res => this.searchMusic = res.searchMusic)
  }

  playingone(searchMusicRef: SearchMusic) {

    if (searchMusicRef) {
      this.playingSer.setMusicSubject.next(searchMusicRef);
    }
  }

  pushIds() {
    this.playingSer.pushArrayEvent.emit(this.searchMusic);
    this.playingSer.setMusicSubject.next(this.searchMusic[0]);
  }



}






