'use client' 
 
import { useParams, useSearchParams } from 'next/navigation' 
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card" 
import { Button } from "@/components/ui/button" 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" 
import Link from 'next/link' 
 
export default function SubjectPage() { 
  const params = useParams() 
  const searchParams = useSearchParams() 
  const subjectId = params.id 
  const subjectName = searchParams.get('name') 
 
  return ( 
    <div className="min-h-screen p-4 bg-background text-foreground dark"> 
      <div className="flex justify-between items-center mb-4"> 
        <Link href="/"> 
          <Button variant="outline">← Обратно</Button> 
        </Link> 
        
      </div> 
       
      <Card> 
        <CardHeader> 
          <CardTitle>{subjectName && ( 
          <h1 className="text-xl font-bold">{decodeURIComponent(subjectName)}</h1> 
        )} </CardTitle> 
        </CardHeader> 
        <CardContent> 
          <Tabs defaultValue="theory" className="w-full"> 
            <TabsList className="grid w-full grid-cols-2"> 
              <TabsTrigger value="theory">Теория</TabsTrigger> 
              <TabsTrigger value="practice">Практика</TabsTrigger> 
            </TabsList> 
            <TabsContent value="theory"> 
              <Card> 
                <CardHeader> 
                  <CardTitle>Теория</CardTitle> 
                </CardHeader> 
                <CardContent> 
                  <p>Здесь будет отображаться теоретический материал по предмету.</p> 
                </CardContent> 
              </Card> 
            </TabsContent> 
            <TabsContent value="practice"> 
              <Card> 
                <CardHeader> 
                  <CardTitle>Практика</CardTitle> 
                </CardHeader> 
                <CardContent> 
                  <p>Здесь будут отображаться практические задания и упражнения.</p> 
                </CardContent> 
              </Card> 
            </TabsContent> 
          </Tabs> 
        </CardContent> 
      </Card> 
    </div> 
  ) 
}