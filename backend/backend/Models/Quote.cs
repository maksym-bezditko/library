namespace backend.Models;

public class Quote
{
    public string Id { get; set; } = null!;
    
    public string Content { get; set; } = null!;
    
    public string AssociatedWithBookId { get; set; } = null!;
}