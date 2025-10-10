import { useState } from "react";
import { MessageCircle, X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const FloatingAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);

  const helpTopics = [
    {
      question: "How does keyword scanning work?",
      answer: "The keyword scanner analyzes all course pages and identifies high-value keywords based on search volume, relevance, and competition.",
    },
    {
      question: "What is competitive benchmarking?",
      answer: "We compare your course pages against competitor universities to identify gaps in content, keywords, and optimization opportunities.",
    },
    {
      question: "How accurate are the AI rewrites?",
      answer: "Our AI maintains academic tone while optimizing for SEO, with human review checkpoints before publishing.",
    },
  ];

  return (
    <>
      {isOpen && (
        <Card
          className={cn(
            "fixed z-50 w-96 shadow-lg animate-fade-in",
            isDragging && "cursor-move"
          )}
          style={{
            bottom: `${position.y + 80}px`,
            right: `${position.x}px`,
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
              <CardDescription>
                How can I help you optimize today?
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {helpTopics.map((topic, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-foreground mb-1">
                      {topic.question}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {topic.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary-hover animate-pulse-glow"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </>
  );
};
