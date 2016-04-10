(function () {
    'use strict';

    ko.components.register('itsl-todo-input', {
        viewModel: function (params) {
            this.onSubmit = function (formElement) {
                params.model.addItem({text:formElement['new-todo'].value});
            };
        },

        template: `
            <form class="itsl-todo-input" data-bind="submit: onSubmit">
                <itsl-text-input params="
                    id: 'new-todo',
                    text: 'Woot woot',
                    label: 'Enter todo item'
                "></itsl-text-input>
                <button>Submit</button>
            </form>
        `
    });

    ko.components.register('itsl-todo-list', {
        viewModel: function (params) {
            this.todoItems = params.model.items;
        },

        template: `
            <ul class="itsl-todo-list" data-bind="foreach: todoItems">
                <li class="itsl-todo-item">
                    <span data-bind="text: $data.text"></span>
                </li>
            </ul>
        `
    });

    ko.components.register('itsl-text-input', {
        viewModel: function (params) {
            this.value = ko.observable(params.text);
            this.uuid = params.id || guid();

            if (!params.label) {
                throw new Error('You must supply a label');
            }

            this.label = params.label;
        },

        template: `
        <label data-bind="text: label, for: uuid"></label>
        <input data-bind="textInput: value, attr: { id: uuid }">`
    });

    function guid() {
        let s4 = function () {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            },

            part1 = s4() + s4(),
            part2 = s4(),
            part3 = s4(),
            part4 = s4(),
            part5 = s4() + s4() + s4();

        return `${part1}-${part2}-${part3}-${part4}-${part5}`;
    }
}());
