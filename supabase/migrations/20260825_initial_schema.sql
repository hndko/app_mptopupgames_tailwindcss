-- ==============================================================================
-- SKEMA DATABASE LENGKAP MPTOPUP (SUPABASE POSTGRESQL + RLS + GOOGLE OAUTH TRIGGER)
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

-- Indexing profiles
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

-- ==============================================================================
-- TRIGGER OTOMATIS SINKRONISASI PROFIL USER (GOOGLE OAUTH & MANUAL SIGNUP)
-- ==============================================================================
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

-- Pasang trigger pada tabel auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT OR UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- KEBIJAKAN KEAMANAN ROW LEVEL SECURITY (RLS)
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products_sku ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Helper function: Memeriksa apakah user saat ini adalah admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies for profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL USING (public.is_admin());

-- Policies for games (Public read, Admin write)
CREATE POLICY "Games are viewable by everyone" ON public.games FOR SELECT USING (true);
CREATE POLICY "Admins can manage games" ON public.games FOR ALL USING (public.is_admin());

-- Policies for products_sku (Public read, Admin write)
CREATE POLICY "SKUs are viewable by everyone" ON public.products_sku FOR SELECT USING (true);
CREATE POLICY "Admins can manage SKUs" ON public.products_sku FOR ALL USING (public.is_admin());

-- Policies for orders (Public insert, Owner read, Admin all)
CREATE POLICY "Anyone can create an order" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Admins can manage all orders" ON public.orders FOR ALL USING (public.is_admin());

-- Policies for promos (Public read, Admin write)
CREATE POLICY "Promos are viewable by everyone" ON public.promos FOR SELECT USING (true);
CREATE POLICY "Admins can manage promos" ON public.promos FOR ALL USING (public.is_admin());

-- Policies for system_settings (Public read, Admin write)
CREATE POLICY "Settings are viewable by everyone" ON public.system_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage settings" ON public.system_settings FOR ALL USING (public.is_admin());

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
