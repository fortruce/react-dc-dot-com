import request from 'superagent';
import React from 'react';

export default class Twitter extends React.Component {

	constructor(props){
		super(props)
		this.state = {tweets: []}
	}
 	componentDidMount(){
 		request
		  .get('/api/v1.0/tweets')
		  .end((err, res)=>{
		  	this.setState({tweets: res.body});
		  });
 	}
 	render(){
 		let tweets = this.state.tweets.map(function(tweet){
 			return <div className="rdc-tweet">{tweet.text}</div>
 		});
 		return <div className="rdc-tweets"><h3>@React_DC</h3>{tweets}</div>
 	}
 }
