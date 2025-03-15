document.addEventListener('DOMContentLoaded', () => {
    const cosmicButton = document.getElementById('cosmicButton');
    const starfield = document.getElementById('starfield');
    const particles = document.getElementById('particles');
    let isActive = false;
    let animationFrameId;
    let stars = [];
    let particlesArray = [];

    // Star class for starfield effect
    class Star {
        constructor() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0) this.x = window.innerWidth;
            if (this.x > window.innerWidth) this.x = 0;
            if (this.y < 0) this.y = window.innerHeight;
            if (this.y > window.innerHeight) this.y = 0;
        }

        draw(ctx) {
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Particle class for cosmic effect
    class Particle {
        constructor() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.size = Math.random() * 3;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `hsla(${Math.random() * 60 + 200}, 100%, 50%, ${Math.random() * 0.5 + 0.5})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) this.size -= 0.1;

            if (this.x < 0 || this.x > window.innerWidth ||
                this.y < 0 || this.y > window.innerHeight ||
                this.size <= 0.2) {
                return false;
            }
            return true;
        }

        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        return canvas.getContext('2d');
    }

    const starCtx = initCanvas(starfield);
    const particleCtx = initCanvas(particles);

    // Initialize stars
    for (let i = 0; i < 100; i++) {
        stars.push(new Star());
    }

    function animate() {
        starCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Update and draw stars
        stars.forEach(star => {
            star.update();
            star.draw(starCtx);
        });

        // Add new particles
        if (isActive && Math.random() > 0.8) {
            particlesArray.push(new Particle());
        }

        // Update and draw particles
        particlesArray = particlesArray.filter(particle => {
            if (particle.update()) {
                particle.draw(particleCtx);
                return true;
            }
            return false;
        });

        animationFrameId = requestAnimationFrame(animate);
    }

    function handleResize() {
        starfield.width = window.innerWidth;
        starfield.height = window.innerHeight;
        particles.width = window.innerWidth;
        particles.height = window.innerHeight;
    }

    window.addEventListener('resize', handleResize);

    cosmicButton.addEventListener('click', () => {
        isActive = !isActive;
        cosmicButton.textContent = isActive ? 'Stop Cosmic' : 'Cosmic Effect';
        cosmicButton.classList.toggle('active');

        if (!animationFrameId) {
            animate();
        }
    });

    // Start the initial animation
    animate();
}));