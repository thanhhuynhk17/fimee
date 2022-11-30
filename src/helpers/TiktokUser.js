class TiktokUser {
    constructor() {
        this.id = '';
        this.name_id = '';
        this.avatar_url = '';
        this.following = -1;
        this.followers = -1;
        this.likes = -1;
    }

    setInfo(
        id,
        name_id,
        avatar_url,
        following,
        followers,
        likes
    ) {
        this.id = id;
        this.name_id = name_id;
        this.avatar_url = avatar_url;
        this.following = following;
        this.followers = followers;
        this.likes = likes;
    }

    log() {
        console.log('[Start] logging');
        console.log(JSON.stringify(this));
        console.log('[End] logging');
    }
}

export default TiktokUser;
