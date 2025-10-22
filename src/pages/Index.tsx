import { useState, useEffect } from "react";
import { Header } from "@/components/Console/Header";
import { FilterSidebar } from "@/components/Console/FilterSidebar";
import { OrchestrationBar } from "@/components/Console/OrchestrationBar";
import { FloatingAssistant } from "@/components/Console/FloatingAssistant";
import { KeywordScanNode } from "@/components/Console/Nodes/KeywordScanNode";
import { BenchmarkNode } from "@/components/Console/Nodes/BenchmarkNode";
import { ContentRewriteNode } from "@/components/Console/Nodes/ContentRewriteNode";
import { PublishingNode } from "@/components/Console/Nodes/PublishingNode";
import { MetaAgentNode, QAAgentNode } from "@/components/Console/Nodes/MetaSchemaQANodes";
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
  const [nodeProgress, setNodeProgress] = useState<number[]>(Array(7).fill(0));
  const [completedNodes, setCompletedNodes] = useState<boolean[]>(Array(7).fill(false));
  const [expandedNodes, setExpandedNodes] = useState<boolean[]>(Array(7).fill(false));
  const [workflowComplete, setWorkflowComplete] = useState(false);

  const totalNodes = 7;

  const handleStartAudit = () => {
    setShowAuditModal(true);
  };

  const handleConfirmAudit = () => {
    setShowAuditModal(false);
    toast.success("SEO Audit initiated - Ready to start Node 1");
    setCurrentNode(0);
    setNodeProgress(Array(7).fill(0));
    setCompletedNodes(Array(7).fill(false));
    setExpandedNodes([true, false, false, false, false, false, false]);
    setWorkflowComplete(false);
  };

  const handleRunNode = (nodeIndex: number) => {
    if (nodeIndex > 0 && !completedNodes[nodeIndex - 1]) {
      toast.error(`Please complete Node ${nodeIndex} first`);
      return;
    }

    setCurrentNode(nodeIndex + 1);
    setNodeProgress(prev => {
      const updated = [...prev];
      updated[nodeIndex] = 0;
      return updated;
    });

    // Different durations for different nodes
    const getIncrement = (index: number) => {
      switch(index) {
        case 0: return 0.444; // 18 seconds (Node 1)
        case 1: return 0.615; // 13 seconds (Node 2)
        case 2: return 0.4;   // 20 seconds (Node 3)
        case 3: return 1.25;  // 8 seconds (Node 4)
        case 4: return 1.25;  // 8 seconds (Node 5)
        case 5: return 0.8;   // 10 seconds (Node 6)
        case 6: return 1.111; // 9 seconds (Node 7)
        default: return 1.25; // 8 seconds
      }
    };

    const increment = getIncrement(nodeIndex);

    const interval = setInterval(() => {
      setNodeProgress(prev => {
        const updated = [...prev];
        if (updated[nodeIndex] < 100) {
          updated[nodeIndex] += increment;
        } else {
          clearInterval(interval);
          setCompletedNodes(prev => {
            const updated = [...prev];
            updated[nodeIndex] = true;
            return updated;
          });
          setCurrentNode(0);
          toast.success(`Node ${nodeIndex + 1} completed`);
          
          // Auto-expand next node if available
          if (nodeIndex < totalNodes - 1) {
            setExpandedNodes(prev => {
              const updated = [...prev];
              updated[nodeIndex + 1] = true;
              return updated;
            });
          }
        }
        return updated;
      });
    }, 80);
  };

  const handleToggleNode = (nodeIndex: number) => {
    setExpandedNodes(prev => {
      const updated = [...prev];
      updated[nodeIndex] = !updated[nodeIndex];
      return updated;
    });
  };

  const handleRunAll = () => {
    if (isRunningAll) return;
    
    setIsRunningAll(true);
    setCurrentNode(0);
    setNodeProgress(Array(7).fill(0));
    setCompletedNodes(Array(7).fill(false));
    setExpandedNodes([true, false, false, false, false, false, false]);
    setWorkflowComplete(false);
    toast.success("Running all nodes sequentially");

    let node = 0;
    const runNextNode = () => {
      if (node >= totalNodes) {
        setIsRunningAll(false);
        setWorkflowComplete(true);
        toast.success("All nodes completed successfully");
        return;
      }

      setCurrentNode(node + 1);
      setExpandedNodes(prev => {
        const updated = [...prev];
        updated[node] = true;
        return updated;
      });

      const element = document.getElementById(`node-${node + 1}`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });

      // Different durations for different nodes
      const getIncrement = (index: number) => {
        switch(index) {
          case 0: return 0.444; // 18 seconds (Node 1)
          case 1: return 0.615; // 13 seconds (Node 2)
          case 2: return 0.4;   // 20 seconds (Node 3)
          case 3: return 1.25;  // 8 seconds (Node 4)
          case 4: return 1.25;  // 8 seconds (Node 5)
          case 5: return 0.8;   // 10 seconds (Node 6)
          case 6: return 1.111; // 9 seconds (Node 7)
          default: return 1.25; // 8 seconds
        }
      };

      const increment = getIncrement(node);

      const interval = setInterval(() => {
        setNodeProgress(prev => {
          const updated = [...prev];
          if (updated[node] < 100) {
            updated[node] += increment;
          } else {
            clearInterval(interval);
            setCompletedNodes(prev => {
              const updated = [...prev];
              updated[node] = true;
              return updated;
            });
            setCurrentNode(0);
            node++;
            setTimeout(runNextNode, 500);
          }
          return updated;
        });
      }, 80);
    };

    runNextNode();
  };


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
                completed={completedNodes[0]}
                isExpanded={expandedNodes[0]}
                onToggle={() => handleToggleNode(0)}
                onRun={() => handleRunNode(0)}
                enabled={true}
              />
            </div>
            
            <div id="node-2">
              <BenchmarkNode 
                nodeNumber={2} 
                isActive={currentNode === 2}
                progress={nodeProgress[1]}
                completed={completedNodes[1]}
                isExpanded={expandedNodes[1]}
                onToggle={() => handleToggleNode(1)}
                onRun={() => handleRunNode(1)}
                enabled={completedNodes[0]}
              />
            </div>
            
            <div id="node-3">
              <ContentRewriteNode 
                nodeNumber={3} 
                isActive={currentNode === 3}
                progress={nodeProgress[2]}
                completed={completedNodes[2]}
                isExpanded={expandedNodes[2]}
                onToggle={() => handleToggleNode(2)}
                onRun={() => handleRunNode(2)}
                enabled={completedNodes[1]}
              />
            </div>
            
            <div id="node-4">
              <PublishingNode 
                nodeNumber={4} 
                isActive={currentNode === 4}
                progress={nodeProgress[3]}
                completed={completedNodes[3]}
                isExpanded={expandedNodes[3]}
                onToggle={() => handleToggleNode(3)}
                onRun={() => handleRunNode(3)}
                enabled={completedNodes[2]}
              />
            </div>
            
            <div id="node-5">
              <MetaAgentNode 
                nodeNumber={5} 
                isActive={currentNode === 5}
                progress={nodeProgress[4]}
                completed={completedNodes[4]}
                isExpanded={expandedNodes[4]}
                onToggle={() => handleToggleNode(4)}
                onRun={() => handleRunNode(4)}
                enabled={completedNodes[3]}
              />
            </div>
            
            <div id="node-6">
              <QAAgentNode 
                nodeNumber={6} 
                isActive={currentNode === 6}
                progress={nodeProgress[5]}
                completed={completedNodes[5]}
                isExpanded={expandedNodes[5]}
                onToggle={() => handleToggleNode(5)}
                onRun={() => handleRunNode(5)}
                enabled={completedNodes[4]}
              />
            </div>
            
            <div id="node-7">
              <FinalReportNode 
                nodeNumber={7} 
                isActive={currentNode === 7}
                progress={nodeProgress[6]}
                completed={completedNodes[6]}
                isExpanded={expandedNodes[6]}
                onToggle={() => handleToggleNode(6)}
                onRun={() => handleRunNode(6)}
                enabled={completedNodes[5]}
              />
            </div>

            {workflowComplete && (
              <div className="mt-8 p-6 rounded-xl bg-success/10 border-2 border-success animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success">
                    <svg className="h-6 w-6 text-success-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-success">Workflow Complete</h3>
                    <p className="text-sm text-muted-foreground">All optimization nodes have been successfully executed</p>
                  </div>
                </div>
              </div>
            )}
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
