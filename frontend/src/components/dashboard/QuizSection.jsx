"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Brain, RefreshCw, BarChart2 } from "lucide-react";

export function QuizSection() {
  const quizPerformanceData = [
    { topic: "React", score: 75 },
    { topic: "Node.js", score: 68 },
    { topic: "MongoDB", score: 80 },
    { topic: "Express", score: 72 },
    { topic: "TypeScript", score: 60 },
  ];

  const quizProgressOverTime = [
    { date: "Jan", score: 55 },
    { date: "Feb", score: 60 },
    { date: "Mar", score: 65 },
    { date: "Apr", score: 70 },
    { date: "May", score: 75 },
    { date: "Jun", score: 78 },
  ];

  return (
    <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold">Quiz Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Brain className="h-5 w-5 text-[#f8a4a8] mr-2" /> Last Quiz Taken
          </h3>
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md mb-4">
            <p className="text-lg font-medium">MERN Stack Fundamentals Quiz</p>
            <p className="text-gray-600">
              Score: <span className="font-bold text-[#a78bfa]">72%</span>
            </p>
            <p className="text-sm text-gray-500">Taken on: July 20, 2025</p>
          </div>
          <Button className="rounded-full bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] hover:opacity-90">
            <RefreshCw className="mr-2 h-4 w-4" /> Retake Quiz
          </Button>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart2 className="h-5 w-5 text-[#a78bfa] mr-2" /> Performance Graph (Over Time)
          </h3>
          <div className="h-[250px] bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md">
            <ChartContainer
              config={{
                score: {
                  label: "Score",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={quizProgressOverTime}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={3}
                    dot={{
                      fill: "hsl(var(--chart-1))",
                      strokeWidth: 2,
                      r: 4,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
