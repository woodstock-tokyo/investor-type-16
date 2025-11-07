"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { AnswerValue } from "@/lib/investor-types";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  value: AnswerValue | undefined;
  onValueChange: (value: AnswerValue) => void;
  onNext?: () => void;
  canProceed?: boolean;
  isLastQuestion?: boolean;
}

const ANSWER_OPTIONS = [
  { value: 5, label: "とてもそう思う" },
  { value: 4, label: "そう思う" },
  { value: 3, label: "どちらでもない" },
  { value: 2, label: "そう思わない" },
  { value: 1, label: "全くそう思わない" },
] as const;

export function QuestionCard({
  questionNumber,
  totalQuestions,
  questionText,
  value,
  onValueChange,
  onNext,
  canProceed,
  isLastQuestion,
}: QuestionCardProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="pb-3">
        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
          質問 {questionNumber} / {totalQuestions}
        </div>
        <CardTitle className="text-lg md:text-xl leading-relaxed">
          {questionText}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
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
                  "flex flex-col items-center justify-center p-4 md:p-3 rounded-lg border-2 transition-all cursor-pointer min-h-[56px]",
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
                    "text-xs md:text-sm text-center font-medium transition-colors",
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
        {onNext && (
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              onClick={onNext}
              disabled={!canProceed}
              className="min-w-[200px]"
            >
              {isLastQuestion ? "結果を見る" : "次へ"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
