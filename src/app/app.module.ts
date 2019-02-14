import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';

import { AcreatrequestService } from './allservices/acreatrequest.service';
import { PlayingService } from './allservices/playing.service';
import { AesrsaService } from './allservices/aesrsa.service';

import { AppRoutes } from './app.routing';

import { ProMusicComponent } from './play/proMusic/proMusic.component';
import { ProVolComponent } from './play/proVol/proVol.component';
import { PlayComponent } from './play/play.component';
import { CookieService } from 'ngx-cookie-service';
import { SearchMusicService } from './allservices/searchMusic.service';

import { NorightComponent } from './share/noright/noright.component';
import { DropDirective } from './allservices/drop.directive';
import { DialogService } from './allservices/dialog.service';
import { EmailandtelComponent } from './share/login/emailandtel/emailandtel.component';


// import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// import { ShareModule } from './share/share.module';

@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    ProVolComponent,
    ProMusicComponent,
    DropDirective,
    NorightComponent,
    EmailandtelComponent,

    
],
entryComponents:[
  NorightComponent,
  EmailandtelComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutes,  
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    AesrsaService,
    AcreatrequestService,
    CookieService,
    SearchMusicService,
    PlayingService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


