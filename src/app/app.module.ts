import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BookPage } from '../pages/book/book';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LibProvider } from '../providers/lib/lib';
import { HttpClientModule } from '@angular/common/http';
import { CategoryPage } from '../pages/category/category';
import { SearchPage } from '../pages/search/search';
import { DatabaseProvider } from '../providers/database/database';
import { IonicStorageModule } from '@ionic/storage';
import { SearchPopOver } from '../pages/pop-over/searchPopOver'; 
import { ReminderModal } from '../pages/modal/modal';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SocialSharing } from '@ionic-native/social-sharing';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BookPage,
    CategoryPage,
    SearchPage,
    SearchPopOver,
    RegisterPage,
    LoginPage,
    ReminderModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BookPage,
    CategoryPage,
    SearchPage,
    SearchPopOver,
    RegisterPage,
    LoginPage,
    ReminderModal,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LibProvider,
    DatabaseProvider,
    LocalNotifications,
    SocialSharing,
    YoutubeVideoPlayer
  ]
})
export class AppModule {}
