function launchFireworks() {
  const canvas = document.getElementById("fireworks-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createFirework() {
    const x = random(100, canvas.width - 100);
    const y = random(100, canvas.height / 2);
    const colors = ["#ff4d4d", "#ffd11a", "#66ff66", "#66ccff", "#ff66cc"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: x,
        y: y,
        radius: 2,
        dx: Math.cos((i * 2 * Math.PI) / 30) * random(2, 5),
        dy: Math.sin((i * 2 * Math.PI) / 30) * random(2, 5),
        life: 100,
        color: color
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      p.life--;
      if (p.life <= 0) particles.splice(i, 1);
    });

    if (Math.random() < 0.05) createFirework();

    requestAnimationFrame(draw);
  }

  draw();
}
