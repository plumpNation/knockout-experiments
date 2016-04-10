(function () {
    'use strict';

    let TodoListModel = function () {
        this.items = ko.observableArray([
            {text: 'default todo'}
        ]);
    };

    TodoListModel.prototype.addItem = function (item) {
        this.items.push(item);
    };

    document.addEventListener('DOMContentLoaded', () => {
        let todoListModel = new TodoListModel();

        ko.applyBindings(todoListModel, document.getElementById('todo-application'));
    });
}());
