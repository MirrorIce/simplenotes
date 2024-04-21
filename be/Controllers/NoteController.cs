using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using SimpleNotes.Authorization;
using SimpleNotes.Interfaces;
using SimpleNotes.Models;

namespace SimpleNotes.Controllers{

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
            Note dummyNote = new Note(){
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

        [HttpPost]
        public async Task<IActionResult> AddNoteByUserId([FromBody] Note inputNote)
        {

            if (false == User.Identity.IsAuthenticated)
            {
                return new ChallengeResult();
            }
            Claim? userIdClaim = User.Claims.FirstOrDefault(claim => string.Equals(claim.Type,"id"));
            if (userIdClaim == null) return BadRequest();
            int userId = -1;
            int.TryParse(userIdClaim.Value, out userId);
            if (userId == -1) return BadRequest();

            inputNote.UserId = userId;
            _noteRepository.AddNoteByUserId(inputNote);

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> EditNoteByUserid([FromBody] Note inputNote)
        {
            if (false == User.Identity.IsAuthenticated)
            {
                return new ChallengeResult();
            }

            Claim? userIdClaim = User.Claims.FirstOrDefault(claim => string.Equals(claim.Type, "id"));
            if (null == userIdClaim) return BadRequest();
            int userId = -1;
            int.TryParse(userIdClaim.Value, out userId);
            if (userId == -1) return BadRequest();

            Note targetNote = _noteRepository.GetNoteById(inputNote.NoteId);
            if (null == targetNote) return NotFound();

            var authorizationResult = await _authorizationService
                                        .AuthorizeAsync(User, targetNote, NoteOperations.UpdateNote);
            if (false == authorizationResult.Succeeded) return new ForbidResult();
            
            
            _noteRepository.EditNoteById(inputNote, targetNote);

            return Ok();
        }
    }
}