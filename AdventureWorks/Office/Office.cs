using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Aspectize.Core;
using System.IO;
using Aspectize.Office;

namespace AdventureWorks.Office {
    public interface IOffice {

        byte[] ExportExcel(string fileName);
        void ImportExcel(Stream xlDataStream, string fileName);
    }

    [Service(Name = "Office")]
    public class Office : IOffice //, IInitializable, ISingleton
    {

        #region IOffice Members

        byte[] IOffice.ExportExcel(string fileName) {

            var svc = ExecutingContext.GetService<IProductionService>("ProductionService");

            var ds = svc.LoadAllProducts();
            byte[] bytes = null;

            //if (fileName.EndsWith(".xls")) {

            var tempFileName = Context.MapPath(@"~\" + fileName);

            Aspectize.ExcelHelper.SaveToFile(tempFileName, ds);

            bytes = File.ReadAllBytes(tempFileName);

            File.Delete(tempFileName);

            //} else {

            //    var xlSvc = ExecutingContext.GetService<IAspectizeExcel>("AspectizeExcel");

            //    bytes = xlSvc.ToExcel(ds, null);                
            //}

            ExecutingContext.SetHttpDownloadFileName(fileName);

            return bytes;

        }

        void IOffice.ImportExcel(Stream xlDataStream, string fileName) {

        }

        #endregion
    }

}
