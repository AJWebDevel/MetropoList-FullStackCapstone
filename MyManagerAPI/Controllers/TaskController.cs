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
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;
        public TaskController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }


        //get task by list id
        // GET: TaskController/Details/5
        [HttpGet("{id}")]
        public ActionResult TasksByList(int id)
        {
            var listTasks = _taskRepository.GetTasksByListId(id);
            return Ok(listTasks);
        }

        [HttpGet("/TaskById/{id}")]
        public ActionResult TaskById(int id)
        {
            var task = _taskRepository.GetTaskById(id);
            return Ok(task);
        }

        // POST: TaskController/Create
        [HttpPost]
        public ActionResult Create(Task task)
        {
            _taskRepository.AddTask(task);
            return NoContent();
        }


        // POST: TaskController/Edit/5
        [HttpPut("{id}")]
        public ActionResult Edit(int id, Task task)
        {
            if (id != task.UserId)
            {
                return BadRequest();
            }

            _taskRepository.UpdateTask(task);
                return NoContent();
            
        }


        // POST: TaskController/Delete/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
                _taskRepository.DeleteTask(id);
                return NoContent();
        }
    }
}
