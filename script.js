document.addEventListener("DOMContentLoaded", () => {
    let display = document.getElementById("display");
    let displayPrevious = document.getElementById("display-previous");
    let btns = document.getElementsByClassName("btn");
    let theme = document.getElementById("theme");
    let themeImage = document.getElementById("theme-image");

    let string = "";
    let string2 = "";
    let stringPrevious = "";

    let operation = ['+', '-', '*', '/', '%', '.']

    // calculate function
    function calculate(pressedBtn) {
        let last = string.charAt(string.length-1);

        if(string2) {
            if(operation.includes(pressedBtn) && pressedBtn != '.') {
                string = string2;
            } else {
                string = '';
            }
            string2 = '';
        }

        if(operation.includes(pressedBtn)) {
            if(string == '' && pressedBtn != '-' && pressedBtn != '.') {
                return;
            }

            if(pressedBtn == '-' && last != '-' && last != '.') {
                // do nothing
            } else if(operation.includes(last)) {
                return;
            }
        }
        
        if(pressedBtn == '=') {
            if(operation.includes(last) || string == '') {
                return;
            }
            stringPrevious = string;
            let result = eval(string);
            result = Math.round(result * 1000) / 1000;
            string = String(result);
            string2 = string;
        } else if(pressedBtn == 'AC') {
            string = '';
            stringPrevious = '';
        } else if(pressedBtn == 'DEL') {
            string = string.substring(0, string.length-1)
            stringPrevious = '';
        } else {
            string += pressedBtn;
            stringPrevious = '';
        }
        display.textContent = string;
        displayPrevious.textContent = stringPrevious;
    }

    // for virtual button pressed
    let buttons = Array.from(btns)
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            const pressedBtn = event.target.innerHTML;
            calculate(pressedBtn);
        });
    });

    // for keyboard button pressed
    const events = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '%', '.', '=', 'Enter', 'Delete', 'Backspace']
    document.addEventListener('keydown', (event) => {
        let pressedBtn = event.key;
        if(events.includes(pressedBtn)) {
            if(pressedBtn == 'Enter') pressedBtn = '=';
            else if(pressedBtn == 'Delete') pressedBtn = 'AC';
            else if(pressedBtn == 'Backspace') pressedBtn = 'DEL';
            calculate(pressedBtn);
        }
    })
    
    // for theme change
    theme.addEventListener("click", () => {
        let container = document.getElementById("container");
        if(container.classList.contains("dark-mode")) {
            container.classList.remove("dark-mode");
            themeImage.src = "./images/moon-icon.svg";
        } else {
            container.classList.add("dark-mode")
            themeImage.src = "./images/sun-icon.svg";
        }
    })

})