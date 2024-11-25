var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/receberDados", function (req, res) {
    usuarioController.receberDados(req, res);
});

router.post("/inserirDadosJogo", function (req, res) {
    usuarioController.inserirDadosJogo(req, res);
});

router.get("/receberScoreGrafico", function (req, res) {
    usuarioController.receberScoreGrafico(req, res);
});

router.post("/inserirDadosRanking", function (req, res) {
    usuarioController.inserirDadosRanking(req, res);
});

router.get("/plotarRanking", function (req, res) {
    usuarioController.plotarRanking(req, res);
});



module.exports = router;