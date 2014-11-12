define(['section'], function (Section) {
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
                var section = new Section(newSectionTitle.value);
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
});