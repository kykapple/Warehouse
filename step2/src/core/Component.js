export class Component {
    $target;
    $state;
    $that;

    constructor($target) {
        this.$target = $target;
        this.init();
        this.render();
    }

    init() {}           // state 초기화 함수
    template() {}       // 템플릿 제공 함수
    render() {          // 렌더링 함수
        console.log(this.$that);
        this.$target.innerHTML = this.template();
        this.setBtnHandler().bind(this.$that);
    }
    setState(newState) {
        this.$state = { ...this.$state, ...newState};
        this.render();
    }
    setBtnHandler() {}
}
