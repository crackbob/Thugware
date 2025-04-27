import "./style.css";

export default class {
    constructor(title) {
        this.panel = document.createElement('div');
        this.panel.className = "boom-panel";
        document.body.appendChild(this.panel);
        
        this.header = document.createElement('h2');
        this.header.className = "boom-header";
        this.header.textContent = title;
        this.panel.appendChild(this.header);

        this.isDragging = false;
        this.offset = { x: 0, y: 0 };

        this.initDrag();
        this.initToggleButton();
    }

    toggle () {
        if (this.panel.style.display === 'none') {
            this.panel.style.display = 'block';
        } else {
            this.panel.style.display = 'none';
        }
    }

    initToggleButton () {
        let toggleButton = document.createElement("div");
        toggleButton.textContent = "💣";
        toggleButton.style.position = "fixed";
        toggleButton.style.top = "50px";
        toggleButton.style.left = "0px";
        toggleButton.style.padding = "10px 10px";
        toggleButton.style.backgroundColor = "rgba(25, 25, 25, 0.75)";
        toggleButton.style.border = "1px solid rgb(0 255 10)";
        toggleButton.style.color = "#fff";
        toggleButton.style.borderRadius = "0 5px 5px 0";
        toggleButton.style.cursor = "pointer";
        toggleButton.style.zIndex = "9999999";
        toggleButton.style.userSelect = "none";

        toggleButton.addEventListener("click", this.toggle.bind(this));

        let isDragging = false;
        let offsetY = 0;

        toggleButton.addEventListener("mousedown", function (event) {
            isDragging = true;
            offsetY = event.clientY - toggleButton.getBoundingClientRect().top;
            event.preventDefault();
        });

        document.addEventListener("mousemove", function (event) {
            if (isDragging) {
                toggleButton.style.top = `${event.clientY - offsetY}px`;
            }
        });

        document.addEventListener("mouseup", function () {
            isDragging = false;
        });

        document.body.appendChild(toggleButton);

    }

    initDrag() {
        this.header.addEventListener('mousedown', (event) => {
            this.isDragging = true;
            this.offset.x = event.clientX - this.panel.getBoundingClientRect().left;
            this.offset.y = event.clientY - this.panel.getBoundingClientRect().top;
            this.header.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (event) => {
            if (this.isDragging) {
                this.panel.style.left = `${event.clientX - this.offset.x}px`;
                this.panel.style.top = `${event.clientY - this.offset.y}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.header.style.cursor = 'grab';
        });
    }

    addButton(title, callback) {
        let button = document.createElement('button');
        button.className = "boom-button";
        button.innerText = title;
        button.enabled = false;
        button.addEventListener("click", function () {
            button.enabled = !button.enabled;
            if (button.enabled) {
                button.style.backgroundColor = "rgba(83, 83, 83, 0.75)";
                button.style.border = "rgb(193, 193, 193, 0.75) solid 1px";
            } else {
                button.style.backgroundColor = "rgba(55, 55, 55, 0.75)";
                button.style.border = "none";
            }

            callback();
        });
        this.panel.appendChild(button);
    }

    addSlider(title, min, max, value, callback) {

        let container = document.createElement('div');
        container.style.padding = "5px";

        let label = document.createElement('span');
        label.innerText = title;
        container.append(label);

        let slider = document.createElement('input');
        slider.className = "boom-slider";
        slider.min = min;
        slider.max = max;
        slider.value = value;
        slider.type = "range";
        slider.enabled = false;
        slider.addEventListener("change", function (event) {
            callback(event.target.value);
        });

        container.appendChild(slider);
        this.panel.appendChild(container);
    }
}