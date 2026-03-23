import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, ExternalLink, Plus } from 'lucide-react'
import InstagramIcon from '../components/InstagramIcon'
import AnimatedSection from '../components/AnimatedSection'
import TextScramble from '../components/TextScramble'
import Marquee from '../components/Marquee'
import { useCounter, useStagger } from '../lib/hooks'
import { CES_BUSINESSES, INSTAGRAM_POSTS, NEWS, ALUMNI_SPOTLIGHT, EIR_RESIDENTS, CES_STATS, HERO_IMAGES, GALLERY_IMAGES } from '../lib/homeData'

function SectionHeader({ title, subtitle, action }) {
  return (
    <AnimatedSection className="text-center mb-8">
      <h2 className="font-serif text-[22px] sm:text-[26px] tracking-[-0.3px] leading-tight">{title}</h2>
      {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
      {action && <div className="mt-2">{action}</div>}
    </AnimatedSection>
  )
}

function StatCard({ stat }) {
  const [ref, displayValue] = useCounter(stat.value, 1200)
  return (
    <div ref={ref} className="text-center py-6">
      <p className="font-serif text-[32px] sm:text-[40px] tracking-[-1px] leading-none">{displayValue}</p>
      <p className="text-sm font-medium text-text mt-1">{stat.label}</p>
      <p className="text-xs text-text-muted mt-0.5">{stat.note}</p>
    </div>
  )
}

function BusinessCard({ biz, style }) {
  return (
    <a
      href={biz.url}
      className="group flex flex-col bg-white border border-border hover:border-accent rounded-xl p-5 no-underline text-center card-lift h-full"
      style={style}
    >
      {biz.logo ? (
        <div className="h-12 flex items-center justify-center mx-auto mb-3">
          <img
            src={biz.logo}
            alt={biz.name + ' logo'}
            className={`h-10 max-w-[120px] object-contain ${biz.logoBg ? 'mix-blend-multiply' : ''}`}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-12 flex items-center justify-center mx-auto mb-3">
          <span className="font-serif text-[24px] italic text-text">{biz.name.charAt(0)}</span>
        </div>
      )}
      <p className="font-medium text-[15px] text-text leading-tight group-hover:underline">{biz.name}</p>
      <p className="text-xs text-text-muted mt-0.5">{biz.founder}</p>
      <p className="text-sm text-text-muted mt-2 leading-relaxed flex-1">{biz.description}</p>
    </a>
  )
}

function AlumniCard({ person, style }) {
  return (
    <a
      href={person.url}
      className="group flex flex-col bg-white border border-border hover:border-accent rounded-xl overflow-hidden no-underline text-center card-lift h-full"
      style={style}
    >
      {person.image ? (
        <div className="w-full aspect-[16/10] bg-surface-lighter overflow-hidden shrink-0">
          <img
            src={person.image}
            alt={person.name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
          />
        </div>
      ) : null}
      <div className="p-5 flex flex-col flex-1">
        {!person.image && (
          <div className="w-12 h-12 bg-surface-lighter rounded-full flex items-center justify-center font-serif text-text text-lg italic mx-auto mb-3">
            {person.name.split(' ')[0].charAt(0)}{person.name.includes('&') ? '' : person.name.split(' ').pop().charAt(0)}
          </div>
        )}
        <p className="font-medium text-[15px] text-text leading-tight group-hover:underline">{person.name}</p>
        <p className="text-xs text-text-muted mt-0.5">{person.company} &middot; '{person.year.slice(-2)}</p>
        <p className="text-sm text-text-muted mt-2 leading-relaxed flex-1">{person.description}</p>
      </div>
    </a>
  )
}

function StaggerGrid({ children, className }) {
  const [ref, isInView, getStyle] = useStagger(children.length)
  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <div key={i} className="flex" style={getStyle(i)}>{child}</div>
      ))}
    </div>
  )
}

// Timeline news card with dot
function TimelineNewsCard({ item, style, isLast }) {
  return (
    <div className="relative pl-8 sm:pl-10" style={style}>
      {/* Dot */}
      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-amber-600 bg-white z-10" />
      {/* Line */}
      {!isLast && (
        <div className="absolute left-[5px] top-4 bottom-0 w-0.5 bg-border" />
      )}
      <div className="pb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-medium uppercase tracking-widest text-amber-700">{item.tag}</span>
          <span className="text-text-muted">&middot;</span>
          <span className="text-[11px] text-text-muted">{item.date}</span>
        </div>
        <h3 className="font-serif text-[17px] text-text leading-snug mb-1">{item.title}</h3>
        <p className="text-sm text-text-muted leading-relaxed">{item.summary}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [newsRef, newsInView, getNewsStyle] = useStagger(NEWS.length, 100)

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="pt-10 sm:pt-20 text-center">
        <div className="relative inline-block">
          {/* Color splur — amber, centered on text, extends down */}
          <div
            className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[700px] sm:w-[1100px] sm:h-[1000px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 45% 35%, rgba(217,119,6,0.40) 0%, rgba(251,191,36,0.22) 25%, rgba(180,83,9,0.10) 50%, transparent 70%)',
              filter: 'blur(70px)',
            }}
          />
          <h1 className="font-serif tracking-[-2px] leading-[0.95] mb-5 relative">
            <AnimatedSection>
              <span className="block text-[28px] sm:text-[40px] tracking-[-1px]">Connolly Entrepreneurship</span>
            </AnimatedSection>
            <TextScramble
              text="Society"
              tag="em"
              className="block text-[56px] sm:text-[88px] tracking-[-3px] font-serif italic"
              style={{ color: '#b45309' }}
            />
          </h1>
        </div>

        <AnimatedSection delay={200}>
          <p className="text-text-muted text-base leading-relaxed max-w-[420px] mx-auto mb-8 mt-6">
            Student-run since 2010. Sharing contacts, discovering opportunities, and building the W&L entrepreneurship network.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            <Link
              to="/directory"
              className="magnetic-btn inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg text-sm font-medium no-underline min-h-[44px]"
            >
              Browse Directory
              <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
            <Link
              to="/add"
              className="magnetic-btn inline-flex items-center gap-2 bg-white text-accent px-6 py-3 rounded-lg text-sm font-medium no-underline min-h-[44px] shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.08)]"
            >
              Share a Contact
              <Plus size={14} strokeWidth={2.5} />
            </Link>
          </div>
        </AnimatedSection>

        {/* Hero images — no parallax, trigger early */}
        <AnimatedSection delay={0} eager>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {HERO_IMAGES.map((img, i) => (
              <div key={i} className="aspect-[4/3] bg-surface-lighter overflow-hidden rounded-xl img-zoom">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Marquee strip */}
      <AnimatedSection>
        <div className="py-4 border-y border-border">
          <Marquee
            speed={35}
            items={[
              'Forbes 30 Under 30',
              '$1.9B unicorn (Copado)',
              'Y Combinator alumni',
              '71 pitch teams at E-Summit',
              'TIME Best Inventions 2024',
              '$15M ARR bootstrapped (Spur)',
              '300+ Summit attendees',
              '25 active members',
            ]}
          />
        </div>
      </AnimatedSection>

      {/* Stats */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CES_STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      {/* Photo Gallery — clean 3-col grid, edge-to-edge images */}
      <section className="-mx-6">
        <div className="px-6 mb-8">
          <SectionHeader
            title="Life at CES"
            subtitle="Summits, pitch nights, innovation tours, and everything in between"
          />
        </div>
        <StaggerGrid className="grid grid-cols-2 sm:grid-cols-3 gap-0.5">
          {GALLERY_IMAGES.map((img, i) => (
            <div key={i} className="aspect-[4/3] overflow-hidden img-zoom bg-surface-lighter">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </StaggerGrid>
      </section>

      {/* News & Updates — timeline with decorative sides */}
      <section className="relative">
        <SectionHeader
          title="News & Updates"
          subtitle="What's happening at CES"
        />

        {/* Decorative side elements — colorful */}
        <div className="hidden lg:block absolute left-0 top-24 bottom-0 w-[140px] pointer-events-none select-none" aria-hidden="true">
          <div className="sticky top-32 space-y-5">
            <div className="w-16 h-16 rounded-full ml-4 opacity-[0.18]" style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }} />
            <div className="w-10 h-10 ml-14 opacity-[0.14]" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', transform: 'rotate(45deg)' }} />
            <div className="w-20 h-1.5 ml-2 rounded-full opacity-[0.15]" style={{ background: 'linear-gradient(90deg, #f59e0b, transparent)' }} />
            <div className="w-9 h-9 rounded-full ml-10 opacity-[0.12]" style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)' }} />
            <div className="w-14 h-14 ml-1 rounded-lg opacity-[0.14]" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }} />
            <div className="w-12 h-1.5 ml-8 rounded-full opacity-[0.12]" style={{ background: 'linear-gradient(90deg, #8b5cf6, transparent)' }} />
            <div className="w-7 h-7 rounded-full ml-16 opacity-[0.16]" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }} />
          </div>
        </div>
        <div className="hidden lg:block absolute right-0 top-24 bottom-0 w-[140px] pointer-events-none select-none" aria-hidden="true">
          <div className="sticky top-40 space-y-5 flex flex-col items-end pr-4">
            <div className="w-11 h-11 mr-2 opacity-[0.14]" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', transform: 'rotate(15deg)', borderRadius: '4px' }} />
            <div className="w-16 h-16 rounded-full mr-6 opacity-[0.16]" style={{ background: 'linear-gradient(135deg, #06b6d4, #10b981)' }} />
            <div className="w-16 h-1.5 mr-3 rounded-full opacity-[0.13]" style={{ background: 'linear-gradient(90deg, transparent, #f59e0b)' }} />
            <div className="w-9 h-9 mr-10 opacity-[0.14]" style={{ background: 'linear-gradient(135deg, #f97316, #f59e0b)', transform: 'rotate(45deg)' }} />
            <div className="w-20 h-20 rounded-full mr-1 opacity-[0.12]" style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }} />
            <div className="w-10 h-1.5 mr-8 rounded-full opacity-[0.15]" style={{ background: 'linear-gradient(90deg, transparent, #06b6d4)' }} />
            <div className="w-8 h-8 rounded-full mr-14 opacity-[0.16]" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }} />
          </div>
        </div>

        <div ref={newsRef} className="max-w-[560px] mx-auto">
          {NEWS.map((item, i) => (
            <TimelineNewsCard
              key={item.id}
              item={item}
              style={getNewsStyle(i)}
              isLast={i === NEWS.length - 1}
            />
          ))}
        </div>
      </section>

      {/* Alumni Businesses */}
      <section>
        <SectionHeader
          title="Alumni Businesses"
          subtitle="Companies built by W&L entrepreneurs"
        />
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CES_BUSINESSES.map((biz) => (
            <BusinessCard key={biz.name} biz={biz} />
          ))}
        </StaggerGrid>
      </section>

      {/* EIR Program */}
      <AnimatedSection>
        <SectionHeader
          title="Entrepreneurs-in-Residence"
          subtitle="Alumni who visit campus for multi-day mentorship residencies"
        />
        <div className="max-w-[600px] mx-auto">
          <div className="space-y-0 border border-border rounded-xl overflow-hidden">
            {EIR_RESIDENTS.map((eir, i) => (
              <div
                key={eir.name}
                className={`flex items-center justify-between px-5 py-3.5 hover:bg-surface-light transition-colors ${i < EIR_RESIDENTS.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div>
                  <p className="text-sm font-medium text-text">{eir.name}</p>
                  <p className="text-xs text-text-muted">{eir.company}</p>
                </div>
                <p className="text-xs text-text-muted shrink-0 ml-4">{eir.date}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-text-muted text-center mt-3">
            Program rebooted 2024-25 &middot; Directed by Jay Margalus, Johnson Professor of Entrepreneurship
          </p>
        </div>
      </AnimatedSection>

      {/* Instagram */}
      <section className="-mx-6">
        <div className="px-6">
          <SectionHeader
            title="From Our Instagram"
            subtitle="@wlu_ces"
            action={
              <a
                href="https://instagram.com/wlu_ces"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text no-underline"
                aria-label="Follow @wlu_ces on Instagram"
              >
                <InstagramIcon size={16} />
                Follow
                <ExternalLink size={12} strokeWidth={2} />
              </a>
            }
          />
        </div>
        <AnimatedSection>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-0.5">
            {INSTAGRAM_POSTS.map((post) => (
              <a
                key={post.id}
                href="https://instagram.com/wlu_ces"
                target="_blank"
                rel="noopener noreferrer"
                className="group block aspect-square overflow-hidden relative bg-surface-lighter img-zoom"
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
                  <p className="text-white text-[11px] leading-snug drop-shadow-sm">
                    {post.caption}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </AnimatedSection>
        <div className="flex items-center justify-center gap-2 mt-4 px-6">
          <a
            href="https://instagram.com/wlu_ces"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-text hover:underline no-underline font-medium min-h-[44px]"
          >
            <InstagramIcon size={18} />
            @wlu_ces
          </a>
          <span className="text-text-muted text-xs">&middot; 413 followers</span>
        </div>
      </section>

      {/* Alumni Spotlight */}
      <section>
        <SectionHeader
          title="Alumni Spotlight"
          subtitle="What CES alumni are building"
          action={
            <Link
              to="/directory"
              className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text no-underline"
            >
              View all <ArrowUpRight size={12} strokeWidth={2} />
            </Link>
          }
        />
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ALUMNI_SPOTLIGHT.map((person) => (
            <AlumniCard key={person.name} person={person} />
          ))}
        </StaggerGrid>
      </section>

      {/* CTA */}
      <AnimatedSection>
        <section className="bg-surface-light rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="font-serif text-[24px] sm:text-[28px] tracking-[-0.5px] mb-2">
            Know someone who can <em>help</em>?
          </h2>
          <p className="text-sm text-text-muted mb-6 max-w-[420px] mx-auto">
            Every connection shared makes the CES network stronger. Add an alumni contact, mentor, or industry professional.
          </p>
          <Link
            to="/add"
            className="magnetic-btn inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg text-sm font-medium no-underline min-h-[44px]"
          >
            Add a Contact
            <ArrowRight size={14} strokeWidth={2.5} />
          </Link>
        </section>
      </AnimatedSection>
    </div>
  )
}
