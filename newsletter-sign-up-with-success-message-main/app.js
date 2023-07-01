const submit = document.querySelector(".submit")
const form = document.querySelector(".form-form")
const input = document.querySelector("#email-imput")
const notGoodEmail = document.querySelector("#not-good-email")


form.addEventListener("submit", (e) => {
  e.preventDefault()

  if (isValidEmail(input.value)) {
    window.location.href = "http://127.0.0.1:5500/success.html?"
  } else {
    notGoodEmail.style.visibility = "visible"
    input.style.backgroundColor = "hsl(5, 58%, 82%)"
    input.style.color = "hsl(4, 100%, 67%)"
    input.classList.add('error-placeholder');
  }
})


function isValidEmail(email) {
  // Regular expression pattern for email validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regex pattern
  return emailRegex.test(email);
}
