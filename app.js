let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    
//Voz do jogo
    // if ('speechSynthesis' in window) {
    //     let utterance = new SpeechSynthesisUtterance(texto);
    //     utterance.lang = 'pt-BR'; 
    //     utterance.rate = 1.5; 
    //     window.speechSynthesis.speak(utterance); 
    // } else {
    //     console.log('Web Speech APP não suportado neste navegador.');
    // };
};

exibirMensagemInicial();

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto' );
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
};

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute > numeroLimite) {
        exibirTextoNaTela('p', 'Por favor, ensira um número válido');
        return;
    } else if (chute < 1) {
        exibirTextoNaTela('p', 'Por favor, ensira um número válido');
        return;
    };

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);
    } else {
        if (chute < numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é maior do que ${chute}`);
        } else {
            exibirTextoNaTela('p', `O número secreto é menor do que ${chute}`);
        };
        tentativas ++;
        limparCampo();
    };
};

// Gerando o número aleatório
function gerarNumeroAleatorio() {
    let numeroAleatorio = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosDalista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosDalista == numeroLimite){
        listaDeNumerosSorteados = [];
    };

    if (listaDeNumerosSorteados.includes(numeroAleatorio)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroAleatorio);
        console.log(listaDeNumerosSorteados);
        return numeroAleatorio;
    };
};

// Limpando os Campos
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
};

// Reiniciando o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
    document.getElementById('chutar').removeAttribute('disabled');
};