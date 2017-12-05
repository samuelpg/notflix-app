import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello DatabaseProvider Provider');
  }

  add(key:string,value:any,database:string){
    this.storage.set(key+database,{database:database,value:value}).then(data=>{
      console.log("OK");
    }).catch(err=>{
      console.log(err);
    })
    
  }
  delete(key:string,database:string){
    this.storage.remove(key+database).then(data=>{
      console.log("OK");
    }).catch(err=>{
      console.log(err);
    })
  }
  getAll(database){
    return new Promise(resolve=>{
      let data = new Array()
      this.storage.forEach(values=>{
        if(values.database==database){
          data.push(values.value);
        }
      })
      resolve({items:data});
    });
  }

  checkIn(database:string,id:string){
    return new Promise(resolve=>{
      this.storage.get(id+database).then(data=>{
        if(data.database == database){
          resolve({bool:true})
        }else{
          resolve({bool:false})
        }
      }).catch(err=>{
        
      })
    });
  }
}
