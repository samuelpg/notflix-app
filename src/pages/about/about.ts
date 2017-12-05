import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { BookPage } from '../book/book';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  results : Array<Object>;

  constructor(public navCtrl: NavController,private database: DatabaseProvider) {

  }
  seeMore(item:Object){
    console.log(item)
    this.navCtrl.push(BookPage, item);
  }

  ionViewDidEnter(){
    this.database.getAll('favorites').then(data=>{
      this.results = data['items'];
    }).catch(err=>{
      console.log(err);
    })
  }
}
