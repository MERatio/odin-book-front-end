import PropTypes from 'prop-types';
import format from 'date-fns/format';
import getUserFullName from '../lib/getUserFullName';

function Comments({ comments }) {
	return comments.length > 0 ? (
		<ul className="list-group">
			{comments.map((comment) => (
				<li key={comment._id} className="list-group-item">
					<p className="h6 mb-1">{getUserFullName(comment.author)}</p>
					<p className="text-muted mb-2">
						{format(new Date(comment.createdAt), 'PPpp')}
					</p>
					<p className="mb-2">{comment.text}</p>
				</li>
			))}
		</ul>
	) : null;
}

Comments.propTypes = {
	comments: PropTypes.array.isRequired,
};

export default Comments;
