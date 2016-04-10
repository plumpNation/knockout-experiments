(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        let todoListModel = {
            items: ko.observableArray([
                {text: 'default todo'}
            ])
        };

        ko.applyBindings(todoListModel, document.getElementById('todo-application'));
    });
}());
