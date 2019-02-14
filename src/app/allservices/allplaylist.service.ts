import { of as observableOf, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AcreatrequestService } from './acreatrequest.service';
import { SearchMusic, SearchMusicService } from './searchMusic.service';

@Injectable()
export class AllplaylistService {

    allCattype: AllCattype[] = [];

    // InfoSubject:Subject<Collection> = new Subject();
    // oneCollection: Collection = null;
    collection: Collection[] = [];
    totalList: number = 0;
    constructor(private acreatrequestSer: AcreatrequestService,private searchMusicSer: SearchMusicService) { }

    //*********获取所有歌单类别*********************
    getAllCatType() {
        //由于歌单分类不可能变化的很快所以，只请求一次
        if (this.allCattype.length !== 0) {
            return observableOf(this.allCattype);
        }
        let urlcat = "/weapi/playlist/catalogue";
        let urldata = {
            csrf_token: ''
        };
        return this.acreatrequestSer.creatRequest("post", urlcat, urldata).pipe(map(res => this.resAllCatType(res)))
    }
    //解析歌单类别
    resAllCatType(res) {
        // console.log("catlist-->res", res);
        let list = res["categories"];

        for (let item in list) {
            let typex = list[item];
            this.allCattype.push(new AllCattype(typex));
        }
        for (let item of res["sub"]) {
            let index1 = item["category"];
            this.allCattype[index1].oneCats.push(new OneCat(item["name"],
                item["resourceCount"],
                item["imgUrl"],
                item["category"],
                item["hot"])
            )
        }
        return this.allCattype;
    }

    ///***********获取指定CatType下面的歌单列表***************
    getPlaylist(catTypeRef?: string, offsetRef?: number, limitRef?: number, hotornotRef?: string) {
        //先清空数据
        let songCollectionUrl = '/weapi/playlist/list';
        let data = {
            cat: catTypeRef || '全部',
            order: hotornotRef || 'hot',
            offset: offsetRef || 0,
            total: 'true',
            limit: limitRef || 35
        }
        return this.acreatrequestSer.creatRequest("post", songCollectionUrl, data).pipe(map(res => this.resPlaylist(res)));
    }
    //解析歌单列表
    resPlaylist(res) {
        //清空数据
        this.collection = []
        this.totalList = res["total"];

        let list = res["playlists"];
        for (let item of list) {

            this.collection.push(this.creat(item))
        }
        return this.collection
    }
    ///***********获取指定歌单ID下面的歌曲集合***************
    getPlayById(idRef: string, count?: number) {
        let url = "/weapi/playlist/detail";
        let data = {
            "id": idRef,
            "n": count || 100000,
            csrf_token: ""
        };
        return this.acreatrequestSer.creatRequest("post", url, data).pipe(map(res => this.resPlayById(res)))
    }
    //等待优化
    //searchmusic 下的getList函数不能共用，由于API返回的结构不一致，
    resPlayById(res) {
        let col = this.creat(res["result"]);
        let searchMusics: SearchMusic[] = [];
        let songList = res["result"]["tracks"];
        for (let item of songList) {
            let duration = parseInt(item["duration"]) / 1000;
            searchMusics.push(new SearchMusic(
                item["name"],
                item["artists"][0]["name"],
                item["album"]["name"],
                item["album"]["id"],
                item["id"],
                item["artists"][0]["id"],
                item["artists"][0]["img1v1Url"],
                duration,
                item["alias"][0],
            ))
        }
        return { "col": col, "list": searchMusics }
    }
    /////////////////////////////////////////////////////////////
    getOneCollection(id) {
        // //浏览器刷新导致缓存的collection丢失
        // if (this.collection) return this.oneCollection
        for (let item of this.collection) {
            //console.log("id类型", typeof (id), "itemid类型", typeof (item["id"]))
            if (item["id"] == id) {
                return item
            }
        }
        return null
    }
    //获取首页轮播图
    getBanners(): Observable<Banner[]> {
        let url = "https://023415.xyz:3000/banners"
        return this.acreatrequestSer.creatRequest("get", url, null).pipe(map(res => this.resolveBanner(res)));
    }

    //获取首页推荐歌单
    getRecomms() {
        let url = "https://023415.xyz:3000/recomms"
        return this.acreatrequestSer.creatRequest("get", url, null).pipe(map(res => this.resolveRecomms(res)));
    }

    //解析单个歌单信息
    creat(res) {
        let description = null;
        if (res["description"]) {
            description = this.acreatrequestSer.resolvelrc(res["description"]);
        }
        return new Collection(
            res["name"],
            res["id"],
            res["subscribedCount"],
            res["trackCount"],
            res["coverImgUrl"],
            res["creator"]["avatarUrl"],
            res["creator"]["nickname"],
            res["creator"]["userId"],
            description,
            res["playCount"],
            res["shareCount"],
            res["commentCount"],
            res["createTime"],
            [...res["tags"]],
        )
    }

    resolveBanner(dataRef): Banner[] {
        let banners: Banner[] = []
        for (let item of dataRef) {
            let formtUrl = item["url"];
            //专辑的URL转换成本站的路由结构
            if (formtUrl.startsWith('/album?id=')) {
                formtUrl = formtUrl.replace('/album?id=', '../album/info/')
            }
            //mv的URL转换成本站的路由结构
            // if (formtUrl.startsWith('/mv?id=')) {
            //     formtUrl = formtUrl.replace('/mv?id=', '../mv/info/')
            // }
            //playlist的URL转换成本站的路由结构
            if (formtUrl.startsWith('/playlist?id=')) {
                formtUrl = formtUrl.replace('/playlist?id=', '../songlist/detailby/')
            }
             //song的URL转换成本站的路由结构
            if (formtUrl.startsWith('/song?id=')) {
                formtUrl = formtUrl.replace('/song?id=', '../songinfo/detail/')
            }
            //完整的url跳转到外站
            banners.push(
                new Banner(item["picUrl"], formtUrl, item["targetId"], item["backgroundUrl"], item["targetType"],
                ))
        }
        return banners
    }

    resolveRecomms(dataRef) {
        let recomms: Recomms[] = []
        for (let item of dataRef) {
            recomms.push(
                new Recomms(item["picUrl"], item["url"].split("=")[1], item["desc"], item["playcount"]
                ))
        }
        return recomms
    }
}

//以下 歌单按照标签分类 如流行 摇滚等/////////////////////////////
export class AllCattype {
    constructor(private cattype: string) { }
    oneCats: OneCat[] = [];
}
export class OneCat {
    constructor(public name: string,
        public resourceCount: string,
        public imgUrl: string,
        public category: number,
        public hot: string,
    ) { }
}
//以上 歌单按照标签分类 如流行 摇滚等/////////////////////////////

/////////////////每一个歌单/专辑列表 ( 期望歌单，榜单，专辑这类歌曲的集合可以共用一份数据模型 )的信息，歌单是一些歌曲的集合//////
/////////////////每一个歌单/专辑列表 ( 期望歌单，榜单，专辑这类歌曲的集合可以共用一份数据模型 )的信息，歌单是一些歌曲的集合//////
export class Collection {
    constructor(
        public name: string,
        public id: number,
        public subscribedCount: string,
        public trackCount: string,
        public coverImgUrl: string,
        public avatarUrl: string,
        public nickname: string,
        public userId: string,
        public description: { "str1": any, "str2": any },
        public playCount: number,
        public shareCount: number,
        public commentCount: number,
        public updateTime: number,
        public tags?: Array<string>,
        public singername?: string,
        public publishTime?: string,
        public publistComp?: string,
        public nameSup?: string
    ) { }
}

export class InfoAndLists {
    constructor(public collection: Collection, public searchMusic: SearchMusic[]) { }
}


export class Banner {
    constructor(public picUrl: string, public url: string, public targetId: string, public backgroundUrl: string, public targetType: string) { }
}

export class Recomms {
    constructor(public picUrl: string, public url: string, public desc: string, public playcount: string) { }
} 