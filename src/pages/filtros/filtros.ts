import {Component, ViewChild} from '@angular/core'
import {NavController, NavParams} from 'ionic-angular';
import {ListaFilmes} from '../listaFilmes/listaFilmes';
import {ListaCinemas} from '../listaCinemas/listaCinemas';
import {SessoesAgora} from '../sessoesAgora/sessoesAgora';
import {filtro} from '../../model/filtro';
import {dataDisponivel} from '../../model/dataDisponivel';
import {chip} from '../../model/chip';
import {LoadingController } from 'ionic-angular';
import {filmesEmCartazService} from '../../services/filmesEmCartaz-service';
import {sessoesService} from '../../services/sessoes-service';
import {filmeEmCartaz} from '../../model/filmeEmCartaz';
import {Detalhes} from '../detalhes/detalhes';
import { ModalController } from 'ionic-angular';
import { Preferencias } from '../preferencias/preferencias';


@Component({
  templateUrl: 'filtros.html',
  providers: [filmesEmCartazService, sessoesService]
})

export class Filtros {

  filmes: filmeEmCartaz[];
  filmeEstreia;
  imagemFilmeEstreia:string;
  nomeFilmeEstreia:string;
  datas : dataDisponivel[];
  loading ;
  testSlides: string[] = [];
  @ViewChild('botaoCinema') botaoCinema: any;
  dataAtual: string ="";
  dataEscolhida : string = "";
  diaSemanaEscolhido : string = "";


  constructor(private nav: NavController,
              private navParams: NavParams,
              private filmesEmCartazService: filmesEmCartazService,
              private sessoesService : sessoesService,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController){


      this.loading = loadingCtrl.create({
        content: 'Aguarde...'
      });


     this.loading.present();
     this.dataAtual = this.retornaDataAtual();

     this.filmesEmCartazService = filmesEmCartazService;
     this.sessoesService = sessoesService;

     this.filmesEmCartazService.findEstreiaDaSemana().subscribe(
                  data => {
                      this.filmeEstreia = data
                      console.log(this.filmeEstreia)
                      this.imagemFilmeEstreia = this.filmeEstreia[0].imagem;
                      this.nomeFilmeEstreia = this.filmeEstreia[0].nome;
                  },
                  err => {
                      console.log(err);
                  },
                  () => console.log()
      );



      this.sessoesService.getDates(this.dataAtual).subscribe(
                  data => {
                      this.datas = data;
                      this.marcaDataDefault();
                      this.loading.dismiss();
                  },
                  err => {
                      console.log(err);
                  },
                  () => console.log()
      );

  }


  abreFiltros() {
     let modal = this.modalCtrl.create(Preferencias);
     modal.present();
  }


  marcaDataDefault(){
    var dataDoScroll;

    if (this.dataEscolhida == ""){
      for (var i = 0; i < this.datas.length; i++) {
         var item = this.datas[i];
         dataDoScroll = this.formataDataServico(item.data)
           if ( dataDoScroll == this.retornaDataAtual()){
             item.selecionado = true;
             this.dataEscolhida = dataDoScroll
             this.diaSemanaEscolhido = item.diasemana;

           }
      }
    }
  }



  retornaDataAtual(){
    var dataAtual = new Date();
    var dia = ("0" + (dataAtual.getDate())).slice(-2)
    var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2)
    var ano = dataAtual.getFullYear();

    return ano + "-" + mes + "-" + dia;
  }


  retornaDataAtualSessoesAgora(){
    var dataAtual = new Date();
    var dia = ("0" + (dataAtual.getDate())).slice(-2)
    var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2)
    var ano = dataAtual.getFullYear();
    var hora = dataAtual.getHours();
    var minuto = dataAtual.getMinutes();

    return ano + "-" + mes + "-" + dia + "-" + hora + "-" + minuto

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


  formataDataServico(data){
    var dia,mes,ano,dataReduzida;
    dataReduzida = data.substring(0,10)
    mes = data.substring(5,7);
    dia = data.substring(8,10)
    if (data != null){
      return data.substring(0,10);
    }
    else{
      return null;
    }

  }



  verCinemas(){
    var data = this.dataEscolhida;
    if (data=="") {
      data = this.dataAtual;
    }
    else{
      data=this.formataDataServico(this.dataEscolhida)
    }

    this.nav.push(ListaCinemas, {
         param1: data,
         param2: this.diaSemanaEscolhido
     });
  }



  verFilmes(){
     var data = this.dataEscolhida;
     if (data=="") {
       data = this.dataAtual;
     }
     else{
       data=this.formataDataServico(this.dataEscolhida)
     }

     this.nav.push(ListaFilmes, {
          param1: data,
          param2: this.diaSemanaEscolhido
      });
  }


  verSessoesAgora(){
    var dataAgora = this.retornaDataAtualSessoesAgora();

    this.nav.push(SessoesAgora, {
        param1: dataAgora
     });
  }

   verDetalhes(filmeEmCartaz){
    this.nav.push(Detalhes, {
         param1: filmeEmCartaz,
         param2: "ESTREIA"
     });
   }


  selecionaOpcaoQueroIr(listaQuero){

   for (var i = 0; i < this.datas.length; i++) {
      var item = this.datas[i];
      item.selecionado = false;
   }

   listaQuero.selecionado = !listaQuero.selecionado;
   this.dataEscolhida = listaQuero.data;
   this.diaSemanaEscolhido = listaQuero.diasemana;

  }


  abrirPreferencias(){

    alert("Aqui ")

  }



}
