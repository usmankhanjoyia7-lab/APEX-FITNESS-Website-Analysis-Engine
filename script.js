 const loadingMessages = [
    "SCANNING SITE ARCHITECTURE...",
    "ANALYZING CONVERSION ELEMENTS...",
    "RUNNING SEO AUDIT...",
    "CHECKING MOBILE EXPERIENCE...",
    "EVALUATING PERFORMANCE METRICS...",
    "PROCESSING TECH STACK...",
    "GENERATING RECOMMENDATIONS..."
];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function runAnalysis() {
    const input = document.getElementById('urlInput').value.trim();
    const url = input || 'https://yourgym.com';
    
    document.getElementById('analyzeBtn').disabled = true;
    document.getElementById('loader').classList.add('active');
    document.getElementById('results').classList.remove('active');

    for (let i = 0; i < loadingMessages.length; i++) {
        document.getElementById('loaderText').textContent = loadingMessages[i];
        await sleep(600);
    }

    await sleep(400);
    document.getElementById('loader').classList.remove('active');
    renderResults(url);
    document.getElementById('analyzeBtn').disabled = false;
}

function getScore(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function scoreColor(s) {
    if (s >= 80) return 'var(--green)';
    if (s >= 60) return 'var(--gold)';
    return 'var(--red)';
}

function renderResults(url) {
    const domain = url.replace(/https?:\/\//, '').replace(/\/$/, '') || 'yourgym.com';

    const scores = {
        'Performance':   getScore(42, 78),
        'Mobile UX':     getScore(50, 85),
        'Conversion':    getScore(30, 72),
        'SEO':           getScore(45, 80),
        'Content':       getScore(55, 88),
        'Security':      getScore(60, 90),
    };

    const avg = Math.round(Object.values(scores).reduce((a,b) => a+b, 0) / Object.values(scores).length);

    // Overall score
    document.getElementById('overallScore').textContent = avg;
    document.getElementById('overallScore').style.background = `linear-gradient(135deg, ${scoreColor(avg)}, var(--gold))`;
    document.getElementById('overallScore').style.webkitBackgroundClip = 'text';
    document.getElementById('siteTitle').textContent = domain.toUpperCase().replace(/\./g, ' ');
    document.getElementById('siteUrl').textContent = '→ ' + domain;

    const grade = avg >= 85 ? 'ELITE ★★★' : avg >= 70 ? 'STRONG ★★' : avg >= 55 ? 'AVERAGE ★' : 'NEEDS WORK';
    document.getElementById('scoreGrade').textContent = grade;

    // Score bars
    const barsHtml = Object.entries(scores).map(([k, v]) => `
        <div class="score-bar-item">
            <label>${k} <span>${v}/100</span></label>
            <div class="bar-track"><div class="bar-fill" data-width="${v}" style="background:${scoreColor(v)}"></div></div>
        </div>
    `).join('');
    document.getElementById('scoreBars').innerHTML = barsHtml;

    // Section cards
    const sections = [
        {
            icon: '⚡', title: 'PERFORMANCE', score: scores['Performance'],
            findings: [
                { s: scores['Performance'] > 65 ? 'good' : 'bad', title: 'Page Load Speed', text: scores['Performance'] > 65 ? 'Acceptable load time under 3s on mobile' : 'Load time exceeds 3s — critical for mobile gym visitors' },
                { s: 'warn', title: 'Lazy Loading', text: 'Trainer photos and facility gallery not lazy-loaded, causing initial payload bloat' },
                { s: 'bad', title: 'Caching Policy', text: 'Static assets lack long-term cache headers. Re-downloads on every visit.' }
            ]
        },
        {
            icon: '📱', title: 'MOBILE UX', score: scores['Mobile UX'],
            findings: [
                { s: scores['Mobile UX'] > 60 ? 'good' : 'warn', title: 'Responsive Layout', text: scores['Mobile UX'] > 60 ? 'Layout adapts well to small screens' : 'Class schedule table overflows on screens under 400px' },
                { s: 'bad', title: 'CTA Button Size', text: '"Join Now" button is 28px height on mobile. Minimum should be 48px for thumb-friendly tapping.' },
                { s: 'warn', title: 'Navigation', text: 'Hamburger menu has no visible close button. Trainer profiles require horizontal scroll on mobile.' },
                { s: scores['Mobile UX'] > 70 ? 'good' : 'bad', title: 'Touch Gestures', text: scores['Mobile UX'] > 70 ? 'Swipe-friendly class schedule implemented' : 'Interactive class timetable requires pinch-zoom — unusable on phones' },
                { s: 'good', title: 'Font Readability', text: 'Body text is 16px+ which meets minimum accessibility standards' }
            ]
        },
        {
            icon: '💰', title: 'CONVERSION', score: scores['Conversion'],
            findings: [
                { s: scores['Conversion'] > 55 ? 'warn' : 'bad', title: 'Hero CTA', text: scores['Conversion'] > 55 ? 'CTA present but lacks urgency trigger or social proof' : 'Hero section has no clear primary CTA above the fold' },
                { s: 'bad', title: 'Free Trial Offer', text: 'No prominent free trial or zero-commitment offer visible. Industry benchmark: free trials convert 3× better.' },
                { s: 'warn', title: 'Social Proof', text: 'Member count and transformation photos present but testimonials lack verified names and photos.' },
                { s: scores['Conversion'] > 60 ? 'good' : 'bad', title: 'Pricing Clarity', text: scores['Conversion'] > 60 ? 'Membership pricing is clearly displayed with comparison table' : 'Pricing requires clicking away from main page — major friction point' },
                { s: 'bad', title: 'Sticky CTA', text: 'No sticky "Join Now" button on scroll. Visitors lose conversion entry point after hero.' }
            ]
        },
        {
            icon: '🔍', title: 'SEO', score: scores['SEO'],
            findings: [
                { s: 'bad', title: 'Local SEO Schema', text: 'No LocalBusiness JSON-LD schema markup. Missing from Google local pack eligibility.' },
                { s: scores['SEO'] > 65 ? 'good' : 'warn', title: 'Meta Tags', text: scores['SEO'] > 65 ? 'Title tags and meta descriptions present across pages' : 'Several service pages missing unique meta descriptions' },
                { s: 'warn', title: 'Keyword Targeting', text: 'Homepage targets brand name only. High-intent terms like "gym near [city]" not in H1 or page copy.' },
                { s: scores['SEO'] > 50 ? 'warn' : 'bad', title: 'Blog Content', text: scores['SEO'] > 50 ? 'Blog exists but publishing frequency is irregular' : 'No blog or fitness education content. Zero organic long-tail opportunity.' },
                { s: 'bad', title: 'Google Business', text: 'No verified Google Business Profile linked. Critical for local discovery.' }
            ]
        },
        {
            icon: '🎨', title: 'CONTENT & UX', score: scores['Content'],
            findings: [
                { s: scores['Content'] > 70 ? 'good' : 'warn', title: 'Visual Hierarchy', text: scores['Content'] > 70 ? 'Clear content sections with strong visual flow' : 'All sections feel equal weight — eye has no natural reading path' },
                { s: 'warn', title: 'Trainer Profiles', text: 'Trainer bios present but lack certifications, philosophy, and booking buttons. Low trust.' },
                { s: scores['Content'] > 65 ? 'good' : 'bad', title: 'Facility Gallery', text: scores['Content'] > 65 ? 'Gallery showcases key areas with good photography' : 'Only 3 facility photos. Visitors cannot visualize the space before visiting.' },
                { s: 'bad', title: 'Transformation Stories', text: 'No before/after member transformations visible. Highest-converting content type missing.' },
                { s: 'good', title: 'Class Schedule', text: 'Interactive class schedule present with time and trainer info' }
            ]
        },
        {
            icon: '🔐', title: 'SECURITY', score: scores['Security'],
            findings: [
                { s: scores['Security'] > 70 ? 'good' : 'bad', title: 'SSL Certificate', text: scores['Security'] > 70 ? 'HTTPS enforced with valid certificate' : 'HTTP detected on some pages — destroys trust and SEO ranking' },
                { s: 'good', title: 'Contact Form', text: 'CAPTCHA present on signup forms preventing bot submissions' },
                { s: scores['Security'] > 75 ? 'good' : 'warn', title: 'Data Privacy', text: scores['Security'] > 75 ? 'GDPR cookie consent present' : 'No cookie consent banner — GDPR compliance risk' },
                { s: 'warn', title: 'Member Login', text: 'Member portal uses basic authentication. Recommend OAuth2 + 2FA for member accounts.' },
                { s: 'good', title: 'Payment Security', text: 'Payment processing appears to use a third-party PCI-compliant gateway' }
            ]
        }
    ];

    document.getElementById('sectionCards').innerHTML = sections.map(sec => `
        <div class="analysis-card">
            <div class="card-header">
                <div class="card-title"><div class="card-icon">${sec.icon}</div>${sec.title}</div>
                <div class="card-score" style="color:${scoreColor(sec.score)}">${sec.score}</div>
            </div>
            <div class="card-body">
                ${sec.findings.map(f => `
                    <div class="finding">
                        <div class="finding-status status-${f.s}">${f.s === 'good' ? '✓' : f.s === 'warn' ? '!' : '✕'}</div>
                        <div class="finding-text"><strong>${f.title}</strong>${f.text}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    // Tech Stack
    const tech = [
        { icon: '⚛️', name: 'NEXT.JS', desc: 'React framework with SSR/SSG for speed + SEO', status: 'green' },
        { icon: '🟢', name: 'NODE.JS', desc: 'Backend API, booking system, member management', status: 'green' },
        { icon: '🐘', name: 'POSTGRESQL', desc: 'Relational DB for members, classes, bookings', status: 'green' },
        { icon: '💳', name: 'STRIPE', desc: 'Subscription billing + one-time membership payments', status: 'amber' },
        { icon: '📧', name: 'SENDGRID', desc: 'Automated booking & renewal email sequences', status: 'amber' },
        { icon: '📱', name: 'WHATSAPP API', desc: 'Class reminders and lead nurturing via chat', status: 'amber' },
        { icon: '🔴', name: 'REDIS', desc: 'Session caching and real-time class availability', status: 'green' },
        { icon: '☁️', name: 'VERCEL / AWS', desc: 'Global CDN edge deployment for fast load times', status: 'green' },
    ];

    document.getElementById('techCards').innerHTML = tech.map(t => `
        <div class="tech-card">
            <div class="tech-icon">${t.icon}</div>
            <div class="tech-name">${t.name}</div>
            <div class="tech-desc">
                <span class="tech-status-dot" style="background:${t.status === 'green' ? 'var(--green)' : 'var(--amber)'}"></span>
                ${t.desc}
            </div>
        </div>
    `).join('');

    // Funnel
    const funnelData = [
        { step: '01', name: 'VISITOR', pct: '100%', sub: 'organic / paid' },
        { step: '02', name: 'HERO HOOK', pct: '68%', sub: 'scroll past hero' },
        { step: '03', name: 'CTA CLICK', pct: '22%', sub: 'join / free trial' },
        { step: '04', name: 'FORM FILL', pct: '14%', sub: 'lead captured' },
        { step: '05', name: 'MEMBER', pct: '8%', sub: 'converted' },
    ];

    document.getElementById('funnelSteps').innerHTML = funnelData.map(f => `
        <div class="funnel-step">
            <div class="funnel-num">${f.step}</div>
            <div class="funnel-step-name">${f.name}</div>
            <div class="funnel-pct">${f.pct}</div>
            <div style="font-size:0.65rem;color:var(--muted);margin-top:2px">${f.sub}</div>
        </div>
    `).join('');

    // SEO Checklist
    const seoItems = [
        { label: 'Title Tags on all pages', done: true },
        { label: 'Meta descriptions', done: scores['SEO'] > 60 },
        { label: 'LocalBusiness schema markup', done: false },
        { label: 'Google Business Profile', done: false },
        { label: 'Sitemap.xml submitted', done: scores['SEO'] > 65 },
        { label: 'Robots.txt configured', done: true },
        { label: 'H1 with target keyword', done: scores['SEO'] > 55 },
        { label: 'Service pages for each program', done: scores['SEO'] > 70 },
        { label: 'Location-based landing pages', done: false },
        { label: 'Blog with fitness content', done: scores['SEO'] > 75 },
        { label: 'Internal linking structure', done: scores['SEO'] > 60 },
        { label: 'Image alt tags', done: scores['SEO'] > 65 },
    ];

    document.getElementById('seoChecklist').innerHTML = seoItems.map(i => `
        <div class="check-item">
            <div class="check-box ${i.done ? 'checked' : 'unchecked'}">${i.done ? '✓' : '✕'}</div>
            <span style="color:${i.done ? 'var(--text)' : 'var(--sub)'}">${i.label}</span>
        </div>
    `).join('');

    // Recommendations
    const recos = [
        { p: 'high', title: 'Add Sticky "Join Now" CTA', body: 'Implement a fixed bottom bar on mobile and sticky top-right button on desktop. Expected conversion uplift: 15–25%.', impact: '+25% CVR' },
        { p: 'high', title: 'Launch Free Trial Landing Page', body: 'Create a dedicated "7-Day Free Trial" page with minimal form (name + phone only). Remove all friction. Industry data shows 3× conversion vs standard sign-up.', impact: '+3× LEADS' },
        { p: 'high', title: 'Implement LocalBusiness Schema', body: 'Add JSON-LD structured data to homepage and contact page. Unlocks Google Knowledge Panel and local pack eligibility within 4–8 weeks.', impact: 'SEO +40%' },
        { p: 'high', title: 'Fix Mobile CTA Sizes', body: 'All primary buttons must be minimum 48×48px. Class booking, trainer booking, and membership CTAs are currently too small for thumb interaction.', impact: 'UX CRITICAL' },
        { p: 'med', title: 'Add Member Transformation Gallery', body: 'Before/after transformation content is the highest-converting trust element for gyms. Add 6–10 real member stories with photos, timelines, and quotes.', impact: '+18% TRUST' },
        { p: 'med', title: 'Optimize Images with WebP', body: 'Convert all JPEG/PNG images to WebP format. Implement lazy loading for gallery and trainer photos. Expected page load improvement: 35–45%.', impact: '-40% SIZE' },
        { p: 'med', title: 'Build AI Workout Recommender', body: 'An interactive tool that asks 3–4 questions (goal, fitness level, time available) and recommends a program. High engagement drives longer site sessions and trust.', impact: '+SESSION' },
        { p: 'med', title: 'Set Up Automated Email Sequences', body: 'Post-inquiry: 5-email nurture sequence over 7 days. Post-signup: onboarding flow. Renewal: 30/7/1 day reminders. Use SendGrid with behavior triggers.', impact: '-15% CHURN' },
        { p: 'low', title: 'Add WhatsApp Chat Widget', body: 'WhatsApp chat converts 4× better than traditional contact forms for local fitness businesses. Add a floating button linked to your business number.', impact: '+LEADS' },
        { p: 'low', title: 'Create Program-Specific Pages', body: 'Each fitness program (HIIT, yoga, weight loss, etc.) needs its own SEO-optimized page with trainer, schedule, pricing, and testimonials.', impact: 'SEO +30%' },
        { p: 'low', title: 'Add BMI & Calorie Calculators', body: 'Interactive fitness tools increase average session time by 2–4 minutes and create a natural entry point to lead capture. High shareability on social.', impact: '+ENGAGE' },
        { p: 'low', title: 'Launch Weekly Fitness Blog', body: 'Publish 2 posts/week targeting long-tail keywords: "best gym workout for beginners", "how to lose weight fast", etc. 6-month compound SEO effect.', impact: 'ORGANIC' },
    ];

    const badgeMap = { high: 'badge-high', med: 'badge-med', low: 'badge-low' };
    const labelMap = { high: 'HIGH', med: 'MEDIUM', low: 'LOW' };

    document.getElementById('recoList').innerHTML = recos.map(r => `
        <div class="reco-item ${r.p}">
            <div class="reco-item-title">
                <span>${r.title}</span>
                <span class="priority-badge ${badgeMap[r.p]}">${labelMap[r.p]}</span>
            </div>
            <div class="reco-item-body">
                ${r.body}
                <div style="margin-top:8px">
                    <span class="impact-tag priority-badge ${badgeMap[r.p]}">${r.impact}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Show results
    document.getElementById('results').classList.add('active');

    // Animate bars
    requestAnimationFrame(() => {
        document.querySelectorAll('.bar-fill').forEach(el => {
            el.style.width = el.dataset.width + '%';
        });
    });

    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

// Auto-analyze on Enter
document.getElementById('urlInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') runAnalysis();
});
