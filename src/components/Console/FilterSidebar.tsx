import { useState } from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  selectedCourse: string;
  onCourseChange: (course: string) => void;
}

export const FilterSidebar = ({ selectedCourse, onCourseChange }: FilterSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "sticky top-16 h-[calc(100vh-4rem)] border-r bg-card transition-all duration-300",
        isCollapsed ? "w-16" : "w-72"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-foreground">Filters</h2>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="course">Select Course</Label>
              <Select value={selectedCourse} onValueChange={onCourseChange}>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="accounting">Accounting and Finance</SelectItem>
                  <SelectItem value="cybersecurity">Cyber Security</SelectItem>
                  <SelectItem value="fashion">Fashion Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

