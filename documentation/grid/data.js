const documentationData = {

  title : "Grid",

  description :
  "Learn how CSS padding controls spacing outside an element. Experiment directly with live coding and realtime preview.",

  groups : [

    {

      title : "",

      properties : [

        {
          name : "column",
          image : "images/gtc.png"
        },

        {
          name : "row",
          image : "images/gtr.png"
        },

        {
          name : "column & row",
          image : "images/gtc-gtr.png"
        },

        {
          name : "areas",
          image : "images/gta.png"
        }

      ]

    }

  ],

  htmlCode :
`<h1><div class="grid-container">
    <div class="item1">Header</div>
    <div class="item2">Menu</div>
    <div class="item3">Main</div>  
    <div class="item4">Right</div>
    <div class="item5">Footer</div>
  </div></h1>`,

  cssCode :
`.item1 { grid-area: header; }
.item2 { grid-area: menu; }
.item3 { grid-area: main; }
.item4 { grid-area: right; }
.item5 { grid-area: footer; }

.grid-container {
  display: grid;
  grid-template-areas:
    'header header header header header header'
    'menu main main main right right'
    'menu footer footer footer footer footer';
  gap: 10px;
  background-color: #333;
  padding: 10px;
}

.grid-container > div {
  background-color: white;
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
}`,

  challenges : {

    easy : "images/challenge-easy.png",
    hard : "images/challenge-hard.png"

  }

};