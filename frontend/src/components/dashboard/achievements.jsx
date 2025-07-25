import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, Flame } from "lucide-react";

export function AchievementsSection() {
  const achievements = [
    {
      name: "Resume Pro",
      description: "Achieved a resume score of 90+.",
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      unlocked: true,
    },
    {
      name: "Quiz Master",
      description: "Completed 5+ quizzes with an average score of 80%+",
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      unlocked: false,
    },
    {
      name: "Weekly Streak",
      description: "Logged in and made progress for 7 consecutive days.",
      icon: <Flame className="h-8 w-8 text-orange-500" />,
      unlocked: true,
    },
  ];

  return (
    <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold">Achievements & Badges</CardTitle>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md flex flex-col items-center text-center ${
              !achievement.unlocked ? "opacity-50 grayscale" : ""
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center shadow-sm mb-4">
              {achievement.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{achievement.name}</h3>
            <p className="text-sm text-gray-600">{achievement.description}</p>
            {!achievement.unlocked && (
              <span className="mt-2 text-xs text-gray-500">Locked</span>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
