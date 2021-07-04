import { template } from "./template.js";
import { todoItems } from "./state.js";

export const render = () => {
    const $app = document.querySelector('#app');
    $app.innerHTML = template();
    setBtnHandler();
};
export const addItem = function(event) {
    event.preventDefault();
    const $inputInfo = this.querySelector('input');
    const value = $inputInfo.value.trim();

    if(value.length === 0) {
        $inputInfo.value = "";
        $inputInfo.focus();
        return alert('아이템 이름을 입력해주세요!');
    }

    todoItems.items.push({
        id: todoItems.items.length + 1,
        content: $inputInfo.value,
        highlight: false,
        isComplete: false,
        createdAt: Date.now()
    });

    render();
};
export const deleteItem = event => {
    const delBtn = event.target;

    todoItems.items = todoItems.items.filter(function(obj) {
        return obj.id !== Number(delBtn.id);
    });

    render();
};
export const modifyItem = event => {
    const modBtn = event.target;

    todoItems.selectedItem = modBtn.id;
    render();

    const $modifierForm = document.querySelector('form[name="modifierForm"]');
    $modifierForm.addEventListener('submit', updateItem.bind($modifierForm));

    const $cancelBtn = $modifierForm.querySelector('.cancel');
    $cancelBtn.addEventListener('click', cancelModifyItem);

    $modifierForm.onkeydown = function(event) {
        if(event.keyCode == 27) {
            cancelModifyItem();
        }
    }
};
export const updateItem = event => {
    event.preventDefault();

    const $inputInfo = this.querySelector('input');
    const value = $inputInfo.value.trim();

    if(value.length === 0) {
        $inputInfo.value = "";
        return alert('아이템 이름을 입력해주세요!');
    }

    const $obj_id = Number(this.id);
    const idx = todoItems.items.map(obj => obj.id).indexOf($obj_id);
    todoItems.items[idx].content = value;
    todoItems.selectedItem = -1;

    render();
}
export const cancelModifyItem = event => {
    todoItems.selectedItem = -1;

    render();
}
export const completeItem = event => {
    const btn = event.target;
    const idx = todoItems.items.map(obj => obj.id).indexOf(Number(btn.id));
    todoItems.items[idx].isComplete = !todoItems.items[idx].isComplete;

    render();
}
export const toggleItem = event => {
    const box = event.target;
    const idx = todoItems.items.map(obj => obj.id).indexOf(Number(box.id));
    todoItems.items[idx].highlight = !todoItems.items[idx].highlight;

    render();
}
export const setBtnHandler = () =>{
    const $appenderForm = document.querySelector('form[name="appenderForm"]');
    const $delete = document.querySelectorAll('.delete');
    const $modify = document.querySelectorAll('.modify');
    const $complete = document.querySelectorAll('.complete');
    const $toggle = document.querySelectorAll('input[type="checkbox"]');

    $appenderForm.addEventListener('submit', addItem.bind($appenderForm));

    $delete.forEach(function(btn) {
        btn.addEventListener('click', deleteItem);
    });

    $modify.forEach(function(btn) {
        btn.addEventListener('click', modifyItem);
    });

    $complete.forEach(function(btn) {
        btn.addEventListener('click', completeItem);
    })

    $toggle.forEach(function(box) {
        box.addEventListener('change', toggleItem);
    })
};