"use strict";

var imgStorm = {

    containerID: "imgStormBG", 

    maxSize: 50,
    minSize: 30,

    maxYVelocity: 4,
    minYVelocity: -4,

    maxXVelocity: 4,
    minXVelocity:-4,

    imgSRC : [
        "bubble1.png",
        "bubble2.png",
        

    ],

    amount: 5,

    imgRefs: [],

    imgs : [],

    /* OTHER STUFF */



    /* EVENT LISTENERS */

    resizeListener: function(){
        var container = document.getElementById(imgStorm.containerID);

        var containerInlineWidth = parseInt(container.style.width);
    var containerComputedWidth = parseInt(window.getComputedStyle(container).getPropertyValue("width"));
    if(isNaN(containerInlineWidth)) {
        containerInlineWidth = 0;
    } else if (isNaN(containerComputedWidth)) {
        containerComputedWidth = 0;
    }

    container.width = Math.max(
        containerComputedWidth,
        containerInlineWidth
    );

    var containerInlineHeight = parseInt(container.style.height);
    var containerComputedHeight = parseInt(window.getComputedStyle(container).getPropertyValue("height"));
    if(isNaN(containerInlineHeight)) {
        containerInlineHeight = 0;
    } else if (isNaN(containerComputedHeight)) {
        containerComputedHeight = 0;
    }


    container.height = Math.max(
        containerComputedHeight,
        containerInlineHeight
    );
    },

    listenerState: "on",

    toggleListeners: function(){
        if(imgStorm.listenerState = "on") {
            window.addEventListener("resize", imgStorm.resizeListener);
        } else if(imgStorm.listenerState = "off") {
            window.removeEventListener("resize", imgStorm.resizeListener);
        }
    }
};

imgStormScript();

function imgStormScript(){

    imgStorm.listenerState = "off";
    imgStorm.toggleListeners();

    imgStorm.listenerState = "on";
    imgStorm.toggleListeners();


    var container = document.getElementById("imgStormBG");

    container.style.overflow = "hidden";

    // SET CONTAINER WIDTH/HEIGHT ATTRIBUTES.
    var containerInlineWidth = parseInt(container.style.width);
    var containerComputedWidth = parseInt(window.getComputedStyle(container).getPropertyValue("width"));
    if(isNaN(containerInlineWidth)) {
        containerInlineWidth = 0;
    } else if (isNaN(containerComputedWidth)) {
        containerComputedWidth = 0;
    }

    container.width = Math.max(
        containerComputedWidth,
        containerInlineWidth
    );

    var containerInlineHeight = parseInt(container.style.height);
    var containerComputedHeight = parseInt(window.getComputedStyle(container).getPropertyValue("height"));
    if(isNaN(containerInlineHeight)) {
        containerInlineHeight = 0;
    } else if (isNaN(containerComputedHeight)) {
        containerComputedHeight = 0;
    }


    container.height = Math.max(
        containerComputedHeight,
        containerInlineHeight
    );
    




initializeImg();
    function initializeImg(){
        var srcMax = imgStorm.imgSRC.length - 1;

        /* CONSTRUCTOR FUNCTION */
    function img(imgSRC, imgID, imgSize) {
        this.x = Math.random() * ((container.width - imgSize - 5) - 5) + 5;
        this.y = Math.random() * ((container.height - imgSize - 5) - 5) + 5;;
        this.yVelocity = Math.random() * (imgStorm.maxYVelocity - imgStorm.minYVelocity) + imgStorm.minYVelocity;
        this.xVelocity = Math.random() * (imgStorm.maxXVelocity - imgStorm.minXVelocity) + imgStorm.minXVelocity;
        this.imgSRC = imgSRC;
        this.imgID = imgID;
        this.size = imgSize;

    }

    for(var i = 0; i < imgStorm.amount; i++) {
        var randSize = Math.random() * (imgStorm.maxSize - imgStorm.minSize) + imgStorm.minSize;
        var randSRC = Math.round(Math.random() * srcMax);
        var curID = "imgstorm" + i;
        var currentIMG = new img(randSRC, curID, randSize);
        imgStorm.imgs.push(currentIMG);

        var imgElem = new Image();
        imgElem.setAttribute("id", curID);
        imgElem.setAttribute("style", "position: absolute; pointer-events: none; top:" + imgStorm.imgs[i].y + "px; left:" + imgStorm.imgs[i].x + "px; width:" + randSize + "px; height:" + randSize + "px;");
        imgElem.src = imgStorm.imgSRC[randSRC];

        imgElem.height = randSize;
        imgElem.width = randSize;
        
        
        container.append(imgElem);
        
        imgStorm.imgRefs.push(imgElem);
        
     }

     moveImages();
    }

    /* MOVE IMAGES */
    
    function moveImages() {

        for (var i = 0; i < imgStorm.imgs.length; i++) {
            imgStorm.imgRefs[i].style.top = imgStorm.imgs[i].y + "px";
            imgStorm.imgRefs[i].style.left = imgStorm.imgs[i].x + "px";

            if (imgStorm.imgs[i].y < 0 || imgStorm.imgs[i].y + imgStorm.imgRefs[i].height > container.height) {
                imgStorm.imgs[i].yVelocity = imgStorm.imgs[i].yVelocity * -1;
            }

            if (imgStorm.imgs[i].x < 0 || imgStorm.imgs[i].x + imgStorm.imgRefs[i].width > container.width) {
                imgStorm.imgs[i].xVelocity = imgStorm.imgs[i].xVelocity * -1;
            }

            imgStorm.imgs[i].y += imgStorm.imgs[i].yVelocity;
            imgStorm.imgs[i].x += imgStorm.imgs[i].xVelocity;


        }

        /* CALLBACK */
        requestAnimationFrame(moveImages);
    }

}