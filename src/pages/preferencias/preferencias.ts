import {Component, ViewChild} from '@angular/core'
import {NavController, NavParams,ViewController} from 'ionic-angular';
import {cinemaService} from '../../services/cinema-service';
import {cinema} from '../../model/cinema';
import {Localstorage} from '../../providers/localstorage';
import { ToastController } from 'ionic-angular';
import {Storage} from '@ionic/storage';


@Component({
  templateUrl: 'preferencias.html',
  providers: [cinemaService,Localstorage]
  })


export class Preferencias {

  cinemas: cinema[];
  favoritosSelecionados = [];
  cinemasGravados;
 

  constructor(public viewCtrl: ViewController, 
              private params: NavParams,
              private cinemaService:cinemaService,
              private localstorage:Localstorage,
              private storage:Storage,
              public toastCtrl: ToastController = null ) {


  	this.cinemaService = cinemaService;
    this.cinemaService.findAll().subscribe(
                  data => {
                      this.cinemas = data;
                      this.getFavoritos();
                      
                  },
                  err => {
                      console.log(err);
                  },
                  () => console.log()
              );
    
  }



  fechar() {
    this.viewCtrl.dismiss();
  }


  setFavoritos(){
    this.localstorage.setFavoritos(this.favoritosSelecionados);
    this.exibeAlerta("Suas preferências foram gravadas!");

    setInterval(() => {
      this.viewCtrl.dismiss();
    }, 1400);

    
  }



  getFavoritos(){
      this.storage.get('cinemasFavoritos').then(cinemasFavoritos=>{
        this.cinemasGravados= cinemasFavoritos
      });

  }



exibeAlerta(msg){

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1300,
      cssClass: "toastSucesso",
      position: 'top'
    });
    toast.present();

}




  favoritos(cinema){

    var indexSelecionado = this.cinemas.indexOf(cinema);
    var flagEncontrado=false;
    var index;

    if (this.cinemas[indexSelecionado].selecionado == 1){
        this.cinemas[indexSelecionado].selecionado = 0
    }else{
        this.cinemas[indexSelecionado].selecionado = 1
    }

     //faz a busca no array de filmes selecionados
     for (var i = 0; i < this.favoritosSelecionados.length; i++) {
        var item = this.favoritosSelecionados[i];

        if ( item.idfilme == cinema.idcinema) {
           flagEncontrado = true;
           index=i;
        }
     }

    if (flagEncontrado == false) {
      this.favoritosSelecionados.push (cinema.idcinema);
    }
    else{
      this.favoritosSelecionados.splice(index,1);
  
    }


  }

}