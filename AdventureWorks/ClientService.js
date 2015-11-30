Global.ClientService = {

    aasService: 'ClientService',
    aasPublished: true,

    aasCommandAttributes: {
        LoadProduct: { CanExecuteOnStart: true }
    },

    LoadProduct: function (CategoryID, SubCategoryID, ProductID) {
        function cmd() {
            var cmd = Aspectize.Host.PrepareCommand();
            cmd.Attributes.aasMergeData = true;
            cmd.Attributes.aasDataName = 'MainData';
            return cmd;
        }
        cmd().Call('Server/ProductionService.LoadCategories');
        cmd().Call('Server/ProductionService.LoadSubcategories', CategoryID);
        cmd().Call('Server/ProductionService.LoadProducts', SubCategoryID);
        Aspectize.Host.ExecuteCommand('Browser/UIService.ShowView', 'ProductDetail');
        Aspectize.Host.ExecuteCommand('Browser/UIService.SetCurrent', 'MainData.Category', CategoryID);
        Aspectize.Host.ExecuteCommand('Browser/UIService.SetCurrent',
                                      'MainData.Category.CategorySubcategory.Subcategory', SubCategoryID);
        Aspectize.Host.ExecuteCommand('Browser/UIService.SetCurrent',
                                      'MainData.Category.CategorySubcategory.Subcategory.ProductSubcategory.Product',
                                      ProductID);

    },

    DeleteData: function (id) {
        var em = Aspectize.EntityManagerFromContextDataName('MainData');

        em.DeleteInstance('Category', { CategoryID: id });
    }

}

Global.ClientGraphService = {

    aasService: 'ClientGraphService',
    aasPublished: true,

    RefreshGraph: function (graphControlId) {

        var graphControl = document.getElementById(graphControlId);

        Aspectize.ProtectedCall(graphControl.aasDxChart, graphControl.aasDxChart.refresh);
    },

    GetGraphEnd: function (maxValue) {

        var step = this.GetGraphStep(maxValue);
        var max = 0;

        while (max < maxValue) {

            max += step;
        }

        return max;
    },

    GetGraphStep: function (maxValue) {

        var copy = maxValue;
        var pow = 1

        while (copy > 10) {

            copy = copy / 10;
            pow++;
        }

        return Math.pow(10, pow - 1);
    }
};

