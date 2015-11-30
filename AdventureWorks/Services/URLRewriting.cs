using Aspectize.Core;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Aspectize.Web;
using System;

namespace AdventureWorks.Services
{
    [Service(Name = "ProductURLRewriter")]
    public class ProductURLRewriter : IURLRewritingService
    {

        //List<RewriteRule> IURLRewritingService.GetRewriteRules()
        //{
        //    var res = new List<RewriteRule>();
        //    var pattern = new Regex("products/([0-9]+)/([0-9]+)/([0-9]+).html");
        //    var replacement = "app.ashx?@ClientService.LoadProduct&CategoryID=$1&SubCategoryID=$2&ProductID=$3";
        //    res.Add(new RewriteRule(pattern, replacement));
        //    return res;
        //}

        #region IURLRewritingService Members

        List<RewriteOrRedirect> IURLRewritingService.GetTranslators () {

            var translators = new List<RewriteOrRedirect>();

            var pattern = new Regex("AdventureWorks/products/([0-9]+)", RegexOptions.IgnoreCase);

            translators.Add ( (Uri url, ref bool redirect) => {

                redirect = false;

                var m = pattern.Match (url.OriginalString);

                if (m.Success) {                    

                    var id = m.Groups[1].Value;
                    var cmd = String.Format("AdventureWorks/ProductionService.LoadImage.jpg.cmd.ashx?productId={0}", id);

                    var translated = pattern.Replace(url.AbsoluteUri, cmd);

                    return translated;

                } else return null;

            });

            return translators;
        }

        #endregion
    }
}