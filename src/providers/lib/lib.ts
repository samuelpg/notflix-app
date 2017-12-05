import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/* import { HTTP } from '@ionic-native/http'; */
/*
  Generated class for the LibProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LibProvider {
  apiUrl:string="https://www.googleapis.com/books/v1/volumes?q=";
  apiKey:string="&key=AIzaSyAGFdLhFIEM8FsWpMz0ZZwTvrVW_puO5_A";
  constructor(public http: HttpClient) {
    console.log('Hello LibProvider Provider');
  }

  getBooks(q:string,startIndex:number,maxResults:number){
    return new Promise(resolve=>{
      q = encodeURI(q);
      this.http.get(this.apiUrl+q+"&startIndex="+startIndex+"&maxResults="+maxResults+this.apiKey).subscribe(data=>{
        resolve(data);
      },err=>{
        console.log(err)
      })
    })
  }
  getBooksByCategory(q:string,cat:string,startIndex:number){
    return new Promise(resolve=>{
      q = encodeURI(q);
      cat = encodeURI(cat);
      this.http.get(this.apiUrl+q+"+subject:"+cat+"&startIndex="+startIndex+"&maxResults=10"+this.apiKey).subscribe(data=>{
        resolve(data);
      },err=>{
        console.log(err)
      })
    })
  }
}
