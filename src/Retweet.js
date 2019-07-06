import React from "react";
import SimplePost from "./SimplePost";
import RetweetWithoutComment from "./RetweetWithoutComment";
import RetweetWithComment from "./RetweetWithComment";

class Retweet extends React.Component {
    serverUrl = "http://localhost:8888";

    constructor(props) {
        super(props);
        this.state = {retweet: null};
    }

    componentDidMount() {
        fetch(this.serverUrl + "/posts/" + this.props.data.retweet, {method: "GET"}).then(
            res => res.json()
        ).then(
            res => {
                console.log("GOT RETWEETED POST CONTENT: ", res);
                this.setState({retweet: res});
            }
        );
    }

    render() {
        if (this.props.data.content === "") {
            console.log("RETWEET WITHOUT COMMENT!");
            return (
                <div>
                    {this.state.retweet ?
                        <RetweetWithoutComment data={this.props.data} retweet={this.state.retweet}/> : null}
                </div>
            );
        } else {
            console.log("RETWEET WITH COMMENT!");
            return (
                <div>
                    {this.state.retweet ?
                        <RetweetWithComment data={this.props.data} retweet={this.state.retweet}/> : null}
                </div>
            );
        }
        return (
            <div>
                Retweeted post content: {this.props.data.content}
                {this.props.data.username} retweeted post {this.props.data.retweet}:
                {this.state.retweet ? <SimplePost data={this.state.retweet}/> : null}
            </div>
        );
    }
}

export default Retweet;