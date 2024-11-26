var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function coletarDadosKpi(idUsuario) {
    var instrucaoSql =
        `
        select sum(palavrasDescobertas) as TotalPalavras,
         max(score) as MaiorPontuacao from batCorrida
            join usuario
                on batCorrida.fkUsuario = usuario.idUsuario
                    where idUsuario = ${idUsuario};
    `
    return database.executar(instrucaoSql);
}

function selecionarScoreGrafico(idUsuario) {
    var instrucaoSql =
        `
        SELECT score, idBatCorrida
            FROM batcorrida
                WHERE fkUsuario = ${idUsuario}
                    ORDER BY idBatCorrida DESC
                      LIMIT 10;

    `
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function inserirDados(score, qtdPalavrasDescoberta, idUsuario) {
    var instrucaoSql =
        `
        insert into batCorrida (score,palavrasDescobertas,fkUsuario)
            values
                (${score},${qtdPalavrasDescoberta},${idUsuario});

    `
    return database.executar(instrucaoSql).then(function(corridaResultado){
        var corridaId = corridaResultado.insertId
        inserirRanking(idUsuario,corridaId)
    })
}

function inserirRanking(idUsuario, idCorrida) {
    var instrucaoSql =
        `
        INSERT INTO RANKING (fkCorrida, fkUsuarioCorrida,dataRanking)
            values
                (${idCorrida},${idUsuario},curdate());
    `
    return database.executar(instrucaoSql)
}


function melhorPosicaoUsuario(idUsuario){
    var instrucaoSql =
    `
SELECT 
    u.idUsuario,
    u.nome AS Nome,
    MIN(
        (SELECT COUNT(*) 
         FROM batcorrida b 
			WHERE b.score > bc.score) + 1
				) AS MelhorPosicao
					FROM ranking r
						JOIN usuario u
							ON r.fkUsuarioCorrida = u.idUsuario
								JOIN batcorrida bc
									ON r.fkCorrida = bc.idBatCorrida
										where idUsuario = ${idUsuario}
										GROUP BY u.idUsuario, u.nome;

    `
    return database.executar(instrucaoSql)
}

function criarRanking(idUsuario){
    var instrucaoSql= 
    `
        SELECT usuario.nome as Nome,
		    ranking.dataRanking as 'Data',
			    batcorrida.score as Pontuação
                    FROM ranking
                        JOIN usuario
                            ON ranking.fkUsuarioCorrida = usuario.idUsuario
                                JOIN batcorrida
                                    ON ranking.fkCorrida = batCorrida.idBatCorrida
                                        ORDER BY batcorrida.score desc
                                            limit 10;
    `
    return database.executar(instrucaoSql)
}



module.exports = {
    autenticar,
    cadastrar,
    coletarDadosKpi,
    inserirDados,
    selecionarScoreGrafico,
    inserirRanking,
    criarRanking,
    melhorPosicaoUsuario
};