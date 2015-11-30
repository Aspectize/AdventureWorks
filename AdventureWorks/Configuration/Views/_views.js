
var vControlLogo = Aspectize.CreateView("ControlLogo", aas.Controls.ControlLogo, aas.Zones.MainControl.ZoneBandeauHaut, true);
vControlLogo.ImageLogo.OnNeedImage.BindCommand(aas.Services.Server.AdminService.GetLogo, {logoId: aas.Data.LogoGuid});

var vMainControl = Aspectize.CreateView("MainControl", aas.Controls.MainControl);
var n0Product = vMainControl.MainMenu.AddNodeBinding('TreeNode', '');
n0Product.Text.BindData("Product");
n0Product.Click.BindCommand(aas.Services.Browser.UIService.ShowView, {viewName: aas.ViewName.ProductLayout});
var n0Sales = vMainControl.MainMenu.AddNodeBinding('TreeNode', '');
n0Sales.Text.BindData("Sales");
n0Sales.Click.BindCommand(aas.Services.Browser.UIService.ShowView, {viewName: aas.ViewName.SalesPerson});
var n0HumanResourcesStat = vMainControl.MainMenu.AddNodeBinding('TreeNode', '');
n0HumanResourcesStat.Text.BindData("HumanResources");
n0HumanResourcesStat.Click.BindCommand(aas.Services.Browser.UIService.ShowView, {viewName: aas.ViewName.HumanResourcesTab});
var n0Parameters = vMainControl.MainMenu.AddNodeBinding('TreeNode', '');
n0Parameters.Text.BindData("Parameters");
n0Parameters.className.BindData("MenuRight");
n0Parameters.Click.BindCommand(aas.Services.Browser.UIService.ShowView, {viewName: aas.ViewName.ParameterTab});

