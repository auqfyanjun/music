import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../allservices/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  constructor( private albumServ : AlbumService) { }

  ngOnInit() {
    // this.albumServ.getAlbum().subscribe(res=>console.log("album::",res))
    // this.albumServ.getOneAlbum("").subscribe(res=>console.log("albumone::",res))
  }

}
