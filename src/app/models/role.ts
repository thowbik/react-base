export class Role {
  name: string;
  roleDescription: string;
  roleview:boolean;
  rolecreate:boolean;
  roleedit:boolean;
  roleall:boolean;
  questionview:boolean;
  questioncreate;
  questionedit:boolean;
  questionall:boolean;
  question:boolean;
  fomrsrole:boolean;
}

export class RolePageActionMapping {
  pageId: number;
  actionType: number;
}

export enum RolePageActionType {
  create =1,
  view = 2,
  edit =3,
  delete=4,
  changeownership=7,
  addviewers=8,
  addcontributors=9
}

export enum RoleMenu{
  dashboard = 1,
  forms = 2,
  questions = 3,
  chat = 4,
  user = 5,
  contact = 6,
  report = 7,
  settings = 8,
  role = 9,
  FForms = 10,
  FResponses = 11,
  FInsights = 12,
  FCorrectAnswers = 13,
  QQuestions = 14,
  QResponses = 15,
  QInsights = 16,
  QCorrectAnswers = 17,
  CContactAll = 18,
  CConnected = 19,
  CEmployee = 20,
  CGroup = 21
}

