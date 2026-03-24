export default function Marquee({ items, speed = 30 }) {
  const content = [...items, ...items]

  return (
    <div className="overflow-hidden whitespace-nowrap relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-surface-light/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-surface-light/90 to-transparent z-10 pointer-events-none" />

      <div
        className="inline-flex animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {content.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2.5 px-5 shrink-0">
            {item.icon && (
              <img src={item.icon} alt="" className="h-5 w-5 rounded-sm object-contain shrink-0" loading="lazy" />
            )}
            {item.emoji && (
              <span className="text-sm leading-none">{item.emoji}</span>
            )}
            <span className="text-[13px] font-medium text-text/70">{item.text || item}</span>
            <span className="text-text-muted/20 ml-3">|</span>
          </span>
        ))}
      </div>
    </div>
  )
}
