' @Author: Senkita

Private Sub CommandButton1_Click()
    Unload Me
    Application.DisplayAlerts = False
    
    Dim first_Gear, second_Gear, third_Gear, max_Amount, order_Price, order_Cost, n, i, m, k, first_Discount, second_Discount, third_Discount As Integer
    Dim transition_Arr(), name_Arr() As String
    Dim proportion_Commission, order_Profit As Variant
    
    first_Gear = TextBox1.Text
    first_Discount = TextBox2.Text
    second_Gear = TextBox3.Text
    second_Discount = TextBox4.Text
    third_Gear = TextBox5.Text
    third_Discount = TextBox6.Text
    max_Amount = third_Gear * 1.4
    proportion_Commission = TextBox7.Text / 100
    
    order_Price = Application.WorksheetFunction.VLookup(ComboBox1.Text, Range("A:B"), 2, 0)
    order_Cost = Application.WorksheetFunction.VLookup(ComboBox1.Text, Range("A:C"), 3, 0)
    
    n = Application.WorksheetFunction.CountA(Range("A:A"))
    ReDim transition_Arr(0 To n)
    Do While i <= n - 2
        If Cells(i + 2, 1).Interior.ColorIndex < 0 Then
            transition_Arr(i) = Cells(i + 2, 1)
        End If
        i = i + 1
    Loop
    For i = 0 To UBound(transition_Arr)
        If Len(transition_Arr(i)) Then
            ReDim Preserve name_Arr(0 To m)
            name_Arr(m) = transition_Arr(i)
            m = m + 1
        End If
    Next
    
    Worksheets.Add(After:=Sheets(1)).Name = "calculation_Process"
    For k = 0 To UBound(name_Arr)
        Cells(k + 1, 1).Value = name_Arr(k)
        Cells(k + 1, 2).Value = Application.WorksheetFunction.VLookup(Cells(k + 1, 1).Value, Range("成本与定价!A:B"), 2, 0)
        Cells(k + 1, 3).Value = Application.WorksheetFunction.VLookup(Cells(k + 1, 1).Value, Range("成本与定价!A:C"), 3, 0)
        Cells(k + 1, 4).FormulaR1C1 = "=IF(CEILING((" & first_Gear & "-" & order_Price & ")/RC[-2],1)*(RC[-2]-RC[-1])+" & order_Cost & "=RC[1],"""",CEILING((" & first_Gear & "-" & order_Price & ")/RC[-2],1)*(RC[-2]-RC[-1])+" & order_Cost & ")"
        Cells(k + 1, 5).FormulaR1C1 = "=IF(CEILING((" & second_Gear & "-" & order_Price & ")/RC[-3],1)*(RC[-3]-RC[-2])+" & order_Cost & "=RC[1],"""",CEILING((" & second_Gear & "-" & order_Price & ")/RC[-3],1)*(RC[-3]-RC[-2])+" & order_Cost & ")"
        Cells(k + 1, 6).FormulaR1C1 = "=IF(CEILING((" & third_Gear & "-" & order_Price & ")/RC[-4],1)*(RC[-4]-RC[-3])+" & order_Cost & "=RC[1],"""",CEILING((" & third_Gear & "-" & order_Price & ")/RC[-4],1)*(RC[-4]-RC[-3])+" & order_Cost & ")"
        Cells(k + 1, 7).FormulaR1C1 = "=CEILING((" & max_Amount & "-" & order_Price & ")/RC[-5],1)*(RC[-5]-RC[-4])+" & order_Cost
        If ComboBox2.Text = "折前扣点" Then
            Cells(k + 1, 8).FormulaR1C1 = "=IFERROR(RC[-4]-" & first_Discount & "-" & proportion_Commission & "*(CEILING((" & first_Gear & "-" & order_Price & ")/RC[-6],1)*RC[-6]+" & order_Price & "),"""")"
            Cells(k + 1, 9).FormulaR1C1 = "=IFERROR(RC[-4]-" & second_Discount & "-" & proportion_Commission & "*(CEILING((" & second_Gear & "-" & order_Price & ")/RC[-7],1)*RC[-7]+" & order_Price & "),"""")"
            Cells(k + 1, 10).FormulaR1C1 = "=IFERROR(RC[-4]-" & third_Discount & "-" & proportion_Commission & "*(CEILING((" & third_Gear & "-" & order_Price & ")/RC[-8],1)*RC[-8]+" & order_Price & "),"""")"
            Cells(k + 1, 11).FormulaR1C1 = "=RC[-4]-" & third_Discount & "-" & proportion_Commission & "*(CEILING((" & first_Gear & "-" & order_Price & ")/RC[-9],1)*RC[-9]+" & order_Price & ")"
        ElseIf ComboBox2.Text = "折后扣点" Then
            Cells(k + 1, 8).FormulaR1C1 = "=IFERROR(RC[-4]-" & first_Discount & "-" & proportion_Commission & "*(CEILING((" & first_Gear & "-" & order_Price & ")/RC[-6],1)*RC[-6]+" & order_Price & "-" & first_Discount & "),"""")"
            Cells(k + 1, 9).FormulaR1C1 = "=IFERROR(RC[-4]-" & second_Discount & "-" & proportion_Commission & "*(CEILING((" & second_Gear & "-" & order_Price & ")/RC[-7],1)*RC[-7]+" & order_Price & "-" & second_Discount & "),"""")"
            Cells(k + 1, 10).FormulaR1C1 = "=IFERROR(RC[-4]-" & third_Discount & "-" & proportion_Commission & "*(CEILING((" & third_Gear & "-" & order_Price & ")/RC[-8],1)*RC[-8]+" & order_Price & "-" & third_Discount & "),"""")"
            Cells(k + 1, 11).FormulaR1C1 = "=RC[-4]-" & third_Discount & "-" & proportion_Commission & "*(CEILING((" & third_Gear & "-" & order_Price & ")/RC[-9],1)*RC[-9]+" & order_Price & "-" & third_Discount & ")"
        End If

    Next
    
    If order_Price >= first_Gear Then
        If ComboBox2.Text = "折前扣点" Then
            order_Profit = order_Price - first_Discount - order_Cost - order_Price * proportion_Commission
        ElseIf ComboBox2.Text = "折后扣点" Then
            order_Profit = order_Price - first_Discount - order_Cost - (order_Price - first_Discount) * proportion_Commission
        End If
    Else
        order_Profit = 9E+307
    End If
    
    Worksheets.Add(After:=Sheets(1)).Name = "Result"
    Cells(1, 1).Value = "档位"
    Cells(2, 1).Value = "满" & first_Gear & "减" & first_Discount
    Cells(3, 1).Value = "满" & second_Gear & "减" & second_Discount
    Cells(4, 1).Value = "满" & third_Gear & "减" & third_Discount
    Cells(1, 2).Value = "最低毛利"
    Cells(2, 2).Formula = "=IF(MIN(calculation_Process!H:H)>=" & order_Profit & "," & order_Profit & ",MIN(calculation_Process!H:H))"
    Cells(3, 2).Formula = "=IF(MIN(calculation_Process!I:I)>=" & order_Profit & "," & order_Profit & ",MIN(calculation_Process!I:I))"
    Cells(4, 2).Formula = "=IF(MIN(calculation_Process!J:J)>=" & order_Profit & "," & order_Profit & ",MIN(calculation_Process!J:J))"
    Cells(1, 3).Value = "毛利估算上限"
    Cells(2, 3).Formula = "=Max(calculation_Process!I:I)"
    Cells(3, 3).Formula = "=Max(calculation_Process!J:J)"
    Cells(4, 3).Formula = "=Max(calculation_Process!K:K)"
    
    Range("D1:G1").Select
    With Selection
        .HorizontalAlignment = xlCenter
        .VerticalAlignment = xlBottom
        .WrapText = False
        .Orientation = 0
        .AddIndent = False
        .IndentLevel = 0
        .ShrinkToFit = False
        .ReadingOrder = xlContext
        .MergeCells = False
    End With
    Selection.Merge
    ActiveCell.FormulaR1C1 = "最低毛利组合"
    For i = 2 To 4
        Cells(i, 4).Value = "必点菜品1份+"
        Cells(i, 7).Value = "份"
    Next
    Cells(2, 5).Formula = "=IFERROR(LOOKUP(1,0/(calculation_Process!H:H=Result!B2),calculation_Process!A:A),"""")"
    Cells(3, 5).Formula = "=IFERROR(LOOKUP(1,0/(calculation_Process!I:I=Result!B3),calculation_Process!A:A),"""")"
    Cells(4, 5).Formula = "=IFERROR(LOOKUP(1,0/(calculation_Process!J:J=Result!B4),calculation_Process!A:A),"""")"
    Cells(2, 6).Value = "=IFERROR(CEILING((" & first_Gear & "-" & order_Price & ")/LOOKUP(1,0/(calculation_Process!A:A=Result!E2),calculation_Process!B:B),1),0)"
    Cells(3, 6).Value = "=IFERROR(CEILING((" & second_Gear & "-" & order_Price & ")/LOOKUP(1,0/(calculation_Process!A:A=Result!E3),calculation_Process!B:B),1),0)"
    Cells(4, 6).Value = "=IFERROR(CEILING((" & third_Gear & "-" & order_Price & ")/LOOKUP(1,0/(calculation_Process!A:A=Result!E4),calculation_Process!B:B),1),0)"
    
    Columns("A:F").Select
    Selection.Value = Selection.Value
    
    Range("A1:G4").Select
    With Selection
        .VerticalAlignment = xlCenter
        .WrapText = False
        .Orientation = 0
        .AddIndent = False
        .IndentLevel = 0
        .ShrinkToFit = False
        .ReadingOrder = xlContext
    End With
    With Selection
        .HorizontalAlignment = xlCenter
        .VerticalAlignment = xlCenter
        .WrapText = False
        .Orientation = 0
        .AddIndent = False
        .IndentLevel = 0
        .ShrinkToFit = False
        .ReadingOrder = xlContext
    End With
    
    Selection.Borders(xlDiagonalDown).LineStyle = xlNone
    Selection.Borders(xlDiagonalUp).LineStyle = xlNone
    With Selection.Borders(xlEdgeLeft)
        .LineStyle = xlContinuous
        .ColorIndex = 0
        .TintAndShade = 0
        .Weight = xlThin
    End With
    With Selection.Borders(xlEdgeTop)
        .LineStyle = xlContinuous
        .ColorIndex = 0
        .TintAndShade = 0
        .Weight = xlThin
    End With
    With Selection.Borders(xlEdgeBottom)
        .LineStyle = xlContinuous
        .ColorIndex = 0
        .TintAndShade = 0
        .Weight = xlThin
    End With
    With Selection.Borders(xlEdgeRight)
        .LineStyle = xlContinuous
        .ColorIndex = 0
        .TintAndShade = 0
        .Weight = xlThin
    End With
    With Selection.Borders(xlInsideVertical)
        .LineStyle = xlContinuous
        .ColorIndex = 0
        .TintAndShade = 0
        .Weight = xlThin
    End With
    With Selection.Borders(xlInsideHorizontal)
        .LineStyle = xlContinuous
        .ColorIndex = 0
        .TintAndShade = 0
        .Weight = xlThin
    End With
    
    Columns("A:G").EntireColumn.AutoFit
    
    Sheets("calculation_Process").Delete
    Application.DisplayAlerts = True
End Sub