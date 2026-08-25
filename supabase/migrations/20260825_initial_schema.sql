-- ==============================================================================
-- SKEMA DATABASE LENGKAP MPTOPUP (SUPABASE POSTGRESQL + RLS + HARDENING KEAMANAN)
-- File: supabase/migrations/20260825_initial_schema.sql
-- ==============================================================================

-- 1. TABEL PROFIL PENGGUNA (Terkoneksi dengan auth.users Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(150),
    email VARCHAR(255),
    avatar_url TEXT,
    phone_number VARCHAR(30),
    role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('member', 'admin', 'reseller')),
    balance BIGINT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- 2. TABEL KATALOG GAME
CREATE TABLE IF NOT EXISTS public.games (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    developer VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    is_popular BOOLEAN DEFAULT false,
    banner_url TEXT NOT NULL,
    description TEXT,
    has_zone_id BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Nonaktif', 'Maintenance')),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_games_category ON public.games(category);
CREATE INDEX IF NOT EXISTS idx_games_status ON public.games(status);

-- 3. TABEL SKU / VARIAN PRODUK GAME
CREATE TABLE IF NOT EXISTS public.products_sku (
    id VARCHAR(60) PRIMARY KEY,
    game_id VARCHAR(50) REFERENCES public.games(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    price BIGINT NOT NULL,
    sku_code VARCHAR(100),
    bonus VARCHAR(100),
    group_name VARCHAR(100) DEFAULT 'Nominal Utama',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_products_sku_game_id ON public.products_sku(game_id);

-- 4. TABEL PESANAN / TRANSAKSI
CREATE TABLE IF NOT EXISTS public.orders (
    id VARCHAR(30) PRIMARY KEY, -- Format: #MPxxxxxx
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    game_id VARCHAR(50) REFERENCES public.games(id) ON DELETE SET NULL,
    game_title VARCHAR(150) NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    target_user_id VARCHAR(100) NOT NULL,
    target_zone_id VARCHAR(50),
    whatsapp VARCHAR(30) NOT NULL,
    payment_method VARCHAR(100) NOT NULL,
    payment_fee BIGINT DEFAULT 0,
    discount_amount BIGINT DEFAULT 0,
    total_amount BIGINT NOT NULL,
    status VARCHAR(30) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Diproses', 'Selesai', 'Gagal', 'Dibatalkan')),
    payment_proof_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_target_user ON public.orders(target_user_id);
CREATE INDEX IF NOT EXISTS idx_orders_whatsapp ON public.orders(whatsapp);

-- 5. TABEL PROMO & KUPON DISKON
CREATE TABLE IF NOT EXISTS public.promos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(30) DEFAULT 'Persentase' CHECK (type IN ('Persentase', 'Nominal')),
    value VARCHAR(50) NOT NULL,
    rate NUMERIC(4, 2) DEFAULT 0.10,
    max_discount BIGINT DEFAULT 10000,
    fixed_discount BIGINT DEFAULT 5000,
    min_spend BIGINT DEFAULT 20000,
    period VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Aktif' CHECK (status IN ('Aktif', 'Dijadwalkan', 'Nonaktif')),
    banner_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_promos_code ON public.promos(code);
CREATE INDEX IF NOT EXISTS idx_promos_status ON public.promos(status);

-- 6. TABEL PENGATURAN TOKO (SYSTEM SETTINGS)
CREATE TABLE IF NOT EXISTS public.system_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. TABEL ARTIKEL & PANDUAN GAMING
CREATE TABLE IF NOT EXISTS public.articles (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(200) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    author VARCHAR(100) NOT NULL,
    read_time VARCHAR(50) DEFAULT '4 menit baca',
    views INT DEFAULT 0,
    banner_url TEXT NOT NULL,
    game_id VARCHAR(50) REFERENCES public.games(id) ON DELETE SET NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category);

-- 8. TABEL ULASAN PELANGGAN (TESTIMONIALS)
CREATE TABLE IF NOT EXISTS public.reviews (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    avatar_url TEXT DEFAULT '/images/avatars/default-avatar.svg',
    game VARCHAR(100) NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT true,
    likes INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);

-- ==============================================================================
-- HELPER FUNCTIONS & TRIGGERS OTOMATIS
-- ==============================================================================

-- Helper: Memeriksa apakah user saat ini adalah admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger 1: Auto-sinkronisasi profil saat user baru mendaftar / Login Google OAuth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, avatar_url, phone_number, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', '/images/avatars/default-avatar.svg'),
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        'member'
    )
    ON CONFLICT (id) DO UPDATE
    SET
        full_name = EXCLUDED.full_name,
        avatar_url = EXCLUDED.avatar_url,
        updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT OR UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger 2: Hardening Keamanan - Cegah user mengubah role dan saldo sendiri
CREATE OR REPLACE FUNCTION public.protect_profile_fields()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT public.is_admin() THEN
        NEW.role := OLD.role;
        NEW.balance := OLD.balance;
    END IF;
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_protect_profile_fields ON public.profiles;
CREATE TRIGGER trg_protect_profile_fields
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.protect_profile_fields();

-- ==============================================================================
-- KEBIJAKAN KEAMANAN ROW LEVEL SECURITY (RLS) TINGKAT TINGGI
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products_sku ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 1. Policies for profiles (Hanya pemilik akun dan admin yang bisa melihat data sensitif)
CREATE POLICY "Profiles are viewable by owner and admin" ON public.profiles 
FOR SELECT USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update their own profile" ON public.profiles 
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can manage all profiles" ON public.profiles 
FOR ALL USING (public.is_admin());

-- 2. Policies for games (Public read, Admin manage)
CREATE POLICY "Games are viewable by everyone" ON public.games 
FOR SELECT USING (true);

CREATE POLICY "Admins can manage games" ON public.games 
FOR ALL USING (public.is_admin());

-- 3. Policies for products_sku (Public read, Admin manage)
CREATE POLICY "SKUs are viewable by everyone" ON public.products_sku 
FOR SELECT USING (true);

CREATE POLICY "Admins can manage SKUs" ON public.products_sku 
FOR ALL USING (public.is_admin());

-- 4. Policies for orders (Publik buat order, Pemilik/Admin view)
CREATE POLICY "Anyone can create an order" ON public.orders 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own orders" ON public.orders 
FOR SELECT USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Admins can manage all orders" ON public.orders 
FOR ALL USING (public.is_admin());

-- 5. Policies for promos (Public read, Admin manage)
CREATE POLICY "Promos are viewable by everyone" ON public.promos 
FOR SELECT USING (true);

CREATE POLICY "Admins can manage promos" ON public.promos 
FOR ALL USING (public.is_admin());

-- 6. Policies for system_settings (Public read, Admin manage)
CREATE POLICY "Settings are viewable by everyone" ON public.system_settings 
FOR SELECT USING (true);

CREATE POLICY "Admins can manage settings" ON public.system_settings 
FOR ALL USING (public.is_admin());

-- 7. Policies for articles (Public read, Admin manage)
CREATE POLICY "Articles are viewable by everyone" ON public.articles 
FOR SELECT USING (true);

CREATE POLICY "Admins can manage articles" ON public.articles 
FOR ALL USING (public.is_admin());

-- 8. Policies for reviews (Public read & insert, Admin manage)
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews 
FOR SELECT USING (true);

CREATE POLICY "Anyone can insert reviews" ON public.reviews 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage reviews" ON public.reviews 
FOR ALL USING (public.is_admin());

-- 9. TABEL PESAN KONTAK / BANTUAN (CONTACT INQUIRIES)
CREATE TABLE IF NOT EXISTS public.contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    order_id VARCHAR(50),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Baru',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact message" ON public.contacts 
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage contact messages" ON public.contacts 
FOR ALL USING (public.is_admin());

-- ==============================================================================
-- RPC SECURE FUNCTION: PELACAKAN PESANAN TAMU (GUEST TRACKING TANPA EXPOSE DATA)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.get_order_by_invoice(p_order_id VARCHAR(30), p_whatsapp VARCHAR(30))
RETURNS SETOF public.orders AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM public.orders
    WHERE id = p_order_id AND whatsapp = p_whatsapp
    LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================
INSERT INTO public.games (id, title, developer, category, is_popular, banner_url, description, has_zone_id, status)
VALUES
    ('game1', 'Mobile Legends: Bang Bang', 'Moonton', 'Mobile', true, '/images/games/mlbb.svg', 'Top up Diamond Mobile Legends resmi Moonton. Masukkan User ID dan Zone ID, pilih nominal, dan bayar instan dalam hitungan detik.', true, 'Aktif'),
    ('game2', 'Valorant Points (VP)', 'Riot Games', 'PC', true, '/images/games/valorant.svg', 'Beli Valorant Points (VP) resmi Riot Games server Indonesia. Cukup masukkan Riot ID dengan Tagline.', false, 'Aktif'),
    ('game3', 'Free Fire Diamonds', 'Garena', 'Mobile', true, '/images/games/freefire.svg', 'Top up diamond Free Fire resmi Garena tercepat. Cukup masukkan Player ID Free Fire Anda.', false, 'Aktif'),
    ('game4', 'PUBG Mobile UC', 'Tencent Games', 'Mobile', true, '/images/games/pubgm.svg', 'Beli UC PUBG Mobile resmi global. Masukkan Player ID PUBG Mobile Anda untuk proses kilat otomatis.', false, 'Aktif'),
    ('game5', 'Genshin Impact Genesis', 'HoYoverse', 'PC', true, '/images/games/genshin.svg', 'Top up Genesis Crystals & Blessing of the Welkin Moon resmi HoYoverse via UID Server.', true, 'Aktif'),
    ('game6', 'Honor of Kings Tokens', 'Level Infinite', 'Mobile', false, '/images/games/hok.svg', 'Top up Tokens Honor of Kings resmi server global. Masukkan Player ID untuk proses instan.', false, 'Aktif'),
    ('game7', 'Steam Wallet Code IDR', 'Valve', 'PC', false, '/images/games/steam.svg', 'Beli Voucher Steam Wallet Code IDR resmi. Kode voucher akan dikirimkan langsung setelah bayar.', false, 'Aktif'),
    ('game8', 'Google Play Voucher IDR', 'Google', 'Voucher', false, '/images/games/googleplay.svg', 'Beli Voucher Google Play IDR resmi untuk pembelian aplikasi, game, buku, dan film.', false, 'Aktif')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.promos (code, name, type, value, rate, max_discount, min_spend, period, status, banner_url)
VALUES
    ('NEWUSER20', 'Diskon Pengguna Baru', 'Persentase', '20% (Max 10K)', 0.20, 10000, 20000, '01 Agu - 31 Agu 2026', 'Aktif', '/images/promo/promo-mlbb.svg'),
    ('BONUS10', 'Flash Promo Top Up', 'Persentase', '10%', 0.10, 20000, 30000, '15 Agu - 30 Agu 2026', 'Aktif', '/images/promo/promo-valorant.svg'),
    ('MLBB5K', 'Cashback MLBB Weekend', 'Nominal', 'Rp 5.000', 0.00, 5000, 50000, '01 Sep - 05 Sep 2026', 'Dijadwalkan', '/images/promo/promo-cashback.svg')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.articles (slug, title, category, author, read_time, views, banner_url, game_id, summary, content)
VALUES
    ('trik-hemat-diamond-event-zodiac-mlbb-2026', 'Trik Hemat Beli Skin Zodiac Mobile Legends 2026 dengan Diskon COA', 'Tips & Trik', 'Admin MPTopUp', '4 menit baca', 3420, '/images/promo/promo-mlbb.svg', 'game1', 'Ingin mendapatkan skin Zodiac favorit dengan biaya paling hemat? Simak panduan kombinasi Crystal of Aurora (COA) harian dan diskon draw 5x di sini.', '<h3>Mengapa Skin Zodiac Sangat Diincar?</h3><p>Skin seri Zodiac di Mobile Legends: Bang Bang merupakan salah satu koleksi skin paling prestisius dengan visual efek rasi bintang yang memukau. Setiap bulannya, Moonton merilis skin Zodiac sesuai zodiak yang sedang berlangsung.</p><h3>Strategi Mengumpulkan 100 Star Power Paling Hemat</h3><p>Untuk membuka skin Zodiac secara penuh, Anda membutuhkan 100 Star Power. Gunakan Weekly Diamond Pass dan diskon draw 5x!</p>'),
    ('rekomendasi-agent-valorant-patch-terbaru-solo-rank', 'Top 5 Agent Valorant Paling Efektif untuk Push Rank Solo Queue', 'Panduan Hero', 'Coach Vandal', '6 menit baca', 2890, '/images/promo/promo-valorant.svg', 'game2', 'Rekomendasi agent duelist dan initiator dengan impact tertinggi untuk memenangkan ranked match tanpa harus bergantung penuh pada party.', '<h3>5 Agent Pilihan Patch Ini</h3><p>Bermain ranked solo queue menuntut pemilihan agent mandiri seperti Jett, Omen, Fade, Clove, dan Cypher.</p>'),
    ('cara-hitung-win-rate-mlbb-target-mythic-glory', 'Cara Menghitung Jumlah Kemenangan Beruntun untuk Target Win Rate Impian', 'Tips & Trik', 'Meta Analyst', '3 menit baca', 4120, '/images/promo/hero-slide-1.svg', 'game1', 'Pelajari formula matematika di balik kalkulator Win Rate MLBB dan bagaimana menyusun target kemenangan yang realistis per season.', '<h3>Formula Matematis Win Rate</h3><p>Gunakan kalkulator Win Rate MPTopUp untuk menghitung win streak yang Anda butuhkan!</p>'),
    ('event-flash-sale-cashback-top-up-agustus-2026', 'Event Promo Merdeka: Cashback Top Up Game hingga 20% di MPTopUp', 'Event Promo', 'Tim Promo MPTopUp', '2 menit baca', 5310, '/images/promo/promo-cashback.svg', 'game1', 'Rayakan bulan kemerdekaan dengan kode voucher NEWUSER20 dan cashback instan via QRIS dan E-Wallet tanpa minimum transaksi.', '<h3>Promo Kemerdekaan MPTopUp</h3><p>Gunakan kode voucher NEWUSER20 saat checkout untuk mendapatkan potongan hingga 20%!</p>')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.reviews (name, game, rating, comment, is_verified, likes)
VALUES
    ('Budi Santoso', 'Mobile Legends', 5, 'Top up 250 Diamonds prosesnya super kilat! Belum sempat keluar dari halaman invoice, diamond sudah masuk ke akun in-game. Sangat recommended!', true, 24),
    ('Kevin Pratama', 'Valorant', 5, 'Beli 1000 VP via QRIS langsung beres detik itu juga. CS WhatsApp juga sangat responsif saat tanya-tanya promo diskon.', true, 18),
    ('Rizky Alamsyah', 'Genshin Impact', 5, 'Blessing of Welkin Moon termurah se-Indonesia! Aman 100% legal via UID tanpa minta password. Sukses terus MPTopUp!', true, 31),
    ('Siti Nurhaliza', 'Free Fire', 5, 'Dapat diskon 20% pake kupon NEWUSER20, lumayan banget buat borong diamond event FF. Makasih admin!', true, 12),
    ('Andi Wijaya', 'PUBG Mobile', 4, 'Proses cepat dan lancar. Tampilan website juga sangat modern dan mudah digunakan lewat HP.', true, 8),
    ('David Christian', 'Steam Wallet IDR', 5, 'Kode voucher Steam langsung muncul di layar setelah pembayaran QRIS terkonfirmasi. Mantap banget!', true, 15)
ON CONFLICT DO NOTHING;
