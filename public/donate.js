document.addEventListener('DOMContentLoaded', () => {
    // Select all buttons with specific classes
    const buttons25 = document.querySelectorAll('.donation-button-1');
    const buttons50 = document.querySelectorAll('.donation-button-2');
    const buttons100 = document.querySelectorAll('.donation-button-3');
    const customButton = document.querySelector('.donation-button-custom');

    // Function to handle button click
    function handleButtonClick(amount) {
        fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount })  // Pass the donation amount
        })
        .then(res => res.json())
        .then(({ url }) => {
            if (url) {
                window.location.href = url;  // Redirect to Stripe's payment page
            } else {
                console.error('No URL returned');
            }
        })
        .catch(e => {
            console.error('Error:', e);
        });
    }

    // Attach event listeners to each button class
    buttons25.forEach(button => {
        button.addEventListener('click', () => handleButtonClick(25));
    });

    buttons50.forEach(button => {
        button.addEventListener('click', () => handleButtonClick(50));
    });

    buttons100.forEach(button => {
        button.addEventListener('click', () => handleButtonClick(100));
    });

    // customButton.style.display = 'block';

    customButton.addEventListener('click', function () {
        const donateOptions = document.getElementById("donation-options");
        const customAmountDiv = document.createElement("div");
        const customAmountBox = document.createElement("input");
        const customAmountButton = document.createElement("button");

        customAmountDiv.id = "custom-donation";
        customAmountBox.id = "custom-amount";
        customAmountBox.placeholder = "Enter Amount in USD";
        customAmountBox.type = "number";
        customAmountButton.id = "custom-donate-button";
        customAmountButton.textContent = "Donate";

        customAmountDiv.appendChild(customAmountBox);
        customAmountDiv.appendChild(customAmountButton);
        donateOptions.appendChild(customAmountDiv);

        customAmountButton.addEventListener('click', function() {
            const customAmount = customAmountBox.value;
            if (customAmount) {
                handleButtonClick(customAmount);
            }
        })
    })
});
