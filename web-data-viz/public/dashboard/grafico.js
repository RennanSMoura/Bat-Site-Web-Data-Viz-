const ctx = document.getElementById('grafico').getContext('2d');

// Configuração inicial do gráfico com dados vazios
const dados = {
    labels: [], // Será preenchido dinamicamente
    datasets: [{
        label: 'Pontuação',
        data: [], // Será preenchido dinamicamente
        borderColor: 'black',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 2
    }]
};

const config = {
    type: 'line', // Tipo de gráfico
    data: dados,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'black',
                    stepSize: 1000
                },
                title: {
                    display: true,
                    text: 'PONTUAÇÃO',
                    color: 'black',
                    font: {
                        size: 16
                    }
                }
            },
            x: {
                ticks: {
                    color: 'black'
                },
                title: {
                    display: true,
                    text: 'Nº PARTIDA',
                    color: 'black',
                    font: {
                        size: 16
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
};

const chart = new Chart(ctx, config); // Instância do gráfico

function receberScoreGrafico() {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/usuarios/receberScoreGrafico?id=${idUsuario}`)
        .then(function (resposta) {
            console.log("Recebendo dados da corrida (idCorrida!)");

            if (resposta.ok) {
                resposta.json().then(json => {
                    var ultimosResultadosCorrida = json.resultado;
                    console.log('Todos os dados:', ultimosResultadosCorrida);


                    ultimosResultadosCorrida.reverse()
                    console.log('Dados após reverse: ', ultimosResultadosCorrida)
                    // Salvar resultados no sessionStorage
                    sessionStorage.setItem("ULTIMOS_RESULTADOS_CORRIDA", JSON.stringify(ultimosResultadosCorrida));

                    // Atualizar o gráfico
                    console.log("Tamanho do meu array:", ultimosResultadosCorrida.length)
                    plotarDadosGrafico(ultimosResultadosCorrida);
                });
            } else {
                console.log("Houve um erro ao tentar recuperar os dados!");
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        })
        .catch(erro => {
            console.error("Erro na requisição:", erro);
        });
}

function plotarDadosGrafico(resultados) {
    // Preparar os arrays de labels e dados
    const labels = resultados.map((resultado => `Partida ${resultado.idBatCorrida}`));
    const data = resultados.map(resultado => resultado.score);

    chart.data.labels = labels;
    chart.data.datasets[0].data = data;

    // Atualizar o gráfico
    chart.update();
}

receberScoreGrafico();

