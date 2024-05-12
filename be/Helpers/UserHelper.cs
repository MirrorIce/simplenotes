using System.Security.Claims;
using SimpleNotes.Enums;
using SimpleNotes.Interfaces;

namespace SimpleNotes.Helpers
{
    public class UserHelper : IUserHelper
    {
        public UserHelperResultEnum GetUserIdByClaim(ClaimsPrincipal inputUser, string claimTypeString, out int userId)
        {
            Claim? userIdClaim = inputUser.Claims.FirstOrDefault(claim => string.Equals(claim.Type, claimTypeString));
            userId = -1;
            if (userIdClaim == null)
            {
                return UserHelperResultEnum.NotFound;
            }
            int.TryParse(userIdClaim.Value, out userId);

            if (userId == -1)
            {
                return UserHelperResultEnum.Error;
            }
            return UserHelperResultEnum.OK;
        }
    }
}
