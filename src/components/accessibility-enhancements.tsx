"use client";

import { useEffect, useState } from "react";

export default function AccessibilityEnhancements() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    // Check for high contrast preference
    const contrastQuery = window.matchMedia("(prefers-contrast: high)");
    setHighContrast(contrastQuery.matches);

    const handleContrastChange = (e: MediaQueryListEvent) => {
      setHighContrast(e.matches);
    };

    contrastQuery.addEventListener("change", handleContrastChange);

    // Skip to main content functionality
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.textContent = "Skip to main content";
    skipLink.className =
      "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#003DA5] text-white px-4 py-2 rounded-lg z-50 font-bold text-lg min-h-[44px] min-w-[44px] flex items-center";
    skipLink.style.transform = "translateZ(0)"; // Force hardware acceleration
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add additional skip links
    const skipToNav = document.createElement("a");
    skipToNav.href = "#main-navigation";
    skipToNav.textContent = "Skip to navigation";
    skipToNav.className =
      "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-48 bg-[#003DA5] text-white px-4 py-2 rounded-lg z-50 font-bold text-lg min-h-[44px] min-w-[44px] flex items-center";
    document.body.insertBefore(skipToNav, skipLink.nextSibling);

    // Add main content ID if not exists
    const main = document.querySelector("main");
    if (main && !main.id) {
      main.id = "main-content";
      main.setAttribute("tabindex", "-1");
    }

    // Add navigation ID
    const nav = document.querySelector("nav");
    if (nav && !nav.id) {
      nav.id = "main-navigation";
    }

    // Improve focus management
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key closes modals, dropdowns, and mobile menu
      if (e.key === "Escape") {
        const closeButtons = document.querySelectorAll(
          '[aria-label*="Close"], [aria-label*="close"], [data-dismiss]',
        );
        closeButtons.forEach((button) => {
          if (button instanceof HTMLElement && button.offsetParent !== null) {
            button.click();
          }
        });

        // Close any open dropdowns
        const openDropdowns = document.querySelectorAll(
          '[aria-expanded="true"]',
        );
        openDropdowns.forEach((dropdown) => {
          if (dropdown instanceof HTMLElement) {
            dropdown.setAttribute("aria-expanded", "false");
          }
        });
      }

      // Tab key focus management for modals
      if (e.key === "Tab") {
        const modal = document.querySelector('[role="dialog"]:not([hidden])');
        if (modal) {
          const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );

          if (focusableElements.length > 0) {
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[
              focusableElements.length - 1
            ] as HTMLElement;

            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Improve button and link accessibility
    const improveInteractiveElements = () => {
      // Ensure all buttons have proper labels
      const buttons = document.querySelectorAll(
        "button:not([aria-label]):not([aria-labelledby])",
      );
      buttons.forEach((button) => {
        if (!button.textContent?.trim()) {
          console.warn("Button without accessible label found:", button);
        }
      });

      // Ensure all links have proper labels
      const links = document.querySelectorAll(
        "a:not([aria-label]):not([aria-labelledby])",
      );
      links.forEach((link) => {
        if (!link.textContent?.trim()) {
          console.warn("Link without accessible label found:", link);
        }
      });

      // Add touch target improvements for mobile
      const interactiveElements = document.querySelectorAll(
        "button, a, input, select, textarea",
      );
      interactiveElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
          (element as HTMLElement).style.minHeight = "44px";
          (element as HTMLElement).style.minWidth = "44px";
          (element as HTMLElement).classList.add(
            "flex",
            "items-center",
            "justify-center",
          );
        }
      });
    };

    // Run improvements after DOM updates
    const observer = new MutationObserver(() => {
      improveInteractiveElements();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
    });

    // Initial run
    improveInteractiveElements();

    // Announce page changes for screen readers
    const announcePageChange = () => {
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent = `Page loaded: ${document.title}`;
      document.body.appendChild(announcement);

      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 1000);
    };

    announcePageChange();

    // Add custom CSS for accessibility improvements
    const style = document.createElement("style");
    style.textContent = `
      /* High contrast mode improvements */
      @media (prefers-contrast: high) {
        * {
          outline-color: ButtonText !important;
        }
        button, a, input, select, textarea {
          border: 2px solid ButtonText !important;
        }
      }

      /* Reduced motion improvements */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }

      /* Focus improvements */
      *:focus-visible {
        outline: 3px solid #FFD700 !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 5px rgba(255, 215, 0, 0.3) !important;
      }

      /* Ensure minimum touch target sizes */
      button, a, input, select, textarea {
        min-height: 44px;
        min-width: 44px;
      }

      /* Screen reader only content */
      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }

      .sr-only:focus {
        position: static !important;
        width: auto !important;
        height: auto !important;
        padding: inherit !important;
        margin: inherit !important;
        overflow: visible !important;
        clip: auto !important;
        white-space: normal !important;
      }

      /* Improve color contrast for better readability */
      .text-gray-600 {
        color: #4B5563 !important;
      }

      .text-gray-500 {
        color: #6B7280 !important;
      }

      /* Ensure proper spacing for readability */
      p, li {
        line-height: 1.6 !important;
      }

      h1, h2, h3, h4, h5, h6 {
        line-height: 1.4 !important;
      }
    `;
    document.head.appendChild(style);

    // Add live region for dynamic content announcements
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only";
    liveRegion.id = "live-region";
    document.body.appendChild(liveRegion);

    // Monitor for cart updates and announce them
    const cartObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "childList" ||
          mutation.type === "characterData"
        ) {
          const target = mutation.target as Element;
          if (
            target.closest("[data-cart]") ||
            target.textContent?.includes("cart")
          ) {
            const liveRegion = document.getElementById("live-region");
            if (liveRegion) {
              liveRegion.textContent = "Cart updated";
              setTimeout(() => {
                liveRegion.textContent = "";
              }, 1000);
            }
          }
        }
      });
    });

    cartObserver.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener("change", handleMotionChange);
      contrastQuery.removeEventListener("change", handleContrastChange);
      observer.disconnect();
      cartObserver.disconnect();
    };
  }, []);

  return null;
}
