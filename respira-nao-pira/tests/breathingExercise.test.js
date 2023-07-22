const breathingExerciseModel = require('../src/models/breathingExerciseModel');


describe("GET model test", () => {
  const breathingExercise = new breathingExerciseModel({
    name: "Respiração 4-7-8",
    description: "Essa técnica foi desenvolvida pelo Dr. Andrew Weil e é conhecida por induzir um estado de relaxamento profundo. Sente-se em uma posição confortável, coloque a ponta da língua no céu da boca, atrás dos dentes da frente. Expire completamente pela boca, fazendo um som 'quuuu'. Em seguida, feche a boca e inspire silenciosamente pelo nariz contando até quatro. Segure a respiração contando até sete e, em seguida, expire completamente pela boca contando até oito. Repita o ciclo por pelo menos quatro vezes. Essa técnica ajuda a reduzir a frequência cardíaca e acalmar o sistema nervoso.",
    message: "Mesmo que outros pensamentos venha até você, calmamente retorne a sua atenção ao nosso exercício",
    breathingDuration: 10,
    media: "64b550ce72806cb925790462"
    
  });

  it("Deve chamar o schema e retornar o nome correto da memória", () => {
    expect(breathingExercise.name).toBe("Respiração 4-7-8")
  });
  it("Deve chamar o schema e retornar o nome correto da memória", () => {
    expect(breathingExercise.description).toBe("Essa técnica foi desenvolvida pelo Dr. Andrew Weil e é conhecida por induzir um estado de relaxamento profundo. Sente-se em uma posição confortável, coloque a ponta da língua no céu da boca, atrás dos dentes da frente. Expire completamente pela boca, fazendo um som 'quuuu'. Em seguida, feche a boca e inspire silenciosamente pelo nariz contando até quatro. Segure a respiração contando até sete e, em seguida, expire completamente pela boca contando até oito. Repita o ciclo por pelo menos quatro vezes. Essa técnica ajuda a reduzir a frequência cardíaca e acalmar o sistema nervoso.");
  });
  it("Deve chamar o schema e retornar a descrição correta da memória", () => {
    expect(breathingExercise.message).toBe("Mesmo que outros pensamentos venha até você, calmamente retorne a sua atenção ao nosso exercício")
  });
  it("Deve chamar o schema e retornar a categoria correta da memória", () => {
    expect(breathingExercise.breathingDuration).toBe(10)
  });
  it("Deve chamar o schema e retornar a id da midia do exercicio de respiracao", () => {
    expect(JSON.stringify(breathingExercise.media).substring(1, (JSON.stringify(breathingExercise.media)).length - 1)).toBe("64b550ce72806cb925790462")
  })
})

describe("CREATE route test", () => {
  const breathingExercise = new breathingExerciseModel({
    name: "Respiração 4-7-8",
    description: "Essa técnica foi desenvolvida pelo Dr. Andrew Weil e é conhecida por induzir um estado de relaxamento profundo. Sente-se em uma posição confortável, coloque a ponta da língua no céu da boca, atrás dos dentes da frente. Expire completamente pela boca, fazendo um som 'quuuu'. Em seguida, feche a boca e inspire silenciosamente pelo nariz contando até quatro. Segure a respiração contando até sete e, em seguida, expire completamente pela boca contando até oito. Repita o ciclo por pelo menos quatro vezes. Essa técnica ajuda a reduzir a frequência cardíaca e acalmar o sistema nervoso.",
    message: "Mesmo que outros pensamentos venha até você, calmamente retorne a sua atenção ao nosso exercício",
    breathingDuration: 10,
    media: "64b550ce72806cb925790462"
  });

  it("Deve salvar no banco de dados o novo exercicio de respiracao", () => {
    breathingExercise.save().then((dados) => {
      expect(dados.name).toBe("Respiração 4-7-8")
    })
  })
})

describe("UPDATE route test", () => {
  it("Deve editar o nome e salvar no banco de dados o novo exercicio de respiracao", () => {

    const breathingExercise = new breathingExerciseModel({
      name: "Respiração 4-7-8",
      description: "Essa técnica foi desenvolvida pelo Dr. Andrew Weil e é conhecida por induzir um estado de relaxamento profundo. Sente-se em uma posição confortável, coloque a ponta da língua no céu da boca, atrás dos dentes da frente. Expire completamente pela boca, fazendo um som 'quuuu'. Em seguida, feche a boca e inspire silenciosamente pelo nariz contando até quatro. Segure a respiração contando até sete e, em seguida, expire completamente pela boca contando até oito. Repita o ciclo por pelo menos quatro vezes. Essa técnica ajuda a reduzir a frequência cardíaca e acalmar o sistema nervoso.",
      message: "Mesmo que outros pensamentos venha até você, calmamente retorne a sua atenção ao nosso exercício",
      breathingDuration: 10,
      media: "64b550ce72806cb925790462"
    });
    breathingExercise.name = "Respiração com visualização"
    breathingExercise.save().then((dados) => {
      expect(dados.name).toBe("Respiração com visualização")
    })
  })
})

describe("DELETE route test", () => {
  it("Deve excluir um exercicio de respiracao", () => {
    const breathingExercise = new breathingExerciseModel({
      name: "Respiração 4-7-8",
      description: "Essa técnica foi desenvolvida pelo Dr. Andrew Weil e é conhecida por induzir um estado de relaxamento profundo. Sente-se em uma posição confortável, coloque a ponta da língua no céu da boca, atrás dos dentes da frente. Expire completamente pela boca, fazendo um som 'quuuu'. Em seguida, feche a boca e inspire silenciosamente pelo nariz contando até quatro. Segure a respiração contando até sete e, em seguida, expire completamente pela boca contando até oito. Repita o ciclo por pelo menos quatro vezes. Essa técnica ajuda a reduzir a frequência cardíaca e acalmar o sistema nervoso.",
      message: "Mesmo que outros pensamentos venha até você, calmamente retorne a sua atenção ao nosso exercício",
      breathingDuration: 10,
      media: "64b550ce72806cb925790462"
    });
    breathingExercise.save().then((dados) => {
      breathingExercise.delete().then((novoDados) => {
        expect(dados.name).toBe(null);
      })
    })
  })
})