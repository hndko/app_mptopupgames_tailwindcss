import { defineStore } from 'pinia';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const INITIAL_ARTICLES = [
  {
    id: 1,
    slug: 'trik-hemat-diamond-event-zodiac-mlbb-2026',
    title: 'Trik Hemat Beli Skin Zodiac Mobile Legends 2026 dengan Diskon COA',
    category: 'Tips & Trik',
    author: 'Admin MPTopUp',
    date: '24 Agu 2026',
    readTime: '4 menit baca',
    views: 3420,
    banner: '/images/promo/promo-mlbb.svg',
    gameId: 'game1',
    gameTitle: 'Mobile Legends: Bang Bang',
    summary: 'Ingin mendapatkan skin Zodiac favorit dengan biaya paling hemat? Simak panduan kombinasi Crystal of Aurora (COA) harian dan diskon draw 5x di sini.',
    content: `
      <h3>Mengapa Skin Zodiac Sangat Diincar?</h3>
      <p>Skin seri Zodiac di Mobile Legends: Bang Bang merupakan salah satu koleksi skin paling prestisius dengan visual efek rasi bintang yang memukau. Setiap bulannya, Moonton merilis skin Zodiac sesuai zodiak yang sedang berlangsung.</p>
      
      <h3>Strategi Mengumpulkan 100 Star Power Paling Hemat</h3>
      <p>Untuk membuka skin Zodiac secara penuh, Anda membutuhkan 100 Star Power. Berikut adalah metode cerdas menghemat diamond:</p>
      <ul>
        <li><strong>Langganan Weekly Diamond Pass</strong>: Dapatkan pasokan Crystal of Aurora (COA) harian dengan rasio harga terbaik.</li>
        <li><strong>Manfaatkan Diskon First Draw Harian</strong>: Lakukan single draw pertama setiap hari untuk mendapatkan diskon 50%.</li>
        <li><strong>Gunakan Kalkulator Zodiac MPTopUp</strong>: Hitung perkiraan sisa Diamond/COA yang Anda perlukan sebelum mulai melakukan draw.</li>
      </ul>
      
      <h3>Kesimpulan</h3>
      <p>Dengan perencanaan top up yang matang dan pemanfaatan promo MPTopUp, Anda dapat menghemat hingga 40% diamond dibandingkan melakukan instan draw langsung di hari pertama.</p>
    `
  },
  {
    id: 2,
    slug: 'rekomendasi-agent-valorant-patch-terbaru-solo-rank',
    title: 'Top 5 Agent Valorant Paling Efektif untuk Push Rank Solo Queue',
    category: 'Panduan Hero',
    author: 'Coach Vandal',
    date: '22 Agu 2026',
    readTime: '6 menit baca',
    views: 2890,
    banner: '/images/promo/promo-valorant.svg',
    gameId: 'game2',
    gameTitle: 'Valorant Points',
    summary: 'Rekomendasi agent duelist dan initiator dengan impact tertinggi untuk memenangkan ranked match tanpa harus bergantung penuh pada party.',
    content: `
      <h3>Tantangan Solo Queue di Valorant</h3>
      <p>Bermain ranked tanpa party (solo queue) menuntut pemain memilih agent mandiri yang memiliki utilitas lengkap: kemampuan membuka ruang, flash, dan mengamankan kill mandiri.</p>
      
      <h3>5 Agent Pilihan Patch Ini</h3>
      <ol>
        <li><strong>Jett (Duelist)</strong>: Mobilitas dash dan cloudburst menjadikannya agent terbaik untuk membuka entry kill.</li>
        <li><strong>Omen (Controller)</strong>: Smoke fleksibel dengan cooldown dan teleportasi taktis Paranoia flash.</li>
        <li><strong>Sova / Fade (Initiator)</strong>: Informasi recon yang sangat krusial saat koordinasi voice chat minim.</li>
        <li><strong>Clove (Controller)</strong>: Tetap bisa mengeluarkan smoke taktis bahkan setelah tereliminasi!</li>
        <li><strong>Cypher (Sentinel)</strong>: Menutup flank sepenuhnya sehingga rekan tim dapat fokus menyerang.</li>
      </ol>
    `
  },
  {
    id: 3,
    slug: 'cara-hitung-win-rate-mlbb-target-mythic-glory',
    title: 'Cara Menghitung Jumlah Kemenangan Beruntun untuk Target Win Rate Impian',
    category: 'Tips & Trik',
    author: 'Meta Analyst',
    date: '20 Agu 2026',
    readTime: '3 menit baca',
    views: 4120,
    banner: '/images/promo/hero-slide-1.svg',
    gameId: 'game1',
    gameTitle: 'Mobile Legends: Bang Bang',
    summary: 'Pelajari formula matematika di balik kalkulator Win Rate MLBB dan bagaimana menyusun target kemenangan yang realistis per season.',
    content: `
      <h3>Formula Matematis Win Rate</h3>
      <p>Win Rate dihitung dari total kemenangan dibagi total match dikalikan 100%. Ketika total match Anda sudah mencapai ribuan, menaikkan 1% WR membutuhkan puluhan win streak tanpa kekalahan.</p>
      
      <p>Gunakan rumus praktis berikut:</p>
      <pre>Win Streak Dibutuhkan = ceil( (Total Match * (Target WR - WR Saat Ini)) / (100 - Target WR) )</pre>
      
      <p>Anda tidak perlu menghitung secara manual karena alat <strong>Kalkulator Win Rate MPTopUp</strong> telah menyediakannya secara otomatis dan gratis!</p>
    `
  },
  {
    id: 4,
    slug: 'event-flash-sale-cashback-top-up-agustus-2026',
    title: 'Event Promo Merdeka: Cashback Top Up Game hingga 20% di MPTopUp',
    category: 'Event Promo',
    author: 'Tim Promo MPTopUp',
    date: '17 Agu 2026',
    readTime: '2 menit baca',
    views: 5310,
    banner: '/images/promo/promo-cashback.svg',
    gameId: 'game1',
    gameTitle: 'Semua Game & Voucher',
    summary: 'Rayakan bulan kemerdekaan dengan kode voucher NEWUSER20 dan cashback instan via QRIS dan E-Wallet tanpa minimum transaksi.',
    content: `
      <h3>Detail Program Promo Merdeka</h3>
      <p>Dalam rangka menyemarakkan bulan kemerdekaan, MPTopUp memberikan promo spesial diskon hingga 20% untuk semua transaksi top up game dan pembelian voucher digital.</p>
      
      <h3>Syarat & Ketentuan Penggunaan Kupon</h3>
      <ul>
        <li>Gunakan kode kupon <strong>NEWUSER20</strong> saat checkout.</li>
        <li>Berlaku untuk seluruh metode pembayaran (QRIS, DANA, GoPay, OVO, Virtual Account).</li>
        <li>Promo aktif mulai 01 Agustus hingga 31 Agustus 2026.</li>
      </ul>
    `
  }
];

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: INITIAL_ARTICLES,
    selectedCategory: 'Semua',
    searchQuery: '',
    isLoading: false,
    categories: ['Semua', 'Tips & Trik', 'Panduan Hero', 'Event Promo', 'Patch Update']
  }),

  getters: {
    filteredArticles: (state) => {
      return state.articles.filter(article => {
        const matchesCategory = state.selectedCategory === 'Semua' || article.category === state.selectedCategory;
        const q = state.searchQuery.toLowerCase().trim();
        const matchesQuery = !q || 
          article.title.toLowerCase().includes(q) ||
          article.summary.toLowerCase().includes(q) ||
          article.category.toLowerCase().includes(q);
        return matchesCategory && matchesQuery;
      });
    },

    featuredArticle: (state) => state.articles[0],

    getArticleBySlug: (state) => (slug) => {
      return state.articles.find(a => a.slug === slug) || state.articles[0];
    }
  },

  actions: {
    setCategory(category) {
      this.selectedCategory = category;
    },

    setSearch(query) {
      this.searchQuery = query;
    },

    async fetchArticles() {
      if (!isSupabaseConfigured || !supabase) return;
      try {
        this.isLoading = true;
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          this.articles = data.map(item => ({
            id: item.id,
            slug: item.slug,
            title: item.title,
            category: item.category,
            author: item.author,
            date: new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
            readTime: item.read_time || '4 menit baca',
            views: item.views || 0,
            banner: item.banner_url || '/images/promo/promo-mlbb.svg',
            gameId: item.game_id,
            gameTitle: item.game_id === 'game1' ? 'Mobile Legends' : (item.game_id === 'game2' ? 'Valorant' : 'Game Populer'),
            summary: item.summary,
            content: item.content
          }));
        }
      } catch (err) {
        console.warn('Gagal memuat artikel dari database, menggunakan fallback lokal:', err);
      } finally {
        this.isLoading = false;
      }
    },

    async incrementViews(slug) {
      const art = this.articles.find(a => a.slug === slug);
      if (art) {
        art.views += 1;
      }
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.rpc('increment_article_views', { p_slug: slug });
        } catch {
          // Ignored
        }
      }
    }
  }
});
