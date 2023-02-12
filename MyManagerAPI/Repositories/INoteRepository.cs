using MyManagerAPI.Models;
using System.Collections.Generic;

namespace MyManagerAPI.Repositories
{
    public interface INoteRepository
    {
        public List<Note> GetNotesByUser(int id);

        public void DeleteNote(int id);
        public void AddNote(Note note);
    }
}
