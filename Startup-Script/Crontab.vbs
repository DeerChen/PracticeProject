Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "wsl.exe service cron start", vbhide