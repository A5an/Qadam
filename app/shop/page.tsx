'use client'
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface ShopItem {
  id: number
  name: string
  description: string
  price: number
  company?: string
}

export default function Shop() {
  const { toast } = useToast()
  const [userCoins, setUserCoins] = useState(100) // Assume the user starts with 500 coins
  const router = useRouter()

  const shopItems: ShopItem[] = [
    { id: 1, name: "SAT and IELTS crash course", description: "Comprehensive course covering SAT and IELTS", price: 100, company: "Smartestprep" },
    { id: 2, name: "Physics Fundamentals", description: "In-depth course on basic physics principles", price: 80, company: "ScienceGurus" },
    { id: 3, name: "Chemistry Lab Techniques", description: "Hands-on course for mastering chemistry lab skills", price: 120, company: "LabMasters" },
    { id: 4, name: "Programming Basics", description: "Introduction to programming concepts and languages", price: 90, company: "CodeCrafters" },
    { id: 5, name: "Data Science Essentials", description: "Learn the foundations of data science and analytics", price: 150, company: "DataMinds" },
  ]

  const handlePurchase = (item: ShopItem) => {
    if (userCoins >= item.price) {
      setUserCoins(prevCoins => prevCoins - item.price)
      toast({
        title: "Purchase Successful",
        description: `You have purchased ${item.name} for ${item.price} QadamCoins.`,
      })
    } else {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough QadamCoins to make this purchase.",
        variant: "destructive",
      })
    }
  }

  const handleGoBack = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background text-foreground dark p-4">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={handleGoBack} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Вернуться обратно
        </Button>
        <h1 className="text-2xl font-bold">Shop</h1>
        <Button variant="outline" size="default">
          <Image src="/coin.png" alt="Coin" width={24} height={24} className="mr-2" />
          {userCoins}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shopItems.map((item) => (
          <Card key={item.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{item.description}</p>
              {item.company && <p className="mt-2 text-sm text-muted-foreground">By {item.company}</p>}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center">
                <Image src="/coin.png" alt="Coin" width={20} height={20} className="mr-1" />
                <span>{item.price}</span>
              </div>
              <Button onClick={() => handlePurchase(item) } style={{borderRadius: '8px'}}>Buy</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}