import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Pagination({ route, currentPage, itemsLimit, pagesCount }) {
	const pageNumbers = [];

	for (let i = 1; i <= pagesCount; i++) {
		pageNumbers.push(i);
	}

	return (
		<nav aria-label="Posts pages">
			<ul className="pagination justify-content-center">
				{currentPage > 1 && (
					<li className="page-item">
						<Link
							className="page-link"
							to={`${route}?page=${currentPage - 1}&limit=${itemsLimit}`}
						>
							Previous
						</Link>
					</li>
				)}
				{pageNumbers.map((pageNumber) => {
					const isCurrentPageNumber = pageNumber === currentPage;
					return (
						<li
							className={'page-item' + (isCurrentPageNumber ? ' active' : '')}
							key={pageNumber}
							{...(isCurrentPageNumber && { 'aria-current': 'page' })}
						>
							{isCurrentPageNumber ? (
								<span className="page-link">{pageNumber}</span>
							) : (
								<Link
									className="page-link"
									to={`${route}?page=${pageNumber}&limit=${itemsLimit}`}
								>
									{pageNumber}
								</Link>
							)}
						</li>
					);
				})}
				{currentPage < pagesCount && (
					<li className="page-item">
						<Link
							className="page-link"
							to={`${route}?page=${currentPage + 1}&limit=${itemsLimit}`}
						>
							Next
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
}

Pagination.propTypes = {
	route: PropTypes.string.isRequired,
	currentPage: PropTypes.number.isRequired,
	itemsLimit: PropTypes.number.isRequired,
	pagesCount: PropTypes.number.isRequired,
};

export default Pagination;
