import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "./lib/supabase";

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  const projects = [
    {
      name: "Botanoria",
      url: "https://botanoria.in",
      image:
        "https://image.thum.io/get/width/1200/crop/800/https://botanoria.in",
      tag: "Ecommerce",
      accent: "bg-[#C6F94B]",
      description:
        "A herbal personal-care storefront built around a handmade soap collection. Clean botanical vibe, slide-out cart, product showcase, and an Instagram-led brand presence.",
    },
    {
      name: "Omenly",
      url: "https://omenly.tech",
      image:
        "https://image.thum.io/get/width/1200/crop/800/https://omenly.tech",
      tag: "Indie Arcade",
      accent: "bg-[#FF8A4C]",
      description:
        "A cozy browser arcade of small, handmade games. Quiet typography, sparse layout, and a tip-jar tone — built like a one-person workshop, not a platform.",
    },
    {
      name: "Gamenights",
      url: "https://gamenights.live",
      image: "/images/gamenights.png",
      tag: "Trivia Game",
      accent: "bg-[#FF7BAC]",
      description:
        "Dialogue Quest — a guessing game where players ID movies, TV shows, anime and song lyrics from short dialogue snippets. Playful, nostalgic, made for pop-culture nerds.",
    },
    {
      name: "Radharani Store",
      url: "https://radharanistore.vercel.app",
      image:
        "https://image.thum.io/get/width/1200/crop/800/https://radharanistore.vercel.app",
      tag: "Fashion",
      accent: "bg-[#80C8FF]",
      description:
        "An India-based fashion store covering men, women, kids and accessories. Category-led browsing, wishlists, order tracking and account flows — the full ecommerce kit.",
    },
  ];

  const plans = [
    {
      title: "Starter",
      price: "₹4,999",
      tagline: "Up and running, fast.",
      accent: "bg-[#FFD43B]",
      features: [
        "Hosted on Vercel",
        "Free vercel.app URL",
        "Fully responsive",
        "Fast loading by default",
        "Clean, modern UI",
      ],
    },
    {
      title: "Pay As You Go",
      price: "₹4,999 + services",
      tagline: "Grow it into the real thing.",
      accent: "bg-[#C6F94B]",
      features: [
        "Custom domain setup",
        "Premium hosting",
        "Auth / login layer",
        "Extra integrations",
        "Ongoing tweaks",
      ],
    },
  ];

  // VISITOR TRACKING
  const getBrowser = () => {
    const ua = navigator.userAgent;
    if (ua.includes("Chrome")) return "Chrome";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Safari")) return "Safari";
    return "Unknown";
  };

  const getDeviceType = () =>
    window.innerWidth < 768 ? "Mobile" : "Desktop";

  const trackVisitor = async () => {
    try {
      let ipData = {};
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const ipOnly = await res.json();
        const geoRes = await fetch(`https://ipwho.is/${ipOnly.ip}`);
        ipData = await geoRes.json();
      } catch (err) {
        console.log("IP API failed");
      }

      const payload = {
        ip: ipData.ip || "Unknown",
        country: ipData.country || "Unknown",
        city: ipData.city || "Unknown",
        browser: getBrowser(),
        device: getDeviceType(),
      };

      await supabase.from("visitors").insert(payload);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    trackVisitor();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  return (
    <div className="bg-[#FFFBEF] text-[#0D0D0D] min-h-screen font-sans selection:bg-[#C6F94B]">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#FFFBEF] border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-7 text-sm font-semibold ml-auto">
            <button onClick={() => scrollTo("work")} className="hover:underline underline-offset-4">
              Work
            </button>
            <button onClick={() => scrollTo("pricing")} className="hover:underline underline-offset-4">
              Pricing
            </button>
            <button onClick={() => scrollTo("about")} className="hover:underline underline-offset-4">
              About
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="bg-black text-white px-4 py-2 rounded-full border-2 border-black hover:bg-[#FF7A45] hover:text-black transition-colors"
            >
              Say hi →
            </button>
          </div>

          <button
            className="md:hidden border-2 border-black rounded-md px-3 py-1 text-sm font-bold ml-auto"
            onClick={() => setNavOpen((v) => !v)}
          >
            {navOpen ? "Close" : "Menu"}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden border-t-2 border-black px-5 py-4 flex flex-col gap-3 text-base font-semibold bg-[#FFFBEF]">
            <button onClick={() => scrollTo("work")} className="text-left">Work</button>
            <button onClick={() => scrollTo("pricing")} className="text-left">Pricing</button>
            <button onClick={() => scrollTo("about")} className="text-left">About</button>
            <button onClick={() => scrollTo("contact")} className="text-left">Contact</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white border-2 border-black rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_0_#0D0D0D]"
          >
            <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
            Open for freelance — June 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display font-black tracking-tight leading-[0.95] text-6xl sm:text-7xl md:text-[7.5rem] mt-6"
          >
            hi, i'm <span className="bg-[#FF7A45] px-3 -mx-1 border-2 border-black rounded-2xl inline-block rotate-[-1.5deg]">vikas</span>
            <br />
            i build websites
            <br />
            that <span className="italic underline decoration-[#C6F94B] decoration-[10px] underline-offset-2">actually ship.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 text-lg md:text-xl max-w-2xl text-[#3a3a3a] leading-relaxed"
          >
            Aspiring freelance web developer based in India. I help small brands,
            indie creators and side projects get a real, working site online —
            quickly, cheaply, and without the agency bloat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollTo("work")}
              className="bg-black text-white px-6 py-3 rounded-full font-bold border-2 border-black shadow-[5px_5px_0_0_#FF7A45] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_#FF7A45] transition-all"
            >
              See my work →
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="bg-[#C6F94B] text-black px-6 py-3 rounded-full font-bold border-2 border-black shadow-[5px_5px_0_0_#0D0D0D] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_0_#0D0D0D] transition-all"
            >
              Hire me
            </button>
          </motion.div>

          {/* stat row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { k: "4+", v: "Sites shipped" },
              { k: "₹5K", v: "Starting price" },
              { k: "7 days", v: "Typical turnaround" },
              { k: "1:1", v: "You talk to the builder" },
            ].map((s, i) => (
              <div
                key={s.v}
                className={`border-2 border-black rounded-2xl p-4 ${
                  i % 2 === 0 ? "bg-white" : "bg-[#FFF3C2]"
                }`}
              >
                <div className="text-2xl md:text-3xl font-display font-black">{s.k}</div>
                <div className="text-xs uppercase tracking-wider text-[#3a3a3a] mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* marquee strip */}
        <div className="bg-black text-[#FFFBEF] border-y-2 border-black overflow-hidden">
          <div className="flex gap-10 py-3 whitespace-nowrap animate-[marquee_30s_linear_infinite] font-display font-bold text-lg uppercase tracking-wider">
            {Array.from({ length: 2 }).map((_, r) => (
              <div key={r} className="flex gap-10 px-5">
                {[
                  "React",
                  "✦",
                  "Tailwind",
                  "✦",
                  "Framer Motion",
                  "✦",
                  "Supabase",
                  "✦",
                  "Vite",
                  "✦",
                  "Vercel",
                  "✦",
                  "Node",
                  "✦",
                  "Figma",
                  "✦",
                ].map((t, i) => (
                  <span key={`${r}-${i}`}>{t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#3a3a3a] font-bold mb-3">
                ✦ Selected work
              </p>
              <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight">
                Stuff i've built.
              </h2>
            </div>
            <p className="max-w-sm text-[#3a3a3a]">
              Four live projects across ecommerce, indie games and trivia — each
              one shipped end-to-end, hosted, and out in the world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-white border-2 border-black rounded-3xl overflow-hidden shadow-[6px_6px_0_0_#0D0D0D] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_0_#0D0D0D] transition-all"
              >
                <div className={`relative h-56 md:h-64 border-b-2 border-black ${project.accent} overflow-hidden`}>
                  <img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="absolute top-4 left-4 bg-white border-2 border-black rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    {project.tag}
                  </span>
                </div>
                <div className="p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display font-black text-2xl md:text-3xl">
                      {project.name}
                    </h3>
                    <span className="text-xl group-hover:rotate-45 transition-transform">↗</span>
                  </div>
                  <p className="mt-3 text-[#3a3a3a] leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-5 text-xs uppercase tracking-widest font-bold text-[#3a3a3a]">
                    {project.url.replace(/^https?:\/\//, "")}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-28 bg-[#FFF3C2] border-y-2 border-black">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.25em] font-bold mb-3">
              ✦ About me
            </p>
            <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight leading-tight">
              I'm just a guy
              <br />
              who really likes
              <br />
              <span className="bg-[#FF7BAC] px-2 border-2 border-black rounded-xl inline-block rotate-[-1deg]">
                shipping things.
              </span>
            </h2>
            <p className="mt-6 text-lg text-[#0D0D0D]/80 leading-relaxed max-w-xl">
              I started building because I got tired of half-finished side projects.
              Now I help other people get theirs across the line — a real website,
              a real domain, a real link to send their friends.
            </p>
            <p className="mt-4 text-lg text-[#0D0D0D]/80 leading-relaxed max-w-xl">
              No big agency. No 6-week timeline. Just me, a Figma file, and a Vercel deploy.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.25em] font-bold mb-4">
              ✦ What I do
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Landing pages",
                "Ecommerce sites",
                "Portfolios",
                "Web apps",
                "Auth flows",
                "Stripe / Razorpay",
                "Admin dashboards",
                "Hosting setup",
                "Custom domains",
                "Tiny tweaks",
              ].map((s) => (
                <span
                  key={s}
                  className="bg-white border-2 border-black rounded-full px-3 py-1 text-sm font-semibold"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-[#3a3a3a] font-bold mb-3">
              ✦ Pricing
            </p>
            <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight">
              Two ways to work together.
            </h2>
            <p className="mt-4 text-[#3a3a3a] max-w-xl mx-auto">
              Pick the one that fits where your project is right now. You can
              always upgrade later — most people do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan, i) => (
              <div
                key={plan.title}
                className={`relative border-2 border-black rounded-3xl p-8 md:p-10 ${
                  i === 0 ? "bg-white" : "bg-white"
                } shadow-[6px_6px_0_0_#0D0D0D]`}
              >
                <div
                  className={`inline-block ${plan.accent} border-2 border-black rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest`}
                >
                  {plan.title}
                </div>
                <p className="mt-4 text-[#3a3a3a] font-medium">{plan.tagline}</p>
                <div className="mt-2 font-display font-black text-5xl md:text-6xl tracking-tight">
                  {plan.price}
                </div>
                <div className="my-7 h-[2px] bg-black/10" />
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[#0D0D0D]">
                      <span className="mt-1 inline-block w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("contact")}
                  className="mt-8 w-full bg-black text-white px-5 py-3 rounded-full font-bold border-2 border-black hover:bg-[#FF7A45] hover:text-black transition-colors"
                >
                  Start with {plan.title} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-20 md:py-28 bg-[#0D0D0D] text-[#FFFBEF] border-t-2 border-black"
      >
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] font-bold mb-4 text-[#FFD43B]">
            ✦ Contact
          </p>
          <h2 className="font-display font-black text-4xl md:text-7xl tracking-tight leading-[0.95]">
            Got an idea?
            <br />
            <span className="bg-[#C6F94B] text-black px-3 border-2 border-[#FFFBEF] rounded-2xl inline-block rotate-[-1deg]">
              let's build it.
            </span>
          </h2>
          <p className="mt-6 text-lg text-[#FFFBEF]/70 max-w-xl mx-auto">
            Fastest way to reach me is WhatsApp. Prefer email? That works too.
            Or, if you just want to support what I do — a coffee goes a long way.
          </p>

          <div className="mt-12 grid sm:grid-cols-3 gap-5">
            <a
              href="https://wa.me/918949720403"
              target="_blank"
              rel="noreferrer"
              className="group bg-[#25D366] text-black px-5 py-5 rounded-2xl font-bold border-2 border-[#FFFBEF] shadow-[5px_5px_0_0_#FFFBEF] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_0_#FFFBEF] transition-all flex flex-col items-center gap-2"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.5.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.9-1.4-1.3-3-1.3-4.6 0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5-3.8 8.5-8.5 8.5z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            <a
              href="mailto:v1241653@gmail.com"
              className="group bg-[#80C8FF] text-black px-5 py-5 rounded-2xl font-bold border-2 border-[#FFFBEF] shadow-[5px_5px_0_0_#FFFBEF] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_0_#FFFBEF] transition-all flex flex-col items-center gap-2"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              <span>Email</span>
            </a>

            <a
              href="https://paypal.me/vikas117"
              target="_blank"
              rel="noreferrer"
              className="group bg-[#FFD43B] text-black px-5 py-5 rounded-2xl font-bold border-2 border-[#FFFBEF] shadow-[5px_5px_0_0_#FFFBEF] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_0_#FFFBEF] transition-all flex flex-col items-center gap-2"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                <line x1="6" y1="2" x2="6" y2="4" />
                <line x1="10" y1="2" x2="10" y2="4" />
                <line x1="14" y1="2" x2="14" y2="4" />
              </svg>
              <span>Buy me a coffee</span>
              <span className="text-xs font-medium opacity-70">paypal.me/vikas117</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D0D0D] text-[#FFFBEF]/60 border-t-2 border-[#FFFBEF]/10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div>© {new Date().getFullYear()} Vikas — built with React, Tailwind & too much 2am coffee.</div>
          <div className="flex gap-5">
            <a href="https://wa.me/918949720403" target="_blank" rel="noreferrer" className="hover:text-[#FFFBEF]">
              WhatsApp
            </a>
            <a href="mailto:v1241653@gmail.com" className="hover:text-[#FFFBEF]">
              Email
            </a>
            <a href="https://paypal.me/vikas117" target="_blank" rel="noreferrer" className="hover:text-[#FFFBEF]">
              Coffee
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
