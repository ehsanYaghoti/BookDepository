
class Slider  {

    sliderIndex = 0;

    constructor(options){
        this.options = options;

        this.initialStuff();

        this.createButtons();
        // this.createDots();

 
        // this.showSlides(1)

    }

    initialStuff(){

        let { el : sliderElement , body : sliderBody , slideClass , currentSlider } = this.options

        if(! sliderElement){ throw Error('slider element dose not exist') };

        this.sliders = [ ...sliderBody.children ].filter(element => element.classList.contains(slideClass))

    }


    createButtons(){
        const { el : sliderElement } = this.options

        sliderElement.insertAdjacentHTML('beforeend' , `
        <a class="next">&#10095;</a>
        <a class="prev">&#10094;</a>    
        `)

        sliderElement.querySelector('.next').addEventListener('click' , e => this.showSlides(++this.sliderIndex))
        sliderElement.querySelector('.prev').addEventListener('click' , e => this.showSlides(--this.sliderIndex))



    }

    createDots(){
        const { el : sliderElement} = this.options;

        this.sliders = [ ...document.getElementById('sliders-body').children ]
        
        let length = this.sliders.length


        let dots = document.createElement('div')
        dots.classList.add('dots')

        let dotElements =  []

        for( var i=1 ; i<=length/6 ; i++ ){

            let element =  `<span class='dot' data-index=${i} ></span> `
            // element.classList.add('dot')
            // element.setAttribute('data-slide' , `${i}`)

            dotElements.push(element)

        }

        dotElements.toString()

        dots.innerHTML = `${dotElements.join('')}`

        sliderElement.after(dots)

        this.dots = dots.querySelectorAll('.dot')

        this.dots.forEach(dot => dot.addEventListener('click' , e => { this.showSlides(parseInt(e.target.dataset.index))}))

    }

    showSlides(number){

        let { el : sliderElement , body , slideClass , currentSlider } = this.options

        console.log('first ' + this.sliderIndex )
        if(number < 0){ 
            this.sliderIndex = Math.floor((this.sliders.length/7)) 
            console.log(this.sliderIndex)
        }

        if(number > (this.sliders.length/6)-1 ){
            this.sliderIndex = 0 
        }

        // this.dots.forEach(dot => dot.classList.remove('active'));

        let move = this.sliderIndex * 50

        // body.style = `right : ${move}% `
        body.style = `transform :  translatex(${move}%) `



        
    }


}
