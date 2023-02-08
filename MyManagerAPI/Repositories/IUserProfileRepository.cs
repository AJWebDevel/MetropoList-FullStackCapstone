using System.Collections.Generic;
using MyManagerAPI.Models;

namespace MyManagerAPI.Repositories
{
    public interface IUserProfileRepository
    {
       List<UserProfile> GetAllUsers(); 
       UserProfile GetByFirebaseUserId(string firebaseUserId);
       UserProfile GetUserById(int id);
        void Add(UserProfile userProfile);
        void Update(UserProfile userProfile);
    }
}
