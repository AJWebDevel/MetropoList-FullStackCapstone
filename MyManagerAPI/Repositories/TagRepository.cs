using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using MyManagerAPI.Models;
using Microsoft.Data.SqlClient;
using MyManagerAPI.Utils;

namespace MyManagerAPI.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration configuration) : base(configuration) { }

        //getalltags
        public List<Tag> GetAllTags()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Tag.Id, Tag.TagName
                       FROM Tag";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var tags = new List<Tag>();
                        while (reader.Read())
                        {
                            tags.Add(new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                TagName = DbUtils.GetString(reader, "TagName"),
                           
                            });
                        }
                        return tags;
                    }
                }
            }
        }

        //add tag
        public void AddTag(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Tag (TagName)
                    OUTPUT INSERTED.ID
                    VALUES (@TagName);";

                    DbUtils.AddParameter(cmd, "@TagName", tag.TagName);
                    tag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        //delete tag
        public void DeleteTag(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Tag
                                       WHERE Id = @Id;";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

