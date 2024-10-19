'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { Label } from "@/components/ui/label"

export default function CreateCourse() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      setError("Пожалуйста, введите название курса")
      return
    }

    if (description.split(/\s+/).length > 150) {
      setError("Описание не должно превышать 150 слов")
      return
    }
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => router.push('/')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Назад
      </Button>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Создание нового курса
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Название курса</Label>
              <Input
                id="name"
                placeholder="Введите название курса"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Краткое описание (до 150 слов)
              </Label>
              <Textarea
                id="description"
                placeholder="Введите описание курса"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                className="w-full min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground">
                {description.split(/\s+/).filter(Boolean).length} / 150 слов
              </p>
            </div>

            {error && (
              <p className="text-destructive text-sm">{error}</p>
            )}

            <Button 
              type="submit" 
              className="w-full"
            >
              Создать курс
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}