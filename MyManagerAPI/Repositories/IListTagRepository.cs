using MyManagerAPI.Models;
using System.Collections.Generic;

namespace MyManagerAPI.Repositories
{
    public interface IListTagRepository
    {
        void AddListTag(ListTag listTag);
        void DeleteListTag(int id);
        List<ListTag> GetListTagByListId(int id);
    }
}
