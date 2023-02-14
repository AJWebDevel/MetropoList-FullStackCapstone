using Microsoft.Extensions.Configuration;
using MyManagerAPI.Models;
using MyManagerAPI.Utils;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace MyManagerAPI.Repositories
{
    public class ListTagRepository : BaseRepository, IListTagRepository
    {
        public ListTagRepository(IConfiguration configuration) : base(configuration) { }

        //get by list id
        public List<ListTag> GetListTagByListId(int id)
        {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                       SELECT lt.Id AS ListTagId, lt.ListId, lt.TagId,
                            t.Id As TId, t.TagName
                       FROM ListTag lt
                       JOIN Tag t On t.Id = lt.TagId
                       WHERE lt.ListId = @id;";
                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            var listTags = new List<ListTag>();
                            while (reader.Read())
                            {
                                listTags.Add(new ListTag()
                                {
                                    Id = DbUtils.GetInt(reader, "ListTagId"),
                                    ListId = DbUtils.GetInt(reader, "ListId"),
                                    TagId = DbUtils.GetInt(reader, "TagId"),
                                    Tag = new Tag()
                                    {
                                        Id = DbUtils.GetInt(reader, "TagId"),
                                        TagName = DbUtils.GetString(reader, "TagName")
                                    }

                                });
                            }
                            return listTags;
                        }
                    }
                }
        }
        
        //add listTag
        public void AddListTag(ListTag listTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO ListTag (ListId, TagId)
                        OUTPUT INSERTED.ID
                        VALUES (@ListId, @TagId);";
                    DbUtils.AddParameter(cmd, "@ListId", listTag.ListId);
                    DbUtils.AddParameter(cmd, "@TagId", listTag.TagId);


                    listTag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        //delete listTag
        public void DeleteListTag(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM ListTag
                                       WHERE Id = @Id;";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
   

