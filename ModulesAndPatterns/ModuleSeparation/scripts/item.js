define(function () {
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
                if (this.checked) {
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
});