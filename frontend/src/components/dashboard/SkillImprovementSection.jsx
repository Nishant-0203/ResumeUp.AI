"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export function SkillImprovementSection() {
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "Mastering TypeScript for React Developers",
      type: "Course",
      link: "#",
      status: "pending",
      weakSkill: "TypeScript",
    },
    {
      id: 2,
      title: "Introduction to Unit Testing with Jest & React Testing Library",
      type: "Video Series",
      link: "#",
      status: "pending",
      weakSkill: "Unit Testing",
    },
    {
      id: 3,
      title: "AWS Fundamentals for Developers",
      type: "Article",
      link: "#",
      status: "pending",
      weakSkill: "Cloud Deployment",
    },
    {
      id: 4,
      title: "CI/CD Pipelines with GitHub Actions",
      type: "Tutorial",
      link: "#",
      status: "pending",
      weakSkill: "CI/CD",
    },
  ]);

  const markAsDone = (id) => {
    setResources((prevResources) =>
      prevResources.map((res) =>
        res.id === id ? { ...res, status: "done" } : res
      )
    );
  };

  return (
    <Card className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold">Skill Improvement</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <h3 className="text-xl font-semibold mb-4">Recommended Resources</h3>
        <div className="space-y-4">
          {resources.map((resource) => (
            <motion.div
              key={resource.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md ${
                resource.status === "done" ? "opacity-70 line-through" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h4 className="font-medium text-lg">{resource.title}</h4>
                <p className="text-sm text-gray-600">
                  {resource.type} - Focus: {resource.weakSkill}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-3 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white"
                  asChild
                >
                  <a href={resource.link} target="_blank" rel="noopener noreferrer">
                    View <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                {resource.status === "pending" ? (
                  <Button
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] hover:opacity-90"
                    onClick={() => markAsDone(resource.id)}
                  >
                    <CheckCircle className="mr-1 h-4 w-4" /> Mark as Done
                  </Button>
                ) : (
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4" /> Completed
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
