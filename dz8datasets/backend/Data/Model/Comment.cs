namespace WebApplication3.Model;

public class Comment(int postId, int id, string name, string email, string body) {
  private int _postId = postId;
  private int  _id = id;
  private string _name = name;
  private string _email = email;
  private string _body = body;

  public int PostId
  {
    get { return _postId; }
    set { _postId = value; }
  }
  public int Id
  {
    get { return _id; }
    set { _id = value; }
  }
  public string Name
  {
    get { return _name; }
    set { _name = value; }
  }
  public string Email
  {
    get { return _email; }
    set { _email = value; }
  }
  public string Body
  {
    get { return _body; }
    set { _body = value; }
  }
}