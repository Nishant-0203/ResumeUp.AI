import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, TrendingUp } from "lucide-react";

export function DashboardHeader() {
  return (
    <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <CardContent className="p-0 flex flex-col md:flex-row items-center md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-4 border-white shadow-md">
            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User Profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-3xl font-bold">Welcome, John Doe!</h2>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Calendar className="h-6 w-6 text-[#f8a4a8] mb-2" />
            <span className="text-sm text-gray-500">Last Analysis</span>
            <span className="font-medium">July 24, 2025</span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <TrendingUp className="h-6 w-6 text-[#a78bfa] mb-2" />
            <span className="text-sm text-gray-500">Resume Score</span>
            <span className="font-medium text-xl">75/100</span>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <User className="h-6 w-6 text-[#e9d5ff] mb-2" />
            <span className="text-sm text-gray-500">Joined On</span>
            <span className="font-medium">January 15, 2024</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
