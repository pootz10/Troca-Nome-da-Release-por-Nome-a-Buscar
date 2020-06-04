// ==UserScript==
// @name        Troca Nome da Release por Nome a Buscar
// @namespace   pootz10
// @description Transforma o nome de uma release por exemplo: Filme.2020.HDRip.XviD.AC3-EVO em Filme pra busca identificar
// @include     http://*legendas.tv/*
// @exclude     http://*legendas.tv/download/*
// @version     1.1
// @history     1.1 - adicionado botão toggle pra desligar a função
// @license     GNU
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @updateURL   https://github.com/pootz10/Troca-Nome-da-Release-por-Nome-a-Buscar/raw/master/Troca_Nome_da_Release_por_Nome_a_Buscar.user.js
// @downloadURL https://github.com/pootz10/Troca-Nome-da-Release-por-Nome-a-Buscar/raw/master/Troca_Nome_da_Release_por_Nome_a_Buscar.user.js
// @grant       GM_addStyle
// @run-at      document-idle
// ==/UserScript==


var search = $("#search-box");

search.before('<label class="switch" title="Extrai Apenas o Nome.Da.Release" style="font-size: 0.85rem">' +
              '<input type="checkbox" id="conversor">' +
              '<span class="slider round">' +
              '<span class="on">ON</span><span class="off">OFF</span>'+
              '</span></label>');


var conversor = $('#conversor');
conversor.prop("checked", true);

if( conversor.is(":checked") ) {
    search.bind('paste', function (e){
        $(e.target).keyup(sohTitulo);
    });
} else {
    search.unbind('paste');
}

conversor.on("click", function (){
    $(this).change();
});

conversor.on("change", function() {

   if( $(this).is(":checked") ) {
       search.bind('paste', function (e){
            $(e.target).keyup(sohTitulo);
        });
   }
    else {
       search.unbind('paste');
   }

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

GM_addStyle ( `
.switch {
  position: relative;
  display: inline-block;
  width: 3.75em;
  height: 2.125em;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1.625em;
  width: 1.625em;
  left: 0.25em;
  bottom: 0.25em;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #4885C4;
}

input:focus + .slider {
  box-shadow: 0 0 1px #4885C4;
}

input:checked + .slider:before {
  -webkit-transform: translateX(1.625em);
  -ms-transform: translateX(1.625em);
  transform: translateX(1.625em);
}

.on {
  display: none;
}

.on,
.off {
  color: white;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 25%;
  left: 25%;
  font-size: 11px;
  font-family: MS Shell Dlg 2;
}

.on {
  top: 15px;
}

.off {
  left: auto;
  right: -5px;
  top: 15px;
}

input:checked+ .slider .on {
  display: block;
}

input:checked + .slider .off {
  display: none;
}

/* Rounded sliders */
.slider.round {
  border-radius: 2.125em;
}

.slider.round:before {
  border-radius: 50%;
}

#conversor {
  height: 22px;
}

` );
