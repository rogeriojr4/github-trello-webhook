export interface Label {
  name: string;
  owner: string;
  repo: string;
}

export interface BOARD {
  name: string;
  id: string;
  labels: Label[];
}

export interface Config {
  GITHUB_KEY: string;
  GITHUB_OWNER: string;
  TRELLO_TOKEN: string;
  TRELLO_KEY: string;
  APP_URL: string;
  BOARDS: BOARD[];
}
