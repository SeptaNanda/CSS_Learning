const documentationData = {

  title : "Background Color",

  description :
  "Learn how CSS padding controls spacing outside an element. Experiment directly with live coding and realtime preview.",

  groups : [

    {

      title : "",

      properties : [

        {
          name : "body",
          image : "images/body.png"
        },

        {
          name : "div",
          image : "images/div.png"
        },

        {
          name : "h1",
          image : "images/h1.png"
        }

      ]

    }

  ],

  htmlCode :
`<h1>body background color is #333</h1> 
 <div class="container">
     <h1>h1 background color is rgb(64, 224, 208)</h1>
     <h2>h2 background color is hsl(84, 100%, 59%)</h2>
     <h4>div background color is white</h4>
 </div>`,

  cssCode :
`body {
     background-color: #333;
     padding: 0;
     margin: 2vw; 
 }
 .container {
     
     width: 50%;
     height: 20vw;
     background-color: white;
     display: block;
 }
 .container h1 {
     color: #333;
     background-color: turquoise;
 }
 h1 {
 color :white;
 }
 h2 {
     background-color: greenyellow;
 }
 h4 {
     width: fit-content;
     margin: 4vw auto;
     font-size: 2vw;
 }`,

  challenges : {

    easy : "images/challenge-easy.png",
    hard : "images/challenge-hard.png"

  }

};