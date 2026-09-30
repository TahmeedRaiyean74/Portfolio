/**
 * Tahmeed Ur Rawfun — Civil & Structural Engineer Portfolio
 * Swiss Bold Reference Theme Interactive Orchestration
 */

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // 1. STICKY HEADER SHADOW ON SCROLL
  // ------------------------------------------------------------------------
  const header = document.querySelector(".ref-header");
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // ------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION DRAWER
  // ------------------------------------------------------------------------
  const menuToggle = document.querySelector(".ref-menu-toggle");
  const mobileDrawer = document.querySelector(".ref-mobile-drawer");

  if (menuToggle && mobileDrawer) {
    const toggleMenu = () => {
      const isOpen = mobileDrawer.classList.toggle("open");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      mobileDrawer.setAttribute("aria-hidden", isOpen ? "false" : "true");
    };

    menuToggle.addEventListener("click", toggleMenu);

    mobileDrawer.querySelectorAll("a").forEach((link) => {
      // Don't close drawer if clicking resume modal trigger
      if (link.id === "openResumeModalMobile") return;
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        mobileDrawer.setAttribute("aria-hidden", "true");
      });
    });
  }

  // ------------------------------------------------------------------------
  // 3. GLOBAL IMAGE LIGHTBOX (CLICK ANY IMAGE TO ENLARGE)
  // ------------------------------------------------------------------------
  const lightbox = document.getElementById("workLightbox");
  const lightboxImg = document.getElementById("lightboxImage");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  if (lightbox && lightboxImg && closeBtn) {
    let images = [];
    let currentIndex = 0;

    const collectImages = () => {
      images = Array.from(document.querySelectorAll("img.zoomable-image"))
        .filter((el) => {
          const src = el.currentSrc || el.src;
          return src && !el.closest("#workLightbox");
        })
        .map((el) => ({
          element: el,
          src: el.currentSrc || el.src,
          alt: el.alt || "Tahmeed Ur Rawfun Portfolio Visual",
        }));
    };

    const render = (index) => {
      if (!images.length) return;
      currentIndex = (index + images.length) % images.length;
      const currentItem = images[currentIndex];

      lightboxImg.src = currentItem.src;
      lightboxImg.alt = currentItem.alt;
      lightboxTitle.textContent = currentItem.alt;
      lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    };

    const openLightbox = (index) => {
      collectImages();
      if (!images.length) return;

      render(index);
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
    };

    const closeLightbox = () => {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
    };

    document.addEventListener("click", (e) => {
      const clickedImg = e.target.closest("img.zoomable-image");
      if (!clickedImg || clickedImg.closest("#workLightbox")) return;

      collectImages();
      const foundIdx = images.findIndex((item) => item.element === clickedImg);
      if (foundIdx !== -1) {
        e.preventDefault();
        openLightbox(foundIdx);
      }
    });

    closeBtn.addEventListener("click", closeLightbox);

    prevBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      render(currentIndex - 1);
    });

    nextBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      render(currentIndex + 1);
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") render(currentIndex - 1);
      else if (e.key === "ArrowRight") render(currentIndex + 1);
    });
  }

  // ------------------------------------------------------------------------
  // 4. ANIMATED SKILL GAUGE BARS (Scroll-Triggered Fill)
  // ------------------------------------------------------------------------
  const skillFills = document.querySelectorAll(".ref-skill-fill[data-width]");

  if (skillFills.length > 0) {
    const animateSkills = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll(".ref-skill-fill[data-width]");
          fills.forEach((fill, index) => {
            setTimeout(() => {
              fill.style.width = fill.getAttribute("data-width") + "%";
              fill.classList.add("animated");
            }, index * 150);
          });
          observer.unobserve(entry.target);
        }
      });
    };

    const skillObserver = new IntersectionObserver(animateSkills, {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    });

    document.querySelectorAll(".ref-skill-category").forEach((category) => {
      skillObserver.observe(category);
    });
  }
});
