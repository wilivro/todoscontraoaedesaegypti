define(function(require){function _setConfig(config){_configEDI=config}function _telaAtual(){return edi.util.getURL("quest")}function _init(revelas,callback,callbackFinal,settings,callbackTempoBloqueio){function BtnRevClick(){var self=$(this),dataRev=$(this).attr("data-revela");self.off().css({cursor:"default"}).find("span").fadeIn(),$boxRev.each(function(i,obj){dataRev==$(obj).attr("data-revela")&&(setTimeout(function(){"fade"==config.efeito?$(obj).fadeIn():"slideDown"==config.efeito&&$(obj).slideDown()},500),self.attr("visualizada")||(peca.objetivos.pop(),edi.objetivos.pop(),edi.objetivos.unshift(1)),self.attr("visualizada",!0),callback&&callback(self,$(obj)),licao.config.WIQUADRO&&Wiquadro.api.addInteration(1,$(obj).attr("id"),self.attr("id"),"T"),ordem++,$('[data-index="'+ordem+'"]').click(BtnRevClick))}),$(this).removeClass("piscar"),$btnRev.off("click"),0!==peca.objetivos.length?config.tempoBloqueio?edi.regressiva(config.tempoBloqueio,"para clicar em outro botão",function(){$btnRev.click(BtnRevClick),callbackTempoBloqueio&&callbackTempoBloqueio(),0===peca.objetivos.length&&(finalizada=!0,callbackFinal&&callbackFinal(self)),self.off("click"),0===peca.objetivos.length&&config.bloqueiaClickFinal&&$btnRev.off("click")},config):($btnRev.click(BtnRevClick),self.off("click"),0===peca.objetivos.length&&config.bloqueiaClickFinal&&$btnRev.off("click")):config.bloqueiaClickFinal||edi.regressiva(config.tempoBloqueio,"para clicar em outro botão",function(){callbackTempoBloqueio&&callbackTempoBloqueio(),0===peca.objetivos.length&&(finalizada=!0,callbackFinal&&callbackFinal(self)),$btnRev.click(BtnRevClick),$btnRev.mouseenter(function(){config.piscar&&$(this).addClass("piscar")}),$btnRev.mouseout(function(){config.piscar&&$(this).removeClass("piscar")}),self.off("click")}),finalizada||edi.finalizar()}edi.iniciar(_configEDI);var peca=this,finalizada=!1,ordem=0,config={tempoBloqueio:5e3,efeito:"fade",piscar:!0,fontSize:14,bloqueiaClickFinal:!1,left:300};settings&&$.extend(config,settings);for(var ct=$("<div>").css({position:"absolute",top:85,left:config.left,border:"solid 1px #ccc",width:768-config.left,height:270,padding:5,borderRadius:10}).appendTo("#conteudo"),middle=$("<div>").css({position:"relative",display:"table-cell",verticalAlign:"middle",width:768-config.left,height:270}).appendTo(ct),i=0;i<revelas.length;i++){var box=$("<div>").css({width:768-config.left,height:parseInt(270/revelas.length)}).appendTo(middle),boxMidlle=$("<div>").css({width:768-config.left,height:parseInt(270/revelas.length),verticalAlign:"middle",textAlign:"center",display:"table-cell"}).appendTo(box),boxBtn=$("<div>").css({"float":"left",height:parseInt(270/revelas.length)}).appendTo(boxMidlle),btnMiddle=$("<div>").css({display:"table-cell",verticalAlign:"middle",height:parseInt(270/revelas.length)}).appendTo(boxBtn);$("<div>").css({background:"#91BB49",width:30,height:30,marginLeft:10,display:"table-cell",verticalAlign:"middle",textAlign:"center",color:"#fff",borderRadius:5,border:"2px solid #FFF",boxShadow:"1px 1px 1px rgba(0,0,0,0.5)",textShadow:"1px 1px 1px rgba(0,0,0,0.5)"}).html('<span style="display: none;">'+(i+1)+"</span>").addClass("btn-revela").attr("data-revela",i).appendTo(btnMiddle);var boxTxt=$("<div>").css({"float":"left",height:parseInt(270/revelas.length),marginLeft:10,padding:2}).addClass("box-revela").attr("data-revela",i).appendTo(boxMidlle);$("<div>").css({display:"table-cell",verticalAlign:"middle",textAlign:"left",fontSize:config.fontSize,width:718-config.left,height:parseInt(270/revelas.length),color:"#666"}).html(revelas[i]).appendTo(boxTxt)}var $btnRev=$(".btn-revela"),$boxRev=$(".box-revela");$btnRev.css("cursor","pointer"),$boxRev.hide(),$btnRev.click(BtnRevClick),$btnRev.attr("data-edi",'revela_b05"'),$btnRev.mouseenter(function(){config.piscar&&$(this).addClass("piscar")}),$btnRev.mouseout(function(){config.piscar&&$(this).removeClass("piscar")}),$btnRev.each(function(i,data){peca.objetivos.push(0),edi.objetivos.push(0),$(data).attr("data-index",i)}),ARR_TAREFAS[tarefaRevela].resolve(config.cb)}var tarefaRevela=addTarefa(),edi=require("./edi"),_configEDI=null;return{objetivos:[],setConfig:_setConfig,telaAtual:_telaAtual,revela_b05:_init}});