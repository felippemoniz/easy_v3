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
var cinemas = SERVER_URL + 'cinemas/';
var sessoes = SERVER_URL + 'sessoesPorCinema/';
var cinemaService = (function () {
    function cinemaService(http) {
        this.http = http;
        this.http = http;
    }
    Object.defineProperty(cinemaService, "parameters", {
        get: function () {
            return [[Http]];
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
        return this.http.get(SERVER_URL + 'cinemasPorSessao/' + id + "/" + data)
            .map(function (res) { return res.json(); });
    };
    cinemaService.prototype.handleError = function (error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
    return cinemaService;
}());
cinemaService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], cinemaService);
export { cinemaService };
//# sourceMappingURL=cinema-service.js.map