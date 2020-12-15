function miganie () {
    while (0 == mig) {
        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.showLeds(`
            . . . . .
            . . . . .
            # . . . #
            . # . # .
            . . # . .
            `)
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P16, 0)
        basic.showLeds(`
            . . # . .
            . # . # .
            # . . . #
            . . . . .
            . . . . .
            `)
        basic.pause(90)
    }
}
function otwieranie () {
    mig = 0
    for (let indeks = 0; indeks <= 100; indeks++) {
        motor.servo(motor.Servos.S1, indeks)
        basic.pause(30)
    }
    mig = 1
    pins.digitalWritePin(DigitalPin.P14, 1)
    pins.digitalWritePin(DigitalPin.P13, 1)
    basic.pause(502)
    basic.showArrow(ArrowNames.North)
}
function zamykanie () {
    pins.digitalWritePin(DigitalPin.P16, 1)
    motor.servo(motor.Servos.S1, 0)
    pins.digitalWritePin(DigitalPin.P14, 0)
    niebieski = 0
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # # #
        . . . . .
        . . . . .
        `)
}
let niebieski = 0
let mig = 0
pins.digitalWritePin(DigitalPin.P16, 1)
motor.servo(motor.Servos.S1, 0)
mig = 1
pins.digitalWritePin(DigitalPin.P15, 0)
pins.digitalWritePin(DigitalPin.P13, 0)
basic.showIcon(IconNames.Asleep)
basic.forever(function () {
	
})
basic.forever(function () {
    miganie()
})
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        zamykanie()
    }
    if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        // obsluga blokady ponownego otwierania
        if (niebieski == 0) {
            otwieranie()
        }
        niebieski += 1
    }
})
