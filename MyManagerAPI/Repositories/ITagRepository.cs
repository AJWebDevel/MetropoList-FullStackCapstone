using System.Collections.Generic;
using MyManagerAPI.Models;

namespace MyManagerAPI.Repositories
{
    public interface ITagRepository
    {
        public List<Tag> GetAllTags();
        public void AddTag(Tag tag);
        public void DeleteTag(int id);
    }
}
