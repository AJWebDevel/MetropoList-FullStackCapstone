using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyManagerAPI.Models;
using MyManagerAPI.Repositories;
using System.Collections.Generic;
using System.Security.Claims;

namespace MyManagerAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ListController : ControllerBase
    {
        private readonly IListRepository _listRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public ListController(IListRepository listRepository, IUserProfileRepository userProfileRepository)
        {
            _listRepository = listRepository;
            _userProfileRepository = userProfileRepository;
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


      
       private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);

        }



        // POST: ListController/Edit/5
        [HttpPut("{id}")]
        public ActionResult Edit( List list)
        {
            if ( GetCurrentUserProfile().Id != list.UserId)
            {
                return BadRequest();
            }
            
            _listRepository.Update(list);
                return NoContent();
            
        }


        // POST: ListController/Delete/5
        [HttpDelete("{id}")]
   
        public ActionResult Delete(int id)
        {
            _listRepository.DeleteList(id);
                return Ok();
            
        }
    }
}
