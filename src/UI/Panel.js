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
            } else {
                button.style.backgroundColor = "rgba(55, 55, 55, 0.75)";
            }

            callback();
        });
        this.panel.appendChild(button);
    }
}