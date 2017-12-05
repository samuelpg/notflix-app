import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LibProvider } from '../../providers/lib/lib';
import { BookPage } from '../book/book';
import { CategoryPage } from '../category/category';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LibProvider],
})
export class HomePage {
  categories : Array<{title:string,icon:string}>;
  randomTopics : Array<{title:string,icon:string}>;
  randomTitle : string;
  randomIcon : string;
  randomBooks : Array<Object>;
  constructor(public navCtrl: NavController, public libProvider: LibProvider) {
    this.categories = [
      {title:"Art", icon:"color-palette"},
      {title:"Music", icon:"musical-notes"},
      {title:"Food", icon:"pizza"},
      {title:"Lifestyle", icon:"body"},
      {title:"Ideas", icon:"bulb"},
      {title:"Finance", icon:"cash"},
      {title:"Computer Science", icon:"code"},
      {title:"Science", icon:"flask"},
      {title:"fiction", icon:"planet"}
      ];
    this.randomTopics = [
      {title:"Python",icon:"code"},
      {title:"The Beatles",icon:"musical-notes"},
      {title:"Macroeconomics",icon:"cash"},
      {title:"Queen Elizabeth II",icon:"body"},
      {title:"Comedy",icon:"body"},
      {title:"Botany",icon:"body"},
      {title:"Solar System",icon:"flask"},
      {title:"Bob Ross",icon:"color-palette"},
      {title:"Robotics",icon:"code"},
      {title:"Creativity",icon:"bulb"},
      {title:"Electronic Music",icon:"musical-notes"},
      {title:"Pizza",icon:"pizza"},
      {title:"Cupcakes",icon:"pizza"},
      {title:"Star Wars",icon:"videocam"},
      {title:"Piano",icon:"musical-notes"},
      {title:"Silicon Valley",icon:"bulb"},
      {title:"Video Games",icon:"game-controller-b"},
      {title:"Dogs",icon:"body"},
      {title:"Turing test",icon:"code"},
    ];
    this.getRandomTopic();
  }
  getRandomTopic(){
    console.log("AAA");
    let topic = this.randomTopics[Math.floor(Math.random()*this.randomTopics.length)];
    this.randomTitle = topic.title;
    this.randomIcon = topic.icon;
    this.libProvider.getBooks(this.randomTitle,0,3).then(data=>{
      this.randomBooks = data['items'];
      console.log(this.randomBooks);
    }).catch(err=>{
      console.log(err);
    })
  }
  seeMore(item:Object){
    console.log(item)
    this.navCtrl.push(BookPage, item);
  }
  goToCategory(cat:string){
    this.navCtrl.push(CategoryPage, {category:cat});
  }
  goToSearch(){
    console.log("BB")
    this.navCtrl.push(SearchPage);
  }
}
