/**
 * MPTopUp - Main Interactive Engine & OuraStore Components
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Current Year in Footer
    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // 2. Mobile Menu Drawer Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            mobileMenuButton.setAttribute('aria-expanded', !isHidden);
        });
    }

    // 3. Flash Sale Live Countdown Timer
    initFlashSaleCountdown();

    // 4. Live Transaction Social Proof Toast
    initLiveTransactionToast();

    // 5. WhatsApp Floating Widget
    initWhatsAppWidget();
});

/**
 * Format Currency (IDR)
 */
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

/**
 * Countdown Timer for Flash Sale (Fixed End-of-Day or Dynamic Loop)
 */
function initFlashSaleCountdown() {
    const hoursEl = document.getElementById('fs-hours');
    const minsEl = document.getElementById('fs-mins');
    const secsEl = document.getElementById('fs-secs');

    if (!hoursEl || !minsEl || !secsEl) return;

    function updateTimer() {
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const diff = endOfDay - now;
        if (diff <= 0) return;

        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        hoursEl.textContent = String(hours).padStart(2, '0');
        minsEl.textContent = String(mins).padStart(2, '0');
        secsEl.textContent = String(secs).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

/**
 * Live Toast Simulation (OuraStore Trust Builder)
 */
function initLiveTransactionToast() {
    if (typeof LIVE_TRANSACTIONS === 'undefined' || !LIVE_TRANSACTIONS.length) return;

    // Create Toast Container if not present
    let toastContainer = document.getElementById('liveToastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'liveToastContainer';
        toastContainer.className = 'fixed bottom-5 left-5 z-50 pointer-events-none flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0';
        document.body.appendChild(toastContainer);
    }

    let currentIndex = 0;

    function showToast() {
        const item = LIVE_TRANSACTIONS[currentIndex];
        currentIndex = (currentIndex + 1) % LIVE_TRANSACTIONS.length;

        const toast = document.createElement('div');
        toast.className = 'pointer-events-auto bg-slate-900/95 border border-sky-500/40 text-slate-100 p-3.5 rounded-2xl shadow-2xl backdrop-blur flex items-center gap-3 transition-all duration-500 transform translate-y-6 opacity-0 scale-95';
        
        toast.innerHTML = `
            <div class="w-10 h-10 rounded-xl bg-sky-950 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0">
                <i class="fas fa-bolt text-sm"></i>
            </div>
            <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-1">
                    <p class="text-[11px] font-bold text-sky-400 truncate">${item.user}</p>
                    <span class="text-[10px] text-slate-400">${item.time}</span>
                </div>
                <p class="text-xs font-semibold text-white truncate">Beli ${item.item}</p>
                <p class="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Sukses Terkirim
                </p>
            </div>
            <button type="button" class="text-slate-500 hover:text-slate-300 p-1" onclick="this.parentElement.remove()">
                <i class="fas fa-times text-xs"></i>
            </button>
        `;

        toastContainer.appendChild(toast);

        // Animate In
        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-6', 'opacity-0', 'scale-95');
            toast.classList.add('translate-y-0', 'opacity-100', 'scale-100');
        });

        // Auto Dismiss after 4.5s
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-4');
            setTimeout(() => toast.remove(), 500);
        }, 4500);
    }

    // Initial Delay, then trigger every 8s
    setTimeout(showToast, 2500);
    setInterval(showToast, 8500);
}

/**
 * Floating WhatsApp CS Widget Modal
 */
function initWhatsAppWidget() {
    // Create WhatsApp Button if not exists
    let waContainer = document.getElementById('whatsappFloatingWidget');
    if (!waContainer) {
        waContainer = document.createElement('div');
        waContainer.id = 'whatsappFloatingWidget';
        waContainer.className = 'fixed bottom-5 right-5 z-50';
        waContainer.innerHTML = `
            <button id="waButton" type="button" aria-label="Bantuan WhatsApp"
                class="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-900/50 hover:scale-110 active:scale-95 transition-all focus-visible:ring-4 focus-visible:ring-emerald-400">
                <i class="fab fa-whatsapp text-2xl"></i>
            </button>

            <!-- Popup Quick Help Card -->
            <div id="waPopupCard" class="hidden absolute bottom-16 right-0 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-4 space-y-3">
                <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                            <i class="fab fa-whatsapp text-base"></i>
                        </div>
                        <div>
                            <h4 class="text-xs font-bold text-white">Customer Support 24/7</h4>
                            <p class="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Online
                            </p>
                        </div>
                    </div>
                    <button type="button" id="closeWaPopup" class="text-slate-400 hover:text-white text-sm">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <p class="text-xs text-slate-300 leading-relaxed">
                    Halo Gamers! Ada kendala saat transaksi atau butuh bantuan cek pesanan? Tim admin kami siap membantu Anda.
                </p>
                <a href="https://wa.me/6281234567890?text=Halo%20Admin%20MPTopUp,%20saya%20butuh%20bantuan%20transaksi." target="_blank" rel="noopener noreferrer"
                    class="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors">
                    <i class="fab fa-whatsapp text-sm"></i> Chat Sekarang via WhatsApp
                </a>
            </div>
        `;
        document.body.appendChild(waContainer);

        const waBtn = document.getElementById('waButton');
        const waPopup = document.getElementById('waPopupCard');
        const closeWaBtn = document.getElementById('closeWaPopup');

        waBtn.addEventListener('click', () => {
            waPopup.classList.toggle('hidden');
        });

        closeWaBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            waPopup.classList.add('hidden');
        });
    }
}
