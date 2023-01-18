class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }


    get getName() {
        return this.title + " - " + this.singer;
    }
}


const musicList = [
    new Music("Boşver", "Nilüfer", "../../img/1.jpeg", "../../mp3/1.mp3"),
    new Music("Bu da Geçer mi Sevgilim", "Yalın", "../../img/2.jpeg", "../../mp3/2.mp3"),
    new Music("Bu da Geçer", "Yalın", "../../img/3.jpeg", "../../mp3/3.mp3")

];