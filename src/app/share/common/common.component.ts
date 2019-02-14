import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Common, CommonService, CommonColet } from '../../allservices/common.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit, OnDestroy {

  commonColet: CommonColet = null;
  commonShow: number = -1;

  test: any;
  @Input() type: string = "";
  id: string = "";

  //点击回复的时候输入框展示回复的对应人
  commonTo: string = ""

  constructor(private commonSer: CommonService) { }

  ngOnInit() {
    this.test = this.commonSer.commonSubject.subscribe(res => { this.id = res; this.commonSer.getCommon(this.type, res).subscribe(res => this.commonColet = res) });
  }

  showHiden(userRef, indexRef) {
    if (this.commonShow === -1 || this.commonShow !== indexRef) {
      this.commonShow = indexRef;
      this.commonTo = userRef;
    }
    else {
      this.commonShow = -1
    }
    return false;
  }

  searchx(ref) {
    // console.log("分页组件传递过来的页码是:",ref,"this.id",this.id);   
    this.commonSer.getCommon(this.type, this.id, ref * 20).subscribe(res => { this.commonColet = null; this.commonColet = res });
  }
  trans(commonTotal) {
    return Math.ceil(commonTotal / 20)
  }

  ngOnDestroy() {
    this.test.unsubscribe();
  }

}
