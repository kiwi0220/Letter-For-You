// === Helper: Check current page ===
function isStartPage() {
  return document.body.classList.contains('start-page');
}

function isIndexPage() {
  return document.querySelector('h1 span#typewriter-text') !== null;
}

// === ENVELOPE + AUDIO CODE — ONLY ON START PAGE ===
if (isStartPage()) {
  const envelope = document.getElementById('envelope');
  const sound = document.getElementById('popSound');

  if (sound) {
    sound.addEventListener('loadeddata', () => console.log('✅ Audio loaded'));
    sound.addEventListener('error', () => console.log('❌ Audio failed to load'));
  }

  if (envelope && sound) {
    envelope.addEventListener('animationiteration', () => {
      sound.currentTime = 0;
      sound.play().catch(e => {
        console.log("Audio play blocked — click anywhere to enable sound");
      });
    });
  }

  // Unlock audio with first click
  document.addEventListener('click', () => {
    if (sound) {
      sound.play().catch(e => console.log("Still blocked — try again after click"));
    }
  }, { once: true });
}

// === TYPEWRITER CODE — ONLY ON INDEX PAGE ===
if (isIndexPage()) {
  const typewriterText = document.getElementById('typewriter-text');
  const cursor = document.getElementById('cursor');
  const text = "will you be my valentine?";

  if (!typewriterText || !cursor) {
    console.log('❌ Typewriter elements not found. Check HTML.');
  } else {
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        typewriterText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 200);
      } else {
        cursor.style.display = 'none';
        console.log('✅ Typing complete!');
      }
    }

    // Ensure DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', typeWriter);
    } else {
      typeWriter();
    }
  }
}