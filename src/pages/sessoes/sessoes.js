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
import { chip } from '../../model/chip';
import { cinemaService } from '../../services/cinema-service';
import { filmesEmCartazService } from '../../services/filmesEmCartaz-service';
import { LoadingController } from 'ionic-angular';
var Sessoes = (function () {
    function Sessoes(nav, navParams, sessoesService, cinemaService, filmesEmCartazService, loadingCtrl) {
        var _this = this;
        this.nav = nav;
        this.navParams = navParams;
        this.sessoesService = sessoesService;
        this.cinemaService = cinemaService;
        this.filmesEmCartazService = filmesEmCartazService;
        this.loadingCtrl = loadingCtrl;
        this.itensSelecionados = [];
        this.tagsSelecionadas = [];
        this.sessoesFiltradas = [];
        this.tags = [];
        this.sessoesOriginais = [];
        this.qtSessoes = 0;
        this.diaSemanaEscolhido = "";
        this.itensSelecionados = navParams.get('param1');
        this.filtroData = navParams.get('param2');
        this.tipoPesquisa = navParams.get('param3');
        this.diaSemanaEscolhido = navParams.get('param4');
        this.sessoesService = sessoesService;
        this.cinemaService = cinemaService;
        this.filmesEmCartazService = filmesEmCartazService;
        var filtro = "";
        this.carregaTags();
        this.loading = loadingCtrl.create({
            content: 'Aguarde...'
        });
        //Se a consulta vier da página de cinemas
        if (this.tipoPesquisa === "C") {
            //Recupera os ids dos filmes selecionados
            for (var i = 0; i < this.itensSelecionados.length; i++) {
                filtro = filtro + "," + this.itensSelecionados[i].idcinema;
            }
            filtro = filtro.substring(1, filtro.length);
            this.sessoesService.findByTheater(filtro, this.filtroData).subscribe(function (data) {
                _this.sessoes = data;
                _this.qtSessoes = _this.sessoes.length;
                _this.sessoesOriginais = _this.sessoes;
                //this.loading.dismiss();
            }, function (err) {
                console.log(err);
            }, function () { return console.log(""); });
            /*  this.filmesEmCartazService.findFilmesPorSessao(filtro,this.filtroData).subscribe(
                          data => {
                              this.filmes = data;
  
                          },
                          err => {
                              console.log(err);
                          },
                          () => console.log("")
              ); */
            //Se a consulta vier da página de filmes em cartaz
        }
        else {
            //Recupera os ids dos filmes selecionados
            for (var i = 0; i < this.itensSelecionados.length; i++) {
                filtro = filtro + "," + this.itensSelecionados[i].idfilme;
            }
            filtro = filtro.substring(1, filtro.length);
            this.sessoesService.findById(filtro, this.filtroData).subscribe(function (data) {
                _this.sessoes = data;
                _this.qtSessoes = _this.sessoes.length;
                //this.loading.dismiss();
            }, function (err) {
                console.log(err);
            }, function () { return console.log(""); });
            /*  this.cinemaService.findCinemaPorSessao(filtro,this.filtroData).subscribe(
                         data => {
                             this.cinemas = data;
 
                         },
                         err => {
                             console.log(err);
                         },
                         () => console.log("")
             ); */
        }
    }
    Sessoes.prototype.carregaTags = function () {
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
    Sessoes.prototype.formataTempoAteSessao = function (horaSessao) {
        var horaSessaoAtual = this.formataHora(horaSessao);
        var d = new Date();
        var horaAtual = d.getHours() + ":" + d.getMinutes();
        var texto = this.diferencaHoras(horaSessaoAtual, horaAtual);
        return texto;
    };
    Sessoes.prototype.formataHora = function (hora) {
        var horaString = hora.toString();
        return horaString.substring(0, 2) + ":" + horaString.substring(2, 4);
    };
    Sessoes.prototype.calculaHoraFim = function (time, minsToAdd) {
        function z(n) {
            return (n < 10 ? '0' : '') + n;
        }
        var bits = time.split(':');
        var mins = bits[0] * 60 + (+bits[1]) + (+minsToAdd);
        return z(mins % (24 * 60) / 60 | 0) + ':' + z(mins % 60);
    };
    Sessoes.prototype.diferencaHoras = function (t1, t2) {
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
    Sessoes.prototype.selecionaTagCinema = function (listaPref) {
        for (var i = 0; i < this.sessoes.length; i++) {
            var item = this.sessoes[i];
            if (item.idcinema == listaPref.idcinema) {
                item.selecionado = !item.selecionado;
            }
        }
        listaPref.selecionado = !listaPref.selecionado;
    };
    Sessoes.prototype.selecionaTagFilme = function (listaPref) {
        for (var i = 0; i < this.sessoes.length; i++) {
            var item = this.sessoes[i];
            if (item.idfilme == listaPref.idfilme) {
                item.selecionado = !item.selecionado;
            }
        }
        listaPref.selecionado = !listaPref.selecionado;
    };
    Sessoes.prototype.selecionaTag = function (tag) {
        tag.selecionado = !tag.selecionado;
        var tipo = tag.nomeDetalhado;
        console.log(tag);
        if (this.tagsSelecionadas.indexOf(tipo) == -1) {
            this.tagsSelecionadas.push(tipo);
        }
        else {
            this.tagsSelecionadas.splice(this.tagsSelecionadas.indexOf(tipo), 1);
        }
        this.filtraSessoes(tag);
        //console.log(this.tagsSelecionadas)
    };
    Sessoes.prototype.filtraSessoes_ = function (tag) {
        var uniqueArray = this.sessoes.filter(function (elem, index, array) {
            return array.indexOf(elem) === index;
        });
    };
    Sessoes.prototype.filtraSessoes = function (tag) {
        var item, tipoSessao, valorTag;
        for (var i = 0; i < this.sessoes.length; i++) {
            item = this.sessoes[i];
            tipoSessao = item.tipo;
            if (this.tagsSelecionadas.length > 0) {
                for (var y = 0; y < this.tagsSelecionadas.length; y++) {
                    if (item.selecionado == 0) {
                        if (tipoSessao.indexOf(this.tagsSelecionadas[y]) == -1) {
                            item.selecionado = 1;
                        }
                    } /*else{
                          if (tipoSessao.indexOf(this.tagsSelecionadas[y])>=0){
                              item.selecionado = 0;
                          }
                    }*/
                }
            }
            else {
                item.selecionado = 0;
                console.log("mostra");
            }
        }
    };
    Sessoes.prototype.selecionaTag_temp = function (tag) {
        var item, tipo;
        for (var i = 0; i < this.sessoes.length; i++) {
            item = this.sessoes[i];
            tipo = item.tipo;
            //console.log(tag.nomeDetalhado + " está dentro de => " + tipo + "=" + tipo.indexOf(tag.nomeDetalhado))
            if (tag.selecionado == false) {
                if (tipo.indexOf(tag.nomeDetalhado) < 0) {
                    item.selecionado = 1;
                }
            }
            else {
                if (tipo.indexOf(tag.nomeDetalhado) >= 0) {
                    alert("Entrei");
                    item.selecionado = 0;
                }
            }
        }
        //this.contaSessoes()
        tag.selecionado = !tag.selecionado;
    };
    Sessoes.prototype.contaSessoes = function () {
        var item, count = 0;
        for (var i = 0; i < this.sessoes.length; i++) {
            item = this.sessoes[i];
            if (item.selecionado) {
                count++;
            }
        }
        this.qtSessoes = count;
    };
    Sessoes.prototype.formataData = function (data) {
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
    Sessoes.prototype.retornaDataAtual = function () {
        var dataAtual = new Date();
        var dia = ("0" + (dataAtual.getDate())).slice(-2);
        var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
        var ano = dataAtual.getFullYear();
        return ano + "-" + mes + "-" + dia;
    };
    Sessoes.prototype.filtrarSessoes = function () {
        var sessoesOrdenadas = [];
        for (var i = 0; i < this.sessoes.length; i++) {
            var item = this.sessoes[i];
            if (item.distancia <= 5) {
                sessoesOrdenadas.push(item);
            }
        }
        this.sessoes = sessoesOrdenadas;
    };
    Sessoes.prototype.voltar = function () {
        this.nav.pop();
    };
    return Sessoes;
}());
Sessoes = __decorate([
    Component({
        templateUrl: 'sessoes.html',
        providers: [sessoesService, cinemaService, filmesEmCartazService]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        sessoesService,
        cinemaService,
        filmesEmCartazService,
        LoadingController])
], Sessoes);
export { Sessoes };
//# sourceMappingURL=sessoes.js.map