var sessao = (function () {
    function sessao(idfilme, idcinema, nomeFilme, nomeCinema, horaInicio, horaFim, duracao, rating, imagemAvatar, latitude, longitude, distancia, imagem2,selecionado) {
        this.idfilme = idfilme;
        this.idcinema = idcinema;
        this.nomeFilme = nomeFilme;
        this.nomeCinema = nomeCinema;
        this.horaInicio = horaInicio;
        this.horaFim = horaFim;
        this.duracao = duracao;
        this.rating = rating;
        this.imagemAvatar = imagemAvatar;
        this.latitude = latitude;
        this.longitude = longitude;
        this.distancia = distancia;
        this.imagem2 = imagem2;
        this.selecionado = selecionado;
    }
    return sessao;
}());
export { sessao };
//# sourceMappingURL=sessao.js.map