// Adding the link dynamically
var link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("type", "text/css");
link.setAttribute("href", "../../assets/css/styles.css");
document.getElementsByTagName("head")[0].appendChild(link);
