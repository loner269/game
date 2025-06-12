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
function resetResult() {
    document.getElementById('resultInput').value = '';
}

addStake[0].addEventListener('click', function (event) {
    event.preventDefault();
    let stake = parseFloat(document.getElementById('stakeInput').value);
    document.getElementById('stakeInput').value = stake + 50;
})
addStake[1].addEventListener('click', function (event) {
    event.preventDefault();
    let stake = parseFloat(document.getElementById('stakeInput').value);
    document.getElementById('stakeInput').value = stake + 100;
})
addStake[2].addEventListener('click', function (event) {
    event.preventDefault();
    let stake = parseFloat(document.getElementById('stakeInput').value);
    document.getElementById('stakeInput').value = stake + 200;
})
addStake[3].addEventListener('click', function (event) {
    event.preventDefault();
    let stake = parseFloat(document.getElementById('stakeInput').value);
    document.getElementById('stakeInput').value = stake + 500;
})
function clearStake() {
    document.getElementById('stakeInput').value = 0;
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

function play(multiplier) {
    let stake = parseFloat(document.getElementById('stakeInput').value);
    let newStake = stake * multiplier;
    let bal = parseFloat(document.getElementById('balanceInput').value);
    document.getElementById('balanceInput').value = bal + newStake;
    showAlert("You won! ", "green", newStake);
    sessionStorage.setItem('balance', document.getElementById('balanceInput').value);
}

betButton.addEventListener('click', function (event) {
    event.preventDefault();

    let stake = parseFloat(document.getElementById('stakeInput').value);
    let bal = parseFloat(document.getElementById('balanceInput').value);
    let guess = document.getElementById('guessInput').value;
    let result = Math.floor(Math.random() * 50) + 1;
    document.getElementById('resultInput').value = result;

    if (stake < 50) {
        document.getElementById('alert').innerText = 'Min stake is 50!';
        document.getElementById('alert').style.display = 'block';
        document.getElementById('alert').style.color = 'red';
        setTimeout(() => {
            document.getElementById('alert').style.display = 'none';
        }, 1000);
        resetResult()
        return;
    }
    else if (bal < stake) {
        document.getElementById('alert').innerText = 'Insufficient balance!';
        document.getElementById('alert').style.display = 'block';
        document.getElementById('alert').style.color = 'red';
        setTimeout(() => {
            document.getElementById('alert').style.display = 'none';
        }, 1000);
        resetResult();
        return;
    } else if (document.getElementById('guessInput').value == '') {
        document.getElementById('alert').innerText = 'Pick Your Guess!';
        document.getElementById('alert').style.display = 'block';
        document.getElementById('alert').style.color = 'red';
        setTimeout(() => {
            document.getElementById('alert').style.display = 'none';
        }, 1000);
        resetResult();
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
function resetGame() {
    sessionStorage.removeItem('balance');
    document.getElementById('balanceInput').value = 2000;
    document.getElementById('stakeInput').value = 50;
    document.getElementById('guessInput').value = '';
    document.getElementById('resultInput').value = '';
}
if(localStorage.getItem('theme') == 'dark'){
    document.body.classList.add('dark')
}else{
    document.body.classList.remove('dark')
};
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (e.matches) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});
