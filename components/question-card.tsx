"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { AnswerValue } from "@/lib/investor-types";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  value: AnswerValue | undefined;
  onValueChange: (value: AnswerValue) => void;
}

const ANSWER_OPTIONS = [
  { value: 1, label: "全くそう思わない" },
  { value: 2, label: "そう思わない" },
  { value: 3, label: "どちらでもない" },
  { value: 4, label: "そう思う" },
  { value: 5, label: "とてもそう思う" },
] as const;

export function QuestionCard({
  questionNumber,
  totalQuestions,
  questionText,
  value,
  onValueChange,
}: QuestionCardProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
          質問 {questionNumber} / {totalQuestions}
        </div>
        <CardTitle className="text-xl md:text-2xl leading-relaxed">
          {questionText}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={value?.toString()}
          onValueChange={(v) => onValueChange(parseInt(v) as AnswerValue)}
          className="grid grid-cols-1 md:grid-cols-5 gap-2"
        >
          {ANSWER_OPTIONS.map((option) => {
            const isSelected = value === option.value;
            return (
              <label
                key={option.value}
                htmlFor={`q${questionNumber}-option-${option.value}`}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all cursor-pointer",
                  isSelected
                    ? "border-primary bg-primary/10 dark:bg-primary/20"
                    : "border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-900"
                )}
              >
                <RadioGroupItem
                  value={option.value.toString()}
                  id={`q${questionNumber}-option-${option.value}`}
                  className="sr-only"
                />
                <div
                  className={cn(
                    "text-sm text-center font-medium transition-colors",
                    isSelected
                      ? "text-primary font-semibold"
                      : "text-slate-700 dark:text-slate-300"
                  )}
                >
                  {option.label}
                </div>
              </label>
            );
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
