import { Component, OnInit } from '@angular/core';
import { ArtService, SingerInfo } from '../../allservices/art.service';

@Component({
  selector: 'app-entersinger',
  templateUrl: './entersinger.component.html',
  styleUrls: ['./entersinger.component.css']
})
export class EntersingerComponent implements OnInit {
  singerInfo : SingerInfo[] = [];
  //由于歌手的描述在API返回中没有发现，只有使用静态文本，等待完善
  singerDesc = ['台湾歌手张惠妹','独立音乐人','民谣歌手、中国现代民谣的代表人物之一','民谣歌手','音乐人' ]
  constructor(private artSer: ArtService) { }

  ngOnInit() {
    this.artSer.getSingerList('5001', 0, 5).subscribe(res => this.singerInfo = res)
    // setTimeout(() => {
    //   console.log(this.singerInfo)
    // }, 5000);
  }

}
