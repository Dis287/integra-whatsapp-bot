const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express();
app.use(express.json());

// Simple Finland knowledge - WE'LL EXPAND THIS LATER
const knowledge = {
  housing: {
    student: "🏠 STUDENT HOUSING: HOAS apartments (€250-450), student dorms, shared flats near campuses",
    immigrant: "🏠 IMMIGRANT HOUSING: Private rentals (€500-800), family apartments, shared housing"
  },
  jobs: {
    student: "💼 STUDENT JOBS: Part-time (25h/week), thesis positions, campus jobs, tutoring",
    immigrant: "💼 IMMIGRANT JOBS: Full-time cleaning, construction, restaurants, delivery"
  },
  transport: {
    student: "🚌 STUDENT TRANSPORT: HSL 50% discount (€54.70/month). Apply: Frank.fi",
    immigrant: "🚌 ADULT TRANSPORT: HSL normal (€69.70/month). Buy: R-kioski, HSL app"
  }
};

// Detect user type
function detectUserType(message) {
  const studentWords = ['student', 'university', 'thesis', 'campus', 'HOAS'];
  const immigrantWords = ['work', 'job', 'family', 'clean', 'construction'];
  
  const text = message.toLowerCase();
  let studentScore = 0;
  let immigrantScore = 0;
  
  studentWords.forEach(word => text.includes(word) && studentScore++);
  immigrantWords.forEach(word => text.includes(word) && immigrantScore++);
  
  if (studentScore > immigrantScore) return 'student';
  if (immigrantScore > studentScore) return 'immigrant';
  return 'unknown';
}

// WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth()
});

// Show QR code to connect
client.on('qr', (qr) => {
  console.log('📱 SCAN THIS QR CODE WITH YOUR WHATSAPP:');
  qrcode.generate(qr, { small: true });
});

// When connected
client.on('ready', () => {
  console.log('✅ INTEGRA BOT IS READY!');
});

// Handle messages
client.on('message', async (message) => {
  const userMessage = message.body.toLowerCase();
  const userType = detectUserType(userMessage);
  
  let response = `👋 Welcome to INTEGRA! I see you're a ${userType}.\n\n`;
  
  if (userMessage.includes('housing') || userMessage.includes('asunto')) {
    response += knowledge.housing[userType];
  } else if (userMessage.includes('job') || userMessage.includes('työ')) {
    response += knowledge.jobs[userType];
  } else if (userMessage.includes('transport') || userMessage.includes('bussi')) {
    response += knowledge.transport[userType];
  } else {
    response += `How can I help you with:\n• Housing 🏠\n• Jobs 💼\n• Transport 🚌\n\nJust type what you need!`;
  }
  
  // Send response
  await message.reply(response);
});

// Start bot
client.initialize();

// Web server for Render
app.get('/', (req, res) => {
  res.send('INTEGRA WhatsApp Bot is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 INTEGRA bot running on port ${PORT}`);
});
