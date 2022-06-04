let leftCarouselBtn = document.querySelector(".left-carousel-btn")
let rightCarouselBtn = document.querySelector(".right-carousel-btn")
let slides = document.querySelector(".slides")
let allSlideImages = document.querySelectorAll(".slide-img")
let navigationDots = document.querySelectorAll(".dot-navigation") 

let currentSlide = 1;

function moveToPreviousSlide()
{
    if(currentSlide===1)
    {
        currentSlide = allSlideImages.length+1
    }

    // Remove active class from all dots
    navigationDots.forEach(dot=>{
        dot.classList.remove("active")
    })
    navigationDots[currentSlide-2].classList.add("active")

    slides.style.transform = `translateX(-${100 * (currentSlide-2) }%)`
    currentSlide -= 1;
}

function moveToNextSlide()
{
    if(allSlideImages.length===currentSlide)
    {
        currentSlide = 0 
    }

    // Remove active class from all dots
    navigationDots.forEach(dot=>{
        dot.classList.remove("active")
    })
    navigationDots[currentSlide].classList.add("active")

    slides.style.transform = `translateX(-${100 * currentSlide}%)`
    currentSlide += 1;
}

let intervalId = setInterval(()=>{
    moveToNextSlide()
}, 5000)

leftCarouselBtn.addEventListener("click",()=>{
    moveToPreviousSlide()
})

rightCarouselBtn.addEventListener("click",()=>{
    moveToNextSlide()
})

navigationDots.forEach((dot,index)=>{
    dot.addEventListener("click",(event)=>{
        // Remove active class from all dots
        navigationDots.forEach(dot=>{
            dot.classList.remove("active")
        })

        event.target.classList.add("active")

        let currentIndex = index
        if(allSlideImages.length<=currentIndex)
        {
            currentIndex = 0 
        }
        slides.style.transform = `translateX(-${100 * currentIndex}%)`
        currentIndex += 1;
        currentSlide = currentIndex
    })
})