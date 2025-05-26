using CommentAPI.Model;
using CommentAPI.Repository;

namespace CommentAPI.Service;

public class CommentService
{
    private ICommentRepository commentRepository_;

    public CommentService(ICommentRepository repository)
    {
        commentRepository_ = repository;
    }

    public IEnumerable<Comment> GetAll() => commentRepository_.GetAll();

    public Comment? GetById(int id) => commentRepository_.GetById(id);

    public void Add(Comment comment) => commentRepository_.Add(comment);

    public void Update(Comment comment) => commentRepository_.Update(comment);

    public void Delete(int id) => commentRepository_.Delete(id);
}
