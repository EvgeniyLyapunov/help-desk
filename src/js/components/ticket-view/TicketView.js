import './ticket-view.css';
import moment from 'moment';

/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
class TicketView {
  constructor(ticketData) {
    this.ticketData = ticketData;

    this.getTicketElement = this.getTicketElement.bind(this);
  }

  static get markUp() {
    return `
		<div class="ticket__view">
			<label class="ticket__view-check-label">
				<input class="ticket__view-checkbox visually-hidden" type="checkbox" name="done" id="check-done">
				<span class="ticket__view-custom-check"></span>
			</label>
			<span class="ticket__view-name"></span>
			<span class="ticket__view-date"></span>
			<div class="ticket__view-btn-block">
				<span class="ticket__view-edit"></span>
				<span class="ticket__view-delete"></span>
			</div>
		</div>
		<div class="ticket__descr">
			<div class="ticket__descr-text" style="min-height: 0;"></div>
		</div>
		`;
  }

  getTicketElement(helpDesk) {
    this.element = document.createElement('li');
    this.element.classList.add('ticket');
    this.element.dataset.id = this.ticketData.id;
    this.element.innerHTML = TicketView.markUp;

    // вывод данных

    const checkbox = this.element.querySelector('.ticket__view-checkbox');
    checkbox.checked = this.ticketData.status;

    const ticketName = this.element.querySelector('.ticket__view-name');
    ticketName.textContent = this.ticketData.name;

    const ticketDate = this.element.querySelector('.ticket__view-date');
    ticketDate.textContent = moment.unix(this.ticketData.created).format('DD.MM.YY hh:mm');

    const ticketText = this.element.querySelector('.ticket__descr-text');
    const description = this.ticketData.description.split('\n').join('<br>');
    ticketText.innerHTML = description;

    // обработчики событий тикета

    const markOfDone = this.element.querySelector('.ticket__view-check-label');
    markOfDone.addEventListener('click', helpDesk.onTicketDone);

    const ticket = this.element.querySelector('.ticket__view');
    ticket.addEventListener('click', helpDesk.onShowDescription);
    ticket.addEventListener('mouseover', helpDesk.onCheckDescription);

    const editBtn = this.element.querySelector('.ticket__view-edit');
    editBtn.addEventListener('click', helpDesk.onEdit);

    const deleteBtn = this.element.querySelector('.ticket__view-delete');
    deleteBtn.addEventListener('click', helpDesk.onDelete);

    return this.element;
  }
}

export default TicketView;
