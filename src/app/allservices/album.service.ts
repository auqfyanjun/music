import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

import { AcreatrequestService } from "./acreatrequest.service";
import { SearchMusic, SearchMusicService } from "./searchMusic.service";
import { Collection,InfoAndLists } from "./allplaylist.service";

@Injectable()

export class AlbumService {

    //记录专辑总数
    totalAl: number = 0;
    constructor(private acreatrequestSer: AcreatrequestService,private searchMusicSer: SearchMusicService) { }

    //获取专辑列表根据area字段分类
    getAlbum(areaRef:string = "ALL",offsetRef:number = 0,limitRef?:number) {
        let url = "/weapi/album/new"
        let data = {
            offset: offsetRef,
            total: true,
            limit: limitRef || 35,
            area: areaRef,
            csrf_token: ''
        }

        return this.acreatrequestSer.creatRequest("post", url, data).pipe(map(res => this.resovleAlbumList(res)))
    }
    //获取单张专辑的详细情况
    getOneAlbum(idRef) {   
        let url = `/weapi/v1/album/${idRef}`
        let data = {
            csrf_token: ''
        }
        return this.acreatrequestSer.creatRequest("post", url, data).pipe(map(res => this.resovleAlbumInfo(res)))
    }

    resovleAlbumList(resRef) {

        let albums: OneAlbum[] = [];
        this.totalAl = resRef["total"];
        let albumlist = resRef["albums"];

        for (let item of albumlist) {

            albums.push(new OneAlbum(
                item["name"],
                item["id"],
                item["picUrl"],
                item["artist"]["name"],
                item["artist"]["id"],
            ))
        }
        return albums;
    }
    //单张专辑的详细情况，一些专辑的字段和一组歌曲
    resovleAlbumInfo(resRef) {
       
        //解析专辑详细情况
        let res = resRef["album"];
        let collection :Collection =  new Collection(        
            res["name"],
            res["id"],
            res["subscribedCount"],
            res["trackCount"],
            res["picUrl"],
            null,     
            null,  
            null, 
            res["description"],       
            null,
            res["info"]["shareCount"],
            res["info"]["commentCount"],
            null,   
            null,
            res["artist"]["name"],
            res["publishTime"],        
            res["company"],
        )
         //解析歌曲列表
         let musics:SearchMusic[] = this.resovleSearchMusics(resRef["songs"]);

         //歌曲信息和歌曲列表组合在一起，完整的专辑页面的数据
         return new InfoAndLists(collection,musics);
    }

    //获取单张专辑下的所有歌曲信息
    resovleSearchMusics(resRef) {
        let searchMusics : SearchMusic[] = [];
        searchMusics = this.searchMusicSer.getList(resRef);
        return searchMusics;
    }
}

//单个专辑（用于专辑列表项）
export class OneAlbum {
    constructor(
        public alName: string,
        public alId: string,
        public alNPicUrl: string,
        public abSinger: string,
        public abSingerId: string,
    ) { }
}
