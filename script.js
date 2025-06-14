const betButton = document.getElementById('placeBet');
const select = document.getElementsByTagName('p');
const addStake = document.getElementsByClassName('amountInput');
const selection = document.getElementsByName('number');
let guess = document.getElementById('guessInput').value;
for (let i = 0; i < select.length; i++) {
    select[i].addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('guessInput').value = select[i].innerText;
        let selection = document.getElementsByName('number');
        for (let i = 0; i < selection.length; i++) {
            selection[i].checked = false;
        }

    });
};
for (let i = 0; i < selection.length; i++) {
    selection[i].addEventListener('click', function () {
        document.getElementById('guessInput').value = selection[i].value;
    })
}
for (let i = 0; i < addStake.length; i++) {
    let add = addStake[i].innerHTML;
    addStake[i].addEventListener('click',function(){
    switch (add) {
        case "+50":
            increase(50) ;
            break;
        case "+100":
             increase(100) ; 
            break;
        case "+200":
             increase(200) ;
            break;
        case  "+500":
            increase(500)  ;
            break;
        case "All IN":
            document.getElementById('stakeInput').value = parseFloat(document.getElementById('balanceInput').value) ;
            break;
        case "Clear" :
            document.getElementById('stakeInput').value = 0;  
    }
    })
}
betButton.addEventListener('click', function (event) {
    event.preventDefault();

    let stake = parseFloat(document.getElementById('stakeInput').value);
    let bal = parseFloat(document.getElementById('balanceInput').value);
    let guess = document.getElementById('guessInput').value;
    let result = Math.floor(Math.random() * 50) + 1;
    document.getElementById('resultInput').value = result;
   
    updateHistory(result);

    if (stake < 50) {
       showAlert2('Minimum stake is 50!');
        return;
    }
    else if (bal < stake) {
         showAlert2('Insufficient Balance!');
        return;
    } else if (document.getElementById('guessInput').value == '') {
       showAlert2('Pick Your Guess!')
        return;
    }
    else {
        document.getElementById('balanceInput').value = bal - stake;
        sessionStorage.setItem('balance', document.getElementById('balanceInput').value);
    };



    if (parseFloat(guess) == result) {
        play(6);
        return;
    }
    else if (guess === '1-10' && result > 0 && result < 11) {
        play(2.5);
        return;
    }
    else if (guess === '11-20' && result > 10 && result < 21) {
        play(2.5);
        return;
    }
    else if (guess === '21-30' && result > 20 && result < 31) {
        play(2.5);
        return;
    }
    else if (guess === '31-40' && result > 30 && result < 41) {
        play(2.5);
        return;
    }
    else if (guess === '41-50' && result > 40 && result < 51) {
        play(2.5);
        return;
    }

    else if (guess == 'odd' && document.getElementById('resultInput').value % 2 == 1) {
        play(1.75);
        return;
    }

    else if (guess == 'even' && document.getElementById('resultInput').value % 2 == 0) {
        play(1.75);
        return;
    }
    else {
        showAlert("You Lost! ", "red", "");
        return;
    }

});
if (sessionStorage.getItem('balance')) {
    document.getElementById('balanceInput').value = sessionStorage.getItem('balance');
} else {
    document.getElementById('balanceInput').value = 2000;
}
function increase(adder){
    let stake = parseFloat(document.getElementById('stakeInput').value);
    document.getElementById('stakeInput').value = stake + adder;
}
function resetResult() {
    document.getElementById('resultInput').value = '';
}
function showAlert(message, color, amount) {
    const alertBox = document.getElementById('alert1');
    alertBox.value = message + amount;
    alertBox.style.display = 'block';
    alertBox.style.color = color;
    let select = document.getElementsByTagName('p');
    for (let i = 0; i < select.length; i++) {
        if (select[i].innerText == document.getElementById('resultInput').value) {
            select[i].classList.add('bg');
            setTimeout(() => {
                select[i].classList.remove('bg');
            }, 1000);
        }
    }

    setTimeout(() => {
        alertBox.style.display = 'none';
        document.getElementById('resultInput').value = '';
        document.getElementById('guessInput').value = '';
        let selection = document.getElementsByName('number');
        for (let i = 0; i < selection.length; i++) {
            selection[i].checked = false;
        }
    }, 1000);
}
function showAlert2(error) {
     document.getElementById('alert').innerText = error;
        document.getElementById('alert').style.display = 'block';
        document.getElementById('alert').style.color = 'red';
        setTimeout(() => {
            document.getElementById('alert').style.display = 'none';
        }, 1000);
        resetResult()
}
function play(multiplier) {
    let stake = parseFloat(document.getElementById('stakeInput').value);
    let newStake = stake * multiplier;
    let bal = parseFloat(document.getElementById('balanceInput').value);
    document.getElementById('balanceInput').value = bal + newStake;
    showAlert("You won! ", "green", newStake);
    sessionStorage.setItem('balance', document.getElementById('balanceInput').value);
}
function resetGame() {
    sessionStorage.clear();
    document.getElementById('balanceInput').value = 2000;
    document.getElementById('stakeInput').value = 50;
    document.getElementById('guessInput').value = '';
    document.getElementById('resultInput').value = '';
    document.getElementById('pastResultsDisplay').innerHTML = 'NO HISTORY YET!!'
    let selection = document.getElementsByName('number');
    for (let i = 0; i < selection.length; i++) {
        selection[i].checked = false;
    }
}
function updateHistory(result) {
    let resultHistory = JSON.parse(sessionStorage.getItem('resultHistory')) || [];
    
        resultHistory.unshift(result);
      if (resultHistory.length > 50) {
        resultHistory.pop();
       }
     sessionStorage.setItem('resultHistory', JSON.stringify(resultHistory));
}
function updateDisplay(){
    const pastResult = document.getElementById('pastResultsDisplay');
    let history = JSON.parse(sessionStorage.getItem('resultHistory')) ||[];
    if(history.length===0){
        pastResult.innerHTML = 'NO HISTORY YET!!'
    }else{
        pastResult.innerHTML = history.map((r, i) => {
        return `${r}${((i + 1) % 10 === 0) ? '<br>' : ',  ' }`;
    }).join('');
    }
    
}
function pastResults(){
    document.getElementById('pastResultsDisplay').classList.toggle('show')
}
function hourToggle() {
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 18 || hour < 8) {
        document.body.classList.add('dark');
    }
};
if (localStorage.getItem('theme') == 'dark') {
    document.body.classList.add('dark')
};
document.addEventListener('click', function () {
    updateDisplay()
    hourToggle();
});
hourToggle();
updateDisplay()