
import { of as observableOf, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchMusic, SearchMusicService } from './searchMusic.service';
//榜单相关的数据处理

import { Injectable } from '@angular/core';
import { AcreatrequestService } from './acreatrequest.service';

@Injectable()
export class BillboardService {

    allBoard: AllBoard[] = [];

    constructor(private acreatrequestSer: AcreatrequestService,private searchMusicSer: SearchMusicService) { }
    //请求榜单数据
    topList(idx: any, count?: number) {
        let data = { "id": idx, n: count || 1000, csrf_token: "" };

        return this.acreatrequestSer.creatRequest("post", "/weapi/v3/playlist/detail", data).pipe(map(res => this.resole(res["playlist"])));
    }
    //获取所有榜单列表
    top() {

        if (this.allBoard.length !== 0) {
            return observableOf(this.allBoard);
        }
        let d = { csrf_token: '' };

        return this.acreatrequestSer.creatRequest("post", "/weapi/toplist", d).pipe(map(res => this.resoleTop(res["list"])))
    }

    //解析某个榜单下的数据，包含几个字段和一组歌曲信息的 数据
    resole(res) {
        let tempSearchMusic: SearchMusic[] = [];
        tempSearchMusic = this.searchMusicSer.getList(res["tracks"]);
        return new BillboardList(
            res["coverImgUrl"],
            res["name"],
            res["id"],
            res["playCount"],
            res["shareCount"],
            res["subscribedCount"],
            res["subscribed"],
            res["commentCount"],
            res["commentThreadId"],
            res["updateTime"],
            tempSearchMusic
        )
    }

    //解析榜单数据
    resoleTop(res) {

        for (let item of res) {
            this.allBoard.push(new AllBoard(
                item["coverImgUrl"],
                item["name"],
                item["id"],
                item["commentThreadId"],
                item["updateFrequency"],
            ))
        }

        return this.allBoard;
    }
}

//一份榜单包含几个字段和一组歌曲信息
export class BillboardList {
    constructor(
        public coverImgUrl: string,
        public boardTypename: string,
        public boardTypeId: string,
        public playCount: string,
        public shareCount: string,
        public subscribedCount: string,
        public subscribed: Boolean,
        public commentCount: string,
        public commentThreadId: string,
        public updateTime: string,
        public searchMusicS: SearchMusic[]
    ) { }
}

export class AllBoard {
    constructor(
        public coverImgUrl: string,
        public boardTypename: string,
        public boardTypeId: string,
        public commentThreadId: string,
        public update: string,
    ) { }
}


