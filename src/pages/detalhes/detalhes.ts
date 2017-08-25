import {OnInit} from '@angular/core';
import {Component} from '@angular/core'
import {NavController} from 'ionic-angular';
import {Sessoes} from '../sessoes/sessoes';
import {filmeEmCartaz} from '../../model/filmeEmCartaz';
import {NavParams} from 'ionic-angular';
import {filtro} from '../../model/filtro';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';



@Component({
  templateUrl: 'detalhes.html'
})

export class Detalhes {

	filmeSelecionado : filmeEmCartaz;
  isEstreia : boolean = false;


  	constructor(private nav: NavController, 
                private navParams: NavParams,
                private youtube: YoutubeVideoPlayer){

    	this.filmeSelecionado = navParams.get('param1');
      if (navParams.get('param2')==="ESTREIA"){
        this.isEstreia = true
      }
  }


    static get parameters() {
      return [[NavController], [NavParams],[YoutubeVideoPlayer]];
  }


  trataDetalhes(tipo, detalhe){
    if (tipo == "C"){
      if (detalhe == "0" || detalhe=="") {
        return "Livre"
      }else{
        return detalhe + " anos"
      }
    }
  }


  abrirTrailer(link){
    this.youtube.openVideo('https://www.youtube.com/watch?v=DCNEMfQ_uUg');
  }


  voltar()
  {
     this.nav.pop();
  }

}
