import {connect} from "react-redux";
import FeedViewComponent from "../components/FeedViewComponent";
import {fetchFeed} from "../actions";

const mapStateToProps = state => {
    console.log("STATE:", state);
    return {
        postList: state.main.postList
    };
};

const mapDispatchToProps = dispatch => ({
    onMount: () => {
        console.log("DISPATCHING FETCH FEED");
        dispatch(fetchFeed());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedViewComponent);