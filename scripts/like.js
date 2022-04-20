const likeButton = document.querySelector('.card__btn-like');


function likeActive(){
  likeButton.classList.add('card__btn-like_active');
  likeButton.classList.remove('card__btn-like');
}

likeButton.addEventListener('click', likeActive);
