import {OnInit} from '@angular/core';
import {Component} from '@angular/core'
import {NavController} from 'ionic-angular';
import {Sessoes} from '../sessoes/sessoes';
import {Detalhes} from '../detalhes/detalhes';
import {filmeEmCartaz} from '../../model/filmeEmCartaz';
import {NavParams} from 'ionic-angular';
import {filtro} from '../../model/filtro';
import {filmesEmCartazService} from '../../services/filmesEmCartaz-service';
import {chip} from '../../model/chip';
import {LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';



@Component({
  templateUrl: 'listaFilmes.html',
  providers: [filmesEmCartazService]
})




export class ListaFilmes {

  corSelecionado : string;
  cardSelecionado : boolean;
  filmes: filmeEmCartaz[];
  filmesSelecionados = [];
  contadorFilmesEscolhidos : number = 0;
  isClassVisible: boolean = false;
  qtFilme = 0;
  filtroData : string;
  diaSemanaEscolhido : string = "";



  constructor(private nav: NavController,
              private navParams: NavParams,
              private filmesEmCartazService:filmesEmCartazService,
              public toastCtrl: ToastController = null,
              public loadingCtrl: LoadingController = null) {


   
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Aguarde...'
    }); 

    loading.present();

    this.filtroData = navParams.get('param1');
    this.diaSemanaEscolhido = navParams.get('param2');
    this.filmesEmCartazService = filmesEmCartazService;


    this.filmesEmCartazService.findAll(this.filtroData).subscribe(
                data => {
                    this.filmes = data;
                    this.qtFilme = this.filmes.length;
                    loading.dismiss();
                    //console.log(this.qtFilme);
                },
                err => {
                    console.log(err);
                },
                () => console.log(this.qtFilme)
            );


  }


 
exibeAlerta(){

    let toast = this.toastCtrl.create({
      message: 'Ops! Você não escolheu nenhum filme ainda...',
      duration: 3000,
      cssClass: "toastAlerta",
      position: 'top'
    });
    toast.present();
}



  static get parameters() {
      return [[NavController], [NavParams], [filmesEmCartazService],[ToastController],[LoadingController]];
  }

  retornaDataAtual(){
    var dataAtual = new Date();
    var dia = ("0" + (dataAtual.getDate())).slice(-2)
    var mes = ("0" + (dataAtual.getMonth() + 1)).slice(-2)
    var ano = dataAtual.getFullYear();

    return ano + "-" + mes + "-" + dia;
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



  trataDetalhes(tipo, detalhe){
    if (tipo == "C"){
      if (detalhe == "0" || detalhe=="") {
        return "Livre"
      }else{
        return detalhe + " anos"
      }
    }

   if (tipo == "N"){
      if (detalhe == "0" || detalhe=="") {
        return "-"
      }else{
        return detalhe;
      }
    }

  }


   verSessoes(){

     if (this.filmesSelecionados.length > 0 ){
         this.nav.push(Sessoes, {
              param1: this.filmesSelecionados,
              param2 : this.filtroData,
              param3 : "F",
              param4 : this.diaSemanaEscolhido
          });
      }else{
        this.exibeAlerta();
      }
   }


   verDetalhes(filmeEmCartaz){
    this.nav.push(Detalhes, {
         param1: filmeEmCartaz
     });
   }



   //Seleciona os filmes, marcando com um check, atualizando o contador em tela e
   //carregando o array filmes selecionados
   selecionaFilme(filmeEmCartaz) {

     var p = [];
     var flagEncontrado= false;
     var index;

     var indexSelecionado = this.filmes.indexOf(filmeEmCartaz);


    //Marca os filmes selecionados com o "check"
     if (this.filmes[indexSelecionado].selecionado == 1){
         this.filmes[indexSelecionado].selecionado = 0
     }else{
          this.filmes[indexSelecionado].selecionado = 1
     }



     //faz a busca no array de filmes selecionados
     for (var i = 0; i < this.filmesSelecionados.length; i++) {
        var item = this.filmesSelecionados[i];

        if ( item.idfilme == filmeEmCartaz.idfilme) {
           flagEncontrado = true;
           index=i;
        }
     }


    if (flagEncontrado == false) {
      this.filmesSelecionados.push (filmeEmCartaz);
      this.contadorFilmesEscolhidos = this.filmesSelecionados.length;
    }
    else{
      this.filmesSelecionados.splice(index,1);
      this.contadorFilmesEscolhidos = this.filmesSelecionados.length;
    }


}


voltar()
{
    this.nav.pop();  
}









}
