export class Contact {
  mobile_number:number;
  email_address:string;
  datepicker:string;
  gender:boolean;
  contactname:string;
}

export enum ContactStatus {
  Invite = 1,
  Connect = 2,
  Accept = 3,
  Reject = 4,
  AwaitingToConnect=5,
}

export enum ContactStatusType {
  None = 0,
  AddedAsContact = 1,
  InviteSent = 2,
  RequestSent = 3,
  Connected = 4,
  Rejected = 5,
  UserRequestSent = 6,
  Active = 7,
  UserRequestRejected = 8
}
export enum UserStatusTypeName {
  None = 0,
  AddedAsContact = 1,
  InviteSent = 2,
  RequestSent = 3,
  Connected = 4,
  Rejected = 5,
  UserRequestSent = 6,
  Active = 7,
  UserRequestRejected = 8
}

export enum ContactType {
  connected = 4,
  employee = 1
}

export enum paginationDataNo {
  page=1,
  limit=50
}

export enum ContactPageNo {
  all = 18,
  connected = 19,
  employee = 20,
  group = 21,
}


export enum ContactGroupMemberType {
  None = 0,
  SuggestMember = 1,
  ApprovedMember = 2,
  RejectedMember = 3,
}

export enum ContactGroupType {
  Mobile = 1,
  Web = 2,
}

export enum profileType {
  None = 0,
  OrganisationLevel = 1,
  ProfileLevel = 2
}

export enum RecordType{
  None = 0,  
  Contact = 1,
  Form = 2,
  Question = 3,
  Group = 4
}