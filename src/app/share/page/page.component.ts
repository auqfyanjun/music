import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

   //按钮的总是是奇数,对称
   BTNNUM: number = 9;
   CHANGEINDEX = (this.BTNNUM + 1) / 2;
   btnTextArr: number[] = [];
  //当前页,注意数组的索引从0开始
  @Input() pageIndex: number = 1;
  //输出当前页
  @Output() pageIndexEvent: EventEmitter<number> = new EventEmitter<number>();
  //总页数
  pageTotal: number = 0;
  @Input() set pageTotalInput(total: number) {
    //每次更新总页数说明有新的数据,则重置.浏览器刷新也会触发，。会丢失当前页码
    // console.log("xianhaishou",total)
    this.pageTotal = total;
    // this.pageIndex = 1;
    this.init();
  }
  constructor() { }

  ngOnInit() {
    // console.log("init")
  }
  //初始化数组。最多渲染BTNNUM个按钮，最少渲染pageTotal个
  init() {
    this.btnTextArr = [];
    // console.log("传递进来的pageTotal",this.pageTotal)
    //分页数量大于等于BTNNUM.
    if (this.pageTotal >= this.BTNNUM) {
      //一旦初始化,第一和最后一位都是固定。
      this.btnTextArr[0] = 1;
      this.btnTextArr[this.BTNNUM - 1] = this.pageTotal;
      //初始化中间 BTNNUM-2 个 的值
      this.changeBtnTextArr(this.pageIndex);
      return;
    }
    //分页数量小于BTNNUM.
    for (let i = 1; i <= this.pageTotal; ++i) {
      this.btnTextArr[i - 1] = i;
    }
  }

  //根据索引动态修改按钮的文本
  change(indexRef: number) {
    //点击按钮修改pageIndex，在根据这个值更新按钮文本
    this.pageIndex = indexRef;
    this.emitPageIndex();
    //分页数量小于总页数，则没有动态修改按钮文本的必要
    if (this.pageTotal < this.BTNNUM) return;
    this.changeBtnTextArr(this.pageIndex);
  }

  changeBtnTextArr(pageIndexRef: number) {
    //每次pageIndexRef 或 pageTotal 变化 都要 执行此函数。 
    //注意数组索引值从0开始。按钮文本从1开始。
    //pageIndex > pageTotal-5 按钮上的文本固定 1... 10-17
    if (pageIndexRef <= this.CHANGEINDEX) {
      for (let i = 1; i < this.BTNNUM - 1; i++) {
        this.btnTextArr[i] = i + 1;
      }
    }
    if (pageIndexRef > this.CHANGEINDEX && pageIndexRef <= this.pageTotal - this.CHANGEINDEX) {
      for (let i = 1; i < this.BTNNUM - 1; i++) {
        this.btnTextArr[i] = this.pageIndex - this.CHANGEINDEX + i + 1;
      }
    }
    if (pageIndexRef > this.pageTotal - this.CHANGEINDEX) {
      for (let i = 1; i < this.BTNNUM - 1; i++) {
        this.btnTextArr[i] = this.pageTotal - this.BTNNUM + i + 1;
      }
    }
  }
  //看按钮两边的省略号。。。是否显示
  canSHow(domIndex: number, target: string): boolean {
    if (this.pageTotal < this.BTNNUM) {
      return false;
    }
    if (target === "first") {
      return this.pageIndex > this.CHANGEINDEX && domIndex === 1
    }
    if (target === "end") {
      return this.pageIndex < (this.pageTotal - this.CHANGEINDEX + 1) && domIndex === (this.BTNNUM - 2)
    }
  }

  pre() {
    if (this.pageIndex === 1) return;
    this.pageIndex--;
    //改变当前page值就要修改数组，发送新的page值
    this.change(this.pageIndex);
  }

  next() {
    if (this.pageIndex >= this.pageTotal) return;
    //改变当前page值就要修改数组，发送新的page值
    this.pageIndex++;
    this.change(this.pageIndex);
  }

  emitPageIndex() {
    //服务器分页从0开始
    // console.log("发送的数据，，",this.pageIndex-1)
    this.pageIndexEvent.emit(this.pageIndex - 1)
  }

  @HostListener("window:unload")
  setPlayList() {
    console.log("组件被销毁缓存的pageIndex是:", this.pageIndex)
    localStorage.setItem("pageIndex", "" + this.pageIndex)
  }

  @HostListener("window:load")
  getPlayList() {
    // //刷新浏览器的时候去本地获取缓存的页码
    // this.pageIndex = (+localStorage.getItem("pageIndex")) || 1;
    // console.log("我初始化获得的pageIndex::", this.pageIndex)
    // //把页码发送出去
    // this.emitPageIndex();
    console.log("window:load获取的页码是:", localStorage.getItem("pageIndex"))
  }

}
