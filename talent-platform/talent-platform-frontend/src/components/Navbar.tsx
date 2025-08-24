import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUserShield } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Floating is default; no scroll-based translate needed
  const [onDark, setOnDark] = useState<boolean>(true);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  const update = () => {
      // Determine background under nav to switch text color
      const navEl = navRef.current;
      if (!navEl) return;

      const rect = navEl.getBoundingClientRect();
      const x = Math.round(window.innerWidth / 2);
      const y = Math.max(0, Math.round(rect.top + rect.height / 2));
      const stack = document.elementsFromPoint(x, y);
      // Find first element that is not the nav itself
      const target = stack.find((el) => navEl && !navEl.contains(el));

      const resolveSurface = (el: Element | undefined | null): 'dark' | 'light' | null => {
        let cur: Element | null | undefined = el ?? undefined;
        while (cur && cur instanceof HTMLElement) {
          const surface = (cur as HTMLElement).dataset?.surface as 'dark' | 'light' | undefined;
          if (surface === 'dark' || surface === 'light') return surface;
          cur = cur.parentElement ?? undefined;
        }
        return null;
      };

      const surface = resolveSurface(target);
      if (surface) {
        setOnDark(surface === 'dark');
      } else {
        // Fallback: assume light surfaces by default
        setOnDark(false);
      }
    };

    update();
  const onScroll = () => requestAnimationFrame(update);
    const onResize = () => requestAnimationFrame(update);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
  window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      {/* Fixed container with glass nav inside (pointer-events to keep page clickable) */}
      <nav aria-label="Primary" className="fixed inset-x-0 top-3 md:top-4 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 pt-3 md:pt-4">
          <div
            className={[
              'pointer-events-auto flex items-center justify-between w-full',
              'h-14 md:h-16 rounded-full',
              // Glassmorphism background + subtle outline
              'relative overflow-hidden backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/3 bg-white/15 md:bg-white/10',
              'border',
              onDark ? 'border-white/35 shadow-[0_10px_28px_rgba(0,0,0,0.20)]' : 'border-black/10 shadow-[0_10px_22px_rgba(0,0,0,0.09)]',
              // Soft inner gradient for depth
              "[background-image:linear-gradient(to_bottom,rgba(255,255,255,.08),rgba(255,255,255,.02))]",
              // Transition
              'transition-all duration-300',
            ].join(' ')}
            ref={navRef}
          >
          {/* Shimmer overlay (very low frequency pulse) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 motion-safe:animate-glass-shimmer [background:linear-gradient(120deg,transparent,rgba(255,255,255,0.35),transparent)] mix-blend-overlay"
          />
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
                <span className="ml-3 md:ml-4 inline-flex items-baseline gap-1 md:gap-1.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
                  <span className="text-2xl md:text-[26px] font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">JPD</span>
                  <span className="text-2xl md:text-[26px] font-extrabold tracking-tight bg-gradient-to-r from-violet-500 to-fuchsia-600 bg-clip-text text-transparent">Hub</span>
                </span>
                <span className={["ml-2 mt-0.5 hidden sm:block text-sm md:text-base font-semibold", onDark ? 'text-white/80' : 'text-gray-700/80'].join(' ')}>
                  Talent Platform
                </span>
            </Link>
          </div>
          
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link 
                to="/talents" 
                className={["font-medium transition-colors duration-200", onDark ? 'text-white hover:text-white' : 'text-gray-900 hover:text-blue-600'].join(' ')}
              >
                Solutions
              </Link>
              <Link to="/talents" className={["font-medium", onDark ? 'text-white hover:text-white' : 'text-gray-900 hover:text-blue-600'].join(' ')}>Technology</Link>
              <Link to="/talents" className={["font-medium", onDark ? 'text-white hover:text-white' : 'text-gray-900 hover:text-blue-600'].join(' ')}>Insights</Link>
              <Link to="/talents" className={["font-medium", onDark ? 'text-white hover:text-white' : 'text-gray-900 hover:text-blue-600'].join(' ')}>Support</Link>
              <Link to="/" className={["font-medium", onDark ? 'text-white hover:text-white' : 'text-gray-900 hover:text-blue-600'].join(' ')}>About</Link>
              <Link to="/contact" className={["font-medium", onDark ? 'text-white hover:text-white' : 'text-gray-900 hover:text-blue-600'].join(' ')}>Contact</Link>
            </div>

            {/* Right-side actions */}
      <div className="hidden md:flex items-center gap-4 pr-2">
              <Link 
                to="/admin" 
        className={["font-medium transition-colors duration-200 flex items-center", onDark ? 'text-white hover:text-purple-200' : 'text-gray-900 hover:text-purple-600'].join(' ')}
              >
                <FaUserShield className="mr-2" />
                Admin
              </Link>
              <Link 
                to="/register" 
                className="px-5 py-2.5 rounded-full font-semibold bg-amber-300 hover:bg-amber-400 text-gray-900 shadow-sm hover:shadow-md transition-all duration-200"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center pr-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={["focus:outline-none transition-colors duration-200", onDark ? 'text-white hover:text-white' : 'text-gray-700 hover:text-blue-600'].join(' ')}
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="mt-3 rounded-2xl border border-white/25 bg-white/45 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_26px_rgba(0,0,0,0.10)]">
              <div className="py-3 px-4 space-y-2">
                <Link 
                  to="/talents" 
                  className="block text-gray-800 hover:text-blue-600 font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse Talents
                </Link>
                <Link to="/talents" className="block text-gray-800 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Technology</Link>
                <Link to="/talents" className="block text-gray-800 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Insights</Link>
                <Link to="/talents" className="block text-gray-800 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>Support</Link>
                <div className="h-px bg-white/40 my-2" />
                <Link 
                  to="/admin" 
                  className="flex items-center text-gray-800 hover:text-purple-600 font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUserShield className="mr-2" />
                  Admin
                </Link>
                <Link 
                  to="/register" 
                  className="block text-center px-4 py-2 rounded-full font-semibold bg-amber-300 hover:bg-amber-400 text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
  {/* Removed spacer to let page content start at the very top under floating nav */}
    </>
  );
};

export default Navbar; 