(function () {
  "use strict";

  var total = EXAM.totalMarks;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var esc = function (text) {
    return String(text).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* ---------------- ranking ---------------- */
  var ranked = (function () {
    /* marks only: ties keep the order in which they were entered */
    var sorted = STUDENTS.slice().sort(function (a, b) {
      return b.marks - a.marks;
    });
    var lastMarks = null;
    var lastRank = 0;
    return sorted.map(function (s, i) {
      var rank = s.marks === lastMarks ? lastRank : i + 1;
      lastMarks = s.marks;
      lastRank = rank;
      return {
        roll: s.roll,
        name: s.name,
        marks: s.marks,
        cls: s.cls ? String(s.cls) : "",
        photo: s.photo || "",
        rank: rank,
        percent: (s.marks / total) * 100
      };
    });
  })();

  /* classes offered in the filter: taken from EXAM.classes (classes 6-10),
     or from the student data when that list is missing */
  var CLASSES = (function () {
    var list = EXAM.classes && EXAM.classes.length ? EXAM.classes : (function () {
      var seen = {};
      ranked.forEach(function (s) { if (s.cls) seen[s.cls] = true; });
      return Object.keys(seen);
    })();
    var seen = {};
    return list.map(String).filter(function (c) {
      if (!c || seen[c]) return false;
      seen[c] = true;
      return true;
    }).sort(function (a, b) {
      var na = parseFloat(a), nb = parseFloat(b);
      if (!isNaN(na) && !isNaN(nb) && na !== nb) return na - nb;
      return a.localeCompare(b);
    });
  })();

  /* ---------------- statistics ---------------- */
  var stats = (function () {
    var sum = ranked.reduce(function (t, s) { return t + s.marks; }, 0);
    var top = ranked[0];
    var passMark = Math.ceil(total * 0.4);
    return {
      appeared: ranked.length,
      highest: top ? top.marks : 0,
      highestPercent: top ? top.percent : 0,
      average: ranked.length ? (sum / (ranked.length * total)) * 100 : 0,
      passed: ranked.filter(function (s) { return s.marks >= passMark; }).length
    };
  })();

  var topThree = ranked.slice(0, 3);

  /* ranks 1-10 including everyone who shares 10th place */
  var topTens = ranked.filter(function (s) { return s.rank <= 10; });
  var restOfList = ranked.filter(function (s) { return s.rank > 10; });

  /* ---------------- helpers ---------------- */
  function rollLabel(s) {
    return s.roll ? "Roll No. " + esc(s.roll) : "Roll No. not given";
  }

  function initials(name) {
    return name.trim().split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0); }).join("").toUpperCase();
  }

  function hueFor(name) {
    var h = 0;
    for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
    return h;
  }

  function avatar(s, size) {
    var cls = "avatar" + (size ? " avatar-" + size : "");
    if (s.photo) return '<img class="' + cls + '" src="' + esc(s.photo) + '" alt="" loading="lazy" />';
    return '<span class="' + cls + '" style="--h:' + hueFor(s.name) + '" aria-hidden="true">' + initials(s.name) + "</span>";
  }

  var ICON = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>',
    chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5 8 12l7 7"/></svg>',
    chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>',
    filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M7 12h10M10 17h4"/></svg>',
    print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 9V4h10v5"/><path d="M7 18H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v6H7z"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H6M11 6l-6 6 6 6"/></svg>'
  };

  var PLACE = ["First", "Second", "Third"];
  var ORDINAL = ["1st", "2nd", "3rd"];
  var PHOTO_POS = ["50% 20%", "52% 14%", "50% 24%"];

  /* ---------------- home: hero slider ---------------- */
  function heroSlide() {
    return '<article class="slide slide-hero" aria-roledescription="slide" aria-label="1 of 4">' +
      '<img class="slide-bg" src="' + esc(EXAM.heroImage) + '" alt="' + esc(EXAM.heroImageAlt) + '" />' +
      '<span class="slide-scrim" aria-hidden="true"></span>' +
      '<div class="hero-copy">' +
        '<img class="hero-emblem" src="' + esc(EXAM.monLogo) + '" alt="MON JAI XI emblem" width="96" height="96" />' +
        '<p class="kicker kicker-light"><span class="kicker-dot"></span>Session ' + EXAM.session + '<span class="kicker-sep">/</span>Merit list published</p>' +
        '<h1 class="hero-title"><span class="t-main">Bidya Sankalpa</span><span class="t-sub">Scholarship Examination</span></h1>' +
        '<p class="byline">by <strong>MON JAI XI</strong></p>' +
        '<p class="hero-school">' + EXAM.school + "</p>" +
        '<div class="hero-actions">' +
          '<a class="btn btn-light" href="#results">View the results' + ICON.arrow + "</a>" +
          '<a class="link-light" href="#answers">Answer sheet</a>' +
        "</div>" +
      "</div>" +
      '<p class="slide-caption">' + stats.appeared + " candidates &middot; " + total + " marks &middot; Session " + EXAM.session + "</p>" +
    "</article>";
  }

  function topperSlide(s, i) {
    return '<article class="slide slide-topper" aria-roledescription="slide" aria-label="' + (i + 2) + ' of 4">' +
      '<div class="topper-photo">' +
        (s.photo
          ? '<img src="' + esc(s.photo) + '" alt="' + esc(s.name) + '" style="object-position:' + PHOTO_POS[i] + '" />'
          : '<span class="topper-monogram" aria-hidden="true">' + initials(s.name) + "</span>") +
        '<span class="rank-chip"><small>Rank</small>' + (i + 1) + "</span>" +
      "</div>" +
      '<div class="topper-body">' +
        '<p class="kicker">' + PLACE[i] + " position &middot; Session " + EXAM.session + "</p>" +
        '<h2 class="topper-name">' + esc(s.name) + "</h2>" +
        '<p class="topper-roll">' + rollLabel(s) + " &middot; Pathsala Public School</p>" +
        '<dl class="topper-facts">' +
          "<div><dt>Marks obtained</dt><dd>" + s.marks + "<small>/" + total + "</small></dd></div>" +
          "<div><dt>Percentage</dt><dd>" + s.percent.toFixed(1) + "%</dd></div>" +
        "</dl>" +
        '<a class="btn btn-ghost btn-sm" href="#results">View the merit list' + ICON.arrow + "</a>" +
      "</div>" +
    "</article>";
  }

  function slider() {
    return '<section class="showcase" aria-roledescription="carousel" aria-label="Rank holders of the scholarship examination">' +
      '<div class="slides" id="slides">' + heroSlide() + topThree.map(topperSlide).join("") + "</div>" +
      '<div class="slider-nav">' +
        '<button class="slider-btn" type="button" data-dir="-1" aria-label="Previous slide">' + ICON.chevronLeft + "</button>" +
        '<div class="dots" id="dots" aria-label="Choose slide"></div>' +
        '<button class="slider-btn" type="button" data-dir="1" aria-label="Next slide">' + ICON.chevronRight + "</button>" +
      "</div>" +
    "</section>";
  }

  function highlights() {
    return '<ul class="highlights">' +
      "<li><span>Candidates</span><strong>" + stats.appeared + "</strong></li>" +
      "<li><span>Highest score</span><strong>" + stats.highest + "<small>/" + total + "</small></strong></li>" +
      "<li><span>School average</span><strong>" + stats.average.toFixed(1) + "%</strong></li>" +
      "<li><span>Answer key</span><strong>Published</strong></li>" +
    "</ul>";
  }

  function desk() {
    return '<section class="desk">' +
      '<div class="section-head">' +
        "<h2>Examination desk</h2>" +
        '<span class="rule"></span>' +
        '<span class="sh-meta">Session ' + EXAM.session + "</span>" +
      "</div>" +

      '<a class="notice" href="#results">' +
        '<span class="notice-num">01</span>' +
        '<span class="notice-body">' +
          '<span class="notice-kicker">Merit list</span>' +
          '<span class="notice-title">' + EXAM.resultLabel + "</span>" +
          '<span class="notice-desc">Rank holders, the complete merit list, and your own statement of marks by name or roll number.</span>' +
        "</span>" +
        '<span class="notice-meta"><span>' + stats.appeared + " candidates</span><span>" + total + " marks</span></span>" +
        '<span class="notice-arrow">' + ICON.arrow + "</span>" +
      "</a>" +

      '<a class="notice" href="#answers">' +
        '<span class="notice-num">02</span>' +
        '<span class="notice-body">' +
          '<span class="notice-kicker">Answer key</span>' +
          '<span class="notice-title">' + EXAM.answerLabel + "</span>" +
          '<span class="notice-desc">Correct options for all ' + EXAM.totalQuestions + " questions, published for reference.</span>" +
        "</span>" +
        '<span class="notice-meta"><span>' + EXAM.totalQuestions + " questions</span><span>" + total + " marks</span></span>" +
        '<span class="notice-arrow">' + ICON.arrow + "</span>" +
      "</a>" +
    "</section>";
  }

  function home() {
    return slider() + highlights() + desk() +
      '<p class="note note-left">The merit list is provisional until verified by the examination desk.</p>';
  }

  /* ---------------- results ---------------- */
  function honourCard(s, place) {
    if (!s) return "";
    return '<article class="honour' + (place === 1 ? " is-first" : "") + '">' +
      '<span class="honour-place">' + PLACE[place - 1] + " position</span>" +
      '<span class="honour-rank">' + place + "</span>" +
      '<span class="honour-name">' + esc(s.name) + "</span>" +
      '<span class="honour-roll">' + rollLabel(s) + "</span>" +
      '<span class="honour-score">' + s.marks + '<small>/' + total + "</small></span>" +
      '<span class="honour-bar"><i style="width:' + s.percent.toFixed(1) + '%"></i></span>' +
      '<span class="honour-pct">' + s.percent.toFixed(1) + "%</span>" +
    "</article>";
  }

  function rowMeta(s) {
    return rollLabel(s) + (s.cls ? " &middot; Class " + esc(s.cls) : "");
  }

  function row(s) {
    return '<div class="row">' +
      '<span class="rank' + (s.rank <= 3 ? " is-top" : "") + '">' + (s.rank <= 10 ? s.rank : "&mdash;") + "</span>" +
      '<span class="who">' + avatar(s, "sm") + '<span class="who-txt"><strong>' + esc(s.name) + "</strong><small>" + rowMeta(s) + "</small></span></span>" +
      '<span class="score">' + s.marks + '<small>/' + total + "</small></span>" +
      '<span class="pct">' + s.percent.toFixed(1) + "%</span>" +
    "</div>";
  }

  function tableHead() {
    return '<div class="row row-head"><span>Rank</span><span>Student</span><span>Marks</span><span>Percent</span></div>';
  }

  function results() {
    return '' +
    '<div class="crumb"><a href="#home">' + ICON.back + "Home</a></div>" +

    '<header class="page-title">' +
      '<p class="kicker kicker-quiet">Session ' + EXAM.session + " &middot; Pathsala Public School</p>" +
      "<h2>" + EXAM.resultLabel + "</h2>" +
      "<p>Compiled from the evaluated answer scripts of every candidate, on one common merit list for classes 6 to 10.</p>" +
    "</header>" +

    '<section class="stats">' +
      '<div class="stat"><span>Students appeared</span><strong>' + stats.appeared + "</strong></div>" +
      '<div class="stat"><span>Highest score</span><strong>' + stats.highest + "<small>/" + total + "</small></strong></div>" +
      '<div class="stat"><span>School average</span><strong>' + stats.average.toFixed(1) + "%</strong></div>" +
      '<div class="stat"><span>Passed</span><strong>' + stats.passed + "<small>of " + stats.appeared + "</small></strong></div>" +
    "</section>" +

    '<section class="honour-board" aria-label="Top three rank holders">' +
      honourCard(topThree[0], 1) + honourCard(topThree[1], 2) + honourCard(topThree[2], 3) +
    "</section>" +

    '<section class="panel search-panel">' +
      '<div class="panel-head">' +
        "<h3>Search your result</h3>" +
      "</div>" +
      '<form id="searchForm" class="search-form" role="search">' +
        '<label class="field">' +
          '<span class="field-icon">' + ICON.search + "</span>" +
          '<input id="searchInput" type="search" placeholder="Your name or roll number" autocomplete="off" aria-label="Search by name or roll number" />' +
        "</label>" +
        (CLASSES.length ?
          '<label class="field field-select">' +
            '<span class="field-icon">' + ICON.filter + "</span>" +
            '<select id="classSelect" aria-label="Show the results of one class">' +
              '<option value="">All classes</option>' +
              CLASSES.map(function (c) { return '<option value="' + esc(c) + '">Class ' + esc(c) + "</option>"; }).join("") +
            "</select>" +
          "</label>" : "") +
        '<button class="btn" type="submit">Search</button>' +
      "</form>" +
      '<div id="searchResult" class="search-result" hidden></div>' +
    "</section>" +

    '<p class="reject-note"><strong>Not in the list?</strong> Search your name or roll number above to see your statement of marks. If your name or roll number does not appear anywhere in this merit list, your candidature stands rejected &mdash; For not follow the instructions.</p>' +

    '<section class="panel">' +
      '<div class="panel-head"><h3>Top 10 results</h3><span class="panel-hint">Ranks 1&ndash;10</span></div>' +
      '<div class="table">' + tableHead() + topTens.map(row).join("") + "</div>" +
    "</section>" +

    (restOfList.length ?
      '<section class="panel">' +
        '<div class="panel-head"><h3>Complete merit list</h3><span class="panel-hint">Not ranked</span></div>' +
        '<div class="table">' + tableHead() + restOfList.map(row).join("") + "</div>" +
      "</section>" : "") +

          '<p class="note">Only the top 10 candidates are ranked; the rest of the list is published in order of total marks on one common merit list for classes 6 to 10, and candidates with equal marks share a rank. Choose a class above the list to see that class on its own.</p>';
  }

  /* ---------------- marksheet ---------------- */
  function marksheet(s) {
    var passed = s.marks >= Math.ceil(total * 0.4);
    return '<article class="marksheet">' +
      '<header class="ms-head">' +
        '<img class="ms-logo" src="' + esc(EXAM.logo) + '" alt="" />' +
        '<div class="ms-id"><strong>' + EXAM.title + "</strong><span>" + EXAM.school + " &middot; SESSION " + EXAM.session + "</span></div>" +
        '<span class="ms-type">Statement of Marks</span>' +
      "</header>" +

      '<div class="ms-fields">' +
        '<div class="ms-field"><span>Candidate</span><strong>' + esc(s.name) + "</strong></div>" +
        '<div class="ms-field"><span>Roll No.</span><strong>' + (s.roll ? esc(s.roll) : "Not given") + "</strong></div>" +
        '<div class="ms-field"><span>Class</span><strong>' + (s.cls ? esc(s.cls) : "&mdash;") + "</strong></div>" +
        '<div class="ms-field"><span>Rank</span><strong>' + (s.rank <= 10 ? s.rank + " of " + ranked.length : "Not ranked") + "</strong></div>" +
        '<div class="ms-field"><span>Status</span><strong class="' + (passed ? "ok" : "no") + '">' + (passed ? "Passed" : "Not passed") + "</strong></div>" +
      "</div>" +

      '<div class="ms-scores">' +
        '<div class="ms-cell"><span>Marks obtained</span><strong>' + s.marks + "<small>/" + total + "</small></strong></div>" +
        '<div class="ms-cell"><span>Percentage</span><strong>' + s.percent.toFixed(1) + "%</strong></div>" +
      "</div>" +

      '<footer class="ms-foot">' +
        "<p>Marks obtained are out of a total of " + total + ".</p>" +
        '<button class="btn btn-ghost btn-sm" id="printBtn" type="button">' + ICON.print + "Print / Save PDF</button>" +
      "</footer>" +
    "</article>";
  }

  /* ---------------- search behaviour ---------------- */
  function bindSearch() {
    var form = document.getElementById("searchForm");
    if (!form) return;

    var input = document.getElementById("searchInput");
    var select = document.getElementById("classSelect");
    var box = document.getElementById("searchResult");

    function normalize(text) { return text.trim().toLowerCase().replace(/^0+(?=\d)/, ""); }
    function chosenClass() { return select ? select.value : ""; }

    function candidates() {
      var cls = chosenClass();
      return cls ? ranked.filter(function (s) { return s.cls === cls; }) : ranked;
    }

    function classTable(list) {
      return '<div class="class-bar">' +
        '<span class="class-bar-title">Class ' + esc(chosenClass()) + " results</span>" +
        '<span class="class-bar-meta">' + list.length + (list.length === 1 ? " candidate" : " candidates") + " &middot; common merit list</span>" +
      "</div>" +
      '<div class="table">' + tableHead() + list.map(row).join("") + "</div>";
    }

    function show(query) {
      var term = query.trim().toLowerCase();
      var cls = chosenClass();

      if (!term && !cls) { box.hidden = true; box.innerHTML = ""; return; }

      var list = candidates();
      var matches = list;

      if (term) {
        var byRoll = list.filter(function (s) { return normalize(s.roll) === normalize(term); });
        matches = byRoll.length ? byRoll : list.filter(function (s) {
          return s.name.toLowerCase().indexOf(term) !== -1;
        });
      }

      box.hidden = false;

      if (!matches.length) {
        if (!term && !list.length) {
          box.innerHTML = '<p class="empty">No candidate from Class ' + esc(cls) +
            " appeared in this examination. Choose another class to see its results.</p>";
          return;
        }

        box.innerHTML = '<p class="empty">No candidate found' + (cls ? " in Class " + esc(cls) : "") +
          (term ? " for &ldquo;" + esc(query.trim()) + "&rdquo;" : "") +
          ". Check the spelling of the name, the roll number or the class and try again.</p>";
        return;
      }

      if (!term) { box.innerHTML = classTable(matches); return; }

      box.innerHTML = matches.slice(0, 4).map(marksheet).join("") +
        (matches.length > 1 ? '<p class="multi">' + matches.length + " candidates matched. Choose a class above to narrow it down.</p>" : "");

      var printBtn = document.getElementById("printBtn");
      if (printBtn) printBtn.addEventListener("click", function () { window.print(); });
    }

    form.addEventListener("submit", function (e) { e.preventDefault(); show(input.value); });

    if (select) {
      select.addEventListener("change", function () { show(input.value); });
    }

    input.addEventListener("input", function () {
      if (input.value.trim().length >= 2 || chosenClass()) show(input.value);
      else { box.hidden = true; box.innerHTML = ""; }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
      }
    });
  }

  /* ---------------- answer sheet ---------------- */
  function answers() {
    var counts = { A: 0, B: 0, C: 0, D: 0 };
    ANSWER_KEY.forEach(function (a) { if (counts[a] !== undefined) counts[a]++; });
    var max = Math.max(counts.A, counts.B, counts.C, counts.D);

    var bars = Object.keys(counts).map(function (k) {
      return '<div class="dist-row">' +
        '<span class="dist-key">' + k + "</span>" +
        '<span class="dist-bar"><i style="width:' + Math.round((counts[k] / max) * 100) + '%"></i></span>' +
        '<span class="dist-val">' + counts[k] + "</span>" +
      "</div>";
    }).join("");

    var keys = ANSWER_KEY.map(function (a, i) {
      return '<li class="key"><span class="key-q">' + String(i + 1).padStart(2, "0") + '</span><span class="key-a">' + esc(a) + "</span></li>";
    }).join("");

    return '' +
    '<div class="crumb"><a href="#home">' + ICON.back + "Home</a></div>" +

    '<header class="page-title">' +
      '<p class="kicker kicker-quiet">Answer key &middot; Session ' + EXAM.session + "</p>" +
      "<h2>" + EXAM.answerLabel + "</h2>" +
      "<p>Correct options for all " + EXAM.totalQuestions + " questions, published for reference.</p>" +
    "</header>" +

    '<section class="panel answer-panel">' +
      '<div class="panel-head"><h3>Correct options</h3><span class="panel-hint">Q1 &ndash; Q' + EXAM.totalQuestions + "</span></div>" +
      '<div class="key-wrap">' +
        '<ol class="key-grid">' + keys + "</ol>" +
        '<aside class="dist">' +
          "<h4>Option distribution</h4>" + bars +
          '<p class="dist-note">Count of correct answers per option across the paper.</p>' +
        "</aside>" +
      "</div>" +
    "</section>" +

    '<p class="note">In case of any discrepancy, the official answer key of the examination cell shall be final.</p>';
  }

  /* ---------------- slider ---------------- */
  function initSlider() {
    var root = document.querySelector(".showcase");
    if (!root) return;

    var track = root.querySelector("#slides");
    var slides = Array.prototype.slice.call(track.children);
    var dotsWrap = root.querySelector("#dots");
    var index = 0;
    var timer = null;

    slides.forEach(function (s, i) {
      s.setAttribute("role", "group");
      s.setAttribute("aria-label", (i + 1) + " of " + slides.length);
    });

    var dots = slides.map(function (_, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "dot";
      b.setAttribute("aria-label", "Go to slide " + (i + 1));
      b.addEventListener("click", function () { go(i); restart(); });
      dotsWrap.appendChild(b);
      return b;
    });

    function setActive(i) {
      index = i;
      dots.forEach(function (d, n) {
        d.classList.toggle("is-active", n === i);
        d.setAttribute("aria-current", n === i ? "true" : "false");
      });
      slides.forEach(function (s, n) { s.classList.toggle("is-active", n === i); });
    }

    function go(i) {
      var next = (i + slides.length) % slides.length;
      track.scrollTo({ left: next * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
      setActive(next);
    }

    function tick() {
      var current = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
      go(current + 1);
    }

    function start() {
      stop();
      if (!document.body.classList.contains("is-loaded")) return;
      timer = window.setInterval(tick, 3000);
    }

    function stop() { if (timer) { window.clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    track.addEventListener("scroll", function () {
      var i = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
      if (i !== index) setActive(i);
    }, { passive: true });

    root.querySelectorAll(".slider-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        go(index + Number(btn.getAttribute("data-dir")));
        restart();
      });
    });

    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); restart(); }
      if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); restart(); }
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });

    document.addEventListener("site:ready", start);

    setActive(0);
  }

  /* ---------------- sponsor popup ---------------- */
  var PROMO_FIRST = 400;
  var PROMO_EVERY = 30000;

  function initPromo() {
    var root = document.getElementById("promo");
    if (!root) return;

    var closeBtn = root.querySelector(".promo-close");
    var lastFocus = null;
    var promoTimer = null;

    function open() {
      if (!root.hidden || document.hidden) return;
      lastFocus = document.activeElement;
      root.hidden = false;
      document.body.classList.add("has-promo");
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      if (root.hidden) return;
      root.hidden = true;
      document.body.classList.remove("has-promo");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
      lastFocus = null;
    }

    root.addEventListener("click", function (e) {
      if (e.target.closest("[data-promo-close]")) close();
    });

    root.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { close(); return; }
      if (e.key !== "Tab") return;
      var items = Array.prototype.slice.call(root.querySelectorAll("a[href], button"));
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    document.addEventListener("site:ready", function () {
      window.setTimeout(function () {
        open();
        promoTimer = window.setInterval(open, PROMO_EVERY);
      }, PROMO_FIRST);
    });

    /* keep the rotation running even when the tab was hidden during load */
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) restartPromo();
    });

    function restartPromo() {
      if (promoTimer) window.clearInterval(promoTimer);
      promoTimer = window.setInterval(open, PROMO_EVERY);
    }
  }

  /* ---------------- preloader ---------------- */
  function initPreloader() {
    var el = document.getElementById("preloader");
    if (!el) return;
    var delay = reduceMotion ? 400 : 2300;
    window.setTimeout(function () {
      el.classList.add("is-done");
      document.body.classList.add("is-loaded");
      document.dispatchEvent(new Event("site:ready"));
      window.setTimeout(function () { el.remove(); }, 900);
    }, delay);
  }

  /* ---------------- router ---------------- */
  var app = document.getElementById("view");

  function render() {
    var hash = (location.hash || "#home").replace("#", "") || "home";

    if (hash === "results") {
      app.innerHTML = results();
      bindSearch();
    } else if (hash === "answers") {
      app.innerHTML = answers();
    } else {
      app.innerHTML = home();
      initSlider();
    }

    document.querySelectorAll(".head-nav .nav-link").forEach(function (a) {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + hash);
    });

    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", render);

  initPromo();
  initPreloader();
  render();
})();
