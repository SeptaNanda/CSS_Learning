const documentationData = {

  title : "Flex",

  description :
  "Learn how CSS padding controls spacing outside an element. Experiment directly with live coding and realtime preview.",

  groups : [

    {

      title : "Justify Content",

      properties : [

        {
          name : "start",
          image : "images/justify-start.png"
        },

        {
          name : "center",
          image : "images/justify-center.png"
        },

        {
          name : "end",
          image : "images/justify-end.png"
        },

        {
          name : "space-evenly",
          image : "images/space-evenly.png"
        },

        {
          name : "space-around",
          image : "images/space-around.png"
        },

        {
          name : "space-between",
          image : "images/space-between.png"
        }

      ]

    },

    {

      title : "Align Items",

      properties : [

        {
          name : "start",
          image : "images/align-start.png"
        },

        {
          name : "center",
          image : "images/align-center.png"
        },

        {
          name : "end",
          image : "images/align-end.png"
        }

      ]

    },

    {

      title : "Flex Direction",

      properties : [

        {
          name : "column",
          image : "images/column.png"
        },

        {
          name : "column-reverse",
          image : "images/column-reverse.png"
        },

        {
          name : "row",
          image : "images/row.png"
        },

        {
          name : "row-reverse",
          image : "images/row-reverse.png"
        }

      ]

    }

  ],

  

  htmlCode :
`<div class="container">
    <span>1</span>
    <span>2</span>
    <span>3</span>
    <span>4</span>
    <span>5</span>
</div>`,

  cssCode :
`body {
    padding : 0;
    margin : 0;
}
.container {
    width: 100%;
    height: 20vw;
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row-reverse;
}
span {
    width:  3vw;
    height: 3vw;
    background-color: orange;
    margin-right: 2vw;
    
}`,

  challenges : {

    easy : "images/challenge-easy.png",
    hard : "images/challenge-hard.png"

  }

};