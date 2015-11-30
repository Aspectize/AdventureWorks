
var vParameterLogo = Aspectize.CreateView("ParameterLogo", aas.Controls.ParameterLogo, "ParameterTab.1:Logo", true);
vParameterLogo.UploaderLogo.Text.BindData("Télécharger un fichier pour changer le logo du site");
vParameterLogo.UploaderLogo.OnFileSelected.BindCommand(aas.Services.Server.AdminService.UploadLogoFile, {data: vParameterLogo.UploaderLogo.SelectedFile, info: ""}, aas.Data.LogoGuid, true);

var vParameterTab = Aspectize.CreateView("ParameterTab", aas.Controls.AspectizeNewTab, aas.Zones.MainControl.ZoneContent);
vParameterTab.className.BindData("TabVertical");

