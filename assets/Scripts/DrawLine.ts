import { _decorator, Canvas, CCFloat, Component, EventTouch, Graphics, Line, Node, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DrawLine')
export class DrawLine extends Component {
    @property(Graphics)
    lineRenderer: Graphics = null
    @property(Canvas)
    mainCanvas: Canvas = null
    @property(CCFloat)
    distanceBtw2Points: number = 2
    @property(Vec2)
    listPoint: Vec2[] = [];
    start() {
        this.mainCanvas.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.mainCanvas.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
    }
    onTouchStart(evt: EventTouch) {
        console.log("touch begin")
        this.listPoint = [];
        let currentPos = evt.touch.getLocationInView()
        this.listPoint.push(currentPos)
    }
    onTouchMove(evt: EventTouch) {
        let currentPos = evt.touch.getLocationInView()
        console.log(currentPos)
        let tempVec2 = new Vec2(currentPos.x, currentPos.y)
        console.log(tempVec2)
        this.listPoint.push(tempVec2)
        this.lineRenderer.clear()
        this.lineRenderer.moveTo(this.listPoint[0].x, this.listPoint[0].y)
        this.renderLine()

    }
    renderLine() {
        let lastIndex = 0
        for (let i = 1; i < this.listPoint.length; i++) {
            let lastPos = this.listPoint[lastIndex];
            let currentPos = this.listPoint[i]

            let distance = this.distanceVector(lastPos, currentPos)
            if (distance > this.distanceBtw2Points) {
                this.lineRenderer.lineTo(currentPos.x, currentPos.y)
                lastIndex = i
            }
        }
        this.lineRenderer.stroke()
    }
    distanceVector(a: Vec2, b: Vec2) {

        return (a.subtract(b)).length()
    }
}


