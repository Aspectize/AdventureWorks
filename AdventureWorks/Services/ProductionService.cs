using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Aspectize.Core;
using AdventureWorks.Production;
using Aspectize.Core;

namespace AdventureWorks
{
    public interface IProductionService
    {
        DataSet LoadAllProducts ();
        DataSet LoadCategories ();
        DataSet LoadCategories2and4 ();
        DataSet LoadSubcategories (int categoryID);
        DataSet LoadProducts(int subcategoryID);
        Byte[] LoadImage(int productId);
        void TestHistory(int productId);
    }

    [Service(Name = "ProductionService")]
    public class ProductionService : IProductionService //, IInitializable, ISingleton
    {
        #region IADWService Members

        DataSet IProductionService.LoadAllProducts() {

            IDataManager dataManager = EntityManager.FromDataBaseService(ServiceName.ADWDB);

            dataManager.LoadDatabaseEnum<UnitMeasure>();

            dataManager.LoadEntities<Product>();

            return dataManager.Data;
        }

        DataSet IProductionService.LoadCategories()
        {
            IDataManager dataManager = EntityManager.FromDataBaseService(ServiceName.ADWDB);

            dataManager.LoadEntities<Category>();

            return dataManager.Data;
        }

        DataSet IProductionService.LoadCategories2and4 () {
            IDataManager dataManager = EntityManager.FromDataBaseService(ServiceName.ADWDB);

            var one = new QueryCriteria(Category.Fields.CategoryID, ComparisonOperator.Equal, 2);
            var two = new QueryCriteria(Category.Fields.CategoryID, ComparisonOperator.Equal, 4);
            dataManager.LoadEntities<Category>( one.OR(two));

            return dataManager.Data;
        }

        DataSet IProductionService.LoadSubcategories(int categoryID)
        {
            IDataManager dataManager = EntityManager.FromDataBaseService(ServiceName.ADWDB);

            dataManager.LoadAssociated<Subcategory, CategorySubcategory>(categoryID);

            return dataManager.Data;
        }

        DataSet IProductionService.LoadProducts(int subcategoryID)
        {
            IDataManager dataManager = EntityManager.FromDataBaseService(ServiceName.ADWDB);

            dataManager.LoadDatabaseEnum<UnitMeasure>();

            var relations = new List<IRoleRelationQuery>();
            relations.Add(new RoleRelationQuery<Subcategory, ProductSubcategory>());
            relations.Add(new RoleRelationQuery<Product, ProductProductPhoto>());
            dataManager.LoadEntitiesGraph<Subcategory>(relations, subcategoryID);

            return dataManager.Data;
        }

        Byte[] IProductionService.LoadImage(int productId)
        {
            IDataManager dataManager = EntityManager.FromDataBaseService(ServiceName.ADWDB);

            List<ProductPhoto> productPhotos = dataManager.GetAssociated<ProductPhoto, ProductProductPhoto>(productId);

            if (productPhotos.Count > 0)
            {
                return productPhotos[0].LargePhoto;
            }

            return new Byte[0];
        }

        void IProductionService.TestHistory(int productId)
        {
            IDataManager dataManager = EntityManager.FromDataBaseService(ServiceName.ADWDB);

            IEntityManager em = dataManager as IEntityManager;

            dataManager.LoadHistoryInfoEntities<Product>();

            foreach (HistoryInfo hst in em.GetAllInstances<HistoryInfo>())
            {
                Product oldProduct = em.GetInstanceFromHistory<Product>(hst);
            }
        }

        #endregion
    }

}
