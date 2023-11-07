"use client";

import { useRef, useEffect } from "react";

export default function Game() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    // console.log(canvas.getContext("2d"))
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 600;

    // context.fillStyle = "black";
    // context.fillRect(100,200,50,75);
    // context.rect(100,200,500,750);
    // context.fill();
    // drawRect(100, 100, 100, 100, "red");
    // drawRect(0, 0, 600, 400, "black");
    // drawRect(300, 100, 100, 100, "red");
    // context.fillStyle = "red";
    // context.beginPath();
    // context.arc(300, 350, 100, 0, Math.PI*2, false);
    // context.closePath();
    // context.fill();

    const paddleA = {
      x: 0,
      y: canvas.height / 2 - (25 * canvas.height) / 100 / 2,
      width: (1.25 * canvas.width) / 100,
      height: (25 * canvas.height) / 100,
      color: "#B7AB98",
      score: 0,
    };

    const paddleB = {
      width: (1.25 * canvas.width) / 100,
      height: (25 * canvas.height) / 100,
      x: canvas.width - (1.25 * canvas.width) / 100,
      y: canvas.height / 2 - (25 * canvas.height) / 100 / 2,
      color: "#B7AB98",
      score: 0,
    };
    const net = {
      x: (50 * canvas.width) / 100 - 2 / 2,
      y: 0,
      width: 2,
      height: 10,
      color: "white",
    };
    const ball = {
      x: (50 * canvas.width) / 100,
      y: (50 * canvas.height) / 100,
      radius: Math.sqrt(
        ((0.0981 * (canvas.height * canvas.width)) / 100) * (1 / Math.PI),
      ),
      color: "#F2937D",
      speed: canvas.width / 100,
      velocityX: 5,
      velocityY: 5,
      space: 0,
    };

    function drawRect(x, y, w, h, color) {
      context.fillStyle = color;
      context.fillRect(x, y, w, h);
    }
    function drawText(text, x, y, color) {
      context.fillStyle = color;
      context.font = "75px fantasy";
      context.fillText(text, x, y);
    }
    function drawCircle(x, y, r, color) {
      context.beginPath();
      context.fillStyle = color;
      context.arc(x, y, r, 0, Math.PI * 2);
      // context.closePath();
      context.fill();
    }
    function Drawnet() {
      if (canvas.width >= canvas.height) {
        for (let i = 0; i < canvas.height; i += 15) {
          drawRect(net.x, net.y + i, net.width, net.height, net.color);
        }
      } else {
        for (let i = 0; i < canvas.width; i += 15) {
          drawRect(net.x + i, net.y, net.height, net.width, net.color);
        }
      }
    }
    // let rectX = 0;
    function collision(ball, paddle) {
      const pTop = paddle.y;
      const pbottom = paddle.y + paddle.height;
      const pleft = paddle.x;
      const pright = paddle.x + paddle.width;
      const ballTop = ball.y - ball.radius;
      const ballbottom = ball.y + ball.radius;
      const ballleft = ball.x - ball.radius;
      const ballright = ball.x + ball.radius;

      return (
        ballright > pleft &&
        ballbottom > pTop &&
        ballleft < pright &&
        ballTop < pbottom
      );
    }
    function render() {
      // context.fillStyle = "#262522,0.2";
      // context.fillRect(0, 0, canvas.width, canvas.height);
      // if (canvas.width < canvas.height)
      //     recalculate();
      drawRect(0, 0, canvas.width, canvas.height, "rgb(38, 37, 34)");
      drawRect(
        paddleA.x,
        paddleA.y,
        paddleA.width,
        paddleA.height,
        paddleA.color,
      );
      drawRect(
        paddleB.x,
        paddleB.y,
        paddleB.width,
        paddleB.height,
        paddleB.color,
      );
      Drawnet();
      // drawText(paddleA.score, canvas.width/4, canvas.height/5,"white" );
      // drawText(paddleB.score, 3*canvas.width/4, canvas.height/5,"white" );
      drawCircle(ball.x, ball.y, ball.radius, ball.color);
      // rectX = rectX + 1;
    }
    function resetBall() {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.speed = (0.625 * canvas.width) / 100;
      ball.velocityX *= -1;
      ball.space = 0;
      paddleB.y = canvas.height / 2 - (25 * canvas.height) / 100 / 2;
      paddleA.y = canvas.height / 2 - (25 * canvas.height) / 100 / 2;
    }

    function update() {
      if (ball.space === 1) {
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;
      }
      if (canvas.width >= canvas.height) {
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0)
          ball.velocityY *= -1;
        let paddle = ball.x < canvas.width / 2 ? paddleA : paddleB;
        if (collision(ball, paddle)) {
          let interPoint =
            (ball.y - (paddle.y + paddle.height / 2)) / (paddle.height / 2);
          // console.log("interPoint =",interPoint);
          let angle = interPoint * (Math.PI / 4);
          let direction = ball.x < canvas.width / 2 ? 1 : -1;
          ball.velocityX = direction * (Math.cos(angle) * ball.speed);
          ball.velocityY = Math.sin(angle) * ball.speed;
          ball.speed += 0.5;
        }
        if (ball.x - ball.radius < 0) {
          paddleB.score++;
          recalculate();
          ball.space = 0;
        } else if (ball.x + ball.radius > canvas.width) {
          paddleA.score++;
          recalculate();
          ball.space = 0;
        }
      } else {
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0)
          ball.velocityX *= -1;
        let paddle = ball.y < canvas.height / 2 ? paddleA : paddleB;
        if (collision(ball, paddle)) {
          let interPoint =
            (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
          // console.log("interPoint =",interPoint);
          let angle = interPoint * (Math.PI / 4);
          let direction = ball.y < canvas.height / 2 ? 1 : -1;
          ball.velocityX = Math.sin(angle) * ball.speed;
          ball.velocityY = direction * (Math.cos(angle) * ball.speed);
          ball.speed += 0.1;
        }
        if (ball.y - ball.radius < 0) {
          paddleB.score++;
          recalculate();
          ball.space = 0;
        } else if (ball.y + ball.radius > canvas.height) {
          paddleA.score++;
          recalculate();
          ball.space = 0;
        }
      }
    }
    function recalculate() {
      if (canvas.width >= canvas.height) {
        ball.x = (50 * canvas.width) / 100;
        ball.y = (50 * canvas.height) / 100;
        ball.radius = Math.sqrt(
          ((0.0981 * (canvas.height * canvas.width)) / 100) * (1 / Math.PI),
        );
        paddleB.x = canvas.width - paddleB.width;
        paddleB.y = canvas.height / 2 - (25 * canvas.height) / 100 / 2;

        paddleA.x = 0;
        paddleA.y = canvas.height / 2 - (25 * canvas.height) / 100 / 2;
        paddleA.width = (1.25 * canvas.width) / 100;
        paddleA.height = (25 * canvas.height) / 100;
        paddleB.width = (1.25 * canvas.width) / 100;
        paddleB.height = (25 * canvas.height) / 100;
        net.x = (50 * canvas.width) / 100 - 2 / 2;
        net.y = 0;
      } else {
        ball.x = (50 * canvas.width) / 100;
        ball.y = (50 * canvas.height) / 100;
        ball.radius = Math.sqrt(
          ((0.0981 * (canvas.height * canvas.width)) / 100) * (1 / Math.PI),
        );
        ball.speed = canvas.height / 100;

        paddleB.x = canvas.width / 2 - (25 * canvas.width) / 100 / 2;
        paddleB.y = canvas.height - (1.25 * canvas.height) / 100;
        paddleB.height = (1.25 * canvas.height) / 100;
        paddleB.width = (25 * canvas.width) / 100;

        paddleA.y = 0;
        paddleA.x = canvas.width / 2 - (25 * canvas.width) / 100 / 2;
        paddleA.height = (1.25 * canvas.height) / 100;
        paddleA.width = (25 * canvas.width) / 100;

        net.y = (50 * canvas.height) / 100 - 2 / 2;
        net.x = 0;
        // paddleB.width = (1.25 * canvas.width) / 100;
        //     paddleB.height = (25 * canvas.height) / 100;
        //     net.x = (50 * canvas.width)/100 - 2/2;
      }
    }
    const framepersecond = 50;
    window.addEventListener("keydown", (event) => {
      if (canvas.width >= canvas.height) {
        if (event.key === "ArrowDown") {
          if (paddleB.y + paddleB.height < canvas.height)
            paddleB.y += (5 * canvas.height) / 100;
        } else if (event.key === "ArrowUp") {
          if (paddleB.y > 0) paddleB.y -= (5 * canvas.height) / 100;
        } else if (event.key === "w") {
          if (paddleA.y > 0) paddleA.y -= (5 * canvas.height) / 100;
        } else if (event.key === "s") {
          if (paddleA.y + paddleA.height < canvas.height)
            paddleA.y += (5 * canvas.height) / 100;
        } else if (event.key === " ") {
          ball.space = 1;
        }
      } else {
        if (event.key === "ArrowLeft") {
          if (paddleB.x > 0) paddleB.x -= (5 * canvas.width) / 100;
        } else if (event.key === "ArrowRight") {
          if (paddleB.x + paddleB.width < canvas.width)
            paddleB.x += (5 * canvas.height) / 100;
        } else if (event.key === "a") {
          if (paddleA.x > 0) paddleA.x -= (5 * canvas.width) / 100;
        } else if (event.key === "d") {
          if (paddleA.x + paddleA.width < canvas.width)
            paddleA.x += (5 * canvas.height) / 100;
        } else if (event.key === " ") {
          ball.space = 1;
        }
      }
      // console.log(ball.radius);
      // console.log(event.key);
    });

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth - 100;
      canvas.height = window.innerHeight - 600;
      // console.log("canvas.height :",canvas.height);
      // console.log("canvas.width :",canvas.width);
      recalculate();
      render();
    });

    function game() {
      update();
      context.clearRect(0, 0, canvas.width, canvas.height);
      render();
    }

    // setInterval(game, 1000/framepersecond);

    function f() {
      game();
      requestAnimationFrame(f);
    }
    recalculate();
    requestAnimationFrame(f);
  }, []);

  return <canvas ref={ref} width="800" height="400"></canvas>;
}
