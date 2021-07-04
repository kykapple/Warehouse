import { Component } from "../core/Component.js";

export class Item extends Component {
    setup() {
        this.$state = {
            items: [],
            idx: -1,
        };
    }

    template() {
        const { items } = this.$state;
        return `
            <ul>
                ${items.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <button class="addBtn">insert</button>
        `
    }

    setEvent() {
        this.$target.addEventListener('click', ({ target }) => {
            const { items } = this.$state;

            if(target.classList.contains('addBtn')) {
                this.setState({items: [...items, `item${items.length + 1}`]});
            }
        });
    }
}