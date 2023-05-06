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

    [HttpGet]
    public async Task<List<User>> Get() =>
        await _usersService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<User>> Get(string id)
    {
        var user = await _usersService.GetAsync(id);

        if (user is null)
        {
            return NotFound(new Response { Status = 404, Message = "User not found!", Succeeded = false });
        }

        return user;
    }
    
    [HttpPost("/CheckExistence")]
    public async Task<IActionResult> Exists([FromBody] Credentials credentials)
    {
        var users = await _usersService.GetAsync();
        
        var found = users.Any(b => b.Email == credentials.Email && b.Password ==  credentials.Password);

        if (found) return Ok(new Response { Status = 200, Message = "User found!", Succeeded = true });

        return NotFound(new Response { Status = 404, Message = "User not found!", Succeeded = false });
    }

    [HttpPost]
    public async Task<IActionResult> Post(User newUser)
    {
        await _usersService.CreateAsync(newUser);

        return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var user = await _usersService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        await _usersService.RemoveAsync(id);

        return NoContent();
    }
}