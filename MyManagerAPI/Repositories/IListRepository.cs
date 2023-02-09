using MyManagerAPI.Models;
using System.Collections.Generic;

namespace MyManagerAPI.Repositories
{
    public interface IListRepository
    {
        public List<List> GetAllLists();
        public List<List> GetListsByUser(int id);
        public void Update(List list);
        
    }
}
