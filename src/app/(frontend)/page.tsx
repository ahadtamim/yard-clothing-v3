export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Yard Clothing</h1>
      <p>Site is connecting to database...</p>
      <a href="/admin" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go to Admin Panel to set up the store
      </a>
    </div>
  )
}