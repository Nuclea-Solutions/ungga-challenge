const express = require('express');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

app.post('/scheduleAppointment', async (req, res) => {
  try {
    // Obtén el nombre, número de teléfono y correo del usuario desde la solicitud
    const { name, phoneNumber, email } = req.body;

    // Crea una conversación simulada con OpenAI GPT-3.5-turbo
    const conversation = [
      { role: "user", content: `Hola, mi nombre es ${name}. ¿Puedes ayudarme a agendar una cita?` },
      { role: "assistant", content: `Claro, ¿cuándo te gustaría agendar la cita, ${name}?` },
      { role: "user", content: `Me gustaría agendar la cita para discutir sobre mis necesidades. Mi número de teléfono es ${phoneNumber} y mi correo electrónico es ${email}.` },
    ];

    // Envía la conversación al modelo de OpenAI GPT-3.5-turbo
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversation,
      temperature: 0.7,
      max_tokens: 150,
    });

    // Verifica que la respuesta tenga la propiedad 'choices'
    if (response.data && response.data.choices) {
      // Extrae la respuesta del modelo
      const modelResponse = response.data.choices[0].text.trim();

      // Puedes realizar acciones adicionales aquí, como almacenar la cita en una base de datos

      // Devuelve la respuesta al cliente
      res.status(200).json({ response: modelResponse });
    } else {
      // Si 'choices' no está presente en la respuesta, manejar el error
      console.error("Respuesta completa de la API de OpenAI:", response.data);
      throw new Error("La respuesta de la API de OpenAI no contiene 'choices'.");
    }
  } catch (err) {
    console.error("Error al procesar la solicitud:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
