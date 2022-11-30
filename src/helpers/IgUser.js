class IgUser {
    constructor() {
        this.id = '';
        this.name = '';
        this.avatarUrl = '';
        this.following = -1;
        this.followers = -1;
        this.posts = -1;
    }

    setInfo(
        id,
        name,
        avatarUrl,
        following,
        followers,
        posts
    ) {
        this.id = id;
        this.name = name;
        this.avatarUrl = avatarUrl;
        this.following = following;
        this.followers = followers;
        this.posts = posts;
    }

    log() {
        console.log('[Start] logging');
        console.log(JSON.stringify(this));
        console.log('[End] logging');
    }
}

export default IgUser;
