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
import { NavParams } from 'ionic-angular';
var Detalhes = (function () {
    function Detalhes(nav, navParams) {
        this.nav = nav;
        this.navParams = navParams;
        this.filmeSelecionado = navParams.get('param1');
    }
    Object.defineProperty(Detalhes, "parameters", {
        get: function () {
            return [[NavController], [NavParams]];
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
    Detalhes.prototype.voltar = function () {
        this.nav.pop();
    };
    return Detalhes;
}());
Detalhes = __decorate([
    Component({
        templateUrl: 'detalhes.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], Detalhes);
export { Detalhes };
//# sourceMappingURL=detalhes.js.map