// ============================================================
//  GRADUATION INVITATION — script.js
//
//  QUICK REFERENCE — where to edit things:
//  - Messages:        find the `messages` array below (~line 30)
//  - Google Maps:     find the openMaps() function at the bottom
//  - Dates/venue:     edit directly in index.html
//  - Colors:          edit :root variables in style.css
// ============================================================


// ============================================================
//  HEARTFELT MESSAGES ARRAY
//
//  One of these is picked at random for each guest.
//  HOW TO EDIT:
//    - Add a new message: put it inside quotes, end with a comma
//    - Remove a message: delete the whole line including the comma
//    - Edit a message: just change the text inside the quotes
//
//  Keep the square brackets [ ] and make sure every line ends
//  with a comma except the very last message before the ];
// ============================================================
const messages = [
  // Friendship & connection
  "Some people make a journey lighter simply by being part of it. You are one of those people.",
  "Some friendships don't need constant contact to be real. Ours is one of those.",
  "I think of the moments we shared and feel grateful. Truly, genuinely grateful.",
  "You've made ordinary days feel a little warmer just by being you.",
  "There are people who leave a mark on your story without even realizing it. You left one on mine.",
  "I'll look back on this chapter of my life and smile — partly because of you.",
  "I'm grateful for the memories, kindness, and encouragement connected to this season of my life.",

  // Encouragement & belief
  "You may not realize it, but your encouragement and kindness have meant more than you know.",
  "I hope you know that your belief in me mattered more than you'll ever realize.",
  "The simple act of believing in someone changes everything. Thank you for believing in me.",
  "Having good people around me has made this season more meaningful, and I'm grateful you are one of them.",
  "There's something about having the right people in your corner that makes every challenge feel possible.",
  "There were many moments in this journey where a kind word or simple encouragement made a real difference. Thank you for being part of that.",
  "Reaching this point means a lot, and I'm grateful for the people who made the journey feel lighter along the way.",

  // Support & presence
  "Thank you for showing up — sometimes that's the most powerful thing a person can do.",
  "You listened when I needed to talk and gave me space when I needed to think. That's a gift.",
  "Not all support looks the same. Yours was quiet, steady, and deeply meaningful.",
  "Through the long nights and uncertain days, your presence was a quiet kind of comfort.",
  "You've been a steady light in seasons that weren't always easy. I won't forget that.",
  "Not everyone gets to have someone genuinely rooting for them. I got lucky.",
  "You showed up for me in ways you might have already forgotten. I haven't.",
  "You've been consistent. In a world that rarely is, that means a great deal.",

  // Kindness & acceptance
  "Good people are rare. You are one of them.",
  "Your kindness never felt forced — and that's what made it mean so much.",
  "You never made me feel like I had to explain myself. That kind of acceptance is rare.",
  "Genuine kindness has a way of staying with you. Yours has stayed with me.",
  "You have a way of making people feel seen. I've felt that, and I'm grateful for it.",
  "Some people enter your life gently and change it deeply. That's what you've done.",
  "Your encouragement never felt hollow. It came from a real place, and I felt that.",

  // Laughter & warmth
  "The laughs we shared got me through more than you know.",
  "You made me laugh on days when I really needed to. That's not a small thing.",
  "It's the small things — a kind word, a check-in, a shared laugh — that add up. Thank you for the small things.",

  // Faith & journey
  "Faith, patience, and the right company — I had all three, and you were part of it.",
  "I've learned that the right people have a way of making hard things feel doable.",
  "There's so much behind this moment, and you're woven into more of it than you know.",

  // Appreciation & gratitude
  "I don't think I've ever properly said thank you — so here it is. Thank you, truly.",
  "This degree carries the fingerprints of everyone who believed in me. Yours are on it too.",
  "This moment belongs to everyone who walked alongside me — and you walked alongside me.",
  "This celebration feels more complete knowing you're a part of it.",
  "I'm proud of how far I've come. And I'm grateful you were here to see it.",

  // Simply being present
  "Through conversations, laughter, and quiet moments of understanding, you've been a real presence in my life.",
  "I hope this invitation finds you and reminds you: you matter to me.",
  "This is a milestone, but the people around it make it what it really is. Thank you for being one of them.",
  "I can't promise this card captures everything I feel, but know that it comes from a full heart.",
];


// ============================================================
//  SCREEN MANAGEMENT
//  Controls which of the three screens is visible.
// ============================================================

// Show one screen, hide all others
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (screen) {
    screen.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
  // Scroll to top each time a new screen opens
  window.scrollTo(0, 0);
}


// ============================================================
//  OPEN INVITATION
//  Called when the guest clicks "Open Invitation"
// ============================================================
function openInvitation() {
  var nameInput = document.getElementById('guest-name');
  var name = nameInput.value.trim();

  // If the name field is empty, highlight it and stop
  if (!name) {
    nameInput.focus();
    nameInput.style.borderColor = '#c9a84c'; // gold highlight
    setTimeout(function () {
      nameInput.style.borderColor = '';
    }, 1400);
    return;
  }

  // Show the loading screen first
  showScreen('screen-loading');

  // Wait 1.6 seconds, then build and show the invitation
  setTimeout(function () {
    buildInvitation(name);
    showScreen('screen-invitation');
    startConfetti();
  }, 1600);
}

// Allow pressing Enter key to submit the name
document.getElementById('guest-name').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    openInvitation();
  }
});


// ============================================================
//  BUILD THE INVITATION CARD
//  Inserts the guest's name and a random message into the card
// ============================================================
function buildInvitation(name) {
  // Insert guest name into the "Dear [Name]," line
  document.getElementById('card-guest-name').textContent = name;

  // Pick one message at random from the array
  var randomIndex = Math.floor(Math.random() * messages.length);
  document.getElementById('personal-message').textContent = messages[randomIndex];
}


// ============================================================
//  SAVE AS IMAGE
//  Uses html2canvas to capture ONLY the invitation card as PNG.
//  The action buttons below the card are NOT included.
//
//  FIX NOTES:
//  - scale: 4 gives sharp output on retina/mobile screens
//  - onclone forces solid backgrounds on the captured clone
//    so no transparency or washed-out gradient bleeds through
//  - boxShadow is removed on the clone so the shadow doesn't
//    add a transparent halo around the saved image
//  - toDataURL quality is set to 1.0 (maximum)
// ============================================================
function saveAsImage() {
  var card = document.getElementById('invitation-card');
  var btn = document.querySelector('.btn-save');
  var originalText = btn.innerHTML;
  btn.innerHTML = '⏳ &nbsp;Saving...';
  btn.disabled = true;

  html2canvas(card, {
    scale: 4,                    // 4× resolution — crisp on any screen
    useCORS: true,               // needed for Google Fonts
    allowTaint: true,            // allow cross-origin content to paint
    backgroundColor: '#ffffff',  // solid white base — prevents transparency
    logging: false,
    imageTimeout: 15000,         // wait up to 15s for external resources

    // onclone runs on the hidden copy html2canvas captures from.
    // We lock in solid colors here so nothing appears faded or washed out.
    onclone: function (clonedDoc) {
      var clonedCard = clonedDoc.getElementById('invitation-card');
      if (clonedCard) {
        // Force solid white card background
        clonedCard.style.backgroundColor = '#ffffff';
        // Remove shadow — it can bleed transparent pixels at edges
        clonedCard.style.boxShadow = 'none';
        // Remove border-radius so corners don't clip with a transparent gap
        clonedCard.style.borderRadius = '0';
        // Remove the entrance animation — it can freeze mid-fade
        clonedCard.style.animation = 'none';
        clonedCard.style.opacity = '1';
        clonedCard.style.transform = 'none';
      }

      // Also force the card header background (gradient can render oddly)
      var header = clonedDoc.querySelector('.card-header');
      if (header) {
        header.style.background = '#2c2218';
      }

      // Force the event info box background
      var infoBox = clonedDoc.querySelector('.event-info');
      if (infoBox) {
        infoBox.style.backgroundColor = '#faf6f0';
      }

      // Force card footer background
      var footer = clonedDoc.querySelector('.card-footer');
      if (footer) {
        footer.style.background = '#f0e6d3';
      }
    },
  }).then(function (canvas) {
    var link = document.createElement('a');
    link.download = 'constance-graduation-invitation.png';
    link.href = canvas.toDataURL('image/png', 1.0); // quality 1.0 = lossless
    link.click();

    setTimeout(function () {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 1200);
  }).catch(function () {
    btn.innerHTML = originalText;
    btn.disabled = false;
    alert('Could not save the image. Please try taking a screenshot instead.');
  });
}


// ============================================================
//  OPEN GOOGLE MAPS
//  EDIT: Change the search string if the venue changes.
// ============================================================
function openMaps() {
  var query = encodeURIComponent('RBC Convention Centre 375 York Avenue Winnipeg MB');
  // Opens Google Maps in a new tab/browser window
  window.open('https://www.google.com/maps/search/?api=1&query=' + query, '_blank');
}


// ============================================================
//  CONFETTI ANIMATION
//  Draws falling gold confetti pieces on a full-screen canvas.
//  Runs for ~3.5 seconds then fades out automatically.
// ============================================================
function startConfetti() {
  var canvas = document.getElementById('confetti-canvas');
  var ctx = canvas.getContext('2d');

  // Match canvas to the current window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Warm gold color palette for the confetti pieces
  var colors = [
    '#c9a84c', // gold
    '#d4a853', // warm gold
    '#f5e6c8', // champagne
    '#e8dcc8', // beige
    '#a8813a', // dark gold
    '#fff8e7', // ivory
    '#e0c97a', // light gold
  ];

  // Create 90 confetti pieces with random properties
  var pieces = [];
  for (var i = 0; i < 90; i++) {
    pieces.push({
      x:        Math.random() * canvas.width,
      y:        Math.random() * -canvas.height * 0.5,  // start above screen
      size:     Math.random() * 8 + 4,
      color:    colors[Math.floor(Math.random() * colors.length)],
      speed:    Math.random() * 2.2 + 1.2,
      drift:    Math.random() * 1.5 - 0.75,             // left/right sway
      angle:    Math.random() * Math.PI * 2,
      rotation: Math.random() * 0.08 - 0.04,
      opacity:  1,
      shape:    Math.random() > 0.4 ? 'rect' : 'circle', // mix of shapes
    });
  }

  var frame = 0;
  var totalFrames = 210; // about 3.5 seconds at 60fps

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(function (p) {
      ctx.save();
      ctx.globalAlpha = Math.max(p.opacity, 0);
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      if (p.shape === 'circle') {
        // Draw a small circle
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Draw a small rectangle (classic confetti)
        ctx.fillRect(-p.size / 2, -p.size * 0.25, p.size, p.size * 0.5);
      }

      ctx.restore();

      // Physics: move down and drift sideways
      p.y += p.speed;
      p.x += p.drift;
      p.angle += p.rotation;

      // Fade out in the last 30% of the animation
      if (frame > totalFrames * 0.7) {
        p.opacity -= 0.015;
      }
    });

    frame++;

    if (frame < totalFrames) {
      requestAnimationFrame(draw);
    } else {
      // Clear canvas when done
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  draw();
}
