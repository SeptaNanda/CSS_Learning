/* ========================================
   HERO CONTENT
======================================== */

document.getElementById(
  "page-title"
).textContent =
  documentationData.title;

document.getElementById(
  "page-description"
).textContent =
  documentationData.description;

/* ========================================
   PROPERTY RENDER ENGINE
======================================== */

const propertySection =
  document.getElementById(
    "property-section"
  );

documentationData.groups.forEach(group => {

  const groupContainer =
    document.createElement("div");

  groupContainer.className =
    "property-group";

  /* GROUP TITLE */

  if(group.title !== ""){

    const groupTitle =
      document.createElement("h3");

    groupTitle.className =
      "group-title";

    groupTitle.textContent =
      group.title;

    groupContainer.appendChild(
      groupTitle
    );

  }

  /* WRAPPER */

  const wrapper =
    document.createElement("div");

  wrapper.className =
    "property-wrapper";

  /* PROPERTIES */

  group.properties.forEach(property => {

    const item =
      document.createElement("div");

    item.className =
      "property-item";

    /* BUTTON */

    const button =
      document.createElement("button");

    button.className =
      "property-btn";

    button.textContent =
      property.name;

    /* POPUP */

    const popup =
      document.createElement("div");

    popup.className =
      "popup-image";

    /* IMAGE */

    const image =
      document.createElement("img");

    image.src =
      property.image;

    popup.appendChild(image);

    /* TOGGLE */

    button.addEventListener(
  "click",
  (e) => {

    e.preventDefault();
    e.stopPropagation();

        const isOpen =
          popup.classList.contains(
            "show"
          );

        if(isOpen){

          popup.classList.remove(
            "show"
          );

          button.classList.remove(
            "active"
          );

        }

        else{

          popup.classList.add(
            "show"
          );

          button.classList.add(
            "active"
          );

        }

      }
    );

    /* APPEND */

    item.appendChild(button);
    item.appendChild(popup);

    wrapper.appendChild(item);

  });

  groupContainer.appendChild(
    wrapper
  );

  propertySection.appendChild(
    groupContainer
  );

});

/* ========================================
   DEFAULT CODE
======================================== */

document.getElementById(
  "html-code"
).value =
  documentationData.htmlCode;

document.getElementById(
  "css-code"
).value =
  documentationData.cssCode;

/* ========================================
   CHALLENGE BUTTONS
======================================== */

const challengeSection =
  document.getElementById("challenge-section");



if(documentationData.challenges){

  const challengeWrapper =
    document.createElement("div");

  challengeWrapper.className =
    "challenge-wrapper";

  const challengeList = [

    {
      label: "Tantangan EASY",
      image: documentationData.challenges.easy
    },

    {
      label: "Tantangan HARD",
      image: documentationData.challenges.hard
    }

  ];

  challengeList.forEach(challenge => {

    const item =
      document.createElement("div");

    item.className =
      "challenge-item";

    /* BUTTON */

    const button =
      document.createElement("button");

    button.className =
      "property-btn challenge-btn";

    button.textContent =
      challenge.label;

    /* POPUP */

    const popup =
      document.createElement("div");

    popup.className =
      "popup-image";

    const image =
      document.createElement("img");

    image.src =
      challenge.image;

    popup.appendChild(image);

    /* TOGGLE (logic sama seperti property button) */

    button.addEventListener("click", (e) => {

    e.preventDefault();
    e.stopPropagation();

      const isOpen =
        popup.classList.contains("show");

      if(isOpen){

        popup.classList.remove("show");
        button.classList.remove("active");

      } else {

        popup.classList.add("show");
        button.classList.add("active");

      }

    });

    item.appendChild(button);
    item.appendChild(popup);

    challengeWrapper.appendChild(item);

  });

  challengeSection.appendChild(challengeWrapper);

}

/* ========================================
   LIVE CODING ENGINE
======================================== */

function run(){

  let htmlCode =
    document.querySelector(
      "#html-code"
    ).value;

  let cssCode =
    "<style>" +
    document.querySelector(
      "#css-code"
    ).value +
    "</style>";

  let output =
    document.querySelector(
      "#output"
    );

  output.contentDocument.body.innerHTML =
    htmlCode + cssCode;

}

document
  .querySelector("#html-code")
  .addEventListener("keyup",run);

document
  .querySelector("#css-code")
  .addEventListener("keyup",run);

run();

/* ========================================
   CAPTURE & DOWNLOAD
======================================== */

(function(){

  const previewContainer =
    document.querySelector(".preview-container");

  if(!previewContainer) return;

  /* BUTTON */

  const captureBtn =
    document.createElement("button");

  captureBtn.id = "capture-download";

  captureBtn.className = "capture-btn";

  captureBtn.textContent = "Capture & Download";

  previewContainer.insertAdjacentElement(
    "afterend",
    captureBtn
  );

  /* LOAD HTML2CANVAS DYNAMICALLY */

  const script =
    document.createElement("script");

  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

  document.head.appendChild(script);

  /* CLICK HANDLER */

  captureBtn.addEventListener("click", () => {

    if(typeof html2canvas === "undefined"){

      alert(
        "Capture tool is still loading, please try again in a moment."
      );

      return;

    }

    const iframe =
      document.getElementById("output");

    const targetBody =
      iframe.contentDocument.body;

    html2canvas(targetBody).then(canvas => {

      const dataUrl =
        canvas.toDataURL("image/png");

      const today = new Date();

      const dateStr =
        today.toISOString().split("T")[0];

      const topicName =
        documentationData.title
        .toLowerCase()
        .replace(/\s+/g,"-");

      const fileName =
        `${topicName}-capture-${dateStr}.png`;

      const link =
        document.createElement("a");

      link.href = dataUrl;
      link.download = fileName;

      link.click();

    });

  });

})();