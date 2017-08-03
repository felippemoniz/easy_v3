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
import { Filtros } from '../filtros/filtros';
import { SessoesAgora } from '../sessoesAgora/sessoesAgora';
var Principal = (function () {
    function Principal(nav, navParams) {
        this.nav = nav;
        this.navParams = navParams;
    }
    Principal.prototype.mostraFiltro = function () {
        this.nav.push(Filtros);
    };
    Principal.prototype.mostraEscolhas = function () {
        this.nav.push(SessoesAgora);
    };
    return Principal;
}());
Principal = __decorate([
    Component({
        templateUrl: 'principal.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], Principal);
export { Principal };
//# sourceMappingURL=principal.js.map