// CHallenge 1
function ageindays() {
    let birthyear = prompt("born year?");
    let ageindayss = (2020 - birthyear) * 365;
    let h1 = document.createElement("h1");
    let textAnswer = document.createTextNode("you are " + ageindayss + " days old");
    h1.setAttribute("id", "adeindays");
    h1.appendChild(textAnswer);
    document.getElementById("flex-box-result").appendChild(h1);
    console.log(ageindayss);
}

// refresh button
function clean() {
    let refBtn = document.getElementById("flex-box-result");
    refBtn.remove()

}


// Challenge 2
function gener() {
    let image = document.createElement("img");
    let div = document.getElementById("flex-cat-gen");
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

// Clean button
function cleanCats() {
    document.getElementById("flex-cat-gen").innerHTML = "";
}


//Challenge 3 Rock Paper Scissors
function RPSgame(yourChoice) {
    console.log(yourChoice);
    let humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randomNumGen());
    console.log("computer choice: ", botChoice);
    results = decideWinner(humanChoice, botChoice);
    console.log(results);

    Message = finalMessage(results);
    console.log(Message.message)
    rpsFrontEnd(yourChoice.id, botChoice, Message);

}

function randomNumGen() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(randomNum) {
    return ["rock", "paper", "scissors"][randomNum];
}

function decideWinner(yourChoice, compChoice) {
    let data_base = {
        "rock": {
            "scissors": 1,
            "rock": 0.5,
            "paper": 0
        },
        "paper": {
            "rock": 1,
            "paper": 0.5,
            "scissors": 0
        },
        "scissors": {
            "paper": 1,
            "scissors": 0.5,
            "rock": 0
        },
    };

    let yourScore = data_base[yourChoice][compChoice];
    let compScore = data_base[compChoice][yourChoice];

    return [yourScore, compScore];
}

function finalMessage([yourScore, compScore]) {
    if (yourScore === 0) {
        return {
            "message": "you lost",
            "color": "red"
        };
    } else if (yourScore === 0.5) {
        return {
            "message": "tie",
            "color": "blue"
        };
    } else if (yourScore === 1) {
        return {
            "message": "you won",
            "color": "green"
        };
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    let imageDataBase = {
        'rock': document.getElementById("rock").src,
        'paper': document.getElementById("paper").src,
        'scissors': document.getElementById("scissors").src
    }
    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    let humanDiv = document.createElement("div")
    let botDiv = document.createElement("div")
    let messageDiv = document.createElement("div")

    humanDiv.innerHTML = "<img src='" + imageDataBase[humanImageChoice] + "' style='box-shadow: 0px 0px 38px 0px blue'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage["message"] + "</h1>"
    botDiv.innerHTML = "<img src='" + imageDataBase[botImageChoice] + "' style='box-shadow: 0px 0px 38px 0px red'>"

    document.getElementById("flex-box-rps-div").appendChild(humanDiv);
    document.getElementById("flex-box-rps-div").appendChild(messageDiv);
    document.getElementById("flex-box-rps-div").appendChild(botDiv);

}