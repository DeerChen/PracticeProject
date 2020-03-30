class Cal:
    def __init__(self, houseVal, trafficVal, lifeVal, habitVal):
        self.family, self.heating, self.livingArea, self.electricity, self.gas, self.water = houseVal
        self.aircraft, self.train, self.bus, self.subway, self.taxi, self.elevator = trafficVal
        self.plasticBags, self.chopsticks, self.clothes, self.rice, self.meat, self.pc, self.email, self.search, self.book, self.paper = lifeVal
        self.bike, self.light, self.turnOff, self.standBy, self.shower, self.recycle, self.waterHeater = habitVal

    def cal(self):
        result = \
            (int(self.electricity) * 1.02 * 12 + int(self.gas) * 1.7978 * 12 + int(self.water) * 0.4512 * 12 + int(self.heating) * int(self.livingArea) * 35) / int(self.family)\
            + int(self.aircraft) * 0.139\
            + int(self.train) * 0.0109\
            + int(self.bus) * 0.032 * 365\
            + (int(self.subway) * 0.125) * 1.02 * 365\
            + ((int(self.elevator) * 3 / 1.5) / 3600) * 15 * 1.02 * 365\
            + int(self.taxi) * 0.24 * 365 \
            + int(self.plasticBags) * 0.0001 * 52\
            + int(self.chopsticks) * (0.0229 + 0.001) * 52\
            + int(self.clothes) * 6.4 * 2\
            + int(self.rice) * 0.047 * 4 * 365\
            + int(self.meat) * 0.6 * 365\
            + (int(self.pc) / 10) * 0.943 * 240\
            + int(self.email) * 0.0043 * 365\
            + int(self.search) * 0.007 * 365\
            + int(self.book) * 3.3 \
            + int(self.paper) * 0.015 * 12\
            - int(self.bike) * 0.24 * 365\
            - int(self.light)\
            - int(self.turnOff) \
            - int(self.standBy) \
            - int(self.shower) \
            - int(self.recycle) \
            - int(self.waterHeater)
        return result
