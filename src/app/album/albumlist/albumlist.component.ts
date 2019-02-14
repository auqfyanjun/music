import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumService, OneAlbum } from '../../allservices/album.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-albumlist',
  templateUrl: './albumlist.component.html',
  styleUrls: ['./albumlist.component.css']
})
export class AlbumlistComponent implements OnInit, OnDestroy {
  unsubsribe: any;
  albums: OneAlbum[] = [];
  albumTotal: number = 0;
  pageIndex: number = 0;
  area: string = "";
  // pageIndex: number = 0;
  itemsPerPage: number = 35;
  
  constructor(private albumSer: AlbumService,
    private routeInfo: ActivatedRoute) { }

  ngOnInit() {
    // console.log("ngOnInit")
    this.getdata(this.pageIndex);

  }

  ngOnDestroy() {
    // this.unsubsribe.unsubsribe();
  }

  getdata(pageIndexRef) {

    this.routeInfo.paramMap.subscribe(param => {
      this.pageIndex = 0;
      this.area = param["params"]["area"];
      this.albumSer.getAlbum(this.area, pageIndexRef * this.itemsPerPage).subscribe(res => {
        this.albumTotal = this.trans(this.albumSer.totalAl);
        this.albums = [];
        this.albums = res;
      })
    })
  }

  searchx(pageIndexRef) {
    //绑定分页组件索引改变事件，
    this.pageIndex = pageIndexRef;
    this.albumSer.getAlbum(this.area, pageIndexRef * this.itemsPerPage).subscribe(res => {
      this.albums = [];
      this.albums = res;
    })
  }

  trans(albumTotalRef) {
    //转换为总共有多页，并传递给分页组件
    return Math.ceil(albumTotalRef / this.itemsPerPage)
  }

}

