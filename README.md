## 질문거리
1. 프론트에서 로그인 정보를 어떻게 유지하고 있는지 여쭈어보고 싶습니다! 제가 생각한 방식은 로그인에 성공하면 
메인 페이지로 이동하도록 설정하였는데, 이후, 동네 설정 페이지, 메뉴 페이지 등으로 이동할 때마다 서버에 로그인이 되어 있는지
요청을 보내서 되어 있다면 해당 사용자에 따른 화면을 구성하도록 하는 방식입니다..! 이 방식이 적절한 방식인지 궁금합니다!

2. 현재 카테고리 페이지에서 카테고리를 선택하면 카테고리 상태를 변경해준 뒤, 메인 페이지로 이동하도록 구현하였습니다. 그 부분이 아래의 코드입니다.
- 카테고리 페이지의 카테고리 선택 시 호출되는 메서드
```javascript
handleCategoryClick(target) {
    const $categoryColumn = target.closest('.category-column');
    const $category = $categoryColumn.querySelector('.category-name');
    Observable.setState('category', $category.innerHTML);
    Router.setPage('/');
}
```

- Observable.setState()
```javascript
setState(key, newState) {
        if(!key in this.store) {
            throw Error('존재하지 않는 값입니다.');
        }

        this.store[key].state = newState;
        this.notify(key);
    }

    notify(key) {
        this.store[key].observers.forEach(el => el.render());
    }
```

- Router.setPate();
```javascript
setPage(newState) {
    this.state = newState;
    history.pushState({}, newState, location.origin + newState);
    this.notify();
}

notify() {
    this.target.render();
}
```

처음에는 `Router.setPage('/');` 코드 없이 `Observable.setState('category', $category.innerHTML);` 만으로 구현을 하였습니다. 그런데 `Observable.setState('category', $category.innerHTML);`만 사용하여 구현하면 `/category` 경로에서 화면을 구성하는 컴포넌트만 변경되어 history가 쌓이지 않는 문제가 발생하였습니다. 그래서 `Router.setPage('/');`를 사용하여 `/` 경로(메인 페이지)로 라우팅을 해주었는데, 이렇게 `Router.setPage('/');` 코드와 `Observable.setState('category', $category.innerHTML);` 코드를 둘 다 사용하면 렌더링이 2번 발생하게 되는데, Observable의 상태와 history를 모두 처리할 수 있는 방법에 대해서 조언을 구하고 싶습니다..!

