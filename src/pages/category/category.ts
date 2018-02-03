import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LibProvider } from '../../providers/lib/lib';
import { BookPage } from '../book/book';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  category : any;
  results : Array<Object>;
  startIndex : number = 1;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public lib: LibProvider,
    public loadingCtrl:LoadingController
    ) {
      this.category = navParams.data['category'];
      this.startIndex = 1;
      let loading = this.loadingCtrl.create({
        content: "Getting more Movies!...",
      });
      loading.present();
      this.lib.getMoviesByCategory(this.category.query,this.startIndex).then(data=>{
        this.results = data['results'];
        loading.dismiss();
      }).catch(err=>{
        console.log(err);
      })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  seeMore(id:string){
    console.log(id)
    this.navCtrl.push(BookPage,{id:id});
  }
  doInfinite(infiniteScroll){
    this.startIndex += 1;
    this.lib.getMoviesByCategory(this.category.query,this.startIndex).then(data=>{
      this.results = this.results.concat(data['results']);
      console.log(this.results);
      infiniteScroll.complete();
    }).catch(err=>{
      console.log(err);
    })
  }
  posterPath(pp:string){
    return "https://image.tmdb.org/t/p/w92/"+pp;
  }
}
