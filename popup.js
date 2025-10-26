const emojiGrid = document.getElementById('emoji-grid');

// List of Unicode emojis (you can expand this!)
const emojis = [
  "😊", "😎", "🥲", "🐸", "🐶", "🌈", "🔥", "❤️", "🎉", "💀",
  "🤖", "🧠", "🍕", "☕", "🎮", "📚", "🌟", "💡", "📝", "🚀"
];

// Render emojis
emojis.forEach(emoji => {
  const span = document.createElement('span');
  span.className = 'emoji';
  span.textContent = emoji;

  span.addEventListener('click', () => {
    navigator.clipboard.writeText(emoji).then(() => {
      span.textContent = '✅';
      setTimeout(() => span.textContent = emoji, 800);
    }).catch(err => {
      console.error('Clipboard write failed:', err);
    });
  });

  emojiGrid.appendChild(span);
});
