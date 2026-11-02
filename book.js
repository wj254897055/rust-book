(() => {
  const body = document.body;

  /* ---------- mobile navigation ---------- */

  const menuButton = document.getElementById("menu-button");
  const backdrop = document.querySelector(".nav-backdrop");
  const sidebar = document.getElementById("sidebar");

  const closeNav = () => {
    body.classList.remove("nav-open");
    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "false");
    }
  };

  if (menuButton) {
    menuButton.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeNav);
  }

  if (sidebar) {
    sidebar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  /* ---------- reading progress ---------- */

  const progress = document.getElementById("progress");

  const updateProgress = () => {
    if (!progress) {
      return;
    }

    const documentElement = document.documentElement;
    const maxScroll = documentElement.scrollHeight - documentElement.clientHeight;
    const ratio = maxScroll > 0 ? documentElement.scrollTop / maxScroll : 0;

    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
  };

  if (progress) {
    updateProgress();
    document.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  /* ---------- code blocks: labels + copy ---------- */

  const languageLabels = {
    rust: "Rust",
    console: "终端",
    text: "输出",
    toml: "TOML",
    cmd: "CMD",
    powershell: "PowerShell",
    bash: "Shell",
    sh: "Shell",
  };

  document.querySelectorAll("pre").forEach((pre) => {
    if (pre.closest(".code-shell")) {
      return;
    }

    const shell = document.createElement("div");
    shell.className = "code-shell";
    pre.parentNode.insertBefore(shell, pre);
    shell.appendChild(pre);

    const bar = document.createElement("div");
    bar.className = "code-bar";

    const code = pre.querySelector("code");
    const languageClass = code
      ? [...code.classList].find((name) => name.startsWith("language-"))
      : null;
    const language = languageClass
      ? languageClass.replace("language-", "")
      : "";
    const label = pre.dataset.label || languageLabels[language] || language || "代码";

    const labelElement = document.createElement("span");
    labelElement.className = "code-label";
    labelElement.textContent = label;

    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "copy-button";
    copyButton.textContent = "复制";
    copyButton.setAttribute("aria-label", "复制代码");

    copyButton.addEventListener("click", async () => {
      const text = pre.innerText;

      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      copyButton.textContent = "已复制";
      copyButton.classList.add("is-copied");

      window.setTimeout(() => {
        copyButton.textContent = "复制";
        copyButton.classList.remove("is-copied");
      }, 1600);
    });

    bar.append(labelElement, copyButton);
    shell.insertBefore(bar, pre);
  });

  /* ---------- active section in sidebar ---------- */

  const sectionLinks = [...document.querySelectorAll(".side-sections a")];
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length > 0) {
    const setActive = (index) => {
      sectionLinks.forEach((link, linkIndex) => {
        link.classList.toggle("is-active", linkIndex === index);
      });
    };

    let ticking = false;

    const updateActiveSection = () => {
      ticking = false;

      const offset = window.innerHeight * 0.25;
      let currentIndex = -1;

      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= offset) {
          currentIndex = index;
        }
      });

      if (currentIndex >= 0) {
        setActive(currentIndex);
      }
    };

    const requestUpdate = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    document.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
  }
})();
