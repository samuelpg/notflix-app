import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LibProvider } from '../../providers/lib/lib';
import { BookPage } from '../book/book';
import { PopoverController } from 'ionic-angular';
import { SearchPopOver } from '../pop-over/searchPopOver';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})

export class SearchPage {
  q:string="";
  results:Array<Object>;
  startIndex:number;
  searchBy:string;
  query:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public lib: LibProvider,
    public popoverCtrl: PopoverController
  ) {
    this.results = null;
    this.searchBy = "intitle"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(SearchPopOver);
    popover.present({
      ev: myEvent,
    });
    popover.onDidDismiss(data=>{
      if(data){
        this.searchBy = data["searchBy"];
      }
      if(this.query){
        this.load(this.query)
      }
    })
  }
  getItems(ev: any){
    this.query = ev.target.value;
    this.results = null;
    this.startIndex = 0;
    console.log(this.query)
    if(this.query){
      this.load(this.query)
    }
  }
  load(query:string){ 
    this.lib.searchMovies(query.toLowerCase(),this.startIndex).then(data=>{
      this.results = data['results'];
      console.log(this.results);
    }).catch(err=>{
      console.log(err);
    })
  }
  seeMore(id:string){
    console.log(id)
    this.navCtrl.push(BookPage,{id:id});
  }
  doInfinite(infiniteScroll){
    this.startIndex += 1;
    if(this.q){
      this.lib.searchMovies(this.q.toLowerCase(),this.startIndex).then(data=>{
        this.results = this.results.concat(data['results']);
        console.log(this.results);
        infiniteScroll.complete();
      }).catch(err=>{
        console.log(err);
      })
    }
  }
  posterPath(pp:string){
    return "https://image.tmdb.org/t/p/w92/"+pp;
  }
}
