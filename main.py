def miganie():
    while 0 == mig:
        pins.digital_write_pin(DigitalPin.P16, 1)
        basic.show_leds("""
            . . . . .
            . . . . .
            # . . . #
            . # . # .
            . . # . .
            """)
        basic.pause(100)
        pins.digital_write_pin(DigitalPin.P16, 0)
        basic.show_leds("""
            . . # . .
            . # . # .
            # . . . #
            . . . . .
            . . . . .
            """)
        basic.pause(90)
def otwieranie():
    global mig
    mig = 0
    for indeks in range(101):
        motor.servo(motor.Servos.S1, indeks)
        basic.pause(30)
    mig = 1
    pins.digital_write_pin(DigitalPin.P14, 1)
    pins.digital_write_pin(DigitalPin.P13, 1)
    basic.pause(502)
    basic.show_arrow(ArrowNames.NORTH)
def zamykanie():
    global niebieski
    pins.digital_write_pin(DigitalPin.P16, 1)
    motor.servo(motor.Servos.S1, 0)
    pins.digital_write_pin(DigitalPin.P14, 0)
    niebieski = 0
    basic.show_leds("""
        . . . . .
        . . . . .
        # # # # #
        . . . . .
        . . . . .
        """)
niebieski = 0
mig = 0
pins.digital_write_pin(DigitalPin.P16, 1)
motor.servo(motor.Servos.S1, 0)
mig = 1
pins.digital_write_pin(DigitalPin.P15, 0)
pins.digital_write_pin(DigitalPin.P13, 0)
basic.show_icon(IconNames.ASLEEP)

def on_forever():
    global niebieski
    if pins.digital_read_pin(DigitalPin.P15) == 0:
        zamykanie()
    if pins.digital_read_pin(DigitalPin.P13) == 0:
        if niebieski == 0:
            otwieranie()
        niebieski += 1
basic.forever(on_forever)

def on_forever2():
    miganie()
basic.forever(on_forever2)
