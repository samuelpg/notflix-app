import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { BookPage } from '../book/book';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  results : Array<Object>;

  constructor(
    public navCtrl: NavController,
    private database: DatabaseProvider,
    private app : App,
  ) {

  }
  seeMore(id:string){
    console.log(id)
    this.navCtrl.push(BookPage,{id:id});
  }
  posterPath(pp:string){
    return "https://image.tmdb.org/t/p/w92/"+pp;
  }
  logOut(){
    this.database.currentSession('close').then(data=>{
      this.app.getRootNav().setRoot(LoginPage);
    })
  }
  ionViewDidEnter(){
    this.database.getAll('favorites').then(data=>{
      console.log(data)
      this.results = data['results'];
    }).catch(err=>{
      console.log(err);
    })
  }
}
