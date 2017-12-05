import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    template: `
    <ion-list radio-group [(ngModel)]="searchBy">
        <ion-list-header>
        Search By:
        </ion-list-header>
        <ion-item>
            <ion-label>Title</ion-label>
            <ion-radio (click)="reload()" value="intitle"></ion-radio>
        </ion-item>
        
        <ion-item>
            <ion-label>Author</ion-label>
            <ion-radio (click)="reload()" value="inauthor"></ion-radio>
        </ion-item>
        
        <ion-item>
            <ion-label>Subject</ion-label>
            <ion-radio (click)="reload()" value="subject"></ion-radio>
        </ion-item>

        <ion-item>
            <ion-label>Publisher</ion-label>
            <ion-radio (click)="reload()" value="inpublisher"></ion-radio>
        </ion-item>
    </ion-list>
    `
  })

  export class SearchPopOver{
    searchBy : string;
    constructor(private viewCtrl: ViewController) {
    }
    reload(){
        console.log("A")
        this.viewCtrl.dismiss({searchBy:this.searchBy});
    }
  }