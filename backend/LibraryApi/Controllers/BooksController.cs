using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]

public class BooksController : ControllerBase
{
    private readonly BooksService _booksService;
    private readonly UsersService _usersService;

    public BooksController(BooksService booksService, UsersService usersService)
    {
        _booksService = booksService;
        _usersService = usersService;
    }
    
    [HttpGet("Get/{userId:length(24)}")]
    public async Task<IActionResult> GetAll(string userId)
    {
        var user = await _usersService.GetAsync(userId);

        if (user is null)
            return NotFound(new Response { Status = 404, Message = "User not found!", Succeeded = false });

        return Ok(_booksService.GetAsync(userId));
    }

    [HttpPost("Add")]
    public async Task<IActionResult> Add([FromBody] AddBookRequestBody body)
    {
        var user = await _usersService.GetAsync(body.userId);

        if (user is null)
            return NotFound(new Response { Status = 404, Message = "User not found!", Succeeded = false });

        await _booksService.AddBookAsync(body.userId, body.book);

        return Ok();
    }
    
    [HttpDelete("Delete")]
    public async Task<IActionResult> Delete([FromBody] DeleteBookRequestBody body)
    {
        var user = await _usersService.GetAsync(body.userId);

        if (user is null)
            return NotFound(new Response { Status = 404, Message = "User not found!", Succeeded = false });

        await _booksService.DeleteBookAsync(body.userId, body.bookId);

        return Ok();
    }
}