import React from "react";
import PostComponent from "./PostComponent";
import NewPostContainer from "../containers/NewPostContainer";

class FeedViewComponent extends React.Component {
    componentDidMount() {
        this.props.onMount();
    }

    render() {
        console.log("POSTLIST: ", this.props.postList);
        return (

            <div className={"feed-view"}>
                <NewPostContainer/>
                <div className={"post-container"}>
                    {this.props.postList.map(data => <PostComponent key={data.timestamp} data={data}/>)}
                </div>
            </div>
        );
    }
}

export default FeedViewComponent;