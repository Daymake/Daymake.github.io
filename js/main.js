/**
 * js/main.js
 * 核心逻辑：
 * 1. 统一渲染 Header / Footer
 * 2. 粒子背景 / 时间循环 / 一言
 * 3. 营业状态：
 *    - 时间：周一至周五 08:00-18:00 营业
 *    - 视觉：营业(绿字+图片Logo) / 打烊(红字+骷髅SVG)
 * 4. Footer：红心调整为 text-base (16px) 精致大小
 */

const App = {
    init: () => {
        // 1. 渲染结构
        App.renderHeader();
        App.renderFooter();
        
        // 2. 启动特效
        App.initParticles();
        App.initMobileMenu();
        App.initTooltips();
        App.initBackToTop();

        // 3. 启动核心循环
        if (document.getElementById('clock-time')) App.startTimeLoop(); 
        if (document.getElementById('quote-text')) App.initHome();
        if (document.getElementById('about-typewriter')) App.initAbout();
    },

    getRelativePrefix: () => {
        const path = window.location.pathname;
        if (path.includes('/notice/') || path.includes('/friends/')) return '../';
        return '';
    },

    // ================== Header ==================
    renderHeader: () => {
        if (document.querySelector('header')) return; 

        const p = App.getRelativePrefix();
        const logoFallback = `this.onerror=null;this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjQzZjVlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTEyIDJMMiA3bDEwIDUgMTAtNS0xMC01ek0yIDE3bDEwIDUgMTAtNU0yIDEybDEwIDUgMTAtNSIvPjwvc3ZnPg=='`;

        const headerHTML = `
            <header class="fixed top-4 z-50 w-[90%] max-w-6xl left-1/2 -translate-x-1/2 h-12 rounded-full flex items-center justify-between px-6 shadow-lg border border-white/60 bg-white/80 backdrop-blur-xl transition-all duration-300">
                <a href="${p}index.html" class="flex items-center gap-2 group cursor-pointer no-underline flex-shrink-0">
                    <div class="relative h-10 w-auto min-w-[2.5rem] flex items-center flex-shrink-0">
                         <img src="${p}img/Logo.PNG" alt="" class="h-full w-auto object-contain max-w-none group-hover:animate-heartbeat" onerror="${logoFallback}">
                    </div>
                    <span class="text-slate-700 font-bold tracking-wider text-sm group-hover:text-rose-500 transition-colors duration-300">捌玖</span>
                </a>

                <nav class="hidden md:flex items-center gap-1">
                    ${App.createNavLink(p + 'index.html', '首页', '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>')}
                    ${App.createNavLink(p + 'notice/index.html', '公告', '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>')}
                    ${App.createNavLink(p + 'friends/index.html', '友链', '<path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/>')}
                    ${App.createNavLink(p + 'about.html', '关于', '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>')}
                </nav>

                <button id="mobile-menu-btn" class="md:hidden p-2 text-slate-500 hover:text-rose-500 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="4" x2="20" y1="12" y2="12"/>
                        <line x1="4" x2="20" y1="6" y2="6"/>
                        <line x1="4" x2="20" y1="18" y2="18"/>
                    </svg>
                </button>
            </header>
            <div id="mobile-menu" class="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300">
                <div class="absolute top-20 left-4 right-4 bg-white p-4 rounded-2xl border border-slate-100 flex flex-col gap-2 shadow-xl transform -translate-y-10 transition-transform duration-300">
                     ${App.createMobileLink(p + 'index.html', '首页')}
                     ${App.createMobileLink(p + 'notice/index.html', '公告')}
                     ${App.createMobileLink(p + 'friends/index.html', '友链')}
                     ${App.createMobileLink(p + 'about.html', '关于')}
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    },

    createNavLink: (href, text, iconPath) => {
        const path = window.location.pathname;
        let isActive = false;
        if (text === '公告' && path.includes('notice')) isActive = true;
        else if (text === '友链' && path.includes('friends')) isActive = true;
        else if (text === '关于' && path.includes('about.html')) isActive = true;
        else if (text === '首页' && (path.endsWith('index.html') || path.endsWith('/')) && !path.includes('notice') && !path.includes('friends')) isActive = true;

        const activeClass = isActive ? 'text-rose-600 bg-rose-50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50';
        const iconColor = isActive ? 'text-rose-500' : 'text-slate-400';

        return `
            <a href="${href}" class="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeClass}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 ${iconColor}">
                    ${iconPath}
                </svg>
                <span>${text}</span>
            </a>
        `;
    },

    createMobileLink: (href, text) => {
        const path = window.location.pathname;
        let isActive = false;
        if (text === '公告' && path.includes('notice')) isActive = true;
        else if (text === '友链' && path.includes('friends')) isActive = true;
        else if (text === '关于' && path.includes('about.html')) isActive = true;
        else if (text === '首页' && (path.endsWith('index.html') || path.endsWith('/')) && !path.includes('notice') && !path.includes('friends')) isActive = true;
        const cls = isActive ? 'bg-rose-50 text-rose-600' : 'text-slate-600 hover:bg-slate-50';
        return `<a href="${href}" class="w-full p-3 rounded-lg text-sm font-medium flex items-center ${cls}">${text}</a>`;
    },

    // ================== Footer ==================
    renderFooter: () => {
        if (document.querySelector('footer')) return;
        const year = new Date().getFullYear();
        const p = App.getRelativePrefix();

        const footerHTML = `
            <footer class="relative z-10 flex flex-col items-center gap-3 pb-4 mt-auto pt-4 w-full">
                <div class="flex items-center gap-1.5 text-sm select-none group">
                    <div class="flex items-center gap-2 bg-[#e5e7eb] text-slate-700 px-3 py-1.5 rounded-[6px] shadow-sm border border-slate-300/60">
                        <div id="footer-logo-box" class="w-4 h-4 flex items-center justify-center">
                             <img src="${p}img/Logo.PNG" alt="" class="w-full h-full object-contain animate-heartbeat">
                        </div>
                        <span class="font-bold text-slate-800">捌玖</span>
                    </div>

                    <div id="status-container" class="relative flex items-center bg-white text-slate-800 px-3 py-1.5 rounded-[6px] shadow-sm border border-slate-300/60 cursor-pointer hover:scale-105 transition-transform">
                        <div class="absolute -left-[6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-white border-b-[6px] border-b-transparent z-10"></div>
                        <div class="absolute -left-[7px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-slate-300/60 border-b-[6px] border-b-transparent"></div>
                        <span id="business-status-text" class="font-bold tracking-wide transition-colors duration-300">Loading...</span>
                    </div>
                </div>

                <div class="flex items-center gap-2 bg-[#e5e7eb] text-slate-700 px-3 py-1.5 rounded-[6px] shadow-sm border border-slate-300/60 font-sans text-sm select-none">
                    <span class="text-rose-500 font-bold mr-1">本站已苟活</span>
                    <span id="uptime-days" class="text-slate-800 font-bold">0</span><span class="text-slate-500 text-xs">天</span>
                    <span id="uptime-hours" class="text-slate-800 font-bold">00</span><span class="text-slate-500 text-xs">时</span>
                    <span id="uptime-minutes" class="text-slate-800 font-bold">00</span><span class="text-slate-500 text-xs">分</span>
                    <span id="uptime-seconds" class="text-slate-800 font-bold w-[20px] text-center">00</span><span class="text-slate-500 text-xs">秒</span>
                </div>

                <div class="flex flex-wrap justify-center gap-1 px-4">
                    ${App.createBadge('Frame', 'Web', 'blue', 'web')}
                    ${App.createBadge('Hosted', 'Oracle', 'green', 'server', 'https://www.oracle.com')}
                    ${App.createBadge('萌ICP备', '2020520', 'pink', 'shield')}
                    ${App.createBadge('Source', 'Github', 'purple', 'github', 'https://github.com')}
                </div>

                <div class="flex items-center justify-center gap-2 text-sm text-slate-400 font-light mt-1">
                    <span>Copyright &copy; 2023 - ${year}</span>
                    <!-- ⚠️ 红心：text-base (16px) -->
                    <span class="text-red-500 text-base animate-heart-flash">♥</span>
                    <span class="font-medium text-slate-500">捌玖 All Rights Reserved.</span>
                </div>
            </footer>
        `;
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    },

    createBadge: (left, right, color, iconType, href = null) => {
        const colors = { blue: 'bg-[#3b8eea]', green: 'bg-[#42b983]', pink: 'bg-[#ff69b4]', purple: 'bg-[#8e44ad]', red: 'bg-[#e05d44]' };
        const bgClass = colors[color] || 'bg-slate-500';
        const icons = {
            web: `<path d="M762.368 127.488H331.264C264.192 127.488 209.92 181.76 209.92 248.832V768c0 16.384 3.072 32.256 9.216 46.592 23.04 54.784 91.648 87.04 148.48 70.144l120.832-37.888c39.424-11.776 80.896-11.776 119.808 0.512l122.368 36.864c72.704 22.016 148.992-33.792 153.088-109.568V248.832c0-67.072-54.272-121.344-121.344-121.344z m-1.024 699.392c-12.288 1.536-35.328-5.632-47.104-8.704l-102.912-30.72c-41.984-14.848-88.064-14.848-130.048 0l-95.232 28.672c-28.16 8.192-71.168 10.24-94.72-7.168-22.528-16.384-24.576-48.64-24.576-79.872V455.168h0.512V287.744c0-54.272 44.032-98.304 98.304-98.304h362.496c54.272 0 98.304 44.032 98.304 98.304v175.104l0.512 12.288v253.952c0 71.168-20.48 91.648-65.536 97.792z" fill="#295082"/><path d="M483.328 593.408L398.848 507.904l72.192-71.68-29.696-43.008-115.2 114.688 36.352 36.352 78.336 78.848zM570.88 419.84l-0.512 176.64-51.2-9.216 0.512-177.152z" fill="#FECD2B"/><path d="M473.6 472.064l156.16-14.848-7.68 51.2-156.16 14.848zM598.528 596.48l-79.36 9.728v-46.592l94.208-14.336z" fill="#FECD2B"/><path d="M611.84 422.912L696.32 508.416l-72.192 71.68 29.696 43.008 115.2-114.688-36.352-36.352-78.336-78.848z" fill="#FECD2B"/>`,
            server: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
            shield: `<path d="M525.277867 4.983467c42.8032 36.522667 187.050667 144.1792 410.0096 150.391466 11.264 0.4096 20.411733 9.557333 20.411733 20.957867V605.525333C955.6992 797.627733 669.934933 1024 511.965867 1024 349.4912 1024 68.232533 797.627733 68.232533 605.525333V176.3328c0-11.605333 9.147733-20.6848 20.411734-20.957867C311.671467 149.230933 455.918933 41.642667 498.653867 4.983467a20.2752 20.2752 0 0 1 26.624 0z" fill="#FFF2F2"/><path d="M525.277867 4.983467c42.8032 36.522667 187.050667 144.1792 410.0096 150.391466 11.264 0.4096 20.411733 9.557333 20.411733 20.957867V605.525333C955.6992 797.627733 669.934933 1024 511.965867 1024 349.4912 1024 68.232533 797.627733 68.232533 605.525333V176.3328c0-11.605333 9.147733-20.6848 20.411734-20.957867C311.671467 149.230933 455.918933 41.642667 498.653867 4.983467a20.2752 20.2752 0 0 1 26.624 0zM511.965867 88.064l-10.922667 8.123733c-92.023467 65.536-212.3776 115.9168-358.126933 129.160534l-0.682667 380.1088c0 134.280533 220.637867 334.165333 358.4 344.8832l11.332267 0.477866c133.7344 0 369.800533-208.6912 369.800533-345.429333V225.4848h-0.887467c-145.408-13.175467-265.079467-63.214933-357.512533-128.955733L511.965867 88.132267z" fill="#FF7E7E"/><path d="M340.2752 315.5968l96.8704-14.609067a19.387733 19.387733 0 0 0 14.404267-10.8544l43.349333-90.999466a18.8416 18.8416 0 0 1 34.338133 0l43.349334 90.999466c2.730667 5.802667 8.192 9.898667 14.404266 10.922667l96.938667 14.5408c15.701333 2.321067 21.845333 22.3232 10.581333 33.792L624.401067 420.181333a20.206933 20.206933 0 0 0-5.461334 17.544534l16.5888 100.010666c2.730667 16.1792-13.653333 28.535467-27.784533 20.8896l-86.6304-47.172266a18.158933 18.158933 0 0 0-17.749333 0l-86.8352 47.104c-14.062933 7.714133-30.378667-4.642133-27.784534-20.821334l16.5888-100.010666a20.206933 20.206933 0 0 0-5.461333-17.544534L329.8304 349.3888c-11.4688-11.4688-5.12-31.470933 10.4448-33.792z m362.496 416.426667a18.978133 18.978133 0 0 1-18.6368 19.319466H339.797333a18.978133 18.978133 0 0 1-18.705066-19.387733v-48.264533c0-10.717867 8.328533-19.387733 18.705066-19.387734h344.337067c10.376533 0 18.705067 8.669867 18.705067 19.387734v48.264533z" fill="#FF4545"/>`,
            github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>'
        };
        const hasIcon = !!icons[iconType];
        let iconClass = 'w-3 h-3 text-white';
        if (iconType === 'web' || iconType === 'server' || iconType === 'github') { iconClass += ' animate-server-flash'; }
        let viewBox = '0 0 24 24', strokeWidth = '2', stroke = 'currentColor', fill = 'none';
        if (iconType === 'web' || iconType === 'shield') { viewBox = '0 0 1024 1024'; strokeWidth = '0'; stroke = 'none'; fill = 'currentColor'; }
        const iconSvg = hasIcon ? `<svg viewBox="${viewBox}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="${iconClass}">${icons[iconType]}</svg>` : '';
        const content = `<div class="flex items-center shadow-sm text-[10px] rounded-[3px] overflow-hidden cursor-default select-none hover:opacity-90 transition-opacity"><div class="flex items-center gap-1 bg-[#555555] text-white px-1.5 py-[2px] font-medium">${iconSvg}<span>${left}</span></div><div class="${bgClass} text-white px-1.5 py-[2px] font-medium">${right}</div></div>`;
        if (href) return `<a href="${href}" target="_blank">${content}</a>`;
        return content;
    },

    initParticles: () => {
        if (document.getElementById('particle-canvas')) return;
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.className = 'fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-50';
        document.body.prepend(canvas);
        const ctx = canvas.getContext('2d');
        let particles = [];
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            const count = window.innerWidth < 768 ? 30 : 60;
            for (let i = 0; i < count; i++) {
                particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 2 + 0.5, speedY: Math.random() * 0.5 + 0.2, opacity: Math.random() * 0.5 + 0.2 });
            }
        };
        window.addEventListener('resize', resize);
        resize();
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.fillStyle = `rgba(244, 63, 94, ${p.opacity})`;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
                p.y -= p.speedY; if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
            });
            requestAnimationFrame(animate);
        };
        animate();
    },

    initMobileMenu: () => {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (!btn || !menu) return;
        const content = menu.querySelector('div');
        btn.onclick = () => {
            const isHidden = menu.classList.contains('hidden');
            if (isHidden) { menu.classList.remove('hidden'); setTimeout(() => { menu.classList.remove('opacity-0'); content.classList.remove('-translate-y-10'); content.classList.add('translate-y-0'); }, 10); } 
            else { menu.classList.add('opacity-0'); content.classList.remove('translate-y-0'); content.classList.add('-translate-y-10'); setTimeout(() => menu.classList.add('hidden'), 300); }
        };
        menu.onclick = (e) => { if (e.target === menu) btn.click(); };
    },

    initTooltips: () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        document.body.appendChild(tooltip);
        let hoverTimer = null;
        let currentTarget = null;
        document.body.addEventListener('mouseover', (e) => {
            const target = e.target.closest('[data-tooltip]');
            if (!target) return;
            if (currentTarget === target) return;
            currentTarget = target;
            if (hoverTimer) clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => {
                if (!currentTarget) return;
                const rect = currentTarget.getBoundingClientRect();
                tooltip.innerText = currentTarget.getAttribute('data-tooltip');
                tooltip.classList.add('visible');
                tooltip.style.left = rect.right - 10 + 'px';
                tooltip.style.top = rect.bottom + 5 + 'px';
            }, 666);
        });
        document.body.addEventListener('mouseout', (e) => {
            const target = e.target.closest('[data-tooltip]');
            if (!target) return;
            if (hoverTimer) clearTimeout(hoverTimer);
            hoverTimer = null;
            currentTarget = null;
            tooltip.classList.remove('visible');
        });
    },

    initBackToTop: () => {
        const btn = document.createElement('button');
        btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`;
        btn.className = 'fixed bottom-8 right-8 p-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-slate-100 text-slate-500 hover:text-rose-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-40 opacity-0 translate-y-10 pointer-events-none cursor-pointer';
        btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.appendChild(btn);
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { btn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none'); } 
            else { btn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none'); }
        });
    },

    // ================== 核心：时间、一言、营业状态循环 ==================
    startTimeLoop: () => {
        const updateClock = () => {
            const now = new Date();
            const timeEl = document.getElementById('clock-time');
            const dateEl = document.getElementById('clock-date');
            const greetingEl = document.getElementById('clock-greeting');

            // 1. 时钟
            if (timeEl) timeEl.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            if (dateEl) dateEl.innerText = now.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
            
            // 2. 问候语
            if (greetingEl && typeof Hitokoto !== 'undefined') {
                const g = Hitokoto.getGreeting();
                if (greetingEl.innerText !== g.text) greetingEl.innerText = g.text;
            }

            // 3. 运行时间
            if (typeof Hitokoto !== 'undefined' && typeof Hitokoto.getRunTime === 'function') {
                const t = Hitokoto.getRunTime();
                const daysEl = document.getElementById('uptime-days');
                if (daysEl) {
                    daysEl.innerText = t.days;
                    document.getElementById('uptime-hours').innerText = t.hours;
                    document.getElementById('uptime-minutes').innerText = t.minutes;
                    document.getElementById('uptime-seconds').innerText = t.seconds;
                }
            }

            // 4. 营业状态逻辑
            const h = now.getHours();
            const d = now.getDay(); // 0=周日, 6=周六
            const isWorkDay = d >= 1 && d <= 5;
            const isWorkTime = h >= 8 && h < 18;
            const isOpen = isWorkDay && isWorkTime;

            const businessStatusText = document.getElementById('business-status-text');
            const statusContainer = document.getElementById('status-container');
            const footerLogoBox = document.getElementById('footer-logo-box');

            // 更新文字和颜色
            if (businessStatusText) {
                businessStatusText.textContent = isOpen ? '营业中' : '打烊了';
                
                // 颜色切换：绿/红
                businessStatusText.classList.remove('text-slate-800', 'text-red-500', 'text-green-500');
                if (isOpen) {
                    businessStatusText.classList.add('text-green-500');
                } else {
                    businessStatusText.classList.add('text-red-500');
                }

                if (statusContainer) {
                    statusContainer.setAttribute('data-tooltip', isOpen ? '珍惜现在，趁早摸鱼 🐟' : '已封退网，有事烧纸 🕯️');
                }
            }

            // 更新 Footer Logo
            if (footerLogoBox) {
                const p = App.getRelativePrefix();
                const isImg = footerLogoBox.querySelector('img');
                const isSvg = footerLogoBox.querySelector('svg');

                if (isOpen && !isImg) {
                    // 营业显示图片
                    footerLogoBox.innerHTML = `<img src="${p}img/Logo.PNG" alt="" class="w-full h-full object-contain animate-heartbeat">`;
                } else if (!isOpen && !isSvg) {
                    // 打烊显示 SVG
                    footerLogoBox.innerHTML = `
                        <svg class="w-4 h-4 animate-heartbeat" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path d="M972.8 230.4C896 115.2 780.8 64 704 108.8c-6.4 6.4-12.8 6.4-19.2 12.8C640 89.6 582.4 64 524.8 64c-70.4 0-128 25.6-179.2 64-6.4-6.4-19.2-12.8-25.6-19.2C243.2 64 128 115.2 51.2 230.4-19.2 345.6-19.2 473.6 51.2 524.8c25.6 12.8 51.2 19.2 83.2 12.8-6.4 57.6-12.8 108.8-12.8 153.6 0 224 172.8 262.4 345.6 262.4v-192c-38.4-19.2-70.4-64-70.4-102.4C396.8 601.6 448 576 512 576s115.2 25.6 115.2 83.2c0 38.4-25.6 83.2-70.4 102.4V960c185.6 0 364.8-32 364.8-262.4 0-44.8-6.4-96-12.8-153.6 19.2 0 44.8-6.4 57.6-19.2 76.8-44.8 76.8-179.2 6.4-294.4zM403.2 492.8c-32 0-51.2-25.6-51.2-51.2 0-32 25.6-57.6 51.2-57.6 32 0 51.2 25.6 51.2 51.2 0 32-19.2 57.6-51.2 57.6z m217.6 0c-32 0-51.2-25.6-51.2-51.2 0-32 19.2-57.6 51.2-57.6s51.2 25.6 51.2 51.2c0 32-25.6 57.6-51.2 57.6z" fill="#040000"></path>
                        </svg>
                    `;
                }
            }
        };

        setInterval(updateClock, 1000);
        updateClock();
    },

    initHome: async () => {
        const refreshBtn = document.getElementById('refresh-quote');
        const textEl = document.getElementById('quote-text');
        const authorEl = document.getElementById('quote-author');

        const loadQuote = async () => {
            if (!textEl || !authorEl) return;
            
            if (typeof Hitokoto === 'undefined') {
                console.warn("Hitokoto library missing.");
                textEl.innerText = "遇见更好的自己";
                textEl.style.opacity = '1';
                return;
            }

            textEl.style.opacity = '0';
            authorEl.style.opacity = '0';

            try {
                const data = await Hitokoto.fetch();
                setTimeout(() => {
                    textEl.innerText = data.hitokoto || "Loading...";
                    let authorText = '';
                    if (data.from_who) authorText += data.from_who;
                    if (data.from) authorText += `「${data.from}」`;
                    authorEl.innerText = authorText ? `—— ${authorText}` : '';
                    textEl.style.opacity = '1';
                    authorEl.style.opacity = '1';
                }, 500);
            } catch (e) {
                console.error("Quote load error:", e);
                textEl.style.opacity = '1';
                authorEl.style.opacity = '1';
            }
        };

        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                const icon = refreshBtn.querySelector('svg');
                if (icon) icon.classList.add('animate-spin');
                loadQuote().finally(() => {
                    setTimeout(() => icon && icon.classList.remove('animate-spin'), 1000);
                });
            });
        }
        loadQuote();
    },

    initAbout: () => {
        const el = document.getElementById('about-typewriter');
        if (!el) return;
        const text = '有人说爱情可以让人失去生命，但我不会。我要留着这条命为你擦去嘴角的面渣；我要留着这条命去买你喜欢的玫瑰花；我要留着这条命拂去你眼角的泪水；我要留着这条命去撑起你的快乐天堂......';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                el.innerText += text.charAt(i);
                i++;
                setTimeout(type, 80);
            }
        };
        type();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    try { console.log("App initializing..."); App.init(); } 
    catch (e) { console.error("App initialization failed:", e); }
});