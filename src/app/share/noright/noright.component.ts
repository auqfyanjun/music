import { Component, OnInit, EventEmitter } from '@angular/core';




@Component({
  selector: 'app-noright',
  templateUrl: './noright.component.html',
  styleUrls: ['./noright.component.css']
})
export class NorightComponent implements OnInit {
  emitx:EventEmitter<any> = new EventEmitter<any>();
  tit = "提示!"
  // constructor(private dialogSer :DialogService) { }

  ngOnInit() {
  }
  close(){
    console.log("close")
    // this.dialogSer.close();
    this.emitx.emit("close哈哈");
    // this.dialongSer.close()
  }
}
