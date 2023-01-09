window.location.hash = "top";

var points = document.querySelectorAll(".point");
var height = null;
var bordersScreen = null;
var margin = null;
var initialX = new Array();
var pointRotation = new Array();

const initHeight = () => {
    height = window.innerHeight;
    bordersScreen = (height/20)*1;
    margin = height/10;
}
initHeight();

const isInSide = (pointMarginTop) => {
    if(pointMarginTop <= bordersScreen || pointMarginTop >= height-(bordersScreen*1.5)) {
        return true;
    } else {
        return false;
    }
}

const distanceMiddle = (pointMarginTop) => {
    let distance = pointMarginTop - (height/2);
    return Math.abs(distance);
}

const getNewScale = (distanceMid) => {
    let min = 1;
    let max = 2.2;

    let scale = (distanceMid/(height))*(max-min)-min;
    scale = scale * 1.5;
    return scale;
}

var bar = document.querySelector("#timeline");
var bool = false;
const moveBar = () => {
    // Faire monter la barre
    bar.style.transition = "transform 1s";
    bar.style.transform = "translateY(0)";
}

const onscroll = () => {
    if (window.scrollY > height/2 && !bool) {
        moveBar();
    }
    let pointMarginTop = null;
    points.forEach((point, index) => {
        let scrollValue = window.scrollY;
        pointMarginTop = point.offsetTop - scrollValue + margin;
        if(isInSide(pointMarginTop)) {
            point.style.opacity = 0;
        } else {
            point.style.opacity = 1;
        }

        let distanceMid = distanceMiddle(pointMarginTop);

        // Plus le point est proche du milieu de l'écran, plus il est grand
        pointRotation[index] = -pointMarginTop/3;
        point.style.transform = "rotate("+pointRotation[index]+"deg) scale("+getNewScale(distanceMid)+")";
    });
} 

// Fonction qui permet de faire défiler les points
var addToScale = 0;
const moveProjects = (time = 50) => {
        let i = Math.floor(Math.random() * projects.length);

        let timeInterval = time;

        let wasPassed = [];

        let intervalAnimation = setInterval(() => { 

            while(wasPassed.includes(i)) {
                i = Math.floor(Math.random() * projects.length);
            }
            
            wasPassed.push(i);

            let project = projects[i];

            project.style.transition = "background-color 0.5s, box-shadow  0.1s, transform 3s, backdrop-filter 1s";

            let proba = Math.floor(Math.random() * 100);
            let lessOrMore = Math.floor(Math.random() * 3);

            let Y = null;
            let X = null;
            let scale = null;            
            let rotate = null;
            if(project.id == lastProjectId)
                scale = addToScale;
            else 
                scale = 0;

            let tmpScale = Math.floor(Math.random() * 2);
            if (proba < 65) {

                X = Math.floor(Math.random() * 3);
                rotate = Math.floor(Math.random() * 5);
                Y = (Math.floor(Math.random() * 2));

                if (lessOrMore == 0) {
                    Y = -Y;
                    scale += 1-(tmpScale/100);
                    rotate = -rotate/4;
                } else {
                    scale += 1+(tmpScale/100);
                    rotate = rotate/4;
                }

            } else {

                X = Math.floor(Math.random() * 2);
                rotate = Math.floor(Math.random() * 7);
                Y = (Math.floor(Math.random() * 4));

                if (lessOrMore == 0) {
                    Y = -Y;
                    scale += 1-(tmpScale/100);
                    rotate = -rotate/7;
                } else {
                    scale += 1+(tmpScale/100);
                    rotate = rotate/7;
                }
            }
            let newX = initialX[i]+X;
            translate = "translateX("+(newX)+"vw) translateY("+Y+"vh) scale("+scale+") rotate("+rotate+"deg)";
            project.style.transform = translate;

            if(i == projects.length-1) {
                clearInterval(intervalAnimation);
                i = 0;
            }
            i++;
    }, timeInterval);  
}

var main = () => {
    for (var i = 0; i < points.length; i++)  
        pointRotation.push(160);

    moveProjects(1);
    setInterval(moveProjects, 1000);
    document.addEventListener("scroll", onscroll);
}
var projects = document.querySelectorAll(".project");
projects.forEach((project, index) => {
    let rand = Math.floor(Math.random() * 20)-10;
    initialX[index] = rand;
    project.style.transform = "translateX("+rand+"vw)";
    if(index == projects.length-1) {
        main();
    }
});

const colorPoint = (point) => {
    point.style.background = "linear-gradient(160deg, transparent 60%, rgb(222, 162, 132) 40%)";
    point.style.boxShadow = "0 0 10px 0 rgb(0, 0, 0)";
    point.style.backdropFilter = "blur(10px)";
}

const uncolorPoint = (point) => {
    point.style.removeProperty("background");
    point.style.removeProperty("box-shadow");
    point.style.removeProperty("backdrop-filter");
}

const modifyScale = (element, newscale) => {
    tmp = element.style.transform;
    scale = tmp.split("scale(")[1].split(")")[0];
    scale = parseFloat(scale);
    scale = scale + (newscale);
    element.style.transform = tmp.split("scale(")[0]+"scale("+scale+")";
}

var isSelect = false;
var lastProjectId = null;
const onclickProject = (project) => {
    if (!isSelect) {
        lastProjectId = project.id;

        isSelect = true;

        project.style.backgroundColor ="rgba(219, 207, 207, 0.7)";
        let nbPoint = project.id.replace("proj", "");
        let point = document.querySelector("#p"+nbPoint);

        colorPoint(point);

        modifyScale(point, -0.1);
        modifyScale(project, 0.1)
        addToScale = 0.1;
    } else {
        if (lastProjectId == project.id) {
            disclickProject(project);
            isSelect = false;
            lastProjectId = null;
        } else {
            disclickProject(document.querySelector("#"+lastProjectId));
            isSelect = false;
            onclickProject(project);
        }
    }
}

const disclickProject = (project) => {
    project.style.removeProperty("background-color");
    
    let nbPoint = project.id.replace("proj", "");
    let point = document.querySelector("#p"+nbPoint);

    uncolorPoint(point);

    modifyScale(point, 0.1);
    modifyScale(project, -0.05);
    addToScale = 0;
}

const colorButtonsAssociateToProject = (project) => {
    let nbPoint = project.id.replace("proj", "");
    let point = document.querySelector("#p"+nbPoint);
    colorPoint(point);
}

const uncolorButtonsAssociateToProject = (project) => {
    if(!isSelect || project.id != lastProjectId){
        let nbPoint = project.id.replace("proj", "");
        let point = document.querySelector("#p"+nbPoint);
        uncolorPoint(point);
    }
}

// Si la taille de la fenetre change on mettra à jour les valeurs de la hauteur de la fenetre
window.onresize = initHeight;