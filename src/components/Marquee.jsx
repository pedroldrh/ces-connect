export default function Marquee({ items, speed = 30 }) {
  const content = [...items, ...items]

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className="inline-flex animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {content.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-6 text-sm text-text-muted">
            <span className="w-1 h-1 bg-text-muted/30 rounded-full shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
