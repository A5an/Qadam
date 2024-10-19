'use client'

import { useParams, useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'

interface Lesson {
  number: number;
  title: string;
  description: string;
}

export default function SubjectPage() {
  const params = useParams()
  const router = useRouter()
  const subjectId = params.id as string

  const lessons: Lesson[] = [
    {
      number: 1,
      title: "Основные тригонометрические функции",
      description: "Изучение синуса, косинуса и тангенса"
    },
    {
      number: 2,
      title: "Тригонометрический круг",
      description: "Понимание единичной окружности и радиан"
    },
    {
      number: 3,
      title: "Тригонометрические тождества",
      description: "Основные тождества и формулы сложения"
    }
  ]

  const handleLessonClick = (lessonNumber: number) => {
    router.push(`/subjects/${subjectId}/lessons/${lessonNumber}`)
  }

  return (
    <div className="min-h-screen p-4 bg-background text-foreground dark">
      <div className="flex justify-between items-center mb-4">
        <Link href="/">
          <Button variant="outline">← Назад к предметам</Button>
        </Link>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            <h1 className="text-xl font-bold">Предмет: {decodeURIComponent(subjectId)}</h1>
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="theory" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="theory">Теория</TabsTrigger>
          <TabsTrigger value="practice">Практика</TabsTrigger>
        </TabsList>
        
        <TabsContent value="theory">
          {lessons.map((lesson) => (
            <Card 
              key={lesson.number} 
              className="mb-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleLessonClick(lesson.number)}
            >
              <CardHeader>
                <CardTitle>Урок {lesson.number}: {lesson.title}</CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle>Практические задания</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Здесь будут отображаться практические задания по всем урокам.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}