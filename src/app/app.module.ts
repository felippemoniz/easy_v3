import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import {ListaFilmes} from '../pages/listaFilmes/listaFilmes';
import {Principal} from '../pages/principal/principal';
import {Sessoes} from '../pages/sessoes/sessoes';
import {Filtros} from '../pages/filtros/filtros';
import {Detalhes} from '../pages/detalhes/detalhes';
import {ListaCinemas} from '../pages/listaCinemas/listaCinemas';
import {SessoesAgora} from '../pages/sessoesAgora/sessoesAgora';
import {FiltroSessoes} from '../pages/filtroSessoes/filtroSessoes';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    MyApp,
    ListaFilmes,
    Principal,
    Sessoes,
    Filtros,
    Detalhes,
    ListaCinemas,
    SessoesAgora,
    FiltroSessoes
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListaFilmes,
    Principal,
    Sessoes,
    Filtros,
    Detalhes,
    ListaCinemas,
    SessoesAgora,
    FiltroSessoes
  ],
  providers: [
    StatusBar,
    SplashScreen,
    YoutubeVideoPlayer,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
