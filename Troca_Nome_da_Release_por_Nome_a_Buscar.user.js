// ==UserScript==
// @name        Troca Nome da Release por Nome a Buscar
// @namespace   pootz10
// @description Transforma o nome de uma release por exemplo: Filme.2020.HDRip.XviD.AC3-EVO em Filme pra busca identificar
// @include     http://*legendas.tv/*
// @exclude     http://*legendas.tv/download/*
// @version     1.0
// @history     1.0 - inicio
// @license     GNU
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @updateURL   https://github.com/pootz10/Troca-Nome-da-Release-por-Nome-a-Buscar/raw/master/Troca_Nome_da_Release_por_Nome_a_Buscar.user.js
// @downloadURL https://github.com/pootz10/Troca-Nome-da-Release-por-Nome-a-Buscar/raw/master/Troca_Nome_da_Release_por_Nome_a_Buscar.user.js
// @grant       GM_addStyle
// @run-at      document-idle
// ==/UserScript==


$("#search-box").bind('paste', function (e){
    $(e.target).keyup(sohTitulo);
});

function sohTitulo (e) {

    var inputText = e.target.value;
    $(e.target).unbind('keyup');

    inputText = inputText.replace(/\./g, " ");
    inputText = inputText.replace(/  /g, " ");
    inputText = inputText.replace(/   /g, " ");

    var re = /[\n\w\d\.\s,'-]+(20[0-5][0-9]|19[0-9][0-9])/g;
    var filmeAno = re.exec( inputText );
    inputText = filmeAno[0];
    inputText = inputText.replace(/( 20[0-5][0-9]|19[0-9][0-9])/g, "");
    e.target.value = inputText.trim();

};
