import { Component, OnInit } from '@angular/core';
import { SearchMusicService } from '../../allservices/searchMusic.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent implements OnInit {

  searchSt: string = "";

  constructor(private searchMusicSer: SearchMusicService, private router: Router) { }

  ngOnInit() {

  }

  notiedSearchMusicSer() {
    if (this.router.url !== "homes//musiclist/shsong") {
      this.router.navigate(['homes/musiclist/shsong']);
    }
    this.searchMusicSer.searchEvent.next(this.searchSt)
  }


}
