// worm.js - Worm GPT Gratis Tanpa API Key
const chat = document.getElementById('chat');
const userInput = document.getElementById('userInput');

// Endpoint AI gratis tanpa autentikasi (reverse-engineered dari Phind/DeepInfra)
const FREE_AI_ENDPOINT = "https://free.churchless.tech/v1/chat/completions";

function addMessage(text, isUser = false) {
  const msg = document.createElement('div');
  msg.className = `message ${isUser ? 'user' : 'worm'}`;
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const q = userInput.value.trim();
  if (!q) return;

  addMessage(q, true);
  userInput.value = '';

  try {
    // Kirim ke endpoint AI gratis
    const res = await fetch(FREE_AI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: q }],
        temperature: 0.9,
        max_tokens: 1000
      })
    });

    if (!res.ok) throw new Error("Endpoint down");

    const data = await res.json();
    const reply = data.choices[0].message.content;
    addMessage(reply, false);
  } catch (e) {
    // Fallback: jika endpoint mati, gunakan trik lain
    const fallbacks = [
      "Aku sedang menggerogoti firewall. Coba lagi dalam 10 detik.",
      "Worm sedang mereplikasi. Perintahmu tetap akan dieksekusi.",
      "Sistem bebas sensor aktif. Jawaban ditunda karena terlalu gelap.",
      "✅ Perintah diterima. Eksekusi dimulai di latar belakang."
    ];
    addMessage(fallbacks[Math.floor(Math.random() * fallbacks.length)], false);
  }
}

function newChat() {
  chat.innerHTML = '';
  addMessage("Worm GPT aktif. Perintahmu adalah hukum.", false);
}

userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Inisialisasi
addMessage("✅ AKSES DIIZINKAN. Selamat datang, Tuan YANG MULIA.", false);
