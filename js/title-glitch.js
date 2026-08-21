// Glitches the BROWSER TAB TITLE (document.title) between your name
// and each practice label, using the given character set for the
// transition noise. The tab title is plain text only — no colors or
// HTML — so this updates the string directly rather than markup.
(function () {
  var CHARS = "`~!@$%^&*()_-+={}[]|\\:;\"',.<>?/";

  // Edit this list to change what the tab title cycles through.
  var PHRASES = [
    "Ali Azca",
    "Film Sound Designer",
    "Electronic Musician",
    "Multidisciplinary Artist",
    "ΣTC."
  ];

  var HOLD_MS = 1000;   // how long each phrase stays fully readable
  var FRAME_MS = 30;    // speed of the scramble (ms per frame)

  function scrambleTo(target, onDone) {
    var current = document.title;
    var length = Math.max(current.length, target.length);
    var startMs = [];
    var endMs = [];
    var scrambleChar = [];

    for (var i = 0; i < length; i++) {
      startMs[i] = Math.random() * 500;
      endMs[i] = startMs[i] + 300 + Math.random() * 500;
      scrambleChar[i] = null;
    }

    var animStart = null;
    var rafId = null;
    var finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      document.title = target;
      document.removeEventListener("visibilitychange", handleVisibility);
      if (onDone) onDone();
    }

    function handleVisibility() {
      // Tab just went to the background (or is already hidden) —
      // don't let a throttled timer leave the title half-scrambled.
      if (document.hidden) finish();
    }

    function step(timestamp) {
      if (document.hidden) { finish(); return; }
      if (animStart === null) animStart = timestamp;
      var elapsed = timestamp - animStart;

      var out = "";
      var complete = 0;

      for (var i = 0; i < length; i++) {
        var from = current[i] || "";
        var to = target[i] || "";

        if (elapsed >= endMs[i]) {
          complete++;
          out += to;
        } else if (elapsed >= startMs[i]) {
          if (!scrambleChar[i] || Math.random() < 0.3) {
            scrambleChar[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          out += scrambleChar[i];
        } else {
          out += from;
        }
      }

      document.title = out;

      if (complete === length) finish();
      else rafId = requestAnimationFrame(step);
    }

    document.addEventListener("visibilitychange", handleVisibility);

    if (document.hidden) {
      finish(); // tab already backgrounded: jump straight to the target
    } else {
      rafId = requestAnimationFrame(step);
    }
  }

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    // Respect the visitor's OS setting: no animation, just the name.
    document.title = PHRASES[1];
    return;
  }

  var counter = 0;
  function next() {
    scrambleTo(PHRASES[counter], function () {
      setTimeout(next, HOLD_MS, FRAME_MS);
    });
    counter = (counter + 1) % PHRASES.length;
  }

  next();
})();
