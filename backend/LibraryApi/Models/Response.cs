namespace backend.Models;

public class Response
{
    public bool Succeeded { get; set; }
    
    public int Status { get; set; }
    
    public string? Message { get; set; }
}