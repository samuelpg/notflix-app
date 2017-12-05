import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { LibProvider } from '../../providers/lib/lib';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the BookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  title : string;
  thumbnail : string;
  description : string;
  genres = Array<string>();
  date : string;
  ISBN : string = "Not Available";
  pageCount : string = "Not Available";
  categories : string = "Not Available";
  previewLink : string;
  id : string;
  data : any;
  favorited : boolean;
  toRead : boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private database: DatabaseProvider,
    public lib : LibProvider,
    public loadingCtrl:LoadingController
    ) {
    let loading = this.loadingCtrl.create({
      content: "Getting more Movies!...",
    });
    this.lib.getMovie(navParams['data']['id']).then(data=>{
      this.data = data;
      this.title = this.data.title;
      this.description = this.data.overview;
      this.thumbnail = "https://image.tmdb.org/t/p/w500/" + this.data.poster_path;
      this.genres = []
      this.data.genres.forEach(genre => {
        this.genres.push(genre.name);
      });
      loading.dismiss();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookPage');
  }
  openInBrowser(url){
    window.open(url, '_system');
  }
  addTo(database:string){
    if(database==='favorites'){
      this.favorited = true;
    }else{
      this.toRead = true;
    }
    this.database.add(this.id,this.data,database);
  }
  deleteFrom(database:string){
    if(database==='favorites'){
      this.favorited = false;
    }else{
      this.toRead = false;
    }
    this.database.delete(this.id,database);
  }
}
