namespace backend.Models;

public class Book
{
    public string id { get; set; } = null!;
    
    public string author { get; set; } = null!;
    
    public string title { get; set; } = null!;
    
    public string coverUrl { get; set; } = null!;
    
    public string status { get; set; } = null!;

    public string date { get; set; } = null;
}