import { ADDED_ARTICLE, RECEIVED_ARTICLES } from "../constants";

const initialState = [];

export default function articles(state = initialState, action) {
	switch(action.type) {
	case ADDED_ARTICLE:
		return [...state, action.article];
	case RECEIVED_ARTICLES:
		return action.articles;
	default:
		return state;
	}
}
