const [navMenu] = document.getElementsByClassName('nav-menu');
const [navLinks] = document.getElementsByClassName('nav-links');
const navLinksUl = document.querySelector('.nav-links ul');
const links = navLinksUl.querySelectorAll('li');
const [overlay] = document.getElementsByClassName('nav-menu-overlay');
const {log} = console;


navMenu?.addEventListener('click', () => {
    let counter = 0.5;
    overlay.classList.toggle('slide');
    navLinks.classList.toggle('active-menu');
    navLinksUl.classList.toggle('animate-child');
    links.forEach(link => {
        let delay = `${counter}s`;
        link.style.transitionDelay = delay;
        counter +=0.2;
    });
    
    if(!overlay.classList.contains('slide')){
        counter -= 0.5;
        overlay.style.transitionDelay = `${counter}s`;
        navLinks.style.transitionDelay = `${counter}s`;
        counter = 0;
        links.forEach(link => {
            let delay = `${counter}s`
            link.style.transitionDelay = delay;
            counter +=0.2;
        });
    }else{
        overlay.style.transitionDelay = `${0}s`;
        navLinks.style.transitionDelay = `${0.5}s`;
    }
});

// caruosel
const [carousel] = document.getElementsByClassName('carousel');
if(carousel){
    const carouselSm = Array.from(document.getElementsByClassName('carousel-sm'));
    const arrows = Array.from(document.getElementsByClassName('arrow'));
    let parentCarousel;
    let images;
    
    arrows?.forEach(arrow => {
        arrow.addEventListener('click', e => {
            if(!parentCarousel)parentCarousel = arrow.parentElement.parentElement;
            
            let currentImage = parentCarousel.querySelector('.active-image');
            images = Array.from(parentCarousel.querySelectorAll('img.work'));
            let nextImage;
            let nextImageIndex;
            let currentImageIndex = images.indexOf(currentImage);
    
            if(arrow.classList.contains('left')){
                nextImageIndex = currentImageIndex - 1;
                if(nextImageIndex < 0) nextImageIndex = images.length - 1;
                
            }else{
                nextImageIndex = currentImageIndex + 1;
                if(nextImageIndex > images.length - 1) nextImageIndex = 0;
            }
    
            nextImage = images[nextImageIndex];
    
            if(arrow.parentElement.classList.contains('flex')){
                let [currentImg] = carousel.getElementsByClassName('work');
                currentImg.src = nextImage.src;
            }
            currentImage.classList.remove('active-image');
            currentImage.classList.add('inactive-image');
            nextImage.classList.remove('inactive-image');
            nextImage.classList.add('active-image');
            // console.log(arrow.parentElement)
            if(arrow.parentElement.classList.contains('flex')) return;
            parentCarousel = null;
        });
    })
    
    // full screen carousel
    const [workImage] = carousel.getElementsByClassName('work');
    const content = [
        {
            heading: `Sullivanmedia | website design & development`,
            desc: `A portfolio website design for  Sean sullivan. My task was to redesign Sean's website and make it more clean and presentable. I made the design look sofhisticated to represent his  leadership qualities and 9 years of experience in production management. I added some simple animations in the website to make it more interesting and modern. I also did the frontend and backend development of the website.`
        },
        {
            heading: `Breeze | visual identity design`,
            desc: `breeze makes educational youtube videos for learning music. I gave their visual identity a playful and simple look to reflect their kind and friendly brand personality. Their brand assets include a logo suite, banner, thumbnails and a website.`,
        },
        {
            heading: `Bluefire | visual identity design & website design`,
            desc: `Bluefire is a film production company. They stand out because of their atmospheric movies that are available worldwide. I designed a logo keeping in mind the kind of movies they make and a website that showcaes their movies.`,
        }
    ]
    carouselSm?.forEach(carouselSm => {
        carouselSm.addEventListener('click', e => {
            if(e.target.nodeName == 'IMG'){return;}
            if(e.target.nodeName == 'I'){return;}
            parentCarousel = carouselSm;
    
            carousel.classList.remove('hide');
            let currentImage = carouselSm.querySelector('.work.active-image');
            workImage.src = currentImage.src;
            let projectCard = carouselSm.parentElement;
            let projectHeading = projectCard.querySelector('.description').textContent;
            let h3 = carousel.querySelector('h3');
            let p = carousel.querySelector('p');
    
            content.forEach(content => {
                if(content.heading == projectHeading){
                    h3.innerHTML = content.heading;
                    p.innerHTML = content.desc;
                }
            });
        });
    });
    
    const [closeIcon] = carousel.getElementsByClassName('close');
    closeIcon?.addEventListener('click', () => {
        carousel.classList.toggle('hide');
        parentCarousel = null;
    });
}