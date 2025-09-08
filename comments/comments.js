function Comment() {
    const [comments, setComments] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [comment, setComment] = React.useState('')

    const date = [ '1 minute ago', '2 minutes ago', '5 minutes ago', '2 hours ago', '3 hours ago','1 day ago', '2 days ago', '3 days ago']

    React.useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
            .then(response => response.json())
            .then(comments => setComments(comments))
            .finally(() => setLoading(false))
    }, [])

    function handleSubmitComment(e) {
        e.preventDefault()
        setComments([{ name, email, body: comment }, ...comments])
        setName('')
        setEmail('')
        setComment('')
    }

    function getRandomCommentDate() {
        const index = Math.floor(Math.random() * date.length)
        return date[index]
    }

    return (
        <div className="wrapper">
            <ul className="comment-list">
                <div className="add-comment-wrapper">
                    <form className="add-comment"
                        onSubmit={e => handleSubmitComment(e)}
                    >
                        <div className="input-field input-name">
                            <label htmlFor="name">Name: </label>
                            <input type="text" id="name" className="input" required
                                value={name}
                                onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="input-field input-email">
                            <label htmlFor="email">Email: </label>
                            <input type="email" id="email" className="input" required
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="input-field input-comment">
                            <label htmlFor="comment">Comment: </label>
                            <textarea type="text" id="comment" className="input" required
                                value={comment}
                                onChange={e => setComment(e.target.value)} />
                        </div>
                        <button type='submit' className="add-comment__submit">Add Comment</button>
                    </form>
                </div>

                {loading && (
                    <div className="loader-box">
                        <div className="loader"></div>
                    </div>
                )}

                {comments.map((comment, index) => (
                    <li key={index} className="comment-item">
                        <div className="user-info">
                            <div className="user-avatar">
                                <img src={`https://ui-avatars.com/api/?name=${comment.name}&background=random`} alt={`${comment.name} avatar`} />
                            </div>
                            <div className="user-text-info">
                                <p className="user-name">{comment.name}</p>
                                <i className="user-email">{comment.email}</i>
                            </div>
                        </div>
                        <p className="comment-date">{getRandomCommentDate()}</p>
                        <div className="comment-body">{comment.body}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const app = <>
    <Comment />
</>
ReactDOM.createRoot(document.getElementById('root')).render(app)
