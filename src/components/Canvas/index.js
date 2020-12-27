import React from 'react';
import random from '../../helpers/random';
import './style.css';
const Canvas = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (canvasRef) {
      let frame;
      let width;
      let height;
      function handleWindowResize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
      window.addEventListener('resize', handleWindowResize);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      //   const radius = 40;
      const themecolor = '#eff7ff';
      ctx.fillStyle = themecolor;
      ctx.fillRect(0, 0, width, height);
      //function setup

      //constructor function
      function Shape(x, y, radius, velX, velY, color, initRadius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.initRadius = initRadius;
      }

      function setAnimateRadius() {
        if (this.initRadius < this.radius) {
          return (this.initRadius += 5);
        }
        return this.initRadius;
      }

      Shape.prototype.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, setAnimateRadius.call(this), 0, Math.PI * 2);
        ctx.fill();
      };
      Shape.prototype.update = function () {
        this.x += this.velX;
        this.y += this.velY;
      };

      // randorm function
      function sumdetect() {
        let sum = [];
        circle.forEach((list1) => {
          sum = sum.concat(list1);
        });
        return sum;
      }

      // make array balls
      let circle = [];
      let input1 = 1;
      let input2 = 1;
      function makeBalls() {
        for (let i = 0; i < input1; i++) {
          let child = [];
          circle.push(child);
          for (let j = 0; j < input2; j++) {
            let radius = random(20, 90);
            let ball = new Shape(
              random(0 + radius, width - radius),
              random(0 + radius, height - radius),
              radius,
              random(-0.5, 0.5),
              random(-0.5, 0.5),
              `rgba(${random(50, 255)},${random(50, 255)},${random(
                50,
                255
              )},${random(0.1, 1)})`,
              5
            );
            circle[i].push(ball);
          }
        }
      }

      makeBalls();
      // animate
      function animate() {
        ctx.fillStyle = themecolor;
        ctx.fillRect(0, 0, width, height);
        sumdetect().forEach((e) => {
          e.draw();
          e.update();
        });

        frame = requestAnimationFrame(animate);
      }
      animate();
      canvas.addEventListener('click', () => {
        input2++;
        makeBalls();
        window.cancelAnimationFrame(frame);
        animate();
      });
      return () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener('resize', handleWindowResize);
      };
    }
  }, []);
  return (
    <div className='canvas-wrapper'>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Canvas;
