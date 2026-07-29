export type EventStatus = "DRAFT" | "SCHEDULED" | "LIVE" | "ENDED";
export type PollStatus = "DRAFT" | "SCHEDULED" | "ACTIVE" | "PAUSED" | "CLOSED";
export type Channel = "ONLINE" | "USSD";
export type QuestionStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "FEATURED"
  | "ANSWERED";

export interface Profile {
  id: string;
  organisation_name: string;
  created_at: string;
}

export interface Event {
  id: string;
  organiser_id: string | null;
  name: string;
  description: string;
  slug: string;
  status: EventStatus;
  ussd_code: string;
  created_at: string;
}

export interface Poll {
  id: string;
  event_id: string;
  title: string;
  description: string;
  status: PollStatus;
  voting_rule: string;
  slug: string;
  created_at: string;
}

export interface PollOption {
  id: string;
  poll_id: string;
  name: string;
  display_order: number;
}

export interface Vote {
  id: string;
  poll_id: string;
  poll_option_id: string;
  channel: Channel;
  voter_hash: string;
  status: string;
  created_at: string;
}

export interface Question {
  id: string;
  event_id: string;
  question_text: string;
  channel: Channel;
  submitter_hash: string;
  status: QuestionStatus;
  upvote_count: number;
  created_at: string;
}

export interface PollResults {
  pollId: string;
  title: string;
  totalVotes: number;
  channels: { online: number; ussd: number };
  options: Array<{
    id: string;
    name: string;
    votes: number;
    percentage: number;
  }>;
}
