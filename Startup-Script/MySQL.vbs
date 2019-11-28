Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "wsl.exe mysqld --user=root", vbhide