import gallery from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".js-lightbox");
const bigImageRef = document.querySelector(".lightbox__image");
const backdropBtnClothRef = document.querySelector(".lightbox__button");
let index;

function makeGalleryMarkUp(gallery) {
  return gallery
    .map(({ preview, original, description }, index) => {
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
      data-index="${index}"
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

  index = Number(event.target.dataset.index);
  // console.log(index); // NUN
  // console.log(event.target.dataset.index); // underfined
  bigImageRef.dataset.index = index;

  window.addEventListener("keydown", onArrowRightPress);
  window.addEventListener("keydown", onArrowLeftPress);

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
  bigImageRef.dataset.index = "";
  window.removeEventListener("keydown", onEscPress);
}

function onEscPress(event) {
  const ESC_KEY_CODE = "Escape";
  if (event.code === ESC_KEY_CODE) {
    closeModal();
  }
}

function onRightNext() {
  if (index < gallery.length - 1) {
    index += 1;
  } else {
    index = 0;
  }
  bigImageRef.src = gallery[index].original;
  bigImageRef.alt = gallery[index].description;
  bigImageRef.dataset.index = index;
}

function onLeftNext() {
  if (index > 0) {
    index -= 1;
  } else {
    index = gallery.length - 1;
  }
  bigImageRef.src = gallery[index].original;
  bigImageRef.alt = gallery[index].description;
  bigImageRef.dataset.index = index;
}

function onArrowRightPress(event) {
  const ARROW_RIGHT_KEY_CODE = "ArrowRight";
  if (event.code === ARROW_RIGHT_KEY_CODE) {
    onRightNext();
  }
}

function onArrowLeftPress(event) {
  const ARROW_LEFT_KEY_CODE = "ArrowLeft";
  if (event.code === ARROW_LEFT_KEY_CODE) {
    onLeftNext();
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
