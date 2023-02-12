using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyManagerAPI.Models;
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

        [HttpGet("{id}")]
        public ActionResult ListsByUser(int id)
        {
            var UsersLists = _listRepository.GetListsByUser(id);
            return Ok(UsersLists);
        }

        // GET: ListController/Details/5
        [HttpGet("/ListDetails/{id}")]
        public ActionResult Details(int id)
        {
            var list = _listRepository.GetListById(id);
            return Ok(list);
        }

        // POST: ListController/Create
        [HttpPost]
        public ActionResult Create(List list)
        {
            _listRepository.AddList(list);
            return NoContent();
        }



        // POST: ListController/Edit/5
        [HttpPut("{id}")]
        public ActionResult Edit(int id, List list)
        {
            if (id != list.UserId)
            {
                return BadRequest();
            }
            
            _listRepository.Update(list);
                return NoContent();
            
        }


        // POST: ListController/Delete/5
        [HttpDelete]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
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
