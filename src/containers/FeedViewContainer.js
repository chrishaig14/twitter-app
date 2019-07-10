import {connect} from "react-redux";
import FeedViewComponent from "../components/FeedViewComponent";
import {fetchFeed} from "../actions";

const mapStateToProps = state => ({
    postList: state.postList
});

const mapDispatchToProps = dispatch => ({
    onMount: () => {
        console.log("DISPATCHING FETCH FEED");
        dispatch(fetchFeed());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedViewComponent);