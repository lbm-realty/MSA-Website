// let discord_btn = document.querySelector(".discord");
// discord_btn.addEventListener("click", function() {
//     window.open('https://discord.com/channels/1002380266339307600/1002380266792300635', '_blank');
// })

// let instagram_btn = document.querySelector(".instagram");
// instagram_btn.addEventListener("click", function() {
//     window.open('https://www.instagram.com/msa_ttu/', '_blank');
// })

document.addEventListener('DOMContentLoaded', () => {
    // Select all buttons with specific classes
    const buttons25 = document.querySelectorAll('.donation-button-1');
    const buttons50 = document.querySelectorAll('.donation-button-2');
    const buttons100 = document.querySelectorAll('.donation-button-3');
    
    // Function to handle button click
    function handleButtonClick(amount) {
        fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount })
        })
        .then(res => res.json())
        .then(({ url }) => {
            window.location = url;
        })
        .catch(e => {
            console.error(e);
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
});
