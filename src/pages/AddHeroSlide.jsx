import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AddHeroSlide() {
  const [movie, setMovie] = useState("");
  const [quote, setQuote] = useState("");

  const [desktopFile, setDesktopFile] =
    useState(null);

  const [mobileFile, setMobileFile] =
    useState(null);

  const [loading, setLoading] = useState(false);

  const uploadSlide = async () => {
    try {
      if (!movie || !quote) {
        alert("Add movie and quote");
        return;
      }

      if (!desktopFile || !mobileFile) {
        alert("Select both images");
        return;
      }

      setLoading(true);

      // UNIQUE FILE NAMES
      const desktopPath = `${Date.now()}-desktop-${
        desktopFile.name
      }`;

      const mobilePath = `${Date.now()}-mobile-${
        mobileFile.name
      }`;

      // UPLOAD DESKTOP
      const {
        data: desktopData,
        error: desktopError,
      } = await supabase.storage
        .from("hero-images")
        .upload(desktopPath, desktopFile);

      if (desktopError) {
        console.log(desktopError);

        alert(desktopError.message);

        return;
      }

      // UPLOAD MOBILE
      const {
        data: mobileData,
        error: mobileError,
      } = await supabase.storage
        .from("hero-images")
        .upload(mobilePath, mobileFile);

      if (mobileError) {
        console.log(mobileError);

        alert(mobileError.message);

        return;
      }

      // GET PUBLIC URLS
      const desktopUrl = supabase.storage
        .from("hero-images")
        .getPublicUrl(desktopData.path).data
        .publicUrl;

      const mobileUrl = supabase.storage
        .from("hero-images")
        .getPublicUrl(mobileData.path).data
        .publicUrl;

      // SAVE DATABASE ROW
      const { error: insertError } =
        await supabase.from("hero_slides").insert({
          movie,
          quote,
          desktop_image: desktopUrl,
          mobile_image: mobileUrl,
        });

      if (insertError) {
        console.log(insertError);

        alert(insertError.message);

        return;
      }

      alert("Hero Slide Added");

      // RESET FORM
      setMovie("");

      setQuote("");

      setDesktopFile(null);

      setMobileFile(null);

    } catch (err) {
      console.log(err);

      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white/[0.03] border border-white/10 rounded-[40px] p-10">
        <h1 className="text-5xl font-black mb-10">
          Add Hero Slide
        </h1>

        <div className="space-y-6">
          {/* MOVIE */}
          <input
            placeholder="Movie Name"
            value={movie}
            onChange={(e) =>
              setMovie(e.target.value)
            }
            className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-6 py-5 outline-none"
          />

          {/* QUOTE */}
          <textarea
            placeholder="Movie Quote"
            value={quote}
            onChange={(e) =>
              setQuote(e.target.value)
            }
            className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-6 py-5 outline-none h-[150px]"
          />

          {/* DESKTOP */}
          <div>
            <p className="mb-3 text-gray-400">
              Desktop Image
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setDesktopFile(e.target.files[0])
              }
            />
          </div>

          {/* MOBILE */}
          <div>
            <p className="mb-3 text-gray-400">
              Mobile Image
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setMobileFile(e.target.files[0])
              }
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={uploadSlide}
            disabled={loading}
            className="w-full py-5 bg-white text-black rounded-full font-bold text-lg hover:opacity-80 transition-all"
          >
            {loading
              ? "Uploading..."
              : "Add Hero Slide"}
          </button>
        </div>
      </div>
    </div>
  );
}