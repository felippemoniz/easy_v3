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
var filmesEmCartazURL = SERVER_URL + 'filmesEmCartaz/';
var filmesEmCartazService = (function () {
    function filmesEmCartazService(http) {
        this.http = http;
        this.http = http;
    }
    Object.defineProperty(filmesEmCartazService, "parameters", {
        get: function () {
            return [[Http]];
        },
        enumerable: true,
        configurable: true
    });
    filmesEmCartazService.prototype.findAll = function (filtro) {
        return this.http.get(filmesEmCartazURL + filtro)
            .map(function (res) { return res.json(); });
    };
    filmesEmCartazService.prototype.getTop6 = function () {
        return this.http.get(SERVER_URL + "topFilmes/")
            .map(function (res) { return res.json(); });
    };
    filmesEmCartazService.prototype.findFilmesPorSessao = function (id, data) {
        return this.http.get(SERVER_URL + 'filmesPorSessao/' + id + "/" + data)
            .map(function (res) { return res.json(); });
    };
    filmesEmCartazService.prototype.handleError = function (error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
    return filmesEmCartazService;
}());
filmesEmCartazService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], filmesEmCartazService);
export { filmesEmCartazService };
//# sourceMappingURL=filmesEmCartaz-service.js.map