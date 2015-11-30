
var vHumanResourcesEmployee = Aspectize.CreateView("HumanResourcesEmployee", aas.Controls.HumanResourcesEmployee, "HumanResourcesTab.1:Employee", true);
vHumanResourcesEmployee.TxtUserFilter.keyup.BindCommand(aas.Services.Browser.UIService.SetCustomFilter, {controlName: aas.ViewName.HumanResourcesEmployee.GridEmployees, customFilter: aas.Expression('(EmployeeContact.Contact.LastName).toLowerCase().indexOf("' + vHumanResourcesEmployee.TxtUserFilter.value + '".toLowerCase()) !== -1')});
vHumanResourcesEmployee.SelectPageSize.BindList(aas.Data.MainData.EnumPageSize, "EnumerationValue", "EnumerationValue");
vHumanResourcesEmployee.GridEmployees.BindGrid(aas.Data.MainData.Employee);
vHumanResourcesEmployee.GridEmployees.FixedHeader.BindData("true");
var cGridEmployeesPrénom = vHumanResourcesEmployee.GridEmployees.AddGridColumn("Prénom", "Span");
cGridEmployeesPrénom.Text.BindData(vHumanResourcesEmployee.GridEmployees.DataSource.EmployeeContact.Contact.FirstName);
var cGridEmployeesNom = vHumanResourcesEmployee.GridEmployees.AddGridColumn("Nom", "Span");
cGridEmployeesNom.Text.BindData(vHumanResourcesEmployee.GridEmployees.DataSource.EmployeeContact.Contact.LastName);
cGridEmployeesNom.HeaderText.BindData(aas.Data.MainData.Employee.EmployeeContact.Contact.LastName);
var cGridEmployeesTitre = vHumanResourcesEmployee.GridEmployees.AddGridColumn("Titre", "Span");
cGridEmployeesTitre.Text.BindData(vHumanResourcesEmployee.GridEmployees.DataSource.Title);
var cGridEmployeesDateNaissance = vHumanResourcesEmployee.GridEmployees.AddGridColumn("DateNaissance", "Span");
cGridEmployeesDateNaissance.Text.BindData(vHumanResourcesEmployee.GridEmployees.DataSource.BirthDate, "dd MMMM yyyy");
var cGridEmployeesMarital = vHumanResourcesEmployee.GridEmployees.AddGridColumn("Marital", "Span");
cGridEmployeesMarital.Text.BindData(vHumanResourcesEmployee.GridEmployees.DataSource.MaritalStatus);
var cGridEmployeesGenre = vHumanResourcesEmployee.GridEmployees.AddGridColumn("Genre", "Span");
cGridEmployeesGenre.Text.BindData(vHumanResourcesEmployee.GridEmployees.DataSource.Gender);
var cGridEmployeesEmbauche = vHumanResourcesEmployee.GridEmployees.AddGridColumn("Embauche", "Span");
cGridEmployeesEmbauche.Text.BindData(vHumanResourcesEmployee.GridEmployees.DataSource.HireDate, "dd MMMM yyyy");
var cGridEmployeesSalariedFlag = vHumanResourcesEmployee.GridEmployees.AddGridColumn("SalariedFlag", "SpanCheck");
cGridEmployeesSalariedFlag.Text.BindData(vHumanResourcesEmployee.GridEmployees.DataSource.SalariedFlag);

var vHumanResourcesStat = Aspectize.CreateView("HumanResourcesStat", aas.Controls.HumanResourcesStat, "HumanResourcesTab.2:Statistiques");
vHumanResourcesStat.MaritalStatusChart.BindGrid(aas.Data.MainData.EmployeeStat, "YearMin ASC");
var cMaritalStatusChartX = vHumanResourcesStat.MaritalStatusChart.AddGridColumn("X", "Dhtmlx.DhtmlxChartXAxis");
cMaritalStatusChartX.Value.BindData(vHumanResourcesStat.MaritalStatusChart.DataSource.YearMin);
cMaritalStatusChartX.Title.BindData("BirthDate Decade");
var cMaritalStatusChartM = vHumanResourcesStat.MaritalStatusChart.AddGridColumn("M", "Dhtmlx.DhtmlxChartYAxis");
cMaritalStatusChartM.Value.BindData(vHumanResourcesStat.MaritalStatusChart.DataSource.NbMale);
cMaritalStatusChartM.Title.BindData("Male - Female");
cMaritalStatusChartM.ItemBorderColor.BindData("#599EC8");
cMaritalStatusChartM.ItemBorderWidth.BindData("1");
cMaritalStatusChartM.ItemColor.BindData("#FFFFFF");
cMaritalStatusChartM.ItemRadius.BindData("3");
cMaritalStatusChartM.LineColor.BindData("#599EC8");
cMaritalStatusChartM.LineWidth.BindData("2");
var cMaritalStatusChartF = vHumanResourcesStat.MaritalStatusChart.AddGridColumn("F", "Dhtmlx.DhtmlxChartYAxis");
cMaritalStatusChartF.Value.BindData(vHumanResourcesStat.MaritalStatusChart.DataSource.NbFemale);
cMaritalStatusChartF.Title.BindData("Male - Female");

var vHumanResourcesTab = Aspectize.CreateView("HumanResourcesTab", aas.Controls.AspectizeNewTab, aas.Zones.MainControl.ZoneContent);
vHumanResourcesTab.className.BindData("TabVertical");
vHumanResourcesTab.OnLoad.BindCommand(aas.Services.Server.HumanResourceService.LoadEmployeeStat, {}, aas.Data.MainData, true, true);

