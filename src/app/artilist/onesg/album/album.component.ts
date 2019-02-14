import { Component, OnInit } from '@angular/core';
import { ArtAlbumInfo, ArtService } from '../../../allservices/art.service';
import { PlayingService } from '../../../allservices/playing.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  albums :ArtAlbumInfo[] = [] ;
  
  constructor(private artSer: ArtService,private playingSer: PlayingService) { }

  ngOnInit() {
    this.artSer.getAlbun().subscribe(res=> this.albums = res )
  }

}
