using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using MyManagerAPI.Models;
using MyManagerAPI.Utils;
using System.Collections.Generic;
using System.Linq;

namespace MyManagerAPI.Repositories
{

    public class NoteRepository: BaseRepository, INoteRepository
    {
        public NoteRepository(IConfiguration configuration) : base(configuration) { }

        public Note GetNoteByUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Note.Id AS NoteId, Note.UserId, Note.DateCreated, Note.Text, Note.ListId AS NoteListId,
                       List.Id AS ListId, List.ListName, List.UserId AS ListUserId, List.IsPrivate, List.DateCreated, List.IsImportant
                       FROM Note
                       JOIN List ON List.Id = Note.ListId
                       WHERE Note.UserId = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);
                    Note existingNote = null;

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                     
                        while (reader.Read())
                        {
                        
                            if (DbUtils.IsNotDbNull(reader, "NoteId"))
                            {
                                existingNote = new Note()
                                {
                                    Id = DbUtils.GetInt(reader, "NoteId"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                                    Text = DbUtils.GetString(reader, "Text"),
                                    ListId = DbUtils.GetInt(reader, "NoteListId"),
                                   
                                };
                                
                            }
                            //getlistname
                            if (DbUtils.IsNotDbNull(reader, "ListId"))
                            {
                                existingNote.List = (new List()
                                {
                                    Id = DbUtils.GetInt(reader, "ListId"),
                                    UserId = DbUtils.GetInt(reader, "ListUserId"),
                                    IsPrivate = DbUtils.GetBool(reader, "IsPrivate"),
                                    DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                                    IsImportant = DbUtils.GetBool(reader, "IsImportant"),
                                    ListName = DbUtils.GetString(reader, "ListName"),
                           
                                });

                            }
                        };
                        return existingNote;
                    }
                }
            }
        }
    }
}
