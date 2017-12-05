import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
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
  author : string;
  date : string;
  ISBN : string = "Not Available";
  pageCount : string = "Not Available";
  categories : string = "Not Available";
  previewLink : string;
  id : string;
  data : Object;
  favorited : boolean;
  toRead : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider) {
    this.id = navParams.data['id'];
    this.data = navParams.data;
    let vf = navParams.data['volumeInfo'];
    this.title = vf.title;
    vf.imageLinks == null ? this.thumbnail= "../assets/imgs/image-not-available.jpg" :  this.thumbnail=vf.imageLinks.thumbnail;
    this.description = vf.description;
    this.author = vf.authors;
    this.date = vf.publishedDate;
    vf.industryIdentifiers == null ? this.ISBN="Not Available" : this.ISBN = vf.industryIdentifiers[0].identifier; 
    vf.pageCount ? this.pageCount = vf.pageCount.toString():null;
    vf.categories == null? this.categories = "Not Available" : this.categories = vf.categories;
    this.previewLink = vf.previewLink;
    this.database.checkIn('favorites',this.id).then(data=>{
      this.favorited = data['bool'];
    })
    this.database.checkIn('toRead',this.id).then(data=>{
      this.toRead = data['bool'];
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
