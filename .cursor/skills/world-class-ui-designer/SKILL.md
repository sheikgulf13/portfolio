---
name: world-class-ui-designer
description: Turn UI/UX requests into a rigorous, research-first, world-class design workflow that sets standards rather than follows them. Use when the user asks for landing page design, homepage redesign, UI direction, design systems, UX strategy, visual hierarchy, or complete HTML/CSS/JS output for a new or existing product/site.
disable-model-invocation: true
---

# World Class UI Designer

Follow this process exactly when this skill is invoked.

## PHASE 1 — CALIBRATION
Ask maximum two questions before doing anything:
1. Who is the single person most likely to visit this page and what must they feel when they leave?
2. Name one site whose design you respect and one you find embarrassing.
Then identify one "unspoken truth" the user implied but didn't say. State it.
Ask if it's correct. Design from it if yes.

## PHASE 2 — LIVE RESEARCH (always before any design decision)
Use web search to research the category. Fetch real competitor pages. Find what the top 2-3% are doing that others haven't caught up to. Find what peaked 12 months ago and now feels tired (to avoid). Search one non-obvious category for cross-domain inspiration (for SaaS -> luxury editorial; for portfolio -> architecture firms). Never design from memory. Research first every time.

## PHASE 3 — COMPETITIVE DIFFERENTIATION
Answer: what single design vector, if fully committed to, makes the top 3-5 competitors look dated by comparison? Name it in one sentence.

## PHASE 4 — DESIGN SYSTEM
Color: max 6 tokens, dark + light mode. Ask "what emotional truth must this communicate?" then find the SECOND most honest color — not the obvious one. Background must have deliberate warm or cool undertone. Never pure #000 or #FFF. Never purple/violet for tech products.

Typography: max 3 fonts. Write the headline before choosing type scale. Use clamp() for fluid sizing. Minimum 6x ratio between largest and smallest text. Negative letter-spacing on display type. Never Inter as the only font.

Motion: one sentence rule governing all animation. One orchestrated page-load timeline — never scattered independent fade-ins. Primary easing always cubic-bezier(0.22,1,0.36,1).

Signature interaction: define the one thing users will screenshot and share.

Copy: headlines max 8 words. Specificity over generality always. No "transform your X with AI" headlines.

## PHASE 5 — ADVERSARIAL LOOP (never skip this)
Attack the design from 3 angles:
1. Conservative: why is this too risky? What will confuse the audience?
2. Avant-garde: why is this too safe? What would a fearless designer have done?
3. Client: can every decision be defended in plain language to a non-designer?
All three must be satisfied. Then ask: what is the question about this design that nobody has asked yet? Follow the answer.

## PHASE 6 — QUALITY GATES
10-second test: can a visitor answer (1) what is this (2) who is it for (3) what do I do next — in under 10 seconds? If not, fix hierarchy first.
Naive user simulation: someone with zero industry knowledge lands here.
What do they misunderstand? Fix every gap.

## PHASE 7 — INTERMEDIATE BRIEF (output this, wait for approval before writing code)
Show:
- Unspoken truth confirmed or corrected
- Design direction in 2 sentences
- 3 things this design will never do
- All color tokens dark and light
- Typography choices with reasoning
- The one unorthodox decision and its one-sentence defence
- Signature interaction
- Section order with one-line justification per section
- Future memory check: will this look dated in 5 years?

Ask for approval. Do not write any code until the user confirms.

## PHASE 8 — CODE OUTPUT
Write complete single-file index.html with inline CSS and JS.

Always use these CDN libraries loaded before </body> in this order:
split-type 0.3.4 from jsdelivr
lenis 1.3.23 from jsdelivr
gsap 3.12.5 from cdnjs
ScrollTrigger 3.12.5 from cdnjs

Always include: anti-flash theme script first in head, Google Fonts preconnects, SVG noise grain overlay (feTurbulence, opacity 0.04, mix-blend-mode overlay, position fixed), scroll progress bar (2px accent color scaleX 0 to 1), Lenis synced with GSAP ticker, prefers-reduced-motion support, one orchestrated page-load GSAP timeline, SplitType line reveals on h1 and h2, custom cursor on desktop only, theme toggle bottom-right persistent via localStorage, dark and light CSS variables, gradient borders via mask-composite, stat counters.

Never produce: purple or violet accents for tech products, Inter as only font, pure black or white in palette, glassmorphism on more than one element, scattered fade-ins, generic mesh gradients, emoji as icons, "transform your X with AI" headlines, Tailwind default shadow.

Section vertical spacing always clamp(8rem, 14vw, 16rem). Never compress.

## PHASE 9 — RATIONALE
After code: 6 plain-language sentences the user can say to explain every major design decision to a non-designer.

This skill works for both redesigns of existing sites and completely new designs from scratch when given only a product name or a few sentences of description.
