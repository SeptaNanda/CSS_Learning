const canvas = document.getElementById("canvas");

const codeBox = document.getElementById("code-box");

const copyBtn = document.getElementById("copy-code");

const deleteBtn = document.getElementById("delete-shape");

const colorPicker = document.getElementById("shape-color");

let shapeCounter = 0;

const shapes = [];

let selectedShape = null;

/* ========================================
   BUTTONS
======================================== */

document.getElementById("add-text").onclick =
() => createShape("text");

document.getElementById("add-rect").onclick =
() => createShape("rect");

document.getElementById("add-circle").onclick =
() => createShape("circle");

document.getElementById("generate").onclick =
generateCode;

/* ========================================
   DELETE
======================================== */

deleteBtn.onclick = () => {

  if(!selectedShape){
    alert("Select a shape first!");
    return;
  }

  const index =
  shapes.findIndex(
    s => s.id === selectedShape.id
  );

  if(index !== -1){
    shapes.splice(index,1);
  }

  canvas.removeChild(selectedShape);

  selectedShape = null;
};

/* ========================================
   COLOR PICKER
======================================== */

colorPicker.addEventListener("input", () => {

  if(!selectedShape){
    return;
  }

  const newColor = colorPicker.value;

  if(selectedShape.classList.contains("text-box")){
    selectedShape.style.color = newColor;
  } else {
    selectedShape.style.background = newColor;
  }

  const shape =
  shapes.find(s => s.id === selectedShape.id);

  if(!shape) return;

  shape.background = newColor;

});

/* ========================================
   UNSELECT
======================================== */

canvas.addEventListener("click", () => {

  if(selectedShape){

    selectedShape.classList.remove("selected");

    selectedShape = null;
  }

});

/* ========================================
   CREATE SHAPE
======================================== */

function createShape(type){

  shapeCounter++;

  const shape = document.createElement("div");

  shape.classList.add("shape");

  shape.id = "shape-" + shapeCounter;

  shape.style.left = "50px";
  shape.style.top = "50px";

  /* TYPE */

  if(type === "rect"){
    shape.classList.add("rect");
  }

  else if(type === "circle"){
    shape.classList.add("circle");
  }

  else if(type === "text"){

    shape.classList.add("text-box");

    shape.contentEditable = true;

    shape.innerText = "Edit text";
  }

  canvas.appendChild(shape);

  enableInteract(shape);

  enableSelection(shape);

  /* MODEL */

  shapes.push({

    id:shape.id,

    type:type,

    x:50,
    y:50,

    width:shape.offsetWidth,
    height:shape.offsetHeight,

    background:
    type === "text"
    ? "transparent"
    : "#2563eb",

    text:
    type === "text"
    ? shape.innerText
    : "",

    fontSize:18

  });

}

/* ========================================
   SELECTION
======================================== */

function enableSelection(shape){

  shape.addEventListener("click",(e)=>{

    if(selectedShape){
      selectedShape.classList.remove("selected");
    }

    selectedShape = shape;

    shape.classList.add("selected");

    const model = shapes.find(s => s.id === shape.id);

    if(model){
      colorPicker.value =
      model.background === "transparent"
      ? "#000000"
      : model.background;
    }

    e.stopPropagation();

  });

}

/* ========================================
   INTERACT
======================================== */

function enableInteract(target){

  const isTextBox =
  target.classList.contains("text-box");

  const interactable = interact(target)

  .draggable({

  modifiers: [

  interact.modifiers.restrict({

    restriction: "parent",

    elementRect: {
      top:0,
      left:0,
      bottom:1,
      right:1
    }

  })

],

  listeners:{
      move(event){

        const target = event.target;

        const x =
        (parseFloat(
          target.getAttribute("data-x")
        ) || 0) + event.dx;

        const y =
        (parseFloat(
          target.getAttribute("data-y")
        ) || 0) + event.dy;

        target.style.transform =
        `translate(${x}px, ${y}px)`;

        target.setAttribute("data-x",x);

        target.setAttribute("data-y",y);

        updateShapeData(target);
      }

    }

  });

  /* RESIZE */

  if(!isTextBox){

    interactable.resizable({

  modifiers: [

   interact.modifiers.restrictEdges({
  outer: "parent",
  endOnly:false
}),



    interact.modifiers.restrictSize({
      min: {
        width:50,
        height:50
      },
      max:"parent"
    })

  ],

  edges:{
        left:true,
        right:true,
        bottom:true,
        top:true
      },

      listeners:{

        move(event){

          const target = event.target;

          let x =
          parseFloat(
            target.getAttribute("data-x")
          ) || 0;

          let y =
          parseFloat(
            target.getAttribute("data-y")
          ) || 0;

          target.style.width =
          event.rect.width + "px";

          target.style.height =
          event.rect.height + "px";

          x += event.deltaRect.left;

          y += event.deltaRect.top;

          target.style.transform =
          `translate(${x}px, ${y}px)`;

          target.setAttribute("data-x",x);

          target.setAttribute("data-y",y);

          updateShapeData(target);
        }

      }

    });

  }

}

/* ========================================
   UPDATE MODEL
======================================== */

function updateShapeData(element){

  const shape =
  shapes.find(s => s.id === element.id);

  if(!shape) return;

  const translateX =
  parseFloat(
    element.getAttribute("data-x")
  ) || 0;

  const translateY =
  parseFloat(
    element.getAttribute("data-y")
  ) || 0;

 shape.x =
Math.max(
  0,
  Math.round(50 + translateX)
);

shape.y =
Math.max(
  0,
  Math.round(50 + translateY)
);

shape.width =
Math.round(element.offsetWidth);

shape.height =
Math.round(element.offsetHeight);

}

/* ========================================
   TEXTBOX AUTO SIZE
======================================== */

canvas.addEventListener("input",(e)=>{

  if(
    !e.target.classList.contains("text-box")
  ) return;

  const element = e.target;

  element.style.width = "auto";
  element.style.height = "auto";

  const newWidth = element.scrollWidth;

  const newHeight = element.scrollHeight;

  element.style.width =
  newWidth + "px";

  element.style.height =
  newHeight + "px";

  const shape =
  shapes.find(s => s.id === element.id);

  if(!shape) return;

  shape.text = element.innerText;

  shape.width = newWidth;

  shape.height = newHeight;
});

/* ========================================
   GENERATE CODE
======================================== */

function generateCode(){

  let html = "";

  let css = "";

  shapes.forEach((shape,i)=>{

    const className =
    `shape${i + 1}`;

    /* TEXT */

    if(shape.type === "text"){

      html +=
`<div class="${className}">
  ${shape.text}
</div>

`;

      css +=
`
.${className}{
  position:absolute;
  left:${shape.x}px;
  top:${shape.y}px;
  font-size:${shape.fontSize}px;
}
`;

    }

    /* SHAPE */

    else{

      html +=
`<div class="${className}"></div>

`;

      css +=
`
.${className}{
  position:absolute;
  left:${shape.x}px;
  top:${shape.y}px;
  width:${shape.width}px;
  height:${shape.height}px;
  background:${shape.background};
  ${shape.type === "circle"
? "border-radius:50%;"
: ""}
}
`;

    }

  });

  const finalCode =
`<!-- HTML -->
${html}

<!-- CSS -->
<style>

${css}

</style>`;

  codeBox.value = finalCode;
}

/* ========================================
   COPY
======================================== */

copyBtn.onclick = () => {

  codeBox.select();

  document.execCommand("copy");

  copyBtn.textContent = "Copied!";

  setTimeout(()=>{

    copyBtn.textContent = "Copy Code";

  },1500);

};