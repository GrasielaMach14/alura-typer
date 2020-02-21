var tempoInicial = $("#tempo").text();
var campo = $(".digitacao");

$(document).ready(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#reiniciar").click(reiniciarJogo);
});

function atualizaTamanhoFrase()
{
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamFrase = $("#tamFrase");
    
    tamFrase.text(numPalavras);
}

function inicializaContadores()
{
    campo.on("input", function(){
        var conteudo = campo.val();
    
        var qtdPalavras = conteudo.split(/\S+/).length;
        $("#contadorPalavras").text(qtdPalavras);
    
        var qtdCaracters = conteudo.length;
        $("#contador").text(qtdCaracters);
        
    });
}

function inicializaCronometro()
{
    var tempoRestante = $("#tempo").text();
    
    campo.one("focus", function(){
        var cronometro = setInterval(function(){
            tempoRestante--;
            $("#tempo").text(tempoRestante);
            if(tempoRestante < 1)
            {
                clearInterval(cronometro);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo()
{
    campo.toggleClass("campo-desativado");
    campo.attr("disabled", true);
    inserePlacar();

}

function inicializaMarcadores()
{
    var frase = $(".frase").text();
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0 , digitado.length);
    
        if(digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function inserePlacar()
{
    var corpo = $(".placar").find("tbody");
    console.log(corpo);
    var usuario = "Diego";
    var numPalavras = $("#contadorPalavras").text();
    var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>";

    var linha = "<tr>"+
                    "<td>"+usuario+"</td>"+
                    "<td>"+numPalavras+"</td>"+
                    "<td>"+botaoRemover+"</td>"+
                "</tr>";

    corpo.append(linha);
}

$(".deleta").click(event, function(){
    event.preventDefault();
    $(this).parent().parent().remove();
});

function reiniciarJogo()
{
        campo.attr("disabled", false);
        campo.val("");
        $("#contadorPalavras").text("0");
        $("#contador").text("0");
        $("#tempo").text(tempoInicial);
        inicializaCronometro();
        campo.toggleClass("campo-desativado");
        campo.removeClass("borda-verde");
        campo.removeClass("borda-vermelha");
}


