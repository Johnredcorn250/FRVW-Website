import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   GLOBAL CSS
   ═══════════════════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
:root {
  --blue: #2066d1;
  --blue-2: #4a8cff
  --gold: #f7c500;
  --green: #1aa35c;
  --red: #e24a4a;
  --dark: #f7fbff;
  --darker: #edf5ff;
  --mid: #ffffff;
  --glass: rgba(255, 255, 255, 0.72);
  --glass-2: rgba(255, 255, 255, 0.9);
  --border: rgba(0, 61, 165, 0.12);
  --text: #11315f;
  --muted: rgba(17, 49, 95, 0.68);
  --shadow: 0 16px 40px rgba(0, 61, 165, 0.10);
  --radius: 16px;
  --max-width: 1240px;
  --nav-height: 72px;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { background: linear-gradient(180deg, #f8fbff 0%, #edf4ff 100%); color: var(--text); font-family: "Barlow", sans-serif; overflow-x: hidden; }
body.menu-open { overflow: hidden; }
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
ul { list-style: none; }
button { font: inherit; }
.container { width: min(100% - 40px, var(--max-width)); margin-inline: auto; }

/* ── PROPOSAL BANNER ── */
.proposal-banner {
  background: linear-gradient(90deg, var(--blue), var(--blue-2));
  padding: 10px 20px; font-size: 13px; color: #fff;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.proposal-inner {
  width: min(100% - 20px, var(--max-width)); margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
}
.proposal-badge {
  background: var(--gold); color: #11315f;
  padding: 4px 12px; border-radius: 999px;
  font-size: 11px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase;
}

/* ── NAV ── */
nav {
  position: sticky; top: 0; z-index: 1000;
  height: var(--nav-height);
  background: rgba(255,255,255,0.94);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 2px 16px rgba(0,61,165,0.06);
}
.nav-inner {
  width: min(100% - 40px, var(--max-width));
  height: 100%; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; gap: 20px;
}
.nav-logo { display: flex; align-items: center; gap: 12px; min-width: max-content; }
.logo-badge {
  width: 44px; height: 44px; border-radius: 10px;
  border: 2px solid var(--gold);
  background: linear-gradient(135deg, var(--blue), var(--blue-2));
  display: grid; place-items: center;
  font-family: "Bebas Neue", sans-serif;
  font-size: 16px; color: var(--gold); letter-spacing: 1px;
  box-shadow: var(--shadow);
}
.logo-text { font-family: "Bebas Neue", sans-serif; font-size: 24px; letter-spacing: 2px; color: var(--blue); line-height: 1; }
.logo-sub { font-size: 10px; color: var(--muted); letter-spacing: 1.4px; text-transform: uppercase; margin-top: 2px; }
.nav-links { display: flex; align-items: center; gap: 28px; }
.nav-links a {
  font-size: 14px; font-weight: 700; color: var(--muted);
  letter-spacing: 0.3px; position: relative; transition: color 0.2s ease;
}
.nav-links a::after {
  content: ""; position: absolute; left: 0; bottom: -9px;
  width: 100%; height: 2px; background: var(--gold);
  transform: scaleX(0); transform-origin: left; transition: transform 0.2s ease;
}
.nav-links a:hover, .nav-links a.active { color: var(--text); }
.nav-links a.active::after, .nav-links a:hover::after { transform: scaleX(1); }
.nav-actions { display: flex; align-items: center; gap: 12px; }
.nav-cta, .btn-primary, .btn-outline, .ghost-link {
  transition: transform 0.18s ease, opacity 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}
.nav-cta {
  background: var(--gold); color: #11315f;
  padding: 11px 18px; border-radius: 8px;
  font-size: 13px; font-weight: 900; letter-spacing: 0.5px;
}
.nav-cta:hover, .btn-primary:hover, .btn-outline:hover, .ghost-link:hover { transform: translateY(-2px); }
.hamburger {
  display: none; width: 42px; height: 42px;
  border: 1px solid var(--border); border-radius: 10px;
  background: transparent; align-items: center; justify-content: center;
  cursor: pointer; flex-direction: column; gap: 5px;
}
.hamburger span { width: 20px; height: 2px; border-radius: 2px; background: var(--text); transition: 0.25s ease; }
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ── MOBILE NAV ── */
.mobile-nav {
  position: fixed;
  top: calc(44px + var(--nav-height));
  left: 0; right: 0;
  background: rgba(10,13,28,0.97);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding: 18px 20px 26px;
  display: none; flex-direction: column; gap: 2px; z-index: 999;
}
.mobile-nav.open { display: flex; }
.mobile-nav a { padding: 14px 2px; font-size: 17px; font-weight: 700; color: #e8f0ff; border-bottom: 1px solid rgba(255,255,255,0.08); }
.mobile-nav a:hover { color: var(--gold); }
.mobile-nav .mobile-cta { margin-top: 12px; background: var(--gold); color: #11315f; border-radius: 8px; padding: 14px; text-align: center; font-weight: 900; border-bottom: none; }

/* ── HERO ── */
.hero {
  position: relative; overflow: hidden;
  min-height: calc(100vh - 44px - var(--nav-height));
  display: flex; align-items: center;
  padding: 48px 0 72px;
  background:
    radial-gradient(ellipse at 75% 25%, rgba(32,102,209,0.18), transparent 45%),
    radial-gradient(ellipse at 20% 85%, rgba(26,163,92,0.14), transparent 40%),
    radial-gradient(circle at 50% 10%, rgba(247,197,0,0.12), transparent 30%),
    linear-gradient(to bottom, #f7fbff 0%, #e9f2ff 100%);
}
.hero-grid {
  width: min(100% - 40px, var(--max-width)); margin: 0 auto;
  display: grid; grid-template-columns: 1.2fr 0.8fr;
  align-items: center; gap: 32px; position: relative; z-index: 1;
}
.hero-net { position: absolute; inset: 0; pointer-events: none; opacity: 0.12; }
.hero-net svg { width: 100%; height: 100%; }
.hero-copy { max-width: 680px; position: relative; z-index: 2; }
.hero-label {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid rgba(232,17,45,0.28);
  background: rgba(226,74,74,0.08); color: #bb3b45;
  padding: 7px 14px; border-radius: 999px;
  font-size: 12px; font-weight: 700; margin-bottom: 18px;
  animation: fadeUp 0.55s ease both;
}
.live-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--red); animation: pulse 1.5s infinite; }
.hero h1 {
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(56px, 9vw, 106px);
  line-height: 0.9; letter-spacing: 2px; margin-bottom: 18px; color: var(--text);
  animation: fadeUp 0.55s 0.08s ease both;
}
.hero h1 span { color: var(--gold); display: block; }
.hero-desc { font-size: 17px; line-height: 1.7; color: var(--muted); max-width: 620px; margin-bottom: 28px; animation: fadeUp 0.55s 0.16s ease both; }
.hero-btns { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 30px; animation: fadeUp 0.55s 0.24s ease both; }
.btn-primary { background: linear-gradient(135deg, var(--blue), var(--blue-2)); color: #fff; padding: 15px 24px; border-radius: 10px; font-size: 14px; font-weight: 800; box-shadow: var(--shadow); }
.btn-outline { border: 1.5px solid var(--blue); color: var(--blue); padding: 15px 24px; border-radius: 10px; font-size: 14px; font-weight: 800; background: rgba(255,255,255,0.72); }
.btn-outline:hover { border-color: var(--gold); color: var(--text); }
.hero-stats { display: flex; gap: 18px; flex-wrap: wrap; animation: fadeUp 0.55s 0.32s ease both; }
.stat-item { min-width: 140px; padding: 16px 18px; border-radius: 14px; border: 1px solid var(--border); background: rgba(255,255,255,0.82); box-shadow: 0 4px 16px rgba(0,61,165,0.06); }
.stat-num { font-family: "Bebas Neue", sans-serif; font-size: 42px; line-height: 1; color: var(--blue); }
.stat-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1.2px; margin-top: 4px; }

/* ── HERO VISUAL ── */
.hero-visual {
  display: flex; justify-content: center; align-items: center;
  position: relative; min-height: 420px; perspective: 1000px;
}
.visual-ring {
  position: absolute; width: 430px; height: 430px; border-radius: 50%;
  background:
    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent 28%),
    radial-gradient(circle at 50% 50%, rgba(247,197,0,0.1), transparent 55%);
  border: 1px solid rgba(32,102,209,0.12); filter: blur(1px);
}
.volleyball {
  width: min(360px, 80vw);
  transform-style: preserve-3d; will-change: transform;
  animation: floatBall 5s ease-in-out infinite;
  z-index: 1; cursor: pointer;
}
.volleyball svg { width: 100%; height: auto; display: block; }
.volleyball:hover { filter: drop-shadow(0 14px 28px rgba(32, 102, 209, 0.22)); }
.volleyball.burst {
  animation: floatBall 5s ease-in-out infinite, ballPop 0.45s ease;
  filter: drop-shadow(0 22px 36px rgba(32, 102, 209, 0.28));
}
.ball-cursor {
  position: absolute; width: 12px; height: 12px;
  border-radius: 50%; background: var(--gold);
  pointer-events: none; opacity: 0; z-index: 10;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s ease; mix-blend-mode: multiply;
}
.hero-visual:hover .ball-cursor { opacity: 1; }
.hero-mini-card {
  position: absolute; border: 1px solid var(--border);
  background: rgba(255,255,255,0.92); backdrop-filter: blur(12px);
  border-radius: 14px; padding: 14px 16px;
  box-shadow: var(--shadow); min-width: 160px; z-index: 5;
}
.hero-mini-card.top { top: 45px; left: 100px; }
.hero-mini-card.bottom { right: 15px; bottom: 60px; }
.mini-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); margin-bottom: 6px; }
.mini-value { font-size: 22px; font-weight: 900; color: var(--blue); line-height: 1; margin-bottom: 4px; }
.mini-copy { font-size: 12px; color: var(--muted); line-height: 1.45; }

/* ── TICKER ── */
.ticker {
  background: var(--blue); color: #fff;
  overflow: hidden; white-space: nowrap; height: 42px;
  display: flex; align-items: center;
}
.ticker-track { display: inline-flex; min-width: max-content; animation: tickerScroll 36s linear infinite; }
.ticker-item { font-size: 13px; font-weight: 700; padding: 0 28px; }
.ticker-item .dot { margin-left: 28px; color: var(--gold); }

/* ── SECTIONS ── */
main section { padding: 84px 0; }
.section-head { display: flex; justify-content: space-between; align-items: end; gap: 20px; margin-bottom: 34px; flex-wrap: wrap; }
.section-label { font-size: 12px; font-weight: 800; color: var(--blue); text-transform: uppercase; letter-spacing: 3px; margin-bottom: 8px; }
.section-title { font-family: "Bebas Neue", sans-serif; font-size: clamp(38px, 5vw, 56px); line-height: 0.95; letter-spacing: 1px; color: var(--text); }
.section-subtitle { max-width: 560px; color: var(--muted); line-height: 1.7; font-size: 15px; }
.ghost-link { color: var(--blue); border: 1px solid var(--border); border-radius: 999px; padding: 10px 16px; font-size: 13px; font-weight: 800; white-space: nowrap; transition: border-color 0.2s, background 0.2s; }
.ghost-link:hover { border-color: var(--gold); background: rgba(247,197,0,0.06); }
.scores-section { background: #f0f6ff; }
.teams-section { background: #f0f6ff; }
.calendar-section { background: #f0f6ff; }
.scores-grid, .competitions-grid, .news-grid, .teams-grid, .calendar-grid, .footer-top, .gallery-grid, .overview-grid { display: grid; gap: 18px; }
.scores-grid { grid-template-columns: repeat(3, 1fr); }

/* ── CARDS BASE ── */
.score-card, .competition-card, .news-featured, .news-item, .team-card, .calendar-card, .gallery-card, .overview-side-card {
  background: #fff; border: 1px solid var(--border); border-radius: var(--radius);
  transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
}
.score-card:hover, .competition-card:hover, .news-featured:hover, .news-item:hover, .team-card:hover, .calendar-card:hover, .gallery-card:hover, .overview-side-card:hover {
  transform: translateY(-4px); border-color: rgba(247,197,0,0.4);
  box-shadow: 0 8px 28px rgba(0,61,165,0.10);
}

/* ── SCORE CARDS ── */
.score-card { padding: 24px; }
.score-card.live { border-color: rgba(226,74,74,0.45); }
.score-meta { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
.score-league { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1.2px; }
.live-badge, .upcoming-badge, .completed-badge { font-size: 10px; font-weight: 900; letter-spacing: 1px; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; }
.live-badge { background: var(--red); color: #fff; }
.upcoming-badge { background: var(--blue); color: #fff; }
.completed-badge { background: rgba(32,102,209,0.06); color: var(--muted); border: 1px solid var(--border); }
.score-teams { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 14px; }
.team-info { flex: 1; }
.team-info.right { text-align: right; }
.team-flag { font-size: 28px; margin-bottom: 6px; }
.team-name { font-size: 14px; font-weight: 800; line-height: 1.35; color: var(--text); }
.score-divider { text-align: center; flex-shrink: 0; }
.score-num { font-family: "Bebas Neue", sans-serif; font-size: 42px; line-height: 1; letter-spacing: 1px; color: var(--text); }
.score-vs { color: var(--muted); font-size: 11px; letter-spacing: 1px; margin-top: 4px; }
.score-time { color: var(--muted); font-size: 12px; }

/* ── COMPETITION CARDS ── */
.competitions-grid { grid-template-columns: repeat(3, 1fr); }
.competition-card { padding: 24px; position: relative; overflow: hidden; }
.competition-card::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 4px; background: linear-gradient(to bottom, var(--gold), var(--green)); }
.competition-tag { display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: var(--blue); margin-bottom: 14px; }
.competition-card h3 { font-size: 20px; line-height: 1.2; margin-bottom: 10px; color: var(--text); }
.competition-card p { color: var(--muted); line-height: 1.65; font-size: 14px; margin-bottom: 18px; }
.competition-meta { display: flex; flex-wrap: wrap; gap: 10px; }
.competition-meta span { font-size: 12px; color: var(--blue); background: rgba(32,102,209,0.07); border: 1px solid rgba(32,102,209,0.15); border-radius: 999px; padding: 7px 11px; font-weight: 600; }

/* ── OVERVIEW SECTION ── */
.overview-section { background: #fff; }
.overview-grid { grid-template-columns: 1.4fr 1fr; gap: 24px; align-items: start; }
.overview-story { background: linear-gradient(135deg, #f0f6ff, #e8f2ff); border: 1px solid var(--border); border-radius: var(--radius); padding: 36px; }
.overview-kicker { font-size: 13px; font-weight: 800; color: var(--blue); margin-bottom: 14px; text-transform: uppercase; letter-spacing: 1px; }
.overview-story h3 { font-size: 22px; line-height: 1.35; margin-bottom: 14px; color: var(--text); }
.overview-story > p { color: var(--muted); line-height: 1.8; font-size: 15px; margin-bottom: 24px; }
.overview-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
.overview-pills span { font-size: 12px; font-weight: 700; background: rgba(32,102,209,0.09); border: 1px solid rgba(32,102,209,0.18); border-radius: 999px; padding: 7px 14px; color: var(--blue); }
.overview-stats { display: flex; gap: 28px; flex-wrap: wrap; }
.overview-stat { display: flex; flex-direction: column; }
.overview-stat strong { font-family: "Bebas Neue", sans-serif; font-size: 40px; line-height: 1; color: var(--gold); }
.overview-stat span { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
.overview-side { display: flex; flex-direction: column; gap: 16px; }
.overview-side-card { padding: 24px; }
.overview-side-card h4 { font-size: 17px; margin-bottom: 10px; line-height: 1.35; color: var(--text); }
.overview-side-card p { font-size: 13px; color: var(--muted); line-height: 1.65; margin-bottom: 14px; }
.overview-meta { display: flex; flex-wrap: wrap; gap: 8px; }
.overview-meta span { font-size: 11px; font-weight: 700; background: rgba(32,102,209,0.06); border: 1px solid var(--border); border-radius: 999px; padding: 5px 10px; color: var(--blue); }

/* ── NEWS ── */
.news-section { background: #f0f6ff; }
.news-grid { grid-template-columns: 1.5fr 1fr; align-items: stretch; }
.news-featured { overflow: hidden; }
.news-img-bg { height: 260px; overflow: hidden; position: relative; background: linear-gradient(135deg, var(--blue), var(--green)); }
.news-img-bg img { width: 100%; height: 100%; object-fit: cover; display: block; }
.news-content { padding: 24px; }
.news-cat { display: inline-block; background: rgba(32,102,209,0.10); color: var(--blue); border-radius: 999px; padding: 5px 12px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; }
.news-content h3 { font-size: 22px; line-height: 1.3; margin-bottom: 10px; color: var(--text); }
.news-content p { color: var(--muted); line-height: 1.7; font-size: 15px; margin-bottom: 16px; }
.news-date { font-size: 12px; color: var(--muted); }
.news-list { display: flex; flex-direction: column; gap: 12px; }
.news-item { padding: 18px; cursor: pointer; }
.news-item-cat { font-size: 11px; font-weight: 800; color: var(--gold); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
.news-item h4 { font-size: 15px; line-height: 1.45; margin-bottom: 10px; color: var(--text); }
.news-item-date { font-size: 12px; color: var(--muted); }

/* ── GALLERY ── */
.gallery-section { background: #fff; }
.gallery-grid { grid-template-columns: repeat(3, 1fr); }
.gallery-card { overflow: hidden; cursor: pointer; }
.gallery-image { height: 220px; overflow: hidden; position: relative; background: linear-gradient(135deg, var(--blue), var(--green)); }
.gallery-image img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
.gallery-card:hover .gallery-image img { transform: scale(1.06); }
.gallery-content { padding: 20px; }
.gallery-tag { font-size: 11px; font-weight: 800; color: var(--blue); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; display: inline-block; }
.gallery-content h3 { font-size: 17px; line-height: 1.35; margin-bottom: 8px; color: var(--text); }
.gallery-content p { font-size: 13px; color: var(--muted); line-height: 1.6; }

/* ── TEAMS ── */
.teams-tabs { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 28px; }
.tab-btn { border: 1px solid var(--border); background: #fff; color: var(--muted); padding: 10px 20px; border-radius: 999px; font-size: 13px; font-weight: 800; cursor: pointer; transition: background 0.2s, border-color 0.2s, color 0.2s; }
.tab-btn.active, .tab-btn:hover { background: var(--blue); border-color: var(--blue); color: #fff; }
.teams-grid { grid-template-columns: repeat(3, 1fr); }
.team-card { padding: 28px 20px; text-align: center; position: relative; overflow: hidden; }
.team-card::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 3px; background: linear-gradient(90deg, var(--blue), var(--green), var(--gold)); transform: scaleX(0); transition: transform 0.25s ease; }
.team-card:hover::before { transform: scaleX(1); }
.team-emoji { font-size: 40px; display: inline-block; margin-bottom: 14px; }
.team-card h3 { font-size: 18px; margin-bottom: 6px; color: var(--text); }
.team-card p { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 14px; }
.team-record { font-family: "Bebas Neue", sans-serif; font-size: 24px; line-height: 1; color: var(--blue); }
.team-record-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); margin-top: 4px; }

/* ── CALENDAR ── */
.calendar-grid { grid-template-columns: repeat(3, 1fr); }
.calendar-card { padding: 24px; background: #fff; }
.calendar-date { display: inline-block; background: rgba(247,197,0,0.14); color: #7a5c00; border: 1px solid rgba(247,197,0,0.32); padding: 7px 12px; border-radius: 999px; font-size: 11px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 14px; }
.calendar-card h3 { font-size: 19px; line-height: 1.3; margin-bottom: 8px; color: var(--text); }
.calendar-card p { color: var(--muted); line-height: 1.7; font-size: 14px; margin-bottom: 14px; }
.calendar-meta { font-size: 12px; color: var(--text); display: flex; flex-direction: column; gap: 6px; font-weight: 600; }

/* ── FOOTER ── */
footer { background: #0d1e3d; border-top: 1px solid rgba(255,255,255,0.06); padding: 64px 0 28px; color: #e8f0ff; }
.footer-top { grid-template-columns: 2fr 1fr 1fr 1fr; margin-bottom: 34px; }
.footer-brand p { color: rgba(232,240,255,0.62); line-height: 1.8; font-size: 14px; max-width: 420px; margin: 14px 0 20px; }
.footer-col h4 { font-size: 11px; color: var(--gold); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; }
.footer-col ul { display: flex; flex-direction: column; gap: 10px; }
.footer-col a { color: rgba(232,240,255,0.60); font-size: 14px; transition: color 0.2s; }
.footer-col a:hover { color: var(--gold); }
.footer-logo-text { font-family: "Bebas Neue", sans-serif; font-size: 24px; letter-spacing: 2px; color: var(--gold); line-height: 1; }
.footer-logo-sub { font-size: 10px; color: rgba(232,240,255,0.5); letter-spacing: 1.4px; text-transform: uppercase; margin-top: 2px; }
.social-links { display: flex; gap: 10px; flex-wrap: wrap; }
.social-link {
  width: 40px; height: 40px; display: grid; place-items: center;
  border-radius: 10px; background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10); font-size: 15px;
  color: #e8f0ff; transition: border-color 0.2s, background 0.2s, color 0.2s;
}
.social-link:hover { border-color: var(--gold); background: rgba(247,197,0,0.12); color: var(--gold); }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.07); padding-top: 20px; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
.footer-bottom p { color: rgba(232,240,255,0.42); font-size: 13px; }
.footer-bottom a { color: var(--gold); }

/* ── REVEAL ── */
.reveal { opacity: 0; transform: translateY(26px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ── KEYFRAMES ── */
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
@keyframes floatBall {
  0%, 100% { transform: translate3d(0, 0, 0) rotateZ(0deg); }
  50%       { transform: translate3d(0, -16px, 0) rotateZ(6deg); }
}
@keyframes ballPop {
  0% { transform: scale(1); } 35% { transform: scale(1.08); }
  70% { transform: scale(0.94); } 100% { transform: scale(1); }
}
@keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* ── RESPONSIVE ── */
@media (max-width: 1100px) {
  .hero-grid, .news-grid, .scores-grid, .competitions-grid, .calendar-grid, .teams-grid, .footer-top, .overview-grid, .gallery-grid { grid-template-columns: 1fr 1fr; }
  .hero-grid { align-items: start; }
  .hero-copy { max-width: 100%; }
  .footer-top { grid-template-columns: 2fr 1fr 1fr; }
}
@media (max-width: 860px) {
  .nav-links, .nav-cta { display: none; }
  .hamburger { display: flex; }
  .hero { padding: 42px 0 56px; }
  .hero-grid, .news-grid, .scores-grid, .competitions-grid, .calendar-grid, .teams-grid, .footer-top, .overview-grid, .gallery-grid { grid-template-columns: 1fr; }
  .hero-visual { min-height: 320px; }
  .visual-ring { width: 320px; height: 320px; }
  .hero-mini-card.top { top: 6px; left: 0; }
  .hero-mini-card.bottom { right: 0; bottom: 0; }
  main section { padding: 66px 0; }
}
@media (max-width: 640px) {
  .container, .nav-inner { width: min(100% - 24px, var(--max-width)); }
  .proposal-banner { padding-inline: 12px; }
  .hero h1 { font-size: 54px; }
  .hero-desc { font-size: 15px; }
  .hero-btns { flex-direction: column; }
  .btn-primary, .btn-outline { text-align: center; }
  .score-teams { gap: 8px; }
  .score-num { font-size: 34px; }
  .news-img-bg { height: 200px; }
  .hero-mini-card { min-width: 130px; padding: 12px 14px; }
  .footer-bottom { flex-direction: column; text-align: center; }
  .footer-top { grid-template-columns: 1fr 1fr; }
}
@media (hover: none) {
  .ball-cursor { display: none; }
  .volleyball { cursor: auto; }
}
`;

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */
const TICKER_ITEMS = [
  "FRVB established in 1984 — affiliated with CAVB and FIVB",
  "Kigali to host the 47th CAVB Men's Club Championship — Apr 20 to May 3, 2026",
  "Beach Volleyball National Tour continues to grow across Muhazi, Karongi, and Rwamagana",
  "Youth competitions continue to strengthen Rwanda's talent pathway",
  "Rwanda builds its profile as a host nation for African volleyball",
];

const SCORES = [
  { id: 1, league: "National League — Men", badgeType: "live", badgeText: "Live Set 3", homeFlag: "🏐", homeName: "APR Volleyball Club", score: "2 — 1", setScores: "21 · 18 · 21", awayFlag: "🏐", awayName: "REG Volleyball", venue: "Amahoro Indoor Stadium · Kigali" },
  { id: 2, league: "National League — Women", badgeType: "upcoming", badgeText: "Today 18:30", homeFlag: "🏐", homeName: "IPRC Kigali", score: "vs", setScores: "Kick-off soon", awayFlag: "🏐", awayName: "Police Volleyball", venue: "Petit Stade · Kigali" },
  { id: 3, league: "National League — Men", badgeType: "completed", badgeText: "Final", homeFlag: "🏐", homeName: "Rwanda Energy Group", score: "3 — 0", setScores: "25 · 22 · 25", awayFlag: "🏐", awayName: "Gisagara VC", venue: "BK Arena · Kigali" },
];

const COMPETITIONS = [
  { id: 1, tag: "Featured Tournament", title: "47th CAVB Men's Club Championship", desc: "Kigali is set to host the continental club championship from April 20 to May 3, 2026, with APR VC, Police VC, and Kepler VC representing Rwanda.", meta: ["Kigali", "Apr 20 – May 3, 2026", "Continental Clubs"] },
  { id: 2, tag: "National League", title: "Rwanda National Volleyball League", desc: "FRVB's domestic structure includes national league competition for men's and women's clubs, alongside recurring tournaments that keep the calendar active across the season.", meta: ["Men & Women", "Domestic Season", "FRVB Competition"] },
  { id: 3, tag: "Beach Circuit", title: "National Beach Volleyball Tour", desc: "Recent FRVB beach tour stops in Muhazi and Rwamagana show the federation's growing investment in beach volleyball, athlete exposure, and fan-facing events.", meta: ["Beach Volleyball", "National Tour", "Player Development"] },
];

const NEWS_ITEMS = [
  { id: 1, cat: "Hosting",  headline: "Kigali confirmed to stage the 47th CAVB Men's Club Championship in April–May 2026", date: "March 6, 2026",    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=260&fit=crop&auto=format" },
  { id: 2, cat: "Youth",    headline: "Isonga intercenter competitions highlighted Rwanda's rising volleyball talent in Nyanza",                   date: "February 9, 2026",  image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=260&fit=crop&auto=format" },
  { id: 3, cat: "Beach",    headline: "Rwamagana stop of the FRVB Beach Volleyball National Tour crowned new winners in December 2025",             date: "December 23, 2025", image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&h=260&fit=crop&auto=format" },
  { id: 4, cat: "Beach",    headline: "Muhazi season opener brought 23 pairs from five countries to the FRVB National Beach Volleyball Tour",       date: "November 6, 2024",  image: "https://images.unsplash.com/photo-1544991875-5dc1b05f5869?w=400&h=260&fit=crop&auto=format" },
];

const TEAMS = [
  { id: 1, name: "APR Volleyball Club",    city: "Kigali", desc: "Army-backed club and perennial league champions, representing Rwanda in continental club competitions.", record: "League Champions", recordLabel: "Men's League", category: "men", color: "#003DA5" },
  { id: 2, name: "REG Volleyball Club",    city: "Kigali", desc: "Rwanda Energy Group's volleyball arm — a competitive men's side known for strong national league performances.", record: "Top Division", recordLabel: "Men's League", category: "men", color: "#1aa35c" },
  { id: 3, name: "Police Volleyball Club", city: "Kigali", desc: "Rwanda National Police's club — one of the most active teams in both men's and women's domestic competition.", record: "National League", recordLabel: "Men & Women", category: "men", color: "#e24a4a" },
  { id: 4, name: "Kepler Volleyball Club", city: "Kigali", desc: "University-rooted club representing Rwanda in the 47th CAVB Men's Club Championship in 2026.", record: "CAVB 2026", recordLabel: "Continental", category: "men", color: "#f7c500" },
  { id: 5, name: "IPRC Kigali VC",         city: "Kigali", desc: "Institut Polytechnique de Kigali's volleyball club — competing in the national women's league and youth programs.", record: "Women's League", recordLabel: "Women's Division", category: "women", color: "#7c3aed" },
  { id: 6, name: "Gisagara VC",            city: "Gisagara", desc: "Southern Province club building on grassroots talent, competing in the national men's league.", record: "National League", recordLabel: "Men's League", category: "men", color: "#0891b2" },
];

const CALENDAR = [
  { id: 1, date: "Apr 20 – May 3, 2026", title: "47th CAVB Men's Club Championship", desc: "Kigali will host a landmark edition of the continental club championship — the first time the tournament is staged in Sub-Saharan Africa.", meta: ["📍 Kigali", "🌍 Continental event"] },
  { id: 2, date: "2026 Season", title: "Rwanda National Volleyball League", desc: "Domestic men's and women's league competition remains the backbone of the annual volleyball calendar and club ecosystem.", meta: ["📍 Nationwide", "🏐 Indoor season"] },
  { id: 3, date: "Beach Tour Stops", title: "FRVB National Beach Volleyball Tour", desc: "Successive tour stops in Muhazi, Karongi, and Rwamagana highlight the beach circuit's growing role in Rwanda's volleyball story.", meta: ["🏖️ Beach circuit", "📈 Athlete exposure"] },
];

const ABOUT_CARDS = [
  { id: 1, tag: "History", title: "Volleyball has deep roots in Rwanda", desc: "Volleyball spread through schools, military camps, and communities before FRVB was established in 1984 and affiliated the same year to CAVB and FIVB.", meta: ["Established 1984", "FIVB", "CAVB"] },
  { id: 2, tag: "Growth", title: "Rwanda keeps expanding its volleyball footprint", desc: "Rwanda has hosted major continental events in indoor and beach volleyball, helping position Kigali and other venues as important competition hubs.", meta: ["Hosting Nation", "Kigali", "Beach & Indoor"] },
  { id: 3, tag: "Future", title: "Development is moving in multiple directions", desc: "League play, youth competitions, and the beach tour all create a stronger performance pipeline while giving fans more entry points into the sport.", meta: ["Youth", "League", "Beach Tour"] },
];

const RWANDA_OVERVIEW = {
  title: "Volleyball in Rwanda is growing through league play, hosting power, and beach momentum.",
  body: "Volleyball in Rwanda has grown from a school- and community-based sport into one of the country's most visible team disciplines. FRVB oversees national competitions, national team pathways, and a growing beach volleyball ecosystem while Rwanda continues to build a reputation for hosting major African events.",
  pills: ["FRVB", "Indoor Volleyball", "Beach Volleyball", "Youth Development"],
};

const RWANDA_HIGHLIGHTS = [
  { id: 1, title: "Global & continental affiliation", desc: "FRVB is part of both FIVB and CAVB, linking Rwandan volleyball to continental qualification pathways, courses, and sanctioned competition.", meta: ["FIVB", "CAVB", "International pathway"] },
  { id: 2, title: "A proven host nation", desc: "Rwanda hosted the 2021 Men's African Nations Championship in Kigali and is preparing for the 2026 CAVB Men's Club Championship — the first time Sub-Saharan Africa hosts this event.", meta: ["Kigali", "Continental hosting", "2021 & 2026"] },
];

const GALLERY_ITEMS = [
  { id: 1, tag: "Indoor Volleyball", title: "National League in Action", desc: "Top club competition brings the best of Rwandan indoor volleyball to packed venues across Kigali.", image: "https://images.unsplash.com/photo-1546519638405-a9d1eeb5c54b?w=800&h=500&fit=crop&auto=format" },
  { id: 2, tag: "Beach Volleyball", title: "FRVB National Beach Tour", desc: "The FRVB beach circuit has visited Muhazi, Karongi, and Rwamagana, drawing athletes from across the region.", image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=500&fit=crop&auto=format" },
  { id: 3, tag: "Youth Development", title: "Rwanda's Next Generation", desc: "Youth and intercenter competitions continue to identify and develop the next wave of national volleyball talent.", image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800&h=500&fit=crop&auto=format" },
];

/* ── REAL SOCIAL MEDIA LINKS ── */
const SOCIAL_LINKS = [
  { label: "Facebook",   icon: "f",  url: "https://www.facebook.com/RwandaVolleball/" },
  { label: "Instagram",  icon: "◎", url: "https://www.instagram.com/rwandavolleyballfederation/" },
  { label: "X / Twitter",icon: "𝕏", url: "https://x.com/rw_volleyball" },
  { label: "YouTube",    icon: "▶", url: "https://www.youtube.com/@frvbrwanda" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */
function ScoreBadge({ type, text }) {
  if (type === "live")     return <span className="live-badge">{text}</span>;
  if (type === "upcoming") return <span className="upcoming-badge">{text}</span>;
  return <span className="completed-badge">{text}</span>;
}

function ScoreCard({ score }) {
  return (
    <article className={`score-card${score.badgeType === "live" ? " live" : ""}`}>
      <div className="score-meta">
        <span className="score-league">{score.league}</span>
        <ScoreBadge type={score.badgeType} text={score.badgeText} />
      </div>
      <div className="score-teams">
        <div className="team-info"><div className="team-flag">{score.homeFlag}</div><div className="team-name">{score.homeName}</div></div>
        <div className="score-divider"><div className="score-num">{score.score}</div><div className="score-vs">{score.setScores}</div></div>
        <div className="team-info right"><div className="team-flag">{score.awayFlag}</div><div className="team-name">{score.awayName}</div></div>
      </div>
      <div className="score-time">{score.venue}</div>
    </article>
  );
}

function CompetitionCard({ comp }) {
  return (
    <article className="competition-card">
      <span className="competition-tag">

/* ═══════════════════════════════════════════════════════════════════════════
   GLOBAL CSS
   ═══════════════════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
:root {
  --blue: #2066d1;
  --blue-2: #4a8cff;
  --gold: #f7c500;
  --green: #1aa35c;
  --red: #e24a4a;
  --dark: #f7fbff;
  --darker: #edf5ff;
  --mid: #ffffff;
  --glass: rgba(255, 255, 255, 0.72);
  --glass-2: rgba(255, 255, 255, 0.9);
  --border: rgba(0, 61, 165, 0.12);
  --text: #11315f;
  --muted: rgba(17, 49, 95, 0.68);
  --shadow: 0 16px 40px rgba(0, 61, 165, 0.10);
  --radius: 16px;
  --max-width: 1240px;
  --nav-height: 72px;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { background: linear-gradient(180deg, #f8fbff 0%, #edf4ff 100%); color: var(--text); font-family: "Barlow", sans-serif; overflow-x: hidden; }
body.menu-open { overflow: hidden; }
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
ul { list-style: none; }
button { font: inherit; }
.container { width: min(100% - 40px, var(--max-width)); margin-inline: auto; }

/* ── PROPOSAL BANNER ── */
.proposal-banner {
  background: linear-gradient(90deg, var(--blue), var(--blue-2));
  padding: 10px 20px; font-size: 13px; color: #fff;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.proposal-inner {
  width: min(100% - 20px, var(--max-width)); margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
}
.proposal-badge {
  background: var(--gold); color: #11315f;
  padding: 4px 12px; border-radius: 999px;
  font-size: 11px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase;
}

/* ── NAV ── */
nav {
  position: sticky; top: 0; z-index: 1000;
  height: var(--nav-height);
  background: rgba(255,255,255,0.94);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 2px 16px rgba(0,61,165,0.06);
}
.nav-inner {
  width: min(100% - 40px, var(--max-width));
  height: 100%; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; gap: 20px;
}
.nav-logo { display: flex; align-items: center; gap: 12px; min-width: max-content; }
.logo-badge {
  width: 44px; height: 44px; border-radius: 10px;
  border: 2px solid var(--gold);
  background: linear-gradient(135deg, var(--blue), var(--blue-2));
  display: grid; place-items: center;
  font-family: "Bebas Neue", sans-serif;
  font-size: 16px; color: var(--gold); letter-spacing: 1px;
  box-shadow: var(--shadow);
}
.logo-text { font-family: "Bebas Neue", sans-serif; font-size: 24px; letter-spacing: 2px; color: var(--blue); line-height: 1; }
.logo-sub { font-size: 10px; color: var(--muted); letter-spacing: 1.4px; text-transform: uppercase; margin-top: 2px; }
.nav-links { display: flex; align-items: center; gap: 28px; }
.nav-links a {
  font-size: 14px; font-weight: 700; color: var(--muted);
  letter-spacing: 0.3px; position: relative; transition: color 0.2s ease;
}
.nav-links a::after {
  content: ""; position: absolute; left: 0; bottom: -9px;
  width: 100%; height: 2px; background: var(--gold);
  transform: scaleX(0); transform-origin: left; transition: transform 0.2s ease;
}
.nav-links a:hover, .nav-links a.active { color: var(--text); }
.nav-links a.active::after, .nav-links a:hover::after { transform: scaleX(1); }
.nav-actions { display: flex; align-items: center; gap: 12px; }
.nav-cta, .btn-primary, .btn-outline, .ghost-link {
  transition: transform 0.18s ease, opacity 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}
.nav-cta {
  background: var(--gold); color: #11315f;
  padding: 11px 18px; border-radius: 8px;
  font-size: 13px; font-weight: 900; letter-spacing: 0.5px;
}
.nav-cta:hover, .btn-primary:hover, .btn-outline:hover, .ghost-link:hover { transform: translateY(-2px); }
.hamburger {
  display: none; width: 42px; height: 42px;
  border: 1px solid var(--border); border-radius: 10px;
  background: transparent; align-items: center; justify-content: center;
  cursor: pointer; flex-direction: column; gap: 5px;
}
.hamburger span { width: 20px; height: 2px; border-radius: 2px; background: var(--text); transition: 0.25s ease; }
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ── MOBILE NAV ── */
.mobile-nav {
  position: fixed;
  top: calc(44px + var(--nav-height));
  left: 0; right: 0;
  background: rgba(10,13,28,0.97);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding: 18px 20px 26px;
  display: none; flex-direction: column; gap: 2px; z-index: 999;
}
.mobile-nav.open { display: flex; }
.mobile-nav a { padding: 14px 2px; font-size: 17px; font-weight: 700; color: #e8f0ff; border-bottom: 1px solid rgba(255,255,255,0.08); }
.mobile-nav a:hover { color: var(--gold); }
.mobile-nav .mobile-cta { margin-top: 12px; background: var(--gold); color: #11315f; border-radius: 8px; padding: 14px; text-align: center; font-weight: 900; border-bottom: none; }

/* ── HERO ── */
.hero {
  position: relative; overflow: hidden;
  min-height: calc(100vh - 44px - var(--nav-height));
  display: flex; align-items: center;
  padding: 48px 0 72px;
  background:
    radial-gradient(ellipse at 75% 25%, rgba(32,102,209,0.18), transparent 45%),
    radial-gradient(ellipse at 20% 85%, rgba(26,163,92,0.14), transparent 40%),
    radial-gradient(circle at 50% 10%, rgba(247,197,0,0.12), transparent 30%),
    linear-gradient(to bottom, #f7fbff 0%, #e9f2ff 100%);
}
.hero-grid {
  width: min(100% - 40px, var(--max-width)); margin: 0 auto;
  display: grid; grid-template-columns: 1.2fr 0.8fr;
  align-items: center; gap: 32px; position: relative; z-index: 1;
}
.hero-net { position: absolute; inset: 0; pointer-events: none; opacity: 0.12; }
.hero-net svg { width: 100%; height: 100%; }
.hero-copy { max-width: 680px; position: relative; z-index: 2; }
.hero-label {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid rgba(232,17,45,0.28);
  background: rgba(226,74,74,0.08); color: #bb3b45;
  padding: 7px 14px; border-radius: 999px;
  font-size: 12px; font-weight: 700; margin-bottom: 18px;
  animation: fadeUp 0.55s ease both;
}
.live-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--red); animation: pulse 1.5s infinite; }
.hero h1 {
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(56px, 9vw, 106px);
  line-height: 0.9; letter-spacing: 2px; margin-bottom: 18px; color: var(--text);
  animation: fadeUp 0.55s 0.08s ease both;
}
.hero h1 span { color: var(--gold); display: block; }
.hero-desc { font-size: 17px; line-height: 1.7; color: var(--muted); max-width: 620px; margin-bottom: 28px; animation: fadeUp 0.55s 0.16s ease both; }
.hero-btns { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 30px; animation: fadeUp 0.55s 0.24s ease both; }
.btn-primary { background: linear-gradient(135deg, var(--blue), var(--blue-2)); color: #fff; padding: 15px 24px; border-radius: 10px; font-size: 14px; font-weight: 800; box-shadow: var(--shadow); }
.btn-outline { border: 1.5px solid var(--blue); color: var(--blue); padding: 15px 24px; border-radius: 10px; font-size: 14px; font-weight: 800; background: rgba(255,255,255,0.72); }
.btn-outline:hover { border-color: var(--gold); color: var(--text); }
.hero-stats { display: flex; gap: 18px; flex-wrap: wrap; animation: fadeUp 0.55s 0.32s ease both; }
.stat-item { min-width: 140px; padding: 16px 18px; border-radius: 14px; border: 1px solid var(--border); background: rgba(255,255,255,0.82); box-shadow: 0 4px 16px rgba(0,61,165,0.06); }
.stat-num { font-family: "Bebas Neue", sans-serif; font-size: 42px; line-height: 1; color: var(--blue); }
.stat-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1.2px; margin-top: 4px; }

/* ── HERO VISUAL ── */
.hero-visual {
  display: flex; justify-content: center; align-items: center;
  position: relative; min-height: 420px; perspective: 1000px;
}
.visual-ring {
  position: absolute; width: 430px; height: 430px; border-radius: 50%;
  background:
    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent 28%),
    radial-gradient(circle at 50% 50%, rgba(247,197,0,0.1), transparent 55%);
  border: 1px solid rgba(32,102,209,0.12); filter: blur(1px);
}
.volleyball {
  width: min(360px, 80vw);
  transform-style: preserve-3d; will-change: transform;
  animation: floatBall 5s ease-in-out infinite;
  z-index: 1; cursor: pointer;
}
.volleyball svg { width: 100%; height: auto; display: block; }
.volleyball:hover { filter: drop-shadow(0 14px 28px rgba(32, 102, 209, 0.22)); }
.volleyball.burst {
  animation: floatBall 5s ease-in-out infinite, ballPop 0.45s ease;
  filter: drop-shadow(0 22px 36px rgba(32, 102, 209, 0.28));
}
.ball-cursor {
  position: absolute; width: 12px; height: 12px;
  border-radius: 50%; background: var(--gold);
  pointer-events: none; opacity: 0; z-index: 10;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s ease; mix-blend-mode: multiply;
}
.hero-visual:hover .ball-cursor { opacity: 1; }
.hero-mini-card {
  position: absolute; border: 1px solid var(--border);
  background: rgba(255,255,255,0.92); backdrop-filter: blur(12px);
  border-radius: 14px; padding: 14px 16px;
  box-shadow: var(--shadow); min-width: 160px; z-index: 5;
}
.hero-mini-card.top { top: 45px; left: 100px; }
.hero-mini-card.bottom { right: 15px; bottom: 60px; }
.mini-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); margin-bottom: 6px; }
.mini-value { font-size: 22px; font-weight: 900; color: var(--blue); line-height: 1; margin-bottom: 4px; }
.mini-copy { font-size: 12px; color: var(--muted); line-height: 1.45; }

/* ── TICKER ── */
.ticker {
  background: var(--blue); color: #fff;
  overflow: hidden; white-space: nowrap; height: 42px;
  display: flex; align-items: center;
}
.ticker-track { display: inline-flex; min-width: max-content; animation: tickerScroll 36s linear infinite; }
.ticker-item { font-size: 13px; font-weight: 700; padding: 0 28px; }
.ticker-item .dot { margin-left: 28px; color: var(--gold); }

/* ── SECTIONS ── */
main section { padding: 84px 0; }
.section-head { display: flex; justify-content: space-between; align-items: end; gap: 20px; margin-bottom: 34px; flex-wrap: wrap; }
.section-label { font-size: 12px; font-weight: 800; color: var(--blue); text-transform: uppercase; letter-spacing: 3px; margin-bottom: 8px; }
.section-title { font-family: "Bebas Neue", sans-serif; font-size: clamp(38px, 5vw, 56px); line-height: 0.95; letter-spacing: 1px; color: var(--text); }
.section-subtitle { max-width: 560px; color: var(--muted); line-height: 1.7; font-size: 15px; }
.ghost-link { color: var(--blue); border: 1px solid var(--border); border-radius: 999px; padding: 10px 16px; font-size: 13px; font-weight: 800; white-space: nowrap; transition: border-color 0.2s, background 0.2s; }
.ghost-link:hover { border-color: var(--gold); background: rgba(247,197,0,0.06); }
.scores-section { background: #f0f6ff; }
.teams-section { background: #f0f6ff; }
.calendar-section { background: #f0f6ff; }
.scores-grid, .competitions-grid, .news-grid, .teams-grid, .calendar-grid, .footer-top, .gallery-grid, .overview-grid { display: grid; gap: 18px; }
.scores-grid { grid-template-columns: repeat(3, 1fr); }

/* ── CARDS BASE ── */
.score-card, .competition-card, .news-featured, .news-item, .team-card, .calendar-card, .gallery-card, .overview-side-card {
  background: #fff; border: 1px solid var(--border); border-radius: var(--radius);
  transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
}
.score-card:hover, .competition-card:hover, .news-featured:hover, .news-item:hover, .team-card:hover, .calendar-card:hover, .gallery-card:hover, .overview-side-card:hover {
  transform: translateY(-4px); border-color: rgba(247,197,0,0.4);
  box-shadow: 0 8px 28px rgba(0,61,165,0.10);
}

/* ── SCORE CARDS ── */
.score-card { padding: 24px; }
.score-card.live { border-color: rgba(226,74,74,0.45); }
.score-meta { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
.score-league { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1.2px; }
.live-badge, .upcoming-badge, .completed-badge { font-size: 10px; font-weight: 900; letter-spacing: 1px; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; }
.live-badge { background: var(--red); color: #fff; }
.upcoming-badge { background: var(--blue); color: #fff; }
.completed-badge { background: rgba(32,102,209,0.06); color: var(--muted); border: 1px solid var(--border); }
.score-teams { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 14px; }
.team-info { flex: 1; }
.team-info.right { text-align: right; }
.team-flag { font-size: 28px; margin-bottom: 6px; }
.team-name { font-size: 14px; font-weight: 800; line-height: 1.35; color: var(--text); }
.score-divider { text-align: center; flex-shrink: 0; }
.score-num { font-family: "Bebas Neue", sans-serif; font-size: 42px; line-height: 1; letter-spacing: 1px; color: var(--text); }
.score-vs { color: var(--muted); font-size: 11px; letter-spacing: 1px; margin-top: 4px; }
.score-time { color: var(--muted); font-size: 12px; }

/* ── COMPETITION CARDS ── */
.competitions-grid { grid-template-columns: repeat(3, 1fr); }
.competition-card { padding: 24px; position: relative; overflow: hidden; }
.competition-card::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 4px; background: linear-gradient(to bottom, var(--gold), var(--green)); }
.competition-tag { display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: var(--blue); margin-bottom: 14px; }
.competition-card h3 { font-size: 20px; line-height: 1.2; margin-bottom: 10px; color: var(--text); }
.competition-card p { color: var(--muted); line-height: 1.65; font-size: 14px; margin-bottom: 18px; }
.competition-meta { display: flex; flex-wrap: wrap; gap: 10px; }
.competition-meta span { font-size: 12px; color: var(--blue); background: rgba(32,102,209,0.07); border: 1px solid rgba(32,102,209,0.15); border-radius: 999px; padding: 7px 11px; font-weight: 600; }

/* ── OVERVIEW SECTION ── */
.overview-section { background: #fff; }
.overview-grid { grid-template-columns: 1.4fr 1fr; gap: 24px; align-items: start; }
.overview-story { background: linear-gradient(135deg, #f0f6ff, #e8f2ff); border: 1px solid var(--border); border-radius: var(--radius); padding: 36px; }
.overview-kicker { font-size: 13px; font-weight: 800; color: var(--blue); margin-bottom: 14px; text-transform: uppercase; letter-spacing: 1px; }
.overview-story h3 { font-size: 22px; line-height: 1.35; margin-bottom: 14px; color: var(--text); }
.overview-story > p { color: var(--muted); line-height: 1.8; font-size: 15px; margin-bottom: 24px; }
.overview-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
.overview-pills span { font-size: 12px; font-weight: 700; background: rgba(32,102,209,0.09); border: 1px solid rgba(32,102,209,0.18); border-radius: 999px; padding: 7px 14px; color: var(--blue); }
.overview-stats { display: flex; gap: 28px; flex-wrap: wrap; }
.overview-stat { display: flex; flex-direction: column; }
.overview-stat strong { font-family: "Bebas Neue", sans-serif; font-size: 40px; line-height: 1; color: var(--gold); }
.overview-stat span { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
.overview-side { display: flex; flex-direction: column; gap: 16px; }
.overview-side-card { padding: 24px; }
.overview-side-card h4 { font-size: 17px; margin-bottom: 10px; line-height: 1.35; color: var(--text); }
.overview-side-card p { font-size: 13px; color: var(--muted); line-height: 1.65; margin-bottom: 14px; }
.overview-meta { display: flex; flex-wrap: wrap; gap: 8px; }
.overview-meta span { font-size: 11px; font-weight: 700; background: rgba(32,102,209,0.06); border: 1px solid var(--border); border-radius: 999px; padding: 5px 10px; color: var(--blue); }

/* ── NEWS ── */
.news-section { background: #f0f6ff; }
.news-grid { grid-template-columns: 1.5fr 1fr; align-items: stretch; }
.news-featured { overflow: hidden; }
.news-img-bg { height: 260px; overflow: hidden; position: relative; background: linear-gradient(135deg, var(--blue), var(--green)); }
.news-img-bg img { width: 100%; height: 100%; object-fit: cover; display: block; }
.news-content { padding: 24px; }
.news-cat { display: inline-block; background: rgba(32,102,209,0.10); color: var(--blue); border-radius: 999px; padding: 5px 12px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; }
.news-content h3 { font-size: 22px; line-height: 1.3; margin-bottom: 10px; color: var(--text); }
.news-content p { color: var(--muted); line-height: 1.7; font-size: 15px; margin-bottom: 16px; }
.news-date { font-size: 12px; color: var(--muted); }
.news-list { display: flex; flex-direction: column; gap: 12px; }
.news-item { padding: 18px; cursor: pointer; }
.news-item-cat { font-size: 11px; font-weight: 800; color: var(--gold); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
.news-item h4 { font-size: 15px; line-height: 1.45; margin-bottom: 10px; color: var(--text); }
.news-item-date { font-size: 12px; color: var(--muted); }

/* ── GALLERY ── */
.gallery-section { background: #fff; }
.gallery-grid { grid-template-columns: repeat(3, 1fr); }
.gallery-card { overflow: hidden; cursor: pointer; }
.gallery-image { height: 220px; overflow: hidden; position: relative; background: linear-gradient(135deg, var(--blue), var(--green)); }
.gallery-image img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
.gallery-card:hover .gallery-image img { transform: scale(1.06); }
.gallery-content { padding: 20px; }
.gallery-tag { font-size: 11px; font-weight: 800; color: var(--blue); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; display: inline-block; }
.gallery-content h3 { font-size: 17px; line-height: 1.35; margin-bottom: 8px; color: var(--text); }
.gallery-content p { font-size: 13px; color: var(--muted); line-height: 1.6; }

/* ── TEAMS ── */
.teams-tabs { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 28px; }
.tab-btn { border: 1px solid var(--border); background: #fff; color: var(--muted); padding: 10px 20px; border-radius: 999px; font-size: 13px; font-weight: 800; cursor: pointer; transition: background 0.2s, border-color 0.2s, color 0.2s; }
.tab-btn.active, .tab-btn:hover { background: var(--blue); border-color: var(--blue); color: #fff; }
.teams-grid { grid-template-columns: repeat(3, 1fr); }
.team-card { padding: 28px 20px; text-align: center; position: relative; overflow: hidden; }
.team-card::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 3px; background: linear-gradient(90deg, var(--blue), var(--green), var(--gold)); transform: scaleX(0); transition: transform 0.25s ease; }
.team-card:hover::before { transform: scaleX(1); }
.team-emoji { font-size: 40px; display: inline-block; margin-bottom: 14px; }
.team-card h3 { font-size: 18px; margin-bottom: 6px; color: var(--text); }
.team-card p { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 14px; }
.team-record { font-family: "Bebas Neue", sans-serif; font-size: 24px; line-height: 1; color: var(--blue); }
.team-record-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); margin-top: 4px; }

/* ── CALENDAR ── */
.calendar-grid { grid-template-columns: repeat(3, 1fr); }
.calendar-card { padding: 24px; background: #fff; }
.calendar-date { display: inline-block; background: rgba(247,197,0,0.14); color: #7a5c00; border: 1px solid rgba(247,197,0,0.32); padding: 7px 12px; border-radius: 999px; font-size: 11px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 14px; }
.calendar-card h3 { font-size: 19px; line-height: 1.3; margin-bottom: 8px; color: var(--text); }
.calendar-card p { color: var(--muted); line-height: 1.7; font-size: 14px; margin-bottom: 14px; }
.calendar-meta { font-size: 12px; color: var(--text); display: flex; flex-direction: column; gap: 6px; font-weight: 600; }

/* ── FOOTER ── */
footer { background: #0d1e3d; border-top: 1px solid rgba(255,255,255,0.06); padding: 64px 0 28px; color: #e8f0ff; }
.footer-top { grid-template-columns: 2fr 1fr 1fr 1fr; margin-bottom: 34px; }
.footer-brand p { color: rgba(232,240,255,0.62); line-height: 1.8; font-size: 14px; max-width: 420px; margin: 14px 0 20px; }
.footer-col h4 { font-size: 11px; color: var(--gold); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; }
.footer-col ul { display: flex; flex-direction: column; gap: 10px; }
.footer-col a { color: rgba(232,240,255,0.60); font-size: 14px; transition: color 0.2s; }
.footer-col a:hover { color: var(--gold); }
.footer-logo-text { font-family: "Bebas Neue", sans-serif; font-size: 24px; letter-spacing: 2px; color: var(--gold); line-height: 1; }
.footer-logo-sub { font-size: 10px; color: rgba(232,240,255,0.5); letter-spacing: 1.4px; text-transform: uppercase; margin-top: 2px; }
.social-links { display: flex; gap: 10px; flex-wrap: wrap; }
.social-link {
  width: 40px; height: 40px; display: grid; place-items: center;
  border-radius: 10px; background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10); font-size: 15px;
  color: #e8f0ff; transition: border-color 0.2s, background 0.2s, color 0.2s;
}
.social-link:hover { border-color: var(--gold); background: rgba(247,197,0,0.12); color: var(--gold); }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.07); padding-top: 20px; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
.footer-bottom p { color: rgba(232,240,255,0.42); font-size: 13px; }
.footer-bottom a { color: var(--gold); }

/* ── REVEAL ── */
.reveal { opacity: 0; transform: translateY(26px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ── KEYFRAMES ── */
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
@keyframes floatBall {
  0%, 100% { transform: translate3d(0, 0, 0) rotateZ(0deg); }
  50%       { transform: translate3d(0, -16px, 0) rotateZ(6deg); }
}
@keyframes ballPop {
  0% { transform: scale(1); } 35% { transform: scale(1.08); }
  70% { transform: scale(0.94); } 100% { transform: scale(1); }
}
@keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* ── RESPONSIVE ── */
@media (max-width: 1100px) {
  .hero-grid, .news-grid, .scores-grid, .competitions-grid, .calendar-grid, .teams-grid, .footer-top, .overview-grid, .gallery-grid { grid-template-columns: 1fr 1fr; }
  .hero-grid { align-items: start; }
  .hero-copy { max-width: 100%; }
  .footer-top { grid-template-columns: 2fr 1fr 1fr; }
}
@media (max-width: 860px) {
  .nav-links, .nav-cta { display: none; }
  .hamburger { display: flex; }
  .hero { padding: 42px 0 56px; }
  .hero-grid, .news-grid, .scores-grid, .competitions-grid, .calendar-grid, .teams-grid, .footer-top, .overview-grid, .gallery-grid { grid-template-columns: 1fr; }
  .hero-visual { min-height: 320px; }
  .visual-ring { width: 320px; height: 320px; }
  .hero-mini-card.top { top: 6px; left: 0; }
  .hero-mini-card.bottom { right: 0; bottom: 0; }
  main section { padding: 66px 0; }
}
@media (max-width: 640px) {
  .container, .nav-inner { width: min(100% - 24px, var(--max-width)); }
  .proposal-banner { padding-inline: 12px; }
  .hero h1 { font-size: 54px; }
  .hero-desc { font-size: 15px; }
  .hero-btns { flex-direction: column; }
  .btn-primary, .btn-outline { text-align: center; }
  .score-teams { gap: 8px; }
  .score-num { font-size: 34px; }
  .news-img-bg { height: 200px; }
  .hero-mini-card { min-width: 130px; padding: 12px 14px; }
  .footer-bottom { flex-direction: column; text-align: center; }
  .footer-top { grid-template-columns: 1fr 1fr; }
}
@media (hover: none) {
  .ball-cursor { display: none; }
  .volleyball { cursor: auto; }
}
`;

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */
const TICKER_ITEMS = [
  "FRVB established in 1984 — affiliated with CAVB and FIVB",
  "Kigali to host the 47th CAVB Men's Club Championship — Apr 20 to May 3, 2026",
  "Beach Volleyball National Tour continues to grow across Muhazi, Karongi, and Rwamagana",
  "Youth competitions continue to strengthen Rwanda's talent pathway",
  "Rwanda builds its profile as a host nation for African volleyball",
];

const SCORES = [
  { id: 1, league: "National League — Men", badgeType: "live", badgeText: "Live Set 3", homeFlag: "🏐", homeName: "APR Volleyball Club", score: "2 — 1", setScores: "21 · 18 · 21", awayFlag: "🏐", awayName: "REG Volleyball", venue: "Amahoro Indoor Stadium · Kigali" },
  { id: 2, league: "National League — Women", badgeType: "upcoming", badgeText: "Today 18:30", homeFlag: "🏐", homeName: "IPRC Kigali", score: "vs", setScores: "Kick-off soon", awayFlag: "🏐", awayName: "Police Volleyball", venue: "Petit Stade · Kigali" },
  { id: 3, league: "National League — Men", badgeType: "completed", badgeText: "Final", homeFlag: "🏐", homeName: "Rwanda Energy Group", score: "3 — 0", setScores: "25 · 22 · 25", awayFlag: "🏐", awayName: "Gisagara VC", venue: "BK Arena · Kigali" },
];

const COMPETITIONS = [
  { id: 1, tag: "Featured Tournament", title: "47th CAVB Men's Club Championship", desc: "Kigali is set to host the continental club championship from April 20 to May 3, 2026, with APR VC, Police VC, and Kepler VC representing Rwanda.", meta: ["Kigali", "Apr 20 – May 3, 2026", "Continental Clubs"] },
  { id: 2, tag: "National League", title: "Rwanda National Volleyball League", desc: "FRVB's domestic structure includes national league competition for men's and women's clubs, alongside recurring tournaments that keep the calendar active across the season.", meta: ["Men & Women", "Domestic Season", "FRVB Competition"] },
  { id: 3, tag: "Beach Circuit", title: "National Beach Volleyball Tour", desc: "Recent FRVB beach tour stops in Muhazi and Rwamagana show the federation's growing investment in beach volleyball, athlete exposure, and fan-facing events.", meta: ["Beach Volleyball", "National Tour", "Player Development"] },
];

const NEWS_ITEMS = [
  { id: 1, cat: "Hosting", headline: "Kigali confirmed to stage the 47th CAVB Men's Club Championship in April–May 2026", date: "March 6, 2026" },
  { id: 2, cat: "Youth", headline: "Isonga intercenter competitions highlighted Rwanda's rising volleyball talent in Nyanza", date: "February 9, 2026" },
  { id: 3, cat: "Beach", headline: "Rwamagana stop of the FRVB Beach Volleyball National Tour crowned new winners in December 2025", date: "December 23, 2025" },
  { id: 4, cat: "Beach", headline: "Muhazi season opener brought 23 pairs from five countries to the FRVB National Beach Volleyball Tour", date: "November 6, 2024" },
];

const TEAMS = [
  { id: 1, emoji: "🇷🇼", name: "Senior Men",   desc: "Rwanda's senior men's indoor program represents the country in regional and continental competition.", record: "National Team", recordLabel: "Indoor Program", category: "senior" },
  { id: 2, emoji: "🇷🇼", name: "Senior Women", desc: "The senior women's side forms part of Rwanda's international presence under FRVB and CAVB competition pathways.", record: "National Team", recordLabel: "Indoor Program", category: "senior" },
  { id: 3, emoji: "🌟",  name: "Youth Boys",   desc: "Youth structures and intercenter events are helping identify and prepare the next generation of volleyball talent.", record: "Talent Pathway", recordLabel: "Youth Development", category: "youth" },
  { id: 4, emoji: "🌟",  name: "Youth Girls",  desc: "School and youth competition remains a major entry point for athlete growth and national scouting.", record: "Talent Pathway", recordLabel: "Youth Development", category: "youth" },
  { id: 5, emoji: "🏖️", name: "Beach Men",    desc: "Rwanda's men's beach program benefits from FRVB tour stops, selection camps, and international exposure.", record: "Active Circuit", recordLabel: "Beach Program", category: "beach" },
  { id: 6, emoji: "☀️",  name: "Beach Women",  desc: "The women's beach unit continues to gain visibility through domestic tour events and continental participation.", record: "Active Circuit", recordLabel: "Beach Program", category: "beach" },
];

const CALENDAR = [
  { id: 1, date: "Apr 20 – May 3, 2026", title: "47th CAVB Men's Club Championship", desc: "Kigali will host a landmark edition of the continental club championship — the first time the tournament is staged in Sub-Saharan Africa.", meta: ["📍 Kigali", "🌍 Continental event"] },
  { id: 2, date: "2026 Season", title: "Rwanda National Volleyball League", desc: "Domestic men's and women's league competition remains the backbone of the annual volleyball calendar and club ecosystem.", meta: ["📍 Nationwide", "🏐 Indoor season"] },
  { id: 3, date: "Beach Tour Stops", title: "FRVB National Beach Volleyball Tour", desc: "Successive tour stops in Muhazi, Karongi, and Rwamagana highlight the beach circuit's growing role in Rwanda's volleyball story.", meta: ["🏖️ Beach circuit", "📈 Athlete exposure"] },
];

const ABOUT_CARDS = [
  { id: 1, tag: "History", title: "Volleyball has deep roots in Rwanda", desc: "Volleyball spread through schools, military camps, and communities before FRVB was established in 1984 and affiliated the same year to CAVB and FIVB.", meta: ["Established 1984", "FIVB", "CAVB"] },
  { id: 2, tag: "Growth", title: "Rwanda keeps expanding its volleyball footprint", desc: "Rwanda has hosted major continental events in indoor and beach volleyball, helping position Kigali and other venues as important competition hubs.", meta: ["Hosting Nation", "Kigali", "Beach & Indoor"] },
  { id: 3, tag: "Future", title: "Development is moving in multiple directions", desc: "League play, youth competitions, and the beach tour all create a stronger performance pipeline while giving fans more entry points into the sport.", meta: ["Youth", "League", "Beach Tour"] },
];

const RWANDA_OVERVIEW = {
  title: "Volleyball in Rwanda is growing through league play, hosting power, and beach momentum.",
  body: "Volleyball in Rwanda has grown from a school- and community-based sport into one of the country's most visible team disciplines. FRVB oversees national competitions, national team pathways, and a growing beach volleyball ecosystem while Rwanda continues to build a reputation for hosting major African events.",
  pills: ["FRVB", "Indoor Volleyball", "Beach Volleyball", "Youth Development"],
};

const RWANDA_HIGHLIGHTS = [
  { id: 1, title: "Global & continental affiliation", desc: "FRVB is part of both FIVB and CAVB, linking Rwandan volleyball to continental qualification pathways, courses, and sanctioned competition.", meta: ["FIVB", "CAVB", "International pathway"] },
  { id: 2, title: "A proven host nation", desc: "Rwanda hosted the 2021 Men's African Nations Championship in Kigali and is preparing for the 2026 CAVB Men's Club Championship — the first time Sub-Saharan Africa hosts this event.", meta: ["Kigali", "Continental hosting", "2021 & 2026"] },
];

const GALLERY_ITEMS = [
  { id: 1, tag: "Indoor Volleyball", title: "National League in Action", desc: "Top club competition brings the best of Rwandan indoor volleyball to packed venues across Kigali.", image: "https://images.unsplash.com/photo-1546519638405-a9d1eeb5c54b?w=800&h=500&fit=crop&auto=format" },
  { id: 2, tag: "Beach Volleyball", title: "FRVB National Beach Tour", desc: "The FRVB beach circuit has visited Muhazi, Karongi, and Rwamagana, drawing athletes from across the region.", image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=500&fit=crop&auto=format" },
  { id: 3, tag: "Youth Development", title: "Rwanda's Next Generation", desc: "Youth and intercenter competitions continue to identify and develop the next wave of national volleyball talent.", image: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800&h=500&fit=crop&auto=format" },
];

/* ── REAL SOCIAL MEDIA LINKS ── */
const SOCIAL_LINKS = [
  { label: "Facebook",   icon: "f",  url: "https://www.facebook.com/RwandaVolleball/" },
  { label: "Instagram",  icon: "◎", url: "https://www.instagram.com/rwandavolleyballfederation/" },
  { label: "X / Twitter",icon: "𝕏", url: "https://x.com/rw_volleyball" },
  { label: "YouTube",    icon: "▶", url: "https://www.youtube.com/@frvbrwanda" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */
function ScoreBadge({ type, text }) {
  if (type === "live")     return <span className="live-badge">{text}</span>;
  if (type === "upcoming") return <span className="upcoming-badge">{text}</span>;
  return <span className="completed-badge">{text}</span>;
}

function ScoreCard({ score }) {
  return (
    <article className={`score-card${score.badgeType === "live" ? " live" : ""}`}>
      <div className="score-meta">
        <span className="score-league">{score.league}</span>
        <ScoreBadge type={score.badgeType} text={score.badgeText} />
      </div>
      <div className="score-teams">
        <div className="team-info"><div className="team-flag">{score.homeFlag}</div><div className="team-name">{score.homeName}</div></div>
        <div className="score-divider"><div className="score-num">{score.score}</div><div className="score-vs">{score.setScores}</div></div>
        <div className="team-info right"><div className="team-flag">{score.awayFlag}</div><div className="team-name">{score.awayName}</div></div>
      </div>
      <div className="score-time">{score.venue}</div>
    </article>
  );
}

function CompetitionCard({ comp }) {
  return (
    <article className="competition-card">
      <span className="competition-tag">{comp.tag}</span>
      <h3>{comp.title}</h3>
      <p>{comp.desc}</p>
      <div className="competition-meta">{comp.meta.map((m) => <span key={m}>{m}</span>)}</div>
    </article>
  );
}

function VolleyballIcon({ color = "#003DA5", size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{display:"block",margin:"0 auto"}}>
      <circle cx="50" cy="50" r="46" fill="#f5f4f0" stroke={color} strokeWidth="2.5"/>
      <g fill="none" strokeLinecap="round">
        <path d="M50 6 C63 16 70 32 70 50 C70 68 63 84 50 94" stroke={color} strokeWidth="4"/>
        <path d="M50 6 C37 16 30 32 30 50 C30 68 37 84 50 94" stroke={color} strokeWidth="4"/>
        <path d="M6 50 C16 37 32 30 50 30 C68 30 84 37 94 50" stroke={color} strokeWidth="4"/>
        <path d="M6 50 C16 63 32 70 50 70 C68 70 84 63 94 50" stroke={color} strokeWidth="4"/>
      </g>
      <ellipse cx="36" cy="30" rx="18" ry="11" fill="rgba(255,255,255,0.55)" transform="rotate(-28 36 30)"/>
    </svg>
  );
}

function FRVBLogo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="FRVB Rwanda Volleyball Federation Logo">
      <path d="M44 4 L80 16 L80 52 C80 66 65 78 44 84 C23 78 8 66 8 52 L8 16 Z" fill="#003DA5"/>
      <path d="M44 8 L76 19 L76 52 C76 64 63 75 44 81 C25 75 12 64 12 52 L12 19 Z" fill="none" stroke="#F7C500" strokeWidth="2.5"/>
      <rect x="12" y="62" width="64" height="7" fill="#20BF6B"/>
      <rect x="12" y="69" width="64" height="6" fill="#F7C500"/>
      <circle cx="44" cy="36" r="18" fill="#f5f4f0" stroke="#F7C500" strokeWidth="1.5"/>
      <g fill="none" strokeLinecap="round" stroke="#003DA5" strokeWidth="2.2">
        <path d="M44 18 C49 22 52 28 52 36 C52 44 49 50 44 54"/>
        <path d="M44 18 C39 22 36 28 36 36 C36 44 39 50 44 54"/>
        <path d="M26 36 C30 31 37 28 44 28 C51 28 58 31 62 36"/>
        <path d="M26 36 C30 41 37 44 44 44 C51 44 58 41 62 36"/>
      </g>
      <ellipse cx="38" cy="28" rx="8" ry="5" fill="rgba(255,255,255,0.5)" transform="rotate(-25 38 28)"/>
      <text x="44" y="76" textAnchor="middle" fontFamily="'Bebas Neue',sans-serif" fontSize="11" fontWeight="900" fill="#F7C500" letterSpacing="2">FRVB</text>
    </svg>
  );
}

function TeamCard({ team }) {
  return (
    <article className="team-card" style={{borderTop: `3px solid ${team.color || "var(--blue)"}`}}>
      <div style={{marginBottom:"14px",paddingTop:"8px"}}>
        <VolleyballIcon color={team.color || "#003DA5"} size={52}/>
      </div>
      <div style={{display:"inline-block",fontSize:"11px",fontWeight:"800",letterSpacing:"1px",textTransform:"uppercase",color:"#fff",background:team.color||"var(--blue)",borderRadius:"999px",padding:"3px 10px",marginBottom:"10px"}}>{team.city}</div>
      <h3>{team.name}</h3>
      <p>{team.desc}</p>
      <div className="team-record">{team.record}</div>
      <div className="team-record-label">{team.recordLabel}</div>
    </article>
  );
}

function CalendarCard({ event }) {
  return (
    <article className="calendar-card">
      <span className="calendar-date">{event.date}</span>
      <h3>{event.title}</h3>
      <p>{event.desc}</p>
      <div className="calendar-meta">{event.meta.map((m) => <span key={m}>{m}</span>)}</div>
    </article>
  );
}

function GalleryCard({ item }) {
  return (
    <article className="gallery-card">
      <div className="gallery-image">
        <img src={item.image} alt={item.title} loading="lazy" />
      </div>
      <div className="gallery-content">
        <span className="gallery-tag">{item.tag}</span>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    </article>
  );
}

function VolleyballSVG() {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ballBase" cx="36%" cy="30%" r="68%">
          <stop offset="0%" stopColor="#ffffff" /><stop offset="40%" stopColor="#f5f4f0" /><stop offset="100%" stopColor="#c8c8c2" />
        </radialGradient>
        <radialGradient id="ballShadow" cx="74%" cy="78%" r="58%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" /><stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
        </radialGradient>
        <radialGradient id="ballHighlight" cx="28%" cy="22%" r="45%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.72)" /><stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="ballDropShadow" x="-25%" y="-25%" width="150%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="14" />
          <feOffset dx="0" dy="22" result="offsetBlur" />
          <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
          <feFlood floodColor="rgba(0,0,0,0.3)" result="color" />
          <feComposite in="color" in2="offsetBlur" operator="in" result="shadow" />
          <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="ballClip"><circle cx="200" cy="200" r="182" /></clipPath>
      </defs>
      <ellipse cx="200" cy="390" rx="160" ry="14" fill="rgba(0,61,165,0.12)" />
      <g filter="url(#ballDropShadow)">
        <circle cx="200" cy="200" r="182" fill="url(#ballBase)" />
        <g clipPath="url(#ballClip)" fill="none">
          <path d="M200 20 C255 60 280 128 280 200 C280 272 255 340 200 380" stroke="#003DA5" strokeWidth="12" strokeLinecap="round" />
          <path d="M200 20 C145 60 120 128 120 200 C120 272 145 340 200 380" stroke="#003DA5" strokeWidth="12" strokeLinecap="round" />
          <path d="M20 200 C60 148 128 122 200 122 C272 122 340 148 380 200" stroke="#003DA5" strokeWidth="12" strokeLinecap="round" />
          <path d="M20 200 C60 252 128 278 200 278 C272 278 340 252 380 200" stroke="#003DA5" strokeWidth="12" strokeLinecap="round" />
          <path d="M58 62 C102 92 148 138 168 200" stroke="#1a50c0" strokeWidth="7.5" strokeLinecap="round" opacity="0.88" />
          <path d="M342 62 C298 92 252 138 232 200" stroke="#1a50c0" strokeWidth="7.5" strokeLinecap="round" opacity="0.88" />
          <path d="M58 338 C102 308 148 262 168 200" stroke="#1a50c0" strokeWidth="7.5" strokeLinecap="round" opacity="0.88" />
          <path d="M342 338 C298 308 252 262 232 200" stroke="#1a50c0" strokeWidth="7.5" strokeLinecap="round" opacity="0.88" />
          <path d="M200 20 C255 60 280 128 280 200" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
          <path d="M200 380 C145 340 120 272 120 200" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 200 C60 148 128 122 200 122" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
          <path d="M380 200 C340 252 272 278 200 278" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle cx="200" cy="200" r="182" fill="url(#ballShadow)" opacity="0.6" />
        <ellipse cx="142" cy="118" rx="72" ry="46" fill="url(#ballHighlight)" transform="rotate(-28 142 118)" />
        <circle cx="200" cy="200" r="182" fill="none" stroke="rgba(0,0,0,0.10)" strokeWidth="4" />
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function FRVBWebsite() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [activeNav, setActiveNav] = useState("top");
  const [ballBurst, setBallBurst] = useState(false);

  const heroBallRef      = useRef(null);
  const heroVisualRef    = useRef(null);
  const ballCursorRef    = useRef(null);
  const ballClickTimeout = useRef(null);
  const msRef = useRef({
    mouseRotX: 0, mouseRotY: 0, mouseRotZ: 0,
    targetRotX: 0, targetRotY: 0, targetRotZ: 0,
    scrollTX: 0, scrollTY: 0, scrollRZ: 0, scrollRX: 0, rafId: null,
  });

  /* ── body class for menu ── */
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  /* ── scroll reveal ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ── active nav link on scroll ── */
  useEffect(() => {
    const ids = ["top", "match-centre", "competitions", "news", "teams", "calendar", "about"];
    const getSections = () => ids.map((id) => ({
      id,
      el: id === "top" ? document.querySelector("header.hero") : document.getElementById(id),
    })).filter((s) => s.el);

    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      let current = "top";
      getSections().forEach(({ id, el }) => { if (scrollY >= el.offsetTop) current = id; });
      setActiveNav(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── ball interaction ── */
  useEffect(() => {
    const ms = msRef.current;
    const ball = heroBallRef.current;
    const visual = heroVisualRef.current;
    const cur = ballCursorRef.current;
    if (!ball || !visual) return;

    const calcScroll = () => {
      const rect = visual.getBoundingClientRect();
      const prog = Math.max(-1, Math.min(1, (window.innerHeight * 0.5 - (rect.top + rect.height / 2)) / window.innerHeight));
      ms.scrollRZ = prog * 42; ms.scrollRX = prog * -12; ms.scrollTY = prog * -22; ms.scrollTX = prog * 8;
    };
    const onMove = (e) => {
      const rect = visual.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      ms.targetRotY = nx * 28; ms.targetRotX = -ny * 18; ms.targetRotZ = nx * ny * 8;
      if (cur) { cur.style.left = (e.clientX - rect.left) + "px"; cur.style.top = (e.clientY - rect.top) + "px"; }
    };
    const onLeave = () => { ms.targetRotX = ms.targetRotY = ms.targetRotZ = 0; };
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ms.mouseRotX = lerp(ms.mouseRotX, ms.targetRotX, 0.07);
      ms.mouseRotY = lerp(ms.mouseRotY, ms.targetRotY, 0.07);
      ms.mouseRotZ = lerp(ms.mouseRotZ, ms.targetRotZ, 0.07);
      ball.style.transform = `translate3d(${ms.scrollTX}px,${ms.scrollTY}px,0) rotateX(${ms.scrollRX + ms.mouseRotX}deg) rotateY(${ms.mouseRotY}deg) rotateZ(${ms.scrollRZ + ms.mouseRotZ}deg)`;
      ms.rafId = requestAnimationFrame(tick);
    };
    let pending = false;
    const onScroll = () => { if (!pending) { requestAnimationFrame(() => { calcScroll(); pending = false; }); pending = true; } };
    visual.addEventListener("mousemove", onMove);
    visual.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calcScroll);
    calcScroll(); tick();
    return () => {
      visual.removeEventListener("mousemove", onMove);
      visual.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calcScroll);
      if (ms.rafId) cancelAnimationFrame(ms.rafId);
    };
  }, []);

  useEffect(() => () => { if (ballClickTimeout.current) clearTimeout(ballClickTimeout.current); }, []);

  const handleBallClick = () => {
    const ms = msRef.current;
    setBallBurst(false);
    requestAnimationFrame(() => setBallBurst(true));
    ms.targetRotY += 24; ms.targetRotX -= 10; ms.targetRotZ += 18;
    if (ballClickTimeout.current) clearTimeout(ballClickTimeout.current);
    ballClickTimeout.current = setTimeout(() => setBallBurst(false), 450);
  };

  const filtered  = activeTab === "all" ? TEAMS : TEAMS.filter((t) => t.category === activeTab);
  const closeMenu = () => setMenuOpen(false);
  const isActive  = (id) => activeNav === id;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── PROPOSAL BANNER ── */}
      <div className="proposal-banner">
        <div className="proposal-inner">
          <p><strong>Website Redesign Proposal</strong> — Prepared for Rwanda Volleyball Federation (FRVB)</p>
          <div className="proposal-badge">Demo Mockup</div>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav aria-label="Main navigation">
        <div className="nav-inner">
          <a href="#top" className="nav-logo" aria-label="FRVB Home">
            <FRVBLogo size={44} />
            <div><div className="logo-text">FRVB</div><div className="logo-sub">Rwanda Volleyball</div></div>
          </a>
          <div className="nav-links">
            <a href="#teams"        className={isActive("teams")        ? "active" : ""}>Teams</a>
            <a href="#competitions" className={isActive("competitions") ? "active" : ""}>Competitions</a>
            <a href="#news"         className={isActive("news")         ? "active" : ""}>News</a>
            <a href="#calendar"     className={isActive("calendar")     ? "active" : ""}>Calendar</a>
            <a href="#about"        className={isActive("about")        ? "active" : ""}>About</a>
          </div>
          <div className="nav-actions">
            <a href="#calendar" className="nav-cta">Get Tickets</a>
            <button
              className={`hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobileNav"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE NAV ── */}
      <div className={`mobile-nav${menuOpen ? " open" : ""}`} id="mobileNav">
        <a href="#teams"        onClick={closeMenu}>Teams</a>
        <a href="#competitions" onClick={closeMenu}>Competitions</a>
        <a href="#news"         onClick={closeMenu}>News</a>
        <a href="#calendar"     onClick={closeMenu}>Calendar</a>
        <a href="#about"        onClick={closeMenu}>About</a>
        <a href="#calendar" className="mobile-cta" onClick={closeMenu}>Get Tickets</a>
      </div>

      {/* ══════════════ HERO ══════════════ */}
      <header className="hero" id="top">
        <div className="hero-net" aria-hidden="true">
          <svg viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <pattern id="net" width="42" height="42" patternUnits="userSpaceOnUse">
                <path d="M0 0 L42 42 M42 0 L0 42 M21 0 L21 42 M0 21 L42 21" stroke="rgba(32,102,209,0.35)" strokeWidth="0.6" fill="none" />
              </pattern>
            </defs>
            <rect width="1200" height="800" fill="url(#net)" />
          </svg>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-label">
              <span className="live-dot" />
              It's Official! The Africa Men's Club Championship 2026 is coming to Kigali 🇷🇼
            </div>
            <h1>Rwanda <span>Volleyball</span></h1>
            <p className="hero-desc">
              The official home of the Rwanda Volleyball Federation. Follow live scores, national teams,
              domestic competitions, tournament updates, and the latest stories shaping volleyball in Rwanda.
            </p>
            <div className="hero-btns">
              <a href="#match-centre" className="btn-primary">View Live Scores</a>
              <a href="#competitions" className="btn-outline">Explore Competitions</a>
            </div>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-num">24</div><div className="stat-label">Active Clubs</div></div>
              <div className="stat-item"><div className="stat-num">6</div><div className="stat-label">National Teams</div></div>
              <div className="stat-item"><div className="stat-num">340+</div><div className="stat-label">Athletes</div></div>
            </div>
          </div>

          <div className="hero-visual" ref={heroVisualRef} aria-hidden="true">
            <div className="visual-ring" />
            <div className="hero-mini-card top">
              <div className="mini-label">Live Match</div>
              <div className="mini-value">APR 2–1 REG</div>
              <div className="mini-copy">National League Men · Set 3 ongoing</div>
            </div>
            <div className="ball-cursor" ref={ballCursorRef} />
            <div
              className={`volleyball${ballBurst ? " burst" : ""}`}
              ref={heroBallRef}
              onClick={handleBallClick}
              role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleBallClick(); } }}
              aria-label="Interactive volleyball — click to interact"
            >
              <VolleyballSVG />
            </div>
            <div className="hero-mini-card bottom">
              <div className="mini-label">Next Event</div>
              <div className="mini-value">Apr 20</div>
              <div className="mini-copy">CAVB Men's Club Championship · Kigali</div>
            </div>
          </div>
        </div>
      </header>

      {/* ══ TICKER ══ */}
      <div className="ticker" aria-label="Latest updates">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div className="ticker-item" key={i}>{item} <span className="dot">●</span></div>
          ))}
        </div>
      </div>

      {/* ══════════════ MAIN ══════════════ */}
      <main>

        {/* ── MATCH CENTRE ── */}
        <section className="scores-section reveal" id="match-centre">
          <div className="container">
            <div className="section-head">
              <div><div className="section-label">Live &amp; Upcoming</div><h2 className="section-title">Match Centre</h2></div>
              <a href="#calendar" className="ghost-link">Full Schedule →</a>
            </div>
            <div className="scores-grid">{SCORES.map((s) => <ScoreCard key={s.id} score={s} />)}</div>
          </div>
        </section>

        {/* ── COMPETITIONS ── */}
        <section className="competitions-section reveal" id="competitions">
          <div className="container">
            <div className="section-head">
              <div><div className="section-label">Domestic &amp; International</div><h2 className="section-title">Competitions</h2></div>
              <p className="section-subtitle">Follow major tournaments, league action, and federation events across indoor and beach volleyball.</p>
            </div>
            <div className="competitions-grid">{COMPETITIONS.map((c) => <CompetitionCard key={c.id} comp={c} />)}</div>
          </div>
        </section>

        {/* ── RWANDA OVERVIEW ── */}
        <section className="overview-section reveal" id="rwanda-volleyball">
          <div className="container">
            <div className="section-head">
              <div><div className="section-label">Volleyball in Rwanda</div><h2 className="section-title">Why the sport matters here</h2></div>
              <p className="section-subtitle">A snapshot of the federation's role, Rwanda's hosting profile, and the momentum behind indoor and beach volleyball.</p>
            </div>
            <div className="overview-grid">
              <article className="overview-story">
                <div className="overview-kicker">🇷🇼 Federation Snapshot</div>
                <h3>{RWANDA_OVERVIEW.title}</h3>
                <p>{RWANDA_OVERVIEW.body}</p>
                <div className="overview-pills">{RWANDA_OVERVIEW.pills.map((p) => <span key={p}>{p}</span>)}</div>
                <div className="overview-stats">
                  <div className="overview-stat"><strong>1984</strong><span>FRVB established</span></div>
                  <div className="overview-stat"><strong>2026</strong><span>CAVB club hosts in Kigali</span></div>
                </div>
              </article>
              <div className="overview-side">
                {RWANDA_HIGHLIGHTS.map((item) => (
                  <article className="overview-side-card" key={item.id}>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <div className="overview-meta">{item.meta.map((m) => <span key={m}>{m}</span>)}</div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── NEWS ── */}
        <section className="news-section reveal" id="news">
          <div className="container">
            <div className="section-head">
              <div><div className="section-label">Latest Updates</div><h2 className="section-title">News &amp; Stories</h2></div>
              <a href="#about" className="ghost-link">Media Centre →</a>
            </div>
            <div className="news-grid">
              <article className="news-featured">
                <div className="news-img-bg">
                  <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=500&fit=crop&auto=format" alt="Volleyball championship" />
                </div>
                <div className="news-content">
                  <span className="news-cat">Featured</span>
                  <h3>Rwanda ready to welcome continental club volleyball to Kigali</h3>
                  <p>Federation preparations continue as Rwanda builds momentum to host a flagship African volleyball event, with focus on fan experience, venue readiness, and regional participation.</p>
                  <div className="news-date">March 2026</div>
                </div>
              </article>
              <div className="news-list">
                {NEWS_ITEMS.map((item) => (
                  <article className="news-item" key={item.id} style={{display:"flex",gap:"12px",alignItems:"flex-start"}}>
                    {item.image && (
                      <div style={{width:"72px",height:"56px",borderRadius:"8px",overflow:"hidden",flexShrink:0}}>
                        <img src={item.image} alt={item.cat} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} loading="lazy" />
                      </div>
                    )}
                    <div style={{flex:1,minWidth:0}}>
                      <div className="news-item-cat">{item.cat}</div>
                      <h4>{item.headline}</h4>
                      <div className="news-item-date">{item.date}</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="gallery-section reveal" id="gallery">
          <div className="container">
            <div className="section-head">
              <div><div className="section-label">Media &amp; Photos</div><h2 className="section-title">Gallery</h2></div>
              <p className="section-subtitle">Highlights from national league, beach tour, and youth competition across Rwanda.</p>
            </div>
            <div className="gallery-grid">{GALLERY_ITEMS.map((item) => <GalleryCard key={item.id} item={item} />)}</div>
          </div>
        </section>

        {/* ── TEAMS ── */}
        <section className="teams-section reveal" id="teams">
          <div className="container">
            <div className="section-head">
              <div><div className="section-label">Programs &amp; Squads</div><h2 className="section-title">National Teams</h2></div>
              <p className="section-subtitle">Rwanda's top clubs competing in the national league and continental tournaments, under the oversight of the Rwanda Volleyball Federation.</p>
            </div>
            <div className="teams-tabs">
              {["all", "men", "women"].map((tab) => (
                <button key={tab} className={`tab-btn${activeTab === tab ? " active" : ""}`} onClick={() => setActiveTab(tab)}>
                  {tab === "all" ? "All Clubs" : tab === "men" ? "Men's Clubs" : "Women's Clubs"}
                </button>
              ))}
            </div>
            <div className="teams-grid">{filtered.map((team) => <TeamCard key={team.id} team={team} />)}</div>
          </div>
        </section>

        {/* ── CALENDAR ── */}
        <section className="calendar-section reveal" id="calendar">
          <div className="container">
            <div className="section-head">
              <div><div className="section-label">Dates to Watch</div><h2 className="section-title">Calendar</h2></div>
              <p className="section-subtitle">Upcoming fixtures, events, federation activities, and competition milestones.</p>
            </div>
            <div className="calendar-grid">{CALENDAR.map((ev) => <CalendarCard key={ev.id} event={ev} />)}</div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="about-section reveal" id="about">
          <div className="container">
            <div className="section-head">
              <div><div className="section-label">Federation Overview</div><h2 className="section-title">About FRVB</h2></div>
              <p className="section-subtitle">The Rwanda Volleyball Federation supports competition, athlete development, national representation, and the growth of volleyball across the country, with its head office at Amahoro Stadium in Kigali.</p>
            </div>
            <div className="competitions-grid">{ABOUT_CARDS.map((c) => <CompetitionCard key={c.id} comp={c} />)}</div>
          </div>
        </section>

      </main>

      {/* ══ FOOTER ══ */}
      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="nav-logo">
                <FRVBLogo size={44} />
                <div><div className="footer-logo-text">FRVB</div><div className="footer-logo-sub">Rwanda Volleyball</div></div>
              </div>
              <p>The official digital home of the Rwanda Volleyball Federation — showcasing competitions, national teams, federation updates, and fan engagement.</p>
              <div className="social-links">
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.label} href={s.url} className="social-link" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                <li><a href="#teams">Teams</a></li>
                <li><a href="#competitions">Competitions</a></li>
                <li><a href="#news">News</a></li>
                <li><a href="#calendar">Calendar</a></li>
                <li><a href="#gallery">Gallery</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Federation</h4>
              <ul>
                <li><a href="#about">About FRVB</a></li>
                <li><a href="#rwanda-volleyball">Volleyball in Rwanda</a></li>
                <li><a href="https://www.fivb.org/EN/FIVB/Federation.asp?NF=RWA" target="_blank" rel="noopener noreferrer">FIVB Profile</a></li>
                <li><a href="https://www.frvb.rw" target="_blank" rel="noopener noreferrer">Official FRVB Site</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="https://maps.google.com/?q=Amahoro+Stadium+Kigali" target="_blank" rel="noopener noreferrer">Amahoro Stadium, Kigali</a></li>
                <li><a href="mailto:info@frvb.rw">info@frvb.rw</a></li>
                <li><a href="tel:+250788561785">+250 788 561 785</a></li>
                <li><a href="https://www.frvb.rw" target="_blank" rel="noopener noreferrer">frvb.rw</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Rwanda Volleyball Federation (FRVB). All rights reserved.</p>
            <p>Member of <a href="https://www.fivb.org" target="_blank" rel="noopener noreferrer">FIVB</a> &amp; <a href="https://www.cavb.org" target="_blank" rel="noopener noreferrer">CAVB</a></p>
          </div>
        </div>
      </footer>
    </>
  );
}
{comp.tag}</span
      <h3>{comp.title}</h3>
      <p>{comp.desc}</p>
      <div className="competition-meta">{comp.meta.map((m) => <span key={m}>{m}</span>)}</div>
    </article>
  );
}

function TeamCard({ team }) {
  return (
    <article className="team-card">
      <span className="team-emoji">{team.emoji}</span>
      <h3>{team.name}</h3>
      <p>{team.desc}</p>
      <div className="team-record">{team.record}</div>
      <div className="team-record-label">{team.recordLabel}</div>
    </article>
  );
}

function CalendarCard({ event }) {
  return (
    <article className="calendar-card">
      <span className="calendar-date">{event.date}</span>
      <h3>{event.title}</h3>
      <p>{event.desc}</p>
      <div className="calendar-meta">{event.meta.map((m) => <span key={m}>{m}</span>)}</div>
    </article>
  );
}

function GalleryCard({ item }) {
  return (
    <article className="gallery-card">
      <div className="gallery-image">
        <img src={item.image} alt={item.title} loading="lazy" />
      </div>
      <div className="gallery-content">
        <span className="gallery-tag">{item.tag}</span>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    </article>
  );
}

function VolleyballSVG() {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ballBase" cx="36%" cy="30%" r="68%">
          <stop offset="0%" stopColor="#ffffff" /><stop offset="40%" stopColor="#f5f4f0" /><stop offset="100%" stopColor="#c8c8c2" />
        </radialGradient>
        <radialGradient id="ballShadow" cx="74%" cy="78%" r="58%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" /><stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
        </radialGradient>
        <radialGradient id="ballHighlight" cx="28%" cy="22%" r="45%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.72)" /><stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="ballDropShadow" x="-25%" y="-25%" width="150%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="14" />
          <feOffset dx="0" dy="22" result="offsetBlur" />
          <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
          <feFlood floodColor="rgba(0,0,0,0.3)" result="color" />
          <feComposite in="color" in2="offsetBlur" operator="in" result="shadow" />
          <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="ballClip"><circle cx="200" cy="200" r="182" /></clipPath>
      </defs>
      <ellipse cx="200" cy="390" rx="160" ry="14" fill="rgba(0,61,165,0.12)" />
      <g filter="url(#ballDropShadow)">
        <circle cx="200" cy="200" r="182" fill="url(#ballBase)" />
        <g clipPath="url(#ballClip)" fill="none">
          <path d="M200 20 C255 60 280 128 280 200 C280 272 255 340 200 380" stroke="#003DA5" strokeWidth="12" strokeLinecap="round" />
          <path d="M200 20 C145 60 120 128 120 200 C120 272 145 340 200 380" stroke="#003DA5" strokeWidth="12" strokeLinecap="round" />
          <path d="M20 200 C60 148 128 122 200 122 C272 122 340 148 380 200" stroke="#003DA5" strokeWidth="12" strokeLinecap="round" />
          <path d="M20 200 C60 252 128 278 200 278 C272 278 340 252 380 200" stroke="#003DA5" strokeWidth="12" strokeLinecap="round" />
          <path d="M58 62 C102 92 148 138 168 200" stroke="#1a50c0" strokeWidth="7.5" strokeLinecap="round" opacity="0.88" />
          <path d="M342 62 C298 92 252 138 232 200" stroke="#1a50c0" strokeWidth="7.5" strokeLinecap="round" opacity="0.88" />
          <path d="M58 338 C102 308 148 262 168 200" stroke="#1a50c0" strokeWidth="7.5" strokeLinecap="round" opacity="0.88" />
          <path d="M342 338 C298 308 252 262 232 200" stroke="#1a50c0" strokeWidth="7.5" strokeLinecap="round" opacity="0.88" />
          <path d="M200 20 C255 60 280 128 280 200" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
          <path d="M200 380 C145 340 120 272 120 200" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 200 C60 148 128 122 200 122" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
          <path d="M380 200 C340 252 272 278 200 278" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle cx="200" cy="200" r="182" fill="url(#ballShadow)" opacity="0.6" />
        <ellipse cx="142" cy="118" rx="72" ry="46" fill="url(#ballHighlight)" transform="rotate(-28 142 118)" />
        <circle cx="200" cy="200" r="182" fill="none" stroke="rgba(0,0,0,0.10)" strokeWidth="4" />
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function FRVBWebsite() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [activeNav, setActiveNav] = useState("top");
  const [ballBurst, setBallBurst] = useState(false);

  const heroBallRef      = useRef(null);
  const heroVisualRef    = useRef(null);
  const ballCursorRef    = useRef(null);
  const ballClickTimeout = useRef(null);
  const msRef = useRef({
    mouseRotX: 0, mouseRotY: 0, mouseRotZ: 0,
    targetRotX: 0, targetRotY: 0, targetRotZ: 0,
    scrollTX: 0, scrollTY: 0, scrollRZ: 0, scrollRX: 0, rafId: null,
  });

  /* ── body class for menu ── */
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  /* ── scroll reveal ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ── active nav link on scroll ── */
  useEffect(() => {
    const ids = ["top", "match-centre", "competitions", "news", "teams", "calendar", "about"];
    const getSections = () => ids.map((id) => ({
      id,
      el: id === "top" ? document.querySelector("header.hero") : document.getElementById(id),
    })).filter((s) => s.el);

    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      let current = "top";
      getSections().forEach(({ id, el }) => { if (scrollY >= el.offsetTop) current = id; });
      setActiveNav(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── ball interaction ── */
  useEffect(() => {
    const ms = msRef.current;
    const ball = heroBallRef.current;
    const visual = heroVisualRef.current;
    const cur = ballCursorRef.current;
    if (!ball || !visual) return;

    const calcScroll = () => {
      const rect = visual.getBoundingClientRect();
      const prog = Math.max(-1, Math.min(1, (window.innerHeight * 0.5 - (rect.top + rect.height / 2)) / window.innerHeight));
      ms.scrollRZ = prog * 42; ms.scrollRX = prog * -12; ms.scrollTY = prog * -22; ms.scrollTX = prog * 8;
    };
    const onMove = (e) => {
      const rect = visual.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      ms.targetRotY = nx * 28; ms.targetRotX = -ny * 18; ms.targetRotZ = nx * ny * 8;
      if (cur) { cur.style.left = (e.clientX - rect.left) + "px"; cur.style.top = (e.clientY - rect.top) + "px"; }
    };
    const onLeave = () => { ms.targetRotX = ms.targetRotY = ms.targetRotZ = 0; };
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ms.mouseRotX = lerp(ms.mouseRotX, ms.targetRotX, 0.07);
      ms.mouseRotY = lerp(ms.mouseRotY, ms.targetRotY, 0.07);
      ms.mouseRotZ = lerp(ms.mouseRotZ, ms.targetRotZ, 0.07);
      ball.style.transform = `translate3d(${ms.scrollTX}px,${ms.scrollTY}px,0) rotateX(${ms.scrollRX + ms.mouseRotX}deg) rotateY(${ms.mouseRotY}deg) rotateZ(${ms.scrollRZ + ms.mouseRotZ}deg)`;
      ms.rafId = requestAnimationFrame(tick);
    };
    let pending = false;
    const onScroll = () => { if (!pending) { requestAnimationFrame(() => { calcScroll(); pending = false; }); pending = true; } };
    visual.addEventListener("mousemove", onMove);
    visual.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", calcScroll);
    calcScroll(); tick();
    return () => {
      visual.removeEventListener("mousemove", onMove);
      visual.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", calcScroll);
      if (ms.rafId) cancelAnimationFrame(ms.rafId);
    };
  }, []);

  useEffect(() => () => { if (ballClickTimeout.current) clearTimeout(ballClickTimeout.current); }, []);

  const handleBallClick = () => {
    const ms = msRef.current;
    setBallBurst(false);
    requestAnimationFrame(() => setBallBurst(true));
    ms.targetRotY += 24; ms.targetRotX -= 10; ms.targetRotZ += 18;
    if (ballClickTimeout.current) clearTimeout(ballClickTimeout.current);
    ballClickTimeout.current = setTimeout(() => setBallBurst(false), 450);
  };

  const filtered  = activeTab === "all" ? TEAMS : TEAMS.filter((t) => t.category === activeTab);
  const closeMenu = () => setMenuOpen(false);
  const isActive  = (id) => activeNav === id;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* ── PROPOSAL BANNER ── */}
      <div className="proposal-banner">
        <div className="proposal-inner">
          <p><strong>Website Redesign Proposal</strong> — Prepared for Rwanda Volleyball Federation (FRVB)</p>
          <div className="proposal-badge">Demo Mockup</div>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav aria-label="Main navigation">
        <div className="nav-inner">
          <a href="#top" className="nav-logo" aria-label="FRVB Home">
            <FRVBLogo size={44} />
            <div><div className="logo-text">FRVB</div><div className="logo-sub">Rwanda Volleyball</div></div>
          </a>
          <div className="nav-links">
            <a href="#teams"        className={isActive("teams")        ? "active" : ""}>Teams</a>
            <a href="#competitions" className={isActive("competitions") ? "active" : ""}>Competitions</a>
            <a href="#news"         className={isActive("news")         ? "active" : ""}>News</a>
            <a href="#calendar"     className={isActive("calendar")     ? "active" : ""}>Calendar</a>
            <a href="#about"        className={isActive("about")        ? "active" : ""}>About</a>
          </div>
          <div className="nav-actions">
            <a href="#calendar" className="nav-cta">Get Tickets</a>
            <button
              className={`hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobileNav"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE NAV ── */}
      <div className={`mobile-nav${menuOpen ? " open" : ""}`} id="mobileNav">
        <a href="#teams"        onClick={closeMenu}>Teams</a>
        <a href="#competitions" onClick={closeMenu}>Competitions</a>
        <a href="#news"         onClick={closeMenu}>News</a>
        <a href="#calendar"     onClick={closeMenu}>Calendar</a>
        <a href="#about"        onClick={closeMenu}>About</a>
        <a href="#calendar" className="mobile-cta" onClick={closeMenu}>Get Tickets</a>
      </div>

      {/* ══════════════ HERO ══════════════ */}
      <header className="hero" id="top">
        <div className="hero-net" aria-hidden="true">
          <svg viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <pattern id="net" width="42" height="42" patternUnits="userSpaceOnUse">
                <path d="M0 0 L42 42 M42 0 L0 42 M21 0 L21 42 M0 21 L42 21" stroke="rgba(32,102,209,0.35)" strokeWidth="0.6" fill="none" />
              </pattern>
            </defs>
            <rect width="1200" height="800" fill="url(#net)" />
          </svg>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-label">
              <span className="live-dot" />
              It's Official! The Africa Men's Club Championship 2026 is coming to Kigali 🇷🇼
            </div>
            <h1>Rwanda <span>Volleyball</span></h1>
            <p className="hero-desc">
              The official home of the Rwanda Volleyball Federation. Follow live scores, national teams,
              domestic competitions, tournament updates, and the latest stories shaping volleyball in Rwanda.
            </p>
            <div className="hero-btns">
              <a href="#match-centre" className="btn-primary">View Live Scores</a>
              <a href="#competitions" className="btn-outline">Explore Competitions</a>
            </div>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-num">24</div><div className="stat-label">Active Clubs</div></div>
              <div className="stat-item"><div className="stat-num">6</div><div className="stat-label">National Teams</div></div>
              <div className="stat-item"><div className="stat-num">340+</div><div className="stat-label">Athletes</div></div>
            </div>
          </div>

          <div className="hero-visual" ref={heroVisualRef} aria-hidden="true">
            <div className="visual-ring" />
            <div className="hero-mini-card top">
              <div className="mini-label">Live Match</div>
              <div className="mini-value">APR 2–1 REG</div>
              <div className="mini-copy">National League Men · Set 3 ongoing</div>
            </div>
            <div className="ball-cursor" ref={ballCursorRef} />
            <div
              className={`volleyball${ballBurst ? " burst" : ""}`}
              ref={heroBallRef}
              onClick={handleBallClick}
              role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleBallClick(); } }}
              aria-label="Interactive volleyball — click to interact"
            >
              <VolleyballSVG />
            </div>
            <div className="hero-mini-card bottom">
              <div className="mini-label">Next Event</div>
              <div className="mini-value">Apr 20</div>
              <div className="mini-copy">CAVB Men's Club Championship · Kigali</div>
            </div>
          </div>
        </div>
      </header>

      {/* ══ TICKER ══ */}
      <div className="ticker" aria-label="Latest updates">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div className="ticker-item" key={i}>{item} <span className="dot">●</span></div>
          ))}
        </div>
      </div>

      {/* ══════════════ MAIN ══════════════ */}
      <main>

        {/* ── MATCH CENTRE ── */}
        <section className="scores-section reveal" id="match-centre">
          <div className="container">
            <div className="section-head">
              <div><div className="section-label">Live &amp; Upcoming</div><h2 className="section-title">Match Centre</h2></div>
              <a href="#calendar" className="ghost-link">Full Schedule →</a>
            </div>
            <div className="scores-grid">{SCORES.map((s) => <ScoreCard key={s.id} score={s} />)}</div>
          </div>
        </section>

        {/* ── COMPETITIONS ── */}
        <section className="competitions-section reveal" id="competitions">
          <div className="container">
            <div className="section-head">
              <div><div className="section-label">Domestic &amp; International</div><h2 className="section-title">Competitions</h2></div>
              <p className="section-subtitle">Follow major tournaments, league action, and federation events across indoor and beach volleyball.</p>
            </div>
            <div className="competitions-grid">{COMPETITIONS.map((c) => <CompetitionCard key={c.id} comp={c} />)}</div>
          </div>
        </section>

        {/* ── RWANDA OVERVIEW ── */}
        <section className="overview-section reveal" id="rwanda-volleyball">
          <div className="container">
            <div className="section-head">
              <div><div className="section-label">Volleyball in Rwanda</div><h2 className="section-title">Why the sport matters here</h2></div>
              <p className="section-subtitle">A snapshot of the federation's role, Rwanda's hosting profile, and the momentum behind indoor and beach volleyball.</p>
            </div>
            <div className="overview-grid">
              <article className="overview-story">
                <div className="overview-kicker">🇷🇼 Federation Snapshot</div>
                <h3>{RWANDA_OVERVIEW.title}</h3>
                <p>{RWANDA_OVERVIEW.body}</p>
                <div className="overview-pills">{RWANDA_OVERVIEW.pills.map((p) => <span key={p}>{p}</span>)}</div>
                <div className="overview-stats">
                  <div className="overview-stat"><strong>1984</strong><span>FRVB established</span></div>
                  <div className="overview-stat"><strong>2026</strong><span>CAVB club hosts in Kigali</span></div>
                </div>
              </article>
              <div className="overview-side">
                {RWANDA_HIGHLIGHTS.map((item) => (
                  <article className="overview-side-card" key={item.id}>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <div className="overview-meta">{item.meta.map((m) => <span key={m}>{m}</span>)}</div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── NEWS ── */}
        <section className="news-section reveal" id="news">
          <div className="container">
            <div className="section-head">
              <div><div className="section-label">Latest Updates</div><h2 className="section-title">News &amp; Stories</h2></div>
              <a href="#about" className="ghost-link">Media Centre →</a>
            </div>
            <div className="news-grid">
              <article className="news-featured">
                <div className="news-img-bg">
                  <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=500&fit=crop&auto=format" alt="Volleyball championship" />
                </div>
                <div className="news-content">
                  <span className="news-cat">Featured</span>
                  <h3>Rwanda ready to welcome continental club volleyball to Kigali</h3>
                  <p>Federation preparations continue as Rwanda builds momentum to host a flagship African volleyball event, with focus on fan experience, venue readiness, and regional participation.</p>
                  <div className="news-date">March 2026</div>
                </div>
              </article>
              <div className="news-list">
                {NEWS_ITEMS.map((item) => (
                  <article className="news-item" key={item.id}>
                    <div className="news-item-cat">{item.cat}</div>
                    <h4>{item.headline}</h4>
                    <div className="news-item-date">{item.date}</div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section className="gallery-section reveal" id="gallery">
          <div className="container">
            <div className="section-head">
              <div><div className="section-label">Media &amp; Photos</div><h2 className="section-title">Gallery</h2></div>
              <p className="section-subtitle">Highlights from national league, beach tour, and youth competition across Rwanda.</p>
            </div>
            <div className="gallery-grid">{GALLERY_ITEMS.map((item) => <GalleryCard key={item.id} item={item} />)}</div>
          </div>
        </section>

        {/* ── TEAMS ── */}
        <section className="teams-section reveal" id="teams">
          <div className="container">
            <div className="section-head">
              <div><div className="section-label">Programs &amp; Squads</div><h2 className="section-title">National Teams</h2></div>
              <p className="section-subtitle">A structured national program spanning senior, youth, and beach volleyball categories.</p>
            </div>
            <div className="teams-tabs">
              {["all", "senior", "youth", "beach"].map((tab) => (
                <button key={tab} className={`tab-btn${activeTab === tab ? " active" : ""}`} onClick={() => setActiveTab(tab)}>
                  {tab === "all" ? "All Teams" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="teams-grid">{filtered.map((team) => <TeamCard key={team.id} team={team} />)}</div>
          </div>
        </section>

        {/* ── CALENDAR ── */}
        <section className="calendar-section reveal" id="calendar">
          <div className="container">
            <div className="section-head">
              <div><div className="section-label">Dates to Watch</div><h2 className="section-title">Calendar</h2></div>
              <p className="section-subtitle">Upcoming fixtures, events, federation activities, and competition milestones.</p>
            </div>
            <div className="calendar-grid">{CALENDAR.map((ev) => <CalendarCard key={ev.id} event={ev} />)}</div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="about-section reveal" id="about">
          <div className="container">
            <div className="section-head">
              <div><div className="section-label">Federation Overview</div><h2 className="section-title">About FRVB</h2></div>
              <p className="section-subtitle">The Rwanda Volleyball Federation supports competition, athlete development, national representation, and the growth of volleyball across the country, with its head office at Amahoro Stadium in Kigali.</p>
            </div>
            <div className="competitions-grid">{ABOUT_CARDS.map((c) => <CompetitionCard key={c.id} comp={c} />)}</div>
          </div>
        </section>

      </main>

      {/* ══ FOOTER ══ */}
      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="nav-logo">
                <FRVBLogo size={44} />
                <div><div className="footer-logo-text">FRVB</div><div className="footer-logo-sub">Rwanda Volleyball</div></div>
              </div>
              <p>The official digital home of the Rwanda Volleyball Federation — showcasing competitions, national teams, federation updates, and fan engagement.</p>
              <div className="social-links">
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.label} href={s.url} className="social-link" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                <li><a href="#teams">Teams</a></li>
                <li><a href="#competitions">Competitions</a></li>
                <li><a href="#news">News</a></li>
                <li><a href="#calendar">Calendar</a></li>
                <li><a href="#gallery">Gallery</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Federation</h4>
              <ul>
                <li><a href="#about">About FRVB</a></li>
                <li><a href="#rwanda-volleyball">Volleyball in Rwanda</a></li>
                <li><a href="https://www.fivb.org/EN/FIVB/Federation.asp?NF=RWA" target="_blank" rel="noopener noreferrer">FIVB Profile</a></li>
                <li><a href="https://www.frvb.rw" target="_blank" rel="noopener noreferrer">Official FRVB Site</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="https://maps.google.com/?q=Amahoro+Stadium+Kigali" target="_blank" rel="noopener noreferrer">Amahoro Stadium, Kigali</a></li>
                <li><a href="mailto:info@frvb.rw">info@frvb.rw</a></li>
                <li><a href="tel:+250788561785">+250 788 561 785</a></li>
                <li><a href="https://www.frvb.rw" target="_blank" rel="noopener noreferrer">frvb.rw</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Rwanda Volleyball Federation (FRVB). All rights reserved.</p>
            <p>Member of <a href="https://www.fivb.org" target="_blank" rel="noopener noreferrer">FIVB</a> &amp; <a href="https://www.cavb.org" target="_blank" rel="noopener noreferrer">CAVB</a></p>
          </div>
        </div>
      </footer>
    </>
  );
}
