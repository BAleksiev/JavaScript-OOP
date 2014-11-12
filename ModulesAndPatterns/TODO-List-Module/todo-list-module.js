'use strict';

var ToDoList = (function () {
    var Container = (function () {
        function Container(title) {
            this._title = title;
        }

        Container.prototype.addToDOM = function (parent) {
            var mainContainer, container, title, sectionOpt, newSectionButton, newSectionTitle;

            mainContainer = document.createElement('div');
            mainContainer.id = 'main-container';
            title = document.createElement('h1');
            title.innerHTML = this._title;
            container = document.createElement('div');
            container.id = 'items-container';
            mainContainer.appendChild(title);
            mainContainer.appendChild(container);

            newSectionTitle = document.createElement('input');
            newSectionTitle.type = 'text';
            newSectionTitle.placeholder = 'Title...';
            newSectionButton = document.createElement('input');
            newSectionButton.type = 'button';
            newSectionButton.value = 'New Section';
            newSectionButton.addEventListener("click", function () {
                var section = new ToDoList.Section(newSectionTitle.value);
                section.addToDOM(document.getElementById('items-container'));
                newSectionTitle.value = '';
            });

            sectionOpt = document.createElement('div');
            sectionOpt.id = 'section-opt';
            sectionOpt.appendChild(newSectionTitle);
            sectionOpt.appendChild(newSectionButton);
            mainContainer.appendChild(sectionOpt);

            if (!(document.getElementById('main-container'))) {
                parent.appendChild(mainContainer);
            }
        };

        return Container;
    })();

    var Section = (function () {
        var sectionsCreated = 0;

        function Section(title) {
            if (title === '') {
                throw Error('The section title cannot be empty');
            }
            this._title = title;
            sectionsCreated++;
        }

        Section.prototype.addToDOM = function (parent) {
            var section, title, newItemContent, newItemButton, itemOpt, clear;

            section = document.createElement('div');
            section.id = Number(sectionsCreated);
            section.className = 'list-container';

            title = document.createElement('h2');
            title.innerHTML = this._title;
            section.appendChild(title);

            newItemContent = document.createElement('input');
            newItemContent.type = 'text';
            newItemContent.placeholder = 'Add item...';
            newItemButton = document.createElement('input');
            newItemButton.type = 'button';
            newItemButton.value = '+';
            newItemButton.addEventListener("click", function () {
                var item = new ToDoList.Item(newItemContent.value);
                item.addToDOM(document.getElementById(section.id));
                newItemContent.value = '';
            });

            itemOpt = document.createElement('div');
            itemOpt.id = 'item-opt';
            itemOpt.appendChild(newItemContent);
            itemOpt.appendChild(newItemButton);

            clear = document.createElement('div');
            clear.className = 'clear';

            if (!(document.getElementById(section.id))) {
                parent.appendChild(section);
                parent.appendChild(itemOpt);
                parent.appendChild(clear);
            }
        };

        return Section;
    })();

    var Item = (function () {

        function Item(content) {
            if (content === '') {
                throw Error('The item content cannot be empty');
            }
            this._content = content;
        }

        Item.prototype.addToDOM = function (parent) {
            var item, lastItem, checkbox, content;

            item = document.createElement('div');
            item.className = 'item';
            lastItem = parent.lastChild;

            if (lastItem !== undefined) {
                if (lastItem.id !== '') {
                    this._id = parent.id[parent.id.length - 1] +
                            (Number(lastItem.id[lastItem.id.length - 1]) + 1);
                    item.id = this._id;
                } else {
                    this._id = parent.id[parent.id.length - 1] + 1;
                    item.id = parent.id[parent.id.length - 1] + 1;
                }

                checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = this._id;
                checkbox.addEventListener("click", function () {
                    if(this.checked) {
                        this.nextSibling.style.backgroundColor = 'lightgreen';
                    } else {
                        this.nextSibling.style.backgroundColor = 'white';
                    }
                });

                content = document.createElement('span');
                content.innerHTML = this._content;
                item.appendChild(checkbox);
                item.appendChild(content);

                if (!(document.getElementById(item.id))) {
                    parent.appendChild(item);
                }
            }
        };

        return Item;
    })();

    return {
        Container: Container,
        Section: Section,
        Item: Item
    };
})
        ();

var list = new ToDoList.Container('TODO List');
list.addToDOM(document.body);