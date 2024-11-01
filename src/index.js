const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const PORT = 3000;

// Serve a página principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rota para buscar o valor de um imóvel específico
app.get("/find", async (req, res) => {
    const codImob = req.query.codlote;
    if (!codImob) return res.status(400).send("Código do lote é necessário");

    try {
        const response = await axios.get(`https://geo.jundiai.sp.gov.br/geojundiai/infocfImob.jsp?codlote=${codImob}`);
        res.type("html").send(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar o valor do imóvel.");
    }
});

// Rota para obter média de valores dos últimos 6 meses
app.get("/averageValue", async (req, res) => {
    const region = req.query.region;

    // Exemplo de chamada para API imobiliária fictícia
    try {
        const response = await axios.get(`https://api.imobiliaria.com/v1/properties?region=${region}&months=6`);
        const values = response.data.map(property => property.price);
        const averageValue = values.reduce((acc, value) => acc + value, 0) / values.length;

        res.json({ averageValue });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao calcular valor médio.");
    }
});

// Rota para buscar valores em uma região com base em ponto de referência
app.get("/findByReference", async (req, res) => {
    const { referencePoint, radius } = req.query;

    // Exemplo de chamada para API geoespacial fictícia
    try {
        const response = await axios.get(`https://api.geoespacial.com/v1/properties?referencePoint=${referencePoint}&radius=${radius}`);
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar imóveis na região.");
    }
});

app.listen(PORT, () => {
    console.log("Servidor rodando na porta:", PORT);
});
