"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { EventList } from "@/components/dashboard/EventList";
import { ChannelBreakdown } from "@/components/dashboard/ChannelBreakdown";
import { UssdFunnel } from "@/components/dashboard/UssdFunnel";
import { TabNavigation } from "@/components/dashboard/TabNavigation";
import { QuestionModeration } from "@/components/questions/QuestionModeration";
import { PollChart } from "@/components/polls/PollChart";
import { useEvents } from "@/hooks/useEvents";
import { useQuestions } from "@/hooks/useQuestions";
import { useAnalytics } from "@/hooks/useAnalytics";
import { DEMO_EVENT_ID } from "@/lib/constants";
import { voteTrendData } from "@/lib/demo-data";
import type { DashboardTab } from "@/types";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const { events } = useEvents();
  const { analytics } = useAnalytics(DEMO_EVENT_ID);
  const { questions, approveQuestion, rejectQuestion, featureQuestion } = useQuestions(DEMO_EVENT_ID);

  if (!analytics) return null;

  return (
    <div className="page-transition min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
              Organiser Dashboard
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Manage your events and audience engagement</p>
          </div>
          <Button className="self-start">
            <Plus className="w-4 h-4" />
            <span>New Event</span>
          </Button>
        </div>

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Total Votes"
                value={analytics.totalVotes.toLocaleString()}
                trend="↑ 23% from last event"
                icon={<svg className="w-4 h-4 text-vb-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                iconBg="bg-vb-accent/10"
              />
              <MetricCard
                title="USSD Rate"
                value={`${analytics.ussdRate}%`}
                subtitle="Digital inclusion metric"
                icon={<svg className="w-4 h-4 text-vb-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                iconBg="bg-vb-cyan/10"
              />
              <MetricCard
                title="Questions"
                value={analytics.totalQuestions.toLocaleString()}
                subtitle="Across all channels"
                icon={<svg className="w-4 h-4 text-vb-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
                iconBg="bg-vb-gold/10"
              />
              <MetricCard
                title="Completion"
                value={`${analytics.completionRate}%`}
                subtitle="USSD session rate"
                icon={<svg className="w-4 h-4 text-vb-accent2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                iconBg="bg-vb-accent2/10"
              />
            </div>

            <EventList events={events} />

            <div className="grid md:grid-cols-2 gap-6">
              <ChannelBreakdown
                ussdRate={analytics.ussdRate}
                onlineVotes={analytics.onlineVotes}
                ussdVotes={analytics.ussdVotes}
              />
              <UssdFunnel
                sessionsStarted={analytics.sessionsStarted}
                completionRate={analytics.completionRate}
              />
            </div>
          </div>
        )}

        {activeTab === "polls" && (
          <div className="animate-fade-in space-y-6">
            <div className="glass rounded-2xl p-6 theme-transition">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
                  Who should win Best New Artist?
                </h2>
                <span className="px-3 py-1 rounded-full bg-vb-accent2/10 text-vb-accent2 text-xs font-medium border border-vb-accent2/20">
                  ACTIVE
                </span>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Artist A", votes: 8234, pct: 47.8, color: "#ff6b4a" },
                  { name: "Artist B", votes: 6120, pct: 35.5, color: "#22d3ee" },
                  { name: "Artist C", votes: 2880, pct: 16.7, color: "#fbbf24" },
                ].map((opt) => (
                  <div key={opt.name} className="rounded-xl p-4 border theme-transition" style={{ background: "var(--bg-hover)", borderColor: "var(--border-subtle)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium" style={{ color: "var(--text-primary)" }}>{opt.name}</span>
                      <div className="text-right">
                        <span className="font-display font-bold" style={{ color: "var(--text-primary)" }}>{opt.pct}%</span>
                        <span className="text-xs ml-2" style={{ color: "var(--text-dim)" }}>{opt.votes.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="h-3 chart-bar-bg rounded-full overflow-hidden">
                      <div className="h-full rounded-full vote-bar chart-bar-anim" style={{ width: `${opt.pct}%`, backgroundColor: opt.color }} />
                    </div>
                    <div className="flex gap-4 mt-3 text-xs" style={{ color: "var(--text-dim)" }}>
                      <span>Online: {Math.floor(opt.votes * 0.6).toLocaleString()}</span>
                      <span>USSD: {Math.floor(opt.votes * 0.4).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "questions" && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="glass rounded-xl px-4 py-2 flex items-center gap-2 theme-transition">
                <span className="text-xs" style={{ color: "var(--text-dim)" }}>Pending</span>
                <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{questions.filter((q) => q.status === "PENDING").length}</span>
              </div>
              <div className="glass rounded-xl px-4 py-2 flex items-center gap-2 theme-transition">
                <span className="text-xs" style={{ color: "var(--text-dim)" }}>Approved</span>
                <span className="text-sm font-bold text-vb-accent2">{questions.filter((q) => q.status === "APPROVED").length}</span>
              </div>
              <div className="glass rounded-xl px-4 py-2 flex items-center gap-2 theme-transition">
                <span className="text-xs" style={{ color: "var(--text-dim)" }}>Featured</span>
                <span className="text-sm font-bold text-vb-gold">{questions.filter((q) => q.featured).length}</span>
              </div>
            </div>
            <QuestionModeration
              questions={questions}
              onApprove={approveQuestion}
              onReject={rejectQuestion}
              onFeature={featureQuestion}
            />
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="animate-fade-in space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass rounded-2xl p-6 theme-transition">
                <h3 className="font-display font-semibold mb-6" style={{ color: "var(--text-primary)" }}>Votes Over Time</h3>
                <PollChart data={voteTrendData} />
                <div className="flex justify-between mt-2 text-xs" style={{ color: "var(--text-dim)" }}>
                  <span>18:00</span><span>19:00</span><span>20:00</span><span>21:00</span>
                </div>
              </div>
              <div className="glass rounded-2xl p-6 theme-transition">
                <h3 className="font-display font-semibold mb-6" style={{ color: "var(--text-primary)" }}>Channel Comparison</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span style={{ color: "var(--text-secondary)" }}>Artist A Preference</span>
                    </div>
                    <div className="flex h-8 rounded-lg overflow-hidden">
                      <div className="bg-vb-cyan flex items-center justify-center text-xs font-medium" style={{ width: "65%" }}>Online 65%</div>
                      <div className="bg-vb-accent flex items-center justify-center text-xs font-medium" style={{ width: "35%" }}>USSD 35%</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span style={{ color: "var(--text-secondary)" }}>Artist B Preference</span>
                    </div>
                    <div className="flex h-8 rounded-lg overflow-hidden">
                      <div className="bg-vb-cyan flex items-center justify-center text-xs font-medium" style={{ width: "25%" }}>Online 25%</div>
                      <div className="bg-vb-accent flex items-center justify-center text-xs font-medium" style={{ width: "40%" }}>USSD 40%</div>
                      <div className="bg-vb-gold flex items-center justify-center text-xs font-medium" style={{ width: "35%" }}>Online 35%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 theme-transition">
              <h3 className="font-display font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Digital Inclusion Impact</h3>
              <div className="rounded-xl p-6 border" style={{ background: "linear-gradient(135deg, rgba(255,107,74,0.08), rgba(34,211,238,0.08))", borderColor: "var(--border-subtle)" }}>
                <div className="flex items-center gap-6">
                  <div className="text-5xl font-display font-bold text-gradient">{analytics.ussdRate}%</div>
                  <div>
                    <p className="font-medium text-lg" style={{ color: "var(--text-primary)" }}>of votes came through USSD</p>
                    <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>That&apos;s approximately 7,000 people who participated without internet access.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
