"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Zap } from "lucide-react";

interface ComparisonCardProps {
  rustTime: number;
  pythonTime: number;
}

const ComparisonCard = ({ rustTime, pythonTime }: ComparisonCardProps) => {
  const speedup = (pythonTime / rustTime).toFixed(2);
  const rustPercentage = ((rustTime / pythonTime) * 100).toFixed(2);

  return (
    <Card className="w-full max-w-4xl animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <TrendingUp className="h-6 w-6 text-primary" />
          Performance Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-6 text-center">
            <Zap className="h-10 w-10 text-green-500" />
            <p className="mt-2 text-4xl font-bold text-green-500">{speedup}x</p>
            <p className="text-sm font-medium text-muted-foreground">
              Rust Speedup Factor
            </p>
            <p className="text-xs text-muted-foreground">(vs. Python)</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-6 text-center">
            <div className="relative h-24 w-24">
              <svg
                className="h-full w-full"
                viewBox="0 0 36 36"
              >
                <path
                  className="stroke-current text-gray-300"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3"
                ></path>
                <path
                  className="stroke-current text-primary"
                  strokeDasharray={`${rustPercentage}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                ></path>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-2xl font-bold text-primary">{rustPercentage}%</span>
              </div>
            </div>
             <p className="mt-2 text-sm font-medium text-muted-foreground">
              Rust Execution Time
            </p>
             <p className="text-xs text-muted-foreground">(% of Python time)</p>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          This simulation highlights Rust's potential for significantly faster execution on CPU-intensive tasks compared to Python.
        </p>
      </CardContent>
    </Card>
  );
};

export default ComparisonCard;
