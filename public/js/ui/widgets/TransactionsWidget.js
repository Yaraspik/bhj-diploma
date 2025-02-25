/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(!element) {
      throw new Error('Передан пустой элемент');
    }

    this.element = element;

    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const btnIncome = this.element.querySelector('.create-income-button');
    const btnExpense = this.element.querySelector('.create-expense-button');

    this.element.addEventListener('click', (e) => {
      if(e.target == btnIncome) {
        App.getModal('newIncome').open();
      } else if(e.target == btnExpense) {
        App.getModal('newExpense').open();
      }
    });
  }
}
