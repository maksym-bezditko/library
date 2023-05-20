namespace backend.Models;

public class Quote
{
    public string id { get; set; } = null!;
    
    public string content { get; set; } = null!;
    
    public string associatedWithBookId { get; set; } = null!;

    public string date { get; set; } = null!;
}