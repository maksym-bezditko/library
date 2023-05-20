using backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace backend.Services;

public class QuotesService
{
    private readonly IMongoCollection<User> _usersCollection;

    public QuotesService(
        IOptions<UserStoreDatabaseSettings> userStoreDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            userStoreDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            userStoreDatabaseSettings.Value.DatabaseName);

        _usersCollection = mongoDatabase.GetCollection<User>(
            userStoreDatabaseSettings.Value.UsersCollectionName);
    }
    
    public List<Quote> GetAsync(string userId)
    {
        var userFilter = Builders<User>.Filter.Eq(u => u.id, userId);
        var user = _usersCollection.Find(userFilter).FirstOrDefault();

        return user.quotes;
    }

    public async Task AddQuoteAsync(string userId, Quote newQuote)
    {
        var filter = Builders<User>.Filter.Eq(u => u.id, userId);
        var update = Builders<User>.Update.Push(u => u.quotes, newQuote);
        
        await _usersCollection.UpdateOneAsync(filter, update);
    }
    
    public async Task DeleteQuoteAsync(string userId, string quoteId)
    {
        var userFilter = Builders<User>.Filter.Eq(u => u.id, userId);
        var userUpdate = Builders<User>.Update.PullFilter(u => u.quotes, b => b.id == quoteId);
        
        await _usersCollection.UpdateOneAsync(userFilter, userUpdate);
    }
    
    public async Task DeleteQuotesForBookAsync(string userId, string bookId)
    {
        var userFilter = Builders<User>.Filter.Eq(u => u.id, userId);
        var userUpdate = Builders<User>.Update.PullFilter(u => u.quotes, b => b.associatedWithBookId == bookId);
        
        await _usersCollection.UpdateOneAsync(userFilter, userUpdate);
    }
}