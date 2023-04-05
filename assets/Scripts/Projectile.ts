import { _decorator, CanvasComponent, CCFloat, Component, director, game, Node, path, Tween, tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Projectile')
export class Projectile extends Component {

    @property(CCFloat)
    speed: number = 1.0
    @property(Vec2)
    pathPoints: Vec2[] = []
    movePos: Vec3
    moveTween: Tween<Node>
    protected start(): void {
    }
    setUpPath(path: Vec2[]) {
        if (this.moveTween != null && this.moveTween != undefined) {
            this.moveTween.stop();
        }
        this.pathPoints = path
        let pathPoint = this.pathPoints[0]
        // console.log('initial path point: ' + pathPoint)
        this.movePos = new Vec3(pathPoint.x, pathPoint.y, 0)
        this.node.position.set(this.movePos)
        // Tween.stopAllByTarget(this.node)
        // this.moveTween()
        let actions: Tween<Node>[] = []
        let lastPoint = this.node.position
        this.pathPoints.forEach(pathPoint => {
            let movePos = new Vec3(pathPoint.x, pathPoint.y, 0)
            actions.push(tween(this.node).to(.1 * Vec3.distance(lastPoint, movePos), { position: movePos }))
            lastPoint = movePos
        });
        this.moveTween = tween(this.node).sequence(...actions)
        this.moveTween.start();
    }
    protected update(dt: number): void {

    }
}


