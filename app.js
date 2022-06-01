//to shorten the link
let inputtedLink = document.querySelector(".input-link");
document.querySelector(".shorten-btn").addEventListener("click", shortenLink);
function shortenLink() {
  fetch(`https://api.shrtco.de/v2/shorten?url=${inputtedLink.value}`)
    .then((res) => {
      if (!res.ok) throw new Error(`${res.status} Invalid link`);
      return res.json();
    })
    .then((data) => {
      showResult(data.result.full_short_link);

      console.log(data);
    })
    .catch((err) => {
      showErrorMessage(err);
    });
  // document.querySelector(".results-sec").classList.remove("hidden");
}

//show the results
function showResult(link) {
  const htmlContent = `
  <section class="results-sec">
  <section class="results">
    <div>
      <p class="original-link">${inputtedLink.value}</p>
      <p class="short-link">${link}</p>
    </div>
    <button class="copy-btn" type="copy">Copy</button>
  </section>
</section>`;
  document
    .querySelector(".form-sec")
    .insertAdjacentHTML("afterend", htmlContent);
  // inputtedLink.value = "";
}

//show error massage if user don't input a link
function showErrorMessage(err) {
  const errMessage = document.querySelector(".error-message");
  errMessage.classList.remove("hidden");
  errMessage.textContent = `${err} `;
}
//to append the results cards

//to copy the shortened link
document.querySelector(".copy-btn").addEventListener("click", copyLink);
function copyLink() {
  navigator.clipboard.writeText(
    document.querySelector(".short-link").innerText
  );
  document.querySelector(".copy-btn").style.backgroundColor =
    "hsl(257, 27%, 26%)";
  document.querySelector(".copy-btn").innerText = "Copied!";
}

//nav active
document.querySelector(".nav-toggle").addEventListener("click", () => {
  document.querySelector(".nav-items").classList.toggle("nav-visible");
});
