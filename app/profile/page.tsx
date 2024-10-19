'use client'
import React, { useState, useEffect } from 'react';
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import Image from 'next/image';

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

const taskData = [
  { task: "Common", count: 45, fill: "#f97316" },
  { task: "Uncommon", count: 30, fill: "#a855f7" },
  { task: "Rare", count: 15, fill: "#22c55e" },
  { task: "Legendary", count: 10, fill: "#6b7280" },
];

const chartConfig = {
  count: { label: "Задачи" },
  Common: { label: "Common", color: "#f97316" },
  Uncommon: { label: "Uncommon", color: "#a855f7" },
  Rare: { label: "Rare", color: "#22c55e" },
  Legendary: { label: "Legendary", color: "#6b7280" },
} satisfies ChartConfig;

const SearchPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [energy] = useState(100);
  const [qadamCoins] = useState(100);

  const totalTasks = React.useMemo(() => {
    return taskData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    
    const initWebApp = async () => {
      if (typeof window !== "undefined") {
        const WebApp = (await import('@twa-dev/sdk')).default;
        if (WebApp.initDataUnsafe.user) {
          const user = WebApp.initDataUnsafe.user as UserData;
          setUserData(user);
        }
      }
    };

    initWebApp();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Статистика</h1>
        <div className="flex space-x-2 items-center">
          <Button variant="outline" size="default">
            <Image src="/coin.png" alt="Coin" width={24} height={24} className="mr-2" />
            {qadamCoins} QadamCoins
          </Button>
          <Button variant="outline" size="default">
            <Zap className="w-4 h-4 mr-2" />
            {energy}
          </Button>
        </div>
      </header>

      <main className="p-4 grid gap-6 md:grid-cols-2">
        {userData ? (
          <Card>
            <CardHeader>
              <CardTitle>Профиль пользователя</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Имя: {userData.first_name} {userData.last_name}</p>
              <p>Никнейм: {userData.username}</p>
              <p>QadamCoins: {qadamCoins}</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Профиль</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Данные недоступны</p>
            </CardContent>
          </Card>
        )}

        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Прогресс решения задач</CardTitle>
            <CardDescription>Общая статистика</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={taskData}
                  dataKey="count"
                  nameKey="task"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalTasks}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Задач
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#f97316]"></div>
                <span>Common</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#a855f7]"></div>
                <span>Uncommon</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
                <span>Rare</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#6b7280]"></div>
                <span>Legendary</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default SearchPage;