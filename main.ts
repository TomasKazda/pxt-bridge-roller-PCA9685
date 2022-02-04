function bridgeDown() {
    running = false
    control.inBackground(function () { semaphor(4, false) })
    most.down()
    control.inBackground(function () { zavora1.up() })
    control.inBackground(function () { zavora2.up() })
    basic.pause(4000)
    zavora1.stop()
    zavora2.stop()
    most.stop()
    running = true
}
function bridgeUp() {
    running = false
    control.inBackground(function () { semaphor(4, true) })
    control.inBackground(function () { zavora2.down() })
    zavora1.down()
    most.up()
    basic.pause(3000)
    zavora1.stop()
    zavora2.stop()
    most.stop()
    running = true
}

function bridgeOff() {
    running = false
    if (!most.isDown()) most.down()
    zavora1.down()
    zavora2.down()
    basic.pause(500)
    zavora1.stop()
    zavora2.stop()
    most.stop()
    basic.showIcon(IconNames.Asleep)
}

function bridgeReset() {
    most.down()
    zavora1.up()
    zavora2.up()
    basic.showIcon(IconNames.Happy)
    basic.pause(500)
    zavora1.stop()
    zavora2.stop()
    most.stop()
    running = true
}

input.onButtonPressed(Button.AB, function () {
    bridgeOff()
})
input.onButtonPressed(Button.B, function () {
    if (running && most.isDown()) {
        bridgeUp()
    }
})
input.onButtonPressed(Button.A, function () {
    if (running && !most.isDown()) {
        bridgeDown()
    }
})

music.setVolume(16)
radio.setGroup(111)

/* safe pin: P0, P1, P2, P8, P9, P12, P16 */
pins.setPull(DigitalPin.P12, PinPullMode.PullUp)
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
basic.showIcon(IconNames.Sword)
let running = false
let zavora2 = new BridgeServo(PCAservo.Servos.S3, 1100, 2100, 2100, 8)
let zavora1 = new BridgeServo(PCAservo.Servos.S2, 1100, 2050, 1950, 8)
let most = new BridgeServo(PCAservo.Servos.S1, 1150, 1670, 1630, 2)

while (!input.logoIsPressed()) {
    basic.pause(125)
}
bridgeReset()

basic.forever(function () {
    // if (running) {
    //     let pin12 = pins.digitalReadPin(DigitalPin.P12)
    //     let pin13 = pins.digitalReadPin(DigitalPin.P13)
    //     let pin14 = pins.digitalReadPin(DigitalPin.P14)
    //     let pin15 = pins.digitalReadPin(DigitalPin.P15)

    //     if (running && !most.isDown() && (pin12 == 0 || pin13 == 0)) {
    //         bridgeDown()
    //     }
    //     if (running && most.isDown() && (pin14 == 0 || pin15 == 0)) {
    //         bridgeUp()
    //     }
    // }
    basic.pause(100)
})

radio.onReceivedValue(function (name: string, value: number) {

    if (name == "btn") {
        if (value == KEY.E) {
            bridgeReset()
        } else
        if (value == KEY.F) {
            bridgeOff()
        } else
        if (value == KEY.A) {
            if (running && !most.isDown()) {
                console.log("bridge down")
                bridgeDown()
            }
        } else
        if (value == KEY.B) {
            if (running && most.isDown()) {
                console.log("bridge up")
                bridgeUp()
            }
        } else
        if (value == KEY.D) {
            basic.showArrow(1, 0)
            zavora1.changePulse(-75, 0)
            zavora2.changePulse(-75, 0)
        } else
        if (value == KEY.C) {
            basic.showArrow(5, 0)
            zavora1.changePulse(75, 0)
            zavora2.changePulse(75, 0)
        }
    }

    if (name = "dir") {
        if (value == DIR.D) {
            basic.showArrow(4, 0)
            most.changePulse(50)
        }
        if (value == DIR.NONE) {

        }
        else if (value == DIR.U) {
            basic.showArrow(0, 0)
            most.changePulse(-50)
        }
    }
})

enum DIR {
    NONE = 10,
    U = 11,
    D = 12,
    L = 13,
    R = 14,
    U_L = 15,
    U_R = 16,
    D_L = 17,
    D_R = 18
}

enum KEY {
    P = 0,
    A = 1,
    B = 2,
    C = 3,
    D = 4,
    E = 5,
    F = 6,
}