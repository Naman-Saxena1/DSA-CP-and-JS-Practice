const modalContainer = document.getElementById("modal__container");
const openBtn = document.getElementById("btn-open-modal");
const closeBtn = document.getElementById("btn-close-modal");
const modal = document.getElementById("modal");

modal.addEventListener("click", (evt) => evt.stopPropagation());

openBtn.addEventListener("click", (evt) => {
	modalContainer.classList.remove("close");
});

closeBtn.addEventListener("click", (evt) => {
	modalContainer.classList.add("close");
});

modalContainer.addEventListener("click", (evt) => {
	modalContainer.classList.add("close");
});
