import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { TabsPage } from '../tabs/tabs';
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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public database: DatabaseProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register(){
    this.database.registerUser(this.username, this.password, this.email).then(data=>{
      if(data['status']){
        this.navCtrl.setRoot(TabsPage);
      }else{
        console.log("error");
      }
    })
  }
}

