import { Injectable } from '@angular/core';
import { AcreatrequestService } from './acreatrequest.service';

import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SearchMusic, SearchMusicService } from './searchMusic.service';

@Injectable()
export class ArtService {

    id: string = "";
    searchMusic: SearchMusic[] = [];
    nextArtSongsSubject: Subject<any> = new Subject<any>();
    constructor(private acreatrequestSer: AcreatrequestService, private searchMusicSer: SearchMusicService) { }
    //获取歌手热门歌曲
    getTop(singerIdRef?: string) {
        if (singerIdRef) {
            this.id = singerIdRef;
        }
        let url = `/weapi/v1/artist/${this.id}`;
        let d = { csrf_token: "" };

        return this.acreatrequestSer.creatRequest('post', url, d).pipe(map(res => this.resovleTop(res)))
    }
    //获取指定歌手ID的专辑
    getAlbun() {
        let idT = this.id || '10559';
        let url = `/weapi/artist/albums/${idT}`;
        let d = {
            offset: 0,
            total: true,
            limit: 12,
            csrf_token: ''
        }
        return this.acreatrequestSer.creatRequest('post', url, d).pipe(map(res => this.resovleAlbum(res)))
    }

    //入驻/华语男/华语女 之类的
    //此服务在歌手模块会用，另外首页也会请求入驻歌手信息
    getSingerList(singerType?: string, offsetRef?: number, limitRef?: number) {
        //limitRef 最大值好像不能超过60
        let url = "/weapi/artist/list";
        let d = {
            categoryCode: singerType || "5001",
            offset: offsetRef || 0,
            total: "true",
            limit: limitRef || 10
        }
        return this.acreatrequestSer.creatRequest('post', url, d).pipe(map(res => this.resovleHot(res)))
    }

    //获取热门歌手 
    getHotSingerList() {
        let url = `/weapi/artist/top`;
        let d = {
            offset: 0,
            total: true,
            limit: 100,
            csrf_token: ''
        }
        return this.acreatrequestSer.creatRequest('post', url, d).pipe(map(res => this.resovleHot(res)))
    }

    resovleTop(resRef) {
        //清空上次请求的数据
        this.searchMusic = [];
        let singerInfo: SingerInfo = null;
        let singerInfoAndList: SingerInfoAndList = null;
        let artist = resRef["artist"];
        let hotSongs = resRef["hotSongs"];

        singerInfo = new SingerInfo(
            artist["name"],
            artist["id"],
            artist["alias"],
            artist["picUrl"],
            artist["accountId"] || "",
            artist["briefDesc"])
        this.searchMusic = this.searchMusicSer.getList(hotSongs);
        //getTop重复请求....路由导航的问题.....等待优化
        return singerInfoAndList = new SingerInfoAndList(singerInfo, this.searchMusic)
    }

    resovleAlbum(resRef) {

        let albums: ArtAlbumInfo[] = [];

        let size = resRef["artist"]["albumSize"]

        for (let item of resRef["hotAlbums"]) {

            albums.push(new ArtAlbumInfo(
                item["name"],
                item["id"],
                item["picUrl"],
                item["publishTime"],
                size,
            ))
        }

        return albums;
    }

    resovleHot(resRef) {
        let singerInfo: SingerInfo[] = [];

        for (let item of resRef["artists"]) {

            singerInfo.push(new SingerInfo(
                item["name"],
                item["id"],
                item["alias"],
                item["picUrl"],
                item["accountId"] || "",
                item["briefDesc"]))
        }
        return singerInfo;
    }
}
//歌手信息
export class SingerInfo {
    constructor(
        public name: string,
        public id: string,
        public alias: string,
        public picUrl: string,
        public accountId: string,
        public briefDesc: string,
    ) { }
}
//歌手信息和一组歌曲信息
export class SingerInfoAndList {

    constructor(
        public singerInfo: SingerInfo,
        public searchMusic: SearchMusic[]

    ) { }
}
//专辑信息
export class ArtAlbumInfo {

    constructor(
        public alName: string,
        public alId: string,
        public alNPicUrl: string,
        public alPublishTime: string,
        public albumSize: string,

    ) { }
}


