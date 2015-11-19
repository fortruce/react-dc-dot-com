import { connect } from "react-redux";
import { createPost, fetchArticles } from "../../actions";

function Article(props) {
	return (
		<div>
			<h4><a href={ props.url }>{ props.title }</a></h4>
			<p>{ props.description }</p>
		</div>
	)
}

class Articles extends React.Component {
	onSubmit() {
		const title = this.refs.title.value.trim();
		const url = this.refs.url.value.trim();
		const description = this.refs.description.value.trim();
		if (title.length && url.length) {
			this.props.dispatch(createPost(title, url, description));
		}
	}

	componentWillMount() {
		this.props.dispatch(fetchArticles());
	}

	render() {
		return (
			<div>
				<ul>
					{
						this.props.articles.map(article => (
							<Article
								title={ article.title }
								url={ article.url }
								description={ article.description } />
						))
					}
				</ul>
				<form onSubmit={() => this.onSubmit()}>
					<input
						ref="title"
						type="text"
						placeholder="Title" />
					<input
						ref="url"
						type="text"
						placeholder="url" />
					<textarea ref="description" />
					<input type="submit" />
				</form>
			</div>
		);
	}
}

Articles.defaultProps = {
	articles: []
};

export default connect(state => ({
	articles: state.articles
}))(Articles);
