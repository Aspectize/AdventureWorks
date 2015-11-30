
var vSalesPerson = Aspectize.CreateView("SalesPerson", aas.Controls.SalesPerson, aas.Zones.MainControl.ZoneContent);
vSalesPerson.OnLoad.BindCommand(aas.Services.Server.SalesService.LoadSalesPersons, {}, aas.Data.MainData, true, true);
vSalesPerson.GridSalesPerson.BindGrid(aas.Data.MainData.SalesPerson);
vSalesPerson.GridSalesPerson.OnRowClick.BindCommand(aas.Services.Server.SalesService.LoadSalesPersonQuotaHistory, {salesPersonId: aas.Data.MainData.SalesPerson.SalesPersonID}, aas.Data.MainData, true, true);
vSalesPerson.GridSalesPerson.OnRowClick.BindCommand(aas.Services.Browser.UIService.ShowView, {viewName: aas.ViewName.SalesGraph});
//vSalesPerson.GridSalesPerson.OnRowClick.BindCommand(aas.Services.Browser.DhtmlxChartService.RefreshGraph, { graphControlId: aas.ViewName.SalesGraph.SalesPersonQuotaChart });
var cGridSalesPersonPrénom = vSalesPerson.GridSalesPerson.AddGridColumn("Prénom", "Span");
cGridSalesPersonPrénom.Text.BindData(vSalesPerson.GridSalesPerson.DataSource.ContactSalesPerson.Contact.FirstName);
var cGridSalesPersonNom = vSalesPerson.GridSalesPerson.AddGridColumn("Nom", "Span");
cGridSalesPersonNom.Text.BindData(vSalesPerson.GridSalesPerson.DataSource.ContactSalesPerson.Contact.LastName);

var vSalesGraph = Aspectize.CreateView("SalesGraph", aas.Controls.SalesGraph, aas.Zones.SalesPerson.ZoneGraph);
vSalesGraph.SalesPerson.BindData(aas.Expression(aas.Data.MainData.SalesPerson.ContactSalesPerson.Contact.FirstName + ' ' + aas.Data.MainData.SalesPerson.ContactSalesPerson.Contact.LastName));
vSalesGraph.SalesPersonQuotaChart.BindGrid(aas.Data.MainData.SalesPerson.QuotaHistory, "QuotaDate ASC");
var cSalesPersonQuotaChartDate = vSalesGraph.SalesPersonQuotaChart.AddGridColumn("Date", "Dhtmlx.DhtmlxChartXAxis");
cSalesPersonQuotaChartDate.Value.BindData(vSalesGraph.SalesPersonQuotaChart.DataSource.QuotaDate, "MM/yyyy");
cSalesPersonQuotaChartDate.Title.BindData("Date");
var cSalesPersonQuotaChartQuota = vSalesGraph.SalesPersonQuotaChart.AddGridColumn("Quota", "Dhtmlx.DhtmlxChartYAxis");
cSalesPersonQuotaChartQuota.Value.BindData(vSalesGraph.SalesPersonQuotaChart.DataSource.SalesQuota);
cSalesPersonQuotaChartQuota.Title.BindData("Ventes");
cSalesPersonQuotaChartQuota.Start.BindData("0");
cSalesPersonQuotaChartQuota.ItemBorderColor.BindData("#599EC8");
cSalesPersonQuotaChartQuota.ItemBorderWidth.BindData("1");
cSalesPersonQuotaChartQuota.ItemColor.BindData("#FFFFFF");
cSalesPersonQuotaChartQuota.ItemRadius.BindData("3");
cSalesPersonQuotaChartQuota.LineColor.BindData("#599EC8");
cSalesPersonQuotaChartQuota.LineWidth.BindData("2");

