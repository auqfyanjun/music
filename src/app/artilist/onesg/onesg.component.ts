import { Component, OnInit } from '@angular/core';
import { ArtService, SingerInfo } from '../../allservices/art.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-onesg',
  templateUrl: './onesg.component.html',
  styleUrls: ['./onesg.component.css']
})
export class OnesgComponent implements OnInit {

  //歌手ID，先通过路由获取，再通过服务传递保存下来，供top50,mv,album等组件使用
  singerid: string = "";

  singerInfo: SingerInfo = null;

  constructor(private artSer: ArtService, private routerInfo: ActivatedRoute) { }


  ngOnInit() {

    this.routerInfo.paramMap.pipe(mergeMap(param => {
      this.singerid = param.get("singerid");
      return this.artSer.getTop(this.singerid);

    })).subscribe(res => {this.singerInfo = res.singerInfo});

  }

}
