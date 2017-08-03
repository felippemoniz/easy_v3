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
import { NavParams } from 'ionic-angular';
import { cinemaService } from '../../services/cinema-service';
var ListaCinemas = (function () {
    function ListaCinemas(nav, navParams, cinemaService) {
        var _this = this;
        this.nav = nav;
        this.navParams = navParams;
        this.cinemaService = cinemaService;
        this.cinemasSelecionados = [];
        this.contadorCinemasEscolhidos = 0;
        this.diaSemanaEscolhido = "";
        this.filtroData = navParams.get('param1');
        this.diaSemanaEscolhido = navParams.get('param2');
        this.cinemaService = cinemaService;
        //this.nav.present(this.loading);
        this.cinemaService.findAll().subscribe(function (data) {
            _this.cinemas = data;
            //this.loading.dismiss();
        }, function (err) {
            console.log(err);
        }, function () { return console.log(); });
        //this.getAllDistances();
    }
    ListaCinemas.prototype.retornaDataAtual = function () {
        var dataAtual = new Date();
        var dia = ("0" + (dataAtual.getDate())).slice(-2);
        var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
        var ano = dataAtual.getFullYear();
        return ano + "-" + mes + "-" + dia;
    };
    ListaCinemas.prototype.formataData = function (data) {
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
    ListaCinemas.prototype.getDistance = function (origin, destination) {
        var distance = geolib.getDistance(origin, destination);
        return geolib.convertUnit('km', distance, 2);
    };
    ListaCinemas.prototype.formataDistanciaAmigavel = function (distancia) {
        if (distancia <= 2) {
            return "Bem perto";
        }
        else if (distancia > 2 && distancia <= 5) {
            return "Perto";
        }
        else if (distancia > 5 && distancia <= 20) {
            return "Um pouco longe";
        }
        else {
            return "Bem longe";
        }
    };
    /*
      private getAllDistances(){
    
        Geolocation.getCurrentPosition().then(result=>{
    
          for (let i = 0; i < this.cinemas.length; i++){
            let cinema = this.cinemas[i];
            cinema.distancia = this.getDistance(
              {latitude: result.coords.latitude,
               longitude: result.coords.longitude},
              {latitude : cinema.longitude,
               longitude : cinema.latitude}
              )
            }
    
            this.cinemas.sort(function (a, b) {
              return a.distancia - b.distancia;
            });
    
        });
    
      }
    */
    ListaCinemas.prototype.selecionaCinema = function (cinema) {
        var p = [];
        var flagEncontrado = false;
        var index;
        var indexSelecionado = this.cinemas.indexOf(cinema);
        //Marca os filmes selecionados com o "check"
        if (this.cinemas[indexSelecionado].selecionado == 1) {
            this.cinemas[indexSelecionado].selecionado = 0;
        }
        else {
            this.cinemas[indexSelecionado].selecionado = 1;
        }
        //faz a busca no array de filmes selecionados
        for (var i = 0; i < this.cinemasSelecionados.length; i++) {
            var item = this.cinemasSelecionados[i];
            if (item.idcinema == cinema.idcinema) {
                flagEncontrado = true;
                index = i;
            }
        }
        if (flagEncontrado == false) {
            this.cinemasSelecionados.push(cinema);
            this.contadorCinemasEscolhidos = this.cinemasSelecionados.length;
        }
        else {
            this.cinemasSelecionados.splice(index, 1);
            this.contadorCinemasEscolhidos = this.cinemasSelecionados.length;
        }
    };
    ListaCinemas.prototype.verSessoes = function () {
        this.nav.push(Sessoes, {
            param1: this.cinemasSelecionados,
            param2: this.filtroData,
            param3: "C",
            param4: this.diaSemanaEscolhido
        });
    };
    ListaCinemas.prototype.voltar = function () {
        this.nav.pop();
    };
    return ListaCinemas;
}());
ListaCinemas = __decorate([
    Component({
        templateUrl: 'listaCinemas.html',
        providers: [cinemaService]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, cinemaService])
], ListaCinemas);
export { ListaCinemas };
//# sourceMappingURL=listaCinemas.js.map