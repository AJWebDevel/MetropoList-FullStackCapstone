using Microsoft.AspNetCore.Authentication.OAuth.Claims;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using MyManagerAPI.Models;
using MyManagerAPI.Utils;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;

namespace MyManagerAPI.Repositories
{
    public class TaskRepository : BaseRepository, ITaskRepository
    {
        public TaskRepository(IConfiguration configuration) : base(configuration) { }
        //gettasks bylistid
        public List<Task> GetTasksByListId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT t.Id AS TaskId, t.ListId, t.DateDue, t.UserId, t.IsImportant, t.Title, t.Description,
                                l.Id AS LId, l.ListName
                                FROM Task t
                                JOIN List l ON l.Id = t.ListId
                                WHERE l.Id = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);


                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var tasks = new List<Task>();
                        while (reader.Read())
                        {
                            var taskId = DbUtils.GetInt(reader, "TaskId");
                            var existingTask = tasks.FirstOrDefault(l => l.Id == taskId);
                            if (existingTask == null)
                            {
                                existingTask = new Task()
                                {
                                    Id = DbUtils.GetInt(reader, "TaskId"),
                                    ListId = DbUtils.GetInt(reader, "LId"),
                                    DateDue = DbUtils.GetDateTime(reader, "DateDue"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    IsImportant = DbUtils.GetBool(reader, "IsImportant"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    List = new List()
                                    {
                                        Id = DbUtils.GetInt(reader, "LId"),
                                        ListName = DbUtils.GetString(reader, "ListName")
                                    }
                                };
                                tasks.Add(existingTask);
                            }
                        };
                        return tasks;
                    }
                }
            }
        }

        //gettaskbyId
        //gettasks bylistid
        public Task GetTaskById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT t.Id AS TaskId, t.ListId, t.DateDue, t.UserId, t.IsImportant, t.Title, t.Description,
                                l.Id AS LId, l.ListName
                                FROM Task t
                                JOIN List l ON l.Id = t.ListId
                                WHERE t.Id = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);


                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Task task = null; 
                        while (reader.Read())
                        {
                         
                                task = new Task()
                                {
                                    Id = DbUtils.GetInt(reader, "TaskId"),
                                    ListId = DbUtils.GetInt(reader, "LId"),
                                    DateDue = DbUtils.GetDateTime(reader, "DateDue"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    IsImportant = DbUtils.GetBool(reader, "IsImportant"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    List = new List()
                                    {
                                        Id = DbUtils.GetInt(reader, "LId"),
                                        ListName = DbUtils.GetString(reader, "ListName")
                                    }
                                };
                        };
                        return task;
                    }
                }
            }
        }

        //update
        public void UpdateTask(Task task)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Task
                            SET ListId = @LId
                                DateDue = @DateDue
                                IsImportant = @IsImportant,
                                Title = @Title,
                                Description = @Description
                            WHERE Id = @Id;";
                    DbUtils.AddParameter(cmd, "@LId", task.ListId);
                    DbUtils.AddParameter(cmd, "@DateDue", task.DateDue);
                    DbUtils.AddParameter(cmd, "@IsImportant", task.IsImportant);
                    DbUtils.AddParameter(cmd, "@Title", task.Title);
                    DbUtils.AddParameter(cmd, "@Description", task.Description);
                    DbUtils.AddParameter(cmd, "@Id", task.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        //Delete
        public void DeleteTask(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Task
                            WHERE Id = @Id;";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        //create
        public void AddTask(Task task)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Task (UserId, ListId, DateDue, IsImportant, Title, Description)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @ListId, @DateDue, @IsImportant, @Title, @Description);";
                    DbUtils.AddParameter(cmd, "@ListId", task.ListId);
                    DbUtils.AddParameter(cmd, "@DateDue", task.DateDue);
                    DbUtils.AddParameter(cmd, "@IsImportant", task.IsImportant);
                    DbUtils.AddParameter(cmd, "@Title", task.Title);
                    DbUtils.AddParameter(cmd, "@Description", task.Description);
                    DbUtils.AddParameter(cmd, "@UserId", task.UserId);

                    task.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
                   
