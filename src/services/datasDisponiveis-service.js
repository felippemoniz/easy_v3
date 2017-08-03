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
var principalURL = SERVER_URL + 'datasDisponiveis/';
var datasDisponiveisService = (function () {
    function datasDisponiveisService(http) {
        this.http = http;
        this.http = http;
    }
    Object.defineProperty(datasDisponiveisService, "parameters", {
        get: function () {
            return [[Http]];
        },
        enumerable: true,
        configurable: true
    });
    datasDisponiveisService.prototype.findAll = function () {
        return this.http.get(principalURL)
            .map(function (res) { return res.json(); });
    };
    datasDisponiveisService.prototype.handleError = function (error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
    return datasDisponiveisService;
}());
datasDisponiveisService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], datasDisponiveisService);
export { datasDisponiveisService };
//# sourceMappingURL=datasDisponiveis-service.js.map