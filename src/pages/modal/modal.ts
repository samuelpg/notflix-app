import { NavParams, ViewController} from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    templateUrl:'modal.html',
})
export class ReminderModal {
    myDate : string;
    myTime : string;
    movie : string;
    checked : boolean;
    id : number;

    constructor(params: NavParams, public viewCtrl: ViewController) {
        this.movie = params['data']['movie'];
        this.id = params['data']['id'];
    }
    check(){
        if(this.myTime&&this.myDate){
            this.checked = true;
        }else{
            this.checked = false;
        }
    }
    cancel(){
        this.viewCtrl.dismiss({success:false});
    }
    remindMe(operation:string){
        let date = this.myDate.split('-');
        let time = this.myTime.split(':');
        let d = new Date();
        console.log(date)
        console.log(time)
        d.setFullYear(parseInt(date[0]),parseInt(date[1])-1,parseInt(date[2]));
        d.setHours(parseInt(time[0]),parseInt(time[1]));
        let reminder = {
            date: d,
            movie: this.movie,
            id: this.id,
        }
        this.viewCtrl.dismiss({
            success:true,
            reminder:reminder,
        });
    }
}