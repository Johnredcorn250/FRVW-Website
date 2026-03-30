import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   GLOBAL CSS
   ═══════════════════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');

:root {
  --blue: #2066d1;
  --yellow-2: #4a8cff;
  --gold: #f7c500;
  --green: #1aa35c;
  --red: #e24a4a;
  --dark: #f7fbff;
  --darker: #edf5ff;
  --mid: #ffffff;
  --soft: #eef4ff;
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
  padding: 10px 20px;
  font-size: 13px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.proposal-inner {
  width: min(100% - 20px, var(--max-width));
  margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; flex-wrap: wrap;
}
.proposal-badge {
  background: var(--gold); color: var(--dark);
  padding: 4px 12px; border-radius: 999px;
  font-size: 11px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase;
}

/* ── NAV ── */
nav {
  position: sticky; top: 0; z-index: 1000;
  height: var(--nav-height);
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
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
.logo-text { font-family: "Bebas Neue", sans-serif; font-size: 24px; letter-spacing: 2px; color: var(--gold); line-height: 1; }
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
  background: var(--gold); color: var(--dark);
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
.mobile-nav {
  position: fixed;
  top: calc(44px + var(--nav-height));
  left: 0; right: 0;
  background: rgba(10,13,20,0.98);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border);
  padding: 18px 20px 26px;
  display: none; flex-direction: column; gap: 2px; z-index: 999;
}
.mobile-nav.open { display: flex; }
.mobile-nav a { padding: 14px 2px; font-size: 17px; font-weight: 700; color: var(--text); border-bottom: 1px solid var(--border); }
.mobile-nav .mobile-cta { margin-top: 12px; background: var(--gold); color: var(--dark); border-radius: 8px; padding: 14px; text-align: center; font-weight: 900; border-bottom: none; }

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
  width: min(100% - 40px, var(--max-width));
  margin: 0 auto;
  display: grid; grid-template-columns: 1.2fr 0.8fr;
  align-items: center; gap: 32px;
  position: relative; z-index: 1;
}
.hero-net { position: absolute; inset: 0; pointer-events: none; opacity: 0.07; }
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
  line-height: 0.9; letter-spacing: 2px; margin-bottom: 18px;
  animation: fadeUp 0.55s 0.08s ease both;
}
.hero h1 span { color: var(--gold); display: block; }
.hero-desc { font-size: 17px; line-height: 1.7; color: var(--muted); max-width: 620px; margin-bottom: 28px; animation: fadeUp 0.55s 0.16s ease both; }
.hero-btns { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 30px; animation: fadeUp 0.55s 0.24s ease both; }
.btn-primary { background: linear-gradient(135deg, var(--blue), var(--blue-2)); color: var(--text); padding: 15px 24px; border-radius: 10px; font-size: 14px; font-weight: 800; box-shadow: var(--shadow); }
.btn-outline { border: 1px solid var(--glass-2); color: var(--text); padding: 15px 24px; border-radius: 10px; font-size: 14px; font-weight: 800; background: rgba(255,255,255,0.72); }
.btn-outline:hover { border-color: var(--gold); }
.hero-stats { display: flex; gap: 18px; flex-wrap: wrap; animation: fadeUp 0.55s 0.32s ease both; }
.stat-item { min-width: 140px; padding: 16px 18px; border-radius: 14px; border: 1px solid var(--border); background: rgba(255,255,255,0.72); }
.stat-num { font-family: "Bebas Neue", sans-serif; font-size: 42px; line-height: 1; color: var(--gold); }
.stat-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1.2px; margin-top: 4px; }

/* ── HERO VISUAL ── */
.hero-visual {
  display: flex; justify-content: center; align-items: center;
  position: relative; min-height: 420px; perspective: 1000px;
}
.visual-ring {
  position: absolute; width: 430px; height: 430px; border-radius: 50%;
  background:
    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.16), transparent 28%),
    radial-gradient(circle at 50% 50%, rgba(255,209,0,0.13), transparent 55%);
  border: 1px solid rgba(32,102,209,0.10);
  filter: blur(1px);
}
.volleyball {
  width: min(360px, 80vw);
  transform-style: preserve-3d;
  will-change: transform;
  animation: floatBall 5s ease-in-out infinite;
  z-index: 1;
  cursor: pointer;
}
.volleyball svg { width: 100%; height: auto; display: block; }
.volleyball:hover { filter: drop-shadow(0 14px 28px rgba(32, 102, 209, 0.18)); }
.volleyball.burst {
  animation:
    floatBall 5s ease-in-out infinite,
    ballPop 0.45s ease;
  filter: drop-shadow(0 22px 36px rgba(32, 102, 209, 0.24));
}
.ball-cursor {
  position: absolute; width: 12px; height: 12px;
  border-radius: 50%; background: var(--gold);
  pointer-events: none; opacity: 0; z-index: 10;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s ease, transform 0.05s ease;
  mix-blend-mode: difference;
}
.hero-visual:hover .ball-cursor { opacity: 1; }
.hero-mini-card {
  position: absolute;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(12px);
  border-radius: 14px; padding: 14px 16px;
  box-shadow: var(--shadow); min-width: 160px;
}
.hero-mini-card.top { top: 30px; left: 10px; }
.hero-mini-card.bottom { right: 0; bottom: 24px; }
.mini-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); margin-bottom: 6px; }
.mini-value { font-size: 22px; font-weight: 900; color: var(--gold); line-height: 1; margin-bottom: 4px; }
.mini-copy { font-size: 12px; color: var(--muted); line-height: 1.45; }

/* ── TICKER ── */
.ticker {
  background: var(--gold); color: var(--dark);
  overflow: hidden; white-space: nowrap; height: 42px;
  display: flex; align-items: center;
  border-top: 1px solid rgba(0,0,0,0.08);
  border-bottom: 1px solid rgba(0,0,0,0.08);
}
.ticker-track { display: inline-flex; min-width: max-content; animation: tickerScroll 32s linear infinite; }
.ticker-item { font-size: 13px; font-weight: 800; padding: 0 28px; }
.ticker-item .dot { margin-left: 28px; color: var(--blue); }

/* ── SECTIONS ── */
main section { padding: 84px 0; }
.section-head { display: flex; justify-content: space-between; align-items: end; gap: 20px; margin-bottom: 34px; flex-wrap: wrap; }
.section-label { font-size: 12px; font-weight: 800; color: var(--gold); text-transform: uppercase; letter-spacing: 3px; margin-bottom: 8px; }
.section-title { font-family: "Bebas Neue", sans-serif; font-size: clamp(38px, 5vw, 56px); line-height: 0.95; letter-spacing: 1px; }
.section-subtitle { max-width: 560px; color: var(--muted); line-height: 1.7; font-size: 15px; }
.ghost-link { color: var(--text); border: 1px solid var(--border); border-radius: 999px; padding: 10px 16px; font-size: 13px; font-weight: 800; white-space: nowrap; }
.scores-section, .teams-section, .calendar-section { background: var(--mid); }
.scores-grid, .competitions-grid, .news-grid, .teams-grid, .calendar-grid, .footer-top { display: grid; gap: 18px; }
.scores-grid { grid-template-columns: repeat(3, 1fr); }

/* ── SCORE CARDS ── */
.score-card, .competition-card, .news-featured, .news-item, .team-card, .calendar-card {
  background: var(--glass); border: 1px solid var(--border); border-radius: var(--radius);
  transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;
}
.score-card:hover, .competition-card:hover, .news-featured:hover, .news-item:hover, .team-card:hover, .calendar-card:hover {
  transform: translateY(-4px); border-color: rgba(255,209,0,0.24);
}
.score-card { padding: 24px; }
.score-card.live { border-color: rgba(232,17,45,0.45); }
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
.team-name { font-size: 14px; font-weight: 800; line-height: 1.35; }
.score-divider { text-align: center; flex-shrink: 0; }
.score-num { font-family: "Bebas Neue", sans-serif; font-size: 42px; line-height: 1; letter-spacing: 1px; }
.score-vs { color: var(--muted); font-size: 11px; letter-spacing: 1px; margin-top: 4px; }
.score-time { color: var(--muted); font-size: 12px; }

/* ── COMPETITION CARDS ── */
.competitions-grid { grid-template-columns: repeat(3, 1fr); }
.competition-card { padding: 24px; position: relative; overflow: hidden; }
.competition-card::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 4px; background: linear-gradient(to bottom, var(--gold), var(--green)); }
.competition-tag { display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: var(--gold); margin-bottom: 14px; }
.competition-card h3 { font-size: 22px; line-height: 1.15; margin-bottom: 10px; }
.competition-card p { color: var(--muted); line-height: 1.65; font-size: 14px; margin-bottom: 18px; }
.competition-meta { display: flex; flex-wrap: wrap; gap: 10px; }
.competition-meta span { font-size: 12px; color: var(--text); background: rgba(32,102,209,0.06); border: 1px solid var(--border); border-radius: 999px; padding: 7px 11px; }

/* ── NEWS ── */
.news-grid { grid-template-columns: 1.5fr 1fr; align-items: stretch; }
.news-featured { overflow: hidden; }
.news-img-bg { height: 250px; background: linear-gradient(135deg, var(--blue), var(--green)); display: grid; place-items: center; font-size: 72px; }
.news-content { padding: 24px; }
.news-cat { display: inline-block; background: rgba(0,61,165,0.28); color: #8bb0ff; border-radius: 999px; padding: 5px 10px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 14px; }
.news-content h3 { font-size: 24px; line-height: 1.25; margin-bottom: 10px; }
.news-content p { color: var(--muted); line-height: 1.7; font-size: 15px; margin-bottom: 16px; }
.news-date { font-size: 12px; color: var(--muted); }
.news-list { display: flex; flex-direction: column; gap: 12px; }
.news-item { padding: 18px; }
.news-item-cat { font-size: 11px; font-weight: 800; color: var(--gold); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
.news-item h4 { font-size: 15px; line-height: 1.45; margin-bottom: 10px; }
.news-item-date { font-size: 12px; color: var(--muted); }

/* ── TEAMS ── */
.teams-tabs { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 28px; }
.tab-btn { border: 1px solid var(--border); background: var(--glass); color: var(--muted); padding: 10px 18px; border-radius: 999px; font-size: 13px; font-weight: 800; cursor: pointer; transition: background 0.2s, border-color 0.2s, color 0.2s; }
.tab-btn.active, .tab-btn:hover { background: var(--blue); border-color: var(--blue); color: var(--text); }
.teams-grid { grid-template-columns: repeat(4, 1fr); }
.team-card { padding: 28px 20px; text-align: center; position: relative; overflow: hidden; }
.team-card::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 3px; background: linear-gradient(90deg, var(--blue), var(--green), var(--gold)); transform: scaleX(0); transition: transform 0.25s ease; }
.team-card:hover::before { transform: scaleX(1); }
.team-emoji { font-size: 40px; display: inline-block; margin-bottom: 14px; }
.team-card h3 { font-size: 18px; margin-bottom: 6px; }
.team-card p { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 14px; }
.team-record { font-family: "Bebas Neue", sans-serif; font-size: 34px; line-height: 1; color: var(--gold); }
.team-record-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); margin-top: 4px; }

/* ── CALENDAR ── */
.calendar-grid { grid-template-columns: repeat(3, 1fr); }
.calendar-card { padding: 22px; }
.calendar-date { display: inline-block; background: rgba(255,209,0,0.12); color: var(--gold); border: 1px solid rgba(255,209,0,0.18); padding: 7px 12px; border-radius: 999px; font-size: 11px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 14px; }
.calendar-card h3 { font-size: 19px; line-height: 1.3; margin-bottom: 8px; }
.calendar-card p { color: var(--muted); line-height: 1.7; font-size: 14px; margin-bottom: 14px; }
.calendar-meta { font-size: 12px; color: var(--text); display: flex; flex-direction: column; gap: 6px; }

/* ── FOOTER ── */
footer { background: var(--darker); border-top: 1px solid var(--border); padding: 64px 0 28px; }
.footer-top { grid-template-columns: 2fr 1fr 1fr 1fr; margin-bottom: 34px; }
.footer-brand p { color: var(--muted); line-height: 1.8; font-size: 14px; max-width: 460px; margin: 14px 0 20px; }
.footer-col h4 { font-size: 12px; color: var(--gold); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 14px; }
.footer-col ul { display: flex; flex-direction: column; gap: 10px; }
.footer-col a { color: var(--muted); font-size: 14px; }
.footer-col a:hover { color: var(--text); }
.social-links { display: flex; gap: 10px; flex-wrap: wrap; }
.social-link { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 10px; background: var(--glass); border: 1px solid var(--border); font-size: 16px; }
.social-link:hover { border-color: var(--gold); background: rgba(255,209,0,0.08); }
.footer-bottom { border-top: 1px solid var(--border); padding-top: 20px; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
.footer-bottom p { color: var(--muted); font-size: 13px; }

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
  0% { transform: scale(1); }
  35% { transform: scale(1.08); }
  70% { transform: scale(0.94); }
  100% { transform: scale(1); }
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
  .news-img-bg { height: 180px; font-size: 54px; }
  .hero-mini-card { min-width: 130px; padding: 12px 14px; }
  .footer-bottom { flex-direction: column; text-align: center; }
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
  "FRVB established in 1984 and affiliated with CAVB and FIVB",
  "Kigali to host the 47th CAVB Men's Club Championship — Apr 20 to May 3, 2026",
  "Beach Volleyball National Tour continues to grow across Muhazi, Karongi, and Rwamagana",
  "Youth competitions continue to strengthen Rwanda's talent pathway",
  "Rwanda keeps building its profile as a host nation for African volleyball",
];

const SCORES = [
  {
    id: 1,
    league: "National League — Men",
    badgeType: "live",
    badgeText: "Live Set 3",
    homeFlag: "🏐",
    homeName: "APR Volleyball Club",
    score: "2 — 1",
    setScores: "21 · 18 · 21",
    awayFlag: "🏐",
    awayName: "REG Volleyball",
    venue: "Amahoro Indoor Stadium · Kigali",
  },
  {
    id: 2,
    league: "National League — Women",
    badgeType: "upcoming",
    badgeText: "Today 18:30",
    homeFlag: "🏐",
    homeName: "IPRC Kigali",
    score: "vs",
    setScores: "Kick-off soon",
    awayFlag: "🏐",
    awayName: "Police Volleyball",
    venue: "Petit Stade · Kigali",
  },
  {
    id: 3,
    league: "National League — Men",
    badgeType: "completed",
    badgeText: "Final",
    homeFlag: "🏐",
    homeName: "Rwanda Energy Group",
    score: "3 — 0",
    setScores: "25 · 22 · 25",
    awayFlag: "🏐",
    awayName: "Gisagara VC",
    venue: "BK Arena · Kigali",
  },
];

const COMPETITIONS = [
  {
    id: 1,
    tag: "Featured Tournament",
    title: "47th CAVB Men's Club Championship",
    desc: "Kigali is set to host the continental club championship from April 20 to May 3, 2026, with APR VC, Police VC, and Kepler VC representing Rwanda.",
    meta: ["Kigali", "Apr 20 – May 3, 2026", "Continental Clubs"],
  },
  {
    id: 2,
    tag: "National League",
    title: "Rwanda National Volleyball League",
    desc: "FRVB's domestic structure includes national league competition for men's and women's clubs, alongside recurring tournaments that keep the calendar active across the season.",
    meta: ["Men & Women", "Domestic Season", "FRVB Competition"],
  },
  {
    id: 3,
    tag: "Beach Circuit",
    title: "National Beach Volleyball Tour",
    desc: "Recent FRVB beach tour stops in Muhazi and Rwamagana show the federation's growing investment in beach volleyball, athlete exposure, and fan-facing events.",
    meta: ["Beach Volleyball", "National Tour", "Player Development"],
  },
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
  { id: 3, emoji: "🌟",  name: "Youth Boys",   desc: "Youth structures and intercenter events are helping identify and prepare the next generation of volleyball talent.", record: "Talent Pathway", recordLabel: "Youth Development", category: "youth"  },
  { id: 4, emoji: "🌟",  name: "Youth Girls",  desc: "School and youth competition remains a major entry point for athlete growth and national scouting.", record: "Talent Pathway", recordLabel: "Youth Development", category: "youth"  },
  { id: 5, emoji: "🏖️", name: "Beach Men",    desc: "Rwanda's men's beach program benefits from FRVB tour stops, selection camps, and international exposure.", record: "Active Circuit", recordLabel: "Beach Program", category: "beach"  },
  { id: 6, emoji: "☀️",  name: "Beach Women",  desc: "The women's beach unit continues to gain visibility through domestic tour events and continental participation.", record: "Active Circuit", recordLabel: "Beach Program", category: "beach"  },
];

const CALENDAR = [
  {
    id: 1,
    date: "Apr 20 – May 3, 2026",
    title: "47th CAVB Men's Club Championship",
    desc: "Kigali will host a landmark edition of the continental club championship, the first time the tournament is staged in Sub-Saharan Africa.",
    meta: ["📍 Kigali", "🌍 Continental event"],
  },
  {
    id: 2,
    date: "2026 Season",
    title: "Rwanda National Volleyball League",
    desc: "Domestic men's and women's league competition remains the backbone of the annual volleyball calendar and club ecosystem.",
    meta: ["📍 Nationwide", "🏐 Indoor season"],
  },
  {
    id: 3,
    date: "Beach Tour Stops",
    title: "FRVB National Beach Volleyball Tour",
    desc: "Successive tour stops in Muhazi, Karongi, and Rwamagana highlight the beach circuit's growing role in Rwanda's volleyball story.",
    meta: ["🏖️ Beach circuit", "📈 Athlete exposure"],
  },
];

const ABOUT_CARDS = [
  {
    id: 1,
    tag: "History",
    title: "Volleyball has deep roots in Rwanda",
    desc: "According to the Rwanda Olympic Committee, volleyball spread through schools, military camps, and communities before FRVB was established in 1984 and affiliated the same year to CAVB and FIVB.",
    meta: ["Established 1984", "FIVB", "CAVB"],
  },
  {
    id: 2,
    tag: "Growth",
    title: "Rwanda keeps expanding its volleyball footprint",
    desc: "Rwanda has hosted major continental events in indoor and beach volleyball, helping position Kigali and other venues as important competition hubs.",
    meta: ["Hosting Nation", "Kigali", "Beach & Indoor"],
  },
  {
    id: 3,
    tag: "Future",
    title: "Development is moving in multiple directions",
    desc: "League play, youth competitions, and the beach tour all create a stronger performance pipeline while giving fans more entry points into the sport.",
    meta: ["Youth", "League", "Beach Tour"],
  },
];

const RWANDA_OVERVIEW = {
  title: "Volleyball in Rwanda is growing through league play, hosting power, and beach momentum.",
  body: "Volleyball in Rwanda has grown from a school- and community-based sport into one of the country's most visible team disciplines. FRVB oversees national competitions, national team pathways, and a growing beach volleyball ecosystem while Rwanda continues to build a reputation for hosting major African events.",
  pills: ["FRVB", "Indoor Volleyball", "Beach Volleyball", "Youth Development"],
  meta: ["Based in Kigali", "National federation role", "Domestic and international events"],
};

const RWANDA_HIGHLIGHTS = [
  {
    id: 1,
    title: "Global & continental affiliation",
    desc: "FRVB is part of both FIVB and CAVB, linking Rwandan volleyball to continental qualification pathways, courses, and sanctioned competition.",
    meta: ["FIVB", "CAVB", "International pathway"],
  },
  {
    id: 2,
    title: "A proven host nation",
    desc: "Rwanda hosted the 2021 Men's African Nations Championship in Kigali and is preparing for the 2026 CAVB Men's Club Championship.",
    meta: ["Kigali", "Continental hosting", "2021 & 2026"],
  },
];

const GALLERY_ITEMS = [
  {
    id: 1,
    tag: "Indoor Volleyball",
    title: "Add a hero photo from a national league match",
    desc: "Use a wide action shot from a packed indoor match to immediately show energy, scale, and club competition.",
    placeholder: "MATCHDAY PHOTO",
    note: "Recommended image: horizontal action photo, 1600×1200 or larger.",
  },
  {
    id: 2,
    tag: "Beach Volleyball",
    title: "Show Rwanda's beach volleyball identity",
    desc: "Highlight the national beach tour with a sand court image from Muhazi, Karongi, or Rwamagana to make this part of the site feel unique.",
    placeholder: "BEACH TOUR IMAGE",
    note: "Recommended image: athlete serve, rally, or podium shot.",
  },
  {
    id: 3,
    tag: "Youth Development",
    title: "Include a schools or youth development image",
    desc: "A training or competition photo with younger athletes helps communicate long-term growth and the federation's development focus.",
    placeholder: "YOUTH PROGRAM PHOTO",
    note: "Recommended image: coaching, drills, or intercenter competition.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function ScoreBadge({ type, text }) {
  if (type === "live")      return <span className="live-badge">{text}</span>;
  if (type === "upcoming")  return <span className="upcoming-badge">{text}</span>;
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
        <div className="team-info">
          <div className="team-flag">{score.homeFlag}</div>
          <div className="team-name">{score.homeName}</div>
        </div>
        <div className="score-divider">
          <div className="score-num">{score.score}</div>
          <div className="score-vs">{score.setScores}</div>
        </div>
        <div className="team-info right">
          <div className="team-flag">{score.awayFlag}</div>
          <div className="team-name">{score.awayName}</div>
        </div>
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
      <div className="competition-meta">
        {comp.meta.map((m) => <span key={m}>{m}</span>)}
      </div>
    </article>
  );
}

function TeamCard({ team }) {
  return (
    <article className="team-card" data-category={team.category}>
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
      <div className="calendar-meta">
        {event.meta.map((m) => <span key={m}>{m}</span>)}
      </div>
    </article>
  );
}


function GalleryCard({ item }) {
  return (
    <article className="gallery-card">
      <div className="gallery-image">
        <div>
          {item.placeholder}
          <small>Replace this block with your real image later</small>
        </div>
      </div>
      <div className="gallery-content">
        <span className="gallery-tag">{item.tag}</span>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
        <div className="gallery-note">{item.note}</div>
      </div>
    </article>
  );
}

/* Volleyball SVG — split out for clarity */
function VolleyballSVG() {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ballBase" cx="36%" cy="30%" r="68%">
          <stop offset="0%"   stopColor="#ffffff" />
          <stop offset="40%"  stopColor="#f5f4f0" />
          <stop offset="100%" stopColor="#c8c8c2" />
        </radialGradient>
        <radialGradient id="ballShadow" cx="74%" cy="78%" r="58%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
        </radialGradient>
        <radialGradient id="ballHighlight" cx="28%" cy="22%" r="45%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.72)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="ballDropShadow" x="-25%" y="-25%" width="150%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="14" />
          <feOffset dx="0" dy="22" result="offsetBlur" />
          <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
          <feFlood floodColor="rgba(0,0,0,0.4)" result="color" />
          <feComposite in="color" in2="offsetBlur" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="ballClip">
          <circle cx="200" cy="200" r="182" />
        </clipPath>
      </defs>

      <ellipse cx="200" cy="390" rx="160" ry="18" fill="rgba(0,0,0,0.28)" />

      <g filter="url(#ballDropShadow)">
        {/* Base */}
        <circle cx="200" cy="200" r="182" fill="url(#ballBase)" />

        {/* Seams */}
        <g clipPath="url(#ballClip)" fill="none">
          <path d="M200 20 C255 60 280 128 280 200 C280 272 255 340 200 380"   stroke="#003DA5" strokeWidth="12" strokeLinecap="round" />
          <path d="M200 20 C145 60 120 128 120 200 C120 272 145 340 200 380"   stroke="#003DA5" strokeWidth="12" strokeLinecap="round" />
          <path d="M20 200 C60 148 128 122 200 122 C272 122 340 148 380 200"   stroke="#003DA5" strokeWidth="12" strokeLinecap="round" />
          <path d="M20 200 C60 252 128 278 200 278 C272 278 340 252 380 200"   stroke="#003DA5" strokeWidth="12" strokeLinecap="round" />
          <path d="M58 62 C102 92 148 138 168 200"   stroke="#1a50c0" strokeWidth="7.5" strokeLinecap="round" opacity="0.88" />
          <path d="M342 62 C298 92 252 138 232 200"  stroke="#1a50c0" strokeWidth="7.5" strokeLinecap="round" opacity="0.88" />
          <path d="M58 338 C102 308 148 262 168 200" stroke="#1a50c0" strokeWidth="7.5" strokeLinecap="round" opacity="0.88" />
          <path d="M342 338 C298 308 252 262 232 200" stroke="#1a50c0" strokeWidth="7.5" strokeLinecap="round" opacity="0.88" />
          <path d="M200 20 C255 60 280 128 280 200"   stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
          <path d="M200 380 C145 340 120 272 120 200" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 200 C60 148 128 122 200 122"   stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
          <path d="M380 200 C340 252 272 278 200 278" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Shading + highlight + rim */}
        <circle cx="200" cy="200" r="182" fill="url(#ballShadow)" opacity="0.6" />
        <ellipse cx="142" cy="118" rx="72" ry="46" fill="url(#ballHighlight)" transform="rotate(-28 142 118)" />
        <circle cx="200" cy="200" r="182" fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="4" />
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
  const [ballBurst, setBallBurst] = useState(false);

  const heroBallRef   = useRef(null);
  const heroVisualRef = useRef(null);
  const ballCursorRef = useRef(null);
  const ballClickTimeoutRef = useRef(null);
  const msRef = useRef({
    mouseRotX: 0, mouseRotY: 0, mouseRotZ: 0,
    targetRotX: 0, targetRotY: 0, targetRotZ: 0,
    scrollTX: 0, scrollTY: 0, scrollRZ: 0, scrollRX: 0,
    rafId: null,
  });

  /* ── body class for menu ── */
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  /* ── scroll reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── ball interaction ── */
  useEffect(() => {
    const ms     = msRef.current;
    const ball   = heroBallRef.current;
    const visual = heroVisualRef.current;
    const cur    = ballCursorRef.current;
    if (!ball || !visual) return;

    const calcScroll = () => {
      const rect     = visual.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1,
        (window.innerHeight * 0.5 - (rect.top + rect.height / 2)) / window.innerHeight
      ));
      ms.scrollRZ = progress * 42;
      ms.scrollRX = progress * -12;
      ms.scrollTY = progress * -22;
      ms.scrollTX = progress * 8;
    };

    const onMove = (e) => {
      const rect = visual.getBoundingClientRect();
      const nx   = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      const ny   = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      ms.targetRotY = nx * 28;
      ms.targetRotX = -ny * 18;
      ms.targetRotZ = nx * ny * 8;
      if (cur) {
        cur.style.left = (e.clientX - rect.left) + "px";
        cur.style.top  = (e.clientY - rect.top)  + "px";
      }
    };

    const onLeave = () => { ms.targetRotX = ms.targetRotY = ms.targetRotZ = 0; };
    const lerp    = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      ms.mouseRotX = lerp(ms.mouseRotX, ms.targetRotX, 0.07);
      ms.mouseRotY = lerp(ms.mouseRotY, ms.targetRotY, 0.07);
      ms.mouseRotZ = lerp(ms.mouseRotZ, ms.targetRotZ, 0.07);
      ball.style.transform = `translate3d(${ms.scrollTX}px,${ms.scrollTY}px,0) rotateX(${ms.scrollRX + ms.mouseRotX}deg) rotateY(${ms.mouseRotY}deg) rotateZ(${ms.scrollRZ + ms.mouseRotZ}deg)`;
      ms.rafId = requestAnimationFrame(tick);
    };

    let pending = false;
    const onScroll = () => {
      if (!pending) {
        requestAnimationFrame(() => { calcScroll(); pending = false; });
        pending = true;
      }
    };

    visual.addEventListener("mousemove",  onMove);
    visual.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll",  onScroll, { passive: true });
    window.addEventListener("resize",  calcScroll);
    calcScroll();
    tick();

    return () => {
      visual.removeEventListener("mousemove",  onMove);
      visual.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll",  onScroll);
      window.removeEventListener("resize",  calcScroll);
      if (ms.rafId) cancelAnimationFrame(ms.rafId);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (ballClickTimeoutRef.current) {
        clearTimeout(ballClickTimeoutRef.current);
      }
    };
  }, []);

  const handleBallClick = () => {
    const ms = msRef.current;

    setBallBurst(false);
    requestAnimationFrame(() => setBallBurst(true));

    ms.targetRotY += 24;
    ms.targetRotX -= 10;
    ms.targetRotZ += 18;

    if (ballClickTimeoutRef.current) {
      clearTimeout(ballClickTimeoutRef.current);
    }

    ballClickTimeoutRef.current = setTimeout(() => {
      setBallBurst(false);
    }, 450);
  };

  const filtered  = activeTab === "all" ? TEAMS : TEAMS.filter((t) => t.category === activeTab);
  const closeMenu = () => setMenuOpen(false);

  /* ═══════════════════════════════════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════════════════════════════════ */
  return (
    <>
      {/* Inject styles */}
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
            <div className="logo-badge">FRVB</div>
            <div>
              <div className="logo-text">FRVB</div>
              <div className="logo-sub">Rwanda Volleyball</div>
            </div>
          </a>

          <div className="nav-links">
            <a href="#teams">Teams</a>
            <a href="#competitions">Competitions</a>
            <a href="#news">News</a>
            <a href="#calendar">Calendar</a>
            <a href="#about">About</a>
          </div>

          <div className="nav-actions">
            <a href="#calendar" className="nav-cta">Get Tickets</a>
            <button
              className={`hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobileNav"
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
        {/* Background net */}
        <div className="hero-net" aria-hidden="true">
          <svg viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <pattern id="net" width="42" height="42" patternUnits="userSpaceOnUse">
                <path d="M0 0 L42 42 M42 0 L0 42 M21 0 L21 42 M0 21 L42 21" stroke="white" strokeWidth="0.45" fill="none" />
              </pattern>
            </defs>
            <rect width="1200" height="800" fill="url(#net)" />
          </svg>
        </div>

        <div className="hero-grid">
          {/* Copy */}
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
              <div className="stat-item"><div className="stat-num">8</div><div className="stat-label">National Teams</div></div>
              <div className="stat-item"><div className="stat-num">340+</div><div className="stat-label">Athletes</div></div>
            </div>
          </div>

          {/* Visual / Ball */}
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
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleBallClick();
                }
              }}
              aria-label="Interactive volleyball"
            >
              <VolleyballSVG />
            </div>

            <div className="hero-mini-card bottom">
              <div className="mini-label">Next Event</div>
              <div className="mini-value">Apr 12</div>
              <div className="mini-copy">National Volleyball League Finals · Kigali</div>
            </div>
          </div>
        </div>
      </header>

      {/* ══ TICKER ══ */}
      <div className="ticker" aria-label="Latest updates">
        <div className="ticker-track">
          {/* Duplicate for seamless infinite loop */}
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div className="ticker-item" key={i}>
              {item} <span className="dot">●</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════ MAIN ══════════════ */}
      <main>

        {/* ── MATCH CENTRE ── */}
        <section className="scores-section reveal" id="match-centre">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-label">Live &amp; Upcoming</div>
                <h2 className="section-title">Match Centre</h2>
              </div>
              <a href="#calendar" className="ghost-link">Full Schedule</a>
            </div>
            <div className="scores-grid">
              {SCORES.map((s) => <ScoreCard key={s.id} score={s} />)}
            </div>
          </div>
        </section>

        {/* ── COMPETITIONS ── */}
        <section className="competitions-section reveal" id="competitions">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-label">Domestic &amp; International</div>
                <h2 className="section-title">Competitions</h2>
              </div>
              <p className="section-subtitle">
                Follow major tournaments, league action, and federation events across indoor and beach volleyball.
              </p>
            </div>
            <div className="competitions-grid">
              {COMPETITIONS.map((c) => <CompetitionCard key={c.id} comp={c} />)}
            </div>
          </div>
        </section>


        {/* ── RWANDA OVERVIEW ── */}
        <section className="overview-section reveal" id="rwanda-volleyball">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-label">Volleyball in Rwanda</div>
                <h2 className="section-title">Why the sport matters here</h2>
              </div>
              <p className="section-subtitle">
                A quick snapshot of the federation's role, Rwanda's hosting profile, and the momentum behind indoor and beach volleyball.
              </p>
            </div>

            <div className="overview-grid">
              <article className="overview-story">
                <div className="overview-kicker">🇷🇼 Federation Snapshot</div>
                <h3>{RWANDA_OVERVIEW.title}</h3>
                <p>{RWANDA_OVERVIEW.body}</p>
                <div className="overview-pills">
                  {RWANDA_OVERVIEW.pills.map((pill) => <span key={pill}>{pill}</span>)}
                </div>
                <div className="overview-stats">
                  <div className="overview-stat">
                    <strong>1984</strong>
                    <span>FRVB established</span>
                  </div>
                  <div className="overview-stat">
                    <strong>2026</strong>
                    <span>CAVB club hosts in Kigali</span>
                  </div>
                </div>
              </article>

              <div className="overview-side">
                {RWANDA_HIGHLIGHTS.map((item) => (
                  <article className="overview-side-card" key={item.id}>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <div className="overview-meta">
                      {item.meta.map((m) => <span key={m}>{m}</span>)}
                    </div>
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
              <div>
                <div className="section-label">Latest Updates</div>
                <h2 className="section-title">News &amp; Stories</h2>
              </div>
              <a href="#about" className="ghost-link">Media Centre</a>
            </div>
            <div className="news-grid">
              {/* Featured article */}
              <article className="news-featured">
                <div className="news-img-bg">🏆</div>
                <div className="news-content">
                  <span className="news-cat">Featured</span>
                  <h3>Rwanda ready to welcome continental club volleyball to Kigali</h3>
                  <p>
                    Federation preparations continue as Rwanda builds momentum to host a flagship African
                    volleyball event, with focus on fan experience, venue readiness, and regional participation.
                  </p>
                  <div className="news-date">March 2026</div>
                </div>
              </article>

              {/* News list */}
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
              <div>
                <div className="section-label">Media Section</div>
                <h2 className="section-title">Photo Gallery Placeholders</h2>
              </div>
              <p className="section-subtitle">
                These cards are ready for you to replace with real federation, league, beach, or youth photos as you collect them.
              </p>
            </div>
            <div className="gallery-grid">
              {GALLERY_ITEMS.map((item) => <GalleryCard key={item.id} item={item} />)}
            </div>
          </div>
        </section>

        {/* ── TEAMS ── */}
        <section className="teams-section reveal" id="teams">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-label">Programs &amp; Squads</div>
                <h2 className="section-title">National Teams</h2>
              </div>
              <p className="section-subtitle">
                A structured national program spanning senior, youth, and beach volleyball categories.
              </p>
            </div>

            {/* Tab filter */}
            <div className="teams-tabs">
              {["all", "senior", "youth", "beach"].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn${activeTab === tab ? " active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "all" ? "All Teams" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="teams-grid">
              {filtered.map((team) => <TeamCard key={team.id} team={team} />)}
            </div>
          </div>
        </section>

        {/* ── CALENDAR ── */}
        <section className="calendar-section reveal" id="calendar">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-label">Dates to Watch</div>
                <h2 className="section-title">Calendar</h2>
              </div>
              <p className="section-subtitle">
                Upcoming fixtures, events, federation activities, and competition milestones.
              </p>
            </div>
            <div className="calendar-grid">
              {CALENDAR.map((ev) => <CalendarCard key={ev.id} event={ev} />)}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="about-section reveal" id="about">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-label">Federation Overview</div>
                <h2 className="section-title">About FRVB</h2>
              </div>
              <p className="section-subtitle">
                The Rwanda Volleyball Federation supports competition, athlete development, national
                representation, and the growth of volleyball across the country, with its head office listed at Amahoro Stadium in Kigali.
              </p>
            </div>
            <div className="competitions-grid">
              {ABOUT_CARDS.map((c) => <CompetitionCard key={c.id} comp={c} />)}
            </div>
          </div>
        </section>

      </main>

      {/* ══ FOOTER ══ */}
      <footer>
        <div className="container">
          <div className="footer-top">
            {/* Brand */}
            <div className="footer-brand">
              <div className="nav-logo">
                <div className="logo-badge">FRVB</div>
                <div>
                  <div className="logo-text">FRVB</div>
                  <div className="logo-sub">Rwanda Volleyball</div>
                </div>
              </div>
              <p>
                A modern digital home for Rwandan volleyball — designed to showcase competitions,
                national teams, federation updates, and fan engagement in one place.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">f</a>
                <a href="#" className="social-link" aria-label="Instagram">◎</a>
                <a href="#" className="social-link" aria-label="X / Twitter">𝕏</a>
                <a href="#" className="social-link" aria-label="YouTube">▶</a>
              </div>
            </div>

            {/* Explore */}
            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                <li><a href="#teams">Teams</a></li>
                <li><a href="#competitions">Competitions</a></li>
                <li><a href="#news">News</a></li>
                <li><a href="#calendar">Calendar</a></li>
              </ul>
            </div>

            {/* Federation */}
            <div className="footer-col">
              <h4>Federation</h4>
              <ul>
                <li><a href="#about">About FRVB</a></li>
                <li><a href="#rwanda-volleyball">Volleyball in Rwanda</a></li>
                <li><a href="#gallery">Photo Gallery</a></li>
                <li><a href="#">Media Centre</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="#">Amahoro Stadium, Remera, Kigali</a></li>
                <li><a href="#">info@frvb.rw</a></li>
                <li><a href="#">+250 788 561 785</a></li>
                <li><a href="#">FRVB Headquarters</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Rwanda Volleyball Federation. Demo redesign concept.</p>
            <p>Designed for presentation and further development.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
