import React from "react";
import SimplePost from "./SimplePost";

class RetweetWithoutComment extends React.Component {
    serverUrl = "http://localhost:8888";

    constructor(props) {
        super(props);
        // this.state = {retweeted: {"content":"LALALA"}};
    }


    componentDidMount() {
        // fetch(this.serverUrl + "/posts/" + this.props.data.retweet, {method: "GET"}).then(
        //     res => res.json()
        // ).then(
        //     res => {
        //         console.log("GOT RETWEETED POST: ", res);
        //         this.setState({retweeted: {"content": "JAJAJA"}});
        //     }
        // );
    }

    render() {
        console.log("RENDERING RETWEET WITHOUT COMMENT!!!", this.props.data, this.props.retweet);
        return (
            <div className={"retweet-wo-comment"}>
                {this.props.data.username} retweeted
                <SimplePost data={this.props.retweet}/>
            </div>
        );
    }
}

export default RetweetWithoutComment;