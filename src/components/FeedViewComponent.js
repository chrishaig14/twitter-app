import React from "react";
import NewPostContainer from "../containers/NewPostContainer";
import PostContainer from "../containers/PostContainer";

class FeedViewComponent extends React.Component {
    componentDidMount() {
        this.props.onMount();
    }

    render() {
        return (
            <div className={"feed-view"}>
                <NewPostContainer/>
                <div className={"post-container"}>
                    {this.props.posts.map(data => <PostContainer key={data.id} data={data}/>)}
                </div>
            </div>
        );
    }
}

export default FeedViewComponent;
