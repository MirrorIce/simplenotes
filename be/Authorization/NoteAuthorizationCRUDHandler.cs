using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using SimpleNotes.Models;

namespace SimpleNotes.Authorization
{
    public class NoteAuthorizationCRUDHandler : AuthorizationHandler<OperationAuthorizationRequirement, Models.Note>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OperationAuthorizationRequirement requirement, Note resource)
        {
            if (context.User.HasClaim("id", resource.UserId.ToString()))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}