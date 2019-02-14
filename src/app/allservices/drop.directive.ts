
import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil, map, concatMap} from 'rxjs/operators';
@Directive({
  selector: '[appDrop]'
})
export class DropDirective implements OnInit {
  //拖拽元素出现的时候是否允许滚动，待优化(模态框出现的时候不允许滚动)
  //产生拖到元素的class名称，避免在当前组件有同名类名。默认是指令附加的元素
  //不能移动超过相对定位元素的区域
  private maxWidth:  number;
  private maxHeight: number;
  //滚动尺寸
  private scrollX:  number = 0;
  private scrollY: number = 0;

  @Input() targetClassName: string;
  //移动模式。默认双向 ,'x' x方向移动 ,'y' y方向移动
  @Input() xoryMode: string = 'all';
  constructor(private el: ElementRef) { }
  ngOnInit() {
    this.el.nativeElement.style.position = "absolute";
    //指令所附加的元素就是需要拖到的元素，可以触发拖动的元素可能是它自己或者它的子元素(可拖动元素的一小块区域类似标题栏区域)
    let target = this.el.nativeElement.querySelector(`.${this.targetClassName}`) || this.el.nativeElement;

    let mousedown$ = fromEvent(target, "mousedown").pipe(map(event => this.getDownPos(event, this.el.nativeElement)))
    let mousemove$ = fromEvent(window, "mousemove");
    let mouseup$ = fromEvent(window, "mouseup");

    //将移动的流转化为只要mouseup$发出数据就停止的流
    let moveuntilDown = mousemove$.pipe(map(event => {
      event.stopPropagation();
      event.preventDefault();
      return event;
    })).pipe(takeUntil(mouseup$));
    //新的点击流和移动的流 concat
    mousedown$.pipe(concatMap(downPos => moveuntilDown.pipe(map(event => { 
      return this.upMovePos(downPos, event) 
    })))).subscribe(pos => this.change(pos));
  }

  getDownPos(downEve: any, elNativeElement: any) {
    //每次点击获取拖动元素可移动的区域(防止元素生成后改变了窗口尺寸而无法及时更新可移动区域)
    this.getMaxMoveRect(this.el.nativeElement, this.el.nativeElement.offsetParent);
    //如果想对定位的是body每次点击时候获取滚动偏移
    if ( this.el.nativeElement.offsetParent.nodeName === "BODY") {
      this.scrollX = window.scrollX;
      this.scrollY = window.scrollY;
      console.log(" this.scrollX", this.scrollX,"this.scrollY",this.scrollY)
    }
    return { "x": downEve["clientX"] - elNativeElement["offsetLeft"], "y": downEve["clientY"] - elNativeElement["offsetTop"] }
  }

  upMovePos(downPos: any, moveEvent: any) {

    let left = moveEvent["clientX"] - downPos["x"];
    let top = moveEvent["clientY"] - downPos["y"];
    //validValue使得left,top取值在限定范围内.如果滚动了，区域也要偏移一下
    return { "left": this.validValue(left, this.maxWidth + this.scrollX, this.scrollX), "top": this.validValue(top , this.maxHeight + this.scrollY, this.scrollY) };
  }

  change(pos: any) {
    // console.log("pos::",pos)
    this.el.nativeElement.style.margin = 0;
    if (this.xoryMode === 'x') {
      this.setLeft(pos);
      return;
    }
    if (this.xoryMode === 'y') {
      this.setTop(pos);
      return;
    }
    this.setLeft(pos);
    this.setTop(pos);
  }

  setLeft(pos: any) {
    this.el.nativeElement.style.left = pos["left"] + "px";
  }

  setTop(pos: any) {
    this.el.nativeElement.style.top = pos["top"] + "px";
  }

  getMaxMoveRect(dropDom: any, positionDom: any) {

    if (positionDom.nodeName === "BODY") {
      this.maxWidth = window.innerWidth - dropDom.offsetWidth;
      this.maxHeight = window.innerHeight - dropDom.offsetHeight;
      return;
    }
    this.maxWidth = positionDom.offsetWidth - dropDom.offsetWidth;
    this.maxHeight = positionDom.offsetHeight - dropDom.offsetHeight;
  }

  validValue(value: number, max: number, min: number) {
    return Math.min(Math.max(value, min), max)
  }
}




// import { Directive, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
// import { fromEvent } from 'rxjs';
// import { takeUntil, map, concatMap, last } from 'rxjs/operators';
// @Directive({
//   selector: '[appDrop]'
// })
// export class DropDirective implements OnInit {
//   //拖拽元素出现的时候是否允许滚动，待优化(模态框出现的时候不允许滚动)
//   //产生拖到元素的class名称，避免在当前组件有同名类名。默认是指令附加的元素
//   //不能移动超过相对定位元素的区域
//   private maxWidth: number;
//   private maxHeight: number;
//   //滚动尺寸
//   private scrollX: number = 0;
//   private scrollY: number = 0;

//   @Input() targetClassName: string;
//   //移动模式。默认双向 ,'x' x方向移动 ,'y' y方向移动
//   @Input() xoryMode: string = 'all';
//   //超出边界尺寸
//   @Input() useroffset: number = 0;
//   @Output() dragDown: EventEmitter<any> = new EventEmitter<any>();
//   @Output() dragMove: EventEmitter<any> = new EventEmitter<any>();
//   @Output() dragUp: EventEmitter<any> = new EventEmitter<any>();
//   constructor(private el: ElementRef) { }
//   ngOnInit() {

//     this.el.nativeElement.style.position = "absolute";
//     //指令所附加的元素就是需要拖到的元素，可以触发拖动的元素可能是它自己或者它的子元素(可拖动元素的一小块区域类似标题栏区域)
//     let target = this.el.nativeElement.querySelector(`.${this.targetClassName}`) || this.el.nativeElement;
    
//     let mousedown$ = fromEvent(target, "mousedown").pipe(map(event => this.getDownPos(event, this.el.nativeElement)))
//     let mousemove$ = fromEvent(window, "mousemove");
//     let mouseup$ = fromEvent(window, "mouseup").pipe(map(event => this.upEmit(event)))
  
//     //将移动的流转化为只要mouseup$发出数据就停止的流
//     let moveuntilDown = mousemove$.pipe(map(event => {
//       event.stopPropagation();
//       event.preventDefault();
//       return event;
//     })).pipe(takeUntil(mouseup$));
//     //新的点击流和移动的流 concat
//     let newMove$ =  mousedown$.pipe(concatMap(downPos => moveuntilDown.pipe(map(event => {
//       return this.upMovePos(downPos, event)
//     }))));
//     // newMove$.pipe(last()).subscribe(pos=>this.upEmit(pos))
//     newMove$.subscribe(pos => this.moveEmit(pos)); 
//   }

//   getDownPos(downEve: any, elNativeElement: any) {
//     this.dragDown.emit()
//     //每次点击获取拖动元素可移动的区域(防止元素生成后改变了窗口尺寸而无法及时更新可移动区域)
//     this.getMaxMoveRect(this.el.nativeElement, this.el.nativeElement.offsetParent);
//     //如果想对定位的是body每次点击时候获取滚动偏移
//     if (this.el.nativeElement.offsetParent.nodeName === "BODY") {
//       this.scrollX = window.scrollX;
//       this.scrollY = window.scrollY;
//       console.log(" this.scrollX", this.scrollX, "this.scrollY", this.scrollY)
//     }
//     return { "x": downEve["clientX"] - elNativeElement["offsetLeft"], "y": downEve["clientY"] - elNativeElement["offsetTop"] }
//   }

//   upMovePos(downPos: any, moveEvent: any) {

//     let left = moveEvent["clientX"] - downPos["x"];
//     let top = moveEvent["clientY"] - downPos["y"];
//     //validValue使得left,top取值在限定范围内.如果滚动了，区域也要偏移一下
//     //scrollX整体偏移 offset两边外扩。分别是滚动条偏移量和是否超出限定区域的偏移量
//     let pos = {
//       "left": this.validValue(left, this.maxWidth + this.scrollX + (+ this.useroffset), this.scrollX - (+ this.useroffset)),
//       "top": this.validValue(top, this.maxHeight + this.scrollY + (+ this.useroffset), this.scrollY - (+ this.useroffset))
//     };

//     //数据发射出去供外部使用(比如歌曲的进度,音量);
//     //X只有在水平模式或者XY方向才能取值
//     let x = (this.xoryMode === "x" || this.xoryMode === "all" ) ? (pos["left"] + (+this.useroffset)) : undefined;
//     let y = (this.xoryMode === "y" || this.xoryMode === "all" ) ? (pos["top"]  + (+this.useroffset)) : undefined;
   
//     this.dragMove.emit({ "left": x, "top": y })
//     return pos
//   }

//   upEmit(pos){
//     this.dragUp.emit(pos)
//   }
//   moveEmit(pos: any) {
//     // this.dragMove.emit("end454")
//     // console.log("pos::",pos)
//     this.el.nativeElement.style.margin = 0;
//     if (this.xoryMode === 'x') {
//       this.setLeft(pos);
//       return;
//     }
//     if (this.xoryMode === 'y') {
//       this.setTop(pos);
//       return;
//     }
//     this.setLeft(pos);
//     this.setTop(pos);
//   }

//   setLeft(pos: any) {
//     this.el.nativeElement.style.left = pos["left"] + "px";
//   }

//   setTop(pos: any) {
//     this.el.nativeElement.style.top = pos["top"] + "px";
//   }

//   getMaxMoveRect(dropDom: any, positionDom: any) {

//     if (positionDom.nodeName === "BODY") {
//       this.maxWidth = window.innerWidth - dropDom.offsetWidth;
//       this.maxHeight = window.innerHeight - dropDom.offsetHeight;
//       return;
//     }
//     this.maxWidth = positionDom.offsetWidth - dropDom.offsetWidth;
//     this.maxHeight = positionDom.offsetHeight - dropDom.offsetHeight;
//   }

//   validValue(value: number, max: number, min: number) {
//     return Math.min(Math.max(value, min), max)
//   }
// }
