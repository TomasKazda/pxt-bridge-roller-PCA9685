class BridgeServo {
    private _up: number
    private _down: number
    private _pulse: number
    private _pin: PCAservo.Servos
    private _speed: number

    constructor(pin: PCAservo.Servos, up: number, down: number, initPulse: number = 1350, speed: number = 10) {
        //super(pin, initPulse)
        PCAservo.GeekServo(pin, initPulse)
        this._pin = pin
        this._up = up
        this._down = down
        this._pulse = initPulse
        this._speed = speed
    }

    public up(): void {
        this.setPulse(this._up, this._speed)
    }
    public down(): void {
        this.setPulse(this._down, this._speed)
    }
    public stop(): void {
        PCAservo.StopServo(this._pin)
    }
    public isDown(): boolean {
        return Math.abs(this._pulse - this._down) <= 150
    }
    public setPulse(pulse: number, speed: number = 10)
    {
        /* // 0.6 ~ 2.4  */
        pulse = Math.constrain(pulse, Math.min(this._down, this._up), Math.max(this._down, this._up))
        //console.logValue(this._pin, pulse)
        if (speed == 0) {
            PCAservo.GeekServo(this._pin, pulse)
        } else 
            PCAservo.Servospeed(
                this._pin, 
                Math.map(this._pulse, 600, 2400, 0, 180),
                Math.map(pulse, 600, 2400, 0, 180),
                speed
            )
        this._pulse = pulse
    }
    public changePulse(us: number, speed: number = 4) {
        this.setPulse(this._pulse + us, speed)
        if (this._pulse == this._up || this._pulse == this._down)
          this.stop()
    }
}