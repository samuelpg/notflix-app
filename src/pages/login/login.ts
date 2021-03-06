import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { DatabaseProvider } from '../../providers/database/database';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username : string;
  password : string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public database: DatabaseProvider,
    private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  openRegister(){
    this.navCtrl.push(RegisterPage);
  }
  login(){
    console.log("A")
    this.database.login(this.username,this.password).then(data=>{
      console.log(data)
      if(data['status']){
        this.navCtrl.setRoot(TabsPage);
      }else{
        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: 'Incorrect username or password',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    })
  }
}
