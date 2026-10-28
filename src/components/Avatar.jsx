// A photo, or initials when the file isn't there yet.
export default function Avatar({ name, photo, size = 56 }) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div className="relative shrink-0 overflow-hidden rounded-2xl bg-pit-700 text-pit-100 grid place-items-center font-bold" style={{ width: size, height: size }}>
      <span>{initials}</span>
      {photo && <img src={photo} alt={name} className="absolute inset-0 h-full w-full object-cover" onError={(e) => { e.currentTarget.remove() }} />}
    </div>
  )
}
