from ui import questionnaireUi, resultUi, warningUi
from calculating import Cal


def main():
    try:
        houseVal, trafficVal, lifeVal, habitVal = questionnaireUi()
        c = Cal(houseVal, trafficVal, lifeVal, habitVal)
        result = c.cal()
        resultUi(result)
    except:
        warningUi()

if __name__ == "__main__":
    main()
