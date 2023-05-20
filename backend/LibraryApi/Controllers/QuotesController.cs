using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]

public class QuotesController : ControllerBase
{
    private readonly QuotesService _quotesService;
    private readonly UsersService _usersService;

    public QuotesController(QuotesService quotesService, UsersService usersService)
    {
        _quotesService = quotesService;
        _usersService = usersService;
    }
    
    [HttpGet("Get/{userId:length(24)}")]
    public async Task<IActionResult> GetAll(string userId)
    {
        var user = await _usersService.GetAsync(userId);

        if (user is null)
            return NotFound(new Response { Status = 404, Message = "User not found!", Succeeded = false });

        return Ok(_quotesService.GetAsync(userId));
    }

    [HttpPost("Add")]
    public async Task<IActionResult> Add([FromBody] AddQuoteRequestBody body)
    {
        var user = await _usersService.GetAsync(body.userId);

        if (user is null)
            return NotFound(new Response { Status = 404, Message = "User not found!", Succeeded = false });

        await _quotesService.AddQuoteAsync(body.userId, body.quote);

        return Ok();
    }
    
    [HttpPost("Delete")]
    public async Task<IActionResult> Delete([FromBody] DeleteQuoteRequestBody body)
    {
        var user = await _usersService.GetAsync(body.userId);

        if (user is null)
            return NotFound(new Response { Status = 404, Message = "User not found!", Succeeded = false });

        await _quotesService.DeleteQuoteAsync(body.userId, body.quoteId);

        return Ok();
    }
    
    [HttpPost("DeleteAssociated")]
    public async Task<IActionResult> DeleteAssociated([FromBody] DeleteAssociatedQuotesRequestBody body)
    {
        var user = await _usersService.GetAsync(body.userId);

        if (user is null)
            return NotFound(new Response { Status = 404, Message = "User not found!", Succeeded = false });

        await _quotesService.DeleteQuotesForBookAsync(body.userId, body.bookId);

        return Ok();
    }
}