import React from "react";

class SearchBox extends React.Component {
    render() {
        return (
            <div className={"search-box"}>
                <form>
                    <label>SEARCH<input type={"text"}/></label>
                    <button className={"submit-search-btn"} type={"submit"}><span role={"img"}>🔍</span></button>
                </form>
            </div>
        );
    }
}

export default SearchBox;