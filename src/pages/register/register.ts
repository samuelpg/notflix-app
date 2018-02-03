import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  username : string;
  password : string;
  email : string;
  checked : boolean;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public database: DatabaseProvider,
    private alertCtrl: AlertController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  check(){
    if(this.username&&this.password){
        this.checked = true;
    }else{
        this.checked = false;
    }
  }
  register(){
    this.database.registerUser(this.username, this.password).then(data=>{
      if(data['status']){
        this.navCtrl.setRoot(TabsPage);
      }else{
          let alert = this.alertCtrl.create({
            title: 'Sorry',
            subTitle: 'Username already taken',
            buttons: ['Dismiss']
          });
          alert.present();
      }
    })
  }
}

