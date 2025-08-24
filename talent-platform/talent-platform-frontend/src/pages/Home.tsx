import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaRocket, FaShieldAlt, FaStar, FaArrowRight } from 'react-icons/fa';
import BentoCard from '@/components/home/BentoCard';

const Home: React.FC = () => {
  return (
  <div className="min-h-screen bg-gray-50" data-surface="light">
      {/* Hero Section */}
      <div className="relative overflow-hidden" data-surface="dark">
        {/* Procedural grid + radial glow background */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="absolute left-1/2 top-[-10%] -translate-x-1/2 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]" />
        </div>
        
  <div className="relative max-w-7xl mx-auto pt-32 sm:pt-40 md:pt-48 pb-24 px-4 sm:pb-32">
          <div className="text-center">
            <div className="animate-fade-in-up">
              {/* Eyebrow / Context Tagline */}
              <div className="mb-5">
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] font-semibold tracking-wider text-white/80 backdrop-blur-sm uppercase">
                  For exceptional talent & forward-thinking teams
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Connect with
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> Top Talent</span>
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Join JPD Hub's premium talent network and showcase your skills to potential clients worldwide
              </p>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up animation-delay-200">
              <Link
                to="/register"
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center"
              >
                Register as Talent
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/talents"
                className="group bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                Browse Talents
                <FaUsers className="ml-2 group-hover:scale-110 transition-transform" />
              </Link>
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animation-delay-400">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400">1000+</div>
                <div className="text-gray-300 mt-2">Verified Talents</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400">500+</div>
                <div className="text-gray-300 mt-2">Successful Hires</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400">98%</div>
                <div className="text-gray-300 mt-2">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Bento Section */}
      <div className="relative py-20" data-surface="light">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">All-in-one Platform</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">A modern, interactive bento layout that surfaces what matters most.</p>
          </div>

          {/* Bento grid: 12 cols on lg, stacked on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">
            {/* Primary (60%) */}
            <BentoCard
              className="lg:col-span-7 bg-gradient-to-br from-blue-600 to-indigo-700 text-white"
              title="Verified Talents"
              subtitle="Quality First"
              footer={<span className="opacity-90">Admin verified profiles. Real results.</span>}
            >
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-5xl font-extrabold">1,000+</div>
                  <div className="mt-2 text-white/90">Across engineering, design, and product</div>
                </div>
                <div className="h-24 w-24 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <FaShieldAlt className="text-white text-3xl" />
                </div>
              </div>
            </BentoCard>

            {/* Secondary (30%) */}
            <BentoCard
              className="lg:col-span-3"
              title="Fast Hiring"
              subtitle="Time-to-Hire"
              footer={<Link to="/talents" className="text-blue-600 font-semibold inline-flex items-center">Browse Talents <FaArrowRight className="ml-1"/></Link>}
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center">
                  <FaRocket />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">7 days</div>
                  <div className="text-gray-600">Avg. time to first interview</div>
                </div>
              </div>
            </BentoCard>

            {/* Accent (10%) */}
            <BentoCard
              className="lg:col-span-2 bg-gradient-to-br from-amber-400 to-orange-500 text-white"
              title="Satisfaction"
            >
              <div className="text-4xl font-extrabold">98%</div>
              <div className="text-white/90">Client happiness</div>
            </BentoCard>

            {/* Secondary card: Community */}
            <BentoCard
              className="lg:col-span-4"
              title="Community"
              subtitle="Trusted Network"
            >
              <p className="text-gray-600">Backed by active maintainers and industry mentors. Join events and AMAs.</p>
              <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
                <div className="h-8 w-8 rounded-full bg-blue-100" />
                <div className="h-8 w-8 rounded-full bg-purple-100" />
                <div className="h-8 w-8 rounded-full bg-emerald-100" />
                <span>+500 members</span>
              </div>
            </BentoCard>

            {/* Secondary card: Security */}
            <BentoCard className="lg:col-span-4" title="Security" subtitle="Enterprise-grade">
              <p className="text-gray-600">Role-based admin approvals, audit logs, and data protection baked in.</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center">
                  <FaShieldAlt />
                </div>
                <span className="text-gray-700">SOC2-inspired best practices</span>
              </div>
            </BentoCard>

            {/* Secondary card: Success */}
            <BentoCard className="lg:col-span-4" title="Success" subtitle="Outcomes">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-extrabold text-gray-900">500+</div>
                  <div className="text-gray-600">Successful hires</div>
                </div>
                <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <FaUsers />
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Professionals</h2>
            <p className="text-xl text-gray-600">See what our community says about JPD Hub</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"JPD Hub transformed my freelance career. The quality of clients and projects is exceptional."</p>
              <div className="font-semibold text-gray-900">Sarah Chen</div>
              <div className="text-gray-500">Full-Stack Developer</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"As a client, I found amazing talent quickly. The verification process gives me confidence."</p>
              <div className="font-semibold text-gray-900">Mike Johnson</div>
              <div className="text-gray-500">Tech Startup Founder</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"The admin approval process ensures quality. My profile stands out among verified professionals."</p>
              <div className="font-semibold text-gray-900">Alex Kumar</div>
              <div className="text-gray-500">UI/UX Designer</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden" data-surface="light">
        {/* Radial gradient background (replacing old blue/purple gradient) */}
        <div className="absolute inset-0 -z-10 bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]" />
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
            Ready to Join the Elite?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Start your journey with JPD Hub today and connect with premium opportunities
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 rounded-xl text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-500 transition-all duration-300 hover:scale-[1.03]"
          >
            Get Started Now
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
