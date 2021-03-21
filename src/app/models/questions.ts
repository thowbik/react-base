export enum URLType{
    None = 0,  
    ImageURL = 1,
    VideoURL = 2,
    GifURL = 3,
  }
  export enum FormresponseStatusType{
    None = 0,  
    Pending = 1,
    Received = 2,
  }
  export enum TemplateType{
    None = 0,  
    Form = 1,
    Template_for_Own_Use = 2,
    Template_for_Public = 3
  }

  export enum ShowCorrectAnswerType{
    None = 0,  
    Never = 1,
    On_Responding = 2,
    On_Expired = 3
  }
  export enum TimeLimitToRespondType{
    None = 0,  
    One_Day = 1,
    Two_Day = 2,
    One_Week = 3,
    Custom =4
  }
