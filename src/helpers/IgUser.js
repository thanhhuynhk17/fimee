class IgUser {
    constructor() {
        this.id = '';
        this.name_id = '';
        this.avatar_url = '';
        this.following = -1;
        this.followers = -1;
        this.posts = -1;
    }

    setInfo(
        id,
        name_id,
        avatar_url,
        following,
        followers,
        posts
    ) {
        this.id = id;
        this.name_id = name_id;
        this.avatar_url = avatar_url;
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
