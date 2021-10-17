const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
let ground;
let rope;
let fruit;
let fruit_con;
let bg_img, food_img, rabbit_img, rabbit, button;

function preload()
{
  bg_img = loadImage("Img/background.png")
  food_img = loadImage("Img/melon.png")
  rabbit_img = loadImage("Img/Rabbit-01.png")
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  rope = new Rope(6, {x: 250, y: 30});
  let fruit_options={
    density: 0.001
  }
  fruit = Bodies.circle(300, 300, 15, fruit_options);
  

  fruit_con = new Link(rope, fruit)

  button = createImg("Img/cut_btn.png")
  button.position(200, 30)
  button.size(50, 50);
  button.mouseClicked(drop)
  
  rabbit = createSprite(250, 650, 100, 100);
  rabbit.addImage(rabbit_img);
  rabbit.scale = 0.2
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER)
}

function draw() 
{
  background(51);
  image(bg_img, width/2, height/2, 500, 700);
  ground.show();
  rope.show();
  image(food_img, fruit.position.x, fruit.position.y, 60, 60);
  Engine.update(engine);
  drawSprites();
}
function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null
}