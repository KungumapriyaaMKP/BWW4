/**
 * Saath Studio - "Temple" Wedding Invitation Engine
 * Complete 1:1 Implementation
 */

(() => {
  'use strict';

  // --- APPLICATION STATE ---
  const state = {
    currentLang: 'en', // 'en' | 'hi'
    audioPlaying: false,
    gateOpened: false,
    cardsRevealed: {
      day: false,
      month: false,
      year: false
    },
    guestCounts: [1, 1, 1] // [Mehendi, Reception, Muhurtham]
  };

  // --- BILINGUAL TRANSLATION DICTIONARY ---
  const I18N = {
    en: {
      langToggleLabel: 'हिं',
      gateInvited: "You're invited",
      gateSub: 'TO A WEDDING IN MADURAI',
      gatePrompt: '✦ Tap the lamp to light it ✦',
      heroPre: 'Welcome to the wedding of',
      heroBride: 'Tanya',
      heroGroom: 'Vikram',
      heroCity: 'MADURAI',
      scrollDown: 'Scroll down',
      dateTitle: 'The Date',
      scratchPrompt: 'Scratch to reveal the date',
      lblDay: 'Day',
      lblMonth: 'Month',
      lblYear: 'Year',
      valMonth: 'February',
      whenDetail: 'Sunday, at 7:30 am · The mandapam, at sunrise',
      addCal: 'Add to calendar',
      invBlessing: 'With the blessings of our elders,<br>you are invited to the wedding of',
      invBride: 'Tanya Raghavan',
      invDaughterOf: 'DAUGHTER OF',
      invBrideParents: 'SMT. LAKSHMI & SHRI RAGHAVAN',
      invWith: 'with',
      invGroom: 'Vikram Subramanian',
      invSonOf: 'SON OF',
      invGroomParents: 'SMT. MEENAKSHI & SHRI SUBRAMANIAN',
      invDate: 'Sunday, 14 February 2027',
      invVenue: 'The Kalyana Mandapam, Madurai',
      storyTitle: 'Our story',
      storyLead: 'We met at a college fest in Chennai, both volunteering at the music stage. Five years, one long year apart and many filter coffees later, we are getting married.',
      storyTag1: 'Fest 2021',
      storyDesc1: 'Two volunteers, one music stage',
      storyTag2: '2023',
      storyDesc2: 'Chennai and Bengaluru, one long call a night',
      storyTag3: 'Pongal 2026',
      storyDesc3: 'Both families said yes over sakkarai pongal',
      photosTitle: 'Us, so far',
      cap1: 'Our first portrait together',
      cap2: 'In the garden at home',
      cap3: 'The look he gives her',
      cap4: 'Under the bougainvillea',
      cap5: "For Paati's album",
      cap6: 'By the fountain',
      swipeHint: 'Swipe to see more',
      eventsTitle: 'The celebrations',
      mehendiMeta: 'Sat, 13 Feb · 10:30 am',
      mehendiTitleEn: 'Mehendi',
      mehendiTitleHi: 'मेहंदी',
      mehendiPlace: 'The garden courtyard',
      receptionMeta: 'Sat, 13 Feb · 7:00 pm',
      receptionTitleEn: 'Reception',
      receptionTitleHi: 'रिसेप्शन',
      receptionPlace: 'The mandapam hall, with dinner on banana leaves',
      muhurthamMeta: 'Sun, 14 Feb · 7:30 am',
      muhurthamTitleEn: 'Muhurtham',
      muhurthamTitleHi: 'मुहूर्तम',
      muhurthamPlace: 'The mandapam, at sunrise',
      countTitle: 'The celebration begins',
      lblDays: 'Days',
      lblHours: 'Hours',
      lblMinutes: 'Minutes',
      lblSeconds: 'Seconds',
      countTarget: 'until the Mehendi, on Saturday, 13 February',
      venueTitle: 'Location',
      venueCity: 'Madurai',
      venueHall: 'The Kalyana Mandapam',
      venueAddress: 'By the Teppakulam, Madurai, Tamil Nadu',
      btnShowMap: 'Show the map',
      btnOpenMaps: 'Open in Google Maps',
      spotifyBadge: 'Plays on Spotify',
      rsvpTitle: 'Will you join us?',
      rsvpSub: 'Please let us know how many of you are coming to each function, by 20 January.',
      lblYourName: 'Your name',
      rsvpRow0: 'Mehendi',
      rsvpDate0: 'Sat, 13 Feb',
      rsvpRow1: 'Reception',
      rsvpDate1: 'Sat, 13 Feb',
      rsvpRow2: 'Muhurtham',
      rsvpDate2: 'Sun, 14 Feb',
      btnSendWhatsapp: 'Send on WhatsApp',
      rsvpNote: 'This opens WhatsApp with your reply written out. Nothing is sent until you press send.',
      familySignoff: 'With love, the Raghavan and Subramanian families',
      coupleSignoff: 'Tanya &amp; Vikram',
      inviteMadeWith: 'Invite made with'
    },
    hi: {
      langToggleLabel: 'EN',
      gateInvited: 'सादर निमंत्रण',
      gateSub: 'मदुरै में एक शुभ विवाह',
      gatePrompt: '✦ दीपक प्रज्वलित करने के लिए स्पर्श करें ✦',
      heroPre: 'विवाह में आपका हार्दिक स्वागत है',
      heroBride: 'तान्या',
      heroGroom: 'विक्रम',
      heroCity: 'मदुरै',
      scrollDown: 'नीचे देखें',
      dateTitle: 'शुभ तिथि',
      scratchPrompt: 'तिथि जानने के लिए स्क्रैच करें',
      lblDay: 'दिन',
      lblMonth: 'माह',
      lblYear: 'वर्ष',
      valMonth: 'फ़रवरी',
      whenDetail: 'रविवार, प्रातः 7:30 बजे · मंडपम में, सूर्योदय के समय',
      addCal: 'कैलेंडर में जोड़ें',
      invBlessing: 'हमारे पूज्य बड़ों के आशीर्वाद से,<br>आप सादर आमंत्रित हैं हमारे विवाह में',
      invBride: 'तान्या राघवन',
      invDaughterOf: 'सुपुत्री',
      invBrideParents: 'श्रीमती लक्ष्मी एवं श्री राघवन',
      invWith: 'संग',
      invGroom: 'विक्रम सुब्रमण्यम',
      invSonOf: 'सुपुत्र',
      invGroomParents: 'श्रीमती मीनाक्षी एवं श्री सुब्रमण्यम',
      invDate: 'रविवार, 14 फ़रवरी 2027',
      invVenue: 'द कल्याणा मंडपम, मदुरै',
      storyTitle: 'हमारी कहानी',
      storyLead: 'हम चेन्नई में एक कॉलेज फेस्ट में मिले थे, दोनों संगीत मंच पर स्वयंसेवा कर रहे थे। पाँच साल, एक लंबा साल दूर और कई फ़िल्टर कॉफ़ी के बाद, हम परिणय सूत्र में बंध रहे हैं।',
      storyTag1: 'फेस्ट 2021',
      storyDesc1: 'दो स्वयंसेवक, एक संगीत मंच',
      storyTag2: '2023',
      storyDesc2: 'चेन्नई और बेंगलुरु, हर रात एक लंबी बात',
      storyTag3: 'पोंगल 2026',
      storyDesc3: 'सक्कराई पोंगल के साथ दोनों परिवारों ने हामी भरी',
      photosTitle: 'हमारा अब तक का सफ़र',
      cap1: 'हमारा पहला पोट्रेट',
      cap2: 'घर के बगीचे में',
      cap3: 'वो ख़ास नज़र',
      cap4: 'बोगनवेलिया के साये में',
      cap5: 'पाटी के एल्बम के लिए',
      cap6: 'फ़व्वारे के किनारे',
      swipeHint: 'और देखने के लिए स्वाइप करें',
      eventsTitle: 'विवाह उत्सव',
      mehendiMeta: 'शनिवार, 13 फ़रवरी · प्रातः 10:30 बजे',
      mehendiTitleEn: 'मेहंदी',
      mehendiTitleHi: '',
      mehendiPlace: 'बगीचे का आँगन',
      receptionMeta: 'शनिवार, 13 फ़रवरी · सायं 7:00 बजे',
      receptionTitleEn: 'रिसेप्शन',
      receptionTitleHi: '',
      receptionPlace: 'मंडपम हॉल, केले के पत्तों पर पारंपरिक प्रीतिभोज',
      muhurthamMeta: 'रविवार, 14 फ़रवरी · प्रातः 7:30 बजे',
      muhurthamTitleEn: 'मुहूर्तम',
      muhurthamTitleHi: '',
      muhurthamPlace: 'मंडपम, सूर्योदय के समय',
      countTitle: 'उत्सव का शुभारंभ',
      lblDays: 'दिन',
      lblHours: 'घंटे',
      lblMinutes: 'मिनट',
      lblSeconds: 'सेकंड',
      countTarget: 'मेहंदी उत्सव तक, शनिवार, 13 फ़रवरी',
      venueTitle: 'स्थान',
      venueCity: 'मदुरै',
      venueHall: 'द कल्याणा मंडपम',
      venueAddress: 'तेप्पाकुलम के समीप, मदुरै, तमिलनाडु',
      btnShowMap: 'मानचित्र देखें',
      btnOpenMaps: 'गूगल मैप्स में खोलें',
      spotifyBadge: 'स्पॉटिफ़ाई पर सुनें',
      rsvpTitle: 'क्या आप सम्मिलित होंगे?',
      rsvpSub: 'कृपया 20 जनवरी तक प्रत्येक कार्यक्रम के लिए अपने आगमन की सूचना दें।',
      lblYourName: 'आपका नाम',
      rsvpRow0: 'मेहंदी',
      rsvpDate0: 'शनि, 13 फ़रवरी',
      rsvpRow1: 'रिसेप्शन',
      rsvpDate1: 'शनि, 13 फ़रवरी',
      rsvpRow2: 'मुहूर्तम',
      rsvpDate2: 'रवि, 14 फ़रवरी',
      btnSendWhatsapp: 'व्हाट्सएप पर भेजें',
      rsvpNote: 'यह आपके संदेश के साथ व्हाट्सएप खोलेगा। आपके \'सेंड\' दबाने तक कुछ भी नहीं भेजा जाएगा।',
      familySignoff: 'सप्रेम, राघवन एवं सुब्रमण्यम परिवार',
      coupleSignoff: 'तान्या एवं विक्रम',
      inviteMadeWith: 'आमंत्रण पत्र द्वारा'
    }
  };

  // --- DOM ELEMENTS ---
  const dom = {
    bgAudio: document.getElementById('bgAudio'),
    audioBtn: document.getElementById('audioBtn'),
    langBtn: document.getElementById('langBtn'),
    langBtnLabel: document.getElementById('langBtnLabel'),
    iconSoundOn: document.querySelector('.icon-sound-on'),
    iconSoundOff: document.querySelector('.icon-sound-off'),
    gate: document.getElementById('gate'),
    gateLit: document.getElementById('gateLit'),
    gateUnlit: document.getElementById('gateUnlit'),
    sparksCanvas: document.getElementById('sparksCanvas'),
    lampTapArea: document.getElementById('lampTapArea'),
    wickFlames: document.getElementById('wickFlames'),
    lampGlowHalo: document.getElementById('lampGlowHalo'),
    mainContent: document.getElementById('mainContent'),
    whenLine: document.getElementById('whenLine'),
    btnAddToCalMain: document.getElementById('btnAddToCalMain'),
    btnLoadMap: document.getElementById('btnLoadMap'),
    mapIframeWrapper: document.getElementById('mapIframeWrapper')
  };

  // --- AUDIO CONTROLS ---
  function initAudio() {
    dom.audioBtn.addEventListener('click', toggleAudio);
  }

  function playAudio() {
    if (!state.audioPlaying) {
      dom.bgAudio.play().then(() => {
        state.audioPlaying = true;
        updateAudioIcons();
      }).catch(err => {
        console.warn('Audio play prevented by browser policy:', err);
      });
    }
  }

  function toggleAudio() {
    if (dom.bgAudio.paused) {
      dom.bgAudio.play().then(() => {
        state.audioPlaying = true;
        updateAudioIcons();
      }).catch(console.warn);
    } else {
      dom.bgAudio.pause();
      state.audioPlaying = false;
      updateAudioIcons();
    }
  }

  function updateAudioIcons() {
    if (state.audioPlaying) {
      dom.iconSoundOn.classList.remove('hide');
      dom.iconSoundOff.classList.add('hide');
      dom.audioBtn.classList.remove('muted');
    } else {
      dom.iconSoundOn.classList.add('hide');
      dom.iconSoundOff.classList.remove('hide');
      dom.audioBtn.classList.add('muted');
    }
  }

  // --- SPARKS PARTICLE PHYSICS ENGINE ---
  let sparks = [];
  let sparksAnimId = null;
  const ctxSparks = dom.sparksCanvas ? dom.sparksCanvas.getContext('2d') : null;

  function resizeSparksCanvas() {
    if (!dom.sparksCanvas) return;
    dom.sparksCanvas.width = dom.gate.clientWidth;
    dom.sparksCanvas.height = dom.gate.clientHeight;
  }

  class Spark {
    constructor(originX, originY) {
      this.x = originX + (Math.random() - 0.5) * 36;
      this.y = originY + (Math.random() - 0.5) * 12;
      const angle = (Math.random() * -Math.PI) + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 5 + 2.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.gravity = 0.08;
      this.size = Math.random() * 2.8 + 1.2;
      this.alpha = 1;
      this.decay = Math.random() * 0.016 + 0.009;
      // Gold/amber spark hues
      const colors = ['#fff8db', '#ffd700', '#ffa700', '#ff6f00'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.alpha -= this.decay;
      this.size *= 0.985;
    }

    draw(ctx) {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ffd24d';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function emitSparks(originX, originY, count = 70) {
    for (let i = 0; i < count; i++) {
      sparks.push(new Spark(originX, originY));
    }
    if (!sparksAnimId) {
      animateSparks();
    }
  }

  function animateSparks() {
    if (!ctxSparks) return;
    ctxSparks.clearRect(0, 0, dom.sparksCanvas.width, dom.sparksCanvas.height);

    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.update();
      s.draw(ctxSparks);
      if (s.alpha <= 0 || s.size <= 0.2) {
        sparks.splice(i, 1);
      }
    }

    if (sparks.length > 0) {
      sparksAnimId = requestAnimationFrame(animateSparks);
    } else {
      sparksAnimId = null;
    }
  }

  // --- LAMP LIGHTING SEQUENCE ---
  function initLamp() {
    resizeSparksCanvas();
    window.addEventListener('resize', resizeSparksCanvas);

    dom.lampTapArea.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerLampLighting();
    });

    // Also allow tapping anywhere on gate to trigger
    dom.gate.addEventListener('click', (e) => {
      if (e.target.closest('#hudControls')) return;
      triggerLampLighting();
    });

    dom.lampTapArea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerLampLighting();
      }
    });
  }

  function triggerLampLighting() {
    if (state.gateOpened) return;
    state.gateOpened = true;

    // 1. Play classical theme audio
    playAudio();

    // 2. Compute exact wick center position
    const gateRect = dom.gate.getBoundingClientRect();
    const wickX = gateRect.width * 0.499;
    const wickY = gateRect.height * 0.421;

    // 3. Emit celebratory golden sparks
    emitSparks(wickX, wickY, 80);

    // 4. Show 5 wick flames and golden halo
    dom.wickFlames.classList.add('lit');
    dom.lampGlowHalo.classList.add('active');

    // 5. Expand radial gradient mask over closed (unlit) artwork to reveal lit temple underneath
    const startTime = performance.now();
    const duration = 1700; // ms

    function animateMask(time) {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const radiusPercent = ease * 150;

      // Mask closed image: transparent inside the circle (revealing open underneath), black outside
      const maskVal = `radial-gradient(circle at 49.9% 42.1%, transparent ${Math.max(0, radiusPercent - 18)}%, #000 ${radiusPercent + 6}%)`;
      if (dom.gateUnlit) {
        dom.gateUnlit.style.webkitMaskImage = maskVal;
        dom.gateUnlit.style.maskImage = maskVal;
      }

      if (progress < 1) {
        requestAnimationFrame(animateMask);
      } else {
        if (dom.gateUnlit) dom.gateUnlit.style.opacity = '0';
      }
    }
    requestAnimationFrame(animateMask);

    // 6. Transition from Gate to Hero
    setTimeout(() => {
      dom.gate.classList.add('gate-fade-out');
      dom.mainContent.classList.remove('hide');

      // Re-initialize reveals now that mainContent is in the layout tree
      initScrollReveals();
      checkReveals();

      setTimeout(() => {
        dom.gate.style.display = 'none';
        initScrollReveals();
        checkReveals();
      }, 1100);
    }, 2200);
  }

  // --- GOLD FOIL SCRATCH CARDS ENGINE ---
  const foilCards = [
    { id: 'Day', canvasId: 'canvasDay', valId: 'valDay', wrapId: 'cardDayWrap', key: 'day' },
    { id: 'Month', canvasId: 'canvasMonth', valId: 'valMonth', wrapId: 'cardMonthWrap', key: 'month' },
    { id: 'Year', canvasId: 'canvasYear', valId: 'valYear', wrapId: 'cardYearWrap', key: 'year' }
  ];

  function initScratchCards() {
    foilCards.forEach(card => {
      const canvas = document.getElementById(card.canvasId);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      setupFoilCanvas(canvas, ctx, card);
    });
  }

  function setupFoilCanvas(canvas, ctx, card) {
    const width = canvas.width;
    const height = canvas.height;

    // Draw luxury metallic gold foil texture
    drawGoldFoil(ctx, width, height, card.id);

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    }

    function eraseAt(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
    }

    function eraseLine(x1, y1, x2, y2) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 42;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    function checkScratchProgress() {
      if (state.cardsRevealed[card.key]) return;
      try {
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;
        let transparentPixels = 0;
        const totalSampled = (width * height) / 16;

        for (let i = 3; i < data.length; i += 16) {
          if (data[i] < 40) {
            transparentPixels++;
          }
        }

        const ratio = transparentPixels / totalSampled;
        if (ratio > 0.42) {
          revealCard(card, canvas, ctx);
        }
      } catch (err) {
        console.warn('Canvas check error:', err);
      }
    }

    // Pointer / Touch Events
    canvas.addEventListener('pointerdown', (e) => {
      isDrawing = true;
      const pos = getPos(e);
      lastX = pos.x;
      lastY = pos.y;
      eraseAt(pos.x, pos.y);
      canvas.setPointerCapture(e.pointerId);
    });

    canvas.addEventListener('pointermove', (e) => {
      if (!isDrawing) return;
      const pos = getPos(e);
      eraseLine(lastX, lastY, pos.x, pos.y);
      lastX = pos.x;
      lastY = pos.y;
    });

    canvas.addEventListener('pointerup', (e) => {
      if (isDrawing) {
        isDrawing = false;
        checkScratchProgress();
      }
    });

    canvas.addEventListener('pointercancel', () => {
      isDrawing = false;
    });

    // Tap/Click fallback: immediately scratches peek spot
    canvas.addEventListener('click', (e) => {
      const pos = getPos(e);
      eraseAt(pos.x, pos.y);
      eraseAt(width / 2, height / 2);
      checkScratchProgress();
    });
  }

  function drawGoldFoil(ctx, width, height, label) {
    ctx.globalCompositeOperation = 'source-over';

    // Rich metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#8c6014');
    grad.addColorStop(0.2, '#c99f4a');
    grad.addColorStop(0.4, '#fae19c');
    grad.addColorStop(0.55, '#dfb762');
    grad.addColorStop(0.75, '#fff1c7');
    grad.addColorStop(0.9, '#ab7c23');
    grad.addColorStop(1, '#7a510e');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle brushed metallic speckles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (let i = 0; i < 400; i++) {
      ctx.fillRect(Math.random() * width, Math.random() * height, Math.random() * 2 + 1, 1);
    }

    // Central elegant sparkle icon
    ctx.fillStyle = '#6b480c';
    ctx.font = '24px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦', width / 2, height / 2 - 8);

    // Subtle label on foil
    ctx.font = '500 11px Cinzel, serif';
    ctx.letterSpacing = '2px';
    ctx.fillText(label.toUpperCase(), width / 2, height / 2 + 22);

    // Delicate inner gold border
    ctx.strokeStyle = 'rgba(255, 235, 175, 0.6)';
    ctx.lineWidth = 1;
    ctx.strokeRect(6, 6, width - 12, height - 12);
  }

  function revealCard(card, canvas, ctx) {
    state.cardsRevealed[card.key] = true;

    // Smoothly dissolve remaining foil
    canvas.style.transition = 'opacity 0.6s ease';
    canvas.style.opacity = '0';
    setTimeout(() => {
      canvas.style.display = 'none';
    }, 600);

    // Check if all 3 cards are revealed
    if (state.cardsRevealed.day && state.cardsRevealed.month && state.cardsRevealed.year) {
      setTimeout(() => {
        dom.whenLine.classList.add('revealed');
      }, 400);
    }
  }

  // --- LIVE COUNTDOWN TIMER ENGINE ---
  // Target: Saturday, 13 February 2027 at 10:30 AM IST
  const targetDate = new Date('2027-02-13T10:30:00+05:30');

  function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      document.getElementById('cntDays').textContent = '00';
      document.getElementById('cntHours').textContent = '00';
      document.getElementById('cntMinutes').textContent = '00';
      document.getElementById('cntSeconds').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('cntDays').textContent = String(days).padStart(2, '0');
    document.getElementById('cntHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cntMinutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cntSeconds').textContent = String(seconds).padStart(2, '0');
  }

  // --- SCROLL REVEAL (INTERSECTION OBSERVER & FALLBACK) ---
  let scrollObserver = null;
  const revealSelector = '.reveal, .reveal-left, .reveal-right, .story-step, .tl-item, .stepper-row, .photos-carousel, .sec, .tl-art-card, .tl-content, .venue-art-wrap, .jharokha-frame, .cards, .countdown-boxes';

  function revealElement(el) {
    if (!el) return;
    el.classList.add('in');

    // Immediately mark key nested child components as in
    if (el.classList.contains('tl-item') || el.classList.contains('sec')) {
      el.querySelectorAll('.tl-art-card, .tl-content, .jharokha-frame, .venue-art-wrap, .photos-carousel, .story-step, .stepper-row, .card, .count-unit')
        .forEach(child => child.classList.add('in'));
    }
    if (el.classList.contains('sec-date') || el.classList.contains('cards')) {
      el.querySelectorAll('.card').forEach(child => child.classList.add('in'));
    }
    if (el.classList.contains('sec-countdown') || el.classList.contains('countdown-boxes')) {
      el.querySelectorAll('.count-unit').forEach(child => child.classList.add('in'));
    }
  }

  function checkReveals() {
    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    // 150px buffer ahead of scroll so content reveals smoothly before hitting screen edge
    const triggerBottom = vh + 150;

    document.querySelectorAll(revealSelector).forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= triggerBottom && rect.bottom >= -200) {
        revealElement(el);
      }
    });
  }

  function initScrollReveals() {
    // Cleanly re-create observer if it already exists
    if (scrollObserver) {
      try { scrollObserver.disconnect(); } catch (e) {}
      scrollObserver = null;
    }

    if ('IntersectionObserver' in window) {
      scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
          }
        });
      }, {
        threshold: [0, 0.05],
        rootMargin: '120px 0px 120px 0px' // Pre-emptively reveal slightly ahead
      });

      document.querySelectorAll(revealSelector).forEach(el => {
        scrollObserver.observe(el);
      });
    }

    // Capture scroll events at the document root to avoid any bubbling or overflow traps
    ['scroll', 'resize', 'orientationchange'].forEach(evt => {
      window.addEventListener(evt, checkReveals, { passive: true, capture: true });
      document.addEventListener(evt, checkReveals, { passive: true, capture: true });
    });

    window.addEventListener('wheel', checkReveals, { passive: true });
    window.addEventListener('touchmove', checkReveals, { passive: true });

    // Run check right away
    checkReveals();
  }

  function initScrollDownBtn() {
    const scrollDownBtn = document.getElementById('scrollDownBtn');
    if (scrollDownBtn) {
      scrollDownBtn.addEventListener('click', () => {
        // Trigger reveals for paper sections during smooth scroll
        setTimeout(checkReveals, 50);
        setTimeout(checkReveals, 200);
        setTimeout(checkReveals, 500);
        setTimeout(checkReveals, 900);
      });
    }
  }

  // --- RSVP GUEST STEPPERS & WHATSAPP SENDER ---
  window.updateGuestCount = function(index, delta) {
    let count = state.guestCounts[index] + delta;
    if (count < 0) count = 0;
    if (count > 20) count = 20;
    state.guestCounts[index] = count;
    document.getElementById(`cnt${index}`).textContent = count;
  };

  window.submitRsvp = function() {
    const nameInput = document.getElementById('rsvpFamily');
    const guestName = (nameInput.value || '').trim() || (state.currentLang === 'hi' ? 'प्रिय अतिथि' : 'Guest');

    const mehendiCount = state.guestCounts[0];
    const receptionCount = state.guestCounts[1];
    const muhurthamCount = state.guestCounts[2];

    let message = '';
    if (state.currentLang === 'hi') {
      message = `नमस्ते तान्या और विक्रम! मैं ${guestName}।\n\nहमारे आगमन की पुष्टि:\n- मेहंदी: ${mehendiCount} व्यक्ति\n- रिसेप्शन: ${receptionCount} व्यक्ति\n- मुहूर्तम: ${muhurthamCount} व्यक्ति\n\nविवाह उत्सव में सम्मिलित होने के लिए हम उत्सुक हैं!`;
    } else {
      message = `Hi Tanya & Vikram! ${guestName} here.\n\nRSVP Details:\n- Mehendi: ${mehendiCount} guest(s)\n- Reception: ${receptionCount} guest(s)\n- Muhurtham: ${muhurthamCount} guest(s)\n\nLooking forward to celebrating with you!`;
    }

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // --- ADD TO CALENDAR (.ICS GENERATOR) ---
  window.addToCalendar = function(eventType) {
    let title = '';
    let description = '';
    let location = 'The Kalyana Mandapam, By the Teppakulam, Madurai, Tamil Nadu';
    let dtStart = '';
    let dtEnd = '';

    if (eventType === 'mehendi') {
      title = 'Tanya & Vikram Wedding: Mehendi';
      description = 'Mehendi celebration at the garden courtyard';
      dtStart = '20270213T050000Z'; // 10:30 AM IST = 05:00 UTC
      dtEnd = '20270213T093000Z';   // 3:00 PM IST
    } else if (eventType === 'reception') {
      title = 'Tanya & Vikram Wedding: Reception';
      description = 'Wedding Reception with dinner served on traditional banana leaves';
      dtStart = '20270213T133000Z'; // 7:00 PM IST = 13:30 UTC
      dtEnd = '20270213T173000Z';
    } else {
      // muhurtham / main wedding
      title = 'Tanya & Vikram Wedding: Muhurtham';
      description = 'Sacred wedding ceremony at sunrise';
      dtStart = '20270214T020000Z'; // 7:30 AM IST = 02:00 UTC
      dtEnd = '20270214T063000Z';
    }

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Saath Studio//Temple Wedding Invite//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tanya-vikram-${eventType || 'wedding'}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (dom.btnAddToCalMain) {
    dom.btnAddToCalMain.addEventListener('click', () => {
      window.addToCalendar('muhurtham');
    });
  }

  // --- GOOGLE MAPS LAZY LOADER ---
  function initMapLoader() {
    if (!dom.btnLoadMap) return;
    dom.btnLoadMap.addEventListener('click', () => {
      dom.btnLoadMap.classList.add('hide');
      dom.mapIframeWrapper.classList.remove('hide');
    });
  }

  // --- BILINGUAL LANGUAGE SWITCHER ---
  function initLanguageSwitcher() {
    dom.langBtn.addEventListener('click', toggleLanguage);
  }

  function toggleLanguage() {
    state.currentLang = state.currentLang === 'en' ? 'hi' : 'en';
    applyLanguage(state.currentLang);
  }

  function applyLanguage(lang) {
    const t = I18N[lang];

    // Toggle button label
    dom.langBtnLabel.textContent = t.langToggleLabel;

    // Gate texts
    safeSetText('txtGateInvited', t.gateInvited);
    safeSetText('txtGateSub', t.gateSub);
    safeSetText('txtGatePrompt', t.gatePrompt);

    // Hero texts
    safeSetText('txtHeroPre', t.heroPre);
    safeSetText('txtHeroBride', t.heroBride);
    safeSetText('txtHeroGroom', t.heroGroom);
    safeSetText('txtHeroCity', t.heroCity);
    safeSetText('txtScrollDown', t.scrollDown);

    // Date texts
    safeSetText('txtDateTitle', t.dateTitle);
    safeSetText('txtScratchPrompt', t.scratchPrompt);
    safeSetText('lblDay', t.lblDay);
    safeSetText('lblMonth', t.lblMonth);
    safeSetText('lblYear', t.lblYear);
    safeSetText('valMonth', t.valMonth);
    safeSetText('txtWhenDetail', t.whenDetail);
    safeSetText('txtAddCalMain', t.addCal);

    // Invitation card texts
    safeSetHtml('txtInvBlessing', t.invBlessing);
    safeSetText('txtInvBride', t.invBride);
    safeSetText('txtInvDaughterOf', t.invDaughterOf);
    safeSetText('txtInvBrideParents', t.invBrideParents);
    safeSetText('txtInvWith', t.invWith);
    safeSetText('txtInvGroom', t.invGroom);
    safeSetText('txtInvSonOf', t.invSonOf);
    safeSetText('txtInvGroomParents', t.invGroomParents);
    safeSetText('txtInvDate', t.invDate);
    safeSetText('txtInvVenue', t.invVenue);

    // Story texts
    safeSetText('txtStoryTitle', t.storyTitle);
    safeSetText('txtStoryLead', t.storyLead);
    safeSetText('txtStoryTag1', t.storyTag1);
    safeSetText('txtStoryDesc1', t.storyDesc1);
    safeSetText('txtStoryTag2', t.storyTag2);
    safeSetText('txtStoryDesc2', t.storyDesc2);
    safeSetText('txtStoryTag3', t.storyTag3);
    safeSetText('txtStoryDesc3', t.storyDesc3);

    // Photos texts
    safeSetText('txtPhotosTitle', t.photosTitle);
    safeSetText('txtCap1', t.cap1);
    safeSetText('txtCap2', t.cap2);
    safeSetText('txtCap3', t.cap3);
    safeSetText('txtCap4', t.cap4);
    safeSetText('txtCap5', t.cap5);
    safeSetText('txtCap6', t.cap6);
    safeSetText('txtSwipeHint', t.swipeHint);

    // Celebrations texts
    safeSetText('txtEventsTitle', t.eventsTitle);
    safeSetText('txtMehendiMeta', t.mehendiMeta);
    safeSetText('txtMehendiTitleEn', t.mehendiTitleEn);
    safeSetText('txtMehendiTitleHi', t.mehendiTitleHi);
    safeSetText('txtMehendiPlace', t.mehendiPlace);

    safeSetText('txtReceptionMeta', t.receptionMeta);
    safeSetText('txtReceptionTitleEn', t.receptionTitleEn);
    safeSetText('txtReceptionTitleHi', t.receptionTitleHi);
    safeSetText('txtReceptionPlace', t.receptionPlace);

    safeSetText('txtMuhurthamMeta', t.muhurthamMeta);
    safeSetText('txtMuhurthamTitleEn', t.muhurthamTitleEn);
    safeSetText('txtMuhurthamTitleHi', t.muhurthamTitleHi);
    safeSetText('txtMuhurthamPlace', t.muhurthamPlace);

    // All "Add to calendar" labels in celebrations
    document.querySelectorAll('.txt-cal-label').forEach(el => {
      el.textContent = t.addCal;
    });

    // Countdown texts
    safeSetText('txtCountTitle', t.countTitle);
    safeSetText('lblDays', t.lblDays);
    safeSetText('lblHours', t.lblHours);
    safeSetText('lblMinutes', t.lblMinutes);
    safeSetText('lblSeconds', t.lblSeconds);
    safeSetText('txtCountTarget', t.countTarget);

    // Venue texts
    safeSetText('txtVenueTitle', t.venueTitle);
    safeSetText('txtVenueCity', t.venueCity);
    safeSetText('txtVenueHall', t.venueHall);
    safeSetText('txtVenueAddress', t.venueAddress);
    safeSetText('txtBtnShowMap', t.btnShowMap);
    safeSetText('txtBtnOpenMaps', t.btnOpenMaps);

    // Spotify
    safeSetText('txtSpotifyBadge', t.spotifyBadge);

    // RSVP texts
    safeSetText('txtRsvpTitle', t.rsvpTitle);
    safeSetText('txtRsvpSub', t.rsvpSub);
    safeSetText('lblYourName', t.lblYourName);
    safeSetText('lblRsvpRow0', t.rsvpRow0);
    safeSetText('lblRsvpDate0', t.rsvpDate0);
    safeSetText('lblRsvpRow1', t.rsvpRow1);
    safeSetText('lblRsvpDate1', t.rsvpDate1);
    safeSetText('lblRsvpRow2', t.rsvpRow2);
    safeSetText('lblRsvpDate2', t.rsvpDate2);
    safeSetText('txtBtnSendWhatsapp', t.btnSendWhatsapp);
    safeSetText('txtRsvpNote', t.rsvpNote);

    // Footer texts
    safeSetText('txtFamilySignoff', t.familySignoff);
    safeSetHtml('txtCoupleSignoff', t.coupleSignoff);
    safeSetText('txtInviteMadeWith', t.inviteMadeWith);
  }

  function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function safeSetHtml(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  // --- INITIALIZATION ---
  function boot() {
    initAudio();
    initLamp();
    initScratchCards();
    initCountdown();
    initScrollReveals();
    initScrollDownBtn();
    initMapLoader();
    initLanguageSwitcher();

    // Safety periodic check during initial interaction
    const safetyTimer = setInterval(checkReveals, 400);
    setTimeout(() => clearInterval(safetyTimer), 8000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
