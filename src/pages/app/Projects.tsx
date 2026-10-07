import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Plus, Filter, Briefcase, Calendar, Users, MoreHorizontal } from 'lucide-react';

export default function Projects() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    { id: 'PRJ-101', name: 'Cloud Migration Phase 2', client: 'Acme Corp', status: 'In Progress', progress: 75, due: '2026-10-15', team: 4 },
    { id: 'PRJ-102', name: 'E-commerce Portal Redesign', client: 'Stark Industries', status: 'At Risk', progress: 40, due: '2026-09-30', team: 6 },
    { id: 'PRJ-103', name: 'Network Security Audit', client: 'Wayne Enterprises', status: 'Planning', progress: 10, due: '2026-11-01', team: 2 },
    { id: 'PRJ-104', name: 'ERP Implementation', client: 'Globex Inc', status: 'In Progress', progress: 60, due: '2026-12-15', team: 8 },
    { id: 'PRJ-105', name: 'Office IT Fitout', client: 'Initech', status: 'Completed', progress: 100, due: '2026-09-01', team: 3 }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Projects & Delivery</h1>
          <p className="text-sm text-slate-400">Track implementation and service delivery milestones.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-500 text-white">
          <Plus className="w-4 h-4 mr-2" /> New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="bg-[color:var(--color-nexus-surface)] border-[color:var(--color-nexus-border)] flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="w-5 h-5 rounded" />
                </div>
                
                <div className="mb-4 flex-1">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="w-full h-1.5 rounded-full" />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[color:var(--color-nexus-border)]">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-4 h-4 rounded" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Skeleton className="w-4 h-4 rounded" />
                      <Skeleton className="h-3 w-4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="bg-[color:var(--color-nexus-surface)] border-[color:var(--color-nexus-border)] flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant={
                    project.status === 'Completed' ? 'success' :
                    project.status === 'At Risk' ? 'destructive' :
                    project.status === 'In Progress' ? 'info' : 'outline'
                  }>
                    {project.status}
                  </Badge>
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mb-4 flex-1">
                  <h3 className="text-lg font-bold text-white leading-tight mb-1">{project.name}</h3>
                  <p className="text-sm text-slate-400">{project.client}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-400">Progress</span>
                      <span className="font-medium text-white">{project.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[color:var(--color-nexus-ink)] rounded-full overflow-hidden border border-[color:var(--color-nexus-border)]/50">
                      <div 
                        className={`h-full rounded-full ${project.status === 'Completed' ? 'bg-green-500' : project.status === 'At Risk' ? 'bg-red-500' : 'bg-blue-500'}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[color:var(--color-nexus-border)]">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span>Due {project.due}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Users className="w-4 h-4" />
                      <span>{project.team}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
