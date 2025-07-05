"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Timer, CheckCircle2, Cpu } from "lucide-react";

interface PerformanceCardProps {
  language: "Rust" | "Python";
  icon: React.ReactNode;
  status: "ready" | "processing" | "complete";
  progress: number;
  time: number | null;
  result: string | null;
}

const PerformanceCard = ({
  language,
  icon,
  status,
  progress,
  time,
  result,
}: PerformanceCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case "processing":
        return <Badge variant="secondary">Processing</Badge>;
      case "complete":
        return <Badge className="bg-green-500 text-primary-foreground hover:bg-green-500/90">Complete</Badge>;
      case "ready":
      default:
        return <Badge variant="outline">Ready</Badge>;
    }
  };

  return (
    <Card className="w-full transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-3 text-2xl font-bold">
          {icon}
          {language}
        </CardTitle>
        {getStatusBadge()}
      </CardHeader>
      <CardContent>
        <div className="mt-4">
          <Progress value={progress} className="h-3" />
          <p className="mt-2 text-right text-sm text-muted-foreground">
            {Math.round(progress)}%
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
            <Timer className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Time</p>
              <p className="text-lg font-semibold">
                {time !== null ? `${time.toFixed(3)}s` : "-"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
            {status === "complete" ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
                <Cpu className="h-6 w-6 text-primary" />
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground">Result</p>
              <p className="truncate text-lg font-semibold">
                {result !== null ? result : "-"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;
