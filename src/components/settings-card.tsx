"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Binary,
  Calculator,
  Database,
  InfinityIcon,
  Play,
  RotateCcw,
  Settings,
} from "lucide-react";

export type TestSettings = {
  size: number;
  type: "sum" | "fibonacci" | "primes";
};

interface SettingsCardProps {
  isRunning: boolean;
  testSettings: TestSettings;
  onSettingsChange: (newSettings: Partial<TestSettings>) => void;
  onStart: () => void;
  onReset: () => void;
  isComplete: boolean;
}

const testSizes = [
  { value: 1_000_000, label: "1 Million" },
  { value: 10_000_000, label: "10 Million" },
  { value: 100_000_000, label: "100 Million" },
  { value: 1_000_000_000, label: "1 Billion" },
];

const testTypes = [
  { value: "sum", label: "Sum Calculation", icon: Calculator },
  { value: "fibonacci", label: "Fibonacci", icon: InfinityIcon },
  { value: "primes", label: "Prime Numbers", icon: Binary },
];

const SettingsCard = ({
  isRunning,
  testSettings,
  onSettingsChange,
  onStart,
  onReset,
  isComplete,
}: SettingsCardProps) => {
  return (
    <Card className="w-full max-w-4xl shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Settings className="h-6 w-6" /> Test Parameters
        </CardTitle>
        <CardDescription>
          Configure the test workload and type to start the comparison.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <Label className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Database className="h-5 w-5 text-primary" /> Test Size
          </Label>
          <RadioGroup
            value={String(testSettings.size)}
            onValueChange={(value) =>
              onSettingsChange({ size: Number(value) })
            }
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
            disabled={isRunning}
          >
            {testSizes.map(({ value, label }) => (
              <div key={value}>
                <RadioGroupItem
                  value={String(value)}
                  id={`size-${value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`size-${value}`}
                  className="flex h-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Calculator className="h-5 w-5 text-primary" /> Test Type
          </Label>
          <RadioGroup
            value={testSettings.type}
            onValueChange={(value) =>
              onSettingsChange({ type: value as TestSettings["type"] })
            }
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            disabled={isRunning}
          >
            {testTypes.map(({ value, label, icon: Icon }) => (
              <div key={value}>
                <RadioGroupItem
                  value={value}
                  id={`type-${value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`type-${value}`}
                  className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Icon className="h-6 w-6" />
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={onStart}
            disabled={isRunning}
            size="lg"
            className="w-48 bg-primary hover:bg-primary/90"
          >
            <Play className="mr-2 h-5 w-5" />
            Start Test
          </Button>
          <Button
            onClick={onReset}
            disabled={!isComplete && !isRunning}
            size="lg"
            variant="outline"
            className="w-48"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsCard;
