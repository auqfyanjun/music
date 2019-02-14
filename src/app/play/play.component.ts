import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
// import { mergeMap, map, switchMap } from 'rxjs/operators';
import { SearchMusic } from './../allservices/searchMusic.service';
import { PlayingService } from './../allservices/playing.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
//假如正在播放，切换到了版权歌曲。URL为空，此时还是会正常播放、、、、、歌曲信息错误。。
export class PlayComponent implements OnInit {
  //资源加载是否完成,之前是不能点击播放暂停的
  boolLoad: boolean = false;
  isCanPlaying: boolean = false;
  @ViewChild("myaudio") myaudio: ElementRef;
  //某一首歌曲的详细信息
  musicInfo: SearchMusic;
  //播放歌曲列表
  searchMusic: SearchMusic[] = [];
  //播放歌曲的地址
  songUrl: string = "";
  //播放歌曲的索引
  currentIndex: number = -1;

  //是否处于拖拽状态
  isdrag: boolean = false;

  //两个进度条总长度
  totalProWidth: number = 493;
  //这个是垂直放置的
  totalProVolHeight: number = 74;

  //两个进度条对应的值
  srcTotalV: number = 1;
  srcTotalM: number;

  //传递给进度条的值，经过比例变化的
  scalVProLine: number;
  scalMProLine: number = 0;

  //传递给进度条的原始值，没有经过比例变化的
  proVolume: number = 0.5;
  proCurrrTime: number = 0;

  //两个进度条的拉伸系数
  scalV: number = 0;
  scalM: number = 0;

  innerText1: string = "00:00";
  innerText2: string = "00:00";

  //当前播放进度
  constructor(private playingSer: PlayingService) { }

  ngOnInit() {
    //两个比例系数，声音的和播放音乐进度的
    this.scalV = this.totalProVolHeight / this.srcTotalV
    ////由于音乐文件的总长度需要等到资源加载才能获取 所以换地方初始化拉伸系数:scalM
    this.scalVProLine = this.proVolume * this.scalV;
    //////////////////////////////订阅其他页面传递过来的歌曲列表信息/////////////////// 
    this.playingSer.pushArrayEvent.subscribe(res => { this.searchMusic = []; this.searchMusic = res; this.currentIndex = 0 });

    // //////////////////////////////请求歌曲播放地址////////////////////////////////////
    this.playingSer.setMusicSubject.subscribe(res => this.getMusicUrl(res).subscribe(res => {
      if (!res) {
        //this.currentIndex++;
        // alert("VIP歌曲"); this.currentIndex++;
      } else {
        this.songUrl = res
      }
    }))
  }

  getMusicUrl(paramRef) {
    //初始化，没有数据
    if (!paramRef) {
      return observableOf(null);
    }
    //页面推送数据过来
    this.musicInfo = paramRef;
    //indexof无法判断复合对象是否在数组里面，需要借助ID，ID是唯一的
    if (this.searchMusic.length != 0) {
      //检查给定对象是否在数组里面
      let len = this.searchMusic.length;
      let find = false;
      for (let i = 0; i < len; i++) {
        if (this.searchMusic[i]["songId"] === this.musicInfo["songId"]) {
          // console.log("存在");
          find = true;
          this.currentIndex = i;
          break;
        }
      }
      if (!find) {
        this.searchMusic.push(paramRef);
        this.currentIndex = this.searchMusic.length - 1;
      }

    } else {
      // console.log("数组长度为0直接push");
      this.searchMusic.push(paramRef);
      this.currentIndex = this.searchMusic.length - 1;
    }
    // console.log("currentIndex::", this.currentIndex, "searchMusic::", this.searchMusic, "musicInfo::", this.musicInfo)
    return this.playingSer.playing(this.searchMusic[this.currentIndex]["songId"])
  }

  endedChange() {
    this.currentIndex = this.canRockPlay(this.currentIndex, "+")
    this.playingSer.setMusicSubject.next(this.searchMusic[this.currentIndex]);
  }

  myDurationchange(e) {
    this.proCurrrTime = 0;
    this.myaudio.nativeElement.currentTime = 0;
    this.innerText2 = this.timeFormat(0);

    this.srcTotalM = this.myaudio.nativeElement.duration;
    this.scalM = this.totalProWidth / this.srcTotalM
    this.innerText2 = this.timeFormat(this.srcTotalM);
  }

  canplay1(e) {
    // console.log("canplay1");
    this.isCanPlaying = true;
    this.boolLoad = true;
    this.myaudio.nativeElement.play();

    this.proCurrrTime = this.myaudio.nativeElement.currentTime;
    this.scalMProLine = this.proCurrrTime * this.scalM;
  }

  isdragFunc(e) {
    this.isdrag = e;
  }

  timeupdate1(e) {
    //拖拽状态下阻止timeupdate1事件触发。。不然2者都会修改myaudio.nativeElement.currentTime
    if (this.isdrag) return;
    // console.log("播放时间刷新事件");
    this.proCurrrTime = this.myaudio.nativeElement.currentTime;
    this.scalMProLine = this.proCurrrTime * this.scalM;
    this.innerText1 = this.timeFormat(this.proCurrrTime);
  }

  proMusicChange(e) {
    if (this.myaudio.nativeElement) {
      this.myaudio.nativeElement.currentTime = e / this.scalM;
    }
  }

  proVolumeChange(e) {
    this.proVolume = (this.totalProVolHeight - e) / this.scalV;
  }

  playOrPause() {
    //取反
    this.isCanPlaying = !this.isCanPlaying;
    //资源没有加载完成则不切换播放和暂停，只切换按钮的样式
    if (!this.boolLoad) return false;

    let flag = this.myaudio.nativeElement.paused;
    if (flag) {
      this.isCanPlaying = true;
      this.myaudio.nativeElement.play();
    } else {
      this.isCanPlaying = false;
      this.myaudio.nativeElement.pause();
    }
    return false;
  }

  playx(sorx: string) {
    this.currentIndex = this.canRockPlay(this.currentIndex, sorx);
    this.playingSer.setMusicSubject.next(this.searchMusic[this.currentIndex]);
    return false;
  }

  timeFormat(timeRef: number) {

    let tempMin = Math.floor(timeRef / 60);
    let tempSec = Math.floor(timeRef % 60);

    let curMin = tempMin < 10 ? ('0' + tempMin) : tempMin;
    let curSec = tempSec < 10 ? ('0' + tempSec) : tempSec;

    return curMin + ':' + curSec;
  }

  canRockPlay(indexRef: number, uporsupRef: string): number {
    // console.log("indexRef",indexRef);
    // console.log("uporsupRef",uporsupRef);
    let suan: number = 1;

    if (uporsupRef === "+") {
      if (indexRef + 1 > this.searchMusic.length - 1)
        return 0;
    }
    if (uporsupRef === "-") {
      if (indexRef - 1 < 0)
        return this.searchMusic.length - 1;
      else {
        suan = - 1;
      }
    }
    return indexRef + suan;
  }

  @HostListener("window:unload")
  setPlayList() {
    localStorage.setItem("playlist", JSON.stringify(this.searchMusic));
    localStorage.setItem("currentIndex", "" + this.currentIndex);
  }

  @HostListener("window:load")
  getPlayList() {
    this.searchMusic = JSON.parse(localStorage.getItem("playlist")) || [];
    this.currentIndex = +localStorage.getItem("currentIndex") || 0;
    this.playingSer.setMusicSubject.next(this.searchMusic[this.currentIndex]);
  }

}
