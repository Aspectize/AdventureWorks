
var vProductArbre = Aspectize.CreateView("ProductArbre", aas.Controls.ProductArbre, aas.Zones.ProductLayout.ZoneArbre, true);
vProductArbre.OnLoad.BindCommand(aas.Services.Server.ProductionService.LoadCategories, {}, aas.Data.MainData, true, true);
var n0Category = vProductArbre.CategoryTree.AddNodeBinding('TreeNode', aas.Data.MainData.Category, false, false, "Name ASC");
n0Category.Text.BindData(n0Category.DataSource.Name);
n0Category.OnFirstExpand.BindCommand(aas.Services.Server.ProductionService.LoadSubcategories, {categoryID: "ContextualData:[Current].CategoryID"}, aas.Data.MainData, true, true);
var n1Subcategory = n0Category.AddNodeBinding('TreeNode', n0Category.ParentData.CategorySubcategory.Subcategory, true, false, "Name ASC");
n1Subcategory.Text.BindData(n1Subcategory.DataSource.Name);
n1Subcategory.OnFirstExpand.BindCommand(aas.Services.Server.ProductionService.LoadProducts, {subcategoryID: "ContextualData:[Current].SubcategoryID"}, aas.Data.MainData, true, true);
var n2Product = n1Subcategory.AddNodeBinding('TreeNode', n1Subcategory.ParentData.ProductSubcategory.Product, true, false, "Name ASC");
n2Product.Text.BindData(n2Product.DataSource.Name);
n2Product.Click.BindCommand(aas.Services.Browser.UIService.ShowView, {viewName: aas.ViewName.ProductDetail});

var vProductLayout = Aspectize.CreateView("ProductLayout", aas.Controls.ProductLayout, aas.Zones.MainControl.ZoneContent);

var vProductDetail = Aspectize.CreateView("ProductDetail", aas.Controls.ProductDetail, aas.Zones.ProductLayout.ZoneElement, false, aas.Data.MainData.Category.CategorySubcategory.Subcategory.ProductSubcategory.Product);
vProductDetail.DynamicControlName.Value.BindData(vProductDetail.ParentData.Name);
vProductDetail.BtnCancel.click.BindCommand(aas.Services.Browser.DataService.CancelRowChange, {schemaPath: aas.Path.MainData.Category.CategorySubcategory.Subcategory.ProductSubcategory.Product});
vProductDetail.BtnCancel.click.BindCommand(aas.Services.Browser.UIService.SetEditMode, {controlName: aas.ViewName.ProductDetail, value: "false"});
vProductDetail.BtnCancel.click.BindCommand(aas.Services.Browser.UIService.SetModalView, {viewName: aas.ViewName.ProductDetail, value: "false"});
vProductDetail.BtnEdit.click.BindCommand(aas.Services.Browser.UIService.SetEditMode, {controlName: aas.ViewName.ProductDetail, value: "true"});
vProductDetail.BtnEdit.click.BindCommand(aas.Services.Browser.UIService.SetModalView, {viewName: aas.ViewName.ProductDetail, value: "true"});
vProductDetail.BtnSave.click.BindCommand(aas.Services.Server.AdventureWorksDataBaseService.SaveTransactional, {dataSet: aas.Data.MainData}, '', false, true, false, "ProductDetail", "Custom", "");
vProductDetail.BtnSave.click.BindCommand(aas.Services.Browser.UIService.SetEditMode, {controlName: aas.ViewName.ProductDetail, value: "false"});
vProductDetail.BtnSave.click.BindCommand(aas.Services.Browser.UIService.SetModalView, {viewName: aas.ViewName.ProductDetail, value: "false"});
vProductDetail.DynamicControlSafetyStockLevel.Value.BindData(vProductDetail.ParentData.SafetyStockLevel);
vProductDetail.TxtSize.value.BindData(vProductDetail.ParentData.Size);
vProductDetail.Size.BindData(vProductDetail.ParentData.Size);
vProductDetail.SizeUnit.BindData(vProductDetail.ParentData.SizeUnitMeasureCode);
vProductDetail.className.BindData(vProductDetail.DynamicControlName.EditMode);
vProductDetail.ProductNumber.BindData(vProductDetail.ParentData.ProductNumber);
vProductDetail.ProductImage.OnNeedImage.BindCommand(aas.Services.Server.ProductionService.LoadImage, {productId: vProductDetail.ParentData.ProductID});
vProductDetail.TxtProductNumber.value.BindData(vProductDetail.ParentData.ProductNumber, "", aas.Enum.BindingMode.OnPropertyChanged, true, "Custom", "");
vProductDetail.SelectUnit.BindList(aas.Data.MainData.UnitMeasure, "UnitMeasureCode", "Name", "Name", "", "");
vProductDetail.SelectUnit.SelectedValue.BindData(vProductDetail.ParentData.SizeUnitMeasureCode);

