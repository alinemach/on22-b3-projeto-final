const app = require("./src/app")
const PORT = process.env.PORT || 3333

app.get("/", (req, res) => {
    res.send({ message: "Boas-vindas ao RESPIRA NÃO PIRA"})
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))