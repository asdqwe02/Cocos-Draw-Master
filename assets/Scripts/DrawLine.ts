import { _decorator, Camera, Canvas, CCFloat, Component, EventTouch, Graphics, Line, Node, Tween, tween, Vec2, Vec3 } from 'cc';
import { Projectile } from './Projectile';
const { ccclass, property } = _decorator;

@ccclass('DrawLineController')
export class DrawLineController extends Component {
    @property(Graphics)
    lineRenderer: Graphics = null
    @property(Canvas)
    mainCanvas: Canvas = null
    @property(CCFloat)
    distanceBtw2Points: number = 2
    @property(Vec2)
    listPoint: Vec2[] = []
    @property(Vec2)
    public listWorldPoint: Vec2[] = []
    @property(Camera)
    mainCam: Camera = null
    @property(Projectile)
    projectile: Projectile = null
    start() {
        this.mainCanvas.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.mainCanvas.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        this.mainCanvas.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.mainCanvas.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this)
    }
    onTouchEnd() {
        this.drawEnd()
    }
    onTouchStart(evt: EventTouch) {
        Tween.stopAllByTarget(this.projectile.node);
        console.log("touch begin")
        this.listPoint = [];
        this.listWorldPoint = [];
        let currentPos = evt.touch.getLocation().subtract(new Vec2(this.mainCanvas.node.position.x, this.mainCanvas.node.position.y))
        let currentWorldPos = this.mainCam.screenToWorld(new Vec3(evt.touch.getLocation().x, evt.touch.getLocation().y, 0))
        this.listWorldPoint.push(new Vec2(currentWorldPos.x, currentWorldPos.y));
        this.listPoint.push(currentPos)

        console.log(`World position: ${currentWorldPos}`);


        // get world pos from camera view port 
        // const view = this.mainCam.rect
        // const viewportRect = this.mainCam.rect
        // const viewportWidth = viewportRect.width;
        // const viewportHeight = viewportRect.height;
        // const xNdc = (touchPos.x * 2) - 1;
        // const yNdc = (touchPos.y * 2) - 1;
        // const zNdc = this.targetPositionOnCamera.z * 2 - 1;
        // const worldPos = new Vec3(xNdc * viewportWidth / 2, yNdc * viewportHeight / 2, 0);
        // this.mainCam.screenToWorld(worldPos, worldPos);
        // console.log('touch position: ' + touchPos)
        // console.log('Target position in world space:', worldPos);
    }
    onTouchMove(evt: EventTouch) {
        let touchPos = evt.touch.getLocation()
        let currentPos = touchPos.subtract(new Vec2(this.mainCanvas.node.position.x, this.mainCanvas.node.position.y))
        let currentWorldPos = this.mainCam.screenToWorld(new Vec3(evt.touch.getLocation().x, evt.touch.getLocation().y, 0))
        // console.log(currentPos)
        this.listPoint.push(currentPos)
        this.listWorldPoint.push(new Vec2(currentWorldPos.x, currentWorldPos.y));


        this.lineRenderer.clear()
        this.lineRenderer.moveTo(this.listPoint[0].x, this.listPoint[0].y)
        this.renderLine()

    }
    renderLine() {
        let lastIndex = 0
        for (let i = 1; i < this.listPoint.length; i++) {
            let lastPos = new Vec2(this.listPoint[lastIndex])
            let currentPos = new Vec2(this.listPoint[i])

            let distance = this.distanceVector(lastPos, currentPos)
            if (distance > this.distanceBtw2Points) {
                this.lineRenderer.lineTo(currentPos.x, currentPos.y)
                lastIndex = i
            }
        }
        this.lineRenderer.stroke()
    }
    drawEnd() {
        this.projectile.setUpPath(this.listWorldPoint)
    }
    distanceVector(a: Vec2, b: Vec2) {

        return (a.subtract(b)).length()
    }
}


