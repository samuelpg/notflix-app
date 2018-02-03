import { Component } from '@angular/core';
import { ModalController,NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { BookPage } from '../book/book';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ReminderModal } from '../modal/modal';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  results : Array<Object>;

  constructor(
    public navCtrl: NavController,
    private database: DatabaseProvider,
    private app : App,
    public modalCtrl: ModalController,
    private localNotifications: LocalNotifications) {
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
    this.database.getAll('toRead').then(data=>{
      this.results = data['results'];
    }).catch(err=>{
      console.log(err);
    })
  }
  createReminder(id:string, movie:string){
    let modal = this.modalCtrl.create(ReminderModal , {id:id, movie:movie});
    modal.present();
    modal.onDidDismiss(data=>{
      if(data['success']){
        let reminder = data['reminder']
        this.localNotifications.schedule({
          id: reminder['id'],
          at: reminder['date'],
          text: 'Remember to watch ' + reminder['movie'],
          title: 'Notflix',
        })
      }
    })
  }
}
