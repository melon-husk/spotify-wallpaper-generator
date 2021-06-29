function showError(error: Error = new Error("error")) {
  const elements = document.querySelectorAll("div#main-container,canvas");
  const body = document.querySelector("body");
  const errorPage = `<div class="pt-40 flex flex-col px-2">
  <h1 class="text-red-500 font-bold text-3xl text-center">Something bad happened.....</h1>
  <p class="text-red-400 font-medium text-2xl text-center">${error.message}</p>
  <button id="try-again" class="bg-red-500 text-white font-medium text-2xl self-start mx-auto mt-20 rounded-md px-8 py-2 hover:bg-red-600 active:bg-red-700 transform-gpu hover:scale-[1.05] transition-all">Try again</button>
</div>`;
  // remove all the elements
  elements.forEach((element) => element.remove());
  body!.innerHTML = errorPage + body!.innerHTML;
  const tryAgainBtn = document.getElementById("try-again");
  tryAgainBtn?.addEventListener("click", () => {
    location.href = "login.html";
  });
}
export default showError;
