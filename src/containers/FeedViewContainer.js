import {connect} from "react-redux";
import FeedViewComponent from "../components/FeedViewComponent";
import {fetchFeed} from "../actions";
import {selectFeed} from "../selectors";

const mapStateToProps = state => {
    // console.log("POST LIST: ", state.main.posts);

    // console.log(posts);
    return {
        posts: selectFeed(state)
    };
};

const mapDispatchToProps = dispatch => ({
    onMount: () => {
        console.log("DISPATCHING FETCH FEED");
        dispatch(fetchFeed());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedViewComponent);