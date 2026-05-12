// =========================
// ADD HERO SLIDE PAGE
// =========================

export function AddHeroSlide() {
  const [movie, setMovie] = useState('');
  const [quote, setQuote] = useState('');
  const [desktopFile, setDesktopFile] = useState(null);
  const [mobileFile, setMobileFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadSlide = async () => {
    if (!desktopFile || !mobileFile) return;

    setLoading(true);

    const desktopPath = `desktop/${Date.now()}-${desktopFile.name}`;
    const mobilePath = `mobile/${Date.now()}-${mobileFile.name}`;

    await supabase.storage
      .from('hero-images')
      .upload(desktopPath, desktopFile);

    await supabase.storage
      .from('hero-images')
      .upload(mobilePath, mobileFile);

    const desktopUrl = supabase.storage
      .from('hero-images')
      .getPublicUrl(desktopPath).data.publicUrl;

    const mobileUrl = supabase.storage
      .from('hero-images')
      .getPublicUrl(mobilePath).data.publicUrl;

    await supabase.from('hero_slides').insert({
      movie,
      quote,
      desktop_image: desktopUrl,
      mobile_image: mobileUrl,
    });

    setLoading(false);

    alert('Hero Slide Added');
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white/[0.03] border border-white/10 rounded-[40px] p-10">
        <h1 className="text-5xl font-black mb-10">
          Add Hero Slide
        </h1>

        <div className="space-y-6">
          <input
            placeholder="Movie Name"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-6 py-5 outline-none"
          />

          <textarea
            placeholder="Movie Quote"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-6 py-5 outline-none h-[150px]"
          />

          <div>
            <p className="mb-3 text-gray-400">Desktop Image</p>

            <input
              type="file"
              onChange={(e) => setDesktopFile(e.target.files[0])}
            />
          </div>

          <div>
            <p className="mb-3 text-gray-400">Mobile Image</p>

            <input
              type="file"
              onChange={(e) => setMobileFile(e.target.files[0])}
            />
          </div>

          <button
            onClick={uploadSlide}
            disabled={loading}
            className="w-full py-5 bg-white text-black rounded-full font-bold text-lg"
          >
            {loading ? 'Uploading...' : 'Add Hero Slide'}
          </button>
        </div>
      </div>
    </div>
  );
}