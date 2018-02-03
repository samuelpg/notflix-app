import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { LibProvider } from '../../providers/lib/lib';
import { LoadingController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  title : string;
  thumbnail : string;
  description : string;
  genres : string;
  date : string;
  rate : number;
  runtime: string = "Not Available";
  categories : string = "Not Available";
  previewLink : string;
  id : string;
  data : any;
  favorited : boolean;
  toRead : boolean;
  youtubeKey : string = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private database: DatabaseProvider,
    public lib : LibProvider,
    public loadingCtrl:LoadingController,
    private socialSharing: SocialSharing,
    private youtube: YoutubeVideoPlayer,
    ) {
    let loading = this.loadingCtrl.create({
      content: "Popping popcorn...",
    });
    loading.present();
      this.lib.getMovie(navParams['data']['id']).then(data=>{
      this.data = data;
      this.id = this.data.id;
      this.title = this.data.title;
      this.description = this.data.overview;
      this.thumbnail = "https://image.tmdb.org/t/p/w154/" + this.data.poster_path;
      let genres = []
      this.data.genres.forEach(genre => {
        genres.push(genre.name);
      });
      this.genres = genres.join(" ");
      this.rate = this.data.vote_average;
      this.runtime = this.data.runtime + " minutes";
      this.date = this.data.release_date;
      this.data.imdb_id?this.previewLink = "https://www.imdb.com/title/"+this.data.imdb_id:null;
      if(this.data.videos.results.length){
        this.youtubeKey = this.data.videos.results[0].key;
      }
      this.database.checkIn('favorites',this.id).then(data=>{
        this.favorited = data['bool'];
      })
      this.database.checkIn('toRead',this.id).then(data=>{
        this.toRead = data['bool'];
      })
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
  shareWhatsapp(){
    let movie = this.title;
    let image = this.thumbnail;
    let url = this.previewLink;
    let message = `Hey! let's watch ${movie} together on Notflix!`
    this.socialSharing.shareViaWhatsApp(message, image, url)
  }
  shareTwitter(){
    let movie = this.title;
    let image = this.thumbnail;
    let url = this.previewLink;
    let message = `Hey! let's watch ${movie} together on Notflix!`
    this.socialSharing.shareViaTwitter(message, image, url)
  }
  openYoutube(){
    this.youtube.openVideo(this.youtubeKey);
  }
}
