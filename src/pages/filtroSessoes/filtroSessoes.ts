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
    //this.socialSharing.share("Olá! O filme " + this.sessao.nomeFilme + " vai ter uma sessão em "+ this.sessao.diames +"("+this.sessao.diasemana+") às "+this.formataHora(sessao.hora)+" horas. O que acha?", "Que tal um cineminha?", "https://ingresso-a.akamaihd.net/img/cinema/cartaz/19194-destaque.jpg", "A URL to share").then(() => {
      this.socialSharing.share("Olá! O filme Anabelle: A criação do Mal vai ter uma sessão em 26/08(Sábado) às 13:39. O que acha?", "Que tal um cineminha?", "https://ingresso-a.akamaihd.net/img/cinema/cartaz/19194-destaque.jpg", "A URL to share").then(() => {
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