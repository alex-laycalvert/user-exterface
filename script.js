document.addEventListener("DOMContentLoaded", () => {
    const alphabet = "0123456789abcdef";
    const length = 6;
    const combinations = createCombinations(alphabet, length);
    const correctIndex = Math.floor(Math.random() * combinations.length);

    const passwordDisplay = document.querySelector("#password-display");
    if (!passwordDisplay) {
        throw new Error("passwordDisplay not found");
    }
    passwordDisplay.innerHTML = combinations[0];

    /** @type {HTMLInputElement} */
    const passwordInput = document.querySelector("#password");
    if (!passwordInput) {
        throw new Error("passwordInput not found");
    }

    passwordInput.value = 0;
    passwordInput.min = 0;
    passwordInput.max = combinations.length - 1;

    passwordInput.addEventListener("input", (e) => {
        const index = e.target.valueAsNumber;
        const password = combinations[index];
        passwordDisplay.innerHTML = password;
    });

    /** @type {HTMLFormElement} */
    const form = document.querySelector("#login-form");
    if (!form) {
        throw new Error("form not found");
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const passwordIndex = passwordInput.valueAsNumber;
        if (passwordIndex !== correctIndex) {
            alert("Username or password incorrect. Please try again");
            return;
        }

        alert("Login Successful! You may close this page and never return");
    });
});

/**
 * @param {string[]} alphabet
 * @param {number} length
 */
export function createCombinations(alphabet, length) {
    /**
     * Generate all combinations iteratively
     */
    if (length === 0) {
        return [""];
    }

    let result = [...alphabet];

    for (let i = 1; i < length; i++) {
        const temp = [];
        for (const combo of result) {
            for (const char of alphabet) {
                temp.push(combo + char);
            }
        }
        result = temp;
    }

    return result;
}
