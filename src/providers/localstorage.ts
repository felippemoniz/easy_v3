import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
 
/*
  Generated class for the Localstorage provider.
 
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Localstorage {
 
  constructor(public http: Http,private storage:Storage) {

    }
 
    //store the email address
    setFavoritos(favoritos){
        this.storage.clear().then(()=>{
            this.storage.set('cinemasFavoritos',favoritos);
        });
    
    }
 
    //get the stored email
    getFavoritos(){
    	this.storage.get('cinemasFavoritos').then(cinemasFavoritos=>{
        alert(cinemasFavoritos)
        return cinemasFavoritos
    	});
    }
 

 
}