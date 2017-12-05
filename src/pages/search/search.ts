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
    if(this.query){
      this.load(this.query)
    }
  }
  load(query:string){ 
    this.q = " +"+this.searchBy+":"+query;
    this.lib.getBooks(this.q.toLowerCase(),this.startIndex,10).then(data=>{
      this.results = data['items'];
    }).catch(err=>{
      console.log(err);
    })
  }
  seeMore(item:Object){
    this.navCtrl.push(BookPage, item);
  }
  doInfinite(infiniteScroll){
    this.startIndex = this.results.length;
    this.lib.getBooks(this.q.toLowerCase(),this.startIndex,10).then(data=>{
      this.results = this.results.concat(data['items']);
      console.log(this.results);
      infiniteScroll.complete();
    }).catch(err=>{
      console.log(err);
    })
  }
}
