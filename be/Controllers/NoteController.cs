using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using SimpleNotes.Authorization;
using SimpleNotes.Enums;
using SimpleNotes.Helpers;
using SimpleNotes.Interfaces;
using SimpleNotes.Models;

namespace SimpleNotes.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class NoteController : ControllerBase
    {
        private readonly INoteRepository _noteRepository;
        private readonly IAuthorizationService _authorizationService;
        public NoteController(INoteRepository noteRepository, IAuthorizationService authorizationService)
        {
            _noteRepository = noteRepository;
            _authorizationService = authorizationService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNoteById(int id)
        {
            Note note = _noteRepository.GetNoteById(id);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var authorizationResult = await _authorizationService
                                      .AuthorizeAsync(User, note, NoteOperations.ReadNote);
            if (authorizationResult.Succeeded)
            {
                return Ok(note);
            }
            else if (User.Identity.IsAuthenticated)
            {
                return new ForbidResult();
            }
            else
            {
                return new ChallengeResult();
            }
        }

        [HttpGet("user/{userid}")]
        public async Task<IActionResult> GetNoteListByUser(int userid)
        {
            Note dummyNote = new Note()
            {
                UserId = userid
            };
            var authorizationResult = await _authorizationService
                                            .AuthorizeAsync(User, dummyNote, NoteOperations.CreateNote);

            if (false == authorizationResult.Succeeded)
            {
                if (User.Identity.IsAuthenticated) return new ChallengeResult();
                else return new ForbidResult();
            }

            List<Note>? noteList = _noteRepository.GetNotesByUserId(userid)?.ToList();
            if (noteList == null)
            {
                return NotFound("Notes not found for this user!");
            }

            return Ok(noteList);
        }

        [HttpGet("user/notes")]
        public async Task<IActionResult> GetNoteListByLoggedUser()
        {
            if (false == User.Identity.IsAuthenticated)
            {
                return new ChallengeResult();
            }

            Claim? userIdClaim = User.Claims.FirstOrDefault(claim => string.Equals(claim.Type, "id"));
            if (userIdClaim == null)
            {
                return new ChallengeResult();
            }
            int userId;
            IUserHelper userHelper = new UserHelper();
            UserHelperResultEnum result = userHelper.GetUserIdByClaim(User, "id", out userId);

            if (UserHelperResultEnum.NotFound == result)
            {
                return NotFound();
            }

            if (UserHelperResultEnum.Error == result)
            {
                return BadRequest();
            }

            List<Note>? noteList = _noteRepository.GetNotesByUserId(userId)?.ToList();
            if (noteList == null)
            {
                return NotFound("Notes not found for this user!");
            }

            return Ok(noteList);
        }

        [HttpGet("noteByTitle")]
        public async Task<IActionResult> GetNoteListByTitle()
        {
            if (false == User.Identity.IsAuthenticated)
            {
                return new ChallengeResult();
            }

            Claim? userIdClaim = User.Claims.FirstOrDefault(claim => string.Equals(claim.Type, "id"));
            if (userIdClaim == null)
            {
                return new ChallengeResult();
            }
            int userId;
            IUserHelper userHelper = new UserHelper();
            UserHelperResultEnum result = userHelper.GetUserIdByClaim(User, "id", out userId);

            if (UserHelperResultEnum.NotFound == result)
            {
                return NotFound();
            }

            if (UserHelperResultEnum.Error == result)
            {
                return BadRequest();
            }

            if (!HttpContext.Request.Query.ContainsKey("title") || String.IsNullOrEmpty(HttpContext.Request.Query["title"]))
            {
                return BadRequest();
            }
            string inputTitle = HttpContext.Request.Query["title"];
            List<Note>? noteList = _noteRepository.GetNotesByUserId(userId)
                                    ?.Where<Note>(note =>
                                    {
                                        return note.NoteTitle.ToLower().Contains(inputTitle.ToLower());
                                    }).ToList();


            return Ok(noteList);
        }

        [HttpGet("noteByContent")]

        public async Task<IActionResult> GetNoteListByContent()
        {
            if (false == User.Identity.IsAuthenticated)
            {
                return new ChallengeResult();
            }

            Claim? userIdClaim = User.Claims.FirstOrDefault(claim => string.Equals(claim.Type, "id"));
            if (userIdClaim == null)
            {
                return new ChallengeResult();
            }
            int userId;
            IUserHelper userHelper = new UserHelper();
            UserHelperResultEnum result = userHelper.GetUserIdByClaim(User, "id", out userId);

            if (UserHelperResultEnum.NotFound == result)
            {
                return NotFound();
            }

            if (UserHelperResultEnum.Error == result)
            {
                return BadRequest();
            }

            if (!HttpContext.Request.Query.ContainsKey("content") || String.IsNullOrEmpty(HttpContext.Request.Query["content"]))
            {
                return BadRequest();
            }
            string inputContent = HttpContext.Request.Query["content"];
            List<Note>? noteList = _noteRepository.GetNotesByUserId(userId)
                                    ?.Where<Note>(note =>
                                    {
                                        return note.NoteContent.ToLower().Contains(inputContent.ToLower());
                                    }).ToList();


            return Ok(noteList);
        }

        [HttpPost]
        public async Task<IActionResult> AddNoteByUserId([FromBody] Note inputNote)
        {

            if (false == User.Identity.IsAuthenticated)
            {
                return new ChallengeResult();
            }
            int userId;
            IUserHelper userHelper = new UserHelper();
            UserHelperResultEnum result = userHelper.GetUserIdByClaim(User, "id", out userId);

            if (UserHelperResultEnum.NotFound == result)
            {
                return NotFound();
            }

            if (UserHelperResultEnum.Error == result)
            {
                return BadRequest();
            }

            inputNote.UserId = userId;
            _noteRepository.AddNoteByUserId(inputNote);

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> EditNoteByUserId([FromBody] Note inputNote)
        {
            if (false == User.Identity.IsAuthenticated)
            {
                return new ChallengeResult();
            }

            int userId;
            IUserHelper userHelper = new UserHelper();
            UserHelperResultEnum result = userHelper.GetUserIdByClaim(User, "id", out userId);

            if (UserHelperResultEnum.NotFound == result)
            {
                return NotFound();
            }

            if (UserHelperResultEnum.Error == result)
            {
                return BadRequest();
            }

            Note targetNote = _noteRepository.GetNoteById(inputNote.NoteId);
            if (null == targetNote) return NotFound();

            var authorizationResult = await _authorizationService
                                        .AuthorizeAsync(User, targetNote, NoteOperations.UpdateNote);
            if (false == authorizationResult.Succeeded) return new ForbidResult();


            _noteRepository.EditNoteById(inputNote, targetNote);

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteNoteById([FromBody] Note inputNote)
        {
            if (false == User.Identity.IsAuthenticated)
            {
                return new ChallengeResult();
            }

            Note targetNote = _noteRepository.GetNoteById(inputNote.NoteId);
            if (null == targetNote) return NotFound();

            var authorizationResult = await _authorizationService
                                        .AuthorizeAsync(User, targetNote, NoteOperations.UpdateNote);
            if (false == authorizationResult.Succeeded) return new ForbidResult();


            _noteRepository.DeleteNoteById(inputNote.NoteId);

            return Ok();
        }
    }
}