
export interface IObjectScanResult {
  AP_Info_Date: String,
  System_Name: String,
  AP_Status: String,
  AP_Object_Type: String,
  AP_Objects_Scanned?: Number,
  AP_ScanDate?: String,
  AP_Pulse?: String,
  AP_LastScannedId?: Number,
  AP_Config?: String
}

export interface SerializedError {
  name?: String
  message?: String
  stack?: String
  code?: String
}

export interface IDataDictionaryApplication {
  Id:Number
  ,RowSts: String
  ,AppNam: String
  ,Domain: String
  ,GrpPfx?: String
  ,AppTyp?: String
  ,LngNam?: String
  ,AppDsc?: String
  }
export interface IDataDictionaryDatabases{
  Id: Number
  RowSts: String
  AppNam: String
  SrvNam: String
  DbNam: String
  AppTyp: String
}
  
export interface IDataDictionarySqlUsers{
      SrvNam: String,
      DbName: String,
      UsrNam: String,
      PrnId: Number,
      UsrSid: String,
      TypCod: String,
      TypDsc: String,
      Access: String,
      DftSch: String,
      UsrCrt: Date,
      UsrChg: Date,
      Refreshed: Date
}

export interface IInstance{
  SI_ID : Number
  ,System_Name : String
  ,SI_NAME : String
  ,SI_SCHEDULE_STATUS: Number
  ,SI_STARTTIME : String
  ,SI_ENDTIME : String
  ,SI_UPDATE_TS: String
  ,SI_ERROR_MESSAGE: String
  ,SI_SUBMITTER:String
  ,SI_PROGID: String
  ,AP_Location: String
  ,AP_Parameters: String
  ,AP_Destination: String
  ,AP_Alert: String
  ,AP_Database: String
  ,SI_NOTIFICATION: String
  ,SI_FILEPATH: String
  ,SI_CREATION_TIME: String
  ,AP_FileSize: Number
  ,SI_SCHED_NOW: Number
  ,SI_RECURRING: Number
  ,SI_Schedule_Type: String
  ,SI_LAST_RUN_TIME: String  
  ,SI_OWNER : String
}

export interface IInstanceProps{
    Cluster: String
    SI_ID: Number
    SI_PARENTID: String
    SI_LOCATION: String
    InstanceName: String
    SchedulingInfo: {
      Type: Number
      Dependants: Number
      Dependencies: Number
      BeginDate: String
      EndDate: String
      RetriesAllowed: Number
      RetryInterval: Number
      ScheduleOnBehalfOf:Number
      ScheduleOnBehalfOfName: String
      Destinations: String
      ServerGroup: [Object]
      AlertDestination: String
      Notification: [Object]
      SI_Cleanup: String
    },
    PluginInterface: '',
    InstanceManagerSearch: {
      Status: String
      Recurring: String
      Location: String
      InstanceTitle: String
      Started: String
      Ended: String
      Submitter: String
      InstanceType: String
      ParentID: Number
      ID: Number
      Component: String
      CUID: String
      ScheduledBy: String
      Secured: String
      Duration: String
      Destination: String
      JobServer: String
      Created: String
      Updated: String
    },
    ObjectManagerValidationManagerWebiMigratorSearch: {
      ObjectType: Number
      Name: String
      Location: String
      CRVersion: String
      Owner: String
      Children: Number
      CreationTime: String
      UpdateTime: String
      ParentID: Number
      ID: Number
      Depth: Number
      CUID: String
      GUID: String
      RUID: String
      Component: String
      ProgID: String
      Title: String
    },
    APOS: String
    ObjectProperties: {
      Properties: Object
      SchedulingProperties: Object
      ProcessingProperties: Object
    }
  }
//The detail info goes here KEYS ["Cluster","SI_ID","SI_PARENTID","SI_LOCATION","InstanceName","SchedulingInfo","PluginInterface","InstanceManagerSearch","ObjectManagerValidationManagerWebiMigratorSearch","APOS","ObjectProperties"]
/*
  [TODO]  I want to be able to drill down bases on type and selecting it.  For example for "sqlusers" we would pass the string of 'sqlusers' for type. 
  This inturn would set the API url to {baseurl}/{type}.  When this happens i want to be able to pull the 'sqlusers' entry in the IDataDictionaryInterface
  
  eg:
    IDataDictionaryInterfaces['applications'] would return IDataDictionaryDatabases without switch statment.

    Might be usefull https://mariusschulz.com/blog/keyof-and-lookup-types-in-typescript
*/
export interface IDataDictionaryInterfaces{
  'applications': IDataDictionaryApplication
  'databases': IDataDictionaryDatabases,
  'sqlusers' : IDataDictionarySqlUsers
  'instances': IInstance[]
}