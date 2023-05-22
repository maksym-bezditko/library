using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UsersService _usersService;

    public UsersController(UsersService usersService) =>
        _usersService = usersService;

    [HttpGet("Get")]
    public async Task<List<User>> Get() =>
        await _usersService.GetAsync();

    [HttpGet("Get/{userId:length(24)}")]
    public async Task<ActionResult<User>> Get(string userId)
    {
        var user = await _usersService.GetAsync(userId);

        if (user is null)
        {
            return NotFound(new Response { Status = 404, Message = "User not found!", Succeeded = false });
        }

        return user;
    }
    
    [HttpPost("CheckExistence")]
    public async Task<IActionResult> Exists([FromBody] CheckExistenceRequestBody credentials)
    {
        var users = await _usersService.GetAsync();
        
        var found = users.Any(b => b.email == credentials.email && b.password ==  credentials.password);

        if (!found) return NotFound(new Response { Status = 404, Message = "User not found!", Succeeded = false });
        {
            var userId = users.Find(b => b.email == credentials.email && b.password == credentials.password)!.id;
            return Ok(new Response { Status = 200, Message = userId, Succeeded = true });
        }

    }
    
    [HttpPost("EmailExistence")]
    public async Task<IActionResult> EmailExists([FromBody] CheckEmailRequestBody credentials)
    {
        var users = await _usersService.GetAsync();
        
        var found = users.Any(b => b.email == credentials.email);

        if (found) return Ok(new Response { Succeeded = false, Message = "found", Status = 200 });
        {
            return Ok(new Response{ Succeeded = true, Message = "not found", Status = 200 });
        }
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Post(User newUser)
    {
        await _usersService.CreateAsync(newUser);

        return Ok(newUser);
    }

    [HttpPost("Delete/{userId:length(24)}")]
    public async Task<IActionResult> Delete(string userId)
    {
        var user = await _usersService.GetAsync(userId);

        if (user is null)
        {
            return NotFound();
        }

        await _usersService.RemoveAsync(userId);

        return NoContent();
    }
}