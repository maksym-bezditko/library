using System.Text;
using System.Text.Json;
using Desktop.Models;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

var path = Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + "/Desktop" + "/Database.txt";

app.MapGet("/", async context =>
{
    try
    {
        if (!File.Exists(path))
        {
            var fs = File.Create(path);

            fs.Close();
        }

        string text;

        using (var sr = new StreamReader(path))
        {
            text = await sr.ReadToEndAsync();
        };

        context.Response.StatusCode = 200;
        context.Response.Headers.ContentType = "application/json";

        var jsonResponse = JsonSerializer.Serialize(
            new ResponseWithContent()
            {
                Status = 200,
                Succeeded = true,
                Content = text,
            });

        await context.Response.WriteAsync(jsonResponse);
    }
    catch (Exception ex)
    {
        context.Response.StatusCode = 422;
        context.Response.Headers.ContentType = "application/json";

        var jsonResponse = JsonSerializer.Serialize(
            new ResponseWithContent()
            {
                Status = 422,
                Succeeded = false,
                Content = ex.Message,
            });

        await context.Response.WriteAsync(jsonResponse);
    }
});

app.MapPost("/", async context =>
{
    try
    {
        if (!File.Exists(path))
        {
            throw new FileNotFoundException("File wasn't found, send a get request to create one");
        }

        string bodyStr;
        
        using (var reader
               = new StreamReader(context.Request.Body, Encoding.UTF8, true))
        {
            bodyStr = await reader.ReadToEndAsync();
        }

        if (context.Request.Headers.ContentType == "application/json")
        {
            using var sr = new StreamReader(path);
            
            var userList = new List<User>();
            var current = await sr.ReadToEndAsync();
            
            sr.Close();
                
            var users = JsonSerializer.Deserialize<User[]>(current);

            if (users != null)
            {
                userList.AddRange(users);
            }

            bodyStr = JsonSerializer.Serialize(userList.ToArray()); ;
        }

        await using (var fileStream = File.Open(path, FileMode.Append))
        {
            var textInBytes = new UTF8Encoding(true).GetBytes(bodyStr);

            await fileStream.WriteAsync(textInBytes, 0, textInBytes.Length);
        }

        context.Response.StatusCode = 200;
        context.Response.Headers.ContentType = "application/json";

        var response = JsonSerializer.Serialize(
            new BaseResponse
            {
                Status = 200,
                Succeeded = true,
            });

        await context.Response.WriteAsync(response);
    }
    catch (FileNotFoundException ex)
    {
        context.Response.StatusCode = 404;
        context.Response.Headers.ContentType = "application/json";

        var jsonResponse = JsonSerializer.Serialize(
            new ResponseWithContent()
            {
                Status = 404,
                Succeeded = false,
                Content = ex.Message,
            });

        await context.Response.WriteAsync(jsonResponse);
    }
    catch (Exception ex)
    {
        context.Response.StatusCode = 422;
        context.Response.Headers.ContentType = "application/json";

        var jsonResponse = JsonSerializer.Serialize(
            new ResponseWithContent()
            {
                Status = 422,
                Succeeded = false,
                Content = ex.Message,
            });

        await context.Response.WriteAsync(jsonResponse);
    }
});

app.MapPut("/", async context =>
{
    try
    {
        if (!File.Exists(path))
        {
            throw new FileNotFoundException("File wasn't found, send a get request to create one");
        }
        
        var fileStream = File.Create(path);

        fileStream.Close();

        context.Response.StatusCode = 200;

        await context.Response.CompleteAsync();
    }
    catch (FileNotFoundException ex)
    {
        context.Response.StatusCode = 404;
        context.Response.Headers.ContentType = "application/json";

        var jsonResponse = JsonSerializer.Serialize(
            new ResponseWithContent()
            {
                Status = 404,
                Succeeded = false,
                Content = ex.Message,
            });

        await context.Response.WriteAsync(jsonResponse);
    }
    catch (Exception ex)
    {
        context.Response.StatusCode = 422;
        context.Response.Headers.ContentType = "application/json";

        var jsonResponse = JsonSerializer.Serialize(
            new ResponseWithContent()
            {
                Status = 422,
                Succeeded = false,
                Content = ex.Message,
            });

        await context.Response.WriteAsync(jsonResponse);
    }
});

app.Run();
