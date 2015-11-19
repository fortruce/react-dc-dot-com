import request from 'superagent';
import { connect } from "react-redux";
import { fetchTweets } from "../actions";

class Twitter extends React.Component {
	componentWillMount() {
		this.props.dispatch(fetchTweets());
		this._interval = setInterval(() => this.props.dispatch(fetchTweets()), 60000);
	}
	componentWillUnmount() {
		clearInterval(this._interval);
	}
	render(){
		let tweets = this.props.tweets.map(function(tweet){
			return (
				<div
					key={ tweet.id }
					className="rdc-tweet">
					{ tweet.text }
				</div>
			);
		});
		return <div className="rdc-tweets"><h3>@React_DC</h3>{tweets}</div>
	}
}

export default connect(state => ({
	tweets: state.tweets
}))(Twitter);
