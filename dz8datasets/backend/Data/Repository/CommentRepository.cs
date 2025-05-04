
public class CommentRepository {
  private Dictionary<int, Comment> _comments = [];

  public Comment AddComment(int postId, int id, string name, string email, string body)
  {
    var comment = new Comment(int postId, int id, string name, string email, string body);
    _comments.Add(id, comment);
    return comment;
  }

  public bool DeleteComment(int id) => _comments.Remove(id);
}