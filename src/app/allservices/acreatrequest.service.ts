import { Injectable } from '@angular/core';
import { AesrsaService } from './aesrsa.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
// var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
// http://music.163.com/api/playlist/detail?id=387699584
// http://s.music.163.com/search/get/?s=%E5%91%8A%E7%99%BD%E6%B0%94%E7%90%83&limit=10&type=1
@Injectable()
export class AcreatrequestService {


    constructor(private aesRsaSer: AesrsaService, private httpC: HttpClient, private domSanitizer: DomSanitizer, private cookieService: CookieService) { }


    //统一的HTTP请求接口
    creatRequest(method: string, url: string, data: Object) {
        if (method === 'get') {
            return this.httpC.request(method, url)
        }
        //先加密数据
        let bodyTemp = this.aesRsaSer.encObject(data);
        //构造参数
        let httpPamram: HttpParams = new HttpParams().set("params", bodyTemp.encText).set("encSecKey", bodyTemp.encSecKey);

        let httpPamramTemp = httpPamram.toString().replace(/[+]/g, "%2B");
        //设置请求头
        let header: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')

        //伪造cookie
        let jsessionid = this.randomString('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKMNOPQRSTUVWXYZ\\/+', 176) + ':' + (new Date).getTime();
        let nuid = this.randomString('0123456789abcdefghijklmnopqrstuvwxyz', 32);

        if (!this.cookieService.get("JSESSIONID-WYYY")) {
            this.cookieService.set("JSESSIONID-WYYY", jsessionid, undefined, "/");
            this.cookieService.set("_iuqxldmzr_", "32", undefined, "/");
            this.cookieService.set("_ntes_nnid", `${nuid},${(new Date).getTime()}`, undefined, "/");
            this.cookieService.set("_ntes_nuid", nuid, undefined, "/");
        }
        return this.httpC.request( method,url,{body: httpPamramTemp, "headers": header, withCredentials: true } ).pipe(catchError(this.handleErr)) 
    }
    handleErr(err){
        console.log("err:",err);
        return of(null)
      }
    //在给定的一组字符中随机抽取生成指定长度的字符串      
    randomString(pattern, length) {
        return Array.apply(null, { length: length }).map(() => (pattern[Math.floor(Math.random() * pattern.length)])).join('');
    }

    //解析歌词，仅仅只是添加了换行和去掉开头的时间
    resolvelrc(resRef) {

        let lrc: Array<string> = resRef.split("\n");
        let str1 = "", str2 = "";
        let leng = lrc.length - 1;

        for (let i = 0; i < leng; i++) {
            if (i < 13) {
                str1 += lrc[i] + "<br />";
            }
            else {
                str2 += lrc[i] + "<br />"
            }
        }

        let regExp: RegExp = /\[.*?]/g;
        str1 = str1.replace(regExp, "");
        str2 = str2.replace(regExp, "");

        let str11 = this.domSanitizer.bypassSecurityTrustHtml(str1);
        let str22 = str2 ? this.domSanitizer.bypassSecurityTrustHtml(str2) : "";
        return { "str1": str11, "str2": str22 };
    }

    testApi() {
        let d = {};
        return this.creatRequest("post", "/weapi/v1/discovery/recommend/resource", d)
    }
}




