var play = document.getElementById("playbtn");
var pause = document.getElementById("pausebtn"); 
var stop = document.getElementById("stopbtn");
var prev = document.getElementById("prevbtn");
var next = document.getElementById("nextbtn");
var title = document.getElementById("title");
var album = document.getElementById("album");
var image = document.getElementById("img");
var audio = document.getElementById("audio");
var duration = document.getElementById("duration");
var currenttime = document.getElementById("currenttime");
var range = document.getElementById("range");
var twox = document.getElementById("2x");
var repeat = document.getElementById("repeatbtn");
var volume= document.getElementById("volumebtn");
var vrange = document.getElementById("volumerange");
var musicPlayerList = document.getElementById("musicplayerlist");
vrange.max=100;
vrange.value=30;
audio.volume=vrange.value/100;
class MusicList{
    constructor(sing,singer,album,img,mp3){
        this.sing = sing;
        this.singer = singer;
        this.album = album;
        this.img =  img;
        this.mp3 = mp3;
    }
}

class MusicPlayer{
    constructor(musicList,musicIndex){
        this.musicList = musicList;
        this.musicIndex = 0;
    }

    getMusic(){
        return this.musicList[this.musicIndex];
    }

    prevMusic(){
        if(this.musicIndex == 0){
            this.musicIndex = this.musicList.length - 1;
        }
        else{
            this.musicIndex--;
        }
    }

    nextMusic(){
        if(this.musicIndex == this.musicList.length - 1){
            this.musicIndex=0;
        }
        else{
            this.musicIndex++;
        }
    }
}

musicList = [
    new MusicList("Black Diamond","Stratovarius","Visions","img/img1.jpg","mp3/1.mp3"),
    new MusicList("Learning To Fly","Stratovarius","Elements, Pt. 1","img/img2.jpg","mp3/2.mp3"),
    new MusicList("Winter","Vivaldi","Four Seasons","img/img3.jpg","mp3/3.mp3"),
    new MusicList("Days of Beauty","Ola Gjelio","Winter Songs","img/img4.jpg","mp3/4.mp3"),
    new MusicList("40.Symphony","Mozart","Mozart","img/img7.jpg","mp3/5.mp3"),
    new MusicList("Bogoroditse Devo","Rachmaninoff","Rachmaninoff","img/img5.jpg","mp3/6.mp3"),
    new MusicList("9.Symphony","Beethoven","Beethoven","img/img6.jpg","mp3/7.mp3"),
    new MusicList("Lacrimosa","Mozart","Classical Music","img/img7.jpg","mp3/8.mp3"),
    new MusicList("Moon Light Sonata","Beethoven","Classical","img/img6.jpg","mp3/9.mp3"),
    new MusicList("Requiem","Mozart","Classic","img/img7.jpg","mp3/10.mp3"),
    new MusicList("Prelude in C Sharp Minor","Rachmaninoff","Classical Music","img/img5.jpg","mp3/11.mp3")
]

const musicPlayer = new MusicPlayer(musicList);

var music = musicPlayer.getMusic();

displayMusic(music);
displayMusicList(musicPlayer);
playMusic(musicPlayer);

prev.addEventListener("click",() => {
    repcounter=1;
    repeat.click();
    twoxcounter=1;
    twox.click();
    musicPlayer.prevMusic();
    music = musicPlayer.getMusic();
    displayMusic(music)
    play.click();
    playMusic(musicPlayer);     
})
play.addEventListener("click",() => {
    audio.play();
    play.classList.remove("btn-danger");
    pause.classList.add("btn-danger");

});

pause.addEventListener("click",() => {
    audio.pause();
    pause.classList.remove("btn-danger");
    play.classList.add("btn-danger");
})

stop.addEventListener("click",() => {
    audio.pause();
    audio.currentTime=0;
})

next.addEventListener("click",() => {
    repcounter=1;
    repeat.click();
    twoxcounter=1;
    twox.click();
    musicPlayer.nextMusic();
    music = musicPlayer.getMusic();
    displayMusic(music);
    play.click();
    playMusic(musicPlayer);     
})

var repcounter=0;
repeat.addEventListener("click", () => {
    if(repcounter%2==0){
     repeat.classList.remove("btn-danger");
    repcounter++;
    }else{
     repeat.classList.add("btn-danger");
    repcounter++;
    }
})

var twoxcounter=0;
twox.addEventListener("click",() => {
    if(twoxcounter%2==0){
    audio.playbackRate = 2;
    twoxcounter++;
    twox.classList.remove("btn-danger");
    }
    else{
    audio.playbackRate = 1;
    twoxcounter++;
    twox.classList.add("btn-danger");
    }
})

function displayMusic(music){
   title.innerText = music.sing + " - " + music.singer;
   album.innerText = music.album;
   image.src =  music.img;
   audio.src = music.mp3;
}

function minandsecformat(secformat){
    var minute= Math.floor(secformat / 60);
    var second = Math.floor(secformat % 60);
    if(minute<10){
        minute = "0" + minute;
    }
    if(second<10){
        second = "0" + second;
    }
    var minandsec = minute + ":" + second;

    return minandsec;
}

range.value=0;

audio.addEventListener("loadeddata",() => {
    var secformat = audio.duration;
    range.max=secformat;
    duration.textContent = minandsecformat(secformat);
})

audio.addEventListener("timeupdate",() => {
    var secformat = audio.currentTime;
    currenttime.textContent = minandsecformat(secformat);
    range.value = secformat;
    
    if(secformat == audio.duration){
        if(repcounter%2==1){
            audio.currentTime=0;
            audio.play();
        }else{
            next.click();
        }
    }
})

range.addEventListener("change",() => {
    audio.currentTime = range.value;
})

vrange.addEventListener("change",() => {
    audio.muted=false;
    audio.volume= vrange.value/100;
    if(vrange.value==0){
        for(let i=1;i<5;i++){
            volume.children[i].classList.remove("d-inline-block");  
            volume.children[i].classList.add("d-none");  
        }
        volume.children[2].classList.remove("d-none");
        volume.children[2].classList.add("d-inline-block");
    }
    else if(vrange.value<70){
        for(let i=1;i<5;i++){
            volume.children[i].classList.remove("d-inline-block");  
            volume.children[i].classList.add("d-none");  
        }
        volume.children[3].classList.remove("d-none");
        volume.children[3].classList.add("d-inline-block");
    }
    else{
        for(let i=1;i<5;i++){
            volume.children[i].classList.remove("d-inline-block");  
            volume.children[i].classList.add("d-none");  
        }
        volume.children[4].classList.remove("d-none");
        volume.children[4].classList.add("d-inline-block");
    }
    volumecounter=1;
})

let volumecounter=0;
volume.addEventListener("click",() => {
    if(volumecounter%2==0){
        audio.muted=true;
        for(let i=1;i<5;i++){
            volume.children[i].classList.remove("d-inline-block");  
            volume.children[i].classList.add("d-none");  
        }
        volume.children[1].classList.remove("d-none");
        volume.children[1].classList.add("d-inline-block");
        volumecounter++;
    }
    else{
        audio.muted=false;
        volumecounter++;
        for(let i=1;i<5;i++){
            volume.children[i].classList.remove("d-inline-block");  
            volume.children[i].classList.add("d-none");  
        }
        if(vrange.value==0){
            volume.children[2].classList.remove("d-none");
            volume.children[2].classList.add("d-inline-block"); 
        }
        else if(vrange.value<70){
            volume.children[3].classList.remove("d-none");
            volume.children[3].classList.add("d-inline-block");
        }
        else{
            volume.children[4].classList.remove("d-none");
            volume.children[4].classList.add("d-inline-block");
        }
    }
    
})

function displayMusicList(musicPlayer){
    for(let i=0;i<musicPlayer.musicList.length;i++){
        let musicListItem = `
        <div id="lgt${i}" onclick="musicListSelected(this,musicPlayer)" class="list-group-item d-flex justify-content-between align-items-center">
        <span id="mlsingandsinger">${musicPlayer.musicList[i].sing} - ${musicPlayer.musicList[i].singer}<span id="f${i}" class="d-none p-1"><i class="fa-regular fa-circle-play"></i></span></span>
        <span id="d${i}" class="badge text-bg-danger">00:00</span>
        <audio id="a${i}" src="${musicPlayer.musicList[i].mp3}"></audio>
        </div>
         `;

         musicPlayerList.insertAdjacentHTML("beforeend",musicListItem);

         let audio = document.getElementById(`a${i}`);
        audio.addEventListener("loadeddata",() => {
            var ad = audio.duration;
        document.getElementById(`d${i}`).textContent= minandsecformat(ad);     
        });

        

    }
}

function playMusic(musicPlayer){
    for(let i=0;i<musicPlayer.musicList.length;i++){
        if(musicPlayer.musicIndex==i){
           
            document.getElementById(`f${i}`).classList.remove("d-none");
            document.getElementById(`lgt${i}`).classList.add("bg-danger");
            document.getElementById(`lgt${i}`).classList.add("text-white");
            document.getElementById(`lgt${i}`).classList.add("border");
        }
        else{
            document.getElementById(`f${i}`).classList.add("d-none");
            document.getElementById(`lgt${i}`).classList.remove("bg-danger");
            document.getElementById(`lgt${i}`).classList.remove("text-white");
            document.getElementById(`lgt${i}`).classList.remove("border");
        }
    }
}

function musicListSelected(selected,musicPlayer){
    let id = selected.id.replace("lgt","");
    musicPlayer.musicIndex=id;
    let music = musicPlayer.musicList[id];
    console.log(musicPlayer);
    displayMusic(music);
    playMusic(musicPlayer);
}

