import './style.css'
import media from './games-media.json'
import imageAspects from './image-aspects.json'

const captureBySlug = new Map(media.map((item) => [item.slug, item]))
const portraitGameSlugs = new Set([
  'bullet-strike',
  'chief-master',
  'cute-clash-meow',
  'galactic-survival',
  'gate-race-3d',
  'hole-gamble',
  'legion-breaker',
  'match-and-score',
  'meta-tank',
  'penguin-slide',
  'punch-rush',
  'riko-quest',
  'riot-road-fight',
  'riot-war-highway',
  'score-puzzle',
  'tacticore',
  'tonk-toss',
])

const games = [
  {
    slug: 'match-and-score',
    folderSlug: 'match-and-score',
    title: 'Match & Score',
    category: 'Puzzle · Sports',
    summary: 'Football strategy meets match-3 puzzle gameplay. Build a squad, manage your club, and take on match-day challenges.',
    role: 'Unity Developer · GearGames (outsource)',
    contribution: ['Shop and inventory', 'Lobby and missions', 'Daily quests', 'Sound effects', 'Resource and draw-call optimization'],
    featured: true,
    captureSlug: 'match-and-score',
  },
  {
    slug: 'flick-goalz', title: 'FlickGoalz', category: 'Sports · Casual',
    summary: 'A colorful football challenge built around timing, aim, and the perfect shot.', captureSlug: 'flickgoalz',
  },
  {
    slug: 'bow-clash', title: 'Bow Clash', category: 'Action · Archery',
    summary: 'Aim, draw, and outplay your opponents in a playful archery arena.', captureSlug: 'bowclash',
  },
  {
    slug: 'kick-the-man', title: 'Kick The Man', category: 'Action · Platformer',
    summary: 'A fast-paced ragdoll action platformer with reactive physics, combo combat, and fluid acrobatics.', captureSlug: 'kicktheman',
  },
  {
    slug: 'galactic-survival', title: 'Galactic Survival', category: 'Sci-fi · Action',
    summary: 'A sci-fi action experience with space battles, upgrades, and a growing arsenal.', captureSlug: 'galacticsurvival',
  },
  {
    slug: 'hole-gamble', title: 'Hole Gamble', category: 'Casual · Arcade',
    summary: 'Guide a hungry hole through a bright obstacle course and collect everything in its path.', captureSlug: 'holegamble',
  },
  {
    slug: 'riko-quest', title: 'Riko Quest', category: 'Puzzle · Adventure',
    summary: 'Merge items, strengthen your heroes, and keep moving through a colorful quest.', captureSlug: 'rikoquest',
  },
  {
    slug: 'arena-blitz', title: 'Arena Blitz', category: 'Arcade · Sports',
    summary: 'Quick arena rounds with a bright, toy-like world and easy-to-read action.', captureSlug: 'arenablitz',
  },
  {
    slug: 'bullet-strike', title: 'Bullet Strike', category: 'Action · Shooter',
    summary: 'A focused shooting challenge built around precision and fast reactions.', captureSlug: 'bulletstrike',
  },
  {
    slug: 'chief-master', title: 'Chief Master', category: 'Action · Strategy',
    summary: 'Lead a small squad through lively battlefields and expand your forces.', captureSlug: 'chiefmaster',
  },
  {
    slug: 'cute-clash-meow', title: 'Cute Clash Meow', category: 'Casual · Collection',
    summary: 'A cute cat-themed game with collectible characters and upgrade screens.', captureSlug: 'cuteclashmeow',
  },
  {
    slug: 'gate-race-3d', title: 'Gate Race 3D', category: 'Runner · Casual',
    summary: 'Race through changing gates, make quick choices, and reach the finish line.', captureSlug: 'gaterace3d',
  },
  {
    slug: 'legion-breaker', title: 'Legion Breaker', category: 'Action · Strategy',
    summary: 'Prepare your units and break through a series of enemy encounters.', captureSlug: 'legionbreaker',
  },
  {
    slug: 'meta-tank', title: 'MetaTank', category: 'Action · Vehicles',
    summary: 'Take control of a tank and navigate a compact urban combat arena.', captureSlug: 'metatank',
  },
  {
    slug: 'penguin-slide', title: 'Penguin Slide', category: 'Casual · Runner',
    summary: 'Slide a little penguin along an icy course and dodge the obstacles ahead.', captureSlug: 'penguinslide',
  },
  {
    slug: 'punch-rush', title: 'Punch Rush', category: 'Action · Runner',
    summary: 'Charge forward, build momentum, and punch through a colorful obstacle course.', captureSlug: 'punchrush',
  },
  {
    slug: 'riot-road-fight', title: 'Riot Road Fight', category: 'Arcade · Combat Racing',
    summary: 'High-speed vehicular combat with obstacle avoidance, offensive weaponry, and enemy takedowns.', captureSlug: 'riotroadfight',
  },
  {
    slug: 'riot-war-highway', title: 'Riot War Highway', category: 'Action · Vehicular Combat',
    summary: 'Explosive highway warfare with armored upgrades, rapid shooting mechanics, and intense boss chases.', captureSlug: 'riotwarhighway',
  },
  {
    slug: 'score-puzzle', title: 'Score Puzzle', category: 'Puzzle · Football',
    summary: 'Football moments and colorful match-3 boards come together in this puzzle game.', captureSlug: 'score-puzzle',
  },
  {
    slug: 'tacticore', title: 'TactiCore', category: 'Action · Tactics',
    summary: 'A top-down action game with compact arenas, enemies, and tactical movement.', captureSlug: 'tacticore',
  },
  {
    slug: 'tonk-toss', title: 'Tonk Toss', category: 'Arcade · Action',
    summary: 'A playful arcade challenge built around movement, timing, and a well-aimed toss.', captureSlug: 'tonktoss',
  },
]

const BASE = import.meta.env.BASE_URL
const asset = (path) => {
  if (!path) return ''
  if (path.startsWith('http') || path.startsWith('blob:') || path.startsWith('data:')) return path
  return `${BASE}${path.replace(/^\//, '')}`
}

for (const game of games) {
  game.media = captureBySlug.get(game.captureSlug)
  game.images = (game.media?.images ?? []).map(asset)
  game.isPortrait = portraitGameSlugs.has(game.slug)
  game.coverImage = asset(game.media?.splashImage ?? game.media?.coverImage ?? game.images[0])
}
const orderedGames = [...games.filter((game) => !game.isPortrait), ...games.filter((game) => game.isPortrait)]

const app = document.querySelector('#app')
const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]))
const icon = (name, size = 18) => {
  const paths = {
    arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
    down: '<path d="M7 10l5 5 5-5"/>',
    back: '<path d="m15 18-6-6 6-6"/><path d="M20 12H9"/>',
    play: '<path d="m8 5 12 7-12 7z" fill="currentColor" stroke="none"/>',
    youtube: '<path d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 2 12a30 30 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 22 12a30 30 0 0 0-.4-4.8Z" fill="currentColor" stroke="none"/><path d="m10 15.5 5-3.5-5-3.5z" fill="#17151d" stroke="none"/>',
    close: '<path d="m18 6-12 12M6 6l12 12"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] ?? paths.arrow}</svg>`
}

const roadmapMilestones = [
  {
    period: '2025 — PRESENT',
    isCurrent: true,
    role: 'Dev Lead · Remote Freelancer',
    company: 'Global Clients & Publishers (Remote)',
    summary: 'Directing a 5-member game dev squad, building scalable hyper-casual & hybrid casual architectures from concept to store release.',
    highlights: [
      'Lead technical architecture and agile sprint workflows for a 5-developer remote team.',
      'Deliver custom hyper-casual and hybrid games tailored to client specifications and retention metrics.',
      'Deconstruct complex GDDs into modular task pipelines and maintain high code quality standards.',
      'Manage complete build, signing, and submission pipelines for iOS App Store & Google Play.'
    ],
    skills: ['Unity 3D / 2D', 'C#', 'Cocos Creator', 'Team Leadership', 'iOS & Android Release', 'Rapid Prototyping']
  },
  {
    period: '2020 — 2025',
    role: 'Senior Unity Developer',
    company: 'GearGames Vietnam · US Market',
    summary: 'Lead client-side development on flagship puzzle and strategy games for the US market, spearheading performance and LiveOps.',
    highlights: [
      'Engineered core game systems for Match & Score (football match-3), Arcane Rush, and Animal Island.',
      'Developed modular in-game economy, inventory, daily quests, dynamic shop, and battle-pass features.',
      'Executed intensive memory profiling, draw-call batching, and GPU/CPU optimization ensuring stable 60 FPS across mid-to-low tier devices.',
      'Mentored and trained junior game developers and interns on Unity architecture and clean code.'
    ],
    skills: ['Unity 3D', 'C#', 'Match-3 Systems', 'LiveOps Architecture', 'Draw-Call Batching', 'Memory Profiling', 'Mentorship']
  },
  {
    period: '2018 — 2020',
    role: 'Middle Unity Developer',
    company: 'BAP Software · Japan & Global Publishers',
    summary: 'Co-developed global chart-toppers with top publishers including Amanotes and Voodoo, and built full action titles.',
    highlights: [
      'Co-developed hit music rhythm games with Amanotes (Music Race, Tube Frenzy) and hyper-casual prototypes for Voodoo.',
      'Developed Kick The Man (action platformer) with dynamic platform physics, skill upgrade trees, and responsive ragdoll mechanics.',
      'Implemented custom visual shaders, particle burst feedback, and rhythm-beat synchronization systems.'
    ],
    skills: ['Unity', 'C#', 'Amanotes & Voodoo', 'Music & Rhythm Sync', 'Physics Platformer', 'Shader Effects']
  },
  {
    period: '2017 — 2018',
    role: 'Junior Unity Developer',
    company: 'Funkoi Studio · North American Market',
    summary: 'Maintained and enhanced educational music applications catering to the North American children’s market.',
    highlights: [
      'Resolved critical bugs and maintained interactive educational music applications for Canadian children.',
      'Refactored UI touch navigation to ensure accessible, responsive experiences on tablet and mobile viewports.',
      'Collaborated closely with designers and audio engineers to optimize audio-visual cue responsiveness.'
    ],
    skills: ['Unity 2D', 'Audio Systems', 'Touch Input UI', 'Performance Maintenance', 'Kid-friendly UX']
  },
  {
    period: '2015 — 2017',
    role: 'Junior Unity Developer',
    company: 'Monstarlab Vietnam · Japanese Market',
    summary: 'Began professional game engineering career developing high-octane mobile titles for Japanese & global players.',
    highlights: [
      'Key developer on flagship hit Riot Road Fight (1M - 5M+ downloads) and Riot War Highway (500K - 1M+ downloads).',
      'Engineered vehicular combat, weapon recoil, enemy boss AI attack state machines, and dynamic road obstacle spawning.',
      'Integrated in-app purchases (IAP), reward ads, telemetry analytics, and multi-resolution canvas scaling.'
    ],
    skills: ['Unity', 'C#', '1M - 5M+ Downloads', 'Vehicular Combat', 'Boss AI Logic', 'Monetization & Ads']
  }
]

function roadmapDialogMarkup() {
  return `<dialog class="roadmap-dialog" id="roadmap-dialog" aria-labelledby="roadmap-dialog-title"><div class="roadmap-dialog-header"><div><p class="eyebrow">CAREER JOURNEY · 2015 — 2026</p><h2 id="roadmap-dialog-title">Professional Roadmap</h2></div><div class="roadmap-dialog-actions"><span class="roadmap-stats-pill">9+ Years · 5 Studios · 21+ Games</span><button class="roadmap-dialog-close" type="button" data-close-roadmap aria-label="Close roadmap">${icon('close', 20)}</button></div></div><div class="roadmap-dialog-viewer"><div class="roadmap-timeline">${roadmapMilestones.map((item) => `<div class="roadmap-item${item.isCurrent ? ' is-current' : ''}"><div class="roadmap-node" aria-hidden="true"></div><div class="roadmap-card"><div class="roadmap-card-header"><span class="roadmap-period">${escapeHtml(item.period)}</span>${item.isCurrent ? '<span class="roadmap-stats-pill" style="font-size: 10px; padding: 3px 9px;">ACTIVE ROLE</span>' : ''}</div><h3 class="roadmap-role">${escapeHtml(item.role)}</h3><p class="roadmap-company">${escapeHtml(item.company)}</p><p class="roadmap-summary">${escapeHtml(item.summary)}</p><ul class="roadmap-highlights">${item.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}</ul><div class="roadmap-skills">${item.skills.map((s) => `<span>${escapeHtml(s)}</span>`).join('')}</div></div></div>`).join('')}</div><div class="roadmap-footer-cta"><p>Want to explore gameplay captures &amp; video demos of these projects?</p><a href="#section/work" data-close-roadmap>Explore Games Showcase ${icon('arrow', 14)}</a></div></div></dialog>`
}

function header() {
  return `<header class="site-header"><a class="brand" href="#/" aria-label="Tri Truong home"><span>TRI TRUONG</span><small>GAME DEVELOPER</small></a><nav aria-label="Main navigation"><button class="nav-work-button" type="button" data-open-roadmap aria-haspopup="dialog" aria-controls="roadmap-dialog">Work</button><a href="#section/about">About</a><button class="nav-cv-button" type="button" data-open-cv aria-haspopup="dialog" aria-controls="cv-dialog">Experience</button></nav><a class="header-cta" href="mailto:truongvantri01@gmail.com">Let’s talk ${icon('arrow', 15)}</a></header>`
}

function footer() {
  return `<footer class="site-footer"><span>BASED IN VIETNAM · OPEN TO GREAT GAME TEAMS</span><a href="mailto:truongvantri01@gmail.com">EMAIL ${icon('arrow', 14)}</a></footer><dialog class="cv-dialog" id="cv-dialog" aria-labelledby="cv-dialog-title"><div class="cv-dialog-header"><div><p class="eyebrow">EXPERIENCE</p><h2 id="cv-dialog-title">Tri Truong · CV</h2></div><div class="cv-dialog-actions"><a href="${asset('/Tri-Truong-CV.pdf')}" target="_blank" rel="noreferrer">Open PDF ${icon('arrow', 14)}</a><button class="cv-dialog-close" type="button" data-close-cv aria-label="Close CV">${icon('close', 20)}</button></div></div><div class="cv-dialog-viewer" aria-label="CV pages"><img src="${asset('/cv/page-1.webp')}" alt="CV page 1 of 3"><img src="${asset('/cv/page-2.webp')}" alt="CV page 2 of 3" loading="lazy"><img src="${asset('/cv/page-3.webp')}" alt="CV page 3 of 3" loading="lazy"></div></dialog>${roadmapDialogMarkup()}`
}

let activePortraitCount = 6

function renderHome() {
  document.title = 'Tri Truong — Senior Unity Developer'
  const landscapeGames = orderedGames.filter((game) => !game.isPortrait)
  const portraitGames = orderedGames.filter((game) => game.isPortrait)
  const initialLandscape = landscapeGames
  const initialPortrait = portraitGames.slice(0, activePortraitCount)
  const allLoaded = activePortraitCount >= portraitGames.length
  app.innerHTML = `${header()}
    <main class="home-page">
      <section class="home-hero page-wrap" aria-labelledby="hero-title">
        <div class="hero-copy">
          <p class="eyebrow">UNITY ENGINEER <span>·</span> GAMEPLAY &amp; SYSTEMS</p>
          <h1 id="hero-title">Hi, I’m Tri Truong.</h1>
          <p class="hero-role">Senior Unity Developer</p>
          <p class="hero-description">I build mobile games with polished gameplay, scalable systems, and performance in mind.</p>
          <div class="hero-actions"><a class="button button-primary" href="#section/work">Explore my work ${icon('down', 16)}</a><a class="button button-youtube" href="https://www.youtube.com/watch?v=KgElcOXkEb4&amp;list=PLm_Ichq86RPKKQwjVSE_X_TVMxAiB58GK" target="_blank" rel="noopener noreferrer" aria-label="Watch game demos on YouTube">${icon('youtube', 20)} <span>Watch game demos</span></a></div>
          <p class="hero-stack">UNITY <span>/</span> C# <span>/</span> MOBILE <span>/</span> LIVE OPS</p>
        </div>
        <div class="hero-art" aria-label="Featured game screenshots">
          <a class="hero-art-main" href="#/games/bow-clash"><img class="hero-slide is-active" src="${games.find((game) => game.slug === 'bow-clash')?.coverImage}" alt="Bow Clash gameplay screenshot" fetchpriority="high"><img class="hero-slide" alt="" aria-hidden="true"><span class="hero-art-caption"><small>GAMEPLAY SYSTEMS</small><strong>Action, strategy &amp; play</strong><em class="hero-slide-count" aria-hidden="true">01 / 03</em></span></a>
          <a class="hero-art-inset" href="#/games/match-and-score" aria-label="View Match and Score"><img src="${games[0].coverImage}" alt="Match &amp; Score game artwork"></a>
        </div>
        <div class="hero-stats" aria-label="Career highlights"><div><strong>9+</strong><span>YEARS EXPERIENCE</span></div><div><strong>${games.length}</strong><span>GAME CAPTURES</span></div><div><strong>UNITY</strong><span>MOBILE · VR · LIVE OPS</span></div></div>
      </section>

      <section class="work-section page-wrap" id="work" aria-labelledby="work-title">
        <div class="section-heading"><div><p class="eyebrow">SELECTED GAMEPLAY</p><h2 id="work-title">Games across genres and platforms.</h2></div><button class="text-link${allLoaded ? ' is-completed' : ''}" id="view-all" type="button" aria-controls="game-grid"><span id="view-all-text">${allLoaded ? `All ${games.length} games` : `Showing ${initialLandscape.length + initialPortrait.length} of ${games.length} games`}</span>${icon('down', 14)}</button></div>
        <div class="game-collections" id="game-grid">${gameGroupsMarkup(initialLandscape, initialPortrait, portraitGames.length)}</div>
      </section>

      <section class="about-section page-wrap" id="about">
        <div class="avatar"><img src="${asset('/tri-truong-avatar.webp')}" alt="Tri Truong" loading="lazy"></div>
        <div class="about-copy"><p class="eyebrow">ABOUT ME</p><h2>Tri Truong</h2><p>Senior Unity Developer with 9+ years in mobile games, from gameplay and optimization to live ops and team leadership.</p></div>
        <div class="about-focus"><span>Unity · C# · Performance · Architecture · LiveOps</span><span>Mobile (iOS / Android) · VR · Team leadership</span><a href="https://www.linkedin.com/in/truong-tri-63b7a61a4" target="_blank" rel="noreferrer">LinkedIn ${icon('arrow', 14)}</a></div>
      </section>
      <section class="experience-strip page-wrap" id="experience"><p class="eyebrow">EXPERIENCE</p><div><strong>Dev Lead</strong><span>Remote Freelancer · 2025 — Now</span></div><div><strong>Senior Game Developer</strong><span>GearGames Vietnam · 2020 — 2025</span></div><div><strong>Unity Developer</strong><span>BAP · Funkoi · Monstarlab · 2015 — 2020</span></div></section>
    </main>${footer()}`

  setupCardVideoPreviews()
  setupCardTilt()
  setupScrollReveals()
  setupHeroSlideshow()
  setupInfiniteScroll(landscapeGames, portraitGames)
}

function gameGroupsMarkup(landscapeGames, portraitGames, totalPortraits = portraitGames.length) {
  const hasMore = portraitGames.length < totalPortraits
  return `<section class="game-group" aria-label="Landscape games"><p class="game-format-label">LANDSCAPE · ${landscapeGames.length}</p><div class="game-grid game-grid-landscape">${landscapeGames.map((game) => gameCard(game)).join('')}</div></section><section class="game-group" aria-label="Portrait games"><p class="game-format-label">PORTRAIT · ${portraitGames.length}${hasMore ? ` OF ${totalPortraits}` : ''}</p><div class="game-grid game-grid-portrait">${portraitGames.map((game) => gameCard(game)).join('')}</div>${hasMore ? '<div class="scroll-sentinel" id="portrait-scroll-sentinel" aria-hidden="true"></div>' : ''}</section>`
}

function setupInfiniteScroll(landscapeGames, portraitGames) {
  const sentinel = document.querySelector('#portrait-scroll-sentinel')
  const portraitGrid = document.querySelector('.game-grid-portrait')
  const portraitLabel = document.querySelector('.game-group[aria-label="Portrait games"] .game-format-label')
  const viewAllBtn = document.querySelector('#view-all')
  const viewAllText = document.querySelector('#view-all-text')
  const totalPortraits = portraitGames.length

  const updateStatus = () => {
    if (portraitLabel) {
      portraitLabel.textContent = activePortraitCount < totalPortraits
        ? `PORTRAIT · ${activePortraitCount} OF ${totalPortraits}`
        : `PORTRAIT · ${totalPortraits}`
    }
    if (viewAllText) {
      const totalShown = landscapeGames.length + activePortraitCount
      if (activePortraitCount < totalPortraits) {
        viewAllText.textContent = `Showing ${totalShown} of ${games.length} games`
      } else {
        viewAllText.textContent = `All ${games.length} games`
        viewAllBtn?.classList.add('is-completed')
      }
    }
  }

  const expandBatch = (batchSize = 6) => {
    if (activePortraitCount >= totalPortraits) return
    const nextBatch = portraitGames.slice(activePortraitCount, activePortraitCount + batchSize)
    if (!nextBatch.length) return

    const markup = nextBatch.map((game) => gameCard(game)).join('')
    portraitGrid?.insertAdjacentHTML('beforeend', markup)
    activePortraitCount += nextBatch.length

    setupCardVideoPreviews(portraitGrid)
    setupCardTilt(portraitGrid)
    setupScrollReveals(portraitGrid)
    updateStatus()

    if (activePortraitCount >= totalPortraits) {
      observer?.disconnect()
      sentinel?.remove()
    }
  }

  let observer = null
  if (sentinel && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        expandBatch(6)
      }
    }, {
      rootMargin: '260px 0px 260px 0px',
      threshold: 0.01,
    })
    observer.observe(sentinel)
  }

  viewAllBtn?.addEventListener('click', () => {
    while (activePortraitCount < totalPortraits) {
      expandBatch(totalPortraits)
    }
  })

  window.expandAllGames = () => {
    while (activePortraitCount < totalPortraits) {
      expandBatch(totalPortraits)
    }
  }
}

function setupHeroSlideshow() {
  const link = document.querySelector('.hero-art-main')
  const slides = link?.querySelectorAll('.hero-slide')
  if (!link || slides?.length !== 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const featured = ['bow-clash', 'flick-goalz', 'arena-blitz']
    .map((slug) => games.find((game) => game.slug === slug))
    .filter((game) => game?.coverImage)
  if (featured.length < 2) return

  let currentImage = slides[0]
  let nextImage = slides[1]
  const caption = link.querySelector('.hero-art-caption strong')
  const count = link.querySelector('.hero-slide-count')
  let index = 0
  let timer
  let paused = false

  const advance = () => {
    if (paused) return
    const nextIndex = (index + 1) % featured.length
    const game = featured[nextIndex]
    const imageUrl = game.coverImage
    const preload = new Image()
    preload.onload = () => {
      nextImage.src = imageUrl
      nextImage.alt = `${game.title} gameplay screenshot`
      nextImage.classList.add('is-active')
      currentImage.classList.remove('is-active')
      link.href = `#/games/${game.slug}`
      link.setAttribute('aria-label', `View ${game.title} gameplay screenshots`)
      caption.textContent = game.title
      count.textContent = `${String(nextIndex + 1).padStart(2, '0')} / ${String(featured.length).padStart(2, '0')}`
      index = nextIndex
      ;[currentImage, nextImage] = [nextImage, currentImage]
    }
    preload.src = imageUrl
  }
  const start = () => { clearInterval(timer); timer = window.setInterval(advance, 4600) }
  const stop = () => clearInterval(timer)
  link.addEventListener('pointerenter', (event) => { if (event.pointerType === 'mouse') { paused = true; stop() } })
  link.addEventListener('pointerleave', () => { paused = false; start() })
  link.addEventListener('focus', () => { paused = true; stop() })
  link.addEventListener('blur', () => { paused = false; start() })
  start()
}

function setupCardVideoPreviews(root = document) {
  root.querySelectorAll('.game-card:not([data-preview-ready])').forEach((card) => {
    const frame = card.querySelector('.game-card-image')
    const cover = frame?.querySelector('img')
    const video = card.querySelector('.game-card-preview')
    const previewUrl = video?.dataset.previewVideo
    if (cover && frame) {
      const setCoverAspect = () => {
        if (!cover.naturalWidth || !cover.naturalHeight) return
        card.dataset.coverAspect = `${cover.naturalWidth} / ${cover.naturalHeight}`
      }
      if (cover.complete) setCoverAspect()
      else cover.addEventListener('load', setCoverAspect, { once: true })
    }
    if (!video || !previewUrl) return
    card.dataset.previewReady = 'true'

    video.addEventListener('loadedmetadata', () => {
      card.dataset.previewAspect = `${video.videoWidth} / ${video.videoHeight}`
      if (card.matches(':hover') || document.activeElement === card) frame.style.aspectRatio = card.dataset.previewAspect
    })

    let startTimer
    const start = () => {
      clearTimeout(startTimer)
      startTimer = window.setTimeout(() => {
        if (!card.matches(':hover') && document.activeElement !== card) return
        if (!video.src) video.src = previewUrl
        if (video.videoWidth && video.videoHeight) {
          card.dataset.previewAspect = `${video.videoWidth} / ${video.videoHeight}`
          frame.style.aspectRatio = card.dataset.previewAspect
        }
        video.play().then(() => card.classList.add('is-playing')).catch(() => {})
      }, 250)
    }
    const stop = () => {
      clearTimeout(startTimer)
      if (!video.paused) video.pause()
      if (video.readyState > 0) video.currentTime = 0
      card.classList.remove('is-playing')
      if (card.dataset.coverAspect) frame.style.aspectRatio = card.dataset.coverAspect
    }

    card.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'mouse' || event.pointerType === 'pen') start()
    })
    card.addEventListener('pointerleave', stop)
    card.addEventListener('focus', start)
    card.addEventListener('blur', stop)
  })
}

function gameCard(game) {
  const preview = game.media?.previewVideo ? asset(game.media.previewVideo) : ''
  return `<a class="game-card${game.isPortrait ? ' is-portrait' : ''}" href="#/games/${game.slug}" aria-label="View ${escapeHtml(game.title)} details"><span class="game-card-image${game.isPortrait ? ' is-portrait' : ''}" style="view-transition-name: game-cover-${game.slug}"><img src="${game.coverImage}" alt="${escapeHtml(game.title)} Splash artwork" loading="lazy"><video class="game-card-preview"${preview ? ` data-preview-video="${preview}"` : ''} muted playsinline loop preload="none" aria-hidden="true" tabindex="-1"></video><span class="card-arrow">${icon('arrow', 16)}</span></span><span class="game-card-title">${escapeHtml(game.title)}</span><span class="game-card-category">${escapeHtml(game.category)}</span></a>`
}

function setupCardTilt(root = document) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  root.querySelectorAll('.game-card:not([data-tilt-ready])').forEach((card) => {
    card.dataset.tiltReady = 'true'
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - .5
      const y = (event.clientY - bounds.top) / bounds.height - .5
      card.style.setProperty('--tilt-x', `${(y * -3.5).toFixed(2)}deg`)
      card.style.setProperty('--tilt-y', `${(x * 3.5).toFixed(2)}deg`)
      card.classList.add('is-tilting')
    })
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg')
      card.style.setProperty('--tilt-y', '0deg')
      card.classList.remove('is-tilting')
    })
  })
}

function setupScrollReveals(root = document) {
  const targets = root.querySelectorAll('.game-card, .about-section, .experience-strip, .detail-page > section:not(.detail-hero)')
  if (!targets.length) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('is-visible'))
    return
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      currentObserver.unobserve(entry.target)
    })
  }, { threshold: .12, rootMargin: '0px 0px -35px 0px' })
  targets.forEach((target, index) => {
    if (target.classList.contains('reveal-on-scroll')) return
    target.classList.add('reveal-on-scroll')
    if (target.classList.contains('game-card')) target.style.setProperty('--reveal-delay', `${(index % 3) * 75}ms`)
    observer.observe(target)
  })
}

function localVideoUrl(game) {
  if (import.meta.env.DEV && game.media?.video) {
    const fullPath = `${__GAME_CAPTURE_ROOT__}/${game.media.video}`
    return `/@fs${encodeURI(fullPath)}`
  }
  return asset(game.media?.previewVideo ?? '')
}

function videoSection(game) {
  const video = localVideoUrl(game)
  if (!video) {
    return `<div class="video-unavailable"><img src="${game.coverImage}" alt=""><div><strong>Gameplay video</strong><span>The original recording is kept with your source files. Add a hosted video URL here when you publish the portfolio.</span></div></div>`
  }
  return `<div class="video-frame"><video autoplay muted controls preload="auto" playsinline poster="${game.coverImage}" aria-label="${escapeHtml(game.title)} gameplay video"><source src="${video}" type="${video.toLowerCase().endsWith('.mov') ? 'video/quicktime' : 'video/mp4'}">Your browser does not support the video element.</video><span class="video-label">GAMEPLAY VIDEO</span></div>`
}

function getGameSystems(game) {
  if (game.contribution && game.contribution.length) return game.contribution

  const categoryLower = (game.category || '').toLowerCase()
  if (categoryLower.includes('strategy') || categoryLower.includes('tactics')) {
    return [
      'Squad movement, AI pathfinding & target selection',
      'Dynamic enemy wave spawning & battle pacing',
      'Resource collection, upgrade trees & unit progression',
      'Mobile touch controls & visual combat feedback (SFX/VFX)',
      'Draw-call batching & 60 FPS mobile performance optimization'
    ]
  }
  if (categoryLower.includes('shooter') || categoryLower.includes('archery')) {
    return [
      'Precision projectile / raycast shooting mechanics',
      'Weapon recoil, flight trajectory & impact physics',
      'Target hitboxes, damage calculation & combo scoring',
      'Screen shake, particle effects & responsive touch input',
      'Object pooling for projectiles and VFX efficiency'
    ]
  }
  if (categoryLower.includes('runner')) {
    return [
      'Speed momentum, lane shifting & hurdle collision logic',
      'Modular track generation & obstacle placement',
      'Gate multiplier mechanics & dynamic character scaling',
      'Haptic feedback & dynamic camera follow system',
      'Low memory footprint & smooth framerate on budget devices'
    ]
  }
  if (categoryLower.includes('puzzle')) {
    return [
      'Grid board matching logic & cascade combo triggers',
      'Item inventory, merge progression & state persistence',
      'Juicy merge animations, floating numbers & celebratory VFX',
      'Sound effect synchronization & haptic event triggers',
      'UI Canvas layout optimization for multiple aspect ratios'
    ]
  }
  return [
    'Core gameplay loop & character controller responsiveness',
    'Physics interactions, collision detection & trigger zones',
    'UI navigation, HUD scaling & safe area notch handling',
    'Particle systems, animations & audio feedback integration',
    'Memory optimization, draw-call reduction & stable 60 FPS'
  ]
}

function renderDetail(slug) {
  const game = games.find((entry) => entry.slug === slug)
  if (!game) {
    document.title = 'Game not found — Tri Truong'
    app.innerHTML = `${header()}<main class="not-found page-wrap"><p class="eyebrow">PROJECT NOT FOUND</p><h1>This game isn’t in the portfolio yet.</h1><a class="button button-primary" href="#/">${icon('back', 16)} Back to home</a></main>${footer()}`
    return
  }
  document.title = `${game.title} — Tri Truong Portfolio`
  const systems = getGameSystems(game)
  const aspects = imageAspects[game.slug] ?? imageAspects[game.captureSlug] ?? {}
  const gallery = game.images.slice(0, Math.min(game.images.length, 12))

  app.innerHTML = `${header()}
    <main class="detail-page page-wrap">
      <a class="back-link" href="#section/work">${icon('back', 16)} All projects <span>/</span> ${escapeHtml(game.title)}</a>
      <section class="detail-hero" aria-labelledby="detail-title">
        <div class="detail-intro">
          <p class="project-label">${game.featured ? 'GEARGAMES · OUTSOURCE' : 'GAMEPLAY CAPTURE'}</p>
          <h1 id="detail-title">${escapeHtml(game.title)}</h1>
          <p class="detail-subtitle">${escapeHtml(game.summary)}</p>
          <div class="tag-list">
            ${game.category.split(' · ').map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}
            <span>MOBILE</span>
          </div>
          <div class="detail-meta">
            <div><small>ROLE</small><strong>${game.role ? escapeHtml(game.role.split('·')[0].trim()) : 'Senior Unity Developer'}</strong></div>
            <div><small>ENGINE / TECH</small><strong>Unity · C#</strong></div>
            <div><small>PLATFORM</small><strong>Mobile (iOS / Android)</strong></div>
            <div><small>MEDIA CAPTURES</small><strong>${game.media?.video ? '1 Video' : 'No Video'} · ${game.images.length} Shots</strong></div>
          </div>
        </div>
        <div class="detail-cover${game.isPortrait ? ' is-portrait' : ''}" style="view-transition-name: game-cover-${game.slug}">
          <img src="${game.coverImage}" alt="${escapeHtml(game.title)} cover gameplay screenshot" fetchpriority="high">
        </div>
      </section>

      <section class="video-contribution ${game.isPortrait ? 'is-portrait-layout' : 'is-landscape-layout'}">
        ${videoSection(game)}
        <aside class="contribution-panel">
          <p class="eyebrow">01 / GAMEPLAY &amp; SYSTEMS</p>
          <h2>${game.contribution ? 'Systems I worked on' : 'Key mechanics &amp; implementation'}</h2>
          <p class="contribution-desc">${escapeHtml(game.summary)}</p>
          <ol>
            ${systems.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
          </ol>
        </aside>
      </section>

      <section class="gallery-section">
        <div class="section-heading">
          <div><p class="eyebrow">02 / SCREENSHOTS</p><h2>Inside the game</h2></div>
          <span class="gallery-count">${gallery.length} SHOWN · ${game.images.length} CAPTURES</span>
        </div>
        <div class="screenshot-grid">
          ${gallery.map((image, index) => {
            const ratio = aspects[image] ?? (game.isPortrait ? 0.56 : 1.78)
            return `<button class="screenshot-thumb" type="button" data-image="${image}" data-alt="${escapeHtml(game.title)} screenshot ${index + 1}" style="--aspect: ${ratio}; flex-grow: ${ratio}; flex-basis: calc(var(--gallery-height, 270px) * ${ratio}); max-width: calc(var(--gallery-height, 270px) * ${ratio} * 1.55);" aria-label="Open screenshot ${index + 1} of ${escapeHtml(game.title)}"><img src="${image}" alt="${escapeHtml(game.title)} screenshot ${index + 1}" loading="lazy"></button>`
          }).join('')}
        </div>
      </section>

      <section class="tech-strip">
        <div><p class="eyebrow">TECH &amp; FOCUS</p><p>Unity · Mobile game systems · Optimization</p></div>
        <a href="#section/work">${icon('back', 15)} Back to selected work</a>
      </section>
    </main>${footer()}<dialog class="image-dialog" aria-label="Screenshot viewer"><button class="dialog-close" type="button" aria-label="Close screenshot">${icon('close', 22)}</button><img class="dialog-image" alt=""></dialog>`
  setupGallery()
  setupScrollReveals()
  const coverImage = document.querySelector('.detail-cover img')
  const fitCoverToSource = () => {
    if (!coverImage?.naturalWidth || !coverImage?.naturalHeight) return
    coverImage.closest('.detail-cover')?.style.setProperty('--cover-ratio', `${coverImage.naturalWidth} / ${coverImage.naturalHeight}`)
  }
  if (coverImage?.complete) fitCoverToSource()
  else coverImage?.addEventListener('load', fitCoverToSource, { once: true })
  const detailVideo = document.querySelector('.video-frame video')
  const fitVideoFrame = () => {
    if (!detailVideo?.videoWidth || !detailVideo?.videoHeight) return
    const frame = detailVideo.closest('.video-frame')
    const ratio = detailVideo.videoWidth / detailVideo.videoHeight
    frame.style.setProperty('--video-ratio', `${detailVideo.videoWidth} / ${detailVideo.videoHeight}`)
    frame.style.setProperty('--video-ratio-number', ratio.toFixed(5))
    frame.classList.toggle('is-portrait-video', ratio < 1)
  }
  detailVideo?.addEventListener('loadedmetadata', fitVideoFrame, { once: true })
  fitVideoFrame()
  detailVideo?.play().catch(() => {})
}

function setupGallery() {
  const dialog = document.querySelector('.image-dialog')
  const image = dialog?.querySelector('.dialog-image')
  if (!dialog || !image) return
  document.querySelectorAll('.screenshot-thumb').forEach((button) => button.addEventListener('click', () => {
    image.src = button.dataset.image
    image.alt = button.dataset.alt
    dialog.showModal()
  }))
  dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close())
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close() })
}

function setupParallax() {
  const deepLayer = document.querySelector('.layer-deep')
  const midLayer = document.querySelector('.layer-mid')
  if (!deepLayer || !midLayer) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let ticking = false
  const update = () => {
    const y = window.scrollY || window.pageYOffset
    deepLayer.style.transform = `translate3d(0, ${(y * -0.05).toFixed(1)}px, 0)`
    midLayer.style.transform = `translate3d(0, ${(y * -0.13).toFixed(1)}px, 0)`
    ticking = false
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update)
      ticking = true
    }
  }, { passive: true })

  window.updateParallax = update
  update()
}

function render() {
  const hash = window.location.hash.replace(/^#/, '')
  const section = hash.match(/^section\/(work|about|experience)$/)
  if (section) {
    if (!document.querySelector('.home-page')) renderHome()
    if (section[1] === 'about' || section[1] === 'experience') {
      window.expandAllGames?.()
    }
    requestAnimationFrame(() => document.getElementById(section[1])?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    window.updateParallax?.()
    return
  }
  const match = hash.match(/^\/games\/([a-z0-9-]+)\/?$/)
  if (match) renderDetail(match[1])
  else renderHome()
  window.scrollTo({ top: 0, behavior: 'instant' })
  window.updateParallax?.()
}

window.addEventListener('hashchange', () => {
  if (document.startViewTransition && !window.location.hash.startsWith('#section/')) {
    document.startViewTransition(() => render())
  } else render()
})
window.addEventListener('popstate', render)
document.addEventListener('click', (event) => {
  const cvDialog = document.querySelector('#cv-dialog')
  if (cvDialog) {
    if (event.target.closest('[data-open-cv]')) {
      if (!cvDialog.open) cvDialog.showModal()
    } else if (event.target.closest('[data-close-cv]') || event.target === cvDialog) {
      cvDialog.close()
    }
  }

  const roadmapDialog = document.querySelector('#roadmap-dialog')
  if (roadmapDialog) {
    if (event.target.closest('[data-open-roadmap]')) {
      if (!roadmapDialog.open) roadmapDialog.showModal()
    } else if (event.target.closest('[data-close-roadmap]') || event.target === roadmapDialog) {
      roadmapDialog.close()
    }
  }
})
setupParallax()
render()
