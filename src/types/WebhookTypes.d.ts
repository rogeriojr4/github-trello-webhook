export interface BackgroundImageScaled {
  width: number;
  height: number;
  url: string;
}

export interface Prefs {
  permissionLevel: string;
  hideVotes: boolean;
  voting: string;
  comments: string;
  invitations: string;
  selfJoin: boolean;
  cardCovers: boolean;
  isTemplate: boolean;
  cardAging: string;
  calendarFeedEnabled: boolean;
  background: string;
  backgroundImage: string;
  backgroundImageScaled: BackgroundImageScaled[];
  backgroundTile: boolean;
  backgroundBrightness: string;
  backgroundBottomColor: string;
  backgroundTopColor: string;
  canBePublic: boolean;
  canBeEnterprise: boolean;
  canBeOrg: boolean;
  canBePrivate: boolean;
  canInvite: boolean;
}

export interface LabelNames {
  green: string;
  yellow: string;
  orange: string;
  red: string;
  purple: string;
  blue: string;
  sky: string;
  lime: string;
  pink: string;
  black: string;
}

export interface Model {
  id: string;
  name: string;
  desc: string;
  descData?: any;
  closed: boolean;
  idOrganization: string;
  idEnterprise?: any;
  pinned: boolean;
  url: string;
  shortUrl: string;
  prefs: Prefs;
  labelNames: LabelNames;
}

export interface Old {
  idList: string;
}

export interface Card {
  idList: string;
  id: string;
  name: string;
  idShort: number;
  shortLink: string;
}

export interface Board {
  id: string;
  name: string;
  shortLink: string;
}

export interface ListBefore {
  id: string;
  name: string;
}

export interface ListAfter {
  id: string;
  name: string;
}

export interface Data {
  old: Old;
  card: Card;
  board: Board;
  listBefore: ListBefore;
  listAfter: ListAfter;
}

export interface Limits {}

export interface Card2 {
  type: string;
  idList: string;
  id: string;
  shortLink: string;
  text: string;
}

export interface ListBefore2 {
  type: string;
  id: string;
  text: string;
}

export interface ListAfter2 {
  type: string;
  id: string;
  text: string;
}

export interface MemberCreator {
  type: string;
  id: string;
  username: string;
  text: string;
}

export interface Entities {
  card: Card2;
  listBefore: ListBefore2;
  listAfter: ListAfter2;
  memberCreator: MemberCreator;
}

export interface Display {
  translationKey: string;
  entities: Entities;
}

export interface NonPublic {}

export interface MemberCreator2 {
  id: string;
  username: string;
  activityBlocked: boolean;
  avatarHash: string;
  avatarUrl: string;
  fullName: string;
  idMemberReferrer?: any;
  initials: string;
  nonPublic: NonPublic;
  nonPublicAvailable: boolean;
}

export interface Action {
  id: string;
  idMemberCreator: string;
  data: Data;
  type: string;
  date: Date;
  appCreator?: any;
  limits: Limits;
  display: Display;
  memberCreator: MemberCreator2;
}

export interface WebhookPostIRoute {
  model: Model;
  action: Action;
}
