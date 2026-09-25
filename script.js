(function () {
  const body = document.body;
  const modeButtons = document.querySelectorAll(".mode-btn");
  const classButtons = document.querySelectorAll(".class-btn");
  const modelViewer = document.getElementById("classModel");
  const modelPlaceholder = document.getElementById("modelPlaceholder");
  const placeholderPath = document.getElementById("placeholderPath");
  const classText = document.getElementById("classText");
  const loreName = document.getElementById("loreName");
  const loreText = document.getElementById("loreText");
  const loreRating = document.getElementById("loreRating");
  const videoStage = document.getElementById("videoStage");
  const videoMissing = document.getElementById("videoMissing");
  const bgProbe = document.getElementById("bgProbe");
  const bgLayerA = document.getElementById("bgLayerA");
  const bgLayerB = document.getElementById("bgLayerB");
  const honorableBtn = document.getElementById("honorableBtn");
  const honorableBackBtn = document.getElementById("honorableBackBtn");
  const honorableClassButtons = document.querySelectorAll(".honorable-class-btn");
  const honorableScene = document.getElementById("honorableScene");
  const honorableListFun = document.getElementById("honorableListFun");
  const honorableListSkill = document.getElementById("honorableListSkill");
  const honorableHeaderFun = document.querySelector(".honorable-header-fun");
  const honorableHeaderSkill = document.querySelector(".honorable-header-skill");
  const honorableNote = document.getElementById("honorableNote");
  const honorableVideoOverlay = document.getElementById("honorableVideoOverlay");

  // ---------------------------------------------------------------
  // PLACEHOLDER DATA -- some of this is still meant to be filled in.
  // For each class, "skill" and "fun" each hold a name, a line of
  // flavor text, a path to a .glb model, an animation clip name, and
  // a longer "lore" string. "text" is currently empty on every entry
  // (fill it in if you want the bottom flavor-text line to show
  // anything). "model" points at models/{class}-{mode}.glb -- any
  // combination without a matching file in models/ shows a dashed
  // placeholder box until you add one, no code changes needed.
  // ---------------------------------------------------------------
  const CLASS_DATA = {
    warrior: {
      skill: { name: "Bobo", text: "", model: "models/warrior-skill.glb", lore: "The rest of the skilled section were picked for their individual skill, Bobo however was picked because the demons he chose to fight could have made it to this list on their own (one of them did). By far the cleanest and most impressive warrior at the time, you could easily believe some of these duels were recorded yesterday and not 20 years ago. 9/10", video: "23MOz4cc0Uk", animation: "Stand", cameraRadius: "85%"  },
      fun:   { name: "S&Q Inc Group PVP", text: "", model: "models/warrior-fun.glb", lore: "One of the classiest PvP videos in all of vanilla, the editing, the soundtrack and the 2vX lens they filmed through, S&Q Inc is nothing if not fun. A shoutout to Wheeliecool & Champ for a similar vibe but for us it's gotta be S&Q Inc.", video: "sHJS1bqu6yw", animation: "Stand" }
    },
    paladin: {
      skill: { name: "Arthus", text: "", model: "models/paladin-skill.glb", lore: "The king of the muck, you won't see him back down from a fight around a few mobs. Has some of the best understanding of 1v1s we've seen from vanilla paladins, even if he's not the best movement wise. After seeing his furbolg tech in Bobo's video we knew we had our guy.  6.5/10", video: "S9XitQA-dkE", animation: "Stand" },
      fun:   { name: "Zalgradis", text: "", model: "models/paladin-fun.glb", lore: "Sketches, engineering, bad voice acting, and a unique playstyle come together in a love letter full of references to other videos of the era", video: "NOXrGmulbMk", animation: "Stand" }
    },
    hunter: {
      skill: { name: "Junglle", text: "", model: "models/hunter-skill.glb", lore: "Some decent kiting here, especially given that he's clicking the majority of his spells. In comparison to every hunter PvP video (sorry Dysphoria) we've come across might as well be a god. 5/10", video: "QrXL4bxtymk", animation: "Stand" },
      fun:   { name: "Dysphoria", text: "", model: "models/hunter-fun.glb", lore: " A completely fresh soundtrack for the time and a mental that says nothing is impossible Hunter Vs. World is an all time classic series.", video: "7XgF_P9Ddjk", animation: "Stand" }
    },
    rogue: {
      skill: { name: "Cielz", text: "", model: "models/rogue-skill.glb", lore: "The intro promises a lot, the subsequent 19 minutes delivers on some. Early attempts at 5-8ing warriors, a healthy trigger discipline on their cooldowns and a willingness to take on 1vX's. On top of it all he's a swirly ball enjoyer. Definitely check out the rogue honourable mentions as this was an incredibly close competition. 7.5/10", video:"qN9GtoGnTxc", animation: "Stand" },
      fun:   { name: "Mute (World of Roguecraft)", text: "", model: "models/rogue-fun.glb", lore: "The most influential vanilla PvP videos of all time, if you ever saw someone trying to flex on their enemies while naked, it's probably because of mute. (Released in reverse order, episode 3 was the first in the series)", video: "bqx1CFomKMI", animation: "Stand (ID 0 variation 0)" }
    },
    priest: {
      skill: { name: "There are no good priests apparently", text: "", model: "models/priest-skill.glb", lore: "There are no good priests apparently", video: "IUQyClRWOFc", animation: "Stand" },
      fun:   { name: "Beckon", text: "", model: "models/priest-fun.glb", lore: "is the Hulksmash of holy priests, sit back, relax, and watch this man cast a 40 second holy fire to take someones head off", video: "x_EgBtUtWBM", animation: "Stand (ID 0 variation 0)" }
    },
    shaman: {
      skill: { name: "Nimhabulove", text: "", model: "models/shaman-skill.glb", lore: "Between totems, shocks, healing and damaging spells shaman has a lot of tools at its disposal, our guy said nah, not enough, and added some engi to this toolkit. Grounding coils, reflecting fears and stunlocking with tidal/nades, there are definite moments in his video that earn him a spot on this page. 6/10", video: "qxMSzBxxesk", animation: "Stand" },
      fun: {
        variants: [
          { name: "Cabbarnuke", text: "", model: "models/shaman-fun-cabbarnuke.glb", lore: "If you saw Roguecraft and needed more naked PvP, Cabbarnuke is your guy.", video: "eXE-J13gpNE", animation: "Stand" },
          { name: "Unbreakable", text: "", model: "models/shaman-fun-unbreakable.glb", lore: "If you're looking for the exact opposite and want to see a man swing a big hammer as hard as he can, Unbreakable has got your back.", video: "ja1j7xWpB3w", animation: "Stand" }
        ]
      }
    },
    mage: {
      skill: { name: "Clazzi", text: "", model: "models/mage-skill.glb", lore: "Crispy movement, cooldown management and a complete confidence in his actions. Perhaps the first known recording of a dirty pop, the opening 1vX is one of the best recorded vanilla fights of all time. 9.5/10", video: "3_Tr5aklJ6U", animation: "Stand (ID 0 variation 0)" },
      fun:   { name: "Pathologist", text: "", model: "models/mage-fun.glb", lore: "By far the most unique and creative visual style, Pathologist (Dyf1.6) saw the potential for PvP videos to be more than crit showcases and unedited BG footage, he wanted to make art, not just in video form as half of his soundtracks are his own songs. Had God blessed him with the PvP skill of a Clazzi, he'd be the only name on this list. ", video: "0ZNAWoYEras", animation: "Stand (ID 0 variation 0)", cameraRadius: "75%"  }
    },
    warlock: {
      skill: { name: "Lokilo", text: "", model: "models/warlock-skill.glb", lore: "An actual time traveler, completely cool under pressure with impeccable character control and target selection. What he lacks in flashiness he makes up for in pure cleanliness. 9/10", video: "dPJf4Ocjc-8", animation: "Stand (ID 0 variation 0)", cameraRadius: "70%"  },
      fun:   { name: "Drakedog", text: "", model: "models/warlock-fun.glb", lore: "Did we mention we're fans of Pathologist? Drakedog, who is probably the most beloved vanilla warlock, having Pathologist edit his video for him was a crossover that came out of nowhere and we're glad it did.", video: "I918N8wUvRs", animation: "Stand (ID 0 variation 0)", cameraRadius: "40%" }
    },
    druid: {
      skill: { name: "Tfo", text: "", model: "models/druid-skill.glb", lore: "Very solid player, he has an exceptional grasp on how to use the utility and strengths of this versatile class. 7.5/10", video: "aX93zH6wJeM", animation: "Stand" },
      fun:   { name: "N E V E R ", text: "", model: "models/druid-fun.glb", lore: "You thought druids were weak in vanilla? Ferahgo and Boro came together to show you otherwise.", video: "J7DN_w0LQUI", animation: "Stand" }
    }
  };

  // ---------------------------------------------------------------
  // Honorable Mentions -- a longer list per class/mode, each entry
  // just a name plus optional lore text and an optional YouTube
  // video id. Unlike the main CLASS_DATA entry above, these are
  // collapsed by default and expand on click. Add or remove entries
  // freely -- each is just { name: "...", lore: "...", video: "..." }
  // or { name: "...", lore: "", video: null } if you only have a name
  // so far.
  // ---------------------------------------------------------------
  const HONORABLE_MENTIONS = {
    warrior: {
      skill: [{ name: "Laintime", lore: "People think of Laintime as the godfather of warriors, we remember him as the lone pillar holding up the tuber industry. The people of Felwood thank you, Laintime", video: "LFkSidbQu2o" }],
      fun: [{ name: "Swifty", lore: "Game-breaking charge macros, glowy hands, basically inventing Skull of Impending Doom, by far one of the most captivating vanilla videos", video: "HUPexEfCG7g" }, { name: "Pat", lore: "This video is what happens when you give warrriors an extra talent point, an army of healers, and a row a buffs that would make the most battle-hardened Naxxramas raider blush", video: "RGBnjELkgok" }, { name: "Maydie", lore: "You already know who this is, you've seen this, your brother has seen this, your neighbor's wife has seen this. It's Maydie bro. Lock in. You're disappointing me.", video: "SwSR1SHYZRI" }, { name: "Illusion", lore: "Hulksmash with worse music and a worse overall video, but he has two f***ing servo arms so that evens it out a bit.", video: "STq43Pxqgc4" }, { name: "Spinister", lore: "The less famous twin brother of Laintime but not any less fun", video: "hW8ButI6mns" }, { name: "Hulksmash", lore: "Big damage, Big soundtrack, Big fury, your favorite warriors favorite PvP video.", video: "IAR1CsAXLCw" }, { name: "Xahlior", lore: "The most fun thing about this video is his gear, because damn, how is this man so geared?", video: "oKQNJL5IL2s" }],
      note: ""
    },
    paladin: {
      skill: [{ name: "Chipman", lore: "The Maydie of ret paladin videos", video: "b2EfsrD_Mqk" }, { name: "Kirill", lore: "Where Arthus changes playstyle/spec to suit his situation, Kirill managed to brute forced his grenade stunlock style onto all situations", video: "fhnEhZVzo3I" }],
      fun: []
    },
    hunter: {
      skill: [{ name: "Biuret", lore: "After watching every hunter video that exists on the internet that could find we were left with three candidates, the clicker won between them.", video: "m-IzBxFa8yg" }, { name: "Kishra", lore: "After watching every hunter video that exists on the internet that could find we were left with three candidates, the clicker won between them.", video: "eIW0i5tch1E" }],
      fun: [{ name: "Fubarius(Huntology)", lore: "This video is something that just needs to be experienced. Some (most) will hate it and others will love it, for us however, we definitely believe in immersing ourselves in the dream of the hunt.", video: "k5DdYPLoItU" }],
      note: ""
    },
    rogue: {
      skill: [{ name: "Dahis", lore: "Dahis is the Klay Thompson to Cielz' Curry - Splash Bros!", video: "VMCDsXwAEK8" }, { name: "Corrupt", lore: "C'thun tentacles hunter traps", video: "CkRIrlmQRYQ" }, { name: "Ming", lore: "Humble beginnings to what would become one of the biggest names in the arena scene", video: "aDXXr3ad3is" }, { name: "Happyminti", lore: " Prevanishing paranoia, good reflectors, spacing warrior shouts for stealth, overall very clean", video: "YvQoYMq8_Ng" }, { name: "Oozo", lore: "Some of the earliest display of rogue skills that are now the mark of a good rogue (even if some ((all)) of them happened on accident)", video: "1C7Uvt_0oYs" }],
      fun: [{ name: "Caen", lore: "Basically a movie, 41 minutes of Thunderfury slicing through people to a soundtrack that could only have been born in the early 00's", video: "CGZiwuUPFMo" }, { name: "Perkulator ", lore: "Good vibes", video: "ID192rw5Whw" }, { name: "Grim", lore: "High intensity, fun moments, same server as Zalgradis and Maydie.", video: "oWNt_8xcOZw" }],
      note: ""
    },
    priest: {
      skill: [],
      fun: [{ name: "Keytal", lore: "Ever want to see what 10 Spriests look like in a WSG? Here you go.", video: "zAJOrVks7Xc" }],
      note: "There are no honorable priests apparently"
    },
    shaman: {
      skill: [],
      fun: [{ name: "Arashmano", lore: "If Unbreakable is Shaq Arashmano is Yao, same build different style", video: "8-w9Wl8v6ZA" }]
    },
    mage: {
      skill: [{ name: "Drifting", lore: "Both Drifting and Zachary are incredibly clean and could have made the top spot if it was not for the fact that Clazzi is Clazzi", video: "VXh_kZZ-GQo" }, { name: "Zachary", lore: "Both Zachary and Drifting are incredibly clean and could have made the top spot if it was not for the fact that Clazzi is Clazzi.", video: "ohTYLIi1ghY" }, { name: "Gameking", lore: "Very fast in both decision making and execution, crispy ice blocks.", video: "RfY8Egsd6C8" }, { name: "Alca", lore: "Great movement, a lot of heads up small plays, and he's ele so that's fun.", video: "MMnmuU8mOsw" }, { name: "Vurtne", lore: "When you think warlock, you think Drakedog. When you think mage, it's Vurtne", video: "k5Wieh9MMmc" }],
      fun: [{ name: "Zelta", lore: "Fire. Fun. Ignite. Invis pyro. Fun. Crit. Boom. Ignite.", video: "WYSbkW__6MI" }, { name: "Faxmonkey", lore: "Made you envious of mages PvE ability, Dysphoria and him were cut from the same cloth", video: "3O_pNDc73MM" }, { name: "Voidim", lore: "The worlds first vanilla video that doesn't include Rammstein or P.O.D, this soundtrack is F R E S H", video: "fSn46eGGW7s" }, { name: "Otherguy", lore: "Everyone who played in vanilla knew his name, very well respected player from way back when.", video: "2FwMRW1ra0E" }],
      note: "Both Zachary and Drifiting get extra special mentions as standouts, Clazzi is just a cut above everyone else"
    },
    warlock: {
      skill: [{ name: "Shining", lore: "Coiling intercepts and smart use of spellstones, Shining is a strong contender for top spot", video: "SqlJUxRd9WU" }, { name: "May", lore: "An interesting CoE/Shadowburn build played by a guy who knows what both banish and spellstone do, some very nice plays here", video: "fwvpcN72K98" }, { name: "Diivil", lore: "Who needs 3k soulfires when you can tank your enemies to death, the rare vanilla soullink warlock who figured: If i take less damage and my dots do guaranteed damage don't i just win?", video: "BV5iAVmiqF8" }],
      fun: [],
      note: ""
    },
    druid: {
      skill: [{ name: "Unstoppable", lore: "Even if he weren't as capable as he is, deserves a spot for the model/spell editing.", video: "_QLmuHDy0Qs" }, { name: "Azgaz", lore: "Druid enjoyers would kill us if we didn't include Azgaz on the list", video: "xlXOnYi5tAU" }],
      fun: []
    }
  };

  let currentClass = "warrior";
  let currentMode = "skill";
  let requestedSrc = "";
  let requestedAnimation = "Stand";
  let hasStartedPreload = false;
  let activeBgLayer = bgLayerA;
  let currentVariantSlug = null;

  // Mirrors the neutral placeholder gradient from style.css -- used
  // as the crossfade layer's image when the probe resolves to "none"
  // (i.e. no background rule exists yet for this class/mode).
  const NEUTRAL_BG =
    'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 75%), ' +
    'linear-gradient(180deg, #211d17 0%, #2c261e 45%, #181410 100%)';

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // ---------------------------------------------------------------
  // If a lore string ends with a "X/10" or "X.X/10" rating, pull it
  // out and render it as a separate review-score badge (stars + a
  // large number), the way a movie trailer displays a critic score,
  // instead of leaving it as plain trailing text in the paragraph.
  // Lore strings without a trailing rating just render as-is.
  // ---------------------------------------------------------------
  // Splits a trailing "X/10" (or "X.X/10") rating off the end of a
  // lore string, if present. Returns { mainText, ratingHtml } --
  // ratingHtml is "" when there's no rating.
  function splitLoreRating(rawLore) {
    const match = /^([\s\S]*?)\s*(\d{1,2}(?:\.\d)?)\s*\/\s*10\s*$/.exec((rawLore || "").trim());

    if (!match) {
      return { mainText: (rawLore || "").trim(), ratingHtml: "" };
    }

    const mainText = match[1].trim();
    const score = match[2];
    // Round to the nearest half-star (10-point scale, so nearest 0.5)
    // and build 10 individual star spans, each explicitly full, half,
    // or empty -- rather than one string of glyphs -- so a rating
    // like 7.5 renders a genuine half-filled 8th star instead of
    // rounding up to a full one.
    const clamped = Math.min(10, Math.max(0, parseFloat(score)));
    const rounded = Math.round(clamped * 2) / 2;
    let stars = "";
    for (let i = 1; i <= 10; i++) {
      let state = "empty";
      if (rounded >= i) state = "full";
      else if (rounded >= i - 0.5) state = "half";
      stars += `<span class="star star-${state}">★</span>`;
    }

    const ratingHtml =
      `<span class="rating-stars">${stars}</span>` +
      `<span class="rating-score">${escapeHtml(score)}<span class="rating-outof">/10</span></span>`;

    return { mainText, ratingHtml };
  }

  function renderLore(rawLore) {
    const { mainText } = splitLoreRating(rawLore);
    return `<p class="lore-text">${escapeHtml(mainText)}</p>`;
  }

  // ---------------------------------------------------------------
  // Crossfades the background. Rather than a second copy of every
  // background rule in style.css, this mirrors body's data-class /
  // data-mode onto the hidden #bgProbe element, so the exact same
  // [data-class][data-mode] rules already in style.css resolve on it
  // too -- then reads the resulting image off it with
  // getComputedStyle() and hands that to whichever of the two
  // .bg-layer divs is currently hidden, fading it in while fading the
  // other one out.
  // ---------------------------------------------------------------
  function updateBackground() {
    if (!bgProbe || !bgLayerA || !bgLayerB) return;

    bgProbe.dataset.class = currentClass;
    bgProbe.dataset.mode = currentMode;
    if (currentVariantSlug) {
      bgProbe.dataset.variant = currentVariantSlug;
    } else {
      delete bgProbe.dataset.variant;
    }

    const resolved = getComputedStyle(bgProbe).backgroundImage;
    const image = !resolved || resolved === "none" ? NEUTRAL_BG : resolved;

    const incoming = activeBgLayer === bgLayerA ? bgLayerB : bgLayerA;
    incoming.style.backgroundImage = image;

    // Force layout before adding the class, so the browser registers
    // the new image first and actually animates the opacity change
    // instead of jumping straight to the end state.
    void incoming.offsetWidth;

    incoming.classList.add("visible");
    activeBgLayer.classList.remove("visible");
    activeBgLayer = incoming;
  }

  // If a model's requested animation clip doesn't exist in the file,
  // try these common alternate names before giving up.
  const ANIMATION_FALLBACKS = ["Stand", "Idle", "idle", "stand", "Idle01", "Stand1"];

  // ---------------------------------------------------------------
  // Preload everything on page load instead of waiting for a click.
  // Models: every unique .glb path in CLASS_DATA gets fetched once,
  // which primes the browser's HTTP cache -- when <model-viewer>
  // later requests the same URL, it loads instantly from cache
  // instead of hitting the network. 404s (classes without a real
  // model yet) fail silently, same as they always have.
  // Backgrounds: rather than hardcoding a second list of image paths
  // to keep in sync with style.css, this scans the loaded stylesheet
  // for every "background-image: url(...)" rule and preloads each
  // one via a throwaway Image() object, so any image you add to
  // style.css later gets preloaded automatically with no extra code.
  // ---------------------------------------------------------------
  function preloadAllAssets() {
    const modelPaths = new Set();
    Object.values(CLASS_DATA).forEach((modes) => {
      Object.values(modes).forEach((entry) => {
        if (entry.model) modelPaths.add(entry.model);
      });
    });
    modelPaths.forEach((path) => {
      fetch(path).catch(() => {});
    });

    const urlPattern = /url\((['"]?)([^'")]+)\1\)/g;
    const imageUrls = new Set();
    try {
      Array.from(document.styleSheets).forEach((sheet) => {
        let rules;
        try {
          rules = sheet.cssRules;
        } catch (e) {
          return; // cross-origin stylesheet (e.g. Google Fonts) -- skip
        }
        if (!rules) return;
        Array.from(rules).forEach((rule) => {
          const bg = rule.style && rule.style.backgroundImage;
          if (!bg || bg === "none") return;
          let match;
          while ((match = urlPattern.exec(bg)) !== null) {
            imageUrls.add(match[2]);
          }
        });
      });
    } catch (e) {
      console.warn("Couldn't scan stylesheets to preload background images:", e);
    }
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }

  // ---------------------------------------------------------------
  // Some class/mode entries have multiple interchangeable profiles
  // (e.g. Shaman/Fun: Cabbarnuke or Unbreakable) instead of a single
  // flat { name, text, model, lore, video, animation } object -- for
  // those, CLASS_DATA has a "variants" array of that same shape
  // instead. getResolvedEntry() picks whichever variant is currently
  // selected (tracked per class/mode in variantIndices, default 0).
  // The name header shows every variant's name joined by "/" (e.g.
  // "Cabbarnuke/Unbreakable"), with the active one at full brightness
  // and the others dimmed -- clicking a specific name switches to it,
  // fading the emphasis across rather than replacing the text.
  // ---------------------------------------------------------------
  const variantIndices = {};

  function slugify(str) {
    return (str || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function getResolvedEntry(className, mode) {
    const raw = CLASS_DATA[className][mode];
    if (raw.variants) {
      const key = className + "-" + mode;
      return raw.variants[variantIndices[key] || 0];
    }
    return raw;
  }

  function updateView() {
    const rawEntry = CLASS_DATA[currentClass][currentMode];
    const data = getResolvedEntry(currentClass, currentMode);
    currentVariantSlug = rawEntry.variants ? slugify(data.name) : null;

    body.dataset.class = currentClass;
    body.dataset.mode = currentMode;

    updateBackground();

    if (classText) classText.textContent = data.text;
    if (loreName) {
      if (rawEntry.variants) {
        const key = currentClass + "-" + currentMode;
        const activeIdx = variantIndices[key] || 0;
        loreName.innerHTML = rawEntry.variants
          .map(
            (v, i) =>
              `<span class="variant-option${i === activeIdx ? " active" : ""}" data-variant-index="${i}">${escapeHtml(v.name)}</span>`
          )
          .join('<span class="variant-sep">/</span>');
      } else {
        loreName.textContent = data.name;
      }
    }
    if (loreText) {
      loreText.innerHTML = renderLore(data.lore);
    } else {
      console.warn('script.js expected an element with id="loreText" but did not find one. Make sure index.html, style.css, and script.js are all the latest versions, deployed together.');
    }
    if (loreRating) {
      loreRating.innerHTML = splitLoreRating(data.lore).ratingHtml;
    }

    requestedSrc = data.model;
    requestedAnimation = data.animation || "Stand";
    if (modelPlaceholder) modelPlaceholder.classList.remove("visible");
    if (placeholderPath) placeholderPath.textContent = data.model;
    if (modelViewer) {
      modelViewer.setAttribute("src", data.model);
      modelViewer.setAttribute("animation-name", requestedAnimation);
      // Camera radius (distance from the model) defaults to 100% --
      // set a "cameraRadius" field on a class/mode entry (e.g. "75%")
      // to zoom that specific model in closer, making it read as
      // bigger. min/max-camera-orbit have to move together with
      // camera-orbit's radius since they otherwise clamp it back.
      const radius = data.cameraRadius || "100%";
      modelViewer.setAttribute("camera-orbit", `90deg 75deg ${radius}`);
      modelViewer.setAttribute("min-camera-orbit", `auto 90deg ${radius}`);
      modelViewer.setAttribute("max-camera-orbit", `auto 90deg ${radius}`);
    }

    applyVideoId(data.video || null);

    modeButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.mode === currentMode));
    classButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.class === currentClass));
  }

  if (loreName) {
    loreName.addEventListener("click", (e) => {
      const optionEl = e.target.closest(".variant-option");
      if (!optionEl) return;
      const rawEntry = CLASS_DATA[currentClass][currentMode];
      if (!rawEntry.variants) return;
      const key = currentClass + "-" + currentMode;
      variantIndices[key] = parseInt(optionEl.dataset.variantIndex, 10);
      updateView();
    });
  }

  // ---------------------------------------------------------------
  // Embedded video for the current class/mode, using the YouTube
  // IFrame API rather than a plain <iframe src="...">. Two reasons:
  // 1. cueVideoById() loads a video's thumbnail/metadata and gets it
  //    ready to play WITHOUT autoplaying it -- a plain iframe with
  //    ?autoplay=0 still sometimes autoplays depending on browser/
  //    embed settings, whereas "cue" (vs. "load") is explicitly the
  //    non-autoplaying variant.
  // 2. onStateChange lets us detect actual play/pause state, which
  //    drives the fade-in-when-playing behavior in style.css (see
  //    ".video-stage.playing"), not just hover.
  //
  // "Loading in the background" for a YouTube embed doesn't map onto
  // the same technique as preloading an image or .glb file -- you
  // can't pre-fetch a video's bytes without a player instance, and
  // instantiating 18 hidden players (one per class/mode) would be
  // wasteful and could itself trigger unwanted playback. The
  // equivalent here is starting the IFrame API script loading
  // immediately on page load (see loadYouTubeApi() near the bottom of
  // this file) rather than waiting for any interaction, so the player
  // itself is ready well before the visitor hovers or clicks it.
  // ---------------------------------------------------------------
  let ytPlayer = null;
  let pendingVideoId; // set if a class/mode is selected before the API finishes loading

  function applyVideoId(videoId) {
    if (videoStage) videoStage.classList.remove("playing");

    if (!ytPlayer || typeof ytPlayer.cueVideoById !== "function") {
      pendingVideoId = videoId;
      return;
    }

    if (videoId) {
      if (videoMissing) videoMissing.classList.remove("visible");
      ytPlayer.cueVideoById(videoId);
    } else {
      if (videoMissing) videoMissing.classList.add("visible");
      if (typeof ytPlayer.stopVideo === "function") ytPlayer.stopVideo();
    }
  }

  function initYouTubePlayer() {
    if (!window.YT || !window.YT.Player || !document.getElementById("videoFrame")) return;

    ytPlayer = new YT.Player("videoFrame", {
      host: "https://www.youtube-nocookie.com",
      playerVars: {
        rel: 0,
        modestbranding: 1,
        playsinline: 1
      },
      events: {
        onReady: () => {
          if (pendingVideoId !== undefined) {
            applyVideoId(pendingVideoId);
            pendingVideoId = undefined;
          }
        },
        onStateChange: (event) => {
          if (!videoStage || !window.YT) return;
          const isPlaying = event.data === YT.PlayerState.PLAYING;
          videoStage.classList.toggle("playing", isPlaying);
        }
      }
    });
  }

  // ---------------------------------------------------------------
  // A second, separate YouTube player for the Honorable Mentions
  // video slot -- using the real API (rather than a plain iframe)
  // here too, for consistency with the main video player.
  // ---------------------------------------------------------------
  let honorableYtPlayer = null;
  let honorablePendingVideoId = null;

  function initHonorableYouTubePlayer() {
    if (!window.YT || !window.YT.Player || !document.getElementById("honorableVideoFrame")) return;

    honorableYtPlayer = new YT.Player("honorableVideoFrame", {
      host: "https://www.youtube-nocookie.com",
      playerVars: {
        rel: 0,
        modestbranding: 1,
        playsinline: 1
      },
      events: {
        onReady: () => {
          if (honorablePendingVideoId) {
            honorableYtPlayer.cueVideoById(honorablePendingVideoId);
            honorablePendingVideoId = null;
          }
        }
      }
    });
  }

  function loadYouTubeApi() {
    function initBoth() {
      initYouTubePlayer();
      initHonorableYouTubePlayer();
    }
    if (window.YT && window.YT.Player) {
      initBoth();
      return;
    }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = initBoth;
  }

  if (modelViewer) {
    modelViewer.addEventListener("error", () => {
      if (modelPlaceholder && modelViewer.getAttribute("src") === requestedSrc) {
        modelPlaceholder.classList.add("visible");
      }
      // Even if the initial model fails to load, still kick off
      // background preloading rather than waiting forever for a
      // "load" event that will never come.
      if (!hasStartedPreload) {
        hasStartedPreload = true;
        preloadAllAssets();
      }
    });

    modelViewer.addEventListener("load", () => {
      if (modelViewer.getAttribute("src") !== requestedSrc) return;

      if (modelPlaceholder) modelPlaceholder.classList.remove("visible");

      // Some .glb files don't have a clip literally named "Stand" (or
      // whatever this class/mode's "animation" field says) -- their
      // idle animation might be called something else entirely. Try a
      // short list of common alternates before giving up, and if none
      // match, log the file's real animation names so you know exactly
      // what to put in CLASS_DATA's "animation" field for this entry.
      const available = modelViewer.availableAnimations || [];

      if (available.includes(requestedAnimation)) {
        modelViewer.animationName = requestedAnimation;
        return;
      }

      const fallback = ANIMATION_FALLBACKS.find((name) => available.includes(name));
      if (fallback) {
        modelViewer.animationName = fallback;
        console.warn(
          `"${requestedSrc}" has no "${requestedAnimation}" animation. Using "${fallback}" instead. ` +
          `Set animation: "${fallback}" for this class/mode in CLASS_DATA to make this permanent and remove this warning.`
        );
      } else {
        console.warn(
          `"${requestedSrc}" has no "${requestedAnimation}" animation and none of the common fallbacks matched either. ` +
          `It's currently playing "${modelViewer.availableAnimations ? modelViewer.availableAnimations[0] : "(unknown)"}" (the file's first animation) instead. ` +
          `Available animations in this file: [${available.join(", ")}]. ` +
          `Set animation: "<one of those>" for this class/mode in CLASS_DATA to fix it.`
        );
      }

      // Once the very first model (whatever's shown on page load) has
      // finished loading, quietly start preloading everything else in
      // the background -- this way the initial model isn't competing
      // for bandwidth with 17 other downloads at the same time.
      if (!hasStartedPreload) {
        hasStartedPreload = true;
        preloadAllAssets();
      }
    });
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.mode === currentMode) return; // already selected -- avoid a pointless re-fade
      currentMode = btn.dataset.mode;
      updateView();
    });
  });

  classButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.class === currentClass) return; // already selected -- avoid a pointless re-fade
      currentClass = btn.dataset.class;
      updateView();
    });
  });

  // ---------------------------------------------------------------
  // Honorable Mentions scene. Slides in/out via the "honorable-open"
  // class on <body> (see style.css for the actual slide transition).
  // Clicking a class in the vertical icon column renders that class's
  // HONORABLE_MENTIONS entries into the Fun (left) and Skill (right)
  // lists. Clicking a name expands it in place to reveal its lore
  // text and (if set) an embedded video -- built as a plain iframe
  // rather than the YouTube IFrame API used on the main scene, since
  // there can be many of these and only ever one is expanded at a
  // time, so the simpler approach is enough here. The iframe's src is
  // only set when an entry is expanded (never before), which means
  // nothing autoplays and nothing loads until it's actually opened.
  // ---------------------------------------------------------------
  function renderHonorableList(container, entries) {
    if (!container) return;

    if (!entries || entries.length === 0) {
      container.innerHTML = '<p class="honorable-placeholder"></p>';
      return;
    }

    // Entries only ever contain the name button now -- video and lore
    // are both handled by shared, top-level elements (the video
    // overlay and the note slot respectively) positioned via JS from
    // the clicked entry's own position, rather than living nested
    // inside this list. That sidesteps clipping/overflow problems
    // entirely: nothing here needs to escape this list's bounds.
    container.innerHTML = entries
      .map(
        (entry, i) =>
          `<div class="honorable-entry" data-index="${i}">` +
          `<div class="honorable-entry-box">` +
          `<button type="button" class="honorable-entry-name">${escapeHtml(entry.name)}</button>` +
          `</div>` +
          `</div>`
      )
      .join("");
  }

  // Every box across BOTH lists shares one single uniform width, sized
  // to whichever name is longest overall -- not just the longest
  // within its own side. Deferred to the next frame (rather than
  // measuring immediately after setting innerHTML) so the browser has
  // definitely finished laying out the new content first.
  // The box width is the SAME constant for every class, not
  // recalculated per class -- otherwise a class with a short longest
  // name would show narrower boxes than one with a long longest name.
  // Measured once (lazily, cached) across every name in every class's
  // skill and fun arrays combined, using a detached element styled
  // identically to a real entry name so the measurement matches
  // exactly (same font, weight, padding).
  let globalEntryBoxWidth = null;

  function computeGlobalEntryBoxWidth() {
    if (globalEntryBoxWidth !== null) return globalEntryBoxWidth;

    const measurer = document.createElement("button");
    measurer.className = "honorable-entry-name";
    measurer.style.position = "absolute";
    measurer.style.visibility = "hidden";
    measurer.style.width = "auto";
    measurer.style.whiteSpace = "nowrap";
    measurer.style.pointerEvents = "none";
    document.body.appendChild(measurer);

    let maxWidth = 0;
    Object.values(HONORABLE_MENTIONS).forEach((classData) => {
      ["skill", "fun"].forEach((mode) => {
        (classData[mode] || []).forEach((entry) => {
          measurer.textContent = entry.name;
          maxWidth = Math.max(maxWidth, measurer.getBoundingClientRect().width);
        });
      });
    });

    document.body.removeChild(measurer);
    globalEntryBoxWidth = maxWidth;
    return globalEntryBoxWidth;
  }

  function applyUniformEntryBoxWidth() {
    const width = computeGlobalEntryBoxWidth();
    const boxes = document.querySelectorAll(
      "#honorableListFun .honorable-entry-box, #honorableListSkill .honorable-entry-box"
    );
    boxes.forEach((box) => {
      box.style.width = width + "px";
    });
    // Fun/Skill headers share the boxes' exact width and left/right
    // anchor (see .honorable-header-fun/-skill in style.css), so
    // giving them this same width centers them under the name boxes
    // rather than just aligning a shared edge.
    [honorableHeaderFun, honorableHeaderSkill].forEach((header) => {
      if (header) header.style.width = width + "px";
    });
  }

  // Positions the note to the right of the given class's icon.
  // Hides the lore note box -- shared by "no entry selected yet",
  // "switched to a different class", and "this entry has no lore".
  function hideLoreNote() {
    if (!honorableNote) return;
    honorableNote.textContent = "";
    honorableNote.classList.remove("visible");
  }

  function renderHonorableLists(className) {
    const data = HONORABLE_MENTIONS[className];
    if (!data) return;
    renderHonorableList(honorableListFun, data.fun);
    renderHonorableList(honorableListSkill, data.skill);
    applyUniformEntryBoxWidth();
    hideLoreNote(); // no character selected yet in the newly-picked class
  }

  // The video slot is centered on screen via CSS now, so showing it
  // is just cueing the video and toggling visibility -- no position
  // to compute.
  function showVideoOverlay(videoId) {
    if (!honorableVideoOverlay) return;
    if (honorableYtPlayer && typeof honorableYtPlayer.cueVideoById === "function") {
      honorableYtPlayer.cueVideoById(videoId);
    } else {
      honorablePendingVideoId = videoId;
    }
    honorableVideoOverlay.classList.add("visible");
  }

  function hideVideoOverlay() {
    if (!honorableVideoOverlay) return;
    honorableVideoOverlay.classList.remove("visible");
    if (honorableYtPlayer && typeof honorableYtPlayer.stopVideo === "function") {
      honorableYtPlayer.stopVideo();
    }
    honorablePendingVideoId = null;
  }

  // Expand/collapse entries via event delegation, since the list
  // contents are rebuilt from scratch every time a class is picked.
  // Clicking a name controls both the video slot and the lore note
  // box -- each entry's own "lore" field, not a class-level ambient
  // note, drives what shows in that box now.
  [honorableListFun, honorableListSkill].forEach((list) => {
    if (!list) return;
    const sideKey = list === honorableListFun ? "fun" : "skill";

    list.addEventListener("click", (e) => {
      const nameBtn = e.target.closest(".honorable-entry-name");
      if (!nameBtn) return;

      const entry = nameBtn.closest(".honorable-entry");
      const alreadyOpen = entry.classList.contains("expanded");

      list.querySelectorAll(".honorable-entry.expanded").forEach((el) => el.classList.remove("expanded"));

      if (alreadyOpen) {
        hideVideoOverlay();
        hideLoreNote();
        return;
      }

      entry.classList.add("expanded");

      const index = parseInt(entry.dataset.index, 10);
      const entryData = HONORABLE_MENTIONS[currentHonorableClass] && HONORABLE_MENTIONS[currentHonorableClass][sideKey][index];

      if (entryData && entryData.video) {
        showVideoOverlay(entryData.video);
      } else {
        hideVideoOverlay();
      }

      const entryLore = entryData && entryData.lore && entryData.lore.trim();
      if (entryLore) {
        honorableNote.textContent = entryLore;
        honorableNote.classList.add("visible");
      } else {
        hideLoreNote();
      }
    });
  });

  let currentHonorableClass = null;

  honorableClassButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      honorableClassButtons.forEach((b) => b.classList.toggle("active", b === btn));
      currentHonorableClass = btn.dataset.class;
      if (honorableScene) honorableScene.dataset.class = currentHonorableClass;
      hideVideoOverlay();
      renderHonorableLists(currentHonorableClass);
    });
  });

  if (honorableBtn) {
    honorableBtn.addEventListener("click", () => {
      body.classList.add("honorable-open");
      // Sizes the Fun/Skill headers up front, rather than leaving them
      // at their tiny text-only default width until the first class
      // click renders entries and triggers this same sizing.
      applyUniformEntryBoxWidth();
    });
  }

  if (honorableBackBtn) {
    honorableBackBtn.addEventListener("click", () => {
      body.classList.remove("honorable-open");
      hideVideoOverlay();
    });
  }

  updateView();
  loadYouTubeApi();
})();

window.addEventListener('wheel', (event) => {
  // Check if the user scrolled down
  if (event.deltaY > 0) {
    document.getElementById('honorableBtn').click();
  } else if (event.deltaY < 0)
    document.getElementById('honorableBackBtn').click();
    
}, { passive: false }); // { passive: false } is REQUIRED to allow event.preventDefault()

const button = document.querySelector('.honorable-class-btn');
const apple = document.getElementById('apple-follower');

let delayTimer; // Variable to store the timeout ID

button.addEventListener('mouseenter', () => {
  // Clear any existing timer just in case
  clearTimeout(delayTimer);
  
  // Set a delay of 500 milliseconds (0.5 seconds) before showing
  delayTimer = setTimeout(() => {
    apple.style.display = 'block';
  }, 6700); 
});

button.addEventListener('mousemove', (e) => {
  // Keep updating the position while moving
  apple.style.transform = `translate(${e.clientX - 0}px, ${e.clientY - 390}px)`;
});

button.addEventListener('mouseleave', () => {
  // Cancel the timer if the user leaves before the delay finishes
  clearTimeout(delayTimer);
  
  // Hide the apple
  apple.style.display = 'none';
});

const homeBtn = document.getElementById('homeBtn');
homeBtn.addEventListener('click', () => {
  window.location.href = "index.html"
  });
