export default function Marquee({ items, speed = 30 }) {
  const content = [...items, ...items]

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className="inline-flex animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {content.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-6 text-sm text-text-muted shrink-0">
            <span className="w-1 h-1 bg-text-muted/30 rounded-full shrink-0" />
            {item.icon && (
              <img src={item.icon} alt="" className="h-5 w-5 object-contain shrink-0" loading="lazy" />
            )}
            {item.emoji && (
              <span className="text-base leading-none">{item.emoji}</span>
            )}
            <span>{item.text || item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
