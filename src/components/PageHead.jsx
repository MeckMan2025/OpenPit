export default function PageHead({ eyebrow, title, children }) {
  return (
    <div className="mb-8 max-w-3xl">
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
      {children && <p className="mt-3 text-ink-600 leading-relaxed">{children}</p>}
    </div>
  )
}
