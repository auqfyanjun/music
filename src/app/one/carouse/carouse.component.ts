import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AllplaylistService, Banner } from '../../allservices/allplaylist.service';

@Component({
  selector: 'app-carouse',
  templateUrl: './carouse.component.html',
  styleUrls: ['./carouse.component.css']
})
export class CarouseComponent implements OnInit, OnDestroy {
  MAXNUM = 9;
  banners: Banner[] = [];
  backgroundUrl: string = "";
  cindex = 0;
  dotList = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  //动画的定时器
  timerA;
  timerB;
  //轮播图图片的透明度。动画就是不断修改这个值来完成
  myOpacity = 1;

  constructor(private allplaylistSer: AllplaylistService) { }

  ngOnInit() {
    this.clearAll();
    this.allplaylistSer.getBanners().subscribe(res => { this.banners = res; this.changeBg(this.cindex) });
  }

  preNext(preOrNextNum: number) {
    if (this.cindex + preOrNextNum > this.MAXNUM - 1) {
      this.cindex = 0;
    } else if (this.cindex + preOrNextNum < 0) {
      this.cindex = this.MAXNUM - 1;
    } else {
      this.cindex = this.cindex + preOrNextNum;
    }

    this.changeBg(this.cindex)
  }

  changeBg(indexRef) {
    this.cindex = indexRef;
    this.backgroundUrl = `url(${this.banners[indexRef].backgroundUrl}) repeat-x`;
    return false;
  }

  start() {
    console.log("开始动画");
    this.clearAll();
    this.timerA = setInterval(() => {
      this.myanimation();
    }, 4000)
  }
  stop() {
    console.log("停止动画")
    this.clearAll();
  }
  
  clearAll() {
    this.myOpacity = 1;
    clearInterval(this.timerA);
    clearTimeout(this.timerB);
  }

  myanimation() {
    clearTimeout(this.timerB);
    this.myOpacity = 0.2
    this.timerB = setTimeout(() => {
      this.cindex++;
      this.cindex = this.cindex % this.MAXNUM;
      this.myOpacity = 1;
      this.changeBg(this.cindex)
    }, 1000)
  }

  ngOnDestroy() {
    this.stop();
  }

  @HostListener("window:load")
  preLoadImgAndAnima() {
    if (!this.timerA) {
      this.start();
    }
    for (let i = 0; i < this.MAXNUM - 1; i++) {
      let img = new Image();
      img['src'] = this.banners[i]['picUrl'];
      img['src'] = this.banners[i]['backgroundUrl']
    }
  }
}