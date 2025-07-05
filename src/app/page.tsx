"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import SettingsCard, { type TestSettings } from "@/components/settings-card";
import PerformanceCard from "@/components/performance-card";
import ComparisonCard from "@/components/comparison-card";
import { IconPython, IconRust } from "@/components/icons";
import { Toaster } from "@/components/ui/toaster";

type PerfState = {
  status: "ready" | "processing" | "complete";
  progress: number;
  time: number | null;
  result: string | null;
};

const initialPerfState: PerfState = {
  status: "ready",
  progress: 0,
  time: null,
  result: null,
};

// Simulation parameters based on test settings
const getSimParams = (
  language: "rust" | "python",
  settings: TestSettings
) => {
  // Arbitrary values for simulation
  const baseTime = {
    sum: { rust: 50, python: 500 },
    fibonacci: { rust: 150, python: 2000 },
    primes: { rust: 500, python: 8000 },
  };
  const sizeMultiplier = {
    1_000_000: 1,
    10_000_000: 2,
    100_000_000: 4,
    1_000_000_000: 8,
  };
  const duration =
    baseTime[settings.type][language] * sizeMultiplier[settings.size];
  const result = (
    settings.size /
    (baseTime[settings.type][language] / 50)
  ).toLocaleString();
  return { duration, result };
};

export default function Home() {
  const [testSettings, setTestSettings] = useState<TestSettings>({
    size: 1_000_000,
    type: "sum",
  });
  const [isRunning, setIsRunning] = useState(false);
  const [rustState, setRustState] = useState<PerfState>(initialPerfState);
  const [pythonState, setPythonState] = useState<PerfState>(initialPerfState);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetTests = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setRustState(initialPerfState);
    setPythonState(initialPerfState);
  }, []);

  const startTests = useCallback(() => {
    resetTests();
    setIsRunning(true);

    const rustParams = getSimParams("rust", testSettings);
    const pythonParams = getSimParams("python", testSettings);

    const startTime = performance.now();

    setRustState((prev) => ({ ...prev, status: "processing" }));
    setPythonState((prev) => ({ ...prev, status: "processing" }));

    intervalRef.current = setInterval(() => {
      const elapsedTime = performance.now() - startTime;
      
      const rustProgress = Math.min(
        100,
        (elapsedTime / rustParams.duration) * 100
      );
      
      setRustState((prev) => {
        if (prev.status === 'complete') return prev;
        if (rustProgress >= 100) {
          return {
            status: "complete",
            progress: 100,
            time: rustParams.duration / 1000,
            result: rustParams.result,
          };
        }
        return { ...prev, progress: rustProgress };
      });
      
      const pythonProgress = Math.min(
        100,
        (elapsedTime / pythonParams.duration) * 100
      );

      setPythonState((prev) => {
         if (prev.status === 'complete') return prev;
         if (pythonProgress >= 100) {
           return {
             status: "complete",
             progress: 100,
             time: pythonParams.duration / 1000,
             result: pythonParams.result,
           };
         }
         return { ...prev, progress: pythonProgress };
      });

    }, 50);
  }, [testSettings, resetTests]);

  useEffect(() => {
    const bothComplete =
      rustState.status === "complete" && pythonState.status === "complete";
    if (bothComplete) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, [rustState.status, pythonState.status]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleSettingsChange = (newSettings: Partial<TestSettings>) => {
    setTestSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const isComplete =
    rustState.status === "complete" && pythonState.status === "complete";

  return (
    <>
      <div className="min-h-screen bg-background font-body text-foreground">
        <main className="container mx-auto p-4 py-8 sm:p-6 lg:p-12">
          <div className="flex flex-col items-center gap-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl font-headline">
                Rust vs. Python
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                A visual comparison of performance on computational tasks. Select your parameters and see the difference.
              </p>
            </div>

            <SettingsCard
              isRunning={isRunning}
              testSettings={testSettings}
              onSettingsChange={handleSettingsChange}
              onStart={startTests}
              onReset={resetTests}
              isComplete={isComplete}
            />

            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
              <PerformanceCard
                language="Rust"
                icon={<IconRust className="h-10 w-10 text-orange-600" />}
                {...rustState}
              />
              <PerformanceCard
                language="Python"
                icon={<IconPython className="h-10 w-10 text-blue-500" />}
                {...pythonState}
              />
            </div>
            {isComplete && rustState.time && pythonState.time && (
              <ComparisonCard
                rustTime={rustState.time}
                pythonTime={pythonState.time}
              />
            )}
          </div>
        </main>
      </div>
      <Toaster />
    </>
  );
}
