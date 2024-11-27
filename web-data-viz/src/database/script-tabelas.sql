use batbanco;

show tables;

desc usuario;

select * from usuario;

desc batCorrida;


insert into batCorrida (score, palavrasDescobertas, fkUsuario)
values 
('300', 30,8),
('5400', 22,8),
('8400', 52,8);



select sum(palavrasDescobertas), max(score) from batCorrida
join usuario
on batCorrida.fkUsuario = usuario.idUsuario;

insert into batCorrida (score,palavrasDescobertas,fkUsuario)
values
('10000',50,8);

select * from batcorrida;



SELECT score, idBatCorrida
FROM batcorrida
WHERE fkUsuario = 8
ORDER BY idBatCorrida 
LIMIT 10;

SELECT score, idBatCorrida
FROM batcorrida
WHERE fkUsuario = 8
ORDER BY idBatCorrida
LIMIT 10;

SELECT score, idBatCorrida
FROM batcorrida
WHERE fkUsuario = 8
ORDER BY idBatCorrida DESC
LIMIT 10;

desc ranking;
desc batcorrida;
desc usuario;

select usuario.nome,batcorrida.score, dataRanking
from ranking
join usuario
on fkUsuarioCorrida = usuario.idUsuario
join batcorrida
on fkCorrida = batCorrida.idBatCorrida
where fkUsuarioCorrida = 8;

SELECT  batcorrida.score, ranking.dataRanking
	FROM ranking
		JOIN batcorrida
			ON fkCorrida = batCorrida.idBatCorrida;

SELECT * FROM usuario WHERE idUsuario = 8;
SELECT * FROM batCorrida;
SELECT * FROM ranking WHERE fkUsuarioCorrida = 8;

SHOW TABLES;

DESC USUARIO;
DESC BATCORRIDA;
DESC RANKING;

INSERT INTO RANKING (fkCorrida, fkUsuarioCorrida,dataRanking)
values
(13,8,curdate());

select * from ranking;
select * from batcorrida;

truncate batCorrida;

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

ALTER TABLE usuario ADD melhorPosicao INT DEFAULT NULL;


SELECT 
    usuario.idUsuario,
    usuario.nome AS Nome,
    batcorrida.score AS Pontuacao,
    (SELECT COUNT(*) 
     FROM batcorrida b 
     WHERE b.score > batcorrida.score) + 1 AS Posicao
		FROM ranking
			JOIN usuario 
				ON ranking.fkUsuarioCorrida = usuario.idUsuario
					JOIN batcorrida 
						ON ranking.fkCorrida = batcorrida.idBatCorrida
							ORDER BY Posicao ASC;


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
										where idUsuario = 8
										GROUP BY u.idUsuario, u.nome;

