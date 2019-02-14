import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchMusic, SearchMusicService } from '../../allservices/searchMusic.service';
import { PlayingService } from '../../allservices/playing.service';
// import { mergeMap, catchError } from 'rxjs/operators';



@Component({
  selector: 'app-shsong',
  templateUrl: './shsong.component.html',
  styleUrls: ['./shsong.component.css']
})
export class ShsongComponent implements OnInit, OnDestroy {
  song: number = 1;
  unsub: any;
  searchSt = "";
  pageIndex: number = 0;

  searchMusics: SearchMusic[] = [];

  constructor(private searchMusicSer: SearchMusicService, private playingSer: PlayingService) { }

  ngOnInit() {

    this.unsub = this.searchMusicSer.searchEvent
      .subscribe((res) => {
        this.pageIndex = 0;
        this.searchSt = res;
        this.searchMusicSer.search(res)
          .subscribe(data => { this.searchMusics = data; this.song = this.searchMusicSer.songsCount })
      })
  }

  search(ref) {
    this.searchMusicSer.search(this.searchSt, ref * 30).subscribe(data => { this.searchMusics = []; this.searchMusics = data;; this.song = this.searchMusicSer.songsCount })
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

  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

}
