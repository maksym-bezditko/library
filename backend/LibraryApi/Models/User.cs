using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string id { get; set; }
    
    public string firstName { get; set; } = null!;
    
    public string lastName { get; set; } = null!;

    public string email { get; set; } = null!;
    
    public string password { get; set; } = null!;

    public List<Book> books { get; set; } = new ();
    
    public List<Quote> quotes { get; set; } = new ();
}