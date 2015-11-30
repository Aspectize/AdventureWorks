using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Aspectize.Core;

namespace AdventureWorks.Services
{
    [Service(Name = "Sitemap")]
    public class Sitemap : Aspectize.Core.SEO.ISitemapProvider
    {
        List<string> Aspectize.Core.SEO.ISitemapProvider.GetURLs()
        {
            var urls = new List<string>();
            urls.Add("products/1/1/775.html");
            urls.Add("products/1/1/776.html");
            urls.Add("products/1/1/777.html");
            urls.Add("products/1/1/778.html");
            urls.Add("products/1/1/779.html");
            urls.Add("products/1/1/780.html");
            urls.Add("app.ashx?@ClientService.LoadProduct&CategoryID=1&SubCategoryID=2&ProductID=780");
            return urls;
        }
    }
}
