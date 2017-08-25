import {Injectable} from '@angular/core';
import {SERVER_URL} from './config';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


let filmesEmCartazURL = SERVER_URL + 'filmesEmCartaz/';

@Injectable()
export class filmesEmCartazService {


  static get parameters() {
      return [[Http]];
  }

  constructor (private http:Http) {
      this.http = http;
  }

  findAll(filtro) {
      return this.http.get(filmesEmCartazURL+filtro)
          .map(res => res.json());

  }


  findEstreiaDaSemana(){
	return this.http.get(SERVER_URL + 'filmeEstreiaDaSemana/')
	  .map(res => res.json());
  }

  findFilmesPorSessao(id,data) {
        return this.http.get(SERVER_URL + 'filmesPorSessao/' + id +"/"+ data )
          .map(res => res.json());

  }


  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}
