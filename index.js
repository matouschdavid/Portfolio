function scrollToElement(element) {
    document.getElementById(`${element}Anchor`).scrollIntoView({
        behavior: 'smooth'
    });
}

const lines = document.getElementsByClassName('home_line');
const heroFrameCount = 70;
const threeDotsPause = 30;
const threeDotsFrameCount = 68;
// const frameCount = heroFrameCount + threeDotsPause + threeDotsFrameCount;
const frameCount = heroFrameCount;
const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
canvas.width = window.innerWidth;
canvas.height = Math.round(innerWidth * 0.38);
const context = canvas.getContext("2d");
const currentFrame = index => {
    if (index <= heroFrameCount) {
        return `./assets/hello_screen/frame_${index.toString().padStart(2, '0')}.jpg`
    }
    if (index < (threeDotsPause + heroFrameCount))
        return undefined;

    return `./assets/three_dots/frame_${(index - (threeDotsPause + heroFrameCount)).toString().padStart(2, '0')}.jpg`

};
const img = new Image();
img.src = currentFrame(0);

img.onload = function () {
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
}

const updateImage = index => {
    const res = currentFrame(index);
    if (!res) {
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        return;
    }
    img.src = res;
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
}


const preloadImages = () => {
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
    }
};


preloadImages();
window.addEventListener('scroll', () => {
    const scrollTop = html.scrollTop;
    // const maxScrollTop = window.innerHeight * 3.5;
    const maxScrollTop = window.innerHeight * 1.65;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
        frameCount,
        Math.floor(scrollFraction * frameCount)
    );
    requestAnimationFrame(() => updateImage(frameIndex))
});