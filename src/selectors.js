export const selectUserPosts = (state, username) => {
    let posts = [];
    for (const postId in state.main.posts) {
        let post = state.main.posts[postId];
        if (post.username === username) {
            console.log("PUSHING POST: ", post);
            posts.push(post);
        }
    }
    console.log("POSTS: ", posts);
    return posts;
};

export const selectFeed = state => {
    let posts = [];
    for (const postId in state.main.posts) {
        posts.push(state.main.posts[postId]);
    }
    posts.sort(function (a, b) {
        return (new Date(b.timestamp).getTime()) - (new Date(a.timestamp)).getTime();
    });
    return posts;
};
