document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slideIndex = (n + slides.length) % slides.length;

        slides[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');
    }

    function moveCarousel(n) {
        showSlide(slideIndex + n);
    }

    function currentSlide(n) {
        showSlide(n - 1);
    }

    showSlide(slideIndex);
    setInterval(function() {
        moveCarousel(1);
    }, 2000);

    document.querySelector('.prev').addEventListener('click', function() {
        moveCarousel(-1);
    });

    document.querySelector('.next').addEventListener('click', function() {
        moveCarousel(1);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide(index + 1);
        });
    });
});


const searchButton = document.querySelector('.search-icon');
const searchInput = document.querySelector('.search-bar input');

if (searchButton) {
    searchButton.addEventListener('click', handleSearch);
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
}

function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const sections = document.querySelectorAll('section, .service-card, .subsection-content button');

    let found = false;
    sections.forEach(section => {
        if (sectionMatchesQuery(section, query)) {
            console.log(`Match found: ${section.id || section.querySelector('h3')?.innerText}`);
            section.scrollIntoView({ behavior: 'smooth' });
            found = true;
        } else if (sectionContainsMatchingButton(section, query)) {
            const button = section.querySelector('button');
            console.log(`Button match found: ${button.innerText}`);
            button.scrollIntoView({ behavior: 'smooth' });
            found = true;
        }
    });

    if (!found) {
        alert('No match found');
    }
}

function sectionMatchesQuery(section, query) {
    if (section.id && section.id.toLowerCase().includes(query)) {
        return true;
    } else if (section.querySelector('h3') && section.querySelector('h3').innerText.toLowerCase().includes(query)) {
        return true;
    }
    return false;
}

function sectionContainsMatchingButton(section, query) {
    const button = section.querySelector('button');
    if (button && button.innerText.toLowerCase().includes(query)) {
        return true;
    }
    return false;
}

const ws = new WebSocket(`ws://${window.location.host}`);

ws.onmessage = function (event) {
    const message = JSON.parse(event.data);
    if (message.type === 'UPDATE') {
        console.log(`Car ${message.carId} status updated to ${message.status}`);
        // Update UI with the new car status
    }
};

