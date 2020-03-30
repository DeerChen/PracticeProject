import PySimpleGUI as sg


def questionnaireUi():
    houseLay = [
        [sg.T('家庭成员：'), sg.InputCombo(
            ['1', '2', '3', '4', '5', '6+'], '1'), sg.T('(人)')],
        [sg.Check('冬季是否用暖气取暖？')],
        [sg.T('居住面积：'), sg.I('10', (5, None)), sg.T('(平方米)')],
        [sg.T('每月用电：'), sg.I('50', (5, None)), sg.T('(度/月)')],
        [sg.T('每月用气：'), sg.I('10', (5, None)), sg.T('(立方米/月)')],
        [sg.T('每月用水：'), sg.I('10', (5, None)), sg.T('(吨/月)')],
        [sg.Button('下一步')]
    ]

    trafficLay = [
        [sg.T('飞机：'), sg.I('0', (5, None)), sg.T('(千米/年)')],
        [sg.T('火车：'), sg.I('500', (5, None)), sg.T('(千米/年)')],
        [sg.T('公交：'), sg.I('10', (5, None)), sg.T('(千米/天)')],
        [sg.T('地铁：'), sg.I('10', (5, None)), sg.T('(站/天)')],
        [sg.T('小车：'), sg.I('0', (5, None)), sg.T('(千米/天)')],
        [sg.T('电梯：'), sg.I('10', (5, None)), sg.T('(层/天)')],
        [sg.Button('下一步')]
    ]

    lifeLay = [
        [sg.T('每周消耗塑料袋子：'), sg.I('10', (5, None)), sg.T('(个/周)')],
        [sg.T('每周用一次性筷子：'), sg.I('10', (5, None)), sg.T('(双/周)')],
        [sg.T('每半年新购买衣服：'), sg.I('4', (5, None)), sg.T('(件/半年)')],
        [sg.T('每天摄取的主食量：'), sg.I('2', (5, None)), sg.T('(碗/天)')],
        [sg.T('每天摄取的肉食量：'), sg.I('1', (5, None)), sg.T('(盘/天)')],
        [sg.T('上班使用电脑时间：'), sg.I('4', (5, None)), sg.T('(小时/天)')],
        [sg.T('每天收发电子邮件：'), sg.I('2', (5, None)), sg.T('(封/天)')],
        [sg.T('每天使用搜索次数：'), sg.I('10', (5, None)), sg.T('(次/天)')],
        [sg.T('每月买书籍或杂志：'), sg.I('2', (5, None)), sg.T('(册/月)')],
        [sg.T('平均每月打印纸张：'), sg.I('20', (5, None)), sg.T('(张/月)')],
        [sg.Button('下一步')]
    ]

    habitLay = [
        [sg.T('自行车代步：'), sg.I('0', (5, None)), sg.T('(千米/天)')],
        [sg.Check('节能灯泡 (在同等亮度下，节能灯比钨丝灯节能20%)')],
        [sg.Check('我习惯随手关灯')],
        [sg.Check('我不使电器处于待机状态')],
        [sg.Check('我习惯淋浴而非盆浴')],
        [sg.Check('我循环使用至少30%的家庭废旧物品')],
        [sg.Check('太阳能热水器')],
        [sg.OK('计算')]
    ]

    houseWin = sg.Window('住宅', houseLay)
    houseEvent, houseVal = houseWin.Read()
    if houseEvent == '下一步':
        houseWin.Close()

        trafficWin = sg.Window('交通', trafficLay)
        trafficEvent, trafficVal = trafficWin.Read()
        if trafficEvent == '下一步':
            trafficWin.Close()

            lifeWin = sg.Window('生活', lifeLay)
            lifeEvent, lifeVal = lifeWin.Read()
            if lifeEvent == '下一步':
                lifeWin.Close()

                habitWin = sg.Window('习惯', habitLay)
                habitEvent, habitVal = habitWin.Read()
                if habitEvent in (None, '计算'):
                    habitWin.Close()

                return houseVal.values(), trafficVal.values(), lifeVal.values(), habitVal.values()


def resultUi(result):
    perEmissions = result / 1000
    totalEmissions = perEmissions * 1300000000
    ppm = round(totalEmissions / 2000000000000 * 1000, 2)
    temp = round(ppm * 0.015, 2)
    tree = round((result - 2700 * 0.52) / 185, 2)

    resultLay = [
        [sg.T('您一年排放的二氧化碳：{}吨'.format(perEmissions))],
        [sg.T('13亿中国人每年排放二氧化碳：{}吨'.format(totalEmissions))],
        [sg.T('相当于{}ppm/年'.format(ppm))],
        [sg.T('全球气温会因此升高{}摄氏度/年'.format(temp))],
        [sg.T('除去全球人均森林，您一年排放的二氧化碳还需{}棵树用十年来抵偿！'.format(tree))],
        [sg.OK('确定')]
    ]
    resultWin = sg.Window('结果', resultLay)
    resultEvent = resultWin.Read()[0]
    if resultEvent in (None, '确定'):
        resultWin.Close()


def warningUi():
    return sg.Popup('警告！', '存在错误！')
