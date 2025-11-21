const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express();
app.use(express.json());

// Simple Finland knowledge
const knowledge = {
  housing: {
    student: "🏠 STUDENT HOUSING: HOAS apartments (€250-450)",
    immigrant: "🏠 IMMIGRANT HOUSING: Private rentals (€500-800)"
  },
  jobs: {
    student: "💼 STUDENT JOBS: Part-time (25h/week)",
    immigrant: "💼 IMMIGRANT JOBS: Full-time cleaning, construction"
  }
};

// WhatsApp client - THIS MUST BE DEFINED!
const client = new Client({
  authStrategy: new LocalAuth()
});

// Show QR code
client.on('qr', (qr) => {
  console.log('📱 SCAN THIS QR CODE:');
  qrcode.generate(qr, { small: true });
});

// When connected
client.on('ready', () => {
  console.log('✅ INTEGRA BOT IS READY!');
});

// Handle messages
client.on('message', async (message) => {
  const text = message.body.toLowerCase();
  
  if (text.includes('student')) {
    message.reply('🎓 STUDENT: HOAS housing, part-time jobs');
  } else if (text.includes('work')) {
    message.reply('👷 IMMIGRANT: Private housing, full-time jobs');
  } else {
    message.reply('👋 Welcome to INTEGRA! Student or worker?');
  }
});

// Start bot
client.initialize();

// Web server
app.get('/', (req, res) => {
  res.send('INTEGRA Bot Running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 INTEGRA bot running on port ${PORT}`);
});
