public interface ICommentRepository {
  Comment AddComment(int postId, int id, string name, string email, string body);
  bool DeleteComment(int id);
}