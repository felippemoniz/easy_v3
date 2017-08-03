var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Sessoes } from '../sessoes/sessoes';
import { Detalhes } from '../detalhes/detalhes';
import { NavParams } from 'ionic-angular';
import { filmesEmCartazService } from '../../services/filmesEmCartaz-service';
//import {LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
var ListaFilmes = (function () {
    function ListaFilmes(nav, 
        /*public loadingCtrl: LoadingController,*/
        navParams, filmesEmCartazService, toastCtrl) {
        var _this = this;
        this.nav = nav;
        this.navParams = navParams;
        this.filmesEmCartazService = filmesEmCartazService;
        this.toastCtrl = toastCtrl;
        this.filmesSelecionados = [];
        this.contadorFilmesEscolhidos = 0;
        this.isClassVisible = false;
        this.qtFilme = 0;
        this.diaSemanaEscolhido = "";
        //this.presentLoadingIos();
        this.presentToast();
        this.filtroData = navParams.get('param1');
        this.diaSemanaEscolhido = navParams.get('param2');
        this.filmesEmCartazService = filmesEmCartazService;
        //futuramente passar a data como parametro findAll(data.data)
        this.filmesEmCartazService.findAll(this.filtroData).subscribe(function (data) {
            _this.filmes = data;
            _this.qtFilme = _this.filmes.length;
            //loading.dismiss();
            //console.log(this.qtFilme);
        }, function (err) {
            console.log(err);
        }, function () { return console.log(_this.qtFilme); });
    }
    ListaFilmes.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'User was added successfully',
            duration: 3000
        });
        toast.present();
    };
    Object.defineProperty(ListaFilmes, "parameters", {
        /*presentLoadingIos() {
       
           let loading = this.loadingCtrl.create({
             spinner: 'ios',
             content: 'This is the "ios" spinner. It will dismiss after 3 seconds.',
             duration: 3000
           });
       
           console.log(loading)
       
           //loading.present();
         }
       */
        get: function () {
            return [[NavController], [NavParams], [filmesEmCartazService]];
        },
        enumerable: true,
        configurable: true
    });
    ListaFilmes.prototype.retornaDataAtual = function () {
        var dataAtual = new Date();
        var dia = ("0" + (dataAtual.getDate())).slice(-2);
        var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
        var ano = dataAtual.getFullYear();
        return ano + "-" + mes + "-" + dia;
    };
    ListaFilmes.prototype.formataData = function (data) {
        var dia, mes, ano, dataReduzida;
        dataReduzida = data.substring(0, 10);
        mes = data.substring(5, 7);
        dia = data.substring(8, 10);
        if (dataReduzida == this.retornaDataAtual()) {
            return "Hoje";
        }
        else {
            return dia + "/" + mes;
        }
    };
    ListaFilmes.prototype.trataDetalhes = function (tipo, detalhe) {
        if (tipo == "C") {
            if (detalhe == "0" || detalhe == "") {
                return "Livre";
            }
            else {
                return detalhe + " anos";
            }
        }
        if (tipo == "N") {
            if (detalhe == "0" || detalhe == "") {
                return "-";
            }
            else {
                return detalhe;
            }
        }
    };
    ListaFilmes.prototype.verSessoes = function () {
        this.nav.push(Sessoes, {
            param1: this.filmesSelecionados,
            param2: this.filtroData,
            param3: "F",
            param4: this.diaSemanaEscolhido
        });
    };
    ListaFilmes.prototype.verDetalhes = function (filmeEmCartaz) {
        this.nav.push(Detalhes, {
            param1: filmeEmCartaz
        });
    };
    //Seleciona os filmes, marcando com um check, atualizando o contador em tela e
    //carregando o array filmes selecionados
    ListaFilmes.prototype.selecionaFilme = function (filmeEmCartaz) {
        var p = [];
        var flagEncontrado = false;
        var index;
        var indexSelecionado = this.filmes.indexOf(filmeEmCartaz);
        //Marca os filmes selecionados com o "check"
        if (this.filmes[indexSelecionado].selecionado == 1) {
            this.filmes[indexSelecionado].selecionado = 0;
        }
        else {
            this.filmes[indexSelecionado].selecionado = 1;
        }
        //faz a busca no array de filmes selecionados
        for (var i = 0; i < this.filmesSelecionados.length; i++) {
            var item = this.filmesSelecionados[i];
            if (item.idfilme == filmeEmCartaz.idfilme) {
                flagEncontrado = true;
                index = i;
            }
        }
        if (flagEncontrado == false) {
            this.filmesSelecionados.push(filmeEmCartaz);
            this.contadorFilmesEscolhidos = this.filmesSelecionados.length;
        }
        else {
            this.filmesSelecionados.splice(index, 1);
            this.contadorFilmesEscolhidos = this.filmesSelecionados.length;
        }
    };
    ListaFilmes.prototype.voltar = function () {
        this.nav.pop();
    };
    return ListaFilmes;
}());
ListaFilmes = __decorate([
    Component({
        templateUrl: 'listaFilmes.html',
        providers: [filmesEmCartazService]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        filmesEmCartazService,
        ToastController])
], ListaFilmes);
export { ListaFilmes };
//# sourceMappingURL=listaFilmes.js.map