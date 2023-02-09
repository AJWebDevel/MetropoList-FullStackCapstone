using MyManagerAPI.Models;
using System.Collections.Generic;

namespace MyManagerAPI.Repositories
{
    public interface INoteRepository
    {
        public Note GetNoteByUser(int id);
    }
}
