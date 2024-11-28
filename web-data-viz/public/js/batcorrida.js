// Receber classes
const batman = document.querySelector('.batman');
const joker = document.querySelector('.joker');
const clouds = document.querySelector('.clouds');
const clouds2 = document.querySelector('.clouds2');
const fundo = document.querySelector('.game-board');
const startBtn = document.querySelector('.startButton')
const dialogo = document.querySelector('.dialogos')

// Tempo de duração da animação do coringa
const animationStyle = window.getComputedStyle(joker).animation;
const animationDuration = animationStyle.split(' ')[0];
var animationSpeed = parseFloat(animationDuration);

// Criação do score
var score = 0;
const scoreDisplay = document.createElement('div');
scoreDisplay.style.position = 'absolute';
scoreDisplay.style.top = '10%';
scoreDisplay.style.right = '5%';
scoreDisplay.style.color = 'white';
scoreDisplay.style.fontSize = '24px';
scoreDisplay.style.fontWeight = 'bold';
scoreDisplay.innerText = `Score: ${score}`;
document.body.appendChild(scoreDisplay);


joker.style.display = 'none';
batman.style.display = 'none';
clouds.style.display = 'none';
clouds2.style.display = 'none';
clouds2.style.display = 'none';
fundo.style.backgroundImage = 'none';
fundo.style.backgroundColor = 'black';


// Função para o Batman pular
const jump = () => {
    if (!gameRunning) 
        return;
    batman.classList.add('jump');
    setTimeout(() => {
        batman.classList.remove('jump');
    }, 500);
};

var gameRunning = false;
var loop;
var newWords = 0

function startGame() {
    
    gameRunning = true;
    score = 0;
    scoreDisplay.innerText = `Score: ${score}`;
    joker.style.display = 'inline';
    startBtn.style.display = 'none';
    joker.style.animation = 'joker-animation 1.4s linear infinite';
    batman.style.display = 'block';
    clouds.style.display = 'block';
    clouds2.style.display = 'block';
    fundo.style.backgroundImage = 'url(../assets/predio-gotham.png)';
    fundo.style.backgroundColor = 'black';
    gerarDialogo()

    loop = setInterval(() => {
        const jokerPosition = joker.offsetLeft;
        const batmanPosition = Number(window.getComputedStyle(batman).bottom.replace('px', ''));
        const cloudsPosition = clouds.offsetLeft;
        const clouds2Position = clouds2.offsetLeft;

        if (jokerPosition <= 120 && batmanPosition < 80 && jokerPosition > 0) {
            // Pausa as animações no momento do game over
            joker.style.animation = 'none';
            joker.style.left = `${jokerPosition}px`;
            batman.style.animation = 'none';
            batman.style.bottom = `20px`;
            clouds.style.animation = 'none';
            clouds.style.left = `${cloudsPosition}px`;
            clouds2.style.animation = 'none';
            clouds2.style.left = `${clouds2Position}px`;
            batman.style.width = '150px';
            batman.src = '../assets//batman_lost.png'; 

            gameRunning = false;
            clearInterval(loop);
            
            inserirDadosJogo(score, newWords)

            alert(`Game Over! Sua pontuação foi de: ${score} pontos e você descobriu ${newWords} palavras`)
            const restartButton = document.createElement('button');
            restartButton.innerText = 'Reiniciar Jogo';
            restartButton.style.position = 'absolute';
            restartButton.style.top = '50%';
            restartButton.style.left = '50%';
            restartButton.style.transform = 'translate(-50%, -50%)';
            restartButton.style.padding = '50px';
            restartButton.style.fontSize = '40px';
            restartButton.style.backgroundColor = '#FFCC00';
            restartButton.style.color = 'black';
            restartButton.style.border = 'none';
            restartButton.style.cursor = 'pointer';
            restartButton.style.borderRadius = '20px';
            restartButton.style.zIndex = '1000';

// Adicionar evento para reiniciar a página
restartButton.addEventListener('click', () => {
    location.reload();
});

// Adicionar botão ao DOM
document.body.appendChild(restartButton);

        } else {
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
            var revelarPontuacoes = [
                200,
                400,
                600,
                800,
                1000,
                1200,
                1400,
                1600,
                1800,
                2000,
                2200,
                2400,
                2600,
                2800,
                3000,
                3200,
                3400,
                3600,
                3800,
                4000,
                4200,
                4400,
                4600,
                4800,
                5000,
                5200,
                5400,
                5600,
                5800,
                6000
            ];
            revelarPontuacoes.forEach((pontuacao, index) => {
                if (score >= pontuacao) {
                    var span = document.getElementById(`palavra-${index * 8 + 7}`);
                    var sublinhado = document.getElementById(`sublinhado-${index * 8 + 7}`);
                    if (span) {
                        span.style.display = 'inline';
                        span.style.color = 'red';
                        sublinhado.style.display = 'none';
                    }
                }

                if (score == revelarPontuacoes[index]) {
                    newWords += 1
                }
            });

            if ((jokerPosition > -80 && jokerPosition < -70) || (jokerPosition > 1260)) {
                if (score > 2000) {
                    animationSpeed = 1;
                }
                joker.style.animation = `joker-animation ${animationSpeed}s linear infinite`;

            }
            console.log(
                'Velocidade: ' + animationSpeed,
                'Posicao: ' + jokerPosition,
                'Pontuacao: ' + score
            )
        }
    }, 10);

}

document.addEventListener('keydown', jump);

function gerarDialogo() {
    var dialogos = [
        `Joker: You have nothing to threaten me with. Nothing to do with all your strength. But don't worry, I'm going to tell you where they are. Both of them, and that's the point. You'll have to choose. He's at 252nd Street and she's on Avenue X at the same time. You can save either one. But you can't save them both.`,

        `Harvey Dent: You either die a hero, or you live long enough to see yourself become the villain.
Rachel: Harvey, what are you talking about?
Harvey Dent: I’m talking about the system! We built it to protect people, but look at it now. Corrupt, falling apart. No one trusts it anymore. And Gotham? It’s so far gone. You know, they say crime doesn’t pay, but they forget to mention it just takes time. A long time. And Gotham? It can’t afford that kind of time. It’s dying, Rachel, and you and I are all that’s left to save it. So how much are you willing to sacrifice to make that happen?
Rachel: You’re not listening to me. Harvey, you’re not thinking clearly. This is not how we fix it.
Harvey Dent: I’m not fixing it, Rachel. I’m saving it. The people... they need to see someone who can do the right thing, but who’s willing to go to the extreme to make sure they never forget. You and I are going to make sure they understand, no matter what it takes.`,

        `Batman: I promised Rachel that I would save her, and I couldn’t. I couldn’t save her, Alfred.
Alfred: You didn't fail her, Master Wayne. You did what you could, and in the end, that’s all we can do. Sometimes, we can’t save everyone.Batman: But I made a promise. A promise to her. And I broke it. Gotham’s been relying on me, and now I’ve failed it too. What if I’m just making things worse?
Alfred: No, Master Wayne. You’re doing something that they’ll never understand. You're pushing yourself, but you have to be careful. Gotham is not a place you can control with fear, no matter how hard you try.
Batman: Then what do I do, Alfred? How do I stop him? The Joker’s turning everyone into monsters. They’re becoming just like him.
Alfred: You fight, Master Wayne. You fight until you can’t fight anymore. But you also remember who you are and why you do it. Gotham needs hope, not another villain. Don’t become what you fear.`,

        `Joker: You know, I was just like you once. I had a code. A sense of justice. But then the world showed me its true face. I embraced the chaos. It’s what I’m all about now. Do you understand?
Harvey Dent: I don’t think you understand, Joker. I made a choice. I could’ve stopped this, but I didn’t. Now, I’m beyond redemption.
Joker: Oh, you poor thing. You think you’re the only one who's been through pain? The only one who’s lost everything? The only one who knows what it feels like to have your whole world burn around you? Please. I’ve been through worse than you can imagine. You know what the difference between you and me is?`,

        `Batman: What do you want, Joker? You think you can break me? You think you can break Gotham? This is my city, and I’ll protect it at all costs.Joker: Your city? Hah, I’ve been watching you. You think you’re in control? You think that mask makes you powerful? Gotham’s broken, Batman. It’s full of cracks, and one little push is all it takes for everything to fall apart.`,

        `Alfred: You’ve become a symbol, Master Wayne. Not just for Gotham, but for all of us. You must be ready for the consequences.
Bruce Wayne: What do you mean, Alfred?
Alfred: You think Gotham needs you? You think you’re the only one who can stop the madness? But what happens when it becomes too much? What happens when they start turning on you? You can’t keep this up forever.
Bruce Wayne: I know. I’ve thought about it. But there’s no going back now. They need me.
Alfred: And what about you? What happens when you’re no longer able to be the man they look up to? What happens to the man behind the mask?`,

        `Joker: You think you know what I want, but you don’t. It’s not about money. It’s not about power. It’s about something far simpler. It’s about the truth. People are animals, Batman. They’ll do anything to survive. But deep down, they’re all just like me. All I need to do is push them. And they’ll turn on each other. Just like you’ll turn on me.
Batman: No, you’re wrong. People are better than that. People want hope.
Joker: Hope? You think they’ll still have hope after what I’m about to do to this city? No, Batman. I’ll strip it all away. And then, you’ll see the real Gotham. The one that’s been hiding under the surface all this time. Just waiting for someone like me to give it a little push.`,

        `Harvey Dent: You know, I believed in justice. I believed in this city. But now, I’m not so sure. This place is beyond saving. The people, they’re all corrupted. They want a quick fix, a shortcut, but they won’t accept the hard truth. You can’t just save them all  You can’t even save yourself.
Bruce Wayne: I’m not trying to save the city, Harvey. I’m trying to save you. I’m trying to remind you of the man you used to be.Harvey Dent: The man I used to be is gone, Bruce. And the city isn’t the same either. Maybe we were both wrong. Maybe justice isn’t something you can just give people. Maybe it’s something they have to fight for themselves.`,

        `Joker: You think you’ve won? You think you’ve beaten me? No. Gotham’s still broken. It’s always been broken. And you, Batman, you’re just another part of the problem. You can’t fix this. No one can.Batman: I’m not trying to fix it. I’m trying to hold it together.`,

        `Alfred: Master Wayne, there’s more to life than Gotham. You’ve sacrificed everything, and for what? For a city that doesn’t appreciate you? For a world that’s beyond saving?
Wayne: I don’t know what else to do, Alfred. I can’t stop now.
Alfred: Maybe it’s time to let go. Maybe it’s time to accept that some things are beyond our control.Bruce Wayne: I can’t just walk away. I made a promise. And I intend to keep it.`,

        `Joker: It’s all just a game, Batman. A game of chess, and you’re playing with the wrong pieces. You think you can stop me? You think you can stop this city from tearing itself apart? You can’t.
Batman: You don’t understand. I’m not here to play games. I’m here to stop you.Joker: Stop me? Hah! That’s the thing, Batman. You’ll never stop me. You’ll just keep chasing me around, trying to catch up. And in the end, I’ll always be one step ahead.`

    ];
    var dialogoEscolhido = dialogos[Math.floor(Math.random() * dialogos.length)];
    var palavras = dialogoEscolhido.split(' ');
    dialogo.innerHTML = '';
    palavras.forEach((palavra, index) => {
        if (index % 8 === 7) {
            var sublinhado = document.createElement('span');
            sublinhado.innerText = '_ ';
            sublinhado.id = `sublinhado-${index}`;
            dialogo.appendChild(sublinhado);
            var span = document.createElement('span');
            span.innerText = palavra + ' ';
            span.id = `palavra-${index}`;
            span.style.display = 'none';
            dialogo.appendChild(span);
        } else {
            var span = document.createElement('span');
            span.innerText = palavra + ' ';
            span.id = `palavra-${index}`;
            dialogo.appendChild(span);
        }
    });
    dialogo.style.display = 'block';
}

function inserirDadosJogo(score, palavrasDescobertas) {
    var scoreAtual = score
    var qtdPalavrasDescoberta = palavrasDescobertas
    var idUsuario = sessionStorage.getItem("ID_USUARIO");

    fetch("/usuarios/inserirDadosJogo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario,
            scoreServer: scoreAtual, 
            qtdPalavrasDescobertasServer: qtdPalavrasDescoberta
    })
})
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log('Dados da corrida inseridos com sucesso')

            } else {
                throw "Houve um erro ao tentar realizar o cadastro da corrida!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
                
      });
}

function inserirDadosRanking(){

    var idUsuario = sessionStorage.getItem("ID_USUARIO");
    var ultimosResultadosCorrida = JSON.parse(sessionStorage.getItem("ULTIMOS_RESULTADOS_CORRIDA"));
    var idCorrida = ultimosResultadosCorrida[(ultimosResultadosCorrida.length -1)]?.idBatCorrida;


    fetch("/usuarios/inserirDadosRanking", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario,
            idCorridaServer: idCorrida
    })
}) .then(function (resposta) {
    console.log("resposta: ", resposta);

    if (resposta.ok) {
        console.log('Dados inseridos com sucesso no ranking')
        console.log

    } else {
        throw "Houve um erro ao tentar realizar a inserção no ranking!";
    }
})
.catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
        
});

}
