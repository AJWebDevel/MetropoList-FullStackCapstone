using System.Collections.Generic;
using MyManagerAPI.Models;

namespace MyManagerAPI.Repositories
{
    public interface ITagRepository
    {
        public List<Tag> GetAllTags();
    }
}
