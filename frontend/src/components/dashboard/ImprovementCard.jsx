import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Compass, TrendingUp, Target } from "lucide-react";

export function ImprovementCard() {
  return (
    <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold">Your Growth Roadmap</CardTitle>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skill Level */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-md flex flex-col items-center text-center">
          <Rocket className="h-12 w-12 text-[#f8a4a8] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Current Skill Level</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-transparent bg-clip-text">
            Intermediate
          </p>
          <p className="text-gray-600 mt-2">You're on your way to becoming an expert!</p>
        </div>

        {/* Suggested Learning Path */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-md flex flex-col items-center text-center">
          <Compass className="h-12 w-12 text-[#a78bfa] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Suggested Learning Path</h3>
          <p className="text-lg font-medium text-gray-700">Advanced MERN Stack Development</p>
          <p className="text-gray-600 mt-2">Focus on Microservices & Cloud Deployment.</p>
          <Button variant="link" className="mt-4 text-[#a78bfa] hover:text-[#f8a4a8]">
            View Full Path
          </Button>
        </div>

        {/* Last Week's Progress */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-md flex flex-col items-center text-center">
          <TrendingUp className="h-12 w-12 text-[#e9d5ff] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Last Week's Progress</h3>
          <p className="text-lg font-medium text-gray-700">Completed 2 modules, 1 quiz</p>
          <p className="text-gray-600 mt-2">Keep up the great work!</p>
        </div>

        {/* Next Goals */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-md flex flex-col items-center text-center">
          <Target className="h-12 w-12 text-[#d1d5db] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Next Goals</h3>
          <p className="text-lg font-medium text-gray-700">Complete TypeScript Course</p>
          <p className="text-gray-600 mt-2">Aim for 80%+ on the next quiz.</p>
          <Button className="mt-4 rounded-full bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] hover:opacity-90">
            Set New Goal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
