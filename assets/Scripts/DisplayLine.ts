import { _decorator, Component, Line, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DisplayLine')
export class DisplayLine extends Component {
    @property(Line)
    lineRenderer: Line = null
    start() {

        console.log(this.lineRenderer.positions);

    }

    update(deltaTime: number) {

    }
}


