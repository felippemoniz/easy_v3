import {Component, ViewChild} from '@angular/core'
import {NavController, NavParams,ViewController} from 'ionic-angular';



@Component({
  templateUrl: 'filtroSessoes.html'
  })

export class FiltroSessoes {

  constructor(public viewCtrl: ViewController, private params: NavParams) {
  
  }


  fechar() {
    this.viewCtrl.dismiss();
  }



}