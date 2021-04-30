import gallery from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".js-lightbox");
const bigImageRef = document.querySelector(".lightbox__image");
const backdropBtnClothRef = document.querySelector(".lightbox__button");

function makeGalleryMarkUp(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
       data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
  `;
    })
    .join("");
}

const markUp = makeGalleryMarkUp(gallery);
galleryRef.insertAdjacentHTML("afterbegin", markUp);

galleryRef.addEventListener("click", onGalleryElementClick);

function onGalleryElementClick(event) {
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  event.preventDefault();
  OpenModal();

  bigImageRef.src = event.target.dataset.source;
  bigImageRef.alt = event.target.alt;

  window.addEventListener("keydown", onEscPress);
  backdropBtnClothRef.addEventListener("click", onBackdropCloseClick);
  lightboxRef.addEventListener("click", onBackdropCloseClick);
}

function OpenModal() {
  lightboxRef.classList.add("is-open");
}

function onBackdropCloseClick(event) {
  if (event.target.classList.contains("lightbox__image")) {
    return;
  }
  closeModal();
}

function closeModal() {
  lightboxRef.classList.remove("is-open");
  bigImageRef.src = "";
  bigImageRef.alt = "";
  window.removeEventListener("keydown", onEscPress);
}

function onEscPress(event) {
  const ESC_KEY_CODE = "Escape";
  if (event.code === ESC_KEY_CODE) {
    closeModal();
  }
}

// markUp #2

// const makeElementOfGallery = ({ preview, original, description } = {}) => {
//   return `
//   <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="${original}"

//   >
//     <img
//       class="gallery__image"
//       src="${preview}"
//        data-source="${original}"
//       alt="${description}"
//     />
//   </a>
// </li>
//   `;
// };

// console.log(makeElementOfGallery());

// const galleryMarkUp = gallery.map(makeElementOfGallery).join("");
