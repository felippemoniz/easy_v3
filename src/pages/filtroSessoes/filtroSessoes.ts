import {Component, ViewChild} from '@angular/core'
import {NavController, NavParams,ViewController} from 'ionic-angular';
import {sessao} from '../../model/sessao';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  templateUrl: 'filtroSessoes.html'
  })

export class FiltroSessoes {


  sessao: sessao;


  constructor(public viewCtrl: ViewController, private params: NavParams, private socialSharing: SocialSharing) {

    this.params = params;
    console.log(params.get('sessao'));
    this.sessao = params.get('sessao')

  }


  fechar() {
    this.viewCtrl.dismiss();
  }


  shareSheetShare() {
    //this.socialSharing.share("Ol�! O filme " + this.sessao.nomeFilme + " vai ter uma sess�o em "+ this.sessao.diames +"("+this.sessao.diasemana+") �s "+this.formataHora(sessao.hora)+" horas. O que acha?", "Que tal um cineminha?", "https://ingresso-a.akamaihd.net/img/cinema/cartaz/19194-destaque.jpg", "A URL to share").then(() => {
      this.socialSharing.share("Ol�! O filme Anabelle: A cria��o do Mal vai ter uma sess�o em 26/08(S�bado) �s 13:39. O que acha?", "Que tal um cineminha?", "https://ingresso-a.akamaihd.net/img/cinema/cartaz/19194-destaque.jpg", "https://ingresso-a.akamaihd.net/img/cinema/cartaz/19194-destaque.jpg").then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }


  formataHora(hora){
    var horaString = hora.toString();
    return horaString.substring(0,2) + ":" + horaString.substring(2,4);
  }


  calculaHoraFim(time, minsToAdd) {
    function z(n){
      return (n<10? '0':'') + n;
    }
    var bits = time.split(':');
    var mins = bits[0]*60 + (+bits[1]) + (+minsToAdd);

    return z(mins%(24*60)/60 | 0) + ':' + z(mins%60);

  }



}
