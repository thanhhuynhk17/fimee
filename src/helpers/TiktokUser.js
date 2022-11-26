class TiktokUser {
    constructor() {
        this.id = '';
        this.name = '';
        this.avatarUrl = '';
        this.following = -1;
        this.follower = -1;
        this.like = -1;
    }

    setInfo(
        id,
        name,
        avatarUrl,
        following,
        follower,
        like
    ) {
        this.id = id;
        this.name = name;
        this.avatarUrl = avatarUrl;
        this.following = following;
        this.follower = follower;
        this.like = like;
    }

    log() {
        console.log('logging...');
        console.log(JSON.stringify(this));
        console.log('logging end');
    }
}

export default TiktokUser;
