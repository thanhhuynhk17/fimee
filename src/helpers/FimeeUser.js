class FimeeUser {
    constructor(
        id,
        name,
        bgUrl,
        igId,
        tiktokId,
        fbUrl,
        soundcloudUrl
    ) {
		// get bgId from bgUrl
		const bgId = bgUrl.split('?')[1];

        this.id = id;
        this.name = name;
        this.bgUrl = `https://drive.google.com/uc?export=view&${bgId}`;
        this.igId = igId;
        this.tiktokId = tiktokId;
        this.fbUrl = fbUrl;
        this.soundcloudUrl = soundcloudUrl;
    }

    log() {
        console.log('[Start] logging');
        console.log(JSON.stringify(this));
        console.log('[End] logging');
    }
}

export default FimeeUser;
