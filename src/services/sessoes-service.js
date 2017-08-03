var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { SERVER_URL } from './config';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
var sessoesURL = SERVER_URL + 'sessoes/';
var sessoesAgoraURL = SERVER_URL + 'sessoesAgora/';
var sessoesHojeURL = SERVER_URL + 'sessoesHoje/';
var sessoesPorCinemaURL = SERVER_URL + 'sessoesPorCinema/';
var sessoesHojePorCinemaURL = SERVER_URL + 'sessoesHojePorCinema/';
var sessoesService = (function () {
    function sessoesService(http) {
        this.http = http;
        this.http = http;
    }
    Object.defineProperty(sessoesService, "parameters", {
        get: function () {
            return [[Http]];
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
        return this.http.get(SERVER_URL + 'getDates/' + data)
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
        return Observable.throw(error.json().error || 'Server error');
    };
    return sessoesService;
}());
sessoesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], sessoesService);
export { sessoesService };
//# sourceMappingURL=sessoes-service.js.map