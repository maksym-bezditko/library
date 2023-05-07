using backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace backend.Services;

public class UsersService
{
    private readonly IMongoCollection<User> _booksCollection;

    public UsersService(
        IOptions<UserStoreDatabaseSettings> userStoreDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            userStoreDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            userStoreDatabaseSettings.Value.DatabaseName);

        _booksCollection = mongoDatabase.GetCollection<User>(
            userStoreDatabaseSettings.Value.UsersCollectionName);
    }

    public async Task<List<User>> GetAsync() =>
        await _booksCollection.Find(_ => true).ToListAsync();

    public async Task<User?> GetAsync(string id) =>
        await _booksCollection.Find(x => x.id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(User newBook) =>
        await _booksCollection.InsertOneAsync(newBook);

    public async Task RemoveAsync(string id) =>
        await _booksCollection.DeleteOneAsync(x => x.id == id);
}