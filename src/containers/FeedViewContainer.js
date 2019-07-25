import {connect} from "react-redux";
import FeedViewComponent from "../components/FeedViewComponent";
import {fetchFeed} from "../actions";

const mapStateToProps = state => {
    // console.log("POST LIST: ", state.main.posts);
    let posts = [];
    for (const postId in state.main.posts) {
        posts.push(state.main.posts[postId]);
    }
    posts.sort(function (a, b) {
        return (new Date(b.timestamp).getTime()) - (new Date(a.timestamp)).getTime();
    });
    // console.log(posts);
    return {
        posts: posts
    };
};

const mapDispatchToProps = dispatch => ({
    onMount: () => {
        console.log("DISPATCHING FETCH FEED");
        dispatch(fetchFeed());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedViewComponent);