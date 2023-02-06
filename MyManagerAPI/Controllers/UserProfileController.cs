using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using MyManagerAPI.Repositories;
using MyManagerAPI.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace MyManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        // GET: UserProfileController
        [HttpGet]
        public ActionResult Index()
        {
            var users = _userProfileRepository.GetAllUsers();
            return Ok(users);
        }

        // GET: UserProfileController/Details/5
        [HttpGet("/Details/{id}")]
        public ActionResult GetUserDetails(int id)
        {
            var user = _userProfileRepository.GetUserById(id);
            return Ok(user);
        }


        // POST: UserProfileController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(UserProfile userProfile)
        {
       
                _userProfileRepository.Add(userProfile);
                return CreatedAtAction("Get", new { id = userProfile.Id }, userProfile);
    
        }

        // GET: UserProfileController/Edit/5
        [HttpPut]
        public ActionResult EditUser(int id)
        {
            return Ok();
        }

        // POST: UserProfileController/Edit/5
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
        [HttpGet("{CurrentUser}")]
        public UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }


    }
}
