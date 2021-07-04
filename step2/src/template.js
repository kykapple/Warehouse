import { todoItems } from "./state.js";

export const itemTemplate = ({id, content, highlight, isComplete}) => `
        <li>
            ${todoItems.selectedItem === id ? `
                <form name="modifierForm" action="" id="${id}">
                    <fieldset>
                        <legend hidden>아이템 수정</legend>
                        <label>
                            <span hidden>아이템 수정</span>
                            <input type="text" value="${content}" size="40">
                        </label>
                            <button type="submit">완료</button>
                            <button type="button" class="cancel">취소</button>
                    </fieldset>
                </form>   
        `   :   `
                <p ${highlight ? 'style="color:#09F"' : ''} ${isComplete ? 'class="finish"' : ''}>
                    <input type="checkbox" id="${id}" ${highlight ? ' checked' : ''}>
                    ${content}
                </p>
                <button type="button" class="complete" id="${id}">완료</button>
                <button type="button" class="modify" id="${id}">수정</button>
                <button type="button" class="delete" id="${id}">삭제</button>
            `}
        </li>
    `
export const template = () =>  `
    <h1>📃 TodoList</h1>
        <form name="appenderForm" action="" method="post">
          <fieldset>
            <legend hidden>TodoList Form</legend>
            <label>
              <span hidden>아이템 추가</span>
              <input type="text" size="40" placeholder="Todo Item 내용을 입력해주세요">
            </label>
            <button type="submit">전송</button>
          </fieldset>
        </form>
    <ul>
        ${todoItems.items.map(itemTemplate).join('')}
    </ul>
  `