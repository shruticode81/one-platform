declare module '*.graphql';
declare module '*.json';

declare enum FeedbackCategory {
  BUG = 'BUG',
  FEEDBACK = 'FEEDBACK',
}

type FeedbackUserProfileType = {
  cn: String;
  name: string;
  uid: string;
  rhatUUID: string;
  email: string;
  url: string;
};

type StackType = {
  stack: string;
  path: string;
};

type FeedbackType = {
  summary: string;
  description: string;
  experience: string;
  error: string;
  config: string;
  state: string;
  source: string;
  ticketUrl: string;
  category: FeedbackCategory;
  module: string;
  stackInfo: StackType;
  assignee: FeedbackUserProfileType;
  createdOn: string;
  createdBy: string;
  updatedOn: string;
  updatedBy: string;
};

type PaginatedFeedbackType = {
  count: number;
  data: Array<FeedbackType>;
};

// New types
declare enum FeedbackSource {
  JIRA = 'JIRA',
  GITHUB = 'GITHUB',
  GITLAB = 'GITLAB',
  EMAIL = 'EMAIL',
}

type QueryListFeedbackConfigByIdArgs = {
  id?: string;
};

type QueryListFeedbackConfigByAppIdArgs = {
  appId?: string;
};

type MutationCreateFeedbackConfigArgs = {
  payload: FeedbackConfigInput;
};

type MutationUpdateFeedbackConfigArgs = {
  id?: string;
  payload: FeedbackConfigInput;
};

type MutationDeleteFeedbackConfigArgs = {
  id: string;
};

type FeedbackConfigType = {
  appId: string;
  isEnabled: boolean;
  sourceType: FeedbackSource;
  sourceApiUrl: string;
  sourceHeaders: Array<{
    key: string;
    value: string;
  }>;
  projectKey: string;
  feedbackEmail: string;
};

type FeedbackConfigInput = {
  id?: string;
  appId: string;
  isEnabled: boolean;
  sourceType: FeedbackSource;
  sourceApiUrl: string;
  sourceHeaders: Array<{
    key: string;
    value: string;
  }>;
  projectKey: string;
  feedbackEmail: string;
};
