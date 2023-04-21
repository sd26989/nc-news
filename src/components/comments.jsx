import { useEffect } from "react";
import { useState, useContext } from "react";
import { fetchComments, postComment } from '../api';
import { UserContext } from "../components/user";

const Comments = ({ article_id }) => {

    const [comments, setComments] = useState([]);
    const [comLoading, setComLoading] = useState(true);
    const [isComError, setIsComError] = useState(false);
    const [body, setBody] = useState("");
    const [sending, setSending] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetchComments(article_id).then((data) => {
        setComments(data);
        setComLoading(false);
        })
        .catch((err) => {
            console.log(err.response)
            setIsComError(true)
        })
        .finally(() => {
            setComLoading(false)
        })
    }, [article_id, setComLoading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);

    postComment(article_id, user, body)
      .then(({ comment }) => {
        setSending(false);
        setBody("");
        setComments((comments) => [comment, ...comments]);
      })
      .catch((err) => {
        setSending(false);
      });
    }

      const handleChange = (e) => {
        setBody(e.target.value);
      };

    if (comLoading) return <p>Loading...</p>

    return (
        <section>
            <h2>Comments</h2>
            {isComError ? <p>There are no comments for this article!</p> : <ul className={'comments'}>
           {comments.map((comment) => {
            return <li className='comment' key={comment.comment_id}>
                <p className={'commentBody'}>"{comment.body}"</p>
                <p>Comment posted by {comment.author} at {comment.created_at}</p>
                </li>
           })}
        </ul>}
        <section>
            <h3>Add Comment</h3>
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          className="comment-form-body"
          value={body}
          onChange={handleChange}
          placeholder="Write a comment here..."
          required={true}
        ></textarea>
        <br></br>
        <input
          className="submit-comment"
          type="submit"
          value="Submit Comment"
          disabled={sending}
        />
      </form>
    </section>
        </section>
    );
};

export default Comments;