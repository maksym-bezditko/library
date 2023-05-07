namespace backend.Models;

public class CheckExistenceRequestBody
{
    public string email { get; set; } = null!;
    public string password { get; set; } = null!;
}

public class GetBooksRequestBody
{
    public string userId { get; set; } = null!;
}

public class DeleteBookRequestBody
{
    public string userId { get; set; }
    public string bookId { get; set; }
}

public class AddBookRequestBody
{
    public string userId { get; set; }
    public Book book { get; set; }
}