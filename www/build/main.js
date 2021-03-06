webpackJsonp([0],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Filtros; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__listaFilmes_listaFilmes__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__listaCinemas_listaCinemas__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sessoesAgora_sessoesAgora__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_filmesEmCartaz_service__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_sessoes_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__detalhes_detalhes__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__preferencias_preferencias__ = __webpack_require__(209);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var Filtros = (function () {
    function Filtros(nav, navParams, filmesEmCartazService, sessoesService, modalCtrl, loadingCtrl) {
        var _this = this;
        this.nav = nav;
        this.navParams = navParams;
        this.filmesEmCartazService = filmesEmCartazService;
        this.sessoesService = sessoesService;
        this.modalCtrl = modalCtrl;
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
        this.filmesEmCartazService.findEstreiaDaSemana().subscribe(function (data) {
            _this.filmeEstreia = data;
            console.log(_this.filmeEstreia);
            _this.imagemFilmeEstreia = _this.filmeEstreia[0].imagem;
            _this.nomeFilmeEstreia = _this.filmeEstreia[0].nome;
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
    Filtros.prototype.abreFiltros = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__preferencias_preferencias__["a" /* Preferencias */]);
        modal.present();
    };
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
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__listaCinemas_listaCinemas__["a" /* ListaCinemas */], {
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
        this.nav.push(__WEBPACK_IMPORTED_MODULE_2__listaFilmes_listaFilmes__["a" /* ListaFilmes */], {
            param1: data,
            param2: this.diaSemanaEscolhido
        });
    };
    Filtros.prototype.verSessoesAgora = function () {
        var dataAgora = this.retornaDataAtualSessoesAgora();
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__sessoesAgora_sessoesAgora__["a" /* SessoesAgora */], {
            param1: dataAgora
        });
    };
    Filtros.prototype.verDetalhes = function (filmeEmCartaz) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_7__detalhes_detalhes__["a" /* Detalhes */], {
            param1: filmeEmCartaz,
            param2: "ESTREIA"
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
    Filtros.prototype.abrirPreferencias = function () {
        alert("Aqui ");
    };
    return Filtros;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('botaoCinema'),
    __metadata("design:type", Object)
], Filtros.prototype, "botaoCinema", void 0);
Filtros = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\Felippe\IONIC\easy_v3\src\pages\filtros\filtros.html"*/'<ion-toolbar >\n\n   <ion-title color="primary">EasyMovie</ion-title>\n\n     <ion-buttons end>\n\n      <button ion-button icon-only (tap)="abreFiltros()" style="color:white">\n\n        <ion-icon name="ios-settings" ></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n</ion-toolbar>\n\n\n\n\n\n\n\n\n\n\n\n  <ion-content class="background" no-bounce>\n\n\n\n\n\n    <div class="divHeader" >\n\n\n\n            <div class="imageHeader">\n\n            <img class="imagemCabecalho" src={{imagemFilmeEstreia}} />\n\n            </div>\n\n\n\n\n\n            <div class="imageHeader2" >\n\n              .\n\n            </div>\n\n\n\n           <div class="card-textoGrande" >\n\n             {{nomeFilmeEstreia}}<br>\n\n             <span style="color:#e1b612;font-size:12px"><b>ESTREIA DA SEMANA</b></span>\n\n          </div>\n\n\n\n          <div class="botaoSuperior" style=" bottom: 0%; width: 100%; height: 20% ">\n\n\n\n            <ion-scroll  scrollX="true" class="scrollHorizontalDatas" overflow-scroll="true" >\n\n              <ion-chip  *ngFor=" let data of datas"  [ngClass]="data.selecionado ? \'ativo\' : \'inativo\'" (tap)="selecionaOpcaoQueroIr(data)">\n\n                <ion-label  class="tag"><b>{{formataData(data.data)}}</b> ({{data.diasemana}})</ion-label>\n\n              </ion-chip>\n\n            </ion-scroll>\n\n\n\n          </div>\n\n\n\n\n\n\n\n    </div>\n\n\n\n<br><br>\n\n\n\n<ion-grid class="gradeBotoes">\n\n  <ion-row>\n\n    <ion-col col-50 class="botaoMenu" style="border-right:  1px solid #ccc8c5;" (tap)="verFilmes()" >\n\n    <br>\n\n              <ion-grid >\n\n                  <ion-row >\n\n                      <ion-col class="botaoTexto">Comece por<br><span class="botaoTexto2">Filmes</span></ion-col>\n\n                  </ion-row>\n\n             </ion-grid>\n\n    <br>\n\n    </ion-col>\n\n    <ion-col col-50 class="botaoMenu" (tap)="verCinemas()">\n\n    <br>\n\n              <ion-grid >\n\n                  <ion-row >\n\n                      <ion-col class="botaoTexto">Comece por<br><span class="botaoTexto2">Cinemas</span></ion-col>\n\n                  </ion-row>\n\n             </ion-grid>\n\n    <br>\n\n    </ion-col>\n\n  </ion-row>\n\n  <ion-row>\n\n    <ion-col class="botaoMenu" (tap)="verSessoesAgora()" style="border-bottom:  1px solid #ccc8c5;">\n\n    <br>\n\n            <ion-grid >\n\n                <ion-row >\n\n                    <ion-col class="botaoTexto">Buscar por<br><span class="botaoTexto2">Sessões agora!</span></ion-col>\n\n                </ion-row>\n\n           </ion-grid>\n\n    <br>\n\n    </ion-col>\n\n  </ion-row>\n\n</ion-grid>\n\n\n\n<br>\n\n\n\n\n\n  </ion-content>\n\n'/*ion-inline-end:"D:\Felippe\IONIC\easy_v3\src\pages\filtros\filtros.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_5__services_filmesEmCartaz_service__["a" /* filmesEmCartazService */], __WEBPACK_IMPORTED_MODULE_6__services_sessoes_service__["a" /* sessoesService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_5__services_filmesEmCartaz_service__["a" /* filmesEmCartazService */],
        __WEBPACK_IMPORTED_MODULE_6__services_sessoes_service__["a" /* sessoesService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */]])
], Filtros);

//# sourceMappingURL=filtros.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sessoes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_sessoes_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_chip__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_cinema_service__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_filmesEmCartaz_service__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__filtroSessoes_filtroSessoes__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var Sessoes = (function () {
    function Sessoes(nav, navParams, sessoesService, cinemaService, filmesEmCartazService, popoverCtrl, storage, loadingCtrl) {
        if (loadingCtrl === void 0) { loadingCtrl = null; }
        var _this = this;
        this.nav = nav;
        this.navParams = navParams;
        this.sessoesService = sessoesService;
        this.cinemaService = cinemaService;
        this.filmesEmCartazService = filmesEmCartazService;
        this.popoverCtrl = popoverCtrl;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.itensSelecionados = [];
        this.tagsSelecionadas = [];
        this.sessoesFiltradas = [];
        this.tags = [];
        this.filtroString = [];
        this.sessoesOriginais = [];
        this.qtSessoes = 0;
        this.diaSemanaEscolhido = "";
        this.buttonColor = 'white';
        this.flagfiltrado = "N";
        var loading = this.loadingCtrl.create({
            spinner: 'ios',
            content: 'Procurando sessões disponíveis...'
        });
        loading.present();
        this.getFavoritos();
        this.itensSelecionados = navParams.get('param1');
        this.filtroData = navParams.get('param2');
        this.tipoPesquisa = navParams.get('param3');
        this.diaSemanaEscolhido = navParams.get('param4');
        this.sessoesService = sessoesService;
        this.cinemaService = cinemaService;
        this.filmesEmCartazService = filmesEmCartazService;
        var filtro = "";
        this.carregaTags();
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
                loading.dismiss();
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
                loading.dismiss();
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
    Sessoes.prototype.getFavoritos = function () {
        var _this = this;
        this.storage.get('cinemasFavoritos').then(function (cinemasFavoritos) {
            _this.cinemasGravados = cinemasFavoritos;
        });
    };
    Sessoes.prototype.carregaTags = function () {
        var item = new __WEBPACK_IMPORTED_MODULE_3__model_chip__["a" /* chip */]();
        item.nome = 'LEG';
        item.nomeDetalhado = 'Legendado';
        item.selecionado = false;
        this.tags.push(item);
        var item2 = new __WEBPACK_IMPORTED_MODULE_3__model_chip__["a" /* chip */]();
        item2.nome = 'DUB';
        item2.nomeDetalhado = 'Dublado';
        item2.selecionado = false;
        this.tags.push(item2);
        var item3 = new __WEBPACK_IMPORTED_MODULE_3__model_chip__["a" /* chip */]();
        item3.nome = '3D';
        item3.nomeDetalhado = '3D';
        item3.selecionado = false;
        this.tags.push(item3);
        var item4 = new __WEBPACK_IMPORTED_MODULE_3__model_chip__["a" /* chip */]();
        item4.nome = '2D';
        item4.nomeDetalhado = 'Normal';
        item4.selecionado = false;
        this.tags.push(item4);
    };
    Sessoes.prototype.abreDetalhesSessao = function (sessao) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_6__filtroSessoes_filtroSessoes__["a" /* FiltroSessoes */], { sessao: sessao });
        popover.present();
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
            return min + " min";
        }
        else {
            return (hour + ' h e ' + min + ' min');
        }
    };
    Sessoes.prototype.selecionaTag = function (tag) {
        tag.selecionado = !tag.selecionado;
        var retorno = "";
        if (tag.nome == "LEG") {
            if (tag.selecionado)
                this.filtroString[0] = "Legendado";
            if (!tag.selecionado)
                this.filtroString[0] = "";
        }
        if (tag.nome == "DUB") {
            if (tag.selecionado)
                this.filtroString[1] = "Dublado";
            if (!tag.selecionado)
                this.filtroString[1] = "";
        }
        if (tag.nome == "3D") {
            if (tag.selecionado)
                this.filtroString[2] = "3D";
            if (!tag.selecionado)
                this.filtroString[2] = "";
        }
        if (tag.nome == "2D") {
            if (tag.selecionado)
                this.filtroString[3] = "Normal";
            if (!tag.selecionado)
                this.filtroString[3] = "";
        }
        retorno = this.filtroString.join();
        this.mostraSessao(retorno.replace(/^,|,$/g, ''));
    };
    Sessoes.prototype.favoritos = function () {
        var item, cinema;
        var cinemasFavoritos = this.cinemasGravados;
        this.qtSessoes = 0;
        var loading;
        var stLiga;
        console.log("@@@ " + this.cinemasGravados);
        if (this.buttonColor == '#e26f6f') {
            this.buttonColor = 'white';
            stLiga = false;
            loading = this.loadingCtrl.create({
                spinner: 'ios',
                content: 'Exibindo <b>todos os cinemas</b>...'
            });
        }
        else {
            this.buttonColor = '#e26f6f';
            stLiga = true;
            loading = this.loadingCtrl.create({
                spinner: 'ios',
                content: 'Exibindo seus <b>cinemas favoritos</b>...'
            });
        }
        loading.present();
        this.mostraSessaoCinemasFavoritos("847,128");
        setInterval(function () {
            loading.dismiss();
        }, 600);
        this.flagfiltrado = "S";
    };
    Sessoes.prototype.mostraSessao = function (tags) {
        var item, tipoSessao, tags_temp, cinema;
        var cinemasFavoritos = this.cinemasGravados;
        tags_temp = tags.replace(",,,", ",");
        tags_temp = tags_temp.replace(",,", ",");
        this.qtSessoes = 0;
        console.log(tags_temp);
        for (var i = 0; i < this.sessoes.length; i++) {
            item = this.sessoes[i];
            tipoSessao = item.tipo;
            cinema = item.idcinema;
            if (tipoSessao.indexOf(tags_temp) == -1) {
                item.selecionado = 1;
            }
            else {
                item.selecionado = 0;
                this.qtSessoes = this.qtSessoes + 1;
            }
        }
        this.flagfiltrado = "S";
    };
    Sessoes.prototype.mostraSessaoCinemasFavoritos = function (tags) {
        var item, tipoSessao, tags_temp, cinema = "";
        var cinemasFavoritos = this.cinemasGravados;
        this.qtSessoes = 0;
        console.log(tags);
        for (var i = 0; i < this.sessoes.length; i++) {
            item = this.sessoes[i];
            tipoSessao = item.tipo;
            cinema = item.idcinema + "";
            if (item.selecionado == 0) {
                if (tags.indexOf(cinema) == -1) {
                    item.selecionado = 1;
                }
                else {
                    item.selecionado = 0;
                    this.qtSessoes = this.qtSessoes + 1;
                }
            }
        }
        this.flagfiltrado = "S";
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\Felippe\IONIC\easy_v3\src\pages\sessoes\sessoes.html"*/'<ion-toolbar >\n\n  <ion-buttons left>\n\n    <button ion-button icon-only style="color:white" (tap)="voltar()">\n\n        <ion-icon name="md-arrow-back"></ion-icon>\n\n    </button>\n\n  </ion-buttons>\n\n  <ion-title color="primary">EasyMovie</ion-title>\n\n  <ion-buttons end>\n\n      <button ion-button icon-only [ngStyle]="{\'color\': buttonColor}" (tap)="favoritos()">\n\n        <ion-icon name="ios-heart"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n</ion-toolbar>\n\n\n\n<ion-content style="position: relative;">\n\n<br>\n\n<div class="labelTituloTela">\n\n<b>Sessões Disponíveis</b>\n\n</div>\n\n<div class="labelSubTituloTela">{{formataData(filtroData)}} | {{diaSemanaEscolhido}}</div>\n\n\n\n<br>\n\n\n\n\n\n<ion-scroll  scrollX="true" class="scrollHorizontal" overflow-scroll="true" >\n\n  <ion-chip  *ngFor=" let tag of tags"  [ngClass]="tag.selecionado ? \'ativoSessao\' : \'inativoSessao\'"  (tap)="selecionaTag(tag)">\n\n    <ion-label class="tag"> {{tag.nome }}</ion-label>\n\n  </ion-chip>\n\n</ion-scroll>\n\n\n\n\n\n\n\n<br><br>\n\n\n\n\n\n<ion-row class="headerSessoes">\n\n  <ion-col  *ngIf="qtSessoes === 0">Nenhuma sessão encontrada :-(</ion-col>\n\n  <ion-col  *ngIf="qtSessoes === 1">Foi encontrada apenas <b>uma</b> sessão</ion-col>\n\n  <ion-col  *ngIf="qtSessoes > 1">Foram encontradas <b>{{qtSessoes}}</b> sessões</ion-col>\n\n</ion-row>\n\n\n\n<!--Scrol somente da tela de resultado -->\n\n<ion-scroll  scrollY="true" class="scrollVertical" overflow-scroll="true" >\n\n<br>\n\n<ion-list class="itemListaSessao" no-lines>\n\n\n\n<div *ngFor=" let sessao of sessoes">\n\n\n\n  <ion-item class="itemItemSessao" #sessaoFilme  *ngIf="sessao.selecionado==0" (tap)="abreDetalhesSessao(sessao)">\n\n  		<div style="position: absolute;  width: 100% ; top: 12%" >\n\n  			<ion-row style="height:90%">\n\n  				<ion-col col-2 style="text-align: center">\n\n\n\n          <span class="fonteLabelTituloHorario" style="font-weight:bold;">{{formataHora(sessao.hora)}}</span>\n\n\n\n  				</ion-col>\n\n  				<ion-col col-9>\n\n                      <!--img src={{sessao.poster}}  class="posterPequeno"-->\n\n\n\n                      <ion-avatar  class="posterPequeno">\n\n                        <img src="{{sessao.poster}}">\n\n                      </ion-avatar>\n\n\n\n\n\n                      <div style="padding-left: 22%;line-height: 20px;" >\n\n                          <div class="fonteLabelTituloFilme" >{{sessao.nomeFilme}} </div>\n\n                          <div class="fonteLabelTituloCinema" >{{sessao.nomeCinema}}</div>\n\n                          <div class="fonteLabelTituloDistancia" *ngIf="formataData(filtroData)==\'Hoje\' "> <ion-icon name="time"></ion-icon> Começa em <b>{{formataTempoAteSessao(sessao.hora)}}</b></div>\n\n                         <div class="fonteLabelTituloDistancia" *ngIf="formataData(filtroData)!=\'Hoje\' ">&nbsp;</div>                          \n\n                          <div class="fonteLabelTituloDistancia"> {{sessao.tipo}} {{sessao.tipo3d}}</div>\n\n                          <div class="estrelaRatingSessao"><img src="./images/starRatingSessao.png" class="estrelaRatingTamanhoSessao"></div><div class="estrelaRatingTamanhoSessaoTexto"><b>6.9</b></div>\n\n                      </div>\n\n  				</ion-col>\n\n  			</ion-row>\n\n\n\n  		</div>\n\n  		<img  src="./images/linhaSessaoAlta.png" style="max-width: 95%;" *ngIf="sessao.selecionado==0"/>\n\n\n\n  </ion-item>\n\n</div>\n\n\n\n\n\n</ion-list>\n\n</ion-scroll>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Felippe\IONIC\easy_v3\src\pages\sessoes\sessoes.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__services_sessoes_service__["a" /* sessoesService */], __WEBPACK_IMPORTED_MODULE_4__services_cinema_service__["a" /* cinemaService */], __WEBPACK_IMPORTED_MODULE_5__services_filmesEmCartaz_service__["a" /* filmesEmCartazService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_sessoes_service__["a" /* sessoesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_sessoes_service__["a" /* sessoesService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_cinema_service__["a" /* cinemaService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_cinema_service__["a" /* cinemaService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_filmesEmCartaz_service__["a" /* filmesEmCartazService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_filmesEmCartaz_service__["a" /* filmesEmCartazService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* PopoverController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* PopoverController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */]) === "function" && _h || Object])
], Sessoes);

var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=sessoes.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return sessoesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var sessoesURL = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* SERVER_URL */] + 'sessoes/';
var sessoesAgoraURL = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* SERVER_URL */] + 'sessoesAgora/';
var sessoesHojeURL = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* SERVER_URL */] + 'sessoesHoje/';
var sessoesPorCinemaURL = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* SERVER_URL */] + 'sessoesPorCinema/';
var sessoesHojePorCinemaURL = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* SERVER_URL */] + 'sessoesHojePorCinema/';
var sessoesService = (function () {
    function sessoesService(http) {
        this.http = http;
        this.http = http;
    }
    Object.defineProperty(sessoesService, "parameters", {
        get: function () {
            return [[__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]]];
        },
        enumerable: true,
        configurable: true
    });
    sessoesService.prototype.findById = function (id, data) {
        if (data == this.retornaDataAtual()) {
            return this.http.get(sessoesHojeURL + id + "/" + data + "/" + this.retornaHoraAtualSessoesAgora())
                .map(function (res) { return res.json(); });
        }
        else {
            return this.http.get(sessoesURL + id + "/" + data)
                .map(function (res) { return res.json(); });
        }
    };
    sessoesService.prototype.retornaHoraAtualSessoesAgora = function () {
        var dataAtual = new Date();
        var hora = ("0" + (dataAtual.getHours())).slice(-2);
        var minuto = ("0" + (dataAtual.getMinutes())).slice(-2);
        return hora + minuto;
    };
    sessoesService.prototype.retornaDataAtual = function () {
        var dataAtual = new Date();
        var dia = ("0" + (dataAtual.getDate())).slice(-2);
        var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2);
        var ano = dataAtual.getFullYear();
        return ano + "-" + mes + "-" + dia;
    };
    sessoesService.prototype.getDates = function (data) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* SERVER_URL */] + 'getDates/' + data)
            .map(function (res) { return res.json(); });
    };
    sessoesService.prototype.findByTheater = function (id, data) {
        if (data == this.retornaDataAtual()) {
            console.log("Hoje");
            return this.http.get(sessoesHojePorCinemaURL + id + "/" + data + "/" + this.retornaHoraAtualSessoesAgora())
                .map(function (res) { return res.json(); });
        }
        else {
            console.log("utro dia");
            return this.http.get(sessoesPorCinemaURL + id + "/" + data)
                .map(function (res) { return res.json(); });
        }
    };
    sessoesService.prototype.findNow = function (data) {
        return this.http.get(sessoesAgoraURL + data)
            .map(function (res) { return res.json(); });
    };
    sessoesService.prototype.handleError = function (error) {
        console.error(error);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error');
    };
    return sessoesService;
}());
sessoesService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
], sessoesService);

//# sourceMappingURL=sessoes-service.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SERVER_URL; });
//export let SERVER_URL = "http://localhost:8080/";
//export let SERVER_URL = "http://localhost:8080/";
var SERVER_URL = "https://shrouded-shelf-45541.herokuapp.com/";
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cinemaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var cinemas = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* SERVER_URL */] + 'cinemas/';
var sessoes = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* SERVER_URL */] + 'sessoesPorCinema/';
var cinemaService = (function () {
    function cinemaService(http) {
        this.http = http;
        this.http = http;
    }
    Object.defineProperty(cinemaService, "parameters", {
        get: function () {
            return [[__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]]];
        },
        enumerable: true,
        configurable: true
    });
    cinemaService.prototype.findAll = function () {
        return this.http.get(cinemas)
            .map(function (res) { return res.json(); });
    };
    cinemaService.prototype.findByTheater = function (id, data) {
        return this.http.get(sessoes + id + "/" + data)
            .map(function (res) { return res.json(); });
    };
    cinemaService.prototype.findCinemaPorSessao = function (id, data) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* SERVER_URL */] + 'cinemasPorSessao/' + id + "/" + data)
            .map(function (res) { return res.json(); });
    };
    cinemaService.prototype.handleError = function (error) {
        console.error(error);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error');
    };
    return cinemaService;
}());
cinemaService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
], cinemaService);

//# sourceMappingURL=cinema-service.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return filmesEmCartazService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var filmesEmCartazURL = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* SERVER_URL */] + 'filmesEmCartaz/';
var filmesEmCartazService = (function () {
    function filmesEmCartazService(http) {
        this.http = http;
        this.http = http;
    }
    Object.defineProperty(filmesEmCartazService, "parameters", {
        get: function () {
            return [[__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]]];
        },
        enumerable: true,
        configurable: true
    });
    filmesEmCartazService.prototype.findAll = function (filtro) {
        return this.http.get(filmesEmCartazURL + filtro)
            .map(function (res) { return res.json(); });
    };
    filmesEmCartazService.prototype.findEstreiaDaSemana = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* SERVER_URL */] + 'filmeEstreiaDaSemana/')
            .map(function (res) { return res.json(); });
    };
    filmesEmCartazService.prototype.findFilmesPorSessao = function (id, data) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* SERVER_URL */] + 'filmesPorSessao/' + id + "/" + data)
            .map(function (res) { return res.json(); });
    };
    filmesEmCartazService.prototype.handleError = function (error) {
        console.error(error);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error');
    };
    return filmesEmCartazService;
}());
filmesEmCartazService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
], filmesEmCartazService);

//# sourceMappingURL=filmesEmCartaz-service.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Detalhes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_youtube_video_player__ = __webpack_require__(207);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Detalhes = (function () {
    function Detalhes(nav, navParams, youtube) {
        this.nav = nav;
        this.navParams = navParams;
        this.youtube = youtube;
        this.isEstreia = false;
        this.filmeSelecionado = navParams.get('param1');
        if (navParams.get('param2') === "ESTREIA") {
            this.isEstreia = true;
        }
    }
    Object.defineProperty(Detalhes, "parameters", {
        get: function () {
            return [[__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]], [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]], [__WEBPACK_IMPORTED_MODULE_2__ionic_native_youtube_video_player__["a" /* YoutubeVideoPlayer */]]];
        },
        enumerable: true,
        configurable: true
    });
    Detalhes.prototype.trataDetalhes = function (tipo, detalhe) {
        if (tipo == "C") {
            if (detalhe == "0" || detalhe == "") {
                return "Livre";
            }
            else {
                return detalhe + " anos";
            }
        }
    };
    Detalhes.prototype.abrirTrailer = function (link) {
        this.youtube.openVideo('https://www.youtube.com/watch?v=DCNEMfQ_uUg');
    };
    Detalhes.prototype.voltar = function () {
        this.nav.pop();
    };
    return Detalhes;
}());
Detalhes = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\Felippe\IONIC\easy_v3\src\pages\detalhes\detalhes.html"*/'<ion-toolbar >\n\n  <ion-buttons left>\n\n    <button ion-button icon-only style="color:white" (tap)="voltar()">\n\n        <ion-icon name="md-arrow-back"></ion-icon>\n\n    </button>\n\n  </ion-buttons>\n\n  <ion-title color="primary">EasyMovie</ion-title>\n\n</ion-toolbar>\n\n\n\n\n\n\n\n<ion-content style="position: relative;">\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div>\n\n<img class=\'imagemTamanhoFixo\' *ngIf="!isEstreia" src={{filmeSelecionado.imagem}}>\n\n<img class=\'imagemTamanhoFixo\' *ngIf="isEstreia" src={{filmeSelecionado.images[1].url}}>\n\n</div>\n\n\n\n<div class="headerDetalhesFilme" *ngIf="!isEstreia">\n\n\n\n    <div class="posCabecalhoFilme">\n\n        <div class="fonteTituloFilmeDetalhe" text-wrap>{{filmeSelecionado.nome}}</div>\n\n        <div class="labelGeneroFilme"> {{filmeSelecionado.genero}} | {{filmeSelecionado.duracao}} min |  {{filmeSelecionado.classificacao}}</div>\n\n    </div>\n\n\n\n    <div class="posCartazFilme">\n\n      <img class="imagemTamanhoCartaz" src={{filmeSelecionado.poster}}>\n\n    </div>\n\n</div>\n\n\n\n<div class="headerDetalhesFilme" *ngIf="isEstreia">\n\n\n\n    <div class="posCabecalhoFilme">\n\n        <div class="fonteTituloFilme">{{filmeSelecionado.title}}</div> <br>\n\n        <div class="labelGeneroFilme"> {{filmeSelecionado.genres[0]}} | {{filmeSelecionado.duration}} min |  {{filmeSelecionado.contentRating}}</div>\n\n    </div>\n\n\n\n    <div class="posCartazFilme">\n\n      <img class="imagemTamanhoCartaz" src={{filmeSelecionado.images[0].url}}>\n\n    </div>\n\n</div>\n\n\n\n\n\n<div class="headerSubDetalhesFilme" *ngIf="!isEstreia">\n\n\n\n  <div class="posRatingIMDB">\n\n    <ion-chip class="ratingIMDBDetalhe">\n\n      <div class="estrelaRatingDetalhe"><img src="./images/starRating.png" class="estrelaRatingTamanhoDetalhe"></div>\n\n      <ion-label style="color:white; position:absolute;left:29%"><b>{{filmeSelecionado.notaimdb}}</b>/<span style="font-size: 10px;">10</span></ion-label>\n\n    </ion-chip>\n\n  </div>\n\n\n\n  <div class="posBotaoTrailer">\n\n  <button ion-button outline class="botaoTrailer" (tap)="abrirTrailer(filmeSelecionado.linktrailer)">ASSISTA AO TRAILER</button>\n\n  </div>\n\n\n\n</div>\n\n\n\n\n\n<div class="headerSubDetalhesFilme" *ngIf="isEstreia">\n\n\n\n  <div class="posBotaoTrailerEstreia">\n\n  <button ion-button outline class="botaoTrailer" (tap)="abrirTrailer(filmeSelecionado.linktrailer)">ASSISTA AO TRAILER</button>\n\n  </div>\n\n\n\n</div>\n\n\n\n\n\n\n\n<div class="conteudo" *ngIf="!isEstreia">\n\n<p><b>SINOPSE</b><br>\n\n{{filmeSelecionado.sinopse}}\n\n</p>\n\n\n\n<p><b>Direção</b><br>\n\n{{filmeSelecionado.diretor}}\n\n</p>\n\n\n\n<p><b>Atores principais</b><br>\n\n{{filmeSelecionado.cast}}\n\n</p>\n\n\n\n<br><br><br>\n\n</div>\n\n\n\n\n\n<div class="conteudo" *ngIf="isEstreia">\n\n<p><b>SINOPSE</b><br>\n\n{{filmeSelecionado.synopsis}}\n\n</p>\n\n\n\n<p><b>Direção</b><br>\n\n{{filmeSelecionado.director}}\n\n</p>\n\n\n\n<p><b>Atores principais</b><br>\n\n{{filmeSelecionado.cast}}\n\n</p>\n\n\n\n<br><br><br>\n\n</div>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Felippe\IONIC\easy_v3\src\pages\detalhes\detalhes.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_youtube_video_player__["a" /* YoutubeVideoPlayer */]])
], Detalhes);

//# sourceMappingURL=detalhes.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessoesAgora; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_sessoes_service__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_chip__ = __webpack_require__(204);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SessoesAgora = (function () {
    //lições aprendidas: tive que definir o tipo sessoesService pois dava pau no momento da execução, não faço ideia do porquê
    function SessoesAgora(nav, navParams, sessoesService, loadingCtrl) {
        if (loadingCtrl === void 0) { loadingCtrl = null; }
        var _this = this;
        this.nav = nav;
        this.navParams = navParams;
        this.sessoesService = sessoesService;
        this.loadingCtrl = loadingCtrl;
        this.filmesSelecionados = [];
        this.sessoesOriginais = [];
        this.qtSessoes = 0;
        this.tags = [];
        this.filtroString = [];
        var loading = this.loadingCtrl.create({
            spinner: 'ios',
            content: 'Procurando filmes que vão começar em breve...'
        });
        loading.present();
        this.filtroData = navParams.get('param1');
        this.sessoesService = sessoesService;
        //this.nav.present(this.loading);
        this.carregaTags();
        this.sessoesService.findNow(this.filtroData).subscribe(function (data) {
            _this.sessoes = data;
            _this.qtSessoes = _this.sessoes.length;
            loading.dismiss();
        }, function (err) {
            console.log(err);
        }, function () { return console.log(""); });
        //this.getAllDistances();
        this.sessoesOriginais = this.sessoes;
    }
    SessoesAgora.prototype.carregaTags = function () {
        var item = new __WEBPACK_IMPORTED_MODULE_3__model_chip__["a" /* chip */]();
        item.nome = 'LEG';
        item.nomeDetalhado = 'Legendado';
        item.selecionado = false;
        this.tags.push(item);
        var item2 = new __WEBPACK_IMPORTED_MODULE_3__model_chip__["a" /* chip */]();
        item2.nome = 'DUB';
        item2.nomeDetalhado = 'Dublado';
        item2.selecionado = false;
        this.tags.push(item2);
        var item3 = new __WEBPACK_IMPORTED_MODULE_3__model_chip__["a" /* chip */]();
        item3.nome = '3D';
        item3.nomeDetalhado = '3D';
        item3.selecionado = false;
        this.tags.push(item3);
        var item4 = new __WEBPACK_IMPORTED_MODULE_3__model_chip__["a" /* chip */]();
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
            return min + " minuto(s)";
        }
        else {
            return (hour + ' hora(s) e ' + min + ' minuto(s)');
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
    SessoesAgora.prototype.selecionaTag = function (tag) {
        tag.selecionado = !tag.selecionado;
        var retorno = "";
        if (tag.nome == "LEG") {
            if (tag.selecionado)
                this.filtroString[0] = "Legendado";
            if (!tag.selecionado)
                this.filtroString[0] = "";
        }
        if (tag.nome == "DUB") {
            if (tag.selecionado)
                this.filtroString[1] = "Dublado";
            if (!tag.selecionado)
                this.filtroString[1] = "";
        }
        if (tag.nome == "3D") {
            if (tag.selecionado)
                this.filtroString[2] = "3D";
            if (!tag.selecionado)
                this.filtroString[2] = "";
        }
        if (tag.nome == "2D") {
            if (tag.selecionado)
                this.filtroString[3] = "Normal";
            if (!tag.selecionado)
                this.filtroString[3] = "";
        }
        retorno = this.filtroString.join();
        this.mostraSessao(retorno.replace(/^,|,$/g, ''));
    };
    SessoesAgora.prototype.mostraSessao = function (tags) {
        var item, tipoSessao, tags_temp;
        tags_temp = tags.replace(",,,", ",");
        tags_temp = tags_temp.replace(",,", ",");
        this.qtSessoes = 0;
        for (var i = 0; i < this.sessoes.length; i++) {
            item = this.sessoes[i];
            tipoSessao = item.tipo;
            if (tipoSessao.indexOf(tags_temp) == -1) {
                item.selecionado = 1;
            }
            else {
                item.selecionado = 0;
                this.qtSessoes = this.qtSessoes + 1;
            }
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\Felippe\IONIC\easy_v3\src\pages\sessoesAgora\sessoesAgora.html"*/'<ion-toolbar >\n\n  <ion-buttons left>\n\n    <button ion-button icon-only style="color:white" (tap)="voltar()">\n\n        <ion-icon name="md-arrow-back"></ion-icon>\n\n    </button>\n\n  </ion-buttons>\n\n  <ion-title color="primary">EasyMovie</ion-title>\n\n <!--ion-buttons end>\n\n      <button ion-button icon-only style="color:white">\n\n        <ion-icon name="options"></ion-icon>\n\n      </button>\n\n    </ion-buttons-->\n\n</ion-toolbar>\n\n\n\n<ion-content style="position: relative;">\n\n<br>\n\n<div class="labelTituloTela">\n\n<b>Sessões agora!</b>\n\n</div>\n\n<div class="labelSubTituloTela">Filmes que estão para começar</div>\n\n\n\n\n\n<br>\n\n\n\n\n\n<ion-scroll  scrollX="true" class="scrollHorizontal" overflow-scroll="true" >\n\n  <ion-chip  *ngFor=" let tag of tags"  [ngClass]="tag.selecionado ? \'ativoSessao\' : \'inativoSessao\'"  (tap)="selecionaTag(tag)">\n\n    <ion-label class="tag"> {{tag.nome }}</ion-label>\n\n  </ion-chip>\n\n</ion-scroll>\n\n\n\n<br><br>\n\n\n\n<ion-row class="headerSessoes">\n\n  <ion-col  *ngIf="qtSessoes === 0">Nenhuma sessão encontrada :-(</ion-col>\n\n    <ion-col  *ngIf="qtSessoes === 1">Foi encontrada apenas <b>uma</b> sessão</ion-col>\n\n    <ion-col  *ngIf="qtSessoes > 1">Foram encontradas <b>{{qtSessoes}}</b> sessões</ion-col>\n\n</ion-row>\n\n\n\n<!--Scrol somente da tela de resultado -->\n\n<ion-scroll  scrollY="true" class="scrollVertical" overflow-scroll="true" >\n\n<br>\n\n<ion-list class="itemListaSessao" no-lines>\n\n\n\n<div *ngFor=" let sessao of sessoes">\n\n\n\n  <ion-item class="itemItemSessao" #sessaoFilme  *ngIf="sessao.selecionado==0">\n\n      <div style="position: absolute;  width: 100% ; top: 10%" >\n\n        <ion-row style="height:90%">\n\n          <ion-col col-2 style="text-align: center">\n\n\n\n          <span class="fonteLabelTituloHorario" style="font-weight:bold;">{{formataHora(sessao.hora)}}</span>\n\n\n\n          </ion-col>\n\n          <ion-col col-9>\n\n            <ion-avatar  class="posterPequeno">\n\n              <img src="{{sessao.poster}}">\n\n            </ion-avatar>\n\n                      <div style="padding-left: 20%; line-height: 20px;">\n\n                          <div class="fonteLabelTituloFilme">{{sessao.nomeFilme}}</div>\n\n                          <div class="fonteLabelTituloCinema" >{{sessao.nomeCinema}}</div>\n\n                          <div class="fonteLabelTituloDistancia" *ngIf="formataData(filtroData)==\'Hoje\' "><ion-icon ios="md-time" ></ion-icon>&nbsp;Começa em <b>{{formataTempoAteSessao(sessao.hora)}}</b></div>\n\n                          <div class="fonteLabelTituloDistancia"> {{sessao.tipo}} {{sessao.tipo3d}}</div>\n\n                          <div class="estrelaRatingSessao"><img src="./images/starRatingSessao.png" class="estrelaRatingTamanhoSessao"></div><div class="estrelaRatingTamanhoSessaoTexto"><b>6.9</b></div>\n\n\n\n\n\n                      </div>\n\n          </ion-col>\n\n        </ion-row>\n\n\n\n      </div>\n\n      <img  src="./images/linhaSessaoAlta.png" style="max-width: 95%;" *ngIf="sessao.selecionado==0"/>\n\n\n\n  </ion-item>\n\n</div>\n\n\n\n\n\n</ion-list>\n\n</ion-scroll>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Felippe\IONIC\easy_v3\src\pages\sessoesAgora\sessoesAgora.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__services_sessoes_service__["a" /* sessoesService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_sessoes_service__["a" /* sessoesService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */]])
], SessoesAgora);

//# sourceMappingURL=sessoesAgora.js.map

/***/ }),

/***/ 118:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 118;

/***/ }),

/***/ 160:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 160;

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListaFilmes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sessoes_sessoes__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detalhes_detalhes__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_filmesEmCartaz_service__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ListaFilmes = (function () {
    function ListaFilmes(nav, navParams, filmesEmCartazService, toastCtrl, loadingCtrl) {
        if (toastCtrl === void 0) { toastCtrl = null; }
        if (loadingCtrl === void 0) { loadingCtrl = null; }
        var _this = this;
        this.nav = nav;
        this.navParams = navParams;
        this.filmesEmCartazService = filmesEmCartazService;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.filmesSelecionados = [];
        this.contadorFilmesEscolhidos = 0;
        this.isClassVisible = false;
        this.qtFilme = 0;
        this.diaSemanaEscolhido = "";
        var loading = this.loadingCtrl.create({
            spinner: 'ios',
            content: 'Procurando filmes em cartaz...'
        });
        loading.present();
        this.filtroData = navParams.get('param1');
        this.diaSemanaEscolhido = navParams.get('param2');
        this.filmesEmCartazService = filmesEmCartazService;
        this.filmesEmCartazService.findAll(this.filtroData).subscribe(function (data) {
            _this.filmes = data;
            _this.qtFilme = _this.filmes.length;
            loading.dismiss();
            console.log(_this.filmes);
        }, function (err) {
            console.log(err);
        }, function () { return console.log(_this.qtFilme); });
    }
    ListaFilmes.prototype.exibeAlerta = function () {
        var toast = this.toastCtrl.create({
            message: 'Ops! Você não escolheu nenhum filme ainda...',
            duration: 3000,
            cssClass: "toastAlerta",
            position: 'top'
        });
        toast.present();
    };
    Object.defineProperty(ListaFilmes, "parameters", {
        get: function () {
            return [[__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]], [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]], [__WEBPACK_IMPORTED_MODULE_4__services_filmesEmCartaz_service__["a" /* filmesEmCartazService */]], [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]], [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */]]];
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
                return "0";
            }
            else {
                return detalhe;
            }
        }
    };
    ListaFilmes.prototype.verSessoes = function () {
        if (this.filmesSelecionados.length > 0) {
            this.nav.push(__WEBPACK_IMPORTED_MODULE_2__sessoes_sessoes__["a" /* Sessoes */], {
                param1: this.filmesSelecionados,
                param2: this.filtroData,
                param3: "F",
                param4: this.diaSemanaEscolhido
            });
        }
        else {
            this.exibeAlerta();
        }
    };
    ListaFilmes.prototype.verDetalhes = function (filmeEmCartaz) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__detalhes_detalhes__["a" /* Detalhes */], {
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\Felippe\IONIC\easy_v3\src\pages\listaFilmes\listaFilmes.html"*/'<ion-toolbar >\n\n  <ion-buttons left>\n\n    <button ion-button icon-only style="color:white" (tap)="voltar()">\n\n        <ion-icon name="md-arrow-back"></ion-icon>\n\n    </button>\n\n  </ion-buttons>\n\n  <ion-title color="primary">EasyMovie</ion-title>\n\n</ion-toolbar>\n\n\n\n<ion-content class="card-background-page" style="position: relative;">\n\n<br>\n\n<div class="labelTituloTela" >\n\n<b>Filmes em Cartaz</b> ({{qtFilme}})\n\n</div>\n\n<div class="labelSubTituloTela">{{formataData(filtroData)}} | {{diaSemanaEscolhido}}</div>\n\n<br><br>\n\n<!-- {{filmes | json}}  -->\n\n\n\n\n\n<ion-scroll  scrollY="true" class="scrollVerticalFilmes" overflow-scroll="true" >\n\n\n\n\n\n<!-- ################################ CARDS #####################################-->\n\n\n\n\n\n   <ion-card  #filmeCard *ngFor=" let filme of filmes;let i=index">\n\n\n\n\n\n\n\n      <div  #layerMarcada [ngClass]="filme.selecionado ? \'marcacaoSelecionado\' : \'marcacaoNaoSelecionado\'" (tap)="selecionaFilme(filme);" >\n\n          <img style="width: 100px; position: relative; left: 38%; top:33px" src="./images/imgSelecionado.png"/>\n\n      </div>\n\n\n\n\n\n      <div>\n\n        <ion-chip class="ratingIMDB">\n\n          <div class="estrelaRating"><img src="./images/starRating.png" class="estrelaRatingTamanho"></div>\n\n          <ion-label style="color:white; position:absolute;left:25%"><b> {{filme.notaimdb | number:\'1.1-1\'}}</b>/<span style="font-size: 10px;">10</span></ion-label>\n\n        </ion-chip>\n\n      </div>\n\n\n\n      <div class="tagRanking" *ngIf="i<3 && filme.qtacesso > 0"><b>{{i + 1}}º</b> MAIS PROCURADO</div>\n\n\n\n      <img  src={{filme.imagem}}  (tap)="selecionaFilme(filme);"  />\n\n\n\n      <div class="card-subtitle" >\n\n          <ion-row>\n\n              <ion-col >\n\n                  <ion-row >\n\n                      <ion-col class="fonteTituloFilme">\n\n                      {{filme.nome }}\n\n                      </ion-col>\n\n\n\n                        <button class="botaoDetalhes" (tap)="verDetalhes(filme)">\n\n<ion-icon name="ios-arrow-dropright-circle"></ion-icon>\n\n                        </button>\n\n\n\n                  </ion-row>\n\n                  <ion-row>\n\n                      <ion-col  class="labelGeneroFilme">\n\n                            {{filme.genero}} | {{filme.duracao}} minutos | {{ filme.classificacao}}\n\n                      </ion-col>\n\n                  </ion-row>\n\n                </ion-col>\n\n         </ion-row>\n\n      </div>\n\n\n\n   </ion-card>\n\n\n\n</ion-scroll>\n\n<ion-toolbar position="bottom" class="toolbarVerSessoes" >\n\n<ion-grid >\n\n  <ion-row>\n\n      <ion-col width-50  style="text-align:center; margin-top: 3%;">\n\n           <span class="fonteLabel" style="font-size: 90%; color: white"><b>{{ contadorFilmesEscolhidos }} FILMES ESCOLHIDOS</b></span>\n\n      </ion-col>\n\n        <ion-col width-50>\n\n          <button class="botaoVerSessoes" (click)="verSessoes()">VER SESSÕES</button>\n\n      </ion-col>\n\n </ion-row>\n\n</ion-grid>\n\n</ion-toolbar>\n\n</ion-content>\n\n\n\n\n\n\n\n<!-- ##########################################################################-->\n\n'/*ion-inline-end:"D:\Felippe\IONIC\easy_v3\src\pages\listaFilmes\listaFilmes.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_4__services_filmesEmCartaz_service__["a" /* filmesEmCartazService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__services_filmesEmCartaz_service__["a" /* filmesEmCartazService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */]])
], ListaFilmes);

//# sourceMappingURL=listaFilmes.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return chip; });
var chip = (function () {
    function chip(nome, nomeDetalhado, selecionado) {
        this.nome = nome;
        this.nomeDetalhado = nomeDetalhado;
        this.selecionado = selecionado;
    }
    return chip;
}());

//# sourceMappingURL=chip.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltroSessoes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__ = __webpack_require__(206);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FiltroSessoes = (function () {
    function FiltroSessoes(viewCtrl, params, socialSharing) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.socialSharing = socialSharing;
        this.params = params;
        this.sessao = params.get('sessao');
        console.log(this.sessao.diames);
    }
    FiltroSessoes.prototype.fechar = function () {
        this.viewCtrl.dismiss();
    };
    FiltroSessoes.prototype.shareSheetShare = function () {
        this.socialSharing.share("Oi! O filme " + this.sessao.nomeFilme + " vai ter uma sessão em " + this.sessao.diames + "(" + this.sessao.diasemana + ") às " + this.formataHora(this.sessao.hora) + " horas. O que acha?", "Que tal um cineminha?", this.sessao.imagem2, this.sessao.linktrailer).then(function () {
            console.log("shareSheetShare: Success");
        }).catch(function () {
            console.error("shareSheetShare: failed");
        });
    };
    FiltroSessoes.prototype.formataHora = function (hora) {
        var horaString = hora.toString();
        return horaString.substring(0, 2) + ":" + horaString.substring(2, 4);
    };
    FiltroSessoes.prototype.calculaHoraFim = function (time, minsToAdd) {
        function z(n) {
            return (n < 10 ? '0' : '') + n;
        }
        var bits = time.split(':');
        var mins = bits[0] * 60 + (+bits[1]) + (+minsToAdd);
        return z(mins % (24 * 60) / 60 | 0) + ':' + z(mins % 60);
    };
    return FiltroSessoes;
}());
FiltroSessoes = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\Felippe\IONIC\easy_v3\src\pages\filtroSessoes\filtroSessoes.html"*/'\n\n<ion-content style="position: relative;">\n\n\n\n\n\n<div style="background-color: #4b5264;">\n\n\n\n  <img  src={{sessao.imagem2}} />\n\n\n\n\n\n<div class="tituloFilmeDetalheSessao">{{sessao.nomeFilme}}</div>\n\n<div class="tituloFilmeSubDetalheSessao">{{sessao.genero}} | {{sessao.duracao}} minutos | {{ sessao.classificacao}}</div>\n\n<div  class="tituloFilmeSubDetalheSessao">{{sessao.tipo}}</div>\n\n</div>\n\n\n\n<br>\n\n<ion-grid class="fonteDetalhesSessao">\n\n  <ion-row >\n\n      <ion-col col-4 class="tituloDetalhe">Quando</ion-col>\n\n      <ion-col col-8 class="tituloDetalhe" style="text-align: left">Onde</ion-col>\n\n </ion-row>\n\n <ion-row >\n\n     <ion-col col-4 class="tituloCampo">{{sessao.diames}}</ion-col>\n\n     <ion-col col-8 class="tituloCampo" style="text-align: left; font-size:14px">{{sessao.nomeCinema}}</ion-col>\n\n</ion-row>\n\n<ion-row >\n\n      <ion-col col-12></ion-col>\n\n</ion-row>\n\n\n\n<ion-row >\n\n    <ion-col col-4 class="tituloDetalhe">Começa</ion-col>\n\n    <ion-col col-8 class="tituloDetalhe" style="text-align: left">Acaba até <span style="font-size:10px">(estimado)</span></ion-col>\n\n</ion-row>\n\n<ion-row >\n\n   <ion-col col-4 class="tituloCampo">{{formataHora(sessao.hora)}}</ion-col>\n\n   <ion-col col-8 class="tituloCampo" style="text-align: left">{{calculaHoraFim(formataHora(sessao.hora), sessao.duracao)}}</ion-col>\n\n</ion-row>\n\n\n\n</ion-grid>\n\n\n\n<br>\n\n\n\n<ion-grid>\n\n  <ion-row>\n\n      <ion-col col-7  style="text-align: center;">\n\n           <button class="botaoCompartilhar" (tap)="shareSheetShare()">COMPARTILHAR</button>\n\n      </ion-col>\n\n        <ion-col col-5 style="text-align: right;">\n\n          <button class="botaoFechar" (tap)="fechar()">FECHAR</button>\n\n      </ion-col>\n\n </ion-row>\n\n</ion-grid>\n\n\n\n\n\n<!--\n\n\n\n<ion-grid class="fonteDetalhesSessao">\n\n  <ion-row >\n\n      <ion-col col-4 class="tituloDetalhe">Quando</ion-col>\n\n      <ion-col col-8 class="tituloDetalhe" style="text-align: left">Onde</ion-col>\n\n </ion-row>\n\n <ion-row >\n\n     <ion-col col-4 class="tituloCampo">{{sessao.diames}}</ion-col>\n\n     <ion-col col-8 class="tituloCampo" style="text-align: left; font-size:14px">{{sessao.nomeCinema}}</ion-col>\n\n</ion-row>\n\n<ion-row >\n\n      <ion-col col-12>&nbsp;</ion-col>\n\n</ion-row>\n\n\n\n<ion-row >\n\n    <ion-col col-4 class="tituloDetalhe">Começa</ion-col>\n\n    <ion-col col-8 class="tituloDetalhe" style="text-align: left">Acaba até (estimado)</ion-col>\n\n</ion-row>\n\n<ion-row >\n\n   <ion-col col-4 class="tituloCampo">{{formataHora(sessao.hora)}}</ion-col>\n\n   <ion-col col-8 class="tituloCampo" style="text-align: left">{{calculaHoraFim(formataHora(sessao.hora), sessao.duracao)}}</ion-col>\n\n</ion-row>\n\n\n\n</ion-grid>\n\n-->\n\n\n\n<ion-content>\n\n'/*ion-inline-end:"D:\Felippe\IONIC\easy_v3\src\pages\filtroSessoes\filtroSessoes.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */]])
], FiltroSessoes);

//# sourceMappingURL=filtroSessoes.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListaCinemas; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sessoes_sessoes__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_cinema_service__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import {Geolocation} from 'ionic-native';


var ListaCinemas = (function () {
    function ListaCinemas(nav, navParams, cinemaService, toastCtrl, loadingCtrl) {
        if (toastCtrl === void 0) { toastCtrl = null; }
        if (loadingCtrl === void 0) { loadingCtrl = null; }
        var _this = this;
        this.nav = nav;
        this.navParams = navParams;
        this.cinemaService = cinemaService;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.cinemasSelecionados = [];
        this.contadorCinemasEscolhidos = 0;
        this.diaSemanaEscolhido = "";
        var loading = this.loadingCtrl.create({
            spinner: 'ios',
            content: 'Procurando cinemas da sua cidade...'
        });
        loading.present();
        this.filtroData = navParams.get('param1');
        this.diaSemanaEscolhido = navParams.get('param2');
        this.cinemaService = cinemaService;
        this.cinemaService.findAll().subscribe(function (data) {
            _this.cinemas = data;
            loading.dismiss();
        }, function (err) {
            console.log(err);
        }, function () { return console.log(); });
        //this.getAllDistances();
    }
    ListaCinemas.prototype.exibeAlerta = function () {
        var toast = this.toastCtrl.create({
            message: 'Ops! Você não escolheu nenhum cinema ainda...',
            duration: 3000,
            cssClass: "toastAlerta",
            position: 'top'
        });
        toast.present();
    };
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
        if (this.cinemasSelecionados.length > 0) {
            this.nav.push(__WEBPACK_IMPORTED_MODULE_2__sessoes_sessoes__["a" /* Sessoes */], {
                param1: this.cinemasSelecionados,
                param2: this.filtroData,
                param3: "C",
                param4: this.diaSemanaEscolhido
            });
        }
        else {
            this.exibeAlerta();
        }
    };
    ListaCinemas.prototype.voltar = function () {
        this.nav.pop();
    };
    return ListaCinemas;
}());
ListaCinemas = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\Felippe\IONIC\easy_v3\src\pages\listaCinemas\listaCinemas.html"*/'<ion-toolbar >\n\n  <ion-buttons left>\n\n    <button ion-button icon-only style="color:white" (tap)="voltar()">\n\n        <ion-icon name="md-arrow-back"></ion-icon>\n\n    </button>\n\n  </ion-buttons>\n\n  <ion-title color="primary">EasyMovie</ion-title>\n\n</ion-toolbar>\n\n\n\n<ion-content class="card-background-page" style="position: relative;">\n\n<br>\n\n<div class="labelTituloTela">\n\n<b>Cinemas na sua cidade</b>\n\n</div>\n\n<div class="labelSubTituloTela">{{formataData(filtroData)}} | {{diaSemanaEscolhido}}</div>\n\n<br><br>\n\n\n\n\n\n\n\n\n\n\n\n\n\n<!--Scrol somente da tela de resultado -->\n\n<ion-scroll  scrollY="true" class="scrollVerticalCinemas" overflow-scroll="true" >\n\n\n\n<!-- ################################ CARDS #####################################-->\n\n\n\n\n\n   <ion-card  #cinemaCard *ngFor=" let cinema of cinemas ">\n\n\n\n\n\n\n\n     <div  #layerMarcada [ngClass]="cinema.selecionado ? \'marcacaoSelecionado\' : \'marcacaoNaoSelecionado\'" (tap)="selecionaCinema(cinema);" >\n\n         <img style="width: 100px; position: relative; left: 38%; top:20px" src="./images/imgSelecionado.png"/>\n\n     </div>\n\n\n\n\n\n      <img  src={{cinema.imagem}}  (tap)="selecionaCinema(cinema);" >\n\n\n\n      <div class="card-subtitle">\n\n          <ion-row>\n\n              <ion-col>\n\n                  <ion-row>\n\n                      <ion-col class="fonteTituloFilme">\n\n                      {{cinema.nome}}\n\n                      </ion-col>\n\n                  </ion-row>\n\n                  <ion-row>\n\n                      <ion-col  class="labelGeneroFilme">\n\n                            <b>{{ formataDistanciaAmigavel(cinema.distancia) }}</b> de você ({{cinema.distancia}} km)\n\n                      </ion-col>\n\n                  </ion-row>\n\n                </ion-col>\n\n         </ion-row>\n\n      </div>\n\n\n\n   </ion-card>\n\n\n\n</ion-scroll>\n\n\n\n\n\n<ion-toolbar position="bottom" class="toolbarVerSessoes" >\n\n<ion-grid >\n\n  <ion-row>\n\n      <ion-col width-50  style="text-align:center; margin-top: 5%;">\n\n           <span class="fonteLabel" style="font-size: 80%; color: white"><b>{{ contadorCinemasEscolhidos }} FILMES ESCOLHIDOS</b></span>\n\n      </ion-col>\n\n        <ion-col width-50>\n\n          <button class="botaoVerSessoes" (click)="verSessoes()">VER SESSÕES</button>\n\n      </ion-col>\n\n </ion-row>\n\n</ion-grid>\n\n</ion-toolbar>\n\n</ion-content>\n\n\n\n\n\n\n\n'/*ion-inline-end:"D:\Felippe\IONIC\easy_v3\src\pages\listaCinemas\listaCinemas.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__services_cinema_service__["a" /* cinemaService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__services_cinema_service__["a" /* cinemaService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */]])
], ListaCinemas);

//# sourceMappingURL=listaCinemas.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Preferencias; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_cinema_service__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_localstorage__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Preferencias = (function () {
    function Preferencias(viewCtrl, params, cinemaService, localstorage, storage, toastCtrl) {
        if (toastCtrl === void 0) { toastCtrl = null; }
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.cinemaService = cinemaService;
        this.localstorage = localstorage;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.favoritosSelecionados = [];
        this.cinemaService = cinemaService;
        this.cinemaService.findAll().subscribe(function (data) {
            _this.cinemas = data;
            _this.getFavoritos();
        }, function (err) {
            console.log(err);
        }, function () { return console.log(); });
    }
    Preferencias.prototype.fechar = function () {
        this.viewCtrl.dismiss();
    };
    Preferencias.prototype.setFavoritos = function () {
        var _this = this;
        this.localstorage.setFavoritos(this.favoritosSelecionados);
        this.exibeAlerta("Suas preferências de cinemas foram gravadas!");
        setInterval(function () {
            _this.viewCtrl.dismiss();
        }, 1400);
    };
    Preferencias.prototype.marcaFavoritos = function (cinemasGravados) {
        for (var i = 0; i < this.cinemas.length; i++) {
            var item = this.cinemas[i];
            if ((cinemasGravados.indexOf(item.idcinema)) != -1) {
                item.selecionado = 1;
            }
        }
    };
    Preferencias.prototype.getFavoritos = function () {
        var _this = this;
        this.storage.get('cinemasFavoritos').then(function (cinemasFavoritos) {
            _this.cinemasGravados = cinemasFavoritos;
            _this.marcaFavoritos(_this.cinemasGravados);
        });
    };
    Preferencias.prototype.exibeAlerta = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 1300,
            cssClass: "toastSucesso",
            position: 'top'
        });
        toast.present();
    };
    Preferencias.prototype.favoritos = function (cinema) {
        var indexSelecionado = this.cinemas.indexOf(cinema);
        var flagEncontrado = false;
        var index;
        this.favoritosSelecionados = this.cinemasGravados;
        if (this.cinemas[indexSelecionado].selecionado == 1) {
            this.cinemas[indexSelecionado].selecionado = 0;
        }
        else {
            this.cinemas[indexSelecionado].selecionado = 1;
        }
        //faz a busca no array de filmes selecionados
        for (var i = 0; i < this.favoritosSelecionados.length; i++) {
            var item = this.favoritosSelecionados[i];
            if (item == cinema.idcinema) {
                flagEncontrado = true;
                index = i;
            }
        }
        if (flagEncontrado == false) {
            this.favoritosSelecionados.push(cinema.idcinema);
        }
        else {
            this.favoritosSelecionados.splice(index, 1);
        }
    };
    return Preferencias;
}());
Preferencias = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\Felippe\IONIC\easy_v3\src\pages\preferencias\preferencias.html"*/'<ion-toolbar >\n\n   <ion-buttons start>\n\n     <button ion-button icon-only style="color:white" (tap)="fechar()">\n\n         <ion-icon name="md-close"></ion-icon>\n\n     </button>\n\n   </ion-buttons>\n\n   <ion-title color="primary"></ion-title>\n\n </ion-toolbar>\n\n \n\n <ion-content style="position: relative;">\n\n <br>\n\n <div class="labelTituloTela">\n\n <b>Preferências</b>\n\n </div>\n\n \n\n    \n\n<br>\n\n<div class="labelSubTituloTela">\n\n <b>Meus Cinemas Favoritos</b>\n\n</div>\n\n\n\n<div class="labelSubSubTituloTela">\n\nMarque os cinemas que costuma ir com mais frequência e as sessões\n\ndestes cinemas serão exibidas primeiro\n\n</div>\n\n\n\n<br>\n\n\n\n<ion-grid class="tabelaPreferencias">\n\n  <ion-row *ngFor=" let cinema of cinemas " (tap)="favoritos(cinema);">\n\n    <ion-col col-1><ion-icon name="ios-heart" style="font-size: 27px" [ngClass]="cinema.selecionado ? \'favoritoNaoSelecionado\' : \'favoritoSelecionado\'" ></ion-icon></ion-col>\n\n    <ion-col col-11 class="cinemaPreferencias">{{cinema.nome}}</ion-col>\n\n  </ion-row>\n\n</ion-grid>\n\n\n\n\n\n<div style="position: relative;">\n\n<ion-grid>\n\n  <ion-row>\n\n      <ion-col col-12  style="text-align: center;">\n\n           <button class="botaoGravarPreferencias" (tap)="setFavoritos()">GRAVAR PREFERÊNCIAS</button>\n\n      </ion-col>\n\n </ion-row>\n\n</ion-grid>\n\n</div>\n\n\n\n\n\n\n\n </ion-content> '/*ion-inline-end:"D:\Felippe\IONIC\easy_v3\src\pages\preferencias\preferencias.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_2__services_cinema_service__["a" /* cinemaService */], __WEBPACK_IMPORTED_MODULE_3__providers_localstorage__["a" /* Localstorage */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__services_cinema_service__["a" /* cinemaService */],
        __WEBPACK_IMPORTED_MODULE_3__providers_localstorage__["a" /* Localstorage */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]])
], Preferencias);

//# sourceMappingURL=preferencias.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Localstorage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the Localstorage provider.
 
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var Localstorage = (function () {
    function Localstorage(http, storage) {
        this.http = http;
        this.storage = storage;
    }
    //store the email address
    Localstorage.prototype.setFavoritos = function (favoritos) {
        var _this = this;
        this.storage.clear().then(function () {
            _this.storage.set('cinemasFavoritos', favoritos);
        });
    };
    //get the stored email
    Localstorage.prototype.getFavoritos = function () {
        this.storage.get('cinemasFavoritos').then(function (cinemasFavoritos) {
            alert(cinemasFavoritos);
            return cinemasFavoritos;
        });
    };
    return Localstorage;
}());
Localstorage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], Localstorage);

//# sourceMappingURL=localstorage.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(230);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_listaFilmes_listaFilmes__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_principal_principal__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_sessoes_sessoes__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_filtros_filtros__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_detalhes_detalhes__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_listaCinemas_listaCinemas__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_sessoesAgora_sessoesAgora__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_filtroSessoes_filtroSessoes__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_preferencias_preferencias__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_splash_screen__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_youtube_video_player__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_social_sharing__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_localstorage__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_storage__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_listaFilmes_listaFilmes__["a" /* ListaFilmes */],
            __WEBPACK_IMPORTED_MODULE_6__pages_principal_principal__["a" /* Principal */],
            __WEBPACK_IMPORTED_MODULE_7__pages_sessoes_sessoes__["a" /* Sessoes */],
            __WEBPACK_IMPORTED_MODULE_8__pages_filtros_filtros__["a" /* Filtros */],
            __WEBPACK_IMPORTED_MODULE_9__pages_detalhes_detalhes__["a" /* Detalhes */],
            __WEBPACK_IMPORTED_MODULE_10__pages_listaCinemas_listaCinemas__["a" /* ListaCinemas */],
            __WEBPACK_IMPORTED_MODULE_11__pages_sessoesAgora_sessoesAgora__["a" /* SessoesAgora */],
            __WEBPACK_IMPORTED_MODULE_12__pages_filtroSessoes_filtroSessoes__["a" /* FiltroSessoes */],
            __WEBPACK_IMPORTED_MODULE_13__pages_preferencias_preferencias__["a" /* Preferencias */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_19__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_listaFilmes_listaFilmes__["a" /* ListaFilmes */],
            __WEBPACK_IMPORTED_MODULE_6__pages_principal_principal__["a" /* Principal */],
            __WEBPACK_IMPORTED_MODULE_7__pages_sessoes_sessoes__["a" /* Sessoes */],
            __WEBPACK_IMPORTED_MODULE_8__pages_filtros_filtros__["a" /* Filtros */],
            __WEBPACK_IMPORTED_MODULE_9__pages_detalhes_detalhes__["a" /* Detalhes */],
            __WEBPACK_IMPORTED_MODULE_10__pages_listaCinemas_listaCinemas__["a" /* ListaCinemas */],
            __WEBPACK_IMPORTED_MODULE_11__pages_sessoesAgora_sessoesAgora__["a" /* SessoesAgora */],
            __WEBPACK_IMPORTED_MODULE_12__pages_filtroSessoes_filtroSessoes__["a" /* FiltroSessoes */],
            __WEBPACK_IMPORTED_MODULE_13__pages_preferencias_preferencias__["a" /* Preferencias */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_youtube_video_player__["a" /* YoutubeVideoPlayer */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_18__providers_localstorage__["a" /* Localstorage */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_filtros_filtros__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_filtros_filtros__["a" /* Filtros */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.backgroundColorByHexString('#51596d');
            //splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\Felippe\IONIC\easy_v3\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"D:\Felippe\IONIC\easy_v3\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Principal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filtros_filtros__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sessoesAgora_sessoesAgora__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Principal = (function () {
    function Principal(nav, navParams) {
        this.nav = nav;
        this.navParams = navParams;
    }
    Principal.prototype.mostraFiltro = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_2__filtros_filtros__["a" /* Filtros */]);
    };
    Principal.prototype.mostraEscolhas = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__sessoesAgora_sessoesAgora__["a" /* SessoesAgora */]);
    };
    return Principal;
}());
Principal = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\Felippe\IONIC\easy_v3\src\pages\principal\principal.html"*/'<ion-navbar >\n\n  <ion-title></ion-title>\n\n</ion-navbar>\n\n\n\n\n\n\n\n  <ion-content class="card-filtros">\n\n\n\n    <ion-card tappable  (tap)="mostraFiltro()">\n\n      <img src="./images/filtro_queroEscolher.png" style="width: 100%; height: 100%"/>\n\n      <div class="card-textoGrande"><br>Eu quero consultar<br><b>filmes</b> e <b>cinemas</b></div>\n\n      <div class="card-textoPequeno"></div>\n\n    </ion-card>\n\n\n\n    <ion-card tappable  (tap)="mostraEscolhas()">\n\n      <img src="./images/filtro_escolhaPraMim.png" style="width: 100%; height: 100%"/>\n\n      <div class="card-textoGrande"><br>Eu quero ir ao<br>cinema <b>agora!</b></div>\n\n      <div class="card-textoPequeno"></div>\n\n    </ion-card>\n\n\n\n\n\n  </ion-content>\n\n'/*ion-inline-end:"D:\Felippe\IONIC\easy_v3\src\pages\principal\principal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], Principal);

//# sourceMappingURL=principal.js.map

/***/ })

},[211]);
//# sourceMappingURL=main.js.map