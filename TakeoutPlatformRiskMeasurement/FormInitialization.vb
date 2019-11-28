' @Author: Senkita

Private Sub userform_Initialize()
    Application.DisplayAlerts = False
    For Each sht In Sheets
        If sht.Name = "calculation_Process" Then
            Sheets("calculation_Process").Delete
        End If
        If sht.Name = "Result" Then
            Sheets("Result").Delete
        End If
    Next
    Application.DisplayAlerts = True
    
    Dim transition_Arr(), name_Arr() As String
    Dim n, i, m As Integer
    
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
    Me.ComboBox1.List = name_Arr
    Me.ComboBox2.List = Array("折前扣点", "折后扣点")
End Sub