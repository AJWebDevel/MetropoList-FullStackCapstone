using Azure;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using MyManagerAPI.Models;
using MyManagerAPI.Utils;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;

namespace MyManagerAPI.Repositories
{

    public class NoteRepository: BaseRepository, INoteRepository
    {
        public NoteRepository(IConfiguration configuration) : base(configuration) { }

        public List<Note> GetNotesByUser(int id)
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
                       LEFT JOIN List ON List.Id = Note.ListId
                       WHERE Note.UserId = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);
                    

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                     var notes = new List<Note>();
                        while (reader.Read())
                        {
                            var noteId = DbUtils.GetInt(reader, "NoteId");
                            var existingNote = notes.FirstOrDefault(x => x.Id == noteId);
                            if (existingNote == null)
                            {
                                existingNote = new Note()
                                {
                                    Id = DbUtils.GetInt(reader, "NoteId"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                                    Text = DbUtils.GetString(reader, "Text"),
                                    ListId = DbUtils.GetInt(reader, "NoteListId"),
                                   
                                };

                                notes.Add(existingNote);
                                
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
                        return notes;
                    }
                }
            }
        }
        //add note
        public void AddNote(Note note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Note (UserId, DateCreated, ListId, Text)
                    OUTPUT INSERTED.ID
                    VALUES (@UserId, @DateCreated, @ListId, @Text);"
                    ;

                    DbUtils.AddParameter(cmd, "@UserId", note.UserId);
                    DbUtils.AddParameter(cmd, "@DateCreated", note.DateCreated);
                    DbUtils.AddParameter(cmd, "@ListId", note.ListId);
                    DbUtils.AddParameter(cmd, "@Text", note.Text);
                    note.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //delete note
        public void DeleteNote(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM Note
                    WHERE Id = @Id;"
                    ;

                    DbUtils.AddParameter(cmd, "@Id", id);

                   cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
