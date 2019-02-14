import { Injectable, ComponentFactoryResolver, ApplicationRef, EmbeddedViewRef, ComponentRef, ComponentFactory, Inject, Injector } from '@angular/core';
import { NorightComponent } from '../share/noright/noright.component';
import { EmailandtelComponent } from '../share/login/emailandtel/emailandtel.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  // @ViewChild('tp', { read: ViewContainerRef }) vcontainer: ViewContainerRef;
  coms = [EmailandtelComponent, NorightComponent]
  componentRef: ComponentRef<any>;
  vcontainer:any;
  constructor(private cfResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private Injector: Injector) { }

  open(vcontainer) {
    let index = Math.random()>0.5 ? 0 : 1;
    this.vcontainer = vcontainer;
    this.close();
    let fc: ComponentFactory<any> = this.cfResolver.resolveComponentFactory(this.coms[1]);
    this.componentRef = this.vcontainer.createComponent(fc);
    this.componentRef.instance.tit = "提示!";
    this.componentRef.instance.emitx.subscribe(()=>this.close())
  }

  close() {
    this.vcontainer.clear();
  }

  getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }


  // open2(vcontainer) {
  //   // let index = Math.random()>0.5 ? 0 : 1;
  //   let fc: ComponentFactory<any> = this.cfResolver.resolveComponentFactory(this.coms[1]);
  //   let componentRef: ComponentRef<any> = fc.create(this.Injector);
  //   window.document.body.appendChild(
  //     this.getComponentRootNode(componentRef)
  //   );
  //   this.appRef.attachView(componentRef); // 注入ApplicationRef服务后使用
  // }
}



