        lucide.createIcons();

        const brandAssets = {
            main: './images/brand/tomago-light.png'
        };

        const appLogoAssets = {
            cn: './images/app/app-logo-cn.png',
            'hk-tw': './images/app/app-logo-hkmo.png',
            'hk-en': './images/app/app-logo-hkmo.png',
            'mo-tw': './images/app/app-logo-hkmo.png',
            'mo-en': './images/app/app-logo-hkmo.png',
            'mo-pt': './images/app/app-logo-hkmo.png',
            tw: './images/app/app-logo-tw.png',
            jp: './images/app/app-logo-jp.png',
            kr: './images/app/app-logo-kr.png',
            anz: './images/app/app-logo-aunz.png',
            na: './images/app/app-logo-us.png',
            eu: './images/app/app-logo-eu.png',
            row: './images/app/app-logo-us.png',
            uk: './images/app/app-logo-uk.png',
            rider: './images/app/rider-logo.png',
            shopper: './images/app/shopper-logo.png'
        };

        const downloadModalSubtitle = {
            cn: '根据当前地区与语言，为你准备合适的下载版本。',
            tw: '依照目前地區與語言，為你準備合適的下載版本。',
            en: 'We prepared the correct app packages for your current region and language.',
            jp: '現在の地域と言語に合わせたダウンロード版を用意しました。',
            kr: '현재 지역과 언어에 맞는 다운로드 버전을 준비했습니다.',
            pt: 'Preparamos a versão correta para sua região e idioma atuais.'
        };

        const downloadFeedbackCopy = {
            cn: (appName, storeName) => `已为你准备 ${appName} 的 ${storeName} 下载入口。当前页面仍是演示版，可继续补真实下载链接。`,
            tw: (appName, storeName) => `已為你準備 ${appName} 的 ${storeName} 下載入口。目前仍是示範頁，可再接入真實下載連結。`,
            en: (appName, storeName) => `${appName} is ready for ${storeName}. This page is still a demo, so we can wire the real download links next.`,
            jp: (appName, storeName) => `${appName} の ${storeName} ダウンロード導線を用意しました。現在はデモページのため、次に実リンクを接続できます。`,
            kr: (appName, storeName) => `${appName}의 ${storeName} 다운로드 안내를 준비했습니다. 현재는 데모 페이지이며 다음으로 실제 링크를 연결할 수 있습니다.`,
            pt: (appName, storeName) => `Preparamos o download de ${appName} via ${storeName}. Esta ainda e uma pagina demonstrativa, e podemos conectar os links reais em seguida.`
        };

        // ========== SPA 路由与背景动画 ==========
        const dynamicContent = [
            { bg: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop' },
            { bg: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=2000&auto=format&fit=crop' },
            { bg: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000&auto=format&fit=crop' }
        ];
        let bgIndex = 0, bgTimer = null, activeBg = document.getElementById('bg-1');
        
        function startHomeAnimations() {
            if(bgTimer) clearInterval(bgTimer);
            bgTimer = setInterval(() => {
                bgIndex = (bgIndex + 1) % dynamicContent.length;
                const translateY = -(bgIndex * 1.2) + 'em';
                document.querySelectorAll('.roller-from, .roller-to, .roller-time').forEach(el => {
                    el.style.transform = `translateY(${translateY})`;
                });
                const nextBg = activeBg === document.getElementById('bg-1') ? document.getElementById('bg-2') : document.getElementById('bg-1');
                nextBg.style.backgroundImage = `url('${dynamicContent[bgIndex].bg}')`;
                nextBg.style.transform = 'scale(1)'; activeBg.style.transform = 'scale(1.05)';
                nextBg.style.opacity = '1'; activeBg.style.opacity = '0';
                activeBg = nextBg;
            }, 3500);
        }

        function setupNavGroups() {
            document.querySelectorAll('.nav-group').forEach(group => {
                let closeTimer = null;
                const openMenu = () => {
                    if (closeTimer) clearTimeout(closeTimer);
                    group.classList.add('open');
                };
                const closeMenu = () => {
                    if (closeTimer) clearTimeout(closeTimer);
                    closeTimer = setTimeout(() => group.classList.remove('open'), 260);
                };
                group.addEventListener('mouseenter', openMenu);
                group.addEventListener('mouseleave', closeMenu);
                group.addEventListener('focusin', openMenu);
                group.addEventListener('focusout', () => {
                    closeTimer = setTimeout(() => {
                        if (!group.contains(document.activeElement)) group.classList.remove('open');
                    }, 260);
                });
            });
        }

        function router() {
            let hash = window.location.hash || '#home';
            const routeAliases = {
                '#vision': '#brand-story',
                '#ecosystem': '#market',
                '#org': '#hq-page'
            };
            hash = routeAliases[hash] || hash;
            document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active'));
            const targetView = document.getElementById('view-' + hash.replace('#', ''));
            if (targetView) {
                targetView.classList.add('active');
                window.scrollTo(0, 0);
                if(hash === '#home') startHomeAnimations(); else if(bgTimer) clearInterval(bgTimer);
                setTimeout(() => targetView.querySelectorAll('.reveal-up').forEach(el => el.classList.add('active')), 50);
            }
        }
        window.addEventListener('hashchange', router);
        window.location.hash = window.location.hash || '#home';
        setupNavGroups();
        router();

        // ========== 滚动事件 ==========
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-black/80', 'backdrop-blur-md', 'py-4', 'border-b', 'border-white/10');
                navbar.classList.remove('py-6');
            } else {
                navbar.classList.remove('bg-black/80', 'backdrop-blur-md', 'py-4', 'border-b', 'border-white/10');
                navbar.classList.add('py-6');
            }
        });

        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('active'); obs.unobserve(entry.target); } });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        setInterval(() => document.querySelectorAll('.reveal-up:not(.active)').forEach(el => revealObserver.observe(el)), 1000);

        // ========== 模态框逻辑 ==========
        function openModal(id) { document.getElementById(id).classList.add('active'); document.body.style.overflow = 'hidden'; }
        function closeModal(id) { document.getElementById(id).classList.remove('active'); document.body.style.overflow = ''; }

        function openAuthModal(tab) { switchAuthTab(tab); openModal('auth-modal'); }
        function switchAuthTab(tab) {
            const isLogin = tab === 'login';
            document.getElementById('form-login').style.display = isLogin ? 'block' : 'none';
            document.getElementById('form-register').style.display = isLogin ? 'none' : 'block';
            document.getElementById('tab-login').className = isLogin ? 'pb-2 text-sm font-bold border-b-2 border-black transition-colors hover-trigger' : 'pb-2 text-sm font-bold border-b-2 border-transparent text-gray-400 hover:text-black transition-colors hover-trigger';
            document.getElementById('tab-register').className = !isLogin ? 'pb-2 text-sm font-bold border-b-2 border-black transition-colors hover-trigger' : 'pb-2 text-sm font-bold border-b-2 border-transparent text-gray-400 hover:text-black transition-colors hover-trigger';
        }

        // ========== 注册表单 手机/邮箱切换 ==========
        let currentRegMethod = 'phone';
        function toggleRegMethod(force) {
            currentRegMethod = force ? force : (currentRegMethod === 'phone' ? 'email' : 'phone');
            if(currentRegMethod === 'phone') {
                document.getElementById('reg-input-phone').classList.remove('hidden');
                document.getElementById('reg-input-email').classList.add('hidden');
                document.querySelector('.reg-method-email').classList.remove('hidden');
                document.querySelector('.reg-method-phone').classList.add('hidden');
            } else {
                document.getElementById('reg-input-phone').classList.add('hidden');
                document.getElementById('reg-input-email').classList.remove('hidden');
                document.querySelector('.reg-method-email').classList.add('hidden');
                document.querySelector('.reg-method-phone').classList.remove('hidden');
            }
        }

        // ========== 登录登出控制 ==========
        function loginSuccess() {
            document.body.classList.add('logged-in');
            closeModal('auth-modal');
            window.location.hash = '#profile';
        }
        function logout() {
            document.body.classList.remove('logged-in');
            window.location.hash = '#home';
        }

        // ========== 组织架构侧滑交互 ==========
        function openOrgDetail(type) {
            document.querySelectorAll('.org-content-block').forEach(el => el.classList.add('hidden'));
            document.getElementById('org-content-' + type).classList.remove('hidden');
            const panel = document.getElementById('org-side-panel');
            const mask = document.getElementById('org-side-mask');
            panel.classList.add('active');
            mask.classList.remove('hidden');
            setTimeout(() => mask.style.opacity = '1', 10);
            document.body.style.overflow = 'hidden';
        }
        function closeOrgDetail() {
            const panel = document.getElementById('org-side-panel');
            const mask = document.getElementById('org-side-mask');
            panel.classList.remove('active');
            mask.style.opacity = '0';
            setTimeout(() => mask.classList.add('hidden'), 300);
            document.body.style.overflow = '';
        }

        // ========== 多语言、区域与货币字典核心 ==========
        const regionData = {
            'cn': { name: '中国大陆 (Mainland China)', currency: 'CNY ¥', lang: 'cn', supported: true, defReg: 'phone' },
            'hk-tw': { name: '中國香港 (Hong Kong SAR)', currency: 'HKD HK$', lang: 'tw', supported: true, defReg: 'phone' },
            'hk-en': { name: 'Hong Kong SAR (English)', currency: 'HKD HK$', lang: 'en', supported: true, defReg: 'email' },
            'mo-tw': { name: '中國澳門 (Macao SAR)', currency: 'MOP MOP$', lang: 'tw', supported: true, defReg: 'phone' },
            'mo-en': { name: 'Macao SAR (English)', currency: 'MOP MOP$', lang: 'en', supported: true, defReg: 'email' },
            'mo-pt': { name: 'Macau (Português)', currency: 'MOP MOP$', lang: 'pt', supported: true, defReg: 'email' },
            'tw': { name: '台灣 (Taiwan)', currency: 'TWD NT$', lang: 'tw', supported: true, defReg: 'phone' },
            'jp': { name: '日本 (Japan)', currency: 'JPY ¥', lang: 'jp', supported: true, defReg: 'email' },
            'kr': { name: '대한민국 (South Korea)', currency: 'KRW ₩', lang: 'kr', supported: true, defReg: 'email' },
            'na': { name: 'North America', currency: 'USD $', lang: 'en', supported: true, defReg: 'email', symbol: '$' },
            'eu': { name: 'Europe', currency: 'EUR / GBP', lang: 'en', supported: true, defReg: 'email', symbol: '€ / £' },
            'anz': { name: 'Australia & NZ', currency: 'AUD / NZD', lang: 'en', supported: true, defReg: 'email', symbol: 'A$ / NZ$' },
            'row': { name: 'Other Regions', currency: 'USD $', lang: 'en', supported: false, defReg: 'email' }
        };

        function getCurrentLanguage() {
            return document.body.getAttribute('data-lang') || 'en';
        }

        function getCurrentRegion() {
            return document.body.getAttribute('data-region') || 'cn';
        }

        function getPrimaryAppLogo(regionCode) {
            return appLogoAssets[regionCode] || appLogoAssets.cn;
        }

        function updateBrandAssets(regionCode) {
            const mainBrandLogo = document.getElementById('main-brand-logo');
            const downloadAppLogo = document.getElementById('download-app-logo');

            if (mainBrandLogo) {
                mainBrandLogo.src = brandAssets.main;
            }

            if (downloadAppLogo) {
                downloadAppLogo.src = getPrimaryAppLogo(regionCode);
                downloadAppLogo.alt = `${regionData[regionCode]?.name || 'TomaGo'} App`;
            }
        }

        function getDownloadStores() {
            const regionCode = getCurrentRegion();
            const lang = getCurrentLanguage();

            if (regionCode === 'cn' && lang === 'cn') {
                return [
                    { label: 'Apk下载', key: 'apk' },
                    { label: 'App Store下载', key: 'appstore' }
                ];
            }

            return [
                { label: 'Google Play', key: 'googleplay' },
                { label: 'App Store', key: 'appstore' }
            ];
        }

        function getDownloadVariants(regionCode) {
            const stores = getDownloadStores();
            const variants = [];

            if (regionCode === 'eu') {
                variants.push(
                    { name: 'TomaGo EU', icon: appLogoAssets.eu, stores },
                    { name: 'TomaGo UK', icon: appLogoAssets.uk, stores }
                );
                return variants;
            }

            if (regionCode === 'na') {
                variants.push(
                    { name: 'TomaGo US', icon: appLogoAssets.na, stores },
                    { name: 'TomaGo Rider', icon: appLogoAssets.rider, stores },
                    { name: 'TomaGo Shopper', icon: appLogoAssets.shopper, stores }
                );
                return variants;
            }

            variants.push({
                name: 'TomaGo App',
                icon: getPrimaryAppLogo(regionCode),
                stores
            });

            return variants;
        }

        function triggerDownloadFeedback(appName, storeName) {
            const lang = getCurrentLanguage();
            const feedbackEl = document.getElementById('download-feedback');
            const feedbackText = downloadFeedbackCopy[lang] || downloadFeedbackCopy.en;

            feedbackEl.textContent = feedbackText(appName, storeName);
            feedbackEl.classList.remove('hidden');
        }

        function renderDownloadOptions() {
            const regionCode = getCurrentRegion();
            const lang = getCurrentLanguage();
            const variants = getDownloadVariants(regionCode);
            const optionsRoot = document.getElementById('download-options');
            const subtitleEl = document.getElementById('download-modal-subtitle');
            const feedbackEl = document.getElementById('download-feedback');
            const storeIcons = { apk: 'fa-brands fa-android', appstore: 'fa-brands fa-apple', googleplay: 'fa-brands fa-google-play' };

            subtitleEl.textContent = downloadModalSubtitle[lang] || downloadModalSubtitle.en;
            feedbackEl.classList.add('hidden');
            feedbackEl.textContent = '';

            optionsRoot.innerHTML = variants.map(variant => `
                <div class="rounded-[2rem] border border-gray-200 bg-gray-50/80 p-5">
                    <div class="flex items-center gap-4 mb-5">
                        <div class="w-16 h-16 rounded-2xl bg-white shadow-sm p-2 flex items-center justify-center shrink-0">
                            <img src="${variant.icon}" alt="${variant.name}" class="w-full h-full object-contain">
                        </div>
                        <div>
                            <h4 class="text-lg font-black leading-tight">${variant.name}</h4>
                            <p class="text-xs uppercase tracking-[0.2em] text-gray-400 mt-1">Region Ready</p>
                        </div>
                    </div>
                    <div class="space-y-3">
                        ${variant.stores.map(store => `
                            <button onclick="triggerDownloadFeedback('${variant.name}', '${store.label}')" class="store-option-btn hover-trigger">
                                <i class="${storeIcons[store.key] || 'fa-solid fa-arrow-down'}"></i>
                                <span>${store.label}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }

        function openDownloadModal() {
            const regionCode = getCurrentRegion();
            const region = regionData[regionCode];

            if (!region?.supported) {
                openModal('alert-modal');
                return;
            }

            renderDownloadOptions();
            openModal('download-modal');
        }

        function openRegionModal() { openModal('region-modal'); }

        function setRegion(regionCode) {
            document.querySelectorAll('[data-region-btn]').forEach(btn => btn.classList.remove('selected', 'border-black'));
            const activeBtn = document.querySelector(`[data-region-btn="${regionCode}"]`);
            if(activeBtn) activeBtn.classList.add('selected', 'border-black');

            const data = regionData[regionCode];
            
            // Core DOM Updates
            document.body.setAttribute('data-region', regionCode);
            document.body.setAttribute('data-lang', data.lang);
            document.body.setAttribute('data-supported', data.supported);

            // Set Registration Form Default Method
            toggleRegMethod(data.defReg);

            // Display Updates
            document.getElementById('current-region-display').innerText = data.name.replace(/<[^>]+>/g, '');
            document.getElementById('current-currency-display').innerText = data.currency;
            document.getElementById('profile-currency').innerText = data.symbol || data.currency.split(' ').slice(1).join(' ') || '$';
            updateBrandAssets(regionCode);

            closeModal('region-modal');

            // Trigger Unsupported Alert
            if(!data.supported) {
                setTimeout(() => openModal('alert-modal'), 400);
            }
        }
        
        // Init
        setRegion('cn');
