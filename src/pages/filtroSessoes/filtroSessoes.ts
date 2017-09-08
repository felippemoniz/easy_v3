import {Component, ViewChild} from '@angular/core'
import {NavController, NavParams,ViewController} from 'ionic-angular';
import {sessao} from '../../model/sessao';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  templateUrl: 'filtroSessoes.html'
  })

export class FiltroSessoes {


  sessao;


  constructor(public viewCtrl: ViewController, private params: NavParams, private socialSharing: SocialSharing) {

    this.params = params;
    this.sessao = params.get('sessao')
    console.log( this.sessao.diames);

  }


  fechar() {
    this.viewCtrl.dismiss();
  }


  shareSheetShare() {
    this.socialSharing.share("Oi! O filme " + this.sessao.nomeFilme + " vai ter uma sessão em "+ this.sessao.diames +"("+this.sessao.diasemana+") às "+this.formataHora(this.sessao.hora)+" horas. O que acha?", "Que tal um cineminha?", this.sessao.imagem2, this.sessao.linktrailer).then(() => {
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
