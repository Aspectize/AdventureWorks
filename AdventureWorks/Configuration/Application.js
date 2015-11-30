var app = newApplication();

app.Directories = "JQueryExtension, Dhtmlx";
app.LocalizationServiceName = "FileBasedLocalisationProvider";
app.AutoIdentityService = "AzureAutoIdentityService";

app.AddAuthorizationRole(aas.Roles.Anonymous, aas.Enum.AccessControl.ReadWrite);

var ctxData0 = newContextData();

ctxData0.Name = "MainData";
ctxData0.NameSpaceList = "AdventureWorks.HumanResources, AdventureWorks.Person, AdventureWorks.Production, AdventureWorks.Purchasing, AdventureWorks.Sales";

var ctxData1 = newContextData();

ctxData1.Name = "LogoGuid";
ctxData1.NameSpaceList = "";
ctxData1.IsDataSet = false;



