using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Aspectize.Core;
using AdventureWorks.Sales;

namespace AdventureWorks
{
    public interface ISalesService
    {
        [Command(DynamicAttributes = "Cache = 30 Days")]
        DataSet LoadSalesPersons();

        [Command(DynamicAttributes = "Cache = 30 Days")]
        DataSet LoadSalesPersonQuotaHistory(int salesPersonId);
    }

    [Service(Name = "SalesService")]
    public class SalesService : ISalesService //, IInitializable, ISingleton
    {
        DataSet ISalesService.LoadSalesPersons()
        {
            IDataManager dataManager = EntityManager.FromDataBaseService(ServiceName.ADWDB);

            List<IRoleRelationQuery> roleRelations = new List<IRoleRelationQuery>();

            roleRelations.Add(new RoleRelationQuery<SalesPerson, ContactSalesPerson>());
            
            dataManager.LoadEntitiesGraph<SalesPerson>(roleRelations);

            return dataManager.Data;
        }


        DataSet ISalesService.LoadSalesPersonQuotaHistory(int salesPersonId)
        {
            IDataManager dataManager = EntityManager.FromDataBaseService(ServiceName.ADWDB);

            dataManager.LoadEntityFields<SalesPerson>(EntityLoadOption.AllFields, salesPersonId);

            return dataManager.Data;
        }
    }

}
