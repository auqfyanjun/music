
import { AllplaylistService, Recomms } from './../../allservices/allplaylist.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-topMusic',
  templateUrl: './topMusic.component.html',
  styleUrls: ['./topMusic.component.css']
})
export class TopMusicComponent implements OnInit {
  //有3个item是电台的。应该导航到电台的地址。解析也的数据也不一样。。需要修改
  recomms: Recomms[] = [];
  constructor(private allplaylistSer: AllplaylistService) { }
  ngOnInit() {
    this.allplaylistSer.getRecomms().subscribe(res => this.recomms = res)
  }

}
