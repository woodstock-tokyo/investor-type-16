"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "@/components/question-card";
import {
  INVESTOR_QUESTIONS,
  calculateInvestorCode,
  type InvestorAnswers,
  type AnswerValue,
} from "@/lib/investor-types";
import { ChevronLeft } from "lucide-react";

const STORAGE_KEY = "investor-test-answers";

export default function DiagnosePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URLから現在の質問番号を取得（デフォルトは0）
  const questionParam = searchParams.get("q");
  const resetParam = searchParams.get("reset");
  const currentQuestionIndex = questionParam ? parseInt(questionParam, 10) : 0;

  const [answers, setAnswers] = useState<InvestorAnswers>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // 初回レンダリング時にsessionStorageから回答を復元
  useEffect(() => {
    // reset=trueの場合は保存された回答をクリア
    if (resetParam === "true") {
      sessionStorage.removeItem(STORAGE_KEY);
      setAnswers({});
    } else {
      const savedAnswers = sessionStorage.getItem(STORAGE_KEY);
      if (savedAnswers) {
        try {
          setAnswers(JSON.parse(savedAnswers));
        } catch (error) {
          console.error("Failed to parse saved answers:", error);
        }
      }
    }
    setIsLoaded(true);
  }, [resetParam]);

  // 回答が変更されたらsessionStorageに保存
  useEffect(() => {
    if (isLoaded) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers, isLoaded]);

  const currentQuestion = INVESTOR_QUESTIONS[currentQuestionIndex];
  const totalQuestions = INVESTOR_QUESTIONS.length;
  const progress = (currentQuestionIndex / totalQuestions) * 100;
  const currentAnswer = answers[currentQuestion.id];

  const handleAnswerChange = (value: AnswerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      // 次の質問に進む（URLを変更してブラウザ履歴に追加）
      router.push(`/test?q=${currentQuestionIndex + 1}`);
    } else {
      // 最後の質問 - 結果を計算してリダイレクト
      const resultCode = calculateInvestorCode(answers);
      // テスト完了後はsessionStorageをクリア
      sessionStorage.removeItem(STORAGE_KEY);
      router.push(`/result/${resultCode}`);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      // 前の質問に戻る（ブラウザの戻る機能を使用）
      router.back();
    } else {
      // 最初の質問の場合はトップページに戻る
      router.push("/");
    }
  };

  const canProceed = currentAnswer !== undefined;

  // データロード中は何も表示しない
  if (!isLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="shrink-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Question Card */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <QuestionCard
            key={currentQuestion.id}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            questionText={currentQuestion.text}
            value={currentAnswer}
            onValueChange={handleAnswerChange}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleNext}
            disabled={!canProceed}
            className="min-w-[200px]"
          >
            {currentQuestionIndex < totalQuestions - 1 ? "次へ" : "結果を見る"}
          </Button>
        </div>
      </div>
    </div>
  );
}
