import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Award, BookOpen, MessageSquare } from "lucide-react";

export function ProgressTracker() {
  const progressItems = [
    {
      area: "Resume Strength",
      score: 75,
      status: "Good",
      lastUpdated: "July 24, 2025",
      icon: <FileText className="h-6 w-6 text-[#f8a4a8]" />,
      color: "#f8a4a8",
    },
    {
      area: "Quiz Performance",
      score: 60,
      status: "Moderate",
      lastUpdated: "July 24, 2025",
      icon: <Award className="h-6 w-6 text-[#a78bfa]" />,
      color: "#a78bfa",
    },
    {
      area: "Technical Knowledge",
      score: 50,
      status: "Needs Work",
      lastUpdated: "July 23, 2025",
      icon: <BookOpen className="h-6 w-6 text-[#e9d5ff]" />,
      color: "#e9d5ff",
    },
    {
      area: "Communication Skills",
      score: 80,
      status: "Strong",
      lastUpdated: "July 24, 2025",
      icon: <MessageSquare className="h-6 w-6 text-[#d1d5db]" />,
      color: "#d1d5db",
    },
  ];

  return (
    <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold">Progress Tracker</CardTitle>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {progressItems.map((item, index) => (
          <div key={index} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm mr-3">
                {item.icon}
              </div>
              <h4 className="font-semibold text-lg">{item.area}</h4>
            </div>
            <div className="mb-2">
              <span className="text-2xl font-bold" style={{ color: item.color }}>
                {item.score}%
              </span>
              <span className="text-sm text-gray-500 ml-1">{item.status}</span>
            </div>
            <Progress
              value={item.score}
              className="h-2 mb-2"
              style={{ "--progress-color": item.color }}
            />
            <p className="text-xs text-gray-500">Last Updated: {item.lastUpdated}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
