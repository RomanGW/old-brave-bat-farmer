var robot = require('robotjs');
var fs = require('fs');

var initComp = false;
var takePic = false;

var siteArray = ["www.coinbase.com", "dextools.io/app", "www.binance.com/en", "www.coinbase.com", "www.coingecko.com", "www.coingecko.com/en/coins/", "www.kraken.com/prices?quote=USD", "www.binance.com/en/trade/ADA_BNB", "www.binance.com/en/trade/BAT_BNB", "www.binance.com/en/markets", "www.binance.com/en", "www.twitter.com", "www.youtube.com"];

function Main() {
    logSites = undefined;
    if (initComp == false) {
        Init();
    }

    if (initComp == true) {
        siteCrawl(logSites);
    }
}

//initializing function
function Init() {

    //where we will put all of our starting variables
    //including questions about coinbase and x/y constants
    console.log("Welcome to BraveBot 1.0.")
    console.log("Starting...");
    sleep(1000);

    var logSites = true;

    chooseSite = 'brave://rewards';
    barEnter(chooseSite);

    // press keys
    robot.keyToggle('control', 'down');
    robot.keyToggle('t', 'down');
    
    // release keys
    robot.keyToggle('control', 'up');
    robot.keyToggle('t', 'up');

    return Main(initComp = true, logSites);
}

//site crawler loop
function siteCrawl(logSites) {

    let colorArray = ["242424", "252525", "272727"];

    //select a site from our array given our rng func
    let chooseSite = siteArray[getRandomInt(siteArray.length)];

    screenRes = robot.getScreenSize()
    var img = robot.screen.capture(0, 0, screenRes.width, screenRes.height);

    var adColor = img.colorAt[1830, 930];
    
    if (colorArray.includes(adColor)) {
        adInteract();
    }

    //web bar manip
    barEnter(chooseSite);
    sleep(20000);

    //if var takePic is t/f
    //if takePic is true, take recurring pictures of BAT amt
    //else, continue to loop and log
    if (takePic == true) {
        getBATAmt();
    } else {
        if (logSites == true) {
            logData(chooseSite);
        } else {
            return;
        }
    }
}

function adInteract() {
    robot.moveMouseSmooth(1830, 930);
    robot.mouseClick('left');

    robot.moveMouseSmooth(786, 15);
    robot.mouseClick('left');

    chooseSite = "Advertisement clicked.";
    return(logData(chooseSite));
}

//for entering websites into the web bar
function barEnter(chooseSite) {
    //move mouse and click
    robot.moveMouse(1000, 50);
    robot.mouseClick();
    robot.typeString(chooseSite);
    robot.keyTap('enter');

    console.log("Moving to site: " + chooseSite);
    return;
}

function logData(chooseSite) {
    var today = new Date();
    var date = '(' + today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ')' + ' ';
    var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds() + ' ';
    var d = `${date + time.toString() + chooseSite} \n`

    fs.writeFile('debug/siteList.txt', d, { flag: 'a+' }, err => {
        if (err) {
            console.error(err)
            return 
        } else {
            return siteCrawl(i = 0);
        }
      })
}

function getBATAmt() {
    console.log("Moving to Rewards page.");

    //move mouse and click
    var chooseSite = "brave://rewards";

    barEnter(chooseSite);

    console.log("Logging current BAT amt...");

    savePic();

    if (true) {
        console.log('BAT logged.');
        siteCrawl();
    }
}


function savePic() {

    return true;
}

function getColor() {
    sleep(2000);

    img = robot.screen.capture(0, 0, 1920, 1080);
    var mouse = robot.getMousePos();
    console.log(img.colorAt(1830, 930));
    console.log(mouse.x);
    console.log(mouse.y);
}

//TOOLS
//basic sleep function
function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

//random number generator
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

Main();