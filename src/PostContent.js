import React from "react";
import {NavLink} from "react-router-dom";

class PostContent extends React.Component {
    constructor(props) {
        super(props);
        this.strings = this.props.content.split(" ");
    }

    // makeStrings(){
    //
    // }

    render() {
        return (
            <p>
                {this.strings.map(str => {
                    if (str[0] !== "@"){
                        return str + " ";
                    } else {
                        return <NavLink className={"user-tag"} to={"/users/"+str.slice(1)}>{str}</NavLink>
                    }
                })}
            </p>
        );
    }
}

export default PostContent;