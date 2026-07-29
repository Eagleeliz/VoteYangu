// ============================================
// VoteBridge TypeScript Types
// Match these to your backend API responses
// ============================================

export type UserRole = "ADMIN" | "ORGANISER" | "VOTER";

export type Channel = "ONLINE" | "USSD" | "SMS" | "VOICE";

export type PollStatus = "DRAFT" | "SCHEDULED" | "ACTIVE" | "PAUSED" | "CLOSED";

export type EventStatus = "DRAFT" | "SCHEDULED" | "LIVE" | "ENDED";

export type QuestionStatus = "PENDING" | "APPROVED" | "REJECTED" | "FEATURED" | "ANSWERED";

export type VoteStatus = "VALID" | "PENDING_REVIEW" | "FLAGGED" | "INVALID";

export type UssdSessionStatus = "ACTIVE" | "COMPLETED" | "CANCELLED" | "EXPIRED";

export type SmsType = "VOTE_CONFIRMATION" | "QUESTION_CONFIRMATION" | "FINAL_RESULTS" | "EVENT_NOTIFICATION";

export type AnalyticsEventType =
  | "EVENT_VIEW"
  | "POLL_VIEW"
  | "VOTE_STARTED"
  | "VOTE_COMPLETED"
  | "QUESTION_SUBMITTED"
  | "QUESTION_UPVOTED"
  | "USSD_SESSION_STARTED"
  | "USSD_SESSION_COMPLETED"
  | "SMS_SENT";

// ============================================
// Core Entities
// ============================================

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Organiser {
  id: string;
  userId: string;
  organisationName: string;
  logoUrl?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  organiserId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  startAt: string;
  endAt?: string;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Poll {
  id: string;
  eventId: string;
  title: string;
  description?: string;
  category?: string;
  startAt?: string;
  endAt?: string;
  status: PollStatus;
  votingRule: "ONE_VOTE_PER_USER" | "MULTIPLE_VOTES";
  createdAt: string;
  updatedAt: string;
}

export interface PollOption {
  id: string;
  pollId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  displayOrder: number;
  voteCount?: number;
  percentage?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Vote {
  id: string;
  pollId: string;
  pollOptionId: string;
  channel: Channel;
  voterHash: string;
  ussdSessionId?: string;
  onlineSessionId?: string;
  status: VoteStatus;
  createdAt: string;
}

export interface Question {
  id: string;
  eventId: string;
  questionText: string;
  channel: Channel;
  submitterHash: string;
  status: QuestionStatus;
  upvotes: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionUpvote {
  id: string;
  questionId: string;
  voterHash: string;
  channel: Channel;
  createdAt: string;
}

export interface UssdSession {
  id: string;
  sessionId: string;
  phoneHash: string;
  eventId?: string;
  currentStep: string;
  status: UssdSessionStatus;
  startedAt: string;
  completedAt?: string;
}

export interface SmsLog {
  id: string;
  phoneHash: string;
  messageType: SmsType;
  message: string;
  status: "SENT" | "FAILED" | "PENDING";
  providerMessageId?: string;
  createdAt: string;
}

export interface AnalyticsEvent {
  id: string;
  eventId: string;
  eventType: AnalyticsEventType;
  channel: Channel;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

// ============================================
// API Request/Response Types
// ============================================

export interface VoteRequest {
  optionId: string;
  channel: Channel;
}

export interface VoteResponse {
  success: boolean;
  message: string;
  vote?: Vote;
}

export interface PollResults {
  pollId: string;
  totalVotes: number;
  channels: {
    online: number;
    ussd: number;
  };
  options: PollOption[];
}

export interface QuestionRequest {
  questionText: string;
  channel: Channel;
}

export interface EventAnalytics {
  totalVotes: number;
  totalQuestions: number;
  onlineVotes: number;
  ussdVotes: number;
  ussdRate: number;
  onlineQuestions: number;
  ussdQuestions: number;
  completionRate: number;
  sessionsStarted: number;
  sessionsCompleted: number;
}

export interface UssdCallbackPayload {
  sessionId: string;
  phoneNumber: string;
  text: string;
  serviceCode: string;
}

export interface UssdCallbackResponse {
  text: string;
  continueSession: boolean;
}

// ============================================
// UI State Types
// ============================================

export type Theme = "dark" | "light" | "system";

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export type DashboardTab = "overview" | "polls" | "questions" | "analytics";

export interface UssdSimulatorState {
  step: string;
  input: string;
  selected?: string;
  history: string[];
}
