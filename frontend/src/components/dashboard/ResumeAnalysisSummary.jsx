"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, BarChart2 } from "lucide-react";

export function ResumeAnalysisSummary() {
  const strengths = ["React.js", "Node.js", "Express.js", "RESTful APIs", "Database Design"];
  const weaknesses = ["TypeScript", "Unit Testing", "Cloud Deployment (AWS/Azure)", "CI/CD"];

  const scoreBreakdown = [
    { label: "Technical Skills", score: 40, color: "#f8a4a8" },
    { label: "Soft Skills", score: 20, color: "#a78bfa" },
    { label: "Experience", score: 25, color: "#e9d5ff" },
    { label: "Formatting", score: 15, color: "#d1d5db" },
  ];

  return (
    <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold">Resume Analysis Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Technical Strengths
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" /> Weak Areas
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {weaknesses.map((weakness, index) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart2 className="h-5 w-5 text-gray-700 mr-2" /> Resume Score Breakdown
          </h3>
          <div className="space-y-4">
            {scoreBreakdown.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>{item.label}</span>
                  <span>{item.score}%</span>
                </div>
                <Progress
                  value={item.score}
                  className="h-2"
                  style={{ "--progress-color": item.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
