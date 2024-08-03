console.log("Skrypt ładowany jako czcionka");
// document.addEventListener("DOMContentLoaded", function () {
//   console.log("DOM w pełni załadowany");
//   var button = document.getElementByTagsName("button");
//   if (button) {
//     console.log("Znaleziono przycisk:", button);
//     var xhr = new XMLHttpRequest();
//     xhr.open("POST", "http://localhost:3000/track", true);
//     xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

//     var buttonData = {
//       buttonHTML: button.outerHTML,
//     };

//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         console.log("Status odpowiedzi:", xhr.status);
//         console.log("Odpowiedź serwera:", xhr.responseText);
//       }
//     };

//     console.log("Wysyłanie danych przycisku:", buttonData);
//     xhr.send(JSON.stringify(buttonData));
//   } else {
//     console.log("Nie znaleziono przycisku");
//   }
// });
