import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import Profile from './Profile';
import Breadcrumbs from './Breadcrumbs';

const booksList = require('../../data/users.json');

const Book = ({ match }) => {
	const title = match.params.id.split('-').map(item => item[0].toUpperCase() + item.slice(1)).join(' ');

	const bookItem = booksList.filter(item => item.title.indexOf(title) !== -1);
	console.log(bookItem[0]);
	return (
		<section>
			<Header />
			<Breadcrumbs />
			<Profile book={bookItem[0]} />
			<Footer />
		</section>
	);
};

Book.propTypes = {
	match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Book;
