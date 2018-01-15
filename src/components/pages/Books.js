import React from 'react';
import axios from 'axios';
import Header from '../units/Header';
import Footer from '../units/Footer';
import Gallery from '../units/Gallery';
import Breadcrumbs from '../units/Breadcrumbs';

export default class Books extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			booksList: [],
			immutable: [],
			type: '',
		};

		this.filterBySearch = this.filterBySearch.bind(this);
		this.pickType = this.pickType.bind(this);
	}

	componentWillMount() {
		const that = this;
		const type = window.location.pathname.indexOf('books') === -1 ? 'audio' : 'books';
		axios.get(`/data/${type}.json`)
			.then((response) => {
				that.setState({
					booksList: response.data,
					immutable: response.data,
				});
			});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.type !== prevState.type) {
			const that = this;
			console.log(this.state.type);
			axios.get(`/data/${this.state.type}.json`)
				.then((response) => {
					that.setState({
						booksList: response.data,
						immutable: response.data,
					});
				});
		}
	}

	filterBySearch(event) {
		const stringToFilter = event.target.value;
		const filteredArray = this.state.immutable.filter(item =>
			item.title.indexOf(stringToFilter) !== -1);
		this.setState({
			booksList: filteredArray,
		});
	}

	pickType(event) {
		const type = event.target.href.slice(-5);
		this.setState({
			type,
		});
	}

	render() {
		return (
			<section>
				<Header filterBySearch={this.filterBySearch} pickType={this.pickType} />
				<Breadcrumbs />
				<Gallery booksList={this.state.booksList} />
				<Footer />
			</section>
		);
	}
}
