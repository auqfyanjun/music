import { Component, OnInit } from '@angular/core';
import { SingerInfo, ArtService } from '../../../allservices/art.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-sgbytype',
  templateUrl: './sgbytype.component.html',
  styleUrls: ['./sgbytype.component.css']
})
export class SgbytypeComponent implements OnInit {

  data: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  singerInfo: SingerInfo[] = [];
  title: string = "";

  idToTitle = {
    "5001": "入驻歌手",
    "1001": "华语男歌手",
    "1002": "华语女歌手",
    "1003": "华语组合/乐队",
    "2001": "欧美男歌手",
    "2002": "欧美女歌手",
    "2003": "欧美组合/乐队",
    "6001": "日本男歌手",
    "6002": "日本女歌手",
    "6003": "日本组合/乐队",
    "7001": "韩国男歌手",
    "7002": "韩国女歌手",
    "7003": "韩国组合/乐队",
    "4001": "其他男歌手",
    "4002": "其他女歌手",
    "4003": "其他组合/乐队"
  };

  constructor(private artSer: ArtService, private routeInfo: ActivatedRoute) { }

  ngOnInit() {

    // this.artSer.getSingerList("5001",0,100).subscribe(res=>this.singerInfo = res )

    this.routeInfo.paramMap.pipe(mergeMap(param => {

      let typeId = param["params"]["typeid"];

      this.title = this.idToTitle[typeId];

      // console.log(this.title);

      return this.artSer.getSingerList(typeId, 0, 100);

    })).subscribe(res => this.singerInfo = res);


  }



}





////////////
// constructor(private routeInfo: ActivatedRoute,
//   private billboardSer: BillboardService,
//   private playingSer: PlayingService,
//   private commonSer: CommonService) { }

// ngOnInit() {

//   this.routeInfo.paramMap.pipe(mergeMap(param => {

//     this.id = param["params"]["boardTypeId"];
//     this.commonSer.commonSubject.next(this.id);

//     return this.billboardSer.topList(this.id)

//   }))
//     .subscribe(res => this.billboardList = res)

// }
//////////