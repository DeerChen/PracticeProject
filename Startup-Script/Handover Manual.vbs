Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "wsl.exe -d debian -u root /etc/init.wsl start", vbhide