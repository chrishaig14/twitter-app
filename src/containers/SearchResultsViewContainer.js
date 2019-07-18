import SearchResultsViewComponent from "../components/SearchResultsViewComponent";
import {connect} from "react-redux";
import {fetchSearch} from "../actions";

const mapStateToProps = state => {
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