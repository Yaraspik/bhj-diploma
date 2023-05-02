/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const user = User.current();
    if(!user) {
      return;
    }

    const select = this.element.querySelector('.accounts-select');
    
    Account.list(user, (err, response) => {
      if (response && response.success) {
        select.innerHTML = response.data.reduce((acc, item) => acc + `<option value="${item.id}">${item.name}</option>`, '');
      } else {
        console.log( err );
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    const modal = this.element.closest('.modal').dataset.modalId;

    Transaction.create(data, (err, response) => {
      if(response && response.success) {
        App.getModal(modal).close();
        this.element.reset();
        App.update();
      } else {
        console.log(err);
      }
    });
  }
}