// Setup canvas and context
const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to hold hearts
const heartsArray = [];

// Load heart image
const heartImage = new Image();
heartImage.src = "/assets/heart.png"; // Use the local image

// Heart class definition
class Heart {
  constructor(x, y, size, speed, opacity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.opacity = opacity;
  }

  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(heartImage, this.x, this.y, this.size, this.size);
  }

  update() {
    this.y -= this.speed;
    if (this.y < -this.size) {
      this.y = canvas.height + this.size;
      this.x = Math.random() * canvas.width;
    }
  }
}

// Create a new heart
function createHeart(x, y) {
  console.log("Creating heart at", x, y);
  const size = Math.random() * 20 + 10;
  const speed = Math.random() * 1 + 0.5;
  const opacity = Math.random() * 0.5 + 0.5;
  const heart = new Heart(x, y, size, speed, opacity);
  heartsArray.push(heart);
  console.log("Hearts array:", heartsArray);
}

// Animate the hearts
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  heartsArray.forEach((heart, index) => {
    heart.update();
    heart.draw();
    if (heart.y < -heart.size) {
      heartsArray.splice(index, 1);
    }
  });
  requestAnimationFrame(animate);
}

// Ensure the image is loaded before starting the animation
heartImage.onload = () => {
  console.log("Heart image loaded");
  // Event listener for button click
  document.getElementById("heartButton").addEventListener("click", function () {
    console.log("Button clicked");
    const x = Math.random() * canvas.width;
    const y = canvas.height;
    createHeart(x, y);
  });

  // Resize canvas when window is resized
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // Start the animation
  animate();
};

heartImage.onerror = () => {
  console.log("Failed to load heart image");
};
