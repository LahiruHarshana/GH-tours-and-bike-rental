import fs from 'fs';
import path from 'path';

const cssPath = path.resolve('./src/app/styles/05-components.css');
let lines = fs.readFileSync(cssPath, 'utf-8').split('\n');

// We need to delete lines from bottom to top to avoid shifting indexes
// 2191 to 2194
// 2174 to 2176
// 2150
// 1981 to 2000
// 1585 to 1586
// 1526 to 1530
// 1046 to 1066

const ranges = [
  [2191, 2194],
  [2174, 2176],
  [2150, 2150],
  [1981, 2000],
  [1585, 1586],
  [1526, 1530],
  [1046, 1066]
];

for (const [start, end] of ranges) {
  // Line numbers are 1-based, arrays are 0-based
  lines.splice(start - 1, end - start + 1);
}

const newCss = `
/* =========================================================================
   12 - Journey Planner Ribbon
   ========================================================================= */

.journey-planner {
  position: relative;
  z-index: 5;
  margin-top: -6rem;
  background: var(--color-paper-100, var(--color-paper));
  border-radius: 1.5rem;
  box-shadow: var(--shadow-lift, 0 35px 100px -20px rgba(0,0,0,0.15));
  overflow: hidden;
}

/* Tabs */
.journey-planner__tabs {
  position: relative;
  display: flex;
  border-bottom: 1px solid var(--color-line);
  background: var(--color-paper);
}

.journey-planner__tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 5.5rem;
  padding: 1rem 1.5rem;
  background: transparent;
  border: 0;
  border-right: 1px solid var(--color-line);
  text-align: left;
  color: var(--color-ink-soft);
  transition: color 0.18s var(--ease-island);
  cursor: pointer;
  z-index: 2;
}

.journey-planner__tab:last-child {
  border-right: 0;
}

.journey-planner__tab-num {
  font-family: var(--display);
  font-size: 1.1rem;
  color: var(--color-clay);
  transition: color 0.18s var(--ease-island);
}

.journey-planner__tab-label {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 0.2rem;
  transition: transform 0.18s var(--ease-island);
}

.journey-planner__tab-desc {
  font-size: 0.65rem;
  color: var(--color-paper);
  opacity: 0;
  height: 0;
  overflow: hidden;
  transition: opacity 0.18s var(--ease-island);
}

.journey-planner__tab:hover .journey-planner__tab-label {
  transform: translateY(-1px);
}

/* Active Tab */
.journey-planner__tab[aria-selected="true"] {
  color: var(--color-paper);
}

.journey-planner__tab[aria-selected="true"] .journey-planner__tab-num {
  color: var(--color-paper);
}

.journey-planner__tab[aria-selected="true"] .journey-planner__tab-desc {
  opacity: 0.8;
  height: auto;
  margin-top: 0.2rem;
}

/* Shared Sliding Indicator */
.journey-planner__indicator {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background: var(--color-ink);
  transform: translateX(calc(var(--active-index, 0) * 100%));
  transition: transform 380ms var(--ease-island), width 380ms var(--ease-island);
  z-index: 1;
}

/* Panel Area */
.journey-planner__panel-area {
  position: relative;
}

.journey-planner__panel-stack {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.journey-planner__panel {
  grid-area: 1 / 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding: 4rem 3rem;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition: opacity 150ms var(--ease-island), visibility 150ms var(--ease-island);
  z-index: 1;
}

.journey-planner__panel[aria-hidden="false"] {
  opacity: 1;
  pointer-events: auto;
  visibility: visible;
  transition: opacity 400ms var(--ease-island), transform 400ms var(--ease-island);
  z-index: 2;
  transform: translateY(0);
}

.journey-planner__panel[aria-hidden="true"] {
  transform: translateY(12px);
}

/* Panel Content */
.journey-planner__panel-left {
  display: flex;
  flex-direction: column;
}

.journey-planner__panel-left span {
  color: var(--color-clay);
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.journey-planner__panel-left h3 {
  font-family: var(--display);
  font-size: clamp(2.5rem, 4vw, 4rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.04em;
  margin: 0 0 1.5rem;
  max-width: 14ch;
}

.journey-planner__panel-left p {
  font-size: 1.05rem;
  color: var(--color-ink-soft);
  max-width: 32rem;
  margin: 0 0 2rem;
}

.journey-planner__panel-facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  color: var(--color-moss-deep);
  font-size: 0.7rem;
  font-weight: 700;
  margin-top: auto;
}

.journey-planner__panel-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Form Styles */
.journey-planner__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.journey-planner__form label {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.journey-planner__form label span {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--color-ink-soft);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.journey-planner__form input,
.journey-planner__form select {
  min-height: 52px;
  padding: 0 1rem;
  border: 1px solid var(--color-line);
  background: var(--color-bg);
  border-radius: 4px;
  font-family: var(--sans);
  font-size: 1rem;
  color: var(--color-ink);
}

.journey-planner__form input:focus,
.journey-planner__form select:focus {
  outline: 2px solid var(--color-clay);
  outline-offset: -1px;
}

.journey-planner__form-submit {
  min-height: 52px;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  background: var(--color-ink);
  color: var(--color-paper);
  border: 0;
  border-radius: 4px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background 0.2s;
}

.journey-planner__form-submit:hover {
  background: var(--color-moss-deep);
}

/* Airport Quick Book override */
.journey-planner__panel .airport-quick-book {
  background: transparent;
  padding: 0;
  border: 0;
}

.journey-planner__panel .airport-quick-book__head {
  display: none; /* Hide the existing head since we provide it in the left column */
}

.journey-planner__panel .airport-quick-book__fields {
  grid-template-columns: 1fr;
  gap: 1.25rem;
  padding: 0;
}

.journey-planner__panel .airport-quick-book p {
  display: none;
}

.journey-planner__panel .airport-quick-book__fields > div,
.journey-planner__panel .airport-quick-book__fields > label {
  border: 1px solid var(--color-line);
  background: var(--color-bg);
  border-radius: 4px;
  padding: 0.5rem 1rem;
  min-height: 52px;
}

.journey-planner__panel .airport-quick-book__submit {
  border-radius: 4px;
  min-height: 52px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .journey-planner__indicator,
  .journey-planner__panel,
  .journey-planner__panel[aria-hidden="false"] {
    transition: none !important;
    transform: none !important;
  }
}

/* Mobile */
@media (max-width: 1024px) {
  .journey-planner__panel {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 3rem 2rem;
  }
  
  .journey-planner__panel-left h3 {
    max-width: 100%;
  }
  
  .journey-planner__tabs {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  
  .journey-planner__tabs::-webkit-scrollbar {
    display: none;
  }
  
  .journey-planner__tab {
    flex: 0 0 auto;
    width: 65vw;
    scroll-snap-align: start;
    min-height: 6rem;
  }
  
  /* Show active indicator via background since JS width/transform is complex on variable mobile widths */
  .journey-planner__indicator {
    display: none; /* We will handle active state via background on mobile, or JS calculates it */
  }
  
  .journey-planner__tab[aria-selected="true"] {
    background: var(--color-ink);
  }
}

@media (max-width: 768px) {
  .journey-planner {
    margin-inline: 1rem;
    border-radius: 1rem;
    margin-top: -4rem;
  }
  .journey-planner__tab {
    width: 75vw;
  }
}
`;

fs.writeFileSync(cssPath, lines.join('\n') + '\n' + newCss);
console.log("Successfully cleaned and appended Planner CSS.");
