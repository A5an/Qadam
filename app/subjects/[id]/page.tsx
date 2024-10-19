'use client'

import { useParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function SubjectPage() {
  const params = useParams()
  const subjectId = params.id

  return (
    <div className="min-h-screen p-4 bg-background text-foreground dark">
      <div className="mb-4">
        <Link href="/">
          <Button variant="outline">← Back to subjects</Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Subject {subjectId}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add your subject-specific content here */}
          <p>Content for subject {subjectId}</p>
        </CardContent>
      </Card>
    </div>
  )
}