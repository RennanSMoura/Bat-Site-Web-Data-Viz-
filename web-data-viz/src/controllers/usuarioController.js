var usuarioModel = require("../models/usuarioModel");


function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.json({
                            id: resultadoAutenticar[0].idUsuario,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                            senha: resultadoAutenticar[0].senha
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        console.log('2 logins iguais')
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function receberDados(req, res) {
    var idUsuario = req.query.id

    usuarioModel.coletarDadosKpi(idUsuario).then(
        function (resultado) {
            console.log(`\nResultado encontrados: ${resultado}`)
            res.json({
                score: resultado[0].MaiorPontuacao,
                palavrasDescobertas: resultado[0].TotalPalavras
            });
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar a requisição dos dados! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function receberScoreGrafico(req, res) {
    var idUsuario = req.query.id

    usuarioModel.selecionarScoreGrafico(idUsuario).then(
        function (resultado) {
            console.log('Retornei com o idCorrida')
            console.log(resultado)
            res.json({
                resultado: resultado
            })
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar a requisição do idCorrida! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function inserirDadosJogo(req, res) {
    var idUsuario = req.body.idUsuarioServer
    var scoreAtual = req.body.scoreServer;
    var qtdPalavrasDescoberta = req.body.qtdPalavrasDescobertasServer;

    usuarioModel.inserirDados(scoreAtual, qtdPalavrasDescoberta, idUsuario).then(
        function (resultado) {
            console.log('Retornei do model para inserir dados no banco')
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function inserirDadosRanking(req, res) {
    var idUsuario = req.body.idUsuarioServer
    var idCorrida = req.body.idCorridaServer;
    console.log('Dados recebidos (quero verificar o id da corrida):', req.body);


    usuarioModel.inserirRanking(idUsuario, idCorrida).then(
        function (resultado) {
            console.log('Retornei do model para inserir dados do ranking no banco', resultado)
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro do ranking! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function plotarRanking(req, res) {
    var idUsuario = req.query.id

    usuarioModel.criarRanking(idUsuario).then(
        function (resultado) {
            console.log('Retornei com os dados do ranking', resultado)
            res.json({
                resultado: resultado
            })
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar ao demonstrar o ranking! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )
}

function receberMelhorPosicao(req, res) {
    var idUsuario = req.query.id

    usuarioModel.melhorPosicaoUsuario(idUsuario).then(
        function (resultado) {
            console.log('Retornei do Model com a maior posicao de cada usuario', resultado)
            res.json({
                resultado: resultado
            })
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao recuperar a melhor posicao do usuario! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    )
}




function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    console.log('retornei do model')
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar,
    receberDados,
    inserirDadosJogo,
    receberScoreGrafico,
    inserirDadosRanking,
    plotarRanking,
    receberMelhorPosicao
}