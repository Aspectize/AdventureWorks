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

    }

}
