/**
 * CONFIGURACIÓN DEL JUEGO Y PREGUNTAS
 * 
 * Aquí puedes cambiar fácilmente:
 * 1. El título y bienvenida.
 * 2. Las 10 preguntas (o agregar más si deseas).
 * 3. Las opciones y cuál es la respuesta correcta (índice 0, 1, 2 o 3).
 * 4. El mensaje final y la gran pregunta sorpresa.
 */

const QUIZ_CONFIG = {
  // Configuración general
  titulo: "¡Tía Nia, hoy en tu cumplaeaños, un juego especial para ti! ✨",
  subtitulo: "Responde correctamente todas las preguntas para desbloquear una gran sorpresa.",
  
  // Texto del botón del regalo
  textoBotonPremio: "🎁 ¡Reclamar mi regalo sorpresa!",

  // Mensaje final que aparece al abrir el regalo
  mensajeFinal: {
    tituloPrincipal: "¿Quieres ser mi madrina? 💖",
    subtitulo: "Sería el mayor honor y alegría del mundo tenerte a mi lado en este camino tan especial.",
    dedicatoria: "Con todo mi cariño y amor para ti, Vicente Elias.",
    // Puedes cambiar o agregar más párrafos de mensaje si lo deseas:
    parrafos: [
      "Sin que la distancia haya sido impedimento, has estado presente en los momentos más bonitos e importantes, brindando siempre tu alegría, apoyo incondicional y cariño sincero.",
      "Por eso, no hay nadie en quien confíe más ni a quien quiera más para este rol tan especial en mi vida."
    ]
  },

  // PANTALLAS DE CONFIRMACIÓN DIVERTIDAS (después de reclamar premio)
  pantallasConfirmacion: [
    {
      emoji: "🤔",
      titulo: "¿Estás segura que quieres ver tu regalo?",
      subtitulo: "Una vez que lo veas no habrá marcha atrás...",
      textoBoton: "¡Sí, estoy segurísima! ➔"
    },
    {
      emoji: "👀",
      titulo: "¿10000% segura?",
      subtitulo: "Piénsalo bien, ¿de verdad estás lista?",
      textoBoton: "¡Que sí, 10000% segura! ➔"
    },
    {
      emoji: "😏",
      titulo: "Mmm... no te siento muy segura...",
      subtitulo: "Tus clics dudan un poco... ¿segura que no quieres esperar?",
      textoBoton: "¡Cero dudas, muéstramelo ya! ➔"
    },
    {
      emoji: "😅",
      titulo: "Bueno, ¿en serio estás segura?",
      subtitulo: "¡Última oportunidad para pensarlo dos veces!",
      textoBoton: "¡SÍIIII, YA DÁMELO! ➔"
    }
  ],

  // Pantalla del botón escurridizo que se mueve
    pantallaEscurridiza: {
    emoji: "🏃‍♂️💨",
    titulo: "¡Veamos si realmente quieres ver tu sorpresa!",
    subtitulo: "¡Atrápalo si de verdad lo quieres ver!",
    textoBoton: "🎁 ¡DAME MI REGALO!"
  },

  // LISTA DE PREGUNTAS
  // - "pregunta": El texto que se mostrará
  // - "opciones": Un arreglo con exactamente 4 opciones
  // - "correcta": El número de la opción correcta (0 es la primera, 1 la segunda, 2 la tercera, 3 la cuarta)
  preguntas: [
    {
      pregunta: "1. ¿Cuál es mi nombre completo?",
      opciones: ["Vicent Van Goku Perez Rodriguez", "Vicente Elias Beroes Perez",  "Vicente Elias Beroes Rodriguez", "Cristiano Lionel Rodriguez Beroes"],
      correcta: 2
    },
    {
      pregunta: "2. ¿Cuál es mi fecha de nacimiento?",
      opciones: ["15/06/2026", "15/07/2026", "28/05/2026", "13/07/2026"],
      correcta: 1
    },
    {
      pregunta: "3. ¿Cuál es el apodo de mi papito bello y hermoso?",
      opciones: ["Moncho", "Tutu", "Monky", "Todas las anteriores"],
      correcta: 3
    },
    {
      pregunta: "4. ¿Cuál mi actividad favorita del mundo mundial?",
      opciones: ["Mear a mi papa", "Cagar a mi mama", "Llorar para que todos se vuelvan locos", "Comer tetica 24/7"],
      correcta: 3
    },
    {
      pregunta: "5. ¿Cuantó pese en mi control de los 3 meses?",
      opciones: ["5.230", "5.280", "5.250", "5.930"],
      correcta: 0
    },
    {
      pregunta: "6. ¿Cuál es el apodo de mi mamita bella y peleona?",
      opciones: ["Susanita", "Beba", "Su", "Anabel"],
      correcta: 1
    },
    {
      pregunta: "7. ¿Cuanto medí al nacer?",
      opciones: ["47.5 cm", "51.3 cm", "49.0 cm", "48.7 cm"],
      correcta: 2
    },
    {
      pregunta: "8. ¿Como es el apodo de mi Tia Maria?",
      opciones: ["Mariama", "Todas las Anteriores", "Nia", "Bambi"],
      correcta: 1
    },
    {
      pregunta: "9. ¿Cuál es el resultado de la siguiente operacion aritmetica?  [3^3 - √144 ÷ (-2)] * (5/2 - 3/4) + (-5)^2",
      opciones: ["-1.978.524,2", "0", "3,1416", "82.75"],
      correcta: 3
    },
    {
      pregunta: "10. ¿Estás lista para ver qué sorpresa se esconde al final de este juego?",
      opciones: ["¡Sí, ya quiero verla!", "¡Totalmente lista!", "¡Por supuesto que sí!", "¡Ábrelo ya!"],
      correcta: 0 // Cualquiera que elija la considerará genial (en este caso opción 0, o puedes personalizarla)
    }
  ]
};
