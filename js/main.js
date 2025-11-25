/**
 * js/main.js
 * 核心逻辑：
 * 1. 统一渲染 Header / Footer
 * 2. 交互优化：全站禁止右键，图片禁止拖拽
 * 3. 营业状态：绿字/红字 + Logo切换
 * 4. 修复：强制启动时间循环，解决子页面页脚卡死问题
 * 5. 页面逻辑整合：关于页、友链页逻辑统一管理
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
        
        // 禁用图片拖拽
        document.addEventListener('dragstart', event => {
            if (event.target.tagName === 'IMG') {
                event.preventDefault();
            }
        });

        // 3. 核心修复：无条件启动时间循环
        App.startTimeLoop(); 

        // 4. 页面特定逻辑检测
        if (document.getElementById('quote-text')) App.initHome();
        if (document.getElementById('about-typewriter')) App.initAbout();
        if (document.getElementById('friends-container')) App.renderFriendsPage();

        // 🛡️ 安全防御：全站禁止右键菜单
        document.addEventListener('contextmenu', event => event.preventDefault());
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

        const headerHTML = `
            <header class="fixed top-4 z-50 w-[90%] max-w-6xl left-1/2 -translate-x-1/2 h-12 rounded-full flex items-center justify-between px-6 shadow-lg border border-white/60 bg-white/80 backdrop-blur-xl transition-all duration-300 select-none">
                <a href="${p}index.html" class="flex items-center gap-2 group cursor-pointer no-underline flex-shrink-0">
                    <div class="relative h-10 w-auto min-w-[2.5rem] flex items-center flex-shrink-0">
                         <img src="${p}img/logo.png" alt="Logo" draggable="false" class="h-full w-auto object-contain max-w-none group-hover:animate-heartbeat">
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
            <footer class="relative z-10 flex flex-col items-center gap-3 pb-4 mt-auto pt-4 w-full select-none">
                <div class="flex items-center gap-1.5 text-sm select-none group">
                    <div class="flex items-center gap-2 bg-[#e5e7eb] text-slate-700 px-3 py-1.5 rounded-[6px] shadow-sm border border-slate-300/60">
                        <div id="footer-logo-box" class="w-4 h-4 flex items-center justify-center">
                             <img src="${p}img/logo.png" alt="" draggable="false" class="w-full h-full object-contain animate-heartbeat">
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
                    ${App.createBadge('Frame', 'H5', 'blue', 'code', null, '本站框架为H5')}
                    ${App.createBadge('Hosted', 'Oracle', 'green', 'server', 'https://www.oracle.com', '本站采用多线部署，主线路托管於甲骨文雲')}
                    ${App.createBadge('萌ICP备', '2020520', 'pink', 'icp', null, '本站已经获得豪华备案套餐')}
                    ${App.createBadge('Source', 'Github', 'purple', 'src', 'https://github.com', '本项目由GitHub托管')}
                </div>

                <div class="flex items-center justify-center gap-2 text-sm text-slate-400 font-light mt-1">
                    <span>Copyright &copy; 2023 - ${year}</span>
                    <span class="text-red-500 text-base animate-heart-flash">♥</span>
                    <span class="font-medium text-slate-500">捌玖 All Rights Reserved.</span>
                </div>
            </footer>
        `;
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    },

    createBadge: (left, right, color, iconType, href = null, tooltipText = null) => {
        const colors = { blue: 'bg-[#3b8eea]', green: 'bg-[#42b983]', pink: 'bg-[#ff69b4]', purple: 'bg-[#8e44ad]', red: 'bg-[#e05d44]' };
        const bgClass = colors[color] || 'bg-slate-500';
        
        const icons = {
            code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
            server: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>',
            icp: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
            src: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>'
        };
        
        const hasIcon = !!icons[iconType];
        let iconClass = 'w-3 h-3 text-white';
        
        if (iconType === 'code') iconClass += ' animate-code-flash';
        else if (iconType === 'server') iconClass += ' animate-server-red-flash';
        else if (iconType === 'src') iconClass += ' animate-src-flash';

        let viewBox = '0 0 24 24', strokeWidth = '2', stroke = 'currentColor', fill = 'none';
        
        const iconSvg = hasIcon ? `<svg viewBox="${viewBox}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="${iconClass}">${icons[iconType]}</svg>` : '';
        
        // 准备 Tooltip 属性
        const tooltipAttr = tooltipText ? ` data-tooltip="${tooltipText}"` : '';

        // 强制文字白色 style="color:#fff"
        const content = `<div class="flex items-center shadow-sm text-[10px] rounded-[3px] overflow-hidden cursor-default select-none hover:opacity-90 transition-opacity" ${!href ? tooltipAttr : ''}><div class="flex items-center gap-1 bg-[#555555] text-white px-1.5 py-[2px] font-medium" style="color:#fff">${iconSvg}<span>${left}</span></div><div class="${bgClass} text-white px-1.5 py-[2px] font-medium" style="color:#fff">${right}</div></div>`;
        
        if (href) return `<a href="${href}" target="_blank"${tooltipAttr}>${content}</a>`;
        return content;
    },

    initParticles: () => {
        if (document.getElementById('particle-canvas')) return;
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.className = 'fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-100';
        document.body.appendChild(canvas);
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
            }, 300);
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
                    footerLogoBox.innerHTML = `<img src="${p}img/logo.png" alt="" draggable="false" class="w-full h-full object-contain animate-heartbeat">`;
                } else if (!isOpen && !isSvg) {
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

    // ================== 关于页面交互 (新) ==================
    initAbout: () => {
        // 打字机效果
        const el = document.getElementById('about-typewriter');
        if (el) {
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

        // 绑定弹窗事件（统一调用通用方法）
    },

    toggleModal: (id) => {
        const modal = document.getElementById(id);
        if (!modal) return;
        const content = modal.firstElementChild;

        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                content.classList.remove('scale-95');
                content.classList.add('scale-100');
            }, 10);
        } else {
            modal.classList.add('opacity-0');
            content.classList.remove('scale-100');
            content.classList.add('scale-95');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        }
    },

    // ================== 友链页面渲染 ==================
    renderFriendsPage: () => {
        if (!Array.isArray(window.FriendsData)) return;

        const container = document.getElementById('friends-container');
        const sidebar = document.getElementById('friends-sidebar');
        const content = document.getElementById('friends-content');
        if (!container || !sidebar || !content) return;

        container.classList.remove('hidden');
        App.friendsState.activeId = window.FriendsData[0]?.id || '';
        App.renderFriendsSidebar();
        App.renderFriendsContent();
    },

    friendsState: {
        activeId: '',
        get activeCategory() {
            return window.FriendsData.find(cat => cat.id === App.friendsState.activeId);
        }
    },

    renderFriendsSidebar: () => {
        const sidebar = document.getElementById('friends-sidebar');
        if (!sidebar) return;

        let coilsHTML = '';
        for (let i = 0; i < 6; i++) {
            coilsHTML += `
                <div class="relative">
                    <div class="w-3 h-3 rounded-full bg-slate-800 absolute -left-1 top-0.5 z-0"></div>
                    <div class="w-8 h-2.5 rounded-full bg-gradient-to-b from-zinc-600 via-zinc-500 to-zinc-700 ring-1 ring-zinc-800 shadow-[1px_1px_2px_rgba(0,0,0,0.3)] transform -rotate-12 origin-left relative z-10"></div>
                </div>`;
        }

        sidebar.innerHTML = `
            <div class="hidden md:flex flex-col justify-between absolute -right-[16px] top-8 bottom-8 pointer-events-none z-30 h-[80%]">
                ${coilsHTML}
            </div>
            <h2 class="text-xs font-bold text-slate-400 uppercase mb-4 px-4">分类</h2>
            <div class="space-y-1">
                ${window.FriendsData.map(cat => `
                    <button onclick="App.switchFriendsCategory('${cat.id}')" class="w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${App.friendsState.activeId === cat.id ? 'bg-white text-rose-600 shadow-sm border border-slate-100' : 'text-slate-500 hover:bg-white/60'}">
                        <div class="flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${cat.icon}</svg>
                            ${cat.name}
                        </div>
                    </button>
                `).join('')}
            </div>
        `;
    },

    switchFriendsCategory: (id) => {
        App.friendsState.activeId = id;
        App.renderFriendsSidebar();
        App.renderFriendsContent();
    },

    renderFriendsContent: () => {
        const content = document.getElementById('friends-content');
        if (!content) return;

        const activeCat = App.friendsState.activeCategory;
        if (!activeCat) return;

        const badgeColor = App.getRandomBadgeColor();

        content.innerHTML = `
            <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 flex-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${activeCat.icon}</svg>
                ${activeCat.name}
                <span class="text-xs font-bold ml-2 px-2.5 py-1 rounded-full border ${badgeColor}">共收录 ${activeCat.items.length} 个优质资源</span>
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${activeCat.items.length > 0 ? activeCat.items.map(App.renderFriendsCard).join('') : App.renderFriendsEmpty()}
            </div>
        `;
    },

    renderFriendsCard: (item) => {
        const cardBgClass = item.color || 'bg-white border-slate-200 hover:border-rose-200';
        const iconBgClass = item.icon_bg || 'bg-slate-50';

        let iconContent = '';
        if (item.icon) {
            iconContent = item.icon.trim().startsWith('<') ? item.icon : `<img src="${item.icon}" class="w-6 h-6 object-contain relatif z-10" alt="${item.title}"/>`;
        } else {
            let hostname = 'localhost';
            try { hostname = new URL(item.url).hostname; } catch(e) {}
            iconContent = `<img src="https://www.google.com/s2/favicons?domain=${hostname}&sz=64" class="w-6 h-6 object-contain relative z-10" onerror="this.style.display='none'"/>`;
        }

        return `
            <a href="${item.url}" target="_blank" class="${cardBgClass} border p-4 rounded-xl hover:shadow-md transition-all flex items-center gap-3 group hover:-translate-y-1">
                <div class="w-10 h-10 rounded-lg ${iconBgClass} border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 relative">
                    ${iconContent}
                    <div class="absolute inset-0 flex items-center justify中心 z-0 text-slate-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"/></svg>
                    </div>
                </div>
                <div class="overflow-hidden flex-1">
                    <div class="font-bold text-slate-800 text-sm truncate group-hover:text-rose-600 transition-colors">${item.title}</div>
                    <div class="text-xs text-slate-500 truncate mt-0.5">${item.desc}</div>
                </div>
            </a>`;
    },

    renderFriendsEmpty: () => `
        <div class="col-span-full flex flex-col items-center justify-center py-12 text-slate-400 opacity-60">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <p class="mt-2 text-sm">暂无内容</p>
        </div>
    `,

    getRandomBadgeColor: () => {
        const colors = [
            'bg-rose-100 text-rose-600 border-rose-200',
            'bg-blue-100 text-blue-600 border-blue-200',
            'bg-green-100 text-green-600 border-green-200',
            'bg-amber-100 text-amber-600 border-amber-200',
            'bg-purple-100 text-purple-600 border-purple-200'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
};

document.addEventListener('DOMContentLoaded', () => {
    try { App.init(); }
    catch (e) { console.error("App initialization failed:", e); }
});
