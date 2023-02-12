using MyManagerAPI.Models;
using System.Collections.Generic;

namespace MyManagerAPI.Repositories
{
    public interface IListRepository
    {
        public List<List> GetAllLists();
        public List<List> GetListsByUser(int id);
        public void Update(List list);
        public List GetListById(int id);
        public void AddList(List list);
        public void DeleteList(int id);
        
    }
}
