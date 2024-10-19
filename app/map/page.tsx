import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Map = dynamic(() => import('./Map'), { 
  ssr: false,
  loading: () => <p>Loading map...</p>
})

export default function MapPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground dark">
      <main className="flex-grow z-50">
        <Suspense fallback={<div>Loading...</div>}>
          <Map />
        </Suspense>
      </main>
    </div>
  )
}