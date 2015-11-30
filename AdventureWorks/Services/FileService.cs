using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Aspectize.Core;
using System.IO;
using Aspectize.Scheduling;
using AdventureWorks.Production;
using AdventureWorks.HumanResources;
using AdventureWorks.Person;
using AdventureWorks.Sales;

namespace AdventureWorks
{
    public interface IAdminService
    {
        byte[] GetLogo(Guid logoId);
        Guid UploadLogoFile(Stream data, Dictionary<string, object> info);
        void InitTimerService();
        void ResetDataBase();
    }

    [Service(Name = "AdminService")]
    public class AdminService : IAdminService //, IInitializable, ISingleton
    {
        const string AdventureWorksFileService = "AdventureWorksFileService";

        byte[] IAdminService.GetLogo(Guid logoId)
        {
            IFileService fileService = ExecutingContext.GetService<IFileService>(AdventureWorksFileService);

            return fileService.ReadBytes("Logo");
        }

        Guid IAdminService.UploadLogoFile(Stream data, Dictionary<string, object> info)
        {
            IFileService fileService = ExecutingContext.GetService<IFileService>(AdventureWorksFileService);

            fileService.Write("Logo", data);

            return Guid.NewGuid();
        }


        void IAdminService.InitTimerService()
        {
            var schedule0 = ScheduleCommand.RunEvery(1, PeriodUnit.Day, "AdventureWorks/AdminService.ResetData", null, new DateTime(DateTime.Today.AddHours(2).Ticks, DateTimeKind.Utc), null);

        }

        void IAdminService.ResetDataBase()
        {
            IFileService fs = ExecutingContext.GetService<IFileService>(ServiceName.ADWDemoFileService);

            var dataDemo = fs.Read("DataDemo");

            var ds = DataSetHelper.BinaryLoad(dataDemo);

            IDataManager dm = EntityManager.FromDataBaseService(ServiceName.ADWDB);

            var relations = new List<IRoleRelationQuery>();

            relations.Add(new RoleRelationQuery<Category, CategorySubcategory>());
            relations.Add(new RoleRelationQuery<Subcategory, ProductSubcategory>());
            relations.Add(new RoleRelationQuery<Product, ProductProductPhoto>());

            dm.LoadEntitiesGraph<Category>(relations);

            relations = new List<IRoleRelationQuery>();

            relations.Add(new RoleRelationQuery<Employee, EmployeeManager>());
            relations.Add(new RoleRelationQuery<Employee, EmployeeContact>());

            dm.LoadEntitiesGraph<Employee>(relations);

            relations = new List<IRoleRelationQuery>();

            relations.Add(new RoleRelationQuery<SalesPerson, ContactSalesPerson>());
            relations.Add(new RoleRelationQuery<SalesPerson, SalesOrderHeaderSalesPerson>());
            relations.Add(new RoleRelationQuery<SalesOrderHeader, SalesOrderHeaderSalesReason>());

            dm.LoadEntitiesGraphFields<SalesPerson>(EntityLoadOption.AllFields, relations);

            dm.LoadEntities<SalesReason>();

            DataSetHelperEx.Merge(ds, dm.Data);

            dm.SaveTransactional();
        }

    }

}
