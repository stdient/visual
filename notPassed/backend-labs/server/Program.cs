using CommentAPI.Model;
using CommentAPI.Repository;
using CommentAPI.Service;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ICommentRepository, CommentRepository>();
builder.Services.AddSingleton<CommentService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();

app.MapGet(
    "/comments",
    (CommentService commentService) =>
    {
        return Results.Ok(commentService.GetAll());
    }
);
app.MapGet(
    "/comments/{id}",
    (int id, CommentService commentService) =>
    {
        var ret = commentService.GetById(id);
        if (ret == null)
            return Result.NotFound();
        return Results.Ok(ret);
    }
);
app.MapPost(
    "/comments",
    (Comment comment, CommentService commentService) =>
    {
        return Result.Ok(commentService.Add(comment));
    }
);
app.MapPatch(
    "/comments/{id}",
    (Comment comment, CommentService commentService) =>
    {
        return Result.Ok(commentService.Update(comment));
    }
);
app.MapDelete(
    "/comments/{id}",
    (int id, CommentService commentService) =>
    {
        return Result.Ok(commentService.Delete(id));
    }
);

app.Run();
