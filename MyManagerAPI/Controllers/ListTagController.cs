using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyManagerAPI.Models;
using MyManagerAPI.Repositories;

namespace MyManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListTagController : ControllerBase
    {
        private readonly IListTagRepository _listTagRepository;
        public ListTagController(IListTagRepository listTagRepository)
        {
            _listTagRepository = listTagRepository;
        }


        // GET: ListTagController/Details/5
        //getby list id
        [HttpGet("ListTagsByList/{id}")]
        public ActionResult Details(int id)
        {
           var listTags = _listTagRepository.GetListTagByListId(id);
            return Ok(listTags);
        }


        // POST: ListTagController/Create
        [HttpPost("CreateListTag")]
        public ActionResult Create(ListTag listTag)
        {
          _listTagRepository.AddListTag(listTag);
            return NoContent();
        }



        // POST: ListTagController/Delete/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _listTagRepository.DeleteListTag(id);
            return NoContent();
        }
    }
}
