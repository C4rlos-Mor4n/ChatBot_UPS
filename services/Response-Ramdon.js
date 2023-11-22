const respuestasAgradecimiento = [
  "¡Gracias por tu selección!",
  "Apreciamos mucho tu elección.",
  "¡Estamos agradecidos por tu respuesta!",
  "Tu elección significa mucho para nosotros, ¡gracias!",
  "¡Mil gracias por decidirte por esa opción!",
  "Valoro mucho tu elección. ¡Gracias!",
  "Nos complace que hayas elegido esa respuesta, ¡gracias!",
  "¡Te agradecemos por haber optado por esa alternativa!",
  "Estoy agradecido por tu preferencia. ¡Gracias!",
  "¡Qué bueno que te decidiste así! Te lo agradecemos.",
  "Es un honor recibir tu respuesta. ¡Gracias!",
  "Nos alegra que hayas escogido esa opción.",
  "Cada elección importa, ¡gracias por la tuya!",
  "¡Tu selección nos llena de gratitud!",
  "Nos has hecho el día con tu elección. ¡Gracias!",
  "Nunca dejamos de agradecer tus decisiones.",
  "¡Eres genial por escoger esa respuesta!",
  "Tu decisión nos impulsa a seguir adelante. ¡Gracias!",
  "Un millón de gracias por tu elección.",
  "¡Gracias! Valoramos mucho tu contribución.",
];

function obtenerRespuestaAleatoria() {
  const indiceAleatorio = Math.floor(
    Math.random() * respuestasAgradecimiento.length
  );
  return respuestasAgradecimiento[indiceAleatorio];
}

const solicitudesRespuesta = [
  "Por favor, opta por una de las siguientes respuestas: a, b, c, d o e.",
  "¿Podrías seleccionar una opción entre: a, b, c, d o e?",
  "Te agradeceríamos si eliges una respuesta entre: a, b, c, d o e.",
  "Esperamos tu selección. Las opciones son: a, b, c, d o e.",
  "Déjanos saber tu elección: a, b, c, d o e.",
  "Por favor, indica tu respuesta preferida entre: a, b, c, d o e.",
  "Nos gustaría que te decidas por una opción: a, b, c, d o e.",
  "Es tu turno de escoger. Las alternativas son: a, b, c, d o e.",
  "Nos interesa tu elección. Opta por: a, b, c, d o e.",
  "Aguardamos tu selección entre: a, b, c, d o e.",
];

function obtenerSolicitudAleatoria() {
  const indiceAleatorio = Math.floor(
    Math.random() * solicitudesRespuesta.length
  );
  return solicitudesRespuesta[indiceAleatorio];
}

const mensajesAgradecimientoFinal = [
  "Te agradezco por tus respuestas. He completado el test y ahora procederé al análisis de las mismas.",
  "Gracias por participar. Ya finalicé el test y comenzaré con el análisis de las respuestas.",
  "Agradezco tu colaboración. El test está concluido y me dispongo a analizar tus respuestas.",
  "Gracias por tu tiempo y respuestas. Ahora voy a proceder con el análisis tras haber terminado el test.",
  "He terminado el test gracias a tus respuestas. Ahora pasaré al análisis de las mismas.",
  "Tus respuestas han sido recibidas. Ahora que he concluido el test, empezaré con el análisis.",
  "Agradecido por tus respuestas. Tras finalizar el test, comenzaré con el análisis correspondiente.",
  "El test ha sido completado gracias a tu colaboración. Procederé con el análisis de las respuestas.",
  "Con tu ayuda, he concluido el test. Es momento de analizar las respuestas. Gracias.",
  "Gracias por responder. Ahora que el test está completo, daré inicio al análisis.",
];

function obtenerMensajeAleatorio() {
  const indiceAleatorio = Math.floor(
    Math.random() * mensajesAgradecimientoFinal.length
  );
  return mensajesAgradecimientoFinal[indiceAleatorio];
}

module.exports = {
  obtenerRespuestaAleatoria,
  obtenerSolicitudAleatoria,
  obtenerMensajeAleatorio,
};
