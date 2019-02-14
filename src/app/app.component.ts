import { AcreatrequestService } from './allservices/acreatrequest.service';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { DialogService } from './allservices/dialog.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {

  @ViewChild('tp', { read: ViewContainerRef }) vcontainer: ViewContainerRef;
  constructor(private acreSer: AcreatrequestService,
    private dialogSer: DialogService
  ) { }

  ngOnInit() {
  
    // this.acreSer.testApi().subscribe(res=> console.log('res111x',res));
  }

  open(){
    this.dialogSer.open(this.vcontainer);  
  }

  close() {
    this.dialogSer.close();   
  }

  ngAfterViewInit(): void {
    
  }
}



