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
  apiUrl:string="https://api.themoviedb.org/3";
  apiKey:string="?api_key=1bdf750134d3efdf5f32fa853e6da524";
  constructor(public http: HttpClient) {
    console.log('Hello LibProvider Provider');
  }

  searchMovies(q:string,startIndex:number){
    return new Promise(resolve=>{
      q = encodeURI(q);
      this.http.get(this.apiUrl+"/search/movie"+this.apiKey+"&language=en-US&page=1&include_adult=false&query="+q).subscribe(data=>{
        resolve(data);
      },err=>{
        console.log(err)
      })
    })
  }

  getMoviesByCategory(cat:string,startIndex:number){
    return new Promise(resolve=>{
      cat = encodeURI(cat);
      this.http.get(this.apiUrl+cat+this.apiKey+"&page="+startIndex).subscribe(data=>{
        console.log(data)
        resolve(data);
      },err=>{
        console.log(err)
      })
    })
  }

  getMovie(id:string){
    return new Promise(resolve=>{
      this.http.get(this.apiUrl+"/movie/"+id+this.apiKey+"&append_to_response=videos").subscribe(data=>{
        resolve(data);
      },err=>{
        console.log(err);
      })
    })
  }
}
