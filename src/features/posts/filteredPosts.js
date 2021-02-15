const filteredPosts = (posts, { text, sortBy }) => {
    // console.log(text || undefined, sortBy || undefined)
    return posts.filter((post) => {
        return post.title.toLowerCase().includes(text.toLowerCase());
    }).sort((a, b) => {
        if(sortBy === 'title') {
            return a.title > b.title ? 1 : -1;
        }
    })
};

export default filteredPosts;

