import React from "react";
import PostComponent from "./PostComponent";
// import UserPicComponent from "./UserPic";
import PostContainer from "../containers/PostContainer";
import UserPicContainer from "../containers/UserPicContainer";

class UserViewComponent extends React.Component {

    componentDidMount() {
        this.props.onMount(this.props.username);
    }

    render() {
        console.log("USER VIEW COMPONENT RENDERED");
        console.log("followed? :", this.props.followed);
        return (
            <div className={"other-user-view"}>
                    <div className={"other-user-info"}>
                        {/*<img className={"other-user-pic"} src={this.state.pic}></img>*/}
                        <UserPicContainer username={this.props.username}/>
                        <span className={"username"}>{this.props.username}</span>
                        {this.props.followed ?
                            (<button onClick={() => this.props.unfollow(this.props.username)}>Unfollow</button>) :
                            (<button onClick={() => this.props.follow(this.props.username)}>Follow</button>)
                        }
                    </div>

                    <div className={"post-main-container"}>
                        <h4 className={"user-posts-title"}>{this.props.username}'s posts</h4>
                        <div className={"post-container"}>

                            {this.props.posts.map(data => <PostContainer key={data.id} data={data}/>)}
                        </div>
                    </div>
            </div>
        );
    }
}

export default UserViewComponent;
