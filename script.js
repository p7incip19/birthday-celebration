document.addEventListener('DOMContentLoaded', function() {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surpriseMessage = document.getElementById('surpriseMessage');
    const cakeContainer = document.querySelector('.cake-container');
    
    // Add click event to the surprise button
    surpriseBtn.addEventListener('click', function() {
        // Show the surprise message
        surpriseMessage.classList.remove('hidden');
        
        // Add celebration effects
        createConfetti();
        
        // Play a sound (using the Web Audio API)
        playBirthdaySound();
        
        // Change the button text
        surpriseBtn.textContent = '🎉 Hooray!';
        surpriseBtn.style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d)';
    });
    
    // Function to create confetti effect
    function createConfetti() {
        const container = document.querySelector('.confetti-container');
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            container.appendChild(confetti);
            
            // Remove confetti after animation completes
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    // Function to get random colors for confetti
    function getRandomColor() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffd166', '#6a0572', '#1a936f', '#ff8e53', '#74b9ff', '#fd79a8'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Function to play a birthday sound using Web Audio API
    function playBirthdaySound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Play a simple melody (Happy Birthday tune - simplified)
            const frequencies = [523.25, 523.25, 587.33, 523.25, 659.25, 622.25]; // C, C, D, C, F, E
            const durations = [0.3, 0.3, 0.5, 0.5, 0.5, 0.7];
            
            let time = audioContext.currentTime;
            
            frequencies.forEach((freq, index) => {
                oscillator.frequency.setValueAtTime(freq, time);
                time += durations[index];
            });
            
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(time);
        } catch (e) {
            console.log("Audio playback not supported in this environment");
        }
    }
    
    // Add floating animation to the cake
    setInterval(() => {
        const cake = document.querySelector('.cake');
        const randomX = (Math.random() - 0.5) * 10;
        const randomY = (Math.random() - 0.5) * 10;
        
        cake.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, 1000);
    
    // Add a subtle animation to the whole card
    const card = document.querySelector('.birthday-card');
    setInterval(() => {
        const rotation = Math.sin(Date.now() / 2000) * 0.5;
        card.style.transform = `rotate(${rotation}deg)`;
    }, 50);
});

// Add some particle effects on mouse move
document.addEventListener('mousemove', function(e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.body.style.background = `
        radial-gradient(at ${x * 100}% ${y * 100}%, 
        rgba(255, 182, 193, 0.5) 0%, 
        rgba(255, 209, 196, 0.3) 50%, 
        rgba(255, 156, 163, 0.1) 100%)
    `;
});