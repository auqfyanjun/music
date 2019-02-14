import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typelist',
  templateUrl: './typelist.component.html',
  styleUrls: ['./typelist.component.css']
})
export class TypelistComponent implements OnInit {
  
//由于第一个列表 路由没有参数 ，导致和下面的有参数的路由混合了，不知道如何处理有路由参数和无路由参数时候的混合写法，故分开了
  data = [
    {"id":"1", "name": "华语" ,"item":["华语男歌手","华语女歌手","华语组合/乐队"]},     
    {"id":"2", "name": "欧美" ,"item":["欧美男歌手","欧美女歌手","欧美组合/乐队"]},
    {"id":"6", "name": "日本" ,"item":["日本男歌手","日本女歌手","日本组合/乐队"]},
    {"id":"7", "name": "韩国" ,"item":["韩国男歌手","韩国女歌手","韩国组合/乐队"]},
    {"id":"4", "name": "其他" ,"item":["其他男歌手","其他女歌手","其他组合/乐队"]},
  ]

  constructor() { }

  ngOnInit() {


  }

}
