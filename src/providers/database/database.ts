import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { resolveDefinition } from '@angular/core/src/view/util';
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
  registerUser(username:string, password:string, email: string){
    return new Promise(resolve=>{
      this.storage.get("user_"+username).then(data=>{
        if(data==null){
          let user = {
            username:username,
            password:password,
            email:email,
          }
          this.storage.set("user_"+username, user).then(data=>{
            this.openSession(username);
            resolve({status:true});
          }).catch(data=>{
            resolve({status:false});
          })
        }else{
          resolve({status:false});
        }
      }).catch(data=>{
        resolve({status:false});
      })
    })
  }

  login(username:string, password:string){
    console.log("ASD")
    return new Promise(resolve=>{
      this.storage.get("user_"+username).then(data=>{
        console.log(data)
        if(data!=null){
          if(data['password']==password){
            this.openSession(username);
            resolve({status:true});
          }else{
            resolve({status:false});
          }
        }else{
          resolve({status:false})
        }
      }).catch(data=>{
        resolve({status:false});
      })
    })
  }

  openSession(username:string){
    this.storage.set("current_session",{username:username})
  }
  currentSession(op:string){
    switch(op){
      case "check":{
        return new Promise(resolve=>{
          this.storage.get("current_session").then(data=>{
            if(data!=null){
              resolve({status:true, username: data["username"]});
            }else{
              resolve({status:false});
            }
          })
        })
      }
      case "close":{
        return new Promise(resolve=>{
          this.storage.remove("current_session").then(data=>{
            resolve("ok")
          })
        })
      }
    }
  }
}
