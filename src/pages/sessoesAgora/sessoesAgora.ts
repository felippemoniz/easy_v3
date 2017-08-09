import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {sessoesService} from '../../services/sessoes-service';
import {sessao} from '../../model/sessao';
import {filtro} from '../../model/filtro';
import {LoadingController } from 'ionic-angular';
import {chip} from '../../model/chip';


declare var geolib : any;

@Component({
  templateUrl: 'sessoesAgora.html' ,
  providers: [sessoesService]
})


export class SessoesAgora {

  filmesSelecionados = [];
  sessoes: sessao[];
  sessoesOriginais = [];
  filtroInicial: filtro;
  latitude : number;
  Longitude : number;
  //public loading = Loading.create();
  filtroData: string;
  qtSessoes = 0;
  tags = [];

//lições aprendidas: tive que definir o tipo sessoesService pois dava pau no momento da execução, não faço ideia do porquê
 constructor(private nav: NavController, private navParams: NavParams , private sessoesService : sessoesService,
             public loadingCtrl: LoadingController = null){


    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Procurando filmes que vão começar em breve...'
    }); 

    loading.present();

    this.filtroData = navParams.get('param1');
    this.sessoesService = sessoesService;
    //this.nav.present(this.loading);

    this.carregaTags();

    this.sessoesService.findNow(this.filtroData).subscribe(
                data => {
                    this.sessoes = data;
                    this.qtSessoes = this.sessoes.length;
                    loading.dismiss();
                },
                err => {
                    console.log(err);
                },
                () => console.log("")
            );

    //this.getAllDistances();
    this.sessoesOriginais = this.sessoes;

  }


  private carregaTags(){

     let item = new chip();
     item.nome = 'LEG';
     item.nomeDetalhado = 'Legendado';
     item.selecionado = false;
     this.tags.push (item);

     let item2 = new chip();
     item2.nome = 'DUB';
     item2.nomeDetalhado = 'Dublado';
     item2.selecionado = false;
     this.tags.push (item2);

     let item3 = new chip();
     item3.nome = '3D';
     item3.nomeDetalhado = '3D';
     item3.selecionado = false;
     this.tags.push (item3);

     let item4 = new chip();
     item4.nome = '2D';
     item4.nomeDetalhado = 'Normal';
     item4.selecionado = false;
     this.tags.push (item4);

  }

  formataHora(hora){
    var horaString = hora.toString();
    return horaString.substring(0,2) + ":" + horaString.substring(2,4);
  }


  verSessoesProximas(){
     let sessoesOrdenadas = [];
     for (var i = 0; i < this.sessoes.length; i++) {
        var item = this.sessoes[i];
        if (item.distancia <= 5){
           sessoesOrdenadas.push(item);
        }
     }
     this.sessoes = sessoesOrdenadas;
  }


  formataTempoAteSessao(horaSessao){
    var horaSessaoAtual = this.formataHora(horaSessao);
    var d = new Date();
    var horaAtual  = d.getHours() + ":" + d.getMinutes();
    var texto = this.diferencaHoras(horaSessaoAtual, horaAtual)
    return texto;
  }



  diferencaHoras(t1, t2)
  {
    var t1parts = t1.split(':');
    var t1cm=Number(t1parts[0])*60+Number(t1parts[1]);

    var t2parts = t2.split(':');
    var t2cm=Number(t2parts[0])*60+Number(t2parts[1]);

    var hour =Math.floor((t1cm-t2cm)/60);
    var min=Math.floor((t1cm-t2cm)%60);


    if (hour == 0){
      return min + " minuto(s)"
    }else{
      return (hour+' hora(s) e '+min+' minuto(s)');
    }

  }

  formataData(data){
  var dia,mes,ano,dataReduzida;
    dataReduzida = data.substring(0,10)
    mes = data.substring(5,7);
    dia = data.substring(8,10)

    if (dataReduzida == this.retornaDataAtual()){
      return "Hoje"
    }
    else{
      return dia + "/" + mes ;
    }
  }


  retornaDataAtual(){
    var dataAtual = new Date();
    var dia = ("0" + (dataAtual.getDate())).slice(-2)
    var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2)
    var ano = dataAtual.getFullYear();

    return ano + "-" + mes + "-" + dia;
  }



  formataDistanciaAmigavel(distancia){

    if (distancia <= 2) {
      return "Bem perto";
    }
    else if (distancia > 2 && distancia <= 5){
      return "Perto";
    }
    else if (distancia > 5 && distancia <= 20){
      return "Um pouco longe";
    }
    else {
      return "Bem longe";
    }

  }


  private getDistance (origin, destination){
    let distance = geolib.getDistance(origin, destination);

    return geolib.convertUnit('km',distance,2);
  }



/*
  private getAllDistances(){

    Geolocation.getCurrentPosition().then(result=>{
      for (let i = 0; i < this.sessoes.length; i++){
        let sessao = this.sessoes[i];
        console.log(result.coords.latitude + " - " + result.coords.longitude)
        sessao.distancia = this.getDistance(
           {latitude: result.coords.latitude,
           longitude: result.coords.longitude},
           {latitude : sessao.longitude,
           longitude : sessao.latitude}
          )
        }
    });

  }
*/



calculaHoraFim(time, minsToAdd) {
  function z(n){
    return (n<10? '0':'') + n;
  }
  var bits = time.split(':');
  var mins = bits[0]*60 + (+bits[1]) + (+minsToAdd);

  return z(mins%(24*60)/60 | 0) + ':' + z(mins%60);

}



  selecionaOpcaoPrefs(listaPref){
    listaPref.selecionado = !listaPref.selecionado;
  }


voltar()
{
    this.nav.pop();
}


}
