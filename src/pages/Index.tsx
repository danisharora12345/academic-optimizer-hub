import { useState, useEffect } from "react";
import { Header } from "@/components/Console/Header";
import { FilterSidebar } from "@/components/Console/FilterSidebar";
import { OrchestrationBar } from "@/components/Console/OrchestrationBar";
import { FloatingAssistant } from "@/components/Console/FloatingAssistant";
import { KeywordScanNode } from "@/components/Console/Nodes/KeywordScanNode";
import { BenchmarkNode } from "@/components/Console/Nodes/BenchmarkNode";
import { ContentRewriteNode } from "@/components/Console/Nodes/ContentRewriteNode";
import { PublishingNode } from "@/components/Console/Nodes/PublishingNode";
import { MetaAgentNode, SchemaAgentNode, QAAgentNode } from "@/components/Console/Nodes/MetaSchemaQANodes";
import { FinalReportNode } from "@/components/Console/Nodes/FinalReportNode";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Index = () => {
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [currentNode, setCurrentNode] = useState(0);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [nodeProgress, setNodeProgress] = useState<number[]>(Array(8).fill(0));

  const totalNodes = 8;

  const handleStartAudit = () => {
    setShowAuditModal(true);
  };

  const handleConfirmAudit = () => {
    setShowAuditModal(false);
    toast.success("SEO Audit initiated");
    setCurrentNode(1);
    setNodeProgress([100, 0, 0, 0, 0, 0, 0, 0]);
  };

  const handleRunAll = () => {
    if (isRunningAll) return;
    
    setIsRunningAll(true);
    setCurrentNode(0);
    toast.success("Running all nodes sequentially");

    let node = 0;
    const interval = setInterval(() => {
      if (node >= totalNodes) {
        clearInterval(interval);
        setIsRunningAll(false);
        toast.success("All nodes completed successfully");
        return;
      }

      setCurrentNode(node + 1);
      setNodeProgress(prev => {
        const updated = [...prev];
        updated[node] = 100;
        return updated;
      });

      // Scroll to active node
      const element = document.getElementById(`node-${node + 1}`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });

      node++;
    }, 2500);
  };

  useEffect(() => {
    if (currentNode > 0 && currentNode <= totalNodes && !isRunningAll) {
      const progress = setInterval(() => {
        setNodeProgress(prev => {
          const updated = [...prev];
          if (updated[currentNode - 1] < 100) {
            updated[currentNode - 1] += 5;
          }
          return updated;
        });
      }, 100);

      return () => clearInterval(progress);
    }
  }, [currentNode, isRunningAll]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header onStartAudit={handleStartAudit} />
      
      <div className="flex">
        <FilterSidebar />
        
        <main className="flex-1 p-6 pb-24">
          <div className="max-w-6xl mx-auto space-y-6">
            <div id="node-1">
              <KeywordScanNode 
                nodeNumber={1} 
                isActive={currentNode === 1}
                progress={nodeProgress[0]}
              />
            </div>
            
            <div id="node-2">
              <BenchmarkNode 
                nodeNumber={2} 
                isActive={currentNode === 2}
                progress={nodeProgress[1]}
              />
            </div>
            
            <div id="node-3">
              <ContentRewriteNode 
                nodeNumber={3} 
                isActive={currentNode === 3}
                progress={nodeProgress[2]}
              />
            </div>
            
            <div id="node-4">
              <PublishingNode 
                nodeNumber={4} 
                isActive={currentNode === 4}
                progress={nodeProgress[3]}
              />
            </div>
            
            <div id="node-5">
              <MetaAgentNode 
                nodeNumber={5} 
                isActive={currentNode === 5}
                progress={nodeProgress[4]}
              />
            </div>
            
            <div id="node-6">
              <SchemaAgentNode 
                nodeNumber={6} 
                isActive={currentNode === 6}
                progress={nodeProgress[5]}
              />
            </div>
            
            <div id="node-7">
              <QAAgentNode 
                nodeNumber={7} 
                isActive={currentNode === 7}
                progress={nodeProgress[6]}
              />
            </div>
            
            <div id="node-8">
              <FinalReportNode 
                nodeNumber={8} 
                isActive={currentNode === 8}
                progress={nodeProgress[7]}
              />
            </div>
          </div>
        </main>
      </div>

      <OrchestrationBar
        currentNode={currentNode}
        totalNodes={totalNodes}
        onRunAll={handleRunAll}
        isRunning={isRunningAll}
      />

      <FloatingAssistant />

      <Dialog open={showAuditModal} onOpenChange={setShowAuditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start New SEO Audit</DialogTitle>
            <DialogDescription>
              Select the faculty and program type to begin optimization
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="modal-faculty">Faculty</Label>
              <Select>
                <SelectTrigger id="modal-faculty">
                  <SelectValue placeholder="Select faculty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arts">Arts & Humanities</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="computing">Computing & Engineering</SelectItem>
                  <SelectItem value="law">Law & Criminology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="modal-program">Program Type</Label>
              <Select>
                <SelectTrigger id="modal-program">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="postgraduate">Postgraduate</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAuditModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmAudit} className="bg-primary hover:bg-primary-hover">
              Start Audit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
