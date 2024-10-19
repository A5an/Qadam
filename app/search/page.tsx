'use client'
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";

interface ShopItem {
  id: number;
  name: string;
  description: string;
  company: string;
}

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const shopItems: ShopItem[] = [
    { id: 1, name: "SAT and IELTS crash course", description: "Comprehensive course covering SAT and IELTS", company: "Smartestprep" },
    { id: 2, name: "Physics Fundamentals", description: "In-depth course on basic physics principles", company: "ScienceGurus" },
    { id: 3, name: "Chemistry Lab Techniques", description: "Hands-on course for mastering chemistry lab skills", company: "LabMasters" },
    { id: 4, name: "Programming Basics", description: "Introduction to programming concepts and languages", company: "CodeCrafters" },
    { id: 5, name: "Data Science Essentials", description: "Learn the foundations of data science and analytics", company: "DataMinds" },
  ];

  const filteredCourses = shopItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-6">Explore Courses</h1>
        
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <Card key={course.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <h3 className="font-medium text-lg">{course.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{course.company}</p>
                    <p className="text-sm text-gray-600 mt-2">{course.description}</p>
                  </div>
                  <Button variant="outline" className="ml-4 flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;