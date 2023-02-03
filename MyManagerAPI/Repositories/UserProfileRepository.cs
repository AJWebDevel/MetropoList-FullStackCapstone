

using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;

namespace MyManagerAPI.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }    

        //get all users
        //get user by id
        //add user
        //update user
    }
}
