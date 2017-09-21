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
    this.exibeAlerta("Suas preferências de cinemas foram gravadas!");

    setInterval(() => {
      this.viewCtrl.dismiss();
    }, 1400);

  }


  marcaFavoritos(cinemasGravados){

     for (var i = 0; i < this.cinemas.length; i++) {
         var item = this.cinemas[i];
         if ((cinemasGravados.indexOf(item.idcinema)) != -1){
           item.selecionado=1
         }
     }

  }


  getFavoritos(){
      this.storage.get('cinemasFavoritos').then(cinemasFavoritos=>{
        this.cinemasGravados= cinemasFavoritos
        this.marcaFavoritos(this.cinemasGravados);
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
    this.favoritosSelecionados = this.cinemasGravados;

    if (this.cinemas[indexSelecionado].selecionado == 1){
        this.cinemas[indexSelecionado].selecionado = 0
    }else{
        this.cinemas[indexSelecionado].selecionado = 1
    }



    //faz a busca no array de filmes selecionados
    for (var i = 0; i < this.favoritosSelecionados.length; i++) {
      var item = this.favoritosSelecionados[i];

      if ( item == cinema.idcinema) {
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