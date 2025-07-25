"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Brain } from "lucide-react";

export function UploadResumeSection() {
  return (
    <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold">Upload / Update Resume</CardTitle>
      </CardHeader>
      <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center text-center bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-md">
          <FileText className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-lg font-medium mb-2">my_mern_resume_v3.pdf</p>
          <p className="text-sm text-gray-600">Last uploaded: July 24, 2025</p>
        </div>
        <div className="flex flex-col gap-4">
          <Button className="w-full rounded-full py-6 bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] hover:opacity-90 shadow-lg hover:shadow-xl hover:shadow-purple-200/30">
            <Upload className="mr-2 h-5 w-5" /> Re-upload Resume
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-full py-6 border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800"
          >
            <Brain className="mr-2 h-5 w-5" /> Analyze Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
