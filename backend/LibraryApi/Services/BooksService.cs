using backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace backend.Services;

public class BooksService
{
    private readonly IMongoCollection<User> _usersCollection;

    public BooksService(
        IOptions<UserStoreDatabaseSettings> userStoreDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            userStoreDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            userStoreDatabaseSettings.Value.DatabaseName);

        _usersCollection = mongoDatabase.GetCollection<User>(
            userStoreDatabaseSettings.Value.UsersCollectionName);
    }
    
    public List<Book> GetAsync(string userId)
    {
        var userFilter = Builders<User>.Filter.Eq(u => u.id, userId);
        var user = _usersCollection.Find(userFilter).FirstOrDefault();

        return user.books;
    }

    public async Task AddBookAsync(string userId, Book newBook)
    {
        var filter = Builders<User>.Filter.Eq(u => u.id, userId);
        var update = Builders<User>.Update.Push(u => u.books, newBook);
        
        await _usersCollection.UpdateOneAsync(filter, update);
    }
    
    public async Task DeleteBookAsync(string userId, string bookId)
    {
        var userFilter = Builders<User>.Filter.Eq(u => u.id, userId);
        var userUpdate = Builders<User>.Update.PullFilter(u => u.books, b => b.id == bookId);
        
        await _usersCollection.UpdateOneAsync(userFilter, userUpdate);
    }
}