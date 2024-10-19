'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Link from 'next/link'

interface Lesson {
  number: number;
  title: string;
  description: string;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export default function SubjectPage() {
  const params = useParams()
  const router = useRouter()
  const subjectId = params.id as string
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({})
  const [showResults, setShowResults] = useState<{[key: number]: boolean}>({})

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

  const questions: Question[] = [
    {
      id: 1,
      text: "Чему равен sin(30°)?",
      options: ["1/2", "√3/2", "√2/2", "1"],
      correctAnswer: 0
    },
    {
      id: 2,
      text: "Какое из следующих выражений равно cos(A + B)?",
      options: [
        "cosA cosB - sinA sinB",
        "cosA cosB + sinA sinB",
        "sinA cosB + cosA sinB",
        "sinA cosB - cosA sinB"
      ],
      correctAnswer: 0
    },
    {
      id: 3,
      text: "Чему равен период функции y = sin(2x)?",
      options: ["π", "2π", "π/2", "4π"],
      correctAnswer: 1
    }
  ]

  const handleLessonClick = (lessonNumber: number) => {
    router.push(`/subjects/${subjectId}/lessons/${lessonNumber}`)
  }

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({...prev, [questionId]: answerIndex}))
    setShowResults(prev => ({...prev, [questionId]: false}))
  }

  const handleCheck = (questionId: number) => {
    setShowResults(prev => ({...prev, [questionId]: true}))
  }

  const calculateScore = () => {
    return questions.reduce((score, question) => {
      return score + (selectedAnswers[question.id] === question.correctAnswer ? 1 : 0)
    }, 0)
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
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Тестовые вопросы по тригонометрии</CardTitle>
              <CardDescription>Свайпайте, чтобы увидеть все вопросы. Выберите ответ и нажмите &quot;Проверить&quot; для каждого вопроса.</CardDescription>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {questions.map((question) => (
                    <CarouselItem key={question.id}>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">{question.text}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <RadioGroup
                            onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
                            value={selectedAnswers[question.id]?.toString()}
                          >
                            {question.options.map((option, index) => (
                              <div key={index} className="flex items-center space-x-2 mb-2">
                                <RadioGroupItem value={index.toString()} id={`q${question.id}-a${index}`} />
                                <Label htmlFor={`q${question.id}-a${index}`}>{option}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <Button 
                            onClick={() => handleCheck(question.id)} 
                            className="mt-4 w-full"
                            disabled={showResults[question.id]}
                          >
                            Проверить
                          </Button>
                        </CardContent>
                        {showResults[question.id] && (
                          <CardFooter>
                            {selectedAnswers[question.id] === question.correctAnswer ? (
                              <p className="text-green-500">Правильно!</p>
                            ) : (
                              <p className="text-red-500">Неправильно. Правильный ответ: {question.options[question.correctAnswer]}</p>
                            )}
                          </CardFooter>
                        )}
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <Card className="mt-4">
                <CardContent>
                  <p className="font-bold text-center">Ваш результат: {calculateScore()} из {questions.length}</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}