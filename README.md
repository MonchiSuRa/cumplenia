# 🎁 Juego de Trivia Especial: "¿Quieres ser mi madrina?"

Un juego web interactivo, divertido y emotivo diseñado para realizar una propuesta muy especial para la Tía Nia.

---

## 🚀 ¿Cómo abrir y probar el juego?

Solo haz doble clic en el archivo [**`index.html`**](index.html) (o clic derecho > *Abrir con Google Chrome / Edge / Safari / Firefox*).
¡Funciona de inmediato en cualquier dispositivo o navegador!

---

## 🎮 Nuevo Flujo del Juego

1. **Trivia de 10 preguntas**: Con las preguntas personalizadas para Vicente Elias.
2. **Pantalla de Premio**: Al completar las 10 preguntas, se desbloquea el botón `"🎁 ¡Reclamar mi regalo sorpresa!"`.
3. **Pantallas de "¿Estás segura?" (Bromas divertidas)**:
   - 1. *"¿Estás segura que quieres ver tu regalo? 🤔"*
   - 2. *"¿10000% segura? 👀"*
   - 3. *"Mmm... no te siento muy segura... 😏"*
   - 4. *"Bueno, ¿en serio estás segura? 😅"*
4. **Minijuego del Botón Escurridizo**:
   - *"¡Veamos si realmente quieres ver tu sorpresa! 🏃‍♂️💨"*
   - Un botón de regalo que se desplaza suavemente por la pantalla y cada 2-3 movimientos **se detiene durante 2.5 segundos** en color verde con alerta sonora/visual para que le haga clic fácilmente.
5. **Gran Revelación Final**:
   - ¡Explosión de confeti! 🎉
   - Carta emotiva: *"¿Quieres ser mi madrina? 💖"* con la dedicatoria de Vicente Elias y el botón interactivo *"¡SÍ, ACEPTO CON TODO EL CORAZÓN!"*.

---

## ✏️ ¿Cómo personalizar las preguntas y los textos?

Todo lo editable está centralizado en el archivo [**`questions.js`**](questions.js):
- **Preguntas y respuestas**: Cada pregunta con sus 4 opciones y la respuesta correcta.
- **Pantallas de confirmación**: Puedes modificar o agregar más frases de broma en `pantallasConfirmacion`.
- **Botón escurridizo**: Personalizable en `pantallaEscurridiza`.
- **Mensaje final**: Dedicatoria, párrafos y título en `mensajeFinal`.
