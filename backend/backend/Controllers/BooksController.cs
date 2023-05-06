using System.Text.Json;
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

    [HttpPost]
    public async Task<IActionResult> Add(string userId, Book newBook)
    {
        var user = await _usersService.GetAsync(userId);

        if (user is null)
            return NotFound(new Response { Status = 404, Message = "User not found!", Succeeded = false });

        await _booksService.AddBookAsync(userId, newBook);

        return NoContent();
    }

    [HttpPut]
    public async Task<IActionResult> Update(string userId, Book updatedBook)
    {
        var user = await _usersService.GetAsync(userId);

        if (user is null)
            return NotFound(new Response { Status = 404, Message = "User not found!", Succeeded = false });

        var books = user.Books;

        if (!books.Select(i => i.Id).ToList().Contains(updatedBook.Id))
            return NotFound(new Response { Status = 404, Message = "Book is not found!", Succeeded = false });
        {
            books[books.FindIndex(i => i.Id == updatedBook.Id)] = updatedBook;

            await _usersService.UpdateUserBooksAsync(userId, books);

            return Ok();
        }

    }
}