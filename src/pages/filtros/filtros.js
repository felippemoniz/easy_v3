var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListaFilmes } from '../listaFilmes/listaFilmes';
import { ListaCinemas } from '../listaCinemas/listaCinemas';
import { SessoesAgora } from '../sessoesAgora/sessoesAgora';
import { LoadingController } from 'ionic-angular';
import { filmesEmCartazService } from '../../services/filmesEmCartaz-service';
import { sessoesService } from '../../services/sessoes-service';
var Filtros = (function () {
    function Filtros(nav, navParams, filmesEmCartazService, sessoesService, loadingCtrl) {
        var _this = this;
        this.nav = nav;
        this.navParams = navParams;
        this.filmesEmCartazService = filmesEmCartazService;
        this.sessoesService = sessoesService;
        this.loadingCtrl = loadingCtrl;
        this.testSlides = [];
        this.dataAtual = "";
        this.dataEscolhida = "";
        this.diaSemanaEscolhido = "";
        this.loading = loadingCtrl.create({
            content: 'Aguarde...'
        });
        this.loading.present();
        this.dataAtual = this.retornaDataAtual();
        this.filmesEmCartazService = filmesEmCartazService;
        this.sessoesService = sessoesService;
        this.filmesEmCartazService.getTop6().subscribe(function (data) {
            _this.filmes = data;
            //console.log(this.filmes.length)
        }, function (err) {
            console.log(err);
        }, function () { return console.log(); });
        this.sessoesService.getDates(this.dataAtual).subscribe(function (data) {
            _this.datas = data;
            _this.marcaDataDefault();
            _this.loading.dismiss();
        }, function (err) {
            console.log(err);
        }, function () { return console.log(); });
    }
    Filtros.prototype.marcaDataDefault = function () {
        var dataDoScroll;
        if (this.dataEscolhida == "") {
            for (var i = 0; i < this.datas.length; i++) {
                var item = this.datas[i];
                dataDoScroll = this.formataDataServico(item.data);
                if (dataDoScroll == this.retornaDataAtual()) {
                    item.selecionado = true;
                    this.dataEscolhida = dataDoScroll;
                    this.diaSemanaEscolhido = item.diasemana;
                }
            }
        }
    };
    Filtros.prototype.retornaDataAtual = function () {
        var dataAtual = new Date();
        var dia = ("0" + (dataAtual.getDate())).slice(-2);
        var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
        var ano = dataAtual.getFullYear();
        return ano + "-" + mes + "-" + dia;
    };
    Filtros.prototype.retornaDataAtualSessoesAgora = function () {
        var dataAtual = new Date();
        var dia = ("0" + (dataAtual.getDate())).slice(-2);
        var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
        var ano = dataAtual.getFullYear();
        var hora = dataAtual.getHours();
        var minuto = dataAtual.getMinutes();
        return ano + "-" + mes + "-" + dia + "-" + hora + "-" + minuto;
    };
    Filtros.prototype.formataData = function (data) {
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
    Filtros.prototype.formataDataServico = function (data) {
        var dia, mes, ano, dataReduzida;
        dataReduzida = data.substring(0, 10);
        mes = data.substring(5, 7);
        dia = data.substring(8, 10);
        if (data != null) {
            return data.substring(0, 10);
        }
        else {
            return null;
        }
    };
    Filtros.prototype.verCinemas = function () {
        var data = this.dataEscolhida;
        if (data == "") {
            data = this.dataAtual;
        }
        else {
            data = this.formataDataServico(this.dataEscolhida);
        }
        this.nav.push(ListaCinemas, {
            param1: data,
            param2: this.diaSemanaEscolhido
        });
    };
    Filtros.prototype.verFilmes = function () {
        var data = this.dataEscolhida;
        if (data == "") {
            data = this.dataAtual;
        }
        else {
            data = this.formataDataServico(this.dataEscolhida);
        }
        this.nav.push(ListaFilmes, {
            param1: data,
            param2: this.diaSemanaEscolhido
        });
    };
    Filtros.prototype.verSessoesAgora = function () {
        var dataAgora = this.retornaDataAtualSessoesAgora();
        this.nav.push(SessoesAgora, {
            param1: dataAgora
        });
    };
    Filtros.prototype.selecionaOpcaoQueroIr = function (listaQuero) {
        for (var i = 0; i < this.datas.length; i++) {
            var item = this.datas[i];
            item.selecionado = false;
        }
        listaQuero.selecionado = !listaQuero.selecionado;
        this.dataEscolhida = listaQuero.data;
        this.diaSemanaEscolhido = listaQuero.diasemana;
    };
    return Filtros;
}());
__decorate([
    ViewChild('botaoCinema'),
    __metadata("design:type", Object)
], Filtros.prototype, "botaoCinema", void 0);
Filtros = __decorate([
    Component({
        templateUrl: 'filtros.html',
        providers: [filmesEmCartazService, sessoesService]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        filmesEmCartazService,
        sessoesService,
        LoadingController])
], Filtros);
export { Filtros };
//# sourceMappingURL=filtros.js.map