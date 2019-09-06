Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "wsl.exe -e jupyter notebook --allow-root", vbhide