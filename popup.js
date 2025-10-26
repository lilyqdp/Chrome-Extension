const uploadInput = document.getElementById('upload');
const grid = document.getElementById('emoji-grid');

// Load existing emojis
chrome.storage.local.get('emojis', (data) => {
  if (data.emojis) renderEmojis(data.emojis);
});

// Handle new uploads
uploadInput.addEventListener('change', (event) => {
  const files = Array.from(event.target.files);

  const readers = files.map(file => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); // Base64
      reader.readAsDataURL(file);
    });
  });

  Promise.all(readers).then(images => {
    chrome.storage.local.get('emojis', (data) => {
      const updated = (data.emojis || []).concat(images);
      chrome.storage.local.set({ emojis: updated }, () => {
        renderEmojis(updated);
      });
    });
  });
});

function renderEmojis(images) {
  grid.innerHTML = '';  // Clear the current grid

  if (images.length === 0) {
    grid.innerHTML = "<p>No emojis yet! Upload one 👇</p>";
    return;  // Don't try to render emojis if there are none
  }

  images.forEach(base64 => {
    const wrapper = document.createElement('div');
    wrapper.className = 'emoji-wrapper';

    const img = document.createElement('img');
    img.src = base64;
    img.className = 'emoji-img';

    const copyBtn = document.createElement('button');
    copyBtn.textContent = '📋';
    copyBtn.className = 'copy-btn';

    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(base64).then(() => {
        copyBtn.textContent = '✅';
        setTimeout(() => copyBtn.textContent = '📋', 1000);
      });
    });

    wrapper.appendChild(img);
    wrapper.appendChild(copyBtn);
    grid.appendChild(wrapper);
  });
}

