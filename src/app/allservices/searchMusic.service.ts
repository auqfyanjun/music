//负责musicList组件数据

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { AcreatrequestService } from './acreatrequest.service';

@Injectable()
export class SearchMusicService {

    songsCount: number = 0;

    searchEvent: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(private acreatrequestSer: AcreatrequestService) { };

    search(searchRef: string, offsetRef: number = 0) {

        let d = { "s": searchRef, "limit": "30", "csrf_token": "", "type": "1", "offset": 0 };
        d["s"] = searchRef;
        d["offset"] = offsetRef;
        let searchUrl = "/weapi/cloudsearch/get/web"
        // let searchUrl = "/weapi/search/get";
        return this.acreatrequestSer.creatRequest("post", searchUrl, d).pipe(map(data => this.resole(data["result"])));
    }

    //解析搜索数据
    resole(res) {

        if (!res) return null;
        let songs = res["songCount"];
        this.songsCount = Math.ceil(songs / 30);
        //解析列表
        return this.getList(res["songs"]);
    }

    getList(resList): SearchMusic[] {

        let searchMusics: SearchMusic[] = [];
        for (let item of resList) {
            //128kbps 转换成字节是128/8 = 16KB  
            let timers
            if (item["h"]) {
                timers = item["h"]["size"] / item["h"]["br"] * 8
            }
            if (item["l"]) {
                timers = item["l"]["size"] / item["l"]["br"] * 8
            }
            if (item["m"]) {
                timers = item["m"]["size"] / item["m"]["br"] * 8
            }
            searchMusics.push(new SearchMusic(
                item["name"],
                item["ar"][0]["name"],
                item["al"]["name"],
                item["al"]["id"],
                item["id"],
                item["ar"][0]["id"],
                item["al"]["picUrl"],
                timers,
                item["tns"] ? item["tns"][0] : "",
                item["mv" ] ? item["mv"] : "" 
            ))
        }
        return searchMusics;
    }
}
export class SearchMusic {
    constructor(
        public song: string,
        public singer: string,
        public alName: string,
        public alId: string,
        public songId: string,
        public singerId: string,
        public pictureUl: string,
        public timeTotal?: number,
        public songsup?: string,
        public mvId?: string
    ) { }
}


