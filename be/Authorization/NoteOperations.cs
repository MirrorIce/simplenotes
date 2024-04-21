using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace SimpleNotes.Authorization
{
    public static class NoteOperations
    {
            public static OperationAuthorizationRequirement CreateNote = new OperationAuthorizationRequirement { Name = nameof(CreateNote)};
            public static OperationAuthorizationRequirement ReadNote = new OperationAuthorizationRequirement { Name = nameof(ReadNote)};  
            public static OperationAuthorizationRequirement UpdateNote = new OperationAuthorizationRequirement { Name = nameof(UpdateNote)};
            public static OperationAuthorizationRequirement DeleteNote = new OperationAuthorizationRequirement { Name = nameof(DeleteNote)};      
    }
}