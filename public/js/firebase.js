// Firebase initialisation (Hosting + Analytics).
// These web config values are public identifiers, not secrets — access is
// governed by Firebase security rules and the authorised-domains list.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics, isSupported, logEvent } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJrOqiflsx8vQDnTM0c2W2rhQ1x8T9j84",
  authDomain: "nicholas-kokat.firebaseapp.com",
  projectId: "nicholas-kokat",
  storageBucket: "nicholas-kokat.firebasestorage.app",
  messagingSenderId: "927893709087",
  appId: "1:927893709087:web:fd0b3f543c539feb8ed02a",
  measurementId: "G-J1MZFMG3YQ",
};

export const app = initializeApp(firebaseConfig);

// Analytics only runs where supported (not in blocked/private contexts).
export let analytics = null;
isSupported()
  .then((ok) => {
    if (!ok) return;
    analytics = getAnalytics(app);
    // Track the interactions recruiters care about.
    document.addEventListener("click", (e) => {
      const el = e.target.closest("[data-track]");
      if (el) logEvent(analytics, "select_content", { content_type: el.dataset.track, item_id: el.getAttribute("href") || el.id });
    });
  })
  .catch(() => {});
