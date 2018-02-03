import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LibProvider } from '../../providers/lib/lib';
import { BookPage } from '../book/book';
import { CategoryPage } from '../category/category';
import { SearchPage } from '../search/search';
import { DatabaseProvider } from '../../providers/database/database';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [LibProvider],
})
export class HomePage {
  categories : Array<{title:string,icon:string, query: string}>;
  popular : Array<{title:string,icon:string, query: string}>;
  randomTopics : Array<string>;
  randomTitle : string;
  randomIcon : string;
  randomBooks : Array<Object>;
  result : any;
  name : string;
  constructor(
    public navCtrl: NavController, 
    public libProvider: LibProvider,
    public database : DatabaseProvider,
    public app: App,
    ) {
    this.database.currentSession('check').then(data=>{
      if(data['status']){
        this.name = data['username'];
      }
    })
    this.popular = [
      {title:"Popular", icon:"star",query:"/movie/popular"},
      {title:"Top Rated", icon:"stats",query:"/movie/top_rated"},
      {title:"On theatres", icon:"film",query:"/movie/now_playing"},
      {title:"Upcoming", icon:"sunny",query:"/movie/upcoming"},
      ];
    this.categories = [
      {title:"Comedy",icon:"happy",query:"/genre/35/movies"},
      {title:"Action",icon:"train",query:"/genre/28/movies"},
      {title:"Horror",icon:"cloudy-night",query:"/genre/27/movies"},
      {title:"Romance",icon:"heart",query:"/genre/10749/movies"},
      {title:"Mistery",icon:"md-help",query:"/genre/9648/movies"},
      {title:"Science Fiction",icon:"flask",query:"/genre/878/movies"},
      {title:"Documentary",icon:"videocam",query:"/genre/99/movies"},
    ]
    this.randomTopics = [
      "Star Wars", 
      "Get Out", 
      "Les Miserable", 
      "Doctor Strange", 
      "Scream", 
      "Mother", 
      "Little Miss Sunshine",
      "The Grinch",
      "Finding Nemo",
      "Matrix",
      "The Room",
      "The Breakfast Club",
      "Grease",
      "Beauty and the Beast",
      "Moana",
      "Xanadu",
      "The Rocky Horror Picture Show",
      "It",
      "Insideous",
      "10 things i hate about you",
      "Operation Avalanche",
    ];
    this.getRandomTopic();
  }
  getRandomTopic(){
    this.randomTitle = this.randomTopics[Math.floor(Math.random()*this.randomTopics.length)];
    console.log(this.randomTitle);
    this.libProvider.searchMovies(this.randomTitle,0).then(data=>{
      this.result = data['results'][0];
    }).catch(err=>{
      console.log(err);
    })
  }
  seeMore(id:string){
    console.log(id)
    this.navCtrl.push(BookPage,{id:id});
  }
  goToCategory(cat:any){
    this.navCtrl.push(CategoryPage, {category:cat});
  }
  goToSearch(){
    console.log("BB")
    this.navCtrl.push(SearchPage);
  }
  logOut(){
    this.database.currentSession('close').then(data=>{
      this.app.getRootNav().setRoot(LoginPage);
    })
  }
  posterPath(pp:string){
    return "https://image.tmdb.org/t/p/w92/"+pp;
  }
}
