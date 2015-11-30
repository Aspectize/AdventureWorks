using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Aspectize.Core;
using AutoIdentity;

namespace AdventureWorks
{
    [Service(Name = "AzureAutoIdentityService")]
    public class AzureAutoIdentityService : IAutoIdentityService //, IInitializable, ISingleton
    {
        [ParameterAttribute(DefaultValue = DBMS.SQLServer2000)]
        internal DBMS DataBaseType = DBMS.SQLServer2000;

        #region IAutoIdentityService Members

        object IAutoIdentityService.GetAutoIdentityValue(string fullTableName)
        {
            IDataBaseService dataBaseService = ExecutingContext.GetService<IDataBaseService>(ServiceName.ADWDB);

            IDataManager dataManager = EntityManager.FromDataBaseService(ServiceName.ADWDB);

            if (DataBaseType == DBMS.AzureStorage)
            {
                TableId tableId = dataManager.GetEntity<TableId>(fullTableName);

                if (tableId != null)
                {
                    tableId.NextId++;
                }
                else
                {
                    IEntityManager em = dataManager as IEntityManager;

                    tableId = em.CreateInstance<TableId>();

                    tableId.TableName = fullTableName;
                    tableId.NextId = 1;
                }

                dataManager.SaveTransactional();

                return tableId.NextId;
            }
            else
            {
                return dataManager.GetNextId(fullTableName);
            }

        }

        #endregion
    }

    internal static class ServiceName
    {
        internal const string ADWDB = "AdventureWorksDataBaseService";
        internal const string ADWDemoFileService = "ADWDemoFileService";
    }

}
