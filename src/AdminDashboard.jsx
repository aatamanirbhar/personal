// ROUTES:
//
// <Route path="/admin" element={<AdminDashboard />} />
// <Route path="/admin/add-slide" element={<AddHeroSlide />} />

// =========================
// ADMIN DASHBOARD
// =========================

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function AdminDashboard() {
  const [slides, setSlides] = useState([]);
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    fetchSlides();
    fetchVisitors();
  }, []);

  const fetchSlides = async () => {
    const { data } = await supabase
      .from('hero_slides')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setSlides(data);
  };

  const fetchVisitors = async () => {
    const { data } = await supabase
      .from('visitors')
      .select('*')
      .order('visited_at', { ascending: false });

    if (data) setVisitors(data);
  };

  const deleteSlide = async (slide) => {
    await supabase
      .from('hero_slides')
      .delete()
      .eq('id', slide.id);

    fetchSlides();
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-black">Admin Dashboard</h1>

          <a
            href="/admin/add-slide"
            className="px-6 py-3 bg-white text-black rounded-full font-semibold"
          >
            Add Hero Slide
          </a>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8">
            <p className="text-gray-400 mb-3">Hero Slides</p>
            <h2 className="text-5xl font-black">{slides.length}</h2>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8">
            <p className="text-gray-400 mb-3">Visitors</p>
            <h2 className="text-5xl font-black">{visitors.length}</h2>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8">
            <p className="text-gray-400 mb-3">Latest Visitor</p>
            <h2 className="text-2xl font-bold">
              {visitors[0]?.country || 'No Data'}
            </h2>
          </div>
        </div>

        {/* HERO SLIDES */}
        <div className="mb-20">
          <h2 className="text-4xl font-black mb-8">Hero Slides</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="border border-white/10 rounded-3xl overflow-hidden bg-white/[0.03]"
              >
                <img
                  src={slide.desktop_image}
                  className="w-full h-[250px] object-cover"
                />

                <div className="p-6">
                  <h3 className="text-3xl font-bold mb-4">
                    {slide.movie}
                  </h3>

                  <p className="text-gray-400 italic mb-6">
                    {slide.quote}
                  </p>

                  <button
                    onClick={() => deleteSlide(slide)}
                    className="px-5 py-3 bg-red-500 rounded-full"
                  >
                    Delete Slide
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VISITORS */}
        <div>
          <h2 className="text-4xl font-black mb-8">Visitors</h2>

          <div className="overflow-x-auto rounded-3xl border border-white/10">
            <table className="w-full">
              <thead className="bg-white/[0.04]">
                <tr>
                  <th className="text-left p-5">IP</th>
                  <th className="text-left p-5">Country</th>
                  <th className="text-left p-5">City</th>
                  <th className="text-left p-5">Browser</th>
                  <th className="text-left p-5">Device</th>
                </tr>
              </thead>

              <tbody>
                {visitors.map((visitor) => (
                  <tr
                    key={visitor.id}
                    className="border-t border-white/10"
                  >
                    <td className="p-5">{visitor.ip}</td>
                    <td className="p-5">{visitor.country}</td>
                    <td className="p-5">{visitor.city}</td>
                    <td className="p-5">{visitor.browser}</td>
                    <td className="p-5">{visitor.device}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}