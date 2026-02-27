// --- Mouse sparkle trail ---
document.addEventListener('mousemove', e => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = e.pageX + 'px';
    sparkle.style.top = e.pageY + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 500);
});

// --- Popup modals ---
function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

document.querySelectorAll('input, textarea, button').forEach(el => {
    el.addEventListener('mousemove', e => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.left = e.pageX + 'px';
        sparkle.style.top = e.pageY + 'px';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 400);
    });
});

/* === Cinematic particle background (lightweight) === */
;(function(){
    const wrap = document.getElementById('particle-wrap');
    if(!wrap) return;
    const w = () => window.innerWidth;
    const h = () => window.innerHeight;
    const particles = [];

    function createParticle(){
        const el = document.createElement('div');
        el.className = 'particle';
        const size = 4 + Math.random()*10;
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        el.style.left = (Math.random()*w()) + 'px';
        el.style.top = (Math.random()*h()) + 'px';
        el.style.opacity = 0.6 + Math.random()*0.6;
        el._vx = (Math.random()-0.5) * 0.2;
        el._vy = (Math.random()-0.5) * 0.2;
        wrap.appendChild(el);
        particles.push(el);
        // limit
        if(particles.length > 90){
            const rm = particles.shift(); if(rm && rm.parentNode) rm.parentNode.removeChild(rm);
        }
    }

    // initial
    for(let i=0;i<35;i++) createParticle();

    function tick(){
        particles.forEach(p =>{
            const x = parseFloat(p.style.left);
            const y = parseFloat(p.style.top);
            let nx = x + p._vx; let ny = y + p._vy;
            if(nx < -20) nx = w()+20; if(nx > w()+20) nx = -20;
            if(ny < -20) ny = h()+20; if(ny > h()+20) ny = -20;
            p.style.left = nx + 'px'; p.style.top = ny + 'px';
            // subtle shimmer
            p.style.transform = `scale(${1 + Math.sin(Date.now()/1000 + nx*0.001)*0.08})`;
        });
        if(Math.random() < 0.04) createParticle();
        requestAnimationFrame(tick);
    }
    tick();
    // responsive: clear on resize
    window.addEventListener('resize', ()=>{ while(particles.length>0){ const rm = particles.shift(); if(rm && rm.parentNode) rm.parentNode.removeChild(rm);} for(let i=0;i<35;i++) createParticle(); });
})();

/* === Prophecy regen button === */
document.getElementById('regen-prophecy')?.addEventListener('click', ()=>{
    const texts = [
        "The moon forgets its shadow; a path appears.",
        "A hidden guide will step from the crowd.",
        "Rivers sing tonight; heed the undertow.",
        "A quiet oath will echo across broken gates.",
        "An ember buried long will light the way."
    ];
    const el = document.getElementById('prophecy-text');
    if(el) el.innerText = texts[Math.floor(Math.random()*texts.length)];
});

/* === Quiz interactions === */
document.querySelectorAll('.realm-card').forEach(card =>{
    card.addEventListener('click', ()=>{
        const realm = card.dataset.realm || 'Wandering Realm';
        const txt = `You are drawn to ${realm}. Embrace its path and the world will reveal its secrets.`;
        const modal = document.getElementById('quiz-result');
        const qtext = document.getElementById('quiz-text');
        if(qtext) qtext.innerText = txt;
        if(modal) modal.style.display = 'flex';
    });
});

/* === Locations: show description on click (uses modal) === */
document.querySelectorAll('.location-card').forEach(loc =>{
    loc.addEventListener('click', ()=>{
        const d = loc.dataset.desc || 'Ancient place.';
        // reuse modalStory if present
        const id = 'modalLocationTemp';
        let tmp = document.getElementById(id);
        if(!tmp){
            tmp = document.createElement('div'); tmp.id = id; tmp.className = 'modal';
            tmp.innerHTML = `<div class="modal-content"><p id="modalLocationText"></p><div class="close-btn" onclick="closeModal('${id}')">Close</div></div>`;
            document.body.appendChild(tmp);
        }
        document.getElementById('modalLocationText').innerText = d;
        openModal(id);
    });
});

/* === Portal button: gentle pulse then navigate === */
document.getElementById('portalBtn')?.addEventListener('click', (e)=>{
    e.currentTarget.animate([{boxShadow:'0 6px 28px rgba(124,58,237,0.18)'},{boxShadow:'0 20px 120px rgba(124,58,237,0.26)'}],{duration:700,fill:'forwards'});
    setTimeout(()=>{ window.location.href = '/contact'; },750);
});

/* === Section reveal on scroll === */
(function(){
    const obs = new IntersectionObserver((entries)=>{
        entries.forEach(en=>{
            if(en.isIntersecting){
                en.target.classList.add('revealed');
                en.target.classList.remove('hidden');
            } else {
                en.target.classList.remove('revealed');
                en.target.classList.add('hidden');
            }
        });
    },{threshold:0.18});
    document.querySelectorAll('.section').forEach(s=>{ s.classList.add('hidden'); obs.observe(s); });
})();

/* === Scroll indicator click scrolls down slightly === */
document.getElementById('scroll-indicator')?.addEventListener('click', ()=>{
    window.scrollBy({top: window.innerHeight*0.7, left:0, behavior:'smooth'});
});

/* === Butterflies cursor effect === */
(function(){
    const wrap = document.getElementById('butterfly-wrap');
    if(!wrap) return;
    const colors = ['#ffd6f6','#c1b3ff','#9ef3ff','#ffd9b3'];
    const pool = [];
    const max = 28;

    function make(x,y){
        const b = document.createElement('div'); b.className='butterfly';
        const c = colors[Math.floor(Math.random()*colors.length)];
        b.style.background = c; b.style.left = x+'px'; b.style.top = y+'px';
        b.style.width = (6 + Math.random()*12)+'px';
        b.style.height = (6 + Math.random()*12)+'px';
        b.style.opacity = 0.9; b.style.transform = `translate(-50%,-50%) rotate(${Math.random()*30-15}deg)`;
        wrap.appendChild(b); pool.push(b);
        // float and fade
        const dur = 1600 + Math.random()*1600;
        b.animate([{transform:b.style.transform, opacity:1, offset:0},{transform:`translate(${(Math.random()*120-60)}px,${-40-Math.random()*40}px) rotate(${Math.random()*90-45}deg)`, opacity:0.02, offset:1}],{duration:dur,easing:'ease-out',fill:'forwards'});
        setTimeout(()=>{ if(b.parentNode) b.parentNode.removeChild(b); const i=pool.indexOf(b); if(i>-1) pool.splice(i,1); }, dur+80);
        if(pool.length>max){ const rm = pool.shift(); if(rm && rm.parentNode) rm.parentNode.removeChild(rm); }
    }

    let last = 0;
    document.addEventListener('mousemove', e=>{
        const t = Date.now(); if(t-last<60) return; last=t;
        make(e.clientX + (Math.random()*40-20), e.clientY + (Math.random()*20-10));
    });
})();

/* === Realm modal popups === */
document.querySelectorAll('.realm-card').forEach(card=>{
    card.addEventListener('click', ()=>{
        const title = card.dataset.title || card.textContent.trim();
        const desc = card.dataset.desc || '';
        const rulers = card.dataset.rulers || 'Unknown';
        const danger = card.dataset.danger || 'Unknown';
        const magic = card.dataset.magic || 'Unknown';
        const modal = document.getElementById('realm-modal');
        if(!modal) return;
        document.getElementById('realm-title').innerText = title;
        document.getElementById('realm-desc').innerText = desc;
        const meta = document.getElementById('realm-meta'); meta.innerHTML = '';
        [['Rulers',rulers],['Dangers',danger],['Magic',magic]].forEach(x=>{ const li=document.createElement('li'); li.innerText = x[0]+': '+x[1]; meta.appendChild(li); });
        openModal('realm-modal');
    });
});

// === Featured realm previews on home (teaser modal) ===
document.querySelectorAll('.realm-preview').forEach(pre=>{
    pre.addEventListener('click', ()=>{
        const name = pre.dataset.realm || pre.textContent.trim();
        const id = 'previewRealmTmp';
        let tmp = document.getElementById(id);
        if(!tmp){
            tmp = document.createElement('div'); tmp.id = id; tmp.className = 'modal';
            tmp.innerHTML = `<div class="modal-content"><h3 id="previewRealmTitle"></h3><p id="previewRealmDesc"></p><div style="margin-top:1rem"><a class="glow" href="/realms">Explore Realms</a> <span class="close-btn" onclick="closeModal('${id}')">Close</span></div></div>`;
            document.body.appendChild(tmp);
        }
        document.getElementById('previewRealmTitle').innerText = name;
        document.getElementById('previewRealmDesc').innerText = `A glimpse into ${name}. Visit the Realms page for full lore.`;
        openModal(id);
    });
});

/* === Relic modal popups === */
document.querySelectorAll('.relic-card').forEach(card=>{
    card.addEventListener('click', ()=>{
        const title = card.textContent.trim();
        const origin = card.dataset.origin || '';
        const power = card.dataset.power || '';
        const cost = card.dataset.cost || '';
        const wielders = card.dataset.wielders || '';
        const modal = document.getElementById('relic-modal'); if(!modal) return;
        document.getElementById('relic-title').innerText = title;
        document.getElementById('relic-origin').innerText = origin;
        const meta = document.getElementById('relic-meta'); meta.innerHTML = '';
        [['Power',power],['Cost',cost],['Known wielders',wielders]].forEach(x=>{ const li=document.createElement('li'); li.innerText = x[0]+': '+x[1]; meta.appendChild(li); });
        openModal('relic-modal');
    });
});

/* === Timeline reveal === */
document.querySelectorAll('.timeline-item').forEach(it=>{
    it.addEventListener('click', ()=>{ it.classList.toggle('open'); });
});

/* === Manuscript reveal secret button === */
document.querySelectorAll('.reveal-secret').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        const sec = document.querySelector('.manuscript .old');
        if(sec) sec.innerText = sec.innerText + '\n\nRevealed: The prince of dawn traded his shadow for a promise.';
        btn.style.display='none';
    });
});

/* === Prophecy page interactions === */
document.getElementById('open-prophecy')?.addEventListener('click', ()=>{
    const lines = [
        'An ember will find its kin inside an old keyhole.',
        'When silvering rain falls, one voice must choose silence.',
        'A path will open beneath the feet of those who do not look back.',
        'The crystal asks for truth; speak one and the rest will keep it.'
    ];
    const el = document.getElementById('prophecy-blurb') || document.getElementById('fate-line');
    if(el) el.innerText = lines[Math.floor(Math.random()*lines.length)];
    const c = document.getElementById('crystal'); if(c) c.animate([{boxShadow:'0 12px 60px rgba(124,58,237,0.15) inset'},{boxShadow:'0 30px 140px rgba(236,72,153,0.16)'}],{duration:900,fill:'forwards'});
});

// === Take-quiz on prophecy page: show quick fate alignment ===
document.getElementById('take-quiz')?.addEventListener('click', ()=>{
    const alignments = [
        'Luminar — You bind light to purpose; your decisions heal or burn.',
        'Nocturn — You move in shadow; your choices protect secrets at cost.',
        'Verdant — You grow with the land; your empathy shapes whole peoples.',
        'Aether — You walk thin places; you trade safety for knowledge.'
    ];
    const pick = alignments[Math.floor(Math.random()*alignments.length)];
    const res = document.getElementById('fate-result');
    if(res){ res.classList.remove('hidden'); res.innerText = pick; res.scrollIntoView({behavior:'smooth'}); }
});

/* === Prophecy generator button on prophecy page */
document.getElementById('gen-prophecy')?.addEventListener('click', ()=>{
    const lines = ['The tide remembers your name.','A map burns but the trail stays.','You will borrow a memory and return a secret.','Stars trade one wish for a small grief.'];
    const res = document.getElementById('fate-line'); if(res) res.innerText = lines[Math.floor(Math.random()*lines.length)];
});

/* === Contact form: send via fetch to show confirmation without leaving page === */
document.querySelectorAll('.contact-form').forEach(form=>{
    form.addEventListener('submit', e=>{
        e.preventDefault();
        const data = new FormData(form);
        fetch(form.action, {method:'POST', body:data}).then(r=>{
            openModal('send-confirm');
            form.reset();
        }).catch(()=>{ openModal('send-confirm'); form.reset(); });
    });
});
