const symptomsModel = require('../src/models/symptomsModel');
  

describe("GET model test", () => {
    const symptom = new symptomsModel({
        "name": "Symptom test",
        "breathingExercise": "64b46f347754cbe5d6979d20"
    });

    it("Deve chamar o schema e retornar o nome correto do sintoma", () => {
        expect(symptom.name).toBe("Symptom test");
    });
    it("Deve chamar o schema e retornar a id do exercicio de respiracao referente ao sintoma em questao", () => {
        expect(JSON.stringify(symptom.breathingExercise).substring(1, (JSON.stringify(symptom.breathingExercise)).length - 1)).toBe("64b46f347754cbe5d6979d20")
    })
})

describe("CREATE route test", () => {
    const symptom = new symptomsModel({
        "name": "Symptom test",
        "breathingExercise": "64b46f347754cbe5d6979d20"
    });

    it("Deve salvar no banco de dados a nova memória", () => {
        symptom.save().then((dados) => {
            expect(dados.name).toBe("Symptom test")
        })
    })
})

describe("UPDATE route test", () => {
    it("Deve editar o nome e salvar no banco de dados o novo sintoma", () => {

        const symptom = new symptomsModel({
            "name": "Symptom test",
            "breathingExercise": "64b46f347754cbe5d6979d20"
        });
        symptom.name = "New symptom test"
        symptom.save().then((dados) => {
            expect(dados.name).toBe("New symptom test")
        })
    })
})

describe("DELETE route test", () => {
    it("Deve excluir um sintoma", () => {
        const symptom = new symptomsModel({
            "name": "Symptom test",
            "breathingExercise": "64b46f347754cbe5d6979d20"
        });
        symptom.save().then((dados) => {
            symptom.delete().then((novoDados) => {
                expect(dados.name).toBe(null);
            })
        })
    })
})