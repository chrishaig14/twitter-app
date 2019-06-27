import React from "react";

class SearchBox extends React.Component {
    render() {
        return (
            <div className={"search-box"}>
                <form>
                    <input type={"text"}/>
                    <button className={"submit-search-btn"} type={"submit"}>Search</button>
                </form>
            </div>
        );
    }
}

export default SearchBox;