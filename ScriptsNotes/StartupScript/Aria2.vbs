Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "wsl.exe aria2c --conf-path=/root/.aria2c/aria2c.conf -D", vbhide