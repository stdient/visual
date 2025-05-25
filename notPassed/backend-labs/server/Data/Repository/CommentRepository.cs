using CommentAPI.Model;

namespace CommentAPI.Repository;

public interface ICommentRepository
{
    IEnumerable<Comment> GetAll();
    Comment? GetById(int id);
    void Add(Comment comment);
    void Update(Comment comment);
    void Delete(int id);
}

public class CommentRepository : ICommentRepository
{
    private Dictionary<int, Comment> commentBase_ = new Dictionary<int, Comment>();
    private int currentId_ = 1;

    public IEnumerable<Comment> GetAll() => commentBase_.Values;

    public Comment? GetById(int id)
    {
        if (commentBase_.ContainsKey(id))
            return commentBase_[id];
        else
            return null;
    }

    public void Add(Comment comment)
    {
        comment.Id = currentId_++;
        commentBase_[comment.Id] = comment;
    }

    public void Update(Comment comment)
    {
        if (commentBase_.ContainsKey(comment.Id))
            commentBase_[comment.Id] = comment;
    }

    public void Delete(int id)
    {
        if (commentBase_.ContainsKey(id))
            commentBase_.Remove(id);
    }
}
