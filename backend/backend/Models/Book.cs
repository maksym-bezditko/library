namespace backend.Models;

public class Book
{
    public string Id { get; set; } = null!;
    
    public string Author { get; set; } = null!;
    
    public string Title { get; set; } = null!;
    
    public string CoverUrl { get; set; } = null!;
    
    public string Status { get; set; } = null!;
}