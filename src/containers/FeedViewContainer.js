import {connect} from "react-redux";
import FeedViewComponent from "../components/FeedViewComponent";
import {fetchFeed} from "../actions";
import {selectFeed} from "../selectors";

const mapStateToProps = state => {
    return {
        posts: selectFeed(state)
    };
};

const mapDispatchToProps = dispatch => ({
    onMount: () => {
        dispatch(fetchFeed());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedViewComponent);
