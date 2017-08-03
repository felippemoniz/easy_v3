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
import { NavController, NavParams } from 'ionic-angular';
import { sessoesService } from '../../services/sessoes-service';
//import {Geolocation} from 'ionic-native';
//import { Loading } from 'ionic-angular';
import { chip } from '../../model/chip';
var SessoesAgora = (function () {
    //lições aprendidas: tive que definir o tipo sessoesService pois dava pau no momento da execução, não faço ideia do porquê
    function SessoesAgora(nav, navParams, sessoesService) {
        var _this = this;
        this.nav = nav;
        this.navParams = navParams;
        this.sessoesService = sessoesService;
        this.filmesSelecionados = [];
        this.sessoesOriginais = [];
        this.qtSessoes = 0;
        this.tags = [];
        this.filtroData = navParams.get('param1');
        this.sessoesService = sessoesService;
        //this.nav.present(this.loading);
        this.carregaTags();
        this.sessoesService.findNow(this.filtroData).subscribe(function (data) {
            _this.sessoes = data;
            _this.qtSessoes = _this.sessoes.length;
            //this.loading.dismiss();
        }, function (err) {
            console.log(err);
        }, function () { return console.log(""); });
        //this.getAllDistances();
        this.sessoesOriginais = this.sessoes;
    }
    SessoesAgora.prototype.carregaTags = function () {
        var item = new chip();
        item.nome = 'LEG';
        item.nomeDetalhado = 'Legendado';
        item.selecionado = false;
        this.tags.push(item);
        var item2 = new chip();
        item2.nome = 'DUB';
        item2.nomeDetalhado = 'Dublado';
        item2.selecionado = false;
        this.tags.push(item2);
        var item3 = new chip();
        item3.nome = '3D';
        item3.nomeDetalhado = '3D';
        item3.selecionado = false;
        this.tags.push(item3);
        var item4 = new chip();
        item4.nome = '2D';
        item4.nomeDetalhado = 'Normal';
        item4.selecionado = false;
        this.tags.push(item4);
    };
    SessoesAgora.prototype.formataHora = function (hora) {
        var horaString = hora.toString();
        return horaString.substring(0, 2) + ":" + horaString.substring(2, 4);
    };
    SessoesAgora.prototype.verSessoesProximas = function () {
        var sessoesOrdenadas = [];
        for (var i = 0; i < this.sessoes.length; i++) {
            var item = this.sessoes[i];
            if (item.distancia <= 5) {
                sessoesOrdenadas.push(item);
            }
        }
        this.sessoes = sessoesOrdenadas;
    };
    SessoesAgora.prototype.formataTempoAteSessao = function (horaSessao) {
        var horaSessaoAtual = this.formataHora(horaSessao);
        var d = new Date();
        var horaAtual = d.getHours() + ":" + d.getMinutes();
        var texto = this.diferencaHoras(horaSessaoAtual, horaAtual);
        return texto;
    };
    SessoesAgora.prototype.diferencaHoras = function (t1, t2) {
        var t1parts = t1.split(':');
        var t1cm = Number(t1parts[0]) * 60 + Number(t1parts[1]);
        var t2parts = t2.split(':');
        var t2cm = Number(t2parts[0]) * 60 + Number(t2parts[1]);
        var hour = Math.floor((t1cm - t2cm) / 60);
        var min = Math.floor((t1cm - t2cm) % 60);
        if (hour == 0) {
            return min + " minutos";
        }
        else {
            return (hour + ' horas e ' + min + ' minutos');
        }
    };
    SessoesAgora.prototype.formataData = function (data) {
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
    SessoesAgora.prototype.retornaDataAtual = function () {
        var dataAtual = new Date();
        var dia = ("0" + (dataAtual.getDate())).slice(-2);
        var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
        var ano = dataAtual.getFullYear();
        return ano + "-" + mes + "-" + dia;
    };
    SessoesAgora.prototype.formataDistanciaAmigavel = function (distancia) {
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
    SessoesAgora.prototype.getDistance = function (origin, destination) {
        var distance = geolib.getDistance(origin, destination);
        return geolib.convertUnit('km', distance, 2);
    };
    /*
      private getAllDistances(){
    
        Geolocation.getCurrentPosition().then(result=>{
          for (let i = 0; i < this.sessoes.length; i++){
            let sessao = this.sessoes[i];
            console.log(result.coords.latitude + " - " + result.coords.longitude)
            sessao.distancia = this.getDistance(
               {latitude: result.coords.latitude,
               longitude: result.coords.longitude},
               {latitude : sessao.longitude,
               longitude : sessao.latitude}
              )
            }
        });
    
      }
    */
    SessoesAgora.prototype.calculaHoraFim = function (time, minsToAdd) {
        function z(n) {
            return (n < 10 ? '0' : '') + n;
        }
        var bits = time.split(':');
        var mins = bits[0] * 60 + (+bits[1]) + (+minsToAdd);
        return z(mins % (24 * 60) / 60 | 0) + ':' + z(mins % 60);
    };
    SessoesAgora.prototype.selecionaOpcaoPrefs = function (listaPref) {
        listaPref.selecionado = !listaPref.selecionado;
    };
    SessoesAgora.prototype.voltar = function () {
        this.nav.pop();
    };
    return SessoesAgora;
}());
SessoesAgora = __decorate([
    Component({
        templateUrl: 'sessoesAgora.html',
        providers: [sessoesService]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, sessoesService])
], SessoesAgora);
export { SessoesAgora };
//# sourceMappingURL=sessoesAgora.js.map