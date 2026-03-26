import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'

const ARTICLES = [
  {
    id: 'comparing-yourself',
    title: 'Comparing Yourself',
    date: 'Mar 2026',
    readTime: '4 min read',
    excerpt: 'Why the entrepreneurial journey is uniquely yours — and why measuring your chapter 1 against someone else\'s chapter 20 will always be a losing game.',
    content: [
      'It\'s easy to scroll through LinkedIn and feel like everyone around you is crushing it — raising rounds, launching products, getting featured. But what you\'re seeing is a highlight reel, not the full story.',
      'Every founder I\'ve met through CES has a version of this: the late nights that didn\'t make the pitch deck, the pivots no one posted about, the moments of genuine doubt. Comparison strips all of that away and leaves you measuring your behind-the-scenes against someone else\'s front stage.',
      'The antidote isn\'t to stop paying attention. It\'s to use what you see as fuel, not as a verdict. Ask "what can I learn from that?" instead of "why am I not there yet?" The timelines are different. The starting points are different. The goals should be different.',
      'At W&L, I\'ve watched classmates build things at completely different paces — and the ones who stuck with their own path, who stayed honest about what they actually wanted, are the ones doing the most interesting work today.',
      'Your only real competition is who you were last semester. Keep building.',
    ],
  },
  {
    id: 'life-is-precious',
    title: 'Life is Precious',
    date: 'Feb 2026',
    readTime: '3 min read',
    excerpt: 'A reflection on urgency, gratitude, and why building something meaningful matters more than building something big.',
    content: [
      'There\'s a quote I keep coming back to: "The days are long but the years are short." College makes this painfully obvious. One moment you\'re a freshman figuring out where Evans Dining Hall is, and the next you\'re walking across the Colonnade for the last time.',
      'That compression of time changes how you think about what\'s worth doing. Not everything needs to be a startup. Not everything needs to scale. But everything you choose to spend time on should matter to you — genuinely, not performatively.',
      'I think about this when I see people chasing things they don\'t actually care about, just because the path looks impressive from the outside. Life is too short and too uncertain for that.',
      'Build things that make you feel alive. Work with people who make you better. Say the thing you\'ve been meaning to say. The window is smaller than you think, and that\'s not a reason to panic — it\'s a reason to be intentional.',
      'Precious doesn\'t mean fragile. It means valuable. Treat it that way.',
    ],
  },
  {
    id: 'hope-for-the-future',
    title: 'Hope for the Future',
    date: 'Jan 2026',
    readTime: '5 min read',
    excerpt: 'What being part of the CES community taught me about optimism, agency, and why the next generation of builders has every reason to be hopeful.',
    content: [
      'It\'s fashionable to be cynical right now. The economy is uncertain, AI is reshaping entire industries overnight, and the news cycle is exhausting. But I\'ve never been more optimistic — and it\'s because of the people I\'ve been surrounded by.',
      'Through CES, I\'ve met alumni who started companies in recessions, who pivoted when their industries disappeared, who built something from nothing because they saw a problem worth solving. That pattern — seeing a problem and choosing to act — is the most hopeful thing I know.',
      'The tools available to our generation are staggering. You can build a product, reach customers, and iterate in weeks instead of years. You can learn from people across the world without leaving Lexington. The barriers to starting have never been lower.',
      'That doesn\'t mean it\'s easy. It means the bottleneck has shifted from access to action. The question isn\'t "can I build this?" anymore — it\'s "will I?"',
      'I believe the answer, for the people in this community, is yes. I\'ve seen it in the pitch competitions, in the late-night whiteboard sessions, in the DMs that turn into partnerships. The future isn\'t something that happens to us. It\'s something we build.',
      'And if you\'re reading this and feeling uncertain about your own path — good. Uncertainty means you\'re at the edge of something new. That\'s exactly where the interesting stuff happens.',
    ],
  },
]

export default function Thoughts() {
  const [activeArticle, setActiveArticle] = useState(null)

  if (activeArticle) {
    const article = ARTICLES.find((a) => a.id === activeArticle)
    return (
      <div className="max-w-[640px] mx-auto">
        <AnimatedSection>
          <button
            onClick={() => setActiveArticle(null)}
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text mb-8 transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to all
          </button>

          <article>
            <header className="mb-8">
              <p className="text-xs text-text-muted uppercase tracking-widest mb-2">
                {article.date} &middot; {article.readTime}
              </p>
              <h1 className="font-serif text-[32px] sm:text-[40px] tracking-[-1px] leading-tight">
                {article.title}
              </h1>
            </header>

            <div className="space-y-5">
              {article.content.map((paragraph, i) => (
                <p key={i} className="text-[15px] sm:text-base text-text-muted leading-[1.8]">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </AnimatedSection>
      </div>
    )
  }

  return (
    <div className="max-w-[640px] mx-auto">
      <AnimatedSection>
        <div className="text-center mb-12">
          <h1 className="font-serif text-[32px] sm:text-[40px] tracking-[-1px] leading-tight mb-2">
            Thoughts
          </h1>
          <p className="text-sm text-text-muted">Essays on building, life, and the entrepreneurial journey.</p>
        </div>
      </AnimatedSection>

      <div className="space-y-0 border border-border rounded-xl overflow-hidden">
        {ARTICLES.map((article, i) => (
          <AnimatedSection key={article.id} delay={i * 80}>
            <button
              onClick={() => setActiveArticle(article.id)}
              className={`w-full text-left px-6 py-5 hover:bg-surface-light transition-colors flex items-center justify-between gap-4 ${
                i < ARTICLES.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-muted mb-1">
                  {article.date} &middot; {article.readTime}
                </p>
                <h2 className="font-serif text-[18px] sm:text-[20px] tracking-[-0.3px] text-text leading-snug mb-1">
                  {article.title}
                </h2>
                <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
              <ChevronRight size={16} className="text-text-muted shrink-0" />
            </button>
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}
