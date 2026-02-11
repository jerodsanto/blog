(function () {
  const GRID = 2;
  const MIN_WIDTH = 900;
  const STORAGE_KEY = "content-margin";

  const content = document.querySelector(".content");
  const dragme = document.getElementById("dragme");
  const clickSound = new Audio("/sounds/click.wav");
  const dingSound = new Audio("/sounds/shaboy.wav");

  let dragging = false;
  let soundEnabled = false;
  let startX, chSize, baseMarginCh, lastClamped;
  let minCh, maxCh, centerCh;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && window.innerWidth >= MIN_WIDTH)
      content.style.marginLeft = saved;
  } catch (e) {}

  function measureCh() {
    const el = document.createElement("span");
    el.style.cssText = "position:absolute;visibility:hidden;width:1ch";
    document.body.appendChild(el);
    const size = el.offsetWidth;
    el.remove();
    return size;
  }

  function cssMarginCh() {
    const prev = content.style.marginLeft;
    content.style.marginLeft = "";
    const ch = Math.round(
      parseFloat(getComputedStyle(content).marginLeft) / chSize,
    );
    content.style.marginLeft = prev;
    return ch;
  }

  function snap(px) {
    return Math.round(px / (chSize * GRID)) * GRID;
  }

  function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  dragme.addEventListener("mousedown", (e) => {
    if (window.innerWidth < MIN_WIDTH) return;
    dragging = true;
    soundEnabled = true;
    content.style.transition = "none";
    startX = e.clientX;
    chSize = measureCh();
    baseMarginCh = Math.round(
      parseFloat(getComputedStyle(content).marginLeft) / chSize,
    );
    lastClamped = baseMarginCh;

    const defaultCh = cssMarginCh();
    minCh = defaultCh;
    const bodyStyle = getComputedStyle(document.body);
    const available =
      document.body.clientWidth -
      parseFloat(bodyStyle.paddingLeft) -
      parseFloat(bodyStyle.paddingRight);
    maxCh =
      Math.floor(
        (available - content.offsetWidth - defaultCh * chSize) /
          (chSize * GRID),
      ) * GRID;
    maxCh = Math.max(minCh, maxCh);
    centerCh = Math.round((minCh + maxCh) / (GRID * 2)) * GRID;
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const clamped = clamp(
      baseMarginCh + snap(e.clientX - startX),
      minCh,
      maxCh,
    );
    if (clamped !== lastClamped) {
      if (soundEnabled) {
        const sound = clamped === centerCh ? dingSound : clickSound;
        setTimeout(() => {
          sound.currentTime = 0;
          sound.play();
        }, 30);
      }
      lastClamped = clamped;
    }
    content.style.marginLeft = clamped + "ch";
  });

  document.addEventListener("mouseup", () => {
    if (!dragging) return;
    dragging = false;
    content.style.transition = "";
    try {
      localStorage.setItem(STORAGE_KEY, content.style.marginLeft);
    } catch (e) {}
  });
})();
