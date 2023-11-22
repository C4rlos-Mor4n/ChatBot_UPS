const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  EVENTS,
} = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
const {
  obtenerRespuestaAleatoria,
  obtenerSolicitudAleatoria,
  obtenerMensajeAleatorio,
} = require("./services/Response-Ramdon");

let RESPUESTAS_TEST = {};

const flowPrincipal = addKeyword(EVENTS.WELCOME)
  .addAction(async (ctx, { flowDynamic, state }) => {
    await state.update({ phone: ctx.from, name: ctx.pushName });
    const currentState = state.getMyState();

    const mensajesBienvenida = [
      "🎓 ¡Bienvenido al *Test Vocacional* de la *UPS*! ¿Listo para descubrir qué carrera universitaria es la adecuada para ti? Nos alegra mucho tenerte aquí. 🌟",
      "👋 Hola, ¡qué emoción darte la bienvenida al *Test Vocacional* de la *Universidad Politécnica Salesiana* sede Guayaquil! Estamos listos para comenzar. ¿Y tú? 🚀",
      "🎉 ¡Saludos! Bienvenido al *Test Vocacional* de la *UPS* Guayaquil. 🏫 Estoy aquí para acompañarte en la búsqueda de tu pasión universitaria. ¡Vamos allá!",
      "👨‍🎓 Hola y bienvenido al *Test Vocacional* de la *UPS* Guayaquil. Tu viaje hacia un futuro brillante comienza ¡ahora mismo! ✨",
      "🤗 ¡Qué gusto verte aquí! Inicia tu aventura para encontrar la carrera de tus sueños con nuestro *Test Vocacional*. 🌈 Prepárate para un mundo de posibilidades en la *UPS*.",
      "👩‍🏫 ¡Hola! Te doy la más cordial bienvenida al *Test Vocacional* de la *Universidad Politécnica Salesiana*. Explora tus opciones y encuentra tu camino con nosotros. 🛤️",
      "🌟 Bienvenido al *Test Vocacional* de la *UPS*. Permítenos ser la brújula que te guíe a tu destino universitario ideal. 🧭",
      "🎓 Hola, futuro estudiante de la *UPS*! Estás a solo unos momentos de descubrir la carrera que podría marcar tu vida. ¡Comencemos con el *Test Vocacional*! 🔍",
      "🚀 Bienvenido a esta emocionante travesía con el *Test Vocacional UPS*. Encuentra tu lugar en el mundo universitario y da el primer paso hacia tu sueño profesional. 🎯",
      "🎈 ¡Hola! Emprende tu camino hacia el éxito con nuestro *Test Vocacional*. La *Universidad Politécnica Salesiana* te espera con las puertas abiertas. ¡Bienvenido a bordo! 🛳️",
    ];

    // Selecciona un mensaje aleatorio
    const respuesta =
      mensajesBienvenida[Math.floor(Math.random() * mensajesBienvenida.length)];

    console.log("[NUMERO DE LA PERSONA] ===>", currentState.phone);
    console.log("[MENSAJE DE BIENVENIDA]====>", respuesta);

    return await flowDynamic([
      { body: respuesta, media: "https://i.imgur.com/x43IhBk.jpg" },
    ]);
  })
  .addAnswer(
    "*Instrucciones:*\nSelecciona la respuesta que mejor se ajuste a tus preferencias en cada pregunta. Al final del test, encontrarás una recomendación basada en tus elecciones.",
    null,
    async (_, { gotoFlow }) => {
      return gotoFlow(flowPrimerPregunta);
    }
  );

const flowPrimerPregunta = addKeyword(EVENTS.ACTION).addAnswer(
  "*¿Qué tipo de actividades te resultan más interesantes?*\n\na) Trabajar con números y análisis financiero.\nb) Diseñar edificios y espacios creativos.\nc) Investigar sobre diferentes culturas y sociedades.\nd) Realizar experimentos en un laboratorio.\ne) Programar y resolver problemas tecnológicos.",
  { capture: true },
  async (ctx, { flowDynamic, gotoFlow, fallBack, state }) => {
    await state.update({
      phone: ctx.from,
      name: ctx.pushName,
      respuesta: ctx.body,
    });
    const currentState = state.getMyState();
    let respuesta = currentState.respuesta.toLowerCase();

    if (
      respuesta === "a" ||
      respuesta === "b" ||
      respuesta === "c" ||
      respuesta === "d" ||
      respuesta === "e"
    ) {
      RESPUESTAS_TEST[currentState.phone] = {
        ...RESPUESTAS_TEST[currentState.phone],
        Pregunta_1: "¿Qué tipo de actividades te resultan más interesantes?",
        Respuesta_1: respuesta,
      };

      await flowDynamic(obtenerRespuestaAleatoria());

      return gotoFlow(flowSegundaPregunta);
    } else {
      return fallBack(obtenerSolicitudAleatoria());
    }
  }
);

const flowSegundaPregunta = addKeyword(EVENTS.ACTION).addAnswer(
  "*Si tuvieras que elegir un libro para leer, ¿cuál escogerías?*\n\na) Un libro sobre teorías económicas y modelos financieros.\nb) Una novela de ciencia ficción que inspire tu imaginación.\nc) Un libro que explique las tradiciones y costumbres de diferentes grupos étnicos.\nd) Un libro de medicina y avances biomédicos.\ne) Un libro de programación y desarrollo de software.",
  { capture: true },
  async (ctx, { flowDynamic, gotoFlow, fallBack, state }) => {
    await state.update({
      phone: ctx.from,
      name: ctx.pushName,
      respuesta: ctx.body,
    });
    const currentState = state.getMyState();
    let respuesta = currentState.respuesta.toLowerCase();

    if (
      respuesta === "a" ||
      respuesta === "b" ||
      respuesta === "c" ||
      respuesta === "d" ||
      respuesta === "e"
    ) {
      RESPUESTAS_TEST[currentState.phone] = {
        ...RESPUESTAS_TEST[currentState.phone],
        Pregunta_2:
          "Si tuvieras que elegir un libro para leer, ¿cuál escogerías?",
        Respuesta_2: respuesta,
      };

      await flowDynamic(obtenerRespuestaAleatoria());

      return gotoFlow(flowTerceraPregunta);
    } else {
      return fallBack(obtenerSolicitudAleatoria());
    }
  }
);

const flowTerceraPregunta = addKeyword(EVENTS.ACTION).addAnswer(
  "*¿Cómo te describirías en términos de habilidades sociales?*\n\na) Excelente para comunicar y liderar a otros.\nb) Creativo y capaz de expresar tus ideas visualmente.\nc) Empático y dispuesto a entender diferentes puntos de vista.\nd) Preciso y meticuloso en tu trabajo.\ne) Bueno para resolver problemas de manera lógica.",
  { capture: true },
  async (ctx, { flowDynamic, gotoFlow, fallBack, state }) => {
    await state.update({
      phone: ctx.from,
      name: ctx.pushName,
      respuesta: ctx.body,
    });
    const currentState = state.getMyState();
    let respuesta = currentState.respuesta.toLowerCase();

    if (
      respuesta === "a" ||
      respuesta === "b" ||
      respuesta === "c" ||
      respuesta === "d" ||
      respuesta === "e"
    ) {
      RESPUESTAS_TEST[currentState.phone] = {
        ...RESPUESTAS_TEST[currentState.phone],
        Pregunta_3:
          "¿Cómo te describirías en términos de habilidades sociales?",
        Respuesta_3: respuesta,
      };

      await flowDynamic(obtenerRespuestaAleatoria());

      return gotoFlow(flowCuartaPregunta);
    } else {
      return fallBack(obtenerSolicitudAleatoria());
    }
  }
);

const flowCuartaPregunta = addKeyword(EVENTS.ACTION).addAnswer(
  "*¿Qué te gustaría hacer en tu tiempo libre?*\n\na) Organizar y planificar eventos.\nb) Explorar nuevos lugares y apreciar la arquitectura.\nc) Participar en actividades comunitarias y aprender sobre diferentes culturas.\nd) Realizar investigaciones científicas en tu campo de interés.\ne) Programar aplicaciones y experimentar con nuevas tecnologías.",
  { capture: true },
  async (ctx, { flowDynamic, gotoFlow, fallBack, state }) => {
    await state.update({
      phone: ctx.from,
      name: ctx.pushName,
      respuesta: ctx.body,
    });
    const currentState = state.getMyState();
    let respuesta = currentState.respuesta.toLowerCase();

    if (
      respuesta === "a" ||
      respuesta === "b" ||
      respuesta === "c" ||
      respuesta === "d" ||
      respuesta === "e"
    ) {
      RESPUESTAS_TEST[currentState.phone] = {
        ...RESPUESTAS_TEST[currentState.phone],
        Pregunta_4: "¿Qué te gustaría hacer en tu tiempo libre?",
        Respuesta_4: respuesta,
      };

      await flowDynamic(obtenerRespuestaAleatoria());

      return gotoFlow(flowQuintaPregunta);
    } else {
      return fallBack(obtenerSolicitudAleatoria());
    }
  }
);

const flowQuintaPregunta = addKeyword(EVENTS.ACTION).addAnswer(
  "*¿Cómo te sientes acerca de los desafíos matemáticos?*\n\na) Me encantan y se me dan muy bien.\nb) Puedo manejarlos, pero no son mi fuerte.\nc) Prefiero actividades que involucren más interacción humana.\nd) No me siento cómodo con ellos.\ne) Me siento cómodo usando la lógica y los números para resolver problemas.",
  { capture: true },
  async (ctx, { flowDynamic, gotoFlow, fallBack, state }) => {
    await state.update({
      phone: ctx.from,
      name: ctx.pushName,
      respuesta: ctx.body,
    });
    const currentState = state.getMyState();
    let respuesta = currentState.respuesta.toLowerCase();

    if (
      respuesta === "a" ||
      respuesta === "b" ||
      respuesta === "c" ||
      respuesta === "d" ||
      respuesta === "e"
    ) {
      RESPUESTAS_TEST[currentState.phone] = {
        ...RESPUESTAS_TEST[currentState.phone],
        Pregunta_5: "¿Cómo te sientes acerca de los desafíos matemáticos?",
        Respuesta_5: respuesta,
      };

      await flowDynamic(obtenerRespuestaAleatoria());

      return gotoFlow(flowSextaPregunta);
    } else {
      return fallBack(obtenerSolicitudAleatoria());
    }
  }
);

const flowSextaPregunta = addKeyword(EVENTS.ACTION).addAnswer(
  "*¿Qué te intriga más sobre el cuerpo humano?*\n\na) Cómo funcionan los sistemas económicos y financieros.\nb) Cómo se pueden diseñar estructuras únicas y estéticas.\nc) Cómo las diferentes culturas influyen en las interacciones humanas.\nd) Cómo las enfermedades afectan el cuerpo y cómo prevenirlas.\ne) Cómo la tecnología puede mejorar la atención médica.",
  { capture: true },
  async (ctx, { flowDynamic, gotoFlow, fallBack, state }) => {
    await state.update({
      phone: ctx.from,
      name: ctx.pushName,
      respuesta: ctx.body,
    });
    const currentState = state.getMyState();
    let respuesta = currentState.respuesta.toLowerCase();

    if (
      respuesta === "a" ||
      respuesta === "b" ||
      respuesta === "c" ||
      respuesta === "d" ||
      respuesta === "e"
    ) {
      RESPUESTAS_TEST[currentState.phone] = {
        ...RESPUESTAS_TEST[currentState.phone],
        Pregunta_6: "¿Qué te intriga más sobre el cuerpo humano?",
        Respuesta_6: respuesta,
      };

      await flowDynamic(obtenerRespuestaAleatoria());

      return gotoFlow(flowSeptimaPregunta);
    } else {
      return fallBack(obtenerSolicitudAleatoria());
    }
  }
);

const flowSeptimaPregunta = addKeyword(EVENTS.ACTION).addAnswer(
  "*¿Qué tipo de proyectos te gustaría liderar?*\n\na) Proyectos que involucren estrategias de negocios y administración.\nb) Proyectos de diseño arquitectónico y construcción.\nc) Proyectos que promuevan la diversidad y la inclusión.\nd) Proyectos de investigación científica para el avance de la medicina.\ne) Proyectos de desarrollo de software y tecnología.",
  { capture: true },
  async (ctx, { flowDynamic, gotoFlow, fallBack, state }) => {
    await state.update({
      phone: ctx.from,
      name: ctx.pushName,
      respuesta: ctx.body,
    });
    const currentState = state.getMyState();
    let respuesta = currentState.respuesta.toLowerCase();

    if (
      respuesta === "a" ||
      respuesta === "b" ||
      respuesta === "c" ||
      respuesta === "d" ||
      respuesta === "e"
    ) {
      RESPUESTAS_TEST[currentState.phone] = {
        ...RESPUESTAS_TEST[currentState.phone],
        Pregunta_7: "¿Qué tipo de proyectos te gustaría liderar?",
        Respuesta_7: respuesta,
      };

      await flowDynamic(obtenerRespuestaAleatoria());

      return gotoFlow(flowOctavaPregunta);
    } else {
      return fallBack(obtenerSolicitudAleatoria());
    }
  }
);

const flowOctavaPregunta = addKeyword(EVENTS.ACTION).addAnswer(
  "*¿Cómo te sientes acerca de trabajar en equipo?*\n\na) Disfruto liderar equipos y tomar decisiones.\nb) Me gusta trabajar en equipo, pero también disfruto del tiempo solo.\nc) Me encanta colaborar con personas de diferentes antecedentes.\nd) Prefiero trabajar de manera independiente.\ne) Me siento cómodo trabajando en equipo para resolver problemas complejos.",
  { capture: true },
  async (ctx, { flowDynamic, gotoFlow, fallBack, state }) => {
    await state.update({
      phone: ctx.from,
      name: ctx.pushName,
      respuesta: ctx.body,
    });
    const currentState = state.getMyState();
    let respuesta = currentState.respuesta.toLowerCase();

    if (
      respuesta === "a" ||
      respuesta === "b" ||
      respuesta === "c" ||
      respuesta === "d" ||
      respuesta === "e"
    ) {
      RESPUESTAS_TEST[currentState.phone] = {
        ...RESPUESTAS_TEST[currentState.phone],
        Pregunta_8: "¿Cómo te sientes acerca de trabajar en equipo?",
        Respuesta_8: respuesta,
      };

      await flowDynamic(obtenerRespuestaAleatoria());

      return gotoFlow(flowNovenaPregunta);
    } else {
      return fallBack("Indica, por favor, tu selección entre: a, b, c, d o e.");
    }
  }
);

const flowNovenaPregunta = addKeyword(EVENTS.ACTION).addAnswer(
  "*¿Qué aspecto te atrae más en una carrera?*\n\na) Oportunidades para tomar decisiones empresariales importantes.\nb) La posibilidad de dar vida a tus ideas a través del diseño.\nc) La oportunidad de comprender y conectar con diversas culturas.\nd) La capacidad de contribuir al avance de la medicina y la salud.\ne) La oportunidad de trabajar con tecnología innovadora.",
  { capture: true },
  async (ctx, { flowDynamic, gotoFlow, fallBack, state }) => {
    await state.update({
      phone: ctx.from,
      name: ctx.pushName,
      respuesta: ctx.body,
    });
    const currentState = state.getMyState();
    let respuesta = currentState.respuesta.toLowerCase();

    if (
      respuesta === "a" ||
      respuesta === "b" ||
      respuesta === "c" ||
      respuesta === "d" ||
      respuesta === "e"
    ) {
      RESPUESTAS_TEST[currentState.phone] = {
        ...RESPUESTAS_TEST[currentState.phone],
        Pregunta_9: "¿Qué aspecto te atrae más en una carrera?",
        Respuesta_9: respuesta,
      };

      await flowDynamic(obtenerRespuestaAleatoria());

      return gotoFlow(flowDecimaPregunta);
    } else {
      return fallBack(obtenerSolicitudAleatoria());
    }
  }
);

const flowDecimaPregunta = addKeyword(EVENTS.ACTION).addAnswer(
  "*¿Cómo te imaginas a ti mismo/a en el futuro?*\n\na) Siendo un líder en el mundo empresarial.\nb) Siendo un arquitecto o diseñador reconocido.\nc) Contribuyendo a la comprensión intercultural y social.\nd) Trabajando en investigaciones científicas de vanguardia.\ne) Desarrollando soluciones tecnológicas para desafíos actuales.",
  { capture: true },
  async (ctx, { flowDynamic, gotoFlow, fallBack, state }) => {
    await state.update({
      phone: ctx.from,
      name: ctx.pushName,
      respuesta: ctx.body,
    });
    const currentState = state.getMyState();
    let respuesta = currentState.respuesta.toLowerCase();

    if (
      respuesta === "a" ||
      respuesta === "b" ||
      respuesta === "c" ||
      respuesta === "d" ||
      respuesta === "e"
    ) {
      RESPUESTAS_TEST[currentState.phone] = {
        ...RESPUESTAS_TEST[currentState.phone],
        Pregunta_10: "¿Cómo te imaginas a ti mismo/a en el futuro?",
        Respuesta_10: respuesta,
      };

      console.log("[RESPUESTAS DEL USERS]:", RESPUESTAS_TEST);

      await flowDynamic(obtenerMensajeAleatorio());

      return gotoFlow(flowConclusion);
    } else {
      return fallBack(obtenerSolicitudAleatoria());
    }
  }
);

const flowConclusion = addKeyword(EVENTS.ACTION)
  .addAnswer("🤖Pensando....", null, async (_, { flowDynamic, state }) => {
    const currentState = state.getMyState();
    const Numero = currentState.phone;
    console.log("Numero obtenido:", Numero);

    await flowDynamic(
      "*¡Hola futuro profesional!*\n\n¡El camino hacia tu futuro está lleno de posibilidades maravillosas! Según tus respuestas, aquí te presento algunas carreras que podrían resonar con tus intereses:"
    );

    function obtenerRespuestasPorNumero(data, numero) {
      return data[numero] || {};
    }

    async function analizarRespuestas(respuestasPorNumero) {
      let conteoDeRespuestas = {};

      for (let key in respuestasPorNumero) {
        if (key.startsWith("Respuesta_")) {
          let respuesta = respuestasPorNumero[key];
          conteoDeRespuestas[respuesta] =
            (conteoDeRespuestas[respuesta] || 0) + 1;
        }
      }

      let maxCount = Math.max(...Object.values(conteoDeRespuestas));
      let respuestasMaximas = Object.keys(conteoDeRespuestas).filter(
        (respuesta) => conteoDeRespuestas[respuesta] === maxCount
      );

      // Función para obtener la recomendación basada en la respuesta
      function obtenerRecomendacion(respuesta) {
        switch (respuesta) {
          case "a":
            return "*Mundo de Negocios:*\n\nSi te sentiste conectado con la opción 'a', el mundo corporativo y financiero podría ser tu escenario.\n🌟 *Carreras recomendadas:*\n\nAdministración de Empresas, Contabilidad y Auditoría, Economía, Gerencia y Liderazgo, y Negocios Digitales.";
          case "b":
            return "*Alma Creativa:*\n\nLa opción 'b' revela un alma artística y creativa esperando dejar su huella.\n🎨 *Carreras que podrías considerar:*\n\nArquitectura, Diseño Multimedia, y Comunicación.";
          case "c":
            return "*Corazón Social:*\n\nCon una afinidad hacia la opción 'c', tu sensibilidad hacia los demás es tu gran fortaleza.\n🌍 *Carreras que podrían interesarte:*\n\nAntropología, Desarrollo Local, Educación Básica, Educación Inicial, Educación Intercultural Bilingüe, Psicología, Psicología Clínica, y Derecho.";
          case "d":
            return "*Curiosidad Científica:*\n\nSi la opción 'd' te cautivó, el mundo científico y de salud te está invitando a descubrir sus secretos.\n🔬 *Carreras sugeridas:*\n\nBiomedicina, Biotecnología, y Odontología.";
          case "e":
            return "*Genio Tecnológico:*\n\nLa opción 'e' señala un interés en la innovación y la tecnología.\n💻 *Carreras que podrías explorar:*\n\nComputación, Ciencia de Datos, Electrónica y Automatización, Electricidad, Ingeniería Ambiental, Ingeniería Automotriz, Ingeniería Civil, Ingeniería Industrial, Mecatrónica, y Telecomunicaciones.";
        }
      }

      // Si hay un solo máximo, proceder normalmente
      if (respuestasMaximas.length === 1) {
        return obtenerRecomendacion(respuestasMaximas[0]);
      }
      // Si hay múltiples respuestas con el mismo máximo, recomendar ambas opciones
      else {
        let recomendaciones = respuestasMaximas.map((respuesta) =>
          obtenerRecomendacion(respuesta)
        );
        let mensajeEmpate =
          "Veo que tu enfoque se torna hacia dos lados. Estas son las carreras que te recomiendo:\n\n";
        return mensajeEmpate + recomendaciones.join("\n\n");
      }
    }

    const respuestasPorNumero = obtenerRespuestasPorNumero(
      RESPUESTAS_TEST,
      Numero
    );
    console.log("[RESPUESTAS DEL USERS]:", respuestasPorNumero);

    const mensaje = await analizarRespuestas(respuestasPorNumero);
    console.log("[ANALISIS DE RESPUESTAS]:", mensaje);

    return await flowDynamic(mensaje);
  })
  .addAnswer(
    "Para obtener más detalles sobre las carreras, te invitamos a hacer clic en el siguiente enlace.\n\nhttps://www.ups.edu.ec/oferta-academica",
    null,
    async (_, { endFlow }) => {
      return endFlow(
        "¡Gracias por tu visita! Espero que esta información te haya sido útil y te ayude a encontrar la carrera que mejor se adapte a ti."
      );
    }
  );

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([
    flowPrincipal,
    flowPrimerPregunta,
    flowSegundaPregunta,
    flowTerceraPregunta,
    flowCuartaPregunta,
    flowQuintaPregunta,
    flowSextaPregunta,
    flowSeptimaPregunta,
    flowOctavaPregunta,
    flowNovenaPregunta,
    flowDecimaPregunta,
    flowConclusion,
  ]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  require("dotenv").config();
  QRPortalWeb({ port: process.env.PORT || 3000 });
};

main();
