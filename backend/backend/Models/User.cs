using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    
    public string FirstName { get; set; } = null!;
    
    public string LastName { get; set; } = null!;

    public string Email { get; set; } = null!;
    
    public string Password { get; set; } = null!;

    public List<Book> Books { get; set; } = new List<Book>();
    
    public List<Quote> Quotes { get; set; } = new List<Quote>();
}