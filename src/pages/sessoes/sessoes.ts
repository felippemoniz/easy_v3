import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {sessoesService} from '../../services/sessoes-service';
import {sessao} from '../../model/sessao';
import {filtro} from '../../model/filtro';
import {cinema} from '../../model/cinema';
import {filme} from '../../model/filme';
import {chip} from '../../model/chip';
import {cinemaService} from '../../services/cinema-service';
import {filmesEmCartazService} from '../../services/filmesEmCartaz-service';
import {LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { FiltroSessoes } from '../filtroSessoes/filtroSessoes';
import { PopoverController } from 'ionic-angular';
import {Storage} from '@ionic/storage';

declare var geolib : any;


@Component({
  templateUrl: 'sessoes.html' ,
  providers: [sessoesService,cinemaService,filmesEmCartazService]
})


export class Sessoes {

  itensSelecionados = [];
  tagsSelecionadas = [];
  sessoesFiltradas = [];
  cinemas : cinema[];
  filmes : filme[];
  tags = [];
  filtro: filtro;
  sessoes: sessao[];
  filtroData: string;
  tipoPesquisa;
  filtroString = []
  latitude : number;
  Longitude : number;
  sessoesOriginais = [];
  qtSessoes = 0;
  diaSemanaEscolhido : string = "";
  loading ;
  buttonColor: string = 'white'; 
  cinemasGravados;
  flagfiltrado : string = "N";



 constructor(private nav: NavController,
             private navParams: NavParams ,
             private sessoesService : sessoesService,
             private cinemaService : cinemaService,
             private filmesEmCartazService : filmesEmCartazService,
             public popoverCtrl: PopoverController,
             private storage:Storage,
             public loadingCtrl: LoadingController = null){


    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Procurando sessões disponíveis...'
    });

    loading.present();
    this.getFavoritos();


    this.itensSelecionados = navParams.get('param1');
    this.filtroData = navParams.get('param2');
    this.tipoPesquisa = navParams.get('param3');
    this.diaSemanaEscolhido = navParams.get('param4');


    this.sessoesService = sessoesService;
    this.cinemaService = cinemaService;
    this.filmesEmCartazService = filmesEmCartazService;


    var filtro = ""

    this.carregaTags();




    //Se a consulta vier da página de cinemas
    if (this.tipoPesquisa === "C"){

            //Recupera os ids dos filmes selecionados
            for (var i = 0; i < this.itensSelecionados.length; i++) {
                filtro = filtro + "," + this.itensSelecionados[i].idcinema;
            }
            filtro = filtro.substring(1,filtro.length)
            this.sessoesService.findByTheater(filtro,this.filtroData).subscribe(
                        data => {
                            this.sessoes = data;
                            this.qtSessoes = this.sessoes.length;
                            this.sessoesOriginais = this.sessoes;
                            loading.dismiss();
                        },
                        err => {
                            console.log(err);
                        },
                        () => console.log("")
            );

          /*  this.filmesEmCartazService.findFilmesPorSessao(filtro,this.filtroData).subscribe(
                        data => {
                            this.filmes = data;
                        },
                        err => {
                            console.log(err);
                        },
                        () => console.log("")
            ); */

    //Se a consulta vier da página de filmes em cartaz
    }else{

            //Recupera os ids dos filmes selecionados
            for (var i = 0; i < this.itensSelecionados.length; i++) {
                filtro = filtro + "," + this.itensSelecionados[i].idfilme;
            }
            filtro = filtro.substring(1,filtro.length)

            this.sessoesService.findById(filtro,this.filtroData).subscribe(
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

           /*  this.cinemaService.findCinemaPorSessao(filtro,this.filtroData).subscribe(
                        data => {
                            this.cinemas = data;
                        },
                        err => {
                            console.log(err);
                        },
                        () => console.log("")
            ); */


    }

  }



  getFavoritos(){
      this.storage.get('cinemasFavoritos').then(cinemasFavoritos=>{
        this.cinemasGravados= cinemasFavoritos
      });

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


  abreDetalhesSessao(sessao) {
     let popover = this.popoverCtrl.create(FiltroSessoes,{sessao});
     popover.present();
  }



  formataTempoAteSessao(horaSessao){
    var horaSessaoAtual = this.formataHora(horaSessao);
    var d = new Date();
    var horaAtual  = d.getHours() + ":" + d.getMinutes();
    var texto = this.diferencaHoras(horaSessaoAtual, horaAtual)
    return texto;
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


  diferencaHoras(t1, t2)
  {
    var t1parts = t1.split(':');
    var t1cm=Number(t1parts[0])*60+Number(t1parts[1]);

    var t2parts = t2.split(':');
    var t2cm=Number(t2parts[0])*60+Number(t2parts[1]);

    var hour =Math.floor((t1cm-t2cm)/60);
    var min=Math.floor((t1cm-t2cm)%60);


    if (hour == 0){
      return min + " min"
    }else{
      return (hour+' h e '+min+' min');
    }

  }





  selecionaTag(tag){
    tag.selecionado = !tag.selecionado;
    var retorno=""

    if (tag.nome == "LEG"){
      if (tag.selecionado)this.filtroString[0]="Legendado"
      if (!tag.selecionado)this.filtroString[0]=""
    }
    if (tag.nome == "DUB" ){
      if (tag.selecionado)this.filtroString[1]="Dublado"
      if (!tag.selecionado)this.filtroString[1]=""
    }
    if (tag.nome == "3D" ){
      if (tag.selecionado)this.filtroString[2]="3D"
      if (!tag.selecionado)this.filtroString[2]=""
    }
    if (tag.nome == "2D" ){
      if (tag.selecionado)this.filtroString[3]="Normal"
      if (!tag.selecionado)this.filtroString[3]=""
    }

   
    retorno = this.filtroString.join();

    this.mostraSessao(retorno.replace(/^,|,$/g,''))
   

    }




   favoritos(){

    var item, cinema
    var cinemasFavoritos = this.cinemasGravados;
    this.qtSessoes=0;
    let loading
    var stLiga;

    console.log("@@@ "+ this.cinemasGravados )

    if (this.buttonColor == '#e26f6f'){
      this.buttonColor = 'white'
      stLiga = false;
      loading = this.loadingCtrl.create({
            spinner: 'ios',
            content: 'Exibindo <b>todos os cinemas</b>...'
      });
    }
    else{
      this.buttonColor = '#e26f6f'
      stLiga = true;
      loading = this.loadingCtrl.create({
            spinner: 'ios',
            content: 'Exibindo seus <b>cinemas favoritos</b>...'
      });
    }

    loading.present();

    this.mostraSessaoCinemasFavoritos("847,128")


    setInterval(() => {
      loading.dismiss();
    }, 600);
   
    this.flagfiltrado="S";

  }




    mostraSessao(tags){

    var item, tipoSessao, tags_temp,cinema
    var cinemasFavoritos = this.cinemasGravados;

    tags_temp = tags.replace(",,,",",");
    tags_temp = tags_temp.replace(",,",",");
    this.qtSessoes=0;

    console.log(tags_temp)

      for (var i = 0; i < this.sessoes.length; i++) {
          item = this.sessoes[i];
          tipoSessao = item.tipo;
          cinema = item.idcinema;


                if (tipoSessao.indexOf(tags_temp)==-1 ){
                    item.selecionado = 1;
                }
                else{
                  item.selecionado = 0;
                  this.qtSessoes = this.qtSessoes + 1;
                }
          }


    this.flagfiltrado="S";
    }





    mostraSessaoCinemasFavoritos(tags){

    var item, tipoSessao, tags_temp,cinema="";
    var cinemasFavoritos = this.cinemasGravados;

    this.qtSessoes=0;

    console.log(tags)

      for (var i = 0; i < this.sessoes.length; i++) {
          item = this.sessoes[i];
          tipoSessao = item.tipo;
          cinema = item.idcinema+""

            if (item.selecionado==0){

                if (tags.indexOf(cinema)==-1 ){
                    item.selecionado = 1;
                }
                else{
                  item.selecionado = 0;
                  this.qtSessoes = this.qtSessoes + 1;
                }
             }
          }

    this.flagfiltrado="S";
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



  filtrarSessoes(){
     let sessoesOrdenadas = [];
     for (var i = 0; i < this.sessoes.length; i++) {
        var item = this.sessoes[i];
        if (item.distancia <= 5){
           sessoesOrdenadas.push(item);
        }
     }
     this.sessoes = sessoesOrdenadas;
  }


voltar()
{
    this.nav.pop();
}


}
