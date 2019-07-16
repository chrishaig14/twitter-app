import SearchResultsViewComponent from "../components/SearchResultsViewComponent";
import {connect} from "react-redux";
import {fetchSearch} from "../actions";

// const mapStateToProps = state => ({
//     users: state.main.searchResults
// });

const mapStateToProps = state => {
    console.log("THIS: STATE: ", state);
    return ({
        users: state.main.searchResults
    });
};

const mapDispatchToProps = dispatch => ({
    search: (term) => {
        dispatch(fetchSearch(term));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsViewComponent);