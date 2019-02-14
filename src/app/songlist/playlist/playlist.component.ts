import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collection, AllplaylistService } from '../../allservices/allplaylist.service';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  totalPageNum: number = 0;
  pageIndex: number = 0;

  collection: Collection[] = [];
  selectShow: boolean = false;

  title: string = "";

  constructor(private routeInfo: ActivatedRoute, private AllplaylistSer: AllplaylistService) { }

  selectCatWindow() {
    this.selectShow = !this.selectShow;
    return false;
  }

  ngOnInit() {
    this.routeInfo.paramMap.subscribe(param => {
      // console.log(1)
      this.title = param["params"]["cattype"];
      //等待优化。浏览器刷新时候pageIndex应该是刷新前的，需要先缓存下来
      // this.pageIndex = 0;
      this.AllplaylistSer.getPlaylist(this.title).subscribe(res => { this.collection = res; this.totalPageNum = this.AllplaylistSer.totalList })
    })

  }
  //getPageIndex这个流需要和paramMap 这2个流需要合并。一个是参数一个是偏移量(页码)//等待优化
  getPageIndex(pageIndexRef: number) {
    // console.log(2)
    this.AllplaylistSer.getPlaylist(this.title, pageIndexRef * 35).subscribe(res => { this.collection = res; this.totalPageNum = this.AllplaylistSer.totalList })
  }

  trans() {
    return Math.ceil(this.totalPageNum / 35);
  }

}


