import './confirm.css';

class Confirm {
  constructor(helpDesk) {
    this.helpDesk = helpDesk;
    this.parentEl = helpDesk.element;
    this.element = null;

    this.init = this.init.bind(this);
    this.formClose = this.formClose.bind(this);
  }

  static get MarkUp() {
    return `
      <div class="confirm">
        <h2 class="confirm__title">Удалить тикет</h2>
        <p class="confirm__descr">Вы уверены что хотите удалить тикет?<br><span class="confirm__descr_warning">Это
            действие необратимо.</span></p>
        <div class="confirm__btn-block">
          <button class="confirm__btn-cancel btn">Отмена</button>
          <button class="confirm__btn-ok btn">Ок</button>
        </div>
      </div>
		`;
  }

  init() {
    this.element = document.createElement('div');
    this.element.classList.add('modal');
    this.element.innerHTML = Confirm.MarkUp;

    this.parentEl.insertAdjacentElement('beforeend', this.element);

    const cancelBtn = this.element.querySelector('.confirm__btn-cancel');
    cancelBtn.addEventListener('click', this.formClose);

    const deleteBtn = this.element.querySelector('.confirm__btn-ok');
    deleteBtn.addEventListener('click', this.helpDesk.onDeleteConfirmation);
  }

  formClose() {
    this.helpDesk.idTicketForDelete = null;
    this.element.remove();
  }
}

export default Confirm;
