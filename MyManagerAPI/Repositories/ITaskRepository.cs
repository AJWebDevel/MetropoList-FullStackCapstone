using MyManagerAPI.Models;
using System.Collections.Generic;

namespace MyManagerAPI.Repositories
{
    public interface ITaskRepository
    {
        public Task GetTaskById(int id);
        public List<Task> GetTasksByListId(int id);
        public void UpdateTask(Task task);
        public void DeleteTask(int id);
        public void AddTask(Task task);
    }
}
