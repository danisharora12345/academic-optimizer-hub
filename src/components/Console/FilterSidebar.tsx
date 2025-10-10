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

export const FilterSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [faculty, setFaculty] = useState("");
  const [programType, setProgramType] = useState("");
  const [status, setStatus] = useState("");

  const handleApplyFilters = () => {
    console.log("Filters applied:", { faculty, programType, status });
  };

  const handleReset = () => {
    setFaculty("");
    setProgramType("");
    setStatus("");
  };

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
              <Label htmlFor="faculty">Faculty</Label>
              <Select value={faculty} onValueChange={setFaculty}>
                <SelectTrigger id="faculty">
                  <SelectValue placeholder="Select faculty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arts">Arts & Humanities</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="computing">Computing & Engineering</SelectItem>
                  <SelectItem value="law">Law & Criminology</SelectItem>
                  <SelectItem value="nursing">Nursing & Midwifery</SelectItem>
                  <SelectItem value="psychology">Psychology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="program-type">Program Type</Label>
              <Select value={programType} onValueChange={setProgramType}>
                <SelectTrigger id="program-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="postgraduate">Postgraduate</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="short-course">Short Course</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Optimization Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <Input
                id="date-range"
                type="date"
                className="bg-secondary/50"
              />
            </div>

            <div className="flex flex-col gap-2 pt-4">
              <Button
                onClick={handleApplyFilters}
                className="w-full bg-primary hover:bg-primary-hover"
              >
                Apply Filters
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full"
              >
                Reset
              </Button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};
