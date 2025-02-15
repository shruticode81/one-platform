declare type FeedbackConfig = {
  id: string;
  appId: string;
  isEnabled: boolean;
  sourceType: FeedbackSource;
  sourceApiUrl: string;
  sourceHeaders: FeedbackSourceHeader[];
  projectKey: string;
  feedbackEmail: string;
};

type FeedbackSourceHeader = {
  key: string;
  value: string;
};

declare const enum FeedbackSource {
  JIRA = "JIRA",
  GITHUB = "GITHUB",
  GITLAB = "GITLAB",
  EMAIL = "EMAIL",
}
