braveAlert = MsgBox("Welcome to BraveBot 0.1, please make sure Brave is installed in the default location.", vbSystemModal, "Bravebot 0.1")

Set WshShell = WScript.CreateObject("WScript.Shell")

WshShell.Run "brave.exe"
WScript.Sleep 500 

' Open our Command Prompt
WshShell.Run "cmd.exe"

' Give Notepad time to load
WScript.Sleep 500 
WshShell.SendKeys "cd C:\Users\gremb\Desktop\bravebot"
WshShell.SendKeys "{ENTER}"
WshShell.SendKeys "node index.js"
WshShell.SendKeys "{ENTER}"


Set WshShell = Nothing

