export interface Trello {
  board: number;
  card: number;
}

export interface AttachmentsByType {
  trello: Trello;
}

export interface Badges {
  attachmentsByType: AttachmentsByType;
  location: boolean;
  votes: number;
  viewingMemberVoted: boolean;
  subscribed: boolean;
  fogbugz: string;
  checkItems: number;
  checkItemsChecked: number;
  checkItemsEarliestDue?: any;
  comments: number;
  attachments: number;
  description: boolean;
  due?: any;
  dueComplete: boolean;
  start?: any;
}

export interface Label {
  id: string;
  idBoard: string;
  name: string;
  color: string;
}

export interface Cover {
  idAttachment?: any;
  color?: any;
  idUploadedBackground?: any;
  size: string;
  brightness: string;
  idPlugin?: any;
}

export interface CardInfo {
  id: string;
  checkItemStates: any[];
  closed: boolean;
  dateLastActivity: Date;
  desc: string;
  descData?: any;
  dueReminder?: any;
  idBoard: string;
  idList: string;
  idMembersVoted: any[];
  idShort: number;
  idAttachmentCover?: any;
  idLabels: string[];
  manualCoverAttachment: boolean;
  name: string;
  pos: number;
  shortLink: string;
  isTemplate: boolean;
  cardRole?: any;
  dueComplete: boolean;
  due?: any;
  email?: any;
  shortUrl: string;
  start?: any;
  url: string;
  idMembers: any[];
  badges: Badges;
  subscribed: boolean;
  idChecklists: any[];
  labels: Label[];
  cover: Cover;
}
