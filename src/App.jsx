import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "./lib/supabase";

const HERO_INTERVAL = 5000;

export default function App() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768
  );

  const projects = [
    {
      name: "Botanoria",
      url: "https://botanoria.vercel.app",
      image:
        "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=1200&auto=format&fit=crop",

      description:
        "Premium herbal skincare ecommerce experience.",
    },

    {
      name: "Radha Rani Store",
      url: "https://radharanistore.vercel.app",

      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",

      description:
        "Elegant ecommerce storefront.",
    },
  ];

  const plans = [
    {
      title: "Starter",

      price: "₹4,999",

      features: [
        "Hosted On Vercel",
        "Free Vercel URL",
        "Responsive Design",
        "Fast Loading",
        "Modern UI",
      ],
    },

    {
      title: "Pay As You Go",

      price: "₹4,999 + Services",

      features: [
        "Custom Domain",
        "Premium Hosting",
        
        "Authentication Layer",
        
        "Extra Integrations",
      ],
    },
  ];

  // FETCH HERO SLIDES
  const fetchSlides = async () => {
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .order("created_at", {
        ascending: true,
      });

    console.log(data);
    console.log(error);

    if (!error && data) {
      setSlides(data);
    }
  };

  // VISITOR TRACKING
  const getBrowser = () => {
    const ua = navigator.userAgent;

    if (ua.includes("Chrome"))
      return "Chrome";

    if (ua.includes("Firefox"))
      return "Firefox";

    if (ua.includes("Safari"))
      return "Safari";

    return "Unknown";
  };

  const getDeviceType = () => {
    return window.innerWidth < 768
      ? "Mobile"
      : "Desktop";
  };

const trackVisitor = async () => {
  try {
    let ipData = {};

    try {
      const res = await fetch(
  "https://api.ipify.org?format=json"
);

const ipOnly = await res.json();

const geoRes = await fetch(
  `https://ipwho.is/${ipOnly.ip}`
);

ipData = await geoRes.json();

console.log(ipData);
    } catch (err) {
      console.log("IP API failed");
    }

    const payload = {
      ip: ipData.ip || "Unknown",

      country:
        ipData.country || "Unknown",

      city:
        ipData.city || "Unknown",

      browser: getBrowser(),

      device: getDeviceType(),
    };

    const { error } = await supabase
      .from("visitors")
      .insert(payload);

    console.log(error);

  } catch (err) {
    console.log(err);
  }
};

  // INITIAL LOAD
  useEffect(() => {
    fetchSlides();

    trackVisitor();

    const handleResize = () => {
      setIsMobile(
        window.innerWidth < 768
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  // HERO ROTATION
  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1
          ? 0
          : prev + 1
      );
    }, HERO_INTERVAL);

    return () =>
      clearInterval(interval);
  }, [slides]);

  const activeSlide =
    slides.length > 0
      ? slides[current]
      : null;

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        {activeSlide ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{
                  opacity: 0,
                  scale: 1.1,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 1.5,
                }}
                className="absolute inset-0"
              >
                <img
                  src={
                    isMobile
                      ? activeSlide.mobile_image
                      : activeSlide.desktop_image
                  }
                  alt={activeSlide.movie}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
              </motion.div>
            </AnimatePresence>

            <div className="relative z-10 h-full flex items-center justify-center px-6">
              <div className="max-w-5xl text-center">
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="uppercase tracking-[0.4em] text-sm text-gray-300 mb-5"
                >
                  Immersive Web
                  Experiences
                </motion.p>

                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 60,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="text-5xl md:text-8xl font-black leading-tight mb-8"
                >
                  Websites That
                  <br />
                  Feel Alive.
                </motion.h1>

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 70,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="text-lg md:text-2xl text-gray-200 italic mb-10 max-w-3xl mx-auto"
                >
                  {activeSlide.quote}
                </motion.p>

                <div className="flex justify-center">
              <button
  onClick={() => {
    document
      .getElementById("projects")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
  className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
>
  View Work
</button>
                </div>
              </div>
            </div>

            {/* PROGRESS */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-[3px] bg-white/20 overflow-hidden rounded-full"
                >
                  <motion.div
                    animate={{
                      width:
                        i === current
                          ? "100%"
                          : "0%",
                    }}
                    transition={{
                      duration:
                        HERO_INTERVAL /
                        1000,

                      ease: "linear",
                    }}
                    className="h-full bg-white"
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-white text-2xl">
            Loading Hero...
          </div>
        )}
      </section>

      {/* ABOUT */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-5">
              About
            </p>

            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8">
              Not Templates.
              <br />
              Experiences.
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              I create cinematic,
              immersive, modern
              websites for brands,
              businesses, creators,
              and ecommerce stores.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              "Modern UI",
              "Fast Performance",
              "Premium Animations",
              "Mobile Optimized",
            ].map((item) => (
              <div
                key={item}
                className="border border-white/10 bg-white/[0.03] rounded-3xl p-8"
              >
                <h3 className="text-2xl font-semibold">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="py-32 px-6 bg-white/[0.02]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-4">
              Selected Work
            </p>

            <h2 className="text-4xl md:text-6xl font-black">
              Built To Be
              Remembered.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                className="group border border-white/10 rounded-[32px] overflow-hidden bg-white/[0.03]"
              >
                <div className="h-[350px] overflow-hidden">
                  <img
                    src={project.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-4">
                    {project.name}
                  </h3>

                  <p className="text-gray-400 mb-5">
                    {
                      project.description
                    }
                  </p>

                  <span className="uppercase tracking-widest text-sm text-gray-300">
                    Visit Website →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-5">
            Pricing
          </p>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Simple. Premium.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className="rounded-[36px] border border-white/10 bg-white/[0.03] p-10"
            >
              <h3 className="text-3xl font-bold mb-4">
                {plan.title}
              </h3>

              <div className="text-5xl font-black mb-10">
                {plan.price}
              </div>

              <div className="space-y-4">
                {plan.features.map(
                  (feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-white" />

                      {feature}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-32 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-5">
            Contact
          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
            Let's Build
            <br />
            Something Cinematic.
          </h2>

          <div className="flex justify-center">
            <a
              href="https://wa.me/918949720403"
              target="_blank"
              className="px-10 py-5 bg-white text-black rounded-full font-semibold hover:scale-105 transition-all duration-300"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
