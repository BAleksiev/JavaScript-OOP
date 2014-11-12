define(['item'], function (Item) {
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
            var item = new Item(newItemContent.value);
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
});