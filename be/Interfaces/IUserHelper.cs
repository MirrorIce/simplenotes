using System.Security.Claims;
using SimpleNotes.Enums;

namespace SimpleNotes.Interfaces
{
    public interface IUserHelper
    {
        UserHelperResultEnum GetUserIdByClaim(ClaimsPrincipal claimsPrincipal, string claimTypeString, out int userId);
    }
}