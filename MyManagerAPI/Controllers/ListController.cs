using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyManagerAPI.Repositories;

namespace MyManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListController : ControllerBase
    {
        private readonly IListRepository _listRepository;
        public ListController(IListRepository listRepository)
        {
            _listRepository = listRepository;
        }

        // GET: ListController
        [HttpGet]
        public ActionResult Index()
        {
            var lists = _listRepository.GetAllLists();
            return Ok(lists);
        }

        [HttpGet("userId")]
        public ActionResult ListsByUser(int id)
        {
            var UsersLists = _listRepository.GetListsByUser(id);
            return Ok(UsersLists);
        }

        // GET: ListController/Details/5
        [HttpGet("/ListDetails/{id}")]
        public ActionResult Details(int id)
        {
            return Ok();
        }

        // POST: ListController/Create
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

        // GET: ListController/Edit/5
        [HttpPut]
        public ActionResult Edit(int id)
        {
            return Ok();
        }   

        // POST: ListController/Edit/5
        [HttpPut("${id}")]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
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


        // POST: ListController/Delete/5
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
