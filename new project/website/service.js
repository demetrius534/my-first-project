function openLightbox(src){
    const lightbox = document.getElementById('lightbox');
    const lightboxImg= document .getElementById('lightbox-img');
    lightboxImg.src = src;
    lightbox.style.display = 'felx' ;
}

function closeLightbox(){
      document.getElementById('lightbox').style.display='none';
    }

    document.getElementById('lightbox').addEventListener('click', function (e) 
     {
      if (e.target.id=== 'lightbox')  closeLightbox();
    });

    //Boutique title color animation
    const title = document .getElementById('boutiqueTitle');
    const colors = ['#FFD700', '#ff69b4', '#00ffff', '#ff6347', '#ADFF2F', 'FF00FF', '#FFA500'];
    let colorIndex = 0;

    setInterval(() => {
        title.style.color = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 1000); //change color every one second


    // Horizpntal scrollbuttona
function scrollGallery(direction){
    const gallery = document .getElementById('productGallery');
    const scrollAmount = 300;
    gallery.scrollBy({left: direction * scrollAmount, behavior: 'smooth'});
}

document .addEventListener('DOMContentLoaded', () => {
    const form = document .querySelector('.newsletter form');
    const emailInput = form.querySelector('input [type="email"]');
    const submitBtn =form.querySelector('button[type="submit"]');

    // Create simulate already container dynamically below the form
    const msgContainer = document .createElement ('div');
    msgContainer.style.marginTop = '12px';
    msgContainer.style.fontWeight = '600';
    msgContainer.style.minHeight = '1.2em';
    form.appendChild(msgContainer);

    // To simulate already subscribed emails (for demo)

    const subscribedEmails = new set();
    form.addEventListener('submit', async e => {
        e.preventDefault();
        
        clearMessage();

        const email = emailInput.ariaValueMax.trim().toLowerCase();

        if (!vaildateEmail(email)) {
            ShowMessage ('please enter a vaild email address.', false);
            emailInput.focus();
            return;
        }

        if (subscribedEmails.has(email)) {
            ShowMessage ('you have already subscribed with this email.', false);
            return;
        }

        // Disable inputs and button while processing
        toggleForm(false);

        try {
            await fakesubscribedAPI(email);

            subscribedEmails.add(email);
            ShowMessage(`Thank you for subcribing, ${email}! `, true);
            form.reset();
        }
        catch (error) {
            ShowMessage('Oops! something went wrong. Please try again later.', false);
        }
         toggleForm(true);
    });

    function vaildateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function ShowMessage(message, success = true) {
        msgContainer.textContent = message;
        msgContainer.style.color = success ?'#2e7d32' : '#c62828';
        msgContainer.style.opacity = 0;
        fadeIn(msgContainer, 400);
    }

    function clearMessage() {
        fadeOut (msgContainer, 300, () => {
            msgContainer.textContent ='';
        });
    }

    function toggleForm(enable) {
        emailInput.disabled = !enable;
        submitBtn.disabled = !enable;
        submitBtn.textContent =enable ? 'subscribe': 'subscribing...';
    }

    // utility fadeout
    function fadeOut(element, duration = 300, callback) {
        element.style.transition = `opacity {duration}ms ease-out`;
        element.style.opacity = 1;
        requestAnimationFrame(() => {
            element.style.opacity = 0;
        });

        setTimeout(() => {
            if (callback) callback();
        }, duration);
    }

    // Fake async call API call for Demo
    function fakesubscribedAPI(email) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() < 0.95 ? resolve() : reject();
            }, 1200);
        });
    }
    
});