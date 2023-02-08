using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyManagerAPI.Repositories;

namespace MyManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;
        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }
        // GET: TagController
        [HttpGet]
        public ActionResult Index()
        {
            var tags = _tagRepository.GetAllTags();
            return Ok(tags);
        }

        /* GET: TagController/Details/5
        public ActionResult Details(int id)
        {
            return Ok();
        }*/

        /* GET: TagController/Create
        public ActionResult Create()
        {
            return Ok();
        }*/

        // POST: TagController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return Ok();
            }
        }



        /* GET: TagController/Delete/5
        public ActionResult Delete(int id)
        {
            return Ok();
        }*/

        // POST: TagController/Delete/5
        [HttpDelete]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return Ok();
            }
        }
    }
}
