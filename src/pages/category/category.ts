import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LibProvider } from '../../providers/lib/lib';
import { BookPage } from '../book/book';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  category : string;
  results : Array<Object>;
  q : string = " ";
  startIndex : number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public lib: LibProvider,public loadingCtrl:LoadingController) {
      this.category = navParams.data['category'];
      this.startIndex = 0;
      this.q = " ";
      let loading = this.loadingCtrl.create({
        content: "Getting more books!...",
      });
      loading.present();
      this.lib.getBooksByCategory(this.q,this.category,this.startIndex).then(data=>{
        this.results = data['items'];
        loading.dismiss();
      }).catch(err=>{
        console.log(err);
      })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }
  getItems(ev: any){
    this.q = ev.target.value;
    this.results = new Array();
    this.startIndex = 0;
    this.lib.getBooksByCategory(this.q.toLowerCase(),this.category,this.startIndex).then(data=>{
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
    this.lib.getBooksByCategory(this.q.toLowerCase(),this.category,this.startIndex).then(data=>{
      this.results = this.results.concat(data['items']);
      console.log(this.results);
      infiniteScroll.complete();
    }).catch(err=>{
      console.log(err);
    })
  }
}
