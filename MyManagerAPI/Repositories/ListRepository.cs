using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using MyManagerAPI.Models;
using MyManagerAPI.Utils;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace MyManagerAPI.Repositories
{
    public class ListRepository : BaseRepository, IListRepository
    {
        public ListRepository(IConfiguration configuration) : base(configuration) { }

        //get all lists with tasks
        public List<List> GetAllLists()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT l.Id AS ListId, l.UserId AS ListUserId, l.IsPrivate, l.DateCreated, l.IsImportant AS ListImportance, l.ListName,
                       t.Id AS TaskId, t.ListId AS TaskListId, t.DateDue, t.UserId AS TaskUserId, t.IsImportant AS TaskImportance, t.Title, t.Description,
                       lt.Id AS ListTagId, lt.ListId AS ListTagListId, lt.TagId AS ltTagId,
                       tg.Id AS TagId, tg.TagName
                       FROM List l
                       JOIN Task t ON t.ListId = l.Id
                       JOIN ListTag lt ON lt.ListId = l.Id
                       JOIN Tag tg ON tg.Id = lt.TagId";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var lists = new List<List>();
                        while (reader.Read())
                        {
                            var listId = DbUtils.GetInt(reader, "ListId");
                            var existingList = lists.FirstOrDefault(l => l.Id == listId);
                            if (existingList == null)
                            {
                                existingList = new List()
                                {
                                    Id = DbUtils.GetInt(reader, "ListId"),
                                    UserId = DbUtils.GetInt(reader, "ListUserId"),
                                    IsPrivate = DbUtils.GetBool(reader, "IsPrivate"),
                                    DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                                    IsImportant = DbUtils.GetBool(reader, "ListImportance"),
                                    ListName = DbUtils.GetString(reader, "ListName"),
                                    Tasks = new List<Task>(),
                                    Tags = new List<ListTag>()
                                };
                                lists.Add(existingList);
                            }
                            //getting tasks
                            if (DbUtils.IsNotDbNull(reader, "TaskId"))
                            {
                                existingList.Tasks.Add(new Task()
                                {
                                    Id = DbUtils.GetInt(reader, "TaskId"),
                                    ListId = DbUtils.GetInt(reader, "TasklistId"),
                                    DateDue = DbUtils.GetDateTime(reader, "DateDue"),
                                    UserId = DbUtils.GetInt(reader, "TaskUserId"),
                                    IsImportant = DbUtils.GetBool(reader, "TaskImportance"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    Description = DbUtils.GetString(reader, "Description")
                                });
                            }
                            //getting listTags
                            if (DbUtils.IsNotDbNull(reader, "ListTagId"))
                            {
                                existingList.Tags.Add(new ListTag()
                                {
                                    Id = DbUtils.GetInt(reader, "TaskId"),
                                    ListId = DbUtils.GetInt(reader, "ListTagListId"),
                                    TagId = DbUtils.GetInt(reader, "ltTagId"),
                                    Tag = new Tag()
                                    {
                                        Id = DbUtils.GetInt(reader, "ltTagId"),
                                        TagName = DbUtils.GetString(reader, "TagName")
                                    }
                                });
                            }
                        };
                        return lists;
                    }
                }
            }
        }




        //get lists by user with tasks
        public List<List> GetListsByUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT l.Id AS ListId, l.UserId AS ListUserId, l.IsPrivate, l.DateCreated, l.IsImportant AS ListImportance, l.ListName,
                       t.Id AS TaskId, t.ListId AS TaskListId, t.DateDue, t.UserId AS TaskUserId, t.IsImportant AS TaskImportance, t.Title, t.Description,
                       lt.Id AS ListTagId, lt.ListId AS ListTagListId, lt.TagId AS ListTagTagId,
                       tg.Id AS TagId, tg.TagName
                       FROM List l
                       JOIN Task t ON t.ListId = l.Id
                       JOIN ListTag lt ON lt.ListId = l.Id
                       JOIN Tag tg ON tg.Id = lt.TagId
                       WHERE l.UserId = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);


                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var lists = new List<List>();
                        while (reader.Read())
                        {
                            var listId = DbUtils.GetInt(reader, "ListId");
                            var existingList = lists.FirstOrDefault(l => l.Id == listId);
                            if (existingList == null)
                            {
                                existingList = new List()
                                {
                                    Id = DbUtils.GetInt(reader, "ListId"),
                                    UserId = DbUtils.GetInt(reader, "ListUserId"),
                                    IsPrivate = DbUtils.GetBool(reader, "IsPrivate"),
                                    DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                                    IsImportant = DbUtils.GetBool(reader, "ListImportance"),
                                    ListName = DbUtils.GetString(reader, "ListName"),
                                    Tasks = new List<Task>(),
                                    Tags = new List<ListTag>()
                                };
                                lists.Add(existingList);
                            }
                            //getting tasks
                            if (DbUtils.IsNotDbNull(reader, "TaskId"))
                            {
                                existingList.Tasks.Add(new Task()
                                {
                                    Id = DbUtils.GetInt(reader, "TaskId"),
                                    ListId = DbUtils.GetInt(reader, "TasklistId"),
                                    DateDue = DbUtils.GetDateTime(reader, "DateDue"),
                                    UserId = DbUtils.GetInt(reader, "TaskUserId"),
                                    IsImportant = DbUtils.GetBool(reader, "TaskImportance"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    Description = DbUtils.GetString(reader, "Description")
                                });
                            }
                            //getting listTags
                            if (DbUtils.IsNotDbNull(reader, "ListTagId"))
                            {
                                existingList.Tags.Add(new ListTag()
                                {
                                    Id = DbUtils.GetInt(reader, "TaskId"),
                                    ListId = DbUtils.GetInt(reader, "ListTagListId"),
                                    TagId = DbUtils.GetInt(reader, "ListTagTagId"),
                                    Tag = new Tag()
                                    {
                                        Id = DbUtils.GetInt(reader, "ListTagTagId"),
                                        TagName = DbUtils.GetString(reader, "TagName")
                                    }
                                });
                            }
                        };
                        return lists;
                    }
                }
            }
        }

        //edit list
        public void Update(List list)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                UPDATE List
                                SET IsPrivate = @IsPrivate
                                    IsImportant = @IsImportant,
                                    ListName = @ListName 
                                WHERE Id = @Id;";
                    DbUtils.AddParameter(cmd, "@IsPrivate", list.IsPrivate);
                    DbUtils.AddParameter(cmd, "@IsImportant", list.IsImportant);
                    DbUtils.AddParameter(cmd, "@ListName", list.ListName);
                    DbUtils.AddParameter(cmd, "@Id", list.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
    

