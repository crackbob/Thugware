import "./style.css";

export default class {
    constructor(title, toggle = true) {
        this.panel = document.createElement('div');
        this.panel.className = "Thugware-panel";
        document.body.appendChild(this.panel);
        
        this.header = document.createElement('h2');
        this.header.className = "Thugware-header";
        this.header.textContent = title;
        this.panel.appendChild(this.header);

        this.buttonContainer = document.createElement('div');
        this.buttonContainer.className = "Thugware-button-container";
        this.panel.appendChild(this.buttonContainer);

        this.isDragging = false;
        this.offset = { x: 0, y: 0 };

        this.initDrag();

        if (toggle) {
            this.initToggleButton();
        }
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
        this.header.style.cursor = 'grab';

        this.header.addEventListener('pointerdown', (event) => {
            this.isDragging = true;
            this.offset.x = event.clientX - this.panel.getBoundingClientRect().left;
            this.offset.y = event.clientY - this.panel.getBoundingClientRect().top;
            this.header.setPointerCapture(event.pointerId);
            this.header.style.cursor = 'grabbing';
        });

        this.header.addEventListener('pointermove', (event) => {
            if (this.isDragging) {
                this.panel.style.left = `${event.clientX - this.offset.x}px`;
                this.panel.style.top = `${event.clientY - this.offset.y}px`;
            }
        });

        this.header.addEventListener('pointerup', (event) => {
            this.isDragging = false;
            this.header.releasePointerCapture(event.pointerId);
            this.header.style.cursor = 'grab';
        });
    }

    addButton(title, callback) {
        let button = document.createElement('button');
        button.className = "Thugware-button";
        button.innerText = title;
        button.enabled = false;
        button.addEventListener("click", function () {
            button.enabled = !button.enabled;
            if (button.enabled) {
                button.style.backgroundColor = "rgba(0, 194, 48, 0.85)";
            } else {
                button.style.backgroundColor = "rgb(26 26 26 / 75%)";
            }

            callback();
        });

        this.buttonContainer.appendChild(button);
    }
}