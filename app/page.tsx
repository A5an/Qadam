'use client'

import { useState, useEffect } from "react"
import WebApp from "@twa-dev/sdk"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

interface UserData {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
}

interface Subject {
  id: number
  name: string
  progress: number
  total: number
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [energy] = useState(100)
  const [coins] = useState(500)
  const [activeCard, setActiveCard] = useState<number | null>(null)

  const subjects: Subject[] = [
    { id: 1, name: "Тригонометрия", progress: 100, total: 500 },
    { id: 2, name: "Пофигистика", progress: 100, total: 500 },
    { id: 3, name: "Математический анализ", progress: 100, total: 500 },
    { id: 4, name: "Алгебра", progress: 100, total: 500 },
    { id: 5, name: "Геометрия", progress: 100, total: 500 },
    { id: 6, name: "Статистика", progress: 100, total: 500 },
    { id: 7, name: "Дискретная математика", progress: 100, total: 500 },
  ]

  useEffect(() => {
    // Force dark theme
    document.documentElement.classList.add('dark')
    
    if (WebApp.initDataUnsafe.user && typeof window !== "undefined" && typeof window !== undefined) {
      setUserData(WebApp.initDataUnsafe.user as UserData)
    }
  }, [])

  const handleCardClick = (id: number) => {
    setActiveCard(activeCard === id ? null : id)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground dark">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ваше обучение</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            {coins}
          </Button>
          <Button variant="outline" size="sm">
            <Zap className="w-4 h-4 mr-2" />
            {energy}
          </Button>
        </div>
      </header>
      <main className="p-4 flex-grow">
        {subjects.map((subject) => (
          <Card 
            key={subject.id} 
            className={`w-full mb-4 transition-all duration-300 ease-in-out cursor-pointer
              ${activeCard === subject.id ? 'ring-2 ring-primary scale-105' : 'hover:shadow-lg hover:scale-[1.02]'}
            `}
            style={{
              transform: activeCard === subject.id ? 'translateY(-4px)' : 'none',
            }}
            onClick={() => handleCardClick(subject.id)}
          >
            <CardHeader>
              <CardTitle>{subject.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={(subject.progress / subject.total) * 100} className="w-full" />
              <p className="text-sm text-muted-foreground mt-2">{subject.progress}/{subject.total}</p>
            </CardContent>
          </Card>
        ))}
        {userData ? (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Name: {userData.first_name} {userData.last_name}</p>
                <p>Username: {userData.username}</p>
                <p>Language: {userData.language_code}</p>
                <p>Premium: {userData.is_premium ? 'Yes' : 'No'}</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>User</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No user data available</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}