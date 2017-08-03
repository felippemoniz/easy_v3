var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { ListaFilmes } from '../pages/listaFilmes/listaFilmes';
import { Principal } from '../pages/principal/principal';
import { Sessoes } from '../pages/sessoes/sessoes';
import { Filtros } from '../pages/filtros/filtros';
import { Detalhes } from '../pages/detalhes/detalhes';
import { ListaCinemas } from '../pages/listaCinemas/listaCinemas';
import { SessoesAgora } from '../pages/sessoesAgora/sessoesAgora';
import { FiltroSessoes } from '../pages/filtroSessoes/filtroSessoes';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
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
            { provide: ErrorHandler, useClass: IonicErrorHandler }
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map