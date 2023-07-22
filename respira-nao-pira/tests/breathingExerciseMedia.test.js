const breathingExerciseMediaModel = require('../src/models/breathingExerciseMediaModel');

describe("GET model test", () => {
    const exerciseMedia = new breathingExerciseMediaModel({
        "bgURL": "https://www.bgurl.com.br",
        "gifURL": "https://www.gifurl.com.br",
        "soundTrackURL": "https://www.soundtrack.com.br",
    });

    it("Deve chamar o schema e retornar o nome correto do exercicio de respiracao", () => {
        expect(exerciseMedia.bgURL).toBe("https://www.bgurl.com.br");
    });
    it("Deve chamar o schema e retornar o nome correto do exercicio de respiracao", () => {
        expect(exerciseMedia.gifURL).toBe("https://www.gifurl.com.br");
    });
    it("Deve chamar o schema e retornar o nome correto do exercicio de respiracao", () => {
        expect(exerciseMedia.soundTrackURL).toBe("https://www.soundtrack.com.br");
    });
})

describe("CREATE route test", () => {
    const exerciseMedia = new breathingExerciseMediaModel({
        "bgURL": "https://www.bgurl.com.br",
        "gifURL": "https://www.gifurl.com.br",
        "soundTrackURL": "https://www.soundtrack.com.br",
    });

    it("Deve salvar no banco de dados o background  das novas midia de tecnica de respiracao", () => {
        exerciseMedia.save().then((dados) => {
            expect(dados.bgURL).toBe("https://www.bgurl.com.br")
        })
    })
})

describe("UPDATE route test", () => {
    it("Deve editar o background e salvar no banco de dados a midia de tecnica de respiracao", () => {

        const exerciseMedia = new breathingExerciseMediaModel({
            "bgURL": "https://www.bgurl.com.br",
            "gifURL": "https://www.gifurl.com.br",
            "soundTrackURL": "https://www.soundtrack.com.br",
        });
        exerciseMedia.bgURL = "https://www.bgurl.com.br"
        exerciseMedia.save().then((dados) => {
            expect(dados.bgURL).toBe("https://www.bgurl.com.br")
        })
    })
})

describe("DELETE route test", () => {
    it("Deve excluir uma midia de tecnica de respiracao", () => {
        const exerciseMedia = new breathingExerciseMediaModel({
            "bgURL": "https://www.bgurl.com.br",
            "gifURL": "https://www.gifurl.com.br",
            "soundTrackURL": "https://www.soundtrack.com.br",
        });
        exerciseMedia.save().then((dados) => {
            exerciseMedia.delete().then((novoDados) => {
                expect(dados.bgURL).toBe(null);
            })
        })
    })
})