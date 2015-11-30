using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Aspectize.Core;
using AdventureWorks.HumanResources;
using AdventureWorks.Person;

namespace AdventureWorks
{
    public interface IHumanResourceService
    {
        [Command(DynamicAttributes = "Cache = 30 Days")]
        DataSet LoadEmployeeStat();
    }

    [Service(Name = "HumanResourceService")]
    public class HumanResourceService : IHumanResourceService //, IInitializable, ISingleton
    {

        DataSet IHumanResourceService.LoadEmployeeStat()
        {
            IDataManager dataManager = EntityManager.FromDataBaseService(ServiceName.ADWDB);

            IEntityManager em = dataManager as IEntityManager;

            List<IRoleRelationQuery> roleRelations = new List<IRoleRelationQuery>();

            roleRelations.Add(new RoleRelationQuery<Employee, EmployeeContact>());

            dataManager.LoadEntitiesGraph<Employee>(roleRelations);

            foreach (Employee employee in em.GetAllInstances<Employee>())
            {
                int birthYear = employee.BirthDate.Year - 1900;

                EmployeeStat employeeStat = em.GetAllInstances<EmployeeStat>().Find(item => (item.YearMin <= birthYear &&  birthYear <= item.YearMax));

                if (employeeStat == null)
                {
                    employeeStat = em.CreateInstance<EmployeeStat>();

                    employeeStat.YearMin = (int) System.Math.Floor((decimal)((birthYear) / 5)) * 5;
                    employeeStat.YearMax = employeeStat.YearMin + 5;
                }

                if (employee.Gender == "M") employeeStat.NbMale++;
                if (employee.Gender == "F") employeeStat.NbFemale++;
            }

            dataManager.Data.AcceptChanges();

            return dataManager.Data;

        }
    }

}
