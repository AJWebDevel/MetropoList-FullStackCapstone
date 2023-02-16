using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyManagerAPI.Models;
using MyManagerAPI.Repositories;

namespace MyManagerAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly INoteRepository _noteRepository;
        public NoteController(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }



        // GET: NoteController/Details/5
        [HttpGet("{id}")]
        public ActionResult Details(int id)
        {
            var note = _noteRepository.GetNotesByUser(id);
            return Ok(note);
        }



        // POST: NoteController/Create
        [HttpPost]
        public ActionResult Create(Note note)
        {
                _noteRepository.AddNote(note);
                return NoContent();
        }


        // POST: NoteController/Delete/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
                _noteRepository.DeleteNote(id);
                return NoContent();
            
        } 
    }
}
