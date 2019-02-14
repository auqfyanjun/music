
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { AcreatrequestService } from './acreatrequest.service';
import { SearchMusic } from './searchMusic.service';

@Injectable()
export class PlayingService {
    //其他页面会传递一个包含一首或多首歌曲信息的对象
    @Output() setMusicSubject: Subject<SearchMusic> = new Subject<SearchMusic>();
    @Output() pushArrayEvent: EventEmitter<Array<SearchMusic>> = new EventEmitter<Array<SearchMusic>>();

    constructor(private acreatrequestSer: AcreatrequestService) { }
    //外部传递进来歌曲ID，通过HTTP获取歌曲播放的URL
    playing(idRef: string) {
        // console.log("服务内获取的数据ID是:",idRef)
        let d = { "ids": "[]", "br": 128000, "csrf_token": "" };

        d.ids = `[${idRef}]`;

        return this.acreatrequestSer.creatRequest("post", "/weapi/song/enhance/player/url?csrf_token=", d).pipe(map(res => this.resovleSongUrl(res)))
    }

    resovleSongUrl(param) {
        let tempUrl = param["data"][0]["url"]
        if (tempUrl) {
            return tempUrl;
        } else {
            return null;
        }
    }

    //获取歌曲的详情
    songDetail(idRef: string) {

        if (!idRef) idRef = "452986458";

        let d = { c: JSON.stringify([{ id: idRef }]), ids: '[' + idRef + ']' };
        return this.acreatrequestSer.creatRequest("post", "/weapi/v3/song/detail", d).pipe(map(res => this.resovleJson(res["songs"][0])))
    }

    resovleJson(res) {
        return new SearchMusic(
            res["name"],
            res["ar"][0]["name"],
            res["al"]["name"],
            res["al"]["id"],
            res["id"],
            res["ar"][0]["id"],
            res["al"]["picUrl"],
            undefined,
            res["alia"][0] || undefined,
            res["mv"] || undefined)
    }

    lrc(idRef: string) {
        if (!idRef) idRef = "452986458";
        let lrcUrl = '/weapi/song/lyric?id=' + idRef + '&lv=-1&kv=-1&tv=-1';
        let d = {}
        return this.acreatrequestSer.creatRequest("post", lrcUrl, d).pipe(map(res => {
            if (!res["lrc"]) return null;
            return this.acreatrequestSer.resolvelrc(res["lrc"]["lyric"])
        }))
    }
}


