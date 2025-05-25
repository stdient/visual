namespace CommentAPI.Model;

public class Comment
{
    public required int Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Body { get; set; }
}
