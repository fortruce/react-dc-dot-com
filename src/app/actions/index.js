import request from "superagent";
import { RECEIVED_TWEETS, ADDED_ARTICLE, RECEIVED_ARTICLES } from "../constants";

export function fetchTweets() {
	return dispatch => {
		request
			.get('/api/v1.0/tweets')
			.end((err, res)=>{
				if (err || res.status !== 200) {
					return console.error(err || res.status);
				}
				dispatch({
					type: RECEIVED_TWEETS,
					tweets: res.body
				});
			});
	};
}

export function fetchArticles() {
	return dispatch => {
		const query = new Parse.Query("Article");
		query.descending("createdAt");
		query.find({
			success: results => {
				dispatch({
					type: RECEIVED_ARTICLES,
					articles: results.map(result => ({
						title: result.get("title"),
						url: result.get("url"),
						description: result.get("description")
					}))
				});
			},
			error: (results, error) => {
				console.error(error);
			}
		})
	}
}

export function createPost(title, url, description) {
	return dispatch => {
		var article = new Parse.Object("Article");
		article.set("url", url);
		article.set("title", title);
		article.set("description", description);
		article.save(null, {
			success: article => {
				dispatch({
					type: ADDED_ARTICLE,
					article: {
						title: article.get("title"),
						url: article.get("url"),
						description: article.get("description")
					}
				});
			},
			error: (article, error) => {
				// TODO handle error
				console.error(error);
			}
		})
	}
}
