'use client'
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import Image from 'next/image'

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

const getProgressClass = (percentage: number): string => {
  if (percentage <= 20) return 'progress-red'
  if (percentage <= 40) return 'progress-orange'
  if (percentage <= 60) return 'progress-yellow'
  if (percentage <= 80) return 'progress-lime'
  return 'progress-green'
}

export default function Home() {

  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [energy] = useState(100)
  const [coins] = useState(500)
  const [activeCard, setActiveCard] = useState<number | null>(null)
  
  const subjects: Subject[] = [
    { id: 1, name: "Тригонометрия", progress: 100, total: 500 },
    { id: 2, name: "Пофигистика", progress: 200, total: 500 },
    { id: 3, name: "Математический анализ", progress: 300, total: 500 },
    { id: 4, name: "Алгебра", progress: 400, total: 500 },
    { id: 5, name: "Геометрия", progress: 500, total: 500 },
    { id: 6, name: "Статистика", progress: 100, total: 500 },
    { id: 7, name: "Дискретная математика", progress: 100, total: 500 },
  ]

  const handleCardClick = (id: number, name: string) => {
    setActiveCard(activeCard === id ? null : id)
    router.push(`/subjects/${id}?name=${encodeURIComponent(name)}`)
  }

  useEffect(() => {
    document.documentElement.classList.add('dark')
     
    const initWebApp = async () => {
      if (typeof window !== "undefined") {
        const WebApp = (await import('@twa-dev/sdk')).default
        if (WebApp.initDataUnsafe.user) {
          setUserData(WebApp.initDataUnsafe.user as UserData)
        }
      }
    }
  
    initWebApp()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground dark">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Ваше обучение</h1>
        <div className="flex space-x-2 items-center">
    <div className=" flex items-center">
      <Button variant="outline" size="default">
      <Image src="/coin.png" alt="Coin" width={24} height={24} className="mr-2" />
        {coins}
      </Button>
    </div>
    <div className=" flex items-center">
    <Button variant="outline" size="default">
      <Zap className="w-4 h-4 mr-2" />
      {energy}
    </Button>
    </div>
  </div>
      </header>
      <main className="p-4 flex-grow">
        {subjects.map((subject) => {
          const percentage = (subject.progress / subject.total) * 100
          const progressClass = getProgressClass(percentage)
          
          return (
            <Card
              key={subject.id}
              className={`w-full mb-4 transition-all duration-300 ease-in-out cursor-pointer
                ${activeCard === subject.id ? 'ring-2 ring-primary scale-105' : 'hover:shadow-lg hover:scale-[1.02]'}
              `}
              style={{
                transform: activeCard === subject.id ? 'translateY(-4px)' : 'none',
              }}
              onClick={() => handleCardClick(subject.id, subject.name)}
            >
              <CardHeader>
                <CardTitle>{subject.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={percentage} 
                  className={`w-full ${progressClass}`}
                />
                <p className="text-sm text-muted-foreground mt-2">{subject.progress}/{subject.total}</p>
              </CardContent>
            </Card>
          )
        })}
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